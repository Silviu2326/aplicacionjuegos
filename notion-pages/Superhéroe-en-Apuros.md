# Superhéroe en Apuros

# Superhéroe en Apuros

**Categoría: **Juego social de narración / Party game

## Descripción General del Juego

Superhéroe en Apuros es un juego social de improvisación y creatividad diseñado para 2 o más jugadores, ideal para fiestas y reuniones. El objetivo principal no es competir, sino generar risas y momentos memorables. La mecánica es sencilla: la aplicación asigna a cada jugador una combinación única y aleatoria de un superpoder completamente absurdo (como 'la capacidad de hablar con los muebles') y un problema mundano y cotidiano (como 'se ha atascado la tostada en la tostadora'). El jugador en turno debe asumir su papel de superhéroe y narrar de la forma más épica, creativa o hilarante posible cómo utilizaría su inútil poder para resolver la situación. No hay ganadores ni perdedores, aunque opcionalmente se puede activar un sistema de votación para que los demás jugadores elijan la historia más ingeniosa de cada ronda. El juego fomenta el pensamiento rápido, la imaginación y las habilidades narrativas, garantizando una alta rejugabilidad gracias a las miles de combinaciones posibles. Se juega con un solo dispositivo que se pasa entre los jugadores.

## Instrucciones Paso a Paso

1. Inicio del Juego: Un jugador abre la aplicación y pulsa 'Nueva Partida' desde la pantalla de inicio.
1. Generar Misión: En la pantalla de juego, el jugador en turno pulsa el botón 'Generar Misión'.
1. Asignación Aleatoria: La aplicación muestra en pantalla un superpoder absurdo y una situación problemática, formando la 'misión' del superhéroe.
1. Narración Épica: El jugador tiene un tiempo límite (configurable, por ejemplo, 60 segundos) para improvisar y contar en voz alta una historia sobre cómo resuelve el problema usando su poder específico.
1. Votación (Opcional): Al finalizar la narración, los demás jugadores pueden votar por la historia. La aplicación puede registrar los puntos si este modo está activado.
1. Siguiente Turno: Se pasa el dispositivo al siguiente jugador, quien repite el proceso desde el paso 2 para obtener una nueva misión.
1. Fin de la Partida: El juego puede continuar por un número de rondas preestablecido o hasta que los jugadores decidan terminar. Si se usaron puntuaciones, se muestra un resumen final.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego 'Superhéroe en Apuros' está completamente encapsulada dentro de una carpeta dedicada llamada 'superheroe-en-apuros' para garantizar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo Router para la navegación entre pantallas (inicio, juego, configuración). La gestión del estado global, como la combinación actual de poder/problema y las puntuaciones, se maneja con Zustand por su simplicidad y eficiencia. La estructura sigue un principio de separación de responsabilidades: los componentes de la UI están en la carpeta '/components', la lógica de generación de combinaciones y reglas del juego se encuentra en los propios componentes o en hooks personalizados, y los datos estáticos (listas de poderes y problemas) residen en '/constants'. Las pantallas de la aplicación están organizadas en la carpeta '/app' según las convenciones de Expo Router.

### Archivos Necesarios

- /games/superheroe-en-apuros/app/_layout.js
- /games/superheroe-en-apuros/app/index.js
- /games/superheroe-en-apuros/app/superheroe-en-apuros-game.js
- /games/superheroe-en-apuros/components/SuperheroeEnApurosCard.js
- /games/superheroe-en-apuros/components/SuperheroeEnApurosMissionControl.js
- /games/superheroe-en-apuros/components/SuperheroeEnApurosTimer.js
- /games/superheroe-en-apuros/store/superheroeEnApurosStore.js
- /games/superheroe-en-apuros/constants/SuperheroeEnApurosData.js
- /games/superheroe-en-apuros/assets/images/superheroe-en-apuros-icon.png
### Componentes React Native

- SuperheroeEnApurosHomeScreen (en /app/index.js): Pantalla de bienvenida con el título del juego, reglas breves y el botón para iniciar una nueva partida.
- SuperheroeEnApurosGameScreen (en /app/superheroe-en-apuros-game.js): Pantalla principal donde se desarrolla el juego. Contiene el componente `SuperheroeEnApurosMissionControl` y la lógica de la partida.
- SuperheroeEnApurosCard: Componente visual reutilizable que muestra el texto de un poder o un problema con un diseño de carta. Recibe `title` y `description` como props.
- SuperheroeEnApurosMissionControl: Componente central que muestra las dos `SuperheroeEnApurosCard` (poder y problema) y el botón 'Generar Misión'. Se conecta al store de Zustand para obtener y mostrar la combinación actual.
- SuperheroeEnApurosTimer: Componente opcional que muestra una cuenta atrás visual para añadir presión y ritmo al turno del jugador.
### División Funcional

La funcionalidad se divide claramente: la UI (componentes visuales como `SuperheroeEnApurosCard`) es independiente de la lógica del juego. La lógica principal, como seleccionar un poder y un problema al azar, reside en el store de Zustand (`superheroeEnApurosStore.js`) y se invoca desde los componentes. El estado de la aplicación (poder actual, problema actual, ronda) se centraliza en el store, y los componentes se suscriben a sus cambios. Las constantes del juego (listas de poderes y problemas) están aisladas en `SuperheroeEnApurosData.js` para facilitar su edición y ampliación sin tocar el código de la lógica o la UI.

## Ejemplos de Preguntas o Contenido Personalizado

- Superpoder: 'Controlar el crecimiento de las uñas' | Problema: 'Se ha ido la luz en toda la casa'.
- Superpoder: 'Teletransportarse, pero solo a tiendas de calcetines' | Problema: 'Te persigue una abeja muy insistente'.
- Superpoder: 'Hacer que cualquier queso cante ópera' | Problema: 'El silencio en el ascensor es increíblemente incómodo'.
- Superpoder: 'Capacidad de oler los colores' | Problema: 'Necesitas encontrar el mando a distancia de la tele'.
- Superpoder: 'Invocar una llovizna de purpurina no biodegradable' | Problema: 'Tu planta se está muriendo de sed'.
- Superpoder: 'Hablar fluidamente con los insectos sobre política' | Problema: 'Has olvidado la contraseña de tu ordenador'.
- Superpoder: 'Convertir tu sudor en refresco de cola light' | Problema: 'Estás en una primera cita y no tienes tema de conversación'.
## Notas y Personalizaciones

- Modo Dúo: Dos jugadores reciben la misma misión y deben narrar su solución. Los demás votan por la mejor historia.
- Packs de Expansión: Crear packs temáticos de poderes y problemas (ej: 'Apocalipsis Zombie', 'Fantasía Épica', 'Vida de Oficina') que los usuarios puedan desbloquear o comprar.
- Generador de Nombres de Superhéroe: La app podría generar un nombre de superhéroe aleatorio basado en el poder asignado (ej: 'El Maestro de las Uñas', 'Capitán Ópera Láctea').
- Modo 'Cadena de Historias': El segundo jugador debe empezar su historia donde la terminó el anterior, creando una narrativa colaborativa y caótica.
- Desafíos Diarios: Proponer una combinación fija de poder/problema cada día para que toda la comunidad de jugadores pueda compartir sus historias en redes sociales con un hashtag específico.
- Integración de IA: Una futura versión podría usar una IA para 'juzgar' la creatividad de la historia o para generar poderes y problemas sobre la marcha basados en temas propuestos por el usuario.
