// Datos falsos para el módulo TwoRoomsAndABoom

const NOMBRES_JUGADORES = [
  'Alex', 'Blake', 'Casey', 'Dana', 'Eli', 'Finley', 'Gray', 'Harper',
  'Ivy', 'Jordan', 'Kai', 'Logan', 'Morgan', 'Nova', 'Quinn', 'River',
  'Sage', 'Taylor', 'Val', 'Winter', 'Zane', 'Ash', 'Briar', 'Cameron'
];

const EQUIPOS = {
  ROJO: 'rojo',
  AZUL: 'azul',
  GRIS: 'gris',
};

const ROLES_BASICOS = {
  PRESIDENTE: 'presidente',
  BOMBA: 'bomba',
  JUGADOR: 'jugador',
};

const ROLES_ESPECIALES = {
  TIMIDO: 'timido',
  INGENIERO: 'ingeniero',
  ESPIA: 'espia',
  MEDICO: 'medico',
  KAMIKAZE: 'kamikaze',
  AGENTE_DOBLE: 'agente_doble',
  CUPIDO: 'cupido',
  TERRORISTA: 'terrorista',
  VICTIMA: 'victima',
  GAMBLER: 'gambler',
  FOOL: 'fool',
};

const generarJugador = (nombre, role, team, index, habitacionInicial = 1) => ({
  id: `jugador_${index}_${Date.now()}`,
  name: nombre,
  role: role,
  team: team, // 'rojo', 'azul', 'gris'
  habitacion: habitacionInicial,
  esLider: false,
  esRehen: false,
  revelado: false,
});

export const generarPartidaAleatoria = (numJugadores = null) => {
  const num = numJugadores || Math.floor(Math.random() * 15) + 6; // 6-20 jugadores
  
  // Calcular distribución de equipos
  const numEquipoRojo = Math.floor(num / 2);
  const numEquipoAzul = Math.floor((num - numEquipoRojo) / 2);
  const numEquipoGris = num - numEquipoRojo - numEquipoAzul;
  
  // Mezclar nombres disponibles
  const nombresDisponibles = [...NOMBRES_JUGADORES].sort(() => Math.random() - 0.5);
  const jugadoresNombres = nombresDisponibles.slice(0, num);
  
  // Asignar roles
  const jugadores = [];
  let indiceRojo = 0;
  let indiceAzul = 0;
  let indiceGris = 0;
  
  // Asignar Presidente (Equipo Azul)
  const presidenteIndex = Math.floor(Math.random() * numEquipoAzul);
  let azulAsignados = 0;
  
  // Asignar Bomba (Equipo Rojo)
  const bombaIndex = Math.floor(Math.random() * numEquipoRojo);
  let rojoAsignados = 0;
  
  // Dividir jugadores en habitaciones iniciales
  const habitacion1 = Math.floor(num / 2);
  const habitacion2 = num - habitacion1;
  
  let habitacion1Count = 0;
  let habitacion2Count = 0;
  
  for (let i = 0; i < num; i++) {
    const nombre = jugadoresNombres[i];
    const habitacionInicial = habitacion1Count < habitacion1 ? 1 : 2;
    
    if (habitacionInicial === 1) habitacion1Count++;
    else habitacion2Count++;
    
    let role, team;
    
    if (i < numEquipoRojo) {
      // Equipo Rojo
      if (rojoAsignados === bombaIndex) {
        role = ROLES_BASICOS.BOMBA;
      } else {
        role = ROLES_BASICOS.JUGADOR;
      }
      team = EQUIPOS.ROJO;
      rojoAsignados++;
    } else if (i < numEquipoRojo + numEquipoAzul) {
      // Equipo Azul
      if (azulAsignados === presidenteIndex) {
        role = ROLES_BASICOS.PRESIDENTE;
      } else {
        role = ROLES_BASICOS.JUGADOR;
      }
      team = EQUIPOS.AZUL;
      azulAsignados++;
    } else {
      // Equipo Gris (roles especiales)
      const rolesGris = [ROLES_ESPECIALES.TIMIDO, ROLES_ESPECIALES.ESPIA];
      role = rolesGris[Math.floor(Math.random() * rolesGris.length)];
      team = EQUIPOS.GRIS;
      indiceGris++;
    }
    
    jugadores.push(generarJugador(nombre, role, team, i, habitacionInicial));
  }
  
  // Mezclar jugadores
  const jugadoresMezclados = jugadores.sort(() => Math.random() - 0.5);
  
  return {
    id: `partida_${Date.now()}`,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    jugadores: jugadoresMezclados,
    numJugadores: num,
    numEquipoRojo,
    numEquipoAzul,
    numEquipoGris,
    estado: 'en_curso',
    rondaActual: 1,
    rondasTotales: 3,
  };
};

