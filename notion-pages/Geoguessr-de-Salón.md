# Geoguessr de Salón

# Geoguessr de Salón

**Categoría: **Juego de trivia y adivinanzas social

## Descripción General del Juego

Geoguessr de Salón es una adaptación social y colaborativa del popular juego de geografía, diseñada para jugar en grupo con un solo dispositivo móvil. El objetivo es que los jugadores, llamados 'Exploradores', adivinen una ubicación aleatoria del mundo (país o ciudad) que se muestra en la pantalla del móvil. Un jugador, 'el Guía', es el único que puede ver la imagen y el nombre de la ubicación. Los Exploradores deben deducir el lugar haciendo preguntas de sí o no al Guía. Por ejemplo: '¿Estamos en Asia?', '¿Este país tiene acceso al mar?'. El Guía solo puede responder 'Sí', 'No' o 'Irrelevante'. El juego fomenta la comunicación, el razonamiento deductivo y el conocimiento geográfico. Se juega por rondas, y en cada una, un nuevo jugador asume el rol de Guía. Gana el jugador o equipo que acumule más puntos al adivinar correctamente las ubicaciones. Es ideal para 2 o más jugadores y perfecto para reuniones, fiestas o como una actividad familiar entretenida y educativa.

## Instrucciones Paso a Paso

1. 1. **Configuración Inicial:** El grupo elige el modo de juego ('Adivinar País' o 'Adivinar Ciudad') y el número de rondas a jugar. Se introducen los nombres de los jugadores.
1. 2. **Inicio de Ronda:** La aplicación selecciona aleatoriamente al primer jugador que será 'el Guía'. El resto de los jugadores son 'los Exploradores'.
1. 3. **El Guía Observa:** El Guía toma el móvil y la aplicación le muestra una imagen de un lugar del mundo junto con su nombre (ej: 'París, Francia'). El Guía no debe mostrar la pantalla a los demás.
1. 4. **Fase de Preguntas:** Los Exploradores, por turnos, hacen una pregunta de respuesta 'Sí/No' al Guía para intentar acotar la ubicación. El Guía debe responder con sinceridad.
1. 5. **Intento de Adivinanza:** En cualquier momento de su turno, un Explorador puede decidir no preguntar y en su lugar intentar adivinar la ubicación. 
1. 6. **Resolución de la Adivinanza:** Si el Explorador acierta, gana un punto y la ronda termina. La aplicación revela la ubicación a todos los jugadores. Si falla, ese jugador podría recibir una penalización (ej: no puede preguntar en su siguiente turno) y el juego continúa.
1. 7. **Fin de la Ronda:** Una vez que la ubicación es adivinada, la aplicación muestra el marcador actualizado.
1. 8. **Siguiente Ronda:** El rol de Guía rota al siguiente jugador en la lista, y se inicia una nueva ronda con una nueva ubicación.
1. 9. **Fin del Juego:** El juego termina cuando se completa el número de rondas preestablecido. El jugador con la puntuación más alta es declarado ganador.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código para 'Geoguessr de Salón' está completamente encapsulada dentro de una única carpeta dedicada llamada 'geoguessr-de-salon' para garantizar la modularidad y evitar conflictos con otros juegos. El proyecto utiliza React Native con Expo y sigue una estructura clara basada en la separación de responsabilidades. La navegación entre pantallas se gestiona con Expo Router, utilizando una estructura de archivos dentro de la carpeta '/games/geoguessr-de-salon/app/'. Para la gestión del estado global del juego (como puntuaciones, ronda actual, y ubicación seleccionada) se utiliza Zustand, cuyo store se encuentra en '/games/geoguessr-de-salon/store/'. Los componentes de la interfaz de usuario (UI) son reutilizables y se localizan en '/games/geoguessr-de-salon/components/', mientras que los datos estáticos como la lista de ubicaciones están en '/games/geoguessr-de-salon/constants/'. Los assets, como imágenes e iconos, se almacenan en '/games/geoguessr-de-salon/assets/'.

### Archivos Necesarios

- /games/geoguessr-de-salon/app/_layout.js
- /games/geoguessr-de-salon/app/index.js
- /games/geoguessr-de-salon/app/geoguessr-de-salon-setup.js
- /games/geoguessr-de-salon/app/geoguessr-de-salon-game.js
- /games/geoguessr-de-salon/app/geoguessr-de-salon-results.js
- /games/geoguessr-de-salon/components/GeoguessrDeSalonLocationCard.js
- /games/geoguessr-de-salon/components/GeoguessrDeSalonGuideView.js
- /games/geoguessr-de-salon/components/GeoguessrDeSalonRevealView.js
- /games/geoguessr-de-salon/components/GeoguessrDeSalonScoreboard.js
- /games/geoguessr-de-salon/components/GeoguessrDeSalonPlayerInput.js
- /games/geoguessr-de-salon/store/geoguessrDeSalonStore.js
- /games/geoguessr-de-salon/constants/GeoguessrDeSalonLocations.js
- /games/geoguessr-de-salon/assets/images/geoguessr-de-salon-logo.png
### Componentes React Native

