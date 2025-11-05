// Categorías de Trivial Pursuit
export const CATEGORIES = {
  GEOGRAFIA: {
    id: 'geografia',
    name: 'Geografía',
    color: '#3498DB',
    icon: '🌍',
  },
  ARTE_LITERATURA: {
    id: 'arte_literatura',
    name: 'Arte y Literatura',
    color: '#8B4513',
    icon: '📚',
  },
  HISTORIA: {
    id: 'historia',
    name: 'Historia',
    color: '#F1C40F',
    icon: '📜',
  },
  ENTRETENIMIENTO: {
    id: 'entretenimiento',
    name: 'Entretenimiento',
    color: '#E91E63',
    icon: '🎬',
  },
  CIENCIAS_NATURALEZA: {
    id: 'ciencias_naturaleza',
    name: 'Ciencias y Naturaleza',
    color: '#27AE60',
    icon: '🔬',
  },
  DEPORTES_PASATIEMPOS: {
    id: 'deportes_pasatiempos',
    name: 'Deportes y Pasatiempos',
    color: '#FF6B35',
    icon: '⚽',
  },
};

export const getAllCategories = () => Object.values(CATEGORIES);

// Preguntas falsas por categoría
const PREGUNTAS_GEOGRAFIA = [
  { id: 'geo1', pregunta: '¿Cuál es la capital de Australia?', opciones: ['Sydney', 'Melbourne', 'Canberra', 'Brisbane'], respuesta: 2 },
  { id: 'geo2', pregunta: '¿Cuál es el río más largo del mundo?', opciones: ['Amazonas', 'Nilo', 'Yangtsé', 'Misisipi'], respuesta: 0 },
  { id: 'geo3', pregunta: '¿En qué continente se encuentra el desierto del Sahara?', opciones: ['Asia', 'África', 'Australia', 'América'], respuesta: 1 },
  { id: 'geo4', pregunta: '¿Cuál es el país más grande del mundo?', opciones: ['China', 'Estados Unidos', 'Rusia', 'Canadá'], respuesta: 2 },
  { id: 'geo5', pregunta: '¿Cuál es la montaña más alta del mundo?', opciones: ['K2', 'Monte Everest', 'Kilimanjaro', 'Aconcagua'], respuesta: 1 },
  { id: 'geo6', pregunta: '¿Cuál es el océano más grande?', opciones: ['Atlántico', 'Pacífico', 'Índico', 'Ártico'], respuesta: 1 },
  { id: 'geo7', pregunta: '¿Cuál es la capital de Islandia?', opciones: ['Reykjavik', 'Oslo', 'Helsinki', 'Copenhague'], respuesta: 0 },
  { id: 'geo8', pregunta: '¿En qué país se encuentra la Torre Eiffel?', opciones: ['Italia', 'España', 'Francia', 'Alemania'], respuesta: 2 },
  { id: 'geo9', pregunta: '¿Cuál es el lago más profundo del mundo?', opciones: ['Lago Superior', 'Lago Baikal', 'Lago Victoria', 'Lago Tanganica'], respuesta: 1 },
  { id: 'geo10', pregunta: '¿Cuál es la capital de Nueva Zelanda?', opciones: ['Auckland', 'Wellington', 'Christchurch', 'Dunedin'], respuesta: 1 },
  { id: 'geo11', pregunta: '¿En qué país se encuentra Machu Picchu?', opciones: ['Bolivia', 'Perú', 'Ecuador', 'Colombia'], respuesta: 1 },
  { id: 'geo12', pregunta: '¿Cuál es el desierto más grande del mundo?', opciones: ['Sahara', 'Gobi', 'Antártida', 'Kalahari'], respuesta: 2 },
  { id: 'geo13', pregunta: '¿Cuál es la capital de Egipto?', opciones: ['Luxor', 'El Cairo', 'Alejandría', 'Giza'], respuesta: 1 },
  { id: 'geo14', pregunta: '¿Cuál es el país más pequeño del mundo?', opciones: ['Mónaco', 'Vaticano', 'San Marino', 'Liechtenstein'], respuesta: 1 },
  { id: 'geo15', pregunta: '¿En qué continente está el río Amazonas?', opciones: ['África', 'Asia', 'América del Sur', 'América del Norte'], respuesta: 2 },
];

