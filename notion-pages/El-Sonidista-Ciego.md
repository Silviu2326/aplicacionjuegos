# El Sonidista Ciego

# El Sonidista Ciego

**Categoría: **Juego social

## Descripción General del Juego

El Sonidista Ciego es un juego de fiesta social y creativo diseñado para grupos de tres o más jugadores, ideal para romper el hielo y desatar la imaginación. El objetivo principal es adivinar un escenario secreto basándose únicamente en los sonidos creados por los demás participantes. En cada ronda, un jugador asume el rol del 'Sonidista Ciego' y debe cerrar los ojos, sin poder ver la pantalla del móvil. La aplicación revela un escenario (por ejemplo, 'Una biblioteca encantada' o 'Un taller mecánico') al resto de los jugadores, quienes se convierten en 'Sonidistas Ayudantes'. Por turnos, y sin usar palabras, cada Ayudante debe producir un único sonido característico de ese escenario. Uno podría imitar el pasar de una página polvorienta, otro el susurro de un fantasma, y un tercero el chirrido de una puerta antigua. Una vez que todos han aportado su sonido, el Sonidista Ciego tiene la oportunidad de adivinar el lugar o la situación. Si acierta, gana un punto. Si falla, el equipo de Ayudantes se lleva el punto. El rol del Sonidista Ciego rota en cada ronda, asegurando que todos tengan la oportunidad de adivinar y de crear sonidos.

## Instrucciones Paso a Paso

1. 1. Reúnan al grupo (mínimo 3 jugadores) y abran la aplicación del juego.
1. 2. Nombren al primer jugador que será 'El Sonidista Ciego'. Este jugador debe cerrar los ojos o usar un antifaz.
1. 3. El resto de los jugadores, los 'Sonidistas Ayudantes', pulsan 'Empezar Ronda' en el móvil.
1. 4. La aplicación mostrará un escenario secreto en la pantalla, visible solo para los Ayudantes (ej: 'Un circo').
1. 5. En orden, cada Ayudante hace un único sonido relacionado con el escenario. Por ejemplo, el rugido de un león, la música del carrusel, los aplausos del público, etc. Es importante no hablar.
1. 6. Después de que todos los Ayudantes hayan hecho su sonido, el Sonidista Ciego abre los ojos y tiene un intento para adivinar el escenario.
1. 7. Si el Sonidista Ciego adivina correctamente, se pulsa el botón 'Acierto' y gana un punto. Si falla, se pulsa 'Fallo' y el equipo de Ayudantes gana un punto.
1. 8. La aplicación pasa a la pantalla de puntuación y el rol de Sonidista Ciego rota al siguiente jugador de la lista.
1. 9. El juego continúa durante un número predefinido de rondas o hasta que los jugadores decidan terminar.
1. 10. Al final, el jugador con la puntuación más alta es declarado el ganador.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está diseñada para ser modular y escalable. TODOS los archivos relacionados con el juego 'El Sonidista Ciego' se encuentran encapsulados dentro de una única carpeta dedicada: '/games/el-sonidista-ciego/'. Esto garantiza que el juego pueda ser mantenido o modificado sin afectar a otros juegos del proyecto. Se utiliza React Native con Expo y la navegación se gestiona mediante Expo Router, aprovechando su sistema de rutas basado en archivos dentro de la carpeta '/games/el-sonidista-ciego/app/'. Para la gestión del estado global del juego (como jugadores, puntuaciones y escenario actual), se implementa Zustand por su simplicidad y eficiencia. La estructura sigue una clara separación de responsabilidades: la UI se define en los componentes (carpeta 'components'), la lógica de negocio y estado se centraliza en el store ('store'), los datos estáticos como los escenarios están en 'constants', y los recursos gráficos en 'assets'.

### Archivos Necesarios

