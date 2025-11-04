# El Superlativo

# El Superlativo

**Categoría: **Juego Social y de Preguntas

## Descripción General del Juego

El Superlativo es un juego social y de fiesta diseñado para revelar las verdades más graciosas y ocultas de un grupo de amigos. El objetivo principal no es competir, sino generar risas, debates y anécdotas inolvidables. Ideal para 3 o más jugadores, la aplicación funciona como un catalizador de diversión para cualquier reunión. La mecánica es increíblemente sencilla: el móvil presenta una pregunta del tipo '¿Quién es más probable que...?', y todos los jugadores deben señalar simultáneamente a la persona que mejor encaja con esa descripción. No hay respuestas correctas o incorrectas, solo opiniones que dan pie a discusiones hilarantes. La persona que recibe más votos se convierte en el centro de atención de la ronda, teniendo que escuchar (y a menudo defenderse de) las justificaciones de sus amigos. La app se encarga de proporcionar un flujo constante de preguntas variadas, desde situaciones cotidianas hasta escenarios completamente absurdos, asegurando una alta rejugabilidad y que cada partida sea única.

## Instrucciones Paso a Paso

1. Reunir a los jugadores: Junta a 3 o más amigos en un círculo para que todos puedan verse.
1. Iniciar el juego: Un jugador abre la aplicación y pulsa 'Comenzar Juego' en la pantalla de inicio.
1. Leer la pregunta en voz alta: La aplicación mostrará la primera pregunta. El jugador con el móvil debe leerla claramente para todo el grupo.
1. Pensar y prepararse: Todos los jugadores tienen unos segundos para pensar a quién del grupo describe mejor la pregunta.
1. ¡Señalar a la vez!: A la cuenta de tres, o cuando todos estén listos, cada jugador debe señalar de forma simultánea a la persona que ha elegido. No está permitido votarse a sí mismo.
1. Contar los votos: Se hace un recuento rápido de cuántos 'dedos' apuntan a cada persona.
1. El debate: La persona con más votos es la protagonista de la ronda. Los que la votaron deben explicar por qué lo hicieron, a menudo compartiendo historias graciosas como prueba. Este es el corazón del juego.
1. Avanzar a la siguiente ronda: Una vez terminado el debate, el jugador con el móvil pulsa el botón 'Siguiente' para revelar una nueva pregunta, y el ciclo vuelve a empezar.
1. Final del juego: El juego no tiene un final definido. Continúa mientras el grupo se divierta. El verdadero premio son las risas y los buenos momentos.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está encapsulado en su propia carpeta dedicada, '/games/el-superlativo/', para mantenerlo modular y separado de otros juegos. La arquitectura se basa en React Native con Expo, utilizando Expo Router para la navegación entre pantallas. Para la gestión del estado, se emplea una herramienta como Zustand o Redux Toolkit, centralizando la lógica del juego (como el mazo de preguntas y la pregunta actual) en un 'store'. La estructura sigue una clara separación de responsabilidades: los componentes de la interfaz de usuario (UI) son presentacionales, la lógica reside en el 'store' y los hooks, y los datos estáticos como las preguntas se almacenan en la carpeta de constantes.

### Archivos Necesarios

- /games/el-superlativo/app/index.js
- /games/el-superlativo/app/el-superlativo-game.js
- /games/el-superlativo/app/_layout.js
- /games/el-superlativo/components/ElSuperlativoQuestionCard.js
- /games/el-superlativo/components/ElSuperlativoActionButton.js
- /games/el-superlativo/components/ElSuperlativoHeader.js
- /games/el-superlativo/store/elSuperlativoStore.js
- /games/el-superlativo/constants/ElSuperlativoQuestions.js
- /games/el-superlativo/assets/images/el-superlativo-logo.png
- /games/el-superlativo/assets/sounds/el-superlativo-swoosh.mp3
### Componentes React Native

- ElSuperlativoQuestionCard.js: Componente visual que muestra el texto de la pregunta actual. Ocupa la parte central de la pantalla de juego y está diseñado con una tipografía grande y clara para ser visible por todo el grupo. Incluye animaciones de entrada y salida para transiciones suaves entre preguntas.
- ElSuperlativoActionButton.js: Botón principal de la interfaz, utilizado en la pantalla de juego para pasar a la 'Siguiente Pregunta'. Su lógica está conectada a las acciones del store para actualizar el estado del juego.
- ElSuperlativoHeader.js: Cabecera personalizada que se muestra en las pantallas del juego. Puede incluir el logo del juego y un botón para volver al menú principal, manteniendo una identidad visual consistente.
### División Funcional

La arquitectura funcional se divide en capas claras: la UI, gestionada por Componentes de React Native y pantallas de Expo Router, se encarga exclusivamente de la presentación. La Lógica del Juego, que incluye la selección y aleatorización de preguntas y el seguimiento de la ronda actual, está encapsulada en el store de Zustand ('/store/elSuperlativoStore.js'). La Gestión de Estado es centralizada, permitiendo que cualquier componente acceda al estado actual del juego de manera reactiva. Finalmente, los Datos y Assets, como los listados de preguntas en formato JSON o JS ('/constants/') y los recursos multimedia ('/assets/'), están desacoplados de la lógica y la UI.

## Ejemplos de Preguntas o Contenido Personalizado

- ¿Quién es más probable que se ría en un momento serio?
- ¿Quién es más probable que se gaste todo el sueldo en la primera semana?
- ¿Quién es más probable que sobreviva a un apocalipsis zombie gracias a su ingenio?
- ¿Quién es más probable que llore con un anuncio de televisión?
- ¿Quién es más probable que intente hacerse amigo de un fantasma en una casa encantada?
- ¿Quién es más probable que se una a una secta por error?
- ¿Quién es más probable que se olvide de su propio cumpleaños?
- ¿Quién es más probable que pida la comida más rara del menú solo por probarla?
- ¿Quién es más probable que tenga una conversación entera con un contestador automático?
- ¿Quién es más probable que se pierda usando Google Maps?
- ¿Quién es más probable que se declare a alguien por mensaje de texto?
- ¿Quién es más probable que se duerma en una discoteca?
## Notas y Personalizaciones

- Modo Picante (+18): Incluir un paquete de preguntas opcional con contenido para adultos, que los jugadores pueden habilitar al inicio para una partida más atrevida.
- Reglas de Bebida: Adaptar el juego como un 'drinking game'. Por ejemplo, la persona más votada en cada ronda debe beber, o todos beben un sorbo si se votan a sí mismos por error.
- Creador de Preguntas: Añadir una funcionalidad para que los jugadores puedan escribir y añadir sus propias preguntas personalizadas al mazo antes de empezar una partida.
- Sistema de Retos: La persona más votada en una ronda, además del debate, debe cumplir un pequeño reto o castigo divertido elegido por el resto del grupo.
- Paquetes Temáticos: Ofrecer diferentes mazos de preguntas basados en temáticas como 'Oficina', 'Viajes', 'Cultura Pop' o 'Relaciones' para adaptar el juego a diferentes contextos.
- Modo Rápido: Una variante con un temporizador visible para votar y debatir, forzando respuestas rápidas y manteniendo un ritmo de juego muy ágil.
