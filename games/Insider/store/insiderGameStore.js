import { create } from 'zustand';
import { GAME_STATUS, GAME_RESULT, ROLES } from '../constants/insiderGameConfig';
import { getRandomWordFromCategory, getRandomWord } from '../constants/insiderWordList';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useInsiderGameStore = create((set, get) => ({
  // Estado del juego
  gameStatus: GAME_STATUS.SETUP,
  
  // Jugadores
  players: [],
  guideIndex: null,
  insiderIndex: null,
  
  // Palabra secreta
  secretWord: null,
  selectedCategory: null,
  
  // Fase de preguntas
  questions: [], // Array de { playerId, question, answer, timestamp }
  wordGuessed: false,
  guessedWord: null,
  guessedBy: null,
  timeRemaining: null,
  
  // Fase de discusión y votación
  discussionPhase: false,
  votes: {}, // { voterId: votedPlayerId }
  
  // Resultados
  gameResult: null,
  accusedPlayer: null,
  
  // Configuración
  questioningTime: 5 * 60 * 1000, // 5 minutos
  discussionTime: 3 * 60 * 1000, // 3 minutos
  
  // Acciones
  addPlayer: (playerName) => {
    const state = get();
    if (state.players.find(p => p.name === playerName)) {
      return false; // Nombre ya existe
    }
    
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name: playerName,
      role: null, // Se asignará al iniciar
    };
    
    set({
      players: [...state.players, newPlayer],
    });
    return true;
  },
  
  removePlayer: (playerId) => {
    const state = get();
    set({
      players: state.players.filter(p => p.id !== playerId),
    });
  },
  
  startGame: () => {
    const state = get();
    if (state.players.length < 4 || state.players.length > 8) {
      return false; // Mínimo 4, máximo 8 jugadores
    }
    
    // Asignar roles aleatoriamente
    const shuffledPlayers = shuffleArray([...state.players]);
    const guideIndex = Math.floor(Math.random() * shuffledPlayers.length);
    let insiderIndex;
    
    // Asegurar que el Infiltrado no sea el Guía
    do {
      insiderIndex = Math.floor(Math.random() * shuffledPlayers.length);
    } while (insiderIndex === guideIndex);
    
    const playersWithRoles = shuffledPlayers.map((player, index) => {
      let role;
      if (index === guideIndex) {
        role = ROLES.GUIDE;
      } else if (index === insiderIndex) {
        role = ROLES.INSIDER;
      } else {
        role = ROLES.CITIZEN;
      }
      
      return {
        ...player,
        role,
      };
    });
    
    // Mapear índices originales
    const originalGuideIndex = state.players.findIndex(p => p.id === shuffledPlayers[guideIndex].id);
    const originalInsiderIndex = state.players.findIndex(p => p.id === shuffledPlayers[insiderIndex].id);
    
    set({
      players: playersWithRoles,
      guideIndex: originalGuideIndex,
      insiderIndex: originalInsiderIndex,
      gameStatus: GAME_STATUS.ROLE_REVEAL,
      questions: [],
      wordGuessed: false,
      guessedWord: null,
      guessedBy: null,
      votes: {},
      discussionPhase: false,
      gameResult: null,
      accusedPlayer: null,
    });
    
    return true;
  },
  
  selectCategoryAndWord: (category) => {
    const word = getRandomWordFromCategory(category) || getRandomWord();
    if (!word) return false;
    
    set({
      selectedCategory: category,
      secretWord: word,
    });
    
    return true;
  },
  
  revealRoleToPlayer: (playerId) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player) return null;
    
    if (player.role === ROLES.GUIDE) {
      return { role: ROLES.GUIDE, word: state.secretWord };
    } else if (player.role === ROLES.INSIDER) {
      return { role: ROLES.INSIDER, word: state.secretWord };
    } else {
      return { role: ROLES.CITIZEN, word: null };
    }
  },
  
  startQuestioning: () => {
    set({
      gameStatus: GAME_STATUS.QUESTIONING,
      timeRemaining: get().questioningTime,
      questions: [],
      wordGuessed: false,
    });
    
    // Iniciar temporizador
    const interval = setInterval(() => {
      const state = get();
      if (state.gameStatus !== GAME_STATUS.QUESTIONING || state.wordGuessed) {
        clearInterval(interval);
        return;
      }
      
      const newTime = state.timeRemaining - 1000;
      if (newTime <= 0) {
        clearInterval(interval);
        // Tiempo agotado
        set({
          gameStatus: GAME_STATUS.RESULTS,
          gameResult: GAME_RESULT.TIME_OUT,
          timeRemaining: 0,
        });
      } else {
        set({ timeRemaining: newTime });
      }
    }, 1000);
  },
  
  askQuestion: (playerId, question) => {
    const state = get();
    if (state.gameStatus !== GAME_STATUS.QUESTIONING) return false;
    
    const newQuestion = {
      id: Date.now().toString(),
      playerId,
      question: question.trim(),
      answer: null, // El Guía debe responder
      timestamp: Date.now(),
    };
    
    set({
      questions: [...state.questions, newQuestion],
    });
    
    return newQuestion.id;
  },
  
  answerQuestion: (questionId, answer) => {
    const state = get();
    const questions = state.questions.map(q => {
      if (q.id === questionId && q.answer === null) {
        return { ...q, answer }; // 'yes', 'no', 'dont-know'
      }
      return q;
    });
    
    set({ questions });
  },
  
  guessWord: (playerId, guessedWord) => {
    const state = get();
    if (state.gameStatus !== GAME_STATUS.QUESTIONING || state.wordGuessed) {
      return false;
    }
    
    const correct = guessedWord.toLowerCase().trim() === state.secretWord.toLowerCase().trim();
    
    set({
      wordGuessed: true,
      guessedWord: guessedWord.trim(),
      guessedBy: playerId,
      gameStatus: correct ? GAME_STATUS.DISCUSSION : GAME_STATUS.QUESTIONING,
      timeRemaining: null,
    });
    
    if (correct) {
      // Iniciar fase de discusión
      set({
        discussionPhase: true,
        timeRemaining: get().discussionTime,
      });
      
      // Temporizador de discusión
      const interval = setInterval(() => {
        const state = get();
        if (state.gameStatus !== GAME_STATUS.DISCUSSION) {
          clearInterval(interval);
          return;
        }
        
        const newTime = state.timeRemaining - 1000;
        if (newTime <= 0) {
          clearInterval(interval);
          set({
            gameStatus: GAME_STATUS.VOTING,
            discussionPhase: false,
            timeRemaining: null,
          });
        } else {
          set({ timeRemaining: newTime });
        }
      }, 1000);
    }
    
    return correct;
  },
  
  startVoting: () => {
    set({
      gameStatus: GAME_STATUS.VOTING,
      discussionPhase: false,
      votes: {},
    });
  },
  
  castVote: (voterId, votedPlayerId) => {
    const state = get();
    set({
      votes: {
        ...state.votes,
        [voterId]: votedPlayerId,
      },
    });
  },
  
  finishVoting: () => {
    const state = get();
    const votes = state.votes;
    const voteCounts = {};
    
    // Contar votos
    Object.values(votes).forEach((votedId) => {
      voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
    });
    
    // Encontrar el más votado
    const maxVotes = Math.max(...Object.values(voteCounts), 0);
    const mostVoted = Object.keys(voteCounts).find(
      (id) => voteCounts[id] === maxVotes
    );
    
    const insiderPlayer = state.players[state.insiderIndex];
    const accusedPlayer = state.players.find(p => p.id === mostVoted);
    
    set({
      accusedPlayer: accusedPlayer || null,
      gameStatus: GAME_STATUS.RESULTS,
    });
    
    if (mostVoted === insiderPlayer.id) {
      // El Infiltrado fue descubierto
      set({
        gameResult: GAME_RESULT.CITIZENS_WIN,
      });
    } else {
      // Un Ciudadano inocente fue acusado
      set({
        gameResult: GAME_RESULT.INSIDER_WINS,
      });
    }
  },
  
  resetGame: () => {
    set({
      gameStatus: GAME_STATUS.SETUP,
      players: [],
      guideIndex: null,
      insiderIndex: null,
      secretWord: null,
      selectedCategory: null,
      questions: [],
      wordGuessed: false,
      guessedWord: null,
      guessedBy: null,
      timeRemaining: null,
      discussionPhase: false,
      votes: {},
      gameResult: null,
      accusedPlayer: null,
    });
  },
}));

