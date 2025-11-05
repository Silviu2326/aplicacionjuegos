import { create } from 'zustand';
import { CHARACTER_DECK, COUP_CHARACTERS } from '../constants/CoupCharacters';
import { ACTIONS, ACTION_INFO, GAME_CONFIG } from '../constants/CoupActions';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useCoupGameStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'setup', // 'setup', 'lobby', 'playing', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, coins, influence: [{ character, revealed: false }], eliminated: false }]
  currentPlayerIndex: 0,
  currentPlayerId: null,
  
  // Mazo y tesoro
  deck: [],
  treasury: 0,
  
  // Estado del turno actual
  pendingAction: null, // { action, playerId, targetId?, character? }
  pendingBlock: null, // { playerId, character }
  pendingChallenge: null, // { challengerId, targetId }
  waitingForResponse: false,
  waitingForTarget: false,
  waitingForChallenge: false,
  waitingForBlock: false,
  waitingForExchange: false,
  
  // Log del juego
  gameLog: [], // [{ type, message, timestamp }]
  
  // Estado temporal para intercambio
  exchangeCards: [], // Cartas robadas para intercambio
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      coins: 0,
      influence: [],
      eliminated: false,
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
    
    // Barajar el mazo
    const deck = shuffleArray([...CHARACTER_DECK]);
    
    // Repartir cartas y monedas iniciales
    const initializedPlayers = players.map(player => {
      const influence = [
        { character: deck.pop(), revealed: false },
        { character: deck.pop(), revealed: false },
      ];
      return {
        ...player,
        coins: GAME_CONFIG.STARTING_COINS,
        influence,
        eliminated: false,
      };
    });
    
    // Calcular tesoro (asumiendo monedas ilimitadas, se puede ajustar)
    const treasury = 50; // Tesoro inicial
    
    set({
      gameStatus: 'playing',
      players: initializedPlayers,
      deck,
      treasury,
      currentPlayerIndex: 0,
      currentPlayerId: initializedPlayers[0]?.id || null,
      gameLog: [{ type: 'game_start', message: 'La partida ha comenzado', timestamp: Date.now() }],
    });
    
    return true;
  },
  
  // Acciones - Turno
  getCurrentPlayer: () => {
    const { players, currentPlayerIndex } = get();
    return players[currentPlayerIndex] || null;
  },
  
  getPlayerById: (playerId) => {
    const { players } = get();
    return players.find(p => p.id === playerId) || null;
  },
  
  getAlivePlayers: () => {
    const { players } = get();
    return players.filter(p => !p.eliminated);
  },
  
  // Acciones - Declarar acción
  declareAction: (action, targetId = null) => {
    const { players, currentPlayerId, treasury, gameLog } = get();
    const player = players.find(p => p.id === currentPlayerId);
    if (!player || player.eliminated) return false;
    
    const actionInfo = ACTION_INFO[action];
    if (!actionInfo) return false;
    
    // Verificar si el jugador tiene 10+ monedas (debe hacer Coup)
    if (player.coins >= GAME_CONFIG.MANDATORY_COUP_COINS && action !== ACTIONS.COUP) {
      return false;
    }
    
    // Verificar coste
    if (actionInfo.cost > 0 && player.coins < actionInfo.cost) {
      return false;
    }
    
    // Verificar si necesita objetivo
    if (actionInfo.targetRequired && !targetId) {
      set({ waitingForTarget: true, pendingAction: { action, playerId: currentPlayerId } });
      return true;
    }
    
    // Si la acción no puede ser desafiada ni bloqueada, resolverla inmediatamente
    if (!actionInfo.canBeChallenged && !actionInfo.canBeBlocked) {
      return get().resolveAction(action, currentPlayerId, targetId);
    }
    
    // Registrar acción pendiente
    const pendingAction = {
      action,
      playerId: currentPlayerId,
      targetId,
      character: actionInfo.character,
    };
    
    // Si la acción puede ser bloqueada y tiene un objetivo, esperar bloqueo
    if (actionInfo.canBeBlocked && targetId) {
      set({
        pendingAction,
        waitingForBlock: true,
        waitingForChallenge: !actionInfo.canBeChallenged,
        gameLog: [
          ...gameLog,
          {
            type: 'action_declared',
            message: `${player.name} declara ${actionInfo.name}${targetId ? ` a ${players.find(p => p.id === targetId)?.name}` : ''}`,
            timestamp: Date.now(),
          },
        ],
      });
    } else {
      // Esperar desafío si es posible
      set({
        pendingAction,
        waitingForChallenge: actionInfo.canBeChallenged,
        waitingForBlock: false,
        gameLog: [
          ...gameLog,
          {
            type: 'action_declared',
            message: `${player.name} declara ${actionInfo.name}${targetId ? ` a ${players.find(p => p.id === targetId)?.name}` : ''}`,
            timestamp: Date.now(),
          },
        ],
      });
    }
    
    return true;
  },
  
  // Acciones - Desafiar
  challenge: (challengerId) => {
    const { pendingAction, players, deck, gameLog } = get();
    if (!pendingAction || !pendingAction.character) return false;
    
    const challenger = players.find(p => p.id === challengerId);
    const target = players.find(p => p.id === pendingAction.playerId);
    if (!challenger || !target || challenger.eliminated) return false;
    
    // Verificar si el objetivo tiene la carta
    const hasCharacter = target.influence.some(
      inf => !inf.revealed && inf.character === pendingAction.character
    );
    
    if (hasCharacter) {
      // Desafío falla - el objetivo tiene la carta
      const characterCard = target.influence.find(
        inf => !inf.revealed && inf.character === pendingAction.character
      );
      
      // Barajar carta y robar nueva
      const newCard = deck.pop();
      if (newCard) {
        characterCard.character = newCard;
      }
      
      // El retador pierde una influencia
      const challengerInfluence = challenger.influence.find(inf => !inf.revealed);
      if (challengerInfluence) {
        challengerInfluence.revealed = true;
      }
      
      set({
        pendingAction: null,
        pendingChallenge: null,
        waitingForChallenge: false,
        waitingForBlock: false,
        gameLog: [
          ...gameLog,
          {
            type: 'challenge_failed',
            message: `El desafío de ${challenger.name} ha fallado. ${target.name} sí tenía ${pendingAction.character}. ${challenger.name} pierde una influencia.`,
            timestamp: Date.now(),
          },
        ],
      });
      
      // Verificar si el retador está eliminado
      get().checkPlayerElimination(challengerId);
      
      // Resolver la acción original
      return get().resolveAction(pendingAction.action, pendingAction.playerId, pendingAction.targetId);
    } else {
      // Desafío exitoso - el objetivo no tiene la carta
      const targetInfluence = target.influence.find(inf => !inf.revealed);
      if (targetInfluence) {
        targetInfluence.revealed = true;
      }
      
      set({
        pendingAction: null,
        pendingChallenge: null,
        waitingForChallenge: false,
        waitingForBlock: false,
        gameLog: [
          ...gameLog,
          {
            type: 'challenge_success',
            message: `El desafío de ${challenger.name} ha tenido éxito. ${target.name} no tenía ${pendingAction.character}. ${target.name} pierde una influencia.`,
            timestamp: Date.now(),
          },
        ],
      });
      
      // Verificar si el objetivo está eliminado
      get().checkPlayerElimination(pendingAction.playerId);
      
      // Pasar al siguiente turno
      get().nextTurn();
      return true;
    }
  },
  
  // Acciones - Bloquear
  block: (blockerId, character) => {
    const { pendingAction, players, gameLog } = get();
    if (!pendingAction) return false;
    
    const blocker = players.find(p => p.id === blockerId);
    const actionInfo = ACTION_INFO[pendingAction.action];
    if (!blocker || blocker.eliminated || !actionInfo.canBeBlocked) return false;
    
    // Verificar que el personaje puede bloquear esta acción
    if (!actionInfo.blockableBy.includes(character)) return false;
    
    // Verificar que el bloqueador es el objetivo (si hay objetivo)
    if (pendingAction.targetId && pendingAction.targetId !== blockerId) return false;
    
    // Registrar bloqueo pendiente
    set({
      pendingBlock: { playerId: blockerId, character },
      waitingForChallenge: true, // Se puede desafiar el bloqueo
      waitingForBlock: false,
      gameLog: [
        ...gameLog,
        {
          type: 'block_declared',
          message: `${blocker.name} declara ${character} para bloquear ${actionInfo.name}`,
          timestamp: Date.now(),
        },
      ],
    });
    
    return true;
  },
  
  // Acciones - Desafiar bloqueo
  challengeBlock: (challengerId) => {
    const { pendingBlock, pendingAction, players, deck, gameLog } = get();
    if (!pendingBlock || !pendingAction) return false;
    
    const challenger = players.find(p => p.id === challengerId);
    const blocker = players.find(p => p.id === pendingBlock.playerId);
    if (!challenger || !blocker || challenger.eliminated) return false;
    
    // Verificar si el bloqueador tiene la carta
    const hasCharacter = blocker.influence.some(
      inf => !inf.revealed && inf.character === pendingBlock.character
    );
    
    if (hasCharacter) {
      // Desafío falla - el bloqueo es válido
      const characterCard = blocker.influence.find(
        inf => !inf.revealed && inf.character === pendingBlock.character
      );
      
      // Barajar carta y robar nueva
      const newCard = deck.pop();
      if (newCard) {
        characterCard.character = newCard;
      }
      
      // El retador pierde una influencia
      const challengerInfluence = challenger.influence.find(inf => !inf.revealed);
      if (challengerInfluence) {
        challengerInfluence.revealed = true;
      }
      
      set({
        pendingAction: null,
        pendingBlock: null,
        pendingChallenge: null,
        waitingForChallenge: false,
        waitingForBlock: false,
        gameLog: [
          ...gameLog,
          {
            type: 'block_challenge_failed',
            message: `El desafío al bloqueo de ${challenger.name} ha fallado. ${blocker.name} sí tenía ${pendingBlock.character}. El bloqueo es efectivo. ${challenger.name} pierde una influencia.`,
            timestamp: Date.now(),
          },
        ],
      });
      
      get().checkPlayerElimination(challengerId);
      get().nextTurn();
      return true;
    } else {
      // Desafío exitoso - el bloqueo es inválido
      const blockerInfluence = blocker.influence.find(inf => !inf.revealed);
      if (blockerInfluence) {
        blockerInfluence.revealed = true;
      }
      
      set({
        pendingBlock: null,
        pendingChallenge: null,
        waitingForChallenge: false,
        gameLog: [
          ...gameLog,
          {
            type: 'block_challenge_success',
            message: `El desafío al bloqueo de ${challenger.name} ha tenido éxito. ${blocker.name} no tenía ${pendingBlock.character}. ${blocker.name} pierde una influencia.`,
            timestamp: Date.now(),
          },
        ],
      });
      
      get().checkPlayerElimination(pendingBlock.playerId);
      
      // Continuar con la acción original (se puede desafiar)
      const actionInfo = ACTION_INFO[pendingAction.action];
      if (actionInfo.canBeChallenged) {
        set({ waitingForChallenge: true });
      } else {
        return get().resolveAction(pendingAction.action, pendingAction.playerId, pendingAction.targetId);
      }
      return true;
    }
  },
  
  // Acciones - Pasar (no desafiar ni bloquear)
  pass: () => {
    const { pendingAction, pendingBlock, waitingForChallenge, waitingForBlock } = get();
    
    // Si hay un bloqueo pendiente y no se desafió, el bloqueo es efectivo
    if (pendingBlock && waitingForChallenge) {
      set({
        pendingAction: null,
        pendingBlock: null,
        pendingChallenge: null,
        waitingForChallenge: false,
        waitingForBlock: false,
        gameLog: [
          ...get().gameLog,
          {
            type: 'block_success',
            message: 'El bloqueo ha sido efectivo. La acción ha sido cancelada.',
            timestamp: Date.now(),
          },
        ],
      });
      get().nextTurn();
      return true;
    }
    
    // Si hay una acción pendiente y no se puede desafiar/bloquear más, resolverla
    if (pendingAction && !waitingForChallenge && !waitingForBlock) {
      return get().resolveAction(pendingAction.action, pendingAction.playerId, pendingAction.targetId);
    }
    
    return false;
  },
  
  // Acciones - Resolver acción
  resolveAction: (action, playerId, targetId = null) => {
    const { players, treasury, deck, gameLog } = get();
    const player = players.find(p => p.id === playerId);
    if (!player) return false;
    
    const actionInfo = ACTION_INFO[action];
    if (!actionInfo) return false;
    
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex(p => p.id === playerId);
    let updatedTreasury = treasury;
    let updatedDeck = [...deck];
    let newLogEntry = null;
    
    switch (action) {
      case ACTIONS.INCOME:
        updatedPlayers[playerIndex].coins += GAME_CONFIG.INCOME_AMOUNT;
        newLogEntry = {
          type: 'action_resolved',
          message: `${player.name} toma ${GAME_CONFIG.INCOME_AMOUNT} moneda(s) con Ingreso`,
          timestamp: Date.now(),
        };
        break;
        
      case ACTIONS.FOREIGN_AID:
        updatedPlayers[playerIndex].coins += GAME_CONFIG.FOREIGN_AID_AMOUNT;
        newLogEntry = {
          type: 'action_resolved',
          message: `${player.name} toma ${GAME_CONFIG.FOREIGN_AID_AMOUNT} monedas con Ayuda Exterior`,
          timestamp: Date.now(),
        };
        break;
        
      case ACTIONS.COUP:
        if (updatedPlayers[playerIndex].coins >= GAME_CONFIG.COUP_COST && targetId) {
          updatedPlayers[playerIndex].coins -= GAME_CONFIG.COUP_COST;
          updatedTreasury += GAME_CONFIG.COUP_COST;
          const target = updatedPlayers.find(p => p.id === targetId);
          if (target && !target.eliminated) {
            // El objetivo debe perder una influencia (lo elegirá manualmente)
            // Por ahora, perderá la primera no revelada
            const targetInfluence = target.influence.find(inf => !inf.revealed);
            if (targetInfluence) {
              targetInfluence.revealed = true;
            }
            newLogEntry = {
              type: 'action_resolved',
              message: `${player.name} realiza un Golpe de Estado a ${target.name}. ${target.name} pierde una influencia.`,
              timestamp: Date.now(),
            };
            get().checkPlayerElimination(targetId);
          }
        }
        break;
        
      case ACTIONS.TAX:
        updatedPlayers[playerIndex].coins += GAME_CONFIG.TAX_AMOUNT;
        newLogEntry = {
          type: 'action_resolved',
          message: `${player.name} cobra ${GAME_CONFIG.TAX_AMOUNT} monedas con el Impuesto del Duque`,
          timestamp: Date.now(),
        };
        break;
        
      case ACTIONS.ASSASSINATE:
        if (updatedPlayers[playerIndex].coins >= GAME_CONFIG.ASSASSIN_COST && targetId) {
          updatedPlayers[playerIndex].coins -= GAME_CONFIG.ASSASSIN_COST;
          updatedTreasury += GAME_CONFIG.ASSASSIN_COST;
          const target = updatedPlayers.find(p => p.id === targetId);
          if (target && !target.eliminated) {
            const targetInfluence = target.influence.find(inf => !inf.revealed);
            if (targetInfluence) {
              targetInfluence.revealed = true;
            }
            newLogEntry = {
              type: 'action_resolved',
              message: `${player.name} asesina a ${target.name}. ${target.name} pierde una influencia.`,
              timestamp: Date.now(),
            };
            get().checkPlayerElimination(targetId);
          }
        }
        break;
        
      case ACTIONS.STEAL:
        if (targetId) {
          const target = updatedPlayers.find(p => p.id === targetId);
          if (target && !target.eliminated) {
            const stealAmount = Math.min(GAME_CONFIG.STEAL_AMOUNT, target.coins);
            target.coins -= stealAmount;
            updatedPlayers[playerIndex].coins += stealAmount;
            newLogEntry = {
              type: 'action_resolved',
              message: `${player.name} roba ${stealAmount} moneda(s) a ${target.name}`,
              timestamp: Date.now(),
            };
          }
        }
        break;
        
      case ACTIONS.EXCHANGE:
        // Robar 2 cartas
        const drawnCards = [];
        for (let i = 0; i < 2 && updatedDeck.length > 0; i++) {
          drawnCards.push(updatedDeck.pop());
        }
        // Guardar cartas para que el jugador elija
        set({ exchangeCards: drawnCards, waitingForExchange: true });
        newLogEntry = {
          type: 'action_resolved',
          message: `${player.name} roba 2 cartas para intercambio`,
          timestamp: Date.now(),
        };
        // No avanzar turno aún, esperar a que el jugador elija las cartas
        break;
    }
    
    set({
      players: updatedPlayers,
      treasury: updatedTreasury,
      deck: updatedDeck,
      pendingAction: null,
      pendingBlock: null,
      waitingForTarget: false,
      gameLog: newLogEntry ? [...gameLog, newLogEntry] : gameLog,
    });
    
    if (action !== ACTIONS.EXCHANGE) {
      get().nextTurn();
    }
    
    return true;
  },
  
  // Acciones - Intercambio (elegir cartas)
  completeExchange: (cardsToKeep, cardsToReturn) => {
    const { players, currentPlayerId, deck, exchangeCards, gameLog } = get();
    const player = players.find(p => p.id === currentPlayerId);
    if (!player) return false;
    
    // Reemplazar las cartas del jugador
    const updatedPlayers = [...players];
    const playerIndex = updatedPlayers.findIndex(p => p.id === currentPlayerId);
    const updatedInfluence = [...player.influence];
    
    // Encontrar las cartas que se devuelven
    cardsToReturn.forEach(charToReturn => {
      const index = updatedInfluence.findIndex(
        inf => !inf.revealed && inf.character === charToReturn
      );
      if (index !== -1 && exchangeCards.length > 0) {
        updatedInfluence[index].character = exchangeCards.pop();
      }
    });
    
    // Devolver cartas no elegidas al mazo
    const updatedDeck = [...deck, ...exchangeCards];
    
    updatedPlayers[playerIndex].influence = updatedInfluence;
    
    set({
      players: updatedPlayers,
      deck: updatedDeck,
      exchangeCards: [],
      waitingForExchange: false,
      gameLog: [
        ...gameLog,
        {
          type: 'exchange_completed',
          message: `${player.name} completa el intercambio`,
          timestamp: Date.now(),
        },
      ],
    });
    
    get().nextTurn();
    return true;
  },
  
  // Acciones - Verificar eliminación
  checkPlayerElimination: (playerId) => {
    const { players } = get();
    const player = players.find(p => p.id === playerId);
    if (!player) return false;
    
    const revealedCount = player.influence.filter(inf => inf.revealed).length;
    if (revealedCount >= 2 && !player.eliminated) {
      const updatedPlayers = players.map(p =>
        p.id === playerId ? { ...p, eliminated: true } : p
      );
      
      set({
        players: updatedPlayers,
        gameLog: [
          ...get().gameLog,
          {
            type: 'player_eliminated',
            message: `${player.name} ha sido eliminado`,
            timestamp: Date.now(),
          },
        ],
      });
      
      // Verificar si el juego terminó
      get().checkGameEnd();
      return true;
    }
    return false;
  },
  
  // Acciones - Verificar fin del juego
  checkGameEnd: () => {
    const alivePlayers = get().getAlivePlayers();
    if (alivePlayers.length === 1) {
      set({
        gameStatus: 'finished',
        gameLog: [
          ...get().gameLog,
          {
            type: 'game_end',
            message: `${alivePlayers[0].name} ha ganado la partida`,
            timestamp: Date.now(),
          },
        ],
      });
      return true;
    }
    return false;
  },
  
  // Acciones - Siguiente turno
  nextTurn: () => {
    const { players, currentPlayerIndex } = get();
    const alivePlayers = players.filter(p => !p.eliminated);
    
    if (alivePlayers.length <= 1) {
      get().checkGameEnd();
      return;
    }
    
    // Encontrar el siguiente jugador vivo
    let nextIndex = (currentPlayerIndex + 1) % players.length;
    while (players[nextIndex].eliminated) {
      nextIndex = (nextIndex + 1) % players.length;
    }
    
    set({
      currentPlayerIndex: nextIndex,
      currentPlayerId: players[nextIndex].id,
      pendingAction: null,
      pendingBlock: null,
      pendingChallenge: null,
      waitingForResponse: false,
      waitingForTarget: false,
      waitingForChallenge: false,
      waitingForBlock: false,
    });
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'setup',
      players: [],
      currentPlayerIndex: 0,
      currentPlayerId: null,
      deck: [],
      treasury: 0,
      pendingAction: null,
      pendingBlock: null,
      pendingChallenge: null,
      waitingForResponse: false,
      waitingForTarget: false,
      waitingForChallenge: false,
      waitingForBlock: false,
      waitingForExchange: false,
      gameLog: [],
      exchangeCards: [],
    });
  },
}));
