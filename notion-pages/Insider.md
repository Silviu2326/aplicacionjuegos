# Insider

# Insider

**Categoría: **Juego social de deducción

## Descripción General del Juego

Insider es un juego de deducción social y comunicación para 4 a 8 jugadores que combina la adivinación de palabras con la búsqueda de un traidor oculto. Al inicio de cada ronda, se asignan roles en secreto: un jugador es el 'Guía', que conoce la palabra secreta y debe guiar a los demás con respuestas de 'sí' o 'no'; otro es el 'Infiltrado', quien también conoce la palabra pero debe ocultar su conocimiento; y el resto son 'Ciudadanos', que no saben nada. El objetivo principal se divide en dos fases. Primero, todos los jugadores (excepto el Guía) tienen un tiempo limitado, generalmente cinco minutos, para hacer preguntas de sí/no al Guía y adivinar la palabra secreta. El Infiltrado debe usar su conocimiento para dirigir sutilmente las preguntas hacia la respuesta correcta sin delatar su identidad. Si los jugadores no adivinan la palabra antes de que se acabe el tiempo, todos pierden. Si la adivinan, comienza la segunda fase: la discusión y votación. Todos los jugadores, incluido el Guía, debaten quién creen que fue el Infiltrado. Tras la discusión, se realiza una votación. Si la mayoría identifica correctamente al Infiltrado, los Ciudadanos y el Guía ganan. Si votan a un Ciudadano inocente, el Infiltrado gana solo.

## Instrucciones Paso a Paso

1. 1. **Creación de la Sala:** Un jugador crea una sala y comparte el código con los demás. Los jugadores se unen y esperan a que el anfitrión inicie la partida.
1. 2. **Asignación de Roles:** La aplicación asigna los roles en secreto a cada jugador: un 'Guía', un 'Infiltrado' y el resto 'Ciudadanos'. Nadie conoce el rol de los demás.
1. 3. **Revelación de la Palabra:** La aplicación muestra la palabra secreta en la pantalla del Guía y del Infiltrado. Los Ciudadanos solo ven un mensaje indicando que la partida va a comenzar.
1. 4. **Fase de Preguntas:** Se inicia un temporizador (ej. 5 minutos). Todos los jugadores, excepto el Guía, pueden hacer preguntas. El Guía solo puede responder 'Sí', 'No' o 'No lo sé'. El objetivo es adivinar la palabra secreta.
1. 5. **Adivinar la Palabra:** Cualquier jugador (Ciudadano o Infiltrado) que crea saber la palabra puede anunciarlo y decirla. Si es correcta, la fase de preguntas termina inmediatamente. Si no lo es, el juego continúa hasta que se acabe el tiempo.
1. 6. **Fallo en Adivinar:** Si el tiempo se agota y nadie ha adivinado la palabra, el Infiltrado y el Guía pierden, y los Ciudadanos ganan (o todos pierden, según la variante de reglas).
1. 7. **Fase de Discusión:** Si la palabra se adivina, se inicia un nuevo temporizador (ej. 2-3 minutos). Todos los jugadores, incluido el Guía, discuten para identificar al Infiltrado basándose en las preguntas que hizo cada uno.
1. 8. **Votación:** Una vez finalizada la discusión, cada jugador vota por quién cree que es el Infiltrado. El jugador con más votos es acusado.
1. 9. **Resolución y Ganadores:** Se revela el rol del jugador acusado. Si es el Infiltrado, el Guía y los Ciudadanos ganan la partida. Si es un Ciudadano inocente, el Infiltrado gana la partida.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura de la aplicación para el juego 'Insider' está completamente encapsulada dentro de una carpeta dedicada llamada '/games/insider/'. Se utiliza React Native con Expo Router para la navegación, gestionando las diferentes pantallas del juego (lobby, revelación de rol, juego, votación, resultados) a través de archivos en la carpeta '/games/insider/app/'. El estado global del juego (jugadores, roles, palabra secreta, fase actual, temporizador) se gestiona con Zustand (o Redux Toolkit), centralizado en un único store para asegurar una fuente de verdad única y una lógica desacoplada. La estructura sigue una estricta separación de responsabilidades: los componentes de la UI son puros y reutilizables, la lógica de negocio reside en el store, las pantallas actúan como contenedores que conectan la UI con el estado, y los assets (imágenes, sonidos) y constantes (listas de palabras, configuración) están organizados en sus propias carpetas.

