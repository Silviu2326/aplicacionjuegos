# Two Rooms and a Boom

# Two Rooms and a Boom

**Categoría: **Juego social de roles ocultos y negociación

## Descripción General del Juego

Two Rooms and a Boom es un emocionante juego de deducción social para 6 a 30 jugadores. Los participantes se dividen en dos equipos principales: el Equipo Rojo y el Equipo Azul. En secreto, a un jugador del Equipo Azul se le asigna el rol de Presidente, y a un jugador del Equipo Rojo se le asigna el de la Bomba. El objetivo del Equipo Azul es proteger al Presidente, asegurándose de que al final del juego esté en una habitación diferente a la de la Bomba. Por el contrario, el objetivo del Equipo Rojo es que la Bomba y el Presidente terminen en la misma habitación. El juego se desarrolla a lo largo de varias rondas (generalmente tres). En cada ronda, los jugadores, divididos en dos habitaciones físicas, discuten y negocian para elegir un líder. Este líder seleccionará a un número determinado de jugadores (rehenes) para ser intercambiados con la otra habitación. La tensión aumenta con cada ronda a medida que los jugadores intentan deducir quiénes son sus aliados, quiénes sus enemigos y, lo más importante, dónde están el Presidente y la Bomba. Las mentiras, las alianzas frágiles y las revelaciones estratégicas son clave para la victoria.

## Instrucciones Paso a Paso

1. 1. **Configuración de la Partida:** El anfitrión crea una nueva partida en la aplicación. Selecciona el número total de jugadores y elige los roles especiales que se incluirán además del Presidente y la Bomba.
1. 2. **Unirse a la Partida:** Los demás jugadores usan sus dispositivos para unirse a la partida mediante un código único generado por la aplicación.
1. 3. **Asignación de Roles:** Una vez que todos los jugadores se han unido, el anfitrión inicia el juego. La aplicación asigna aleatoriamente y en secreto un rol y un equipo a cada jugador. Cada jugador solo puede ver su propia carta de rol en su pantalla.
1. 4. **División en Habitaciones:** El anfitrión divide físicamente a los jugadores en dos grupos iguales (o lo más iguales posible), que se dirigirán a dos habitaciones separadas. Luego, en la app, asigna a cada jugador a su habitación correspondiente (Habitación 1 o Habitación 2).
1. 5. **Inicio de Ronda:** Comienza la primera ronda. La aplicación muestra un temporizador para la fase de negociación. En cada habitación, los jugadores discuten para elegir a un Líder.
1. 6. **Elección de Líder:** Una vez decidido (por aclamación popular o votación verbal), el Líder designado se identifica en la app. La aplicación le otorga privilegios para la siguiente fase.
1. 7. **Selección de Rehenes:** El Líder de cada habitación debe seleccionar un número de jugadores de su propia habitación para enviar a la otra. El número de rehenes a intercambiar depende de la ronda (ej: 1 rehén en la ronda 1, 2 en la ronda 2, etc.). El Líder realiza la selección en la interfaz de la app.
1. 8. **Intercambio de Jugadores:** Una vez que ambos líderes confirman su selección, la aplicación anuncia quiénes son los rehenes. Estos jugadores deben moverse físicamente a la otra habitación. La app actualiza la lista de jugadores de cada habitación para todos los participantes.
1. 9. **Rondas Siguientes:** Se repiten los pasos 5 a 8 para el número de rondas configurado (generalmente 3). El tiempo de negociación puede disminuir en las rondas finales para aumentar la presión.
1. 10. **Fin del Juego:** Al finalizar la última ronda y el último intercambio de rehenes, el juego termina.
1. 11. **Revelación Final:** La aplicación instruye a todos a permanecer en sus habitaciones. Primero, pide al jugador con el rol de 'Bomba' que revele su identidad en la app. Luego, pide al 'Presidente' que haga lo mismo.
1. 12. **Anuncio del Ganador:** La aplicación comprueba si el Presidente y la Bomba están en la misma habitación. Si es así, anuncia la victoria del Equipo Rojo. Si están en habitaciones separadas, anuncia la victoria del Equipo Azul. Finalmente, muestra una pantalla de resultados con el rol de cada jugador.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código del juego está encapsulado en una carpeta dedicada llamada 'two-rooms-and-a-boom-mobile' para asegurar la modularidad y evitar conflictos con otros juegos. La estructura utiliza React Native con Expo Router para la gestión de rutas y pantallas, alojadas en la subcarpeta '/app'. Para la gestión del estado del juego, se utiliza Zustand, centralizando toda la lógica en un 'store' dedicado. Se sigue un principio de separación de responsabilidades: la UI se define en componentes reutilizables ('/components'), la lógica de negocio y estado en '/store', los datos estáticos como roles y configuración en '/constants', y los recursos gráficos en '/assets'.

