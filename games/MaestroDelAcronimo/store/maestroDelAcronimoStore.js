import { create } from 'zustand';
import { GAME_CONFIG } from '../constants/MaestroDelAcronimoConfig';
import { generateRandomAcronym } from '../utils/maestroDelAcronimoGenerator';

export const useMaestroDelAcronimoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'lobby', 'writing', 'voting', 'results', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, currentPhrase, votes }]
  currentPlayerId: null, // ID del jugador actual (local)
  
  // Ronda actual
  currentRound: 0,
  maxRounds: GAME_CONFIG.DEFAULT_ROUNDS,
  
  // Acrónimo de la ronda actual
  currentAcronym: null,
  usedAcronyms: [], // Array de acrónimos ya usados
  
  // Frases de la ronda actual (anónimas para votación)
  currentPhrases: [], // [{ id, phrase, playerId, votes }]
  
  // Votos de los jugadores (para rastrear quién ya votó)
  playerVotes: {}, // { playerId: phraseId }
  
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
      currentPhrase: null,
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
    const { players, usedAcronyms } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Generar primer acrónimo
    const randomAcronym = generateRandomAcronym(usedAcronyms);
    
    set({
      gameStatus: 'writing',
      currentRound: 1,
      currentAcronym: randomAcronym,
      usedAcronyms: [...usedAcronyms, randomAcronym],
      currentPhrases: [],
      playerVotes: {},
      writingTimeRemaining: get().writingTime,
      votingTimeRemaining: get().votingTime,
    });
    
    return true;
  },
  
  // Acciones - Fase de escritura
  submitPhrase: (playerId, phrase) => {
    const { players, currentPhrases, currentAcronym } = get();
    const player = players.find(p => p.id === playerId);
    if (!player) return false;
    
    // Verificar si ya respondió
    const alreadyResponded = currentPhrases.some(p => p.playerId === playerId);
    if (alreadyResponded) return false;
    
    // Actualizar frase del jugador
    const updatedPlayers = players.map(p => 
      p.id === playerId ? { ...p, currentPhrase: phrase.trim() } : p
    );
    
    // Agregar a frases anónimas (sin revelar el autor aún)
    const phraseId = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const newPhrase = {
      id: phraseId,
      phrase: phrase.trim(),
      playerId: playerId,
      votes: 0,
    };
    
    set({
      players: updatedPlayers,
      currentPhrases: [...currentPhrases, newPhrase],
    });
    
    return true;
  },
  
  // Verificar si todos han respondido
  allPlayersResponded: () => {
    const { players, currentPhrases } = get();
    return players.length > 0 && currentPhrases.length === players.length;
  },
  
  // Acciones - Fase de votación
  startVotingPhase: () => {
    const { currentPhrases } = get();
    // Mezclar frases para mostrarlas en orden aleatorio
    const shuffled = [...currentPhrases].sort(() => Math.random() - 0.5);
    
    set({
      gameStatus: 'voting',
      currentPhrases: shuffled,
      playerVotes: {},
      votingTimeRemaining: get().votingTime,
    });
  },
  
  submitVote: (voterPlayerId, phraseId) => {
    const { players, currentPhrases, playerVotes } = get();
    
    // Verificar que el jugador no vote por su propia frase
    const phrase = currentPhrases.find(p => p.id === phraseId);
    if (!phrase || phrase.playerId === voterPlayerId) {
      return false; // No puede votar por su propia frase
    }
    
    // Verificar que no haya votado ya
    if (playerVotes[voterPlayerId]) {
      return false; // Ya votó
    }
    
    // Actualizar votos de la frase
    const updatedPhrases = currentPhrases.map(p =>
      p.id === phraseId ? { ...p, votes: p.votes + 1 } : p
    );
    
    // Registrar el voto del jugador
    const updatedVotes = { ...playerVotes, [voterPlayerId]: phraseId };
    
    set({ 
      currentPhrases: updatedPhrases,
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
    const { players, currentPhrases, currentRound, maxRounds } = get();
    
    // Calcular puntos: cada frase recibe puntos según sus votos
    const updatedPlayers = players.map(p => {
      const playerPhrase = currentPhrases.find(ph => ph.playerId === p.id);
      if (playerPhrase) {
        const pointsEarned = playerPhrase.votes * GAME_CONFIG.POINTS_PER_VOTE;
        return {
          ...p,
          score: p.score + pointsEarned,
          votes: playerPhrase.votes,
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
    // Generar nuevo acrónimo (evitar repetir)
    const { usedAcronyms } = get();
    const newAcronym = generateRandomAcronym(usedAcronyms);
    
    // Limpiar frases de la ronda anterior
    const updatedPlayers = get().players.map(p => ({
      ...p,
      currentPhrase: null,
      votes: 0,
    }));
    
    set({
      gameStatus: 'writing',
      currentAcronym: newAcronym,
      usedAcronyms: [...usedAcronyms, newAcronym],
      currentPhrases: [],
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
        // Tiempo agotado, pasar a votación
        const { allPlayersResponded } = get();
        if (allPlayersResponded() || true) { // Siempre pasar a votación aunque no todos respondan
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
      currentPhrase: null,
      votes: 0,
    }));
    
    set({
      gameStatus: 'setup',
      currentRound: 0,
      currentAcronym: null,
      usedAcronyms: [],
      currentPhrases: [],
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
  
  // Verificar si un jugador puede votar por una frase
  canVoteForPhrase: (voterPlayerId, phraseId) => {
    const { currentPhrases, playerVotes } = get();
    const phrase = currentPhrases.find(p => p.id === phraseId);
    if (!phrase) return false;
    if (phrase.playerId === voterPlayerId) return false; // No puede votar por su propia frase
    if (playerVotes[voterPlayerId]) return false; // Ya votó
    return true;
  },
}));

