# Blood on the Clocktower

# Blood on the Clocktower

**Categoría: **Juego de deducción social

## Descripción General del Juego

Blood on the Clocktower es un juego de deducción social y engaño para 5 a 20 jugadores, guiado por un Narrador (Storyteller). Los jugadores se dividen en dos equipos: el Bien (Aldeanos y Forasteros) y el Mal (el Demonio y sus Esbirros). El objetivo del equipo del Bien es identificar y ejecutar al Demonio. El objetivo del equipo del Mal es sobrevivir y reducir la población de la ciudad hasta que solo queden dos jugadores vivos. Cada jugador recibe un rol único y secreto con una habilidad especial que puede usar para obtener información, proteger a otros o sembrar el caos. El juego se desarrolla en fases de día y noche. Durante el día, los jugadores discuten, comparten (o inventan) información y nominan a otros para su ejecución. Por la noche, la mayoría de los jugadores duermen, mientras que el Narrador despierta a roles específicos para que usen sus habilidades. Una característica clave es que los jugadores eliminados no abandonan el juego; se convierten en fantasmas, pueden seguir discutiendo y tienen un último voto desde la tumba, manteniendo a todos involucrados hasta el final.

## Instrucciones Paso a Paso

1. Paso 1: Preparación (Setup). El Narrador elige un 'guion' (un conjunto predefinido de personajes) y asigna secretamente un rol a cada jugador. La app automatiza este proceso, mostrando a cada jugador su rol en su dispositivo.
1. Paso 2: La Primera Noche. Es una fase de configuración especial. El Narrador (o la app) despierta a ciertos roles en un orden específico para que reciban información inicial crucial. Por ejemplo, el Demonio conoce a sus Esbirros, y la Lavandera (Washerwoman) aprende que uno de dos jugadores es un Aldeano específico.
1. Paso 3: Fase de Día. Todos los jugadores 'despiertan'. Comienza un período de discusión libre. Los jugadores pueden hablar en público o tener conversaciones privadas para compartir información y formar alianzas o sospechas.
1. Paso 4: Nominaciones y Votación. Cualquier jugador vivo puede nominar a otro para su ejecución. Después de cada nominación, hay un breve período de defensa y luego una votación pública a mano alzada. Si una nominación recibe al menos la mitad de los votos de los jugadores vivos, el nominado queda 'en el patíbulo' y el proceso de nominación del día termina.
1. Paso 5: Defensa y Ejecución. El jugador 'en el patíbulo' tiene una última oportunidad para defenderse. Después, se realiza una votación final obligatoria. Si la mayoría de los jugadores vivos vota por ejecutar, el jugador muere. Si no, sobrevive y el día termina sin ejecuciones.
1. Paso 6: Fase de Noche. Todos los jugadores 'duermen'. El Narrador (o la app) despierta a los personajes con habilidades nocturnas en un orden preestablecido para que realicen sus acciones (ej. el Demonio ataca, el Adivino obtiene información, el Monje protege a alguien).
1. Paso 7: Repetir el Ciclo. Un nuevo día comienza. El Narrador anuncia quién murió durante la noche (si alguien murió). El ciclo de día y noche se repite.
1. Paso 8: Fantasmas. Los jugadores muertos se convierten en fantasmas. Pierden su habilidad y no pueden nominar, pero pueden seguir hablando entre ellos. Cada fantasma tiene un último voto que puede usar en cualquier votación de ejecución futura. Una vez usado, no puede volver a votar.
1. Paso 9: Condiciones de Victoria. El equipo del Bien gana si ejecuta con éxito al Demonio. El equipo del Mal gana si el número de jugadores vivos se reduce a dos y el Demonio es uno de ellos. Ciertas habilidades de personajes pueden crear condiciones de victoria alternativas.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego se basa en React Native con Expo. TODO el código y los assets específicos de 'Blood on the Clocktower' están encapsulados dentro de una única carpeta dedicada llamada 'blood-on-the-clocktower' para garantizar la modularidad y evitar conflictos con otros juegos. La navegación entre pantallas se gestiona con Expo Router, utilizando una estructura de archivos en la carpeta '/games/blood-on-the-clocktower/app/'. El estado global del juego (jugadores, roles, fase actual, etc.) se maneja con Zustand para una gestión de estado ligera y eficiente. La estructura sigue un principio claro de separación de responsabilidades: los componentes de UI son reutilizables y se encuentran en '/components', la lógica de juego reside en el store de Zustand en '/store', y los datos estáticos como roles y guiones están en '/constants'.

### Archivos Necesarios

