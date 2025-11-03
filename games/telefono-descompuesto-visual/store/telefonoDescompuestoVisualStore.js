import { create } from 'zustand';
import { getRandomWords } from '../constants/TelefonoDescompuestoVisualWords';

export const useTelefonoDescompuestoVisualStore = create((set, get) => ({
  // Estado de la sala
  players: [],
  hostId: null,
  gameCode: null,
  isHost: false,
  
  // Estado del juego
  gameStatus: 'lobby', // 'lobby', 'playing', 'results'
  currentRound: 0,
  maxRounds: 0,
  
  // Cuadernos (notebooks)
  notebooks: [], // { id, ownerId, ownerName, entries: [{ type: 'draw'|'text', content, playerId, playerName }] }
  
  // Estado del jugador actual
  currentPlayerIndex: 0, // Índice del jugador actual en el array
  currentNotebookIndex: 0, // Índice del cuaderno actual
  currentTurn: null, // { notebookId, type: 'draw'|'write', previousContent, playerId, playerName }
  
  // Configuración
  timeLimit: 60, // segundos
  wordPack: 'default',
  
  // Acciones
  addPlayer: (player) => set((state) => ({
    players: [...state.players, player]
  })),
  
  removePlayer: (playerId) => set((state) => ({
    players: state.players.filter(p => p.id !== playerId)
  })),
  
  setGameStatus: (status) => set({ gameStatus: status }),
  
  initializeNotebooks: () => {
    const state = get();
    const playerCount = state.players.length;
    const words = getRandomWords(playerCount);
    
    const notebooks = state.players.map((player, index) => ({
      id: `notebook-${player.id}`,
      ownerId: player.id,
      ownerName: player.name,
      entries: [
        {
          type: 'text',
          content: words[index],
          playerId: player.id,
          playerName: player.name,
          round: 0,
        }
      ]
    }));
    
    set({ 
      notebooks,
      maxRounds: playerCount * 2 - 1, // dibujos + textos alternados
      currentRound: 1,
      currentPlayerIndex: 0,
      currentNotebookIndex: 0
    });
  },
  
  startFirstTurn: () => {
    const state = get();
    if (state.notebooks.length === 0 || state.players.length === 0) return;
    
    // Primera ronda: cada jugador dibuja su palabra inicial
    const firstNotebook = state.notebooks[0];
    const firstPlayer = state.players[0];
    const firstEntry = firstNotebook.entries[0];
    
    set({
      currentTurn: {
        notebookId: firstNotebook.id,
        type: 'draw',
        previousContent: firstEntry.content,
        playerId: firstPlayer.id,
        playerName: firstPlayer.name,
      },
      currentPlayerIndex: 0,
      currentNotebookIndex: 0,
    });
  },
  
  addEntry: (notebookId, entry) => {
    set((state) => ({
      notebooks: state.notebooks.map(notebook => 
        notebook.id === notebookId 
          ? { ...notebook, entries: [...notebook.entries, entry] }
          : notebook
      )
    }));
  },
  
  nextTurn: () => {
    const state = get();
    const { notebooks, players, currentRound, currentNotebookIndex, currentPlayerIndex } = state;
    
    if (notebooks.length === 0 || players.length === 0) return;
    
    // Obtener el cuaderno actual y su última entrada
    const currentNotebook = notebooks[currentNotebookIndex];
    const lastEntry = currentNotebook.entries[currentNotebook.entries.length - 1];
    
    // Determinar el tipo de siguiente acción (alternar entre dibujar y escribir)
    const nextType = lastEntry.type === 'text' ? 'draw' : 'write';
    
    // Calcular el siguiente jugador (rotar en el array)
    const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
    const nextPlayer = players[nextPlayerIndex];
    
    // Verificar si este cuaderno ha completado una vuelta completa
    // Una vuelta completa = número de jugadores * 2 (dibujo + texto por jugador, excepto el primero que solo dibuja)
    const entriesInThisNotebook = currentNotebook.entries.length;
    const expectedEntriesForFullRound = players.length * 2 - 1; // -1 porque el primero solo dibuja
    
    let nextNotebookIndex = currentNotebookIndex;
    let nextRound = currentRound;
    
    // Si este cuaderno ha completado una vuelta, pasar al siguiente
    if (entriesInThisNotebook >= expectedEntriesForFullRound) {
      nextNotebookIndex = currentNotebookIndex + 1;
      
      // Si todos los cuadernos han completado una vuelta, terminar el juego
      if (nextNotebookIndex >= notebooks.length) {
        set({ gameStatus: 'results' });
        return;
      }
      
      // Si cambiamos de cuaderno, el siguiente jugador es el primero (índice 0)
      // pero necesitamos el jugador que corresponde a este cuaderno
      const nextNotebook = notebooks[nextNotebookIndex];
      // El primer jugador para este nuevo cuaderno es el que le sigue al dueño del cuaderno
      const notebookOwner = players.find(p => p.id === nextNotebook.ownerId);
      const ownerIndex = players.findIndex(p => p.id === notebookOwner.id);
      const firstPlayerIndex = (ownerIndex + 1) % players.length;
      
      const firstPlayer = players[firstPlayerIndex];
      const firstEntry = nextNotebook.entries[nextNotebook.entries.length - 1];
      
      set({
        currentTurn: {
          notebookId: nextNotebook.id,
          type: 'draw', // Siempre empezamos con dibujo cuando cambiamos de cuaderno
          previousContent: firstEntry.content,
          playerId: firstPlayer.id,
          playerName: firstPlayer.name,
        },
        currentPlayerIndex: firstPlayerIndex,
        currentNotebookIndex: nextNotebookIndex,
        currentRound: nextRound + 1,
      });
    } else {
      // Mismo cuaderno, siguiente jugador
      const nextNotebook = notebooks[nextNotebookIndex];
      const nextEntry = nextNotebook.entries[nextNotebook.entries.length - 1];
      
      set({
        currentTurn: {
          notebookId: nextNotebook.id,
          type: nextType,
          previousContent: nextEntry.content,
          playerId: nextPlayer.id,
          playerName: nextPlayer.name,
        },
        currentPlayerIndex: nextPlayerIndex,
        currentNotebookIndex: nextNotebookIndex,
        currentRound: nextRound + 1,
      });
    }
  },
  
  setTimeLimit: (seconds) => set({ timeLimit: seconds }),
  
  reset: () => set({
    players: [],
    hostId: null,
    gameCode: null,
    isHost: false,
    gameStatus: 'lobby',
    currentRound: 0,
    maxRounds: 0,
    notebooks: [],
    currentPlayerIndex: 0,
    currentNotebookIndex: 0,
    currentTurn: null,
    timeLimit: 60,
  }),
}));

