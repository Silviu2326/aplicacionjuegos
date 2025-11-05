export const GAME_CONFIG = {
  MIN_PLAYERS: 5,
  MAX_PLAYERS: 10,
};

export const ROLE_DISTRIBUTION = {
  5: { liberals: 3, fascists: 1, hitler: 1 },
  6: { liberals: 4, fascists: 1, hitler: 1 },
  7: { liberals: 4, fascists: 2, hitler: 1 },
  8: { liberals: 5, fascists: 2, hitler: 1 },
  9: { liberals: 5, fascists: 3, hitler: 1 },
  10: { liberals: 6, fascists: 3, hitler: 1 },
};

export const POLICY_DECK = {
  liberal: 6,
  fascist: 11,
};

export const WIN_CONDITIONS = {
  liberals: {
    policies: 5,
    killHitler: true,
  },
  fascists: {
    policies: 6,
    hitlerChancellor: true,
  },
};

export const EXECUTIVE_POWERS = [
  { fascistPolicies: 1, power: 'investigate' },
  { fascistPolicies: 2, power: 'special_election' },
  { fascistPolicies: 3, power: 'policy_peek' },
  { fascistPolicies: 4, power: 'execution' },
  { fascistPolicies: 5, power: 'execution_veto' },
];

export const GAME_PHASES = {
  LOBBY: 'lobby',
  ROLE_REVEAL: 'role_reveal',
  GOVERNMENT_SELECTION: 'government_selection',
  VOTING: 'voting',
  LEGISLATIVE_SESSION: 'legislative_session',
  EXECUTIVE_POWER: 'executive_power',
  GAME_OVER: 'game_over',
};