- /games/blood-on-the-clocktower/app/index.js (Pantalla de inicio/unirse a partida)
- /games/blood-on-the-clocktower/app/blood-on-the-clocktower-lobby.js (Sala de espera antes de empezar)
- /games/blood-on-the-clocktower/app/blood-on-the-clocktower-game.js (Pantalla principal del juego para jugadores)
- /games/blood-on-the-clocktower/app/blood-on-the-clocktower-storyteller.js (Interfaz del Narrador, el 'Grimorio' digital)
- /games/blood-on-the-clocktower/app/_layout.js (Configuración de Expo Router para el juego)
- /games/blood-on-the-clocktower/components/BloodOnTheClocktowerPlayerGrid.js
- /games/blood-on-the-clocktower/components/BloodOnTheClocktowerRoleInfoModal.js
- /games/blood-on-the-clocktower/components/BloodOnTheClocktowerGrimoireToken.js
- /games/blood-on-the-clocktower/components/BloodOnTheClocktowerNightPhaseManager.js
- /games/blood-on-the-clocktower/components/BloodOnTheClocktowerVoteTracker.js
- /games/blood-on-the-clocktower/store/bloodOnTheClocktowerStore.js (Store de Zustand para el estado del juego)
- /games/blood-on-the-clocktower/constants/BloodOnTheClocktowerScripts.js (Define los guiones como 'Trouble Brewing')
- /games/blood-on-the-clocktower/constants/BloodOnTheClocktowerRoles.js (Contiene la información de todos los roles)
- /games/blood-on-the-clocktower/assets/images/roles/investigator.png
- /games/blood-on-the-clocktower/assets/audio/night_starts.mp3
### Componentes React Native

- BloodOnTheClocktowerPlayerGrid: Muestra un círculo con los avatares de todos los jugadores, indicando su estado (vivo, muerto, nominado, con voto fantasma restante).
- BloodOnTheClocktowerRoleInfoModal: Un modal que cada jugador puede abrir para ver su rol, su alineación (Bien/Mal) y la descripción detallada de su habilidad.
- BloodOnTheClocktowerGrimoireToken: Componente para la vista del Narrador. Representa a un jugador o un token de información (ej. 'Envenenado', 'Borracho') que el Narrador puede manipular en su grimorio digital.
- BloodOnTheClocktowerNightPhaseManager: Componente de UI que guía al Narrador y a los jugadores a través de la secuencia correcta de acciones nocturnas, mostrando quién debe actuar en cada momento.
- BloodOnTheClocktowerVoteTracker: Un componente visual que aparece durante las votaciones para mostrar en tiempo real quién vota por quién y el resultado final.
### División Funcional

La funcionalidad se divide en cuatro áreas principales: 1) UI (React Components en '/components') se encarga de la presentación visual y la interacción del usuario. 2) Navegación (Expo Router en '/app') gestiona el flujo entre las diferentes pantallas como el lobby, la vista del jugador y la del narrador. 3) Gestión de Estado (Zustand Store en '/store') actúa como la única fuente de verdad para el estado del juego, conteniendo la lógica de las transiciones de fase, la aplicación de habilidades y las condiciones de victoria. 4) Datos y Assets (en '/constants' y '/assets') almacenan información estática como las definiciones de roles, guiones, imágenes y sonidos, manteniendo el código de lógica limpio de datos hardcodeados.

## Ejemplos de Preguntas o Contenido Personalizado

- Interacción del Narrador (a un jugador específico): 'Cocinero, esta noche te indico que hay un par de jugadores malvados sentados uno al lado del otro.'
- Interacción del Narrador (a un jugador específico): 'Adivino, señala a un jugador. Te indicaré con un pulgar arriba o abajo si ese jugador es el Demonio.'
- Interacción del Narrador (a un jugador específico): 'Enterrador, el jugador ejecutado hoy era el 'Alcalde'.'
- Notificación en la app del Demonio: 'Elige a un jugador para atacar esta noche. Este jugador morirá, a menos que sea protegido.'
- Notificación en la app del Empático: 'Esta noche sientes que 1 de tus 2 vecinos vivos es malvado.'
- Anuncio general del Narrador/App al inicio del día: 'Esta mañana, [Nombre del Jugador] ha sido encontrado muerto.'
## Notas y Personalizaciones

- Guiones Personalizados: Permitir a los usuarios avanzados crear, guardar y compartir sus propias listas de personajes ('guiones') para crear experiencias de juego únicas.
- Narrador Automatizado: Una opción para jugar sin un Narrador humano. La aplicación guiaría a todos los jugadores a través de las fases de noche, enviando información secreta a los dispositivos de cada uno y anunciando los resultados durante el día.
- Integración con Chat de Voz: Para partidas remotas, integrar salas de chat de voz. Una sala general para el día, y la capacidad de crear salas privadas para las conversaciones secretas.
- Ayudas Visuales Avanzadas: Implementar un 'Tablero de Información' donde los jugadores puedan tomar notas privadas sobre las pistas y sospechas de cada jugador.
- Modo para Principiantes: Un modo de juego simplificado que utiliza solo los roles más sencillos del guion 'Trouble Brewing' y ofrece más pistas y guías en pantalla para los nuevos jugadores.
- Registro de Eventos: Un historial de juego accesible para todos que registre los eventos públicos (quién nominó a quién, quién fue ejecutado, quién murió por la noche) para ayudar a los jugadores a reconstruir la historia.
