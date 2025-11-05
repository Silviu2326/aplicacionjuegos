// Base de datos extensa de afirmaciones Verdadero o Falso Extremo
// Cada afirmación tiene: texto, respuesta (true/false), explicacion, categoria, dificultad

export const CATEGORIES = {
  CIENCIA: 'Ciencia',
  HISTORIA: 'Historia',
  NATURALEZA: 'Naturaleza',
  CULTURA_POP: 'Cultura Pop',
  GEOGRAFIA: 'Geografía',
  ANIMALES: 'Animales',
  MITOS: 'Mitos y Leyendas',
  TECNOLOGIA: 'Tecnología',
  COMIDA: 'Comida',
  DEPORTES: 'Deportes',
};

export const VERDADERO_FALSO_QUESTIONS = [
  // CIENCIA
  {
    id: 1,
    texto: 'El corazón de una ballena azul es tan grande que un ser humano podría nadar a través de sus arterias.',
    respuesta: true,
    explicacion: 'El corazón de una ballena azul puede pesar hasta 180 kg y sus arterias principales tienen el tamaño suficiente para que una persona pequeña pueda pasar por ellas.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 2,
    texto: 'Los humanos solo utilizan el 10% de su capacidad cerebral.',
    respuesta: false,
    explicacion: 'Es un mito popular. Los estudios con neuroimagen muestran que usamos prácticamente todo el cerebro, aunque no todas las partes al mismo tiempo.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'facil',
  },
  {
    id: 3,
    texto: 'En el planeta Venus, un día es más largo que un año.',
    respuesta: true,
    explicacion: 'Venus tarda 243 días terrestres en rotar sobre su eje, pero solo 225 días en orbitar alrededor del Sol. Por lo tanto, un día venusiano es más largo que un año venusiano.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 4,
    texto: 'El agua hierve más rápido en la cima de una montaña que al nivel del mar.',
    respuesta: true,
    explicacion: 'A menor presión atmosférica (como en las montañas), el punto de ebullición del agua disminuye, por lo que hierve a menor temperatura y más rápido.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 5,
    texto: 'Hay más átomos en un vaso de agua que vasos de agua en todos los océanos del mundo.',
    respuesta: true,
    explicacion: 'Un vaso de agua contiene aproximadamente 8.36 x 10^24 moléculas de agua, mientras que se estima que hay aproximadamente 1.37 x 10^21 vasos de agua en todos los océanos.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'dificil',
  },
  {
    id: 6,
    texto: 'La luz tarda 8 minutos en llegar del Sol a la Tierra.',
    respuesta: true,
    explicacion: 'La velocidad de la luz es de aproximadamente 300,000 km/s. La distancia promedio entre el Sol y la Tierra es de 149.6 millones de km, por lo que la luz tarda unos 8 minutos y 20 segundos.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'facil',
  },
  {
    id: 7,
    texto: 'Los rayos X fueron descubiertos accidentalmente.',
    respuesta: true,
    explicacion: 'Wilhelm Röntgen descubrió los rayos X en 1895 mientras experimentaba con tubos de rayos catódicos, notando que una pantalla fluorescente brillaba sin estar directamente expuesta.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 8,
    texto: 'El oro es el metal más pesado del mundo.',
    respuesta: false,
    explicacion: 'El osmio es el metal más denso conocido, con una densidad de 22.6 g/cm³, mientras que el oro tiene 19.3 g/cm³.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 9,
    texto: 'Los láseres pueden crear hologramas tridimensionales que flotan en el aire.',
    respuesta: true,
    explicacion: 'Tecnologías recientes como los hologramas de plasma inducido por láser pueden crear imágenes 3D visibles en el aire usando pulsos láser de alta frecuencia.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'dificil',
  },
  {
    id: 10,
    texto: 'El ADN humano es 99.9% idéntico entre todas las personas.',
    respuesta: true,
    explicacion: 'Todos los humanos compartimos el 99.9% de nuestro código genético. Las diferencias que nos hacen únicos representan solo el 0.1% del ADN.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },

  // HISTORIA
  {
    id: 11,
    texto: 'Cleopatra era de etnia egipcia.',
    respuesta: false,
    explicacion: 'Cleopatra pertenecía a la dinastía ptolemaica, de ascendencia griega macedonia. Aunque gobernó Egipto, no era de origen egipcio.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'medio',
  },
  {
    id: 12,
    texto: 'Napoleón era más bajo que el promedio de los hombres de su época.',
    respuesta: false,
    explicacion: 'Napoleón medía aproximadamente 1.70 metros, que era la estatura promedio para los hombres franceses de su época. El mito de su baja estatura proviene de una confusión entre las unidades de medida francesas e inglesas.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'medio',
  },
  {
    id: 13,
    texto: 'La Gran Muralla China es visible desde el espacio a simple vista.',
    respuesta: false,
    explicacion: 'Aunque es muy larga, la Gran Muralla es demasiado estrecha para ser visible desde el espacio sin ayuda óptica. Este es un mito común.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'facil',
  },
  {
    id: 14,
    texto: 'La Primera Guerra Mundial duró más de 4 años.',
    respuesta: true,
    explicacion: 'La Primera Guerra Mundial comenzó el 28 de julio de 1914 y terminó el 11 de noviembre de 1918, durando aproximadamente 4 años y 3 meses.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'facil',
  },
  {
    id: 15,
    texto: 'Los vikingos usaban cascos con cuernos en batalla.',
    respuesta: false,
    explicacion: 'No hay evidencia arqueológica de que los vikingos usaran cascos con cuernos. Esta imagen fue popularizada por las óperas del siglo XIX y el arte moderno.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'medio',
  },
  {
    id: 16,
    texto: 'La Torre de Pisa siempre ha estado inclinada.',
    respuesta: false,
    explicacion: 'La Torre de Pisa comenzó a inclinarse durante su construcción en el siglo XII debido a una base inestable. No fue diseñada para estar inclinada.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'medio',
  },
  {
    id: 17,
    texto: 'Einstein nunca ganó el Premio Nobel de Física por la teoría de la relatividad.',
    respuesta: true,
    explicacion: 'Einstein ganó el Premio Nobel de Física en 1921 por su explicación del efecto fotoeléctrico, no por la teoría de la relatividad, que era demasiado controvertida en ese momento.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'dificil',
  },
  {
    id: 18,
    texto: 'La guerra más corta de la historia duró menos de una hora.',
    respuesta: true,
    explicacion: 'La Guerra Anglo-Zanzibariana de 1896 duró aproximadamente 38 minutos, convirtiéndola en la guerra más corta registrada.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'medio',
  },

  // NATURALEZA
  {
    id: 19,
    texto: 'Hay más árboles en la Tierra que estrellas en nuestra galaxia, la Vía Láctea.',
    respuesta: true,
    explicacion: 'Se estima que hay aproximadamente 3 billones de árboles en la Tierra, mientras que la Vía Láctea tiene entre 100-400 mil millones de estrellas.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'medio',
  },
  {
    id: 20,
    texto: 'La miel nunca se echa a perder.',
    respuesta: true,
    explicacion: 'La miel tiene propiedades antibacterianas naturales y un pH bajo, lo que la hace prácticamente inmune al deterioro. Se han encontrado vasijas con miel comestible en tumbas egipcias de hace miles de años.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'facil',
  },
  {
    id: 21,
    texto: 'Los plátanos crecen en árboles.',
    respuesta: false,
    explicacion: 'Los plátanos crecen en grandes plantas herbáceas que pueden alcanzar hasta 7 metros de altura, pero técnicamente no son árboles ya que no tienen tronco leñoso.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'medio',
  },
  {
    id: 22,
    texto: 'Los camaleones cambian de color principalmente para camuflarse.',
    respuesta: false,
    explicacion: 'El cambio de color de los camaleones está más relacionado con su estado de ánimo, la temperatura, la comunicación con otros camaleones y el estrés, más que con el camuflaje.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'medio',
  },
  {
    id: 23,
    texto: 'Los pulpos tienen tres corazones.',
    respuesta: true,
    explicacion: 'Los pulpos tienen tres corazones: dos bombean sangre a las branquias y uno bombea sangre al resto del cuerpo. Cuando un pulpo nada, el corazón que bombea al cuerpo se detiene.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'medio',
  },
  {
    id: 24,
    texto: 'Las fresas no son bayas, pero los plátanos sí.',
    respuesta: true,
    explicacion: 'Botánicamente, las fresas son frutos agregados (no bayas), mientras que los plátanos son bayas verdaderas porque tienen semillas dentro de la pulpa.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'dificil',
  },
  {
    id: 25,
    texto: 'Los koalas tienen huellas dactilares únicas.',
    respuesta: true,
    explicacion: 'Los koalas tienen huellas dactilares que son prácticamente indistinguibles de las humanas, incluso bajo un microscopio electrónico.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'medio',
  },
  {
    id: 26,
    texto: 'El 70% de la superficie de la Tierra está cubierta por agua.',
    respuesta: true,
    explicacion: 'Aproximadamente el 71% de la superficie terrestre está cubierta por océanos y mares, mientras que solo el 29% es tierra firme.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'facil',
  },
  {
    id: 27,
    texto: 'El Monte Everest es la montaña más alta del mundo desde la base hasta la cima.',
    respuesta: false,
    explicacion: 'Aunque el Monte Everest tiene la mayor altitud sobre el nivel del mar, el Mauna Kea en Hawái es más alto desde su base en el fondo del océano hasta su cima (más de 10,000 metros).',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'dificil',
  },

  // CULTURA POP
  {
    id: 28,
    texto: 'El logo de Apple fue inspirado por la manzana que mordió Alan Turing.',
    respuesta: false,
    explicacion: 'Aunque es una teoría popular, no hay evidencia de que el logo de Apple esté relacionado con Alan Turing. El logo fue diseñado por Rob Janoff en 1977.',
    categoria: CATEGORIES.CULTURA_POP,
    dificultad: 'medio',
  },
  {
    id: 29,
    texto: 'Mickey Mouse fue la primera creación de Walt Disney.',
    respuesta: false,
    explicacion: 'Antes de Mickey Mouse, Walt Disney creó a Oswald the Lucky Rabbit en 1927. Mickey Mouse apareció por primera vez en 1928.',
    categoria: CATEGORIES.CULTURA_POP,
    dificultad: 'medio',
  },
  {
    id: 30,
    texto: 'El primer videojuego comercial fue Pong.',
    respuesta: true,
    explicacion: 'Pong, lanzado por Atari en 1972, fue el primer videojuego comercialmente exitoso y ayudó a establecer la industria de los videojuegos.',
    categoria: CATEGORIES.CULTURA_POP,
    dificultad: 'facil',
  },
  {
    id: 31,
    texto: 'El nombre original de Twitter era "twttr".',
    respuesta: true,
    explicacion: 'Twitter comenzó como "twttr" (sin vocales) en 2006, inspirado por Flickr, antes de cambiar a "Twitter" en 2007.',
    categoria: CATEGORIES.CULTURA_POP,
    dificultad: 'medio',
  },
  {
    id: 32,
    texto: 'El primer mensaje de texto fue enviado en 1992.',
    respuesta: true,
    explicacion: 'El primer SMS fue enviado el 3 de diciembre de 1992 por el ingeniero Neil Papworth desde una computadora a un teléfono móvil. El mensaje decía "Feliz Navidad".',
    categoria: CATEGORIES.CULTURA_POP,
    dificultad: 'medio',
  },

  // GEOGRAFIA
  {
    id: 33,
    texto: 'Rusia es más grande que todo el continente de África.',
    respuesta: false,
    explicacion: 'Rusia es el país más grande del mundo con aproximadamente 17 millones de km², pero África tiene aproximadamente 30 millones de km², casi el doble.',
    categoria: CATEGORIES.GEOGRAFIA,
    dificultad: 'medio',
  },
  {
    id: 34,
    texto: 'Canadá tiene más lagos que todos los demás países del mundo juntos.',
    respuesta: true,
    explicacion: 'Canadá tiene más de 2 millones de lagos, lo que representa aproximadamente el 60% de todos los lagos del mundo.',
    categoria: CATEGORIES.GEOGRAFIA,
    dificultad: 'medio',
  },
  {
    id: 35,
    texto: 'El punto más bajo de la Tierra está en la Fosa de las Marianas.',
    respuesta: true,
    explicacion: 'La Fosa de las Marianas en el Océano Pacífico alcanza una profundidad de aproximadamente 11,034 metros, el punto más profundo conocido en la Tierra.',
    categoria: CATEGORIES.GEOGRAFIA,
    dificultad: 'facil',
  },
  {
    id: 36,
    texto: 'Finlandia tiene más saunas que coches.',
    respuesta: true,
    explicacion: 'Se estima que hay aproximadamente 3.3 millones de saunas en Finlandia, mientras que hay alrededor de 2.5 millones de coches registrados.',
    categoria: CATEGORIES.GEOGRAFIA,
    dificultad: 'medio',
  },
  {
    id: 37,
    texto: 'El desierto más grande del mundo es el Sáhara.',
    respuesta: false,
    explicacion: 'El desierto más grande del mundo es la Antártida, que técnicamente es un desierto polar con muy poca precipitación.',
    categoria: CATEGORIES.GEOGRAFIA,
    dificultad: 'medio',
  },

  // ANIMALES
  {
    id: 38,
    texto: 'Los elefantes son los únicos mamíferos que no pueden saltar.',
    respuesta: false,
    explicacion: 'Aunque los elefantes adultos no pueden saltar, tampoco pueden hacerlo otros mamíferos grandes como los rinocerontes y los hipopótamos.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'medio',
  },
  {
    id: 39,
    texto: 'Los tiburones pueden detectar una gota de sangre a 1 kilómetro de distancia.',
    respuesta: true,
    explicacion: 'Los tiburones tienen un sentido del olfato extremadamente desarrollado y pueden detectar concentraciones muy pequeñas de sangre en el agua, aunque la distancia exacta varía según la especie y las condiciones.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'facil',
  },
  {
    id: 40,
    texto: 'Las jirafas tienen el mismo número de vértebras en el cuello que los humanos.',
    respuesta: true,
    explicacion: 'Tanto las jirafas como los humanos tienen 7 vértebras cervicales, solo que las de las jirafas son mucho más largas.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'medio',
  },
  {
    id: 41,
    texto: 'Los perros solo ven en blanco y negro.',
    respuesta: false,
    explicacion: 'Los perros pueden ver colores, aunque de manera limitada. Ven principalmente en tonos de azul y amarillo, pero no pueden distinguir entre rojo y verde.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'facil',
  },
  {
    id: 42,
    texto: 'Las hormigas nunca duermen.',
    respuesta: false,
    explicacion: 'Las hormigas sí duermen, aunque en períodos muy cortos y frecuentes. Una hormiga obrera puede tomar cientos de "siestas" de aproximadamente un minuto cada una al día.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'medio',
  },
  {
    id: 43,
    texto: 'Los pingüinos solo viven en la Antártida.',
    respuesta: false,
    explicacion: 'Aunque los pingüinos están asociados con la Antártida, también viven en otras regiones del hemisferio sur, incluyendo Sudáfrica, Nueva Zelanda, Australia y las Islas Galápagos.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'facil',
  },
  {
    id: 44,
    texto: 'Los delfines tienen nombres propios.',
    respuesta: true,
    explicacion: 'Los estudios han demostrado que los delfines usan silbidos únicos que funcionan como nombres propios, permitiéndoles identificarse y llamarse entre sí.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'medio',
  },

  // MITOS
  {
    id: 45,
    texto: 'Las murciélagos son ciegos.',
    respuesta: false,
    explicacion: 'Aunque los murciélagos usan la ecolocalización como método principal de navegación, no son ciegos. Pueden ver y muchos tienen buena visión, especialmente durante el día.',
    categoria: CATEGORIES.MITOS,
    dificultad: 'facil',
  },
  {
    id: 46,
    texto: 'Los toros se enfurecen con el color rojo.',
    respuesta: false,
    explicacion: 'Los toros son daltónicos y no pueden distinguir el rojo. Reaccionan al movimiento de la capa, no a su color.',
    categoria: CATEGORIES.MITOS,
    dificultad: 'facil',
  },
  {
    id: 47,
    texto: 'Se necesitan 7 años para digerir un chicle si se traga.',
    respuesta: false,
    explicacion: 'Aunque el chicle no se digiere completamente, no permanece en el estómago durante 7 años. Pasa a través del sistema digestivo como cualquier otro alimento no digerible.',
    categoria: CATEGORIES.MITOS,
    dificultad: 'facil',
  },
  {
    id: 48,
    texto: 'Los humanos tienen 5 sentidos.',
    respuesta: false,
    explicacion: 'Los humanos tienen más de 5 sentidos. Además de vista, oído, tacto, olfato y gusto, tenemos equilibrio (vestibular), propiocepción (posición corporal), termocepción (temperatura) y más.',
    categoria: CATEGORIES.MITOS,
    dificultad: 'medio',
  },

  // TECNOLOGIA
  {
    id: 49,
    texto: 'El primer correo electrónico fue enviado en 1971.',
    respuesta: true,
    explicacion: 'Ray Tomlinson envió el primer correo electrónico en 1971 usando ARPANET. También fue quien eligió el símbolo @ para separar el nombre del usuario del dominio.',
    categoria: CATEGORIES.TECNOLOGIA,
    dificultad: 'medio',
  },
  {
    id: 50,
    texto: 'El primer iPhone tenía más capacidad de procesamiento que la computadora que llevó al hombre a la Luna.',
    respuesta: true,
    explicacion: 'El Apollo Guidance Computer tenía aproximadamente 64KB de memoria, mientras que el iPhone original tenía 128MB de RAM y un procesador mucho más potente.',
    categoria: CATEGORIES.TECNOLOGIA,
    dificultad: 'medio',
  },
  {
    id: 51,
    texto: 'El código QR fue inventado en Japón.',
    respuesta: true,
    explicacion: 'El código QR (Quick Response) fue inventado en 1994 por Masahiro Hara de la compañía japonesa Denso Wave para rastrear vehículos durante la fabricación.',
    categoria: CATEGORIES.TECNOLOGIA,
    dificultad: 'medio',
  },
  {
    id: 52,
    texto: 'Internet fue diseñado originalmente para sobrevivir a un ataque nuclear.',
    respuesta: true,
    explicacion: 'ARPANET, el precursor de Internet, fue desarrollado por el Departamento de Defensa de EE.UU. con el objetivo de crear una red de comunicaciones que pudiera sobrevivir a un ataque nuclear.',
    categoria: CATEGORIES.TECNOLOGIA,
    dificultad: 'medio',
  },

  // COMIDA
  {
    id: 53,
    texto: 'Las zanahorias mejoran la visión nocturna.',
    respuesta: false,
    explicacion: 'Aunque las zanahorias contienen vitamina A que es importante para la visión, el mito de que mejoran la visión nocturna fue una propaganda británica durante la Segunda Guerra Mundial para ocultar su uso de radar.',
    categoria: CATEGORIES.COMIDA,
    dificultad: 'medio',
  },
  {
    id: 54,
    texto: 'El chocolate es tóxico para los perros.',
    respuesta: true,
    explicacion: 'El chocolate contiene teobromina, que es tóxica para los perros y otros animales. Puede causar vómitos, diarrea, convulsiones e incluso la muerte en casos graves.',
    categoria: CATEGORIES.COMIDA,
    dificultad: 'facil',
  },
  {
    id: 55,
    texto: 'La piña es una fruta que madura después de ser cortada.',
    respuesta: false,
    explicacion: 'A diferencia de muchas frutas, las piñas no continúan madurando después de ser cosechadas. Deben ser recogidas cuando están maduras.',
    categoria: CATEGORIES.COMIDA,
    dificultad: 'medio',
  },
  {
    id: 56,
    texto: 'El café es una fruta.',
    respuesta: true,
    explicacion: 'Los granos de café son en realidad las semillas de una fruta llamada cereza de café. El grano que tostamos es la semilla dentro de la fruta.',
    categoria: CATEGORIES.COMIDA,
    dificultad: 'medio',
  },
  {
    id: 57,
    texto: 'El queso es el alimento más robado del mundo.',
    respuesta: true,
    explicacion: 'Según estudios, el queso es el alimento más robado del mundo, representando aproximadamente el 4% de todo el queso vendido anualmente.',
    categoria: CATEGORIES.COMIDA,
    dificultad: 'medio',
  },

  // DEPORTES
  {
    id: 58,
    texto: 'El fútbol fue inventado en Inglaterra.',
    respuesta: false,
    explicacion: 'Aunque Inglaterra estandarizó las reglas modernas del fútbol en 1863, versiones de juegos similares existen desde hace miles de años en diferentes culturas, incluyendo China, Grecia y Mesoamérica.',
    categoria: CATEGORIES.DEPORTES,
    dificultad: 'medio',
  },
  {
    id: 59,
    texto: 'El baloncesto fue inventado por un profesor de educación física canadiense.',
    respuesta: true,
    explicacion: 'James Naismith, un profesor de educación física canadiense, inventó el baloncesto en 1891 en Springfield, Massachusetts, mientras trabajaba en la YMCA.',
    categoria: CATEGORIES.DEPORTES,
    dificultad: 'facil',
  },
  {
    id: 60,
    texto: 'El maratón tiene exactamente 42.195 kilómetros porque esa era la distancia desde Maratón hasta Atenas.',
    respuesta: false,
    explicacion: 'El maratón moderno de 42.195 km fue establecido en los Juegos Olímpicos de Londres 1908. La distancia original histórica era aproximadamente 40 km, pero se ajustó para que la familia real pudiera ver la salida desde el palacio.',
    categoria: CATEGORIES.DEPORTES,
    dificultad: 'dificil',
  },

  // Más preguntas variadas
  {
    id: 61,
    texto: 'El 99% de todas las especies que han existido en la Tierra están extintas.',
    respuesta: true,
    explicacion: 'Se estima que más del 99% de todas las especies que han existido en la Tierra están ahora extintas. Solo una pequeña fracción de la vida que ha existido aún vive.',
    categoria: CATEGORIES.NATURALEZA,
    dificultad: 'medio',
  },
  {
    id: 62,
    texto: 'Los humanos tienen más bacterias en el cuerpo que células humanas.',
    respuesta: true,
    explicacion: 'Se estima que el número de bacterias en el cuerpo humano es aproximadamente igual o ligeramente mayor que el número de células humanas, con una proporción de aproximadamente 1:1.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 63,
    texto: 'El alfabeto hawaiano solo tiene 12 letras.',
    respuesta: true,
    explicacion: 'El alfabeto hawaiano (ʻōlelo Hawaiʻi) tiene solo 12 letras: A, E, I, O, U, H, K, L, M, N, P, W, más la ʻokina (glotal stop).',
    categoria: CATEGORIES.CULTURA_POP,
    dificultad: 'dificil',
  },
  {
    id: 64,
    texto: 'Los peces tienen memoria de solo 3 segundos.',
    respuesta: false,
    explicacion: 'Este es un mito común. Los estudios han demostrado que los peces pueden tener recuerdos que duran meses o incluso años. Los peces de colores, por ejemplo, pueden recordar cosas durante meses.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'facil',
  },
  {
    id: 65,
    texto: 'El cuerpo humano produce suficiente electricidad para encender una bombilla pequeña.',
    respuesta: true,
    explicacion: 'El cuerpo humano genera aproximadamente 100 watts de energía eléctrica, lo suficiente para encender una bombilla LED de bajo consumo.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
  {
    id: 66,
    texto: 'Los canguros no pueden caminar hacia atrás.',
    respuesta: true,
    explicacion: 'Debido a la estructura de sus patas y cola, los canguros no pueden caminar hacia atrás. Por esta razón, el canguro aparece en el escudo de armas de Australia como símbolo de progreso.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'medio',
  },
  {
    id: 67,
    texto: 'El océano Pacífico contiene más de la mitad del agua de todos los océanos del mundo.',
    respuesta: true,
    explicacion: 'El Océano Pacífico es el más grande del mundo y contiene aproximadamente el 50.1% del agua de todos los océanos, más que todos los demás océanos juntos.',
    categoria: CATEGORIES.GEOGRAFIA,
    dificultad: 'medio',
  },
  {
    id: 68,
    texto: 'Los tiburones han existido por más tiempo que los árboles.',
    respuesta: true,
    explicacion: 'Los tiburones aparecieron hace aproximadamente 400 millones de años, mientras que los primeros árboles aparecieron hace unos 350 millones de años.',
    categoria: CATEGORIES.ANIMALES,
    dificultad: 'medio',
  },
  {
    id: 69,
    texto: 'El 90% de todos los seres humanos que han existido están muertos.',
    respuesta: true,
    explicacion: 'Se estima que aproximadamente 108 mil millones de humanos han vivido en la Tierra, y actualmente viven alrededor de 7-8 mil millones, lo que significa que aproximadamente el 93% están muertos.',
    categoria: CATEGORIES.HISTORIA,
    dificultad: 'medio',
  },
  {
    id: 70,
    texto: 'Los dientes humanos son más duros que el acero.',
    respuesta: false,
    explicacion: 'Aunque el esmalte dental es muy duro, el acero es generalmente más duro. El esmalte tiene una dureza de aproximadamente 5 en la escala de Mohs, mientras que el acero puede tener hasta 7.5.',
    categoria: CATEGORIES.CIENCIA,
    dificultad: 'medio',
  },
];

// Función para obtener una pregunta aleatoria
export const getRandomQuestion = (categoriaFiltrada = null, dificultadFiltrada = null) => {
  let filtered = VERDADERO_FALSO_QUESTIONS;
  
  if (categoriaFiltrada) {
    filtered = filtered.filter(q => q.categoria === categoriaFiltrada);
  }
  
  if (dificultadFiltrada) {
    filtered = filtered.filter(q => q.dificultad === dificultadFiltrada);
  }
  
  if (filtered.length === 0) {
    filtered = VERDADERO_FALSO_QUESTIONS;
  }
  
  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
};

// Función para obtener preguntas por categoría
export const getQuestionsByCategory = (categoria) => {
  return VERDADERO_FALSO_QUESTIONS.filter(q => q.categoria === categoria);
};

// Función para obtener todas las categorías disponibles
export const getAllCategories = () => {
  return Object.values(CATEGORIES);
};

// Función para obtener preguntas por dificultad
export const getQuestionsByDifficulty = (dificultad) => {
  return VERDADERO_FALSO_QUESTIONS.filter(q => q.dificultad === dificultad);
};

// Función para obtener el total de preguntas
export const getTotalQuestions = () => {
  return VERDADERO_FALSO_QUESTIONS.length;
};

