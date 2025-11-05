import { create } from 'zustand';
import { getRandomCharacter } from '../constants/EntrevistadorInesperadoCharacters';

const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 10,
  DEFAULT_INTERVIEW_TIME: 300, // 5 minutos en segundos
  DEFAULT_GUESS_TIME: 60, // 1 minuto en segundos
  MIN_INTERVIEW_TIME: 60,
  MAX_INTERVIEW_TIME: 600,
  MIN_GUESS_TIME: 30,
  MAX_GUESS_TIME: 180,
  DEFAULT_POINTS_FOR_CORRECT_GUESS: 10,
  DEFAULT_POINTS_FOR_SECRET_KEPT: 15,
};

export const useEntrevistadorInesperadoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'reveal', 'playing', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score }]
  currentPlayerId: null, // ID del jugador actual (local)
  
  // Ronda actual
  currentRound: 0,
  currentIntervieweeIndex: 0, // Índice del jugador que es entrevistado
  maxRounds: null, // null = ilimitado
  
  // Personaje y adivinanzas
  currentCharacter: null, // Personaje secreto del entrevistado actual
  characterTheme: null, // Tema de personajes seleccionado
  guesses: {}, // { playerId: guessText }
  correctGuess: null, // ID del jugador que adivinó correctamente
  
  // Historial y estadísticas
  roundHistory: [], // [{ round, interviewee, character, correctGuess, guesses }]
  gameStats: {
    totalRounds: 0,
    totalGuesses: 0,
    correctGuesses: 0,
    secretsKept: 0,
  },
  
  // Temporizadores
  interviewTimeRemaining: GAME_CONFIG.DEFAULT_INTERVIEW_TIME,
  guessTimeRemaining: GAME_CONFIG.DEFAULT_GUESS_TIME,
  
  // Configuración
  interviewTime: GAME_CONFIG.DEFAULT_INTERVIEW_TIME,
  guessTime: GAME_CONFIG.DEFAULT_GUESS_TIME,
  pointsForCorrectGuess: GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS,
  pointsForSecretKept: GAME_CONFIG.DEFAULT_POINTS_FOR_SECRET_KEPT,
  
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
    const { players, currentIntervieweeIndex } = get();
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;
    
    const newPlayers = players.filter(p => p.id !== playerId);
    let newIntervieweeIndex = currentIntervieweeIndex;
    
    // Ajustar índice del entrevistado si es necesario
    if (playerIndex < currentIntervieweeIndex) {
      newIntervieweeIndex = Math.max(0, currentIntervieweeIndex - 1);
    } else if (playerIndex === currentIntervieweeIndex && newPlayers.length > 0) {
      newIntervieweeIndex = currentIntervieweeIndex % newPlayers.length;
    } else if (newPlayers.length === 0) {
      newIntervieweeIndex = 0;
    }
    
    set({ players: newPlayers, currentIntervieweeIndex: newIntervieweeIndex });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds || null });
  },
  
  setInterviewTime: (time) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_INTERVIEW_TIME,
      Math.min(GAME_CONFIG.MAX_INTERVIEW_TIME, time)
    );
    set({ interviewTime: validTime, interviewTimeRemaining: validTime });
  },
  
  setGuessTime: (time) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_GUESS_TIME,
      Math.min(GAME_CONFIG.MAX_GUESS_TIME, time)
    );
    set({ guessTime: validTime, guessTimeRemaining: validTime });
  },
  
  setPointsForCorrectGuess: (points) => {
    set({ pointsForCorrectGuess: Math.max(1, points) });
  },
  
  setPointsForSecretKept: (points) => {
    set({ pointsForSecretKept: Math.max(1, points) });
  },
  
  setCharacterTheme: (theme) => {
    set({ characterTheme: theme });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    set({
      gameStatus: 'setup',
      currentRound: 1,
      currentIntervieweeIndex: 0,
      guesses: {},
      correctGuess: null,
    });
    
    return true;
  },
  
  // Acciones - Asignación de personaje
  assignCharacter: () => {
    const { characterTheme } = get();
    const character = getRandomCharacter(characterTheme);
    set({ currentCharacter: character });
  },
  
  // Acciones - Fases del juego
  startRevealPhase: () => {
    const { interviewTime } = get();
    get().assignCharacter();
    set({
      gameStatus: 'reveal',
      interviewTimeRemaining: interviewTime,
      guesses: {},
      correctGuess: null,
    });
  },
  
  startGamePhase: () => {
    const { interviewTime } = get();
    set({
      gameStatus: 'playing',
      interviewTimeRemaining: interviewTime,
      guesses: {},
      correctGuess: null,
    });
  },
  
  submitGuess: (playerId, guessText) => {
    const { guesses, currentCharacter } = get();
    const isCorrect = currentCharacter && 
      guessText.toLowerCase().trim() === currentCharacter.toLowerCase().trim();
    
    set({
      guesses: {
        ...guesses,
        [playerId]: guessText.trim(),
      },
      correctGuess: isCorrect ? playerId : (get().correctGuess || null),
    });
    
    // Si alguien adivinó correctamente, terminar la ronda
    if (isCorrect) {
      get().endRound();
    }
    
    return isCorrect;
  },
  
  endRound: () => {
    const { players, currentCharacter, correctGuess, pointsForCorrectGuess, pointsForSecretKept, currentRound, guesses, roundHistory, gameStats } = get();
    const interviewee = get().getCurrentInterviewee();
    if (!interviewee) return;
    
    // Calcular puntuaciones
    const updatedPlayers = players.map(player => {
      let newScore = player.score;
      
      if (player.id === interviewee.id) {
        // El entrevistado gana puntos si mantuvo su secreto
        if (!correctGuess) {
          newScore += pointsForSecretKept;
        }
      } else if (player.id === correctGuess) {
        // El que adivinó gana puntos
        newScore += pointsForCorrectGuess;
      }
      
      return { ...player, score: newScore };
    });
    
    // Guardar historial de la ronda
    const roundRecord = {
      round: currentRound,
      interviewee: interviewee.name,
      intervieweeId: interviewee.id,
      character: currentCharacter,
      correctGuess: correctGuess ? players.find(p => p.id === correctGuess)?.name : null,
      correctGuessId: correctGuess,
      guesses: { ...guesses },
      totalGuesses: Object.keys(guesses).length,
      wasSecretKept: !correctGuess,
    };
    
    // Actualizar estadísticas
    const updatedStats = {
      totalRounds: gameStats.totalRounds + 1,
      totalGuesses: gameStats.totalGuesses + Object.keys(guesses).length,
      correctGuesses: gameStats.correctGuesses + (correctGuess ? 1 : 0),
      secretsKept: gameStats.secretsKept + (!correctGuess ? 1 : 0),
    };
    
    set({
      players: updatedPlayers,
      gameStatus: 'finished',
      roundHistory: [...roundHistory, roundRecord],
      gameStats: updatedStats,
    });
  },
  
  nextTurn: () => {
    const { players, currentIntervieweeIndex, currentRound, maxRounds } = get();
    
    if (players.length === 0) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    const nextIntervieweeIndex = (currentIntervieweeIndex + 1) % players.length;
    const isNewRound = nextIntervieweeIndex === 0;
    const newRound = isNewRound ? currentRound + 1 : currentRound;
    
    // Verificar si el juego debe terminar
    const shouldFinish = maxRounds !== null && newRound > maxRounds;
    
    if (shouldFinish) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    set({
      currentIntervieweeIndex: nextIntervieweeIndex,
      currentRound: newRound,
      currentCharacter: null,
      guesses: {},
      correctGuess: null,
    });
    
    // Iniciar nueva ronda
    get().startRevealPhase();
  },
  
  // Acciones - Temporizadores
  decrementInterviewTime: () => {
    const { interviewTimeRemaining, gameStatus } = get();
    if (gameStatus === 'playing' && interviewTimeRemaining > 0) {
      set({ interviewTimeRemaining: interviewTimeRemaining - 1 });
    } else if (gameStatus === 'playing' && interviewTimeRemaining === 0) {
      // Tiempo agotado, pasar a fase de adivinanza
      get().startGuessPhase();
    }
  },
  
  startGuessPhase: () => {
    const { guessTime } = get();
    set({
      gameStatus: 'guessing',
      guessTimeRemaining: guessTime,
    });
  },
  
  decrementGuessTime: () => {
    const { guessTimeRemaining, gameStatus } = get();
    if (gameStatus === 'guessing' && guessTimeRemaining > 0) {
      set({ guessTimeRemaining: guessTimeRemaining - 1 });
    } else if (gameStatus === 'guessing' && guessTimeRemaining === 0) {
      // Tiempo agotado, terminar ronda
      get().endRound();
    }
  },
  
  // Acciones - Utilidades
  getCurrentInterviewee: () => {
    const { players, currentIntervieweeIndex } = get();
    return players[currentIntervieweeIndex] || null;
  },
  
  isCurrentPlayerInterviewee: () => {
    const { currentPlayerId } = get();
    const interviewee = get().getCurrentInterviewee();
    return interviewee && currentPlayerId === interviewee.id;
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      players: [],
      currentPlayerId: null,
      currentRound: 0,
      currentIntervieweeIndex: 0,
      currentCharacter: null,
      characterTheme: null,
      guesses: {},
      correctGuess: null,
      interviewTimeRemaining: GAME_CONFIG.DEFAULT_INTERVIEW_TIME,
      guessTimeRemaining: GAME_CONFIG.DEFAULT_GUESS_TIME,
      interviewTime: GAME_CONFIG.DEFAULT_INTERVIEW_TIME,
      guessTime: GAME_CONFIG.DEFAULT_GUESS_TIME,
      pointsForCorrectGuess: GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS,
      pointsForSecretKept: GAME_CONFIG.DEFAULT_POINTS_FOR_SECRET_KEPT,
      maxRounds: null,
      roundHistory: [],
      gameStats: {
        totalRounds: 0,
        totalGuesses: 0,
        correctGuesses: 0,
        secretsKept: 0,
      },
    });
  },
}));

