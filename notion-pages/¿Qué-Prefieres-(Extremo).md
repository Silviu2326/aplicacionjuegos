# ¿Qué Prefieres? (Extremo)

# ¿Qué Prefieres? (Extremo)

**Categoría: **Juego social

## Descripción General del Juego

Este es un juego social diseñado para provocar conversaciones, debates y risas entre amigos. El objetivo no es ganar, sino conocer mejor a los demás jugadores y a uno mismo a través de dilemas hipotéticos. La aplicación presenta en pantalla dos escenarios, a menudo absurdos, moralmente complejos, desagradables o simplemente extraños. El jugador en turno debe leer en voz alta ambas opciones y elegir obligatoriamente una de ellas, sin opción a negarse. La parte crucial del juego es la justificación: el jugador debe explicar por qué ha elegido esa opción. Esta justificación es el catalizador para que el resto del grupo opine, debata y cuestione la decisión, generando momentos memorables. Se puede jugar con 2 o más personas, y no requiere un número máximo. Las reglas son simples: se pasa el móvil al siguiente jugador después de cada turno. No hay puntos ni ganadores, el único propósito es la interacción social y el entretenimiento derivado de las situaciones extremas planteadas.

## Instrucciones Paso a Paso

1. Reúnanse 2 o más jugadores y decidan quién empieza.
1. Abran la aplicación y pulsen 'Jugar' para que aparezca el primer dilema en pantalla.
1. El jugador en turno lee en voz alta las dos opciones presentadas.
1. El jugador debe reflexionar y elegir una de las dos opciones tocándola en la pantalla.
1. Una vez elegida, el jugador debe justificar su decisión ante el grupo, explicando sus motivos.
1. El resto de los jugadores puede escuchar, debatir, hacer preguntas o simplemente reírse de la justificación.
1. Tras el debate, el jugador pasa el móvil a la persona de su derecha (o en el orden que decidan).
1. El siguiente jugador desliza la pantalla o pulsa un botón para revelar un nuevo dilema y el ciclo se repite.
1. El juego continúa hasta que los jugadores decidan parar. ¡No hay un final definido, la diversión marca el límite!
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está diseñada para ser modular y escalable. TODOS los archivos relacionados con el juego '¿Qué Prefieres? (Extremo)' se encuentran encapsulados dentro de una única carpeta dedicada llamada 'que-prefieres-extremo'. Esto asegura que el código del juego no se mezcle con otros juegos o partes de la aplicación. La navegación se gestiona con Expo Router, utilizando una estructura de archivos dentro de '/games/que-prefieres-extremo/app/'. Para la gestión del estado global del juego (como la pregunta actual o las categorías seleccionadas), se utiliza un gestor de estado como Zustand, manteniendo la lógica centralizada en un único store. Se sigue un estricto principio de separación de responsabilidades: la UI (componentes visuales), la lógica del juego (flujo y reglas) y los datos (preguntas, assets) están en carpetas y archivos distintos para facilitar el mantenimiento y desarrollo.

### Archivos Necesarios

- /games/que-prefieres-extremo/app/_layout.js
- /games/que-prefieres-extremo/app/index.js
- /games/que-prefieres-extremo/app/que-prefieres-extremo-game.js
- /games/que-prefieres-extremo/components/QuePrefieresExtremoDilemmaCard.js
- /games/que-prefieres-extremo/components/QuePrefieresExtremoOptionButton.js
- /games/que-prefieres-extremo/components/QuePrefieresExtremoStatsDisplay.js
- /games/que-prefieres-extremo/store/quePrefieresExtremoStore.js
- /games/que-prefieres-extremo/constants/QuePrefieresExtremoQuestions.js
- /games/que-prefieres-extremo/assets/images/que-prefieres-extremo-background.png
- /games/que-prefieres-extremo/assets/fonts/QuePrefieresExtremoTitleFont.ttf
### Componentes React Native

