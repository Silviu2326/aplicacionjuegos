export const GAME_CONFIG = {
  minPlayers: 4,
  maxPlayers: 8,
  questioningTimeMinutes: 5,
  discussionTimeMinutes: 3,
  defaultQuestioningTime: 5 * 60 * 1000, // 5 minutos en milisegundos
  defaultDiscussionTime: 3 * 60 * 1000, // 3 minutos en milisegundos
  defaultCategory: 'animales',
};

export const ROLES = {
  GUIDE: 'guide', // Guía
  INSIDER: 'insider', // Infiltrado
  CITIZEN: 'citizen', // Ciudadano
};

export const GAME_STATUS = {
  SETUP: 'setup',
  LOBBY: 'lobby',
  ROLE_REVEAL: 'role-reveal',
  QUESTIONING: 'questioning',
  DISCUSSION: 'discussion',
  VOTING: 'voting',
  RESULTS: 'results',
};

export const GAME_RESULT = {
  CITIZENS_WIN: 'citizens-win', // Ciudadanos y Guía ganan
  INSIDER_WINS: 'insider-wins', // Infiltrado gana
  TIME_OUT: 'time-out', // Se acabó el tiempo sin adivinar
};

