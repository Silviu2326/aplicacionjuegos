# Ordena la Historia

# Ordena la Historia

**Categoría: **Juego social de comunicación y deducción

## Descripción General del Juego

Ordena la Historia es un juego de mesa cooperativo para móvil diseñado para 3 a 8 jugadores que pone a prueba la comunicación, la escucha activa y la deducción lógica. El objetivo principal es que el equipo de jugadores reconstruya una historia que ha sido dividida en fragmentos y desordenada. Al comenzar cada ronda, la aplicación reparte en secreto una única frase de la historia a cada participante. La clave del juego reside en la restricción principal: los jugadores no pueden leer sus frases en voz alta ni mostrar sus pantallas. En su lugar, deben describir el contenido, el tono, las palabras clave y el posible contexto de su fragmento. A través de la discusión y el razonamiento colectivo, el equipo debe colaborar para deducir el orden cronológico correcto de todos los fragmentos y así volver a ensamblar la narrativa completa. Es una carrera contra el tiempo que fomenta la creatividad en la comunicación y fortalece el trabajo en equipo, ideal para fiestas y reuniones.

## Instrucciones Paso a Paso

1. 1. **Crear o Unirse a una Partida:** Un jugador actúa como anfitrión, crea una sala de juego y comparte un código único. Los demás jugadores introducen este código para unirse a la sala.
1. 2. **Configuración de la Ronda:** El anfitrión selecciona un paquete de historias (ej: 'Misterio', 'Aventura', 'Comedia') y el nivel de dificultad, que generalmente determina el número de frases (y por tanto, de jugadores).
1. 3. **Reparto Secreto:** Una vez que la partida comienza, el sistema selecciona una historia al azar del paquete elegido, la divide en frases numeradas y asigna una única frase a cada jugador de forma secreta y aleatoria.
1. 4. **Fase de Comunicación (¡Sin Leer!):** Comienza una cuenta atrás. Cada jugador solo puede ver su propia frase. La regla de oro es no leer la frase textualmente. En su lugar, deben describirla. Por ejemplo, si la frase es 'El cohete despegó entre una nube de humo y fuego', el jugador podría decir: 'Mi frase parece el inicio de algo grande, es muy ruidosa, menciona un vehículo espacial y elementos como fuego y humo'.
1. 5. **Deducción y Debate:** Escuchando las descripciones de todos, el equipo debe debatir el flujo de la historia. Preguntas como '¿Quién cree que tiene el principio?', 'Mi frase menciona a un personaje que ya apareció, ¿alguien lo presentó?' o 'Esto suena como una consecuencia de lo que describiste tú' son clave para resolver el puzle.
1. 6. **Proponer el Orden:** Una vez que el equipo cree tener el orden correcto, lo establecen en la aplicación, asignando una posición (1º, 2º, 3º, etc.) a cada jugador.
1. 7. **La Revelación:** Con el orden fijado, la aplicación revela las frases una por una en la secuencia propuesta por el equipo, reconstruyendo la historia tal como la ordenaron.
1. 8. **Verificación y Puntuación:** La aplicación compara el orden del equipo con el correcto. Si aciertan, ¡ganan la ronda! Se pueden otorgar puntos basados en el tiempo restante. Si fallan, se muestra el orden correcto para que aprendan de sus errores.
1. 9. **Jugar de Nuevo:** El equipo puede optar por jugar otra ronda con una nueva historia.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código para 'Ordena la Historia' está encapsulada dentro de una única carpeta dedicada llamada 'ordena-la-historia', asegurando que todo su código, assets y lógica estén aislados de otros juegos. La estructura interna utiliza React Native con Expo Router para la gestión de rutas y navegación basada en archivos. Para el estado global del juego (jugadores, frases, estado de la partida, temporizador) se utiliza un gestor de estado como Zustand o Redux Toolkit. Se sigue un claro principio de separación de responsabilidades: la lógica del juego y el estado se manejan en el 'store', la interfaz de usuario se divide en pantallas ('app') y componentes reutilizables ('components'), y los datos estáticos como las historias y configuraciones se encuentran en 'constants'.

### Archivos Necesarios

- /games/ordena-la-historia/app/_layout.js
- /games/ordena-la-historia/app/index.js
- /games/ordena-la-historia/app/ordena-la-historia-lobby/[gameCode].js
- /games/ordena-la-historia/app/ordena-la-historia-game/[gameCode].js
- /games/ordena-la-historia/app/ordena-la-historia-results/[gameCode].js
- /games/ordena-la-historia/components/OrdenaLaHistoriaPlayerAvatar.js
- /games/ordena-la-historia/components/OrdenaLaHistoriaSentenceCard.js
- /games/ordena-la-historia/components/OrdenaLaHistoriaTimerDisplay.js
- /games/ordena-la-historia/components/OrdenaLaHistoriaFinalOrderList.js
- /games/ordena-la-historia/store/ordenaLaHistoriaStore.js
- /games/ordena-la-historia/constants/ordenaLaHistoriaStories.js
- /games/ordena-la-historia/assets/images/ordena-la-historia-icon.png
### Componentes React Native

