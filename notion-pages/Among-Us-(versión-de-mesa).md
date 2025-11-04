# Among Us (versión de mesa)

# Among Us (versión de mesa)

**Categoría: **Juego social de deducción y engaño

## Descripción General del Juego

Among Us (versión de mesa) es una adaptación digital para jugar en persona del popular videojuego de engaño y trabajo en equipo. Diseñado para 4 a 10 jugadores, la aplicación móvil actúa como un moderador del juego, asignando roles secretos y gestionando las fases. La mayoría de los jugadores son Tripulantes, cuyo objetivo es completar una serie de tareas asignadas en diferentes habitaciones de una nave espacial. Sin embargo, entre ellos se esconden uno o más Impostores. El objetivo de los Impostores es eliminar a los Tripulantes uno por uno o sabotear sistemas críticos de la nave hasta que el número de Impostores sea igual al de Tripulantes. Los Tripulantes ganan si completan todas sus tareas o si logran identificar y expulsar a todos los Impostores a través de votaciones en reuniones de emergencia. Estas reuniones se convocan cuando se reporta un cuerpo o se pulsa un botón de emergencia, dando lugar a intensos debates donde las coartadas, las acusaciones y el engaño son las herramientas principales para sobrevivir y alcanzar la victoria.

## Instrucciones Paso a Paso

1. 1. Creación de la Sala: Un jugador crea una sala de juego en la aplicación y comparte el código con los demás.
1. 2. Unión y Configuración: Los demás jugadores se unen a la sala. El anfitrión configura las reglas (número de impostores, tareas, etc.) y comienza el juego.
1. 3. Asignación de Roles: La aplicación asigna secretamente a cada jugador el rol de 'Tripulante' o 'Impostor'. Nadie conoce el rol de los demás.
1. 4. Fase de Tareas: Los Tripulantes reciben una lista de tareas en su dispositivo. Para 'completar' una tarea, deben ir físicamente a un lugar designado en la sala de juego (o simplemente anunciarlo) y completar un mini-juego o pulsar un botón en la app. La barra de tareas global avanza visiblemente para todos.
1. 5. Acciones del Impostor: Los Impostores fingen hacer tareas. En secreto, a través de su app, pueden 'Sabotear' sistemas (apagar luces, bloquear puertas) o 'Eliminar' a un Tripulante que esté en la misma ubicación que ellos.
1. 6. Reporte: Si un jugador (Tripulante o Impostor) 'encuentra' un cuerpo eliminado, puede reportarlo a través de la app. Esto detiene el juego inmediatamente y convoca una reunión de emergencia.
1. 7. Reunión de Emergencia: Todos los jugadores, vivos, discuten lo que vieron, dónde estaban y quién es sospechoso. El objetivo es deducir la identidad del Impostor.
1. 8. Votación: Al final del tiempo de discusión, todos votan en su dispositivo por el jugador que creen que es el Impostor. También pueden optar por saltar el voto.
1. 9. Expulsión: El jugador con más votos es expulsado de la nave. La aplicación revela si la persona expulsada era o no un Impostor.
1. 10. Verificación de Victoria: Después de cada expulsión o al completarse todas las tareas, la aplicación verifica si se ha cumplido una condición de victoria (todos los Impostores expulsados, todas las tareas completas, o el número de Impostores es igual al de Tripulantes).
1. 11. Continuación: Si no hay un ganador, el juego continúa con una nueva ronda de tareas.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código y los recursos para el juego 'Among Us (versión de mesa)' están encapsulados en una única carpeta dedicada llamada 'among-us-mesa' dentro del directorio '/games/'. La estructura interna utiliza Expo Router para la navegación basada en archivos dentro de la carpeta '/games/among-us-mesa/app/'. El estado global del juego (roles de jugadores, progreso de tareas, estado de sabotaje) se gestiona con un gestor de estado como Zustand, con su store y acciones definidos en '/games/among-us-mesa/store/'. La arquitectura sigue un principio de separación de responsabilidades: los componentes de la interfaz de usuario (UI) se encuentran en '/games/among-us-mesa/components/', la lógica de negocio y las reglas del juego están en hooks personalizados o servicios, y los assets (imágenes, sonidos) en '/games/among-us-mesa/assets/'.

### Archivos Necesarios

