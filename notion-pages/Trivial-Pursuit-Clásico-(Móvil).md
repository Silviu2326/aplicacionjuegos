# Trivial Pursuit Clásico (Móvil)

# Trivial Pursuit Clásico (Móvil)

**Categoría: **Juego de trivia, Juego de preguntas, Juego de mesa, Juego social

## Descripción General del Juego

Trivial Pursuit Clásico (Móvil) es la adaptación digital del icónico juego de mesa que pone a prueba tus conocimientos generales. El objetivo principal es ser el primer jugador en coleccionar los seis 'quesitos' de colores, cada uno representando una categoría diferente: Geografía (azul), Arte y Literatura (marrón), Historia (amarillo), Entretenimiento (rosa), Ciencias y Naturaleza (verde), y Deportes y Pasatiempos (naranja). Diseñado para 2 a 6 jugadores, el juego se desarrolla en un tablero circular virtual. Los jugadores lanzan un dado para mover su ficha y, dependiendo de la casilla en la que caigan, deben responder una pregunta de la categoría correspondiente. Si la respuesta es correcta en una casilla de 'quesito', obtienen la pieza de ese color. Una vez que un jugador ha recolectado los seis quesitos, debe dirigirse al centro del tablero para responder una pregunta final, cuya categoría será elegida por los oponentes. Acertar esta última pregunta te convierte en el ganador y demuestra que eres el que más sabe.

## Instrucciones Paso a Paso

1. Inicio del Juego: Los jugadores se unen a la partida y eligen un color para su ficha (peón). El orden de juego se determina aleatoriamente.
1. Lanzar el Dado: En su turno, el jugador activo toca el dado virtual para lanzarlo. El número obtenido indica cuántas casillas debe mover su ficha.
1. Mover la Ficha: El jugador elige una dirección y mueve su ficha el número exacto de casillas indicado por el dado.
1. Responder una Pregunta: La casilla en la que aterriza la ficha determina la categoría de la pregunta que se le formulará. El juego presenta la pregunta con múltiples opciones de respuesta.
1. Casillas de Categoría (Normales): Si el jugador responde correctamente, puede volver a lanzar el dado y continuar su turno. Si falla, el turno pasa al siguiente jugador.
1. Casillas de 'Quesito' (Grandes): Estas son las casillas especiales para ganar los quesitos. Si el jugador responde correctamente en una de estas casillas, gana el quesito del color correspondiente (si aún no lo tiene) y su turno termina. Si ya tiene ese quesito, se trata como una casilla normal y puede volver a tirar si acierta.
1. Casilla Central (El Cubo): Una vez que un jugador ha recolectado los 6 quesitos de diferentes colores, debe dirigirse a la casilla central.
1. Pregunta Final: Al llegar al centro, los demás jugadores eligen la categoría de la pregunta final. Si el jugador responde correctamente, gana la partida. Si falla, debe salir de la casilla central en su próximo turno e intentar volver para responder otra pregunta final.
1. Fin de la Partida: El primer jugador en coleccionar los 6 quesitos y responder correctamente a la pregunta final en el centro es declarado ganador.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está encapsulada dentro de una única carpeta dedicada llamada 'trivial-pursuit-clasico-movil' para garantizar la modularidad y evitar conflictos con otros juegos. El proyecto utiliza React Native con Expo, aprovechando Expo Router para la navegación entre pantallas (lobby, tablero de juego, pantalla de resultados). Para la gestión del estado global del juego (jugadores, posiciones, quesitos, pregunta actual), se utiliza Zustand, una solución ligera y eficiente. La estructura sigue un principio claro de separación de responsabilidades: los componentes de la interfaz de usuario (UI) se encuentran en la carpeta '/components', la lógica de negocio y el estado en '/store', las pantallas de navegación en '/app' y los recursos estáticos como imágenes y sonidos en '/assets'.

### Archivos Necesarios

