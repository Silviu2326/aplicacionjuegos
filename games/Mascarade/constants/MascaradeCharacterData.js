// Datos de los personajes de Mascarade
export const MASCARADE_CHARACTERS = {
  KING: 'king', // Rey
  QUEEN: 'queen', // Reina
  JUDGE: 'judge', // Juez
  THIEF: 'thief', // Ladrón
  BISHOP: 'bishop', // Obispo
  WITCH: 'witch', // Bruja
  INQUISITOR: 'inquisitor', // Inquisidor
  CHEAT: 'cheat', // Tramposo
};

export const CHARACTER_INFO = {
  [MASCARADE_CHARACTERS.KING]: {
    name: 'Rey',
    power: 'Toma 3 monedas del Banco',
    description: 'Al anunciar que eres el Rey, y si la acción se resuelve a tu favor, tomas 3 monedas del Banco. El poder más lucrativo para acumular monedas rápidamente.',
    color: '#FFD700',
    strategy: 'Es un personaje muy buscado. Considera anunciarlo cuando el Banco tenga suficientes monedas o cuando creas que nadie te desafiará.',
    difficulty: 'Fácil',
    powerLevel: 5,
  },
  [MASCARADE_CHARACTERS.QUEEN]: {
    name: 'Reina',
    power: 'Toma 2 monedas del Banco',
    description: 'Al anunciar que eres la Reina, y si la acción se resuelve a tu favor, tomas 2 monedas del Banco. Una opción más segura que el Rey pero menos poderosa.',
    color: '#FF1493',
    strategy: 'Similar al Rey pero más discreta. Úsala cuando quieras acumular monedas sin llamar demasiado la atención.',
    difficulty: 'Fácil',
    powerLevel: 4,
  },
  [MASCARADE_CHARACTERS.JUDGE]: {
    name: 'Juez',
    power: 'Toma todas las monedas del Juzgado',
    description: 'Al anunciar que eres el Juez, tomas todas las monedas que se han acumulado en el Juzgado debido a las penalizaciones. Puede ser muy poderoso si hay muchas multas acumuladas.',
    color: '#8B4513',
    strategy: 'Espera a que se acumulen varias multas en el Juzgado antes de anunciarte como Juez. Puede ser devastador si hay 5+ monedas acumuladas.',
    difficulty: 'Intermedia',
    powerLevel: 3,
  },
  [MASCARADE_CHARACTERS.THIEF]: {
    name: 'Ladrón',
    power: 'Roba 1 moneda a cada vecino',
    description: 'Al anunciar que eres el Ladrón, robas 1 moneda al jugador de tu izquierda y 1 moneda al jugador de tu derecha. Puedes robar hasta 2 monedas en total.',
    color: '#2F4F4F',
    strategy: 'Útil cuando tus vecinos tienen muchas monedas. Puede ser arriesgado si tus vecinos tienen pocas monedas o están atentos.',
    difficulty: 'Fácil',
    powerLevel: 3,
  },
  [MASCARADE_CHARACTERS.BISHOP]: {
    name: 'Obispo',
    power: 'Toma 2 monedas del Banco',
    description: 'Al anunciar que eres el Obispo, y si la acción se resuelve a tu favor, tomas 2 monedas del Banco. Similar a la Reina pero con un personaje diferente.',
    color: '#4B0082',
    strategy: 'Una alternativa sólida al Rey/Reina. Útil cuando quieres evitar que otros sospechen que eres el Rey.',
    difficulty: 'Fácil',
    powerLevel: 4,
  },
  [MASCARADE_CHARACTERS.WITCH]: {
    name: 'Bruja',
    power: 'Intercambia toda tu fortuna con otro jugador',
    description: 'Al anunciar que eres la Bruja, eliges a otro jugador. Si ganas el desafío (o no te desafían), intercambias toda tu fortuna (todas tus monedas) con las del jugador elegido. Puede cambiar completamente el juego.',
    color: '#000000',
    strategy: 'Usa este poder cuando estés en bancarrota o cuando otro jugador tenga muchas más monedas que tú. Es un poder de alto riesgo y alta recompensa.',
    difficulty: 'Avanzada',
    powerLevel: 5,
  },
  [MASCARADE_CHARACTERS.INQUISITOR]: {
    name: 'Inquisidor',
    power: 'Interroga a otro jugador',
    description: 'Al anunciar que eres el Inquisidor, señalas a otro jugador. Ese jugador debe declarar qué personaje cree que tiene. Si se equivoca, te paga 4 monedas. Si acierta, no pasa nada. Un poder de información y ganancia.',
    color: '#DC143C',
    strategy: 'Úsalo contra jugadores que parecen confundidos o que no han mirado su carta recientemente. Puede ser muy rentable si funcionas bien.',
    difficulty: 'Intermedia',
    powerLevel: 4,
  },
  [MASCARADE_CHARACTERS.CHEAT]: {
    name: 'Tramposo',
    power: 'Victoria inmediata con 10+ monedas',
    description: 'Si anuncias exitosamente cualquier rol mientras tienes 10 o más monedas, en lugar de usar el poder de ese rol, ganas la partida inmediatamente. El poder más poderoso del juego.',
    color: '#FF4500',
    strategy: 'Acumula 10 monedas lo más rápido posible y luego anuncia cualquier personaje. Si nadie te desafía, ganas inmediatamente. ¡Es tu carta de victoria!',
    difficulty: 'Avanzada',
    powerLevel: 5,
  },
};

// Set de personajes básicos para principiantes
export const BEGINNER_CHARACTER_SET = [
  MASCARADE_CHARACTERS.KING,
  MASCARADE_CHARACTERS.QUEEN,
  MASCARADE_CHARACTERS.JUDGE,
  MASCARADE_CHARACTERS.THIEF,
  MASCARADE_CHARACTERS.BISHOP,
  MASCARADE_CHARACTERS.WITCH,
];

// Set completo de personajes
export const FULL_CHARACTER_SET = Object.values(MASCARADE_CHARACTERS);

// Configuración del juego
export const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 8,
  STARTING_COINS: 6,
  WINNING_COINS: 13, // Monedas necesarias para ganar
  QUICK_WIN_COINS: 10, // Para partidas rápidas
  FIRST_ROUNDS_SWAP_REQUIRED: 4, // Primeras rondas donde se debe intercambiar
};

