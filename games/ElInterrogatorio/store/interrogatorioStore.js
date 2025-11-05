import { create } from 'zustand';
import { getRandomSituation } from '../constants/interrogatorioSituations';

const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 10,
  DEFAULT_MAX_QUESTIONS: 20,
  MIN_QUESTIONS: 5,
  MAX_QUESTIONS: 50,
};

export const useInterrogatorioStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'asignacion', 'secreto', 'ronda', 'revelacion', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score }]
  currentSuspectIndex: null, // Índice del jugador que es el sospechoso actual
  
  // Ronda actual
  currentRound: 0,
  maxRounds: null, // null = ilimitado
  
  // Situación y juego
  currentSituation: null, // Situación secreta del sospechoso actual
  situationTheme: null, // Tema de situaciones seleccionado
  questionsRemaining: GAME_CONFIG.DEFAULT_MAX_QUESTIONS,
  maxQuestions: GAME_CONFIG.DEFAULT_MAX_QUESTIONS,
  questionHistory: [], // Historial de preguntas usadas en la ronda actual [{ question, timestamp }]
  
  // Acusación
  accusation: null, // Texto de la acusación final de los detectives
  accusationCorrect: false, // Si la acusación fue correcta
  accusationSimilarity: 0, // Porcentaje de similitud con la situación real
  
  // Estadísticas
  roundStats: [], // Estadísticas de cada ronda [{ round, suspect, correct, questionsUsed }]
  
  // Configuración
  maxQuestionsConfig: GAME_CONFIG.DEFAULT_MAX_QUESTIONS,
  
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
    const { players, currentSuspectIndex } = get();
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;
    
    const newPlayers = players.filter(p => p.id !== playerId);
    let newSuspectIndex = currentSuspectIndex;
    
    // Ajustar índice del sospechoso si es necesario
    if (playerIndex < currentSuspectIndex) {
      newSuspectIndex = Math.max(0, currentSuspectIndex - 1);
    } else if (playerIndex === currentSuspectIndex && newPlayers.length > 0) {
      newSuspectIndex = currentSuspectIndex % newPlayers.length;
    } else if (newPlayers.length === 0) {
      newSuspectIndex = null;
    }
    
    set({ players: newPlayers, currentSuspectIndex: newSuspectIndex });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds || null });
  },
  
  setMaxQuestions: (questions) => {
    const validQuestions = Math.max(
      GAME_CONFIG.MIN_QUESTIONS,
      Math.min(GAME_CONFIG.MAX_QUESTIONS, questions)
    );
    set({ 
      maxQuestionsConfig: validQuestions,
      maxQuestions: validQuestions,
      questionsRemaining: validQuestions,
    });
  },
  
  setSituationTheme: (theme) => {
    set({ situationTheme: theme });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    set({
      gameStatus: 'asignacion',
      currentRound: 1,
      currentSuspectIndex: 0,
      questionsRemaining: get().maxQuestionsConfig,
      accusation: null,
      accusationCorrect: false,
    });
    
    return true;
  },
  
  // Acciones - Asignación de sospechoso
  selectSuspect: () => {
    const { players } = get();
    if (players.length === 0) return;
    
    const randomIndex = Math.floor(Math.random() * players.length);
    set({ currentSuspectIndex: randomIndex });
  },
  
  // Acciones - Asignación de situación
  assignSituation: () => {
    const { situationTheme } = get();
    const situation = getRandomSituation(situationTheme);
    set({ 
      currentSituation: situation,
      questionsRemaining: get().maxQuestionsConfig,
      questionHistory: [],
      accusation: null,
      accusationCorrect: false,
      accusationSimilarity: 0,
    });
  },
  
  // Acciones - Fases del juego
  startSecretPhase: () => {
    get().assignSituation();
    set({ gameStatus: 'secreto' });
  },
  
  startRoundPhase: () => {
    set({ gameStatus: 'ronda' });
  },
  
  useQuestion: (questionText = '') => {
    const { questionsRemaining, questionHistory } = get();
    if (questionsRemaining > 0) {
      const newHistory = [...questionHistory, {
        question: questionText || `Pregunta ${questionHistory.length + 1}`,
        timestamp: Date.now(),
      }];
      set({ 
        questionsRemaining: questionsRemaining - 1,
        questionHistory: newHistory,
      });
      return true;
    }
    return false;
  },
  
  // Función auxiliar para calcular similitud entre dos textos
  calculateSimilarity: (text1, text2) => {
    if (!text1 || !text2) return 0;
    
    const normalize = (str) => str.toLowerCase().trim().replace(/[^\w\s]/g, '');
    const t1 = normalize(text1);
    const t2 = normalize(text2);
    
    // Comparación exacta
    if (t1 === t2) return 100;
    
    // Extraer palabras clave importantes
    const words1 = t1.split(/\s+/).filter(w => w.length > 3);
    const words2 = t2.split(/\s+/).filter(w => w.length > 3);
    
    // Contar palabras comunes
    const commonWords = words1.filter(w => words2.includes(w));
    const similarity = (commonWords.length / Math.max(words1.length, words2.length)) * 100;
    
    // Bonus por coincidencia de palabras clave importantes
    const importantWords = ['cambiaste', 'usaste', 'comiste', 'dijiste', 'enviaste', 'rompiste', 'ordenaste', 'pintaste', 'escondiste', 'adoptaste', 'hiciste'];
    const importantMatches = importantWords.filter(w => t1.includes(w) && t2.includes(w));
    const bonus = importantMatches.length * 10;
    
    return Math.min(100, Math.round(similarity + bonus));
  },
  
  submitAccusation: (accusationText) => {
    const { currentSituation, calculateSimilarity } = get();
    if (!currentSituation || !accusationText) {
      return false;
    }
    
    const similarity = calculateSimilarity(accusationText, currentSituation);
    // Considerar correcto si la similitud es mayor al 70%
    const isCorrect = similarity >= 70;
    
    set({
      accusation: accusationText.trim(),
      accusationCorrect: isCorrect,
      accusationSimilarity: similarity,
      gameStatus: 'revelacion',
    });
    
    return isCorrect;
  },
  
  endRound: () => {
    const { players, currentSuspectIndex, accusationCorrect, currentRound, questionHistory, maxQuestions } = get();
    const suspect = get().getCurrentSuspect();
    if (!suspect) return;
    
    // Guardar estadísticas de la ronda
    const roundStat = {
      round: currentRound,
      suspect: suspect.name,
      correct: accusationCorrect,
      questionsUsed: maxQuestions - get().questionsRemaining,
      totalQuestions: maxQuestions,
      questionHistory: [...questionHistory],
    };
    
    // Calcular puntuaciones
    const updatedPlayers = players.map(player => {
      let newScore = player.score;
      
      if (player.id === suspect.id) {
        // El sospechoso gana un punto si no lo adivinaron
        if (!accusationCorrect) {
          newScore += 1;
        }
      } else {
        // Los detectives ganan un punto cada uno si acertaron
        if (accusationCorrect) {
          newScore += 1;
        }
      }
      
      return { ...player, score: newScore };
    });
    
    const updatedRoundStats = [...get().roundStats, roundStat];
    
    set({
      players: updatedPlayers,
      roundStats: updatedRoundStats,
      gameStatus: 'finished',
    });
  },
  
  nextRound: () => {
    const { players, currentSuspectIndex, currentRound, maxRounds } = get();
    
    if (players.length === 0) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    const nextSuspectIndex = (currentSuspectIndex + 1) % players.length;
    const isNewRound = nextSuspectIndex === 0;
    const newRound = isNewRound ? currentRound + 1 : currentRound;
    
    // Verificar si el juego debe terminar
    const shouldFinish = maxRounds !== null && newRound > maxRounds;
    
    if (shouldFinish) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    set({
      currentSuspectIndex: nextSuspectIndex,
      currentRound: newRound,
      currentSituation: null,
      questionsRemaining: get().maxQuestionsConfig,
      questionHistory: [],
      accusation: null,
      accusationCorrect: false,
      accusationSimilarity: 0,
    });
    
    // Iniciar nueva ronda
    get().startSecretPhase();
  },
  
  // Acciones - Utilidades
  getCurrentSuspect: () => {
    const { players, currentSuspectIndex } = get();
    return currentSuspectIndex !== null && players[currentSuspectIndex] ? players[currentSuspectIndex] : null;
  },
  
  getDetectives: () => {
    const { players, currentSuspectIndex } = get();
    return players.filter((_, index) => index !== currentSuspectIndex);
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      players: [],
      currentSuspectIndex: null,
      currentRound: 0,
      maxRounds: null,
      currentSituation: null,
      situationTheme: null,
      questionsRemaining: GAME_CONFIG.DEFAULT_MAX_QUESTIONS,
      maxQuestions: GAME_CONFIG.DEFAULT_MAX_QUESTIONS,
      maxQuestionsConfig: GAME_CONFIG.DEFAULT_MAX_QUESTIONS,
      questionHistory: [],
      accusation: null,
      accusationCorrect: false,
      accusationSimilarity: 0,
      roundStats: [],
    });
  },
  
  // Acciones - Utilidades adicionales
  getRoundStats: () => {
    return get().roundStats;
  },
  
  getQuestionHistory: () => {
    return get().questionHistory;
  },
  
  clearQuestionHistory: () => {
    set({ questionHistory: [] });
  },
}));