- /games/trivial-pursuit-clasico-movil/app/_layout.js
- /games/trivial-pursuit-clasico-movil/app/index.js
- /games/trivial-pursuit-clasico-movil/app/trivial-pursuit-clasico-game.js
- /games/trivial-pursuit-clasico-movil/components/TrivialPursuitClasicoBoard.js
- /games/trivial-pursuit-clasico-movil/components/TrivialPursuitClasicoPlayerPawn.js
- /games/trivial-pursuit-clasico-movil/components/TrivialPursuitClasicoQuestionModal.js
- /games/trivial-pursuit-clasico-movil/components/TrivialPursuitClasicoDice.js
- /games/trivial-pursuit-clasico-movil/components/TrivialPursuitClasicoPlayerHUD.js
- /games/trivial-pursuit-clasico-movil/store/trivialPursuitClasicoStore.js
- /games/trivial-pursuit-clasico-movil/constants/TrivialPursuitClasicoCategories.js
- /games/trivial-pursuit-clasico-movil/data/TrivialPursuitClasicoQuestions.js
- /games/trivial-pursuit-clasico-movil/assets/images/trivial-pursuit-board.png
- /games/trivial-pursuit-clasico-movil/assets/sounds/trivial-pursuit-dice-roll.mp3
### Componentes React Native

- TrivialPursuitClasicoBoard: Componente principal que renderiza la imagen del tablero de juego y superpone las fichas de los jugadores en sus posiciones actuales. Gestiona la lógica de movimiento y la selección de casillas.
- TrivialPursuitClasicoPlayerPawn: Componente visual que representa la ficha de un jugador. Recibe como props su color y posición en el tablero.
- TrivialPursuitClasicoQuestionModal: Un modal que se activa al caer en una casilla. Muestra la pregunta, las opciones de respuesta y un temporizador. Devuelve si la respuesta seleccionada fue correcta o no.
- TrivialPursuitClasicoDice: Componente interactivo que muestra un dado. Al ser presionado, genera un número aleatorio del 1 al 6, mostrando una animación de lanzamiento.
- TrivialPursuitClasicoPlayerHUD: Interfaz de usuario (Head-Up Display) que muestra la información del jugador actual: nombre, avatar y los quesitos que ha recolectado, representados visualmente.
### División Funcional

La funcionalidad está segmentada para una mayor mantenibilidad. La UI, ubicada en '/components', es responsable únicamente de la presentación visual y de emitir eventos de usuario (ej: 'dado lanzado', 'respuesta seleccionada'). La lógica del juego, que incluye el manejo de turnos, el movimiento de fichas, la selección de preguntas, la validación de respuestas y la comprobación de condiciones de victoria, está centralizada en el store de Zustand ('/store/trivialPursuitClasicoStore.js'). Las pantallas de Expo Router ('/app') actúan como contenedores que conectan los componentes de la UI con el estado y la lógica del store, orquestando el flujo general de la aplicación.

## Ejemplos de Preguntas o Contenido Personalizado

- Geografía (Azul): ¿Cuál es la capital de Australia?
- Arte y Literatura (Marrón): ¿Quién escribió 'Cien años de soledad'?
- Historia (Amarillo): ¿En qué año cayó el Muro de Berlín?
- Entretenimiento (Rosa): ¿Qué actor interpretó a Jack Sparrow en la saga 'Piratas del Caribe'?
- Ciencias y Naturaleza (Verde): ¿Cuál es el símbolo químico del oro?
- Deportes y Pasatiempos (Naranja): ¿Cuántos jugadores componen un equipo de baloncesto en la cancha?
## Notas y Personalizaciones

- Modo de Juego Rápido: Una variante donde los jugadores solo necesitan conseguir 3 o 4 quesitos para ganar, ideal para partidas más cortas.
- Ediciones Temáticas: Se pueden crear versiones con preguntas exclusivas de temas populares como 'Star Wars', 'El Señor de los Anillos' o 'Cultura Pop de los 90'.
- Preguntas con Tiempo Límite: Añadir un temporizador a cada pregunta para aumentar la dificultad y el ritmo del juego.
- Multijugador Online: Implementar un modo de juego en línea para competir contra amigos o jugadores de todo el mundo a través de internet.
- Dificultad Adaptativa: El juego podría ajustar la dificultad de las preguntas basándose en la tasa de aciertos de cada jugador.
- Paquetes de Preguntas Personalizados: Permitir a los usuarios crear y compartir sus propios paquetes de preguntas, ampliando la rejugabilidad.
