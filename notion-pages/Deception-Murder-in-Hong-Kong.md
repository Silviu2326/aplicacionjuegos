# Deception: Murder in Hong Kong

# Deception: Murder in Hong Kong

**Categoría: **Juego de deducción social

## Descripción General del Juego

Deception: Murder in Hong Kong es un juego de deducción social y roles ocultos para 4 a 12 jugadores. En el corazón de la bulliciosa Hong Kong, se ha cometido un crimen y un equipo de investigadores debe resolverlo. Sin embargo, el asesino es uno de ellos. Un jugador asume el rol del Científico Forense, quien conoce la solución (el arma y la pista clave que usó el asesino), pero no puede comunicarse verbalmente. Su única forma de guiar a los investigadores es a través de fichas de escena especiales que describen detalles del crimen. Otro jugador es el Asesino, que eligió en secreto el arma y la pista clave. Su objetivo es desviar las sospechas y permanecer oculto. Los demás jugadores son Investigadores, cuyo objetivo es interpretar correctamente las pistas del Científico Forense para deducir la combinación correcta de arma y pista, y así desenmascarar al Asesino. Pueden existir roles adicionales como el Cómplice, que conoce la identidad del Asesino y le ayuda a sembrar la confusión, y el Testigo, que sabe quiénes son los culpables pero debe evitar ser descubierto. El juego se desarrolla en rondas de discusión intensa, acusaciones y análisis de evidencia, creando una atmósfera de tensión y desconfianza.

## Instrucciones Paso a Paso

1. 1. **Preparación (Lobby)**: Los jugadores se unen a la partida. El sistema asigna roles secretos a cada jugador: Asesino, Científico Forense, e Investigadores (y opcionalmente Cómplice y Testigo).
1. 2. **Fase Nocturna (Selección del Crimen)**: Todos los jugadores 'cierran los ojos' (la pantalla se oscurece). El Científico Forense 'abre los ojos' y la interfaz le pide al Asesino que seleccione una carta de Arma y una de Pista de las 4 que tiene en su mano. La selección se muestra al Científico Forense.
1. 3. **Identificación de Cómplices (Opcional)**: Si hay un Cómplice, la app le indicará que 'abra los ojos' para ver quién es el Asesino. Si hay un Testigo, este también 'abrirá los ojos' para ver al Asesino y al Cómplice.
1. 4. **Comienza la Investigación (Ronda 1)**: Todos 'abren los ojos'. El Científico Forense recibe 6 fichas de Escena al azar. Debe elegir una y colocar un marcador en la opción que mejor describa la solución. Por ejemplo, en la ficha 'Causa de la Muerte', podría marcar 'Envenenamiento' si el arma fue 'Veneno'.
1. 5. **Debate y Presentación**: Una vez la pista es revelada, los jugadores (incluido el Asesino y el Cómplice) debaten sobre su significado. Cada jugador tiene un breve turno para presentar su teoría sobre el crimen.
1. 6. **Rondas Siguientes (Ronda 2 y 3)**: Se repite el proceso. El Científico Forense presenta una nueva ficha de Escena en cada ronda, añadiendo más información para que los investigadores acoten las posibilidades.
1. 7. **Resolver el Crimen**: En cualquier momento, un Investigador puede usar su 'Placa' (una acción de un solo uso) para hacer una acusación formal. Debe seleccionar un Arma y una Pista que crea que son la solución. El Científico Forense confirma si es correcto o no.
1. 8. **Condiciones de Victoria**: Los Investigadores ganan si alguien acierta la combinación correcta de Arma y Pista. El Asesino (y el Cómplice) ganan si se acaba el tiempo o si todos los Investigadores fallan su acusación. Si los Investigadores ganan y el rol de Testigo está en juego, el Asesino y el Cómplice tienen una última oportunidad para identificar al Testigo y ganar la partida.
## Estructura de Archivos y Componentes en Expo con React Native

Todo el código para el juego 'Deception: Murder in Hong Kong' está encapsulado dentro de una única carpeta dedicada llamada 'deception-murder-in-hong-kong', asegurando la modularidad y evitando conflictos con otros juegos. El proyecto utiliza React Native con Expo Router para la gestión de pantallas y navegación. La gestión del estado global del juego (roles de jugadores, estado de la partida, pistas seleccionadas, etc.) se maneja con Zustand para una implementación sencilla y potente. La estructura sigue un principio de separación de responsabilidades: la UI se define en componentes reutilizables, la lógica de negocio reside en el store de Zustand y en hooks personalizados, y los datos estáticos como cartas y roles se guardan en archivos de constantes.

### Archivos Necesarios

