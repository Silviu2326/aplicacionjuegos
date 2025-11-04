# Cadáver Exquisito 2.0

# Cadáver Exquisito 2.0

**Categoría: **Juego social

## Descripción General del Juego

Cadáver Exquisito 2.0 es la adaptación digital del clásico juego de escritura surrealista, diseñado para grupos de 3 a 10 jugadores. El objetivo no es ganar, sino colaborar para crear una historia única, disparatada y tremendamente divertida. El juego funciona con una regla simple y fundamental: cada jugador añade una frase a la historia, pero solo puede ver la última frase escrita por el jugador anterior. La aplicación se encarga de ocultar todo el texto previo, generando un efecto de 'teléfono descompuesto' narrativo. Al final de la partida, cuando todos han aportado su granito de arena, la historia completa se revela, mostrando una secuencia de ideas desconectadas que, juntas, forman un relato hilarante e inesperado. Es el juego perfecto para fiestas, reuniones de amigos o cualquier situación donde se quiera romper el hielo y desatar la creatividad colectiva, garantizando risas al leer el resultado final. La versión 2.0 moderniza la experiencia eliminando la necesidad de papel y lápiz, y añade la posibilidad de guardar y compartir las creaciones más memorables.

## Instrucciones Paso a Paso

1. 1. Crear Partida: Un jugador (el anfitrión) inicia una nueva partida. En la pantalla de configuración, introduce los nombres de todos los participantes.
1. 2. Configuración Opcional: El anfitrión puede establecer un número máximo de rondas (cuántas frases aportará cada jugador) o sugerir un tema inicial para la historia.
1. 3. Comienza la Historia: El primer jugador recibe el móvil y escribe la frase inicial de la historia en el campo de texto. Una vez satisfecho, pulsa 'Confirmar'.
1. 4. Pasar el Móvil: Al confirmar, la pantalla se actualiza para el siguiente jugador. La aplicación oculta automáticamente la frase inicial y todo el texto anterior, mostrando únicamente la última frase que se acaba de escribir.
1. 5. Continuar la Cadena: El siguiente jugador lee la frase visible y escribe su continuación, basándose únicamente en esa pequeña porción de información. Este proceso se repite, pasando el móvil de jugador en jugador.
1. 6. Fin de la Partida: El juego concluye cuando se alcanza el número de rondas preestablecido o cuando el anfitrión decide finalizarlo manualmente.
1. 7. La Gran Revelación: Al terminar, la aplicación muestra la historia completa en una pantalla de resultados. Los jugadores pueden leer en voz alta el relato absurdo y colaborativo que han creado juntos.
1. 8. Guardar y Compartir: Opcionalmente, los jugadores pueden guardar la historia final como una imagen para compartirla con amigos o en redes sociales.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está encapsulado en una carpeta dedicada llamada 'cadaver-exquisito-2-0' para mantenerlo modular y aislado de otros juegos. La estructura interna sigue las convenciones de un proyecto React Native con Expo, utilizando Expo Router para la navegación entre pantallas (setup, juego, resultados). La gestión del estado global del juego (jugadores, frases, turno actual) se centraliza mediante un gestor de estado como Zustand o Redux Toolkit, en un archivo dedicado. Se aplica una clara separación de responsabilidades: los componentes de React Native en la carpeta '/components' se encargan de la UI, la lógica de juego reside en las pantallas y el store, y los recursos estáticos como imágenes o sonidos se encuentran en '/assets'. Todos los archivos y componentes llevan un prefijo o sufijo relacionado con 'CadaverExquisito' para evitar colisiones de nombres con otros juegos del proyecto.

### Archivos Necesarios

- /games/cadaver-exquisito-2-0/app/_layout.js
- /games/cadaver-exquisito-2-0/app/index.js
- /games/cadaver-exquisito-2-0/app/cadaver-exquisito-juego.js
- /games/cadaver-exquisito-2-0/app/cadaver-exquisito-resultados.js
- /games/cadaver-exquisito-2-0/components/CadaverExquisitoPlayerSetup.js
- /games/cadaver-exquisito-2-0/components/CadaverExquisitoTurnIndicator.js
- /games/cadaver-exquisito-2-0/components/CadaverExquisitoInputArea.js
- /games/cadaver-exquisito-2-0/components/CadaverExquisitoStoryReveal.js
- /games/cadaver-exquisito-2-0/store/cadaverExquisitoStore.js
- /games/cadaver-exquisito-2-0/constants/CadaverExquisitoGameConfig.js
- /games/cadaver-exquisito-2-0/assets/images/cadaver-exquisito-logo.png
### Componentes React Native

- CadaverExquisitoPlayerSetup: Componente utilizado en la pantalla inicial para que los jugadores introduzcan sus nombres y configuren la partida.
- CadaverExquisitoTurnIndicator: Muestra de forma prominente el nombre del jugador cuyo turno es, junto con una cuenta atrás o un indicador visual.
- CadaverExquisitoInputArea: El corazón de la pantalla de juego. Muestra la última frase visible y proporciona un campo de texto para que el jugador actual añada su contribución.
- CadaverExquisitoStoryReveal: Componente para la pantalla de resultados que muestra la historia completa, formateada para una fácil lectura y con la posibilidad de animar la aparición del texto línea por línea.
### División Funcional

La funcionalidad se divide en capas: la capa de UI (React Native Components en '/components') es responsable de la presentación y la captura de eventos del usuario. La capa de Estado (Zustand/Redux en '/store') centraliza todos los datos del juego y la lógica pura, como añadir una frase, pasar al siguiente jugador o finalizar el juego. La capa de Navegación (Expo Router en '/app') gestiona el flujo entre las diferentes pantallas de la aplicación (inicio, juego, fin). Las Constantes (en '/constants') definen parámetros fijos como el número mínimo de jugadores. Finalmente, los Assets (en '/assets') almacenan recursos visuales y de audio.

## Ejemplos de Preguntas o Contenido Personalizado

- Un día, el Sol decidió tomarse unas vacaciones y en su lugar apareció...
- El último dinosaurio no se extinguió, en realidad estaba escondido en...
- La fórmula secreta de la Coca-Cola contiene un ingrediente inesperado:...
- En lo profundo del bosque, había un árbol que susurraba secretos, y un día me dijo...
- Para mi sorpresa, cuando abrí la nevera, encontré a un gnomo que estaba...
- El verdadero motivo por el que los políticos discuten tanto es porque...
- Tema sugerido: Una reunión de superhéroes jubilados.
- Tema sugerido: El primer contacto con una civilización extraterrestre hecha de espaguetis.
## Notas y Personalizaciones

- Modo Dibujo: Permitir que una ronda sea de dibujos en lugar de texto. Cada jugador dibuja algo basándose en el borde del dibujo anterior.
- Modo Poesía: Forzar a los jugadores a escribir frases que rimen con la anterior, creando un poema colaborativo.
- Límite de Tiempo: Añadir un temporizador para cada turno para hacer el juego más rápido y espontáneo.
- Restricciones de Palabras: En cada turno, la app puede exigir que la frase incluya una palabra aleatoria específica, aumentando el desafío creativo.
- Galería de Historias: Una función para que los usuarios puedan guardar sus historias favoritas en una galería personal dentro de la app.
- Integración con IA: Una opción para que una IA genere la primera frase o participe como un 'jugador fantasma' con contribuciones impredecibles y lógicas.
