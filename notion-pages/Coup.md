# Coup

# Coup

**Categoría: **Juego de faroleo y estrategia

## Descripción General del Juego

Coup es un juego de engaño y deducción ambientado en un futuro distópico donde los jugadores son líderes de familias influyentes en una ciudad-estado corrupta. El objetivo es ser el último jugador con influencia. Cada jugador comienza con dos cartas de personaje boca abajo, que representan su 'influencia', y dos monedas. Estas cartas pertenecen a una de cinco clases: Duque, Asesino, Capitán, Embajador o Condesa. En su turno, un jugador elige una acción de una lista disponible. Algunas acciones son generales (como tomar una moneda), mientras que otras son específicas de un personaje. La clave del juego es que puedes realizar cualquier acción de personaje, independientemente de las cartas que realmente tengas. Sin embargo, cualquier otro jugador puede desafiar tu acción. Si te desafían y no tienes el personaje que afirmabas tener, pierdes una influencia. Si sí lo tienes, el retador pierde una influencia. El juego es un tenso baile de faroles, contra-faroles y deducción para eliminar a todos los oponentes y concentrar todo el poder en tus manos.

## Instrucciones Paso a Paso

1. 1. **Preparación (Setup)**: Cada jugador recibe 2 monedas y 2 cartas de personaje (influencia) boca abajo. El resto de las cartas forman el mazo de la Corte y las monedas restantes forman el Tesoro.
1. 2. **Turno del Jugador**: En tu turno, debes realizar UNA acción. Las acciones disponibles son:
1.    - **Ingreso**: Toma 1 moneda del Tesoro. No se puede desafiar ni bloquear.
1.    - **Ayuda Exterior**: Toma 2 monedas del Tesoro. Cualquier jugador puede bloquear esta acción afirmando tener un Duque.
1.    - **Golpe de Estado (Coup)**: Paga 7 monedas al Tesoro y elige a otro jugador para que pierda una influencia. Esta acción es imparable. Si comienzas tu turno con 10 o más monedas, DEBES realizar esta acción.
1.    - **Acción de Personaje**: Realiza la acción de uno de los 5 personajes. Puedes hacer esto incluso si no tienes la carta (farolear).
1. 3. **Acciones de Personaje**:
1.    - **Duque (Impuesto)**: Toma 3 monedas del Tesoro.
1.    - **Asesino (Asesinar)**: Paga 3 monedas y elige a un jugador para que pierda una influencia. Esta acción puede ser bloqueada por un jugador que afirme tener una Condesa.
1.    - **Capitán (Extorsionar)**: Roba 2 monedas de otro jugador. Puede ser bloqueado por un jugador que afirme tener un Capitán o un Embajador.
1.    - **Embajador (Intercambio)**: Roba 2 cartas del mazo, míralas junto con tus cartas actuales y devuelve 2 cartas al mazo.
1.    - **Condesa**: Bloquea un intento de Asesinato contra ti.
1. 4. **Desafíos (Challenges)**: Después de que un jugador declare una acción de personaje (o un bloqueo), cualquier otro jugador puede decir '¡Te desafío!'.
1.    - El jugador desafiado debe revelar la carta de personaje correspondiente.
1.    - **Si tiene la carta (Desafío Falla)**: El retador pierde una influencia. El jugador desafiado baraja la carta revelada en el mazo, roba una nueva y la acción se resuelve.
1.    - **Si no tiene la carta (Desafío Exitoso)**: El jugador desafiado pierde una influencia por su farol y la acción se anula.
1. 5. **Pérdida de Influencia**: Cuando un jugador pierde una influencia, debe elegir una de sus cartas boca abajo, voltearla y dejarla boca arriba. Esa carta y sus habilidades ya no se pueden usar.
1. 6. **Eliminación y Victoria**: Cuando un jugador pierde sus dos influencias (sus dos cartas están boca arriba), queda eliminado del juego. El último jugador que conserve al menos una influencia gana la partida.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código para el juego 'Coup' está encapsulada dentro de una única carpeta dedicada llamada 'coup-mobile' para garantizar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo Router para la navegación entre pantallas (lobby, partida, reglas). Para la gestión del estado del juego, se implementa Zustand por su simplicidad y eficiencia, centralizando toda la lógica en un único 'store'. La estructura sigue un claro principio de separación de responsabilidades: los componentes de la interfaz de usuario (UI) se encuentran en la carpeta '/components', la lógica del juego y el estado en '/store', las constantes y datos estáticos del juego en '/constants', y los recursos gráficos como las imágenes de las cartas en '/assets'.

### Archivos Necesarios