- /games/el-sonidista-ciego/app/_layout.js
- /games/el-sonidista-ciego/app/index.js
- /games/el-sonidista-ciego/app/sonidista-ciego-play.js
- /games/el-sonidista-ciego/app/sonidista-ciego-results.js
- /games/el-sonidista-ciego/components/SonidistaCiegoScenarioCard.js
- /games/el-sonidista-ciego/components/SonidistaCiegoPlayerList.js
- /games/el-sonidista-ciego/components/SonidistaCiegoInstructions.js
- /games/el-sonidista-ciego/components/SonidistaCiegoScoreboard.js
- /games/el-sonidista-ciego/store/sonidistaCiegoStore.js
- /games/el-sonidista-ciego/constants/SonidistaCiegoScenarios.js
- /games/el-sonidista-ciego/assets/images/sonidista-ciego-icon.png
- /games/el-sonidista-ciego/assets/sounds/sonidista-ciego-correct.mp3
### Componentes React Native

- SonidistaCiegoScenarioCard: Un componente visual que muestra el escenario secreto a los 'Sonidistas Ayudantes'. Incluye una animación o un botón para revelar el texto de forma segura, evitando que el 'Sonidista Ciego' lo vea por accidente.
- SonidistaCiegoPlayerList: Gestiona y muestra la lista de jugadores, indicando visualmente quién es el 'Sonidista Ciego' en la ronda actual y el orden de los turnos para hacer sonidos.
- SonidistaCiegoInstructions: Un componente modal o de pantalla completa que explica las reglas del juego de forma clara y concisa, accesible desde la pantalla de inicio.
- SonidistaCiegoScoreboard: Muestra las puntuaciones actuales de todos los jugadores. Se actualiza después de cada ronda y muestra al ganador al final de la partida.
### División Funcional

La funcionalidad está segmentada para facilitar el desarrollo y mantenimiento. La UI (Interfaz de Usuario) está compuesta por pantallas de Expo Router en la carpeta 'app' y componentes reutilizables en 'components'. La Lógica del Juego (selección aleatoria de escenarios, rotación de jugadores, cálculo de puntuaciones) se abstrae en el store de Zustand ('/store/sonidistaCiegoStore.js'). La Gestión de Estado es manejada exclusivamente por Zustand, que provee un hook para que los componentes accedan y modifiquen el estado del juego de forma reactiva, como el escenario actual, la lista de jugadores y sus puntos. Las Constantes, como el array de todos los posibles escenarios, se aíslan en '/constants/SonidistaCiegoScenarios.js' para una fácil edición y expansión del contenido del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- Una obra en construcción
- Un restaurante de comida rápida
- El Polo Norte en Navidad
- Una jungla por la noche
- Un abordaje pirata a un barco
- Una visita al dentista
- El primer día de clases en un colegio
- Un laboratorio de un científico loco
- Dentro de una colmena de abejas
- Un partido de tenis
- Una escena de una película del oeste
- Un campamento con una fogata
- Una granja por la mañana
- El interior de una nave espacial
- Una clase de cocina
## Notas y Personalizaciones

- Modo Temático: Permitir a los jugadores elegir un paquete de escenarios antes de empezar (ej: 'Ciencia Ficción', 'Historia', 'Vida Cotidiana', 'Fantasía').
- Niveles de Dificultad: Introducir escenarios más abstractos o difíciles de representar con sonidos (ej: 'El nacimiento de una idea', 'La nostalgia').
- Modo Dúo: Una variante para solo dos jugadores donde uno hace todos los sonidos (quizás 3 sonidos diferentes) y el otro adivina.
- Modo Contrarreloj: Añadir un temporizador opcional. Los 'Ayudantes' tienen un tiempo limitado para hacer sus sonidos, y el 'Sonidista Ciego' tiene un tiempo límite para adivinar.
- Pistas: Si el 'Sonidista Ciego' está muy perdido, la app podría revelar una palabra clave como pista a cambio de que la ronda valga menos puntos.
- Sonido Prohibido: Para añadir un desafío, la app podría indicar un sonido específico que está prohibido hacer para representar el escenario.