### Archivos Necesarios

- /games/two-rooms-and-a-boom-mobile/app/index.js
- /games/two-rooms-and-a-boom-mobile/app/create-game.js
- /games/two-rooms-and-a-boom-mobile/app/lobby/[gameId].js
- /games/two-rooms-and-a-boom-mobile/app/game-screen.js
- /games/two-rooms-and-a-boom-mobile/app/end-game-summary.js
- /games/two-rooms-and-a-boom-mobile/components/TwoRoomsBoomPlayerListItem.js
- /games/two-rooms-and-a-boom-mobile/components/TwoRoomsBoomRoleCard.js
- /games/two-rooms-and-a-boom-mobile/components/TwoRoomsBoomTimerDisplay.js
- /games/two-rooms-and-a-boom-mobile/components/TwoRoomsBoomRoomView.js
- /games/two-rooms-and-a-boom-mobile/store/twoRoomsBoomGameStore.js
- /games/two-rooms-and-a-boom-mobile/constants/TwoRoomsBoomRoles.js
- /games/two-rooms-and-a-boom-mobile/constants/TwoRoomsBoomGameConfig.js
- /games/two-rooms-and-a-boom-mobile/assets/images/president-card.png
- /games/two-rooms-and-a-boom-mobile/assets/images/bomb-card.png
### Componentes React Native

- **TwoRoomsBoomRoomView**: Componente principal en la pantalla de juego. Muestra la habitación actual del jugador, la lista de los demás jugadores en esa habitación y el temporizador de la ronda.
- **TwoRoomsBoomPlayerListItem**: Representa a un jugador en una lista. Muestra el nombre del jugador y, si el usuario actual es el líder, permite seleccionarlo como rehén.
- **TwoRoomsBoomRoleCard**: Muestra la carta de rol secreta del jugador. Incluye el nombre del rol, su imagen, su equipo y la descripción de su objetivo. Se puede ocultar/revelar con un toque.
- **TwoRoomsBoomTimerDisplay**: Un temporizador de cuenta regresiva que muestra el tiempo restante para la negociación en cada ronda.
- **TwoRoomsBoomHostageSelectionModal**: Un modal que se abre para el líder de la habitación, permitiéndole ver a todos los jugadores de su habitación y seleccionar a los que serán intercambiados.
- **TwoRoomsBoomEndGameReveal**: Componente para la pantalla final que muestra la foto y nombre de cada jugador junto a su rol secreto, destacando al Presidente y a la Bomba y en qué habitación terminaron.
### División Funcional

La funcionalidad se divide en cuatro áreas clave: 
1. **UI (Componentes y Pantallas):** Construidos con componentes de React Native, son responsables de renderizar el estado del juego y capturar la entrada del usuario. No contienen lógica de negocio. 
2. **Lógica del Juego (Store):** El store de Zustand ('twoRoomsBoomGameStore.js') actúa como la única fuente de verdad. Contiene el estado completo del juego (jugadores, roles, habitaciones, ronda actual) y las acciones que modifican dicho estado (ej: `assignRoles`, `selectHostages`, `endRound`). 
3. **Gestión de Estado (Zustand):** Se encarga de la reactividad. Cuando una acción modifica el estado en el store, Zustand notifica a todos los componentes suscritos para que se vuelvan a renderizar con la nueva información. 
4. **Constantes y Assets:** Los archivos en '/constants' proveen datos inmutables como las definiciones de roles, mientras que '/assets' almacena imágenes y otros recursos multimedia.