- QuePrefieresExtremoDilemmaCard: Componente principal que ocupa la mayor parte de la pantalla de juego. Muestra dos componentes 'QuePrefieresExtremoOptionButton', uno para cada opción del dilema. Es responsable de la animación de entrada y salida de las preguntas.
- QuePrefieresExtremoOptionButton: Un botón interactivo que muestra el texto de una de las dos opciones. Gestiona su propio estado visual (pulsado, no pulsado) y comunica la elección del usuario a la pantalla principal del juego.
- QuePrefieresExtremoStatsDisplay: Componente opcional que aparece después de que un jugador ha hecho su elección. Muestra estadísticas globales (ej: 'El 67% de los jugadores eligió esta opción') para añadir una capa de comparación social.
- Pantalla 'index.js': Es la pantalla de inicio del juego. Contiene el título, una breve descripción y un botón 'Iniciar Partida'. Puede incluir también la selección de categorías o paquetes de preguntas.
- Pantalla 'que-prefieres-extremo-game.js': El corazón del juego. Utiliza el store de Zustand para obtener la pregunta actual, la muestra usando 'QuePrefieresExtremoDilemmaCard' y gestiona la lógica para pasar a la siguiente pregunta una vez que el usuario ha interactuado.
### División Funcional

La funcionalidad está segmentada para máxima claridad. UI: Los componentes en '/components' son 'tontos', solo reciben props y renderizan la interfaz. Lógica del Juego: Reside en las pantallas de '/app', que orquestan los componentes, manejan las interacciones del usuario y ejecutan la lógica del flujo del juego (qué pregunta mostrar, cuándo avanzar). Gestión de Estado: El archivo '/store/quePrefieresExtremoStore.js' (usando Zustand) centraliza todo el estado: el mazo de preguntas, el índice de la pregunta actual, las preguntas ya vistas, etc. Esto desacopla el estado de la UI. Datos y Constantes: '/constants/QuePrefieresExtremoQuestions.js' exporta un array de objetos, cada uno representando un dilema. Esto permite actualizar o añadir preguntas fácilmente sin tocar el código de la lógica del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- ¿Qué prefieres? ¿Tener la habilidad de hablar con los animales pero que todos te odien, o ser amado por todos los animales pero no poder comunicarte con ellos?
- ¿Qué prefieres? ¿Saber la fecha exacta de tu muerte o saber la causa exacta de tu muerte, pero no ambas?
- ¿Qué prefieres? ¿Vivir permanentemente en un mundo post-apocalíptico tipo Mad Max, o vivir en el universo de Wall-E donde los humanos son inútiles y obesos?
- ¿Qué prefieres? ¿Tener que decir siempre la verdad sin filtro, o tener que mentir en cada frase que digas?
- ¿Qué prefieres? ¿Poder rebobinar 10 segundos en tu vida en cualquier momento, o poder pausar el tiempo para todos menos para ti durante 10 segundos una vez al día?
- ¿Qué prefieres? ¿Que cada canción que escuches se convierta en 'Baby Shark' a mitad, o que cada película que veas tenga a Jar Jar Binks añadido digitalmente en cada escena?
- ¿Qué prefieres? ¿Tener dedos de los pies tan largos como los dedos de tus manos, o dedos de las manos tan cortos como los de tus pies?
- ¿Qué prefieres? ¿Luchar contra un pato del tamaño de un caballo, o contra cien caballos del tamaño de un pato?
## Notas y Personalizaciones

- Modos de Juego: Implementar diferentes modos como 'Modo Fiesta' (preguntas rápidas y absurdas), 'Modo Profundo' (dilemas morales serios) o 'Modo Parejas' (preguntas enfocadas en relaciones).
- Paquetes de Expansión: Permitir a los usuarios comprar o desbloquear paquetes de preguntas temáticos (ej: Superhéroes, Fantasía, Ciencia Ficción, Filosófico) para mantener el contenido fresco.
- Estadísticas Mundiales: Después de que un jugador elige una opción, mostrar en pantalla qué porcentaje de jugadores a nivel mundial eligió cada opción. Esto añade un interesante elemento de comparación social.
- Modo con Temporizador: Añadir un modo de juego opcional con un temporizador para forzar decisiones rápidas y espontáneas, aumentando la presión y la diversión.
- Creación de Contenido por el Usuario: Permitir a la comunidad enviar sus propias preguntas. Tras un proceso de moderación, las mejores podrían ser añadidas al juego, dando crédito a sus creadores.
- Sistema de 'Veto': Cada jugador podría tener un 'veto' por partida para saltarse una pregunta que le resulte particularmente incómoda, añadiendo una capa estratégica.
