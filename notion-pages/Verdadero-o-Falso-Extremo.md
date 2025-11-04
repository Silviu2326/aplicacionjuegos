# Verdadero o Falso Extremo

# Verdadero o Falso Extremo

**Categoría: **Juego de trivia y social

## Descripción General del Juego

Verdadero o Falso Extremo es un adictivo juego de trivia social diseñado para poner a prueba tu intuición y tus conocimientos sobre los hechos más insólitos y sorprendentes del mundo. El objetivo principal es acumular la mayor cantidad de puntos posible decidiendo correctamente si las afirmaciones presentadas son verdaderas o falsas. Ideal para jugar solo o en grupo con amigos y familiares (2-8 jugadores recomendados), cada ronda presenta una declaración cuidadosamente elaborada que parece increíble, pero que podría ser cierta. Desde curiosidades científicas y hechos históricos olvidados hasta datos extraños sobre la naturaleza y la cultura popular, cada pregunta está diseñada para sembrar la duda y generar debate. La tensión aumenta con un temporizador que presiona a los jugadores a tomar una decisión rápida. Al final de cada ronda, no solo se revela la respuesta correcta, sino que también se proporciona una breve y fascinante explicación, convirtiendo cada partida en una experiencia de aprendizaje. Gana el jugador que demuestre tener el mejor instinto para separar la realidad de la ficción.

## Instrucciones Paso a Paso

1. Paso 1: Iniciar el juego y seleccionar el modo de juego (un jugador o multijugador). Si es multijugador, los jugadores ingresan sus nombres.
1. Paso 2: La partida comienza y la primera afirmación aparece en la pantalla para todos los jugadores.
1. Paso 3: Un temporizador de 10-15 segundos se inicia. Cada jugador debe pulsar el botón 'Verdadero' o 'Falso' antes de que el tiempo se agote.
1. Paso 4: Una vez que todos los jugadores han votado o el tiempo ha terminado, las respuestas de cada uno se muestran brevemente en pantalla.
1. Paso 5: La respuesta correcta se revela con un efecto visual y sonoro. A continuación, aparece una breve explicación o un dato curioso que contextualiza la afirmación.
1. Paso 6: Los jugadores que acertaron reciben puntos. Se pueden otorgar puntos extra por responder más rápido.
1. Paso 7: El marcador se actualiza y se muestra la clasificación actual de los jugadores.
1. Paso 8: El juego avanza a la siguiente ronda con una nueva afirmación.
1. Paso 9: La partida termina después de un número predefinido de rondas (por ejemplo, 10 o 20).
1. Paso 10: Se muestra la pantalla de resultados finales, declarando al ganador y mostrando las estadísticas de la partida.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está organizada para ser modular y escalable, utilizando React Native con Expo. TODO el código, los assets y la lógica del juego 'Verdadero o Falso Extremo' están encapsulados dentro de una única carpeta dedicada llamada 'verdadero-o-falso-extremo'. La navegación entre pantallas se gestiona mediante Expo Router, aprovechando su estructura basada en archivos dentro del directorio '/games/verdadero-o-falso-extremo/app/'. Para la gestión del estado global del juego (puntuaciones, ronda actual, estado del temporizador, etc.), se utiliza Zustand por su simplicidad y rendimiento. Se sigue un estricto principio de separación de responsabilidades: la UI se define en componentes reutilizables, la lógica del juego reside en el store de Zustand y en hooks personalizados, y los datos estáticos como las preguntas se almacenan en la carpeta de constantes. Todos los nombres de archivos y componentes son específicos del juego para evitar colisiones en un proyecto con múltiples juegos.

### Archivos Necesarios

- /games/verdadero-o-falso-extremo/app/_layout.js
- /games/verdadero-o-falso-extremo/app/index.js
- /games/verdadero-o-falso-extremo/app/vof-extremo-game-screen.js
- /games/verdadero-o-falso-extremo/app/vof-extremo-results-screen.js
- /games/verdadero-o-falso-extremo/components/VofExtremoStatementCard.js
- /games/verdadero-o-falso-extremo/components/VofExtremoAnswerButton.js
- /games/verdadero-o-falso-extremo/components/VofExtremoTimerCircle.js
- /games/verdadero-o-falso-extremo/components/VofExtremoScoreDisplay.js
- /games/verdadero-o-falso-extremo/components/VofExtremoResultModal.js
- /games/verdadero-o-falso-extremo/store/vofExtremoGameStore.js
- /games/verdadero-o-falso-extremo/constants/VofExtremoQuestions.js
- /games/verdadero-o-falso-extremo/assets/images/vof-extremo-logo.png
- /games/verdadero-o-falso-extremo/assets/sounds/vof-extremo-correct-answer.mp3
- /games/verdadero-o-falso-extremo/assets/sounds/vof-extremo-wrong-answer.mp3
### Componentes React Native

