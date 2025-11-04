# El Diccionario Diabólico

# El Diccionario Diabólico

**Categoría: **Juego social de palabras y faroleo

## Descripción General del Juego

El Diccionario Diabólico es un juego de mesa social para 3 o más jugadores que pone a prueba tu creatividad, ingenio y capacidad para el engaño. El objetivo es simple pero desafiante: acumular la mayor cantidad de puntos adivinando la definición correcta de palabras extremadamente raras o, mejor aún, convenciendo a los demás de que tu definición inventada es la verdadera. En cada ronda, un jugador asume el rol de 'Lector'. La aplicación le muestra en secreto una palabra inusual junto con su definición real. La tarea del Lector es inventar una definición falsa pero plausible para esa palabra. Al mismo tiempo, los demás jugadores solo ven la palabra y deben usar su imaginación para crear sus propias definiciones falsas. Una vez que todos han enviado sus propuestas, la aplicación presenta todas las definiciones —la real y todas las falsas— de forma anónima. Los jugadores votan por la que creen que es la correcta. Se otorgan puntos por cada voto que reciba tu definición falsa y por adivinar la verdadera. ¿Tienes lo necesario para escribir la mentira perfecta y descubrir la verdad oculta?

## Instrucciones Paso a Paso

1. 1. **Inicio y Sala de Espera:** Un jugador crea una partida y comparte un código para que los demás se unan. Una vez que todos están en la sala, el anfitrión inicia el juego.
1. 2. **Selección del Lector:** Al comenzar la primera ronda, la aplicación elige aleatoriamente a un jugador como 'El Lector'. Este rol rotará en las rondas siguientes.
1. 3. **La Palabra Diabólica:** La aplicación muestra al Lector una palabra muy rara y su definición real. A los demás jugadores ('Los Escritores') solo se les muestra la palabra.
1. 4. **Creación de Definiciones:** El Lector debe escribir una definición falsa pero creíble. Simultáneamente, los Escritores deben inventar y enviar sus propias definiciones falsas para la misma palabra.
1. 5. **Fase de Votación:** La aplicación recopila todas las definiciones (la real y todas las inventadas) y las muestra en una lista en orden aleatorio y de forma anónima. Nadie sabe quién escribió qué.
1. 6. **Emitir el Voto:** Todos los jugadores, excepto el Lector, leen las opciones y votan por la definición que creen que es la correcta. Los jugadores no pueden votar por su propia definición.
1. 7. **Cálculo de Puntos:** Los puntos se asignan de la siguiente manera: 
- Ganas 100 puntos por cada jugador que vote por tu definición falsa. 
- Ganas 200 puntos si votas por la definición correcta. 
- El Lector gana 300 puntos si NADIE vota por la definición correcta.
1. 8. **Revelación y Resultados:** La aplicación revela cuál era la definición correcta, quién escribió cada definición falsa y quién votó por qué. Se muestra una tabla de puntuaciones actualizada.
1. 9. **Siguiente Ronda:** El rol de 'Lector' pasa al siguiente jugador en la lista y comienza una nueva ronda con una nueva palabra.
1. 10. **Fin del Juego:** El juego termina después de un número predeterminado de rondas o cuando un jugador alcanza un límite de puntos. El jugador con la puntuación más alta es declarado el 'Maestro del Engaño'.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego se encapsula completamente dentro de una carpeta dedicada llamada 'el-diccionario-diabolico' para asegurar modularidad y evitar conflictos con otros juegos. Utiliza React Native con Expo Router para la navegación entre pantallas, gestionando las rutas dentro de `/games/el-diccionario-diabolico/app`. Para la gestión del estado global del juego (como jugadores, puntuaciones, estado de la ronda, etc.), se emplea un gestor de estado como Zustand o Redux Toolkit, centralizando toda la lógica en un 'store' específico para el juego. La estructura sigue un principio claro de separación de responsabilidades: los componentes de la UI se encargan de renderizar la información, la lógica del juego reside en el store, los datos estáticos como las palabras están en la carpeta de constantes y los recursos gráficos y de sonido se encuentran en 'assets'.

### Archivos Necesarios

