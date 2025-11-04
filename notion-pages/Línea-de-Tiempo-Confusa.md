# Línea de Tiempo Confusa

# Línea de Tiempo Confusa

**Categoría: **Juego de trivia cronológica

## Descripción General del Juego

Línea de Tiempo Confusa es un desafiante juego de trivia para un solo jugador que pone a prueba tu conocimiento de la historia, la ciencia y la cultura popular. El objetivo principal es ordenar correctamente una serie de eventos desordenados en una línea de tiempo cronológica. En cada ronda, se te presentarán 3 o 4 'tarjetas de evento', cada una describiendo un hito importante, como la invención de la rueda, el lanzamiento de una película icónica o el descubrimiento de un elemento químico. Tu tarea es arrastrar y soltar estas tarjetas en los espacios designados, desde el evento más antiguo hasta el más reciente. Si aciertas el orden, ganas un punto y avanzas a la siguiente ronda. Si te equivocas, pierdes una de tus vidas. El juego termina cuando te quedas sin vidas. Con un diseño minimalista y una mecánica de juego intuitiva, 'Línea de Tiempo Confusa' es perfecto para partidas rápidas y para aprender datos fascinantes mientras te diviertes.

## Instrucciones Paso a Paso

1. Al iniciar el juego, verás la pantalla principal con un botón para 'Comenzar Partida'.
1. Cada partida comienza con 3 vidas y una puntuación de 0.
1. En la pantalla de juego, aparecerán de 3 a 4 tarjetas, cada una con la descripción de un evento histórico, un invento o un lanzamiento cultural.
1. Las tarjetas estarán en la parte inferior de la pantalla en un orden aleatorio.
1. En la parte superior, verás una serie de espacios vacíos que representan la línea de tiempo.
1. Tu objetivo es arrastrar cada tarjeta y soltarla en uno de los espacios de la línea de tiempo en el orden cronológico correcto (del más antiguo al más reciente).
1. Una vez que hayas colocado todas las tarjetas, presiona el botón 'Confirmar Orden'.
1. Si el orden es correcto, tu puntuación aumentará en 1 punto, recibirás una confirmación visual y auditiva positiva, y pasarás a la siguiente ronda con un nuevo conjunto de eventos.
1. Si el orden es incorrecto, perderás una vida, se te mostrará el orden correcto como retroalimentación y luego pasarás a la siguiente ronda.
1. El juego finaliza cuando pierdes tus 3 vidas. En ese momento, se mostrará tu puntuación final y tendrás la opción de volver a jugar.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego 'Línea de Tiempo Confusa' está diseñada para ser modular y escalable. TODOS los archivos del juego se encuentran encapsulados dentro de una única carpeta dedicada llamada 'linea-de-tiempo-confusa'. El proyecto utiliza React Native con Expo, aprovechando Expo Router para la navegación entre pantallas (inicio, juego, resultado). Para la gestión del estado global (puntuación, vidas, eventos actuales), se implementa Zustand por su simplicidad y eficiencia. La estructura sigue un principio claro de separación de responsabilidades: los componentes de la UI se encargan exclusivamente de la renderización y la captura de interacciones del usuario; la lógica del juego (validación de respuestas, carga de rondas) se maneja a través de acciones en el store de Zustand; y los datos de los eventos están desacoplados en archivos de constantes.

### Archivos Necesarios

- /games/linea-de-tiempo-confusa/app/index.js
- /games/linea-de-tiempo-confusa/app/juegoLineaTiempo.js
- /games/linea-de-tiempo-confusa/app/resultadoLineaTiempo.js
- /games/linea-de-tiempo-confusa/components/TarjetaEventoConfuso.js
- /games/linea-de-tiempo-confusa/components/ContenedorLineaTiempo.js
- /games/linea-de-tiempo-confusa/components/HUDLineaTiempo.js
- /games/linea-de-tiempo-confusa/store/storeLineaTiempoConfusa.js
- /games/linea-de-tiempo-confusa/constants/EventosLineaTiempoConfusa.js
- /games/linea-de-tiempo-confusa/assets/images/icono-vida-linea-tiempo.png
- /games/linea-de-tiempo-confusa/assets/sounds/sonido-correcto-linea-tiempo.mp3
### Componentes React Native

