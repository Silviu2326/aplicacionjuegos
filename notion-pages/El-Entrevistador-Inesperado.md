# El Entrevistador Inesperado

# El Entrevistador Inesperado

**Categoría: **Juego social

## Descripción General del Juego

El Entrevistador Inesperado es un juego social de improvisación y deducción para 3 o más jugadores, ideal para romper el hielo y desatar la creatividad. El objetivo es simple y divertido: un jugador es elegido como el 'Entrevistado' y la aplicación le asigna en secreto una identidad extremadamente peculiar, como 'un superhéroe que le teme a las alturas' o 'un fantasma que busca trabajo de oficina'. El resto de los jugadores, los 'Entrevistadores', no conocen esta identidad y deben hacerle preguntas de una entrevista de trabajo completamente normal. El desafío para el Entrevistado es responder a estas preguntas de manera coherente con su personaje oculto, dando pistas sutiles pero sin revelar directamente quién es. Los Entrevistadores deben escuchar atentamente e intentar adivinar la identidad secreta basándose en las respuestas hilarantemente fuera de lugar. La ronda termina cuando alguien adivina correctamente o se acaba el tiempo, otorgando puntos tanto al que adivina como al Entrevistado si logra mantener su secreto.

## Instrucciones Paso a Paso

1. 1. Iniciar el juego: Un jugador crea una partida y comparte el código de la sala con los demás.
1. 2. Unirse a la partida: Los demás jugadores introducen el código para unirse a la sala de espera.
1. 3. Comienza la ronda: La aplicación selecciona al azar a un jugador para que sea el 'Entrevistado'. El resto serán los 'Entrevistadores'.
1. 4. Asignación de personaje: El Entrevistado recibe en su pantalla un personaje secreto y único (ej: 'Un T-Rex tratando de conseguir un trabajo como recepcionista'). Solo él puede verlo.
1. 5. La entrevista: La pantalla principal muestra quién es el Entrevistado. Los Entrevistadores comienzan a hacerle preguntas de trabajo estándar por turnos o de forma libre.
1. 6. Responder en personaje: El Entrevistado debe responder a cada pregunta desde la perspectiva de su personaje secreto. Debe ser creativo para dar pistas sin ser demasiado obvio.
1. 7. Adivinar la identidad: En cualquier momento (o al final de un temporizador), los Entrevistadores pueden intentar adivinar el personaje. La aplicación gestiona los turnos de adivinanza.
1. 8. Puntuación: Si un Entrevistador adivina correctamente, ambos (el que adivina y el Entrevistado) ganan puntos. Si nadie adivina antes de que acabe el tiempo, el Entrevistado gana más puntos por su excelente actuación.
1. 9. Nueva ronda: El rol de Entrevistado rota al siguiente jugador y se asigna un nuevo personaje, comenzando una nueva ronda de entrevistas.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego está encapsulada dentro de una única carpeta dedicada '/games/el-entrevistador-inesperado/', garantizando que todo el código, assets y lógica estén contenidos y no interfieran con otros juegos. El proyecto utiliza React Native con Expo, aprovechando Expo Router para una navegación basada en archivos dentro de la carpeta '/games/el-entrevistador-inesperado/app/'. Para la gestión del estado global del juego (como jugadores, puntuaciones, personaje actual y estado del turno), se utiliza Zustand por su simplicidad y rendimiento. La estructura sigue un principio claro de separación de responsabilidades: los componentes de la UI son reutilizables y se encuentran en '/components/', la lógica del juego está centralizada en el store de Zustand en '/store/', y los datos estáticos como listas de personajes y preguntas están en '/constants/'.

### Archivos Necesarios

- /games/el-entrevistador-inesperado/app/_layout.js
- /games/el-entrevistador-inesperado/app/el-entrevistador-inesperado-setup.js
- /games/el-entrevistador-inesperado/app/el-entrevistador-inesperado-reveal.js
- /games/el-entrevistador-inesperado/app/el-entrevistador-inesperado-game.js
- /games/el-entrevistador-inesperado/app/el-entrevistador-inesperado-results.js
- /games/el-entrevistador-inesperado/components/EntrevistadorInesperadoPlayerList.js
- /games/el-entrevistador-inesperado/components/EntrevistadorInesperadoCharacterCard.js
- /games/el-entrevistador-inesperado/components/EntrevistadorInesperadoTimer.js
- /games/el-entrevistador-inesperado/components/EntrevistadorInesperadoGuessModal.js
- /games/el-entrevistador-inesperado/store/entrevistadorInesperadoStore.js
- /games/el-entrevistador-inesperado/constants/EntrevistadorInesperadoCharacters.js
- /games/el-entrevistador-inesperado/constants/EntrevistadorInesperadoQuestions.js
- /games/el-entrevistador-inesperado/assets/images/entrevistador-inesperado-icon.png
- /games/el-entrevistador-inesperado/assets/sounds/entrevistador-inesperado-reveal.mp3
### Componentes React Native

