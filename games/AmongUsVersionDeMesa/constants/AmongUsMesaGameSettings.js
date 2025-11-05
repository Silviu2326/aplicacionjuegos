// Constantes para la configuración del juego Among Us (versión de mesa)

export const MAP_ROOMS = [
  { id: 'electricidad', name: 'Electricidad', color: '#FFD700' },
  { id: 'administracion', name: 'Administración', color: '#4169E1' },
  { id: 'enfermeria', name: 'Enfermería', color: '#FF69B4' },
  { id: 'almacen', name: 'Almacén', color: '#8B4513' },
  { id: 'motores', name: 'Motores', color: '#FF4500' },
  { id: 'comunicaciones', name: 'Comunicaciones', color: '#32CD32' },
  { id: 'reactor', name: 'Reactor', color: '#00CED1' },
  { id: 'seguridad', name: 'Seguridad', color: '#DC143C' },
  { id: 'oxigeno', name: 'Oxígeno', color: '#87CEEB' },
  { id: 'cafeteria', name: 'Cafetería', color: '#FFA500' },
];

export const TASKS = [
  // Tareas de Electricidad
  {
    id: 'conectar-cables',
    name: 'Conectar cables',
    room: 'electricidad',
    description: 'Une los cables por color en el panel eléctrico',
    type: 'minigame',
    duration: 30000,
    difficulty: 'media',
    icon: '⚡',
  },
  {
    id: 'calibrar-distribuidor',
    name: 'Calibrar distribuidor',
    room: 'electricidad',
    description: 'Ajusta los valores del distribuidor de energía',
    type: 'minigame',
    duration: 25000,
    difficulty: 'alta',
    icon: '🔌',
  },
  {
    id: 'reparar-fusibles',
    name: 'Reparar fusibles',
    room: 'electricidad',
    description: 'Reemplaza los fusibles quemados',
    type: 'simple',
    duration: 20000,
    difficulty: 'baja',
    icon: '💡',
  },
  // Tareas de Administración
  {
    id: 'descargar-datos',
    name: 'Descargar datos',
    room: 'administracion',
    description: 'Descarga los datos en el panel de Administración',
    type: 'progress',
    duration: 20000,
    difficulty: 'media',
    icon: '📥',
  },
  {
    id: 'verificar-inventario',
    name: 'Verificar inventario',
    room: 'administracion',
    description: 'Revisa y actualiza el inventario del sistema',
    type: 'simple',
    duration: 15000,
    difficulty: 'baja',
    icon: '📋',
  },
  {
    id: 'archivar-documentos',
    name: 'Archivar documentos',
    room: 'administracion',
    description: 'Organiza y archiva los documentos importantes',
    type: 'simple',
    duration: 18000,
    difficulty: 'baja',
    icon: '📁',
  },
  // Tareas de Enfermería
  {
    id: 'escanearse',
    name: 'Escanearse',
    room: 'enfermeria',
    description: 'Escanea tu cuerpo en el panel médico',
    type: 'simple',
    duration: 10000,
    difficulty: 'baja',
    icon: '🏥',
  },
  {
    id: 'organizar-medicamentos',
    name: 'Organizar medicamentos',
    room: 'enfermeria',
    description: 'Ordena los medicamentos por fecha de vencimiento',
    type: 'simple',
    duration: 22000,
    difficulty: 'media',
    icon: '💊',
  },
  {
    id: 'revisar-signos-vitales',
    name: 'Revisar signos vitales',
    room: 'enfermeria',
    description: 'Verifica los monitores de signos vitales',
    type: 'progress',
    duration: 12000,
    difficulty: 'baja',
    icon: '📊',
  },
  // Tareas de Almacén
  {
    id: 'vaciar-basura',
    name: 'Vaciar la basura',
    room: 'almacen',
    description: 'Vacía el contenedor de basura',
    type: 'simple',
    duration: 15000,
    difficulty: 'baja',
    icon: '🗑️',
  },
  {
    id: 'inventariar-suministros',
    name: 'Inventariar suministros',
    room: 'almacen',
    description: 'Cuenta y registra todos los suministros',
    type: 'minigame',
    duration: 28000,
    difficulty: 'media',
    icon: '📦',
  },
  {
    id: 'organizar-herramientas',
    name: 'Organizar herramientas',
    room: 'almacen',
    description: 'Coloca las herramientas en su lugar correcto',
    type: 'simple',
    duration: 17000,
    difficulty: 'baja',
    icon: '🔧',
  },
  // Tareas de Motores
  {
    id: 'arreglar-motores',
    name: 'Arreglar motores',
    room: 'motores',
    description: 'Alinea los motores correctamente',
    type: 'minigame',
    duration: 25000,
    difficulty: 'alta',
    icon: '⚙️',
  },
  {
    id: 'verificar-temperatura',
    name: 'Verificar temperatura',
    room: 'motores',
    description: 'Revisa que los motores no se sobrecalienten',
    type: 'progress',
    duration: 14000,
    difficulty: 'media',
    icon: '🌡️',
  },
  {
    id: 'lubricar-engranajes',
    name: 'Lubricar engranajes',
    room: 'motores',
    description: 'Aplica lubricante a los engranajes principales',
    type: 'simple',
    duration: 19000,
    difficulty: 'media',
    icon: '🛢️',
  },
  // Tareas de Comunicaciones
  {
    id: 'comunicar-base',
    name: 'Comunicar con base',
    room: 'comunicaciones',
    description: 'Establece comunicación con la base',
    type: 'simple',
    duration: 12000,
    difficulty: 'baja',
    icon: '📡',
  },
  {
    id: 'sincronizar-satelites',
    name: 'Sincronizar satélites',
    room: 'comunicaciones',
    description: 'Alinea las antenas con los satélites',
    type: 'minigame',
    duration: 32000,
    difficulty: 'alta',
    icon: '🛰️',
  },
  {
    id: 'revisar-mensajes',
    name: 'Revisar mensajes',
    room: 'comunicaciones',
    description: 'Lee y procesa los mensajes recibidos',
    type: 'simple',
    duration: 16000,
    difficulty: 'baja',
    icon: '📨',
  },
  // Tareas de Reactor
  {
    id: 'estabilizar-reactor',
    name: 'Estabilizar reactor',
    room: 'reactor',
    description: 'Mantén presionado el botón para estabilizar',
    type: 'progress',
    duration: 15000,
    difficulty: 'media',
    icon: '⚛️',
  },
  {
    id: 'verificar-niveles',
    name: 'Verificar niveles',
    room: 'reactor',
    description: 'Comprueba que los niveles de energía sean óptimos',
    type: 'simple',
    duration: 13000,
    difficulty: 'baja',
    icon: '📊',
  },
  {
    id: 'calibrar-controles',
    name: 'Calibrar controles',
    room: 'reactor',
    description: 'Ajusta los controles del reactor',
    type: 'minigame',
    duration: 27000,
    difficulty: 'alta',
    icon: '🎛️',
  },
  // Tareas de Seguridad
  {
    id: 'revisar-camaras',
    name: 'Revisar cámaras',
    room: 'seguridad',
    description: 'Revisa las cámaras de seguridad',
    type: 'simple',
    duration: 10000,
    difficulty: 'baja',
    icon: '📹',
  },
  {
    id: 'verificar-sensores',
    name: 'Verificar sensores',
    room: 'seguridad',
    description: 'Comprueba que todos los sensores funcionen',
    type: 'minigame',
    duration: 24000,
    difficulty: 'media',
    icon: '🔍',
  },
  {
    id: 'revisar-bitacora',
    name: 'Revisar bitácora',
    room: 'seguridad',
    description: 'Lee los registros de seguridad del día',
    type: 'simple',
    duration: 18000,
    difficulty: 'baja',
    icon: '📖',
  },
  // Tareas de Oxígeno
  {
    id: 'verificar-oxigeno',
    name: 'Verificar oxígeno',
    room: 'oxigeno',
    description: 'Verifica los niveles de oxígeno',
    type: 'simple',
    duration: 8000,
    difficulty: 'baja',
    icon: '💨',
  },
  {
    id: 'limpiar-filtros',
    name: 'Limpiar filtros',
    room: 'oxigeno',
    description: 'Limpia los filtros de aire',
    type: 'progress',
    duration: 20000,
    difficulty: 'media',
    icon: '🌬️',
  },
  {
    id: 'calibrar-presion',
    name: 'Calibrar presión',
    room: 'oxigeno',
    description: 'Ajusta la presión del sistema de oxígeno',
    type: 'minigame',
    duration: 22000,
    difficulty: 'alta',
    icon: '📐',
  },
  // Tareas de Cafetería
  {
    id: 'limpiar-cafeteria',
    name: 'Limpiar cafetería',
    room: 'cafeteria',
    description: 'Limpia las mesas de la cafetería',
    type: 'simple',
    duration: 18000,
    difficulty: 'baja',
    icon: '🍽️',
  },
  {
    id: 'preparar-comida',
    name: 'Preparar comida',
    room: 'cafeteria',
    description: 'Prepara las comidas para la tripulación',
    type: 'progress',
    duration: 25000,
    difficulty: 'media',
    icon: '🍳',
  },
  {
    id: 'revisar-suministros-comida',
    name: 'Revisar suministros',
    room: 'cafeteria',
    description: 'Verifica el inventario de alimentos',
    type: 'simple',
    duration: 15000,
    difficulty: 'baja',
    icon: '🥫',
  },
];