## Ejemplos de Preguntas o Contenido Personalizado

- **Presidente (Equipo Azul):** Eres el objetivo principal del Equipo Rojo. Tu misión es sobrevivir. Al final de la última ronda, debes estar en una habitación DIFERENTE a la de la Bomba. ¡Confía en tu equipo para protegerte!
- **Bomba (Equipo Rojo):** Eres el arma secreta del Equipo Rojo. Tu objetivo es simple y destructivo: al final de la última ronda, debes estar en la MISMA habitación que el Presidente. ¡Usa el engaño para acercarte a tu objetivo!
- **Jugador (Equipo Azul/Rojo):** Eres la columna vertebral de tu equipo. Trabaja con tus compañeros para identificar los roles clave. Protege a tu líder (si eres Azul) o ayuda a tu arma (si eres Rojo).
- **Tímido (Equipo Gris):** Eres un personaje neutral. No puedes revelar tu carta a nadie. Ganas si el equipo con el que estabas en la habitación inicial (Ronda 1) gana el juego.
- **Ingeniero (Equipo Azul):** Durante la fase de revelación de líderes de cada ronda, el líder de tu habitación puede mostrarte la carta de un jugador de tu elección. Usa esta información para guiar a tu equipo.
- **Espía (Equipo Gris):** Eres un agente del caos. Ganas si el Equipo Rojo y el Equipo Azul no ganan (es decir, si otro rol con condición de victoria alternativa, como el Jugador, gana).
- **Médico (Equipo Azul):** Compartes una condición de victoria con el Presidente. Debes terminar en la misma habitación que él para que el Equipo Azul pueda ganar. Eres su guardaespaldas secreto.
- **Kamikaze (Equipo Rojo):** Eres un miembro del Equipo Rojo con un objetivo personal. Ayuda a tu equipo, pero si el Equipo Rojo pierde, TÚ ganas en solitario si logras terminar en una habitación donde no estén ni el Presidente ni la Bomba.
## Notas y Personalizaciones

- **Roles Avanzados:** La aplicación puede incluir un 'set de expansión' con roles más complejos como el Agente Doble, el Cupido, el Terrorista, la Víctima, el Jugador (Gambler) y el Tonto (Fool) para añadir capas de estrategia y engaño.
- **Modo de Juego Rápido:** Se puede ofrecer una configuración para partidas más cortas, con solo dos rondas y tiempos de negociación reducidos, ideal para jugadores nuevos o grupos con poco tiempo.
- **Revelación de Color:** Una variante popular es permitir una fase de 'card sharing' donde los jugadores pueden revelar privadamente solo el color de su equipo (rojo o azul) a otro jugador en su habitación. Esto puede ser una acción de un solo uso por ronda.
- **Eventos Aleatorios:** Para añadir más caos, la app podría introducir eventos aleatorios al inicio de una ronda, como 'Las comunicaciones están cortadas' (no se puede hablar durante 1 minuto) o 'Intercambio forzado' (la app elige un rehén al azar).
- **Configuración de Rondas y Rehenes:** El anfitrión debería poder personalizar completamente el número de rondas (de 1 a 5) y cuántos rehenes se intercambian en cada una, permitiendo crear experiencias de juego muy diferentes.
- **Temas Visuales:** Se podrían ofrecer diferentes temas para las cartas y la interfaz, como un tema de 'espías de la Guerra Fría', 'fantasía medieval' o 'ciencia ficción', para mejorar la inmersión.
