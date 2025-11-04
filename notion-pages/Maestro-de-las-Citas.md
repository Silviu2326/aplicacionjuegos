# Maestro de las Citas

# Maestro de las Citas

**Categoría: **Juego de trivia social

## Descripción General del Juego

Maestro de las Citas es un trepidante juego de trivia diseñado para poner a prueba el conocimiento de la cultura popular, la literatura y la historia. El objetivo principal es acumular la mayor cantidad de puntos adivinando correctamente el origen de citas famosas. Cada ronda presenta una cita icónica, y los jugadores deben seleccionar la fuente correcta entre varias opciones antes de que se agote el tiempo. El juego puede ser disfrutado por un solo jugador que busca superar su propia puntuación más alta, o en un modo multijugador local (pasando el dispositivo) donde amigos y familiares compiten por el título de 'Maestro de las Citas'. Las reglas son sencillas: se establece un número de rondas, y en cada una, se muestra una cita. Los aciertos suman puntos, y la velocidad puede otorgar bonificaciones, añadiendo un elemento de urgencia y emoción. Al final de la partida, el jugador con la puntuación más alta es coronado como el ganador, demostrando su vasto conocimiento en el arte de las palabras memorables.

## Instrucciones Paso a Paso

1. 1. Inicio y Configuración: Los jugadores abren el juego y seleccionan el modo ('Un Jugador' o 'Multijugador'). A continuación, configuran la partida eligiendo el número de rondas (ej: 10, 20, 30) y las categorías de las citas (Cine, Literatura, Historia, etc.).
1. 2. Comienzo de la Ronda: La partida comienza mostrando la primera cita en el centro de la pantalla. Un cronómetro visible inicia inmediatamente una cuenta regresiva.
1. 3. Selección de Respuesta: Debajo de la cita aparecen cuatro opciones de respuesta. Solo una es correcta. Los jugadores deben tocar la opción que consideran correcta antes de que el tiempo llegue a cero.
1. 4. Feedback y Puntuación: Inmediatamente después de seleccionar una opción o cuando se acaba el tiempo, el juego revela la respuesta correcta, resaltándola en verde y las incorrectas en rojo. Los jugadores que acertaron ganan puntos. Se pueden otorgar puntos extra basados en la rapidez de la respuesta.
1. 5. Tabla de Puntuaciones: Al final de cada ronda, se muestra una pantalla intermedia con la tabla de puntuaciones actualizada, mostrando la clasificación de todos los jugadores.
1. 6. Siguiente Ronda: El juego avanza a la siguiente cita, repitiendo los pasos 2, 3 y 4.
1. 7. Fin del Juego: Una vez completado el número de rondas establecido, la partida finaliza. Se muestra una pantalla de resultados que declara al ganador y detalla las puntuaciones finales de todos los participantes.
1. 8. Opciones Finales: Los jugadores tienen la opción de volver al menú principal, iniciar una nueva partida con la misma configuración o revisar las preguntas y respuestas de la partida que acaban de jugar.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del proyecto está diseñada para ser modular y escalable. TODOS los archivos relacionados con 'Maestro de las Citas' están encapsulados dentro de una única carpeta dedicada llamada '/games/maestro-de-las-citas', asegurando que no haya conflictos con otros juegos. Utilizamos React Native con Expo y la navegación se gestiona mediante Expo Router, lo que permite una estructura de archivos basada en rutas dentro de la carpeta '/app'. Para la gestión del estado global del juego (puntuaciones, ronda actual, temporizador), se utiliza Zustand por su simplicidad y rendimiento. La estructura sigue un principio claro de separación de responsabilidades: la UI se construye con componentes reutilizables (en '/components'), la lógica de negocio y estado se maneja en el store (en '/store'), y los datos estáticos como las citas se encuentran en '/constants', facilitando su mantenimiento y actualización.

### Archivos Necesarios

- /games/maestro-de-las-citas/app/_layout.js
- /games/maestro-de-las-citas/app/maestro-citas-home.js
- /games/maestro-de-las-citas/app/maestro-citas-game.js
- /games/maestro-de-las-citas/app/maestro-citas-results.js
- /games/maestro-de-las-citas/components/MaestroCitasQuoteCard.js
- /games/maestro-de-las-citas/components/MaestroCitasAnswerOption.js
- /games/maestro-de-las-citas/components/MaestroCitasScoreboard.js
- /games/maestro-de-las-citas/components/MaestroCitasTimerBar.js
- /games/maestro-de-las-citas/store/maestroCitasStore.js
- /games/maestro-de-las-citas/constants/MaestroCitasData.js
- /games/maestro-de-las-citas/assets/images/maestro-citas-background.png
- /games/maestro-de-las-citas/assets/sounds/maestro-citas-correct.mp3
### Componentes React Native

