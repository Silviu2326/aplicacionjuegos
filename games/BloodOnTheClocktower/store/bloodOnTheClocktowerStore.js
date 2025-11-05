import { create } from 'zustand';
import { ROLES, PLAYER_CONFIG, GAME_CONFIG, SCRIPT_TROUBLE_BREWING } from '../constants/BloodOnTheClocktowerRoles';
import { getScriptById } from '../constants/BloodOnTheClocktowerScripts';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const generatePlayerColors = (count) => {
  const colors = [
    '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF',
    '#00FFFF', '#FFA500', '#800080', '#FFC0CB', '#A52A2A',
    '#808080', '#000000', '#FFFFFF', '#8B4513', '#4169E1',
  ];
  return colors.slice(0, count);
};

export const useBloodOnTheClocktowerStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'first-night', 'day', 'night', 'nomination', 'voting', 'execution', 'results'
  phase: null, // 'day', 'night'
  dayNumber: 0,
  
  // Sala de juego
  roomCode: null,
  hostPlayerId: null,
  storytellerId: null, // ID del jugador que es el Narrador
  
  // Jugadores
  players: [], // [{ id, name, color, roleId, alignment, team, isAlive, isDead, ghostVoteUsed, nominatedBy, onBlock }]
  
  // Roles y asignación
  currentScript: 'trouble-brewing',
  assignedRoles: {}, // { playerId: roleId }
  grimoire: {}, // Estado del grimorio del Narrador (información secreta)
  
  // Fase de noche
  nightActions: {}, // { roleId: [actions] } - acciones nocturnas pendientes
  nightPhaseStep: 0, // Paso actual en la secuencia nocturna
  nightSequence: [], // Secuencia de roles que actúan en la noche
  
  // Nominaciones y votaciones
  nominations: [], // [{ nominatorId, nomineeId, timestamp }]
  currentNomination: null, // Nomination en proceso
  votes: {}, // { voterId: { nomineeId, timestamp } }
  voteResults: {}, // { nomineeId: voteCount }
  executedPlayer: null, // Jugador ejecutado en el día actual
  
  // Condiciones especiales
  poisonedPlayers: [], // IDs de jugadores envenenados
  protectedPlayers: [], // IDs de jugadores protegidos
  deadByNight: [], // Jugadores que murieron durante la noche
  
  // Eventos y registro
  gameLog: [], // [{ type, message, timestamp, playerId? }]
  
  // Configuración
  settings: {
    script: 'trouble-brewing',
    discussionTime: GAME_CONFIG.DISCUSSION_TIME,
    nominationTime: GAME_CONFIG.NOMINATION_TIME,
    votingTime: GAME_CONFIG.VOTING_TIME,
    nightTime: GAME_CONFIG.NIGHT_TIME,
  },
  
  // Acciones
  createRoom: (hostName, isStoryteller = false) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const hostId = Date.now().toString();
    const hostPlayer = {
      id: hostId,
      name: hostName,
      color: generatePlayerColors(1)[0],
      roleId: null,
      alignment: null,
      team: null,
      isAlive: true,
      isDead: false,
      ghostVoteUsed: false,
      nominatedBy: null,
      onBlock: false,
      isHost: true,
      isStoryteller: isStoryteller,
    };
    
    set({
      roomCode,
      hostPlayerId: hostId,
      storytellerId: isStoryteller ? hostId : null,
      players: [hostPlayer],
      gameStatus: 'lobby',
      currentScript: 'trouble-brewing',
    });
    
    return roomCode;
  },
  
  joinRoom: (roomCode, playerName) => {
    const state = get();
    if (state.roomCode !== roomCode) {
      return false;
    }
    
    if (state.players.length >= GAME_CONFIG.MAX_PLAYERS) {
      return false;
    }
    
    if (state.players.find(p => p.name === playerName)) {
      return false; // Nombre ya existe
    }
    
    const colors = generatePlayerColors(state.players.length + 1);
    const usedColors = state.players.map(p => p.color);
    const availableColors = colors.filter(c => !usedColors.includes(c));
    
    const newPlayer = {
      id: Date.now().toString(),
      name: playerName,
      color: availableColors[0] || colors[state.players.length],
      roleId: null,
      alignment: null,
      team: null,
      isAlive: true,
      isDead: false,
      ghostVoteUsed: false,
      nominatedBy: null,
      onBlock: false,
      isHost: false,
      isStoryteller: false,
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
  
  setStoryteller: (playerId) => {
    set({
      storytellerId: playerId,
      players: get().players.map(p => ({
        ...p,
        isStoryteller: p.id === playerId,
      })),
    });
  },
  
  updateSettings: (newSettings) => {
    set({
      settings: { ...get().settings, ...newSettings },
      currentScript: newSettings.script || get().currentScript,
    });
  },
  
  startGame: () => {
    const state = get();
    if (state.players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    const script = getScriptById(state.currentScript);
    const playerCount = state.players.length;
    const config = PLAYER_CONFIG[playerCount] || PLAYER_CONFIG[15];
    
    // Preparar roles disponibles
    const availableTownsfolk = shuffleArray([...script.townsfolk]);
    const availableOutsiders = shuffleArray([...script.outsiders]);
    const availableMinions = shuffleArray([...script.minions]);
    const availableDemons = shuffleArray([...script.demon]);
    
    // Seleccionar roles según configuración
    const selectedTownsfolk = availableTownsfolk.slice(0, config.townsfolk);
    const selectedOutsiders = availableOutsiders.slice(0, config.outsiders);
    const selectedMinions = availableMinions.slice(0, config.minions);
    const selectedDemon = availableDemons[0];
    
    const allRoles = [
      ...selectedTownsfolk,
      ...selectedOutsiders,
      ...selectedMinions,
      selectedDemon,
    ];
    
    // Asignar roles aleatoriamente
    const shuffledPlayers = shuffleArray([...state.players]);
    const assignedRoles = {};
    const playersWithRoles = shuffledPlayers.map((player, index) => {
      const roleId = allRoles[index];
      const role = ROLES[roleId.toUpperCase().replace(/-/g, '_')];
      assignedRoles[player.id] = roleId;
      
      return {
        ...player,
        roleId,
        alignment: role?.alignment || null,
        team: role?.team || null,
      };
    });
    
    // Inicializar grimorio (información del Narrador)
    const grimoire = {
      demonId: shuffledPlayers[allRoles.indexOf(selectedDemon)].id,
      minionIds: selectedMinions.map(minionRole => {
        const minionIndex = allRoles.indexOf(minionRole);
        return shuffledPlayers[minionIndex].id;
      }),
      roleAssignments: assignedRoles,
    };
    
    // Preparar secuencia de primera noche
    const firstNightSequence = [];
    const firstNightRoles = shuffledPlayers
      .map((p, idx) => ({ player: p, roleId: allRoles[idx] }))
      .filter(({ roleId }) => {
        const role = ROLES[roleId.toUpperCase().replace(/-/g, '_')];
        return role?.firstNight === true;
      })
      .sort((a, b) => {
        // Orden específico de primera noche (simplificado)
        const order = ['imp', 'envenenador', 'espia', 'barones', 'escarleta', 'lavandera', 'bibliotecario', 'investigador', 'cocinero', 'empatico', 'adivino'];
        return (order.indexOf(a.roleId) || 999) - (order.indexOf(b.roleId) || 999);
      });
    
    // Inicializar gameLog con datos falsos para simular una partida
    const initialGameLog = [
      {
        type: 'info',
        message: 'La partida ha comenzado. Los roles han sido asignados.',
        timestamp: Date.now(),
      },
      {
        type: 'info',
        message: `Bienvenidos a Trouble Brewing. ${playerCount} jugadores están listos para jugar.`,
        timestamp: Date.now() + 1000,
      },
    ];
    
    set({
      players: playersWithRoles,
      assignedRoles,
      grimoire,
      gameStatus: 'setup',
      phase: 'first-night',
      dayNumber: 0,
      nightPhaseStep: 0,
      nightSequence: firstNightRoles,
      nominations: [],
      votes: {},
      executedPlayer: null,
      poisonedPlayers: [],
      protectedPlayers: [],
      deadByNight: [],
      gameLog: initialGameLog,
    });
    
    return true;
  },
  
  getPlayerRole: (playerId) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || !player.roleId) return null;
    
    const roleKey = player.roleId.toUpperCase().replace(/-/g, '_');
    return ROLES[roleKey] || null;
  },
  
  advanceNightPhase: () => {
    const state = get();
    const nextStep = state.nightPhaseStep + 1;
    
    if (nextStep >= state.nightSequence.length) {
      // Noche completa, avanzar a día
      set({
        phase: 'day',
        dayNumber: state.dayNumber + 1,
        nightPhaseStep: 0,
        nightSequence: [],
        protectedPlayers: [], // Limpiar protección al inicio del día
      });
    } else {
      set({
        nightPhaseStep: nextStep,
      });
    }
  },
  
  executeNightAction: (playerId, action, targetPlayerId = null, data = {}) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || !player.isAlive) return false;
    
    // Registrar acción nocturna
    const nightActions = {
      ...state.nightActions,
      [playerId]: {
        action,
        targetPlayerId,
        data,
        timestamp: Date.now(),
      },
    };
    
    set({ nightActions });
    return true;
  },
  
  startDay: () => {
    const state = get();
    
    // Anunciar muertes nocturnas
    const deadByNight = state.deadByNight;
    const updatedPlayers = state.players.map(p => {
      if (deadByNight.includes(p.id) && p.isAlive) {
        return { ...p, isAlive: false, isDead: true };
      }
      return p;
    });
    
    // Agregar al log
    const gameLog = [...state.gameLog];
    if (deadByNight.length > 0) {
      deadByNight.forEach(playerId => {
        const player = updatedPlayers.find(p => p.id === playerId);
        if (player) {
          gameLog.push({
            type: 'death',
            message: `${player.name} ha sido encontrado muerto esta mañana.`,
            timestamp: Date.now(),
            playerId,
          });
        }
      });
    }
    
    set({
      phase: 'day',
      dayNumber: state.dayNumber + 1,
      players: updatedPlayers,
      deadByNight: [],
      gameLog,
      gameStatus: 'day',
    });
  },
  
  startNight: () => {
    const state = get();
    
    // Preparar secuencia nocturna (roles que actúan de noche)
    const nightSequence = state.players
      .filter(p => p.isAlive && p.roleId)
      .map(p => {
        const roleKey = p.roleId.toUpperCase().replace(/-/g, '_');
        const role = ROLES[roleKey] || null;
        return { player: p, roleId: p.roleId, role };
      })
      .filter(({ role }) => role && role.otherNights === true)
      .sort((a, b) => {
        // Orden específico de noche (simplificado)
        const order = ['imp', 'envenenador', 'monje', 'empatico', 'adivino', 'enterrador'];
        return (order.indexOf(a.roleId) || 999) - (order.indexOf(b.roleId) || 999);
      });
    
    set({
      phase: 'night',
      nightPhaseStep: 0,
      nightSequence,
      nominations: [],
      currentNomination: null,
      votes: {},
      executedPlayer: null,
      protectedPlayers: [],
      gameStatus: 'night',
    });
  },
  
  nominatePlayer: (nominatorId, nomineeId) => {
    const state = get();
    const nominator = state.players.find(p => p.id === nominatorId);
    const nominee = state.players.find(p => p.id === nomineeId);
    
    if (!nominator || !nominee) return false;
    if (!nominator.isAlive) return false; // Solo vivos pueden nominar
    if (state.currentNomination) return false; // Ya hay una nominación en curso
    
    const nomination = {
      nominatorId,
      nomineeId,
      timestamp: Date.now(),
    };
    
    set({
      nominations: [...state.nominations, nomination],
      currentNomination: nomination,
      gameStatus: 'nomination',
    });
    
    // Agregar al log
    const gameLog = [...state.gameLog, {
      type: 'nomination',
      message: `${nominator.name} ha nominado a ${nominee.name}.`,
      timestamp: Date.now(),
      nominatorId,
      nomineeId,
    }];
    
    set({ gameLog });
    
    return true;
  },
  
  startVoting: () => {
    set({
      gameStatus: 'voting',
      votes: {},
    });
  },
  
  castVote: (voterId, nomineeId) => {
    const state = get();
    const voter = state.players.find(p => p.id === voterId);
    
    // Verificar si el votante puede votar
    if (!voter || (!voter.isAlive && voter.ghostVoteUsed)) {
      return false;
    }
    
    const votes = {
      ...state.votes,
      [voterId]: {
        nomineeId,
        timestamp: Date.now(),
      },
    };
    
    // Si es un fantasma, marcar su voto como usado
    const updatedPlayers = state.players.map(p => {
      if (p.id === voterId && !p.isAlive && !p.ghostVoteUsed) {
        return { ...p, ghostVoteUsed: true };
      }
      return p;
    });
    
    set({
      votes,
      players: updatedPlayers,
    });
    
    return true;
  },
  
  finishVoting: () => {
    const state = get();
    const votes = state.votes;
    const alivePlayers = state.players.filter(p => p.isAlive);
    const requiredVotes = Math.ceil(alivePlayers.length / 2);
    
    // Contar votos por nominado
    const voteCounts = {};
    Object.values(votes).forEach(({ nomineeId }) => {
      if (nomineeId) {
        voteCounts[nomineeId] = (voteCounts[nomineeId] || 0) + 1;
      }
    });
    
    const currentNominee = state.currentNomination?.nomineeId;
    const nomineeVotes = voteCounts[currentNominee] || 0;
    
    // Si alcanza la mayoría, el nominado queda en el patíbulo
    if (nomineeVotes >= requiredVotes && currentNominee) {
      const nominee = state.players.find(p => p.id === currentNominee);
      set({
        gameStatus: 'execution',
        players: state.players.map(p =>
          p.id === currentNominee ? { ...p, onBlock: true } : p
        ),
      });
      
      // Agregar al log
      const gameLog = [...state.gameLog, {
        type: 'on-block',
        message: `${nominee.name} está en el patíbulo.`,
        timestamp: Date.now(),
        playerId: currentNominee,
      }];
      
      set({ gameLog });
    } else {
      // No alcanza los votos, cancelar nominación
      set({
        currentNomination: null,
        gameStatus: 'day',
        votes: {},
      });
    }
  },
  
  executePlayer: (playerId) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player) return false;
    
    const updatedPlayers = state.players.map(p =>
      p.id === playerId ? { ...p, isAlive: false, isDead: true, onBlock: false } : p
    );
    
    // Agregar al log
    const gameLog = [...state.gameLog, {
      type: 'execution',
      message: `${player.name} ha sido ejecutado.`,
      timestamp: Date.now(),
      playerId,
    }];
    
    set({
      players: updatedPlayers,
      executedPlayer: playerId,
      currentNomination: null,
      votes: {},
      gameLog,
    });
    
    // Verificar condiciones de victoria
    setTimeout(() => {
      const newState = get();
      const demon = newState.players.find(p => {
        if (!p.roleId) return false;
        const roleKey = p.roleId.toUpperCase().replace(/-/g, '_');
        const role = ROLES[roleKey];
        return role && role.team === 'demon';
      });
      
      const alivePlayers = newState.players.filter(p => p.isAlive);
      
      // Demonio ejecutado = Bien gana
      if (demon && !demon.isAlive) {
        set({ gameStatus: 'results', phase: 'results' });
        return;
      }
      
      // Solo quedan 2 jugadores vivos y el Demonio está vivo = Mal gana
      if (alivePlayers.length === 2 && demon && demon.isAlive) {
        set({ gameStatus: 'results', phase: 'results' });
        return;
      }
      
      // Continuar al día siguiente
      set({ gameStatus: 'day' });
    }, 2000);
  },
  
  killPlayer: (playerId, killerId = null) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || !player.isAlive) return false;
    
    // Verificar si está protegido
    if (state.protectedPlayers.includes(playerId)) {
      return false; // Protegido, no muere
    }
    
    const deadByNight = [...state.deadByNight, playerId];
    
    set({
      deadByNight,
    });
    
    return true;
  },
  
  protectPlayer: (playerId) => {
    const state = get();
    if (!state.protectedPlayers.includes(playerId)) {
      set({
        protectedPlayers: [...state.protectedPlayers, playerId],
      });
    }
  },
  
  poisonPlayer: (playerId) => {
    const state = get();
    if (!state.poisonedPlayers.includes(playerId)) {
      set({
        poisonedPlayers: [...state.poisonedPlayers, playerId],
      });
    }
  },
  
  addGameLogEntry: (type, message, playerId = null) => {
    const gameLog = [...get().gameLog, {
      type,
      message,
      timestamp: Date.now(),
      playerId,
    }];
    set({ gameLog });
  },
  
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      phase: null,
      dayNumber: 0,
      players: get().players.map(p => ({
        ...p,
        roleId: null,
        alignment: null,
        team: null,
        isAlive: true,
        isDead: false,
        ghostVoteUsed: false,
        nominatedBy: null,
        onBlock: false,
      })),
      assignedRoles: {},
      grimoire: {},
      nominations: [],
      currentNomination: null,
      votes: {},
      voteResults: {},
      executedPlayer: null,
      poisonedPlayers: [],
      protectedPlayers: [],
      deadByNight: [],
      gameLog: [],
      nightActions: {},
      nightPhaseStep: 0,
      nightSequence: [],
    });
  },
}));