// Historial de partidas falsas
export const PARTIDAS_TWO_ROOMS_FAKE = [
  {
    id: 1,
    fecha: '2024-11-20',
    hora: '20:30',
    duracion: '45:15',
    numJugadores: 10,
    ganador: 'Equipo Rojo',
    rondas: 3,
    habitacionFinalPresidente: 1,
    habitacionFinalBomba: 1,
    eventos: [
      { tipo: 'ronda_inicio', ronda: 1, timestamp: '00:00' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Alex', timestamp: '00:05' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Casey', timestamp: '00:06' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Blake'], timestamp: '00:12' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Dana'], timestamp: '00:13' },
      { tipo: 'intercambio', rehenesIntercambiados: 2, timestamp: '00:18' },
      { tipo: 'ronda_fin', ronda: 1, timestamp: '00:20' },
      { tipo: 'ronda_inicio', ronda: 2, timestamp: '00:20' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Eli', timestamp: '00:25' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Finley', timestamp: '00:26' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Gray', 'Harper'], timestamp: '00:32' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Ivy', 'Jordan'], timestamp: '00:33' },
      { tipo: 'intercambio', rehenesIntercambiados: 4, timestamp: '00:38' },
      { tipo: 'ronda_fin', ronda: 2, timestamp: '00:40' },
      { tipo: 'ronda_inicio', ronda: 3, timestamp: '00:40' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Kai', timestamp: '00:45' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Logan', timestamp: '00:46' },
      { tipo: 'revelacion', rol: 'bomba', jugador: 'Blake', timestamp: '00:50' },
      { tipo: 'revelacion', rol: 'presidente', jugador: 'Alex', timestamp: '00:51' },
      { tipo: 'fin_juego', ganador: 'Equipo Rojo', timestamp: '00:52' },
    ],
    jugadores: [
      { nombre: 'Alex', role: 'presidente', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Blake', role: 'bomba', team: 'rojo', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Casey', role: 'jugador', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Dana', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Eli', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Finley', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Gray', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Harper', role: 'jugador', team: 'rojo', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Ivy', role: 'timido', team: 'gris', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Jordan', role: 'jugador', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
    ],
  },
  {
    id: 2,
    fecha: '2024-11-19',
    hora: '19:45',
    duracion: '38:22',
    numJugadores: 8,
    ganador: 'Equipo Azul',
    rondas: 3,
    habitacionFinalPresidente: 1,
    habitacionFinalBomba: 2,
    eventos: [
      { tipo: 'ronda_inicio', ronda: 1, timestamp: '00:00' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Kai', timestamp: '00:04' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Logan', timestamp: '00:05' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Morgan'], timestamp: '00:10' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Nova'], timestamp: '00:11' },
      { tipo: 'intercambio', rehenesIntercambiados: 2, timestamp: '00:16' },
      { tipo: 'ronda_fin', ronda: 1, timestamp: '00:18' },
      { tipo: 'ronda_inicio', ronda: 2, timestamp: '00:18' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Quinn', timestamp: '00:23' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'River', timestamp: '00:24' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Sage', 'Taylor'], timestamp: '00:30' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Val', 'Winter'], timestamp: '00:31' },
      { tipo: 'intercambio', rehenesIntercambiados: 4, timestamp: '00:36' },
      { tipo: 'ronda_fin', ronda: 2, timestamp: '00:38' },
      { tipo: 'ronda_inicio', ronda: 3, timestamp: '00:38' },
      { tipo: 'revelacion', rol: 'bomba', jugador: 'Nova', timestamp: '00:42' },
      { tipo: 'revelacion', rol: 'presidente', jugador: 'Kai', timestamp: '00:43' },
      { tipo: 'fin_juego', ganador: 'Equipo Azul', timestamp: '00:44' },
    ],
    jugadores: [
      { nombre: 'Kai', role: 'presidente', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Logan', role: 'bomba', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Morgan', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Nova', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Quinn', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'River', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Sage', role: 'espia', team: 'gris', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Taylor', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
    ],
  },
  {
    id: 3,
    fecha: '2024-11-18',
    hora: '21:00',
    duracion: '52:10',
    numJugadores: 12,
    ganador: 'Equipo Rojo',
    rondas: 3,
    habitacionFinalPresidente: 2,
    habitacionFinalBomba: 2,
    eventos: [
      { tipo: 'ronda_inicio', ronda: 1, timestamp: '00:00' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Val', timestamp: '00:06' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Winter', timestamp: '00:07' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Zane'], timestamp: '00:14' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Ash'], timestamp: '00:15' },
      { tipo: 'intercambio', rehenesIntercambiados: 2, timestamp: '00:20' },
      { tipo: 'ronda_fin', ronda: 1, timestamp: '00:22' },
      { tipo: 'ronda_inicio', ronda: 2, timestamp: '00:22' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Briar', timestamp: '00:28' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Cameron', timestamp: '00:29' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Alex', 'Blake'], timestamp: '00:36' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Casey', 'Dana'], timestamp: '00:37' },
      { tipo: 'intercambio', rehenesIntercambiados: 4, timestamp: '00:42' },
      { tipo: 'ronda_fin', ronda: 2, timestamp: '00:44' },
      { tipo: 'ronda_inicio', ronda: 3, timestamp: '00:44' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Eli', timestamp: '00:50' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Finley', timestamp: '00:51' },
      { tipo: 'revelacion', rol: 'bomba', jugador: 'Casey', timestamp: '00:55' },
      { tipo: 'revelacion', rol: 'presidente', jugador: 'Dana', timestamp: '00:56' },
      { tipo: 'fin_juego', ganador: 'Equipo Rojo', timestamp: '00:57' },
    ],
    jugadores: [
      { nombre: 'Alex', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Blake', role: 'jugador', team: 'rojo', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Casey', role: 'bomba', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Dana', role: 'presidente', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Eli', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Finley', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Gray', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Harper', role: 'jugador', team: 'rojo', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Ivy', role: 'ingeniero', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Jordan', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Kai', role: 'medico', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Logan', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
    ],
  },
  {
    id: 4,
    fecha: '2024-11-17',
    hora: '18:20',
    duracion: '41:35',
    numJugadores: 7,
    ganador: 'Equipo Azul',
    rondas: 3,
    habitacionFinalPresidente: 1,
    habitacionFinalBomba: 2,
    eventos: [
      { tipo: 'ronda_inicio', ronda: 1, timestamp: '00:00' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Morgan', timestamp: '00:04' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Nova', timestamp: '00:05' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Quinn'], timestamp: '00:10' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['River'], timestamp: '00:11' },
      { tipo: 'intercambio', rehenesIntercambiados: 2, timestamp: '00:16' },
      { tipo: 'ronda_fin', ronda: 1, timestamp: '00:18' },
      { tipo: 'ronda_inicio', ronda: 2, timestamp: '00:18' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Sage', timestamp: '00:23' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Taylor', timestamp: '00:24' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Val'], timestamp: '00:29' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Winter'], timestamp: '00:30' },
      { tipo: 'intercambio', rehenesIntercambiados: 2, timestamp: '00:35' },
      { tipo: 'ronda_fin', ronda: 2, timestamp: '00:37' },
      { tipo: 'ronda_inicio', ronda: 3, timestamp: '00:37' },
      { tipo: 'revelacion', rol: 'bomba', jugador: 'River', timestamp: '00:40' },
      { tipo: 'revelacion', rol: 'presidente', jugador: 'Morgan', timestamp: '00:41' },
      { tipo: 'fin_juego', ganador: 'Equipo Azul', timestamp: '00:42' },
    ],
    jugadores: [
      { nombre: 'Morgan', role: 'presidente', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Nova', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Quinn', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'River', role: 'bomba', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Sage', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Taylor', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Val', role: 'timido', team: 'gris', habitacionFinal: 1, estado: 'vivo' },
    ],
  },
  {
    id: 5,
    fecha: '2024-11-16',
    hora: '22:15',
    duracion: '48:50',
    numJugadores: 9,
    ganador: 'Equipo Rojo',
    rondas: 3,
    habitacionFinalPresidente: 2,
    habitacionFinalBomba: 2,
    eventos: [
      { tipo: 'ronda_inicio', ronda: 1, timestamp: '00:00' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Winter', timestamp: '00:05' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Zane', timestamp: '00:06' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Ash'], timestamp: '00:12' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Briar'], timestamp: '00:13' },
      { tipo: 'intercambio', rehenesIntercambiados: 2, timestamp: '00:18' },
      { tipo: 'ronda_fin', ronda: 1, timestamp: '00:20' },
      { tipo: 'ronda_inicio', ronda: 2, timestamp: '00:20' },
      { tipo: 'eleccion_lider', habitacion: 1, lider: 'Cameron', timestamp: '00:26' },
      { tipo: 'eleccion_lider', habitacion: 2, lider: 'Alex', timestamp: '00:27' },
      { tipo: 'seleccion_rehenes', habitacion: 1, rehenes: ['Blake', 'Casey'], timestamp: '00:34' },
      { tipo: 'seleccion_rehenes', habitacion: 2, rehenes: ['Dana', 'Eli'], timestamp: '00:35' },
      { tipo: 'intercambio', rehenesIntercambiados: 4, timestamp: '00:40' },
      { tipo: 'ronda_fin', ronda: 2, timestamp: '00:42' },
      { tipo: 'ronda_inicio', ronda: 3, timestamp: '00:42' },
      { tipo: 'revelacion', rol: 'bomba', jugador: 'Dana', timestamp: '00:47' },
      { tipo: 'revelacion', rol: 'presidente', jugador: 'Eli', timestamp: '00:48' },
      { tipo: 'fin_juego', ganador: 'Equipo Rojo', timestamp: '00:49' },
    ],
    jugadores: [
      { nombre: 'Alex', role: 'jugador', team: 'rojo', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Blake', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Casey', role: 'jugador', team: 'rojo', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Dana', role: 'bomba', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Eli', role: 'presidente', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Finley', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Gray', role: 'jugador', team: 'rojo', habitacionFinal: 2, estado: 'vivo' },
      { nombre: 'Harper', role: 'jugador', team: 'azul', habitacionFinal: 1, estado: 'vivo' },
      { nombre: 'Ivy', role: 'jugador', team: 'azul', habitacionFinal: 2, estado: 'vivo' },
    ],
  },
];

