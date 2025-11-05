import { create } from 'zustand';
import { getUniqueQuestion } from '../constants/ElSuperlativoQuestions';

export const useElSuperlativoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'playing', 'finished'
  
  // Preguntas
  currentQuestion: null,
  previousQuestions: [], // Array de preguntas ya mostradas
  
  // Acciones - Inicio de partida
  startGame: () => {
    const question = getUniqueQuestion([]);
    set({
      gameStatus: 'playing',
      currentQuestion: question,
      previousQuestions: [question],
    });
  },
  
  // Acciones - Siguiente pregunta
  nextQuestion: () => {
    const { previousQuestions } = get();
    const question = getUniqueQuestion(previousQuestions);
    
    set({
      currentQuestion: question,
      previousQuestions: [...previousQuestions, question],
    });
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      currentQuestion: null,
      previousQuestions: [],
    });
  },
}));

