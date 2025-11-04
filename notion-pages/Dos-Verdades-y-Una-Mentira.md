# Dos Verdades y Una Mentira

# Dos Verdades y Una Mentira

**Categoría: **Juego social

## Descripción General del Juego

Dos Verdades y Una Mentira es el rompehielos perfecto, un juego social diseñado para grupos de 3 o más jugadores que buscan conocerse mejor de una forma divertida e intrigante. El objetivo principal es engañar a tus amigos y, a la vez, demostrar tu habilidad para detectar mentiras. En cada turno, un jugador se convierte en el 'narrador'. La aplicación le mostrará en secreto tres afirmaciones: dos hechos verídicos y una mentira convincente, todos generados aleatoriamente a partir de una amplia base de datos. El narrador debe leer estas tres afirmaciones al grupo como si fueran propias, utilizando su mejor cara de póker. El resto de los jugadores deben debatir, hacer preguntas y analizar el lenguaje corporal del narrador para adivinar cuál de las tres afirmaciones es la mentira. Una vez que todos han votado, la verdad es revelada. Se otorgan puntos a quienes aciertan y al narrador si logra engañar a la mayoría. El juego fomenta la interacción, la creatividad y la risa, siendo ideal para fiestas, reuniones o cualquier situación social.

## Instrucciones Paso a Paso

1. Paso 1: Inicio y Configuración. Un jugador inicia una nueva partida. Se añaden los nombres de todos los participantes (mínimo 3). Se puede configurar el número de rondas para determinar la duración del juego.
1. Paso 2: Comienza el Turno. El juego selecciona al primer jugador como 'narrador'. La aplicación le muestra en la pantalla de su móvil tres afirmaciones, indicando claramente cuáles son las dos verdades y cuál es la mentira. Esta información es secreta para el resto.
1. Paso 3: La Narración. El narrador lee en voz alta las tres afirmaciones al grupo. Se recomienda que lo haga con convicción y naturalidad para que sea más difícil adivinar la mentira.
1. Paso 4: Debate y Votación. El resto de los jugadores tienen un tiempo para debatir entre ellos. Pueden hacerle preguntas al narrador sobre las afirmaciones para intentar pillarle. Una vez finalizado el debate, cada jugador vota en la aplicación por la afirmación que cree que es la mentira.
1. Paso 5: La Revelación. Después de que todos hayan votado, el narrador revela cuál era la mentira. La aplicación muestra los resultados del turno.
1. Paso 6: Puntuación. Los jugadores que adivinaron correctamente la mentira ganan puntos. El narrador también gana puntos según cuántos jugadores haya conseguido engañar.
1. Paso 7: Siguiente Turno. El rol de narrador pasa al siguiente jugador en la lista, y los pasos 2 a 6 se repiten.
1. Paso 8: Fin del Juego. Una vez completado el número de rondas establecido, el juego termina. La aplicación muestra una pantalla de resultados con el ranking final y declara al ganador como el 'Maestro del Engaño'.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego está encapsulada dentro de una única carpeta dedicada llamada 'dos-verdades-y-una-mentira' para garantizar la modularidad y evitar colisiones con otros juegos del proyecto. Utiliza React Native con Expo Router para la navegación entre las diferentes pantallas del juego (configuración, partida, resultados). Para la gestión del estado global se emplea Zustand, centralizando toda la lógica del juego, como los jugadores, puntuaciones y el estado del turno actual. La estructura sigue un principio de separación de responsabilidades: los componentes de la interfaz de usuario (UI) están en la carpeta '/components', la lógica de navegación y las pantallas en '/app', la lógica de estado en '/store', los datos estáticos como las afirmaciones en '/constants' y los recursos gráficos en '/assets'.

### Archivos Necesarios

- /games/dos-verdades-y-una-mentira/app/index.js
- /games/dos-verdades-y-una-mentira/app/juego.js
- /games/dos-verdades-y-una-mentira/app/resultados.js
- /games/dos-verdades-y-una-mentira/app/_layout.js
- /games/dos-verdades-y-una-mentira/components/DosVerdadesSetupForm.js
- /games/dos-verdades-y-una-mentira/components/DosVerdadesPlayerHUD.js
- /games/dos-verdades-y-una-mentira/components/DosVerdadesStatementCard.js
- /games/dos-verdades-y-una-mentira/components/DosVerdadesVotingInterface.js
- /games/dos-verdades-y-una-mentira/components/DosVerdadesTurnResultModal.js
- /games/dos-verdades-y-una-mentira/store/dosVerdadesStore.js
- /games/dos-verdades-y-una-mentira/constants/dosVerdadesStatements.js
- /games/dos-verdades-y-una-mentira/assets/images/dos-verdades-logo.png
### Componentes React Native

