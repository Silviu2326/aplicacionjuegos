# Trivia de Emojis

# Trivia de Emojis

**Categoría: **Juego de trivia social

## Descripción General del Juego

Trivia de Emojis es un dinámico y entretenido juego social diseñado para fiestas, reuniones familiares o para pasar un buen rato con amigos. El objetivo principal es descifrar una combinación de emojis que representa el título de una película, una canción, un personaje, un lugar o un refrán popular. Se puede jugar de forma individual o dividiendo a los participantes en equipos para fomentar la colaboración y la competencia amistosa. La mecánica es sencilla: en cada ronda, la aplicación muestra en pantalla una secuencia de emojis. El primer jugador o equipo que adivine correctamente la frase oculta, grita la respuesta y gana un punto. El juego puede configurarse para terminar después de un número predefinido de rondas o cuando un equipo alcanza una puntuación objetivo. Su simplicidad lo hace accesible para todas las edades, mientras que el ingenio requerido para conectar los emojis con las respuestas lo convierte en un desafío constante y divertido que pone a prueba la creatividad y el conocimiento de la cultura popular.

## Instrucciones Paso a Paso

1. 1. Inicio y Configuración: Al abrir el juego, los jugadores eligen el modo de juego: individual o por equipos. Si es por equipos, introducen los nombres de los equipos.
1. 2. Selección de Categorías: Los jugadores pueden seleccionar las categorías que desean incluir en la partida (ej: Películas, Canciones, Refranes, Personajes).
1. 3. Comienzo del Juego: La partida comienza y la aplicación muestra la primera combinación de emojis en la pantalla, junto con la categoría a la que pertenece.
1. 4. Adivinar: Los jugadores o equipos debaten y piensan en la posible respuesta. El primer jugador o equipo que crea tener la respuesta correcta la dice en voz alta.
1. 5. Verificación y Puntuación: Un jugador designado como juez (o el propio equipo que responde) pulsa el botón 'Revelar Respuesta'. Si la respuesta fue correcta, se le asigna un punto al jugador/equipo correspondiente en la interfaz de la app.
1. 6. Siguiente Ronda: La aplicación avanza a la siguiente combinación de emojis, y el proceso se repite.
1. 7. Fin del Juego: El juego termina cuando se han completado todas las rondas preestablecidas o un equipo alcanza el límite de puntos.
1. 8. Pantalla de Resultados: Al finalizar, se muestra una pantalla con el marcador final, declarando al ganador.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está encapsulado en una carpeta dedicada llamada 'trivia-de-emojis' para asegurar la modularidad y evitar conflictos con otros juegos. La navegación entre pantallas (configuración, juego, resultados) se gestiona con Expo Router, definiendo las rutas dentro de la carpeta '/games/trivia-de-emojis/app/'. Para la gestión del estado global del juego (puntuaciones, ronda actual, temporizador, etc.), se utiliza un gestor de estado como Zustand o Redux Toolkit, cuyo store se encuentra en '/games/trivia-de-emojis/store/'. La arquitectura sigue un principio claro de separación de responsabilidades: los componentes de React Native (UI) son responsables de la presentación, la lógica del juego reside en el store y en las pantallas que lo consumen, y los datos estáticos como las preguntas y respuestas están en la carpeta 'constants'. Los recursos visuales y de audio se almacenan en 'assets'.

### Archivos Necesarios

- /games/trivia-de-emojis/app/_layout.js
- /games/trivia-de-emojis/app/index.js
- /games/trivia-de-emojis/app/trivia-de-emojis-juego.js
- /games/trivia-de-emojis/app/trivia-de-emojis-resultados.js
- /games/trivia-de-emojis/components/TriviaDeEmojisCard.js
- /games/trivia-de-emojis/components/TriviaDeEmojisScoreboard.js
- /games/trivia-de-emojis/components/TriviaDeEmojisAnswerModal.js
- /games/trivia-de-emojis/store/triviaDeEmojisStore.js
- /games/trivia-de-emojis/constants/TriviaDeEmojisData.js
- /games/trivia-de-emojis/assets/images/logoTriviaDeEmojis.png
- /games/trivia-de-emojis/assets/sounds/correctAnswer.mp3
### Componentes React Native

