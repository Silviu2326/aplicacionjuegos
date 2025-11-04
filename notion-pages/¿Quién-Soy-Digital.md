# ¿Quién Soy? Digital

# ¿Quién Soy? Digital

**Categoría: **Juego social de adivinanzas

## Descripción General del Juego

“¿Quién Soy? Digital” es la versión moderna y móvil del clásico juego de adivinanzas, diseñado para animar cualquier reunión social. El objetivo es simple y divertido: un jugador debe adivinar el personaje, objeto o animal que aparece en la pantalla de su móvil, el cual se coloca en la frente sin poder verlo. El resto del grupo sí ve la palabra y su misión es ayudar al jugador a adivinarla respondiendo únicamente con 'sí' o 'no' a sus preguntas. Cada ronda es una carrera contrarreloj, lo que añade un elemento de emoción y urgencia. Ideal para grupos de 3 o más personas, el juego fomenta la comunicación, el pensamiento rápido y, sobre todo, muchas risas. Al acertar una palabra, el jugador inclina el móvil hacia abajo para sumar un punto y pasar a la siguiente. Si se rinde, puede inclinarlo hacia arriba para pasar. Al final del tiempo, la aplicación muestra un resumen de los aciertos y pases, y el turno pasa al siguiente jugador. Gana quien más puntos acumule al final de las rondas acordadas.

## Instrucciones Paso a Paso

1. Paso 1: Reúne a tu grupo de amigos o familiares (mínimo 3 jugadores).
1. Paso 2: El primer jugador abre la aplicación y selecciona una categoría (ej: 'Películas', 'Animales', 'Famosos').
1. Paso 3: Se configuran las opciones de la partida, como la duración de la ronda (ej: 60, 90 o 120 segundos).
1. Paso 4: El jugador de turno pulsa 'Comenzar' y se coloca inmediatamente el móvil en la frente, con la pantalla mirando hacia los demás.
1. Paso 5: En la pantalla aparecerá una palabra. El jugador de turno no puede verla.
1. Paso 6: El jugador debe empezar a hacer preguntas cuya respuesta solo pueda ser 'sí' o 'no' para adivinar la palabra. (Ej: '¿Soy un animal?', '¿Soy un personaje de ficción?', '¿Puedo volar?').
1. Paso 7: El resto del grupo responde a las preguntas honestamente.
1. Paso 8: Si el jugador adivina la palabra, debe inclinar el móvil hacia abajo. Sonará un sonido de acierto, se sumará un punto y aparecerá una nueva palabra.
1. Paso 9: Si el jugador no sabe la respuesta y quiere pasar a la siguiente palabra, debe inclinar el móvil hacia arriba. Sonará un sonido de 'pase' y aparecerá una nueva palabra (no suma punto).
1. Paso 10: El proceso se repite hasta que el temporizador llegue a cero.
1. Paso 11: Al final de la ronda, la aplicación muestra un resumen con las palabras acertadas y las pasadas.
1. Paso 12: Se pasa el móvil al siguiente jugador, quien repite el proceso. El juego continúa hasta que todos han jugado o se completan las rondas establecidas.
1. Paso 13: Al final de la partida, se muestra la tabla de puntuaciones y se declara un ganador.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está encapsulado en su propia carpeta dedicada '/games/quien-soy-digital/' para garantizar la modularidad y evitar conflictos con otros juegos. Utiliza React Native con Expo Router para la navegación entre pantallas (menú, juego, resultados). La gestión del estado se maneja con una herramienta como Zustand o Redux Toolkit, manteniendo el estado de la partida (puntuación, tiempo restante, mazo actual) centralizado y accesible. La estructura sigue una clara separación de responsabilidades: los componentes de la interfaz de usuario (UI) están en la carpeta '/components', la lógica de negocio y del juego se aísla en hooks personalizados, y los datos estáticos como las categorías de palabras se encuentran en '/constants'.

### Archivos Necesarios

- /games/quien-soy-digital/app/_layout.js
- /games/quien-soy-digital/app/index.js
- /games/quien-soy-digital/app/quienSoyDigitalGameScreen.js
- /games/quien-soy-digital/app/quienSoyDigitalResultsScreen.js
- /games/quien-soy-digital/components/QuienSoyDigitalCard.js
- /games/quien-soy-digital/components/QuienSoyDigitalTimer.js
- /games/quien-soy-digital/components/QuienSoyDigitalCategorySelector.js
- /games/quien-soy-digital/components/QuienSoyDigitalTiltInstructions.js
- /games/quien-soy-digital/store/quienSoyDigitalStore.js
- /games/quien-soy-digital/constants/QuienSoyDigitalDecks.js
- /games/quien-soy-digital/hooks/useQuienSoyDigitalGameLogic.js
- /games/quien-soy-digital/hooks/useDeviceTilt.js
- /games/quien-soy-digital/assets/sounds/correct_answer.mp3
- /games/quien-soy-digital/assets/sounds/pass_word.mp3
- /games/quien-soy-digital/assets/sounds/times_up.mp3
- /games/quien-soy-digital/assets/images/logo_quien_soy_digital.png
### Componentes React Native

