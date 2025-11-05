// Escenarios del juego El Sonidista Ciego
export const SCENARIOS = [
  // Escenarios Cotidianos
  'Una obra en construcción',
  'Un restaurante de comida rápida',
  'Una visita al dentista',
  'El primer día de clases en un colegio',
  'Una clase de cocina',
  'Una estación de tren',
  'Un mercado al aire libre',
  'Una playa en verano',
  'Una oficina por la noche',
  'Un supermercado en hora punta',
  'Una lavandería automatizada',
  'Una peluquería',
  'Un gimnasio',
  'Un cine durante la película',
  'Una cafetería de barrio',
  'Una biblioteca',
  'Un banco',
  'Un parque infantil',
  'Una piscina pública',
  'Un ascensor atascado',
  
  // Escenarios de Naturaleza
  'El Polo Norte en Navidad',
  'Una jungla por la noche',
  'Una granja por la mañana',
  'Un bosque en otoño',
  'Una tormenta en la selva',
  'Un río con rápidos',
  'Una cueva con ecos',
  'Una sabana africana',
  'Un desierto con viento',
  'Un volcán en erupción',
  'Un campo de trigo al atardecer',
  'Una cascada',
  'Un lago con patos',
  'Una montaña nevada',
  'Un jardín japonés',
  
  // Escenarios de Aventura y Acción
  'Un abordaje pirata a un barco',
  'Una escena de una película del oeste',
  'Un campamento con una fogata',
  'Una carrera de Fórmula 1',
  'Un combate de boxeo',
  'Una persecución policial',
  'Un rescate en helicóptero',
  'Un terremoto',
  'Una misión espacial',
  'Un asalto a un banco',
  'Una batalla medieval',
  'Un naufragio',
  'Un escape de prisión',
  'Un ataque zombie',
  'Una guerra de globos de agua',
  
  // Escenarios de Entretenimiento
  'Un circo',
  'Un parque de diversiones',
  'Un concierto de rock',
  'Un zoológico',
  'Un museo de cera',
  'Un estudio de grabación',
  'Un teatro durante una obra',
  'Un estadio de fútbol',
  'Un karaoke bar',
  'Una discoteca',
  'Un casino',
  'Una feria medieval',
  'Un parque acuático',
  'Una sala de escape',
  'Un festival de música',
  
  // Escenarios Fantásticos y Científicos
  'Una biblioteca encantada',
  'Un laboratorio de un científico loco',
  'Dentro de una colmena de abejas',
  'El interior de una nave espacial',
  'Una fábrica en funcionamiento',
  'Un planeta alienígena',
  'Un castillo encantado',
  'Una máquina del tiempo',
  'Una dimensión paralela',
  'El fondo del océano',
  'El centro de la Tierra',
  'Una nave submarina',
  'Un laboratorio de química',
  'Un observatorio astronómico',
  'Una estación espacial',
  
  // Escenarios Deportivos
  'Un partido de tenis',
  'Un partido de fútbol',
  'Una clase de natación',
  'Una carrera de caballos',
  'Un combate de artes marciales',
  'Una sesión de yoga',
  'Un campo de golf',
  'Una pista de patinaje',
  'Un partido de baloncesto',
  'Una clase de ballet',
  
  // Escenarios de Transporte
  'Un avión despegando',
  'Un barco pesquero',
  'Un tren de vapor',
  'Un autobús escolar',
  'Una moto en la carretera',
  'Un submarino',
  'Una montaña rusa',
  'Un teleférico',
  'Un globo aerostático',
  'Un barco vikingo',
  
  // Escenarios de Lugares Específicos
  'Un taller mecánico',
  'Una sala de hospital',
  'Una cocina de restaurante elegante',
  'Una bodega de vinos',
  'Un invernadero',
  'Una panadería a primera hora',
  'Una estación de bomberos',
  'Un acuario',
  'Un planetario',
  'Una cueva de murciélagos',
  'Un establo',
  'Un gallinero',
  'Un colmenar',
  'Un vivero',
  'Una herrería medieval',
  
  // Escenarios Temáticos Especiales
  'Un Halloween en casa embrujada',
  'Una boda tradicional',
  'Un funeral',
  'Una fiesta de cumpleaños infantil',
  'Una Nochebuena en familia',
  'Un desfile de moda',
  'Una subasta de arte',
  'Un juicio en el tribunal',
  'Una ceremonia de graduación',
  'Una inauguración de museo',
  
  // Escenarios Abstractos/Creativos
  'El nacimiento de una idea',
  'La nostalgia',
  'La ansiedad antes de un examen',
  'La alegría de recibir un regalo',
  'El miedo a la oscuridad',
  'La calma de la meditación',
  'La emoción de una sorpresa',
  'La tristeza de una despedida',
  'La euforia de una victoria',
  'La tensión de una espera',
];

// Categorías de escenarios para posibles modos temáticos futuros
export const SCENARIO_CATEGORIES = {
  COTIDIANOS: 'Cotidianos',
  NATURALEZA: 'Naturaleza',
  AVENTURA: 'Aventura y Acción',
  ENTRETENIMIENTO: 'Entretenimiento',
  FANTÁSTICOS: 'Fantásticos y Científicos',
  DEPORTES: 'Deportivos',
  TRANSPORTE: 'Transporte',
  ESPECÍFICOS: 'Lugares Específicos',
  TEMÁTICOS: 'Temáticos Especiales',
  ABSTRACTOS: 'Abstractos/Creativos',
};

export const getRandomScenario = () => {
  const randomIndex = Math.floor(Math.random() * SCENARIOS.length);
  return SCENARIOS[randomIndex];
};

export const getScenarioByCategory = (category) => {
  // Función auxiliar para obtener escenarios por categoría (para futuras expansiones)
  return SCENARIOS;
};

