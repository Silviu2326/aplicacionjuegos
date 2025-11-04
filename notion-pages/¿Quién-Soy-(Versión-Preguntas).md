# ¿Quién Soy? (Versión Preguntas)

# ¿Quién Soy? (Versión Preguntas)

**Categoría: **Juego social de adivinanzas y preguntas

## Descripción General del Juego

Este es un emocionante y divertido juego social, perfecto para fiestas y reuniones con amigos o familiares, diseñado para un mínimo de dos jugadores. El objetivo es simple pero desafiante: un jugador, el 'adivinador', debe descubrir la identidad de un personaje, objeto o lugar que se muestra en la pantalla de su móvil. La clave está en que el adivinador no puede ver la pantalla, ya que debe sostener el dispositivo en su frente. Para descifrar la palabra secreta, el jugador solo puede hacer preguntas cuya respuesta sea 'sí' o 'no' al resto del grupo. Los demás jugadores, que sí ven la pantalla, deben responder con sinceridad para guiar al adivinador. Cada ronda está cronometrada, añadiendo un elemento de urgencia y emoción. Si el jugador adivina correctamente, inclina el móvil hacia abajo para sumar un punto y pasar a la siguiente palabra. Si se rinde, lo inclina hacia arriba para pasar. Al final del tiempo, se cuentan los aciertos y el turno pasa al siguiente jugador. Gana quien más personajes adivine.

## Instrucciones Paso a Paso

1. Reunir al grupo de juego (mínimo 2 personas: un 'adivinador' y al menos un 'respondedor').
1. El primer jugador abre el juego y elige una categoría de las disponibles (ej: 'Personajes de Películas', 'Animales', 'Celebridades', 'Superhéroes').
1. El jugador pulsa 'Empezar' y, sin mirar, se coloca inmediatamente el móvil en la frente con la pantalla hacia los demás.
1. En la pantalla aparecerá una palabra o nombre de la categoría seleccionada, y comenzará una cuenta atrás (normalmente 60 segundos).
1. El 'adivinador' debe empezar a hacer preguntas de respuesta cerrada ('sí' o 'no') para intentar deducir la palabra. Ej: '¿Soy una persona real?', '¿Salgo en la televisión?', '¿Soy un animal?'.
1. El resto de los jugadores responde a cada pregunta con un 'sí' o un 'no'.
1. Si el 'adivinador' acierta la palabra, debe inclinar el móvil hacia abajo. La app registrará el punto y mostrará una nueva palabra.
1. Si el 'adivinador' no sabe la respuesta o quiere pasar a la siguiente palabra, debe inclinar el móvil hacia arriba.
1. El proceso se repite hasta que el temporizador llegue a cero.
1. Al finalizar la ronda, la app mostrará el resumen de aciertos y palabras pasadas.
1. El móvil pasa al siguiente jugador, quien repite el proceso.
1. El juego puede continuar por un número predefinido de rondas o hasta que los jugadores decidan parar. Gana quien acumule más puntos.
## Estructura de Archivos y Componentes en Expo con React Native

El código del juego está completamente encapsulado dentro de una carpeta dedicada llamada 'quien-soy-preguntas' para asegurar modularidad y evitar conflictos con otros juegos. La arquitectura se basa en React Native con Expo, utilizando Expo Router para la navegación entre pantallas (setup, juego, resultados). La gestión del estado se maneja con una herramienta como Zustand o Redux Toolkit para centralizar la lógica del juego, como el puntaje, el tiempo restante y la lista de palabras. Se sigue un principio estricto de separación de responsabilidades: los componentes de la interfaz de usuario (UI) están separados de la lógica del juego (hooks, estado) y los recursos estáticos (imágenes, sonidos, listas de palabras) se organizan en sus respectivas carpetas de 'assets' y 'constants'.

### Archivos Necesarios