- DosVerdadesSetupForm: Un componente de formulario utilizado en la pantalla inicial ('/app/index.js') para que los usuarios ingresen los nombres de los jugadores y configuren las opciones de la partida, como el número de rondas.
- DosVerdadesPlayerHUD: Un 'Heads-Up Display' que se muestra permanentemente durante la partida ('/app/juego.js'). Muestra información clave como el nombre del narrador actual, la ronda en curso y las puntuaciones de todos los jugadores.
- DosVerdadesStatementCard: Componente reutilizable para mostrar cada una de las tres afirmaciones. Tiene diferentes estados visuales para indicar si ha sido seleccionada por un jugador, o si es la verdad o la mentira revelada.
- DosVerdadesVotingInterface: Agrupa las tres `DosVerdadesStatementCard` y gestiona la lógica de selección y envío del voto del jugador. Se desactiva para el narrador actual.
- DosVerdadesTurnResultModal: Un modal que aparece al final de cada turno para mostrar qué afirmación era la mentira, quiénes acertaron y cómo se actualizan las puntuaciones antes de pasar al siguiente narrador.
### División Funcional

La funcionalidad se divide en capas claras: la capa de UI (React Native Components en '/components') se encarga exclusivamente de la presentación y la interacción del usuario. La capa de Lógica de Juego y Navegación (Expo Router en '/app') orquesta el flujo de pantallas y la secuencia del juego, obteniendo el estado y las acciones de la capa de estado. La capa de Gestión de Estado (Zustand en '/store/dosVerdadesStore.js') actúa como la única fuente de verdad, conteniendo el estado de la partida (jugadores, puntuaciones, turno actual, afirmaciones seleccionadas) y las funciones puras que modifican dicho estado (ej: `nextTurn()`, `calculateScores()`). Finalmente, la capa de Datos (en '/constants') proporciona el contenido estático del juego, como la lista de posibles verdades y mentiras.

## Ejemplos de Preguntas o Contenido Personalizado

- Una vez participé en un concurso de talentos cantando una canción de ópera.
- Sé silbar con los dedos de ambas manos.
- Nunca he visto ninguna película de la saga Star Wars.
- De pequeño/a, creía que los actores vivían dentro de la televisión.
- He viajado a más de 10 países diferentes.
- Tengo un primo que es famoso.
- Puedo recitar el abecedario al revés en menos de 10 segundos.
- Una vez me quedé encerrado/a en una biblioteca por la noche.
- Mi comida favorita es la sopa de lentejas.
- Le tengo un miedo irracional a las mariposas.
- Aprendí a montar en bicicleta a los 15 años.
- Colecciono posavasos de todos los lugares a los que viajo.
## Notas y Personalizaciones

- Modo Personalizado: Permitir que, en lugar de usar afirmaciones generadas por la app, el narrador del turno pueda escribir sus propias dos verdades y una mentira. La app simplemente facilitaría la votación y el conteo de puntos.
- Packs Temáticos: Ofrecer paquetes de afirmaciones de pago o desbloqueables centrados en temas específicos como 'Viajes y Aventuras', 'Vida Profesional', 'Relaciones Incómodas' o 'Cultura Pop'.
- Modo 'Picante' (+18): Incluir un modo de juego opcional para adultos con afirmaciones más atrevidas o personales.
- Sistema de Puntos Avanzado: Implementar reglas de puntuación más complejas. Por ejemplo, el narrador obtiene un bonus si nadie adivina la mentira, y los jugadores obtienen más puntos si son los únicos en acertar.
- Integración de Temporizador: Añadir un temporizador opcional para la fase de debate y votación, añadiendo presión y agilizando el ritmo del juego.
- Logros y Estadísticas: Guardar estadísticas del jugador, como su porcentaje de acierto, a cuántas personas ha engañado en total, y otorgar logros por hitos específicos ('Engaña a 5 personas en una ronda', 'Adivina 3 mentiras seguidas').
