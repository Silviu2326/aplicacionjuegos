import { create } from 'zustand';
import { GAME_CONFIG } from '../constants/cadenaEmojisConstants';

export const useCadenaEmojisStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'playing', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, order }]
  
  // Cadena de emojis y narraciones
  emojiChain: [], // [{ emoji, playerId, playerName, narration, timestamp }]
  
  // Turno actual
  currentPlayerIndex: 0,
  maxEmojis: GAME_CONFIG.DEFAULT_MAX_EMOJIS,
  turnTime: GAME_CONFIG.DEFAULT_TURN_TIME,
  theme: null, // tema opcional
  
  // Configuración de sala
  roomCode: null,
  
  // Estadísticas del juego
  gameStats: {
    startTime: null,
    endTime: null,
    totalTurns: 0,
    playerStats: {}, // { playerId: { emojisAdded: 0, narrationsCount: 0, totalChars: 0 } }
  },
  
  // Acciones
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      order: players.length,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players } = get();
    const updatedPlayers = players.filter(p => p.id !== playerId);
    const reorderedPlayers = updatedPlayers.map((p, index) => ({
      ...p,
      order: index,
    }));
    set({ players: reorderedPlayers });
  },
  
  setMaxEmojis: (maxEmojis) => {
    set({ maxEmojis: Math.max(GAME_CONFIG.MIN_EMOJIS, Math.min(GAME_CONFIG.MAX_EMOJIS_LIMIT, maxEmojis)) });
  },
  
  setTurnTime: (turnTime) => {
    set({ turnTime: Math.max(GAME_CONFIG.MIN_TURN_TIME, Math.min(GAME_CONFIG.MAX_TURN_TIME, turnTime)) });
  },
  
  setTheme: (theme) => {
    set({ theme });
  },
  
  generateRoomCode: () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    set({ roomCode: code });
    return code;
  },
  
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Seleccionar jugador inicial aleatorio
    const initialPlayerIndex = Math.floor(Math.random() * players.length);
    
    // Inicializar estadísticas
    const playerStats = {};
    players.forEach(player => {
      playerStats[player.id] = {
        emojisAdded: 0,
        narrationsCount: 0,
        totalChars: 0,
      };
    });
    
    set({
      gameStatus: 'playing',
      currentPlayerIndex: initialPlayerIndex,
      emojiChain: [],
      gameStats: {
        startTime: Date.now(),
        endTime: null,
        totalTurns: 0,
        playerStats,
      },
    });
    return true;
  },
  
  addEmojiToChain: (emoji, narration) => {
    const { players, currentPlayerIndex, emojiChain, maxEmojis, gameStats } = get();
    if (currentPlayerIndex >= players.length || currentPlayerIndex < 0) {
      return false;
    }
    
    const currentPlayer = players[currentPlayerIndex];
    const narrationText = narration ? narration.trim() : '';
    const newEntry = {
      emoji,
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      narration: narrationText,
      timestamp: Date.now(),
    };
    
    const updatedChain = [...emojiChain, newEntry];
    
    // Actualizar estadísticas
    const updatedStats = { ...gameStats };
    updatedStats.totalTurns += 1;
    if (!updatedStats.playerStats[currentPlayer.id]) {
      updatedStats.playerStats[currentPlayer.id] = {
        emojisAdded: 0,
        narrationsCount: 0,
        totalChars: 0,
      };
    }
    updatedStats.playerStats[currentPlayer.id].emojisAdded += 1;
    if (narrationText) {
      updatedStats.playerStats[currentPlayer.id].narrationsCount += 1;
      updatedStats.playerStats[currentPlayer.id].totalChars += narrationText.length;
    }
    
    // Verificar si se alcanzó el límite de emojis
    const shouldFinish = updatedChain.length >= maxEmojis;
    if (shouldFinish) {
      updatedStats.endTime = Date.now();
    }
    
    // Determinar siguiente jugador
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    
    set({
      emojiChain: updatedChain,
      currentPlayerIndex: shouldFinish ? currentPlayerIndex : nextPlayerIndex,
      gameStatus: shouldFinish ? 'finished' : 'playing',
      gameStats: updatedStats,
    });
    
    return true;
  },
  
  finishGame: () => {
    const { gameStats } = get();
    const updatedStats = { ...gameStats };
    if (!updatedStats.endTime) {
      updatedStats.endTime = Date.now();
    }
    set({ gameStatus: 'finished', gameStats: updatedStats });
  },
  
  resetGame: () => {
    set({
      gameStatus: 'setup',
      emojiChain: [],
      currentPlayerIndex: 0,
      maxEmojis: GAME_CONFIG.DEFAULT_MAX_EMOJIS,
      turnTime: GAME_CONFIG.DEFAULT_TURN_TIME,
      theme: null,
      roomCode: null,
      gameStats: {
        startTime: null,
        endTime: null,
        totalTurns: 0,
        playerStats: {},
      },
    });
  },
  
  // Getters útiles
  getCurrentPlayer: () => {
    const { players, currentPlayerIndex } = get();
    return players[currentPlayerIndex] || null;
  },
  
  getFullChain: () => {
    const { emojiChain } = get();
    return emojiChain;
  },
  
  getChainAsString: () => {
    const { emojiChain } = get();
    return emojiChain.map(entry => entry.emoji).join('');
  },
  
  getFullNarration: () => {
    const { emojiChain } = get();
    return emojiChain.map(entry => entry.narration).filter(n => n).join(' ');
  },
  
  isGameFinished: () => {
    const { gameStatus } = get();
    return gameStatus === 'finished';
  },
  
  canAddMoreEmojis: () => {
    const { emojiChain, maxEmojis } = get();
    return emojiChain.length < maxEmojis;
  },
  
  // Getters de estadísticas
  getGameStats: () => {
    const { gameStats, emojiChain, players, maxEmojis } = get();
    
    const totalNarrations = emojiChain.filter(e => e.narration).length;
    const narrations = emojiChain.map(e => e.narration).filter(n => n);
    const longestNarration = narrations.length > 0 
      ? narrations.reduce((a, b) => a.length > b.length ? a : b, '')
      : '';
    const shortestNarration = narrations.length > 0
      ? narrations.reduce((a, b) => a.length < b.length ? a : b, narrations[0])
      : '';
    
    const duration = gameStats.endTime && gameStats.startTime
      ? Math.floor((gameStats.endTime - gameStats.startTime) / 1000)
      : gameStats.startTime
      ? Math.floor((Date.now() - gameStats.startTime) / 1000)
      : 0;
    
    const playerStatsArray = players.map(player => ({
      ...player,
      stats: gameStats.playerStats[player.id] || { emojisAdded: 0, narrationsCount: 0, totalChars: 0 },
    }));
    
    return {
      totalEmojis: emojiChain.length,
      totalPlayers: players.length,
      averageEmojisPerPlayer: players.length > 0 ? (emojiChain.length / players.length).toFixed(1) : 0,
      totalNarrations,
      longestNarration,
      shortestNarration,
      gameDuration: duration,
      playerStats: playerStatsArray,
      maxEmojis,
    };
  },
  
  getPlayerContribution: (playerId) => {
    const { emojiChain, gameStats } = get();
    const playerEntries = emojiChain.filter(e => e.playerId === playerId);
    const stats = gameStats.playerStats[playerId] || { emojisAdded: 0, narrationsCount: 0, totalChars: 0 };
    
    return {
      emojisCount: playerEntries.length,
      narrationsCount: stats.narrationsCount,
      totalChars: stats.totalChars,
      entries: playerEntries,
    };
  },
}));

