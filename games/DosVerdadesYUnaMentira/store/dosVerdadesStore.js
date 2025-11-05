import { create } from 'zustand';
import { GAME_CONFIG, STATEMENT_SETS } from '../constants/dosVerdadesStatements';

export const useDosVerdadesStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'playing', 'debate', 'voting', 'revelation', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score }]
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
  
  // Historial y estadísticas
  turnHistory: [], // [{ round, narratorId, narratorName, statements, lieIndex, votes, correctGuesses, playersFooled }]
  gameStats: {
    totalTurns: 0,
    totalCorrectGuesses: 0,
    totalPlayersFooled: 0,
    mostSuccessfulNarrator: null,
    bestDetective: null,
  },
  
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
    const { players, currentStatements, lieIndex, votes, pointsForCorrectGuess, pointsForFooling, currentRound, turnHistory, gameStats } = get();
    const narrator = get().getCurrentNarrator();
    if (!narrator) return;
    
    // Calcular estadísticas del turno
    const correctGuesses = players.filter(p => {
      return p.id !== narrator.id && votes[p.id] === lieIndex;
    }).map(p => p.id);
    
    const playersFooled = players.filter(p => {
      const vote = votes[p.id];
      return p.id !== narrator.id && vote !== undefined && vote !== lieIndex;
    }).length;
    
    // Calcular puntuaciones
    const updatedPlayers = players.map(player => {
      let newScore = player.score;
      
      if (player.id === narrator.id) {
        // El narrador gana puntos por cada jugador que no adivinó
        newScore += playersFooled * pointsForFooling;
      } else {
        // Los jugadores ganan puntos si adivinaron correctamente
        const vote = votes[player.id];
        if (vote === lieIndex) {
          newScore += pointsForCorrectGuess;
        }
      }
      
      return { ...player, score: newScore };
    });
    
    // Guardar historial del turno
    const turnRecord = {
      round: currentRound,
      narratorId: narrator.id,
      narratorName: narrator.name,
      statements: currentStatements.map(s => s.text),
      lieIndex,
      votes: { ...votes },
      correctGuesses,
      playersFooled,
      timestamp: Date.now(),
    };
    
    // Actualizar historial primero
    const newHistory = [...turnHistory, turnRecord];
    
    // Actualizar estadísticas globales
    const newStats = {
      totalTurns: gameStats.totalTurns + 1,
      totalCorrectGuesses: gameStats.totalCorrectGuesses + correctGuesses.length,
      totalPlayersFooled: gameStats.totalPlayersFooled + playersFooled,
      mostSuccessfulNarrator: get().calculateMostSuccessfulNarrator(updatedPlayers, newHistory),
      bestDetective: get().calculateBestDetective(updatedPlayers, newHistory),
    };
    
    set({
      players: updatedPlayers,
      gameStatus: 'revelation',
      turnHistory: newHistory,
      gameStats: newStats,
    });
  },
  
  calculateMostSuccessfulNarrator: (players, history) => {
    const narratorStats = {};
    history.forEach(turn => {
      if (!narratorStats[turn.narratorId]) {
        narratorStats[turn.narratorId] = { id: turn.narratorId, name: turn.narratorName, fools: 0 };
      }
      narratorStats[turn.narratorId].fools += turn.playersFooled;
    });
    
    const narrators = Object.values(narratorStats);
    if (narrators.length === 0) return null;
    
    const best = narrators.reduce((max, current) => 
      current.fools > max.fools ? current : max
    );
    return best;
  },
  
  calculateBestDetective: (players, history) => {
    const detectiveStats = {};
    history.forEach(turn => {
      turn.correctGuesses.forEach(playerId => {
        if (!detectiveStats[playerId]) {
          const player = players.find(p => p.id === playerId);
          if (player) {
            detectiveStats[playerId] = { id: playerId, name: player.name, correct: 0 };
          }
        }
        if (detectiveStats[playerId]) {
          detectiveStats[playerId].correct += 1;
        }
      });
    });
    
    const detectives = Object.values(detectiveStats);
    if (detectives.length === 0) return null;
    
    const best = detectives.reduce((max, current) => 
      current.correct > max.correct ? current : max
    );
    return best;
  },
  
  getPlayerStats: (playerId) => {
    const { turnHistory, players } = get();
    const player = players.find(p => p.id === playerId);
    if (!player) return null;
    
    const turnsAsNarrator = turnHistory.filter(t => t.narratorId === playerId);
    const totalFooled = turnsAsNarrator.reduce((sum, t) => sum + t.playersFooled, 0);
    const avgFooled = turnsAsNarrator.length > 0 ? (totalFooled / turnsAsNarrator.length).toFixed(1) : 0;
    
    const correctGuesses = turnHistory.filter(t => 
      t.narratorId !== playerId && t.correctGuesses.includes(playerId)
    ).length;
    
    const totalTurnsPlayed = turnHistory.filter(t => t.narratorId !== playerId).length;
    const accuracy = totalTurnsPlayed > 0 ? ((correctGuesses / totalTurnsPlayed) * 100).toFixed(1) : 0;
    
    return {
      player,
      score: player.score,
      turnsAsNarrator: turnsAsNarrator.length,
      totalFooled,
      avgFooled,
      correctGuesses,
      totalTurnsPlayed,
      accuracy: parseFloat(accuracy),
    };
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
    if (!narrator) return { statementVotes: {}, correctGuesses: [] };
    
    const statementVotes = { 0: 0, 1: 0, 2: 0 };
    const correctGuesses = [];
    
    players.forEach(player => {
      if (player.id === narrator.id) return;
      
      const vote = votes[player.id];
      if (vote !== undefined) {
        statementVotes[vote] = (statementVotes[vote] || 0) + 1;
        if (vote === lieIndex) {
          correctGuesses.push(player.id);
        }
      }
    });
    
    return { statementVotes, correctGuesses };
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
      turnHistory: [],
      gameStats: {
        totalTurns: 0,
        totalCorrectGuesses: 0,
        totalPlayersFooled: 0,
        mostSuccessfulNarrator: null,
        bestDetective: null,
      },
    });
  },
}));