- GeoguessrDeSalonSetupScreen: Pantalla principal del juego donde los jugadores configuran la partida, añaden sus nombres, eligen el modo de juego y el número de rondas. Inicia el juego y navega a la pantalla de juego.
- GeoguessrDeSalonGameScreen: Orquesta el flujo principal de una ronda. Muestra condicionalmente la vista del Guía (`GeoguessrDeSalonGuideView`) o la vista de revelación (`GeoguessrDeSalonRevealView`). Contiene la lógica para pasar a la siguiente ronda y manejar los intentos de adivinanza.
- GeoguessrDeSalonResultsScreen: Se muestra al final de la partida. Presenta el `GeoguessrDeSalonScoreboard` final con el ganador destacado y ofrece opciones para jugar de nuevo o volver al menú principal.
- GeoguessrDeSalonGuideView: Componente que se muestra únicamente al jugador 'Guía'. Contiene el componente `GeoguessrDeSalonLocationCard` (con la imagen y el nombre del lugar) y los botones de control para indicar si un intento de adivinanza fue correcto o incorrecto.
- GeoguessrDeSalonRevealView: Componente que se muestra a todos los jugadores al final de una ronda. Muestra la misma `GeoguessrDeSalonLocationCard` con toda la información de la ubicación y un botón para continuar a la siguiente ronda o ver los resultados.
- GeoguessrDeSalonLocationCard: Componente reutilizable que muestra la imagen de una ubicación. Tiene una prop para mostrar u ocultar el nombre del lugar, dependiendo de si es para la vista del Guía o la de revelación.
- GeoguessrDeSalonScoreboard: Muestra una lista de los jugadores y sus puntuaciones actuales. Se actualiza en tiempo real a medida que los jugadores ganan puntos.
### División Funcional

La funcionalidad se divide en capas claras: la UI (React Native Components en `/components`) es responsable de la presentación visual y la captura de la entrada del usuario. La Lógica del Juego reside principalmente en el store de Zustand (`/store/geoguessrDeSalonStore.js`), que maneja acciones como seleccionar una nueva ubicación, actualizar puntuaciones y cambiar de ronda. Las pantallas de Expo Router (`/app`) actúan como controladores, conectando la UI con el estado y la lógica del store. Los datos estáticos, como la lista de ubicaciones con sus URLs y metadatos, se aíslan en `/constants` para facilitar su actualización. Esta separación permite que el código sea más mantenible, escalable y fácil de testear.

## Ejemplos de Preguntas o Contenido Personalizado

- ¿El lugar está en el hemisferio norte?
- ¿Es un país de habla inglesa?
- ¿La imagen muestra un monumento famoso?
- ¿Este país es una isla?
- ¿Estamos en Europa?
- ¿El clima parece cálido?
- ¿Es la capital del país?
- ¿Este país ha sido sede de un Mundial de Fútbol?
- ¿Tiene una bandera con los colores rojo y blanco?
## Notas y Personalizaciones

- **Modo por Aproximación:** En lugar de preguntas, los jugadores adivinan una ciudad y la aplicación podría usar coordenadas para calcular la distancia al lugar real. El jugador más cercano gana el punto.
- **Modos Temáticos:** Crear paquetes de ubicaciones temáticas como 'Maravillas del Mundo Antiguo', 'Estadios Deportivos Famosos', 'Parques Nacionales' o 'Escenarios de Películas'.
- **Pistas Graduales:** Si los jugadores están atascados, el Guía podría revelar una pista proporcionada por la app después de un tiempo o un número de preguntas, como 'La primera letra del país es C' o 'Este país es famoso por su pasta'.
- **Integración con API:** Para una rejugabilidad infinita, la aplicación podría conectarse a una API como Google Street View API, Unsplash o Pexels para obtener imágenes y datos de ubicación de forma dinámica en cada partida.
- **Niveles de Dificultad:** Permitir a los jugadores elegir un nivel de dificultad que afecte a la selección de lugares (Fácil: lugares icónicos; Difícil: ciudades menos conocidas o regiones remotas).
- **Modo por Equipos:** Permitir que los jugadores se dividan en equipos, compitiendo para ver qué equipo consigue más puntos.
