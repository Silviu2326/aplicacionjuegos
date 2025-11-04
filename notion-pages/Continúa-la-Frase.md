# Continúa la Frase

# Continúa la Frase

**Categoría: **Juego social

## Descripción General del Juego

“Continúa la Frase” es un vibrante juego social diseñado para desatar la creatividad y el humor en cualquier reunión. Ideal para 3 o más jugadores, el objetivo es ser el más ingenioso del grupo. La premisa es simple: la aplicación presenta el inicio de una frase, un dilema o una situación, como 'Un superpoder inútil pero divertido sería...'. Cada jugador, por turnos y en secreto, debe escribir la continuación más original, divertida o absurda que se le ocurra. Una vez que todos han enviado sus respuestas, estas se muestran en pantalla de forma anónima. A continuación, se abre una fase de votación en la que cada participante elige la respuesta que más le ha gustado (sin poder votar la propia). El jugador cuya respuesta reciba más votos gana la ronda y suma puntos. El juego continúa a lo largo de varias rondas con nuevas y disparatadas frases. Al final, el jugador con la puntuación más alta es coronado como el rey o la reina del ingenio. Es el juego perfecto para romper el hielo, conocer mejor a tus amigos y garantizar carcajadas sin fin.

## Instrucciones Paso a Paso

1. Un jugador crea una partida y recibe un código único para compartir.
1. Los demás jugadores se unen a la partida introduciendo el código y su nombre.
1. Una vez que todos están en la sala, el anfitrión inicia el juego.
1. En la primera ronda, se muestra en pantalla el inicio de una frase para todos los jugadores.
1. Cada jugador tiene un tiempo limitado para escribir y enviar su continuación de la frase en secreto.
1. Cuando todos los jugadores han enviado su respuesta, la aplicación las muestra todas en pantalla de forma anónima y en orden aleatorio.
1. Se inicia la fase de votación. Cada jugador vota por la respuesta que considera la mejor, más divertida u original. No se puede votar por la propia respuesta.
1. Al finalizar la votación, se revelan los resultados: se muestra qué jugador escribió cada respuesta y cuántos votos recibió. Los jugadores ganan puntos en función de los votos obtenidos.
1. Se muestra la tabla de puntuaciones actualizada.
1. El juego avanza a la siguiente ronda con una nueva frase.
1. Después de un número predefinido de rondas, el juego termina y se declara al jugador con más puntos como el ganador final.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego está diseñada para ser modular y escalable dentro de un proyecto más grande. TODOS los archivos relacionados con 'Continúa la Frase' se encuentran encapsulados en una única carpeta dedicada llamada 'continua-la-frase'. La navegación entre pantallas se gestiona con Expo Router, ubicando las vistas principales en la subcarpeta 'app'. Se utiliza un gestor de estado como Zustand para manejar la lógica del juego de forma centralizada. La estructura sigue un principio claro de separación de responsabilidades: la UI se define en componentes reutilizables (en la carpeta 'components'), la lógica de estado y las acciones del juego residen en el store (carpeta 'store'), los datos estáticos como las frases se almacenan en la carpeta 'constants', y los recursos multimedia en 'assets'.

### Archivos Necesarios

- /games/continua-la-frase/app/index.js
- /games/continua-la-frase/app/continua-la-frase-lobby.js
- /games/continua-la-frase/app/continua-la-frase-game-screen.js
- /games/continua-la-frase/app/continua-la-frase-final-results.js
- /games/continua-la-frase/components/ContinuaLaFrasePromptDisplay.js
- /games/continua-la-frase/components/ContinuaLaFraseAnswerInput.js
- /games/continua-la-frase/components/ContinuaLaFraseVotingArea.js
- /games/continua-la-frase/components/ContinuaLaFrasePlayerList.js
- /games/continua-la-frase/components/ContinuaLaFraseScoreboard.js
- /games/continua-la-frase/store/continuaLaFraseStore.js
- /games/continua-la-frase/constants/continuaLaFrasePrompts.js
- /games/continua-la-frase/constants/continuaLaFraseGameConfig.js
- /games/continua-la-frase/assets/images/continua-la-frase-logo.png
### Componentes React Native

- ContinuaLaFraseLobby: Componente que gestiona la creación y unión a una partida. Incluye el formulario para introducir el código de la sala y el nombre del jugador.
- ContinuaLaFrasePromptDisplay: Muestra de forma destacada la frase inicial de la ronda actual. Recibe la frase como prop desde el estado del juego.
- ContinuaLaFraseAnswerInput: Un campo de texto y un botón de envío que permite a los jugadores escribir su continuación. Gestiona el estado local del input y llama a una acción del store al enviar.
- ContinuaLaFraseVotingArea: Renderiza una lista de las respuestas anónimas de la ronda. Permite al usuario seleccionar una para votar y deshabilita la opción de votar por la propia respuesta.
- ContinuaLaFraseRoundResultsModal: Un modal que aparece después de la votación, revelando el autor de cada respuesta y los puntos obtenidos en la ronda.
- ContinuaLaFrasePlayerList: Un componente de UI que muestra la lista de jugadores en la partida actual, junto con sus puntuaciones actualizadas en tiempo real.
- ContinuaLaFraseScoreboard: Componente final que se muestra al terminar el juego, presentando un podio o una lista ordenada de los jugadores y sus puntuaciones totales.
### División Funcional

La funcionalidad se divide en capas claras: la capa de UI (componentes en la carpeta `components`) es responsable de la presentación y la interacción del usuario. La capa de estado (el store de Zustand en `store/continuaLaFraseStore.js`) centraliza toda la lógica del juego: gestión de jugadores, progreso de rondas, envío de respuestas, cómputo de votos y actualización de puntuaciones. Las pantallas (archivos en `app`), orquestan los componentes de UI y los conectan con el store para mostrar los datos correctos y disparar acciones. La capa de datos (`constants`) provee la información estática, como los paquetes de frases, separando el contenido de la lógica.

## Ejemplos de Preguntas o Contenido Personalizado

- Lo peor que te pueden decir en una primera cita es...
- Si los animales pudieran hablar, lo primero que dirían los gatos sería...
- La excusa perfecta para llegar tarde es...
- Acabo de ganar la lotería. Lo primero que compro es...
- El título de mi autobiografía sería: 'La increíble historia de cómo...'
- En el apocalipsis zombie, mi arma secreta sería...
- Mi placer culposo secreto es comer...
- Si pudiera crear una ley que todos debieran seguir, sería...
- El nombre de mi banda de rock sería...
- Un nuevo sabor de helado que debería existir es...
## Notas y Personalizaciones

- Packs de Frases Temáticos: Ofrecer diferentes paquetes de frases que los jugadores puedan elegir antes de empezar (ej: 'Picante +18', 'Cultura Pop', 'Filosófico', 'Absurdo').
- Modo por Equipos: Los jugadores se dividen en dos o más equipos, y cada equipo debe consensuar una única respuesta por ronda para competir.
- Frases Personalizadas: Permitir al anfitrión o a los jugadores añadir sus propias frases iniciales antes de que comience la partida, haciéndola más personal.
- Rondas Relámpago: Introducir rondas especiales con un límite de tiempo mucho más corto para escribir y votar, añadiendo un extra de presión y caos.
- Modo Dibujo: Una variante donde, en lugar de escribir, los jugadores deben dibujar la continuación de la frase, y luego votar por el dibujo más divertido.
- Sistema de 'Me Gusta': Además del voto principal, permitir que los jugadores den 'me gusta' a otras respuestas que también les parecieron buenas, otorgando puntos extra menores.
