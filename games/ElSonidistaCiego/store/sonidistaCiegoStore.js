import { create } from 'zustand';
import { getRandomScenario, SCENARIOS } from '../constants/SonidistaCiegoScenarios';

const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 10,
};

export const useSonidistaCiegoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'playing', 'guessing', 'results', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, roundsAsBlindSound, correctGuesses, incorrectGuesses }]
  currentBlindSoundIndex: null, // Índice del jugador que es el Sonidista Ciego actual
  
  // Ronda actual
  currentRound: 0,
  maxRounds: null, // null = ilimitado
  
  // Escenario y juego
  currentScenario: null, // Escenario secreto actual
  usedScenarios: [], // Escenarios ya usados en esta partida
  guess: null, // Intento de adivinanza del Sonidista Ciego
  guessCorrect: false, // Si la adivinanza fue correcta
  
  // Estadísticas y historial
  roundHistory: [], // [{ round, blindSoundName, scenario, guess, correct, timestamp }]
  totalRoundsPlayed: 0,
  totalCorrectGuesses: 0,
  totalIncorrectGuesses: 0,
  
  // Configuración
  difficulty: 'normal', // 'easy', 'normal', 'hard'
  allowDuplicateScenarios: true, // Permitir repetir escenarios en la misma partida
  
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
      roundsAsBlindSound: 0,
      correctGuesses: 0,
      incorrectGuesses: 0,
      averageGuessTime: null, // Tiempo promedio en adivinar (futuro)
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players, currentBlindSoundIndex } = get();
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;
    
    const newPlayers = players.filter(p => p.id !== playerId);
    let newBlindSoundIndex = currentBlindSoundIndex;
    
    // Ajustar índice del Sonidista Ciego si es necesario
    if (playerIndex < currentBlindSoundIndex) {
      newBlindSoundIndex = Math.max(0, currentBlindSoundIndex - 1);
    } else if (playerIndex === currentBlindSoundIndex && newPlayers.length > 0) {
      newBlindSoundIndex = currentBlindSoundIndex % newPlayers.length;
    } else if (newPlayers.length === 0) {
      newBlindSoundIndex = null;
    }
    
    set({ players: newPlayers, currentBlindSoundIndex: newBlindSoundIndex });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds || null });
  },
  
  setDifficulty: (difficulty) => {
    set({ difficulty: difficulty || 'normal' });
  },
  
  setAllowDuplicateScenarios: (allow) => {
    set({ allowDuplicateScenarios: allow !== false });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Resetear estadísticas de jugadores para nueva partida
    const resetPlayers = players.map(p => ({
      ...p,
      score: 0,
      roundsAsBlindSound: 0,
      correctGuesses: 0,
      incorrectGuesses: 0,
    }));
    
    set({
      gameStatus: 'playing',
      currentRound: 1,
      currentBlindSoundIndex: 0,
      currentScenario: null,
      guess: null,
      guessCorrect: false,
      usedScenarios: [],
      roundHistory: [],
      totalRoundsPlayed: 0,
      totalCorrectGuesses: 0,
      totalIncorrectGuesses: 0,
      players: resetPlayers,
    });
    
    return true;
  },
  
  // Acciones - Inicio de ronda
  startRound: () => {
    const { usedScenarios, allowDuplicateScenarios } = get();
    let scenario = getRandomScenario();
    
    // Si no se permiten duplicados, elegir uno que no se haya usado
    if (!allowDuplicateScenarios && usedScenarios.length < SCENARIOS.length) {
      let attempts = 0;
      while (usedScenarios.includes(scenario) && attempts < 100) {
        scenario = getRandomScenario();
        attempts++;
      }
      
      // Si ya se usaron todos los escenarios, resetear la lista
      if (usedScenarios.includes(scenario) && usedScenarios.length >= SCENARIOS.length) {
        set({ usedScenarios: [scenario] });
      } else if (!usedScenarios.includes(scenario)) {
        set({ usedScenarios: [...usedScenarios, scenario] });
      }
    } else if (allowDuplicateScenarios) {
      // Si se permiten duplicados, igualmente trackear para estadísticas
      set({ usedScenarios: [...usedScenarios, scenario] });
    }
    
    // Incrementar contador de rondas como Sonidista Ciego para el jugador actual
    const { players, currentBlindSoundIndex } = get();
    if (currentBlindSoundIndex !== null && players[currentBlindSoundIndex]) {
      const updatedPlayers = players.map((player, index) => {
        if (index === currentBlindSoundIndex) {
          return { ...player, roundsAsBlindSound: player.roundsAsBlindSound + 1 };
        }
        return player;
      });
      set({ players: updatedPlayers });
    }
    
    set({
      currentScenario: scenario,
      gameStatus: 'playing',
      guess: null,
      guessCorrect: false,
    });
  },
  
  // Acciones - Adivinanza
  submitGuess: (guessText) => {
    const { currentScenario } = get();
    const normalizedGuess = guessText.toLowerCase().trim();
    const normalizedScenario = currentScenario ? currentScenario.toLowerCase().trim() : '';
    
    // Comparación más flexible (permite variaciones menores)
    let isCorrect = false;
    if (normalizedScenario) {
      // Comparación exacta
      if (normalizedGuess === normalizedScenario) {
        isCorrect = true;
      } else {
        // Comparación parcial (si contiene palabras clave)
        const scenarioWords = normalizedScenario.split(' ');
        const matchingWords = scenarioWords.filter(word => 
          word.length > 3 && normalizedGuess.includes(word)
        );
        // Si al menos el 60% de las palabras clave están presentes
        if (matchingWords.length >= Math.ceil(scenarioWords.length * 0.6)) {
          isCorrect = true;
        }
      }
    }
    
    set({
      guess: guessText.trim(),
      guessCorrect: isCorrect,
      gameStatus: 'guessing',
    });
    
    return isCorrect;
  },
  
  // Acciones - Resultado de la ronda
  endRound: (correct) => {
    const { players, currentBlindSoundIndex, currentScenario, guess, currentRound } = get();
    const blindSound = get().getCurrentBlindSound();
    if (!blindSound) return;
    
    // Actualizar estadísticas globales
    const newTotalCorrectGuesses = correct 
      ? get().totalCorrectGuesses + 1 
      : get().totalCorrectGuesses;
    const newTotalIncorrectGuesses = !correct 
      ? get().totalIncorrectGuesses + 1 
      : get().totalIncorrectGuesses;
    const newTotalRoundsPlayed = get().totalRoundsPlayed + 1;
    
    // Calcular puntuaciones y estadísticas de jugadores
    const updatedPlayers = players.map(player => {
      let newScore = player.score;
      let newCorrectGuesses = player.correctGuesses;
      let newIncorrectGuesses = player.incorrectGuesses;
      
      if (player.id === blindSound.id) {
        // El Sonidista Ciego gana un punto si acierta
        if (correct) {
          newScore += 1;
          newCorrectGuesses += 1;
        } else {
          newIncorrectGuesses += 1;
        }
      } else {
        // Los Ayudantes ganan un punto cada uno si el Sonidista Ciego falla
        if (!correct) {
          newScore += 1;
        }
      }
      
      return { 
        ...player, 
        score: newScore,
        correctGuesses: newCorrectGuesses,
        incorrectGuesses: newIncorrectGuesses,
      };
    });
    
    // Guardar en historial
    const roundEntry = {
      round: currentRound,
      blindSoundName: blindSound.name,
      blindSoundId: blindSound.id,
      scenario: currentScenario,
      guess: guess || '',
      correct: correct,
      timestamp: new Date().toISOString(),
      playersCount: players.length,
    };
    
    set({
      players: updatedPlayers,
      gameStatus: 'results',
      totalRoundsPlayed: newTotalRoundsPlayed,
      totalCorrectGuesses: newTotalCorrectGuesses,
      totalIncorrectGuesses: newTotalIncorrectGuesses,
      roundHistory: [...get().roundHistory, roundEntry],
    });
  },
  
  // Acciones - Siguiente ronda
  nextRound: () => {
    const { players, currentBlindSoundIndex, currentRound, maxRounds } = get();
    
    if (players.length === 0) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    const nextBlindSoundIndex = (currentBlindSoundIndex + 1) % players.length;
    const isNewRound = nextBlindSoundIndex === 0;
    const newRound = isNewRound ? currentRound + 1 : currentRound;
    
    // Verificar si el juego debe terminar
    const shouldFinish = maxRounds !== null && newRound > maxRounds;
    
    if (shouldFinish) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    set({
      currentBlindSoundIndex: nextBlindSoundIndex,
      currentRound: newRound,
      currentScenario: null,
      guess: null,
      guessCorrect: false,
    });
    
    // Iniciar nueva ronda
    get().startRound();
  },
  
  // Acciones - Utilidades
  getCurrentBlindSound: () => {
    const { players, currentBlindSoundIndex } = get();
    return currentBlindSoundIndex !== null && players[currentBlindSoundIndex] 
      ? players[currentBlindSoundIndex] 
      : null;
  },
  
  getHelpers: () => {
    const { players, currentBlindSoundIndex } = get();
    return players.filter((_, index) => index !== currentBlindSoundIndex);
  },
  
  // Estadísticas
  getGameStatistics: () => {
    const { 
      totalRoundsPlayed, 
      totalCorrectGuesses, 
      totalIncorrectGuesses,
      players,
      roundHistory,
    } = get();
    
    const accuracy = totalRoundsPlayed > 0 
      ? ((totalCorrectGuesses / totalRoundsPlayed) * 100).toFixed(1)
      : 0;
    
    const mostSuccessfulPlayer = players.length > 0
      ? [...players].sort((a, b) => {
          const aAccuracy = (a.correctGuesses + a.incorrectGuesses) > 0
            ? (a.correctGuesses / (a.correctGuesses + a.incorrectGuesses))
            : 0;
          const bAccuracy = (b.correctGuesses + b.incorrectGuesses) > 0
            ? (b.correctGuesses / (b.correctGuesses + b.incorrectGuesses))
            : 0;
          return bAccuracy - aAccuracy;
        })[0]
      : null;
    
    const hardestScenario = roundHistory.length > 0
      ? roundHistory
          .filter(r => !r.correct)
          .reduce((acc, r) => {
            acc[r.scenario] = (acc[r.scenario] || 0) + 1;
            return acc;
          }, {})
      : {};
    
    const hardestScenarioName = Object.keys(hardestScenario).length > 0
      ? Object.entries(hardestScenario)
          .sort(([,a], [,b]) => b - a)[0][0]
      : null;
    
    return {
      totalRoundsPlayed,
      totalCorrectGuesses,
      totalIncorrectGuesses,
      accuracy: parseFloat(accuracy),
      mostSuccessfulPlayer,
      hardestScenario: hardestScenarioName,
      playersCount: players.length,
      averageScore: players.length > 0
        ? (players.reduce((sum, p) => sum + p.score, 0) / players.length).toFixed(2)
        : 0,
    };
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      currentBlindSoundIndex: null,
      currentRound: 0,
      maxRounds: null,
      currentScenario: null,
      usedScenarios: [],
      guess: null,
      guessCorrect: false,
      roundHistory: [],
      totalRoundsPlayed: 0,
      totalCorrectGuesses: 0,
      totalIncorrectGuesses: 0,
    });
  },
}));

