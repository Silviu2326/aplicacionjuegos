// Roles de One Night Ultimate Werewolf
export const ROLES = {
  WEREWOLF: 'werewolf',
  SEER: 'seer',
  ROBBER: 'robber',
  TROUBLEMAKER: 'troublemaker',
  VILLAGER: 'villager',
  TANNER: 'tanner',
  HUNTER: 'hunter',
  MASON: 'mason',
  INSOMNIAC: 'insomniac',
  MINION: 'minion',
  DRUNK: 'drunk',
  DOPPELGANGER: 'doppelganger',
  APPRAISER: 'appraiser',
  PRINCE: 'prince',
  AURA_SEER: 'aura_seer',
  VILLAGE_IDIOT: 'village_idiot',
};

// Información de cada rol
export const ROLE_INFO = {
  [ROLES.WEREWOLF]: {
    name: 'Hombre Lobo',
    team: 'werewolf',
    description: 'Gana si ningún Hombre Lobo es eliminado. Durante la noche, despierta y reconoce a otros Hombres Lobo.',
    nightOrder: 1,
    action: 'look_at_werewolves',
  },
  [ROLES.SEER]: {
    name: 'Vidente',
    team: 'village',
    description: 'Durante la noche, puedes mirar la carta de otro jugador o dos cartas del centro.',
    nightOrder: 3,
    action: 'look_at_player_or_center',
  },
  [ROLES.ROBBER]: {
    name: 'Ladrón',
    team: 'village',
    description: 'Durante la noche, intercambias tu carta con la de otro jugador. Luego miras tu nueva carta.',
    nightOrder: 4,
    action: 'swap_and_look',
  },
  [ROLES.TROUBLEMAKER]: {
    name: 'Alborotadora',
    team: 'village',
    description: 'Durante la noche, intercambias las cartas de otros dos jugadores (sin que ellos lo sepan).',
    nightOrder: 5,
    action: 'swap_two_others',
  },
  [ROLES.VILLAGER]: {
    name: 'Aldeano',
    team: 'village',
    description: 'No tienes poder especial. Ayuda a la aldea a encontrar a los Hombres Lobo.',
    nightOrder: null,
    action: null,
  },
  [ROLES.TANNER]: {
    name: 'Curtidor',
    team: 'tanner',
    description: 'Ganas solo si eres eliminado. Si no eres eliminado, pierdes.',
    nightOrder: null,
    action: null,
  },
  [ROLES.HUNTER]: {
    name: 'Cazador',
    team: 'village',
    description: 'Si eres eliminado, también eliminas al jugador que votó por ti.',
    nightOrder: null,
    action: null,
  },
  [ROLES.MASON]: {
    name: 'Masón',
    team: 'village',
    description: 'Durante la noche, despiertas y reconoces a otros Masones.',
    nightOrder: 2,
    action: 'look_at_masons',
  },
  [ROLES.INSOMNIAC]: {
    name: 'Insomne',
    team: 'village',
    description: 'Al final de la noche, miras tu propia carta (para ver si fue cambiada).',
    nightOrder: 6,
    action: 'look_at_own',
  },
  [ROLES.MINION]: {
    name: 'Súbdito',
    team: 'werewolf',
    description: 'Ganas si ningún Hombre Lobo es eliminado. Durante la noche, despiertas y ves quiénes son los Hombres Lobo.',
    nightOrder: 1,
    action: 'look_at_werewolves',
  },
  [ROLES.DRUNK]: {
    name: 'Borracho',
    team: 'village',
    description: 'Durante la noche, intercambias tu carta con una del centro (sin mirar).',
    nightOrder: 4,
    action: 'swap_with_center',
  },
  [ROLES.DOPPELGANGER]: {
    name: 'Doppelgänger',
    team: 'village',
    description: 'Al principio de la noche, copias el rol de otro jugador. Actúas como ese rol durante la noche.',
    nightOrder: 0,
    action: 'copy_role',
  },
  [ROLES.APPRAISER]: {
    name: 'Tasador',
    team: 'village',
    description: 'Durante la noche, miras una carta del centro. Si es un Hombre Lobo, ganas con los Hombres Lobo.',
    nightOrder: 3,
    action: 'look_at_center',
  },
  [ROLES.PRINCE]: {
    name: 'Príncipe',
    team: 'village',
    description: 'Si votan para eliminarte, no eres eliminado. Revelas que eres el Príncipe y tu voto no cuenta.',
    nightOrder: null,
    action: null,
  },
  [ROLES.AURA_SEER]: {
    name: 'Vidente de Aura',
    team: 'village',
    description: 'Durante la noche, miras la carta de otro jugador. Si es un Hombre Lobo, también ves quién más es Hombre Lobo.',
    nightOrder: 3,
    action: 'look_at_player_aura',
  },
  [ROLES.VILLAGE_IDIOT]: {
    name: 'Idiota del Pueblo',
    team: 'village',
    description: 'Si votan para eliminarte, no eres eliminado. Pero tu voto no cuenta.',
    nightOrder: null,
    action: null,
  },
};

