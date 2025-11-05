import { create } from 'zustand';
import { GAME_CONFIG } from '../constants/ConexionInesperadaConceptList';

export const useConexionInesperadaStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'writing', 'voting', 'results', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, currentResponse, votes }]
  
  // Ronda actual
  currentRound: 1,
  maxRounds: GAME_CONFIG.DEFAULT_ROUNDS,
  
  // Conceptos de la ronda actual
  currentConceptPair: null, // [concept1, concept2]
  
  // Respuestas de la ronda actual (anónimas para votación)
  currentResponses: [], // [{ id, response, playerId, votes }]
  
  // Temporizadores
  writingTimeRemaining: GAME_CONFIG.DEFAULT_WRITING_TIME,
  votingTimeRemaining: GAME_CONFIG.DEFAULT_VOTING_TIME,
  
  // Configuración
  writingTime: GAME_CONFIG.DEFAULT_WRITING_TIME,
  votingTime: GAME_CONFIG.DEFAULT_VOTING_TIME,
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
      currentResponse: null,
      votes: 0,
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
  
  setWritingTime: (time) => {
    set({ writingTime: time, writingTimeRemaining: time });
  },
  
  setVotingTime: (time) => {
    set({ votingTime: time, votingTimeRemaining: time });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Seleccionar primer par de conceptos
    const { CONCEPT_PAIRS } = require('../constants/ConexionInesperadaConceptList');
    const randomPair = CONCEPT_PAIRS[Math.floor(Math.random() * CONCEPT_PAIRS.length)];
    
    set({
      gameStatus: 'writing',
      currentRound: 1,
      currentConceptPair: randomPair,
      currentResponses: [],
      writingTimeRemaining: get().writingTime,
      votingTimeRemaining: get().votingTime,
    });
    
    return true;
  },
  
  // Acciones - Fase de escritura
  submitResponse: (playerId, response) => {
    const { players, currentResponses } = get();
    const player = players.find(p => p.id === playerId);
    if (!player) return false;
    
    // Actualizar respuesta del jugador
    const updatedPlayers = players.map(p => 
      p.id === playerId ? { ...p, currentResponse: response.trim() } : p
    );
    
    // Agregar a respuestas anónimas (sin revelar el autor aún)
    const responseId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const newResponse = {
      id: responseId,
      response: response.trim(),
      playerId: playerId,
      votes: 0,
    };
    
    set({
      players: updatedPlayers,
      currentResponses: [...currentResponses, newResponse],
    });
    
    return true;
  },
  
  // Verificar si todos han respondido
  allPlayersResponded: () => {
    const { players, currentResponses } = get();
    return players.length > 0 && currentResponses.length === players.length;
  },
  
  // Acciones - Fase de votación
  startVotingPhase: () => {
    const { currentResponses } = get();
    // Mezclar respuestas para mostrarlas en orden aleatorio
    const shuffled = [...currentResponses].sort(() => Math.random() - 0.5);
    
    set({
      gameStatus: 'voting',
      currentResponses: shuffled,
      votingTimeRemaining: get().votingTime,
    });
  },
  
  submitVote: (voterPlayerId, responseId) => {
    const { players, currentResponses } = get();
    
    // Verificar que el jugador no vote por su propia respuesta
    const response = currentResponses.find(r => r.id === responseId);
    if (!response || response.playerId === voterPlayerId) {
      return false; // No puede votar por su propia respuesta
    }
    
    // Actualizar votos de la respuesta
    const updatedResponses = currentResponses.map(r =>
      r.id === responseId ? { ...r, votes: r.votes + 1 } : r
    );
    
    set({ currentResponses: updatedResponses });
    return true;
  },
  
  // Verificar si todos han votado
  allPlayersVoted: () => {
    const { players, currentResponses } = get();
    // Por simplicidad, verificamos si todas las respuestas tienen al menos un voto
    // En una implementación real, se debería rastrear qué jugadores ya votaron
    return currentResponses.every(r => r.votes > 0) && currentResponses.length > 0;
  },
  
  // Acciones - Finalización de ronda
  finishRound: () => {
    const { players, currentResponses, currentRound, maxRounds } = get();
    
    // Encontrar respuesta con más votos
    const winningResponse = currentResponses.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
    
    // Actualizar puntuación del ganador
    const updatedPlayers = players.map(p => {
      if (p.id === winningResponse.playerId) {
        return {
          ...p,
          score: p.score + (winningResponse.votes * GAME_CONFIG.POINTS_PER_VOTE),
        };
      }
      return p;
    });
    
    // Verificar si el juego terminó
    const nextRound = currentRound + 1;
    const isFinished = nextRound > maxRounds;
    
    set({
      players: updatedPlayers,
      gameStatus: isFinished ? 'finished' : 'results',
      currentRound: nextRound,
    });
    
    return isFinished;
  },
  
  // Acciones - Siguiente ronda
  startNextRound: () => {
    const { CONCEPT_PAIRS } = require('../constants/ConexionInesperadaConceptList');
    const randomPair = CONCEPT_PAIRS[Math.floor(Math.random() * CONCEPT_PAIRS.length)];
    
    // Limpiar respuestas de la ronda anterior
    const updatedPlayers = get().players.map(p => ({
      ...p,
      currentResponse: null,
      votes: 0,
    }));
    
    set({
      gameStatus: 'writing',
      currentConceptPair: randomPair,
      currentResponses: [],
      players: updatedPlayers,
      writingTimeRemaining: get().writingTime,
      votingTimeRemaining: get().votingTime,
    });
  },
  
  // Acciones - Temporizadores
  decrementWritingTime: () => {
    const { writingTimeRemaining, gameStatus } = get();
    if (gameStatus === 'writing' && writingTimeRemaining > 0) {
      const newTime = writingTimeRemaining - 1;
      set({ writingTimeRemaining: newTime });
      
      if (newTime === 0) {
        // Tiempo agotado, pasar a votación
        get().startVotingPhase();
      }
    }
  },
  
  decrementVotingTime: () => {
    const { votingTimeRemaining, gameStatus } = get();
    if (gameStatus === 'voting' && votingTimeRemaining > 0) {
      const newTime = votingTimeRemaining - 1;
      set({ votingTimeRemaining: newTime });
      
      if (newTime === 0) {
        // Tiempo agotado, finalizar ronda
        get().finishRound();
      }
    }
  },
  
  // Acciones - Reset
  resetGame: () => {
    const updatedPlayers = get().players.map(p => ({
      ...p,
      score: 0,
      currentResponse: null,
      votes: 0,
    }));
    
    set({
      gameStatus: 'setup',
      currentRound: 1,
      currentConceptPair: null,
      currentResponses: [],
      players: updatedPlayers,
      writingTimeRemaining: get().writingTime,
      votingTimeRemaining: get().votingTime,
    });
  },
  
  // Getters útiles
  getCurrentPlayer: (playerId) => {
    const { players } = get();
    return players.find(p => p.id === playerId) || null;
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
}));