### Archivos Necesarios

- /games/insider/app/_layout.js
- /games/insider/app/index.js
- /games/insider/app/insider-role-reveal.js
- /games/insider/app/insider-questioning.js
- /games/insider/app/insider-voting.js
- /games/insider/app/insider-results.js
- /games/insider/components/InsiderPlayerList.js
- /games/insider/components/InsiderRoleCard.js
- /games/insider/components/InsiderTimerDisplay.js
- /games/insider/components/InsiderQuestionLog.js
- /games/insider/components/InsiderVoteController.js
- /games/insider/store/insiderGameStore.js
- /games/insider/constants/insiderWordList.js
- /games/insider/constants/insiderGameConfig.js
- /games/insider/assets/sounds/insider-tick-sound.mp3
- /games/insider/assets/images/insider-background.png
### Componentes React Native

- InsiderPlayerList: Componente que muestra la lista de jugadores en la sala, sus avatares y, durante la fase de votación, los botones para votar por cada uno.
- InsiderRoleCard: Una tarjeta modal o a pantalla completa que se muestra a cada jugador al inicio para revelar su rol (Guía, Infiltrado, Ciudadano) y la palabra secreta si corresponde.
- InsiderTimerDisplay: Un componente visual que muestra la cuenta regresiva del tiempo restante en las fases de preguntas y discusión.
- InsiderQuestionLog: Un área de scroll que muestra el historial de preguntas realizadas y las respuestas del Guía ('Sí'/'No'), permitiendo a los jugadores analizar patrones.
- InsiderVoteController: Gestiona la interfaz de votación, mostrando qué jugadores ya han votado y permitiendo al usuario emitir su voto final.
### División Funcional

La funcionalidad se divide en cuatro capas principales: 1) **UI (Componentes):** Ubicada en `/games/insider/components/`, contiene componentes presentacionales que renderizan datos y no tienen lógica de negocio. 2) **Pantallas (Expo Router):** En `/games/insider/app/`, actúan como contenedores que organizan los componentes y los conectan con el estado del juego. 3) **Gestión de Estado y Lógica (Store):** El archivo `/games/insider/store/insiderGameStore.js` (usando Zustand) centraliza todo el estado del juego (jugadores, roles, fase actual) y las acciones que lo modifican (asignar roles, iniciar temporizador, procesar voto). Esta es la 'caja negra' de la lógica del juego. 4) **Datos y Recursos (Constants/Assets):** Las carpetas `/games/insider/constants/` y `/games/insider/assets/` almacenan datos estáticos como listas de palabras, configuración del juego, imágenes y sonidos, manteniéndolos separados del código lógico y la UI.

## Ejemplos de Preguntas o Contenido Personalizado

- Suponiendo que la palabra secreta es 'Abeja':
- ¿Es un objeto inanimado?
- ¿Es un ser vivo?
- ¿Es un animal?
- ¿Tiene más de cuatro patas?
- ¿Puede volar?
- ¿Produce algo que los humanos comen?
- ¿Es de color amarillo y negro?
- ¿Vive en una colmena?
- ¿Está relacionado con las flores?
## Notas y Personalizaciones

- **Temas de palabras:** Permitir a los jugadores elegir una categoría para la palabra secreta antes de empezar (ej: 'Animales', 'Películas', 'Tecnología', 'Comida').
- **Roles Adicionales:** Introducir roles como el 'Seguidor' (un Ciudadano que conoce la identidad del Infiltrado y debe ayudarlo a ganar sin ser descubierto) o el 'Bocazas' (un Ciudadano que tiene prohibido hablar durante la discusión).
- **Modo por Equipos:** Jugar en dos equipos, cada uno con su propio Infiltrado. El primer equipo en adivinar la palabra y descubrir al Infiltrado del otro equipo gana.
- **Castigos por Adivinanza Incorrecta:** Si un jugador intenta adivinar la palabra y falla, podría tener una penalización, como no poder hacer más preguntas durante un minuto.
- **Modo sin Guía:** La aplicación asume el rol del Guía, respondiendo automáticamente a las preguntas. Esto elimina la posibilidad de analizar el comportamiento del Guía, centrando toda la sospecha en los que preguntan.
