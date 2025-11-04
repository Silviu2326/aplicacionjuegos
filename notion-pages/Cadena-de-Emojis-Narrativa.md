# Cadena de Emojis Narrativa

# Cadena de Emojis Narrativa

**Categoría: **Juego social

## Descripción General del Juego

Cadena de Emojis Narrativa es un juego social y creativo diseñado para grupos de 3 o más jugadores, ideal para fiestas o reuniones. El objetivo es construir colaborativamente una historia coherente utilizando únicamente emojis como guía visual. La partida comienza cuando un jugador selecciona un emoji y narra el inicio de una historia basada en él. El siguiente jugador debe continuar la trama añadiendo un nuevo emoji a la secuencia. Sin embargo, el verdadero desafío reside en la memoria y la creatividad: antes de poder añadir su propio emoji, cada jugador está obligado a narrar la historia completa desde el primer emoji hasta el último añadido por el jugador anterior. Esto crea una narrativa acumulativa que se vuelve cada vez más compleja y divertida de recordar y contar. El juego pone a prueba la imaginación de los participantes para conectar visualmente conceptos dispares y su habilidad para mantener la coherencia de un relato en constante evolución. Gana la ronda el grupo que logre crear la historia más memorable, o se puede jugar de forma abierta hasta que la cadena de emojis alcance una longitud predeterminada o hasta que un jugador no pueda recordar la secuencia narrativa correctamente.

## Instrucciones Paso a Paso

1. Paso 1: Iniciar el juego. Un jugador crea una sala de juego y comparte el código con los demás participantes para que se unan. Una vez que todos están en la sala, el juego selecciona aleatoriamente al jugador que comenzará la historia.
1. Paso 2: El primer turno. El primer jugador ve una pantalla vacía y un selector de emojis. Elige un emoji para dar comienzo a la historia (ej: 🧑‍🚀). A continuación, narra en voz alta o escribe una breve frase que establezca la escena: 'Había una vez un astronauta solitario...'.
1. Paso 3: El segundo turno. El turno pasa al siguiente jugador. Este jugador verá el primer emoji (🧑‍🚀). Su tarea es, primero, repetir la narración del jugador anterior ('Había una vez un astronauta solitario...') y luego añadir su propio emoji para continuar la historia (ej: ➡️ 🚀). Tras añadirlo, debe expandir la narración: '...que abordó su cohete listo para explorar la galaxia'.
1. Paso 4: Continuar la cadena. El turno pasa al tercer jugador, que ahora ve la secuencia '🧑‍🚀🚀'. Debe narrar la historia completa desde el principio: 'Había una vez un astronauta solitario que abordó su cohete listo para explorar la galaxia...'. Después, añade su emoji (ej: ➡️ 🪐) y continúa la historia: '...y su primer destino fue un extraño planeta anillado'.
1. Paso 5: El desafío de la memoria. El juego continúa de esta manera, con cada jugador recitando la narrativa completa de la cadena de emojis antes de añadir el suyo. La historia se vuelve más larga y detallada, y el reto de recordarla aumenta.
1. Paso 6: Fin del juego. El juego puede terminar de varias maneras: (a) Cuando se alcanza un número predefinido de emojis en la cadena (ej: 15 emojis). (b) Si un jugador no puede recordar correctamente la historia o se queda atascado. (c) Los jugadores pueden votar para decidir que la historia ha llegado a una conclusión satisfactoria. Al final, se muestra la cadena de emojis completa y la narración final construida por el grupo.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está encapsulado en su propia carpeta dedicada, '/games/cadena-de-emojis-narrativa/', para asegurar la modularidad y evitar conflictos con otros juegos. La arquitectura se basa en React Native con Expo, utilizando Expo Router para la navegación entre pantallas (configuración, juego principal y resumen). Para la gestión del estado global del juego (como la lista de emojis, el jugador actual y los participantes), se utiliza un gestor de estado ligero como Zustand, centralizando toda la lógica en un único 'store'. La estructura sigue un principio claro de separación de responsabilidades: la carpeta 'app' contiene las pantallas, 'components' aloja los componentes de UI reutilizables, 'store' maneja la lógica de estado, 'constants' define valores fijos y 'assets' guarda recursos como imágenes y fuentes.

### Archivos Necesarios