- /games/el-diccionario-diabolico/app/_layout.js
- /games/el-diccionario-diabolico/app/index.js
- /games/el-diccionario-diabolico/app/diccionario-diabolico-juego.js
- /games/el-diccionario-diabolico/app/diccionario-diabolico-fin.js
- /games/el-diccionario-diabolico/components/DiccionarioDiabolicoLobby.js
- /games/el-diccionario-diabolico/components/DiccionarioDiabolicoInputDefinicion.js
- /games/el-diccionario-diabolico/components/DiccionarioDiabolicoListaVotacion.js
- /games/el-diccionario-diabolico/components/DiccionarioDiabolicoPanelResultados.js
- /games/el-diccionario-diabolico/components/DiccionarioDiabolicoHUD.js
- /games/el-diccionario-diabolico/store/diccionarioDiabolicoStore.js
- /games/el-diccionario-diabolico/constants/DiccionarioDiabolicoPalabras.js
- /games/el-diccionario-diabolico/constants/DiccionarioDiabolicoConfig.js
- /games/el-diccionario-diabolico/assets/images/logo-diccionario-diabolico.png
- /games/el-diccionario-diabolico/assets/sounds/submit-definicion.mp3
### Componentes React Native

- DiccionarioDiabolicoLobby: Componente para la pantalla de inicio del juego. Muestra la lista de jugadores conectados, el código de la partida y el botón para que el anfitrión comience el juego.
- DiccionarioDiabolicoInputDefinicion: Un componente reutilizable con un área de texto para que los jugadores escriban sus definiciones. Muestra la palabra a definir. Para el Lector, muestra adicionalmente la definición real como referencia.
- DiccionarioDiabolicoListaVotacion: Renderiza una lista de botones, cada uno con una de las definiciones enviadas (reales y falsas) de forma anónima. Gestiona la lógica de selección y deshabilita el voto por la propia definición.
- DiccionarioDiabolicoPanelResultados: Se muestra al final de cada ronda. Revela la definición correcta, el autor de cada definición falsa, un desglose de los votos y la actualización de las puntuaciones de los jugadores.
- DiccionarioDiabolicoHUD: (Heads-Up Display) Un componente que se muestra de forma persistente durante la partida, mostrando información clave como el número de ronda actual, el nombre del Lector y un resumen de las puntuaciones.
### División Funcional

La funcionalidad se divide en capas claras. La capa de UI (React Native Components en `/components` y pantallas en `/app`) es responsable de la presentación visual y la captura de interacciones del usuario. La capa de Lógica y Estado (Zustand Store en `/store/diccionarioDiabolicoStore.js`) centraliza toda la lógica del juego: manejo de rondas, selección de palabras, cálculo de puntos y transición entre las fases del juego (escritura, votación, resultados). La capa de Datos (archivos en `/constants`) provee la información estática, como la lista de palabras y las reglas de puntuación, desacoplando el contenido de la lógica. Finalmente, la capa de Recursos (archivos en `/assets`) contiene todos los elementos multimedia específicos del juego.

## Ejemplos de Preguntas o Contenido Personalizado

- {"palabra": "Abuhado", "definicion": "Hinchado o abotagado, especialmente el rostro."}
- {"palabra": "Glabela", "definicion": "Parte del cráneo, lisa y sin pelo, situada entre los arcos superciliares."}
- {"palabra": "Petricor", "definicion": "Nombre que recibe el olor que se produce al caer la lluvia en los suelos secos."}
- {"palabra": "Jitanjáfora", "definicion": "Texto carente de sentido cuyo valor estético se basa en la sonoridad y en el poder evocador de las palabras, reales o inventadas."}
- {"palabra": "Uebos", "definicion": "Del latín 'opus est', significa 'necesidad' o 'cosa necesaria'. (Ej: 'Uebos me es hacer esto')."}
- {"palabra": "Serendipia", "definicion": "Hallazgo valioso e inesperado que se produce de manera accidental o casual."}
## Notas y Personalizaciones

- **Modo temático:** Crear paquetes de palabras basados en temas específicos como 'Ciencia Ficción', 'Términos Médicos Antiguos' o 'Jerga de Internet'.
- **Variante por equipos:** Los jugadores se dividen en equipos y colaboran en una única definición falsa por equipo para intentar engañar a los demás.
- **Modo 'A la Inversa':** La aplicación muestra una definición y los jugadores deben inventar una palabra que suene creíble para ella. Luego se vota por la palabra que parece más real.
- **Puntuación dinámica:** Otorgar puntos extra por la definición más votada o por adivinar la respuesta correcta más rápidamente.
- **Integración con API de diccionarios:** Conectar la aplicación a una API como la de la RAE para tener un suministro casi infinito de palabras y definiciones, asegurando que el juego nunca se repita.
- **Modo 'Dibujo Diabólico':** En lugar de escribir una definición, los jugadores deben hacer un dibujo que represente la palabra. Los demás votan por el dibujo que creen que mejor ilustra el significado real.