// Orden de la noche (roles que actúan en orden)
export const NIGHT_ORDER = [
  ROLES.DOPPELGANGER,
  ROLES.WEREWOLF,
  ROLES.MASON,
  ROLES.SEER,
  ROLES.AURA_SEER,
  ROLES.APPRAISER,
  ROLES.ROBBER,
  ROLES.DRUNK,
  ROLES.TROUBLEMAKER,
  ROLES.INSOMNIAC,
];

// Configuración del juego
export const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 10,
  CARDS_PER_PLAYER_PLUS_CENTER: 3, // Número de jugadores + 3 cartas
  DISCUSSION_TIME: 300, // 5 minutos en segundos
  NIGHT_PHASE_DELAY: 2000, // Delay entre fases nocturnas en ms
  ACTION_TIMEOUT: 30000, // Timeout para acciones nocturnas en ms
};

// Conjuntos de roles recomendados por número de jugadores
export const RECOMMENDED_ROLE_SETS = {
  3: [ROLES.WEREWOLF, ROLES.SEER, ROLES.ROBBER, ROLES.VILLAGER, ROLES.VILLAGER, ROLES.TANNER],
  4: [ROLES.WEREWOLF, ROLES.SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.VILLAGER, ROLES.VILLAGER, ROLES.TANNER],
  5: [ROLES.WEREWOLF, ROLES.SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.VILLAGER, ROLES.VILLAGER, ROLES.VILLAGER, ROLES.TANNER],
  6: [ROLES.WEREWOLF, ROLES.MINION, ROLES.SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.DRUNK, ROLES.VILLAGER, ROLES.VILLAGER, ROLES.TANNER],
  7: [ROLES.WEREWOLF, ROLES.MINION, ROLES.MASON, ROLES.MASON, ROLES.SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.DRUNK, ROLES.VILLAGER, ROLES.TANNER],
  8: [ROLES.WEREWOLF, ROLES.MINION, ROLES.MASON, ROLES.MASON, ROLES.SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.DRUNK, ROLES.INSOMNIAC, ROLES.VILLAGER, ROLES.TANNER],
  9: [ROLES.WEREWOLF, ROLES.MINION, ROLES.MASON, ROLES.MASON, ROLES.SEER, ROLES.AURA_SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.DRUNK, ROLES.INSOMNIAC, ROLES.VILLAGER, ROLES.TANNER],
  10: [ROLES.WEREWOLF, ROLES.MINION, ROLES.MASON, ROLES.MASON, ROLES.SEER, ROLES.AURA_SEER, ROLES.ROBBER, ROLES.TROUBLEMAKER, ROLES.DRUNK, ROLES.INSOMNIAC, ROLES.HUNTER, ROLES.VILLAGER, ROLES.TANNER],
};

// Nombres de jugadores predefinidos para pruebas
export const SAMPLE_PLAYER_NAMES = [
  'Alejandro', 'Sofía', 'Carlos', 'María', 'Diego', 
  'Laura', 'Javier', 'Ana', 'Luis', 'Carmen',
  'Pablo', 'Isabel', 'Miguel', 'Elena', 'Roberto',
  'Patricia', 'Fernando', 'Lucía', 'Antonio', 'Marta'
];

// Estadísticas de partidas de ejemplo
export const SAMPLE_GAME_STATS = {
  totalGames: 47,
  werewolfWins: 18,
  villageWins: 24,
  tannerWins: 5,
  mostPlayedRole: ROLES.SEER,
  averageGameDuration: 420, // segundos
};

