# El Hombre Lobo de Castronegro

# El Hombre Lobo de Castronegro

**Categoría: **Juego de deducción social

## Descripción General del Juego

El Hombre Lobo de Castronegro es un juego de roles ocultos y deducción social diseñado para grupos de 8 a 24 jugadores. En la misteriosa aldea de Castronegro, algunos aldeanos se han convertido en hombres lobo. El juego se divide en dos fases cíclicas: la noche y el día. Durante la noche, los jugadores cierran los ojos mientras el Narrador (la aplicación) llama a los hombres lobo para que, en secreto, elijan y eliminen a un aldeano. Otros roles con habilidades especiales, como la Vidente que puede descubrir la identidad de un jugador, también actúan durante la noche. Al llegar el día, se revela la víctima de los lobos y comienza un intenso debate. Todos los jugadores, sin conocer las verdaderas identidades de los demás, deben discutir, acusar y defenderse para intentar descubrir quiénes son los hombres lobo entre ellos. La fase de día culmina con una votación para linchar a un sospechoso. El jugador con más votos es eliminado y revela su rol. El objetivo de los Aldeanos es eliminar a todos los Hombres Lobo, mientras que los Hombres Lobo ganan cuando su número iguala o supera al de los Aldeanos restantes. El suspense, el engaño y la lógica son clave para la supervivencia.

## Instrucciones Paso a Paso

1. 1. **Preparación y Asignación de Roles**: La aplicación actúa como Narrador. Cada jugador recibe un rol secreto (Aldeano, Hombre Lobo, Vidente, etc.) a través de su dispositivo. Nadie conoce el rol de los demás, excepto los Hombres Lobo, que se conocen entre sí.
1. 2. **Fase de Noche (Primera Noche)**: El Narrador (la app) indica que 'la noche cae' y todos los jugadores deben 'dormir' (cerrar los ojos o mirar hacia abajo). La app llamará secuencialmente a los roles especiales para que realicen sus acciones. Por ejemplo, 'Vidente, despierta. Señala a un jugador para descubrir su verdadera identidad'. Luego, 'Hombres Lobo, despertad. Poneos de acuerdo y elegid una víctima'. La app registra las acciones en secreto.
1. 3. **Fase de Día**: La app anuncia que 'amanece en Castronegro'. Si hubo una víctima durante la noche, se revela su identidad y ese jugador queda eliminado. No podrá hablar ni participar más, pero puede seguir como espectador.
1. 4. **Debate**: Los jugadores supervivientes discuten sobre los eventos. Acusan a otros basándose en sospechas, comportamientos o intuición. Los Hombres Lobo participan en el debate, fingiendo ser aldeanos para desviar la atención.
1. 5. **Votación y Linchamiento**: Tras el debate, la app inicia una fase de votación. Cada jugador vota por la persona que cree que es un Hombre Lobo. El jugador que reciba más votos es 'linchado'.
1. 6. **Revelación**: El jugador linchado es eliminado y debe revelar su carta de rol a todos. El juego avanza inmediatamente a la siguiente fase de noche.
1. 7. **Ciclo del Juego**: Las fases de noche y día se repiten. Los Hombres Lobo eligen una nueva víctima cada noche, y los aldeanos linchan a un nuevo sospechoso cada día.
1. 8. **Condiciones de Victoria**: El juego termina cuando se cumple una de las siguientes condiciones: Los Aldeanos ganan si eliminan a todos los Hombres Lobo. Los Hombres Lobo ganan si su número llega a ser igual o superior al de los Aldeanos restantes.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código, lógica y assets para el juego 'El Hombre Lobo de Castronegro' están encapsulados dentro de una única carpeta dedicada llamada 'hombre-lobo-castronegro' para garantizar la modularidad y evitar conflictos con otros juegos. La navegación dentro del juego se gestiona con Expo Router, ubicando las pantallas en la subcarpeta '/app'. El estado global del juego (jugadores, roles, fase actual, votaciones) se maneja con Zustand (o Redux Toolkit) en un store dedicado. La estructura sigue un principio de separación de responsabilidades: los componentes de la UI están en '/components', la lógica del juego reside en hooks y servicios que interactúan con el store de Zustand, y los datos estáticos como las definiciones de roles se encuentran en '/constants'.

### Archivos Necesarios

- /games/hombre-lobo-castronegro/app/_layout.js
- /games/hombre-lobo-castronegro/app/index.js
- /games/hombre-lobo-castronegro/app/hombre-lobo-castronegro-lobby.js
- /games/hombre-lobo-castronegro/app/hombre-lobo-castronegro-partida.js
- /games/hombre-lobo-castronegro/app/hombre-lobo-castronegro-fin-partida.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroPlayerGrid.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroPlayerAvatar.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroRoleCard.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroTimer.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroVotingModal.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroNightActionOverlay.js
- /games/hombre-lobo-castronegro/components/HombreLoboCastronegroGameLog.js
- /games/hombre-lobo-castronegro/store/hombreLoboCastronegroStore.js
- /games/hombre-lobo-castronegro/constants/hombreLoboCastronegroRoles.js
- /games/hombre-lobo-castronegro/constants/hombreLoboCastronegroPhases.js
- /games/hombre-lobo-castronegro/assets/images/roles/lobo.png
- /games/hombre-lobo-castronegro/assets/images/roles/aldeano.png
- /games/hombre-lobo-castronegro/assets/images/roles/vidente.png
- /games/hombre-lobo-castronegro/assets/images/ui/icono-votacion.png
### Componentes React Native

