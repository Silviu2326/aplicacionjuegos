// Base de datos extensa de preguntas de Trivia de Emojis
// Categorías: Películas, Canciones, Refranes, Personajes, Lugares, Series, Marcas, Alimentos

export const CATEGORIES = {
  PELICULAS: 'Películas',
  CANCIONES: 'Canciones',
  REFRANES: 'Refranes',
  PERSONAJES: 'Personajes',
  LUGARES: 'Lugares',
  SERIES: 'Series',
  MARCAS: 'Marcas',
  ALIMENTOS: 'Alimentos',
  GESTOS: 'Gestos',
  OBJETOS: 'Objetos',
};

export const TRIVIA_QUESTIONS = [
  // PELÍCULAS
  { id: 1, emojis: '👑🦁', respuesta: 'El Rey León', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 2, emojis: '🕷️👨➡️🕷️🌌', respuesta: 'Spiderman: Un nuevo universo', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 3, emojis: '🚗💨😡', respuesta: 'Fast & Furious (Rápidos y Furiosos)', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 4, emojis: '👦⚡🏰', respuesta: 'Harry Potter', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 5, emojis: '💍🌋', respuesta: 'El Señor de los Anillos', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 6, emojis: '🧊🚢💔', respuesta: 'Titanic', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 7, emojis: '🤖👽🌍', respuesta: 'Transformers', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 8, emojis: '🦇👨🌙', respuesta: 'Batman', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 9, emojis: '👨🦸🦸🦸🦸', respuesta: 'Los Vengadores', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 10, emojis: '🔴🔵🟢⚫🟡', respuesta: 'Los Power Rangers', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 11, emojis: '👻👻👻👻', respuesta: 'Cazafantasmas', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 12, emojis: '🔪😱🏠', respuesta: 'Psicosis', categoria: CATEGORIES.PELICULAS, dificultad: 'dificil' },
  { id: 13, emojis: '⚓🏴‍☠️💀', respuesta: 'Piratas del Caribe', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 14, emojis: '🦖🦕🌴', respuesta: 'Jurassic Park', categoria: CATEGORIES.PELICULAS, dificultad: 'facil' },
  { id: 15, emojis: '🚀🌌👨‍🚀', respuesta: 'Interstellar', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 16, emojis: '🎭👻🎪', respuesta: 'El Fantasma de la Ópera', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 17, emojis: '🔮👗👠', respuesta: 'El Mago de Oz', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 18, emojis: '🚗💥💨', respuesta: 'Mad Max', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 19, emojis: '👨🎭🦇', respuesta: 'El Caballero Oscuro', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  { id: 20, emojis: '🌍🐒🦍', respuesta: 'Planeta de los Simios', categoria: CATEGORIES.PELICULAS, dificultad: 'medio' },
  
  // CANCIONES
  { id: 21, emojis: '💃🐒', respuesta: 'Dance Monkey', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  { id: 22, emojis: '☀️😎💃', respuesta: 'Despacito', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 23, emojis: '👑👑👑', respuesta: 'Royals', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 24, emojis: '💍💒', respuesta: 'Marry You', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 25, emojis: '🔥🔥🔥', respuesta: 'Fire', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  { id: 26, emojis: '⭐💫🌙', respuesta: 'Starlight', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 27, emojis: '💔💔💔', respuesta: 'Heartbreak Hotel', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 28, emojis: '🎵🎤🎸', respuesta: 'We Are The Champions', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 29, emojis: '🌊🌊🌊', respuesta: 'Waves', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  { id: 30, emojis: '🚀🚀🚀', respuesta: 'Rocket Man', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 31, emojis: '🌙⭐', respuesta: 'Moonlight', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  { id: 32, emojis: '🎄🎁❄️', respuesta: 'All I Want for Christmas Is You', categoria: CATEGORIES.CANCIONES, dificultad: 'medio' },
  { id: 33, emojis: '💪💪💪', respuesta: 'Strong', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  { id: 34, emojis: '🎉🎊🎈', respuesta: 'Celebration', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  { id: 35, emojis: '👑👸', respuesta: 'Queen', categoria: CATEGORIES.CANCIONES, dificultad: 'facil' },
  
  // REFRANES
  { id: 36, emojis: '🦐😴🌊➡️', respuesta: 'Camarón que se duerme, se lo lleva la corriente', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 37, emojis: '➕🐦🖐️💯🦅', respuesta: 'Más vale pájaro en mano que ciento volando', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 38, emojis: '🌅🌅', respuesta: 'No hay dos sin tres', categoria: CATEGORIES.REFRANES, dificultad: 'dificil' },
  { id: 39, emojis: '🐷💨', respuesta: 'A otro perro con ese hueso', categoria: CATEGORIES.REFRANES, dificultad: 'dificil' },
  { id: 40, emojis: '🐱🐭', respuesta: 'El gato escaldado del agua fría huye', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 41, emojis: '🌊🌊🌊', respuesta: 'A río revuelto, ganancia de pescadores', categoria: CATEGORIES.REFRANES, dificultad: 'dificil' },
  { id: 42, emojis: '🐎🐎', respuesta: 'A caballo regalado no le mires el diente', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 43, emojis: '🍎🍎', respuesta: 'Una manzana al día mantiene al doctor alejado', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 44, emojis: '🌧️😊☀️', respuesta: 'Después de la tempestad viene la calma', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 45, emojis: '👀👀', respuesta: 'Ojos que no ven, corazón que no siente', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 46, emojis: '🐕💨', respuesta: 'Perro que ladra no muerde', categoria: CATEGORIES.REFRANES, dificultad: 'facil' },
  { id: 47, emojis: '🐦🌅', respuesta: 'Al que madruga, Dios le ayuda', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 48, emojis: '🧠💪', respuesta: 'Más vale maña que fuerza', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 49, emojis: '👄💬', respuesta: 'En boca cerrada no entran moscas', categoria: CATEGORIES.REFRANES, dificultad: 'medio' },
  { id: 50, emojis: '⏰🕐', respuesta: 'Más vale tarde que nunca', categoria: CATEGORIES.REFRANES, dificultad: 'facil' },
  
  // PERSONAJES
  { id: 51, emojis: '🦸🦸🦸🦸🦸', respuesta: 'Los Superhéroes', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 52, emojis: '👨🦸🕷️', respuesta: 'Spider-Man', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 53, emojis: '🦇👨', respuesta: 'Batman', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 54, emojis: '🦸🛡️', respuesta: 'Capitán América', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 55, emojis: '⚡👨', respuesta: 'Flash', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 56, emojis: '🟢👨👹', respuesta: 'Hulk', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 57, emojis: '🦹👨', respuesta: 'Joker', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 58, emojis: '👸❄️', respuesta: 'Elsa (Frozen)', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 59, emojis: '👨🎭', respuesta: 'Phantom of the Opera', categoria: CATEGORIES.PERSONAJES, dificultad: 'medio' },
  { id: 60, emojis: '🧙👨⚡', respuesta: 'Harry Potter', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 61, emojis: '👨🚀', respuesta: 'Buzz Lightyear', categoria: CATEGORIES.PERSONAJES, dificultad: 'medio' },
  { id: 62, emojis: '🤖👨', respuesta: 'Robocop', categoria: CATEGORIES.PERSONAJES, dificultad: 'medio' },
  { id: 63, emojis: '👨🔪', respuesta: 'Freddy Krueger', categoria: CATEGORIES.PERSONAJES, dificultad: 'medio' },
  { id: 64, emojis: '👨👻', respuesta: 'Casper', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  { id: 65, emojis: '👨🔫', respuesta: 'James Bond', categoria: CATEGORIES.PERSONAJES, dificultad: 'facil' },
  
  // LUGARES
  { id: 66, emojis: '🗼🇫🇷', respuesta: 'Torre Eiffel', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 67, emojis: '🗽🇺🇸', respuesta: 'Estatua de la Libertad', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 68, emojis: '🏛️🇬🇷', respuesta: 'Parthenon', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 69, emojis: '🏰🇬🇧', respuesta: 'Big Ben', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 70, emojis: '🕌🇹🇷', respuesta: 'Mezquita Azul', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 71, emojis: '🏔️🇨🇭', respuesta: 'Alpes Suizos', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 72, emojis: '🌋🇯🇵', respuesta: 'Monte Fuji', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 73, emojis: '🏜️🇪🇬', respuesta: 'Desierto del Sahara', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 74, emojis: '🌴🏝️', respuesta: 'Isla Tropical', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 75, emojis: '🏔️❄️', respuesta: 'Monte Everest', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 76, emojis: '🌉🌁', respuesta: 'Golden Gate Bridge', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 77, emojis: '🏛️🇮🇹', respuesta: 'Coliseo Romano', categoria: CATEGORIES.LUGARES, dificultad: 'medio' },
  { id: 78, emojis: '🏰🏰', respuesta: 'Castillo', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 79, emojis: '🌊🏖️', respuesta: 'Playa', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  { id: 80, emojis: '🌵🏜️', respuesta: 'Desierto', categoria: CATEGORIES.LUGARES, dificultad: 'facil' },
  
  // SERIES
  { id: 81, emojis: '👑🎮', respuesta: 'Game of Thrones', categoria: CATEGORIES.SERIES, dificultad: 'facil' },
  { id: 82, emojis: '🧪💉', respuesta: 'Breaking Bad', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 83, emojis: '👤🎭', respuesta: 'Stranger Things', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 84, emojis: '👨‍⚕️👨‍⚕️👨‍⚕️', respuesta: 'House M.D.', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 85, emojis: '👨‍💼📊', respuesta: 'Suits', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 86, emojis: '👨🚗', respuesta: 'The Walking Dead', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 87, emojis: '👑📺', respuesta: 'The Crown', categoria: CATEGORIES.SERIES, dificultad: 'facil' },
  { id: 88, emojis: '🧙‍♂️🧙‍♂️🧙‍♂️', respuesta: 'The Witcher', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 89, emojis: '👨🔍', respuesta: 'Sherlock Holmes', categoria: CATEGORIES.SERIES, dificultad: 'facil' },
  { id: 90, emojis: '👨👨👨👨', respuesta: 'Friends', categoria: CATEGORIES.SERIES, dificultad: 'facil' },
  { id: 91, emojis: '👨👨👨👨👨', respuesta: 'The Office', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 92, emojis: '👨‍💼👔', respuesta: 'Mad Men', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  { id: 93, emojis: '👨👨👨', respuesta: 'Three\'s Company', categoria: CATEGORIES.SERIES, dificultad: 'dificil' },
  { id: 94, emojis: '👨👨', respuesta: 'The Odd Couple', categoria: CATEGORIES.SERIES, dificultad: 'dificil' },
  { id: 95, emojis: '👨👨👨👨👨👨', respuesta: 'Seinfeld', categoria: CATEGORIES.SERIES, dificultad: 'medio' },
  
  // MARCAS
  { id: 96, emojis: '🍎💻', respuesta: 'Apple', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 97, emojis: '🔵🅱️', respuesta: 'Facebook', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 98, emojis: '🐦', respuesta: 'Twitter', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 99, emojis: '📷📸', respuesta: 'Instagram', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 100, emojis: '🔴▶️', respuesta: 'YouTube', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 101, emojis: '🚗🔵', respuesta: 'Ford', categoria: CATEGORIES.MARCAS, dificultad: 'medio' },
  { id: 102, emojis: '🥤🔴', respuesta: 'Coca-Cola', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 103, emojis: '🍔', respuesta: 'McDonald\'s', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 104, emojis: '☕🟢', respuesta: 'Starbucks', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 105, emojis: '👟', respuesta: 'Nike', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 106, emojis: '🍕', respuesta: 'Pizza Hut', categoria: CATEGORIES.MARCAS, dificultad: 'medio' },
  { id: 107, emojis: '🌐🔍', respuesta: 'Google', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 108, emojis: '📱🟢', respuesta: 'WhatsApp', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 109, emojis: '🎮🎮', respuesta: 'PlayStation', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  { id: 110, emojis: '🎬', respuesta: 'Netflix', categoria: CATEGORIES.MARCAS, dificultad: 'facil' },
  
  // ALIMENTOS
  { id: 111, emojis: '🍕🍕', respuesta: 'Pizza', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 112, emojis: '🍔🍟', respuesta: 'Hamburguesa con patatas', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 113, emojis: '🍣🍱', respuesta: 'Sushi', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 114, emojis: '🌮🌯', respuesta: 'Tacos', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 115, emojis: '🍝🍅', respuesta: 'Espagueti a la boloñesa', categoria: CATEGORIES.ALIMENTOS, dificultad: 'medio' },
  { id: 116, emojis: '🍰🎂', respuesta: 'Pastel de cumpleaños', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 117, emojis: '🥗🥙', respuesta: 'Ensalada', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 118, emojis: '🍜🍲', respuesta: 'Ramen', categoria: CATEGORIES.ALIMENTOS, dificultad: 'medio' },
  { id: 119, emojis: '🍕🍕🍕', respuesta: 'Pizza familiar', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 120, emojis: '🍞🥖', respuesta: 'Pan', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 121, emojis: '🍳🥓', respuesta: 'Huevos con tocino', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 122, emojis: '🍗🍖', respuesta: 'Pollo asado', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 123, emojis: '🍨🍧', respuesta: 'Helado', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 124, emojis: '🍫🍬', respuesta: 'Chocolate', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  { id: 125, emojis: '☕🍵', respuesta: 'Café o té', categoria: CATEGORIES.ALIMENTOS, dificultad: 'facil' },
  
  // GESTOS
  { id: 126, emojis: '🎤⬇️', respuesta: 'Mic drop', categoria: CATEGORIES.GESTOS, dificultad: 'medio' },
  { id: 127, emojis: '👍', respuesta: 'Like', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 128, emojis: '👎', respuesta: 'Dislike', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 129, emojis: '✌️', respuesta: 'Paz y amor', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 130, emojis: '👌', respuesta: 'OK', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 131, emojis: '🤞', respuesta: 'Cruzar los dedos', categoria: CATEGORIES.GESTOS, dificultad: 'medio' },
  { id: 132, emojis: '👏', respuesta: 'Aplaudir', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 133, emojis: '🙏', respuesta: 'Orar o gracias', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 134, emojis: '🤝', respuesta: 'Apretón de manos', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  { id: 135, emojis: '💪', respuesta: 'Fuerza', categoria: CATEGORIES.GESTOS, dificultad: 'facil' },
  
  // OBJETOS
  { id: 136, emojis: '📱💻', respuesta: 'Smartphone o laptop', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 137, emojis: '🚗🚙', respuesta: 'Automóvil', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 138, emojis: '✈️🛫', respuesta: 'Avión', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 139, emojis: '🏠🏡', respuesta: 'Casa', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 140, emojis: '📚📖', respuesta: 'Libro', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 141, emojis: '🎸🎹', respuesta: 'Instrumento musical', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 142, emojis: '🕶️👓', respuesta: 'Gafas de sol', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 143, emojis: '⌚⏰', respuesta: 'Reloj', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 144, emojis: '💍💎', respuesta: 'Anillo de diamante', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 145, emojis: '🎁🎊', respuesta: 'Regalo', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 146, emojis: '🔑🚪', respuesta: 'Llave', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 147, emojis: '💡💡', respuesta: 'Bombilla', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 148, emojis: '🌂☂️', respuesta: 'Paraguas', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 149, emojis: '🎧🎤', respuesta: 'Auriculares', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
  { id: 150, emojis: '📷📸', respuesta: 'Cámara', categoria: CATEGORIES.OBJETOS, dificultad: 'facil' },
];

// Función para obtener una pregunta aleatoria
export const getRandomQuestion = (categoriaFiltrada = null, dificultadFiltrada = null) => {
  let filtered = TRIVIA_QUESTIONS;
  
  if (categoriaFiltrada) {
    filtered = filtered.filter(q => q.categoria === categoriaFiltrada);
  }
  
  if (dificultadFiltrada) {
    filtered = filtered.filter(q => q.dificultad === dificultadFiltrada);
  }
  
  if (filtered.length === 0) {
    filtered = TRIVIA_QUESTIONS;
  }
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

// Función para obtener preguntas por categoría
export const getQuestionsByCategory = (categoria) => {
  return TRIVIA_QUESTIONS.filter(q => q.categoria === categoria);
};

// Función para obtener todas las categorías disponibles
export const getAllCategories = () => {
  return Object.values(CATEGORIES);
};

// Función para obtener preguntas por dificultad
export const getQuestionsByDifficulty = (dificultad) => {
  return TRIVIA_QUESTIONS.filter(q => q.dificultad === dificultad);
};

