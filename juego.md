# Teléfono Descompuesto Visual

**Categoría:** Juego social de dibujo

## Descripción General del Juego

Teléfono Descompuesto Visual es un hilarante juego social multijugador diseñado para 3 o más participantes, ideal para fiestas y reuniones. El objetivo no es ganar, sino disfrutar del proceso creativo y de las divertidas e inesperadas transformaciones que se generan. La partida comienza cuando cada jugador recibe una palabra o frase secreta. Su primera tarea es dibujarla lo mejor que pueda en un lienzo digital. Una vez que todos han terminado, los 'cuadernos' virtuales se pasan al siguiente jugador de forma anónima. Este segundo jugador no ve la palabra original, solo el dibujo, y debe escribir lo que cree que representa. En la siguiente ronda, los cuadernos se vuelven a pasar, y el tercer jugador debe dibujar la frase que escribió el jugador anterior. Este ciclo de alternar entre dibujar y escribir continúa hasta que cada cuaderno ha pasado por todos los jugadores y regresa a su dueño original. El gran final consiste en revelar todas las secuencias, mostrando cómo una simple frase como 'un perro en un monopatín' puede transformarse en 'un monstruo peludo comiendo una rueda'.

## Instrucciones Paso a Paso

1. Paso 1: Crear o Unirse a una Partida. Un jugador actúa como anfitrión, crea una nueva sala de juego y comparte un código único con los demás.
2. Paso 2: Sala de Espera (Lobby). Los jugadores se unen a la sala usando el código. Aquí pueden ver a todos los participantes mientras el anfitrión configura las opciones (ej: límite de tiempo por turno, paquetes de palabras temáticos).
3. Paso 3: Inicio del Juego y Asignación. Una vez que el anfitrión inicia la partida, el sistema asigna secretamente a cada jugador una palabra o frase inicial de un banco de contenido.
4. Paso 4: Primera Ronda - Dibujar. Cada jugador ve su frase secreta y debe dibujarla en el lienzo digital. Disponen de herramientas como pinceles de diferentes grosores y colores.
5. Paso 5: Pase de Cuadernos. Cuando todos los jugadores han terminado su dibujo (o se acaba el tiempo), el juego 'pasa' automáticamente cada 'cuaderno' (el dibujo recién creado) al siguiente jugador en la ronda.
6. Paso 6: Segunda Ronda - Escribir. Cada jugador ahora ve un dibujo hecho por otro participante, sin conocer la frase original. Su tarea es escribir una descripción de lo que creen que es el dibujo.
7. Paso 7: Continuar el Ciclo. El proceso se repite. Los cuadernos se vuelven a pasar, y el siguiente jugador deberá dibujar la descripción recién escrita. El juego alterna entre dibujar y escribir.
8. Paso 8: Fin de las Rondas. El ciclo continúa hasta que cada cuaderno ha completado una vuelta por todos los jugadores.
9. Paso 9: La Gran Revelación. Al final de la partida, se muestran los resultados. Para cada cuaderno original, la aplicación revela la secuencia completa, paso a paso, mostrando la palabra inicial, el primer dibujo, la primera interpretación, el segundo dibujo, y así sucesivamente.
10. Paso 10: Votación y Final. Los jugadores pueden reaccionar a las secuencias y votar por sus favoritas (ej: 'la más divertida', 'el mejor dibujo'). Se muestra un resumen final antes de volver al lobby.

## Estructura de Archivos y Componentes en Expo con React Native

Todo el código del juego está encapsulado en una carpeta dedicada llamada 'telefono-descompuesto-visual' para asegurar modularidad y evitar conflictos con otros juegos. La navegación dentro del juego se gestiona con Expo Router, utilizando una estructura de archivos en el directorio '/app'. Para la gestión del estado global de la partida (jugadores, rondas, contenido de los cuadernos), se utiliza Zustand, centralizando la lógica en un único 'store'. La arquitectura sigue un principio de separación de responsabilidades: los componentes de UI (en '/components') son responsables de la presentación, la lógica del juego está contenida en hooks o servicios, y los assets (imágenes, sonidos, fuentes) se almacenan en '/assets'.

### Archivos Necesarios

