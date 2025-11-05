import { create } from 'zustand';
import { GAME_CONFIG } from '../constants/CadaverExquisitoGameConfig';

export const useCadaverExquisitoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'playing', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, order }]
  
  // Frases de la historia
  phrases: [], // [{ playerId, playerName, phrase, round, timestamp, wordCount }]
  
  // Turno actual
  currentPlayerIndex: 0,
  currentRound: 1,
  maxRounds: null, // null = ilimitado hasta que el host finalice
  
  // Configuración
  initialTheme: null, // tema inicial opcional
  turnTimeLimit: null, // tiempo límite por turno (en segundos)
  gameStartTime: null, // timestamp de inicio del juego
  gameEndTime: null, // timestamp de fin del juego
  
  // Historial de partidas
  gameHistory: [], // [{ id, date, players, phrases, duration, stats }]
  
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
    // Reordenar los índices
    const reorderedPlayers = updatedPlayers.map((p, index) => ({
      ...p,
      order: index,
    }));
    set({ players: reorderedPlayers });
  },
  
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds });
  },
  
  setInitialTheme: (theme) => {
    set({ initialTheme: theme });
  },
  
  setTurnTimeLimit: (seconds) => {
    set({ turnTimeLimit: seconds });
  },
  
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    const startTime = Date.now();
    set({
      gameStatus: 'playing',
      currentPlayerIndex: 0,
      currentRound: 1,
      phrases: [],
      gameStartTime: startTime,
      gameEndTime: null,
    });
    return true;
  },
  
  addPhrase: (phrase) => {
    const { players, currentPlayerIndex, currentRound, phrases } = get();
    if (currentPlayerIndex >= players.length || currentPlayerIndex < 0) {
      return false;
    }
    
    const currentPlayer = players[currentPlayerIndex];
    const trimmedPhrase = phrase.trim();
    const wordCount = trimmedPhrase.split(/\s+/).filter(word => word.length > 0).length;
    
    const newPhrase = {
      playerId: currentPlayer.id,
      playerName: currentPlayer.name,
      phrase: trimmedPhrase,
      round: currentRound,
      timestamp: Date.now(),
      wordCount: wordCount,
    };
    
    const updatedPhrases = [...phrases, newPhrase];
    
    // Determinar siguiente jugador
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const nextRound = nextPlayerIndex === 0 ? currentRound + 1 : currentRound;
    
    // Verificar si el juego debe terminar
    const { maxRounds } = get();
    const shouldFinish = maxRounds !== null && nextRound > maxRounds;
    
    const endTime = shouldFinish ? Date.now() : null;
    
    set({
      phrases: updatedPhrases,
      currentPlayerIndex: shouldFinish ? currentPlayerIndex : nextPlayerIndex,
      currentRound: shouldFinish ? currentRound : nextRound,
      gameStatus: shouldFinish ? 'finished' : 'playing',
      gameEndTime: endTime,
    });
    
    // Si el juego terminó, guardar en historial
    if (shouldFinish) {
      const { saveGameToHistory } = get();
      saveGameToHistory();
    }
    
    return true;
  },
  
  finishGame: () => {
    const endTime = Date.now();
    set({ 
      gameStatus: 'finished',
      gameEndTime: endTime,
    });
    
    // Guardar en historial
    const { saveGameToHistory } = get();
    saveGameToHistory();
  },
  
  resetGame: () => {
    set({
      gameStatus: 'setup',
      phrases: [],
      currentPlayerIndex: 0,
      currentRound: 1,
      maxRounds: null,
      initialTheme: null,
      turnTimeLimit: null,
      gameStartTime: null,
      gameEndTime: null,
    });
  },
  
  saveGameToHistory: () => {
    const { phrases, players, gameStartTime, gameEndTime, getGameStats } = get();
    if (phrases.length === 0) return;
    
    const duration = gameEndTime && gameStartTime ? 
      Math.round((gameEndTime - gameStartTime) / 1000) : 0; // en segundos
    
    const stats = getGameStats();
    
    const gameRecord = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      date: new Date().toISOString(),
      players: players.map(p => p.name),
      phrases: phrases.length,
      duration: duration,
      stats: stats,
    };
    
    set((state) => ({
      gameHistory: [...state.gameHistory, gameRecord].slice(-10), // Mantener solo las últimas 10 partidas
    }));
  },
  
  // Getters útiles
  getCurrentPlayer: () => {
    const { players, currentPlayerIndex } = get();
    return players[currentPlayerIndex] || null;
  },
  
  getLastVisiblePhrase: () => {
    const { phrases } = get();
    return phrases.length > 0 ? phrases[phrases.length - 1] : null;
  },
  
  getFullStory: () => {
    const { phrases } = get();
    return phrases;
  },
  
  isGameFinished: () => {
    const { gameStatus } = get();
    return gameStatus === 'finished';
  },
  
  // Estadísticas del juego
  getGameStats: () => {
    const { phrases, players } = get();
    if (phrases.length === 0) {
      return {
        totalPhrases: 0,
        totalWords: 0,
        averageWordsPerPhrase: 0,
        longestPhrase: null,
        shortestPhrase: null,
        phrasesPerPlayer: {},
        wordsPerPlayer: {},
        averageWordsPerPlayer: {},
      };
    }
    
    const totalWords = phrases.reduce((sum, p) => sum + (p.wordCount || 0), 0);
    const averageWordsPerPhrase = totalWords / phrases.length;
    
    const longestPhrase = phrases.reduce((longest, current) => 
      (current.wordCount || 0) > (longest.wordCount || 0) ? current : longest
    );
    
    const shortestPhrase = phrases.reduce((shortest, current) => 
      (current.wordCount || 0) < (shortest.wordCount || 0) ? current : shortest
    );
    
    // Estadísticas por jugador
    const phrasesPerPlayer = {};
    const wordsPerPlayer = {};
    
    players.forEach(player => {
      const playerPhrases = phrases.filter(p => p.playerId === player.id);
      phrasesPerPlayer[player.name] = playerPhrases.length;
      wordsPerPlayer[player.name] = playerPhrases.reduce((sum, p) => sum + (p.wordCount || 0), 0);
    });
    
    const averageWordsPerPlayer = {};
    players.forEach(player => {
      const count = phrasesPerPlayer[player.name];
      averageWordsPerPlayer[player.name] = count > 0 
        ? Math.round((wordsPerPlayer[player.name] / count) * 10) / 10 
        : 0;
    });
    
    return {
      totalPhrases: phrases.length,
      totalWords: totalWords,
      averageWordsPerPhrase: Math.round(averageWordsPerPhrase * 10) / 10,
      longestPhrase: longestPhrase,
      shortestPhrase: shortestPhrase,
      phrasesPerPlayer: phrasesPerPlayer,
      wordsPerPlayer: wordsPerPlayer,
      averageWordsPerPlayer: averageWordsPerPlayer,
    };
  },
  
  // Obtener el jugador más activo
  getMostActivePlayer: () => {
    const { phrases, players } = get();
    if (phrases.length === 0) return null;
    
    const phrasesCount = {};
    phrases.forEach(p => {
      phrasesCount[p.playerId] = (phrasesCount[p.playerId] || 0) + 1;
    });
    
    const mostActiveId = Object.keys(phrasesCount).reduce((a, b) => 
      phrasesCount[a] > phrasesCount[b] ? a : b
    );
    
    return players.find(p => p.id === mostActiveId) || null;
  },
  
  // Obtener el jugador con más palabras
  getMostWordyPlayer: () => {
    const { phrases, players } = get();
    if (phrases.length === 0) return null;
    
    const wordsCount = {};
    phrases.forEach(p => {
      wordsCount[p.playerId] = (wordsCount[p.playerId] || 0) + (p.wordCount || 0);
    });
    
    const mostWordyId = Object.keys(wordsCount).reduce((a, b) => 
      wordsCount[a] > wordsCount[b] ? a : b
    );
    
    return players.find(p => p.id === mostWordyId) || null;
  },
  
  // Obtener historial de partidas
  getGameHistory: () => {
    const { gameHistory } = get();
    return gameHistory;
  },
}));
