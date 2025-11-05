import { create } from 'zustand';
import { WORD_PACKS, getRandomWordFromCategory } from '../constants/FakeArtistWordPacks';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useFakeArtistGameStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'lobby', 'role-reveal', 'drawing', 'voting', 'results'
  
  // Jugadores
  players: [],
  currentMasterIndex: 0,
  fakeArtistIndex: null,
  
  // Palabra secreta
  secretWord: null,
  selectedCategory: null,
  
  // Dibujo
  drawingStrokes: [], // Array de trazos: [{ playerId, path, color, timestamp }]
  currentTurnIndex: 0,
  strokesPerPlayer: 0, // Contador de trazos por jugador
  maxStrokesPerPlayer: 2,
  
  // Votación
  votes: {}, // { playerId: votedPlayerId }
  discussionPhase: false,
  
  // Resultados
  gameResult: null, // 'real-artists-win', 'fake-artist-wins', 'fake-artist-guessed'
  fakeArtistGuess: null,
  
  // Configuración
  numRounds: 1,
  
  // Acciones
  addPlayer: (playerName) => {
    const state = get();
    if (state.players.find(p => p.name === playerName)) {
      return false; // Nombre ya existe
    }
    
    const newPlayer = {
      id: Date.now().toString(),
      name: playerName,
      role: null, // 'real-artist' o 'fake-artist'
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
    if (state.players.length < 4) {
      return false; // Mínimo 4 jugadores
    }
    
    // Asignar roles aleatoriamente
    const shuffledPlayers = shuffleArray([...state.players]);
    const fakeArtistIndex = Math.floor(Math.random() * shuffledPlayers.length);
    
    const playersWithRoles = shuffledPlayers.map((player, index) => ({
      ...player,
      role: index === fakeArtistIndex ? 'fake-artist' : 'real-artist',
    }));
    
    set({
      players: playersWithRoles,
      fakeArtistIndex: fakeArtistIndex,
      gameStatus: 'role-reveal',
      currentTurnIndex: 0,
      strokesPerPlayer: 0,
      drawingStrokes: [],
      votes: {},
      discussionPhase: false,
    });
    
    return true;
  },
  
  selectCategoryAndWord: (category) => {
    const word = getRandomWordFromCategory(category);
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
    
    if (player.role === 'fake-artist') {
      return { role: 'fake-artist', word: null };
    } else {
      return { role: 'real-artist', word: state.secretWord };
    }
  },
  
  startDrawing: () => {
    set({
      gameStatus: 'drawing',
      currentTurnIndex: 0,
      strokesPerPlayer: 0,
    });
  },
  
  addStroke: (playerId, path, color) => {
    const state = get();
    const newStroke = {
      id: Date.now().toString(),
      playerId,
      path,
      color,
      timestamp: Date.now(),
    };
    
    set({
      drawingStrokes: [...state.drawingStrokes, newStroke],
      strokesPerPlayer: state.strokesPerPlayer + 1,
    });
    
    // Verificar si todos han dibujado 2 veces
    const totalStrokes = state.drawingStrokes.length + 1;
    const totalPlayers = state.players.length;
    const maxTotalStrokes = totalPlayers * state.maxStrokesPerPlayer;
    
    if (totalStrokes >= maxTotalStrokes) {
      // Avanzar a fase de discusión
      setTimeout(() => {
        set({
          gameStatus: 'voting',
          discussionPhase: true,
        });
      }, 1000);
    } else {
      // Avanzar al siguiente jugador
      const nextTurnIndex = (state.currentTurnIndex + 1) % totalPlayers;
      set({
        currentTurnIndex: nextTurnIndex,
      });
    }
  },
  
  startVoting: () => {
    set({
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
    
    const fakeArtistPlayer = state.players[state.fakeArtistIndex];
    
    if (mostVoted === fakeArtistPlayer.id) {
      // El artista falso fue descubierto
      set({
        gameResult: 'fake-artist-discovered',
        gameStatus: 'results',
      });
    } else if (mostVoted) {
      // Un artista real fue eliminado
      set({
        gameResult: 'fake-artist-wins',
        gameStatus: 'results',
      });
    } else {
      // Empate - el artista falso gana
      set({
        gameResult: 'fake-artist-wins',
        gameStatus: 'results',
      });
    }
  },
  
  submitFakeArtistGuess: (guess) => {
    const state = get();
    const correct = guess.toLowerCase().trim() === state.secretWord.toLowerCase().trim();
    
    set({
      fakeArtistGuess: guess,
      gameResult: correct ? 'fake-artist-guessed' : 'real-artists-win',
    });
  },
  
  resetGame: () => {
    set({
      gameStatus: 'setup',
      players: [],
      currentMasterIndex: 0,
      fakeArtistIndex: null,
      secretWord: null,
      selectedCategory: null,
      drawingStrokes: [],
      currentTurnIndex: 0,
      strokesPerPlayer: 0,
      votes: {},
      discussionPhase: false,
      gameResult: null,
      fakeArtistGuess: null,
      numRounds: 1,
    });
  },
  
  nextRound: () => {
    const state = get();
    const nextMasterIndex = (state.currentMasterIndex + 1) % state.players.length;
    
    set({
      currentMasterIndex: nextMasterIndex,
      gameStatus: 'lobby',
      secretWord: null,
      selectedCategory: null,
      drawingStrokes: [],
      currentTurnIndex: 0,
      strokesPerPlayer: 0,
      votes: {},
      discussionPhase: false,
      gameResult: null,
      fakeArtistGuess: null,
    });
  },
}));

