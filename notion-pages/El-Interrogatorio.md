# El Interrogatorio

# El Interrogatorio

**Categoría: **Juego social de deducción

## Descripción General del Juego

El Interrogatorio es un juego de deducción social para 3 o más jugadores, perfecto para romper el hielo y desatar la creatividad. El objetivo es simple pero desafiante: un jugador, designado como el 'sospechoso', recibe una situación secreta y absurda a través de la aplicación (por ejemplo, 'Pintaste el coche de tu vecino de rosa'). Los demás jugadores, los 'detectives', no conocen esta situación. Su misión es descubrir exactamente qué hizo el sospechoso haciendo preguntas. Sin embargo, hay un giro: los detectives tienen un número limitado de preguntas para resolver el caso, y el sospechoso solo puede responder con 'Sí', 'No' o 'Quizás/Irrelevante'. El sospechoso debe ser honesto, pero puede usar la ambigüedad de sus respuestas para despistar a los detectives. El juego pone a prueba la astucia del sospechoso para ocultar la verdad y la agudeza de los detectives para conectar las pistas y formular las preguntas correctas antes de que se agoten. Ganan los detectives si adivinan la situación correctamente; gana el sospechoso si logra confundirlos hasta el final.

## Instrucciones Paso a Paso

1. 1. Inicio y Configuración: El grupo inicia el juego en la aplicación. Se configuran los parámetros de la partida: se añaden los nombres de los jugadores y se establece el número de preguntas que tendrán los detectives (por ejemplo, 20 preguntas).
1. 2. Asignación de Rol: La aplicación selecciona aleatoriamente a un jugador para que sea el 'sospechoso' en la primera ronda.
1. 3. El Secreto: La aplicación muestra en pantalla una situación secreta, visible únicamente para el sospechoso. El sospechoso debe leerla, memorizarla y pulsar 'Entendido' para ocultarla.
1. 4. Comienza el Interrogatorio: El sospechoso pasa el móvil o lo coloca en el centro. La pantalla principal del juego ahora muestra los nombres de los detectives y el contador de preguntas restantes.
1. 5. Formulación de Preguntas: Por turnos, los detectives hacen una pregunta al sospechoso para intentar deducir la situación. Las preguntas deben ser formuladas para que puedan ser respondidas con 'Sí', 'No' o 'Quizás'.
1. 6. Las Respuestas del Sospechoso: El sospechoso responde a cada pregunta de forma veraz pero estratégica. 'Quizás' o 'Irrelevante' pueden usarse si la pregunta no se aplica directamente a la situación.
1. 7. Conteo de Preguntas: Después de cada pregunta, uno de los detectives marca en la aplicación que se ha usado una pregunta, y el contador disminuye.
1. 8. La Acusación: En cualquier momento, si los detectives creen saber la respuesta, pueden detener el interrogatorio y hacer una acusación final. Si se equivocan, el sospechoso gana la ronda inmediatamente.
1. 9. Fin de la Ronda: La ronda termina cuando los detectives hacen una acusación o cuando se agotan las preguntas. En este último caso, deben formular su mejor teoría con la información que tienen.
1. 10. La Revelación y Puntuación: El sospechoso revela la situación real. La aplicación muestra la pantalla de resultados. Los detectives ganan un punto si acertaron. El sospechoso gana un punto si no lo hicieron.
1. 11. Nueva Ronda: Se inicia una nueva ronda, y la aplicación asigna a un nuevo jugador como sospechoso.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego está encapsulada dentro de una única carpeta dedicada '/games/el-interrogatorio' para asegurar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo, aprovechando Expo Router para la navegación basada en archivos dentro de la carpeta '/games/el-interrogatorio/app'. La gestión del estado global del juego (jugadores, sospechoso actual, situación, preguntas restantes) se centraliza mediante Zustand para una implementación ligera y eficiente. La estructura sigue un principio de separación de responsabilidades: la UI se define en componentes reutilizables, la lógica de negocio y estado se maneja en el store, y los datos estáticos como las situaciones se almacenan en constantes. Todos los archivos y componentes llevan el prefijo o sufijo 'Interrogatorio' para garantizar nombres únicos en todo el proyecto.

