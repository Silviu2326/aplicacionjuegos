# Crítico de Cine Absurdo

# Crítico de Cine Absurdo

**Categoría: **Juego social de improvisación

## Descripción General del Juego

Crítico de Cine Absurdo es un hilarante party game diseñado para desatar la creatividad y las dotes de actuación de los jugadores. El objetivo es simple pero desafiante: convertirse en el crítico de cine más convincente y original, improvisando reseñas para películas que no existen y que tienen los títulos más ridículos imaginables. Ideal para 3 o más jugadores, cada ronda pone a un participante en el papel del 'Crítico'. La aplicación genera un título de película completamente absurdo, como 'La Rebelión de los Semáforos Melancólicos'. El crítico de turno tiene un tiempo limitado (por ejemplo, 90 segundos) para inventar sobre la marcha una sinopsis coherente y una crítica apasionada, divertida o profunda para esta 'obra maestra'. El resto de los jugadores, la 'Audiencia', escuchan atentamente y, al final, puntúan la actuación basándose en la creatividad, el humor, la elocuencia y la capacidad de persuasión. El juego premia la rapidez mental y la originalidad, convirtiendo cada partida en un espectáculo único de comedia improvisada. Quien acumule más puntos al final de las rondas se corona como el Crítico de Cine Absurdo definitivo.

## Instrucciones Paso a Paso

1. 1. **Configuración del Juego:** Los jugadores se unen a una sala. El anfitrión configura el número de rondas y el tiempo por turno.
1. 2. **Inicio de Ronda:** La aplicación designa aleatoriamente al primer jugador como el 'Crítico de Cine'.
1. 3. **Generación de Título:** El 'Crítico' pulsa un botón para generar un título de película único y absurdo que se muestra a todos los jugadores.
1. 4. **Fase de Improvisación:** Inmediatamente después de ver el título, se inicia un temporizador visible en la pantalla. El 'Crítico' debe improvisar una sinopsis y una crítica de la 'película'. Debe hablar de la trama, los personajes, la dirección, y dar su veredicto final (por ejemplo, 'dos pulgares arriba' o 'una pérdida de tiempo cósmica').
1. 5. **Fase de Votación:** Una vez que el tiempo del 'Crítico' se agota, los demás jugadores ('La Audiencia') acceden a una pantalla de votación. De forma secreta, cada uno puntúa la actuación del crítico en una escala de 1 a 5 estrellas.
1. 6. **Cálculo de Puntuación:** La aplicación calcula el promedio de las estrellas recibidas y lo suma a la puntuación total del 'Crítico'.
1. 7. **Cambio de Turno:** El rol de 'Crítico de Cine' pasa al siguiente jugador en la lista.
1. 8. **Fin del Juego:** El juego continúa hasta que se completan todas las rondas preestablecidas. El jugador con la puntuación más alta al final es declarado ganador.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego 'Crítico de Cine Absurdo' está encapsulada dentro de una única carpeta dedicada llamada 'critico-cine-absurdo' para garantizar la modularidad y evitar conflictos con otros juegos. El proyecto utiliza React Native con Expo y aprovecha Expo Router para una navegación basada en archivos dentro de la carpeta '/games/critico-cine-absurdo/app'. La gestión del estado global del juego (jugadores, puntuaciones, estado actual, título generado) se centraliza mediante Zustand en un único store. Se sigue una estricta separación de responsabilidades: la lógica de la interfaz de usuario reside en los componentes (carpeta 'components'), la lógica de negocio y el estado en el 'store', y los datos estáticos como los fragmentos de títulos en la carpeta 'constants'.

### Archivos Necesarios

