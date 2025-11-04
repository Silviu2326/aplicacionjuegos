# Tabú por Equipos

# Tabú por Equipos

**Categoría: **Juego social de palabras

## Descripción General del Juego

Tabú por Equipos es un emocionante juego de palabras diseñado para grupos, ideal para fiestas y reuniones sociales, que requiere un mínimo de 4 jugadores divididos en dos equipos. El objetivo principal es que tu equipo acumule la mayor cantidad de puntos adivinando palabras clave. En cada turno, un jugador de un equipo, el 'dador de pistas', tomará el dispositivo móvil y verá una tarjeta con una palabra a adivinar y una lista de cinco palabras 'tabú' estrechamente relacionadas. El reto consiste en describir la palabra clave a sus compañeros de equipo sin mencionar ninguna de las palabras prohibidas, ni formas derivadas de ellas (por ejemplo, si 'coche' es tabú, no se puede decir 'conducir'). Cada ronda está cronometrada, añadiendo una presión divertida al juego. Si el equipo adivina correctamente, suma un punto. Si el dador de pistas comete un error y dice una palabra tabú, se resta un punto. Al finalizar el tiempo, el móvil se pasa al equipo contrario, que comenzará su propia ronda. El juego continúa alternando turnos hasta que se completen todas las rondas preestablecidas, momento en el que se declara ganador al equipo con la puntuación más alta.

## Instrucciones Paso a Paso

1. 1. Inicio y Configuración: Al abrir el juego, los jugadores se dividen en un mínimo de dos equipos. En la pantalla de configuración, introducen los nombres de cada equipo y establecen las reglas de la partida: número de rondas y duración del tiempo por ronda (ej. 60, 90, 120 segundos).
1. 2. Comienzo de la Ronda: Un jugador del 'Equipo 1' inicia la partida. Sostiene el móvil de forma que su equipo no pueda ver la pantalla.
1. 3. La Tarjeta de Juego: En la pantalla aparecerá una tarjeta con la palabra a adivinar en la parte superior y una lista de 5 palabras 'tabú' debajo. El cronómetro comienza la cuenta atrás.
1. 4. Dar Pistas: El jugador debe describir la palabra principal a sus compañeros de equipo de forma creativa y rápida, evitando a toda costa usar las palabras tabú.
1. 5. Acciones en el Juego:
1.    - Botón 'Acierto' (Verde): Si el equipo adivina la palabra, el jugador pulsa este botón. Se suma un punto al marcador del equipo y aparece una nueva tarjeta instantáneamente.
1.    - Botón 'Tabú' (Rojo): Si el jugador dice accidentalmente una palabra prohibida, debe pulsar este botón. Se resta un punto y se pasa a la siguiente tarjeta. El equipo contrario debe estar atento para señalar los errores.
1.    - Botón 'Pasar' (Amarillo): Si el jugador se queda atascado, puede pulsar este botón para saltar la tarjeta actual y recibir una nueva. Dependiendo de la configuración, esto puede o no restar un punto.
1. 6. Fin del Tiempo: Cuando el cronómetro llega a cero, una alarma suena, la ronda termina y la pantalla se bloquea. Se muestra un resumen de los puntos obtenidos en esa ronda.
1. 7. Cambio de Turno: El jugador del 'Equipo 1' pasa el dispositivo móvil a un jugador del 'Equipo 2'.
1. 8. Continuación: El 'Equipo 2' juega su ronda siguiendo los mismos pasos (del 3 al 6). El juego continúa, alternando entre equipos, hasta que se haya completado el número de rondas definido.
1. 9. Fin del Juego: Una vez finalizada la última ronda, la aplicación muestra una pantalla final de resultados, declarando al equipo con la puntuación más alta como el ganador.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego 'Tabú por Equipos' está encapsulada dentro de una única carpeta dedicada llamada 'tabu-por-equipos', garantizando que todos sus archivos estén organizados y no entren en conflicto con otros juegos. El proyecto utiliza React Native con Expo, y la navegación entre pantallas se gestiona mediante Expo Router. El estado global de la partida (puntuaciones, equipo actual, tiempo restante, etc.) se centraliza usando un gestor de estado como Zustand, lo que permite un flujo de datos predecible y eficiente. La estructura sigue un principio claro de separación de responsabilidades: la lógica del juego reside en el store, la UI se divide en componentes reutilizables y pantallas específicas, y los datos estáticos como las palabras y los assets (sonidos, imágenes) se mantienen en sus propias carpetas.

### Archivos Necesarios