- Pantalla de Inicio (/app/index.js): Pantalla de bienvenida con el título del juego y un botón 'Jugar' que navega a la pantalla principal del juego.
- Pantalla de Juego (/app/juegoLineaTiempo.js): Orquesta la jugabilidad. Renderiza el HUD, el contenedor de la línea de tiempo y las tarjetas de eventos arrastrables. Contiene la lógica para confirmar la selección del jugador.
- Pantalla de Resultados (/app/resultadoLineaTiempo.js): Se muestra al final de la partida. Presenta la puntuación final y ofrece botones para 'Jugar de Nuevo' o 'Volver al Inicio'.
- TarjetaEventoConfuso.js: Un componente reutilizable y arrastrable (usando React Native Reanimated o Gesture Handler) que muestra el texto de un único evento histórico. Es el elemento que el jugador manipula.
- ContenedorLineaTiempo.js: Un componente que actúa como el área de destino (drop zone) para las tarjetas de evento. Contiene los espacios numerados y gestiona la lógica de recibir y ordenar las tarjetas soltadas.
- HUDLineaTiempo.js: El 'Heads-Up Display' del juego. Es un componente estático que muestra información crucial en tiempo real, como la puntuación actual y el número de vidas restantes.
### División Funcional

La funcionalidad está segmentada: la UI (Componentes y Pantallas) se encarga de la presentación visual y la interacción. La Lógica del Juego (chequear el orden, avanzar de ronda, gestionar vidas) está centralizada en las acciones del store de Zustand (storeLineaTiempoConfusa.js). El Estado de la Aplicación (puntuación, vidas, ronda actual, orden de las tarjetas) reside en el store de Zustand, proporcionando una única fuente de verdad. Los Datos (preguntas, eventos, respuestas correctas) se almacenan en un archivo de constantes (EventosLineaTiempoConfusa.js) para facilitar su actualización y gestión.

## Ejemplos de Preguntas o Contenido Personalizado

- {"categoria": "Historia Antigua", "eventos": [{"id": 1, "texto": "Construcción de la Gran Pirámide de Giza"}, {"id": 2, "texto": "Nacimiento de la Democracia en Atenas"}, {"id": 3, "texto": "Caída del Imperio Romano de Occidente"}], "orden_correcto": [1, 2, 3]}
- {"categoria": "Inventos Clave", "eventos": [{"id": 1, "texto": "Invención de la imprenta por Gutenberg"}, {"id": 2, "texto": "Patente del teléfono por Alexander Graham Bell"}, {"id": 3, "texto": "Primer vuelo de los hermanos Wright"}, {"id": 4, "texto": "Invención de la World Wide Web"}], "orden_correcto": [1, 2, 3, 4]}
- {"categoria": "Cultura Pop Siglo XX", "eventos": [{"id": 1, "texto": "Lanzamiento de 'Star Wars: A New Hope'"}, {"id": 2, "texto": "Lanzamiento del álbum 'Thriller' de Michael Jackson"}, {"id": 3, "texto": "Estreno del primer episodio de 'Friends'"}], "orden_correcto": [1, 2, 3]}
- {"categoria": "Tecnología Móvil", "eventos": [{"id": 1, "texto": "Lanzamiento del primer iPhone"}, {"id": 2, "texto": "Lanzamiento del sistema operativo Android"}, {"id": 3, "texto": "Adquisición de WhatsApp por Facebook"}], "orden_correcto": [1, 2, 3]}
## Notas y Personalizaciones

- Modos de Dificultad: Añadir un modo 'Fácil' (3 eventos), 'Normal' (4 eventos) y 'Difícil' (5 eventos o eventos más similares en el tiempo).
- Modo Contrarreloj: Introducir un temporizador para cada ronda o para toda la partida, añadiendo un elemento de urgencia.
- Paquetes Temáticos: Permitir a los jugadores elegir o comprar paquetes de preguntas sobre temas específicos como 'Historia del Cine', 'Revolución Industrial', 'Videojuegos Retro' o 'Hitos de la NASA'.
- Pistas Visuales: Incluir imágenes o iconos en las tarjetas de evento para dar pistas visuales y hacer el juego más atractivo.
- Sistema de Pistas: Implementar un botón de 'pista' que pueda revelar la posición correcta de una de las tarjetas a cambio de no sumar puntos en esa ronda.
- Modo Multijugador: Crear un modo 'Duelo' donde dos jugadores compiten por turnos en el mismo dispositivo para ver quién consigue la mayor puntuación en 5 rondas.
