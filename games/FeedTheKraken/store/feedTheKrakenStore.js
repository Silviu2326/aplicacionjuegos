import { create } from 'zustand';

// Roles del juego
export const ROLES = {
  SAILOR: 'sailor', // Marinero leal
  PIRATE: 'pirate', // Pirata
  CULT_LEADER: 'cult_leader', // Líder de Secta
};

// Cartas de navegación
export const NAVIGATION_CARDS = {
  BLUE: 'blue', // Hacia Bluewater Bay (Marineros)
  YELLOW: 'yellow', // Hacia la Ensenada de los Corsarios (Piratas)
  RED: 'red', // Kraken (Secta)
};

// Estados del juego
export const GAME_STATUS = {
  LOBBY: 'lobby',
  ROLE_REVEAL: 'role_reveal',
  PLAYING: 'playing',
  FINISHED: 'finished',
};

// Fases del turno
export const TURN_PHASE = {
  CAPTAIN_SELECTION: 'captain_selection',
  LIEUTENANT_SELECTION: 'lieutenant_selection',
  NAVIGATOR_SELECTION: 'navigator_selection',
  CAPTAIN_CARD_PASS: 'captain_card_pass',
  LIEUTENANT_CARD_PASS: 'lieutenant_card_pass',
  NAVIGATOR_CARD_PLAY: 'navigator_card_play',
  CREW_ACTIONS: 'crew_actions',
  CAPTAIN_ACCUSATION: 'captain_accusation',
  VOTING: 'voting',
};

