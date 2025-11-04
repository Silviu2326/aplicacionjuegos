# Salem 1692

# Salem 1692

**Categoría: **Juego de deducción social

## Descripción General del Juego

Salem 1692 es un juego de roles ocultos y deducción social para 4 a 12 jugadores que te sumerge en la paranoia de los juicios de brujas de Salem. Al comienzo de la partida, cada jugador recibe secretamente un rol: Bruja o Aldeano. El objetivo de los Aldeanos es descubrir y eliminar a todas las Brujas. El objetivo de las Brujas es eliminar a todos los Aldeanos o convertirlos en brujas. El juego se desarrolla en dos fases: Noche y Día. Durante la Noche, las Brujas eligen en secreto a un jugador para darle la carta de 'Conspiración'. Si un jugador muere mientras posee esta carta, se convierte en Bruja. Durante el Día, los jugadores roban cartas y juegan acciones, principalmente acusando a otros jugadores. Cuando un jugador acumula suficientes acusaciones, se inicia un juicio. El acusado debe revelar sus cartas de 'Juicio' y el pueblo vota para decidir su destino. La tensión aumenta con cada acusación y cada carta jugada, ya que nadie sabe en quién confiar. Una acusación equivocada puede llevar a la eliminación de un inocente, acercando a las brujas a la victoria.

## Instrucciones Paso a Paso

1. 1. **Preparación (Lobby)**: Los jugadores se unen a la sala de juego. El anfitrión establece el número de jugadores. El sistema reparte automáticamente las cartas de rol ('Bruja' / 'No Bruja') de forma secreta a cada jugador.
1. 2. **Reparto Inicial**: Cada jugador recibe una mano inicial de cartas de juego (generalmente 3) y un conjunto de cartas de 'Juicio' que mantiene ocultas.
1. 3. **Fase de Noche**: El juego comienza con la primera noche. La pantalla se oscurece para todos. Solo las Brujas pueden ver y comunicarse a través de un chat privado para decidir a quién le darán la carta de 'Conspiración'. Una vez que eligen, la carta se transfiere secretamente.
1. 4. **Fase de Día - Turno del Jugador**: El día comienza. En su turno, un jugador roba dos cartas del mazo.
1. 5. **Fase de Día - Jugar Cartas**: Después de robar, el jugador debe jugar una o más cartas de su mano. Las cartas comunes son 'Acusación' (que se coloca sobre otro jugador), 'Coartada' (que elimina una acusación sobre sí mismo), o cartas con efectos especiales (robar cartas, ver la mano de otro jugador, etc.).
1. 6. **Acusación y Juicio**: Cuando un jugador acumula 7 cartas de 'Acusación' sobre él, se detiene el juego y comienza un Juicio. No se pueden jugar más cartas.
1. 7. **El Juicio**: El jugador acusado debe revelar sus cartas de 'Juicio'. Si una de ellas es la carta 'Bruja', inmediatamente se revela como Bruja. Si todas son 'No Bruja', el pueblo aún no está seguro de su inocencia.
1. 8. **La Votación**: Todos los jugadores vivos, incluido el acusado, votan en secreto para 'Salvar' o 'Condenar' al acusado. La interfaz mostrará dos botones para cada jugador.
1. 9. **El Veredicto**: Se cuentan los votos. Si hay más votos de 'Condenar' que de 'Salvar', el jugador acusado es eliminado del juego. Si es al revés o hay empate, sobrevive.
1. 10. **Revelación de Rol**: Cuando un jugador es eliminado (por juicio o por el efecto de una carta), su carta de rol ('Bruja' o 'No Bruja') se revela a todos. Si tenía la carta 'Conspiración', su rol cambia a Bruja antes de ser revelado.
1. 11. **Condiciones de Victoria**: El juego continúa con fases de noche y día hasta que se cumpla una de las condiciones de victoria. Los Aldeanos ganan si eliminan a la última Bruja. Las Brujas ganan si eliminan a todos los jugadores que no son Brujas.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código para el juego 'Salem 1692' está encapsulado dentro de una única carpeta dedicada llamada 'salem-1692' para asegurar la modularidad y evitar conflictos con otros juegos. La aplicación se desarrolla en React Native utilizando Expo. La navegación entre pantallas (lobby, partida, fin de juego) se gestiona con Expo Router, con los archivos de ruta ubicados en 'salem-1692/app/'. Para la gestión del estado global del juego (jugadores, cartas, fases del turno), se utiliza Zustand, centralizando toda la lógica en un 'store' dedicado. La estructura sigue un principio de separación de responsabilidades: la UI se define en componentes reutilizables, la lógica de negocio reside en el store, y los datos estáticos como las definiciones de cartas y los recursos gráficos se encuentran en las carpetas 'constants' y 'assets' respectivamente.

### Archivos Necesarios

