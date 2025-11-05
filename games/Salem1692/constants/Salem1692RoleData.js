import { ROLE_CARDS } from './Salem1692CardData';

// Configuración de roles para el juego
export const ROLE_DISTRIBUTION = {
  // Para 4-5 jugadores: 1 bruja, resto aldeanos
  // Para 6-7 jugadores: 2 brujas, resto aldeanos
  // Para 8-9 jugadores: 2-3 brujas, resto aldeanos
  // Para 10-12 jugadores: 3-4 brujas, resto aldeanos
  
  getWitchCount: (numPlayers) => {
    if (numPlayers <= 5) return 1;
    if (numPlayers <= 7) return 2;
    if (numPlayers <= 9) return 3;
    return 4;
  },
  
  getVillagerCount: (numPlayers) => {
    return numPlayers - ROLE_DISTRIBUTION.getWitchCount(numPlayers);
  },
};

// Roles disponibles
export const AVAILABLE_ROLES = {
  WITCH: ROLE_CARDS.WITCH,
  VILLAGER: ROLE_CARDS.VILLAGER,
  AGENT: ROLE_CARDS.AGENT,
};

// Roles especiales (opcionales para futuras expansiones)
export const SPECIAL_ROLES = {
  SEER: {
    id: 'role_seer',
    name: 'Vidente',
    description: 'Eres un Aldeano. Una vez por partida, durante la noche, puedes ver el rol de un jugador.',
    type: 'role',
    isWitch: false,
    specialAbility: 'night_vision',
  },
  FOOL: {
    id: 'role_fool',
    name: 'Bufón',
    description: 'Eres un Aldeano. Ganas si eres condenado en un juicio.',
    type: 'role',
    isWitch: false,
    specialAbility: 'win_on_condemnation',
  },
};

