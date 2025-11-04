# The Resistance: Avalon

# The Resistance: Avalon

**Categoría: **Juego de deducción social

## Descripción General del Juego

The Resistance: Avalon es un juego de roles ocultos y deducción social para 5 a 10 jugadores, ambientado en el legendario mundo del Rey Arturo. Los jugadores son asignados en secreto a uno de dos equipos: los leales Caballeros de la Mesa Redonda, que luchan por el bien, o los malvados Esbirros de Mordred, que buscan sembrar el caos. El objetivo de los Leales es completar con éxito tres de las cinco misiones propuestas. El objetivo de los Esbirros es sabotear tres misiones. Cada ronda, un jugador actúa como Líder y propone un equipo para ir a una misión. Todos los jugadores votan para aprobar o rechazar al equipo. Si se aprueba, los miembros del equipo votan en secreto para que la misión tenga 'Éxito' o 'Fracaso'. Los Leales siempre deben votar por el éxito, pero los Esbirros pueden elegir sabotearla. Un solo voto de 'Fracaso' es suficiente para que la misión falle. La tensión aumenta a medida que los jugadores intentan deducir quién es quién basándose en las propuestas de equipo, los patrones de votación y los resultados de las misiones. Roles especiales como Merlín (que conoce a los Esbirros) y el Asesino (que puede ganar el juego para los Esbirros al final si adivina quién es Merlín) añaden una capa estratégica profunda y emocionante.

## Instrucciones Paso a Paso

1. Paso 1: Creación y Configuración de la Sala. Un jugador (anfitrión) crea una nueva partida. Se genera un código de sala único para que otros se unan. El anfitrión configura la partida seleccionando el número de jugadores y los roles especiales que se incluirán (ej: Merlín, Perceval, Morgana, Asesino).
1. Paso 2: Unión de Jugadores y Asignación de Roles. Los demás jugadores ingresan el código de la sala para unirse. Una vez que todos están listos, el sistema asigna aleatoria y secretamente los roles a cada jugador.
1. Paso 3: Fase de Revelación de Roles (Noche). Cada jugador ve su propia carta de rol en su pantalla. Dependiendo de los roles en juego, algunos jugadores recibirán información adicional. Por ejemplo, Merlín verá quiénes son los Esbirros (excepto Mordred), y los Esbirros se verán entre sí.
1. Paso 4: Inicio de la Ronda y Elección de Líder. El juego comienza en la primera de cinco misiones. Se asigna un Líder inicial (generalmente el anfitrión o un jugador al azar). Un marcador de 'Líder' se mostrará junto al avatar del jugador correspondiente.
1. Paso 5: Propuesta de Equipo. El Líder actual debe seleccionar el número de jugadores requerido para la misión en curso (indicado en el tablero de juego). El Líder toca los avatares de los jugadores que quiere enviar a la misión y confirma su selección.
1. Paso 6: Votación del Equipo. Una vez que el equipo es propuesto, todos los jugadores (incluido el Líder) votan simultánea y secretamente para 'Aprobar' o 'Rechazar' la propuesta. Los votos se revelan a todos.
1. Paso 7: Resolución de la Votación. Si la mayoría vota 'Aprobar', el equipo es aceptado y se procede a la fase de Misión (Paso 8). Si hay un empate o la mayoría vota 'Rechazar', la propuesta falla. El marcador de Líder pasa al siguiente jugador en el sentido de las agujas del reloj, y el contador de votos rechazados aumenta en uno. Si un equipo es rechazado 5 veces consecutivas en una misma ronda, los Esbirros ganan la partida automáticamente.
1. Paso 8: Fase de Misión. Solo los jugadores que fueron aprobados para la misión participan. Cada uno recibe dos opciones en su pantalla: 'Éxito' o 'Fracaso'. Los jugadores Leales solo pueden elegir 'Éxito'. Los jugadores Esbirros pueden elegir 'Éxito' para pasar desapercibidos o 'Fracaso' para sabotear la misión.
1. Paso 9: Resultado de la Misión. Los votos de la misión se 'barajan' y se revelan anónimamente. Si se juega al menos una carta de 'Fracaso' (en algunas misiones de partidas grandes se requieren dos), la misión es saboteada y los Esbirros ganan un punto. Si todas las cartas son de 'Éxito', los Leales ganan un punto.
1. Paso 10: Fin de la Ronda. Se actualiza el marcador de misiones. El marcador de Líder pasa al siguiente jugador, el contador de votos rechazados se reinicia, y comienza una nueva ronda desde el Paso 5.
1. Paso 11: Fin de la Partida. El juego termina cuando un equipo gana 3 puntos. Si los Esbirros ganan 3 misiones, la partida termina inmediatamente con su victoria.
1. Paso 12: Fase de Asesinato (si ganan los Leales). Si los Leales completan 3 misiones con éxito, tienen una última prueba. El jugador con el rol de 'Asesino' debe adivinar públicamente quién es Merlín. Tras una breve discusión con sus compañeros Esbirros, el Asesino selecciona a un jugador.
1. Paso 13: Victoria Final. Si el Asesino identifica correctamente a Merlín, los Esbirros arrebatan la victoria. Si se equivoca, los Leales ganan definitivamente. Se muestra una pantalla final revelando todos los roles y el equipo ganador.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego se organiza dentro de una carpeta dedicada llamada 'the-resistance-avalon' para garantizar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo Router para la navegación basada en archivos dentro de la carpeta '/games/the-resistance-avalon/app/'. Para la gestión del estado global del juego (jugadores, roles, estado de la misión, etc.), se emplea un gestor de estado como Zustand o Redux Toolkit, centralizado en '/games/the-resistance-avalon/store/'. La estructura sigue un principio de separación de responsabilidades: los componentes de la interfaz de usuario (UI) reutilizables se encuentran en '/games/the-resistance-avalon/components/', la lógica de negocio reside principalmente en el store, y los datos estáticos como definiciones de roles y constantes del juego están en '/games/the-resistance-avalon/constants/'. Los assets (imágenes de roles, iconos, sonidos) se almacenan en '/games/the-resistance-avalon/assets/'.