- /games/coup-mobile/app/_layout.js
- /games/coup-mobile/app/index.js
- /games/coup-mobile/app/coup-game-screen.js
- /games/coup-mobile/app/coup-rules-screen.js
- /games/coup-mobile/components/CoupPlayerHand.js
- /games/coup-mobile/components/CoupOpponentView.js
- /games/coup-mobile/components/CoupActionModal.js
- /games/coup-mobile/components/CoupChallengeModal.js
- /games/coup-mobile/components/CoupCard.js
- /games/coup-mobile/components/CoupGameLog.js
- /games/coup-mobile/store/coupGameStore.js
- /games/coup-mobile/constants/CoupCharacters.js
- /games/coup-mobile/constants/CoupActions.js
- /games/coup-mobile/assets/images/card-duque.png
- /games/coup-mobile/assets/images/card-asesino.png
- /games/coup-mobile/assets/images/card-condesa.png
- /games/coup-mobile/assets/images/card-capitan.png
- /games/coup-mobile/assets/images/card-embajador.png
### Componentes React Native

- **CoupPlayerHand**: Renderiza el área del jugador actual, mostrando sus cartas de influencia (boca abajo o reveladas), su nombre y su contador de monedas.
- **CoupOpponentView**: Componente que muestra la información de un oponente: avatar, nombre, número de influencias restantes y monedas. Se instancia uno por cada oponente en la mesa.
- **CoupActionModal**: Modal que se activa durante el turno del jugador, presentando botones para todas las acciones posibles (Ingreso, Ayuda Exterior, Coup y las 5 acciones de personaje).
- **CoupChallengeModal**: Modal contextual que aparece cuando un oponente realiza una acción, ofreciendo al jugador las opciones relevantes: 'Desafiar', 'Bloquear' (si es posible) o 'Pasar'.
- **CoupCard**: Componente reutilizable que muestra una carta. Recibe props para determinar si muestra el anverso (el personaje) o el reverso.
- **CoupGameLog**: Un área de texto con scroll que registra los eventos clave de la partida: 'Jugador 1 toma Ingreso', 'Jugador 2 declara Asesinato a Jugador 3', 'Jugador 3 desafía a Jugador 2', etc.
### División Funcional

La funcionalidad está segmentada en capas claras: la UI, representada por los componentes de React Native en `/components`, se encarga exclusivamente de la presentación visual. La lógica del juego, las reglas y la gestión del estado residen en el store de Zustand (`/store/coupGameStore.js`), que actúa como la única fuente de verdad y contiene todas las funciones que mutan el estado (robar carta, procesar desafío, etc.). La navegación y la estructura de las pantallas son manejadas por Expo Router en `/app`. Los datos estáticos, como las habilidades de cada personaje y los tipos de acciones, se definen en `/constants` para mantener el código limpio y mantenible. Finalmente, todos los recursos visuales se alojan en `/assets`.

## Ejemplos de Preguntas o Contenido Personalizado

- Mensaje emergente: 'El Jugador 3 declara que usa al Duque para cobrar Impuesto. ¿Qué quieres hacer?' Opciones: [Desafiar], [Pasar].
- Mensaje emergente: 'El Jugador 2 te intenta Extorsionar con su Capitán. ¿Qué quieres hacer?' Opciones: [Desafiar], [Bloquear con Capitán/Embajador], [Dejar que robe].
- Registro de juego: 'Tu desafío ha tenido éxito. El Jugador 4 no tenía un Asesino. Pierde una influencia.'
- Notificación: 'Es tu turno. Selecciona una acción.'
- Mensaje emergente: 'Tu desafío ha fallado. El Jugador 1 sí tenía una Condesa. Debes revelar una de tus influencias.'
- Registro de juego: 'Nadie desafió tu farol. Has cobrado 3 monedas con el Impuesto del Duque.'
## Notas y Personalizaciones

- **Expansiones del Juego**: Integrar la expansión 'Coup: La Reforma', que añade el rol del Inquisidor y la mecánica de lealtad a facciones, ideal para partidas más grandes.
- **Modos de Juego Alternativos**: Crear un 'Modo Turbo' donde los jugadores comienzan con más monedas o el Coup cuesta menos para partidas más rápidas y agresivas.
- **Personalización de Avatar y Cartas**: Permitir a los usuarios desbloquear o comprar diferentes diseños para el reverso de las cartas, avatares de perfil o temas visuales para el tablero de juego.
- **Tutorial Interactivo**: Implementar un tutorial guiado paso a paso que enseñe a los nuevos jugadores las reglas, la importancia del faroleo y estrategias básicas a través de una partida simulada.
- **Sistema de Ranking y Matchmaking**: Para el juego online, desarrollar un sistema de ELO o de clasificación para emparejar a jugadores de niveles de habilidad similares y mostrar tablas de clasificación globales.
- **Estadísticas de Juego**: Guardar y mostrar estadísticas del jugador, como su personaje más usado, su tasa de éxito en faroles, su tasa de éxito en desafíos, etc.
