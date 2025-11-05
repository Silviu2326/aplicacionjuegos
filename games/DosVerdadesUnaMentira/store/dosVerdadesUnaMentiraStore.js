import { create } from 'zustand';
import { GAME_CONFIG, STATEMENT_SETS } from '../constants/DosVerdadesUnaMentiraGameConfig';

export const useDosVerdadesUnaMentiraStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'playing', 'debate', 'voting', 'revelation', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, stats: { correctGuesses, timesFooled, timesNarrator, averageFoolingRate } }]
  currentPlayerId: null, // ID del jugador actual (local)
  
  // Ronda actual
  currentRound: 0,
  currentNarratorIndex: 0, // Índice del jugador que es narrador
  maxRounds: GAME_CONFIG.DEFAULT_MAX_ROUNDS,
  
  // Afirmaciones del narrador actual
  currentStatements: [], // [{ id, text, isLie }]
  lieIndex: null, // Índice de la mentira (0, 1 o 2)
  
  // Votación
  votes: {}, // { playerId: statementIndex }
  
  // Estadísticas del juego
  gameStats: {
    totalRounds: 0,
    totalStatements: 0,
    totalVotes: 0,
    mostFoolingPlayer: null,
    mostAccuratePlayer: null,
    roundHistory: [], // [{ round, narratorId, lieIndex, correctGuesses, playersFooled }]
  },
  
  // Temporizadores
  debateTimeRemaining: GAME_CONFIG.DEFAULT_DEBATE_TIME,
  votingTimeRemaining: GAME_CONFIG.DEFAULT_VOTING_TIME,
  
  // Configuración
  debateTime: GAME_CONFIG.DEFAULT_DEBATE_TIME,
  votingTime: GAME_CONFIG.DEFAULT_VOTING_TIME,
  pointsForCorrectGuess: GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS,
  pointsForFooling: GAME_CONFIG.DEFAULT_POINTS_FOR_FOOLING,
  
  // Modo de juego
  mode: 'auto', // 'auto' o 'manual'
  
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
      stats: {
        correctGuesses: 0,
        timesFooled: 0,
        timesNarrator: 0,
        totalVotes: 0,
        averageFoolingRate: 0,
      },
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players, currentNarratorIndex } = get();
    const playerIndex = players.findIndex(p => p.id === playerId);
    if (playerIndex === -1) return;
    
    const newPlayers = players.filter(p => p.id !== playerId);
    let newNarratorIndex = currentNarratorIndex;
    
    // Ajustar índice del narrador si es necesario
    if (playerIndex < currentNarratorIndex) {
      newNarratorIndex = Math.max(0, currentNarratorIndex - 1);
    } else if (playerIndex === currentNarratorIndex && newPlayers.length > 0) {
      newNarratorIndex = currentNarratorIndex % newPlayers.length;
    } else if (newPlayers.length === 0) {
      newNarratorIndex = 0;
    }
    
    set({ players: newPlayers, currentNarratorIndex: newNarratorIndex });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    set({ maxRounds: rounds || null });
  },
  
  setDebateTime: (time) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_DEBATE_TIME,
      Math.min(GAME_CONFIG.MAX_DEBATE_TIME, time)
    );
    set({ debateTime: validTime, debateTimeRemaining: validTime });
  },
  
  setVotingTime: (time) => {
    const validTime = Math.max(
      GAME_CONFIG.MIN_VOTING_TIME,
      Math.min(GAME_CONFIG.MAX_VOTING_TIME, time)
    );
    set({ votingTime: validTime, votingTimeRemaining: validTime });
  },
  
  setPointsForCorrectGuess: (points) => {
    set({ pointsForCorrectGuess: Math.max(1, points) });
  },
  
  setPointsForFooling: (points) => {
    set({ pointsForFooling: Math.max(1, points) });
  },
  
  setMode: (mode) => {
    set({ mode: mode === 'manual' ? 'manual' : 'auto' });
  },
  
  // Acciones - Generación de afirmaciones
  generateStatements: () => {
    const { mode } = get();
    if (mode === 'auto') {
      // Seleccionar un set aleatorio
      const randomSet = STATEMENT_SETS[Math.floor(Math.random() * STATEMENT_SETS.length)];
      const lieIndex = Math.floor(Math.random() * 3);
      
      const statements = randomSet.map((text, index) => ({
        id: `stmt-${Date.now()}-${index}`,
        text,
        isLie: index === lieIndex,
      }));
      
      set({ currentStatements: statements, lieIndex });
      return statements;
    }
    // En modo manual, el narrador ingresa sus propias afirmaciones
    return [];
  },
  
  setManualStatements: (statements, lieIndex) => {
    const formattedStatements = statements.map((text, index) => ({
      id: `stmt-${Date.now()}-${index}`,
      text: text.trim(),
      isLie: index === lieIndex,
    }));
    
    set({ currentStatements: formattedStatements, lieIndex });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    set({
      gameStatus: 'playing',
      currentRound: 1,
      currentNarratorIndex: 0,
      votes: {},
    });
    
    // Generar afirmaciones para el primer narrador
    get().generateStatements();
    get().startDebatePhase();
    
    return true;
  },
  
  // Acciones - Fases del juego
  startDebatePhase: () => {
    const { debateTime } = get();
    set({
      gameStatus: 'debate',
      debateTimeRemaining: debateTime,
      votes: {},
    });
  },
  
  startVotingPhase: () => {
    const { votingTime } = get();
    set({
      gameStatus: 'voting',
      votingTimeRemaining: votingTime,
      votes: {},
    });
  },
  
  submitVote: (playerId, statementIndex) => {
    const { votes } = get();
    set({
      votes: {
        ...votes,
        [playerId]: statementIndex,
      },
    });
  },
  
  revealResults: () => {
    const { players, currentStatements, lieIndex, votes, pointsForCorrectGuess, pointsForFooling, currentRound, gameStats } = get();
    const narrator = get().getCurrentNarrator();
    if (!narrator) return;
    
    // Calcular estadísticas de la ronda
    const votingPlayers = players.filter(p => p.id !== narrator.id);
    const playersFooled = votingPlayers.filter(p => {
      const vote = votes[p.id];
      return vote !== undefined && vote !== lieIndex;
    }).length;
    const correctGuesses = votingPlayers.filter(p => {
      const vote = votes[p.id];
      return vote === lieIndex;
    }).length;
    
    // Calcular puntuaciones y actualizar estadísticas
    const updatedPlayers = players.map(player => {
      let newScore = player.score;
      const newStats = { ...(player.stats || {
        correctGuesses: 0,
        timesFooled: 0,
        timesNarrator: 0,
        totalVotes: 0,
        averageFoolingRate: 0,
      }) };
      
      if (player.id === narrator.id) {
        // El narrador gana puntos por cada jugador que no adivinó
        newScore += playersFooled * pointsForFooling;
        newStats.timesNarrator += 1;
        newStats.timesFooled += playersFooled;
        // Calcular tasa promedio de engaño
        if (newStats.timesNarrator > 0) {
          newStats.averageFoolingRate = newStats.timesFooled / newStats.timesNarrator;
        }
      } else {
        // Los jugadores ganan puntos si adivinaron correctamente
        const vote = votes[player.id];
        newStats.totalVotes += 1;
        if (vote === lieIndex) {
          newScore += pointsForCorrectGuess;
          newStats.correctGuesses += 1;
        }
      }
      
      return { ...player, score: newScore, stats: newStats };
    });
    
    // Actualizar historial de rondas
    const roundHistory = [...(gameStats.roundHistory || []), {
      round: currentRound,
      narratorId: narrator.id,
      narratorName: narrator.name,
      lieIndex,
      correctGuesses,
      playersFooled,
      totalVoters: votingPlayers.length,
    }];
    
    set({
      players: updatedPlayers,
      gameStatus: 'revelation',
      gameStats: {
        ...gameStats,
        totalRounds: currentRound,
        totalStatements: (gameStats.totalStatements || 0) + 3,
        totalVotes: (gameStats.totalVotes || 0) + votingPlayers.length,
        roundHistory,
      },
    });
  },
  
  nextTurn: () => {
    const { players, currentNarratorIndex, currentRound, maxRounds } = get();
    
    if (players.length === 0) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    const nextNarratorIndex = (currentNarratorIndex + 1) % players.length;
    const isNewRound = nextNarratorIndex === 0;
    const newRound = isNewRound ? currentRound + 1 : currentRound;
    
    // Verificar si el juego debe terminar
    const shouldFinish = maxRounds !== null && newRound > maxRounds;
    
    if (shouldFinish) {
      set({ gameStatus: 'finished' });
      return;
    }
    
    set({
      currentNarratorIndex: nextNarratorIndex,
      currentRound: newRound,
    });
    
    // Generar nuevas afirmaciones
    get().generateStatements();
    get().startDebatePhase();
  },
  
  // Acciones - Temporizadores
  decrementDebateTime: () => {
    const { debateTimeRemaining } = get();
    if (debateTimeRemaining > 0) {
      set({ debateTimeRemaining: debateTimeRemaining - 1 });
    } else {
      get().startVotingPhase();
    }
  },
  
  decrementVotingTime: () => {
    const { votingTimeRemaining } = get();
    if (votingTimeRemaining > 0) {
      set({ votingTimeRemaining: votingTimeRemaining - 1 });
    }
  },
  
  // Acciones - Utilidades
  getCurrentNarrator: () => {
    const { players, currentNarratorIndex } = get();
    return players[currentNarratorIndex] || null;
  },
  
  allPlayersVoted: () => {
    const { players, votes, getCurrentNarrator } = get();
    const narrator = getCurrentNarrator();
    if (!narrator) return false;
    
    const votingPlayers = players.filter(p => p.id !== narrator.id);
    return votingPlayers.every(p => votes[p.id] !== undefined);
  },
  
  getVoteResults: () => {
    const { currentStatements, votes, lieIndex, players, getCurrentNarrator } = get();
    const narrator = getCurrentNarrator();
    if (!narrator) return { statementVotes: {}, correctGuesses: [], playerVotes: {} };
    
    const statementVotes = { 0: 0, 1: 0, 2: 0 };
    const correctGuesses = [];
    const playerVotes = {};
    
    players.forEach(player => {
      if (player.id === narrator.id) return;
      
      const vote = votes[player.id];
      if (vote !== undefined) {
        statementVotes[vote] = (statementVotes[vote] || 0) + 1;
        playerVotes[player.id] = { playerName: player.name, vote };
        if (vote === lieIndex) {
          correctGuesses.push(player.id);
        }
      }
    });
    
    return { statementVotes, correctGuesses, playerVotes };
  },
  
  // Estadísticas adicionales
  getGameStatistics: () => {
    const { players, gameStats } = get();
    
    if (players.length === 0) {
      return {
        mostFoolingPlayer: null,
        mostAccuratePlayer: null,
        averageAccuracy: 0,
        totalPlayersFooled: 0,
      };
    }
    
    // Encontrar el jugador que más ha engañado
    const mostFoolingPlayer = players.reduce((max, player) => {
      if (!max || player.stats.timesFooled > max.stats.timesFooled) {
        return player;
      }
      return max;
    }, null);
    
    // Encontrar el jugador más preciso
    const mostAccuratePlayer = players.reduce((max, player) => {
      if (!max || player.stats.totalVotes === 0) return max;
      if (player.stats.totalVotes === 0) return max;
      const accuracy = player.stats.correctGuesses / player.stats.totalVotes;
      const maxAccuracy = max.stats.totalVotes > 0 
        ? max.stats.correctGuesses / max.stats.totalVotes 
        : 0;
      return accuracy > maxAccuracy ? player : max;
    }, null);
    
    // Calcular precisión promedio
    const totalVotes = players.reduce((sum, p) => sum + p.stats.totalVotes, 0);
    const totalCorrect = players.reduce((sum, p) => sum + p.stats.correctGuesses, 0);
    const averageAccuracy = totalVotes > 0 ? totalCorrect / totalVotes : 0;
    
    // Total de jugadores engañados
    const totalPlayersFooled = players.reduce((sum, p) => sum + p.stats.timesFooled, 0);
    
    return {
      mostFoolingPlayer,
      mostAccuratePlayer,
      averageAccuracy,
      totalPlayersFooled,
      totalRounds: gameStats.totalRounds,
      roundHistory: gameStats.roundHistory,
    };
  },
  
  getPlayerStatistics: (playerId) => {
    const { players, gameStats } = get();
    const player = players.find(p => p.id === playerId);
    
    if (!player) return null;
    
    const accuracy = player.stats.totalVotes > 0
      ? (player.stats.correctGuesses / player.stats.totalVotes) * 100
      : 0;
    
    const foolingRate = player.stats.timesNarrator > 0
      ? (player.stats.timesFooled / player.stats.timesNarrator)
      : 0;
    
    return {
      player,
      accuracy: Math.round(accuracy * 100) / 100,
      foolingRate: Math.round(foolingRate * 100) / 100,
      roundsAsNarrator: player.stats.timesNarrator,
      correctGuesses: player.stats.correctGuesses,
      totalVotes: player.stats.totalVotes,
    };
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'setup',
      players: [],
      currentPlayerId: null,
      currentRound: 0,
      currentNarratorIndex: 0,
      currentStatements: [],
      lieIndex: null,
      votes: {},
      debateTimeRemaining: GAME_CONFIG.DEFAULT_DEBATE_TIME,
      votingTimeRemaining: GAME_CONFIG.DEFAULT_VOTING_TIME,
      debateTime: GAME_CONFIG.DEFAULT_DEBATE_TIME,
      votingTime: GAME_CONFIG.DEFAULT_VOTING_TIME,
      pointsForCorrectGuess: GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS,
      pointsForFooling: GAME_CONFIG.DEFAULT_POINTS_FOR_FOOLING,
      mode: 'auto',
      gameStats: {
        totalRounds: 0,
        totalStatements: 0,
        totalVotes: 0,
        mostFoolingPlayer: null,
        mostAccuratePlayer: null,
        roundHistory: [],
      },
    });
  },
}));