- EntrevistadorInesperadoPlayerList.js: Componente que renderiza la lista de jugadores en la sala, mostrando sus nombres, puntuaciones y un indicador visual de quién es el 'Entrevistado' actual.
- EntrevistadorInesperadoCharacterCard.js: Componente visual que se muestra únicamente en la pantalla del 'Entrevistado' durante la fase de revelación. Muestra de forma clara y destacada el personaje secreto que debe interpretar.
- EntrevistadorInesperadoTimer.js: Un componente que muestra una cuenta atrás. Se utiliza para limitar el tiempo de la entrevista o el tiempo para adivinar, añadiendo urgencia al juego.
- EntrevistadorInesperadoGuessModal.js: Un modal que se abre para que los 'Entrevistadores' puedan escribir y enviar su suposición sobre la identidad del personaje. Incluye un campo de texto y un botón de confirmación.
### División Funcional

La funcionalidad se divide en capas claras: la UI (en /components/) se encarga de la presentación y es agnóstica al estado; la Lógica del Juego (en /store/entrevistadorInesperadoStore.js) maneja el flujo de la partida, la asignación de roles, el cálculo de puntos y los cambios de turno; la Gestión de Estado (Zustand) proporciona un hook centralizado para acceder y modificar el estado del juego desde cualquier componente o pantalla; finalmente, las Pantallas (en /app/) orquestan la interacción entre los componentes de la UI y la lógica del store, respondiendo a las acciones del usuario y a los cambios de estado del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- Ejemplo de Personaje: 'Un vampiro con miedo a la sangre que busca un trabajo de turno de noche.'
- Ejemplo de Pregunta: '¿Cuál diría que es su mayor debilidad?'
- Ejemplo de Respuesta: 'Bueno, tiendo a ser un poco... pálido bajo presión. Y no me va muy bien con los líquidos rojos, me ponen nervioso. Definitivamente soy más productivo cuando el sol se ha ido.'
- Ejemplo de Personaje: 'Un robot que acaba de descubrir las emociones y es demasiado honesto.'
- Ejemplo de Pregunta: '¿Cómo maneja las críticas en el trabajo?'
- Ejemplo de Respuesta: 'Proceso el feedback con una eficiencia del 99.8%. Sin embargo, datos recientes indican que la retroalimentación negativa sobre mi rendimiento induce en mi unidad central una nueva variable llamada 'tristeza', lo cual reduce mi eficiencia operativa en un 12% durante 3.7 minutos.'
- Ejemplo de Personaje: 'Un dragón que intenta ocultar su identidad para ser contable.'
- Ejemplo de Pregunta: '¿Dónde te ves en cinco años?'
- Ejemplo de Respuesta: 'Espero haber acumulado una considerable... colección de activos. Me gustaría tener una posición de mayor responsabilidad, con una oficina más grande, preferiblemente en un piso alto y con buena ventilación. Y que sea a prueba de fuego, por si acaso.'
## Notas y Personalizaciones

- Modo Temático: Antes de empezar, los jugadores pueden elegir un paquete de personajes temático, como 'Fantasía', 'Ciencia Ficción' o 'Animales que Hablan', para enfocar la partida.
- Ronda Relámpago: Una variante con un temporizador mucho más corto (ej. 90 segundos por ronda) para un juego más rápido y caótico.
- Añadir Personajes Propios: Implementar una pantalla de configuración donde los jugadores puedan escribir y añadir sus propias ideas de personajes a la selección aleatoria de la partida.
- Entrevista por Departamentos: En lugar de preguntas genéricas, la app podría sugerir preguntas específicas de un departamento (RRHH, Marketing, Ingeniería), obligando al Entrevistado a adaptar su personaje a contextos más específicos.
