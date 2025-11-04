# El Diccionario Falso

# El Diccionario Falso

**Categoría: **Juego social de creatividad y palabras

## Descripción General del Juego

El Diccionario Falso es un divertido juego de mesa social para 3 o más jugadores diseñado para poner a prueba tu creatividad, ingenio y capacidad de engaño. El objetivo principal no es solo saber, sino hacer creer a los demás que sabes. En cada ronda, la aplicación presenta una palabra real del diccionario, pero tan rara y desconocida que es muy probable que nadie conozca su significado. Cada jugador debe inventar y escribir en secreto una definición falsa pero que suene lo más verosímil posible. Una vez que todos han enviado sus creaciones, la aplicación las recopila, añade la definición verdadera y las presenta todas de forma anónima. A continuación, llega el momento de la verdad: cada jugador vota por la definición que cree que es la correcta. Se ganan puntos de dos maneras: acertando la definición real o engañando a otros jugadores para que voten por tu definición inventada. El juego combina el faroleo del póker con la creatividad, generando situaciones hilarantes y revelaciones sorprendentes. Gana el jugador que acumule más puntos al final de las rondas pactadas.

## Instrucciones Paso a Paso

1. Paso 1: Inicio de la partida. Un jugador crea una partida y comparte el código con los demás. El anfitrión puede configurar el número de rondas.
1. Paso 2: Comienza la ronda. La aplicación selecciona aleatoriamente una palabra rara de su base de datos y la muestra en la pantalla de todos los jugadores.
1. Paso 3: Escribir definiciones. Cada jugador tiene un tiempo limitado para escribir en secreto una definición falsa para la palabra. La clave es que sea creíble y convincente.
1. Paso 4: Recopilación. El sistema recoge todas las definiciones falsas enviadas por los jugadores y las mezcla de forma anónima con la definición real.
1. Paso 5: Votación. Se muestran todas las definiciones en pantalla en un orden aleatorio. Cada jugador debe leerlas y votar por la que cree que es la verdadera. No se puede votar por la propia definición.
1. Paso 6: Revelación de resultados. Una vez que todos han votado, la aplicación revela cuál era la definición correcta, quién la escribió (el sistema), y quién escribió cada una de las definiciones falsas.
1. Paso 7: Asignación de puntos. Se reparten los puntos de la ronda: ganas 2 puntos si votaste por la definición correcta. Ganas 1 punto por cada jugador que haya votado por tu definición falsa.
1. Paso 8: Actualización del marcador. Se muestra la tabla de puntuaciones actualizada con los totales de cada jugador.
1. Paso 9: Siguiente ronda. Se repite el proceso desde el Paso 2 con una nueva palabra.
1. Paso 10: Fin del juego. Al completarse la última ronda, se muestra la pantalla de resultados finales y se declara al ganador como el 'Maestro del Engaño'.
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del juego se organiza en una única carpeta dedicada llamada 'el-diccionario-falso' para garantizar la modularidad y evitar conflictos con otros juegos. Se utiliza React Native con Expo, aprovechando Expo Router para la navegación entre pantallas (lobby, juego, resultados). Para la gestión del estado global del juego (jugadores, puntuaciones, estado de la ronda, etc.), se emplea un gestor de estado ligero como Zustand. La estructura sigue un principio claro de separación de responsabilidades: los componentes de la interfaz de usuario (UI) se encuentran en la carpeta '/components', la lógica de las pantallas y la navegación en '/app', la lógica centralizada del juego en '/store', los datos estáticos como las palabras en '/constants' y los recursos multimedia en '/assets'.

### Archivos Necesarios

- /games/el-diccionario-falso/app/_layout.js
- /games/el-diccionario-falso/app/index.js
- /games/el-diccionario-falso/app/lobby/[gameId].js
- /games/el-diccionario-falso/app/game/[gameId].js
- /games/el-diccionario-falso/app/results/[gameId].js
- /games/el-diccionario-falso/components/DiccionarioFalsoPlayerList.js
- /games/el-diccionario-falso/components/DiccionarioFalsoWordDisplay.js
- /games/el-diccionario-falso/components/DiccionarioFalsoDefinitionInput.js
- /games/el-diccionario-falso/components/DiccionarioFalsoVotingList.js
- /games/el-diccionario-falso/components/DiccionarioFalsoRoundResults.js
- /games/el-diccionario-falso/components/DiccionarioFalsoScoreboard.js
- /games/el-diccionario-falso/store/diccionarioFalsoStore.js
- /games/el-diccionario-falso/constants/DiccionarioFalsoWords.js
- /games/el-diccionario-falso/assets/images/diccionario-falso-logo.png
### Componentes React Native