- /games/critico-cine-absurdo/app/_layout.js
- /games/critico-cine-absurdo/app/index.js
- /games/critico-cine-absurdo/app/critico-cine-absurdo-juego.js
- /games/critico-cine-absurdo/app/critico-cine-absurdo-resultados.js
- /games/critico-cine-absurdo/components/CriticoCineAbsurdoTituloGenerado.js
- /games/critico-cine-absurdo/components/CriticoCineAbsurdoTemporizador.js
- /games/critico-cine-absurdo/components/CriticoCineAbsurdoPanelVotacion.js
- /games/critico-cine-absurdo/components/CriticoCineAbsurdoTablaPuntuaciones.js
- /games/critico-cine-absurdo/components/CriticoCineAbsurdoAvatarJugador.js
- /games/critico-cine-absurdo/store/criticoCineAbsurdoStore.js
- /games/critico-cine-absurdo/constants/CriticoCineAbsurdoFragmentos.js
- /games/critico-cine-absurdo/utils/criticoCineAbsurdoGeneradorTitulos.js
- /games/critico-cine-absurdo/assets/images/critico-cine-absurdo-logo.png
- /games/critico-cine-absurdo/assets/sounds/critico-cine-absurdo-timer.mp3
### Componentes React Native

- **CriticoCineAbsurdoTituloGenerado**: Componente de UI que muestra de forma destacada el título de la película generado para la ronda actual.
- **CriticoCineAbsurdoTemporizador**: Un componente visual que muestra una cuenta regresiva, indicando al crítico cuánto tiempo le queda para su improvisación.
- **CriticoCineAbsurdoPanelVotacion**: Interfaz que se muestra a la 'Audiencia' al final de un turno. Permite a cada jugador emitir su voto (por ejemplo, mediante un sistema de estrellas seleccionables).
- **CriticoCineAbsurdoTablaPuntuaciones**: Un componente que muestra la lista de jugadores y sus puntuaciones acumuladas en tiempo real, actualizándose después de cada ronda.
- **CriticoCineAbsurdoAvatarJugador**: Muestra el nombre y avatar de un jugador, e indica visualmente quién es el 'Crítico' de turno.
### División Funcional

La funcionalidad se divide claramente: La **UI**, manejada por componentes de React Native, es puramente presentacional y reacciona a los cambios de estado. La **lógica del juego** y la **gestión de estado** están centralizadas en el store de Zustand ('criticoCineAbsurdoStore.js'), que gestiona el flujo del juego, los turnos, las puntuaciones y la generación de títulos a través de funciones de utilidad ('criticoCineAbsurdoGeneradorTitulos.js'). La **navegación** entre la pantalla de inicio, el juego principal y la pantalla de resultados es gestionada por Expo Router, permitiendo una transición fluida entre las diferentes fases del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- El Aguacate Vengador y la Tostada Cuántica
- Mi Vecino es un Gnomo Ninja en Pijama
- La Rebelión de los Semáforos Melancólicos
- Sinfonía para un Cactus Solitario en Marte
- Los Calcetines Perdidos del Espacio-Tiempo
- Ataque de la Aspiradora Intergaláctica con Sentimientos
- El Filósofo que Hablaba con las Palomas Mutantes
- Crónicas de una Silla de Oficina Descontenta
- El Misterio del Wi-Fi Embrujado
- La Peligrosa Aventura del Último Post-it del Mundo
## Notas y Personalizaciones

- **Modo por Géneros:** Antes de generar el título, la app asigna un género cinematográfico aleatorio (ej: 'Comedia Romántica', 'Terror Psicológico', 'Musical de los 80') que el crítico debe respetar en su reseña.
- **Modo con 'Elemento Clave':** Además del título, se genera un objeto aleatorio (ej: 'un clip', 'una botella de ketchup', 'un patito de goma') que debe ser un elemento central e indispensable en la trama improvisada.
- **Crítica en Dúo:** Dos jugadores son elegidos como críticos y deben improvisar la reseña juntos, alternándose frases o construyendo la historia de forma colaborativa.
- **Votación por Categorías:** En lugar de una puntuación única, la audiencia vota en categorías específicas como 'Creatividad', 'Humor' y 'Actuación', otorgando puntos por cada una y permitiendo diferentes tipos de ganadores.
- **Modo 'Palabras Prohibidas':** La app muestra 3 palabras aleatorias que el crítico tiene terminantemente prohibido usar durante su improvisación, añadiendo un desafío de agilidad mental.
