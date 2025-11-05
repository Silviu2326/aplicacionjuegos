import { create } from 'zustand';
import { TASKS, SABOTAGES, GAME_CONFIG, PLAYER_COLORS } from '../constants/AmongUsMesaGameSettings';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useAmongUsMesaStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'role-reveal', 'playing', 'meeting', 'voting', 'results'
  
  // Sala de juego
  roomCode: null,
  hostPlayerId: null,
  
  // Jugadores
  players: [], // [{ id, name, color, role, isAlive, location, tasks }]
  
  // Roles y asignación
  impostorCount: 1,
  impostorIds: [],
  
  // Tareas
  allTasks: [],
  completedTasks: 0,
  totalTasks: 0,
  taskProgress: 0, // 0-100
  
  // Ubicación
  currentLocation: null,
  
  // Reuniones y votaciones
  meetingActive: false,
  meetingCause: null, // 'body-reported', 'emergency-button'
  discussionTime: GAME_CONFIG.DISCUSSION_TIME,
  votes: {}, // { playerId: votedPlayerId }
  voteResults: null,
  ejectedPlayer: null,
  
  // Sabotajes
  activeSabotage: null,
  sabotageTimer: null,
  
  // Cuerpos reportados
  reportedBodies: [], // [{ playerId, location, reporterId }]
  
  // Configuración
  settings: {
    impostorCount: 1,
    taskCount: 3,
    discussionTime: GAME_CONFIG.DISCUSSION_TIME,
    votingTime: GAME_CONFIG.VOTING_TIME,
    emergencyCooldown: GAME_CONFIG.EMERGENCY_COOLDOWN,
  },
  
  // Acciones
  createRoom: (hostName) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const hostId = Date.now().toString();
    const hostPlayer = {
      id: hostId,
      name: hostName,
      color: PLAYER_COLORS[0],
      role: null,
      isAlive: true,
      location: null,
      tasks: [],
      isHost: true,
    };
    
    set({
      roomCode,
      hostPlayerId: hostId,
      players: [hostPlayer],
      gameStatus: 'lobby',
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
    
    const availableColors = PLAYER_COLORS.filter(
      color => !state.players.some(p => p.color === color)
    );
    
    const newPlayer = {
      id: Date.now().toString(),
      name: playerName,
      color: availableColors[0] || PLAYER_COLORS[state.players.length],
      role: null,
      isAlive: true,
      location: null,
      tasks: [],
      isHost: false,
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
  
  updateSettings: (newSettings) => {
    set({
      settings: { ...get().settings, ...newSettings },
    });
  },
  
  startGame: () => {
    const state = get();
    if (state.players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Calcular número de impostores según número de jugadores
    const impostorCount = Math.min(
      state.settings.impostorCount,
      Math.floor(state.players.length / 2)
    );
    
    // Asignar roles
    const shuffledPlayers = shuffleArray([...state.players]);
    const impostorIds = [];
    
    for (let i = 0; i < impostorCount; i++) {
      impostorIds.push(shuffledPlayers[i].id);
    }
    
    // Asignar tareas a los tripulantes
    const shuffledTasks = shuffleArray([...TASKS]);
    const playersWithTasks = state.players.map((player) => {
      const isImpostor = impostorIds.includes(player.id);
      const playerTasks = isImpostor
        ? []
        : shuffledTasks.slice(0, state.settings.taskCount).map(task => ({
            ...task,
            completed: false,
          }));
      
      return {
        ...player,
        role: isImpostor ? 'impostor' : 'crewmate',
        tasks: playerTasks,
        location: 'cafeteria', // Empezar en cafetería
      };
    });
    
    // Calcular total de tareas
    const totalTasks = playersWithTasks.reduce(
      (sum, player) => sum + (player.role === 'crewmate' ? player.tasks.length : 0),
      0
    );
    
    set({
      players: playersWithTasks,
      impostorCount,
      impostorIds,
      gameStatus: 'role-reveal',
      allTasks: shuffledTasks,
      completedTasks: 0,
      totalTasks,
      taskProgress: 0,
      meetingActive: false,
      votes: {},
      reportedBodies: [],
      activeSabotage: null,
    });
    
    return true;
  },
  
  revealRoleToPlayer: (playerId) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player) return null;
    
    return {
      role: player.role,
      tasks: player.tasks,
      isImpostor: player.role === 'impostor',
    };
  },
  
  startPlaying: () => {
    set({
      gameStatus: 'playing',
    });
  },
  
  updatePlayerLocation: (playerId, location) => {
    const state = get();
    set({
      players: state.players.map(p =>
        p.id === playerId ? { ...p, location } : p
      ),
    });
  },
  
  completeTask: (playerId, taskId) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || player.role !== 'crewmate') return false;
    
    const task = player.tasks.find(t => t.id === taskId);
    if (!task || task.completed) return false;
    
    // Marcar tarea como completada
    const updatedPlayers = state.players.map(p => {
      if (p.id === playerId) {
        const updatedTasks = p.tasks.map(t =>
          t.id === taskId ? { ...t, completed: true } : t
        );
        return { ...p, tasks: updatedTasks };
      }
      return p;
    });
    
    // Calcular progreso
    const totalCompleted = updatedPlayers.reduce(
      (sum, p) => sum + p.tasks.filter(t => t.completed).length,
      0
    );
    
    const newProgress = (totalCompleted / state.totalTasks) * 100;
    
    set({
      players: updatedPlayers,
      completedTasks: totalCompleted,
      taskProgress: newProgress,
    });
    
    // Verificar victoria por tareas
    if (newProgress >= 100) {
      setTimeout(() => {
        set({
          gameStatus: 'results',
        });
      }, 1000);
    }
    
    return true;
  },
  
  reportBody: (reporterId, bodyPlayerId, location) => {
    const state = get();
    const bodyPlayer = state.players.find(p => p.id === bodyPlayerId);
    if (!bodyPlayer || bodyPlayer.isAlive) return false;
    
    set({
      meetingActive: true,
      meetingCause: 'body-reported',
      gameStatus: 'meeting',
      discussionTime: GAME_CONFIG.DISCUSSION_TIME,
      votes: {},
      reportedBodies: [
        ...state.reportedBodies,
        { playerId: bodyPlayerId, location, reporterId },
      ],
    });
    
    return true;
  },
  
  callEmergencyMeeting: (playerId) => {
    const state = get();
    set({
      meetingActive: true,
      meetingCause: 'emergency-button',
      gameStatus: 'meeting',
      discussionTime: GAME_CONFIG.DISCUSSION_TIME,
      votes: {},
    });
    
    return true;
  },
  
  startVoting: () => {
    set({
      gameStatus: 'voting',
      votes: {},
    });
  },
  
  castVote: (voterId, votedPlayerId) => {
    const state = get();
    const voter = state.players.find(p => p.id === voterId);
    if (!voter || !voter.isAlive) return false;
    
    set({
      votes: {
        ...get().votes,
        [voterId]: votedPlayerId || 'skip',
      },
    });
  },
  
  finishVoting: () => {
    const state = get();
    const votes = state.votes;
    const voteCounts = {};
    
    // Contar votos (excluyendo 'skip')
    Object.values(votes).forEach((votedId) => {
      if (votedId !== 'skip') {
        voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
      }
    });
    
    // Encontrar el más votado
    const maxVotes = Math.max(...Object.values(voteCounts), 0);
    const mostVoted = Object.keys(voteCounts).find(
      (id) => voteCounts[id] === maxVotes
    );
    
    let ejectedPlayer = null;
    if (mostVoted && maxVotes > 0) {
      const player = state.players.find(p => p.id === mostVoted);
      if (player) {
        ejectedPlayer = {
          ...player,
          isAlive: false,
        };
      }
    }
    
    // Actualizar estado del jugador expulsado
    const updatedPlayers = state.players.map(p =>
      p.id === mostVoted ? { ...p, isAlive: false } : p
    );
    
    set({
      voteResults: voteCounts,
      ejectedPlayer,
      players: updatedPlayers,
    });
    
    // Verificar condiciones de victoria
    setTimeout(() => {
      const newState = get();
      const alivePlayers = newState.players.filter(p => p.isAlive);
      const aliveImpostors = alivePlayers.filter(p =>
        newState.impostorIds.includes(p.id)
      );
      const aliveCrewmates = alivePlayers.filter(p =>
        !newState.impostorIds.includes(p.id)
      );
      
      // Impostores ganan si son iguales o más que tripulantes
      if (aliveImpostors.length >= aliveCrewmates.length) {
        set({
          gameStatus: 'results',
        });
      } else if (aliveImpostors.length === 0) {
        // Tripulantes ganan si no quedan impostores
        set({
          gameStatus: 'results',
        });
      } else {
        // Continuar el juego
        set({
          gameStatus: 'playing',
          meetingActive: false,
          ejectedPlayer: null,
          voteResults: null,
        });
      }
    }, 3000);
  },
  
  sabotage: (playerId, sabotageId, targetRoom = null) => {
    const state = get();
    const player = state.players.find(p => p.id === playerId);
    if (!player || player.role !== 'impostor' || !player.isAlive) return false;
    
    const sabotage = SABOTAGES.find(s => s.id === sabotageId);
    if (!sabotage) return false;
    
    set({
      activeSabotage: {
        ...sabotage,
        room: targetRoom || sabotage.room,
        startTime: Date.now(),
      },
    });
    
    return true;
  },
  
  fixSabotage: (playerId, sabotageId) => {
    const state = get();
    const sabotage = state.activeSabotage;
    if (!sabotage || sabotage.id !== sabotageId) return false;
    
    set({
      activeSabotage: null,
    });
    
    return true;
  },
  
  eliminatePlayer: (killerId, victimId) => {
    const state = get();
    const killer = state.players.find(p => p.id === killerId);
    const victim = state.players.find(p => p.id === victimId);
    
    if (!killer || !victim) return false;
    if (killer.role !== 'impostor' || !killer.isAlive) return false;
    if (!victim.isAlive || victim.role === 'impostor') return false;
    if (killer.location !== victim.location) return false;
    
    set({
      players: state.players.map(p =>
        p.id === victimId ? { ...p, isAlive: false } : p
      ),
    });
    
    // Verificar condiciones de victoria
    const newState = get();
    const alivePlayers = newState.players.filter(p => p.isAlive);
    const aliveImpostors = alivePlayers.filter(p =>
      newState.impostorIds.includes(p.id)
    );
    const aliveCrewmates = alivePlayers.filter(p =>
      !newState.impostorIds.includes(p.id)
    );
    
    if (aliveImpostors.length >= aliveCrewmates.length) {
      setTimeout(() => {
        set({
          gameStatus: 'results',
        });
      }, 1000);
    }
    
    return true;
  },
  
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      players: get().players.map(p => ({
        ...p,
        role: null,
        isAlive: true,
        location: null,
        tasks: [],
      })),
      impostorIds: [],
      completedTasks: 0,
      taskProgress: 0,
      meetingActive: false,
      votes: {},
      reportedBodies: [],
      activeSabotage: null,
      ejectedPlayer: null,
      voteResults: null,
    });
  },
}));

