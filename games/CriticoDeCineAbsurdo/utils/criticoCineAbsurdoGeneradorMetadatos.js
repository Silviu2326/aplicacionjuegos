// Generador de metadatos falsos para películas absurdas
import { FRAGMENTOS_TITULOS } from '../constants/CriticoCineAbsurdoFragmentos';

const GENEROS = [
  'Ciencia Ficción', 'Comedia Absurda', 'Drama Existencial', 'Terror Psicológico',
  'Thriller Absurdo', 'Aventura Fantástica', 'Romance Imposible', 'Acción Descontrolada',
  'Documental Falso', 'Musical Experimental', 'Western Espacial', 'Noir Existencial',
  'Horror Cósmico', 'Comedia Negra', 'Drama Familiar', 'Suspense Absurdo',
  'Fantasy Urbana', 'Cyberpunk Retro', 'Steampunk Moderno', 'Post-Apocalíptico',
  'Distopía Comediante', 'Utopía Tragicómica', 'Realismo Mágico', 'Surrealismo Puro',
];

const DIRECTORES = [
  'Alejandro González Iñárritu', 'Guillermo del Toro', 'Pedro Almodóvar', 'Álvaro Buela',
  'María Cineasta', 'Carlos Directorial', 'Ana Filmica', 'Luis Absurdo',
  'Sofia Coppola', 'Wes Anderson', 'David Lynch', 'Quentin Tarantino',
  'Christopher Nolan', 'Denis Villeneuve', 'Greta Gerwig', 'Jordan Peele',
  'Bong Joon-ho', 'Park Chan-wook', 'Akira Kurosawa', 'Hayao Miyazaki',
  'Federico Fellini', 'Ingmar Bergman', 'Andrei Tarkovsky', 'Stanley Kubrick',
  'Alfred Hitchcock', 'Orson Welles', 'Charlie Chaplin', 'Buster Keaton',
];

const ACTORES = [
  'Roberto De Niro Falso', 'Meryl Streep Absurda', 'Leonardo DiCaprio Imaginario',
  'Penélope Cruz Ficticia', 'Antonio Banderas Inventado', 'Javier Bardem Falso',
  'María Falsa', 'Carlos Inventado', 'Ana Imaginaria', 'Luis Absurdo',
  'Sofía Ficticia', 'Pablo Inventado', 'Laura Imaginaria', 'David Falso',
  'Elena Absurda', 'Miguel Inventado', 'Carmen Ficticia', 'Jorge Absurdo',
];

const ANOS = Array.from({ length: 50 }, (_, i) => 1975 + i); // 1975-2024

const SINOPSIS_PLANTILLAS = [
  (titulo, genero) => `En un mundo donde ${titulo.toLowerCase()} se ha convertido en realidad, un grupo de héroes improbables debe enfrentarse a desafíos que desafían la lógica misma. Un ${genero.toLowerCase()} que mezcla absurdo y emoción.`,
  (titulo, genero) => `La historia de cómo ${titulo.toLowerCase()} cambió para siempre el destino de la humanidad. Un relato épico lleno de giros inesperados y momentos hilarantes.`,
  (titulo, genero) => `Cuando ${titulo.toLowerCase()} aparece en la vida de nuestros protagonistas, nada volverá a ser igual. Una aventura que desafía todas las expectativas.`,
  (titulo, genero) => `En las profundidades del absurdo, ${titulo.toLowerCase()} se convierte en la única esperanza de un mundo al borde del colapso existencial.`,
  (titulo, genero) => `Una comedia dramática que explora las consecuencias inesperadas de ${titulo.toLowerCase()}. Un viaje emocional lleno de sorpresas.`,
  (titulo, genero) => `El descubrimiento de ${titulo.toLowerCase()} desencadena una serie de eventos que pondrán a prueba los límites de la realidad.`,
  (titulo, genero) => `En un futuro no muy lejano, ${titulo.toLowerCase()} se ha convertido en el mayor problema de la humanidad. ¿Podrán nuestros héroes encontrar una solución?`,
  (titulo, genero) => `Una historia de amor, pérdida y ${titulo.toLowerCase()}. Un drama que mezcla lo absurdo con lo conmovedor.`,
  (titulo, genero) => `Cuando todo parece perdido, ${titulo.toLowerCase()} aparece como la única respuesta. Una aventura que desafía toda lógica.`,
  (titulo, genero) => `El misterio de ${titulo.toLowerCase()} mantendrá a la audiencia en vilo hasta el último segundo. Un thriller absurdo e inolvidable.`,
];

const getRandomElement = (array) => {
  if (!array || array.length === 0) return '';
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Genera metadatos falsos para una película
 */
export const generarMetadatosPelicula = (titulo) => {
  const genero = getRandomElement(GENEROS);
  const director = getRandomElement(DIRECTORES);
  const ano = getRandomElement(ANOS);
  const duracion = Math.floor(Math.random() * 120) + 85; // 85-205 minutos
  const sinopsisTemplate = getRandomElement(SINOPSIS_PLANTILLAS);
  const sinopsis = sinopsisTemplate(titulo, genero);
  
  // Generar elenco principal (2-4 actores)
  const numActores = Math.floor(Math.random() * 3) + 2;
  const elenco = [];
  for (let i = 0; i < numActores; i++) {
    elenco.push(getRandomElement(ACTORES));
  }
  
  // Generar rating (1-5 estrellas iniciales)
  const ratingInicial = (Math.random() * 4 + 1).toFixed(1);
  
  // Generar presupuesto (millones)
  const presupuesto = Math.floor(Math.random() * 200) + 10; // 10-210 millones
  
  // Generar taquilla (millones)
  const taquilla = Math.floor(Math.random() * 500) + presupuesto; // Al menos el presupuesto
  
  return {
    titulo,
    genero,
    director,
    ano,
    duracion,
    sinopsis,
    elenco,
    ratingInicial: parseFloat(ratingInicial),
    presupuesto,
    taquilla,
    idioma: 'Español',
    pais: 'España',
  };
};