- **OrdenaLaHistoriaLobbyScreen (/app/ordena-la-historia-lobby/[gameCode].js):** Pantalla donde los jugadores se unen a una partida. Muestra la lista de jugadores conectados y permite al anfitrión iniciar el juego.
- **OrdenaLaHistoriaGameScreen (/app/ordena-la-historia-game/[gameCode].js):** La pantalla principal de juego. Muestra al jugador su frase secreta en un componente 'OrdenaLaHistoriaSentenceCard', el temporizador y la lista de jugadores participantes. Es donde ocurre la fase de comunicación.
- **OrdenaLaHistoriaResultsScreen (/app/ordena-la-historia-results/[gameCode].js):** Se muestra al final de la ronda. Presenta la historia en el orden propuesto por los jugadores, indicando si es correcto o no, y luego muestra la versión correcta. También ofrece la opción de jugar otra ronda.
- **OrdenaLaHistoriaSentenceCard.js:** Un componente visualmente destacado que muestra la frase asignada al jugador. Podría tener un efecto de 'oculto' al principio y revelarse con un toque.
- **OrdenaLaHistoriaFinalOrderList.js:** Un componente interactivo (posiblemente con drag-and-drop) que permite a los jugadores establecer el orden final de los participantes antes de la revelación.
- **OrdenaLaHistoriaTimerDisplay.js:** Componente reutilizable que muestra la cuenta atrás durante la fase de comunicación, añadiendo tensión al juego.
### División Funcional

La funcionalidad se divide en capas claras: la **capa de UI** (en 'app' y 'components') se encarga exclusivamente de renderizar el estado del juego y capturar las interacciones del usuario. La **capa de estado y lógica** (en 'store/ordenaLaHistoriaStore.js') centraliza toda la lógica del juego: crear partidas, repartir frases, iniciar el temporizador, verificar el orden final y gestionar las transiciones entre las fases del juego (lobby, juego, resultados). La **capa de datos** (en 'constants') provee el contenido estático, como los paquetes de historias, desacoplando el contenido de la lógica del juego para facilitar su actualización y expansión.

## Ejemplos de Preguntas o Contenido Personalizado

- **Historia de Aventura (4 Frases):**|1. El viejo mapa, encontrado en el desván, mostraba una isla marcada con una X. |2. Tras una semana de navegación, avistaron tierra con una montaña en forma de calavera. |3. Dentro de una cueva oculta tras una cascada, encontraron un cofre de madera cubierto de algas. |4. Al abrirlo, en lugar de oro, encontraron un diario que revelaba un secreto familiar aún mayor.
- **Historia de Ciencia Ficción (5 Frases):**|1. La alarma de la nave 'Hyperion' sonó estridentemente, despertando a la tripulación de su crio-sueño. |2. En el monitor principal, un planeta desconocido que no figuraba en las cartas estelares giraba lentamente. |3. Una transmisión de origen desconocido, compuesta por patrones matemáticos complejos, comenzó a recibirse. |4. A pesar del riesgo, la capitana ordenó que una pequeña sonda de exploración descendiera a la superficie. |5. La sonda transmitió una sola imagen de una estructura artificial antes de que la comunicación se cortara abruptamente.
- **Historia de Comedia (3 Frases):**|1. Roberto decidió que impresionar a su cita cocinando una paella era una idea brillante. |2. Confundiendo el pimentón con el curry en polvo, creó un plato de un color y sabor indescriptibles. |3. Su cita, una chef galardonada, no pudo contener la risa pero le dio un 10 por el esfuerzo y le invitó a cenar fuera.
## Notas y Personalizaciones

- **Modo Traidor:** Un jugador recibe una frase que no pertenece a la historia. Su objetivo es convencer al grupo de que su frase encaja, saboteando el orden. El objetivo del grupo es ordenar la historia y descubrir al traidor.
- **Historias con Giro:** Crear historias donde el orden cronológico no es obvio o contiene un flashback. Por ejemplo, la última frase podría ser 'Pero todo esto había ocurrido diez años antes'.
- **Modo Rápido (Speed Mode):** Rondas con temporizadores mucho más cortos (ej: 60 segundos) para forzar una comunicación más rápida y, a menudo, más caótica y divertida.
- **Personalización de Historias:** Permitir a los usuarios escribir y guardar sus propias historias para jugar con amigos, creando anécdotas internas o chistes privados.
- **Variante sin Palabras:** Un modo experto donde los jugadores solo pueden describir su frase usando mímica o dibujos en un tiempo limitado, convirtiéndolo en una mezcla con juegos como Pictionary o Charadas.
- **Roles Especiales:** Asignar roles al azar con habilidades únicas, como 'El Ancla' (sabe que su frase es la primera o la última) o 'El Conector' (sabe con qué otro jugador se conecta su frase), pero sin saber el contenido de la otra.
