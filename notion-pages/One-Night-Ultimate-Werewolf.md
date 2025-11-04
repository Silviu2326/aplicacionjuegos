# One Night Ultimate Werewolf

# One Night Ultimate Werewolf

**Categoría: **Juego social de deducción

## Descripción General del Juego

One Night Ultimate Werewolf es una versión ultrarrápida y adictiva del clásico juego del Hombre Lobo, diseñada para 3 a 10 jugadores. A diferencia de su predecesor, aquí no hay moderador, no hay eliminación de jugadores y todo sucede en una sola ronda. El juego se desarrolla en dos fases: una única y caótica noche, seguida de un intenso día de discusión de cinco minutos. Durante la noche, guiados por una aplicación, cada jugador realiza una acción secreta basada en su rol: el Hombre Lobo busca a sus compañeros, la Vidente espía las cartas de otros, el Ladrón intercambia su rol con el de otro jugador, y muchos otros roles alteran el juego. El giro fundamental es que, debido a estos intercambios y acciones, al llegar el día nadie puede estar 100% seguro de cuál es su rol final. El objetivo del equipo de la Aldea es identificar y eliminar al menos a un Hombre Lobo en la votación final. El equipo de los Hombres Lobo gana si ningún lobo es eliminado. Otros roles, como el Curtidor que odia su vida, tienen condiciones de victoria únicas, como conseguir que lo eliminen. Esta incertidumbre constante crea un ambiente de paranoia, faroles y deducciones hilarantes.

## Instrucciones Paso a Paso

1. 1. **Creación y Configuración de la Sala:** El anfitrión inicia una nueva partida. Se genera un código de sala para que otros jugadores se unan desde sus dispositivos. El anfitrión selecciona los roles que participarán en el juego (siempre se usan 'número de jugadores + 3' cartas).
1. 2. **Reparto de Roles:** La aplicación baraja digitalmente los roles seleccionados y asigna secretamente una carta a cada jugador y deja tres cartas boca abajo en el centro. Cada jugador puede ver su rol inicial en su pantalla.
1. 3. **Fase de Noche:** La aplicación anuncia el inicio de la noche y pide a todos los jugadores que 'cierren los ojos' (miren hacia abajo). Luego, la aplicación va llamando a cada rol en un orden preestablecido. Cuando se llama a un rol, el jugador (o jugadores) con ese rol 'despierta' y realiza su acción a través de la interfaz de la aplicación. Por ejemplo, la Vidente tocará en la pantalla la carta de un jugador para verla, o el Ladrón seleccionará a otro jugador para intercambiar su carta.
1. 4. **Fase de Día (Discusión):** Una vez que todos los roles han actuado, la aplicación anuncia que es de día y todos 'despiertan'. Comienza una cuenta atrás (generalmente de 5 minutos). Los jugadores deben ahora discutir, acusar, mentir y deducir basándose en la poca información que tienen y en las posibles acciones nocturnas. El caos se debe a que un jugador que empezó como Aldeano pudo haber sido convertido en Hombre Lobo por el Ladrón sin saberlo.
1. 5. **Votación:** Cuando el temporizador llega a cero, la aplicación inicia la fase de votación. Todos los jugadores votan simultáneamente, seleccionando en su pantalla al jugador que creen que es un Hombre Lobo.
1. 6. **Resolución y Resultados:** La aplicación cuenta los votos. El jugador (o jugadores, en caso de empate) con más votos es eliminado. A continuación, se revelan todas las cartas, mostrando el rol final de cada jugador y las cartas del centro. La aplicación determina y anuncia qué equipo ha ganado la partida según las condiciones de victoria (si un Hombre Lobo fue eliminado, gana la Aldea; si un Aldeano fue eliminado, ganan los Lobos; si el Curtidor fue eliminado, solo gana él).
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está diseñada para ser modular y escalable, encapsulando TODO el juego dentro de una única carpeta dedicada llamada 'one-night-ultimate-werewolf'. Se utiliza React Native con Expo, aprovechando Expo Router para la navegación basada en archivos dentro de la carpeta '/games/one-night-ultimate-werewolf/app/'. Para la gestión del estado global del juego se emplea Zustand, centralizando toda la lógica en un 'store' específico del juego. La estructura sigue un principio de separación de responsabilidades: la UI (componentes visuales) se encuentra en '/components', la lógica de negocio y estado en '/store', las pantallas en '/app', los datos estáticos (como la definición de roles) en '/constants' y los recursos como imágenes y sonidos en '/assets'.

### Archivos Necesarios

