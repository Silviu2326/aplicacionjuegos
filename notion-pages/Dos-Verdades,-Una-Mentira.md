# Dos Verdades, Una Mentira

# Dos Verdades, Una Mentira

**Categoría: **Juego social

## Descripción General del Juego

Dos Verdades, Una Mentira es un juego social y rompehielos diseñado para que los jugadores se conozcan de una manera divertida e intrigante. Es ideal para grupos de 3 o más personas. El objetivo principal no es solo ganar, sino descubrir hechos sorprendentes, curiosos o divertidos sobre los demás participantes. En cada turno, un jugador asume el rol de 'narrador'. La aplicación le presenta tres afirmaciones personales: dos de ellas son completamente ciertas y una es una mentira bien elaborada. El narrador lee estas tres afirmaciones en voz alta al resto del grupo. A continuación, se abre un período de debate donde los demás jugadores pueden discutir, hacer preguntas (que el narrador puede responder con astucia) y analizar las afirmaciones para intentar descubrir cuál es la falsa. Una vez finalizado el debate, cada jugador vota en secreto por la afirmación que cree que es la mentira. Finalmente, el narrador revela la verdad. Se otorgan puntos tanto al narrador por cada jugador al que logró engañar, como a los jugadores que acertaron la mentira. El juego fomenta la creatividad, la astucia y la comunicación.

## Instrucciones Paso a Paso

1. Paso 1: Iniciar el Juego. El anfitrión crea una partida e invita a los demás jugadores a unirse, quienes ingresan sus nombres.
1. Paso 2: Comienza la Ronda. El juego selecciona al primer jugador para ser el 'narrador'.
1. Paso 3: Presentar las Afirmaciones. La aplicación muestra tres afirmaciones en secreto al narrador (dos verdades y una mentira). El narrador las lee en voz alta al grupo.
1. Paso 4: Debate y Discusión. Se inicia un temporizador. Durante este tiempo, los otros jugadores pueden discutir entre ellos y hacer preguntas al narrador para intentar detectar la mentira.
1. Paso 5: Votación. Una vez finalizado el tiempo de debate, cada jugador selecciona en la aplicación la afirmación que cree que es la mentira.
1. Paso 6: La Revelación. Después de que todos hayan votado, el narrador revela cuál de las afirmaciones era la mentira. La aplicación muestra los votos de cada jugador y la respuesta correcta.
1. Paso 7: Asignación de Puntos. Los jugadores que adivinaron correctamente la mentira ganan puntos. El narrador gana puntos por cada jugador que no adivinó la mentira.
1. Paso 8: Siguiente Turno. El rol de narrador pasa al siguiente jugador en la lista y se repiten los pasos del 3 al 7.
1. Paso 9: Fin del Juego. El juego termina después de un número predefinido de rondas (por ejemplo, que todos hayan sido narradores una o dos veces).
1. Paso 10: Ganador. Se muestra una pantalla de resultados finales con el podio. El jugador con la puntuación más alta es declarado ganador.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código y los recursos específicos de este juego se encuentran encapsulados dentro de una única carpeta dedicada llamada 'dos-verdades-una-mentira' para garantizar la modularidad y evitar conflictos con otros juegos. La estructura del proyecto utiliza React Native con Expo Router para la navegación entre pantallas (configuración, juego, resultados). La gestión del estado global del juego (jugadores, puntuaciones, turno actual, etc.) se maneja con Zustand para una implementación sencilla y potente. Se sigue un claro principio de separación de responsabilidades: la UI se construye con componentes reutilizables, la lógica del juego se concentra en las pantallas o en hooks personalizados, y los datos estáticos como textos o configuraciones se almacenan en archivos de constantes.

### Archivos Necesarios

