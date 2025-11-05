import { create } from 'zustand';
import { CITAS_DATA } from '../constants/MaestroCitasData';

const DEFAULT_GAME_CONFIG = {
  MIN_ROUNDS: 5,
  MAX_ROUNDS: 50,
  DEFAULT_ROUNDS: 10,
  DEFAULT_TIME_PER_QUESTION: 30,
  MIN_TIME_PER_QUESTION: 10,
  MAX_TIME_PER_QUESTION: 60,
  POINTS_PER_CORRECT: 100,
  BONUS_POINTS_FAST: 50, // Puntos extra por responder rápido
  FAST_THRESHOLD: 10, // Segundos para considerar respuesta rápida
};

export const useMaestroCitasStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'playing', 'finished'
  
  // Configuración del juego
  gameMode: 'single', // 'single' o 'multiplayer'
  numRounds: DEFAULT_GAME_CONFIG.DEFAULT_ROUNDS,
  timePerQuestion: DEFAULT_GAME_CONFIG.DEFAULT_TIME_PER_QUESTION,
  selectedCategories: [], // Array de categorías seleccionadas
  
  // Ronda actual
  currentRound: 0,
  currentQuote: null, // { id, quote, options, correctAnswer, category }
  timeRemaining: DEFAULT_GAME_CONFIG.DEFAULT_TIME_PER_QUESTION,
  
  // Jugadores
  players: [], // [{ id, name, score, correctAnswers }]
  currentPlayerId: null, // ID del jugador actual (para modo multijugador local)
  
  // Estado de la ronda actual
  selectedAnswer: null, // ID de la opción seleccionada
  answerRevealed: false, // Si ya se reveló la respuesta correcta
  roundStartTime: null, // Timestamp cuando comenzó la ronda
  
  // Citas usadas en esta partida
  usedQuotes: [], // Array de IDs de citas ya usadas
  
  // Historial de respuestas
  answerHistory: [], // [{ round, quote, selectedAnswer, correctAnswer, isCorrect, timeTaken, points }]
  
  // Acciones - Configuración del juego
  setGameMode: (mode) => {
    set({ gameMode: mode });
  },
  
  setNumRounds: (rounds) => {
    const validRounds = Math.max(
      DEFAULT_GAME_CONFIG.MIN_ROUNDS,
      Math.min(DEFAULT_GAME_CONFIG.MAX_ROUNDS, rounds)
    );
    set({ numRounds: validRounds });
  },
  
  setTimePerQuestion: (time) => {
    const validTime = Math.max(
      DEFAULT_GAME_CONFIG.MIN_TIME_PER_QUESTION,
      Math.min(DEFAULT_GAME_CONFIG.MAX_TIME_PER_QUESTION, time)
    );
    set({ timePerQuestion: validTime });
  },
  
  setSelectedCategories: (categories) => {
    set({ selectedCategories: categories });
  },
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
      correctAnswers: 0,
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
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players, gameMode, numRounds, selectedCategories } = get();
    
    // Si es modo multijugador y no hay jugadores, crear uno por defecto
    if (gameMode === 'multiplayer' && players.length === 0) {
      get().addPlayer('Jugador 1');
    }
    
    // Si es modo single y no hay jugador, crear uno
    if (gameMode === 'single' && players.length === 0) {
      const playerId = get().addPlayer('Jugador');
      get().setCurrentPlayer(playerId);
    }
    
    // Seleccionar primera cita
    const firstQuote = get().getRandomQuote(selectedCategories);
    
    set({
      gameStatus: 'playing',
      currentRound: 1,
      currentQuote: firstQuote,
      timeRemaining: get().timePerQuestion,
      selectedAnswer: null,
      answerRevealed: false,
      roundStartTime: Date.now(),
      usedQuotes: [firstQuote.id],
      answerHistory: [],
    });
    
    return true;
  },
  
  // Obtener una cita aleatoria (no usada)
  getRandomQuote: (categories = []) => {
    const { usedQuotes } = get();
    let availableQuotes = CITAS_DATA;
    
    // Filtrar por categorías si se especificaron
    if (categories.length > 0) {
      availableQuotes = availableQuotes.filter(quote => 
        categories.includes(quote.category)
      );
    }
    
    // Filtrar citas ya usadas
    const unusedQuotes = availableQuotes.filter(quote => 
      !usedQuotes.includes(quote.id)
    );
    
    // Si no hay citas disponibles, resetear las usadas
    const quotesToUse = unusedQuotes.length > 0 ? unusedQuotes : availableQuotes;
    
    // Seleccionar una cita aleatoria
    const randomIndex = Math.floor(Math.random() * quotesToUse.length);
    return quotesToUse[randomIndex];
  },
  
  // Acciones - Selección de respuesta
  selectAnswer: (answerId) => {
    const { selectedAnswer, answerRevealed, currentQuote, roundStartTime } = get();
    
    // No permitir cambiar respuesta si ya se reveló
    if (answerRevealed) return false;
    
    // No permitir cambiar respuesta si ya se seleccionó una
    if (selectedAnswer !== null) return false;
    
    const timeTaken = roundStartTime ? Math.floor((Date.now() - roundStartTime) / 1000) : get().timePerQuestion;
    
    set({ 
      selectedAnswer: answerId,
      timeRemaining: 0, // Detener el temporizador
    });
    
    // Revelar respuesta automáticamente
    setTimeout(() => {
      get().revealAnswer(timeTaken);
    }, 500);
    
    return true;
  },
  
  // Revelar respuesta y calcular puntos
  revealAnswer: (timeTaken) => {
    const { currentQuote, selectedAnswer, currentRound, players, currentPlayerId, gameMode, timePerQuestion } = get();
    
    if (!currentQuote || selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === currentQuote.correctAnswer;
    const isFast = timeTaken <= DEFAULT_GAME_CONFIG.FAST_THRESHOLD;
    
    // Calcular puntos
    let points = 0;
    if (isCorrect) {
      points = DEFAULT_GAME_CONFIG.POINTS_PER_CORRECT;
      if (isFast) {
        points += DEFAULT_GAME_CONFIG.BONUS_POINTS_FAST;
      }
    }
    
    // Actualizar puntuación del jugador
    const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
    const updatedPlayers = players.map(p => {
      if (p.id === effectivePlayerId) {
        return {
          ...p,
          score: p.score + points,
          correctAnswers: isCorrect ? p.correctAnswers + 1 : p.correctAnswers,
        };
      }
      return p;
    });
    
    // Agregar al historial
    const historyEntry = {
      round: currentRound,
      quote: currentQuote.quote,
      category: currentQuote.category,
      selectedAnswer: selectedAnswer,
      correctAnswer: currentQuote.correctAnswer,
      isCorrect: isCorrect,
      timeTaken: timeTaken,
      points: points,
    };
    
    set({
      answerRevealed: true,
      players: updatedPlayers,
      answerHistory: [...get().answerHistory, historyEntry],
    });
  },
  
  // Avanzar a la siguiente ronda
  nextRound: () => {
    const { currentRound, numRounds, selectedCategories, usedQuotes } = get();
    
    // Verificar si el juego terminó
    if (currentRound >= numRounds) {
      get().finishGame();
      return;
    }
    
    // Seleccionar siguiente cita
    const nextQuote = get().getRandomQuote(selectedCategories);
    
    set({
      currentRound: currentRound + 1,
      currentQuote: nextQuote,
      timeRemaining: get().timePerQuestion,
      selectedAnswer: null,
      answerRevealed: false,
      roundStartTime: Date.now(),
      usedQuotes: [...usedQuotes, nextQuote.id],
    });
  },
  
  // Finalizar juego
  finishGame: () => {
    set({ gameStatus: 'finished' });
  },
  
  // Temporizador
  decrementTime: () => {
    const { timeRemaining, gameStatus, selectedAnswer, answerRevealed } = get();
    
    if (gameStatus === 'playing' && timeRemaining > 0 && selectedAnswer === null && !answerRevealed) {
      const newTime = timeRemaining - 1;
      set({ timeRemaining: newTime });
      
      if (newTime === 0) {
        // Tiempo agotado, revelar respuesta (incorrecta automáticamente)
        const timeTaken = get().timePerQuestion;
        get().revealAnswer(timeTaken);
      }
    }
  },
  
  // Reset del juego
  resetGame: () => {
    const updatedPlayers = get().players.map(p => ({
      ...p,
      score: 0,
      correctAnswers: 0,
    }));
    
    set({
      gameStatus: 'lobby',
      currentRound: 0,
      currentQuote: null,
      timeRemaining: get().timePerQuestion,
      selectedAnswer: null,
      answerRevealed: false,
      roundStartTime: null,
      usedQuotes: [],
      answerHistory: [],
      players: updatedPlayers,
    });
  },
  
  // Getters útiles
  getCurrentPlayer: () => {
    const { players, currentPlayerId } = get();
    const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
    return players.find(p => p.id === effectivePlayerId) || null;
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

