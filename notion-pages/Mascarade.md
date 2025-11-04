# Mascarade

# Mascarade

**Categoría: **Juego social de faroleo y deducción

## Descripción General del Juego

Mascarade es un juego de identidades ocultas, faroleo y caos diseñado para 3 a 8 jugadores. Cada participante recibe una carta de personaje con una habilidad única, como el Rey que recauda impuestos o el Ladrón que roba a sus vecinos. El objetivo es ser el primer jugador en acumular 13 monedas. La peculiaridad del juego radica en que las cartas de personaje se mantienen boca abajo y se intercambian constantemente (o al menos, se simula el intercambio) entre jugadores. Esto provoca que, tras unas pocas rondas, nadie esté completamente seguro de qué personaje es. En tu turno, en lugar de realizar una acción segura, puedes declarar que eres un personaje específico para usar su poder. Sin embargo, cualquier otro jugador puede desafiarte, afirmando ser él también ese personaje. Si hay un desafío, todos los que hicieron la afirmación revelan sus cartas. Solo el verdadero poseedor del personaje usa la habilidad, mientras que los impostores son penalizados. Si nadie te desafía, puedes usar el poder sin necesidad de demostrar que tienes la carta, ¡incluso si estás mintiendo! Mascarade es un ejercicio de memoria, audacia y lectura de tus oponentes, donde una cara de póker vale más que la certeza.

## Instrucciones Paso a Paso

1. **1. Preparación (Setup):** Cada jugador recibe una carta de personaje al azar y 6 monedas. Las cartas se colocan boca arriba para que todos las vean y memoricen. Después de un momento, todos los jugadores ponen sus cartas boca abajo frente a ellos. Las monedas sobrantes y las cartas de personaje no utilizadas se dejan en el centro, formando el 'Banco' y el 'Juzgado'.
1. **2. Primeras Rondas:** Durante las primeras cuatro rondas del juego, el jugador en turno DEBE realizar la acción de 'Intercambiar Cartas'.
1. **3. Turno de un Jugador:** A partir de la quinta ronda, en tu turno, debes elegir UNA de las siguientes tres acciones:
1.    a) **Intercambiar (o no) Cartas:** Toma tu carta y la de otro jugador. Pásalas por debajo de la mesa (o una animación que oculte la acción) y decide si las intercambias o se las devuelves a su dueño original. Ni tú ni el otro jugador pueden ver las cartas durante este proceso. La incertidumbre es clave.
1.    b) **Mirar tu Carta:** En secreto, mira tu propia carta de personaje para recordar quién eres. Esto consume tu turno.
1.    c) **Anunciar un Rol:** Declara en voz alta 'Soy el [Nombre del Personaje]' (por ejemplo, 'Soy el Rey').
1. **4. El Desafío:** Después de que un jugador anuncie un rol, los demás jugadores (en el sentido de las agujas del reloj) tienen la oportunidad de desafiarlo, afirmando también ser ese personaje. Pueden decir '¡No, YO soy el [Nombre del Personaje]!' o simplemente pasar.
1. **5. Resolución de la Acción:**
1.    a) **Sin Desafíos:** Si nadie desafía al jugador activo, este utiliza el poder del personaje que anunció, sin necesidad de revelar su carta. ¡El farol puede tener éxito!
1.    b) **Con Desafíos:** Si uno o más jugadores desafían la declaración, el jugador activo y todos los que lo desafiaron deben revelar su carta simultáneamente.
1. **6. Consecuencias de la Revelación:**
1.    a) **El Verdadero Personaje:** El jugador que realmente tenga la carta del personaje anunciado utiliza su poder inmediatamente. Si por alguna razón dos jugadores tuvieran la misma carta (en partidas con más jugadores), ambos usan el poder.
1.    b) **Los Impostores:** Todos los jugadores que afirmaron ser el personaje pero revelaron una carta diferente deben pagar una multa de 1 moneda al 'Juzgado'.
1. **7. Fin de la Ronda:** Después de resolver la acción y las penalizaciones, todos los jugadores que revelaron sus cartas las vuelven a poner boca abajo.
1. **8. Condición de Victoria:** El juego termina inmediatamente cuando un jugador alcanza 13 o más monedas, declarándose ganador. Alternativamente, si un jugador queda en bancarrota (0 monedas), el juego termina y el jugador más rico en ese momento gana.
## Estructura de Archivos y Componentes en Expo con React Native

El código de Mascarade está encapsulado dentro de una carpeta dedicada '/games/mascarade/' para garantizar la modularidad y evitar conflictos con otros juegos. La navegación entre pantallas (lobby, partida, reglas) se gestiona con Expo Router, utilizando una estructura de archivos dentro de '/games/mascarade/app/'. El estado global del juego, como la posición de las cartas, las monedas de cada jugador y el turno actual, se maneja con Zustand (o Redux Toolkit) en un store específico del juego. Se sigue un principio de separación de responsabilidades: los componentes de React Native en '/games/mascarade/components/' se encargan de la UI, la lógica pura del juego (validación de movimientos, resolución de poderes) se aísla en '/games/mascarade/logic/', el estado en '/games/mascarade/store/', y los recursos estáticos como imágenes de cartas y sonidos en '/games/mascarade/assets/'.

### Archivos Necesarios

