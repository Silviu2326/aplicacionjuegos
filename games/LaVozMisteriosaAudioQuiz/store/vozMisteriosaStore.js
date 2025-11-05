import { create } from 'zustand';

const GAME_CONFIG = {
  MIN_PLAYERS: 1,
  MAX_PLAYERS: 10,
  DEFAULT_TIME_PER_QUESTION: 30, // segundos
  DEFAULT_MAX_REPLAYS: 2, // número de veces que se puede repetir el audio
};

export const useVozMisteriosaStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'playing', 'results', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score }]
  currentPlayerIndex: 0, // Índice del jugador actual
  
  // Configuración del juego
  gameMode: 'multijugador', // 'solitario' o 'multijugador'
  selectedCategories: [], // Categorías seleccionadas
  maxRounds: null, // null = ilimitado, número = número de rondas
  targetScore: null, // null = sin límite, número = puntuación objetivo
  timePerQuestion: GAME_CONFIG.DEFAULT_TIME_PER_QUESTION,
  maxReplays: GAME_CONFIG.DEFAULT_MAX_REPLAYS,
  
  // Ronda actual
  currentRound: 0,
  currentQuestion: null, // { category, audioUrl, question, correctAnswer, options?, type }
  currentPlayerAnswer: null,
  currentPlayerAnswerCorrect: false,
  timeRemaining: 0,
  replaysUsed: 0,
  
  // Temporizador
  timerInterval: null,
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      return null;
    }
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players, currentPlayerIndex } = get();
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;
    
    const newPlayers = players.filter(p => p.id !== playerId);
    let newCurrentPlayerIndex = currentPlayerIndex;
    
    // Ajustar índice del jugador actual si es necesario
    if (playerIndex < currentPlayerIndex) {
      newCurrentPlayerIndex = Math.max(0, currentPlayerIndex - 1);
    } else if (playerIndex === currentPlayerIndex && newPlayers.length > 0) {
      newCurrentPlayerIndex = currentPlayerIndex % newPlayers.length;
    } else if (newPlayers.length === 0) {
      newCurrentPlayerIndex = 0;
    }
    
    set({ players: newPlayers, currentPlayerIndex: newCurrentPlayerIndex });
  },
  
  // Acciones - Configuración del juego
  setGameMode: (mode) => {
    set({ gameMode: mode });
  },
  
  setSelectedCategories: (categories) => {
    set({ selectedCategories: categories });
  },
  
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds || null });
  },
  
  setTargetScore: (score) => {
    set({ targetScore: score || null });
  },
  
  setTimePerQuestion: (time) => {
    set({ timePerQuestion: time || GAME_CONFIG.DEFAULT_TIME_PER_QUESTION });
  },
  
  setMaxReplays: (replays) => {
    set({ maxReplays: replays || GAME_CONFIG.DEFAULT_MAX_REPLAYS });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players, gameMode, selectedCategories } = get();
    
    if (gameMode === 'multijugador' && players.length < 2) {
      return false;
    }
    
    if (selectedCategories.length === 0) {
      return false;
    }
    
    set({
      gameStatus: 'playing',
      currentRound: 1,
      currentPlayerIndex: 0,
      currentQuestion: null,
      currentPlayerAnswer: null,
      currentPlayerAnswerCorrect: false,
      timeRemaining: 0,
      replaysUsed: 0,
    });
    
    return true;
  },
  
  // Acciones - Selección de pregunta
  selectQuestion: (question) => {
    set({
      currentQuestion: question,
      currentPlayerAnswer: null,
      currentPlayerAnswerCorrect: false,
      timeRemaining: get().timePerQuestion,
      replaysUsed: 0,
    });
  },
  
  // Acciones - Reproducción de audio
  incrementReplays: () => {
    const { replaysUsed, maxReplays } = get();
    if (replaysUsed < maxReplays) {
      set({ replaysUsed: replaysUsed + 1 });
      return true;
    }
    return false;
  },
  
  // Acciones - Respuesta del jugador
  submitAnswer: (answer) => {
    const { currentQuestion } = get();
    if (!currentQuestion) return false;
    
    const isCorrect = currentQuestion.type === 'multiple_choice'
      ? answer === currentQuestion.correctAnswer
      : answer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();
    
    const currentPlayer = get().getCurrentPlayer();
    if (currentPlayer && isCorrect) {
      const updatedPlayers = get().players.map(player =>
        player.id === currentPlayer.id
          ? { ...player, score: player.score + 1 }
          : player
      );
      set({ players: updatedPlayers });
    }
    
    set({
      currentPlayerAnswer: answer,
      currentPlayerAnswerCorrect: isCorrect,
      gameStatus: 'results',
    });
    
    return isCorrect;
  },
  
  // Acciones - Siguiente turno/jugador
  nextTurn: () => {
    const { players, currentPlayerIndex, currentRound, maxRounds, targetScore } = get();
    
    // Verificar si el juego debe terminar
    const shouldFinishByRounds = maxRounds !== null && currentRound >= maxRounds;
    const shouldFinishByScore = targetScore !== null && 
      players.some(p => p.score >= targetScore);
    
    if (shouldFinishByRounds || shouldFinishByScore) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    // Avanzar al siguiente jugador o ronda
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const isNewRound = nextPlayerIndex === 0;
    const newRound = isNewRound ? currentRound + 1 : currentRound;
    
    set({
      currentPlayerIndex: nextPlayerIndex,
      currentRound: newRound,
      currentQuestion: null,
      currentPlayerAnswer: null,
      currentPlayerAnswerCorrect: false,
      timeRemaining: 0,
      replaysUsed: 0,
      gameStatus: 'playing',
    });
  },
  
  // Acciones - Temporizador
  startTimer: () => {
    const interval = setInterval(() => {
      const { timeRemaining } = get();
      if (timeRemaining > 0) {
        set({ timeRemaining: timeRemaining - 1 });
      } else {
        // Tiempo agotado
        const { currentQuestion } = get();
        if (currentQuestion) {
          get().submitAnswer(''); // Respuesta vacía = tiempo agotado
        }
        get().stopTimer();
      }
    }, 1000);
    
    set({ timerInterval: interval });
  },
  
  stopTimer: () => {
    const { timerInterval } = get();
    if (timerInterval) {
      clearInterval(timerInterval);
      set({ timerInterval: null });
    }
  },
  
  // Acciones - Utilidades
  getCurrentPlayer: () => {
    const { players, currentPlayerIndex } = get();
    return currentPlayerIndex < players.length ? players[currentPlayerIndex] : null;
  },
  
  getWinner: () => {
    const { players } = get();
    if (players.length === 0) return null;
    
    const maxScore = Math.max(...players.map(p => p.score));
    const winners = players.filter(p => p.score === maxScore);
    
    return winners.length === 1 ? winners[0] : winners;
  },
  
  // Acciones - Reset
  resetGame: () => {
    get().stopTimer();
    set({
      gameStatus: 'lobby',
      players: [],
      currentPlayerIndex: 0,
      gameMode: 'multijugador',
      selectedCategories: [],
      maxRounds: null,
      targetScore: null,
      timePerQuestion: GAME_CONFIG.DEFAULT_TIME_PER_QUESTION,
      maxReplays: GAME_CONFIG.DEFAULT_MAX_REPLAYS,
      currentRound: 0,
      currentQuestion: null,
      currentPlayerAnswer: null,
      currentPlayerAnswerCorrect: false,
      timeRemaining: 0,
      replaysUsed: 0,
      timerInterval: null,
    });
  },
}));

