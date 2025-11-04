# La Voz Misteriosa (Audio Quiz)

# La Voz Misteriosa (Audio Quiz)

**Categoría: **Juego de trivia de audio

## Descripción General del Juego

La Voz Misteriosa es un emocionante juego de trivia social diseñado para poner a prueba tu oído y tus conocimientos sobre cultura popular, naturaleza y mucho más. El objetivo principal es ser el jugador o equipo con la puntuación más alta al final de la partida. Se puede jugar en solitario para batir récords personales, o en modo multijugador local con 2 o más personas, pasando el dispositivo de mano en mano. La mecánica es simple pero adictiva: en cada turno, la aplicación reproduce un breve clip de audio. Este puede ser el icónico riff de inicio de una canción famosa, el sonido característico de un animal, una frase célebre de una película o la voz de un personaje de dibujos animados. Los jugadores tienen un tiempo limitado para adivinar de qué o quién se trata, seleccionando la respuesta correcta entre varias opciones o escribiéndola directamente. Cada acierto suma puntos, y la emoción aumenta a medida que las categorías se mezclan y el tiempo corre. Es el juego perfecto para fiestas, reuniones familiares o para desafiar a tus amigos y demostrar quién tiene el mejor oído.

## Instrucciones Paso a Paso

1. Paso 1: Iniciar el juego. El anfitrión abre la aplicación y selecciona 'Nueva Partida'.
1. Paso 2: Configurar la partida. Se elige el modo de juego (Solitario o Multijugador), se ingresan los nombres de los jugadores y se seleccionan las categorías de audio deseadas (ej: 'Música', 'Cine y TV', 'Animales', 'Sonidos Cotidianos').
1. Paso 3: Definir las reglas. Se establece el número de rondas o la puntuación objetivo para ganar el juego.
1. Paso 4: Comienza el turno. El juego indica qué jugador está activo. Al tocar 'Empezar Turno', se reproduce automáticamente el primer clip de audio.
1. Paso 5: Escuchar y adivinar. El jugador escucha atentamente el sonido. Tiene la opción de repetirlo un número limitado de veces (generalmente una o dos).
1. Paso 6: Responder. Aparecen en pantalla cuatro opciones de respuesta o un campo de texto. Un temporizador visual indica el tiempo restante para contestar.
1. Paso 7: Ver el resultado. Si la respuesta es correcta, el jugador gana puntos y la pantalla muestra una confirmación, a menudo con un dato curioso sobre el sonido. Si es incorrecta o se agota el tiempo, no se suman puntos.
1. Paso 8: Pasar el turno. El juego pasa al siguiente jugador en la lista, y el proceso se repite desde el Paso 4.
1. Paso 9: Fin del juego. La partida continúa hasta que se completan todas las rondas o un jugador alcanza la puntuación objetivo.
1. Paso 10: Anunciar al ganador. Una pantalla final muestra la tabla de clasificación, destacando al ganador con la puntuación más alta.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del proyecto está diseñada para ser modular y escalable, utilizando React Native con Expo. TODO el código y los recursos específicos de 'La Voz Misteriosa' se encuentran encapsulados dentro de una única carpeta dedicada: '/games/la-voz-misteriosa/'. Esto garantiza que el juego sea un módulo autocontenido y no interfiera con otros juegos del proyecto. La navegación entre pantallas se gestiona con Expo Router, aprovechando su sistema de enrutamiento basado en archivos dentro de la carpeta '/app'. Para la gestión del estado global del juego (puntuaciones, jugador actual, estado de la partida), se utiliza Zustand por su simplicidad y eficiencia. La estructura sigue un principio claro de separación de responsabilidades: los componentes de la UI son responsables de la presentación, las pantallas orquestan el flujo y la lógica del juego, el store de Zustand centraliza el estado, y los assets (audio, imágenes) están completamente desacoplados.

### Archivos Necesarios