- /games/mascarade/app/index.js
- /games/mascarade/app/mascarade-lobby.js
- /games/mascarade/app/mascarade-game.js
- /games/mascarade/app/mascarade-rules.js
- /games/mascarade/components/MascaradePlayerDisplay.js
- /games/mascarade/components/MascaradeCard.js
- /games/mascarade/components/MascaradeActionBar.js
- /games/mascarade/components/MascaradeAnnounceModal.js
- /games/mascarade/components/MascaradeChallengeOverlay.js
- /games/mascarade/logic/mascaradeGameLogic.js
- /games/mascarade/store/mascaradeStore.js
- /games/mascarade/constants/MascaradeCharacterData.js
- /games/mascarade/assets/images/characters/king.png
- /games/mascarade/assets/images/characters/witch.png
- /games/mascarade/assets/images/card-back.png
### Componentes React Native

- **MascaradePlayerDisplay:** Componente que muestra el área de un jugador, incluyendo su avatar, nombre, cantidad de monedas y su carta boca abajo. Se ilumina cuando es su turno.
- **MascaradeCard:** Componente reutilizable para mostrar una carta de personaje, con una prop para controlar si está boca arriba o boca abajo. Incluye la ilustración y la descripción del poder.
- **MascaradeActionBar:** Barra de acciones en la parte inferior de la pantalla que muestra los tres botones disponibles para el jugador en su turno: 'Intercambiar', 'Mirar Carta' y 'Anunciar Rol'.
- **MascaradeAnnounceModal:** Modal que se abre cuando el jugador elige 'Anunciar Rol'. Muestra una lista de todos los personajes en juego para que el jugador seleccione cuál quiere declarar.
- **MascaradeChallengeOverlay:** Superposición que aparece después de un anuncio, mostrando a los otros jugadores un botón para 'Desafiar' o 'Pasar', junto con un temporizador.
### División Funcional

La funcionalidad se divide en cuatro áreas principales: 1) **UI (Componentes):** Archivos en '/components/' que son responsables únicamente de renderizar la interfaz del juego y delegar las interacciones del usuario. 2) **Gestión de Estado (Store):** El archivo '/store/mascaradeStore.js' actúa como la única fuente de verdad para el estado del juego (jugadores, cartas, monedas, fase actual). 3) **Lógica del Juego (Logic):** El archivo '/logic/mascaradeGameLogic.js' contiene funciones puras que calculan el resultado de las acciones (ej: `resolveChallenge`, `applyCharacterPower`), sin interactuar directamente con la UI o el estado. 4) **Datos Estáticos (Constants):** El archivo '/constants/MascaradeCharacterData.js' exporta un objeto con la información de cada personaje (nombre, descripción del poder, ruta de la imagen), manteniendo los datos de configuración separados de la lógica.

## Ejemplos de Preguntas o Contenido Personalizado

- **Rey:** Al anunciar que eres el Rey, y si la acción se resuelve a tu favor, tomas 3 monedas del Banco. Un rol sencillo y poderoso para acumular riqueza.
- **Bruja:** Al anunciar que eres la Bruja, eliges a otro jugador. Si ganas el desafío (o no te desafían), intercambias toda tu fortuna (todas tus monedas) con las del jugador elegido.
- **Juez:** Al anunciar que eres el Juez, tomas todas las monedas que se han acumulado en el 'Juzgado' debido a las penalizaciones de los jugadores que mintieron en desafíos anteriores.
- **Ladrón:** Al anunciar que eres el Ladrón, robas 1 moneda al jugador de tu izquierda y 1 moneda al jugador de tu derecha. Ideal para ganancias pequeñas pero constantes.
- **Inquisidor:** Al anunciar que eres el Inquisidor, señalas a otro jugador. Ese jugador debe declarar qué personaje cree que tiene. Si se equivoca, te paga 4 monedas. Si acierta, no pasa nada. Un rol de alto riesgo y alta recompensa.
- **Tramposo:** Si anuncias exitosamente cualquier rol mientras tienes 10 o más monedas, en lugar de usar el poder de ese rol, ganas la partida inmediatamente.
## Notas y Personalizaciones

- **Set de Personajes Variable:** Permitir al anfitrión de la partida seleccionar qué personajes estarán en juego, adaptando la complejidad y la interacción a la experiencia del grupo.
- **Modo Principiante:** Una configuración predefinida que utiliza solo los 6 personajes más básicos (Rey, Reina, Juez, Ladrón, Obispo, Bruja) para facilitar el aprendizaje.
- **Partidas Rápidas:** Añadir una opción para reducir la cantidad de monedas necesarias para ganar (por ejemplo, a 10 en lugar de 13) para partidas más cortas.
- **Registro de Eventos:** Incluir un 'log' o historial de turnos visible para todos los jugadores, que registre qué acciones se han tomado (ej: 'Jugador A intercambió cartas con Jugador C', 'Jugador B anunció ser el Rey'), ayudando a la deducción.
- **Variante para 2-3 Jugadores:** Implementar las reglas oficiales para pocos jugadores, que a menudo implican tener personajes 'ficticios' en la mesa con los que también se puede interactuar para aumentar la confusión.
- **Personalización de Avatares:** Permitir a los jugadores personalizar sus avatares o perfiles dentro del juego para una experiencia más social.
