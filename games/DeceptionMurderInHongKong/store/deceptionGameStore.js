import { create } from 'zustand';
import { WEAPONS, CLUES, SCENE_TILES, shuffleArray } from '../constants/DeceptionCards';
import { DECEPTION_ROLES } from '../constants/DeceptionRoles';

export const useDeceptionGameStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'night_phase', 'role_reveal', 'playing', 'finished'
  currentRound: 1,
  maxRounds: 3,
  
  // Configuración
  setMaxRounds: (rounds) => set({ maxRounds: Math.max(1, Math.min(5, rounds)) }),

  // Jugadores
  players: [], // [{ id, name, role, weaponCards: [], clueCards: [], hasBadge: true, eliminated: false }]
  currentPlayerId: null,
  forensicScientistId: null,
  murdererId: null,
  
  // Solución del crimen
  solution: {
    weapon: null,
    clue: null,
  },

  // Estado de la ronda
  currentSceneTile: null,
  selectedSceneOption: null,
  sceneTilesHistory: [], // Historial de fichas de escena usadas
  
  // Acusaciones
  accusations: [], // [{ playerId, weapon, clue, correct: boolean }]
  pendingAccusation: null,
  
  // Estado del turno
  phase: 'discussion', // 'discussion', 'accusation', 'resolution'
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      role: null,
      weaponCards: [],
      clueCards: [],
      hasBadge: true, // Los investigadores tienen una placa
      eliminated: false,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },

  removePlayer: (playerId) => {
    const { players } = get();
    set({ players: players.filter(p => p.id !== playerId) });
  },

  // Asignar roles a los jugadores
  assignRoles: () => {
    const { players } = get();
    if (players.length < 4) {
      return false; // Mínimo 4 jugadores
    }

    const shuffledPlayers = shuffleArray([...players]);
    const shuffledRoles = shuffleArray([
      DECEPTION_ROLES.MURDERER,
      DECEPTION_ROLES.FORENSIC_SCIENTIST,
      ...Array(players.length - 2).fill(DECEPTION_ROLES.INVESTIGATOR),
    ]);

    const updatedPlayers = shuffledPlayers.map((player, index) => {
      const role = shuffledRoles[index];
      return {
        ...player,
        role,
      };
    });

    const murdererIndex = updatedPlayers.findIndex(p => p.role === DECEPTION_ROLES.MURDERER);
    const forensicIndex = updatedPlayers.findIndex(p => p.role === DECEPTION_ROLES.FORENSIC_SCIENTIST);

    set({
      players: updatedPlayers,
      murdererId: updatedPlayers[murdererIndex]?.id,
      forensicScientistId: updatedPlayers[forensicIndex]?.id,
      gameStatus: 'night_phase',
    });

    return true;
  },

  // Repartir cartas a los jugadores
  dealCards: () => {
    const { players } = get();
    const shuffledWeapons = shuffleArray([...WEAPONS]);
    const shuffledClues = shuffleArray([...CLUES]);

    const updatedPlayers = players.map((player, index) => {
      // Cada jugador recibe 4 armas y 4 pistas
      const startIndex = index * 4;
      return {
        ...player,
        weaponCards: shuffledWeapons.slice(startIndex, startIndex + 4),
        clueCards: shuffledClues.slice(startIndex, startIndex + 4),
      };
    });

    set({ players: updatedPlayers });
  },

  // Asesino selecciona la solución
  murdererSelectSolution: (weaponId, clueId) => {
    const { murdererId } = get();
    if (!murdererId) return false;

    const weapon = WEAPONS.find(w => w.id === weaponId);
    const clue = CLUES.find(c => c.id === clueId);

    if (!weapon || !clue) return false;

    set({
      solution: { weapon, clue },
      gameStatus: 'role_reveal',
    });

    return true;
  },

  // Científico Forense recibe fichas de escena
  getSceneTiles: () => {
    const shuffledTiles = shuffleArray([...SCENE_TILES]);
    return shuffledTiles.slice(0, 6); // 6 fichas al azar
  },

  // Científico Forense selecciona una opción en una ficha de escena
  forensicSelectOption: (sceneTileId, option) => {
    const { forensicScientistId } = get();
    if (!forensicScientistId) return false;

    const sceneTile = SCENE_TILES.find(t => t.id === sceneTileId);
    if (!sceneTile) return false;

    set({
      currentSceneTile: sceneTile,
      selectedSceneOption: option,
      sceneTilesHistory: [...get().sceneTilesHistory, { sceneTile, option }],
      phase: 'discussion',
    });

    return true;
  },

  // Iniciar ronda
  startRound: () => {
    const { currentRound, maxRounds } = get();
    if (currentRound >= maxRounds) {
      set({ gameStatus: 'finished', phase: 'resolution' });
      return false;
    }

    set({
      phase: 'discussion',
      currentRound: currentRound + 1,
      gameStatus: 'playing',
    });

    return true;
  },

  // Investigador hace una acusación
  makeAccusation: (playerId, weaponId, clueId) => {
    const { players, solution } = get();
    const player = players.find(p => p.id === playerId);
    
    if (!player || !player.hasBadge) return false;

    const weapon = WEAPONS.find(w => w.id === weaponId);
    const clue = CLUES.find(c => c.id === clueId);

    if (!weapon || !clue) return false;

    const isCorrect = 
      weapon.id === solution.weapon?.id && 
      clue.id === solution.clue?.id;

    const accusation = {
      playerId,
      weapon,
      clue,
      correct: isCorrect,
      timestamp: Date.now(),
    };

    // El jugador pierde su placa
    const updatedPlayers = players.map(p => 
      p.id === playerId ? { ...p, hasBadge: false } : p
    );

    set({
      accusations: [...get().accusations, accusation],
      players: updatedPlayers,
    });

    if (isCorrect) {
      set({ gameStatus: 'finished', phase: 'resolution' });
    }

    return accusation;
  },

  // Resetear el juego
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      currentRound: 1,
      players: [],
      currentPlayerId: null,
      forensicScientistId: null,
      murdererId: null,
      solution: { weapon: null, clue: null },
      currentSceneTile: null,
      selectedSceneOption: null,
      sceneTilesHistory: [],
      accusations: [],
      pendingAccusation: null,
      phase: 'discussion',
    });
  },

  // Inicializar juego completo
  initializeGame: () => {
    const { assignRoles, dealCards } = get();
    if (assignRoles()) {
      dealCards();
      set({ gameStatus: 'night_phase' });
      return true;
    }
    return false;
  },
  
  // Establecer estado de juego
  setGameStatus: (status) => set({ gameStatus: status }),
}));