- MaestroCitasQuoteCard.js: Componente visual que muestra la cita de la ronda actual. Es el foco principal de la pantalla de juego y está diseñado para ser claro y legible.
- MaestroCitasAnswerOption.js: Componente de botón reutilizable para cada una de las opciones de respuesta. Gestiona su propio estado visual (normal, presionado, correcto, incorrecto) y notifica a la pantalla principal sobre la selección del usuario.
- MaestroCitasScoreboard.js: Muestra información relevante de la partida, como la ronda actual de un total (ej: 'Ronda 5/20') y la puntuación acumulada del jugador.
- MaestroCitasTimerBar.js: Una barra de progreso que representa visualmente el tiempo restante para contestar. Su longitud disminuye a medida que pasa el tiempo, añadiendo un elemento de presión al juego.
### División Funcional

La funcionalidad está segmentada para máxima claridad y mantenimiento. UI (Interfaz de Usuario): Gestionada por los componentes en '/games/maestro-de-las-citas/components/'. Estos componentes reciben datos y funciones a través de props y no contienen lógica de negocio compleja. Lógica del Juego: Centralizada en el store de Zustand ('/games/maestro-de-las-citas/store/maestroCitasStore.js'). Este store maneja el estado de la partida, incluyendo la cita actual, las puntuaciones, el avance de rondas y la validación de respuestas. Navegación y Pantallas: Controlada por Expo Router dentro de '/games/maestro-de-las-citas/app/'. Cada archivo en esta carpeta representa una pantalla (inicio, juego, resultados) que consume datos del store y los pasa a los componentes de UI. Assets y Datos: Los recursos estáticos como imágenes y sonidos están en '/assets/', y el contenido del juego (citas, opciones, respuestas correctas) se almacena en '/constants/', permitiendo añadir nuevo contenido sin tocar la lógica del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- Cita: 'Voy a hacerle una oferta que no podrá rechazar.' | Opciones: ['El Padrino', 'Scarface', 'Pulp Fiction', 'Casablanca'] | Correcta: 'El Padrino'
- Cita: 'Elemental, mi querido Watson.' | Opciones: ['Sherlock Holmes (Libros)', 'Agatha Christie', 'Edgar Allan Poe', 'Julio Verne'] | Correcta: 'Sherlock Holmes (Libros)'
- Cita: 'El hombre es un lobo para el hombre.' | Opciones: ['Plauto', 'Aristóteles', 'Platón', 'Séneca'] | Correcta: 'Plauto'
- Cita: '¡Hasta el infinito y más allá!' | Opciones: ['Toy Story', 'Shrek', 'Buscando a Nemo', 'Cars'] | Correcta: 'Toy Story'
- Cita: 'La vida es como una caja de bombones, nunca sabes lo que te va a tocar.' | Opciones: ['Forrest Gump', 'Titanic', 'El Club de la Lucha', 'Cadena Perpetua'] | Correcta: 'Forrest Gump'
## Notas y Personalizaciones

- Modos de Juego Alternativos: Implementar un modo 'Contrarreloj' donde el objetivo es responder correctamente al mayor número de citas en un tiempo fijo (ej: 2 minutos).
- Packs de Citas Temáticos: Ofrecer packs de citas descargables o desbloqueables, como 'Clásicos del Cine de los 80', 'Filosofía Griega', 'Villanos de Película' o 'Literatura de Ciencia Ficción'.
- Sistema de Pistas: Añadir un botón de pista que, a cambio de una penalización de puntos, puede eliminar dos de las opciones incorrectas, facilitando la elección.
- Multijugador Online: Expandir el juego con un modo multijugador en tiempo real usando Firebase o Supabase, permitiendo a los jugadores competir con amigos o desconocidos de todo el mundo.
- Dificultad Adaptativa: El juego podría ajustar la dificultad de las citas basándose en el porcentaje de aciertos del jugador, ofreciendo un reto constante.
- Perfiles y Logros: Permitir a los jugadores crear perfiles para seguir sus estadísticas (porcentaje de aciertos, categoría favorita, etc.) y desbloquear logros como 'Maestro del Cine' o 'Sabio Histórico'.
