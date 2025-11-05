export const ACTIONS = {
  INCOME: 'income',
  FOREIGN_AID: 'foreign_aid',
  COUP: 'coup',
  TAX: 'tax', // Duque
  ASSASSINATE: 'assassinate', // Asesino
  STEAL: 'steal', // Capitán
  EXCHANGE: 'exchange', // Embajador
};

export const ACTION_INFO = {
  [ACTIONS.INCOME]: {
    name: 'Ingreso',
    description: 'Toma 1 moneda del Tesoro',
    cost: 0,
    character: null,
    canBeChallenged: false,
    canBeBlocked: false,
    targetRequired: false,
  },
  [ACTIONS.FOREIGN_AID]: {
    name: 'Ayuda Exterior',
    description: 'Toma 2 monedas del Tesoro',
    cost: 0,
    character: null,
    canBeChallenged: false,
    canBeBlocked: true,
    blockableBy: ['duke'],
    targetRequired: false,
  },
  [ACTIONS.COUP]: {
    name: 'Golpe de Estado',
    description: 'Paga 7 monedas y elige a otro jugador para que pierda una influencia',
    cost: 7,
    character: null,
    canBeChallenged: false,
    canBeBlocked: false,
    targetRequired: true,
    mandatoryAtCoins: 10,
  },
  [ACTIONS.TAX]: {
    name: 'Impuesto',
    description: 'Toma 3 monedas del Tesoro',
    cost: 0,
    character: 'duke',
    canBeChallenged: true,
    canBeBlocked: false,
    targetRequired: false,
  },
  [ACTIONS.ASSASSINATE]: {
    name: 'Asesinar',
    description: 'Paga 3 monedas y elige a un jugador para que pierda una influencia',
    cost: 3,
    character: 'assassin',
    canBeChallenged: true,
    canBeBlocked: true,
    blockableBy: ['contessa'],
    targetRequired: true,
  },
  [ACTIONS.STEAL]: {
    name: 'Extorsionar',
    description: 'Roba 2 monedas de otro jugador',
    cost: 0,
    character: 'captain',
    canBeChallenged: true,
    canBeBlocked: true,
    blockableBy: ['captain', 'ambassador'],
    targetRequired: true,
  },
  [ACTIONS.EXCHANGE]: {
    name: 'Intercambio',
    description: 'Roba 2 cartas del mazo, míralas junto con tus cartas actuales y devuelve 2 cartas al mazo',
    cost: 0,
    character: 'ambassador',
    canBeChallenged: true,
    canBeBlocked: false,
    targetRequired: false,
  },
};

export const GAME_CONFIG = {
  STARTING_COINS: 2,
  STARTING_INFLUENCE: 2,
  COUP_COST: 7,
  MANDATORY_COUP_COINS: 10,
  ASSASSIN_COST: 3,
  STEAL_AMOUNT: 2,
  TAX_AMOUNT: 3,
  FOREIGN_AID_AMOUNT: 2,
  INCOME_AMOUNT: 1,
  MIN_PLAYERS: 2,
  MAX_PLAYERS: 6,
};
