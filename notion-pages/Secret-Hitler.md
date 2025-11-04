# Secret Hitler

# Secret Hitler

**Categoría: **Juego de deducción social y roles ocultos

## Descripción General del Juego

Secret Hitler es un intenso juego de deducción social y engaño para 5 a 10 jugadores, ambientado en la Alemania de los años 30. Los jugadores se dividen secretamente en dos equipos: los Liberales, que forman la mayoría, y los Fascistas, que son una minoría oculta. Un jugador fascista también es designado como el Hitler Secreto. El objetivo de los Liberales es promulgar cinco políticas liberales o asesinar a Hitler. El objetivo de los Fascistas es promulgar seis políticas fascistas o, una vez que el tablero de políticas fascistas avanza lo suficiente, lograr que Hitler sea elegido Canciller. Cada ronda, los jugadores eligen un Presidente y un Canciller, quienes colaboran para promulgar una nueva política. El giro es que nadie sabe con certeza en quién confiar. El Presidente recibe tres cartas de política, descarta una y pasa dos al Canciller. El Canciller descarta una y promulga la restante. Esta mecánica crea una cadena de desinformación y desconfianza, ya que los jugadores deben deducir quién miente y quién dice la verdad para llevar a su equipo a la victoria.

## Instrucciones Paso a Paso

1. 1. **Inicio y Asignación de Roles**: Al comenzar la partida, cada jugador recibe una carta de rol secreta que le indica si es Liberal, Fascista o Hitler. Los Fascistas (incluido Hitler) se conocen entre sí, pero los Liberales no saben quién es quién.
1. 2. **Elección de Gobierno**: En cada ronda, el jugador con el marcador de Presidente elige a otro jugador para que sea su Canciller. Esta propuesta de gobierno se somete a votación.
1. 3. **Votación**: Todos los jugadores, incluido el candidato a Presidente y Canciller, votan simultáneamente y en secreto 'Ja!' (Sí) o 'Nein!' (No). Si más del 50% de los jugadores vota 'Ja!', el gobierno es elegido.
1. 4. **Fallo en la Elección**: Si la votación falla, el marcador de Presidente pasa al siguiente jugador en orden y el contador de elecciones avanza. Si tres elecciones fallan consecutivamente, la política superior del mazo se promulga automáticamente y el contador se reinicia.
1. 5. **Sesión Legislativa**: Si la votación tiene éxito, el Presidente roba las tres primeras cartas del mazo de políticas. El Presidente las mira en secreto, descarta una y le pasa las dos restantes al Canciller.
1. 6. **Promulgación de Política**: El Canciller recibe las dos cartas, las mira en secreto, descarta una y promulga la carta restante, colocándola en el tablero correspondiente (Liberal o Fascista).
1. 7. **Poderes Ejecutivos**: Si se promulga una política Fascista, el Presidente de esa ronda puede obtener un poder ejecutivo especial. Estos poderes incluyen investigar la lealtad de un jugador, convocar una elección especial, examinar las próximas tres políticas o ejecutar a un jugador.
1. 8. **Condiciones de Victoria de los Liberales**: Los Liberales ganan si se promulgan 5 políticas Liberales o si Hitler es asesinado con el poder ejecutivo de 'Ejecución'.
1. 9. **Condiciones de Victoria de los Fascistas**: Los Fascistas ganan si se promulgan 6 políticas Fascistas o si Hitler es elegido Canciller en cualquier momento después de que se hayan promulgado 3 políticas Fascistas.
1. 10. **Poder de Veto**: Después de que se promulguen 5 políticas Fascistas, el Presidente y el Canciller desbloquean el poder de 'Veto'. Si ambos están de acuerdo, pueden vetar la sesión legislativa actual, lo que cuenta como una elección fallida.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código para el juego Secret Hitler está encapsulado en una única carpeta dedicada llamada 'secret-hitler' para garantizar la modularidad y evitar conflictos con otros juegos. El proyecto utiliza React Native con Expo, empleando Expo Router para la navegación entre la pantalla del lobby y la pantalla principal del juego. La gestión del estado global del juego (roles de los jugadores, políticas, estado de la ronda, etc.) se maneja con Zustand (o Redux Toolkit), centralizando toda la lógica en un 'store' específico del juego. La estructura sigue una clara separación de responsabilidades: los componentes de la interfaz de usuario (UI) están en la carpeta 'components', las pantallas en 'app', la lógica del juego y el estado en 'store', los datos estáticos como reglas en 'constants' y los recursos gráficos y de audio en 'assets'.

### Archivos Necesarios