- VofExtremoStatementCard: Componente visual que muestra la afirmación central de la ronda actual. Está diseñado para captar la atención del jugador.
- VofExtremoAnswerButton: Componente reutilizable para los botones 'Verdadero' y 'Falso'. Gestiona la interacción del usuario y cambia de estilo según el estado (seleccionado, correcto, incorrecto).
- VofExtremoTimerCircle: Un componente visual que representa el temporizador como un círculo que se va vaciando, aumentando la tensión a medida que el tiempo se agota.
- VofExtremoScoreDisplay: Muestra la puntuación actual del jugador o la tabla de clasificación en el modo multijugador.
- VofExtremoResultModal: Un modal que aparece al final de cada ronda para mostrar si la respuesta era verdadera o falsa, junto con la explicación detallada del hecho.
### División Funcional

La funcionalidad se divide en capas claras: la capa de UI (componentes y pantallas en 'components' y 'app') es responsable de la presentación. La capa de estado (Zustand store en '/store/vofExtremoGameStore.js') centraliza toda la lógica y los datos del juego, como la selección de preguntas, el cálculo de puntuaciones, el manejo de rondas y el estado de los jugadores. La capa de datos ('/constants/VofExtremoQuestions.js') desacopla el contenido del juego de la lógica, permitiendo añadir o modificar preguntas fácilmente. Expo Router gestiona la navegación entre la pantalla de inicio, la pantalla de juego y la de resultados de forma declarativa.

## Ejemplos de Preguntas o Contenido Personalizado

- VERDADERO: El corazón de una ballena azul es tan grande que un ser humano podría nadar a través de sus arterias.
- FALSO: Los plátanos crecen en árboles. (Explicación: Crecen en grandes plantas herbáceas, no en árboles leñosos).
- VERDADERO: En el planeta Venus, un día es más largo que un año.
- FALSO: Los humanos solo utilizan el 10% de su capacidad cerebral. (Explicación: Es un mito popular; usamos prácticamente todo el cerebro, aunque no todas las partes al mismo tiempo).
- VERDADERO: Hay más árboles en la Tierra que estrellas en nuestra galaxia, la Vía Láctea.
- FALSO: Cleopatra era de etnia egipcia. (Explicación: Pertenecía a la dinastía ptolemaica, de ascendencia griega macedonia).
- VERDADERO: La miel nunca se echa a perder. Se han encontrado vasijas con miel comestible en tumbas egipcias de hace miles de años.
- FALSO: Los camaleones cambian de color principalmente para camuflarse. (Explicación: Su cambio de color está más relacionado con su estado de ánimo, la temperatura y la comunicación con otros camaleones).
## Notas y Personalizaciones

- Modos de juego alternativos: 'Modo Supervivencia' donde un solo fallo te elimina; 'Modo Ráfaga' donde debes contestar tantas preguntas como puedas en 60 segundos.
- Paquetes de preguntas temáticos: Los jugadores podrían desbloquear o comprar paquetes de preguntas sobre temas específicos como 'Cine y Series', 'Ciencia Ficción', 'Historia Antigua' o 'Mitos y Leyendas'.
- Dificultad ajustable: Permitir a los jugadores elegir un nivel de dificultad (Fácil, Normal, Extremo) que modifique la complejidad y oscuridad de las afirmaciones.
- Sistema de 'Power-ups': Introducir ayudas que se pueden usar una vez por partida, como 'Tiempo Extra' para tener 5 segundos adicionales, o 'Pista del Experto' que muestra un porcentaje ficticio de lo que 'otros jugadores' han votado.
- Contribuciones de la comunidad: Implementar una función para que los usuarios puedan enviar sus propias afirmaciones de 'Verdadero o Falso'. Las mejores podrían ser añadidas al juego con el crédito correspondiente.
- Personalización de avatares: En el modo multijugador, permitir que los jugadores elijan un avatar y un color para identificarse fácilmente en la tabla de clasificación.
