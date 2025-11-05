import { create } from 'zustand';
import { QUESTIONS, CATEGORIES, GAME_MODES } from '../constants/QuePrefieresExtremoQuestions';

// Estadísticas globales falsas para hacer el juego más interesante
const generateFakeGlobalStats = () => {
  const fakeStats = {};
  QUESTIONS.forEach((q) => {
    const total = Math.floor(Math.random() * 5000) + 100; // Entre 100 y 5100 respuestas
    const option1Count = Math.floor(Math.random() * total);
    fakeStats[q.id] = {
      option1: option1Count,
      option2: total - option1Count,
      total: total,
    };
  });
  return fakeStats;
};

export const useQuePrefieresExtremoStore = create((set, get) => ({
  // Estado del juego
  currentQuestionIndex: 0,
  viewedQuestions: [],
  selectedQuestions: [],
  currentQuestion: null,
  
  // Estadísticas
  globalStats: generateFakeGlobalStats(), // Estadísticas falsas generadas
  sessionStats: {}, // Estadísticas de la sesión actual
  
  // Configuración
  selectedCategories: [], // Categorías seleccionadas (vacío = todas)
  gameMode: 'normal', // 'normal', 'fiesta', 'profundo', 'extremo', 'rapido'
  
  // Historial
  gameHistory: [], // Historial de preguntas respondidas en esta sesión
  
  // Acciones
  getFilteredQuestions: () => {
    const state = get();
    let filtered = [...QUESTIONS];
    
    // Filtrar por categorías seleccionadas
    if (state.selectedCategories.length > 0) {
      filtered = filtered.filter(q => state.selectedCategories.includes(q.category));
    }
    
    // Filtrar por modo de juego
    if (state.gameMode === 'fiesta') {
      filtered = filtered.filter(q => 
        ['absurdo', 'comida', 'social'].includes(q.category)
      );
    } else if (state.gameMode === 'profundo') {
      filtered = filtered.filter(q => 
        ['filosofico', 'moral'].includes(q.category)
      );
    } else if (state.gameMode === 'extremo') {
      filtered = filtered.filter(q => q.difficulty === 'alto');
    } else if (state.gameMode === 'rapido') {
      filtered = filtered.filter(q => q.difficulty === 'bajo');
    }
    
    return filtered;
  },
  
  getCurrentQuestion: () => {
    const state = get();
    const availableQuestions = state.getFilteredQuestions().filter(
      q => !state.viewedQuestions.includes(q.id)
    );
    
    if (availableQuestions.length === 0) {
      // Si no hay más preguntas, reiniciar las vistas
      set({ viewedQuestions: [] });
      const resetQuestions = state.getFilteredQuestions();
      if (resetQuestions.length === 0) {
        return null;
      }
      const randomIndex = Math.floor(Math.random() * resetQuestions.length);
      return resetQuestions[randomIndex];
    }
    
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    
    set({ currentQuestion: question });
    return question;
  },
  
  nextQuestion: () => {
    const state = get();
    const question = state.getCurrentQuestion();
    
    if (question) {
      set({
        currentQuestionIndex: state.currentQuestionIndex + 1,
        viewedQuestions: [...state.viewedQuestions, question.id],
        currentQuestion: question,
      });
      return question;
    }
    
    return null;
  },
  
  selectOption: (questionId, optionIndex) => {
    set((state) => {
      // Actualizar estadísticas de sesión
      const currentSessionStats = state.sessionStats[questionId] || { option1: 0, option2: 0 };
      const updatedSessionStats = {
        ...state.sessionStats,
        [questionId]: {
          ...currentSessionStats,
          [`option${optionIndex + 1}`]: currentSessionStats[`option${optionIndex + 1}`] + 1,
        },
      };
      
      // Añadir al historial
      const question = QUESTIONS.find(q => q.id === questionId);
      const historyEntry = {
        questionId,
        question,
        selectedOption: optionIndex,
        timestamp: Date.now(),
      };
      
      return {
        sessionStats: updatedSessionStats,
        gameHistory: [...state.gameHistory, historyEntry],
      };
    });
  },
  
  getQuestionStats: (questionId) => {
    const state = get();
    const global = state.globalStats[questionId] || { option1: 0, option2: 0, total: 0 };
    const session = state.sessionStats[questionId] || { option1: 0, option2: 0 };
    
    // Combinar estadísticas globales falsas con las de sesión
    const totalGlobal = global.total || (global.option1 + global.option2);
    const totalSession = session.option1 + session.option2;
    const totalCombined = totalGlobal + totalSession;
    
    if (totalCombined === 0) {
      return { 
        option1: 0, 
        option2: 0, 
        option1Percent: 0, 
        option2Percent: 0,
        total: 0,
      };
    }
    
    const option1Total = global.option1 + session.option1;
    const option2Total = global.option2 + session.option2;
    
    return {
      option1: option1Total,
      option2: option2Total,
      option1Percent: Math.round((option1Total / totalCombined) * 100),
      option2Percent: Math.round((option2Total / totalCombined) * 100),
      total: totalCombined,
    };
  },
  
  setGameMode: (mode) => {
    const validModes = GAME_MODES.map(m => m.id);
    if (validModes.includes(mode)) {
      set({ gameMode: mode, viewedQuestions: [] }); // Reset vistas al cambiar modo
    }
  },
  
  setCategories: (categories) => {
    const validCategories = CATEGORIES.map(c => c.id);
    const filtered = categories.filter(c => validCategories.includes(c));
    set({ selectedCategories: filtered, viewedQuestions: [] }); // Reset vistas al cambiar categorías
  },
  
  toggleCategory: (categoryId) => {
    set((state) => {
      const current = state.selectedCategories;
      const newCategories = current.includes(categoryId)
        ? current.filter(c => c !== categoryId)
        : [...current, categoryId];
      return { 
        selectedCategories: newCategories,
        viewedQuestions: [], // Reset vistas al cambiar categorías
      };
    });
  },
  
  getSessionStats: () => {
    const state = get();
    const totalQuestions = state.gameHistory.length;
    const categoryStats = {};
    
    state.gameHistory.forEach((entry) => {
      if (entry.question) {
        const cat = entry.question.category;
        if (!categoryStats[cat]) {
          categoryStats[cat] = { count: 0, options: { option1: 0, option2: 0 } };
        }
        categoryStats[cat].count++;
        categoryStats[cat].options[`option${entry.selectedOption + 1}`]++;
      }
    });
    
    return {
      totalQuestions,
      categoryStats,
      history: state.gameHistory,
    };
  },
  
  reset: () => set({
    currentQuestionIndex: 0,
    viewedQuestions: [],
    selectedQuestions: [],
    currentQuestion: null,
    sessionStats: {},
    gameHistory: [],
    gameMode: 'normal',
    selectedCategories: [],
  }),
  
  resetSession: () => set({
    currentQuestionIndex: 0,
    viewedQuestions: [],
    selectedQuestions: [],
    currentQuestion: null,
    sessionStats: {},
    gameHistory: [],
  }),
}));