const PREGUNTAS_ARTE_LITERATURA = [
  { id: 'art1', pregunta: '¿Quién escribió "Cien años de soledad"?', opciones: ['Gabriel García Márquez', 'Mario Vargas Llosa', 'Julio Cortázar', 'Pablo Neruda'], respuesta: 0 },
  { id: 'art2', pregunta: '¿Quién pintó "La noche estrellada"?', opciones: ['Pablo Picasso', 'Vincent van Gogh', 'Claude Monet', 'Salvador Dalí'], respuesta: 1 },
  { id: 'art3', pregunta: '¿En qué año se publicó "Don Quijote de la Mancha"?', opciones: ['1600', '1605', '1610', '1615'], respuesta: 1 },
  { id: 'art4', pregunta: '¿Quién escribió "1984"?', opciones: ['Aldous Huxley', 'George Orwell', 'Ray Bradbury', 'J.D. Salinger'], respuesta: 1 },
  { id: 'art5', pregunta: '¿Quién pintó "La última cena"?', opciones: ['Miguel Ángel', 'Leonardo da Vinci', 'Rafael', 'Tiziano'], respuesta: 1 },
  { id: 'art6', pregunta: '¿Quién escribió "Romeo y Julieta"?', opciones: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], respuesta: 1 },
  { id: 'art7', pregunta: '¿En qué museo se encuentra "La Gioconda"?', opciones: ['Museo del Louvre', 'Museo del Prado', 'Museo Metropolitano', 'Museo Británico'], respuesta: 0 },
  { id: 'art8', pregunta: '¿Quién escribió "El Principito"?', opciones: ['Antoine de Saint-Exupéry', 'Jules Verne', 'Victor Hugo', 'Albert Camus'], respuesta: 0 },
  { id: 'art9', pregunta: '¿Qué movimiento artístico inició Pablo Picasso?', opciones: ['Impresionismo', 'Cubismo', 'Surrealismo', 'Expresionismo'], respuesta: 1 },
  { id: 'art10', pregunta: '¿Quién escribió "El retrato de Dorian Gray"?', opciones: ['Oscar Wilde', 'Charles Dickens', 'Jane Austen', 'Virginia Woolf'], respuesta: 0 },
  { id: 'art11', pregunta: '¿Quién pintó "Los girasoles"?', opciones: ['Claude Monet', 'Vincent van Gogh', 'Paul Cézanne', 'Edgar Degas'], respuesta: 1 },
  { id: 'art12', pregunta: '¿Quién escribió "Crimen y castigo"?', opciones: ['Fiódor Dostoyevski', 'León Tolstói', 'Antón Chéjov', 'Iván Turguénev'], respuesta: 0 },
  { id: 'art13', pregunta: '¿Qué escritor escribió "El código Da Vinci"?', opciones: ['Dan Brown', 'Stephen King', 'J.K. Rowling', 'Michael Crichton'], respuesta: 0 },
  { id: 'art14', pregunta: '¿Quién pintó "El grito"?', opciones: ['Edvard Munch', 'Wassily Kandinsky', 'Paul Gauguin', 'Henri Matisse'], respuesta: 0 },
  { id: 'art15', pregunta: '¿Quién escribió "La Odisea"?', opciones: ['Homero', 'Virgilio', 'Sófocles', 'Esquilo'], respuesta: 0 },
];