- /games/deception-murder-in-hong-kong/app/_layout.js
- /games/deception-murder-in-hong-kong/app/index.js
- /games/deception-murder-in-hong-kong/app/deception-role-reveal.js
- /games/deception-murder-in-hong-kong/app/deception-game-board.js
- /games/deception-murder-in-hong-kong/components/DeceptionRoleCard.js
- /games/deception-murder-in-hong-kong/components/DeceptionEvidenceCard.js
- /games/deception-murder-in-hong-kong/components/DeceptionSceneTile.js
- /games/deception-murder-in-hong-kong/components/DeceptionPlayerGrid.js
- /games/deception-murder-in-hong-kong/components/DeceptionSolutionModal.js
- /games/deception-murder-in-hong-kong/store/deceptionGameStore.js
- /games/deception-murder-in-hong-kong/constants/DeceptionCards.js
- /games/deception-murder-in-hong-kong/constants/DeceptionRoles.js
- /games/deception-murder-in-hong-kong/assets/images/cards/poison.png
- /games/deception-murder-in-hong-kong/assets/images/roles/murderer.png
### Componentes React Native

- DeceptionRoleCard.js: Componente visual que muestra la carta de rol asignada a un jugador, con su nombre, imagen y descripción de habilidades.
- DeceptionEvidenceCard.js: Componente para mostrar las cartas de Arma y Pista Clave. Es interactivo para el Asesino durante la selección y para los Investigadores al hacer una acusación.
- DeceptionSceneTile.js: Representa las fichas de escena que usa el Científico Forense. Muestra la categoría (ej. 'Localización del Crimen') y las diferentes opciones, permitiendo al Forense colocar un marcador en una de ellas.
- DeceptionPlayerGrid.js: Muestra los avatares de todos los jugadores en la partida, su estado actual (hablando, acusado, etc.) y la placa de acusación si aún la tienen.
- DeceptionSolutionModal.js: Un modal que se abre cuando un jugador decide usar su placa. Contiene una vista de todas las Armas y Pistas disponibles para que el jugador haga su selección final.
### División Funcional

La funcionalidad se divide claramente: la UI (componentes visuales en la carpeta '/components'), la lógica del juego (transiciones de estado, asignación de roles, validación de soluciones, manejada en el store de Zustand en '/store/deceptionGameStore.js'), la gestión del estado (centralizada en Zustand), la navegación entre pantallas (definida en '/app' usando Expo Router) y los datos estáticos y assets (en '/constants' y '/assets' respectivamente).

## Ejemplos de Preguntas o Contenido Personalizado

- Ejemplo de Arma: Veneno. Pista Clave: Cóctel. El Científico Forense podría usar la ficha 'Causa de la Muerte' y marcar 'Enfermedad', y en 'Rastro de la víctima' marcar 'Relajado'.
- Ejemplo de Arma: Cuchillo. Pista Clave: Guante. El Científico Forense podría usar la ficha 'Herida' y marcar 'Corte/Apuñalamiento', y en 'Pista dejada en la escena' podría marcar 'Ropa'.
- Ejemplo de Arma: Trofeo. Pista Clave: Deudas. El Científico Forense podría usar 'Localización del Crimen' y marcar 'Estudio', y en 'Motivo del Crimen' marcar 'Riqueza'.
- Roles disponibles: Asesino, Científico Forense, Investigador, Cómplice, Testigo.
- Categorías de Fichas de Escena: Causa de la Muerte, Localización del Crimen, Motivo del Crimen, Pista dejada en la escena, Impresión general de la víctima, Duración del crimen.
- Ejemplos de Armas: Pistola, Cuerda, Veneno, Candelabro, Hacha, Tijeras.
- Ejemplos de Pistas Clave: Máscara, Llave, Ticket, Carta de amor, Huellas dactilares, Pelo.
## Notas y Personalizaciones

- **Expansiones Digitales**: Incluir roles y cartas de la expansión 'Undercover Allies' como contenido desbloqueable o premium, añadiendo los roles de 'Ladrón de Guante Blanco' y 'Agente Secreto'.
- **Modo de Juego Temporizado**: Añadir un modo de juego con temporizadores estrictos para cada fase de debate, aumentando la presión y el ritmo de la partida.
- **Temas Visuales**: Permitir a los jugadores desbloquear o comprar temas visuales que cambien la apariencia de las cartas, el tablero y la interfaz (ej: 'Noir Clásico', 'Misterio Futurista', 'Fantasía Medieval').
- **Juego Online con Chat de Voz**: Implementar un modo multijugador online con salas privadas y un sistema de chat de voz integrado para facilitar el debate y las acusaciones.
- **Sistema de Pistas Inteligente**: Para el Científico Forense, la app podría resaltar las fichas de escena que son más relevantes para la combinación de Arma y Pista seleccionada por el asesino, sirviendo como una guía para jugadores novatos.
- **Eventos de Escena Aleatorios**: Introducir eventos aleatorios al inicio de una ronda que modifiquen ligeramente las reglas, como 'Apagón' (el Forense solo puede colocar una ficha de escena menos relevante) o 'Pista Anónima' (se revela una pista adicional que puede ser verdadera o falsa).
