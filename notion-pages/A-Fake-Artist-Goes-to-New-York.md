# A Fake Artist Goes to New York

# A Fake Artist Goes to New York

**Categoría: **Juego social de dibujo y deducción

## Descripción General del Juego

A Fake Artist Goes to New York es un vibrante juego de fiesta que combina el dibujo colaborativo con la deducción social. El objetivo es simple pero desafiante: todos los jugadores, excepto uno, conocen una palabra secreta y deben dibujar una parte de ella en un lienzo compartido. El jugador restante es el 'Artista Falso', que no tiene idea de qué se está dibujando y debe fingir que lo sabe. En cada turno, un jugador añade un único trazo continuo al dibujo. Los artistas reales deben ser lo suficientemente explícitos para que sus compañeros sepan que están en el mismo equipo, pero lo suficientemente sutiles como para no revelar la palabra al impostor. El artista falso, por su parte, debe añadir un trazo que parezca coherente con el resto del dibujo para no ser descubierto. Tras dos rondas de dibujo, todos discuten y votan para eliminar al que creen que es el farsante. Es un juego de tensión, creatividad y engaño para 4 a 10 jugadores, donde la comunicación no verbal y la astucia son clave para la victoria.

## Instrucciones Paso a Paso

1. 1. **Configuración de la Partida:** Un jugador es designado como el 'Maestro de la Pregunta' para la ronda. El resto de los jugadores introducen sus nombres y se unen a la sala.
1. 2. **Selección de la Palabra:** El Maestro de la Pregunta elige una categoría (ej: Animales) y luego una palabra secreta de una lista proporcionada por la aplicación. Esta acción es privada.
1. 3. **Asignación de Roles:** La aplicación asigna los roles en secreto. Los jugadores pasarán el dispositivo de uno en uno para ver su rol. Todos los 'Artistas Reales' verán la palabra secreta. El 'Artista Falso' verá un mensaje como 'Eres el Artista Falso' o simplemente una 'X'.
1. 4. **Inicio del Dibujo:** El Maestro de la Pregunta realiza el primer trazo en el lienzo digital. No puede ser demasiado obvio.
1. 5. **Rondas de Dibujo:** El dispositivo se pasa al siguiente jugador en el orden establecido. Cada jugador, en su turno, debe añadir un único trazo continuo al dibujo. Esto se repite hasta que todos los jugadores (incluido el Maestro de la Pregunta) hayan dibujado dos veces.
1. 6. **Discusión y Votación:** Una vez completado el dibujo, se detiene el juego y comienza la fase de discusión. Los jugadores debaten y acusan a otros de ser el Artista Falso, basándose en la calidad o relevancia de sus trazos.
1. 7. **Votación:** Después de la discusión, se realiza una votación simultánea. Cada jugador vota por la persona que cree que es el impostor.
1. 8. **Resolución y Puntuación:**
1.    - **Si el Artista Falso es descubierto (recibe la mayoría de votos):** El Artista Falso tiene una última oportunidad para ganar. Debe adivinar cuál era la palabra secreta. Si acierta, el Artista Falso y el Maestro de la Pregunta ganan. Si falla, todos los Artistas Reales ganan.
1.    - **Si un Artista Real es eliminado (recibe la mayoría de votos):** El Artista Falso y el Maestro de la Pregunta ganan inmediatamente.
1.    - **En caso de empate en la votación:** Se puede realizar otra ronda de discusión y votación, o se puede declarar una victoria para el Artista Falso.
1. 9. **Nueva Ronda:** El rol de Maestro de la Pregunta rota al siguiente jugador y comienza una nueva ronda.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código fuente, componentes, lógica y assets para el juego 'A Fake Artist Goes to New York' están encapsulados dentro de una única carpeta dedicada llamada 'a-fake-artist-goes-to-new-york' para garantizar la modularidad y evitar conflictos con otros juegos. La estructura de navegación se basa en Expo Router, utilizando el sistema de archivos dentro de la carpeta `/app` para definir las rutas y pantallas. La gestión del estado global del juego se maneja con Zustand (o Redux Toolkit), centralizando toda la lógica del juego en un 'store' dedicado. Se sigue un claro principio de separación de responsabilidades: los componentes de React Native en la carpeta `/components` se encargan exclusivamente de la UI, la lógica reside en `/store`, los datos estáticos como las listas de palabras están en `/constants`, y los recursos gráficos en `/assets`.

### Archivos Necesarios