export const getRoleName = (role) => {
  const roleNames = {
    presidente: 'Presidente',
    bomba: 'Bomba',
    jugador: 'Jugador',
    timido: 'Tímido',
    ingeniero: 'Ingeniero',
    espia: 'Espía',
    medico: 'Médico',
    kamikaze: 'Kamikaze',
    agente_doble: 'Agente Doble',
    cupido: 'Cupido',
    terrorista: 'Terrorista',
    victima: 'Víctima',
    gambler: 'Jugador (Gambler)',
    fool: 'Tonto',
  };
  return roleNames[role] || role;
};

export const getRoleDescription = (role, gameInfo = {}) => {
  const descriptions = {
    presidente: 'Eres el Presidente (Equipo Azul). Tu objetivo es sobrevivir. Al final de la última ronda, debes estar en una habitación DIFERENTE a la de la Bomba. ¡Confía en tu equipo para protegerte!',
    bomba: 'Eres la Bomba (Equipo Rojo). Tu objetivo es simple y destructivo: al final de la última ronda, debes estar en la MISMA habitación que el Presidente. ¡Usa el engaño para acercarte a tu objetivo!',
    jugador: gameInfo.team === 'rojo' 
      ? 'Eres un Jugador del Equipo Rojo. Trabaja con tus compañeros para identificar y acercar la Bomba al Presidente.'
      : 'Eres un Jugador del Equipo Azul. Trabaja con tus compañeros para proteger al Presidente y mantenerlo alejado de la Bomba.',
    timido: 'Eres el Tímido (Equipo Gris). No puedes revelar tu carta a nadie. Ganas si el equipo con el que estabas en la habitación inicial (Ronda 1) gana el juego.',
    ingeniero: 'Eres el Ingeniero (Equipo Azul). Durante la fase de revelación de líderes de cada ronda, el líder de tu habitación puede mostrarte la carta de un jugador de tu elección. Usa esta información para guiar a tu equipo.',
    espia: 'Eres el Espía (Equipo Gris). Eres un agente del caos. Ganas si el Equipo Rojo y el Equipo Azul no ganan (es decir, si otro rol con condición de victoria alternativa gana).',
    medico: 'Eres el Médico (Equipo Azul). Compartes una condición de victoria con el Presidente. Debes terminar en la misma habitación que él para que el Equipo Azul pueda ganar. Eres su guardaespaldas secreto.',
    kamikaze: 'Eres el Kamikaze (Equipo Rojo). Eres un miembro del Equipo Rojo con un objetivo personal. Ayuda a tu equipo, pero si el Equipo Rojo pierde, TÚ ganas en solitario si logras terminar en una habitación donde no estén ni el Presidente ni la Bomba.',
  };
  return descriptions[role] || 'Rol especial con habilidades únicas.';
};

export const CONFIG_RONDAS = {
  3: [1, 2, 3], // Rondas con número de rehenes a intercambiar
  4: [1, 2, 3, 4],
  5: [1, 2, 3, 4, 5],
};

export const TIEMPO_NEGOCIACION = {
  1: 180, // 3 minutos primera ronda
  2: 150, // 2.5 minutos segunda ronda
  3: 120, // 2 minutos tercera ronda
  4: 120,
  5: 120,
};

