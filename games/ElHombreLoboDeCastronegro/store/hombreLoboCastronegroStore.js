import { create } from 'zustand';
import { ROLES, GAME_CONFIG, ROLE_DISTRIBUTION, SPECIAL_ROLES_PRIORITY } from '../constants/hombreLoboCastronegroRoles';
import { GAME_PHASES, NIGHT_SEQUENCE, NARRATOR_MESSAGES, ROLE_ACTION_MESSAGES } from '../constants/hombreLoboCastronegroPhases';

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
    '#FF6347', '#32CD32', '#1E90FF', '#FFD700', '#DA70D6',
    '#CD5C5C', '#4682B4', '#9ACD32', '#FF1493',
  ];
  return colors.slice(0, count);
};

export const useHombreLoboCastronegroStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'first_night', 'night', 'day', 'debate', 'voting', 'revelation', 'finished'
  currentPhase: null, // 'night', 'day'
  dayNumber: 0,
  isFirstNight: true,
  
  // Sala de juego
  roomCode: null,
  hostPlayerId: null,
  
  // Jugadores
  players: [], // [{ id, name, color, roleId, alignment, isAlive, isDead, isProtected, votes, nightAction }]
  
  // Roles asignados
  assignedRoles: {}, // { playerId: roleId }
  
  // Fase de noche
  nightActions: {}, // { playerId: { actionType, targetId? } }
  nightSequenceStep: 0,
  currentNightRole: null,
  nightVictim: null, // Víctima elegida por los lobos
  
  // Fase de día
  debateEndTime: null,
  votingEndTime: null,
  votes: {}, // { voterId: targetId }
  voteResults: {}, // { targetId: voteCount }
  lynchedPlayer: null,
  
  // Condiciones especiales
  lovers: [], // [{ player1Id, player2Id }] - amantes
  protectedPlayers: [], // IDs de jugadores protegidos esta noche
  witchLifePotionUsed: false,
  witchDeathPotionUsed: false,
  witchDeathTarget: null,
  
  // Eventos y registro
  gameLog: [], // [{ type, message, timestamp, playerId? }]
  
  // Estadísticas del juego
  gameStats: {
    totalNights: 0,
    totalDays: 0,
    totalDeaths: 0,
    totalLynches: 0,
    totalNightDeaths: 0,
    rolesRevealed: [], // [{ playerId, roleId, timestamp }]
    investigations: [], // [{ investigatorId, targetId, result, timestamp }]
  },
  
  // Información de investigaciones
  investigationResults: {}, // { investigatorId: { targetId: result } }
  
  // Configuración
  settings: {
    debateTime: GAME_CONFIG.DEBATE_TIME,
    votingTime: GAME_CONFIG.VOTING_TIME,
    nightTime: GAME_CONFIG.NIGHT_TIME,
    selectedRoles: [], // Roles especiales seleccionados
  },
  
  // Acciones
  createRoom: (hostName) => {
    const roomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const hostId = Date.now().toString();
    const hostPlayer = {
      id: hostId,
      name: hostName,
      color: generatePlayerColors(1)[0],
      roleId: null,
      alignment: null,
      isAlive: true,
      isDead: false,
      isProtected: false,
      votes: 0,
      nightAction: null,
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
  
  joinRoom: (code, playerName) => {
    const state = get();
    if (state.roomCode !== code || state.gameStatus !== 'lobby') {
      return false;
    }
    
    const playerId = Date.now().toString();
    const colors = generatePlayerColors(state.players.length + 1);
    const newPlayer = {
      id: playerId,
      name: playerName,
      color: colors[colors.length - 1],
      roleId: null,
      alignment: null,
      isAlive: true,
      isDead: false,
      isProtected: false,
      votes: 0,
      nightAction: null,
      isHost: false,
    };
    
    set((state) => ({
      players: [...state.players, newPlayer],
    }));
    
    return true;
  },
  
  removePlayer: (playerId) => {
    const state = get();
    if (state.gameStatus !== 'lobby' || state.hostPlayerId === playerId) {
      return false;
    }
    
    set((state) => ({
      players: state.players.filter((p) => p.id !== playerId),
    }));
    
    return true;
  },
  
  startGame: () => {
    const state = get();
    if (state.players.length < GAME_CONFIG.MIN_PLAYERS || state.players.length > GAME_CONFIG.MAX_PLAYERS) {
      return false;
    }
    
    // Asignar roles
    const distribution = ROLE_DISTRIBUTION[state.players.length];
    const roleList = [];
    
    // Añadir aldeanos
    for (let i = 0; i < distribution.aldeanos; i++) {
      roleList.push(ROLES.ALDEANO.id);
    }
    
    // Añadir hombres lobo (puede incluir lobo alfa o lobo gris ocasionalmente)
    const totalWolves = distribution.hombres_lobo;
    for (let i = 0; i < totalWolves; i++) {
      // 20% de probabilidad de ser lobo alfa si hay más de 1 lobo
      if (i === 0 && totalWolves > 1 && Math.random() < 0.2) {
        roleList.push(ROLES.LOBO_ALFA.id);
      } else {
        roleList.push(ROLES.HOMBRE_LOBO.id);
      }
    }
    
    // Añadir roles especiales de forma inteligente
    const specialRolesCount = distribution.especiales;
    const availableSpecialRoles = [...SPECIAL_ROLES_PRIORITY];
    
    // Añadir roles especiales
    for (let i = 0; i < specialRolesCount && availableSpecialRoles.length > 0; i++) {
      // Priorizar vidente en la primera posición si está disponible
      let selectedRole;
      if (i === 0 && availableSpecialRoles.includes('vidente')) {
        const index = availableSpecialRoles.indexOf('vidente');
        selectedRole = availableSpecialRoles.splice(index, 1)[0];
      } else {
        const randomIndex = Math.floor(Math.random() * availableSpecialRoles.length);
        selectedRole = availableSpecialRoles.splice(randomIndex, 1)[0];
      }
      
      const roleKey = selectedRole.toUpperCase().replace(/-/g, '_');
      if (ROLES[roleKey]) {
        roleList.push(ROLES[roleKey].id);
      }
    }
    
    const shuffledRoles = shuffleArray(roleList);
    const assignedRoles = {};
    const updatedPlayers = state.players.map((player, index) => {
      const roleId = shuffledRoles[index];
      assignedRoles[player.id] = roleId;
      // Convertir ID a clave del objeto ROLES (ej: 'hombre_lobo' -> 'HOMBRE_LOBO')
      const roleKey = roleId.toUpperCase().replace(/-/g, '_');
      const role = ROLES[roleKey];
      return {
        ...player,
        roleId,
        alignment: role?.alignment || 'good',
      };
    });
    
    set({
      players: updatedPlayers,
      assignedRoles,
      gameStatus: 'setup',
      dayNumber: 0,
      isFirstNight: true,
      gameStats: {
        totalNights: 0,
        totalDays: 0,
        totalDeaths: 0,
        totalLynches: 0,
        totalNightDeaths: 0,
        rolesRevealed: [],
        investigations: [],
      },
      investigationResults: {},
      gameLog: [{
        type: 'game_start',
        message: '🎮 La partida ha comenzado en Castronegro. Los roles han sido asignados en secreto. La primera noche está por llegar...',
        timestamp: Date.now(),
      }],
    });
    
    return true;
  },
  
  assignRoles: () => {
    // Esta función se llama desde la pantalla de setup
    // Los roles ya están asignados en startGame, solo cambiamos el estado
    set({ gameStatus: 'first_night' });
  },
  
  startNightPhase: () => {
    const state = get();
    set({
      gameStatus: state.isFirstNight ? 'first_night' : 'night',
      nightSequenceStep: 0,
      nightActions: {},
      nightVictim: null,
      protectedPlayers: [],
      currentNightRole: null,
    });
    
    // Iniciar secuencia nocturna
    get().processNightSequence();
  },
  
  processNightSequence: () => {
    const state = get();
    const sequence = state.isFirstNight 
      ? NIGHT_SEQUENCE[0] 
      : NIGHT_SEQUENCE[1];
    
    if (state.nightSequenceStep >= sequence.roles.length) {
      // Noche terminada, procesar acciones
      get().resolveNightActions();
      return;
    }
    
    const currentRole = sequence.roles[state.nightSequenceStep];
    const playersWithRole = state.players.filter(
      (p) => p.roleId === currentRole && p.isAlive && !p.isDead
    );
    
    if (playersWithRole.length > 0) {
      set({ currentNightRole: currentRole });
    } else {
      // No hay jugadores con este rol, siguiente paso
      set((state) => ({ nightSequenceStep: state.nightSequenceStep + 1 }));
      setTimeout(() => get().processNightSequence(), 500);
    }
  },
  
  performNightAction: (playerId, actionType, targetId = null, additionalData = {}) => {
    const state = get();
    const player = state.players.find((p) => p.id === playerId);
    if (!player || !player.isAlive || player.isDead) return;
    
    const actions = { ...state.nightActions };
    actions[playerId] = { actionType, targetId, ...additionalData };
    
    // Guardar resultados de investigaciones
    if (actionType === 'investigate' && targetId) {
      const target = state.players.find((p) => p.id === targetId);
      const result = target?.roleId === 'hombre_lobo' || 
                     target?.roleId === 'lobo_alfa' || 
                     target?.roleId === 'lobo_gris' ? 'evil' : 'good';
      
      const investigationResults = { ...state.investigationResults };
      if (!investigationResults[playerId]) {
        investigationResults[playerId] = {};
      }
      investigationResults[playerId][targetId] = result;
      
      set({ 
        nightActions: actions,
        investigationResults,
        gameStats: {
          ...state.gameStats,
          investigations: [
            ...state.gameStats.investigations,
            { investigatorId: playerId, targetId, result, timestamp: Date.now() }
          ],
        },
      });
    } else {
      set({ nightActions: actions });
    }
    
    // Avanzar secuencia si todos los jugadores del rol actual han actuado
    const currentRole = state.currentNightRole;
    const playersWithRole = state.players.filter(
      (p) => p.roleId === currentRole && p.isAlive && !p.isDead
    );
    
    const actionsComplete = playersWithRole.every((p) => actions[p.id]);
    
    if (actionsComplete) {
      set((state) => ({ nightSequenceStep: state.nightSequenceStep + 1 }));
      setTimeout(() => get().processNightSequence(), 1000);
    }
  },
  
  resolveNightActions: () => {
    const state = get();
    let victim = null;
    const actions = state.nightActions;
    const newGameLog = [...state.gameLog];
    
    // Procesar protección primero
    const protector = state.players.find((p) => p.roleId === 'protector' && p.isAlive && actions[p.id]?.targetId);
    const protectedPlayerId = protector ? actions[protector.id].targetId : null;
    const protectedPlayers = protectedPlayerId ? [protectedPlayerId] : [];
    
    // Determinar víctima de los lobos
    const wolves = state.players.filter((p) => 
      (p.roleId === 'hombre_lobo' || p.roleId === 'lobo_alfa' || p.roleId === 'lobo_gris') && p.isAlive
    );
    const wolfVotes = {};
    wolves.forEach((wolf) => {
      if (actions[wolf.id]?.targetId) {
        const target = actions[wolf.id].targetId;
        wolfVotes[target] = (wolfVotes[target] || 0) + 1;
      }
    });
    
    // Encontrar el más votado
    let maxVotes = 0;
    for (const [targetId, votes] of Object.entries(wolfVotes)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        victim = targetId;
      }
    }
    
    // Verificar si la víctima fue protegida
    if (victim && protectedPlayers.includes(victim)) {
      newGameLog.push({
        type: 'protection_success',
        message: NARRATOR_MESSAGES.PROTECTION_SUCCESS.replace('{player}', 
          state.players.find((p) => p.id === victim)?.name || 'Alguien'),
        timestamp: Date.now(),
        playerId: victim,
      });
      victim = null;
    }
    
    // Verificar si la bruja salvó a la víctima
    if (victim && state.witchLifePotionUsed && state.witchDeathTarget === victim) {
      newGameLog.push({
        type: 'witch_saved',
        message: NARRATOR_MESSAGES.WITCH_SAVED.replace('{victim}', 
          state.players.find((p) => p.id === victim)?.name || 'Alguien'),
        timestamp: Date.now(),
        playerId: victim,
      });
      victim = null;
    }
    
    // Aplicar poción de muerte de la bruja
    if (state.witchDeathPotionUsed && state.witchDeathTarget) {
      victim = state.witchDeathTarget;
    }
    
    // Verificar si el anciano sobrevive (primera vez)
    let ancianoSurvived = false;
    if (victim) {
      const target = state.players.find((p) => p.id === victim);
      if (target?.roleId === 'anciano' && !target.hasBeenAttacked) {
        ancianoSurvived = true;
        victim = null;
      }
    }
    
    // Actualizar estado
    let updatedPlayers = state.players.map((p) => {
      if (p.id === victim) {
        return { ...p, isDead: true, isAlive: false };
      }
      if (p.roleId === 'anciano' && ancianoSurvived && p.id === (state.players.find((p) => p.id === victim)?.id)) {
        return { ...p, hasBeenAttacked: true };
      }
      return p;
    });
    
    // Procesar muerte de amantes
    if (victim && state.lovers.length > 0) {
      const loverPair = state.lovers.find((pair) => 
        pair.player1Id === victim || pair.player2Id === victim
      );
      if (loverPair) {
        const otherLoverId = loverPair.player1Id === victim ? loverPair.player2Id : loverPair.player1Id;
        updatedPlayers = updatedPlayers.map((p) => {
          if (p.id === otherLoverId) {
            return { ...p, isDead: true, isAlive: false };
          }
          return p;
        });
        newGameLog.push({
          type: 'lovers_death',
          message: NARRATOR_MESSAGES.LOVERS_DEATH.replace('{lover1}', 
            state.players.find((p) => p.id === victim)?.name || 'Alguien')
            .replace('{lover2}', state.players.find((p) => p.id === otherLoverId)?.name || 'Alguien'),
          timestamp: Date.now(),
        });
      }
    }
    
    set({
      nightVictim: victim,
      players: updatedPlayers,
      protectedPlayers,
      gameStatus: 'day',
      dayNumber: state.dayNumber + 1,
      isFirstNight: false,
      gameStats: {
        ...state.gameStats,
        totalNights: state.gameStats.totalNights + 1,
        totalDeaths: state.gameStats.totalDeaths + (victim ? 1 : 0) + (victim && state.lovers.length > 0 ? 1 : 0),
        totalNightDeaths: state.gameStats.totalNightDeaths + (victim ? 1 : 0),
      },
      gameLog: [
        ...newGameLog,
        {
          type: 'night_death',
          message: victim 
            ? NARRATOR_MESSAGES.VICTIM_REVEALED.replace('{victim}', 
                state.players.find((p) => p.id === victim)?.name || 'Alguien')
            : NARRATOR_MESSAGES.NO_VICTIM,
          timestamp: Date.now(),
          playerId: victim,
        },
      ],
    });
  },
  
  startDebate: () => {
    const state = get();
    const debateEndTime = Date.now() + (state.settings.debateTime * 1000);
    
    set({
      gameStatus: 'debate',
      debateEndTime,
    });
  },
  
  startVoting: () => {
    const state = get();
    const votingEndTime = Date.now() + (state.settings.votingTime * 1000);
    
    set({
      gameStatus: 'voting',
      votes: {},
      voteResults: {},
      votingEndTime,
    });
  },
  
  castVote: (voterId, targetId) => {
    const state = get();
    if (state.gameStatus !== 'voting') return false;
    
    const voter = state.players.find((p) => p.id === voterId);
    if (!voter || !voter.isAlive || voter.isDead) return false;
    
    const votes = { ...state.votes, [voterId]: targetId };
    
    // Calcular resultados
    const voteResults = {};
    Object.values(votes).forEach((target) => {
      voteResults[target] = (voteResults[target] || 0) + 1;
    });
    
    set({ votes, voteResults });
    
    return true;
  },
  
  resolveVoting: () => {
    const state = get();
    const results = state.voteResults;
    
    // Encontrar el más votado
    let maxVotes = 0;
    let lynchedId = null;
    
    for (const [playerId, votes] of Object.entries(results)) {
      if (votes > maxVotes) {
        maxVotes = votes;
        lynchedId = playerId;
      }
    }
    
    if (!lynchedId) {
      // Empate o sin votos, no hay linchamiento
      set({
        gameStatus: 'day',
        lynchedPlayer: null,
        gameLog: [
          ...state.gameLog,
          {
            type: 'no_lynch',
            message: 'No hubo linchamiento hoy.',
            timestamp: Date.now(),
          },
        ],
      });
      return;
    }
    
    const lynchedPlayer = state.players.find((p) => p.id === lynchedId);
    const isTonto = lynchedPlayer?.roleId === 'tonto_del_pueblo';
    
    const updatedPlayers = state.players.map((p) => {
      if (p.id === lynchedId && !isTonto) {
        return { ...p, isDead: true, isAlive: false };
      }
      return p;
    });
    
    // Verificar si es el tonto del pueblo
    if (lynchedPlayer?.roleId === 'tonto_del_pueblo') {
      set({
        players: updatedPlayers,
        lynchedPlayer: null,
        gameStatus: 'day',
        gameLog: [
          ...state.gameLog,
          {
            type: 'role_reveal',
            message: `🤡 ${lynchedPlayer?.name} ha revelado ser el Tonto del Pueblo. El linchamiento se cancela.`,
            timestamp: Date.now(),
            playerId: lynchedId,
          },
        ],
        gameStats: {
          ...state.gameStats,
          rolesRevealed: [
            ...state.gameStats.rolesRevealed,
            { playerId: lynchedId, roleId: lynchedPlayer.roleId, timestamp: Date.now() }
          ],
        },
      });
      return;
    }
    
    // Verificar si es el cazador
    let hunterTarget = null;
    if (lynchedPlayer?.roleId === 'cazador') {
      // El cazador puede elegir a quién disparar (esto se manejará en la UI)
      // Por ahora, no hacemos nada automático
    }
    
    set({
      players: updatedPlayers,
      lynchedPlayer: lynchedId,
      gameStatus: 'revelation',
      gameStats: {
        ...state.gameStats,
        totalDays: state.gameStats.totalDays + 1,
        totalLynches: state.gameStats.totalLynches + 1,
        totalDeaths: state.gameStats.totalDeaths + 1,
        rolesRevealed: [
          ...state.gameStats.rolesRevealed,
          { playerId: lynchedId, roleId: lynchedPlayer?.roleId, timestamp: Date.now() }
        ],
      },
      gameLog: [
        ...state.gameLog,
        {
          type: 'lynch',
          message: NARRATOR_MESSAGES.LYNCH_REVEAL.replace('{player}', lynchedPlayer?.name || 'Alguien'),
          timestamp: Date.now(),
          playerId: lynchedId,
        },
      ],
    });
    
    // Verificar condiciones de victoria
    setTimeout(() => get().checkWinConditions(), 2000);
  },
  
  checkWinConditions: () => {
    const state = get();
    const alivePlayers = state.players.filter((p) => p.isAlive && !p.isDead);
    const aliveWolves = alivePlayers.filter((p) => 
      p.roleId === 'hombre_lobo' || p.roleId === 'lobo_alfa' || p.roleId === 'lobo_gris'
    );
    const aliveVillagers = alivePlayers.filter((p) => p.alignment === 'good');
    
    let winner = null;
    
    if (aliveWolves.length === 0) {
      winner = 'villagers';
    } else if (aliveWolves.length >= aliveVillagers.length) {
      winner = 'wolves';
    }
    
    if (winner) {
      set({
        gameStatus: 'finished',
        winner,
      });
    } else {
      // Continuar el ciclo noche-día
      setTimeout(() => get().startNightPhase(), 3000);
    }
  },
  
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      currentPhase: null,
      dayNumber: 0,
      isFirstNight: true,
      players: get().players.map((p) => ({
        ...p,
        roleId: null,
        alignment: null,
        isAlive: true,
        isDead: false,
        isProtected: false,
        votes: 0,
        nightAction: null,
        hasBeenAttacked: false,
      })),
      assignedRoles: {},
      nightActions: {},
      nightSequenceStep: 0,
      currentNightRole: null,
      nightVictim: null,
      votes: {},
      voteResults: {},
      lynchedPlayer: null,
      lovers: [],
      protectedPlayers: [],
      witchLifePotionUsed: false,
      witchDeathPotionUsed: false,
      witchDeathTarget: null,
      gameLog: [],
      gameStats: {
        totalNights: 0,
        totalDays: 0,
        totalDeaths: 0,
        totalLynches: 0,
        totalNightDeaths: 0,
        rolesRevealed: [],
        investigations: [],
      },
      investigationResults: {},
    });
  },
}));

