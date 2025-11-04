# Maestro del Acrónimo

# Maestro del Acrónimo

**Categoría: **Juego social y de creatividad

## Descripción General del Juego

Maestro del Acrónimo es un vibrante juego social diseñado para desatar la creatividad y el humor en cualquier reunión. El objetivo es simple pero desafiante: ser el jugador más ingenioso. Al comienzo de cada ronda, la aplicación genera un acrónimo aleatorio de 3 a 5 letras (por ejemplo, 'S.L.P.'). Cada participante, en un tiempo limitado, debe crear una frase coherente y original donde la primera letra de cada palabra coincida con las letras del acrónimo. Una vez que todos han enviado sus propuestas, estas se muestran de forma anónima en la pantalla. Es entonces cuando comienza la fase de votación, donde cada jugador vota por la frase que considera más divertida, inteligente o absurda (¡no se puede votar por la propia!). El jugador cuya frase recibe más votos gana la ronda y acumula puntos. Ideal para grupos de 2 a 10 jugadores, este juego es perfecto para romper el hielo, animar fiestas o simplemente pasar un buen rato con amigos y familiares, poniendo a prueba la rapidez mental y el sentido del humor de todos.

## Instrucciones Paso a Paso

1. Paso 1: Un jugador crea una sala de juego y comparte el código con los demás, quienes se unen introduciendo dicho código.
1. Paso 2: El anfitrión configura la partida: número de rondas (ej: 5, 10, 15) y tiempo límite por ronda para escribir la frase (ej: 60, 90 segundos).
1. Paso 3: Comienza la primera ronda. La aplicación muestra un acrónimo aleatorio para todos los jugadores (ej: 'C.P.V.').
1. Paso 4: Cada jugador escribe en secreto su frase correspondiente al acrónimo. Por ejemplo: 'Cangrejos Púrpuras Voladores'.
1. Paso 5: Cuando el tiempo se agota o todos los jugadores han enviado su frase, todas las propuestas se muestran en la pantalla de forma anónima.
1. Paso 6: Inicia la fase de votación. Cada jugador lee las frases y vota por su favorita (no puede votar por la suya).
1. Paso 7: Se revelan los resultados de la votación. El autor de la frase más votada gana la ronda y recibe puntos. Se muestra la tabla de puntuaciones actualizada.
1. Paso 8: Se inicia la siguiente ronda con un nuevo acrónimo.
1. Paso 9: Al finalizar la última ronda, se declara al 'Maestro del Acrónimo' al jugador con la puntuación más alta y se muestra el podio final.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está encapsulada dentro de una carpeta dedicada, '/games/maestro-del-acronimo/', para garantizar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo Router para la navegación entre pantallas, definiendo las rutas dentro de la carpeta '/games/maestro-del-acronimo/app/'. Para la gestión del estado global del juego (como el acrónimo actual, las frases de los jugadores, puntuaciones y el estado de la ronda) se emplea Zustand, con el store definido en un archivo específico para el juego. La estructura sigue un principio de separación de responsabilidades: los componentes de la UI son puros y se encargan de renderizar, la lógica del juego (generación de acrónimos, cálculo de puntos) se aísla en hooks o utils, y los assets (imágenes, sonidos) se almacenan en su propia carpeta.

### Archivos Necesarios

- /games/maestro-del-acronimo/app/_layout.js
- /games/maestro-del-acronimo/app/index.js
- /games/maestro-del-acronimo/app/maestro-del-acronimo-lobby.js
- /games/maestro-del-acronimo/app/maestro-del-acronimo-game.js
- /games/maestro-del-acronimo/app/maestro-del-acronimo-results.js
- /games/maestro-del-acronimo/components/MaestroDelAcronimoAcronymDisplay.js
- /games/maestro-del-acronimo/components/MaestroDelAcronimoPhraseInput.js
- /games/maestro-del-acronimo/components/MaestroDelAcronimoVotingCard.js
- /games/maestro-del-acronimo/components/MaestroDelAcronimoScoreboard.js
- /games/maestro-del-acronimo/components/MaestroDelAcronimoTimer.js
- /games/maestro-del-acronimo/store/maestroDelAcronimoStore.js
- /games/maestro-del-acronimo/constants/MaestroDelAcronimoConfig.js
- /games/maestro-del-acronimo/utils/maestroDelAcronimoGenerator.js
- /games/maestro-del-acronimo/assets/images/maestro-del-acronimo-icon.png
- /games/maestro-del-acronimo/assets/sounds/maestro-del-acronimo-round-start.mp3
### Componentes React Native

- MaestroDelAcronimoAcronymDisplay: Componente visual que muestra de forma destacada el acrónimo de la ronda actual.
- MaestroDelAcronimoPhraseInput: Un campo de texto controlado con un botón de envío para que los jugadores introduzcan sus frases. Incluye validación para asegurar que las palabras coinciden con el acrónimo.
- MaestroDelAcronimoVotingCard: Tarjeta interactiva que muestra una de las frases enviadas. Es seleccionable durante la fase de votación.
- MaestroDelAcronimoScoreboard: Componente que renderiza una lista o tabla con los nombres de los jugadores y sus puntuaciones acumuladas.
- MaestroDelAcronimoTimer: Un contador visual (circular o en barra) que muestra el tiempo restante para escribir la frase o para votar.
### División Funcional

La funcionalidad está segmentada para mejorar la mantenibilidad. La UI, en la carpeta /components, se compone de elementos reutilizables y específicos del juego que reciben datos a través de props. La lógica de negocio, como la generación de acrónimos aleatorios y la gestión de las rondas, reside en /utils y en hooks personalizados. La gestión del estado es centralizada en /store/maestroDelAcronimoStore.js (Zustand), que actúa como la única fuente de verdad para el estado del juego, facilitando la sincronización entre componentes. Las pantallas, gestionadas por Expo Router en /app, ensamblan estos componentes para construir las diferentes fases del juego (lobby, partida, resultados).

## Ejemplos de Preguntas o Contenido Personalizado

- A.M.P.
- R.S.V.P.
- T.Q.M.
- F.O.M.O.
- S.O.L.
- C.A.S.A.
- L.P.D.C.
- M.N.T.R.
- Q.U.E.S.O.
- V.R.D.D.
- P.A.T.O.
## Notas y Personalizaciones

- Modo Temático: Antes de empezar, los jugadores eligen una categoría (ej: 'Cine', 'Videojuegos', 'Comida'). El sistema generará acrónimos relacionados o los jugadores deberán crear frases que encajen en el tema.
- Modo 'Doble o Nada': En la última ronda, los jugadores pueden apostar sus puntos. Si ganan la ronda, duplican su puntuación total; si no, la pierden toda.
- Acrónimos personalizados: Permitir que el anfitrión de la partida introduzca sus propios acrónimos en lugar de usar los generados aleatoriamente.
- Sistema de Avatares: Los jugadores pueden elegir un avatar o subir una foto para personalizar su perfil en el juego.
- Modo 'Cadena de Palabras': En lugar de un acrónimo, se da una palabra. El siguiente jugador debe crear una frase donde cada palabra empiece con las letras de la palabra dada. Ej: 'CASA' -> 'Como Ayer Soplaba Aire...'