- /games/a-fake-artist-goes-to-new-york/app/index.js
- /games/a-fake-artist-goes-to-new-york/app/fake-artist-game-lobby.js
- /games/a-fake-artist-goes-to-new-york/app/fake-artist-role-reveal.js
- /games/a-fake-artist-goes-to-new-york/app/fake-artist-drawing-board.js
- /games/a-fake-artist-goes-to-new-york/app/fake-artist-voting.js
- /games/a-fake-artist-goes-to-new-york/app/fake-artist-results.js
- /games/a-fake-artist-goes-to-new-york/app/_layout.js
- /games/a-fake-artist-goes-to-new-york/components/FakeArtistPlayerList.js
- /games/a-fake-artist-goes-to-new-york/components/FakeArtistDrawingCanvas.js
- /games/a-fake-artist-goes-to-new-york/components/FakeArtistColorPalette.js
- /games/a-fake-artist-goes-to-new-york/components/FakeArtistVotingCard.js
- /games/a-fake-artist-goes-to-new-york/store/fakeArtistGameStore.js
- /games/a-fake-artist-goes-to-new-york/constants/FakeArtistWordPacks.js
- /games/a-fake-artist-goes-to-new-york/assets/images/fake-artist-logo.png
### Componentes React Native

- FakeArtistGameLobby: Pantalla inicial para que los jugadores se unan, introduzcan sus nombres y el anfitrión configure las opciones del juego (número de rondas, etc.).
- FakeArtistRoleReveal: Una pantalla que se muestra a cada jugador de forma individual y privada, revelando su rol (Artista Real o Falso) y la palabra secreta (si aplica).
- FakeArtistDrawingCanvas: El componente principal e interactivo del juego. Utiliza una librería como 'react-native-svg' para renderizar los trazos de los jugadores en un lienzo digital y capturar las entradas táctiles.
- FakeArtistPlayerList: Un componente de UI que muestra la lista de todos los jugadores, el orden de los turnos y resalta al jugador que está dibujando actualmente.
- FakeArtistVotingGrid: Muestra una cuadrícula con los avatares o nombres de todos los jugadores para que los usuarios puedan tocar y emitir su voto.
- FakeArtistResultsModal: Un modal que aparece al final de la ronda para anunciar quién fue el Artista Falso, si fue descubierto, el resultado de su adivinanza y quiénes son los ganadores.
### División Funcional

La arquitectura se divide en cuatro áreas principales: la UI (componentes visuales en `/components`), la navegación y estructura de pantallas (gestionada por Expo Router en `/app`), la lógica de juego y gestión de estado (centralizada en un store de Zustand en `/store/fakeArtistGameStore.js`), y los datos estáticos y recursos (en `/constants` y `/assets`). Esta separación permite que los componentes de la UI sean reactivos al estado del juego sin contener lógica compleja, la cual es manejada de forma aislada y predecible en el store.

## Ejemplos de Preguntas o Contenido Personalizado

- Categoría: Animales | Palabras: Pingüino, Jirafa, Gato, Araña, Elefante, Canguro
- Categoría: Comida | Palabras: Pizza, Hamburguesa, Sushi, Plátano, Paella, Tarta
- Categoría: Deportes | Palabras: Fútbol, Baloncesto, Tenis, Natación, Ajedrez, Surf
- Categoría: Objetos de la casa | Palabras: Sofá, Televisión, Lámpara, Tenedor, Cama
- Categoría: Profesiones | Palabras: Médico, Bombero, Astronauta, Chef, Músico
- Categoría: Lugares Famosos | Palabras: Torre Eiffel, Estatua de la Libertad, Coliseo Romano, La Gran Muralla China
## Notas y Personalizaciones

- **Paletas de Colores:** Permitir al Maestro de la Pregunta seleccionar una paleta de colores limitada para el dibujo, añadiendo una capa extra de desafío y creatividad.
- **Packs de Palabras Personalizados:** Añadir la funcionalidad para que los usuarios puedan crear, guardar y compartir sus propias listas de categorías y palabras.
- **Modo Contrarreloj:** Incorporar un temporizador opcional para cada turno de dibujo, aumentando la presión sobre los jugadores y haciendo que los trazos sean más impulsivos.
- **Diferentes Herramientas de Dibujo:** Ofrecer la posibilidad de cambiar el grosor del pincel o incluso añadir herramientas como un 'spray' para variar el estilo de los trazos.
- **Modo 'Doble Agente':** Una variante donde puede haber dos Artistas Falsos que no se conocen entre sí, creando un caos delicioso en partidas con muchos jugadores.
- **Guardar la Obra Maestra:** Implementar un botón al final de la partida para guardar la imagen del dibujo colaborativo en la galería del dispositivo como un recuerdo divertido.