- /games/salem-1692/app/index.js
- /games/salem-1692/app/salem1692-game-screen.js
- /games/salem-1692/app/_layout.js
- /games/salem-1692/components/Salem1692PlayerDisplay.js
- /games/salem-1692/components/Salem1692Card.js
- /games/salem-1692/components/Salem1692HandView.js
- /games/salem-1692/components/Salem1692AccusationPile.js
- /games/salem-1692/components/Salem1692NightPhaseModal.js
- /games/salem-1692/components/Salem1692TrialVoteModal.js
- /games/salem-1692/store/salem1692GameStore.js
- /games/salem-1692/constants/Salem1692CardData.js
- /games/salem-1692/constants/Salem1692RoleData.js
- /games/salem-1692/assets/images/card-back-salem.png
- /games/salem-1692/assets/images/role-witch.png
- /games/salem-1692/assets/audio/accusation-sound.mp3
### Componentes React Native

- Salem1692PlayerDisplay: Muestra el avatar de un jugador, su nombre, y si está vivo o muerto. También funciona como el objetivo para jugar cartas de acusación.
- Salem1692Card: Componente reutilizable que renderiza una carta del juego, mostrando su arte y descripción. Maneja interacciones como ser seleccionada y jugada.
- Salem1692HandView: Muestra la mano de cartas del jugador actual en la parte inferior de la pantalla, permitiéndole interactuar con ellas.
- Salem1692AccusationPile: Visualiza las cartas de acusación apiladas sobre un jugador específico.
- Salem1692NightPhaseModal: Un modal que cubre la pantalla durante la fase de noche, mostrando una interfaz especial para que las brujas se comuniquen y tomen su decisión.
- Salem1692TrialVoteModal: Modal que aparece cuando se inicia un juicio. Muestra al acusado, sus cartas de 'Juicio' reveladas y los botones para que cada jugador emita su voto.
### División Funcional

La funcionalidad se divide en cuatro áreas principales: UI, Lógica/Estado, Navegación y Datos Estáticos. La UI (en /components) se compone de componentes 'tontos' que solo renderizan datos y notifican eventos. La Lógica y el Estado (en /store/salem1692GameStore.js) son manejados por Zustand; este store centralizado contiene todo el estado del juego (jugadores, mazo, descartes, fase actual) y las acciones que lo modifican (ej: jugarCarta, iniciarVotacion). La Navegación (en /app) es controlada por Expo Router, definiendo las pantallas y el flujo entre ellas. Los Datos Estáticos (en /constants y /assets) almacenan información que no cambia, como las definiciones de cada carta, roles, imágenes y sonidos, manteniendo el código de lógica limpio y fácil de mantener.

## Ejemplos de Preguntas o Contenido Personalizado

- Contenido de Carta 'Acusación': Coloca esta carta bocarriba frente a otro jugador. Si un jugador tiene 7 acusaciones, comienza un juicio contra él.
- Contenido de Carta 'Coartada': Descarta una carta de 'Acusación' que esté frente a ti. Puedes jugar esta carta fuera de tu turno inmediatamente después de ser acusado.
- Contenido de Carta 'Pistola': Obliga a otro jugador a descartar una carta de su mano al azar.
- Contenido de Carta de Juicio 'Bruja': Si durante un juicio esta es la única carta de 'Juicio' que revelas, te declaras como Bruja. El pueblo aún debe votar.
- Contenido de Carta de Juicio 'No es una Bruja': Revela esta carta durante tu juicio para probar tu inocencia... por ahora.
- Contenido de Carta de Rol 'Agente': Eres un Aldeano. Una vez por partida, durante la noche, puedes elegir a un jugador muerto. Si era una Bruja, tú la mataste. Si era Aldeano, te suicidas por la culpa.
## Notas y Personalizaciones

- Nuevos Roles: Se pueden añadir roles especiales con habilidades únicas para la versión móvil, como el 'Vidente' (puede ver el rol de un jugador una vez por partida) o el 'Bufón' (gana si es condenado en un juicio).
- Modos de Juego Alternativos: Implementar un 'Modo Rápido' donde se necesiten menos acusaciones para un juicio, o un 'Modo Caos' donde los efectos de las cartas son más potentes.
- Personalización de Mazo: Permitir a los jugadores anfitriones habilitar o deshabilitar ciertas cartas de acción antes de empezar la partida para balancear el juego a su gusto.
- Revestimientos Temáticos: Crear skins que cambien la temática del juego, por ejemplo, 'Cyberpunk 2077: Detectives contra Replicantes' o 'Juego de Tronos: Leales contra Traidores', cambiando el arte de las cartas y la interfaz.
- Logros y Estadísticas: Añadir un sistema de logros (ej: 'Gana como Bruja sin ser acusado', 'Sobrevive a 3 juicios') y estadísticas de jugador para fomentar la rejugabilidad.