- QuienSoyDigitalSetupScreen (en app/index.js): Pantalla inicial donde los jugadores eligen la categoría de palabras y configuran la duración de la ronda antes de iniciar la partida.
- QuienSoyDigitalGameScreen (en app/quienSoyDigitalGameScreen.js): La pantalla principal del juego. Muestra la palabra al grupo, integra el temporizador y utiliza el acelerómetro del dispositivo para detectar la inclinación (acierto o pase).
- QuienSoyDigitalResultsScreen (en app/quienSoyDigitalResultsScreen.js): Se muestra al final de cada ronda. Presenta un resumen detallado de las palabras que se acertaron, las que se pasaron y la puntuación total obtenida.
- QuienSoyDigitalCard (en components/QuienSoyDigitalCard.js): Componente visual que muestra en grande la palabra a adivinar. Está diseñado para ser claro y legible desde la distancia.
- QuienSoyDigitalTimer (en components/QuienSoyDigitalTimer.js): Muestra la cuenta atrás del tiempo de la ronda. Cambia de color para indicar urgencia cuando queda poco tiempo y dispara el evento de fin de ronda.
- QuienSoyDigitalCategorySelector (en components/QuienSoyDigitalCategorySelector.js): Un componente reutilizable que muestra las diferentes barajas o categorías de palabras disponibles para que el jugador elija una.
### División Funcional

La funcionalidad se divide en capas claras: la UI (Componentes de React Native) es responsable de la presentación. La Lógica del Juego (hooks personalizados como `useQuienSoyDigitalGameLogic`) maneja el estado del juego, la selección de palabras, el temporizador y la puntuación. La Gestión de Estado (`quienSoyDigitalStore`) centraliza los datos de la partida para que sean consistentes entre componentes. El hook `useDeviceTilt` abstrae la lógica del acelerómetro para detectar inclinaciones. Finalmente, los Datos y Assets (archivos en `/constants` y `/assets`) proveen el contenido estático como las listas de palabras y los efectos de sonido.

## Ejemplos de Preguntas o Contenido Personalizado

- Categoría 'Personajes de Películas': 'Harry Potter', 'Darth Vader', 'Katniss Everdeen', 'Elsa', 'Iron Man', 'Jack Sparrow'.
- Categoría 'Animales': 'León', 'Pingüino', 'Jirafa', 'Delfín', 'Ornitorrinco', 'Tiranosaurio Rex'.
- Categoría 'Celebridades': 'Shakira', 'Lionel Messi', 'Frida Kahlo', 'Elon Musk', 'Taylor Swift', 'Will Smith'.
- Categoría 'Cosas de Casa': 'Microondas', 'Sofá', 'Lavadora', 'Tostadora', 'Mando a distancia', 'Cepillo de dientes'.
- Categoría 'Superhéroes': 'Superman', 'Spider-Man', 'Wonder Woman', 'Hulk', 'Capitán América', 'Thor'.
## Notas y Personalizaciones

- Creación de Mazos Personalizados: Permitir a los usuarios crear, guardar y compartir sus propias listas de palabras, ideal para grupos con chistes internos o temas muy específicos.
- Modo Duelo por Equipos: Dividir al grupo en dos equipos que compiten por tener la mayor puntuación total al final de un número par de rondas.
- Integración con Cámara: Ofrecer una opción para grabar al grupo mientras da las pistas. Al final de la ronda, el jugador puede ver un video divertido de las reacciones de sus amigos.
- Diferentes Modos de Juego: Añadir variaciones como 'Solo Actuar' (mímica), 'Solo Sonidos' (sin palabras, solo onomatopeyas) o 'Solo Dibujar' (usando una tablet o papel).
- Temas y Skins: Permitir personalizar la apariencia de la aplicación con diferentes temas de colores o fondos para una experiencia más personal.
- Logros y Estadísticas: Un sistema de logros por hitos (ej: 'Adivina 100 palabras') y un perfil de jugador con estadísticas de aciertos, categorías favoritas, etc.
