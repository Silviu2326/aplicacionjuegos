import { create } from 'zustand';
import { GAME_CONFIG } from '../constants/continuaLaFraseGameConfig';
import { GAME_PROMPTS } from '../constants/continuaLaFrasePrompts';

export const useContinuaLaFraseStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'lobby', 'writing', 'voting', 'results', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, currentResponse, votes }]
  currentPlayerId: null, // ID del jugador actual (local)
  
  // Ronda actual
  currentRound: 0,
  maxRounds: GAME_CONFIG.DEFAULT_ROUNDS,
  
  // Frase inicial de la ronda actual
  currentPrompt: null,
  
  // Respuestas de la ronda actual (anónimas para votación)
  currentResponses: [], // [{ id, response, playerId, votes }]
  
  // Votos de los jugadores (para rastrear quién ya votó)
  playerVotes: {}, // { playerId: responseId }
  
  // Temporizadores
  writingTimeRemaining: GAME_CONFIG.DEFAULT_WRITING_TIME,
  votingTimeRemaining: GAME_CONFIG.DEFAULT_VOTING_TIME,
  
  // Configuración
  writingTime: GAME_CONFIG.DEFAULT_WRITING_TIME,
  votingTime: GAME_CONFIG.DEFAULT_VOTING_TIME,
  
  // Código de la partida (para unirse)
  gameCode: null,
  
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
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    const validRounds = Math.max(
      GAME_CONFIG.MIN_ROUNDS,
      Math.min(GAME_CONFIG.MAX_ROUNDS, rounds)
    );
    set({ maxRounds: validRounds });
  },
  
  setWritingTime: (time) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_WRITING_TIME,
      Math.min(GAME_CONFIG.MAX_WRITING_TIME, time)
    );
    set({ writingTime: validTime, writingTimeRemaining: validTime });
  },
  
  setVotingTime: (time) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_VOTING_TIME,
      Math.min(GAME_CONFIG.MAX_VOTING_TIME, time)
    );
    set({ votingTime: validTime, votingTimeRemaining: validTime });
  },
  
  // Acciones - Crear/Unirse a partida
  createGame: () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    set({ gameCode: code, gameStatus: 'lobby' });
    return code;
  },
  
  joinGame: (code) => {
    // En una implementación real, esto validaría el código con un servidor
    set({ gameCode: code, gameStatus: 'lobby' });
    return true;
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Seleccionar primera frase
    const randomPrompt = GAME_PROMPTS[Math.floor(Math.random() * GAME_PROMPTS.length)];
    
    set({
      gameStatus: 'writing',
      currentRound: 1,
      currentPrompt: randomPrompt,
      currentResponses: [],
      playerVotes: {},
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
    
    // Verificar si ya respondió
    const alreadyResponded = currentResponses.some(r => r.playerId === playerId);
    if (alreadyResponded) return false;
    
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
      playerVotes: {},
      votingTimeRemaining: get().votingTime,
    });
  },
  
  submitVote: (voterPlayerId, responseId) => {
    const { players, currentResponses, playerVotes } = get();
    
    // Verificar que el jugador no vote por su propia respuesta
    const response = currentResponses.find(r => r.id === responseId);
    if (!response || response.playerId === voterPlayerId) {
      return false; // No puede votar por su propia respuesta
    }
    
    // Verificar que no haya votado ya
    if (playerVotes[voterPlayerId]) {
      return false; // Ya votó
    }
    
    // Actualizar votos de la respuesta
    const updatedResponses = currentResponses.map(r =>
      r.id === responseId ? { ...r, votes: r.votes + 1 } : r
    );
    
    // Registrar el voto del jugador
    const updatedVotes = { ...playerVotes, [voterPlayerId]: responseId };
    
    set({ 
      currentResponses: updatedResponses,
      playerVotes: updatedVotes,
    });
    return true;
  },
  
  // Verificar si todos han votado
  allPlayersVoted: () => {
    const { players, playerVotes } = get();
    return players.length > 0 && Object.keys(playerVotes).length === players.length;
  },
  
  // Acciones - Finalización de ronda
  finishRound: () => {
    const { players, currentResponses, currentRound, maxRounds } = get();
    
    // Calcular puntos: cada respuesta recibe puntos según sus votos
    const updatedPlayers = players.map(p => {
      const playerResponse = currentResponses.find(r => r.playerId === p.id);
      if (playerResponse) {
        const pointsEarned = playerResponse.votes * GAME_CONFIG.POINTS_PER_VOTE;
        return {
          ...p,
          score: p.score + pointsEarned,
          votes: playerResponse.votes,
        };
      }
      return { ...p, votes: 0 };
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
    // Seleccionar nueva frase (evitar repetir la misma)
    const { currentPrompt } = get();
    let newPrompt;
    do {
      newPrompt = GAME_PROMPTS[Math.floor(Math.random() * GAME_PROMPTS.length)];
    } while (newPrompt === currentPrompt && GAME_PROMPTS.length > 1);
    
    // Limpiar respuestas de la ronda anterior
    const updatedPlayers = get().players.map(p => ({
      ...p,
      currentResponse: null,
      votes: 0,
    }));
    
    set({
      gameStatus: 'writing',
      currentPrompt: newPrompt,
      currentResponses: [],
      playerVotes: {},
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
        // Tiempo agotado, pasar a votación si todos respondieron, sino forzar
        const { allPlayersResponded } = get();
        if (allPlayersResponded()) {
          get().startVotingPhase();
        } else {
          // Forzar inicio de votación aunque no todos hayan respondido
          get().startVotingPhase();
        }
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
      currentRound: 0,
      currentPrompt: null,
      currentResponses: [],
      playerVotes: {},
      players: updatedPlayers,
      writingTimeRemaining: get().writingTime,
      votingTimeRemaining: get().votingTime,
      gameCode: null,
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
  
  // Verificar si un jugador puede votar por una respuesta
  canVoteForResponse: (voterPlayerId, responseId) => {
    const { currentResponses, playerVotes } = get();
    const response = currentResponses.find(r => r.id === responseId);
    if (!response) return false;
    if (response.playerId === voterPlayerId) return false; // No puede votar por su propia respuesta
    if (playerVotes[voterPlayerId]) return false; // Ya votó
    return true;
  },
}));