### Archivos Necesarios

- /games/el-interrogatorio/app/_layout.js
- /games/el-interrogatorio/app/index.js
- /games/el-interrogatorio/app/interrogatorio-asignacion.js
- /games/el-interrogatorio/app/interrogatorio-secreto.js
- /games/el-interrogatorio/app/interrogatorio-ronda.js
- /games/el-interrogatorio/app/interrogatorio-revelacion.js
- /games/el-interrogatorio/components/InterrogatorioPlayerInput.js
- /games/el-interrogatorio/components/InterrogatorioGameSettings.js
- /games/el-interrogatorio/components/InterrogatorioQuestionCounter.js
- /games/el-interrogatorio/components/InterrogatorioSecretCard.js
- /games/el-interrogatorio/components/InterrogatorioHeader.js
- /games/el-interrogatorio/store/interrogatorioStore.js
- /games/el-interrogatorio/constants/interrogatorioSituations.js
- /games/el-interrogatorio/assets/images/interrogatorio-logo.png
- /games/el-interrogatorio/assets/sounds/interrogatorio-gavel.mp3
### Componentes React Native

- InterrogatorioPlayerInput: Un componente para que los usuarios introduzcan sus nombres al inicio de la partida.
- InterrogatorioGameSettings: Permite configurar opciones como el número de preguntas por ronda o seleccionar categorías de situaciones.
- InterrogatorioQuestionCounter: Un componente visual destacado que muestra el número de preguntas restantes y se actualiza en tiempo real.
- InterrogatorioSecretCard: La tarjeta que se muestra al sospechoso con la situación secreta, con un diseño que evoca un 'expediente clasificado'.
- InterrogatorioHeader: Un encabezado reutilizable para las diferentes pantallas del juego, que muestra el título y quizás el jugador actual o la ronda.
### División Funcional

La funcionalidad se divide en capas claras: la capa de presentación (UI) está compuesta por componentes de React Native que consumen datos del estado; la capa de lógica de negocio y estado es gestionada por un store de Zustand ('interrogatorioStore'), que centraliza todas las acciones y el estado del juego (jugadores, roles, progreso de la ronda); la navegación entre pantallas (configuración, asignación, juego, revelación) es manejada por Expo Router; y los datos estáticos, como la lista de posibles situaciones, se aíslan en la carpeta 'constants' para facilitar su gestión y actualización.

## Ejemplos de Preguntas o Contenido Personalizado

- Cambiaste el azúcar por la sal en la cafetera de la oficina.
- Te comiste la última porción de tarta de cumpleaños y culpaste a tu hermano pequeño.
- Usaste el champú más caro de tu pareja para lavar al perro.
- Le dijiste a un turista una dirección completamente equivocada a propósito.
- Rompiste la silla favorita de tu abuela y la escondiste en el armario.
- Te hiciste pasar por un famoso en una cafetería para conseguir una bebida gratis.
- Enviaste un meme inapropiado al grupo de chat del trabajo por error.
- Adoptaste un pato en secreto y lo tienes en la bañera.
- Ordenaste una pizza con piña para compartir, sabiendo que todos la odian.
## Notas y Personalizaciones

- Modo Temático: Crear paquetes de situaciones (ej: 'En la Oficina', 'Drama Familiar', 'Vacaciones Desastrosas') que los jugadores pueden comprar o desbloquear.
- Roles Adicionales: Introducir el rol del 'Cómplice', un detective que conoce la situación y cuyo objetivo es desviar sutilmente la investigación sin ser descubierto.
- Sistema de Pistas: Permitir que el sospechoso use un número limitado de 'pistas de una palabra' si los detectives están muy perdidos.
- Modo Cronometrado: Añadir un temporizador para toda la ronda de interrogatorio para aumentar la presión sobre los detectives.
- Interrogatorio Avanzado: En lugar de 'Sí/No/Quizás', el sospechoso responde con una escala (ej: 'Muy cierto', 'Poco cierto', 'Falso', 'Irrelevante'), lo que añade más matices.
- Personalización de Situaciones: Permitir a los jugadores escribir y guardar sus propias situaciones personalizadas para usarlas en futuras partidas.
