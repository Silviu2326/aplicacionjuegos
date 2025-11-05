import { create } from 'zustand';
import {
  GAME_CONFIG,
  ROLE_DISTRIBUTION,
  POLICY_DECK,
  WIN_CONDITIONS,
  EXECUTIVE_POWERS,
  GAME_PHASES,
} from '../constants/SecretHitlerGameRules';

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const useSecretHitlerStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby',
  gamePhase: GAME_PHASES.LOBBY,
  
  // Jugadores
  players: [], // [{ id, name, role, team, eliminated: false, isHitler: false }]
  currentPlayerId: null,
  
  // Gobierno
  presidentId: null,
  chancellorId: null,
  presidentCandidateId: null,
  chancellorCandidateId: null,
  
  // Votación
  votes: {}, // { playerId: 'ja' | 'nein' }
  voteCount: { ja: 0, nein: 0 },
  
  // Políticas
  policyDeck: [],
  discardPile: [],
  drawnPolicies: [], // Políticas que el Presidente ve
  policiesForChancellor: [], // Políticas que el Canciller recibe
  liberalPolicies: 0,
  fascistPolicies: 0,
  
  // Elecciones
  failedElections: 0,
  lastGovernment: null, // { presidentId, chancellorId }
  
  // Poderes ejecutivos
  availableExecutivePower: null,
  executivePowerTarget: null,
  
  // Veto
  vetoAvailable: false,
  vetoRequested: false,
  
  // Log del juego
  gameLog: [],
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      role: null,
      team: null,
      eliminated: false,
      isHitler: false,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players } = get();
    set({ players: players.filter(p => p.id !== playerId) });
  },
  
  // Acciones - Inicio del juego
  initializeGame: () => {
    const { players } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS || players.length > GAME_CONFIG.MAX_PLAYERS) {
      return false;
    }
    
    // Distribuir roles
    const distribution = ROLE_DISTRIBUTION[players.length];
    const roles = [];
    
    // Agregar roles liberales
    for (let i = 0; i < distribution.liberals; i++) {
      roles.push({ role: 'liberal', team: 'liberal', isHitler: false });
    }
    
    // Agregar fascistas
    for (let i = 0; i < distribution.fascists; i++) {
      roles.push({ role: 'fascist', team: 'fascist', isHitler: false });
    }
    
    // Agregar Hitler
    roles.push({ role: 'hitler', team: 'fascist', isHitler: true });
    
    // Barajar roles
    const shuffledRoles = shuffleArray(roles);
    
    // Asignar roles a jugadores
    const initializedPlayers = players.map((player, index) => ({
      ...player,
      ...shuffledRoles[index],
    }));
    
    // Crear mazo de políticas
    const policyDeck = [];
    for (let i = 0; i < POLICY_DECK.liberal; i++) {
      policyDeck.push('liberal');
    }
    for (let i = 0; i < POLICY_DECK.fascist; i++) {
      policyDeck.push('fascist');
    }
    const shuffledDeck = shuffleArray(policyDeck);
    
    // Determinar primer presidente
    const firstPresident = initializedPlayers[0];
    
    set({
      gameStatus: 'role_reveal',
      gamePhase: GAME_PHASES.ROLE_REVEAL,
      players: initializedPlayers,
      policyDeck: shuffledDeck,
      presidentId: firstPresident.id,
      liberalPolicies: 0,
      fascistPolicies: 0,
      failedElections: 0,
      votes: {},
      voteCount: { ja: 0, nein: 0 },
      gameLog: [{ type: 'game_start', message: 'La partida ha comenzado', timestamp: Date.now() }],
    });
    
    return true;
  },
  
  // Acciones - Gobierno
  proposeChancellor: (chancellorId) => {
    const { presidentId, lastGovernment, players } = get();
    const president = players.find(p => p.id === presidentId);
    const chancellor = players.find(p => p.id === chancellorId);
    
    // Validaciones
    if (!president || !chancellor) return false;
    if (chancellor.eliminated) return false;
    if (chancellorId === presidentId) return false;
    
    // No puede ser el mismo gobierno que el anterior
    if (lastGovernment && 
        lastGovernment.presidentId === presidentId && 
        lastGovernment.chancellorId === chancellorId) {
      return false;
    }
    
    set({
      chancellorCandidateId: chancellorId,
      gamePhase: GAME_PHASES.VOTING,
      votes: {},
      voteCount: { ja: 0, nein: 0 },
    });
    
    return true;
  },
  
  // Acciones - Votación
  castVote: (playerId, vote) => {
    const { votes, players } = get();
    if (votes[playerId]) return false; // Ya votó
    
    const newVotes = { ...votes, [playerId]: vote };
    const voteCount = {
      ja: Object.values(newVotes).filter(v => v === 'ja').length,
      nein: Object.values(newVotes).filter(v => v === 'nein').length,
    };
    
    set({ votes: newVotes, voteCount });
    
    // Si todos votaron, procesar votación
    const activePlayers = players.filter(p => !p.eliminated);
    if (Object.keys(newVotes).length === activePlayers.length) {
      setTimeout(() => {
        const state = get();
        state.processVote();
      }, 100);
    }
    
    return true;
  },
  
  processVote: () => {
    const { voteCount, presidentId, chancellorCandidateId, failedElections, policyDeck } = get();
    
    const totalVotes = voteCount.ja + voteCount.nein;
    const majority = Math.ceil(totalVotes / 2);
    
    if (voteCount.ja > majority || (voteCount.ja === voteCount.nein && voteCount.ja > 0)) {
      // Gobierno elegido
      set({
        chancellorId: chancellorCandidateId,
        gamePhase: GAME_PHASES.LEGISLATIVE_SESSION,
        failedElections: 0,
        lastGovernment: { presidentId, chancellorId: chancellorCandidateId },
        votes: {},
        voteCount: { ja: 0, nein: 0 },
      });
      
      // El presidente roba 3 políticas
      if (policyDeck.length >= 3) {
        const drawn = policyDeck.slice(0, 3);
        const remaining = policyDeck.slice(3);
        set({
          policyDeck: remaining,
          drawnPolicies: drawn,
        });
      }
    } else {
      // Elección fallida
      const newFailedElections = failedElections + 1;
      const players = get().players;
      const currentPresidentIndex = players.findIndex(p => p.id === presidentId);
      const nextPresident = players[(currentPresidentIndex + 1) % players.filter(p => !p.eliminated).length];
      
      if (newFailedElections >= 3) {
        // Promulgar política superior automáticamente
        if (policyDeck.length > 0) {
          const topPolicy = policyDeck[0];
          const remaining = policyDeck.slice(1);
          get().enactPolicy(topPolicy, true);
          set({ policyDeck: remaining, failedElections: 0 });
        }
      }
      
      set({
        failedElections: newFailedElections,
        presidentId: nextPresident.id,
        chancellorCandidateId: null,
        gamePhase: GAME_PHASES.GOVERNMENT_SELECTION,
        votes: {},
        voteCount: { ja: 0, nein: 0 },
      });
    }
  },
  
  // Acciones - Sesión Legislativa
  presidentDiscard: (policyIndex) => {
    const { drawnPolicies, discardPile } = get();
    const discarded = drawnPolicies[policyIndex];
    const remaining = drawnPolicies.filter((_, i) => i !== policyIndex);
    
    set({
      drawnPolicies: [],
      policiesForChancellor: remaining,
      discardPile: [...discardPile, discarded],
    });
  },
  
  chancellorDiscard: (policyIndex) => {
    const { policiesForChancellor, discardPile } = get();
    const discarded = policiesForChancellor[policyIndex];
    const enacted = policiesForChancellor.filter((_, i) => i !== policyIndex)[0];
    
    set({
      policiesForChancellor: [],
      discardPile: [...discardPile, discarded],
    });
    
    get().enactPolicy(enacted, false);
  },
  
  enactPolicy: (policyType, isAutomatic = false) => {
    const { fascistPolicies, liberalPolicies, presidentId, chancellorId, players } = get();
    
    if (policyType === 'liberal') {
      const newLiberalPolicies = liberalPolicies + 1;
      set({ liberalPolicies: newLiberalPolicies });
      
      // Verificar victoria liberal
      if (newLiberalPolicies >= WIN_CONDITIONS.liberals.policies) {
        set({
          gameStatus: 'game_over',
          gamePhase: GAME_PHASES.GAME_OVER,
          gameLog: [
            ...get().gameLog,
            { type: 'victory', message: 'Los Liberales ganan: 5 políticas liberales promulgadas', timestamp: Date.now() },
          ],
        });
        return;
      }
    } else {
      const newFascistPolicies = fascistPolicies + 1;
      set({ 
        fascistPolicies: newFascistPolicies,
        vetoAvailable: newFascistPolicies >= 5,
      });
      
      // Verificar victoria fascista
      if (newFascistPolicies >= WIN_CONDITIONS.fascists.policies) {
        set({
          gameStatus: 'game_over',
          gamePhase: GAME_PHASES.GAME_OVER,
          gameLog: [
            ...get().gameLog,
            { type: 'victory', message: 'Los Fascistas ganan: 6 políticas fascistas promulgadas', timestamp: Date.now() },
          ],
        });
        return;
      }
      
      // Activar poder ejecutivo si corresponde
      const power = EXECUTIVE_POWERS.find(p => p.fascistPolicies === newFascistPolicies);
      if (power && !isAutomatic) {
        set({
          availableExecutivePower: power.power,
          gamePhase: GAME_PHASES.EXECUTIVE_POWER,
        });
        return;
      }
    }
    
    // Pasar al siguiente presidente
    if (!isAutomatic) {
      const currentPresidentIndex = players.findIndex(p => p.id === presidentId);
      const nextPresident = players[(currentPresidentIndex + 1) % players.filter(p => !p.eliminated).length];
      set({
        presidentId: nextPresident.id,
        chancellorId: null,
        gamePhase: GAME_PHASES.GOVERNMENT_SELECTION,
      });
    }
  },
  
  // Acciones - Poderes ejecutivos
  useExecutivePower: (powerType, targetId = null) => {
    const { availableExecutivePower, players, presidentId, chancellorId } = get();
    
    if (powerType !== availableExecutivePower) return false;
    
    switch (powerType) {
      case 'execution':
        if (!targetId) return false;
        const target = players.find(p => p.id === targetId);
        if (target && !target.eliminated) {
          const updatedPlayers = players.map(p => 
            p.id === targetId ? { ...p, eliminated: true } : p
          );
          set({ players: updatedPlayers });
          
          // Verificar si era Hitler
          if (target.isHitler) {
            set({
              gameStatus: 'game_over',
              gamePhase: GAME_PHASES.GAME_OVER,
              gameLog: [
                ...get().gameLog,
                { type: 'victory', message: 'Los Liberales ganan: Hitler ha sido ejecutado', timestamp: Date.now() },
              ],
            });
            return;
          }
        }
        break;
      // Otros poderes ejecutivos se implementarían aquí
      default:
        break;
    }
    
    // Continuar el juego
    const currentPresidentIndex = players.findIndex(p => p.id === presidentId);
    const nextPresident = players[(currentPresidentIndex + 1) % players.filter(p => !p.eliminated).length];
    set({
      availableExecutivePower: null,
      executivePowerTarget: null,
      presidentId: nextPresident.id,
      chancellorId: null,
      gamePhase: GAME_PHASES.GOVERNMENT_SELECTION,
    });
  },
  
  // Acciones - Veto
  requestVeto: () => {
    set({ vetoRequested: true });
  },
  
  acceptVeto: () => {
    const { failedElections } = get();
    set({
      vetoRequested: false,
      failedElections: failedElections + 1,
      policiesForChancellor: [],
      drawnPolicies: [],
      gamePhase: GAME_PHASES.GOVERNMENT_SELECTION,
    });
  },
  
  // Acciones - Revelación de roles
  completeRoleReveal: () => {
    set({
      gameStatus: 'playing',
      gamePhase: GAME_PHASES.GOVERNMENT_SELECTION,
    });
  },
  
  // Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      gamePhase: GAME_PHASES.LOBBY,
      players: get().players.map(p => ({
        ...p,
        role: null,
        team: null,
        eliminated: false,
        isHitler: false,
      })),
      presidentId: null,
      chancellorId: null,
      presidentCandidateId: null,
      chancellorCandidateId: null,
      votes: {},
      voteCount: { ja: 0, nein: 0 },
      policyDeck: [],
      discardPile: [],
      drawnPolicies: [],
      policiesForChancellor: [],
      liberalPolicies: 0,
      fascistPolicies: 0,
      failedElections: 0,
      lastGovernment: null,
      availableExecutivePower: null,
      executivePowerTarget: null,
      vetoAvailable: false,
      vetoRequested: false,
      gameLog: [],
    });
  },
}));
