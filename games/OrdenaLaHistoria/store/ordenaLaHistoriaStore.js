import { create } from 'zustand';
import { getRandomStoryFromPackage, GAME_CONFIG } from '../constants/ordenaLaHistoriaStories';

const generateGameCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

const generatePlayerId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 9);
};

export const useOrdenaLaHistoriaStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'playing', 'results', 'finished'
  
  // Sala de juego
  gameCode: null,
  hostPlayerId: null,
  currentPlayerId: null,
  
  // Jugadores
  players: [], // [{ id, name, color, isHost, sentence, sentenceIndex, proposedOrder }]
  
  // Historia y frases
  selectedPackage: null,
  selectedStory: null,
  shuffledSentences: [], // Frases desordenadas para asignar
  assignedSentences: {}, // { playerId: sentence }
  correctOrder: [], // [playerId1, playerId2, ...] en orden correcto
  proposedOrder: [], // Orden propuesto por los jugadores
  
  // Temporizador
  timer: GAME_CONFIG.DEFAULT_TIMER,
  timerRemaining: GAME_CONFIG.DEFAULT_TIMER,
  isTimerRunning: false,
  
  // Resultado
  isCorrect: false,
  revealedStory: [], // Array con las frases en el orden propuesto
  
  // Colores para los jugadores
  playerColors: [
    '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', 
    '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#E74C3C',
  ],
  
  // Acciones - Gestión de partida
  createGame: (hostName, packageId) => {
    const gameCode = generateGameCode();
    const hostId = generatePlayerId();
    const hostPlayer = {
      id: hostId,
      name: hostName.trim(),
      color: get().playerColors[0],
      isHost: true,
      sentence: null,
      sentenceIndex: null,
      proposedOrder: null,
    };
    
    set({
      gameCode,
      hostPlayerId: hostId,
      currentPlayerId: hostId,
      players: [hostPlayer],
      gameStatus: 'lobby',
      selectedPackage: packageId,
      timer: GAME_CONFIG.DEFAULT_TIMER,
      timerRemaining: GAME_CONFIG.DEFAULT_TIMER,
    });
    
    return gameCode;
  },
  
  joinGame: (gameCode, playerName) => {
    // En un juego real, esto se conectaría a un backend
    // Por ahora, simulamos añadiendo al jugador localmente
    const state = get();
    const playerId = generatePlayerId();
    const colorIndex = state.players.length % state.playerColors.length;
    const newPlayer = {
      id: playerId,
      name: playerName.trim(),
      color: state.playerColors[colorIndex],
      isHost: false,
      sentence: null,
      sentenceIndex: null,
      proposedOrder: null,
    };
    
    set({
      players: [...state.players, newPlayer],
      currentPlayerId: playerId,
    });
    
    return playerId;
  },
  
  // Acciones - Configuración
  setPackage: (packageId) => {
    set({ selectedPackage: packageId });
  },
  
  setTimer: (seconds) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_TIMER,
      Math.min(GAME_CONFIG.MAX_TIMER, seconds)
    );
    set({ timer: validTime, timerRemaining: validTime });
  },
  
  // Acciones - Iniciar juego
  startGame: () => {
    const state = get();
    if (state.players.length < GAME_CONFIG.MIN_PLAYERS || 
        state.players.length > GAME_CONFIG.MAX_PLAYERS) {
      return false;
    }
    
    if (!state.selectedPackage) {
      return false;
    }
    
    // Seleccionar historia aleatoria del paquete
    const story = getRandomStoryFromPackage(state.selectedPackage);
    if (!story) {
      return false;
    }
    
    // Verificar que el número de jugadores coincida con el número de frases
    if (state.players.length !== story.sentences.length) {
      return false;
    }
    
    // Crear array de índices para mezclar
    const sentenceIndices = story.sentences.map((_, index) => index);
    const shuffledIndices = [...sentenceIndices].sort(() => Math.random() - 0.5);
    
    // Asignar frases a jugadores
    const assignedSentences = {};
    const shuffledSentences = [];
    const correctOrder = [];
    
    state.players.forEach((player, playerIndex) => {
      const sentenceIndex = shuffledIndices[playerIndex];
      const sentence = story.sentences[sentenceIndex];
      
      assignedSentences[player.id] = sentence;
      shuffledSentences.push({
        playerId: player.id,
        sentence,
        originalIndex: sentenceIndex,
      });
      
      // Construir orden correcto
      correctOrder[sentenceIndex] = player.id;
    });
    
    // Actualizar jugadores con sus frases
    const updatedPlayers = state.players.map((player) => {
      const sentenceIndex = shuffledIndices[state.players.indexOf(player)];
      return {
        ...player,
        sentence: assignedSentences[player.id],
        sentenceIndex,
      };
    });
    
    set({
      gameStatus: 'playing',
      selectedStory: story,
      assignedSentences,
      shuffledSentences,
      correctOrder: correctOrder.filter(Boolean), // Eliminar undefined
      players: updatedPlayers,
      timerRemaining: state.timer,
      isTimerRunning: true,
      proposedOrder: [],
    });
    
    return true;
  },
  
  // Acciones - Temporizador
  updateTimer: (remaining) => {
    set({ timerRemaining: remaining });
    if (remaining <= 0) {
      get().endGame();
    }
  },
  
  stopTimer: () => {
    set({ isTimerRunning: false });
  },
  
  // Acciones - Orden propuesto
  setPlayerProposedOrder: (playerId, order) => {
    const state = get();
    const updatedPlayers = state.players.map((player) =>
      player.id === playerId ? { ...player, proposedOrder: order } : player
    );
    set({ players: updatedPlayers });
  },
  
  setProposedOrder: (order) => {
    // order es un array de playerIds: [playerId1, playerId2, ...]
    set({ proposedOrder: order });
  },
  
  // Acciones - Finalizar juego
  endGame: () => {
    const state = get();
    const isCorrect = JSON.stringify(state.proposedOrder) === JSON.stringify(state.correctOrder);
    
    // Construir historia revelada en el orden propuesto
    const revealedStory = state.proposedOrder.map((playerId) => {
      const player = state.players.find((p) => p.id === playerId);
      return {
        playerId,
        playerName: player?.name || 'Jugador',
        sentence: state.assignedSentences[playerId] || '',
      };
    });
    
    set({
      gameStatus: 'results',
      isCorrect,
      revealedStory,
      isTimerRunning: false,
    });
  },
  
  // Acciones - Nueva ronda
  resetGame: () => {
    const state = get();
    const resetPlayers = state.players.map((player) => ({
      ...player,
      sentence: null,
      sentenceIndex: null,
      proposedOrder: null,
    }));
    
    set({
      gameStatus: 'lobby',
      selectedStory: null,
      assignedSentences: {},
      shuffledSentences: [],
      correctOrder: [],
      proposedOrder: [],
      players: resetPlayers,
      timerRemaining: state.timer,
      isTimerRunning: false,
      isCorrect: false,
      revealedStory: [],
    });
  },
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const state = get();
    if (state.players.length >= GAME_CONFIG.MAX_PLAYERS) {
      return null;
    }
    
    const playerId = generatePlayerId();
    const colorIndex = state.players.length % state.playerColors.length;
    const newPlayer = {
      id: playerId,
      name: name.trim(),
      color: state.playerColors[colorIndex],
      isHost: false,
      sentence: null,
      sentenceIndex: null,
      proposedOrder: null,
    };
    
    set({ players: [...state.players, newPlayer] });
    return playerId;
  },
  
  removePlayer: (playerId) => {
    const state = get();
    if (state.players.length <= 1) {
      return;
    }
    
    const updatedPlayers = state.players.filter((p) => p.id !== playerId);
    // Si se elimina el host, asignar nuevo host
    const removedPlayer = state.players.find((p) => p.id === playerId);
    if (removedPlayer?.isHost && updatedPlayers.length > 0) {
      updatedPlayers[0].isHost = true;
      set({ hostPlayerId: updatedPlayers[0].id, players: updatedPlayers });
    } else {
      set({ players: updatedPlayers });
    }
  },
  
  // Getters
  getCurrentPlayer: () => {
    const state = get();
    return state.players.find((p) => p.id === state.currentPlayerId);
  },
  
  getPlayerSentence: (playerId) => {
    const state = get();
    return state.assignedSentences[playerId] || null;
  },
  
  isHost: () => {
    const state = get();
    return state.currentPlayerId === state.hostPlayerId;
  },
}));
