// Definición de cartas de acción del juego
export const ACTION_CARDS = {
  ACCUSATION: {
    id: 'accusation',
    name: 'Acusación',
    description: 'Coloca esta carta bocarriba frente a otro jugador. Si un jugador tiene 7 acusaciones, comienza un juicio contra él.',
    type: 'action',
    canTargetPlayer: true,
  },
  ALIBI: {
    id: 'alibi',
    name: 'Coartada',
    description: 'Descarta una carta de "Acusación" que esté frente a ti. Puedes jugar esta carta fuera de tu turno inmediatamente después de ser acusado.',
    type: 'action',
    canTargetSelf: true,
  },
  GUN: {
    id: 'gun',
    name: 'Pistola',
    description: 'Obliga a otro jugador a descartar una carta de su mano al azar.',
    type: 'action',
    canTargetPlayer: true,
  },
  INVESTIGATE: {
    id: 'investigate',
    name: 'Investigar',
    description: 'Mira la mano de otro jugador.',
    type: 'action',
    canTargetPlayer: true,
  },
  DRAW_CARD: {
    id: 'draw_card',
    name: 'Robar Carta',
    description: 'Roba una carta adicional del mazo.',
    type: 'action',
  },
};

// Cartas de Juicio
export const TRIAL_CARDS = {
  WITCH: {
    id: 'trial_witch',
    name: 'Bruja',
    description: 'Si durante un juicio esta es la única carta de "Juicio" que revelas, te declaras como Bruja. El pueblo aún debe votar.',
    type: 'trial',
    revealsRole: true,
  },
  NOT_WITCH: {
    id: 'trial_not_witch',
    name: 'No es una Bruja',
    description: 'Revela esta carta durante tu juicio para probar tu inocencia... por ahora.',
    type: 'trial',
    revealsRole: false,
  },
};

// Cartas de Rol
export const ROLE_CARDS = {
  WITCH: {
    id: 'role_witch',
    name: 'Bruja',
    description: 'Eres una Bruja. Tu objetivo es eliminar a todos los Aldeanos o convertirlos en brujas.',
    type: 'role',
    isWitch: true,
  },
  VILLAGER: {
    id: 'role_villager',
    name: 'Aldeano',
    description: 'Eres un Aldeano. Tu objetivo es descubrir y eliminar a todas las Brujas.',
    type: 'role',
    isWitch: false,
  },
  AGENT: {
    id: 'role_agent',
    name: 'Agente',
    description: 'Eres un Aldeano. Una vez por partida, durante la noche, puedes elegir a un jugador muerto. Si era una Bruja, tú la mataste. Si era Aldeano, te suicidas por la culpa.',
    type: 'role',
    isWitch: false,
    specialAbility: 'night_kill',
  },
};

// Carta especial de Conspiración
export const CONSPIRACY_CARD = {
  id: 'conspiracy',
  name: 'Conspiración',
  description: 'Si un jugador muere mientras posee esta carta, se convierte en Bruja.',
  type: 'special',
};

// Configuración del juego
export const GAME_CONFIG = {
  MIN_PLAYERS: 4,
  MAX_PLAYERS: 12,
  INITIAL_HAND_SIZE: 3,
  ACCUSATIONS_FOR_TRIAL: 7,
  CARDS_DRAWN_PER_TURN: 2,
};

// Generar mazo de cartas de acción
export const generateActionDeck = () => {
  const deck = [];
  
  // Añadir cartas de Acusación (más comunes)
  for (let i = 0; i < 20; i++) {
    deck.push({ ...ACTION_CARDS.ACCUSATION, instanceId: `accusation_${i}` });
  }
  
  // Añadir Coartadas
  for (let i = 0; i < 10; i++) {
    deck.push({ ...ACTION_CARDS.ALIBI, instanceId: `alibi_${i}` });
  }
  
  // Añadir Pistolas
  for (let i = 0; i < 8; i++) {
    deck.push({ ...ACTION_CARDS.GUN, instanceId: `gun_${i}` });
  }
  
  // Añadir Investigar
  for (let i = 0; i < 6; i++) {
    deck.push({ ...ACTION_CARDS.INVESTIGATE, instanceId: `investigate_${i}` });
  }
  
  // Añadir Robar Carta
  for (let i = 0; i < 6; i++) {
    deck.push({ ...ACTION_CARDS.DRAW_CARD, instanceId: `draw_card_${i}` });
  }
  
  return deck;
};

// Generar mazo de cartas de juicio
export const generateTrialDeck = (numPlayers) => {
  const deck = [];
  
  // Cada jugador recibe 3 cartas de juicio
  // 1 puede ser Bruja, 2 son No Bruja
  for (let i = 0; i < numPlayers; i++) {
    deck.push({ ...TRIAL_CARDS.WITCH, instanceId: `trial_witch_${i}` });
    deck.push({ ...TRIAL_CARDS.NOT_WITCH, instanceId: `trial_not_witch_${i}_1` });
    deck.push({ ...TRIAL_CARDS.NOT_WITCH, instanceId: `trial_not_witch_${i}_2` });
  }
  
  return deck;
};

