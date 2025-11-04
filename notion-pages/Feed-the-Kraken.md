# Feed the Kraken

# Feed the Kraken

**Categoría: **Juego social de deducción y roles ocultos

## Descripción General del Juego

Feed the Kraken es un juego de deducción social para 5 a 11 jugadores en el que la tripulación de un barco se divide en tres facciones secretas: los Marineros leales, los Piratas y un solitario Líder de Secta adorador del Kraken. El objetivo de los Marineros es llevar el barco a salvo al puerto de Bluewater Bay. Los Piratas, en cambio, intentan navegar de forma encubierta hacia la ensenada carmesí de los Corsarios. Mientras tanto, el Líder de la Secta busca convencer a parte de la tripulación para que le ayuden a invocar a su oscuro señor, el Kraken, desde las profundidades del mar, lanzando a un tripulante por la borda. En cada turno, un Capitán es nominado, quien elige a su Teniente, y este a su vez a un Navegante. Estos tres oficiales determinarán el rumbo del barco mediante un sistema de paso de cartas secretas. El resto de la tripulación observa atentamente, pudiendo iniciar motines, realizar acusaciones o incluso usar la violencia para tomar el control. La confianza es un bien escaso y cada decisión puede acercar a una facción a la victoria mientras condena a las otras.

## Instrucciones Paso a Paso

1. Fase 1: Preparación y Asignación de Roles. Los jugadores se unen a la sala de juego. Una vez que todos están listos, el sistema asigna secretamente un rol a cada jugador (Marinero, Pirata o Líder de Secta) basado en el número total de participantes. Cada jugador puede ver su propio rol y objetivo en privado.
1. Fase 2: Elección del Capitán. Al inicio del juego, el primer jugador en la lista es el Capitán. En turnos posteriores, el rol de Capitán pasa al siguiente jugador, a menos que un motín exitoso cambie el orden.
1. Fase 3: Nombramiento de Oficiales. El Capitán actual elige a un jugador para que sea su Teniente. Luego, el Teniente recién nombrado elige a otro jugador para que sea el Navegante. Ningún jugador puede ocupar dos puestos.
1. Fase 4: Selección de Cartas de Navegación. El Capitán recibe dos cartas de Navegación (Azul, Amarilla o Roja/Kraken). Debe pasar una de estas cartas, boca abajo, al Teniente.
1. Fase 5: El Teniente recibe la carta del Capitán y roba una nueva carta del mazo. Ahora, con dos cartas en la mano, debe elegir una y pasársela, boca abajo, al Navegante.
1. Fase 6: El Navegante recibe la carta del Teniente y roba una nueva carta del mazo. Con dos cartas en la mano, debe elegir una para jugar. Esta carta se revela a todos y el barco se mueve en la dirección correspondiente en el mapa.
1. Fase 7: Acciones de la Tripulación. Después de la navegación, pueden ocurrir varias acciones. Cualquier jugador que no sea un oficial puede iniciar un 'Motín' contra el Capitán. Si la mitad de la tripulación lo apoya, el Capitán va al calabozo y el instigador se convierte en el nuevo Capitán.
1. Fase 8: Acciones del Capitán. El Capitán puede acusar a otro jugador. Todos los demás votan si es 'Culpable' o 'Inocente'. Un veredicto de culpabilidad puede llevar al acusado al calabozo o incluso ser lanzado por la borda.
1. Fase 9: Poderes del Culto y Pistolas. El Líder de la Secta puede realizar rituales secretos para convertir a otros jugadores o usar poderes especiales. Además, algunos jugadores pueden tener pistolas, que pueden usarse para eliminar a otros jugadores del juego.
1. Fase 10: Fin de Turno y Condiciones de Victoria. El turno termina y el rol de Capitán pasa al siguiente jugador. El juego concluye cuando se cumple una de las tres condiciones de victoria: los Marineros llegan a Bluewater Bay, los Piratas llegan a la Ensenada de los Corsarios, o el Líder de la Secta logra invocar al Kraken.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está completamente encapsulado dentro de una carpeta dedicada llamada 'feed-the-kraken' para asegurar la modularidad y evitar conflictos con otros juegos. La estructura interna utiliza React Native con Expo Router para la gestión de pantallas y navegación. El estado global del juego, como la posición del barco, los roles de los jugadores y el turno actual, se gestiona con Zustand por su simplicidad y eficiencia. Se aplica una estricta separación de responsabilidades: los componentes de la interfaz de usuario (UI) están en la carpeta 'components', la lógica de negocio y el estado en 'store', las pantallas en 'app' y los recursos estáticos como imágenes y datos de configuración en 'assets' y 'constants' respectivamente.

### Archivos Necesarios

