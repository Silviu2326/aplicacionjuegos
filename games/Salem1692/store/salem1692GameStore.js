import { create } from 'zustand';
import { 
  generateActionDeck, 
  generateTrialDeck, 
  ACTION_CARDS, 
  TRIAL_CARDS,
  CONSPIRACY_CARD,
  GAME_CONFIG 
} from '../constants/Salem1692CardData';
import { ROLE_DISTRIBUTION } from '../constants/Salem1692RoleData';

// Función para barajar un array
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useSalem1692GameStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'playing', 'night', 'day', 'trial', 'finished'
  gamePhase: 'day', // 'night', 'day'
  
  // Jugadores
  players: [], // [{ id, name, role, isAlive, hand, trialCards, hasConspiracy, accusations }]
  currentPlayerIndex: 0,
  currentPlayerId: null,
  
  // Mazos
  actionDeck: [],
  actionDiscard: [],
  trialDeck: [],
  trialDiscard: [],
  
  // Fase de Noche
  nightPhase: {
    active: false,
    witches: [],
    conspiracyTarget: null,
  },
  
  // Juicio
  trial: {
    active: false,
    accusedPlayerId: null,
    revealedTrialCards: [],
    votes: {}, // { playerId: 'save' | 'condemn' }
    votingComplete: false,
  },
  
  // Log del juego
  gameLog: [],
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      return null;
    }
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      role: null, // Se asignará al iniciar
      isAlive: true,
      hand: [],
      trialCards: [],
      hasConspiracy: false,
      accusations: [], // Array de cartas de acusación sobre este jugador
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players } = get();
    set({ players: players.filter(p => p.id !== playerId) });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Inicio del juego
  initializeGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS || players.length > GAME_CONFIG.MAX_PLAYERS) {
      return false;
    }
    
    // Generar mazos
    const actionDeck = shuffleArray(generateActionDeck());
    const trialDeck = shuffleArray(generateTrialDeck(players.length));
    
    // Asignar roles
    const numWitches = ROLE_DISTRIBUTION.getWitchCount(players.length);
    const roles = [];
    for (let i = 0; i < numWitches; i++) {
      roles.push('witch');
    }
    for (let i = numWitches; i < players.length; i++) {
      roles.push('villager');
    }
    const shuffledRoles = shuffleArray(roles);
    
    // Inicializar jugadores
    const initializedPlayers = players.map((player, index) => {
      // Repartir mano inicial
      const hand = [];
      for (let i = 0; i < GAME_CONFIG.INITIAL_HAND_SIZE; i++) {
        if (actionDeck.length > 0) {
          hand.push(actionDeck.pop());
        }
      }
      
      // Repartir cartas de juicio
      const trialCards = [];
      for (let i = 0; i < 3; i++) {
        if (trialDeck.length > 0) {
          trialCards.push(trialDeck.pop());
        }
      }
      
      return {
        ...player,
        role: shuffledRoles[index],
        isAlive: true,
        hand,
        trialCards,
        hasConspiracy: false,
        accusations: [],
      };
    });
    
    // Identificar brujas
    const witches = initializedPlayers
      .filter(p => p.role === 'witch')
      .map(p => p.id);
    
    set({
      gameStatus: 'night',
      gamePhase: 'night',
      players: initializedPlayers,
      actionDeck,
      actionDiscard: [],
      trialDeck,
      trialDiscard: [],
      currentPlayerIndex: 0,
      currentPlayerId: initializedPlayers[0]?.id || null,
      nightPhase: {
        active: true,
        witches,
        conspiracyTarget: null,
      },
      trial: {
        active: false,
        accusedPlayerId: null,
        revealedTrialCards: [],
        votes: {},
        votingComplete: false,
      },
      gameLog: [{ type: 'game_start', message: 'La partida ha comenzado. Fase de Noche.', timestamp: Date.now() }],
    });
    
    return true;
  },
  
  // Acciones - Fase de Noche
  setConspiracyTarget: (targetPlayerId) => {
    const { players, nightPhase } = get();
    const targetPlayer = players.find(p => p.id === targetPlayerId);
    
    if (!targetPlayer || !targetPlayer.isAlive) {
      return false;
    }
    
    // Transferir carta de Conspiración
    const updatedPlayers = players.map(p => {
      if (p.id === targetPlayerId) {
        return { ...p, hasConspiracy: true };
      }
      return p;
    });
    
    set({
      players: updatedPlayers,
      nightPhase: {
        ...nightPhase,
        conspiracyTarget: targetPlayerId,
      },
      gameLog: [
        ...get().gameLog,
        { 
          type: 'night_conspiracy', 
          message: `Las brujas han elegido un objetivo para la Conspiración.`, 
          timestamp: Date.now() 
        }
      ],
    });
    
    return true;
  },
  
  endNightPhase: () => {
    set({
      gameStatus: 'day',
      gamePhase: 'day',
      nightPhase: {
        active: false,
        witches: [],
        conspiracyTarget: null,
      },
      gameLog: [
        ...get().gameLog,
        { 
          type: 'phase_change', 
          message: 'El día ha comenzado.', 
          timestamp: Date.now() 
        }
      ],
    });
  },
  
  // Acciones - Fase de Día
  startPlayerTurn: (playerId) => {
    const { players, actionDeck } = get();
    const player = players.find(p => p.id === playerId);
    
    if (!player || !player.isAlive) {
      return false;
    }
    
    // Robar 2 cartas
    const drawnCards = [];
    for (let i = 0; i < GAME_CONFIG.CARDS_DRAWN_PER_TURN; i++) {
      if (actionDeck.length > 0) {
        drawnCards.push(actionDeck.pop());
      } else if (get().actionDiscard.length > 0) {
        // Rebarajar descartes si el mazo se acaba
        const reshuffled = shuffleArray([...get().actionDiscard]);
        get().actionDiscard.forEach(() => {
          if (reshuffled.length > 0) {
            drawnCards.push(reshuffled.pop());
          }
        });
        set({ actionDeck: reshuffled, actionDiscard: [] });
      }
    }
    
    const updatedPlayers = players.map(p => {
      if (p.id === playerId) {
        return { ...p, hand: [...p.hand, ...drawnCards] };
      }
      return p;
    });
    
    set({
      players: updatedPlayers,
      currentPlayerId: playerId,
      gameLog: [
        ...get().gameLog,
        { 
          type: 'turn_start', 
          message: `${player.name} comienza su turno.`, 
          timestamp: Date.now() 
        }
      ],
    });
    
    return true;
  },
  
  playCard: (playerId, cardId, targetPlayerId = null) => {
    const { players, actionDeck, actionDiscard } = get();
    const player = players.find(p => p.id === playerId);
    
    if (!player || !player.isAlive) {
      return false;
    }
    
    // Encontrar la carta en la mano
    const cardIndex = player.hand.findIndex(c => c.instanceId === cardId || c.id === cardId);
    if (cardIndex === -1) {
      return false;
    }
    
    const card = player.hand[cardIndex];
    
    // Procesar según el tipo de carta
    let updatedPlayers = [...players];
    
    if (card.id === ACTION_CARDS.ACCUSATION.id) {
      // Acusación: colocar sobre otro jugador
      if (!targetPlayerId || targetPlayerId === playerId) {
        return false;
      }
      
      const targetPlayer = players.find(p => p.id === targetPlayerId);
      if (!targetPlayer || !targetPlayer.isAlive) {
        return false;
      }
      
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id === playerId) {
          // Remover carta de la mano
          const newHand = [...p.hand];
          newHand.splice(cardIndex, 1);
          return { ...p, hand: newHand };
        } else if (p.id === targetPlayerId) {
          // Añadir acusación
          return { ...p, accusations: [...p.accusations, card] };
        }
        return p;
      });
      
      // Verificar si se activa un juicio
      const target = updatedPlayers.find(p => p.id === targetPlayerId);
      if (target.accusations.length >= GAME_CONFIG.ACCUSATIONS_FOR_TRIAL) {
        get().startTrial(targetPlayerId);
      }
      
      set({
        players: updatedPlayers,
        actionDiscard: [...actionDiscard, card],
        gameLog: [
          ...get().gameLog,
          { 
            type: 'accusation', 
            message: `${player.name} acusa a ${targetPlayer.name}.`, 
            timestamp: Date.now() 
          }
        ],
      });
      
    } else if (card.id === ACTION_CARDS.ALIBI.id) {
      // Coartada: eliminar una acusación propia
      if (player.accusations.length === 0) {
        return false;
      }
      
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id === playerId) {
          const newHand = [...p.hand];
          newHand.splice(cardIndex, 1);
          const newAccusations = [...p.accusations];
          newAccusations.pop(); // Eliminar última acusación
          return { ...p, hand: newHand, accusations: newAccusations };
        }
        return p;
      });
      
      set({
        players: updatedPlayers,
        actionDiscard: [...actionDiscard, card],
        gameLog: [
          ...get().gameLog,
          { 
            type: 'alibi', 
            message: `${player.name} usa una Coartada.`, 
            timestamp: Date.now() 
          }
        ],
      });
      
    } else if (card.id === ACTION_CARDS.GUN.id) {
      // Pistola: otro jugador descarta una carta al azar
      if (!targetPlayerId || targetPlayerId === playerId) {
        return false;
      }
      
      const targetPlayer = players.find(p => p.id === targetPlayerId);
      if (!targetPlayer || !targetPlayer.isAlive || targetPlayer.hand.length === 0) {
        return false;
      }
      
      const randomIndex = Math.floor(Math.random() * targetPlayer.hand.length);
      const discardedCard = targetPlayer.hand[randomIndex];
      
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id === playerId) {
          const newHand = [...p.hand];
          newHand.splice(cardIndex, 1);
          return { ...p, hand: newHand };
        } else if (p.id === targetPlayerId) {
          const newHand = [...p.hand];
          newHand.splice(randomIndex, 1);
          return { ...p, hand: newHand };
        }
        return p;
      });
      
      set({
        players: updatedPlayers,
        actionDiscard: [...actionDiscard, card, discardedCard],
        gameLog: [
          ...get().gameLog,
          { 
            type: 'gun', 
            message: `${player.name} usa una Pistola en ${targetPlayer.name}.`, 
            timestamp: Date.now() 
          }
        ],
      });
      
    } else if (card.id === ACTION_CARDS.DRAW_CARD.id) {
      // Robar carta adicional
      let drawnCard = null;
      if (actionDeck.length > 0) {
        drawnCard = actionDeck.pop();
      }
      
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id === playerId) {
          const newHand = [...p.hand];
          newHand.splice(cardIndex, 1);
          if (drawnCard) {
            newHand.push(drawnCard);
          }
          return { ...p, hand: newHand };
        }
        return p;
      });
      
      set({
        players: updatedPlayers,
        actionDiscard: [...actionDiscard, card],
        gameLog: [
          ...get().gameLog,
          { 
            type: 'draw_card', 
            message: `${player.name} roba una carta adicional.`, 
            timestamp: Date.now() 
          }
        ],
      });
      
    } else {
      // Otras cartas (investigar, etc.)
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id === playerId) {
          const newHand = [...p.hand];
          newHand.splice(cardIndex, 1);
          return { ...p, hand: newHand };
        }
        return p;
      });
      
      set({
        players: updatedPlayers,
        actionDiscard: [...actionDiscard, card],
      });
    }
    
    return true;
  },
  
  // Acciones - Juicio
  startTrial: (accusedPlayerId) => {
    const { players } = get();
    const accusedPlayer = players.find(p => p.id === accusedPlayerId);
    
    if (!accusedPlayer || !accusedPlayer.isAlive) {
      return false;
    }
    
    set({
      gameStatus: 'trial',
      trial: {
        active: true,
        accusedPlayerId,
        revealedTrialCards: [...accusedPlayer.trialCards],
        votes: {},
        votingComplete: false,
      },
      gameLog: [
        ...get().gameLog,
        { 
          type: 'trial_start', 
          message: `¡Se inicia un juicio contra ${accusedPlayer.name}!`, 
          timestamp: Date.now() 
        }
      ],
    });
    
    // Verificar si hay carta de Bruja en las cartas de juicio
    const hasWitchCard = accusedPlayer.trialCards.some(c => c.id === TRIAL_CARDS.WITCH.id);
    if (hasWitchCard) {
      set({
        gameLog: [
          ...get().gameLog,
          { 
            type: 'trial_witch_revealed', 
            message: `${accusedPlayer.name} revela una carta de Bruja.`, 
            timestamp: Date.now() 
          }
        ],
      });
    }
    
    return true;
  },
  
  castVote: (playerId, vote) => {
    const { trial, players } = get();
    
    if (!trial.active || trial.votingComplete) {
      return false;
    }
    
    const player = players.find(p => p.id === playerId);
    if (!player || !player.isAlive) {
      return false;
    }
    
    if (vote !== 'save' && vote !== 'condemn') {
      return false;
    }
    
    const updatedVotes = {
      ...trial.votes,
      [playerId]: vote,
    };
    
    // Verificar si todos han votado
    const alivePlayers = players.filter(p => p.isAlive);
    const votingComplete = Object.keys(updatedVotes).length >= alivePlayers.length;
    
    set({
      trial: {
        ...trial,
        votes: updatedVotes,
        votingComplete,
      },
    });
    
    if (votingComplete) {
      get().resolveTrial();
    }
    
    return true;
  },
  
  resolveTrial: () => {
    const { trial, players } = get();
    const accusedPlayer = players.find(p => p.id === trial.accusedPlayerId);
    
    if (!accusedPlayer) {
      return;
    }
    
    // Contar votos
    const saveVotes = Object.values(trial.votes).filter(v => v === 'save').length;
    const condemnVotes = Object.values(trial.votes).filter(v => v === 'condemn').length;
    
    const isCondemned = condemnVotes > saveVotes;
    
    let updatedPlayers = [...players];
    
    if (isCondemned) {
      // Eliminar jugador
      updatedPlayers = updatedPlayers.map(p => {
        if (p.id === trial.accusedPlayerId) {
          // Si tiene Conspiración, se convierte en bruja
          const finalRole = p.hasConspiracy ? 'witch' : p.role;
          return {
            ...p,
            isAlive: false,
            role: finalRole,
          };
        }
        return p;
      });
      
      set({
        gameLog: [
          ...get().gameLog,
          { 
            type: 'trial_condemned', 
            message: `${accusedPlayer.name} ha sido condenado y eliminado.`, 
            timestamp: Date.now() 
          }
        ],
      });
    } else {
      set({
        gameLog: [
          ...get().gameLog,
          { 
            type: 'trial_saved', 
            message: `${accusedPlayer.name} ha sido absuelto.`, 
            timestamp: Date.now() 
          }
        ],
      });
    }
    
    // Limpiar acusaciones del jugador
    updatedPlayers = updatedPlayers.map(p => {
      if (p.id === trial.accusedPlayerId) {
        return { ...p, accusations: [] };
      }
      return p;
    });
    
    set({
      players: updatedPlayers,
      gameStatus: 'day',
      trial: {
        active: false,
        accusedPlayerId: null,
        revealedTrialCards: [],
        votes: {},
        votingComplete: false,
      },
    });
    
    // Verificar condiciones de victoria
    get().checkWinConditions();
  },
  
  // Acciones - Condiciones de victoria
  checkWinConditions: () => {
    const { players } = get();
    const alivePlayers = players.filter(p => p.isAlive);
    const aliveWitches = alivePlayers.filter(p => p.role === 'witch');
    const aliveVillagers = alivePlayers.filter(p => p.role !== 'witch');
    
    if (aliveWitches.length === 0) {
      // Aldeanos ganan
      set({
        gameStatus: 'finished',
        gameLog: [
          ...get().gameLog,
          { 
            type: 'game_end', 
            message: '¡Los Aldeanos han ganado! Todas las brujas han sido eliminadas.', 
            timestamp: Date.now() 
          }
        ],
      });
      return 'villagers';
    }
    
    if (aliveVillagers.length === 0) {
      // Brujas ganan
      set({
        gameStatus: 'finished',
        gameLog: [
          ...get().gameLog,
          { 
            type: 'game_end', 
            message: '¡Las Brujas han ganado! Todos los aldeanos han sido eliminados.', 
            timestamp: Date.now() 
          }
        ],
      });
      return 'witches';
    }
    
    return null;
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      gamePhase: 'day',
      players: [],
      currentPlayerIndex: 0,
      currentPlayerId: null,
      actionDeck: [],
      actionDiscard: [],
      trialDeck: [],
      trialDiscard: [],
      nightPhase: {
        active: false,
        witches: [],
        conspiracyTarget: null,
      },
      trial: {
        active: false,
        accusedPlayerId: null,
        revealedTrialCards: [],
        votes: {},
        votingComplete: false,
      },
      gameLog: [],
    });
  },
}));

