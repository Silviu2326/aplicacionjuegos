# Spyfall

# Spyfall

**Categoría: **Juego social de deducción

## Descripción General del Juego

Spyfall es un emocionante juego de deducción social y bluffing diseñado para 3 a 12 jugadores. En cada ronda, todos los jugadores reciben una carta que revela una ubicación secreta común, como un casino, una estación espacial o un circo. Sin embargo, un jugador recibe una carta de 'Espía', sin saber cuál es la ubicación. El objetivo de los jugadores es identificar al espía mediante una serie de preguntas astutas y respuestas vagas. El objetivo del espía es pasar desapercibido, escuchar atentamente las pistas y adivinar la ubicación antes de que lo descubran. El juego se desarrolla en rondas rápidas, generalmente de 8 minutos, donde la tensión aumenta con cada pregunta. Los jugadores deben ser sutiles: si una pregunta es demasiado obvia, el espía descubrirá la ubicación fácilmente; si es demasiado vaga, el que pregunta podría ser acusado de ser el espía. Es un equilibrio perfecto entre ingenio, engaño y sospecha, ideal para fiestas y reuniones.

## Instrucciones Paso a Paso

1. 1. **Creación de la Sala:** Un jugador crea una sala de juego y comparte el código con los demás. Los jugadores se unen a la sala de espera (lobby).
1. 2. **Inicio de la Partida:** Una vez que todos los jugadores están listos, el anfitrión inicia la partida. La aplicación elige una ubicación aleatoria de la lista seleccionada y la asigna a todos los jugadores, excepto a uno.
1. 3. **Asignación de Roles:** Un jugador es elegido al azar para ser el 'Espía' y recibe una carta que simplemente dice 'Espía'. Los demás jugadores reciben una carta que muestra la ubicación secreta.
1. 4. **Inicio de la Ronda:** Comienza un temporizador (configurable, por ejemplo, 8 minutos). El jugador que inicia la partida es elegido al azar.
1. 5. **Fase de Preguntas:** El primer jugador elige a otro jugador y le hace una pregunta relacionada con la ubicación. La pregunta debe ser lo suficientemente específica para que un jugador inocente pueda dar una respuesta creíble, pero lo suficientemente vaga para no revelar la ubicación al espía.
1. 6. **Fase de Respuestas:** El jugador que recibe la pregunta debe responder de manera coherente con la ubicación, demostrando que no es el espía. Después de responder, este jugador elige a otro participante (que no sea quien le preguntó) y le hace una nueva pregunta.
1. 7. **Acusación:** En cualquier momento, un jugador puede detener el temporizador y acusar a otro de ser el espía. Todos los jugadores votan. Si la acusación recibe un voto unánime (o mayoritario, según la configuración), el jugador acusado revela su rol. Si era el espía, los demás jugadores ganan la ronda. Si no lo era, el espía gana inmediatamente.
1. 8. **Adivinanza del Espía:** El espía puede, en cualquier momento, detener el juego, revelar su identidad y intentar adivinar la ubicación. Si acierta, el espía gana la ronda. Si falla, los demás jugadores ganan.
1. 9. **Fin del Temporizador:** Si el tiempo se agota, los jugadores entran en una fase de votación obligatoria para acusar a alguien. Si no se llega a un acuerdo unánime, el espía gana.
1. 10. **Puntuación:** Se otorgan puntos al final de cada ronda: los jugadores ganan puntos si descubren al espía; el espía gana más puntos si adivina la ubicación o si sobrevive sin ser descubierto.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego está contenida íntegramente dentro de una carpeta dedicada llamada 'spyfall-mobile' para asegurar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo, aprovechando Expo Router para la navegación entre pantallas (lobby, juego, resultados). La gestión del estado global del juego (jugadores, roles, ubicación actual, estado del temporizador) se maneja con Zustand, centralizando la lógica en un 'store' dedicado. Se sigue una clara separación de responsabilidades: la UI se construye con componentes reutilizables, la lógica del juego reside en el store y las pantallas, y los datos estáticos como las ubicaciones se almacenan en la carpeta de constantes. Los assets (imágenes, sonidos) también están organizados en su propia carpeta.

### Archivos Necesarios

- /games/spyfall-mobile/app/_layout.js
- /games/spyfall-mobile/app/spyfall-lobby.js
- /games/spyfall-mobile/app/spyfall-game-screen.js
- /games/spyfall-mobile/app/spyfall-results-screen.js
- /games/spyfall-mobile/components/SpyfallPlayerAvatar.js
- /games/spyfall-mobile/components/SpyfallPlayerList.js
- /games/spyfall-mobile/components/SpyfallRoleCardView.js
- /games/spyfall-mobile/components/SpyfallTimerDisplay.js
- /games/spyfall-mobile/components/SpyfallLocationsModal.js
- /games/spyfall-mobile/components/SpyfallVoteUI.js
- /games/spyfall-mobile/components/SpyfallHeader.js
- /games/spyfall-mobile/store/spyfallStore.js
- /games/spyfall-mobile/constants/SpyfallLocations.js
- /games/spyfall-mobile/constants/SpyfallGameRules.js
- /games/spyfall-mobile/assets/images/spyfall-card-back.png
- /games/spyfall-mobile/assets/images/spy-icon.png
- /games/spyfall-mobile/assets/sounds/spyfall-timer-tick.mp3
### Componentes React Native