### Archivos Necesarios

- /games/the-resistance-avalon/app/index.js
- /games/the-resistance-avalon/app/[roomCode].js
- /games/the-resistance-avalon/app/_layout.js
- /games/the-resistance-avalon/components/AvalonGameBoard.js
- /games/the-resistance-avalon/components/AvalonPlayerAvatar.js
- /games/the-resistance-avalon/components/AvalonRoleCardModal.js
- /games/the-resistance-avalon/components/AvalonTeamSelection.js
- /games/the-resistance-avalon/components/AvalonVoteUI.js
- /games/the-resistance-avalon/components/AvalonMissionVoteUI.js
- /games/the-resistance-avalon/components/AvalonAssassinationModal.js
- /games/the-resistance-avalon/store/avalonGameStore.js
- /games/the-resistance-avalon/constants/AvalonRoles.js
- /games/the-resistance-avalon/constants/AvalonGameRules.js
- /games/the-resistance-avalon/assets/images/roles/merlin.png
- /games/the-resistance-avalon/assets/images/tokens/approve.png
- /games/the-resistance-avalon/assets/images/cards/success.png
### Componentes React Native

- AvalonGameBoard: Componente principal que renderiza el estado actual del juego. Muestra el tablero de misiones, la lista de jugadores, el líder actual y el contador de votos fallidos.
- AvalonPlayerAvatar: Muestra el avatar, el nombre de un jugador y cualquier indicador relevante (como el token de Líder). Es interactuable durante la selección de equipo.
- AvalonRoleCardModal: Un modal que se muestra al inicio del juego para revelar al jugador su rol secreto y la información asociada (por ejemplo, a quién ve Merlín).
- AvalonTeamSelection: Interfaz utilizada por el Líder para seleccionar a los jugadores para la misión. Se activa cuando es el turno del jugador de liderar.
- AvalonVoteUI: Muestra los botones 'Aprobar' y 'Rechazar' para que los jugadores voten por un equipo propuesto. También visualiza los resultados de la votación de todos.
- AvalonMissionVoteUI: Muestra los botones 'Éxito' y 'Fracaso' a los miembros del equipo en una misión. El botón 'Fracaso' está deshabilitado para los roles leales.
- AvalonAssassinationModal: Un modal que se activa si los Leales ganan, permitiendo al jugador Asesino seleccionar a otro jugador como su objetivo.
### División Funcional

