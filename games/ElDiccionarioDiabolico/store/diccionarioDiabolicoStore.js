import { create } from 'zustand';
import { DICCIONARIO_DIABOLICO_CONFIG } from '../constants/DiccionarioDiabolicoConfig';
import { getRandomWord } from '../constants/DiccionarioDiabolicoPalabras';

// Función helper para mezclar array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useDiccionarioDiabolicoStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'lobby', 'writing', 'voting', 'results', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, score, isHost }]
  currentPlayerId: null, // ID del jugador actual (local)
  
  // Sala de juego
  gameCode: null,
  hostPlayerId: null,
  
  // Ronda actual
  currentRound: 0,
  maxRounds: DICCIONARIO_DIABOLICO_CONFIG.DEFAULT_MAX_ROUNDS,
  currentLectorIndex: 0, // Índice del jugador que es Lector
  
  // Palabra y definiciones de la ronda actual
  currentWord: null, // { palabra, definicion }
  currentDefinitions: [], // [{ id, text, playerId, isReal, votes: [] }]
  
  // Definiciones enviadas por jugadores
  playerDefinitions: {}, // { playerId: definitionText }
  
  // Votación
  votes: {}, // { playerId: definitionId }
  
  // Resultados de la ronda
  roundResults: null, // { correctDefinition, definitionAuthors, voteBreakdown, pointsEarned }
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= DICCIONARIO_DIABOLICO_CONFIG.MAX_PLAYERS) {
      return null;
    }
    const isHost = players.length === 0;
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
      isHost: isHost,
    };
    
    if (isHost) {
      const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      set({
        players: [...players, newPlayer],
        hostPlayerId: newPlayer.id,
        gameCode: gameCode,
      });
      return { playerId: newPlayer.id, gameCode };
    } else {
      set({ players: [...players, newPlayer] });
      return { playerId: newPlayer.id };
    }
  },
  
  removePlayer: (playerId) => {
    const { players, hostPlayerId } = get();
    const updatedPlayers = players.filter(p => p.id !== playerId);
    
    // Si se elimina el host, asignar nuevo host
    let newHostId = hostPlayerId;
    if (playerId === hostPlayerId && updatedPlayers.length > 0) {
      updatedPlayers[0].isHost = true;
      newHostId = updatedPlayers[0].id;
    }
    
    set({
      players: updatedPlayers,
      hostPlayerId: newHostId,
    });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración del juego
  setMaxRounds: (rounds) => {
    const validRounds = Math.max(
      DICCIONARIO_DIABOLICO_CONFIG.MIN_ROUNDS,
      Math.min(DICCIONARIO_DIABOLICO_CONFIG.MAX_ROUNDS, rounds)
    );
    set({ maxRounds: validRounds });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < DICCIONARIO_DIABOLICO_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Seleccionar primer Lector aleatoriamente
    const randomLectorIndex = Math.floor(Math.random() * players.length);
    
    set({
      gameStatus: 'lobby',
      currentRound: 0,
      currentLectorIndex: randomLectorIndex,
    });
    
    return true;
  },
  
  // Acciones - Iniciar ronda
  startRound: () => {
    const { players, currentLectorIndex, currentRound, maxRounds } = get();
    
    // Verificar si el juego debe terminar
    if (currentRound >= maxRounds) {
      set({ gameStatus: 'finished' });
      return false;
    }
    
    // Obtener nueva palabra
    const word = getRandomWord();
    
    set({
      gameStatus: 'writing',
      currentRound: currentRound + 1,
      currentWord: word,
      currentDefinitions: [],
      playerDefinitions: {},
      votes: {},
      roundResults: null,
    });
    
    return true;
  },
  
  // Acciones - Enviar definición
  submitDefinition: (playerId, definitionText) => {
    const { playerDefinitions, currentWord, players } = get();
    
    if (!currentWord) return false;
    
    // Guardar la definición del jugador
    const updatedDefinitions = {
      ...playerDefinitions,
      [playerId]: definitionText.trim(),
    };
    
    set({ playerDefinitions: updatedDefinitions });
    
    // Verificar si todos han enviado (excepto el Lector que ya tiene la definición real)
    const lector = players[get().currentLectorIndex];
    const allSubmitted = players.every(player => {
      if (player.id === lector?.id) return true; // El Lector no envía definición
      return updatedDefinitions[player.id];
    });
    
    if (allSubmitted) {
      // Preparar todas las definiciones para la votación
      const definitions = [];
      
      // Agregar definición real
      definitions.push({
        id: 'real-definition',
        text: currentWord.definicion,
        playerId: 'system',
        isReal: true,
        votes: [],
      });
      
      // Agregar definiciones falsas de los jugadores
      Object.entries(updatedDefinitions).forEach(([pid, text]) => {
        definitions.push({
          id: `definition-${pid}`,
          text: text,
          playerId: pid,
          isReal: false,
          votes: [],
        });
      });
      
      // Mezclar las definiciones para mostrar de forma aleatoria
      const shuffledDefinitions = shuffleArray(definitions);
      
      set({
        currentDefinitions: shuffledDefinitions,
        gameStatus: 'voting',
      });
    }
    
    return true;
  },
  
  // Acciones - Votar por una definición
  voteForDefinition: (voterId, definitionId) => {
    const { votes, currentDefinitions, players, currentLectorIndex } = get();
    
    // El Lector no vota
    const lector = players[currentLectorIndex];
    if (lector?.id === voterId) {
      return false;
    }
    
    // No se puede votar por tu propia definición
    const definition = currentDefinitions.find(d => d.id === definitionId);
    if (definition && definition.playerId === voterId) {
      return false;
    }
    
    // Ya votó
    if (votes[voterId]) {
      return false;
    }
    
    const updatedVotes = {
      ...votes,
      [voterId]: definitionId,
    };
    
    // Actualizar votos en las definiciones
    const updatedDefinitions = currentDefinitions.map(def => {
      if (def.id === definitionId) {
        return {
          ...def,
          votes: [...def.votes, voterId],
        };
      }
      return def;
    });
    
    set({
      votes: updatedVotes,
      currentDefinitions: updatedDefinitions,
    });
    
    // Verificar si todos han votado
    const lectorId = lector?.id;
    const voters = players.filter(p => p.id !== lectorId);
    const allVoted = voters.every(voter => updatedVotes[voter.id]);
    
    if (allVoted) {
      // Calcular resultados de la ronda
      get().calculateRoundResults();
    }
    
    return true;
  },
  
  // Calcular resultados de la ronda
  calculateRoundResults: () => {
    const { currentDefinitions, votes, players, currentLectorIndex, currentWord } = get();
    
    const lector = players[currentLectorIndex];
    const voters = players.filter(p => p.id !== lector?.id);
    
    // Encontrar la definición correcta
    const correctDefinition = currentDefinitions.find(d => d.isReal);
    const correctDefinitionId = correctDefinition?.id;
    
    // Contar votos para la definición correcta
    const votesForCorrect = Object.values(votes).filter(voteId => voteId === correctDefinitionId).length;
    
    // Calcular puntos
    const pointsEarned = {};
    const definitionAuthors = {};
    const voteBreakdown = {};
    
    // Inicializar puntos
    players.forEach(player => {
      pointsEarned[player.id] = 0;
    });
    
    // Mapear autores de definiciones
    currentDefinitions.forEach(def => {
      if (!def.isReal) {
        definitionAuthors[def.id] = players.find(p => p.id === def.playerId)?.name || 'Desconocido';
      }
    });
    
    // Mapear votos
    Object.entries(votes).forEach(([voterId, definitionId]) => {
      if (!voteBreakdown[definitionId]) {
        voteBreakdown[definitionId] = [];
      }
      const voter = players.find(p => p.id === voterId);
      voteBreakdown[definitionId].push(voter?.name || 'Desconocido');
    });
    
    // Calcular puntos por votos recibidos en definiciones falsas
    currentDefinitions.forEach(def => {
      if (!def.isReal && def.votes.length > 0) {
        const points = def.votes.length * DICCIONARIO_DIABOLICO_CONFIG.POINTS_PER_VOTE;
        pointsEarned[def.playerId] = (pointsEarned[def.playerId] || 0) + points;
      }
    });
    
    // Calcular puntos por adivinar la definición correcta
    if (votesForCorrect > 0) {
      voters.forEach(voter => {
        if (votes[voter.id] === correctDefinitionId) {
          pointsEarned[voter.id] = (pointsEarned[voter.id] || 0) + DICCIONARIO_DIABOLICO_CONFIG.POINTS_CORRECT_GUESS;
        }
      });
    }
    
    // Puntos para el Lector si nadie votó por la definición correcta
    if (lector && votesForCorrect === 0) {
      pointsEarned[lector.id] = (pointsEarned[lector.id] || 0) + DICCIONARIO_DIABOLICO_CONFIG.POINTS_LECTOR_NO_VOTES;
    }
    
    // Actualizar puntuaciones totales
    const updatedPlayers = players.map(player => ({
      ...player,
      score: player.score + (pointsEarned[player.id] || 0),
    }));
    
    set({
      players: updatedPlayers,
      roundResults: {
        correctDefinition: correctDefinition,
        definitionAuthors: definitionAuthors,
        voteBreakdown: voteBreakdown,
        pointsEarned: pointsEarned,
        votesForCorrect: votesForCorrect,
      },
      gameStatus: 'results',
    });
  },
  
  // Acciones - Siguiente ronda
  nextRound: () => {
    const { players, currentLectorIndex, currentRound, maxRounds } = get();
    
    if (currentRound >= maxRounds) {
      set({ gameStatus: 'finished' });
      return false;
    }
    
    // Rotar el Lector
    const nextLectorIndex = (currentLectorIndex + 1) % players.length;
    
    set({
      currentLectorIndex: nextLectorIndex,
    });
    
    return get().startRound();
  },
  
  // Utilidades
  getCurrentLector: () => {
    const { players, currentLectorIndex } = get();
    return players[currentLectorIndex] || null;
  },
  
  isPlayerLector: (playerId) => {
    const lector = get().getCurrentLector();
    return lector?.id === playerId;
  },
  
  hasPlayerSubmitted: (playerId) => {
    const { playerDefinitions } = get();
    return !!playerDefinitions[playerId];
  },
  
  hasPlayerVoted: (playerId) => {
    const { votes } = get();
    return !!votes[playerId];
  },
  
  resetGame: () => {
    set({
      gameStatus: 'setup',
      players: [],
      currentPlayerId: null,
      gameCode: null,
      hostPlayerId: null,
      currentRound: 0,
      currentLectorIndex: 0,
      currentWord: null,
      currentDefinitions: [],
      playerDefinitions: {},
      votes: {},
      roundResults: null,
    });
  },
}));
