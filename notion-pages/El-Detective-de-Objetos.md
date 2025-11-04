# El Detective de Objetos

# El Detective de Objetos

**Categoría: **Juego social de adivinanzas y observación

## Descripción General del Juego

El Detective de Objetos es un juego social interactivo diseñado para 2 o más jugadores, ideal para fiestas y reuniones. El objetivo es simple pero desafiante: adivinar un objeto común de la habitación a partir de una fotografía extremadamente cercana. En cada ronda, un jugador asume el rol de 'Fotógrafo', mientras que los demás se convierten en 'Detectives'. El Fotógrafo utiliza la aplicación móvil para tomar una foto muy ampliada (macro) de un objeto cercano, asegurándose de que el encuadre inicial sea lo más abstracto y irreconocible posible. La partida comienza mostrando a los Detectives solo una pequeña porción de esta imagen. Por turnos, cada Detective intenta adivinar de qué objeto se trata. Con cada respuesta incorrecta, la aplicación reduce el zoom de la imagen ligeramente, revelando un poco más del objeto y ofreciendo nuevas pistas visuales. El primer Detective que logre identificar correctamente el objeto gana la ronda y obtiene un punto. Si la imagen se revela por completo y nadie ha acertado, el Fotógrafo gana un punto por su astuta elección. El juego fomenta la observación, la creatividad y la interacción social, transformando el entorno cotidiano en un campo de misterio.

## Instrucciones Paso a Paso

1. Inicio de la Ronda: Se elige a un jugador para ser el 'Fotógrafo'. El resto de jugadores serán los 'Detectives'.
1. Captura de la Pista: El Fotógrafo abre la app, navega a la pantalla de configuración de ronda y usa la cámara para tomar una foto muy de cerca de un objeto en la habitación. La app ofrece una herramienta de recorte y zoom para asegurar que el encuadre inicial sea un desafío.
1. Comienza el Interrogatorio: Una vez confirmada la foto, el juego comienza. La app muestra la imagen con el máximo nivel de zoom en el dispositivo, que se pasa al primer Detective.
1. Primer Intento: El Detective en turno observa la pista visual y dice en voz alta qué cree que es el objeto.
1. Veredicto del Fotógrafo: Si la suposición es incorrecta, el Fotógrafo presiona el botón 'Incorrecto' en la app. La imagen se aleja un nivel de zoom, revelando más detalles. El turno pasa al siguiente Detective.
1. ¡Caso Resuelto!: Si un Detective acierta, el Fotógrafo presiona 'Correcto'. El Detective que adivinó gana un punto, y la ronda finaliza. La app revela la foto completa a todos.
1. Un Misterio sin Resolver: Si se alcanzan todos los niveles de zoom (la foto se muestra completa) y ningún Detective ha acertado, el Fotógrafo gana un punto por burlar a los demás.
1. Cambio de Rol: Para la siguiente ronda, el rol de Fotógrafo rota al siguiente jugador en la lista.
1. Fin del Juego: El juego concluye después de un número predeterminado de rondas o cuando un jugador alcanza una puntuación objetivo. ¡El jugador con más puntos es el Detective Maestro!
## Estructura de Archivos y Componentes en Expo con React Native

La arquitectura del código está encapsulada dentro de una única carpeta dedicada '/games/el-detective-de-objetos/', asegurando que todos los archivos relacionados con el juego estén aislados y organizados. El proyecto utiliza React Native con Expo. La navegación entre pantallas se gestiona mediante Expo Router, con los archivos de ruta ubicados en '/games/el-detective-de-objetos/app/'. Para la gestión del estado global del juego (como jugadores, puntuaciones, imagen actual y nivel de zoom) se utiliza Zustand, con el store definido en '/games/el-detective-de-objetos/store/'. Se sigue un principio de separación de responsabilidades: los componentes de la interfaz de usuario (UI), que son puramente presentacionales, se encuentran en '/games/el-detective-de-objetos/components/', la lógica del juego reside principalmente en el store de Zustand y es invocada desde las pantallas, y los recursos estáticos como imágenes o fuentes están en '/games/el-detective-de-objetos/assets/'.

### Archivos Necesarios