La funcionalidad se divide en capas claras. La UI (en 'app' y 'components') es responsable de la presentación y la captura de la entrada del usuario. La Gestión de Estado (en 'store') centraliza toda la lógica y el estado del juego, como quién es el líder, qué misión se está jugando, los roles de los jugadores y las transiciones de fase del juego. La Lógica del Juego (principalmente dentro de las acciones del store) maneja las reglas, como determinar el resultado de una misión o validar acciones. Los Datos Constantes (en 'constants') almacenan información que no cambia, como las propiedades de cada rol y el número de jugadores por misión. Los Assets (en 'assets') contienen todos los recursos visuales y de audio.

## Ejemplos de Preguntas o Contenido Personalizado

- Mensaje de Rol para Merlín: 'Eres Merlín. Conoces el mal, pero ellos no te conocen. Si te descubren, todo estará perdido. Los esbirros de Mordred son: [Jugador A], [Jugadora B].'
- Mensaje de Rol para Esbirro de Mordred: 'Eres un Esbirro de Mordred. Tu objetivo es sabotear las misiones y sembrar la desconfianza. Tus compañeros en la oscuridad son: [Jugador C].'
- Mensaje de Rol para Perceval: 'Eres Perceval. La Dama del Lago te ha concedido una visión. Ves a [Jugador X] y [Jugador Y] como figuras de gran poder, pero no sabes cuál es Merlín y cuál es Morgana.'
- Notificación de Propuesta de Equipo: 'El Líder [Nombre del Líder] ha propuesto a [Jugador 1], [Jugador 2], y [Jugador 3] para la Misión 2. ¿Apruebas este equipo?'
- Notificación de Votación de Misión: 'Estás en la misión. Elige tu contribución en secreto. Recuerda tu lealtad.'
- Notificación de Resultado de Misión: '¡Misión Exitosa! Se encontraron 0 votos de Fracaso. ¡Un punto para los Leales!'
- Notificación de Resultado de Misión Saboteada: '¡Misión Saboteada! Se encontró 1 voto de Fracaso. ¡Un punto para los Esbirros!'
- Notificación de Fase de Asesinato: 'Los Leales han triunfado, pero la batalla no ha terminado. Asesino, ahora es tu momento. Elige al jugador que crees que es Merlín para reclamar la victoria.'
## Notas y Personalizaciones

- Roles Opcionales: Permitir al anfitrión añadir o quitar roles avanzados como Oberón (un esbirro que no conoce a los demás) o Mordred (un esbirro invisible para Merlín) para variar la complejidad.
- Variante 'Dama del Lago': Implementar una mecánica opcional donde, a partir de la segunda misión, el poseedor del token de la 'Dama del Lago' puede verificar la lealtad (Leal o Esbirro) de otro jugador. El token pasa al jugador investigado.
- Personalización de Temas: Ofrecer paquetes de temas visuales que cambien la apariencia de las cartas de rol, los avatares y el tablero de juego (ej: Ciencia Ficción, Fantasía Oscura, Cthulhu).
- Velocidad de Juego Ajustable: Permitir al anfitrión establecer límites de tiempo para la selección de equipo, la deliberación y la votación, creando modos de juego 'Normal' y 'Rápido'.
- Historial de Partida: Añadir una pantalla de historial que muestre un resumen de cada ronda: quién fue el líder, qué equipo propuso, quién votó a favor/en contra y el resultado de la misión.
- Modo con Guía para Principiantes: Un modo opcional que ofrezca pistas contextuales y sugerencias estratégicas básicas para los jugadores nuevos, ayudándoles a entender el flujo del juego y las deducciones clave.
