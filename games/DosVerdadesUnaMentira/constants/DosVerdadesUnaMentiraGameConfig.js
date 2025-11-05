export const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 20,
  DEFAULT_DEBATE_TIME: 120, // segundos (2 minutos)
  DEFAULT_VOTING_TIME: 60, // segundos (1 minuto)
  MIN_DEBATE_TIME: 30,
  MAX_DEBATE_TIME: 300,
  MIN_VOTING_TIME: 15,
  MAX_VOTING_TIME: 120,
  DEFAULT_POINTS_FOR_CORRECT_GUESS: 1,
  DEFAULT_POINTS_FOR_FOOLING: 1,
  DEFAULT_MAX_ROUNDS: null, // null = todos los jugadores son narradores una vez
};

// Sets de afirmaciones de ejemplo (para modo automático) - Datos falsos generados
export const STATEMENT_SETS = [
  // Set 1: Viajes y aventuras
  [
    'He viajado a más de 25 países en 5 continentes diferentes.',
    'Una vez me perdí en el Amazonas durante 3 días.',
    'He saltado en paracaídas desde 15,000 pies de altura.',
  ],
  // Set 2: Talento y habilidades
  [
    'Puedo tocar 7 instrumentos musicales diferentes.',
    'Gané un concurso nacional de matemáticas cuando tenía 16 años.',
    'Sé hacer malabares con 5 pelotas simultáneamente.',
  ],
  // Set 3: Experiencias únicas
  [
    'He visto una aurora boreal en persona en Islandia.',
    'Una vez me encontré con un oso en un parque nacional.',
    'He buceado en las aguas más profundas del Caribe.',
  ],
  // Set 4: Curiosidades personales
  [
    'Tengo una colección de más de 200 cómics vintage.',
    'Le tengo miedo a las mariposas desde que era niño.',
    'Puedo hablar 5 idiomas con fluidez.',
  ],
  // Set 5: Logros deportivos
  [
    'Corrí una maratón completa en menos de 4 horas.',
    'He escalado 3 montañas de más de 4,000 metros.',
    'Practico artes marciales desde los 8 años.',
  ],
  // Set 6: Cocina y gastronomía
  [
    'Sé preparar más de 50 platos de diferentes culturas.',
    'Gané un concurso de cocina local el año pasado.',
    'Nunca he comido sushi en mi vida.',
  ],
  // Set 7: Tecnología y ciencia
  [
    'Construí mi propio ordenador gaming desde cero.',
    'Puedo resolver un cubo de Rubik en menos de 30 segundos.',
    'He programado una aplicación que tiene 10,000 descargas.',
  ],
  // Set 8: Arte y creatividad
  [
    'He pintado más de 30 cuadros que he vendido en exposiciones.',
    'Toco el piano en una orquesta local desde hace 5 años.',
    'Escribí un libro de ciencia ficción que nunca publiqué.',
  ],
  // Set 9: Experiencias laborales
  [
    'Trabajé como actor de doblaje en una película animada.',
    'Mi primer trabajo fue como guía turístico en París.',
    'He trabajado en 12 empresas diferentes en los últimos 5 años.',
  ],
  // Set 10: Animales y naturaleza
  [
    'He tenido 15 mascotas diferentes en mi vida.',
    'Tengo una colección de más de 50 plantas en casa.',
    'Una vez rescaté a un perro abandonado en la carretera.',
  ],
  // Set 11: Música y entretenimiento
  [
    'He visto más de 100 conciertos en vivo de diferentes artistas.',
    'Tengo una colección de más de 500 vinilos originales.',
    'Canté en un coro profesional durante 3 años.',
  ],
  // Set 12: Aventuras extremas
  [
    'He hecho puenting desde 5 puentes diferentes en Europa.',
    'Practiqué surf durante 6 meses en Australia.',
    'He conducido un coche de carreras profesional en un circuito.',
  ],
  // Set 13: Cultura y lectura
  [
    'He leído más de 500 libros en mi vida.',
    'Tengo una colección de 200 libros de filosofía.',
    'Nunca he visto ninguna película de Star Wars.',
  ],
  // Set 14: Videojuegos
  [
    'He completado más de 200 videojuegos al 100%.',
    'Gané un torneo nacional de eSports hace 2 años.',
    'Nunca he jugado a ningún juego de móvil.',
  ],
  // Set 15: Fobias y miedos
  [
    'Le tengo miedo a las alturas desde que me caí de niño.',
    'Tengo fobia a las arañas y serpientes.',
    'Me da pánico volar en avión aunque lo hago a menudo.',
  ],
  // Set 16: Familia y relaciones
  [
    'Tengo 7 hermanos y somos muy unidos.',
    'Mi mejor amigo de la infancia es ahora mi vecino.',
    'He estado en 15 bodas diferentes como padrino.',
  ],
  // Set 17: Deportes acuáticos
  [
    'He buceado con tiburones en las Bahamas.',
    'Puedo nadar más de 5 kilómetros sin parar.',
    'He surfeado olas de más de 3 metros de altura.',
  ],
  // Set 18: Moda y estilo
  [
    'Tengo más de 50 pares de zapatos diferentes.',
    'He diseñado mi propia línea de ropa.',
    'Nunca he usado corbata en mi vida.',
  ],
  // Set 19: Comida y bebida
  [
    'He probado más de 100 tipos diferentes de queso.',
    'Puedo comer comida picante nivel 10 en la escala Scoville.',
    'Nunca he tomado café en mi vida, solo té.',
  ],
  // Set 20: Pasatiempos raros
  [
    'Colecciono piedras de diferentes países que he visitado.',
    'Puedo hacer 50 trucos diferentes con un yoyo.',
    'He construido maquetas de más de 20 edificios famosos.',
  ],
  // Set 21: Educación y estudios
  [
    'Tengo 3 títulos universitarios en diferentes áreas.',
    'He estudiado en 5 universidades diferentes en 3 países.',
    'Nunca he reprobado un examen en mi vida académica.',
  ],
  // Set 22: Experiencias de viaje
  [
    'He viajado solo por 15 países diferentes.',
    'Me quedé varado en un aeropuerto durante 48 horas.',
    'He dormido en más de 100 hoteles diferentes.',
  ],
  // Set 23: Habilidades manuales
  [
    'Sé hacer magia con cartas y tengo 50 trucos diferentes.',
    'Puedo resolver cualquier tipo de puzzle en minutos.',
    'He construido 3 muebles de madera desde cero.',
  ],
  // Set 24: Celebraciones
  [
    'He celebrado mi cumpleaños en 10 países diferentes.',
    'Organizo una fiesta de Halloween cada año desde hace 15 años.',
    'Nunca he faltado a una celebración familiar en mi vida.',
  ],
  // Set 25: Tecnología avanzada
  [
    'Tengo un dron profesional que uso para fotografía aérea.',
    'He programado en más de 10 lenguajes de programación.',
    'Construí mi propio robot que puede hacer tareas domésticas.',
  ],
  // Set 26: Naturaleza y medio ambiente
  [
    'He plantado más de 100 árboles en diferentes lugares.',
    'Soy voluntario en una organización de protección animal.',
    'He acampado bajo las estrellas más de 50 veces.',
  ],
  // Set 27: Arte escénico
  [
    'He actuado en 5 obras de teatro diferentes.',
    'Tengo experiencia como presentador de televisión local.',
    'He bailado salsa profesionalmente durante 3 años.',
  ],
  // Set 28: Deportes de equipo
  [
    'Jugué fútbol profesionalmente durante 2 años.',
    'He sido capitán de un equipo de baloncesto universitario.',
    'He ganado 3 campeonatos locales de voleibol.',
  ],
  // Set 29: Experiencias culturales
  [
    'He visitado más de 50 museos en diferentes países.',
    'He asistido a 20 festivales de música diferentes.',
    'Conozco las tradiciones de más de 15 culturas diferentes.',
  ],
  // Set 30: Logros académicos
  [
    'Fui el mejor estudiante de mi promoción universitaria.',
    'He publicado 5 artículos científicos en revistas internacionales.',
    'Nunca he copiado en un examen en toda mi vida académica.',
  ],
  // Set 31: Experiencias de riesgo
  [
    'He conducido un coche de carreras a más de 200 km/h.',
    'He practicado parkour durante 5 años.',
    'Una vez me quedé atrapado en un ascensor durante 4 horas.',
  ],
  // Set 32: Habilidades de supervivencia
  [
    'Sé hacer fuego con solo dos palos.',
    'Puedo identificar más de 50 plantas comestibles.',
    'He sobrevivido 7 días en la naturaleza sin ayuda externa.',
  ],
  // Set 33: Entretenimiento y espectáculos
  [
    'He visto más de 50 musicales en Broadway y el West End.',
    'Tengo una colección de más de 300 películas en DVD.',
    'He asistido al estreno mundial de 3 películas de Hollywood.',
  ],
  // Set 34: Transporte y vehículos
  [
    'He conducido más de 15 tipos diferentes de vehículos.',
    'Tengo una licencia de piloto privado de avión.',
    'He viajado en tren por más de 20 países diferentes.',
  ],
  // Set 35: Fotografía y arte visual
  [
    'He tomado más de 50,000 fotografías en mi vida.',
    'Tengo una exposición de fotos en una galería local.',
    'He ganado un concurso internacional de fotografía.',
  ],
  // Set 36: Actividades acuáticas
  [
    'He practicado kayak en más de 10 ríos diferentes.',
    'Puedo bucear a más de 30 metros de profundidad.',
    'He pescado en 5 océanos diferentes del mundo.',
  ],
  // Set 37: Música instrumental
  [
    'Puedo tocar cualquier canción de oído después de escucharla dos veces.',
    'He compuesto más de 20 canciones originales.',
    'Toco en una banda de rock que ha grabado 2 álbumes.',
  ],
  // Set 38: Experiencias con celebridades
  [
    'He conocido a 10 actores famosos en persona.',
    'Una vez cené en la misma mesa que un premio Nobel.',
    'He tenido una conversación con un presidente de un país.',
  ],
  // Set 39: Habilidades de comunicación
  [
    'Puedo hablar en público ante más de 1,000 personas sin nervios.',
    'He dado más de 50 charlas y conferencias.',
    'Nunca he usado las redes sociales en mi vida.',
  ],
  // Set 40: Experiencias extremas
  [
    'He saltado desde un avión sin paracaídas (con seguridad).',
    'He sobrevivido a un terremoto de magnitud 7.5.',
    'He cruzado un desierto a pie durante 5 días.',
  ],
];