- /games/tabu-por-equipos/app/_layout.js
- /games/tabu-por-equipos/app/tabu-equipos-setup.js
- /games/tabu-por-equipos/app/tabu-equipos-game.js
- /games/tabu-por-equipos/app/tabu-equipos-round-summary.js
- /games/tabu-por-equipos/app/tabu-equipos-results.js
- /games/tabu-por-equipos/components/TabuEquiposCard.js
- /games/tabu-por-equipos/components/TabuEquiposTimer.js
- /games/tabu-por-equipos/components/TabuEquiposScoreboard.js
- /games/tabu-por-equipos/components/TabuEquiposControls.js
- /games/tabu-por-equipos/store/tabuEquiposStore.js
- /games/tabu-por-equipos/constants/TabuEquiposCards.js
- /games/tabu-por-equipos/assets/sounds/correct.mp3
- /games/tabu-por-equipos/assets/sounds/taboo.mp3
- /games/tabu-por-equipos/assets/sounds/times_up.mp3
### Componentes React Native

- TabuEquiposCard: Componente visual que muestra la palabra a adivinar y la lista de palabras tabú. Es el elemento central de la pantalla de juego.
- TabuEquiposTimer: Muestra una cuenta atrás visual (circular o en barra) para la ronda actual. Desencadena el final del turno cuando llega a cero.
- TabuEquiposScoreboard: Un componente simple que muestra las puntuaciones actuales de los equipos. Se puede reutilizar en la pantalla de juego y en las de resumen/resultados.
- TabuEquiposControls: Contiene los botones interactivos del juego ('Acierto', 'Tabú', 'Pasar'), manejando la interacción del usuario durante la ronda.
- tabu-equipos-setup.js (Pantalla): Pantalla inicial donde los jugadores configuran la partida, introduciendo nombres de equipos y ajustando reglas como el tiempo por ronda.
- tabu-equipos-game.js (Pantalla): La pantalla principal donde se desarrolla el juego. Integra los componentes Card, Timer, Scoreboard y Controls.
- tabu-equipos-results.js (Pantalla): Pantalla final que se muestra al terminar todas las rondas, anunciando el equipo ganador y el desglose de la puntuación final.
### División Funcional

La funcionalidad se divide en capas claras: la capa de UI (componentes de React Native y pantallas de Expo Router) se encarga de la presentación y la captura de eventos del usuario. La capa de gestión de estado (Zustand store en 'tabuEquiposStore.js') contiene toda la lógica del juego: gestiona el mazo de tarjetas, actualiza las puntuaciones, controla el estado del temporizador, cambia de turno y maneja la lógica de aciertos y errores. La capa de datos ('TabuEquiposCards.js') proporciona el contenido del juego (las palabras) de forma aislada, facilitando su actualización o expansión. Finalmente, la capa de assets ('/assets') almacena recursos estáticos como los efectos de sonido para las acciones del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- {"palabra": "GUITARRA", "tabu": ["Cuerdas", "Música", "Tocar", "Rock", "Eléctrica"]}
- {"palabra": "CAFÉ", "tabu": ["Taza", "Beber", "Mañana", "Leche", "Desayuno"]}
- {"palabra": "PELÍCULA", "tabu": ["Cine", "Actor", "Ver", "Director", "Cámara"]}
- {"palabra": "LIBRO", "tabu": ["Leer", "Páginas", "Autor", "Capítulo", "Biblioteca"]}
- {"palabra": "PLAYA", "tabu": ["Arena", "Mar", "Sol", "Olas", "Bañador"]}
- {"palabra": "HOSPITAL", "tabu": ["Médico", "Enfermera", "Enfermo", "Cama", "Operación"]}
- {"palabra": "ORDENADOR", "tabu": ["Pantalla", "Teclado", "Ratón", "Internet", "Programa"]}
## Notas y Personalizaciones

- Mazos Temáticos: Permitir a los jugadores elegir entre diferentes categorías de tarjetas, como 'Cine y TV', 'Deportes', 'Ciencia', 'Para Niños', etc.
- Modo de Juego Alternativo 'Pasa la Bomba': Una variante donde el objetivo es no tener el móvil en la mano cuando el tiempo se agote. El tiempo de cada turno es aleatorio y corto.
- Editor de Tarjetas: Implementar una función para que los usuarios puedan crear, guardar y compartir sus propios mazos de tarjetas personalizados.
- Ajustes de Penalización: Ofrecer opciones para configurar si el botón 'Pasar' resta puntos o si hay un límite de pases por ronda.
- Soporte para Más Equipos: Modificar la lógica para permitir partidas con 3 o 4 equipos en lugar de solo 2, ideal para grupos más grandes.
- Integración de Gestos: Utilizar gestos del acelerómetro del móvil para las acciones: inclinar hacia arriba para 'Acierto' e inclinar hacia abajo para 'Pasar', haciendo el juego más dinámico.