const PREGUNTAS_HISTORIA = [
  { id: 'hist1', pregunta: '¿En qué año cayó el Muro de Berlín?', opciones: ['1987', '1989', '1991', '1993'], respuesta: 1 },
  { id: 'hist2', pregunta: '¿En qué año comenzó la Segunda Guerra Mundial?', opciones: ['1937', '1939', '1941', '1943'], respuesta: 1 },
  { id: 'hist3', pregunta: '¿Quién fue el primer presidente de Estados Unidos?', opciones: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], respuesta: 1 },
  { id: 'hist4', pregunta: '¿En qué año llegó el hombre a la Luna?', opciones: ['1967', '1969', '1971', '1973'], respuesta: 1 },
  { id: 'hist5', pregunta: '¿Quién fue el último zar de Rusia?', opciones: ['Pedro I', 'Nicolás II', 'Alejandro III', 'Alejandro II'], respuesta: 1 },
  { id: 'hist6', pregunta: '¿En qué año se descubrió América?', opciones: ['1490', '1492', '1494', '1496'], respuesta: 1 },
  { id: 'hist7', pregunta: '¿Quién fue el líder de la Revolución Rusa?', opciones: ['Stalin', 'Lenin', 'Trotsky', 'Kerensky'], respuesta: 1 },
  { id: 'hist8', pregunta: '¿En qué año terminó la Primera Guerra Mundial?', opciones: ['1916', '1917', '1918', '1919'], respuesta: 2 },
  { id: 'hist9', pregunta: '¿Quién fue el faraón más famoso del Antiguo Egipto?', opciones: ['Cleopatra', 'Ramsés II', 'Tutankamón', 'Nefertiti'], respuesta: 1 },
  { id: 'hist10', pregunta: '¿En qué año se firmó la Declaración de Independencia de Estados Unidos?', opciones: ['1774', '1776', '1778', '1780'], respuesta: 1 },
  { id: 'hist11', pregunta: '¿Quién fue el primer emperador de Roma?', opciones: ['Julio César', 'Augusto', 'Nerón', 'Calígula'], respuesta: 1 },
  { id: 'hist12', pregunta: '¿En qué año comenzó la Revolución Francesa?', opciones: ['1787', '1789', '1791', '1793'], respuesta: 1 },
  { id: 'hist13', pregunta: '¿Quién fue el líder de la Alemania Nazi?', opciones: ['Mussolini', 'Hitler', 'Goebbels', 'Himmler'], respuesta: 1 },
  { id: 'hist14', pregunta: '¿En qué año se hundió el Titanic?', opciones: ['1910', '1912', '1914', '1916'], respuesta: 1 },
  { id: 'hist15', pregunta: '¿Quién fue el primer rey de España unificada?', opciones: ['Carlos I', 'Felipe II', 'Isabel I', 'Fernando V'], respuesta: 3 },
];

const PREGUNTAS_ENTRETENIMIENTO = [
  { id: 'ent1', pregunta: '¿Qué actor interpretó a Jack Sparrow en "Piratas del Caribe"?', opciones: ['Orlando Bloom', 'Johnny Depp', 'Geoffrey Rush', 'Keira Knightley'], respuesta: 1 },
  { id: 'ent2', pregunta: '¿En qué año se estrenó "Star Wars: Una nueva esperanza"?', opciones: ['1975', '1977', '1979', '1981'], respuesta: 1 },
  { id: 'ent3', pregunta: '¿Quién dirigió "El Padrino"?', opciones: ['Martin Scorsese', 'Francis Ford Coppola', 'Steven Spielberg', 'Quentin Tarantino'], respuesta: 1 },
  { id: 'ent4', pregunta: '¿Qué película ganó el Oscar a Mejor Película en 1994?', opciones: ['Forrest Gump', 'Pulp Fiction', 'El Rey León', 'Shawshank Redemption'], respuesta: 0 },
  { id: 'ent5', pregunta: '¿Quién interpretó a Tony Stark (Iron Man)?', opciones: ['Chris Evans', 'Chris Hemsworth', 'Robert Downey Jr.', 'Mark Ruffalo'], respuesta: 2 },
  { id: 'ent6', pregunta: '¿Cuántas películas tiene la saga "El Señor de los Anillos"?', opciones: ['2', '3', '4', '6'], respuesta: 1 },
  { id: 'ent7', pregunta: '¿Quién cantó "Bohemian Rhapsody"?', opciones: ['The Beatles', 'Queen', 'Led Zeppelin', 'Pink Floyd'], respuesta: 1 },
  { id: 'ent8', pregunta: '¿En qué año se estrenó "Titanic"?', opciones: ['1995', '1997', '1999', '2001'], respuesta: 1 },
  { id: 'ent9', pregunta: '¿Quién interpretó a Harry Potter?', opciones: ['Daniel Radcliffe', 'Rupert Grint', 'Tom Felton', 'Matthew Lewis'], respuesta: 0 },
  { id: 'ent10', pregunta: '¿Qué serie de TV tiene más episodios?', opciones: ['Los Simpson', 'Friends', 'Game of Thrones', 'Breaking Bad'], respuesta: 0 },
  { id: 'ent11', pregunta: '¿Quién dirigió "Inception"?', opciones: ['Christopher Nolan', 'Quentin Tarantino', 'David Fincher', 'Ridley Scott'], respuesta: 0 },
  { id: 'ent12', pregunta: '¿Qué banda británica lanzó "Sgt. Pepper\'s Lonely Hearts Club Band"?', opciones: ['The Rolling Stones', 'The Beatles', 'The Who', 'Led Zeppelin'], respuesta: 1 },
  { id: 'ent13', pregunta: '¿Quién interpretó a Joker en "El Caballero Oscuro"?', opciones: ['Jack Nicholson', 'Heath Ledger', 'Joaquin Phoenix', 'Jared Leto'], respuesta: 1 },
  { id: 'ent14', pregunta: '¿En qué año se estrenó "Jurassic Park"?', opciones: ['1991', '1993', '1995', '1997'], respuesta: 1 },
  { id: 'ent15', pregunta: '¿Quién cantó "Like a Rolling Stone"?', opciones: ['Bob Dylan', 'The Beatles', 'The Rolling Stones', 'Bruce Springsteen'], respuesta: 0 },
];

