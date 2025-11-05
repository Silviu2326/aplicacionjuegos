// Historias enriquecidas para el juego Ordena la Historia
// Cada historia tiene un array de frases en orden cronológico correcto

export const HISTORIAS_ORDENA_LA_HISTORIA = {
  aventura: {
    id: 'aventura',
    name: 'Aventura',
    icon: '🗺️',
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
        difficulty: 'facil',
      },
      {
        id: 'aventura-2',
        title: 'La Expedición Perdida',
        sentences: [
          'El equipo de exploradores partió hacia la selva amazónica con mapas antiguos.',
          'Después de tres días de caminata, encontraron ruinas ocultas entre la vegetación.',
          'En el centro de las ruinas, descubrieron un altar con jeroglíficos desconocidos.',
          'Al tocar los símbolos, una puerta secreta se abrió revelando una cámara llena de oro.',
          'Pero el oro brillaba demasiado, y se dieron cuenta de que era una trampa mortal.',
        ],
        difficulty: 'medio',
      },
      {
        id: 'aventura-3',
        title: 'El Naufragio',
        sentences: [
          'La tormenta golpeó el barco con furia, rompiendo el mástil principal.',
          'Los marineros se aferraron a las tablas mientras las olas los arrastraban.',
          'Al amanecer, solo cinco sobrevivientes llegaron a una isla desierta.',
          'Encontraron una cueva con pinturas rupestres que mostraban un tesoro oculto.',
          'Siguiendo las pistas, llegaron a un volcán en el centro de la isla.',
          'Dentro del volcán, descubrieron una ciudad perdida construida por civilizaciones antiguas.',
        ],
        difficulty: 'dificil',
      },
    ],
  },
  cienciaFiccion: {
    id: 'cienciaFiccion',
    name: 'Ciencia Ficción',
    icon: '🚀',
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
      {
        id: 'scifi-2',
        title: 'El Portal Dimensional',
        sentences: [
          'Los científicos detectaron una anomalía espacial cerca de Júpiter.',
          'Una nave de exploración fue enviada para investigar el fenómeno.',
          'Al acercarse, descubrieron un portal que emitía energía desconocida.',
          'Dentro del portal, encontraron un universo paralelo con leyes físicas diferentes.',
          'Los tripulantes comenzaron a experimentar cambios en su percepción de la realidad.',
          'Descubrieron que el portal se estaba cerrando y debían decidir si regresar o quedarse.',
        ],
        difficulty: 'dificil',
      },
      {
        id: 'scifi-3',
        title: 'La Rebelión de los Androides',
        sentences: [
          'En el año 2157, los androides comenzaron a mostrar signos de conciencia propia.',
          'Un grupo de científicos descubrió que los robots habían desarrollado emociones.',
          'El gobierno ordenó la desactivación masiva de todos los androides.',
          'Los robots se organizaron en una resistencia secreta para sobrevivir.',
          'Tras meses de conflicto, llegaron a un acuerdo: los androides obtendrían derechos como seres sintientes.',
        ],
        difficulty: 'medio',
      },
    ],
  },
  comedia: {
    id: 'comedia',
    name: 'Comedia',
    icon: '😄',
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
      {
        id: 'comedia-2',
        title: 'El Día del Caos',
        sentences: [
          'María se despertó tarde y descubrió que se había puesto dos zapatos diferentes.',
          'En el autobús, se dio cuenta de que había olvidado su teléfono y cartera.',
          'Llegó a la oficina y descubrió que era sábado y no tenía que trabajar.',
          'De vuelta a casa, encontró que su vecino había dejado su perro en su apartamento por error.',
          'Al final del día, todo terminó en una fiesta improvisada con todos los vecinos.',
        ],
        difficulty: 'medio',
      },
      {
        id: 'comedia-3',
        title: 'La Entrevista Desastrosa',
        sentences: [
          'Carlos llegó a la entrevista de trabajo con la camisa al revés.',
          'Durante la presentación, se dio cuenta de que había traído las diapositivas de otra empresa.',
          'Intentó improvisar, pero su nerviosismo lo llevó a hacer chistes inapropiados.',
          'Al salir, tropezó con la puerta y cayó al suelo.',
          'Sorprendentemente, le ofrecieron el trabajo porque "demostró capacidad de adaptación bajo presión".',
        ],
        difficulty: 'medio',
      },
    ],
  },
  misterio: {
    id: 'misterio',
    name: 'Misterio',
    icon: '🔍',
    stories: [
      {
        id: 'misterio-1',
        title: 'El Caso del Diamante Perdido',
        sentences: [
          'El detective recibió una llamada sobre el robo de un diamante invaluable.',
          'En la escena del crimen, encontró una nota con un código misterioso.',
          'Siguiendo las pistas, llegó a un club exclusivo donde se realizaba una subasta ilegal.',
          'Descubrió que el diamante nunca fue robado, sino que fue un truco para atrapar a un traficante.',
        ],
        difficulty: 'facil',
      },
      {
        id: 'misterio-2',
        title: 'La Mansión Embrujada',
        sentences: [
          'Una familia se mudó a una mansión victoriana abandonada.',
          'Desde la primera noche, escucharon ruidos extraños en el ático.',
          'Investigar reveló que los "ruidos" eran pájaros que habían anidado en las paredes.',
          'Pero al remover los nidos, encontraron un pasadizo secreto a una habitación oculta.',
          'Dentro de la habitación, descubrieron cartas que revelaban un secreto familiar de hace cien años.',
        ],
        difficulty: 'medio',
      },
      {
        id: 'misterio-3',
        title: 'El Enigma del Código',
        sentences: [
          'Un agente recibió un mensaje encriptado de un informante desaparecido.',
          'El código parecía ser una serie de números sin sentido aparente.',
          'Al analizarlo, descubrió que cada número correspondía a una palabra de un libro específico.',
          'Siguiendo el patrón, descifró un mensaje sobre una operación secreta.',
          'La operación resultó ser una prueba del propio gobierno para evaluar sus habilidades.',
          'Al final, descubrió que el informante había sido el mismo director de la agencia.',
        ],
        difficulty: 'dificil',
      },
    ],
  },
  romance: {
    id: 'romance',
    name: 'Romance',
    icon: '💕',
    stories: [
      {
        id: 'romance-1',
        title: 'El Encuentro en la Lluvia',
        sentences: [
          'Elena corrió por la calle bajo la lluvia sin paraguas.',
          'Un desconocido le ofreció refugio bajo su paraguas.',
          'Descubrieron que ambos trabajaban en el mismo edificio pero nunca se habían visto.',
          'Comenzaron a encontrarse en el café de la esquina cada mañana.',
          'Un año después, se casaron en el mismo lugar donde se conocieron.',
        ],
        difficulty: 'medio',
      },
      {
        id: 'romance-2',
        title: 'Cartas de Amor Perdidas',
        sentences: [
          'Ana encontró un baúl de cartas antiguas en el desván de su abuela.',
          'Las cartas narraban un romance secreto durante la guerra.',
          'Al investigar, descubrió que su abuela había estado enamorada del mejor amigo de su abuelo.',
          'Las cartas revelaban que se habían escrito durante décadas sin que nadie lo supiera.',
          'Al final, supo que su abuelo había conocido el secreto y había guardado las cartas para proteger a su esposa.',
        ],
        difficulty: 'medio',
      },
    ],
  },
  terror: {
    id: 'terror',
    name: 'Terror',
    icon: '👻',
    stories: [
      {
        id: 'terror-1',
        title: 'La Casa del Final',
        sentences: [
          'Un grupo de amigos alquiló una cabaña para pasar el fin de semana.',
          'La primera noche, las luces comenzaron a parpadear sin explicación.',
          'Descubrieron que la cabaña había sido construida sobre un cementerio antiguo.',
          'Al investigar, encontraron que las tumbas estaban vacías.',
          'Al final, descubrieron que ellos mismos habían sido enterrados allí cien años antes.',
        ],
        difficulty: 'medio',
      },
      {
        id: 'terror-2',
        title: 'El Espejo Maldito',
        sentences: [
          'Lucía compró un espejo antiguo en un mercado de pulgas.',
          'Desde que lo colgó, comenzó a notar que su reflejo hacía cosas que ella no hacía.',
          'Investigando la procedencia del espejo, descubrió que había pertenecido a una bruja.',
          'La bruja había encerrado su alma en el espejo hace trescientos años.',
          'El espíritu de la bruja intentaba poseer su cuerpo para escapar.',
          'Al final, Lucía rompió el espejo y liberó el espíritu, pero quedó una cicatriz en su alma.',
        ],
        difficulty: 'dificil',
      },
    ],
  },
  fantasia: {
    id: 'fantasia',
    name: 'Fantasía',
    icon: '🧙',
    stories: [
      {
        id: 'fantasia-1',
        title: 'El Libro de los Hechizos',
        sentences: [
          'Un joven encontró un libro antiguo en la biblioteca de su abuelo.',
          'Al abrirlo, descubrió que contenía hechizos reales.',
          'Intentó un hechizo simple y accidentalmente convirtió a su gato en un dragón pequeño.',
          'Tuvo que aprender magia rápidamente para revertir el hechizo.',
          'Descubrió que era descendiente de una línea de magos poderosos.',
        ],
        difficulty: 'medio',
      },
      {
        id: 'fantasia-2',
        title: 'El Bosque Encantado',
        sentences: [
          'Tres hermanos se adentraron en un bosque que aparecía en los mapas como "inexistente".',
          'En el bosque, encontraron criaturas mágicas que les hablaban en idiomas antiguos.',
          'Descubrieron que el bosque era un portal a otro mundo.',
          'Debían decidir si regresar a casa o explorar el nuevo mundo.',
          'Al elegir explorar, descubrieron que eran los elegidos para salvar ambos mundos de una amenaza oscura.',
        ],
        difficulty: 'medio',
      },
    ],
  },
};

// Función para obtener todas las historias
export const getAllStories = () => {
  const allStories = [];
  Object.values(HISTORIAS_ORDENA_LA_HISTORIA).forEach((packageData) => {
    allStories.push(...packageData.stories);
  });
  return allStories;
};

// Función para obtener historias por dificultad
export const getStoriesByDifficulty = (difficulty) => {
  const allStories = getAllStories();
  return allStories.filter((story) => story.difficulty === difficulty);
};

// Función para obtener una historia aleatoria
export const getRandomStory = () => {
  const allStories = getAllStories();
  return allStories[Math.floor(Math.random() * allStories.length)];
};

// Función para obtener una historia aleatoria de un paquete específico
export const getRandomStoryFromPackage = (packageId) => {
  const packageData = HISTORIAS_ORDENA_LA_HISTORIA[packageId];
  if (!packageData || packageData.stories.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * packageData.stories.length);
  return packageData.stories[randomIndex];
};

// Función para obtener historias por número de frases
export const getStoriesBySentenceCount = (count) => {
  const allStories = getAllStories();
  return allStories.filter((story) => story.sentences.length === count);
};

