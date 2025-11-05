// Base de datos de afirmaciones para el juego Dos Verdades y Una Mentira
// Cada set contiene 3 afirmaciones: 2 verdades y 1 mentira (que se selecciona aleatoriamente)

export const STATEMENT_SETS = [
  // Viajes y Aventuras
  [
    'He visitado las 7 maravillas del mundo moderno.',
    'Una vez me perdí en un mercado de Marrakech durante 3 horas.',
    'He buceado con tiburones en las Islas Galápagos.',
  ],
  [
    'He visto una aurora boreal desde un iglú en Noruega.',
    'He viajado en tren transiberiano desde Moscú hasta Vladivostok.',
    'Nunca he estado en un avión más de 4 horas seguidas.',
  ],
  [
    'He dormido en un castillo medieval en Escocia.',
    'Una vez me quedé varado en un aeropuerto durante 18 horas.',
    'He escalado el Monte Kilimanjaro en menos de 5 días.',
  ],
  [
    'He nadado en el Mar Muerto y floté sin esfuerzo.',
    'He probado comida callejera en 15 países diferentes.',
    'Nunca he usado un pasaporte para viajar.',
  ],
  
  // Habilidades y Talentos
  [
    'Puedo tocar 5 instrumentos musicales diferentes.',
    'Sé hacer malabares con 4 objetos simultáneamente.',
    'He ganado un torneo de ajedrez nacional.',
  ],
  [
    'Puedo resolver un cubo de Rubik en menos de 45 segundos.',
    'Sé hacer el spagat completo con ambas piernas.',
    'He escrito un libro que fue publicado en 3 países.',
  ],
  [
    'Puedo recitar más de 100 dígitos de pi de memoria.',
    'Sé hablar 4 idiomas con fluidez nativa.',
    'He ganado un concurso de spelling bee en la escuela.',
  ],
  [
    'Puedo hacer más de 75 flexiones seguidas sin parar.',
    'Sé hacer trucos de cartas profesionales.',
    'He aprendido a programar cuando tenía 10 años.',
  ],
  [
    'Puedo silbar melodías completas con los dedos.',
    'Sé hacer origami avanzado de más de 50 figuras.',
    'He ganado un premio de fotografía en un concurso internacional.',
  ],
  
  // Experiencias Únicas
  [
    'He saltado en paracaídas desde un avión a 4,000 metros.',
    'Una vez me entrevistaron para un programa de televisión.',
    'He visto a un OVNI en el cielo durante una noche estrellada.',
  ],
  [
    'He participado en un maratón completo y terminé en menos de 4 horas.',
    'Una vez me quedé encerrado en un ascensor durante 2 horas.',
    'He conocido a una celebridad y terminamos siendo amigos.',
  ],
  [
    'He hecho autostop por toda Europa durante un verano.',
    'Una vez encontré 500 euros en la calle y los devolví.',
    'He sobrevivido a un terremoto de magnitud 7.5.',
  ],
  [
    'He nadado con delfines en aguas abiertas del océano.',
    'Una vez me invitaron a una boda real como invitado especial.',
    'He participado en un juego de escape room y escapé en tiempo récord.',
  ],
  
  // Miedos y Fobias Raras
  [
    'Le tengo un miedo irracional a las mariposas desde que era niño.',
    'Soy alérgico al agua pero no al cloro de las piscinas.',
    'He superado mi miedo a las alturas saltando en bungee.',
  ],
  [
    'Le tengo pánico a los globos desde que uno explotó cerca de mi oído.',
    'Soy claustrofóbico pero me encanta escalar cuevas.',
    'He desarrollado una fobia a los payasos después de ver una película.',
  ],
  
  // Logros Académicos y Profesionales
  [
    'He publicado un artículo científico en una revista indexada.',
    'Tengo 3 títulos universitarios en áreas completamente diferentes.',
    'He dado una charla TED sobre un tema que me apasiona.',
  ],
  [
    'He ganado una beca completa para estudiar en el extranjero.',
    'Trabajé como traductor simultáneo en una cumbre internacional.',
    'He escrito código que ahora usan millones de personas.',
  ],
  [
    'He enseñado en una universidad antes de cumplir 25 años.',
    'He patentado una invención que se comercializa en 5 países.',
    'He fundado una startup que ahora tiene más de 50 empleados.',
  ],
  
  // Mascotas y Animales
  [
    'Tengo una mascota exótica que cuesta más mantener que un auto.',
    'He rescatado a más de 10 animales de la calle en mi vida.',
    'He entrenado a un perro para que sea perro de terapia.',
  ],
  [
    'He tenido una serpiente de 2 metros como mascota.',
    'Una vez me mordió un mono en un zoológico y necesité vacunas.',
    'He participado en concursos de agilidad con mi perro.',
  ],
  
  // Comida y Cocina
  [
    'He probado más de 200 tipos diferentes de queso en el mundo.',
    'Puedo cocinar platos de 15 países diferentes de memoria.',
    'He ganado un concurso de comer picante comiendo habaneros.',
  ],
  [
    'He trabajado como chef en un restaurante con estrella Michelin.',
    'Puedo identificar más de 50 especias solo por el olor.',
    'Nunca he probado el sushi en mi vida, a pesar de que me encanta el pescado.',
  ],
  [
    'He hecho una dieta vegana durante 5 años consecutivos.',
    'Puedo hacer un soufflé perfecto sin receta.',
    'He creado una receta propia que ahora venden en un restaurante.',
  ],
  
  // Deportes y Actividad Física
  [
    'He practicado artes marciales durante más de 10 años.',
    'He completado un triatlón Ironman completo.',
    'He roto 3 récords deportivos en mi escuela secundaria.',
  ],
  [
    'He jugado en un equipo deportivo que ganó un campeonato nacional.',
    'Puedo hacer una parada de manos durante más de 2 minutos.',
    'He entrenado con un atleta olímpico en mi deporte favorito.',
  ],
  [
    'He escalado más de 20 montañas de más de 3,000 metros.',
    'He practicado yoga todos los días durante 5 años.',
    'Nunca he roto un hueso en mi vida, a pesar de ser muy activo.',
  ],
  
  // Arte y Creatividad
  [
    'He vendido una de mis pinturas por más de 1,000 dólares.',
    'Puedo dibujar retratos hiperrealistas solo con lápiz.',
    'He participado en una exposición de arte en una galería famosa.',
  ],
  [
    'He escrito y dirigido un cortometraje que ganó un premio.',
    'Puedo tocar música de oído sin saber leer partituras.',
    'He diseñado la portada de un libro que se convirtió en bestseller.',
  ],
  [
    'He aprendido a hacer cerámica y ahora vendo mis piezas.',
    'Puedo hacer origami de más de 100 figuras diferentes.',
    'He actuado en una obra de teatro profesional en un teatro importante.',
  ],
  
  // Tecnología y Videojuegos
  [
    'He construido mi propia computadora desde cero con piezas sueltas.',
    'Puedo escribir código en más de 10 lenguajes de programación.',
    'He creado un videojuego indie que tiene más de 10,000 descargas.',
  ],
  [
    'He ganado un torneo de eSports a nivel regional.',
    'Puedo escribir más de 120 palabras por minuto en el teclado.',
    'He hackeado legalmente mi propia consola para instalar sistemas operativos.',
  ],
  
  // Familia y Relaciones
  [
    'Tengo un gemelo que vive en otro país y no nos vemos hace 3 años.',
    'He sido padrino de boda de 5 de mis mejores amigos.',
    'Tengo una prima que es famosa pero nunca la he conocido en persona.',
  ],
  [
    'He organizado una reunión familiar con más de 100 personas.',
    'Tengo un árbol genealógico que rastrea mi familia hasta el siglo XVI.',
    'He sido mentor de más de 20 personas en mi carrera profesional.',
  ],
  
  // Situaciones Cómicas y Extrañas
  [
    'Una vez me confundieron con una celebridad en un aeropuerto.',
    'He protagonizado un video viral que tiene más de 1 millón de vistas.',
    'Una vez me quedé dormido en un museo y me encerraron por la noche.',
  ],
  [
    'He aparecido en las noticias locales por una razón completamente aleatoria.',
    'Una vez gané un concurso de radio simplemente por ser el oyente número 100.',
    'He tenido una conversación con un desconocido que duró más de 6 horas.',
  ],
  [
    'Una vez me robaron el teléfono y lo recuperé usando una app de localización.',
    'He perdido y recuperado la misma billetera 3 veces en diferentes países.',
    'Una vez me invitaron a una fiesta pensando que era otra persona.',
  ],
  
  // Logros Inusuales
  [
    'He leído más de 500 libros en mi vida y los tengo todos catalogados.',
    'Puedo identificar más de 200 especies de aves solo por su canto.',
    'He coleccionado más de 300 monedas de diferentes países.',
  ],
  [
    'He visto todas las películas ganadoras del Oscar a mejor película.',
    'Puedo reconocer más de 50 tipos diferentes de vino solo por el sabor.',
    'He completado todas las rutas de senderismo en mi región natal.',
  ],
  [
    'He aprendido a hacer trucos de magia profesional y tengo mi propio show.',
    'Puedo resolver cualquier crucigrama del New York Times en menos de 20 minutos.',
    'He meditado todos los días durante más de 1,000 días consecutivos.',
  ],
  
  // Situaciones Peligrosas
  [
    'He sobrevivido a un accidente de tráfico sin usar cinturón de seguridad.',
    'Una vez me perdí en un bosque durante 12 horas y encontré el camino de vuelta.',
    'He estado a punto de ser atacado por un animal salvaje pero escapé.',
  ],
  [
    'He nadado en aguas infestadas de medusas sin ser picado.',
    'Una vez me quedé sin gasolina en medio de un desierto y caminé 15 km.',
    'He escalado un edificio alto sin equipo de seguridad por una apuesta.',
  ],
  
  // Cultura Pop y Entretenimiento
  [
    'He visto todas las películas de Marvel en orden cronológico 5 veces.',
    'Puedo recitar diálogos completos de más de 20 películas de memoria.',
    'He estado en el estreno mundial de una película importante.',
  ],
  [
    'He conocido personalmente a 3 actores de Hollywood famosos.',
    'Puedo tocar el tema de más de 50 series de TV en el piano.',
    'He coleccionado todas las ediciones especiales de mis libros favoritos.',
  ],
  
  // Educación y Aprendizaje
  [
    'He tomado más de 50 cursos en línea de diferentes plataformas.',
    'Puedo explicar la teoría de la relatividad en términos simples.',
    'He aprendido un nuevo idioma solo usando aplicaciones móviles.',
  ],
  [
    'He enseñado inglés a niños en un país extranjero como voluntario.',
    'Puedo resolver problemas de matemáticas avanzadas mentalmente.',
    'He memorizado todas las capitales del mundo y sus países.',
  ],
  
  // Música y Sonido
  [
    'He asistido a más de 100 conciertos de diferentes géneros musicales.',
    'Puedo identificar más de 200 canciones solo con los primeros 3 segundos.',
    'He aprendido a tocar un instrumento nuevo en solo 2 semanas.',
  ],
  [
    'He cantado en un coro que actuó en el Carnegie Hall.',
    'Puedo hacer beatbox profesional y he participado en competencias.',
    'He mezclado música electrónica en una fiesta con más de 500 personas.',
  ],
  
  // Naturaleza y Medio Ambiente
  [
    'He plantado más de 1,000 árboles en diferentes proyectos de reforestación.',
    'Puedo identificar más de 100 especies de plantas solo por sus hojas.',
    'He acampado en más de 30 lugares diferentes en mi vida.',
  ],
  [
    'He visto un eclipse solar total en 3 ocasiones diferentes.',
    'Puedo hacer fuego usando solo materiales naturales del bosque.',
    'He sobrevivido una noche completa en la naturaleza sin refugio.',
  ],
  
  // Moda y Estilo
  [
    'He diseñado mi propia línea de ropa que se vende en 3 tiendas.',
    'Puedo combinar colores y estilos para crear outfits perfectos.',
    'He participado en un desfile de moda como modelo amateur.',
  ],
  [
    'He coleccionado más de 200 pares de zapatos diferentes.',
    'Puedo hacer mi propio maquillaje profesional para eventos importantes.',
    'He aprendido a hacer costura y he hecho mi propia ropa.',
  ],
  
  // Trabajo y Profesión
  [
    'He trabajado en 5 países diferentes haciendo el mismo trabajo.',
    'Puedo trabajar desde casa con la misma productividad que en oficina.',
    'He cambiado de carrera profesional 3 veces y todas fueron exitosas.',
  ],
  [
    'He fundado 2 empresas diferentes que aún siguen funcionando.',
    'Puedo hacer presentaciones en público sin sentir nervios.',
    'He escrito más de 500 artículos profesionales en mi carrera.',
  ],
  
  // Salud y Bienestar
  [
    'He corrido un maratón completo sin entrenar previamente.',
    'Puedo hacer yoga todos los días sin faltar ni uno en 3 años.',
    'He cambiado completamente mi dieta y perdí 20 kilos en 6 meses.',
  ],
  [
    'He meditado durante más de 500 horas acumuladas en mi vida.',
    'Puedo hacer splits completos con ambas piernas sin calentar.',
    'He hecho una desintoxicación digital de 30 días sin usar internet.',
  ],
  
  // Situaciones Sociales
  [
    'He organizado una fiesta sorpresa que duró más de 24 horas.',
    'Puedo recordar el nombre de todas las personas que conozco.',
    'He sido el mejor hombre/dama de honor en 5 bodas diferentes.',
  ],
  [
    'He hecho amistad con un completo desconocido en cada viaje que hago.',
    'Puedo mantener conversaciones interesantes sobre cualquier tema.',
    'He resuelto más de 10 conflictos entre amigos siendo el mediador.',
  ],
  
  // Misceláneos Únicos
  [
    'He ganado la lotería dos veces en mi vida con números diferentes.',
    'Puedo hacer más de 30 tipos diferentes de nudos marineros.',
    'He coleccionado todos los estados de Estados Unidos visitándolos.',
  ],
  [
    'He visto un cometa a simple vista sin usar telescopio.',
    'Puedo hacer más de 20 trucos diferentes con un yo-yo.',
    'He aprendido a hacer malabarismo con fuego en menos de una semana.',
  ],
  [
    'He participado en un flash mob que se hizo viral en internet.',
    'Puedo hacer más de 100 tipos diferentes de caras y expresiones.',
    'He creado mi propio código secreto de comunicación que solo yo entiendo.',
  ],
  [
    'He dormido en más de 50 ciudades diferentes alrededor del mundo.',
    'Puedo identificar más de 30 tipos diferentes de nubes en el cielo.',
    'He hecho una lista de todos los lugares que quiero visitar antes de morir.',
  ],
  [
    'He superado mi miedo a hablar en público dando 20 charlas TED.',
    'Puedo hacer más de 15 trucos diferentes con un cubo de Rubik.',
    'He aprendido a hacer surf a los 30 años y ahora soy instructor.',
  ],
];

// Configuración del juego
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

