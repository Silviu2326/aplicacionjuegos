import { create } from 'zustand';
import { generarTituloAbsurdo } from '../utils/criticoCineAbsurdoGeneradorTitulos';

const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  DEFAULT_ROUNDS: 3,
  DEFAULT_TURN_TIME: 90, // segundos
  MIN_TURN_TIME: 30,
  MAX_TURN_TIME: 180,
};

export const useCriticoCineAbsurdoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'playing', 'voting', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, isCurrentCritic }]
  
  // Ronda actual
  currentRound: 1,
  maxRounds: GAME_CONFIG.DEFAULT_ROUNDS,
  
  // Crítico actual
  currentCriticId: null,
  currentCriticIndex: 0,
  
  // Datos de película generada para la ronda actual (incluye título y metadatos)
  currentMovieData: null,
  
  // Temporizador
  turnTimeRemaining: GAME_CONFIG.DEFAULT_TURN_TIME,
  turnTime: GAME_CONFIG.DEFAULT_TURN_TIME,
  
  // Votación
  votes: [], // [{ voterId, criticId, stars }]
  votingPhase: false,
  
  // Historial de rondas
  roundHistory: [], // [{ round, criticId, criticName, movieData, averageStars, votes }]
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
      isCurrentCritic: false,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players } = get();
    set({ players: players.filter(p => p.id !== playerId) });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds });
  },
  
  setTurnTime: (time) => {
    const clampedTime = Math.max(
      GAME_CONFIG.MIN_TURN_TIME,
      Math.min(GAME_CONFIG.MAX_TURN_TIME, time)
    );
    set({ turnTime: clampedTime, turnTimeRemaining: clampedTime });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Seleccionar primer crítico aleatoriamente
    const randomIndex = Math.floor(Math.random() * players.length);
    const firstCritic = players[randomIndex];
    
    // Generar primera película con metadatos
    const firstMovieData = generarTituloAbsurdo();
    
    // Actualizar jugadores para marcar el crítico actual
    const updatedPlayers = players.map((p, index) => ({
      ...p,
      isCurrentCritic: index === randomIndex,
      score: 0,
    }));
    
    set({
      gameStatus: 'playing',
      currentRound: 1,
      currentCriticId: firstCritic.id,
      currentCriticIndex: randomIndex,
      currentMovieData: firstMovieData,
      players: updatedPlayers,
      turnTimeRemaining: get().turnTime,
      votes: [],
      votingPhase: false,
      roundHistory: [],
    });
    
    return true;
  },
  
  // Acciones - Generar nuevo título
  generateNewTitle: () => {
    const newMovieData = generarTituloAbsurdo();
    set({ currentMovieData: newMovieData });
    return newMovieData;
  },
  
  // Acciones - Temporizador
  decrementTurnTime: () => {
    const { turnTimeRemaining, gameStatus, votingPhase } = get();
    if (gameStatus === 'playing' && !votingPhase && turnTimeRemaining > 0) {
      const newTime = turnTimeRemaining - 1;
      set({ turnTimeRemaining: newTime });
      
      if (newTime === 0) {
        // Tiempo agotado, iniciar fase de votación
        get().startVotingPhase();
      }
    }
  },
  
  // Acciones - Fase de votación
  startVotingPhase: () => {
    set({
      votingPhase: true,
      votes: [],
    });
  },
  
  submitVote: (voterId, stars) => {
    const { votes, currentCriticId, players } = get();
    const voter = players.find(p => p.id === voterId);
    const critic = players.find(p => p.id === currentCriticId);
    
    // No puede votar el crítico por sí mismo
    if (voterId === currentCriticId) {
      return false;
    }
    
    // Verificar que el voto es válido (1-5 estrellas)
    if (stars < 1 || stars > 5) {
      return false;
    }
    
    // Verificar que no haya votado ya
    const existingVote = votes.find(v => v.voterId === voterId && v.criticId === currentCriticId);
    if (existingVote) {
      return false;
    }
    
    const newVote = {
      voterId,
      criticId: currentCriticId,
      stars,
    };
    
    set({
      votes: [...votes, newVote],
    });
    
    return true;
  },
  
  // Verificar si todos han votado
  allPlayersVoted: () => {
    const { votes, players, currentCriticId } = get();
    const audienceSize = players.filter(p => p.id !== currentCriticId).length;
    const votesForCurrentCritic = votes.filter(v => v.criticId === currentCriticId);
    return votesForCurrentCritic.length >= audienceSize;
  },
  
  // Acciones - Finalización de ronda
  finishRound: () => {
    const { votes, players, currentCriticId, currentRound, maxRounds, currentMovieData, roundHistory } = get();
    
    // Calcular promedio de estrellas para el crítico actual
    const votesForCritic = votes.filter(v => v.criticId === currentCriticId);
    const totalStars = votesForCritic.reduce((sum, v) => sum + v.stars, 0);
    const averageStars = votesForCritic.length > 0 ? totalStars / votesForCritic.length : 0;
    
    const currentCritic = players.find(p => p.id === currentCriticId);
    
    // Guardar en historial
    const newHistoryEntry = {
      round: currentRound,
      criticId: currentCriticId,
      criticName: currentCritic ? currentCritic.name : 'Desconocido',
      movieData: currentMovieData,
      averageStars: averageStars,
      totalVotes: votesForCritic.length,
      votes: [...votesForCritic],
    };
    
    // Actualizar puntuación del crítico (suma del promedio)
    const updatedPlayers = players.map(p => {
      if (p.id === currentCriticId) {
        return {
          ...p,
          score: p.score + averageStars,
          isCurrentCritic: false,
        };
      }
      return { ...p, isCurrentCritic: false };
    });
    
    // Verificar si el juego terminó
    const nextRound = currentRound + 1;
    const isFinished = nextRound > maxRounds;
    
    set({
      players: updatedPlayers,
      gameStatus: isFinished ? 'finished' : 'playing',
      currentRound: nextRound,
      votes: [],
      votingPhase: false,
      roundHistory: [...roundHistory, newHistoryEntry],
    });
    
    if (!isFinished) {
      // Avanzar al siguiente crítico
      get().nextCritic();
    }
    
    return isFinished;
  },
  
  // Acciones - Siguiente crítico
  nextCritic: () => {
    const { players, currentCriticIndex } = get();
    const nextIndex = (currentCriticIndex + 1) % players.length;
    const nextCritic = players[nextIndex];
    
    // Generar nueva película con metadatos
    const newMovieData = generarTituloAbsurdo();
    
    // Actualizar jugadores para marcar el nuevo crítico
    const updatedPlayers = players.map((p, index) => ({
      ...p,
      isCurrentCritic: index === nextIndex,
    }));
    
    set({
      currentCriticId: nextCritic.id,
      currentCriticIndex: nextIndex,
      currentMovieData: newMovieData,
      players: updatedPlayers,
      turnTimeRemaining: get().turnTime,
      votes: [],
      votingPhase: false,
    });
  },
  
  // Acciones - Reset
  resetGame: () => {
    const updatedPlayers = get().players.map(p => ({
      ...p,
      score: 0,
      isCurrentCritic: false,
    }));
    
    set({
      gameStatus: 'setup',
      currentRound: 1,
      currentCriticId: null,
      currentCriticIndex: 0,
      currentMovieData: null,
      players: updatedPlayers,
      turnTimeRemaining: get().turnTime,
      votes: [],
      votingPhase: false,
      roundHistory: [],
    });
  },
  
  // Getters útiles
  getCurrentCritic: () => {
    const { players, currentCriticId } = get();
    return players.find(p => p.id === currentCriticId) || null;
  },
  
  getWinner: () => {
    const { players } = get();
    if (players.length === 0) return null;
    return players.reduce((prev, current) =>
      prev.score > current.score ? prev : current
    );
  },
  
  getSortedPlayers: () => {
    const { players } = get();
    return [...players].sort((a, b) => b.score - a.score);
  },
  
  getAverageStarsForCurrentCritic: () => {
    const { votes, currentCriticId } = get();
    const votesForCritic = votes.filter(v => v.criticId === currentCriticId);
    if (votesForCritic.length === 0) return 0;
    const totalStars = votesForCritic.reduce((sum, v) => sum + v.stars, 0);
    return totalStars / votesForCritic.length;
  },
}));