const PREGUNTAS_CIENCIAS_NATURALEZA = [
  { id: 'cien1', pregunta: '¿Cuál es el símbolo químico del oro?', opciones: ['Go', 'Au', 'Ag', 'Or'], respuesta: 1 },
  { id: 'cien2', pregunta: '¿Cuántos huesos tiene el cuerpo humano adulto?', opciones: ['196', '206', '216', '226'], respuesta: 1 },
  { id: 'cien3', pregunta: '¿Cuál es el planeta más grande del sistema solar?', opciones: ['Saturno', 'Júpiter', 'Neptuno', 'Urano'], respuesta: 1 },
  { id: 'cien4', pregunta: '¿Cuál es la velocidad de la luz en el vacío?', opciones: ['300.000 km/s', '150.000 km/s', '450.000 km/s', '600.000 km/s'], respuesta: 0 },
  { id: 'cien5', pregunta: '¿Cuál es el elemento químico más abundante en el universo?', opciones: ['Helio', 'Hidrógeno', 'Oxígeno', 'Carbono'], respuesta: 1 },
  { id: 'cien6', pregunta: '¿Cuántos cromosomas tiene el ser humano?', opciones: ['44', '46', '48', '50'], respuesta: 1 },
  { id: 'cien7', pregunta: '¿Qué gas respiran las plantas durante la fotosíntesis?', opciones: ['Oxígeno', 'Dióxido de carbono', 'Nitrógeno', 'Hidrógeno'], respuesta: 1 },
  { id: 'cien8', pregunta: '¿Cuál es el órgano más grande del cuerpo humano?', opciones: ['Hígado', 'Pulmones', 'Piel', 'Intestino'], respuesta: 2 },
  { id: 'cien9', pregunta: '¿Cuál es el punto de ebullición del agua a nivel del mar?', opciones: ['90°C', '100°C', '110°C', '120°C'], respuesta: 1 },
  { id: 'cien10', pregunta: '¿Qué tipo de animal es una orca?', opciones: ['Pez', 'Tiburón', 'Mamífero', 'Reptil'], respuesta: 2 },
  { id: 'cien11', pregunta: '¿Cuál es la fórmula química del agua?', opciones: ['H2O', 'CO2', 'O2', 'NaCl'], respuesta: 0 },
  { id: 'cien12', pregunta: '¿Cuántos corazones tiene un pulpo?', opciones: ['1', '2', '3', '4'], respuesta: 2 },
  { id: 'cien13', pregunta: '¿Cuál es el metal más conductor de electricidad?', opciones: ['Oro', 'Plata', 'Cobre', 'Aluminio'], respuesta: 1 },
  { id: 'cien14', pregunta: '¿Qué planeta es conocido como "el planeta rojo"?', opciones: ['Venus', 'Marte', 'Júpiter', 'Saturno'], respuesta: 1 },
  { id: 'cien15', pregunta: '¿Cuál es la velocidad del sonido en el aire?', opciones: ['300 m/s', '330 m/s', '360 m/s', '390 m/s'], respuesta: 1 },
];