- /games/telefono-descompuesto-visual/app/_layout.js
- /games/telefono-descompuesto-visual/app/index.js
- /games/telefono-descompuesto-visual/app/lobby.js
- /games/telefono-descompuesto-visual/app/game.js
- /games/telefono-descompuesto-visual/app/results.js
- /games/telefono-descompuesto-visual/components/TelefonoDescompuestoVisualCanvas.js
- /games/telefono-descompuesto-visual/components/TelefonoDescompuestoVisualInput.js
- /games/telefono-descompuesto-visual/components/TelefonoDescompuestoVisualResultsReel.js
- /games/telefono-descompuesto-visual/components/TelefonoDescompuestoVisualPlayerList.js
- /games/telefono-descompuesto-visual/components/TelefonoDescompuestoVisualTimer.js
- /games/telefono-descompuesto-visual/store/telefonoDescompuestoVisualStore.js
- /games/telefono-descompuesto-visual/constants/TelefonoDescompuestoVisualWords.js
- /games/telefono-descompuesto-visual/assets/icons/pencil.png
- /games/telefono-descompuesto-visual/assets/sounds/turn_complete.mp3

### Componentes React Native

- TelefonoDescompuestoVisualCanvas: Un componente clave que renderiza un lienzo de dibujo interactivo. Utiliza `react-native-svg` para capturar y mostrar los trazos del usuario. Incluye sub-componentes para seleccionar color, grosor de pincel, y botones para deshacer/rehacer.
- TelefonoDescompuestoVisualInput: Un componente que muestra el dibujo del jugador anterior y proporciona un campo de texto para que el jugador actual escriba su interpretación. Incluye un contador de caracteres y un botón de confirmación.
- TelefonoDescompuestoVisualResultsReel: Componente para la pantalla de resultados. Muestra una a una las secuencias completas de cada cuaderno, con una animación de scroll o carrusel que alterna entre las tarjetas de dibujo y texto para un efecto dramático y divertido.
- TelefonoDescompuestoVisualPlayerList: Muestra la lista de jugadores en la sala de espera y durante el juego, indicando quién es el anfitrión y el estado de cada jugador (ej: 'dibujando', 'listo').
- TelefonoDescompuestoVisualTimer: Un componente visual que muestra una cuenta regresiva durante cada turno, añadiendo un elemento de urgencia. Cuando el tiempo se agota, fuerza el envío del turno.

### División Funcional

La funcionalidad se divide en cuatro áreas principales: UI (Presentación), Lógica del Juego, Gestión de Estado y Recursos. La UI, ubicada en '/app' y '/components', se encarga de renderizar la interfaz. La Lógica del Juego (a menudo en hooks personalizados como `useTelefonoDescompuestoVisualGame.js`) maneja las reglas: la transición entre rondas, la distribución de los cuadernos y la validación de turnos. La Gestión de Estado, con Zustand en '/store/telefonoDescompuestoVisualStore.js', es la única fuente de verdad para los datos de la partida, como el progreso de cada cuaderno y el estado actual de la sesión. Finalmente, '/assets' y '/constants' contienen recursos estáticos como imágenes, sonidos y las listas de palabras, desacoplando el contenido del código de la aplicación.

## Ejemplos de Preguntas o Contenido Personalizado

- Un gato DJ en una discoteca
- La Torre Eiffel derritiéndose como un helado
- Un robot jardinero podando un bonsái
- Albert Einstein surfeando una ola gigante
- Un pingüino con un jetpack
- La Mona Lisa haciéndose un selfie
- Guerra de almohadas entre caballeros medievales
- Un pulpo intentando tocar una guitarra
- Desayuno en la luna
- El monstruo del Lago Ness jugando al waterpolo
- Un caracol con un motor de cohete
- Un T-Rex intentando usar un smartphone

## Notas y Personalizaciones

- Paquetes de Palabras Temáticos: Permitir a los usuarios comprar o desbloquear paquetes de palabras específicos (ej: 'Cine y Series', 'Videojuegos', 'Cultura Pop', 'Solo para Adultos') para variar la temática de las partidas.
- Modo Anónimo: Una variante donde los nombres de los jugadores no se revelan hasta el final, haciendo que las adivinanzas y los dibujos sean completamente a ciegas.
- Herramientas de Dibujo Premium: Añadir una paleta de colores completa, diferentes pinceles (aerógrafo, marcador) y la capacidad de añadir texto simple a los dibujos como una función avanzada.
- Creación de Cuadernos Personalizados: Permitir que el anfitrión de la partida escriba todas las frases iniciales en lugar de usar las predeterminadas, ideal para grupos de amigos con bromas internas.
- Exportar a GIF: Una función para exportar la secuencia de revelación de un cuaderno como un GIF animado, facilitando compartir los resultados más graciosos en redes sociales.
- Integración con IA para Pistas: Un modo de juego opcional donde los jugadores pueden solicitar una pista generada por IA si están atascados al intentar adivinar un dibujo.