export const useFeedTheKrakenStore = create((set, get) => ({
  // Estado del juego
  gameStatus: GAME_STATUS.LOBBY,
  currentTurn: 1,
  currentPhase: TURN_PHASE.CAPTAIN_SELECTION,
  turnHistory: [],

  // Jugadores
  players: [], // [{ id, name, role, isCaptain, isLieutenant, isNavigator, inJail, eliminated, hasGun }]
  currentPlayerId: null,

  // Oficiales del turno actual
  captainId: null,
  lieutenantId: null,
  navigatorId: null,

  // Posición del barco en el mapa
  shipPosition: 0, // 0 = inicio, positivo = hacia Bluewater Bay, negativo = hacia Ensenada
  maxPosition: 5, // Posición máxima para victoria Marineros
  minPosition: -5, // Posición mínima para victoria Piratas

  // Cartas de navegación
  navigationDeck: [],
  captainCards: [], // Cartas que tiene el Capitán
  lieutenantCards: [], // Cartas que tiene el Teniente
  navigatorCards: [], // Cartas que tiene el Navegante
  playedCard: null, // Carta jugada por el Navegante

  // Acciones y votaciones
  pendingMutiny: null, // { instigatorId, targetCaptainId, votes: [] }
  pendingAccusation: null, // { accuserId, accusedId, votes: [] }
  activeVotes: [], // [{ playerId, vote: 'yes' | 'no' }]

  // Poderes del Culto
  cultLeaderActions: [], // Acciones secretas del Líder de Secta
  convertedPlayers: [], // Jugadores convertidos al culto

  // Eventos del juego
  gameEvents: [], // [{ type, message, timestamp }]

  // Condiciones de victoria
  winner: null, // 'sailors', 'pirates', 'cult'

  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      role: null,
      isCaptain: false,
      isLieutenant: false,
      isNavigator: false,
      inJail: false,
      eliminated: false,
      hasGun: false,
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
    if (players.length < 5 || players.length > 11) {
      return false; // Mínimo 5, máximo 11 jugadores
    }

    const shuffledPlayers = [...players].sort(() => Math.random() - 0.5);
    const numPlayers = players.length;
    
    // Determinar distribución de roles según número de jugadores
    let numPirates = 0;
    let numCultLeaders = 1; // Siempre hay un Líder de Secta
    let numSailors = numPlayers - numCultLeaders;

    // Calcular número de piratas según reglas del juego
    if (numPlayers >= 5 && numPlayers <= 6) {
      numPirates = 1;
    } else if (numPlayers >= 7 && numPlayers <= 8) {
      numPirates = 2;
    } else if (numPlayers >= 9 && numPlayers <= 10) {
      numPirates = 3;
    } else if (numPlayers === 11) {
      numPirates = 3;
    }

    numSailors = numPlayers - numPirates - numCultLeaders;

    const roles = [
      ...Array(numSailors).fill(ROLES.SAILOR),
      ...Array(numPirates).fill(ROLES.PIRATE),
      ...Array(numCultLeaders).fill(ROLES.CULT_LEADER),
    ].sort(() => Math.random() - 0.5);

    const updatedPlayers = shuffledPlayers.map((player, index) => ({
      ...player,
      role: roles[index],
    }));

    // El primer jugador es el Capitán inicial
    const firstCaptain = updatedPlayers[0];
    const captainIndex = updatedPlayers.findIndex(p => p.id === firstCaptain.id);

    set({
      players: updatedPlayers,
      captainId: firstCaptain.id,
      gameStatus: GAME_STATUS.ROLE_REVEAL,
      currentPhase: TURN_PHASE.CAPTAIN_SELECTION,
    });

    return true;
  },

  // Inicializar mazo de cartas de navegación
  initializeNavigationDeck: () => {
    const deck = [];
    // Crear mazo con cartas azules, amarillas y rojas
    // Distribución aproximada según reglas del juego
    for (let i = 0; i < 10; i++) {
      deck.push(NAVIGATION_CARDS.BLUE);
    }
    for (let i = 0; i < 10; i++) {
      deck.push(NAVIGATION_CARDS.YELLOW);
    }
    for (let i = 0; i < 5; i++) {
      deck.push(NAVIGATION_CARDS.RED);
    }
    // Mezclar el mazo
    const shuffled = [...deck].sort(() => Math.random() - 0.5);
    set({ navigationDeck: shuffled });
    return shuffled;
  },

  // Capitán selecciona Teniente
  selectLieutenant: (lieutenantId) => {
    const { captainId, players } = get();
    if (!captainId || captainId === lieutenantId) return false;

    const lieutenant = players.find(p => p.id === lieutenantId);
    if (!lieutenant || lieutenant.inJail || lieutenant.eliminated) return false;

    set({
      lieutenantId,
      currentPhase: TURN_PHASE.NAVIGATOR_SELECTION,
    });

    return true;
  },

  // Teniente selecciona Navegante
  selectNavigator: (navigatorId) => {
    const { lieutenantId, captainId, players } = get();
    if (!lieutenantId || navigatorId === captainId || navigatorId === lieutenantId) return false;

    const navigator = players.find(p => p.id === navigatorId);
    if (!navigator || navigator.inJail || navigator.eliminated) return false;

    set({
      navigatorId,
      currentPhase: TURN_PHASE.CAPTAIN_CARD_PASS,
    });

    return true;
  },

  // Repartir cartas al Capitán
  dealCardsToCaptain: () => {
    const { navigationDeck } = get();
    if (navigationDeck.length < 2) {
      get().initializeNavigationDeck();
    }

    const deck = get().navigationDeck;
    const cards = deck.slice(0, 2);
    const remainingDeck = deck.slice(2);

    set({
      captainCards: cards,
      navigationDeck: remainingDeck,
      currentPhase: TURN_PHASE.CAPTAIN_CARD_PASS,
    });

    return cards;
  },

  // Capitán pasa carta al Teniente
  captainPassCard: (cardIndex) => {
    const { captainCards, lieutenantCards, navigationDeck } = get();
    if (cardIndex < 0 || cardIndex >= captainCards.length) return false;

    const passedCard = captainCards[cardIndex];
    const remainingCard = captainCards.filter((_, i) => i !== cardIndex);

    // El Teniente roba una nueva carta
    const newCard = navigationDeck.length > 0 
      ? navigationDeck[0] 
      : NAVIGATION_CARDS.BLUE; // Fallback
    const newDeck = navigationDeck.length > 0 ? navigationDeck.slice(1) : [];

    set({
      captainCards: remainingCard,
      lieutenantCards: [passedCard, newCard],
      navigationDeck: newDeck,
      currentPhase: TURN_PHASE.LIEUTENANT_CARD_PASS,
    });

    return true;
  },

  // Teniente pasa carta al Navegante
  lieutenantPassCard: (cardIndex) => {
    const { lieutenantCards, navigatorCards, navigationDeck } = get();
    if (cardIndex < 0 || cardIndex >= lieutenantCards.length) return false;

    const passedCard = lieutenantCards[cardIndex];
    const remainingCard = lieutenantCards.filter((_, i) => i !== cardIndex);

    // El Navegante roba una nueva carta
    const newCard = navigationDeck.length > 0 
      ? navigationDeck[0] 
      : NAVIGATION_CARDS.BLUE; // Fallback
    const newDeck = navigationDeck.length > 0 ? navigationDeck.slice(1) : [];

    set({
      lieutenantCards: remainingCard,
      navigatorCards: [passedCard, newCard],
      navigationDeck: newDeck,
      currentPhase: TURN_PHASE.NAVIGATOR_CARD_PLAY,
    });

    return true;
  },

  // Navegante juega carta
  navigatorPlayCard: (cardIndex) => {
    const { navigatorCards, shipPosition } = get();
    if (cardIndex < 0 || cardIndex >= navigatorCards.length) return false;

    const playedCard = navigatorCards[cardIndex];
    let newPosition = shipPosition;

    // Mover el barco según la carta
    if (playedCard === NAVIGATION_CARDS.BLUE) {
      newPosition = Math.min(shipPosition + 1, get().maxPosition);
    } else if (playedCard === NAVIGATION_CARDS.YELLOW) {
      newPosition = Math.max(shipPosition - 1, get().minPosition);
    } else if (playedCard === NAVIGATION_CARDS.RED) {
      // Carta Kraken - no mueve el barco pero puede tener efectos especiales
      newPosition = shipPosition;
    }

    set({
      playedCard,
      navigatorCards: [],
      shipPosition: newPosition,
      currentPhase: TURN_PHASE.CREW_ACTIONS,
    });

    // Verificar condiciones de victoria
    get().checkVictoryConditions();

    return true;
  },

  // Iniciar motín
  initiateMutiny: (instigatorId) => {
    const { captainId, players } = get();
    const instigator = players.find(p => p.id === instigatorId);
    
    if (!instigator || instigator.isCaptain || instigator.isLieutenant || instigator.isNavigator) {
      return false; // Solo la tripulación puede iniciar motines
    }

    set({
      pendingMutiny: {
        instigatorId,
        targetCaptainId: captainId,
        votes: [],
      },
      currentPhase: TURN_PHASE.VOTING,
    });

    return true;
  },

  // Votar en motín
  voteOnMutiny: (playerId, vote) => {
    const { pendingMutiny, players } = get();
    if (!pendingMutiny) return false;

    const hasVoted = pendingMutiny.votes.some(v => v.playerId === playerId);
    if (hasVoted) return false;

    const newVotes = [...pendingMutiny.votes, { playerId, vote }];
    const totalPlayers = players.filter(p => !p.eliminated).length;
    const yesVotes = newVotes.filter(v => v.vote === 'yes').length;

    set({
      pendingMutiny: {
        ...pendingMutiny,
        votes: newVotes,
      },
    });

    // Si la mitad o más vota sí, el motín es exitoso
    if (yesVotes >= Math.ceil(totalPlayers / 2)) {
      get().resolveMutiny(true);
    }

    return true;
  },

  // Resolver motín
  resolveMutiny: (success) => {
    const { pendingMutiny, players } = get();
    if (!pendingMutiny) return;

    if (success) {
      const updatedPlayers = players.map(p => {
        if (p.id === pendingMutiny.targetCaptainId) {
          return { ...p, isCaptain: false, inJail: true };
        } else if (p.id === pendingMutiny.instigatorId) {
          return { ...p, isCaptain: true };
        }
        return p;
      });

      set({
        players: updatedPlayers,
        captainId: pendingMutiny.instigatorId,
        pendingMutiny: null,
        currentPhase: TURN_PHASE.CAPTAIN_SELECTION,
      });
    } else {
      set({
        pendingMutiny: null,
        currentPhase: TURN_PHASE.CREW_ACTIONS,
      });
    }
  },

  // Capitán acusa a un jugador
  captainAccuse: (accusedId) => {
    const { captainId, players } = get();
    const accused = players.find(p => p.id === accusedId);
    
    if (!accused || accused.id === captainId || accused.eliminated) return false;

    set({
      pendingAccusation: {
        accuserId: captainId,
        accusedId,
      },
      currentPhase: TURN_PHASE.VOTING,
    });

    return true;
  },

  // Votar en acusación
  voteOnAccusation: (playerId, vote) => {
    const { pendingAccusation, players } = get();
    if (!pendingAccusation) return false;

    const hasVoted = get().activeVotes.some(v => v.playerId === playerId);
    if (hasVoted) return false;

    const newVotes = [...get().activeVotes, { playerId, vote }];
    const totalPlayers = players.filter(p => !p.eliminated).length;
    const guiltyVotes = newVotes.filter(v => v.vote === 'guilty').length;

    set({
      activeVotes: newVotes,
    });

    // Si la mayoría vota culpable
    if (guiltyVotes > totalPlayers / 2) {
      get().resolveAccusation(true);
    }

    return true;
  },

  // Resolver acusación
  resolveAccusation: (guilty) => {
    const { pendingAccusation, players } = get();
    if (!pendingAccusation) return;

    const updatedPlayers = players.map(p => {
      if (p.id === pendingAccusation.accusedId && guilty) {
        return { ...p, inJail: true };
      }
      return p;
    });

    set({
      players: updatedPlayers,
      pendingAccusation: null,
      activeVotes: [],
      currentPhase: TURN_PHASE.CREW_ACTIONS,
    });
  },

  // Usar pistola
  useGun: (shooterId, targetId) => {
    const { players } = get();
    const shooter = players.find(p => p.id === shooterId);
    const target = players.find(p => p.id === targetId);

    if (!shooter || !shooter.hasGun || !target || target.eliminated) return false;

    const updatedPlayers = players.map(p => {
      if (p.id === shooterId) {
        return { ...p, hasGun: false };
      } else if (p.id === targetId) {
        return { ...p, eliminated: true };
      }
      return p;
    });

    set({ players: updatedPlayers });
    return true;
  },

  // Verificar condiciones de victoria
  checkVictoryConditions: () => {
    const { shipPosition, players, maxPosition, minPosition } = get();

    // Victoria de Marineros
    if (shipPosition >= maxPosition) {
      set({
        winner: 'sailors',
        gameStatus: GAME_STATUS.FINISHED,
      });
      return true;
    }

    // Victoria de Piratas
    if (shipPosition <= minPosition) {
      set({
        winner: 'pirates',
        gameStatus: GAME_STATUS.FINISHED,
      });
      return true;
    }

    // Victoria del Culto (requiere que el Líder de Secta invoque al Kraken)
    const cultLeader = players.find(p => p.role === ROLES.CULT_LEADER && !p.eliminated);
    const convertedCount = get().convertedPlayers.length;
    const totalAlive = players.filter(p => !p.eliminated).length;

    // Condición simplificada: si el culto tiene suficientes seguidores
    if (cultLeader && convertedCount >= Math.ceil(totalAlive / 2)) {
      set({
        winner: 'cult',
        gameStatus: GAME_STATUS.FINISHED,
      });
      return true;
    }

    return false;
  },

  // Avanzar turno
  advanceTurn: () => {
    const { players, currentTurn, captainId } = get();
    const activePlayers = players.filter(p => !p.eliminated && !p.inJail);
    
    // Encontrar el siguiente Capitán
    const currentCaptainIndex = activePlayers.findIndex(p => p.id === captainId);
    const nextCaptainIndex = (currentCaptainIndex + 1) % activePlayers.length;
    const nextCaptain = activePlayers[nextCaptainIndex];

    // Limpiar roles de oficiales
    const updatedPlayers = players.map(p => ({
      ...p,
      isCaptain: p.id === nextCaptain.id,
      isLieutenant: false,
      isNavigator: false,
    }));

    set({
      players: updatedPlayers,
      captainId: nextCaptain.id,
      lieutenantId: null,
      navigatorId: null,
      captainCards: [],
      lieutenantCards: [],
      navigatorCards: [],
      playedCard: null,
      pendingMutiny: null,
      pendingAccusation: null,
      activeVotes: [],
      currentTurn: currentTurn + 1,
      currentPhase: TURN_PHASE.CAPTAIN_SELECTION,
    });

    return true;
  },

  // Iniciar juego
  startGame: () => {
    const { assignRoles, initializeNavigationDeck } = get();
    if (assignRoles()) {
      initializeNavigationDeck();
      set({
        gameStatus: GAME_STATUS.ROLE_REVEAL,
        shipPosition: 0,
      });
      return true;
    }
    return false;
  },

  // Continuar después de revelación de roles
  continueAfterRoleReveal: () => {
    const { dealCardsToCaptain } = get();
    set({
      gameStatus: GAME_STATUS.PLAYING,
    });
    dealCardsToCaptain();
  },

  // Resetear juego
  resetGame: () => {
    set({
      gameStatus: GAME_STATUS.LOBBY,
      currentTurn: 1,
      currentPhase: TURN_PHASE.CAPTAIN_SELECTION,
      players: [],
      captainId: null,
      lieutenantId: null,
      navigatorId: null,
      shipPosition: 0,
      navigationDeck: [],
      captainCards: [],
      lieutenantCards: [],
      navigatorCards: [],
      playedCard: null,
      pendingMutiny: null,
      pendingAccusation: null,
      activeVotes: [],
      cultLeaderActions: [],
      convertedPlayers: [],
      gameEvents: [],
      winner: null,
    });
  },
}));