const PREGUNTAS_DEPORTES_PASATIEMPOS = [
  { id: 'dep1', pregunta: '¿Cuántos jugadores componen un equipo de baloncesto en la cancha?', opciones: ['4', '5', '6', '7'], respuesta: 1 },
  { id: 'dep2', pregunta: '¿En qué deporte se usa una raqueta?', opciones: ['Fútbol', 'Tenis', 'Baloncesto', 'Natación'], respuesta: 1 },
  { id: 'dep3', pregunta: '¿Cuántos sets se juegan en un partido de tenis masculino en un Grand Slam?', opciones: ['3', '4', '5', '6'], respuesta: 2 },
  { id: 'dep4', pregunta: '¿Qué país ha ganado más Copas del Mundo de fútbol?', opciones: ['Alemania', 'Brasil', 'Argentina', 'Italia'], respuesta: 1 },
  { id: 'dep5', pregunta: '¿En qué año se celebraron los primeros Juegos Olímpicos modernos?', opciones: ['1894', '1896', '1900', '1904'], respuesta: 1 },
  { id: 'dep6', pregunta: '¿Cuántos jugadores hay en un equipo de fútbol en el campo?', opciones: ['10', '11', '12', '13'], respuesta: 1 },
  { id: 'dep7', pregunta: '¿Qué deporte se juega en un "ring"?', opciones: ['Boxeo', 'Fútbol', 'Baloncesto', 'Tenis'], respuesta: 0 },
  { id: 'dep8', pregunta: '¿Cuántos hoyos tiene un campo de golf estándar?', opciones: ['16', '17', '18', '19'], respuesta: 2 },
  { id: 'dep9', pregunta: '¿En qué deporte se usa un "puck"?', opciones: ['Hockey sobre hielo', 'Fútbol', 'Baloncesto', 'Rugby'], respuesta: 0 },
  { id: 'dep10', pregunta: '¿Cuál es la distancia estándar de una maratón?', opciones: ['40 km', '42.195 km', '45 km', '50 km'], respuesta: 1 },
  { id: 'dep11', pregunta: '¿Qué país inventó el fútbol?', opciones: ['Brasil', 'Inglaterra', 'Argentina', 'España'], respuesta: 1 },
  { id: 'dep12', pregunta: '¿Cuántos jugadores hay en un equipo de voleibol en la cancha?', opciones: ['5', '6', '7', '8'], respuesta: 1 },
  { id: 'dep13', pregunta: '¿En qué deporte se usa un "birdie"?', opciones: ['Tenis', 'Bádminton', 'Ping Pong', 'Voleibol'], respuesta: 1 },
  { id: 'dep14', pregunta: '¿Cuántos puntos se necesitan para ganar un set en voleibol?', opciones: ['20', '21', '24', '25'], respuesta: 3 },
  { id: 'dep15', pregunta: '¿Qué deporte se juega en Wimbledon?', opciones: ['Fútbol', 'Tenis', 'Golf', 'Cricket'], respuesta: 1 },
];

// Combinar todas las preguntas
export const ALL_QUESTIONS = [
  ...PREGUNTAS_GEOGRAFIA.map(q => ({ ...q, categoria: CATEGORIES.GEOGRAFIA.id })),
  ...PREGUNTAS_ARTE_LITERATURA.map(q => ({ ...q, categoria: CATEGORIES.ARTE_LITERATURA.id })),
  ...PREGUNTAS_HISTORIA.map(q => ({ ...q, categoria: CATEGORIES.HISTORIA.id })),
  ...PREGUNTAS_ENTRETENIMIENTO.map(q => ({ ...q, categoria: CATEGORIES.ENTRETENIMIENTO.id })),
  ...PREGUNTAS_CIENCIAS_NATURALEZA.map(q => ({ ...q, categoria: CATEGORIES.CIENCIAS_NATURALEZA.id })),
  ...PREGUNTAS_DEPORTES_PASATIEMPOS.map(q => ({ ...q, categoria: CATEGORIES.DEPORTES_PASATIEMPOS.id })),
];

// Función para obtener una pregunta aleatoria de una categoría específica
export const getRandomQuestion = (categoriaId = null) => {
  let preguntasDisponibles = ALL_QUESTIONS;
  
  if (categoriaId) {
    preguntasDisponibles = ALL_QUESTIONS.filter(q => q.categoria === categoriaId);
  }
  
  if (preguntasDisponibles.length === 0) {
    preguntasDisponibles = ALL_QUESTIONS;
  }
  
  const randomIndex = Math.floor(Math.random() * preguntasDisponibles.length);
  return preguntasDisponibles[randomIndex];
};

// Función para obtener una pregunta aleatoria de cualquier categoría
export const getRandomQuestionFromAnyCategory = () => {
  return getRandomQuestion();
};