- DiccionarioFalsoPlayerList: Muestra la lista de jugadores en la sala de espera y durante la partida, incluyendo sus puntuaciones actuales y un indicador de quién ha enviado su definición.
- DiccionarioFalsoWordDisplay: Un componente visualmente destacado que muestra la palabra rara de la ronda actual para que todos los jugadores la vean claramente.
- DiccionarioFalsoDefinitionInput: Un campo de texto multilínea con un botón para que los jugadores escriban y envíen su definición falsa. Incluye un contador de caracteres y control de estado (escribiendo, enviado).
- DiccionarioFalsoVotingList: Renderiza una lista de botones o tarjetas, cada una con una de las definiciones (reales y falsas). Gestiona la selección del usuario y deshabilita el voto por la propia definición.
- DiccionarioFalsoRoundResults: Un componente modal o de pantalla completa que revela los resultados de la ronda: destaca la definición correcta, muestra qué jugador votó por qué opción y detalla los puntos ganados por cada uno.
- DiccionarioFalsoScoreboard: La tabla de clasificación general del juego. Muestra el nombre de cada jugador y su puntuación total, ordenándolos de mayor a menor. Es el componente principal en la pantalla de resultados finales.
### División Funcional

La funcionalidad se divide en capas claras. La UI (en /app y /components) es reactiva y se encarga únicamente de renderizar el estado actual del juego. La Lógica del Juego y la Gestión de Estado están centralizadas en el store de Zustand (/store/diccionarioFalsoStore.js), que actúa como la única fuente de verdad. Este store maneja las acciones como iniciar ronda, recibir definiciones, calcular puntos y pasar a la siguiente fase. La Navegación, gestionada por Expo Router, define el flujo entre las diferentes etapas del juego (del lobby a la partida, y de la partida a los resultados). Finalmente, los Datos y Constantes (/constants) proporcionan el contenido estático, como el listado de palabras y sus definiciones reales, desacoplando el contenido de la lógica de la aplicación.

## Ejemplos de Preguntas o Contenido Personalizado

- Palabra: ABULIA. Definición real: Falta de voluntad o de energía para moverse o tomar decisiones.
- Palabra: ALMIBARADO. Definición real: Excesivamente dulce, suave o delicado en el trato o en el habla.
- Palabra: Limerencia. Definición real: Estado mental involuntario, propio de la atracción romántica, que se caracteriza por pensamientos y fantasías obsesivas.
- Palabra: ZARANDAJO. Definición real: Persona despreciable, irresoluta y de poco valor.
- Palabra: PETRICOR. Definición real: El nombre que recibe el olor que se produce al caer la lluvia en los suelos secos.
- Palabra: JITANJÁFORA. Definición real: Texto carente de sentido cuyo valor estético se basa en la sonoridad y en el poder evocador de las palabras.
- Palabra: Uebos. Definición real: (Del latín 'opus est') Necesidad, cosa necesaria.
## Notas y Personalizaciones

- Modos temáticos: Crear paquetes de palabras centrados en temas específicos como 'Ciencia', 'Historia', 'Fantasía' o 'Tecnología' para variar la experiencia de juego.
- Diccionarios de la comunidad: Permitir a los usuarios crear y compartir sus propias listas de palabras, fomentando la rejugabilidad y el contenido generado por el usuario.
- Variante 'El Sinónimo Falso': En lugar de una definición, se muestra una palabra y los jugadores deben inventar un sinónimo falso pero creíble.
- Modo por equipos: Los jugadores se dividen en equipos y colaboran para escribir una única definición falsa por equipo. Los puntos se suman al total del equipo.
- Eventos de tiempo limitado: Introducir un 'Modo Rápido' con temporizadores más cortos para escribir y votar, añadiendo presión y un ritmo más frenético al juego.
- Sistema de 'Palabra del Día': Una competición diaria global donde todos los jugadores definen y votan por la misma palabra, con un ranking mundial.
