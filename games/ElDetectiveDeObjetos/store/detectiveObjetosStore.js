import { create } from 'zustand';
import { DETECTIVE_OBJETOS_CONFIG } from '../constants/detectiveObjetosConfig';

export const useDetectiveObjetosStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'photo-capture', 'playing', 'round-end', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score }]
  currentPlayerId: null, // ID del jugador actual (local)
  
  // Ronda actual
  currentRound: 0,
  currentPhotographerIndex: 0, // Índice del jugador que es fotógrafo
  maxRounds: DETECTIVE_OBJETOS_CONFIG.DEFAULT_MAX_ROUNDS,
  
  // Estado de la foto y zoom
  currentImageUri: null, // URI de la imagen capturada
  currentZoomLevel: 0, // Índice en ZOOM_LEVELS (0 = máximo zoom)
  maxZoomLevels: DETECTIVE_OBJETOS_CONFIG.ZOOM_LEVELS.length,
  guessesCount: 0, // Número de intentos en la ronda actual
  
  // Turno actual
  currentDetectiveIndex: 0, // Índice del detective actual en turno (excluyendo fotógrafo)
  
  // Resultado de la ronda
  roundWinner: null, // { playerId, playerName } o null si ganó el fotógrafo
  roundEnded: false,
  
  // Historial y estadísticas
  roundHistory: [], // [{ round, photographer, winner, zoomLevelsUsed, guesses }]
  playerStats: {}, // { [playerId]: { correctGuesses, roundsWon, roundsAsPhotographer } }
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= DETECTIVE_OBJETOS_CONFIG.MAX_PLAYERS) {
      return null;
    }
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
      correctGuesses: 0,
      roundsWon: 0,
      roundsAsPhotographer: 0,
    };
    const { playerStats } = get();
    set({ 
      players: [...players, newPlayer],
      playerStats: {
        ...playerStats,
        [newPlayer.id]: { correctGuesses: 0, roundsWon: 0, roundsAsPhotographer: 0 },
      },
    });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players, currentPhotographerIndex } = get();
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;
    
    const newPlayers = players.filter(p => p.id !== playerId);
    let newPhotographerIndex = currentPhotographerIndex;
    
    // Ajustar índice del fotógrafo si es necesario
    if (playerIndex < currentPhotographerIndex) {
      newPhotographerIndex = Math.max(0, currentPhotographerIndex - 1);
    } else if (playerIndex === currentPhotographerIndex && newPlayers.length > 0) {
      newPhotographerIndex = currentPhotographerIndex % newPlayers.length;
    } else if (newPlayers.length === 0) {
      newPhotographerIndex = 0;
    }
    
    set({ players: newPlayers, currentPhotographerIndex: newPhotographerIndex });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds || null });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Inicializar estadísticas de jugadores
    const initialStats = {};
    players.forEach(player => {
      initialStats[player.id] = {
        correctGuesses: 0,
        roundsWon: 0,
        roundsAsPhotographer: 0,
      };
    });
    
    set({
      gameStatus: 'photo-capture',
      currentRound: 1,
      currentPhotographerIndex: 0,
      currentZoomLevel: 0,
      currentImageUri: null,
      currentDetectiveIndex: 0,
      roundWinner: null,
      roundEnded: false,
      roundHistory: [],
      playerStats: initialStats,
      guessesCount: 0, // Contador de intentos en la ronda actual
    });
    
    return true;
  },
  
  // Acciones - Captura de foto
  setCurrentImage: (imageUri) => {
    set({
      currentImageUri: imageUri,
      currentZoomLevel: 0, // Empezar con máximo zoom
      gameStatus: 'playing',
      roundEnded: false,
      roundWinner: null,
      guessesCount: 0,
    });
  },
  
  // Acciones - Gestión de turnos y zoom
  handleIncorrectGuess: () => {
    const { currentZoomLevel, maxZoomLevels, guessesCount } = get();
    const newZoomLevel = currentZoomLevel + 1;
    
    // Si se alcanza el máximo zoom level, el fotógrafo gana
    if (newZoomLevel >= maxZoomLevels) {
      get().endRoundWithPhotographerWin();
      return;
    }
    
    // Avanzar al siguiente detective
    const nextDetectiveIndex = get().getNextDetectiveIndex();
    
    set({
      currentZoomLevel: newZoomLevel,
      currentDetectiveIndex: nextDetectiveIndex,
      guessesCount: guessesCount + 1,
    });
  },
  
  handleCorrectGuess: (detectiveId) => {
    const { players, playerStats, guessesCount } = get();
    const detective = players.find(p => p.id === detectiveId);
    
    if (!detective) return;
    
    // Incrementar puntuación del detective
    const updatedPlayers = players.map(player => 
      player.id === detectiveId 
        ? { 
            ...player, 
            score: player.score + DETECTIVE_OBJETOS_CONFIG.POINTS_FOR_CORRECT_GUESS,
            correctGuesses: (player.correctGuesses || 0) + 1,
            roundsWon: (player.roundsWon || 0) + 1,
          }
        : player
    );
    
    // Actualizar estadísticas
    const updatedStats = {
      ...playerStats,
      [detectiveId]: {
        ...playerStats[detectiveId],
        correctGuesses: (playerStats[detectiveId]?.correctGuesses || 0) + 1,
        roundsWon: (playerStats[detectiveId]?.roundsWon || 0) + 1,
      },
    };
    
    set({
      players: updatedPlayers,
      roundWinner: { playerId: detectiveId, playerName: detective.name },
      roundEnded: true,
      gameStatus: 'round-end',
      playerStats: updatedStats,
    });
  },
  
  endRoundWithPhotographerWin: () => {
    const { players, currentPhotographerIndex, playerStats } = get();
    const photographer = players[currentPhotographerIndex];
    
    if (!photographer) return;
    
    // Incrementar puntuación del fotógrafo
    const updatedPlayers = players.map((player, index) => 
      index === currentPhotographerIndex
        ? { 
            ...player, 
            score: player.score + DETECTIVE_OBJETOS_CONFIG.POINTS_FOR_PHOTOGRAPHER_WIN,
            roundsAsPhotographer: (player.roundsAsPhotographer || 0) + 1,
          }
        : player
    );
    
    // Actualizar estadísticas
    const updatedStats = {
      ...playerStats,
      [photographer.id]: {
        ...playerStats[photographer.id],
        roundsAsPhotographer: (playerStats[photographer.id]?.roundsAsPhotographer || 0) + 1,
      },
    };
    
    set({
      players: updatedPlayers,
      roundWinner: null, // null indica que ganó el fotógrafo
      roundEnded: true,
      gameStatus: 'round-end',
      playerStats: updatedStats,
    });
  },
  
  // Acciones - Navegación entre rondas
  nextRound: () => {
    const { 
      players, 
      currentPhotographerIndex, 
      currentRound, 
      maxRounds, 
      roundHistory,
      roundWinner,
      currentZoomLevel,
      guessesCount,
      getCurrentPhotographer,
    } = get();
    
    if (players.length === 0) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    // Guardar historial de la ronda actual
    const photographer = getCurrentPhotographer();
    const roundData = {
      round: currentRound,
      photographer: photographer ? { id: photographer.id, name: photographer.name } : null,
      winner: roundWinner ? { id: roundWinner.playerId, name: roundWinner.playerName } : null,
      photographerWon: !roundWinner,
      zoomLevelsUsed: currentZoomLevel + 1,
      guessesCount: guessesCount,
    };
    
    const nextPhotographerIndex = (currentPhotographerIndex + 1) % players.length;
    const isNewRound = nextPhotographerIndex === 0;
    const newRound = isNewRound ? currentRound + 1 : currentRound;
    
    // Verificar si el juego debe terminar
    const shouldFinish = maxRounds !== null && newRound > maxRounds;
    
    if (shouldFinish) {
      set({ 
        gameStatus: 'finished',
        roundHistory: [...roundHistory, roundData],
      });
      return;
    }
    
    set({
      currentPhotographerIndex: nextPhotographerIndex,
      currentRound: newRound,
      currentZoomLevel: 0,
      currentImageUri: null,
      currentDetectiveIndex: 0,
      roundWinner: null,
      roundEnded: false,
      gameStatus: 'photo-capture',
      roundHistory: [...roundHistory, roundData],
      guessesCount: 0,
    });
  },
  
  // Utilidades
  getCurrentPhotographer: () => {
    const { players, currentPhotographerIndex } = get();
    return players[currentPhotographerIndex] || null;
  },
  
  getCurrentDetective: () => {
    const { players, currentPhotographerIndex, currentDetectiveIndex } = get();
    const detectives = players.filter((_, index) => index !== currentPhotographerIndex);
    return detectives[currentDetectiveIndex] || null;
  },
  
  getNextDetectiveIndex: () => {
    const { players, currentPhotographerIndex, currentDetectiveIndex } = get();
    const detectives = players.filter((_, index) => index !== currentPhotographerIndex);
    if (detectives.length === 0) return 0;
    return (currentDetectiveIndex + 1) % detectives.length;
  },
  
  getCurrentZoomValue: () => {
    const { currentZoomLevel } = get();
    const zoomLevels = DETECTIVE_OBJETOS_CONFIG.ZOOM_LEVELS;
    return zoomLevels[currentZoomLevel] || zoomLevels[zoomLevels.length - 1];
  },
  
  isImageFullyRevealed: () => {
    const { currentZoomLevel, maxZoomLevels } = get();
    return currentZoomLevel >= maxZoomLevels - 1;
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'setup',
      players: [],
      currentPlayerId: null,
      currentRound: 0,
      currentPhotographerIndex: 0,
      currentImageUri: null,
      currentZoomLevel: 0,
      currentDetectiveIndex: 0,
      roundWinner: null,
      roundEnded: false,
      maxRounds: DETECTIVE_OBJETOS_CONFIG.DEFAULT_MAX_ROUNDS,
      roundHistory: [],
      playerStats: {},
      guessesCount: 0,
    });
  },
  
  // Utilidades - Estadísticas
  getPlayerStats: (playerId) => {
    const { playerStats, players } = get();
    const player = players.find(p => p.id === playerId);
    if (!player) return null;
    
    return {
      ...player,
      stats: playerStats[playerId] || { correctGuesses: 0, roundsWon: 0, roundsAsPhotographer: 0 },
    };
  },
  
  getRoundHistory: () => {
    const { roundHistory } = get();
    return roundHistory;
  },
  
  getTotalRounds: () => {
    const { roundHistory, currentRound } = get();
    return Math.max(roundHistory.length, currentRound);
  },
}));