export const SABOTAGES = [
  {
    id: 'apagar-luces',
    name: 'Apagar luces',
    description: 'Reduce la visibilidad de los tripulantes. Debe arreglarse en Electricidad.',
    duration: 60000,
    room: 'electricidad',
    icon: '💡',
    urgency: 'alta',
    requiresMultiplePlayers: false,
  },
  {
    id: 'fusionar-reactor',
    name: 'Fusionar reactor',
    description: '¡CRÍTICO! El reactor se está sobrecalentando. Debe arreglarse en Reactor antes de que explote.',
    duration: 45000,
    room: 'reactor',
    icon: '⚛️',
    urgency: 'critica',
    requiresMultiplePlayers: false,
  },
  {
    id: 'cerrar-puertas',
    name: 'Cerrar puertas',
    description: 'Aísla a un jugador en una sala específica. Se puede aplicar a cualquier sala.',
    duration: 30000,
    room: null,
    icon: '🚪',
    urgency: 'media',
    requiresMultiplePlayers: false,
  },
  {
    id: 'cortar-oxigeno',
    name: 'Cortar oxígeno',
    description: '¡CRÍTICO! El oxígeno se está agotando. Debe arreglarse en Oxígeno Y Administración.',
    duration: 60000,
    room: 'oxigeno',
    icon: '💨',
    urgency: 'critica',
    requiresMultiplePlayers: true,
    requiredRooms: ['oxigeno', 'administracion'],
  },
  {
    id: 'desactivar-comunicaciones',
    name: 'Desactivar comunicaciones',
    description: 'Las comunicaciones están caídas. Debe arreglarse en Comunicaciones.',
    duration: 40000,
    room: 'comunicaciones',
    icon: '📡',
    urgency: 'media',
    requiresMultiplePlayers: false,
  },
  {
    id: 'sobrecalentar-motores',
    name: 'Sobrecalentar motores',
    description: 'Los motores se están sobrecalentando. Debe arreglarse en Motores.',
    duration: 50000,
    room: 'motores',
    icon: '⚙️',
    urgency: 'alta',
    requiresMultiplePlayers: false,
  },
  {
    id: 'desactivar-seguridad',
    name: 'Desactivar seguridad',
    description: 'Las cámaras de seguridad están offline. Debe arreglarse en Seguridad.',
    duration: 35000,
    room: 'seguridad',
    icon: '📹',
    urgency: 'baja',
    requiresMultiplePlayers: false,
  },
];

