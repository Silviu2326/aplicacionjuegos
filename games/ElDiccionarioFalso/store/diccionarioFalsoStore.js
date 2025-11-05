import { create } from 'zustand';
import { DICCIONARIO_FALSO_CONFIG } from '../constants/DiccionarioFalsoConfig';
import { getRandomWord } from '../constants/DiccionarioFalsoWords';

// Función helper para mezclar array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useDiccionarioFalsoStore = create((set, get) => ({
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
  maxRounds: DICCIONARIO_FALSO_CONFIG.DEFAULT_MAX_ROUNDS,
  
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
    if (players.length >= DICCIONARIO_FALSO_CONFIG.MAX_PLAYERS) {
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
      DICCIONARIO_FALSO_CONFIG.MIN_ROUNDS,
      Math.min(DICCIONARIO_FALSO_CONFIG.MAX_ROUNDS, rounds)
    );
    set({ maxRounds: validRounds });
  },
  
  // Acciones - Inicio de partida
  startGame: () => {
    const { players } = get();
    if (players.length < DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    set({
      gameStatus: 'lobby',
      currentRound: 0,
    });
    
    return true;
  },
  
  // Acciones - Iniciar ronda
  startRound: () => {
    const { currentRound, maxRounds } = get();
    
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
    
    // Verificar si todos han enviado (todos los jugadores deben enviar)
    const allSubmitted = players.every(player => {
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
    const { votes, currentDefinitions } = get();
    
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
    const { players } = get();
    const allVoted = players.every(player => updatedVotes[player.id]);
    
    if (allVoted) {
      // Calcular resultados de la ronda
      get().calculateRoundResults();
    }
    
    return true;
  },
  
  // Calcular resultados de la ronda
  calculateRoundResults: () => {
    const { currentDefinitions, votes, players, currentWord } = get();
    
    // Encontrar la definición correcta
    const correctDefinition = currentDefinitions.find(d => d.isReal);
    const correctDefinitionId = correctDefinition?.id;
    
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
    
    // Calcular puntos según el MD:
    // - 2 puntos por votar por la definición correcta
    // - 1 punto por cada jugador que vote por tu definición falsa
    
    // Puntos por votar por la definición correcta
    Object.entries(votes).forEach(([voterId, definitionId]) => {
      if (definitionId === correctDefinitionId) {
        pointsEarned[voterId] = (pointsEarned[voterId] || 0) + DICCIONARIO_FALSO_CONFIG.POINTS_CORRECT_VOTE;
      }
    });
    
    // Puntos por cada voto recibido en tu definición falsa
    currentDefinitions.forEach(def => {
      if (!def.isReal && def.votes.length > 0) {
        const points = def.votes.length * DICCIONARIO_FALSO_CONFIG.POINTS_PER_VOTE_ON_DEFINITION;
        pointsEarned[def.playerId] = (pointsEarned[def.playerId] || 0) + points;
      }
    });
    
    // Actualizar puntuaciones totales
    const updatedPlayers = players.map(player => ({
      ...player,
      score: player.score + (pointsEarned[player.id] || 0),
    }));
    
    // Contar votos para la definición correcta
    const votesForCorrect = Object.values(votes).filter(voteId => voteId === correctDefinitionId).length;
    
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
    const { currentRound, maxRounds } = get();
    
    if (currentRound >= maxRounds) {
      set({ gameStatus: 'finished' });
      return false;
    }
    
    return get().startRound();
  },
  
  // Utilidades
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
      currentWord: null,
      currentDefinitions: [],
      playerDefinitions: {},
      votes: {},
      roundResults: null,
    });
  },
}));