- /games/feed-the-kraken/app/_layout.js
- /games/feed-the-kraken/app/index.js
- /games/feed-the-kraken/app/feed-the-kraken-game-screen.js
- /games/feed-the-kraken/app/feed-the-kraken-role-reveal.js
- /games/feed-the-kraken/components/FeedTheKrakenBoard.js
- /games/feed-the-kraken/components/FeedTheKrakenPlayerList.js
- /games/feed-the-kraken/components/FeedTheKrakenActionModal.js
- /games/feed-the-kraken/components/FeedTheKrakenNavigationCardSelector.js
- /games/feed-the-kraken/components/FeedTheKrakenStatusDisplay.js
- /games/feed-the-kraken/store/feedTheKrakenStore.js
- /games/feed-the-kraken/constants/FeedTheKrakenGameData.js
- /games/feed-the-kraken/assets/images/board_map.png
- /games/feed-the-kraken/assets/images/role_sailor.png
- /games/feed-the-kraken/assets/sounds/ship_horn.mp3
### Componentes React Native

- FeedTheKrakenBoard: Componente visual que renderiza el tablero del juego, la posición actual del barco y los posibles destinos.
- FeedTheKrakenPlayerList: Muestra la lista de todos los jugadores, sus avatares y los iconos que indican su estado actual (Capitán, Teniente, Navegante, en el Calabozo, etc.).
- FeedTheKrakenActionModal: Un modal multifuncional que se utiliza para todas las interacciones del jugador, como votar en motines y acusaciones, nombrar oficiales o confirmar el uso de un poder.
- FeedTheKrakenNavigationCardSelector: Interfaz que se muestra en privado al Capitán, Teniente y Navegante para que seleccionen la carta de navegación que desean pasar o jugar.
- FeedTheKrakenStatusDisplay: Un panel de información que muestra el estado actual del juego: quién es el Capitán, qué fase del turno está activa y el registro de eventos importantes.
### División Funcional

La arquitectura se divide en cuatro áreas principales: UI, Lógica/Estado, Navegación/Pantallas y Recursos. La UI (en /components) se compone de componentes reutilizables y puros que se encargan de la presentación. La Lógica del Juego y la Gestión de Estado (en /store/feedTheKrakenStore.js) centralizan todo el estado y las funciones que lo modifican, como 'advanceTurn()', 'processVote()' o 'moveShip()', usando Zustand. Las Pantallas (en /app), gestionadas por Expo Router, ensamblan los componentes de la UI y los conectan con el estado del store para construir las vistas que el usuario ve. Finalmente, los Recursos (en /assets y /constants) almacenan datos estáticos como las imágenes de los roles, las reglas de asignación de facciones y los sonidos del juego, manteniendo la configuración separada del código de la aplicación.

## Ejemplos de Preguntas o Contenido Personalizado

- Prompt para el Capitán: 'Elige a tu Teniente entre los miembros de la tripulación.'
- Notificación para un jugador: '[Nombre del Capitán] te ha nominado como Teniente. La tripulación espera tu decisión.'
- Prompt de votación: 'Se ha iniciado un motín contra el Capitán [Nombre del Capitán]. ¿Deseas apoyarlo? (Sí/No)'
- Prompt de selección de carta (privado): 'Has recibido estas dos cartas de navegación. Elige una para pasarla en secreto al siguiente oficial.'
- Mensaje de estado: 'El Navegante ha jugado una carta de navegación AZUL. El barco avanza hacia aguas seguras.'
- Prompt de acusación para el Capitán: '¿A quién de la tripulación deseas acusar de traición?'
- Alerta para el Líder del Culto: 'Las estrellas se alinean. Elige a un tripulante para intentar convertirlo a tu causa en secreto.'
## Notas y Personalizaciones

- Variante de Juego 'Tormenta Súbita': Al principio de cada ronda, se revela una carta de evento que puede alterar las reglas para ese turno, como 'Niebla espesa: El Navegante juega a ciegas' o 'Vientos favorables: El barco se mueve dos espacios'.
- Roles Extendidos: Añadir nuevos roles con habilidades únicas, como el 'Médico' que puede salvar a un jugador de ser lanzado por la borda, o el 'Intendente' que puede confiscar una pistola a otro jugador.
- Mapas Alternativos: Permitir a los jugadores elegir entre diferentes mapas con rutas, peligros y puertos finales distintos para aumentar la rejugabilidad.
- Modo de Juego con Traidor Oculto: Una variante donde no hay facciones, sino un solo 'Traidor' cuyo objetivo es sabotear el viaje sin ser descubierto. El resto de la tripulación gana si llega a cualquier puerto.
- Personalización de Avatares y Barco: Permitir a los jugadores personalizar sus avatares y el aspecto del barco para una experiencia más inmersiva.
- Integración de Logros y Estadísticas: Un sistema que rastrea las victorias de cada jugador con cada facción, las acusaciones exitosas, los motines liderados y otros hitos, otorgando logros desbloqueables.
