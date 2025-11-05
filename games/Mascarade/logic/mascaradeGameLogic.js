// Lógica pura del juego Mascarade
import { CHARACTER_INFO } from '../constants/MascaradeCharacterData';

/**
 * Resuelve un desafío entre jugadores
 * @param {Array} challengers - Array de { playerId, character } que desafiaron
 * @param {string} announcedCharacter - Personaje que se anunció
 * @returns {Object} - { trueOwner: playerId o null, impostors: [playerIds], shouldApplyPower: boolean }
 */
export const resolveChallenge = (challengers, announcedCharacter) => {
  const trueOwner = challengers.find(ch => ch.character === announcedCharacter);
  const impostors = challengers.filter(ch => ch.character !== announcedCharacter);
  
  return {
    trueOwner: trueOwner?.playerId || null,
    impostors: impostors.map(imp => imp.playerId),
    shouldApplyPower: trueOwner !== undefined,
  };
};

/**
 * Aplica el poder de un personaje
 * @param {string} character - ID del personaje
 * @param {Object} gameState - Estado actual del juego
 * @param {string} playerId - ID del jugador que usa el poder
 * @param {string} targetPlayerId - ID del jugador objetivo (si aplica)
 * @returns {Object} - Nuevo estado parcial del juego
 */
export const applyCharacterPower = (character, gameState, playerId, targetPlayerId = null) => {
  const { players, bank, court } = gameState;
  const player = players.find(p => p.id === playerId);
  
  if (!player) {
    return { error: 'Jugador no encontrado' };
  }
  
  const updates = {
    players: [...players],
    bank: bank || 0,
    court: court || 0,
  };
  
  const playerIndex = updates.players.findIndex(p => p.id === playerId);
  const targetIndex = targetPlayerId ? updates.players.findIndex(p => p.id === targetPlayerId) : -1;
  
  switch (character) {
    case 'king':
      // Rey: Toma 3 monedas del Banco
      const kingCoins = Math.min(3, updates.bank);
      updates.players[playerIndex].coins += kingCoins;
      updates.bank -= kingCoins;
      break;
      
    case 'queen':
      // Reina: Toma 2 monedas del Banco
      const queenCoins = Math.min(2, updates.bank);
      updates.players[playerIndex].coins += queenCoins;
      updates.bank -= queenCoins;
      break;
      
    case 'judge':
      // Juez: Toma todas las monedas del Juzgado
      updates.players[playerIndex].coins += updates.court;
      updates.court = 0;
      break;
      
    case 'thief':
      // Ladrón: Roba 1 moneda a cada vecino
      const playerPos = playerIndex;
      const leftIndex = playerPos === 0 ? updates.players.length - 1 : playerPos - 1;
      const rightIndex = playerPos === updates.players.length - 1 ? 0 : playerPos + 1;
      
      if (updates.players[leftIndex].coins > 0) {
        updates.players[leftIndex].coins -= 1;
        updates.players[playerIndex].coins += 1;
      }
      if (updates.players[rightIndex].coins > 0) {
        updates.players[rightIndex].coins -= 1;
        updates.players[playerIndex].coins += 1;
      }
      break;
      
    case 'bishop':
      // Obispo: Toma 2 monedas del Banco
      const bishopCoins = Math.min(2, updates.bank);
      updates.players[playerIndex].coins += bishopCoins;
      updates.bank -= bishopCoins;
      break;
      
    case 'witch':
      // Bruja: Intercambia toda la fortuna con otro jugador
      if (targetIndex >= 0) {
        const playerCoins = updates.players[playerIndex].coins;
        const targetCoins = updates.players[targetIndex].coins;
        updates.players[playerIndex].coins = targetCoins;
        updates.players[targetIndex].coins = playerCoins;
      }
      break;
      
    case 'inquisitor':
      // Inquisidor: El objetivo declara su personaje. Si se equivoca, paga 4 monedas
      // Esta lógica se maneja en el store ya que requiere interacción del usuario
      // Por ahora, retornamos que el poder requiere selección del objetivo
      return { requiresTargetSelection: true, power: 'inquisitor' };
      
    case 'cheat':
      // Tramposo: Si tiene 10+ monedas, gana inmediatamente
      if (updates.players[playerIndex].coins >= 10) {
        return { gameOver: true, winner: playerId };
      }
      break;
      
    default:
      return { error: 'Personaje no reconocido' };
  }
  
  return updates;
};

/**
 * Verifica si un jugador ha ganado
 * @param {Array} players - Array de jugadores
 * @param {number} winningCoins - Cantidad de monedas para ganar
 * @returns {string|null} - ID del jugador ganador o null
 */
export const checkWinner = (players, winningCoins) => {
  const winner = players.find(p => p.coins >= winningCoins);
  if (winner) {
    return winner.id;
  }
  
  // Verificar si alguien quedó en bancarrota
  const bankruptPlayers = players.filter(p => p.coins <= 0);
  if (bankruptPlayers.length > 0 && players.length > 1) {
    // El jugador más rico gana
    const richestPlayer = players.reduce((max, p) => 
      p.coins > max.coins ? p : max
    );
    return richestPlayer.id;
  }
  
  return null;
};

/**
 * Intercambia cartas entre dos jugadores
 * @param {Array} players - Array de jugadores
 * @param {string} player1Id - ID del primer jugador
 * @param {string} player2Id - ID del segundo jugador
 * @param {boolean} actuallySwap - Si true, intercambia; si false, no intercambia
 * @returns {Array} - Nuevo array de jugadores con cartas intercambiadas
 */
export const swapCards = (players, player1Id, player2Id, actuallySwap) => {
  const newPlayers = [...players];
  const player1Index = newPlayers.findIndex(p => p.id === player1Id);
  const player2Index = newPlayers.findIndex(p => p.id === player2Id);
  
  if (player1Index === -1 || player2Index === -1) {
    return players;
  }
  
  if (actuallySwap) {
    const tempCard = newPlayers[player1Index].character;
    newPlayers[player1Index].character = newPlayers[player2Index].character;
    newPlayers[player2Index].character = tempCard;
  }
  
  return newPlayers;
};

/**
 * Baraja un array
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

