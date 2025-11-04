# Conexión Inesperada

# Conexión Inesperada

**Categoría: **Juego social de creatividad

## Descripción General del Juego

Conexión Inesperada es un juego social diseñado para desafiar la creatividad y el ingenio de los jugadores, ideal para grupos de 3 o más personas. El objetivo principal no es encontrar una respuesta correcta, sino la más original, divertida o convincente. En cada ronda, la aplicación presenta dos conceptos o personajes que, a primera vista, no tienen ninguna relación, como 'Un pulpo' y 'la Torre Eiffel'. A partir de ahí, cada jugador debe idear y escribir en secreto una conexión lógica, absurda o poética que una ambos conceptos. Una vez que todos han enviado sus propuestas, estas se muestran de forma anónima al grupo. Comienza entonces la fase de votación, donde cada jugador elige la conexión que le parece mejor, sin poder votar por la suya. El jugador cuya respuesta recibe más votos gana la ronda y acumula puntos. El juego fomenta el pensamiento lateral, el humor y la argumentación, convirtiéndose en una experiencia social dinámica y llena de sorpresas. Gana quien haya acumulado más puntos al final de un número preestablecido de rondas.

## Instrucciones Paso a Paso

1. 1. Inicio de la Partida: Un jugador crea una sala y comparte un código para que otros se unan.
1. 2. Comienzo de la Ronda: El juego muestra automáticamente dos conceptos aleatorios en la pantalla de todos los jugadores.
1. 3. Fase de Creación: Se activa un temporizador (ej. 90 segundos). Cada jugador debe escribir en secreto su conexión entre los dos conceptos y enviarla antes de que el tiempo se agote.
1. 4. Presentación de Respuestas: Una vez que todos los jugadores han enviado su conexión o el tiempo ha terminado, todas las respuestas se muestran en la pantalla de forma anónima y en orden aleatorio.
1. 5. Fase de Votación: Cada jugador lee las conexiones propuestas y vota por su favorita. No se puede votar por la propia respuesta. Un temporizador corto asegura que la votación sea rápida.
1. 6. Recuento de Votos y Puntuación: El juego revela cuántos votos recibió cada respuesta y quién fue el autor de cada una. El autor de la respuesta más votada gana puntos (ej. 100 puntos por voto recibido).
1. 7. Tabla de Puntuaciones: Se muestra la tabla de clasificación actualizada con las puntuaciones acumuladas de todos los jugadores.
1. 8. Siguiente Ronda: El juego pasa automáticamente a la siguiente ronda, presentando un nuevo par de conceptos.
1. 9. Fin del Juego: Después de un número de rondas definido al crear la partida (ej. 10 rondas), el juego termina y se declara ganador al jugador con la puntuación más alta.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego está completamente encapsulada dentro de una carpeta dedicada llamada 'conexion-inesperada' para garantizar la modularidad y evitar conflictos con otros juegos. Utiliza React Native con Expo Router para la navegación entre pantallas (lobby, partida, resultados). La gestión del estado global del juego (jugadores, puntuaciones, conceptos actuales, estado de la ronda) se maneja con Zustand para una implementación ligera y eficiente. La estructura sigue un principio de separación de responsabilidades: la UI se define en componentes reutilizables, la lógica de la partida reside en las pantallas y hooks personalizados, y los datos estáticos como las listas de conceptos están en archivos de constantes.

### Archivos Necesarios

- /games/conexion-inesperada/app/_layout.js
- /games/conexion-inesperada/app/index.js
- /games/conexion-inesperada/app/conexion-inesperada-partida.js
- /games/conexion-inesperada/app/conexion-inesperada-resultados.js
- /games/conexion-inesperada/components/ConexionInesperadaConceptPair.js
- /games/conexion-inesperada/components/ConexionInesperadaTimer.js
- /games/conexion-inesperada/components/ConexionInesperadaResponseInput.js
- /games/conexion-inesperada/components/ConexionInesperadaVotingCard.js
- /games/conexion-inesperada/components/ConexionInesperadaScoreboard.js
- /games/conexion-inesperada/store/useConexionInesperadaStore.js
- /games/conexion-inesperada/constants/ConexionInesperadaConceptList.js
- /games/conexion-inesperada/assets/images/conexion-inesperada-icon.png
### Componentes React Native

- ConexionInesperadaConceptPair: Componente que muestra los dos conceptos de la ronda actual, cada uno con su texto y una imagen representativa.
- ConexionInesperadaTimer: Un componente visual que muestra una cuenta regresiva para las fases de escritura y votación.
- ConexionInesperadaResponseInput: Un área de texto controlada donde el jugador escribe y envía su conexión.
- ConexionInesperadaVotingCard: Un componente reutilizable que muestra una de las respuestas anónimas y un botón para que el jugador emita su voto.
- ConexionInesperadaScoreboard: Muestra la lista de jugadores y sus puntuaciones actuales, actualizándose al final de cada ronda.
### División Funcional

La funcionalidad se divide en capas claras. La UI (User Interface) está en la carpeta '/components', con componentes específicos y nombrados para el juego. La Lógica del Juego se concentra en las pantallas de '/app' que orquestan el flujo de la partida (escritura -> votación -> resultados) y en hooks personalizados si es necesario. La Gestión de Estado se centraliza en '/store/useConexionInesperadaStore.js' (Zustand), que actúa como la única fuente de verdad para el estado de la partida. Los datos estáticos (listas de palabras, configuración) se encuentran en '/constants', y los recursos visuales y de audio en '/assets'.

## Ejemplos de Preguntas o Contenido Personalizado

- ['Un pingüino', 'La Mona Lisa']
- ['Un teléfono móvil de 1998', 'La velocidad de la luz']
- ['Drácula', 'Una ensalada César']
- ['Un agujero negro', 'Un par de calcetines desparejados']
- ['El Big Ben', 'Una galleta de la fortuna']
- ['Un fantasma', 'La conexión Wi-Fi']
- ['Cleopatra', 'Un dron de reparto']
- ['Un T-Rex', 'Un atasco de tráfico']
## Notas y Personalizaciones

- Modo 'Juez Rotativo': En lugar de una votación grupal, en cada ronda un jugador es designado como 'Juez' y tiene el poder exclusivo de elegir la conexión ganadora. El rol de juez rota en cada ronda.
- Paquetes de Conceptos Temáticos: Los jugadores pueden elegir jugar con paquetes de conceptos específicos (ej. 'Cine y Series', 'Ciencia y Tecnología', 'Historia Universal', 'Cultura Pop') para personalizar la experiencia.
- Modo 'Dibujo': Una variante donde los jugadores, en lugar de escribir, deben dibujar una imagen que represente su conexión. Los demás votan por el dibujo más ingenioso.
- Modo 'Cadena de Conexiones': El segundo concepto de una ronda se convierte en el primer concepto de la siguiente, creando una cadena temática a lo largo de la partida.
- Modo 'Conexión Inversa': Se da una conexión y los jugadores deben adivinar los dos conceptos originales que la inspiraron.
