// Historias para el juego Ordena la Historia
// Cada historia pertenece a un paquete y tiene un array de frases en orden cronológico correcto

export const STORY_PACKAGES = {
  aventura: {
    id: 'aventura',
    name: 'Aventura',
    stories: [
      {
        id: 'aventura-1',
        title: 'El Mapa del Tesoro',
        sentences: [
          'El viejo mapa, encontrado en el desván, mostraba una isla marcada con una X.',
          'Tras una semana de navegación, avistaron tierra con una montaña en forma de calavera.',
          'Dentro de una cueva oculta tras una cascada, encontraron un cofre de madera cubierto de algas.',
          'Al abrirlo, en lugar de oro, encontraron un diario que revelaba un secreto familiar aún mayor.',
        ],
        difficulty: 'facil', // basado en el número de frases
      },
    ],
  },
  cienciaFiccion: {
    id: 'cienciaFiccion',
    name: 'Ciencia Ficción',
    stories: [
      {
        id: 'scifi-1',
        title: 'Transmisión Desconocida',
        sentences: [
          'La alarma de la nave "Hyperion" sonó estridentemente, despertando a la tripulación de su crio-sueño.',
          'En el monitor principal, un planeta desconocido que no figuraba en las cartas estelares giraba lentamente.',
          'Una transmisión de origen desconocido, compuesta por patrones matemáticos complejos, comenzó a recibirse.',
          'A pesar del riesgo, la capitana ordenó que una pequeña sonda de exploración descendiera a la superficie.',
          'La sonda transmitió una sola imagen de una estructura artificial antes de que la comunicación se cortara abruptamente.',
        ],
        difficulty: 'medio',
      },
    ],
  },
  comedia: {
    id: 'comedia',
    name: 'Comedia',
    stories: [
      {
        id: 'comedia-1',
        title: 'La Paella del Amor',
        sentences: [
          'Roberto decidió que impresionar a su cita cocinando una paella era una idea brillante.',
          'Confundiendo el pimentón con el curry en polvo, creó un plato de un color y sabor indescriptibles.',
          'Su cita, una chef galardonada, no pudo contener la risa pero le dio un 10 por el esfuerzo y le invitó a cenar fuera.',
        ],
        difficulty: 'facil',
      },
    ],
  },
};

// Configuración del juego
export const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 8,
  DEFAULT_TIMER: 300, // 5 minutos en segundos
  MIN_TIMER: 60, // 1 minuto mínimo
  MAX_TIMER: 600, // 10 minutos máximo
};

// Función auxiliar para obtener una historia aleatoria de un paquete
export const getRandomStoryFromPackage = (packageId) => {
  const packageData = STORY_PACKAGES[packageId];
  if (!packageData || packageData.stories.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * packageData.stories.length);
  return packageData.stories[randomIndex];
};

// Función auxiliar para obtener todas las historias de un paquete
export const getStoriesFromPackage = (packageId) => {
  const packageData = STORY_PACKAGES[packageId];
  if (!packageData) {
    return [];
  }
  return packageData.stories;
};