- /games/cadena-de-emojis-narrativa/app/_layout.js
- /games/cadena-de-emojis-narrativa/app/index.js
- /games/cadena-de-emojis-narrativa/app/cadena-emojis-juego.js
- /games/cadena-de-emojis-narrativa/app/cadena-emojis-resumen.js
- /games/cadena-de-emojis-narrativa/components/CadenaEmojisVisor.js
- /games/cadena-de-emojis-narrativa/components/CadenaEmojisSelector.js
- /games/cadena-de-emojis-narrativa/components/CadenaEmojisPanelJugador.js
- /games/cadena-de-emojis-narrativa/components/CadenaEmojisInputNarracion.js
- /games/cadena-de-emojis-narrativa/store/cadenaEmojisStore.js
- /games/cadena-de-emojis-narrativa/constants/cadenaEmojisConstants.js
- /games/cadena-de-emojis-narrativa/assets/images/icono-cadena-emojis.png
### Componentes React Native

- CadenaEmojisVisor: Componente visual que renderiza la secuencia actual de emojis en el centro de la pantalla. Es un scrollview horizontal que permite a los jugadores revisar la historia visual construida hasta el momento.
- CadenaEmojisSelector: Un modal o panel que se activa durante el turno de un jugador. Muestra un teclado de emojis completo para que el usuario pueda buscar y seleccionar el próximo emoji que añadirá a la cadena.
- CadenaEmojisPanelJugador: Muestra información sobre el estado del juego, como el nombre y avatar del jugador cuyo turno es, junto con instrucciones claras como 'Narra la historia y elige tu emoji'.
- CadenaEmojisInputNarracion: (Opcional, para modo texto) Un componente de entrada de texto donde el jugador actual puede escribir su parte de la narración, que se asocia con el emoji que ha añadido.
### División Funcional

La funcionalidad se divide en capas claras: la capa de UI (en '/components') se encarga exclusivamente de la presentación y la interacción del usuario, sin contener lógica de negocio. La capa de Lógica y Estado (en '/store' y las pantallas de '/app') gestiona las reglas del juego: quién es el siguiente jugador, cómo se añade un emoji a la cadena y cómo se valida el progreso del juego. Expo Router gestiona la navegación entre la pantalla de inicio, la pantalla de juego y la pantalla de resumen final. Las constantes (en '/constants') almacenan configuraciones como el número máximo de jugadores o el límite de emojis, manteniendo el código limpio y fácil de configurar.

## Ejemplos de Preguntas o Contenido Personalizado

- Cadena Ejemplo 1: 🕵️‍♀️ → 🗺️ → 🏛️ → 🗝️ → 📜. Narrativa: 'Una intrépida detective (🕵️‍♀️) encontró un mapa antiguo (🗺️). El mapa la llevó a unas ruinas olvidadas (🏛️), donde descubrió una llave oxidada (🗝️) que abría un cofre conteniendo un pergamino secreto (📜)...'
- Cadena Ejemplo 2: 🧑‍🌾 → 🌱 → ☀️ → 🌧️ → 🍎. Narrativa: 'Un granjero (🧑‍🌾) plantó una pequeña semilla (🌱). Con la ayuda del sol (☀️) y la lluvia (🌧️), la semilla creció hasta convertirse en un árbol que dio una manzana roja y brillante (🍎)...'
- Cadena Ejemplo 3: 👩‍💻 → 💡 → ☕ → 🌙 → ✅. Narrativa: 'Una programadora estaba trabajando en un problema difícil (👩‍💻) cuando de repente tuvo una gran idea (💡). Se preparó mucho café (☕) y trabajó toda la noche (🌙) hasta que finalmente, el código funcionó a la perfección (✅)...'
- Cadena Ejemplo 4: 🐱 → 🧶 → 🛋️ → 💤. Narrativa: 'Un gato juguetón (🐱) encontró un ovillo de lana (🧶). Después de enredarlo por todo el sofá (🛋️), cayó profundamente dormido, agotado por sus travesuras (💤)...'
## Notas y Personalizaciones

- Modo Temático: Antes de empezar, los jugadores eligen una categoría (ej: 'Fantasía', 'Terror', 'Ciencia Ficción'). Todos los emojis y la narrativa deben ajustarse a ese tema, lo que añade una capa de restricción creativa.
- Límite de Tiempo por Turno: Cada jugador dispone de un tiempo limitado (ej: 45 segundos) para narrar la historia y añadir su emoji. Si el tiempo se agota, pierde su turno o recibe una penalización.
- Modo 'Sin Repetir': Se prohíbe el uso de un mismo emoji más de una vez en toda la cadena, forzando a los jugadores a ser más creativos con sus elecciones.
- Narración por Audio: En lugar de escribir, los jugadores graban clips de audio cortos con su narración. Al final, la aplicación puede reproducir la historia completa con las voces de todos los jugadores.
- Ronda de Votación: Al final de la partida, los jugadores votan por 'La Mejor Conexión de Emoji', 'La Narración Más Divertida' o 'El Mejor Final de Historia', añadiendo un elemento competitivo amistoso.