- /games/secret-hitler/app/_layout.js
- /games/secret-hitler/app/index.js
- /games/secret-hitler/app/secret-hitler-game.js
- /games/secret-hitler/components/SecretHitlerBoard.js
- /games/secret-hitler/components/SecretHitlerPlayerList.js
- /games/secret-hitler/components/SecretHitlerVoteView.js
- /games/secret-hitler/components/SecretHitlerPolicySelection.js
- /games/secret-hitler/components/SecretHitlerRoleRevealModal.js
- /games/secret-hitler/store/secretHitlerStore.js
- /games/secret-hitler/constants/SecretHitlerGameRules.js
- /games/secret-hitler/assets/images/board_liberal.png
- /games/secret-hitler/assets/images/board_fascist.png
- /games/secret-hitler/assets/images/card_liberal.png
- /games/secret-hitler/assets/images/card_fascist.png
- /games/secret-hitler/assets/images/role_hitler.png
### Componentes React Native

- SecretHitlerBoard.js: Renderiza los dos tableros de políticas (Liberal y Fascista), mostrando las cartas promulgadas y los espacios para futuros poderes ejecutivos.
- SecretHitlerPlayerList.js: Muestra la lista de todos los jugadores en la partida, su estado actual (Presidente, Canciller, candidato, espectador, ejecutado) y un indicador de quién ha votado.
- SecretHitlerVoteView.js: Componente modal o superpuesto que permite a los jugadores emitir su voto 'Ja!' o 'Nein!' durante la fase de elección de gobierno.
- SecretHitlerPolicySelection.js: Interfaz visual para que el Presidente y el Canciller vean las cartas de política, las descarten y promulguen una. Muestra diferentes estados según el rol del jugador.
- SecretHitlerRoleRevealModal.js: Una pantalla inicial que se muestra a cada jugador de forma privada, revelando su rol (Liberal, Fascista, Hitler), su afiliación de partido y, en el caso de los Fascistas, quiénes son sus compañeros de equipo.
### División Funcional

La funcionalidad se divide en capas: la capa de UI (en 'components') se compone de componentes reutilizables y puramente visuales que reciben datos y emiten eventos. La capa de pantallas (en 'app') utiliza estos componentes para construir las vistas del juego, como el lobby o el tablero principal. La capa de lógica y estado (en 'store/secretHitlerStore.js') contiene toda la lógica del juego: manejo de turnos, distribución de roles, conteo de votos, aplicación de poderes ejecutivos y verificación de condiciones de victoria. Esta capa es la única fuente de verdad para el estado del juego, asegurando consistencia.

## Ejemplos de Preguntas o Contenido Personalizado

- Acusación: 'El Presidente dijo que le pasé una política liberal y una fascista, pero es mentira. ¡Me pasó dos fascistas! ¡No tuve opción!'
- Defensa: 'Soy un Liberal leal. Si me otorgan el poder de investigación, lo usaré en un jugador de confianza para confirmar su identidad y reducir el círculo de sospechosos.'
- Argumento de Voto: 'No podemos aprobar este gobierno. El candidato a Canciller ha votado 'No' en los últimos tres gobiernos liberales. Es claramente un Fascista intentando avanzar el contador de elecciones.'
- Estrategia: 'Liberales, tenemos que ser cuidadosos. Ya hay 3 políticas fascistas en el tablero. A partir de ahora, si elegimos a Hitler como Canciller, perdemos instantáneamente.'
- Bluff: 'Soy Hitler. Ejecútenme y los fascistas ganarán la simpatía del pueblo. (Dicho por un Liberal para que no lo ejecuten)'
- Análisis: 'El Canciller promulgó una política fascista. Ahora debemos analizar: ¿fue forzado por un Presidente fascista o es él mismo el fascista? Miremos su historial de votación.'
## Notas y Personalizaciones

- Temas visuales: Permitir a los usuarios elegir diferentes skins que cambien la ambientación del juego, por ejemplo, 'Secret Cylon' (Battlestar Galactica), 'Secret Deatheater' (Harry Potter) o 'Secret Sith' (Star Wars), con arte y terminología personalizadas.
- Modos de juego alternativos: Incluir un 'Modo Turbo' con menos políticas necesarias para ganar para partidas más rápidas, o un 'Modo Caos' con eventos aleatorios cada ciertas rondas.
- Roles de expansión: Añadir roles opcionales de expansiones como el Comunista (un tercer equipo que gana bajo condiciones especiales) o el Anarquista (gana si el juego termina sin un ganador claro).
- Configuraciones de partida personalizadas: Permitir al anfitrión de la partida ajustar reglas, como el número de políticas en el mazo o qué poderes ejecutivos están disponibles en el tablero fascista.
- Sistema de reputación y perfiles: Los jugadores podrían tener perfiles con estadísticas (partidas ganadas como Liberal/Fascista, etc.) y un sistema de calificación para fomentar el juego limpio en partidas online.
- Tutorial interactivo: Implementar un tutorial guiado que enseñe a los nuevos jugadores las reglas y estrategias básicas del juego paso a paso.