- /games/among-us-mesa/app/index.js (Pantalla de inicio y lobby del juego)
- /games/among-us-mesa/app/among-us-mesa-game.js (Pantalla principal del juego durante la partida)
- /games/among-us-mesa/app/among-us-mesa-meeting.js (Pantalla para la fase de discusión y votación)
- /games/among-us-mesa/app/_layout.js (Layout principal para el juego)
- /games/among-us-mesa/components/AmongUsMesaPlayerAvatar.js (Componente para mostrar el avatar y estado del jugador)
- /games/among-us-mesa/components/AmongUsMesaTaskItem.js (Componente para un ítem individual en la lista de tareas)
- /games/among-us-mesa/components/AmongUsMesaMap.js (Componente visual del mapa de la nave)
- /games/among-us-mesa/components/AmongUsMesaRoleRevealModal.js (Modal que revela el rol al inicio del juego)
- /games/among-us-mesa/components/AmongUsMesaVotingCard.js (Componente para la tarjeta de votación de cada jugador)
- /games/among-us-mesa/store/amongUsMesaStore.js (Store de Zustand para gestionar el estado global del juego)
- /games/among-us-mesa/constants/AmongUsMesaGameSettings.js (Constantes para la configuración del juego, como tareas y ubicaciones)
- /games/among-us-mesa/assets/images/crewmate_red.png
- /games/among-us-mesa/assets/sounds/emergency_meeting.mp3
### Componentes React Native

- AmongUsMesaLobby: Pantalla para que los jugadores se unan a una partida, personalicen su personaje y esperen a que el anfitrión inicie el juego.
- AmongUsMesaGameScreen: Interfaz principal durante el juego. Muestra el mapa, la lista de tareas personal, y los botones de acción (Reportar, Usar, Sabotear, Matar).
- AmongUsMesaRoleRevealModal: Un modal animado que se muestra a cada jugador al inicio de la partida para revelarle su rol (Tripulante o Impostor) de forma secreta.
- AmongUsMesaTaskList: Un componente que muestra la lista de tareas asignadas al jugador Tripulante, con indicadores de progreso.
- AmongUsMesaEmergencyMeetingScreen: Interfaz que se activa durante las reuniones. Muestra a todos los jugadores vivos y permite la votación.
- AmongUsMesaPlayerGrid: Un componente que muestra una cuadrícula con los avatares de todos los jugadores, indicando si están vivos, muertos o han sido expulsados.
- AmongUsMesaActionButton: Un botón contextual que cambia su función dependiendo del rol del jugador y su proximidad a objetos u otros jugadores (ej: de 'Usar' a 'Matar').
### División Funcional

La funcionalidad se divide en capas claras: la capa de presentación (UI) está formada por componentes reutilizables en '/components' y pantallas en '/app'. La capa de estado, manejada por Zustand en '/store/amongUsMesaStore.js', centraliza toda la información del juego (jugadores, roles, tareas, estado de la partida). La capa de lógica del juego contiene las reglas y acciones (ej: asignar roles, verificar condiciones de victoria, procesar votos), implementada a través de acciones dentro del store de Zustand y hooks personalizados. Las constantes del juego, como la lista de posibles tareas o configuraciones, se aíslan en '/constants' para facilitar su modificación.

## Ejemplos de Preguntas o Contenido Personalizado

- Tarea: Conectar cables en Electricidad (mini-juego de unir cables por color).
- Tarea: Descargar datos en Administración (barra de progreso que debe completarse).
- Tarea: Escanearse en Enfermería (una acción que prueba la inocencia de un tripulante).
- Tarea: Vaciar la basura en Almacén.
- Sabotaje del Impostor: Apagar las luces (reduce la visibilidad de los tripulantes en la app).
- Sabotaje del Impostor: Fusionar el reactor (los tripulantes tienen un tiempo límite para arreglarlo o pierden).
- Sabotaje del Impostor: Cerrar puertas para aislar a un jugador.
- Pregunta de discusión: ¿Quién estaba contigo en la sala de Motores cuando se apagaron las luces?
- Pregunta de discusión: ¿Por qué corriste desde la escena del crimen en lugar de reportarlo?
- Pregunta de discusión: Rojo dice que estaba en Comunicaciones, ¿alguien puede confirmarlo?
## Notas y Personalizaciones

- Añadir Roles Adicionales: Introducir roles como 'Científico' (puede ver los signos vitales de los demás), 'Ingeniero' (puede usar los conductos de ventilación) o 'Guardián' (puede proteger a otro jugador).
- Mapas Personalizados: Permitir a los jugadores elegir entre diferentes mapas, cada uno con un diseño, habitaciones y tareas únicas.
- Modificadores de Juego: Incluir opciones avanzadas como 'Votos Anónimos', 'Tareas Visuales' (tareas que son visibles para otros jugadores cuando se completan), o ajustar la velocidad del jugador y el tiempo de recarga de habilidades.
- Modo de Juego 'Escondite': Una variante donde un solo impostor tiene un tiempo para eliminar a todos mientras los tripulantes solo deben completar tareas y sobrevivir.
- Eventos Aleatorios: Incorporar eventos aleatorios que afecten a todos los jugadores, como una 'tormenta de asteroides' que obligue a todos a ir a una sala específica, creando situaciones de riesgo y oportunidad.