export const PLAYER_COLORS = [
  '#FF0000', // Rojo
  '#0000FF', // Azul
  '#00FF00', // Verde
  '#FFFF00', // Amarillo
  '#FF00FF', // Magenta
  '#00FFFF', // Cyan
  '#FFA500', // Naranja
  '#800080', // Morado
  '#FFFFFF', // Blanco
  '#000000', // Negro
];

export const GAME_CONFIG = {
  MIN_PLAYERS: 4,
  MAX_PLAYERS: 10,
  DEFAULT_IMPOSTORS: 1,
  DISCUSSION_TIME: 120000, // 2 minutos en milisegundos
  VOTING_TIME: 30000, // 30 segundos en milisegundos
  TASK_BAR_VISUAL: true,
  EMERGENCY_COOLDOWN: 15000, // 15 segundos entre emergencias
  KILL_COOLDOWN: 25000, // 25 segundos entre kills para impostores
  ANONYMOUS_VOTES: false, // Si los votos son anónimos o visibles
  CONFIRM_EJECTIONS: true, // Si se confirma el rol al expulsar
  TASK_BAR_UPDATES: 'always', // 'always', 'meetings', 'never'
  VISION_DISTANCE: 1, // Distancia de visión en habitaciones
  KILL_DISTANCE: 1, // Distancia para matar
  COMMON_TASKS: 2, // Número de tareas comunes
  LONG_TASKS: 1, // Número de tareas largas
  SHORT_TASKS: 2, // Número de tareas cortas
};

// Nombres falsos para jugadores (si se quiere prellenar)
export const FAKE_PLAYER_NAMES = [
  'Alex', 'Sara', 'Miguel', 'Laura', 'Carlos', 'Ana', 'David', 'Maria',
  'Javier', 'Elena', 'Roberto', 'Carmen', 'Daniel', 'Patricia', 'Luis',
  'Isabel', 'Pablo', 'Monica', 'Fernando', 'Lucia'
];

// Estadísticas de ejemplo para el juego
export const EXAMPLE_STATISTICS = {
  totalGames: 156,
  wins: {
    crewmates: 89,
    impostors: 67,
  },
  averageGameTime: 1250000, // 20.8 minutos en ms
  favoriteRole: 'crewmate',
  totalKills: 234,
  totalTasksCompleted: 1245,
  totalSabotages: 89,
};

