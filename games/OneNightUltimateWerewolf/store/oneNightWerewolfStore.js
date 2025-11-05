import { create } from 'zustand';
import { ROLES, ROLE_INFO, NIGHT_ORDER, GAME_CONFIG, RECOMMENDED_ROLE_SETS } from '../constants/OneNightWerewolfRoles';

// Función para barajar un array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useOneNightWerewolfStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'night', 'discussion', 'voting', 'results'
  
  // Jugadores
  players: [], // [{ id, name, initialRole, currentRole, votedFor, voteReceived }]
  currentPlayerId: null,
  
  // Sala
  roomCode: null,
  hostId: null,
  
  // Roles
  selectedRoles: [], // Roles seleccionados para esta partida
  centerCards: [], // Cartas del centro (3 cartas)
  nightActions: [], // Acciones nocturnas realizadas
  
  // Fase de noche
  currentNightPhase: 0, // Índice en NIGHT_ORDER
  nightNarration: '', // Texto de narración actual
  waitingForNightAction: false, // Esperando acción del jugador actual
  
  // Fase de discusión
  discussionTimeRemaining: GAME_CONFIG.DISCUSSION_TIME,
  discussionStarted: false,
  
  // Votación
  votes: {}, // { playerId: votedForPlayerId }
  votingComplete: false,
  
  // Resultados
  eliminatedPlayer: null,
  winner: null,
  winningTeam: null,
  
  // Configuración
  discussionDuration: GAME_CONFIG.DISCUSSION_TIME,
  showCenterCardsInResults: true,
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      return null;
    }
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      initialRole: null,
      currentRole: null,
      votedFor: null,
      voteReceived: 0,
    };
    set({ players: [...players, newPlayer] });
    if (players.length === 0) {
      set({ hostId: newPlayer.id });
    }
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players } = get();
    const newPlayers = players.filter(p => p.id !== playerId);
    set({ players: newPlayers });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración
  generateRoomCode: () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    set({ roomCode: code });
    return code;
  },
  
  setSelectedRoles: (roles) => {
    set({ selectedRoles: roles });
  },
  
  setDiscussionDuration: (seconds) => {
    set({ discussionDuration: seconds });
  },
  
  // Acciones - Inicio del juego
  startGame: () => {
    const { players, selectedRoles } = get();
    
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      return false;
    }
    
    // Calcular cartas necesarias: jugadores + 3 del centro
    const totalCardsNeeded = players.length + 3;
    
    // Si no hay roles seleccionados, usar recomendados
    let rolesToUse = selectedRoles.length > 0 
      ? [...selectedRoles] 
      : (RECOMMENDED_ROLE_SETS[players.length] || [ROLES.WEREWOLF, ROLES.SEER, ROLES.VILLAGER]);
    
    // Asegurar que tenemos suficientes roles
    while (rolesToUse.length < totalCardsNeeded) {
      rolesToUse.push(ROLES.VILLAGER);
    }
    
    // Barajar roles
    const shuffledRoles = shuffleArray(rolesToUse);
    
    // Asignar roles a jugadores
    const playersWithRoles = players.map((player, index) => ({
      ...player,
      initialRole: shuffledRoles[index],
      currentRole: shuffledRoles[index],
    }));
    
    // Cartas del centro
    const center = shuffledRoles.slice(players.length, players.length + 3);
    
    set({
      gameStatus: 'night',
      players: playersWithRoles,
      centerCards: center,
      currentNightPhase: 0,
      nightActions: [],
      waitingForNightAction: false,
      discussionTimeRemaining: get().discussionDuration,
      discussionStarted: false,
      votes: {},
      votingComplete: false,
      eliminatedPlayer: null,
      winner: null,
      winningTeam: null,
    });
    
    // Iniciar fase de noche
    get().startNightPhase();
    
    return true;
  },
  
  // Acciones - Fase de noche
  startNightPhase: () => {
    set({ 
      nightNarration: 'Todos, cierren los ojos.',
      waitingForNightAction: false,
    });
    
    // Procesar cada fase de la noche en orden
    setTimeout(() => {
      get().processNightPhase();
    }, 2000);
  },
  
  processNightPhase: () => {
    const { currentNightPhase, players, centerCards } = get();
    
    if (currentNightPhase >= NIGHT_ORDER.length) {
      // Noche terminada
      get().endNightPhase();
      return;
    }
    
    const currentRole = NIGHT_ORDER[currentNightPhase];
    const playersWithRole = players.filter(p => p.currentRole === currentRole);
    
    if (playersWithRole.length === 0) {
      // No hay jugadores con este rol, pasar al siguiente
      set({ currentNightPhase: currentNightPhase + 1 });
      setTimeout(() => {
        get().processNightPhase();
      }, 1000);
      return;
    }
    
    // Generar narración para este rol
    const roleInfo = ROLE_INFO[currentRole];
    let narration = `${roleInfo.name}${playersWithRole.length > 1 ? 's' : ''}, despierten.`;
    
    if (roleInfo.action) {
      narration += ` ${getActionDescription(currentRole)}`;
    }
    
    set({
      nightNarration: narration,
      waitingForNightAction: true,
    });
  },
  
  // Acciones - Acciones nocturnas
  performNightAction: (actionData) => {
    const { currentNightPhase, players, centerCards, nightActions } = get();
    const currentRole = NIGHT_ORDER[currentNightPhase];
    const currentPlayer = players.find(p => p.id === get().currentPlayerId);
    
    if (!currentPlayer || currentPlayer.currentRole !== currentRole) {
      return false;
    }
    
    const action = {
      playerId: currentPlayer.id,
      role: currentRole,
      action: actionData,
      timestamp: Date.now(),
    };
    
    // Aplicar la acción según el rol
    let updatedPlayers = [...players];
    let updatedCenterCards = [...centerCards];
    
    switch (currentRole) {
      case ROLES.ROBBER:
        // Intercambiar carta con otro jugador
        if (actionData.targetPlayerId) {
          const robberIndex = updatedPlayers.findIndex(p => p.id === currentPlayer.id);
          const targetIndex = updatedPlayers.findIndex(p => p.id === actionData.targetPlayerId);
          if (robberIndex >= 0 && targetIndex >= 0) {
            const temp = updatedPlayers[robberIndex].currentRole;
            updatedPlayers[robberIndex].currentRole = updatedPlayers[targetIndex].currentRole;
            updatedPlayers[targetIndex].currentRole = temp;
          }
        }
        break;
        
      case ROLES.TROUBLEMAKER:
        // Intercambiar dos jugadores
        if (actionData.targetPlayer1Id && actionData.targetPlayer2Id) {
          const player1Index = updatedPlayers.findIndex(p => p.id === actionData.targetPlayer1Id);
          const player2Index = updatedPlayers.findIndex(p => p.id === actionData.targetPlayer2Id);
          if (player1Index >= 0 && player2Index >= 0) {
            const temp = updatedPlayers[player1Index].currentRole;
            updatedPlayers[player1Index].currentRole = updatedPlayers[player2Index].currentRole;
            updatedPlayers[player2Index].currentRole = temp;
          }
        }
        break;
        
      case ROLES.DRUNK:
        // Intercambiar con carta del centro
        if (actionData.centerCardIndex !== undefined) {
          const drunkIndex = updatedPlayers.findIndex(p => p.id === currentPlayer.id);
          if (drunkIndex >= 0 && actionData.centerCardIndex < updatedCenterCards.length) {
            const temp = updatedPlayers[drunkIndex].currentRole;
            updatedPlayers[drunkIndex].currentRole = updatedCenterCards[actionData.centerCardIndex];
            updatedCenterCards[actionData.centerCardIndex] = temp;
          }
        }
        break;
        
      default:
        break;
    }
    
    set({
      players: updatedPlayers,
      centerCards: updatedCenterCards,
      nightActions: [...nightActions, action],
      waitingForNightAction: false,
      currentNightPhase: currentNightPhase + 1,
    });
    
    // Continuar con la siguiente fase
    setTimeout(() => {
      get().processNightPhase();
    }, 1500);
    
    return true;
  },
  
  endNightPhase: () => {
    set({
      gameStatus: 'discussion',
      nightNarration: 'Todos, despierten. La discusión comienza ahora. Tienen 5 minutos para encontrar a un Hombre Lobo.',
      discussionStarted: true,
      waitingForNightAction: false,
    });
    
    // Iniciar temporizador de discusión
    get().startDiscussionTimer();
  },
  
  // Acciones - Fase de discusión
  startDiscussionTimer: () => {
    const timer = setInterval(() => {
      const { discussionTimeRemaining } = get();
      if (discussionTimeRemaining <= 0) {
        clearInterval(timer);
        get().startVoting();
        return;
      }
      set({ discussionTimeRemaining: discussionTimeRemaining - 1 });
    }, 1000);
  },
  
  // Acciones - Votación
  startVoting: () => {
    set({
      gameStatus: 'voting',
      nightNarration: '¡Se acabó el tiempo! Voten ahora. Señalen al jugador que creen que debe ser eliminado.',
    });
  },
  
  castVote: (voterId, targetPlayerId) => {
    const { votes } = get();
    const newVotes = { ...votes, [voterId]: targetPlayerId };
    set({ votes: newVotes });
    
    // Verificar si todos han votado
    const { players } = get();
    if (Object.keys(newVotes).length === players.length) {
      get().resolveVoting();
    }
  },
  
  resolveVoting: () => {
    const { players, votes } = get();
    
    // Contar votos
    const voteCounts = {};
    players.forEach(player => {
      voteCounts[player.id] = 0;
    });
    
    Object.values(votes).forEach(votedForId => {
      if (votedForId && voteCounts[votedForId] !== undefined) {
        voteCounts[votedForId]++;
      }
    });
    
    // Actualizar jugadores con conteo de votos
    const updatedPlayers = players.map(player => ({
      ...player,
      voteReceived: voteCounts[player.id] || 0,
    }));
    
    // Encontrar el más votado
    let maxVotes = 0;
    let eliminatedPlayerId = null;
    
    Object.entries(voteCounts).forEach(([playerId, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedPlayerId = playerId;
      }
    });
    
    // En caso de empate, todos los empatados son eliminados (o ninguno, según reglas)
    const tiedPlayers = Object.entries(voteCounts)
      .filter(([_, count]) => count === maxVotes)
      .map(([playerId]) => playerId);
    
    if (tiedPlayers.length > 1) {
      // Empate - verificar reglas específicas
      eliminatedPlayerId = null; // Por ahora, empate = nadie eliminado
    }
    
    set({
      players: updatedPlayers,
      eliminatedPlayer: eliminatedPlayerId,
      votingComplete: true,
    });
    
    // Determinar ganador
    get().determineWinner();
  },
  
  determineWinner: () => {
    const { players, eliminatedPlayer } = get();
    
    if (!eliminatedPlayer) {
      // Empate o ningún voto - los Hombres Lobo ganan
      set({
        gameStatus: 'results',
        winner: null,
        winningTeam: 'werewolf',
      });
      return;
    }
    
    const eliminated = players.find(p => p.id === eliminatedPlayer);
    if (!eliminated) {
      return;
    }
    
    const eliminatedRole = eliminated.currentRole;
    const roleInfo = ROLE_INFO[eliminatedRole];
    
    // Verificar condiciones de victoria
    if (eliminatedRole === ROLES.TANNER) {
      // El Curtidor gana solo si es eliminado
      set({
        gameStatus: 'results',
        winner: eliminatedPlayer,
        winningTeam: 'tanner',
      });
      return;
    }
    
    if (roleInfo.team === 'werewolf') {
      // Un Hombre Lobo fue eliminado - la Aldea gana
      set({
        gameStatus: 'results',
        winner: null,
        winningTeam: 'village',
      });
    } else {
      // Un aldeano fue eliminado - los Hombres Lobo ganan
      set({
        gameStatus: 'results',
        winner: null,
        winningTeam: 'werewolf',
      });
    }
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      players: [],
      currentPlayerId: null,
      roomCode: null,
      selectedRoles: [],
      centerCards: [],
      nightActions: [],
      currentNightPhase: 0,
      nightNarration: '',
      waitingForNightAction: false,
      discussionTimeRemaining: GAME_CONFIG.DISCUSSION_TIME,
      discussionStarted: false,
      votes: {},
      votingComplete: false,
      eliminatedPlayer: null,
      winner: null,
      winningTeam: null,
    });
  },
}));

// Función auxiliar para obtener descripción de acción
const getActionDescription = (role) => {
  const descriptions = {
    [ROLES.WEREWOLF]: 'Reconozcan a otros Hombres Lobo.',
    [ROLES.MASON]: 'Reconozcan a otros Masones.',
    [ROLES.SEER]: 'Puedes mirar la carta de un jugador o dos cartas del centro.',
    [ROLES.ROBBER]: 'Intercambia tu carta con la de otro jugador. Ahora, mira tu nueva carta.',
    [ROLES.DRUNK]: 'Intercambia tu carta con una del centro (sin mirar).',
    [ROLES.TROUBLEMAKER]: 'Puedes intercambiar las cartas de otros dos jugadores.',
    [ROLES.INSOMNIAC]: 'Mira tu propia carta.',
  };
  return descriptions[role] || '';
};