- /games/el-detective-de-objetos/app/_layout.js
- /games/el-detective-de-objetos/app/index.js
- /games/el-detective-de-objetos/app/detective-objetos-setup.js
- /games/el-detective-de-objetos/app/detective-objetos-game.js
- /games/el-detective-de-objetos/app/detective-objetos-results.js
- /games/el-detective-de-objetos/components/DetectiveObjetosImageView.js
- /games/el-detective-de-objetos/components/DetectiveObjetosPlayerList.js
- /games/el-detective-de-objetos/components/DetectiveObjetosPhotographerControls.js
- /games/el-detective-de-objetos/store/detectiveObjetosStore.js
- /games/el-detective-de-objetos/constants/detectiveObjetosConfig.js
- /games/el-detective-de-objetos/assets/images/detective-objetos-icon.png
### Componentes React Native

- DetectiveObjetosImageView: Es el componente central del juego. Recibe la URI de la imagen y el nivel de zoom actual del store de Zustand. Se encarga de renderizar la imagen, aplicando la transformación de escala (zoom) correspondiente. Implementa una transición animada suave cada vez que el nivel de zoom cambia.
- DetectiveObjetosPlayerList: Muestra una lista de todos los jugadores y sus puntuaciones actuales. Resalta visualmente al jugador cuyo turno está activo, obteniendo esta información directamente del estado global.
- DetectiveObjetosPhotographerControls: Este componente solo es visible en la pantalla del Fotógrafo. Contiene los dos botones principales de la ronda: 'Acierto' y 'Fallo'. Al ser presionados, invocan las acciones correspondientes en el store de Zustand para actualizar la puntuación, cambiar el nivel de zoom y avanzar el turno.
### División Funcional

La funcionalidad se divide en cuatro áreas clave. UI (Pantallas y Componentes): Las pantallas definidas con Expo Router en `/app` orquestan la presentación de los componentes reutilizables de `/components`. Estos leen el estado del store pero no lo modifican directamente. Lógica del Juego (Store): El store de Zustand en `/store/detectiveObjetosStore.js` centraliza toda la lógica de negocio: gestión de turnos, cálculo de puntuaciones, progresión del zoom y estado general de la partida (inicio, en curso, finalizada). Gestión de Estado (Zustand): Se utiliza un único store para mantener un estado global y reactivo, accesible desde cualquier componente o pantalla, lo que simplifica la sincronización de la UI con los datos del juego. Constantes y Assets: La configuración estática del juego (ej. los pasos de zoom, el número máximo de fallos) se define en `/constants/detectiveObjetosConfig.js` para una fácil modificación, mientras que todos los recursos visuales se alojan en `/assets`.

## Ejemplos de Preguntas o Contenido Personalizado

- La textura granulada de la goma de borrar de un lápiz.
- El patrón de puntos de la rejilla de un altavoz.
- Las cerdas entrelazadas de un cepillo para el pelo.
- El reflejo en la cabeza de un tornillo metálico.
- La esquina de una bolsa de té, mostrando la grapa y el hilo.
- El patrón en espiral del muelle de un bolígrafo.
- La superficie porosa de un corcho de vino.
- El pequeño indicador LED de un dispositivo electrónico apagado.
## Notas y Personalizaciones

- Modo por Equipos: Los jugadores se dividen en dos equipos de Detectives, y compiten por la puntuación total del equipo.
- Modo Descriptivo: En lugar de adivinar, el Detective debe describir lo que ve sin usar ciertas palabras clave. Sus compañeros de equipo deben adivinar el objeto basándose en la descripción.
- Zoom Manual: Permitir que el Fotógrafo controle manualmente el área y el nivel de zoom con gestos de 'pinch-to-zoom' en cada fallo, en lugar de usar niveles predefinidos.
- Pistas por Puntos: Los Detectives pueden 'gastar' un punto para pedir una pista de una palabra al Fotógrafo.
- Rondas Relámpago: Todas las rondas tienen un temporizador global. El objetivo es resolver tantos misterios como sea posible antes de que se acabe el tiempo.
- Variante con Vídeo: En lugar de una foto, el Fotógrafo graba un vídeo macro de 2 segundos de un objeto, que se reproduce en bucle para los Detectives.
