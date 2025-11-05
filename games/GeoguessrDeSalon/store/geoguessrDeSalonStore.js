import { create } from 'zustand';
import { getRandomLocation } from '../constants/GeoguessrDeSalonLocations';

// Modos de juego
export const GAME_MODES = {
  COUNTRY: 'country', // Adivinar País
  CITY: 'city', // Adivinar Ciudad
};

// Estados del juego
export const GAME_STATUS = {
  SETUP: 'setup',
  PLAYING: 'playing',
  ROUND_ENDED: 'round_ended',
  FINISHED: 'finished',
};

export const useGeoguessrDeSalonStore = create((set, get) => ({
  // Estado del juego
  gameStatus: GAME_STATUS.SETUP,
  gameMode: GAME_MODES.COUNTRY,
  totalRounds: 5,
  currentRound: 0,
  
  // Jugadores
  players: [], // [{ id, name, score }]
  currentGuideId: null, // ID del jugador que es el Guía actual
  currentExplorers: [], // IDs de los jugadores que son Exploradores
  
  // Ubicación actual
  currentLocation: null, // { id, name, imageUrl, country, city, coordinates }
  
  // Estado de la ronda
  hasGuessed: false, // Si alguien ya intentó adivinar
  roundEnded: false, // Si la ronda ha terminado
  
  // Historial
  roundHistory: [], // [{ round, location, guideId, winnerId, score }]

  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      score: 0,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },

  removePlayer: (playerId) => {
    const { players } = get();
    set({ players: players.filter(p => p.id !== playerId) });
  },

  // Configuración del juego
  setGameMode: (mode) => {
    set({ gameMode: mode });
  },

  setTotalRounds: (rounds) => {
    set({ totalRounds: rounds });
  },

  // Iniciar juego
  startGame: () => {
    const { players, totalRounds } = get();
    if (players.length < 2) {
      return false; // Mínimo 2 jugadores
    }

    // Seleccionar el primer Guía aleatoriamente
    const randomIndex = Math.floor(Math.random() * players.length);
    const firstGuide = players[randomIndex];
    const explorers = players.filter(p => p.id !== firstGuide.id);

    set({
      gameStatus: GAME_STATUS.PLAYING,
      currentRound: 1,
      currentGuideId: firstGuide.id,
      currentExplorers: explorers.map(p => p.id),
    });

    // Seleccionar primera ubicación
    get().selectNewLocation();

    return true;
  },

  // Seleccionar nueva ubicación
  selectNewLocation: () => {
    const { gameMode } = get();
    const location = getRandomLocation(gameMode);
    set({ 
      currentLocation: location,
      hasGuessed: false,
      roundEnded: false,
    });
  },

  // Registrar intento de adivinanza
  attemptGuess: (explorerId, guess) => {
    const { currentLocation, currentGuideId, players, currentRound, roundEnded } = get();
    if (!currentLocation || roundEnded) return false;

    const explorer = players.find(p => p.id === explorerId);
    if (!explorer || explorer.id === currentGuideId) return false;

    const isCorrect = guess.toLowerCase().trim() === currentLocation.name.toLowerCase().trim();
    
    if (isCorrect) {
      // El explorador gana un punto
      const updatedPlayers = players.map(p => 
        p.id === explorerId ? { ...p, score: p.score + 1 } : p
      );
      
      set({
        players: updatedPlayers,
        hasGuessed: true,
        roundEnded: true,
        roundHistory: [
          ...get().roundHistory,
          {
            round: currentRound,
            location: currentLocation,
            guideId: currentGuideId,
            winnerId: explorerId,
            score: updatedPlayers.find(p => p.id === explorerId).score,
          },
        ],
      });

      return { success: true, message: '¡Correcto!' };
    } else {
      // Penalización: el explorador no puede preguntar en su siguiente turno
      set({ hasGuessed: true });
      return { success: false, message: 'Incorrecto. No puedes preguntar en tu siguiente turno.' };
    }
  },

  // Siguiente ronda
  nextRound: () => {
    const { currentRound, totalRounds, players, currentGuideId } = get();
    
    if (currentRound >= totalRounds) {
      // Fin del juego
      set({ gameStatus: GAME_STATUS.FINISHED });
      return false;
    }

    // Rotar el Guía
    const currentGuideIndex = players.findIndex(p => p.id === currentGuideId);
    const nextGuideIndex = (currentGuideIndex + 1) % players.length;
    const nextGuide = players[nextGuideIndex];
    const nextExplorers = players.filter(p => p.id !== nextGuide.id);

    set({
      currentRound: currentRound + 1,
      currentGuideId: nextGuide.id,
      currentExplorers: nextExplorers.map(p => p.id),
      hasGuessed: false,
      roundEnded: false,
    });

    // Seleccionar nueva ubicación
    get().selectNewLocation();

    return true;
  },

  // Terminar ronda sin ganador
  endRoundWithoutWinner: () => {
    const { currentLocation, currentGuideId, currentRound, roundEnded } = get();
    if (roundEnded) return false;

    set({
      roundEnded: true,
      hasGuessed: true,
      roundHistory: [
        ...get().roundHistory,
        {
          round: currentRound,
          location: currentLocation,
          guideId: currentGuideId,
          winnerId: null,
          score: 0,
        },
      ],
    });

    return true;
  },

  // Continuar después de revelar ubicación
  continueAfterReveal: () => {
    const { currentRound, totalRounds } = get();
    if (currentRound >= totalRounds) {
      set({ gameStatus: GAME_STATUS.FINISHED });
    } else {
      get().nextRound();
    }
  },

  // Obtener ganador
  getWinner: () => {
    const { players } = get();
    if (players.length === 0) return null;
    
    const maxScore = Math.max(...players.map(p => p.score));
    const winners = players.filter(p => p.score === maxScore);
    
    return winners.length === 1 ? winners[0] : winners; // Puede haber empate
  },

  // Resetear juego
  resetGame: () => {
    set({
      gameStatus: GAME_STATUS.SETUP,
      gameMode: GAME_MODES.COUNTRY,
      totalRounds: 5,
      currentRound: 0,
      players: [],
      currentGuideId: null,
      currentExplorers: [],
      currentLocation: null,
      hasGuessed: false,
      roundEnded: false,
      roundHistory: [],
    });
  },
}));