- TriviaDeEmojisCard.js: Componente principal que muestra la secuencia de emojis de la pregunta actual. Recibe los datos de la pregunta como props y los renderiza de forma atractiva y legible.
- TriviaDeEmojisScoreboard.js: Componente que muestra los nombres de los equipos o jugadores y sus puntuaciones actuales. Se actualiza automáticamente cada vez que cambia el estado en el store.
- TriviaDeEmojisAnswerModal.js: Un modal que se activa para mostrar la respuesta correcta después de cada ronda. Puede incluir botones para otorgar puntos al equipo correcto y para pasar a la siguiente pregunta.
- TriviaDeEmojisSetupScreen.js (definido en app/index.js): Pantalla inicial para configurar la partida, incluyendo la selección de número de equipos, sus nombres y las categorías a jugar.
- TriviaDeEmojisGameScreen.js (definido en app/trivia-de-emojis-juego.js): Pantalla principal del juego que integra el 'TriviaDeEmojisCard' y el 'TriviaDeEmojisScoreboard', gestionando el flujo de las rondas.
- TriviaDeEmojisResultsScreen.js (definido en app/trivia-de-emojis-resultados.js): Pantalla final que muestra al ganador y el desglose de la puntuación.
### División Funcional

La funcionalidad se divide en capas: la capa de UI (componentes en /components), responsable de renderizar la interfaz; la capa de presentación y navegación (pantallas en /app), que utiliza Expo Router para orquestar los componentes y las transiciones; la capa de lógica y estado (store en /store), que centraliza toda la lógica del juego (gestión de rondas, puntuaciones, selección de preguntas) usando Zustand para un manejo de estado reactivo y desacoplado; y la capa de datos (constantes en /constants), que almacena el contenido del juego (preguntas y respuestas) de forma aislada, facilitando su actualización.

## Ejemplos de Preguntas o Contenido Personalizado

- 👑🦁 - Película: El Rey León
- 🕷️👨➡️🕷️🌌 - Película: Spiderman: Un nuevo universo
- 🚗💨😡 - Saga: Fast & Furious (Rápidos y Furiosos)
- 👦⚡🏰 - Saga: Harry Potter
- 💃🐒 - Canción: Dance Monkey
- ☀️😎💃 - Canción: Despacito
- 🦐😴🌊➡️ - Refrán: Camarón que se duerme, se lo lleva la corriente
- ➕🐦🖐️💯 பறக்கும் - Refrán: Más vale pájaro en mano que ciento volando
- 💍🌋 - Película: El Señor de los Anillos
- 🧊🚢💔 - Película: Titanic
- 🎤⬇️ - Gesto: Mic drop
## Notas y Personalizaciones

- Modo Contrarreloj: Añadir un temporizador para cada pregunta. Si el tiempo se agota, nadie gana el punto y se pasa a la siguiente pregunta.
- Sistema de Pistas: Implementar un botón de 'Pista' que pueda revelar la categoría, el número de palabras en la respuesta o una letra al azar, a cambio de una penalización de puntos o de no poder ganar el punto completo.
- Categorías Personalizadas: Permitir a los usuarios crear sus propias listas de preguntas y respuestas con emojis, guardarlas y compartirlas con amigos.
- Modo 'Buzzer' Digital: En la pantalla de juego, cada equipo tiene un botón. El primero que lo presiona bloquea a los demás y tiene 10 segundos para dar su respuesta. Si falla, el otro equipo tiene una oportunidad.
- Niveles de Dificultad: Crear bancos de preguntas categorizados por dificultad (Fácil, Medio, Difícil) para adaptar el juego a diferentes públicos.