- /games/dos-verdades-una-mentira/app/index.js
- /games/dos-verdades-una-mentira/app/dos-verdades-una-mentira-juego.js
- /games/dos-verdades-una-mentira/app/dos-verdades-una-mentira-resultados.js
- /games/dos-verdades-una-mentira/app/_layout.js
- /games/dos-verdades-una-mentira/components/DosVerdadesUnaMentiraPlayerHUD.js
- /games/dos-verdades-una-mentira/components/DosVerdadesUnaMentiraStatementCard.js
- /games/dos-verdades-una-mentira/components/DosVerdadesUnaMentiraVotingView.js
- /games/dos-verdades-una-mentira/components/DosVerdadesUnaMentiraScoreboard.js
- /games/dos-verdades-una-mentira/store/dosVerdadesUnaMentiraStore.js
- /games/dos-verdades-una-mentira/constants/DosVerdadesUnaMentiraGameConfig.js
- /games/dos-verdades-una-mentira/assets/images/dos-verdades-una-mentira-logo.png
- /games/dos-verdades-una-mentira/assets/sounds/vote-sound.mp3
### Componentes React Native

- DosVerdadesUnaMentiraPlayerHUD: Muestra la lista de jugadores, sus puntuaciones actuales y resalta quién es el narrador del turno.
- DosVerdadesUnaMentiraStatementCard: Un componente de tarjeta individual que muestra el texto de una de las tres afirmaciones. Es interactivo y permite al usuario tocarlo para emitir su voto.
- DosVerdadesUnaMentiraVotingView: Contiene las tres instancias de 'DosVerdadesUnaMentiraStatementCard' y gestiona la lógica de selección y envío del voto.
- DosVerdadesUnaMentiraScoreboard: Componente que se muestra al final del juego, presentando un ranking de jugadores con sus puntuaciones finales y coronando al ganador.
### División Funcional

La funcionalidad se divide de la siguiente manera: la carpeta '/app' contiene las pantallas principales gestionadas por Expo Router (inicio, juego, resultados). La carpeta '/components' alberga los componentes de UI reutilizables y específicos del juego. El estado centralizado del juego, incluyendo jugadores, puntuaciones, estado de la ronda y afirmaciones, se gestiona en '/store/dosVerdadesUnaMentiraStore.js' usando Zustand. La lógica de negocio, como el cálculo de puntos y el avance de turnos, se puede manejar dentro de las propias pantallas o abstraerse en hooks personalizados para mantener los componentes limpios. Los datos estáticos y de configuración, como las reglas de puntuación o los tiempos, residen en '/constants'.

## Ejemplos de Preguntas o Contenido Personalizado

- Set 1: He viajado a más de 10 países. | Una vez gané un concurso de talentos cantando. | Hablo un idioma inventado con mi hermano.
- Set 2: De pequeño quería ser astronauta. | Nunca he roto un hueso. | Tengo una cicatriz por culpa de un mono.
- Set 3: Sé cocinar un plato de alta cocina. | Corrí una media maratón el año pasado. | Vi todas las temporadas de 'Juego de Tronos' en una semana.
- Set 4: Mi primer trabajo fue en una biblioteca. | Le tengo miedo a las mariposas. | Una vez me encontré a un famoso en el supermercado.
- Set 5: Puedo resolver un cubo de Rubik en menos de un minuto. | Construí mi propio ordenador desde cero. | Nunca he comido pizza con piña.
- Set 6: He nadado con delfines en mar abierto. | Mi color favorito es el beige. | Aprendí a conducir en un tractor.
- Set 7: Tengo una colección de más de 50 plantas en casa. | He escrito un libro que nunca publiqué. | Jamás he usado la red social TikTok.
## Notas y Personalizaciones

- Modo Temático: Permitir a los jugadores elegir una categoría para las afirmaciones (ej: 'Viajes', 'Comida', 'Trabajo', 'Infancia') para enfocar el juego.
- Modo Manual: Una opción donde el narrador inventa sus propias dos verdades y una mentira en lugar de que la app las genere, usando la app solo para la votación y puntuación.
- Personalización de Puntos: Permitir al anfitrión cambiar cuántos puntos se otorgan por acierto o por engaño.
- Rondas Relámpago: Un modo de juego más rápido con temporizadores de debate y votación mucho más cortos.
- Power-ups: Introducir elementos como 'Doble Puntuación' en una ronda o 'Pista' para ayudar a los votantes.
- Modo 'Adivina la Verdad': Una variante donde el narrador presenta dos mentiras y solo una verdad, y los demás deben encontrar la afirmación verdadera.
