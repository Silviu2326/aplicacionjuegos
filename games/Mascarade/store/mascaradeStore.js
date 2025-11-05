import { create } from 'zustand';
import { GAME_CONFIG, BEGINNER_CHARACTER_SET, FULL_CHARACTER_SET } from '../constants/MascaradeCharacterData';
import { 
  resolveChallenge, 
  applyCharacterPower, 
  checkWinner, 
  swapCards, 
  shuffleArray 
} from '../logic/mascaradeGameLogic';

export const useMascaradeStore = create((set, get) => ({
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'setup', 'playing', 'finished'
  
  // Jugadores
  players: [], // [{ id, name, coins, character, cardRevealed: false }]
  currentPlayerIndex: 0,
  currentPlayerId: null,
  
  // Ronda actual
  currentRound: 0,
  isFirstFourRounds: true, // Primeras 4 rondas requieren intercambio
  
  // Banco y Juzgado
  bank: 0, // Monedas en el banco
  court: 0, // Monedas acumuladas por penalizaciones
  
  // Cartas disponibles
  availableCharacters: [], // Personajes disponibles en esta partida
  unusedCharacters: [], // Cartas no utilizadas
  
  // Estado del turno actual
  currentAction: null, // 'swap', 'look', 'announce'
  pendingAnnouncement: null, // { playerId, character }
  pendingChallenges: [], // [{ playerId, character }]
  waitingForChallenges: false,
  challengeTimeout: null,
  
  // Intercambio de cartas
  swapInProgress: false,
  swapPlayer1: null,
  swapPlayer2: null,
  swapDecision: null, // null, true, false
  
  // Inquisidor
  inquisitorTarget: null, // { playerId, guessedCharacter }
  waitingForInquisitorGuess: false,
  
  // Configuración
  selectedCharacterSet: BEGINNER_CHARACTER_SET, // Set de personajes seleccionados
  winningCoins: GAME_CONFIG.WINNING_COINS, // Monedas para ganar
  
  // Log del juego
  gameLog: [], // [{ type, message, timestamp }]
  
  // Acciones - Gestión de jugadores
  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      return null;
    }
    const newPlayer = {
      id: Date.now().toString() + Math.random().toString(36).substring(2, 9),
      name: name.trim(),
      coins: 0,
      character: null,
      cardRevealed: false,
    };
    set({ players: [...players, newPlayer] });
    return newPlayer.id;
  },
  
  removePlayer: (playerId) => {
    const { players, currentPlayerIndex } = get();
    const newPlayers = players.filter(p => p.id !== playerId);
    const newIndex = currentPlayerIndex >= newPlayers.length ? 0 : currentPlayerIndex;
    set({ 
      players: newPlayers,
      currentPlayerIndex: newIndex,
      currentPlayerId: newPlayers[newIndex]?.id || null,
    });
  },
  
  setCurrentPlayer: (playerId) => {
    set({ currentPlayerId: playerId });
  },
  
  // Acciones - Configuración
  setCharacterSet: (characterSet) => {
    set({ selectedCharacterSet: characterSet });
  },
  
  setWinningCoins: (coins) => {
    set({ winningCoins: coins });
  },
  
  // Acciones - Inicio del juego
  initializeGame: () => {
    const { players, selectedCharacterSet, winningCoins } = get();
    if (players.length < GAME_CONFIG.MIN_PLAYERS || players.length > GAME_CONFIG.MAX_PLAYERS) {
      return false;
    }
    
    // Preparar personajes
    const allCharacters = [...selectedCharacterSet];
    const shuffled = shuffleArray(allCharacters);
    
    // Repartir personajes a jugadores
    const initializedPlayers = players.map((player, index) => ({
      ...player,
      coins: GAME_CONFIG.STARTING_COINS,
      character: shuffled[index] || null,
      cardRevealed: false,
    }));
    
    // Calcular banco inicial (monedas sobrantes)
    const totalCoins = GAME_CONFIG.STARTING_COINS * players.length;
    const bank = Math.max(0, totalCoins);
    
    // Personajes no utilizados
    const unusedChars = shuffled.slice(players.length);
    
    set({
      gameStatus: 'playing',
      players: initializedPlayers,
      bank,
      court: 0,
      currentRound: 1,
      currentPlayerIndex: 0,
      currentPlayerId: initializedPlayers[0]?.id || null,
      isFirstFourRounds: true,
      availableCharacters: allCharacters,
      unusedCharacters: unusedChars,
      gameLog: [{ 
        type: 'game_start', 
        message: 'La partida ha comenzado. Todos ven sus cartas por un momento.',
        timestamp: Date.now() 
      }],
    });
    
    // Mostrar cartas por un momento
    setTimeout(() => {
      set({ 
        players: initializedPlayers.map(p => ({ ...p, cardRevealed: false })),
        gameLog: [
          ...get().gameLog,
          { 
            type: 'cards_hidden', 
            message: 'Las cartas se han ocultado. ¡Comienza el juego!',
            timestamp: Date.now() 
          }
        ],
      });
    }, 3000); // 3 segundos para ver las cartas
    
    return true;
  },
  
  // Acciones - Turno
  startTurn: () => {
    const { players, currentPlayerIndex, currentRound } = get();
    const currentPlayer = players[currentPlayerIndex];
    const isFirstFour = currentRound <= GAME_CONFIG.FIRST_ROUNDS_SWAP_REQUIRED;
    
    set({
      currentAction: null,
      pendingAnnouncement: null,
      pendingChallenges: [],
      waitingForChallenges: false,
      swapInProgress: false,
    });
    
    if (!currentPlayer) {
      return;
    }
    
    // Si es una de las primeras 4 rondas, forzar intercambio
    if (isFirstFour) {
      set({ 
        isFirstFourRounds: true,
        gameLog: [
          ...get().gameLog,
          { 
            type: 'turn_start', 
            message: `${currentPlayer.name} debe intercambiar cartas (rondas iniciales).`,
            timestamp: Date.now() 
          }
        ],
      });
    } else {
      set({ 
        isFirstFourRounds: false,
        gameLog: [
          ...get().gameLog,
          { 
            type: 'turn_start', 
            message: `Es el turno de ${currentPlayer.name}.`,
            timestamp: Date.now() 
          }
        ],
      });
    }
  },
  
  // Acciones - Intercambiar cartas
  initiateSwap: (targetPlayerId) => {
    const { currentPlayerId, players } = get();
    const player1 = players.find(p => p.id === currentPlayerId);
    const player2 = players.find(p => p.id === targetPlayerId);
    
    if (!player1 || !player2) {
      return false;
    }
    
    set({
      swapInProgress: true,
      swapPlayer1: currentPlayerId,
      swapPlayer2: targetPlayerId,
      swapDecision: null,
      currentAction: 'swap',
    });
    
    return true;
  },
  
  completeSwap: (actuallySwap) => {
    const { swapPlayer1, swapPlayer2, players } = get();
    
    if (!swapPlayer1 || !swapPlayer2) {
      return false;
    }
    
    const newPlayers = swapCards(players, swapPlayer1, swapPlayer2, actuallySwap);
    const player1 = players.find(p => p.id === swapPlayer1);
    const player2 = players.find(p => p.id === swapPlayer2);
    
    set({
      players: newPlayers,
      swapInProgress: false,
      swapPlayer1: null,
      swapPlayer2: null,
      swapDecision: null,
      gameLog: [
        ...get().gameLog,
        { 
          type: 'swap', 
          message: `${player1.name} ${actuallySwap ? 'intercambió' : 'no intercambió'} cartas con ${player2.name}.`,
          timestamp: Date.now() 
        }
      ],
    });
    
    // Avanzar al siguiente turno
    get().nextTurn();
    return true;
  },
  
  // Acciones - Mirar carta
  lookAtCard: () => {
    const { currentPlayerId, players } = get();
    const player = players.find(p => p.id === currentPlayerId);
    
    if (!player) {
      return false;
    }
    
    set({
      currentAction: 'look',
      gameLog: [
        ...get().gameLog,
        { 
          type: 'look', 
          message: `${player.name} miró su carta.`,
          timestamp: Date.now() 
        }
      ],
    });
    
    // Avanzar al siguiente turno
    get().nextTurn();
    return true;
  },
  
  // Acciones - Anunciar rol
  announceRole: (character) => {
    const { currentPlayerId, players } = get();
    const player = players.find(p => p.id === currentPlayerId);
    
    if (!player) {
      return false;
    }
    
    set({
      currentAction: 'announce',
      pendingAnnouncement: { playerId: currentPlayerId, character },
      pendingChallenges: [],
      waitingForChallenges: true,
      gameLog: [
        ...get().gameLog,
        { 
          type: 'announce', 
          message: `${player.name} anunció: "Soy el ${character}".`,
          timestamp: Date.now() 
        }
      ],
    });
    
    // Iniciar temporizador para desafíos (30 segundos)
    const timeout = setTimeout(() => {
      get().resolveAnnouncement();
    }, 30000);
    
    set({ challengeTimeout: timeout });
    
    return true;
  },
  
  // Acciones - Desafiar
  challengeAnnouncement: (challengerId) => {
    const { pendingAnnouncement, players, pendingChallenges, waitingForChallenges } = get();
    
    if (!pendingAnnouncement || !waitingForChallenges) {
      return false;
    }
    
    const challenger = players.find(p => p.id === challengerId);
    const challengerCharacter = challenger?.character;
    
    const newChallenge = {
      playerId: challengerId,
      character: challengerCharacter,
    };
    
    set({
      pendingChallenges: [...pendingChallenges, newChallenge],
      gameLog: [
        ...get().gameLog,
        { 
          type: 'challenge', 
          message: `${challenger.name} desafió: "¡No, YO soy el ${pendingAnnouncement.character}!".`,
          timestamp: Date.now() 
        }
      ],
    });
    
    return true;
  },
  
  // Acciones - Resolver anuncio
  resolveAnnouncement: () => {
    const { pendingAnnouncement, pendingChallenges, players, challengeTimeout } = get();
    
    if (challengeTimeout) {
      clearTimeout(challengeTimeout);
    }
    
    if (!pendingAnnouncement) {
      return;
    }
    
    // Agregar el anunciante a los desafiantes
    const allClaimants = [
      { playerId: pendingAnnouncement.playerId, character: players.find(p => p.id === pendingAnnouncement.playerId)?.character },
      ...pendingChallenges,
    ];
    
    // Resolver el desafío
    const resolution = resolveChallenge(allClaimants, pendingAnnouncement.character);
    
    // Revelar cartas de todos los involucrados
    const newPlayers = players.map(p => {
      const isInvolved = allClaimants.some(c => c.playerId === p.id);
      return {
        ...p,
        cardRevealed: isInvolved,
      };
    });
    
    set({ players: newPlayers });
    
    // Aplicar penalizaciones a impostores
    const updatedPlayers = [...newPlayers];
    resolution.impostors.forEach(impostorId => {
      const impostorIndex = updatedPlayers.findIndex(p => p.id === impostorId);
      if (impostorIndex >= 0 && updatedPlayers[impostorIndex].coins > 0) {
        updatedPlayers[impostorIndex].coins -= 1;
        const { court } = get();
        set({ court: court + 1 });
      }
    });
    
    // Aplicar poder si hay verdadero dueño
    if (resolution.trueOwner) {
      const gameState = get();
      const powerResult = applyCharacterPower(
        pendingAnnouncement.character,
        {
          players: updatedPlayers,
          bank: gameState.bank,
          court: gameState.court,
        },
        resolution.trueOwner
      );
      
      if (powerResult.gameOver) {
        set({
          gameStatus: 'finished',
          gameLog: [
            ...get().gameLog,
            { 
              type: 'game_over', 
              message: `¡${players.find(p => p.id === powerResult.winner)?.name} ha ganado!`,
              timestamp: Date.now() 
            }
          ],
        });
        return;
      }
      
      if (powerResult.players) {
        updatedPlayers.splice(0, updatedPlayers.length, ...powerResult.players);
      }
      
      if (powerResult.bank !== undefined) {
        set({ bank: powerResult.bank });
      }
      
      if (powerResult.court !== undefined) {
        set({ court: powerResult.court });
      }
    }
    
    // Ocultar cartas de nuevo
    setTimeout(() => {
      const finalPlayers = updatedPlayers.map(p => ({ ...p, cardRevealed: false }));
      set({ players: finalPlayers });
    }, 3000);
    
    // Verificar ganador
    const winner = checkWinner(updatedPlayers, get().winningCoins);
    if (winner) {
      set({
        gameStatus: 'finished',
        players: updatedPlayers,
        gameLog: [
          ...get().gameLog,
          { 
            type: 'game_over', 
            message: `¡${updatedPlayers.find(p => p.id === winner)?.name} ha ganado!`,
            timestamp: Date.now() 
          }
        ],
      });
      return;
    }
    
    set({
      players: updatedPlayers,
      pendingAnnouncement: null,
      pendingChallenges: [],
      waitingForChallenges: false,
      challengeTimeout: null,
    });
    
    // Avanzar al siguiente turno
    get().nextTurn();
  },
  
  // Acciones - Siguiente turno
  nextTurn: () => {
    const { players, currentPlayerIndex, currentRound } = get();
    
    if (players.length === 0) {
      return;
    }
    
    const nextIndex = (currentPlayerIndex + 1) % players.length;
    const newRound = nextIndex === 0 ? currentRound + 1 : currentRound;
    
    set({
      currentPlayerIndex: nextIndex,
      currentPlayerId: players[nextIndex]?.id || null,
      currentRound: newRound,
      isFirstFourRounds: newRound <= GAME_CONFIG.FIRST_ROUNDS_SWAP_REQUIRED,
      currentAction: null,
    });
    
    // Iniciar el nuevo turno
    get().startTurn();
  },
  
  // Acciones - Reset
  resetGame: () => {
    set({
      gameStatus: 'lobby',
      players: [],
      currentPlayerIndex: 0,
      currentPlayerId: null,
      currentRound: 0,
      isFirstFourRounds: true,
      bank: 0,
      court: 0,
      availableCharacters: [],
      unusedCharacters: [],
      currentAction: null,
      pendingAnnouncement: null,
      pendingChallenges: [],
      waitingForChallenges: false,
      challengeTimeout: null,
      swapInProgress: false,
      swapPlayer1: null,
      swapPlayer2: null,
      swapDecision: null,
      inquisitorTarget: null,
      waitingForInquisitorGuess: false,
      gameLog: [],
    });
  },
}));