- /games/one-night-ultimate-werewolf/app/index.js
- /games/one-night-ultimate-werewolf/app/_layout.js
- /games/one-night-ultimate-werewolf/app/oneNightWerewolfLobby.js
- /games/one-night-ultimate-werewolf/app/oneNightWerewolfSetup.js
- /games/one-night-ultimate-werewolf/app/oneNightWerewolfGame.js
- /games/one-night-ultimate-werewolf/app/oneNightWerewolfResults.js
- /games/one-night-ultimate-werewolf/components/OneNightWerewolfPlayerGrid.js
- /games/one-night-ultimate-werewolf/components/OneNightWerewolfRoleCard.js
- /games/one-night-ultimate-werewolf/components/OneNightWerewolfTimer.js
- /games/one-night-ultimate-werewolf/components/OneNightWerewolfNightActionHandler.js
- /games/one-night-ultimate-werewolf/store/oneNightWerewolfStore.js
- /games/one-night-ultimate-werewolf/constants/OneNightWerewolfRoles.js
- /games/one-night-ultimate-werewolf/assets/images/roles/werewolf.png
- /games/one-night-ultimate-werewolf/assets/images/roles/seer.png
- /games/one-night-ultimate-werewolf/assets/audio/night_phase_narration.mp3
### Componentes React Native

- **OneNightWerewolfPlayerGrid.js**: Componente que renderiza una cuadrícula con los avatares de todos los jugadores en la partida. Durante la fase de votación, este componente se vuelve interactivo para permitir que el jugador seleccione a quién votar.
- **OneNightWerewolfRoleCard.js**: Muestra una carta de rol con su ilustración, nombre y descripción de la habilidad. Se usa para mostrar el rol inicial del jugador y en la pantalla de resultados finales.
- **OneNightWerewolfTimer.js**: Un componente visual que muestra la cuenta atrás durante la fase de discusión, creando una sensación de urgencia.
- **OneNightWerewolfNightActionHandler.js**: Componente clave que se activa durante la fase de noche. Renderiza la interfaz específica para la acción del rol del jugador actual (por ejemplo, muestra las cartas del centro para que el Vidente las elija) y comunica las acciones al store de Zustand.
### División Funcional

La funcionalidad se divide en capas claras: la **UI** (en `/components`) se encarga exclusivamente de la presentación y la captura de eventos del usuario. La **Lógica del Juego y Gestión de Estado** se concentra en el store de Zustand (`/store/oneNightWerewolfStore.js`), que actúa como la única fuente de verdad y contiene todas las funciones que mutan el estado del juego (repartir cartas, procesar acciones nocturnas, calcular el ganador). La **Navegación** es gestionada por Expo Router (`/app`), definiendo las pantallas y el flujo entre ellas. Los **Datos Constantes** (`/constants`) definen los roles, sus habilidades y el orden de la noche, desacoplando los datos de la lógica. Finalmente, los **Assets** (`/assets`) contienen todos los recursos multimedia.

## Ejemplos de Preguntas o Contenido Personalizado

- Narración de Noche: 'Todos, cierren los ojos.'
- Narración de Noche: 'Hombres Lobo, despierten y reconózcanse.'
- Narración de Noche: 'Vidente, despierta. Puedes mirar la carta de un jugador o dos cartas del centro.'
- Narración de Noche: 'Ladrón, despierta. Intercambia tu carta con la de otro jugador. Ahora, mira tu nueva carta.'
- Narración de Noche: 'Alborotadora, despierta. Puedes intercambiar las cartas de otros dos jugadores.'
- Narración de Día: 'Todos, despierten. La discusión comienza ahora. Tienen 5 minutos para encontrar a un Hombre Lobo.'
- Prompt de Votación: '¡Se acabó el tiempo! Voten ahora. Señalen al jugador que creen que debe ser eliminado.'
- Prompt de Resultados: 'El pueblo ha decidido. El jugador eliminado es...'
- Texto de ayuda de Rol (Vidente): 'Durante la noche, puedes ver la carta de otro jugador o dos de las cartas del centro. Usa esta información para ayudar a los aldeanos.'
## Notas y Personalizaciones

- **Expansiones de Roles:** Permitir al anfitrión activar 'packs' de expansión como Daybreak, Vampire o Alien, que añaden nuevos roles y complejidades a la partida. La lógica del juego debe ser capaz de incorporar dinámicamente el orden nocturno de estos nuevos roles.
- **Configuración de Partida Avanzada:** Dar al anfitrión la opción de ajustar la duración del temporizador de discusión, o de activar/desactivar la revelación de los roles del centro al final de la partida para un mayor desafío.
- **Narrador con IA o Personalizado:** Integrar diferentes voces para la narración de la fase de noche, incluyendo la opción de usar voces generadas por IA o packs de voces temáticos (terror, comedia, etc.).
- **Modo de Juego Online:** Implementar una capa de red (usando WebSockets, por ejemplo, con Firebase o un servidor propio) para permitir que los jugadores se unan y jueguen de forma remota, no solo localmente.
- **Historial de Partidas y Estadísticas:** Guardar los resultados de las partidas para que los jugadores puedan ver sus estadísticas personales, como porcentaje de victorias por equipo o por rol jugado.
- **Recomendador de Roles:** Añadir una función que sugiera una combinación de roles equilibrada y divertida basada en el número de jugadores, para ayudar a los nuevos anfitriones a configurar la partida.