- HombreLoboCastronegroPlayerGrid: Componente principal de la pantalla de juego que muestra a todos los jugadores, vivos y muertos, en una cuadrícula.
- HombreLoboCastronegroPlayerAvatar: Muestra la foto o avatar de un jugador, su nombre y su estado actual (vivo, muerto, nominado). Es interactivo para permitir la selección durante la votación.
- HombreLoboCastronegroRoleCard: Un componente modal o de pantalla completa que muestra al jugador su rol asignado al inicio de la partida, con su descripción y objetivo.
- HombreLoboCastronegroTimer: Un temporizador visual que muestra el tiempo restante para las fases de debate y votación, añadiendo urgencia al juego.
- HombreLoboCastronegroVotingModal: Un modal que se activa durante la fase de votación, permitiendo al jugador seleccionar a quién linchar o, en el caso de los lobos, a quién eliminar.
- HombreLoboCastronegroNightActionOverlay: Una superposición de pantalla que se muestra durante la noche y presenta las acciones específicas que puede realizar el rol del jugador (ej. 'Elige a quién investigar' para la Vidente).
- HombreLoboCastronegroGameLog: Un área de texto o lista que muestra un resumen de los eventos importantes del juego, como quién murió cada noche y quién fue linchado cada día.
### División Funcional

La funcionalidad se divide en capas claras. La UI (en '/components') es responsable únicamente de la presentación y de emitir eventos de usuario (ej. `onVote(playerId)`). Las pantallas (en '/app') componen la UI y la conectan con la lógica. El estado centralizado se gestiona en '/store/hombreLoboCastronegroStore.js' con Zustand, exponiendo el estado (como `players`, `gamePhase`, `votes`) y las acciones para modificarlo (`setGamePhase`, `addVote`). La lógica principal del juego (transiciones de fase, resolución de votos, condiciones de victoria) se implementa en hooks personalizados (ej. `useHombreLoboGameLogic`) que interactúan con el store. Las constantes del juego, como los roles y sus habilidades, se definen en '/constants' para una fácil configuración y mantenimiento.

## Ejemplos de Preguntas o Contenido Personalizado

- Mensaje de Narrador (Noche): 'Cae la noche sobre Castronegro. Todos duermen profundamente.'
- Mensaje de Acción (Vidente): 'Vidente, despierta. Elige a un jugador para descubrir su verdadera identidad.'
- Mensaje de Acción (Hombres Lobo): 'Hombres Lobo, abrís los ojos. Reconoceos y elegid en silencio a vuestra próxima víctima.'
- Mensaje de Acción (Bruja): 'Bruja, es tu turno. Anoche murió [nombre_víctima]. ¿Quieres usar tu poción de vida para salvarle? ¿O prefieres usar tu poción de veneno en otro jugador?'
- Mensaje de Narrador (Día): '¡Amanece un nuevo y terrible día! Anoche, los lobos atacaron. [Nombre_víctima] ha sido encontrado muerto.'
- Prompt de Debate: 'Tenéis 3 minutos para debatir. ¿Quién es el culpable? ¡Argumentad vuestras sospechas!'
- Prompt de Votación: 'El tiempo de debate ha terminado. Es hora de votar. Seleccionad al jugador que creéis que debe ser linchado.'
## Notas y Personalizaciones

- **Nuevos Roles**: Se pueden añadir roles para aumentar la complejidad y la diversión: el 'Cazador' (al morir, dispara y elimina a otro jugador), 'Cupido' (elige a dos 'amantes' que ganan o mueren juntos), la 'Bruja' (tiene una poción para salvar y otra para matar), el 'Ladrón' (puede cambiar su rol con otro al inicio), o el 'Tonto del Pueblo' (si es linchado por error, los aldeanos se dan cuenta y no hay linchamiento ese día).
- **Variaciones de Reglas**: Implementar un sistema de 'Alcalde', donde en la primera ronda se vota a un líder cuyo voto cuenta doble en los linchamientos. Otra variación es que los jugadores eliminados puedan enviar un último mensaje o seguir como 'fantasmas' sin derecho a voto.
- **Modos de Juego**: Crear un 'Modo Rápido' con tiempos de debate y votación muy cortos para partidas más ágiles. Un 'Modo Caos' que añade eventos aleatorios cada día (ej: 'Hoy no se puede hablar', 'Los votos son públicos').
- **Personalización Temática**: Permitir cambiar la ambientación del juego (ej: 'Aliens en la Estación Espacial', 'Traidores en la Corte Real') con diferentes nombres de roles y gráficos para los avatares y las cartas de rol.
- **Configuración de Partida**: Permitir al anfitrión de la partida seleccionar qué roles especiales estarán en juego, ajustando el equilibrio de poder entre aldeanos y hombres lobo.
