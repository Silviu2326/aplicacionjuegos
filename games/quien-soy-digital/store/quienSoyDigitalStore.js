import { create } from 'zustand';
import { DECKS, DEFAULT_TIME_LIMIT } from '../constants/QuienSoyDigitalDecks';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useQuienSoyDigitalStore = create((set, get) => ({
  // Estado del juego
  selectedDeck: null,
  currentWordIndex: 0,
  words: [],
  timeRemaining: DEFAULT_TIME_LIMIT,
  gameStatus: 'setup', // 'setup', 'playing', 'results', 'finished'
  
  // Estadísticas de la ronda actual
  currentPlayer: 1,
  correctAnswers: 0,
  passedWords: 0,
  roundHistory: [], // [{ word, guessed: boolean, timeSpent: number }]
  
  // Configuración
  timeLimit: DEFAULT_TIME_LIMIT,
  
  // Acciones
  selectDeck: (deckId) => {
    const deck = DECKS[deckId];
    if (!deck) return;
    
    const shuffledWords = shuffleArray(deck.words);
    
    set({
      selectedDeck: deck,
      words: shuffledWords,
      currentWordIndex: 0,
      gameStatus: 'playing',
      timeRemaining: get().timeLimit,
      correctAnswers: 0,
      passedWords: 0,
      roundHistory: [],
    });
  },
  
  getCurrentWord: () => {
    const state = get();
    if (state.words.length === 0 || state.currentWordIndex >= state.words.length) {
      return null;
    }
    return state.words[state.currentWordIndex];
  },
  
  markAsCorrect: () => {
    const state = get();
    const currentWord = state.words[state.currentWordIndex];
    
    set({
      correctAnswers: state.correctAnswers + 1,
      roundHistory: [
        ...state.roundHistory,
        { word: currentWord, guessed: true, timeSpent: state.timeLimit - state.timeRemaining },
      ],
      currentWordIndex: state.currentWordIndex + 1,
    });
    
    // Si no hay más palabras, terminar la ronda
    if (state.currentWordIndex + 1 >= state.words.length) {
      set({ gameStatus: 'results' });
    }
  },
  
  passWord: () => {
    const state = get();
    const currentWord = state.words[state.currentWordIndex];
    
    set({
      passedWords: state.passedWords + 1,
      roundHistory: [
        ...state.roundHistory,
        { word: currentWord, guessed: false, timeSpent: state.timeLimit - state.timeRemaining },
      ],
      currentWordIndex: state.currentWordIndex + 1,
    });
    
    // Si no hay más palabras, terminar la ronda
    if (state.currentWordIndex + 1 >= state.words.length) {
      set({ gameStatus: 'results' });
    }
  },
  
  updateTimeRemaining: (time) => {
    set({ timeRemaining: time });
    
    if (time <= 0) {
      set({ gameStatus: 'results' });
    }
  },
  
  nextPlayer: () => {
    const state = get();
    set({
      currentPlayer: state.currentPlayer + 1,
      currentWordIndex: 0,
      gameStatus: 'setup',
      correctAnswers: 0,
      passedWords: 0,
      roundHistory: [],
      timeRemaining: state.timeLimit,
      words: state.selectedDeck ? shuffleArray(state.selectedDeck.words) : [],
    });
  },
  
  resetGame: () => {
    set({
      selectedDeck: null,
      currentWordIndex: 0,
      words: [],
      timeRemaining: DEFAULT_TIME_LIMIT,
      gameStatus: 'setup',
      currentPlayer: 1,
      correctAnswers: 0,
      passedWords: 0,
      roundHistory: [],
      timeLimit: DEFAULT_TIME_LIMIT,
    });
  },
  
  setTimeLimit: (seconds) => {
    set({ timeLimit: seconds, timeRemaining: seconds });
  },
  
  startNewRound: () => {
    const state = get();
    if (!state.selectedDeck) return;
    
    const shuffledWords = shuffleArray(state.selectedDeck.words);
    set({
      words: shuffledWords,
      currentWordIndex: 0,
      gameStatus: 'playing',
      timeRemaining: state.timeLimit,
      correctAnswers: 0,
      passedWords: 0,
      roundHistory: [],
    });
  },
}));

