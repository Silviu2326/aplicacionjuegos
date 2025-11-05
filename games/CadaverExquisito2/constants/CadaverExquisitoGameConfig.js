export const GAME_CONFIG = {
  MIN_PLAYERS: 3,
  MAX_PLAYERS: 10,
  DEFAULT_MAX_ROUNDS: null, // null = ilimitado
  MIN_ROUNDS: 1,
  MAX_ROUNDS_LIMIT: 10,
  
  // Tiempo máximo por turno (en segundos) - opcional
  DEFAULT_TURN_TIME_LIMIT: null, // null = sin límite
  
  // Sugerencias de temas iniciales (categorizados)
  SUGGESTED_THEMES: {
    fantasia: [
      'Un día, el Sol decidió tomarse unas vacaciones y en su lugar apareció...',
      'El último dinosaurio no se extinguió, en realidad estaba escondido en...',
      'En lo profundo del bosque, había un árbol que susurraba secretos, y un día me dijo...',
      'Para mi sorpresa, cuando abrí la nevera, encontré a un gnomo que estaba...',
      'Un mago perdió su varita y ahora está trabajando en una oficina como...',
      'Los dragones existen pero se esconden en forma de...',
      'En una cueva secreta, encontré un mapa que llevaba a...',
      'La última bruja del mundo se convirtió en...',
      'Un unicornio se mudó a mi vecindario y ahora...',
      'Los fantasmas celebraron una fiesta y...',
    ],
    comedia: [
      'El verdadero motivo por el que los políticos discuten tanto es porque...',
      'Una reunión de superhéroes jubilados.',
      'El primer contacto con una civilización extraterrestre hecha de espaguetis.',
      'Un robot se volvió adicto al café y ahora...',
      'Los zombies organizaron una huelga porque...',
      'Un vampiro se volvió vegetariano y ahora...',
      'La fórmula secreta de la Coca-Cola contiene un ingrediente inesperado:...',
      'Un detective privado que solo resuelve casos de animales perdidos...',
      'El día que los objetos domésticos declararon la guerra...',
      'Un científico creó una máquina del tiempo pero solo va hacia adelante 5 minutos...',
    ],
    misterio: [
      'Un mensaje en una botella que cambia cada vez que lo lees...',
      'La casa abandonada al final de la calle tiene una ventana que siempre está iluminada...',
      'Un libro que escribía su propia historia mientras lo leías...',
      'El reloj de la torre siempre marca las 3:33...',
      'Cartas de amor que aparecen en lugares extraños desde hace 100 años...',
      'Un espejo que muestra el futuro pero solo de eventos trágicos...',
      'La biblioteca que tiene un libro más del que debería tener...',
      'Fotografías que cambian cuando nadie las mira...',
      'Un diario encontrado en un desván con fechas futuras...',
      'El teléfono que recibe llamadas de números que no existen...',
    ],
    aventura: [
      'Una expedición al centro de la Tierra revela que...',
      'El barco pirata que navega por las nubes...',
      'Un mapa del tesoro que se actualiza cada luna llena...',
      'La ciudad perdida de Atlantis está en realidad en...',
      'Un túnel secreto que conecta todos los museos del mundo...',
      'La llave que abre cualquier puerta, excepto la que quieres abrir...',
      'Un viaje en el tiempo accidental que te lleva a...',
      'La isla flotante que aparece cada 7 años...',
      'Un portal que se abre solo cuando alguien cuenta un chiste malo...',
      'El faro que guía a los barcos hacia dimensiones paralelas...',
    ],
    cienciaFiccion: [
      'El primer contacto con una civilización extraterrestre hecha de espaguetis.',
      'Una IA se enamoró de su programador y ahora...',
      'Los humanos descubrieron que los gatos son en realidad...',
      'Un experimento genético salió mal y ahora...',
      'La primera colonia en Marte tiene un problema:...',
      'Un agujero de gusano se abre en el patio trasero de alguien...',
      'Los robots se volvieron tan avanzados que...',
      'Un virus informático que afecta a la realidad...',
      'La energía oscura es en realidad...',
      'Un planeta donde el día y la noche duran 6 meses cada uno, pero...',
    ],
  },
  
  // Temas aleatorios (sin categoría específica)
  RANDOM_THEMES: [
    'El día que Internet se apagó para siempre...',
    'Un restaurante que solo sirve comida de otras dimensiones...',
    'El último libro del mundo fue escrito por...',
    'Una lluvia de confeti que dura 40 días...',
    'El museo de los objetos perdidos...',
    'Un día normal en el que las leyes de la física cambiaron...',
    'La escuela de magia para adultos...',
    'El primer día de trabajo en una empresa de viajes en el tiempo...',
    'Un reality show donde los participantes son personajes históricos...',
    'El día que todos hablaron en rima...',
  ],
  
  // Frases de inicio rápidas
  QUICK_STARTERS: [
    'Érase una vez...',
    'En un lugar muy lejano...',
    'Hace mucho, mucho tiempo...',
    'En un mundo paralelo...',
    'Un día cualquiera...',
    'La historia comenzó cuando...',
    'Todo empezó aquella noche...',
    'En lo más profundo de...',
    'Nadie sabía que...',
    'El secreto estaba guardado en...',
  ],
};