- /games/quien-soy-preguntas/app/_layout.js
- /games/quien-soy-preguntas/app/index.js
- /games/quien-soy-preguntas/app/quien-soy-preguntas-setup.js
- /games/quien-soy-preguntas/app/quien-soy-preguntas-game.js
- /games/quien-soy-preguntas/app/quien-soy-preguntas-results.js
- /games/quien-soy-preguntas/components/QuienSoyPreguntasCategorySelector.js
- /games/quien-soy-preguntas/components/QuienSoyPreguntasGameCard.js
- /games/quien-soy-preguntas/components/QuienSoyPreguntasTimerDisplay.js
- /games/quien-soy-preguntas/components/QuienSoyPreguntasTiltInstructions.js
- /games/quien-soy-preguntas/store/quienSoyPreguntasStore.js
- /games/quien-soy-preguntas/hooks/useQuienSoyPreguntasAccelerometer.js
- /games/quien-soy-preguntas/constants/QuienSoyPreguntasCategories.js
- /games/quien-soy-preguntas/assets/sounds/quienSoyPreguntasCorrect.mp3
- /games/quien-soy-preguntas/assets/sounds/quienSoyPreguntasSkip.mp3
- /games/quien-soy-preguntas/assets/images/quienSoyPreguntasIcon.png
### Componentes React Native

- QuienSoyPreguntasSetupScreen: Pantalla inicial donde los jugadores eligen la categoría para la partida. Utiliza el componente QuienSoyPreguntasCategorySelector.
- QuienSoyPreguntasGameScreen: La pantalla principal del juego. Gestiona el temporizador, la lógica de cambio de palabra, la detección de inclinación del dispositivo (usando el hook useQuienSoyPreguntasAccelerometer) y muestra la palabra actual a través del componente QuienSoyPreguntasGameCard.
- QuienSoyPreguntasResultsScreen: Pantalla que se muestra al final de cada ronda, resumiendo el número de aciertos y las palabras que se adivinaron y se pasaron.
- QuienSoyPreguntasGameCard: Componente visual que ocupa la pantalla durante el juego, mostrando la palabra a adivinar en un tamaño grande y claro.
- QuienSoyPreguntasTimerDisplay: Componente que muestra la cuenta atrás del tiempo restante de la ronda.
- QuienSoyPreguntasCategorySelector: Componente reutilizable que muestra una lista o cuadrícula de categorías disponibles para que el jugador elija.
### División Funcional

La funcionalidad se divide claramente: la UI está en la carpeta 'components' y en los archivos de pantalla de 'app'. La lógica del juego (manejo de rondas, selección de palabras, puntuación, temporizador) está centralizada en el store de Zustand/Redux ('/store/quienSoyPreguntasStore.js'). La lógica específica de hardware, como la lectura del acelerómetro para detectar la inclinación, se aísla en un hook personalizado ('/hooks/useQuienSoyPreguntasAccelerometer.js'). Los datos estáticos como las listas de palabras por categoría y configuraciones del juego residen en la carpeta 'constants'. Expo Router se encarga de la navegación entre las diferentes pantallas del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- ¿Soy una persona real?
- ¿Soy un personaje de ficción?
- ¿Estoy vivo/a actualmente?
- ¿Soy famoso/a por el cine o la televisión?
- ¿Soy un/a cantante?
- ¿Soy un/a deportista?
- ¿Soy un objeto?
- ¿Soy un animal?
- ¿Tengo relación con la tecnología?
- ¿Soy un personaje histórico?
- ¿Tengo superpoderes?
- ¿Mi nombre empieza por la letra 'A'?
- ¿Soy de origen europeo?
## Notas y Personalizaciones

- Creador de Mazos: Permitir a los usuarios crear y guardar sus propias listas de palabras personalizadas para jugar con temas específicos (amigos del grupo, chistes internos, etc.).
- Modo Equipos: Una variante donde dos o más equipos compiten entre sí. Cada miembro del equipo juega una ronda y los puntos se suman al total del equipo.
- Grabación de Video: Utilizar la cámara frontal para grabar las reacciones y las actuaciones del resto de jugadores mientras el 'adivinador' intenta acertar. Al final de la ronda, se ofrece la opción de guardar o compartir el video.
- Dificultad Variable: Ofrecer niveles de dificultad dentro de cada categoría (ej: 'Personajes de Marvel - Nivel Fácil' vs 'Personajes de Marvel - Nivel Experto').
- Eventos Temáticos: Lanzar mazos especiales por tiempo limitado durante festividades como Halloween, Navidad o eventos culturales importantes (Mundial de Fútbol, los Oscars).
- Penalizaciones: Añadir una opción para restar puntos por pasar una palabra, aumentando el riesgo y la estrategia del juego.