- /games/la-voz-misteriosa/app/index.js
- /games/la-voz-misteriosa/app/setup-voz-misteriosa.js
- /games/la-voz-misteriosa/app/juego-voz-misteriosa.js
- /games/la-voz-misteriosa/app/resultado-voz-misteriosa.js
- /games/la-voz-misteriosa/app/_layout.js
- /games/la-voz-misteriosa/components/VozMisteriosaAudioPlayer.js
- /games/la-voz-misteriosa/components/VozMisteriosaAnswerOptions.js
- /games/la-voz-misteriosa/components/VozMisteriosaTimerBar.js
- /games/la-voz-misteriosa/components/VozMisteriosaScoreboard.js
- /games/la-voz-misteriosa/components/VozMisteriosaFeedbackModal.js
- /games/la-voz-misteriosa/store/vozMisteriosaStore.js
- /games/la-voz-misteriosa/constants/VozMisteriosaGameSettings.js
- /games/la-voz-misteriosa/assets/audio/canciones/queen-bohemian-rhapsody-intro.mp3
- /games/la-voz-misteriosa/assets/audio/animales/leon-rugido.mp3
- /games/la-voz-misteriosa/assets/audio/cine/star-wars-marcha-imperial.mp3
- /games/la-voz-misteriosa/assets/images/logo-voz-misteriosa.png
### Componentes React Native

- VozMisteriosaAudioPlayer: Componente UI que muestra un botón de reproducción/pausa y gestiona la carga y reproducción de los clips de audio usando 'expo-av'.
- VozMisteriosaAnswerOptions: Renderiza la lista de opciones de respuesta (si es de opción múltiple) o un campo de texto. Gestiona la interacción del usuario y comunica la respuesta seleccionada a la pantalla principal.
- VozMisteriosaTimerBar: Una barra de progreso visual que representa la cuenta atrás. Cambia de color a medida que el tiempo se agota.
- VozMisteriosaScoreboard: Muestra los nombres de los jugadores y sus puntuaciones actuales. Se actualiza automáticamente al cambiar el estado en el store.
- VozMisteriosaFeedbackModal: Un modal que aparece después de cada respuesta, indicando si fue correcta o no y mostrando información adicional o la respuesta correcta.
### División Funcional

La funcionalidad se divide en capas claras: la capa de UI (Componentes en la carpeta '/components') se encarga exclusivamente de renderizar datos y capturar eventos del usuario. La capa de Lógica de Juego (Pantallas en '/app' y el Store en '/store') maneja el flujo del juego, como pasar de turno, calcular puntos y seleccionar la siguiente pregunta. El estado global es gestionado por el store de Zustand ('vozMisteriosaStore.js'), que actúa como única fuente de verdad para datos como las puntuaciones, la pregunta actual y el estado del juego (en curso, finalizado). Los 'Assets' y 'Constants' son capas de datos y recursos, completamente separadas de la lógica, permitiendo una fácil actualización del contenido del juego sin tocar el código.

## Ejemplos de Preguntas o Contenido Personalizado

- Categoría Música: Suena el inicio de la guitarra de 'Smells Like Teen Spirit' de Nirvana. Opciones: A) Pearl Jam, B) Nirvana, C) Soundgarden, D) Alice in Chains.
- Categoría Animales: Se escucha el característico sonido de un delfín. Pregunta: ¿Qué mamífero marino hace este sonido?
- Categoría Cine y TV: Se oye la voz de Constantino Romero diciendo 'Volveré'. Opciones: A) Terminator, B) Darth Vader, C) Mufasa, D) Clint Eastwood.
- Categoría Dibujos Animados: Se escucha a Bugs Bunny decir '¿Qué hay de nuevo, viejo?'. Pregunta: ¿Qué famoso conejo dice esta frase?
- Categoría Sonidos Cotidianos: Suena el audio de alguien escribiendo en un teclado de máquina de escribir. Pregunta: ¿Qué objeto está produciendo este sonido?
- Categoría Videojuegos: Suena el jingle de 'obtener una moneda' del juego Super Mario Bros. Pregunta: ¿De qué videojuego proviene este icónico sonido?
## Notas y Personalizaciones

- Modo 'Reverso': En lugar de escuchar un sonido y adivinar qué es, se muestra el nombre (ej. 'León') y el jugador debe elegir entre cuatro clips de audio cuál es el correcto.
- Paquetes de expansión temáticos: Ofrecer paquetes de preguntas de pago o desbloqueables sobre temas específicos como 'Bandas Sonoras de los 90', 'Sonidos de Vehículos' o 'Voces de Políticos Famosos'.
- Modo 'Duelo Rápido': Dos jugadores compiten en el mismo dispositivo. La pantalla se divide y el primero que presione su botón y acierte, gana el punto.
- Personalización de avatar y sonidos: Permitir a los jugadores elegir un avatar y un sonido de 'acierto' o 'error' personalizado.
- Niveles de dificultad: En modo 'Fácil', los clips son más largos y claros. En 'Difícil', son más cortos, tienen ruido de fondo o son más rebuscados.
- Integración de contenido de usuario: Permitir a la comunidad crear y compartir sus propios paquetes de preguntas y sonidos.