- SpyfallPlayerList: Componente que muestra la lista de jugadores en la sala y durante la partida, indicando quién es el turno actual.
- SpyfallRoleCardView: Vista que se muestra al inicio de la ronda y que revela al jugador su rol (ubicación o espía) de forma privada.
- SpyfallTimerDisplay: Componente visual que muestra la cuenta regresiva del temporizador de la ronda.
- SpyfallLocationsModal: Un modal que el espía puede abrir para ver la lista completa de posibles ubicaciones y seleccionar su suposición.
- SpyfallVoteUI: Interfaz que se activa durante una acusación para que los jugadores emitan su voto.
- SpyfallHeader: Componente de encabezado reutilizable para las diferentes pantallas del juego, mostrando el título o información relevante.
- SpyfallPlayerAvatar: Componente para mostrar el avatar y el nombre de un jugador, posiblemente con indicadores de estado (ej: votó, hablando).
### División Funcional

La funcionalidad se divide en capas claras: la capa de presentación (UI) está formada por componentes de React Native que son mayormente declarativos y reciben datos a través de props. La capa de estado, gestionada por Zustand en 'spyfallStore.js', contiene todo el estado del juego (lista de jugadores, roles, ubicación, tiempo restante) y las acciones para modificarlo (ej: `startGame`, `makeAccusation`). La capa de navegación, controlada por Expo Router, define las pantallas y las transiciones entre ellas. Finalmente, la lógica de negocio principal y las reglas del juego se encapsulan como acciones dentro del store para mantener los componentes limpios y centrados en la renderización.

## Ejemplos de Preguntas o Contenido Personalizado

- Contexto: La ubicación es un 'Submarino'. Pregunta sugerida: '¿Hace cuánto que no ves el sol?' (Una respuesta como 'mucho tiempo' es segura para un jugador, pero ambigua para el espía).
- Contexto: La ubicación es un 'Circo'. Pregunta sugerida: '¿Te gusta tu uniforme de trabajo?' (Permite respuestas variadas: payaso, trapecista, vendedor... todas encajan).
- Contexto: La ubicación es una 'Nave Pirata'. Pregunta sugerida: '¿Qué es ese olor tan fuerte?' (Puede ser pólvora, ron, el mar...).
- Contexto: La ubicación es una 'Universidad'. Pregunta sugerida: '¿Tienes prisa por irte de aquí?' (Un estudiante podría decir que sí, un profesor que no).
- Contexto: La ubicación es un 'Hospital'. Pregunta sugerida: '¿Cuándo crees que podremos salir de aquí?' (Un paciente, un médico o una visita responderían de forma muy diferente).
- Preguntas genéricas que funcionan en muchos sitios: '¿Cómo está el tiempo afuera?', '¿Recibes un buen sueldo aquí?', '¿Es un lugar muy concurrido?'
## Notas y Personalizaciones

- **Paquetes de Ubicaciones:** Permitir a los jugadores elegir o comprar paquetes temáticos de ubicaciones, como 'Fantasía Medieval', 'Ciencia Ficción', 'Lugares Históricos' o incluso crear sus propios paquetes personalizados.
- **Modo con Roles:** Añadir un nivel de complejidad asignando un rol específico a cada jugador en la ubicación (ej: en el 'Banco', los roles podrían ser 'Cajero', 'Cliente', 'Guardia', 'Gerente'). Esto da más pistas a los jugadores y más información para que el espía se confunda.
- **Múltiples Espías:** Para grupos grandes (8+ jugadores), introducir la opción de tener dos espías que no se conocen entre sí. Esto aumenta la paranoia y la dificultad para los jugadores.
- **Configuración Avanzada de Partida:** Permitir al anfitrión ajustar parámetros como el tiempo de la ronda, el número de votos necesarios para una acusación exitosa, y si la lista de ubicaciones es visible para el espía durante la ronda.
- **Sistema de Puntuación Acumulativo:** Implementar un modo de juego de varias rondas donde los puntos se acumulan, creando un ganador general al final de una sesión de juego en lugar de ganadores por ronda.
- **Eventos Aleatorios:** Introducir eventos a mitad de la ronda que alteren el juego, como 'Se invierte el orden de las preguntas' o 'Durante 30 segundos, solo se pueden hacer preguntas de sí o no'.
