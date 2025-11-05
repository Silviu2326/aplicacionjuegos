// Datos falsos para el módulo TheResistanceAvalon

const NOMBRES_JUGADORES = [
  'Arturo', 'Merlín', 'Ginebra', 'Lancelot', 'Galahad', 'Percival', 'Morgana', 'Mordred',
  'Tristán', 'Isolda', 'Gawain', 'Bedivere', 'Ector', 'Kay', 'Elaine', 'Viviana'
];

const ROLES_LEALES = ['merlin', 'perceval', 'loyal_servant'];
const ROLES_ESBIRROS = ['assassin', 'morgana', 'mordred', 'oberon', 'minion'];

const generarJugador = (nombre, role, team, index) => ({
  id: `jugador_${index}_${Date.now()}`,
  name: nombre,
  role: role,
  team: team, // 'loyal' o 'spy'
  isAlive: true,
});

export const generarPartidaAleatoria = (numJugadores = null) => {
  const num = numJugadores || Math.floor(Math.random() * 6) + 5; // 5-10 jugadores
  
  // Calcular número de esbirros según reglas
  let numSpies;
  if (num <= 5) numSpies = 2;
  else if (num <= 6) numSpies = 2;
  else if (num <= 7) numSpies = 3;
  else if (num <= 9) numSpies = 3;
  else numSpies = 4;

  // Mezclar nombres disponibles
  const nombresDisponibles = [...NOMBRES_JUGADORES].sort(() => Math.random() - 0.5);
  const jugadoresNombres = nombresDisponibles.slice(0, num);

  // Asignar roles
  const roles = [];
  const rolesSpies = ['assassin', 'morgana', 'mordred', 'minion'];
  const rolesLoyals = ['merlin', 'perceval', 'loyal_servant'];
  
  // Asignar esbirros
  for (let i = 0; i < numSpies; i++) {
    if (i === 0) roles.push('assassin');
    else if (i === 1 && num >= 7) roles.push('morgana');
    else if (i === 2 && num >= 9) roles.push('mordred');
    else roles.push('minion');
  }
  
  // Asignar leales
  for (let i = numSpies; i < num; i++) {
    if (i === numSpies && num >= 5) roles.push('merlin');
    else if (i === numSpies + 1 && num >= 7) roles.push('perceval');
    else roles.push('loyal_servant');
  }
  
  // Mezclar roles
  const rolesMezclados = roles.sort(() => Math.random() - 0.5);

  // Crear jugadores
  const jugadores = jugadoresNombres.map((nombre, index) => {
    const role = rolesMezclados[index];
    const team = ROLES_ESBIRROS.includes(role) ? 'spy' : 'loyal';
    return generarJugador(nombre, role, team, index);
  });

  return {
    id: `partida_${Date.now()}`,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    jugadores,
    numJugadores: num,
    numSpies,
    numLoyals: num - numSpies,
    estado: 'en_curso',
  };
};

// Historial de partidas falsas
export const PARTIDAS_AVALON_FAKE = [
  {
    id: 1,
    fecha: '2024-11-20',
    hora: '21:15',
    duracion: '52:30',
    numJugadores: 7,
    ganador: 'Leales',
    numSpies: 3,
    misionesExitosas: 3,
    misionesFallidas: 2,
    votosRechazados: 4,
    eventos: [
      { tipo: 'team_proposal', lider: 'Arturo', equipo: ['Merlín', 'Ginebra', 'Lancelot'], timestamp: '00:05' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:08' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:12' },
      { tipo: 'team_proposal', lider: 'Merlín', equipo: ['Galahad', 'Percival', 'Morgana'], timestamp: '00:18' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:20' },
      { tipo: 'team_proposal', lider: 'Ginebra', equipo: ['Lancelot', 'Galahad', 'Mordred'], timestamp: '00:25' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:28' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:32' },
      { tipo: 'team_proposal', lider: 'Lancelot', equipo: ['Merlín', 'Percival', 'Tristán'], timestamp: '00:38' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:41' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:45' },
      { tipo: 'assassination', objetivo: 'Merlín', acertado: false, timestamp: '00:50' },
    ],
    jugadores: [
      { nombre: 'Arturo', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Merlín', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Ginebra', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Lancelot', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Morgana', role: 'morgana', team: 'spy', estado: 'vivo' },
      { nombre: 'Mordred', role: 'mordred', team: 'spy', estado: 'vivo' },
      { nombre: 'Assassin', role: 'assassin', team: 'spy', estado: 'vivo' },
    ],
  },
  {
    id: 2,
    fecha: '2024-11-19',
    hora: '19:45',
    duracion: '48:12',
    numJugadores: 6,
    ganador: 'Esbirros',
    numSpies: 2,
    misionesExitosas: 2,
    misionesFallidas: 3,
    votosRechazados: 3,
    eventos: [
      { tipo: 'team_proposal', lider: 'Galahad', equipo: ['Percival', 'Tristán'], timestamp: '00:04' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:07' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:10' },
      { tipo: 'team_proposal', lider: 'Percival', equipo: ['Isolda', 'Gawain', 'Bedivere'], timestamp: '00:15' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:18' },
      { tipo: 'team_proposal', lider: 'Tristán', equipo: ['Galahad', 'Isolda'], timestamp: '00:22' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:25' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 1, fracaso: 1 }, timestamp: '00:28' },
      { tipo: 'team_proposal', lider: 'Isolda', equipo: ['Percival', 'Gawain'], timestamp: '00:33' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:36' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:40' },
      { tipo: 'team_proposal', lider: 'Gawain', equipo: ['Bedivere', 'Ector', 'Kay'], timestamp: '00:45' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:48' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:52' },
    ],
    jugadores: [
      { nombre: 'Galahad', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Percival', role: 'perceval', team: 'loyal', estado: 'vivo' },
      { nombre: 'Tristán', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Isolda', role: 'minion', team: 'spy', estado: 'vivo' },
      { nombre: 'Gawain', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Bedivere', role: 'merlin', team: 'loyal', estado: 'vivo' },
    ],
  },
  {
    id: 3,
    fecha: '2024-11-18',
    hora: '20:30',
    duracion: '45:20',
    numJugadores: 5,
    ganador: 'Leales',
    numSpies: 2,
    misionesExitosas: 3,
    misionesFallidas: 0,
    votosRechazados: 2,
    eventos: [
      { tipo: 'team_proposal', lider: 'Ector', equipo: ['Kay', 'Elaine'], timestamp: '00:03' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:06' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:09' },
      { tipo: 'team_proposal', lider: 'Kay', equipo: ['Ector', 'Viviana', 'Arturo'], timestamp: '00:14' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:17' },
      { tipo: 'team_proposal', lider: 'Elaine', equipo: ['Kay', 'Viviana'], timestamp: '00:21' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:24' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:27' },
      { tipo: 'team_proposal', lider: 'Viviana', equipo: ['Ector', 'Arturo', 'Kay'], timestamp: '00:32' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:35' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:38' },
      { tipo: 'assassination', objetivo: 'Viviana', acertado: false, timestamp: '00:42' },
    ],
    jugadores: [
      { nombre: 'Ector', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Kay', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Elaine', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Viviana', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Arturo', role: 'minion', team: 'spy', estado: 'vivo' },
    ],
  },
  {
    id: 4,
    fecha: '2024-11-17',
    hora: '22:00',
    duracion: '55:45',
    numJugadores: 8,
    ganador: 'Esbirros',
    numSpies: 3,
    misionesExitosas: 1,
    misionesFallidas: 3,
    votosRechazados: 6,
    eventos: [
      { tipo: 'team_proposal', lider: 'Merlín', equipo: ['Ginebra', 'Lancelot', 'Galahad'], timestamp: '00:06' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:09' },
      { tipo: 'team_proposal', lider: 'Ginebra', equipo: ['Percival', 'Morgana', 'Mordred'], timestamp: '00:13' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:16' },
      { tipo: 'team_proposal', lider: 'Lancelot', equipo: ['Tristán', 'Isolda', 'Gawain'], timestamp: '00:20' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:23' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:27' },
      { tipo: 'team_proposal', lider: 'Galahad', equipo: ['Bedivere', 'Ector', 'Kay'], timestamp: '00:32' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:35' },
      { tipo: 'team_proposal', lider: 'Percival', equipo: ['Elaine', 'Viviana', 'Arturo'], timestamp: '00:39' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:42' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:46' },
      { tipo: 'team_proposal', lider: 'Morgana', equipo: ['Mordred', 'Assassin', 'Tristán'], timestamp: '00:51' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:54' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:58' },
      { tipo: 'team_proposal', lider: 'Mordred', equipo: ['Isolda', 'Gawain', 'Bedivere', 'Ector'], timestamp: '01:03' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '01:06' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 3, fracaso: 1 }, timestamp: '01:10' },
    ],
    jugadores: [
      { nombre: 'Merlín', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Ginebra', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Lancelot', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Galahad', role: 'perceval', team: 'loyal', estado: 'vivo' },
      { nombre: 'Percival', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Morgana', role: 'morgana', team: 'spy', estado: 'vivo' },
      { nombre: 'Mordred', role: 'mordred', team: 'spy', estado: 'vivo' },
      { nombre: 'Assassin', role: 'assassin', team: 'spy', estado: 'vivo' },
    ],
  },
  {
    id: 5,
    fecha: '2024-11-16',
    hora: '18:20',
    duracion: '41:33',
    numJugadores: 6,
    ganador: 'Leales',
    numSpies: 2,
    misionesExitosas: 3,
    misionesFallidas: 1,
    votosRechazados: 1,
    eventos: [
      { tipo: 'team_proposal', lider: 'Tristán', equipo: ['Isolda', 'Gawain'], timestamp: '00:04' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:07' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:10' },
      { tipo: 'team_proposal', lider: 'Isolda', equipo: ['Gawain', 'Bedivere', 'Ector'], timestamp: '00:15' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:18' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:22' },
      { tipo: 'team_proposal', lider: 'Gawain', equipo: ['Tristán', 'Kay'], timestamp: '00:27' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:30' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:33' },
      { tipo: 'team_proposal', lider: 'Bedivere', equipo: ['Ector', 'Elaine', 'Viviana'], timestamp: '00:38' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:41' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:45' },
      { tipo: 'assassination', objetivo: 'Bedivere', acertado: false, timestamp: '00:48' },
    ],
    jugadores: [
      { nombre: 'Tristán', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Isolda', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Gawain', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Bedivere', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Ector', role: 'minion', team: 'spy', estado: 'vivo' },
      { nombre: 'Kay', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
    ],
  },
  {
    id: 6,
    fecha: '2024-11-15',
    hora: '21:00',
    duracion: '49:18',
    numJugadores: 7,
    ganador: 'Esbirros',
    numSpies: 3,
    misionesExitosas: 2,
    misionesFallidas: 3,
    votosRechazados: 5,
    eventos: [
      { tipo: 'team_proposal', lider: 'Elaine', equipo: ['Viviana', 'Arturo', 'Merlín'], timestamp: '00:05' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:08' },
      { tipo: 'team_proposal', lider: 'Viviana', equipo: ['Arturo', 'Ginebra'], timestamp: '00:12' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:15' },
      { tipo: 'team_proposal', lider: 'Arturo', equipo: ['Lancelot', 'Galahad', 'Percival'], timestamp: '00:19' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:22' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:26' },
      { tipo: 'team_proposal', lider: 'Merlín', equipo: ['Ginebra', 'Lancelot'], timestamp: '00:31' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:34' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:38' },
      { tipo: 'team_proposal', lider: 'Ginebra', equipo: ['Morgana', 'Mordred', 'Assassin'], timestamp: '00:43' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:46' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:50' },
      { tipo: 'team_proposal', lider: 'Lancelot', equipo: ['Percival', 'Tristán', 'Isolda'], timestamp: '00:55' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:58' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '01:02' },
      { tipo: 'team_proposal', lider: 'Galahad', equipo: ['Gawain', 'Bedivere', 'Ector', 'Kay'], timestamp: '01:07' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '01:10' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 3, fracaso: 1 }, timestamp: '01:14' },
    ],
    jugadores: [
      { nombre: 'Elaine', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Viviana', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Arturo', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Merlín', role: 'morgana', team: 'spy', estado: 'vivo' },
      { nombre: 'Ginebra', role: 'mordred', team: 'spy', estado: 'vivo' },
      { nombre: 'Lancelot', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Galahad', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
    ],
  },
  {
    id: 7,
    fecha: '2024-11-14',
    hora: '20:15',
    duracion: '43:50',
    numJugadores: 5,
    ganador: 'Leales',
    numSpies: 2,
    misionesExitosas: 3,
    misionesFallidas: 0,
    votosRechazados: 3,
    eventos: [
      { tipo: 'team_proposal', lider: 'Percival', equipo: ['Tristán', 'Isolda'], timestamp: '00:03' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:06' },
      { tipo: 'team_proposal', lider: 'Tristán', equipo: ['Isolda', 'Gawain'], timestamp: '00:10' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:13' },
      { tipo: 'team_proposal', lider: 'Isolda', equipo: ['Gawain', 'Bedivere'], timestamp: '00:17' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:20' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:23' },
      { tipo: 'team_proposal', lider: 'Gawain', equipo: ['Bedivere', 'Ector', 'Kay'], timestamp: '00:28' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:31' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:35' },
      { tipo: 'team_proposal', lider: 'Bedivere', equipo: ['Ector', 'Elaine'], timestamp: '00:40' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:43' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:47' },
      { tipo: 'assassination', objetivo: 'Percival', acertado: false, timestamp: '00:50' },
    ],
    jugadores: [
      { nombre: 'Percival', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Tristán', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Isolda', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Gawain', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Bedivere', role: 'minion', team: 'spy', estado: 'vivo' },
    ],
  },
  {
    id: 8,
    fecha: '2024-11-13',
    hora: '19:30',
    duracion: '51:22',
    numJugadores: 8,
    ganador: 'Leales',
    numSpies: 3,
    misionesExitosas: 3,
    misionesFallidas: 2,
    votosRechazados: 4,
    eventos: [
      { tipo: 'team_proposal', lider: 'Ector', equipo: ['Kay', 'Elaine', 'Viviana'], timestamp: '00:06' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:09' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:13' },
      { tipo: 'team_proposal', lider: 'Kay', equipo: ['Arturo', 'Merlín', 'Ginebra'], timestamp: '00:18' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:21' },
      { tipo: 'team_proposal', lider: 'Elaine', equipo: ['Lancelot', 'Galahad', 'Percival'], timestamp: '00:25' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:28' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:32' },
      { tipo: 'team_proposal', lider: 'Viviana', equipo: ['Morgana', 'Mordred', 'Assassin'], timestamp: '00:37' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:40' },
      { tipo: 'team_proposal', lider: 'Arturo', equipo: ['Tristán', 'Isolda', 'Gawain'], timestamp: '00:44' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:47' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:51' },
      { tipo: 'team_proposal', lider: 'Merlín', equipo: ['Bedivere', 'Ector', 'Kay', 'Elaine'], timestamp: '00:56' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:59' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 4, fracaso: 0 }, timestamp: '01:03' },
      { tipo: 'team_proposal', lider: 'Ginebra', equipo: ['Lancelot', 'Galahad', 'Percival', 'Viviana'], timestamp: '01:08' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '01:11' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 4, fracaso: 0 }, timestamp: '01:15' },
      { tipo: 'assassination', objetivo: 'Ginebra', acertado: false, timestamp: '01:19' },
    ],
    jugadores: [
      { nombre: 'Ector', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Kay', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Elaine', role: 'perceval', team: 'loyal', estado: 'vivo' },
      { nombre: 'Viviana', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Arturo', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Merlín', role: 'morgana', team: 'spy', estado: 'vivo' },
      { nombre: 'Ginebra', role: 'mordred', team: 'spy', estado: 'vivo' },
      { nombre: 'Lancelot', role: 'assassin', team: 'spy', estado: 'vivo' },
    ],
  },
  {
    id: 9,
    fecha: '2024-11-12',
    hora: '22:30',
    duracion: '46:55',
    numJugadores: 6,
    ganador: 'Esbirros',
    numSpies: 2,
    misionesExitosas: 2,
    misionesFallidas: 3,
    votosRechazados: 2,
    eventos: [
      { tipo: 'team_proposal', lider: 'Galahad', equipo: ['Percival', 'Tristán'], timestamp: '00:04' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:07' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:10' },
      { tipo: 'team_proposal', lider: 'Percival', equipo: ['Isolda', 'Gawain', 'Bedivere'], timestamp: '00:15' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:18' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:22' },
      { tipo: 'team_proposal', lider: 'Tristán', equipo: ['Gawain', 'Bedivere'], timestamp: '00:27' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:30' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:33' },
      { tipo: 'team_proposal', lider: 'Isolda', equipo: ['Ector', 'Kay', 'Elaine'], timestamp: '00:38' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:41' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 2, fracaso: 1 }, timestamp: '00:45' },
      { tipo: 'team_proposal', lider: 'Gawain', equipo: ['Bedivere', 'Viviana', 'Arturo'], timestamp: '00:50' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:53' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 3, fracaso: 1 }, timestamp: '00:57' },
    ],
    jugadores: [
      { nombre: 'Galahad', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Percival', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Tristán', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Isolda', role: 'minion', team: 'spy', estado: 'vivo' },
      { nombre: 'Gawain', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Bedivere', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
    ],
  },
  {
    id: 10,
    fecha: '2024-11-11',
    hora: '21:45',
    duracion: '44:18',
    numJugadores: 7,
    ganador: 'Leales',
    numSpies: 3,
    misionesExitosas: 3,
    misionesFallidas: 1,
    votosRechazados: 3,
    eventos: [
      { tipo: 'team_proposal', lider: 'Bedivere', equipo: ['Ector', 'Kay', 'Elaine'], timestamp: '00:05' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:08' },
      { tipo: 'team_proposal', lider: 'Ector', equipo: ['Kay', 'Viviana'], timestamp: '00:12' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:15' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 2, fracaso: 0 }, timestamp: '00:18' },
      { tipo: 'team_proposal', lider: 'Kay', equipo: ['Arturo', 'Merlín', 'Ginebra'], timestamp: '00:23' },
      { tipo: 'vote', resultado: 'rechazado', timestamp: '00:26' },
      { tipo: 'team_proposal', lider: 'Elaine', equipo: ['Lancelot', 'Galahad'], timestamp: '00:30' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:33' },
      { tipo: 'mission', resultado: 'fracaso', votos: { exito: 1, fracaso: 1 }, timestamp: '00:36' },
      { tipo: 'team_proposal', lider: 'Viviana', equipo: ['Percival', 'Tristán', 'Isolda'], timestamp: '00:41' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:44' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 3, fracaso: 0 }, timestamp: '00:48' },
      { tipo: 'team_proposal', lider: 'Arturo', equipo: ['Gawain', 'Bedivere', 'Ector', 'Kay'], timestamp: '00:53' },
      { tipo: 'vote', resultado: 'aprobado', timestamp: '00:56' },
      { tipo: 'mission', resultado: 'exito', votos: { exito: 4, fracaso: 0 }, timestamp: '01:00' },
      { tipo: 'assassination', objetivo: 'Bedivere', acertado: false, timestamp: '01:04' },
    ],
    jugadores: [
      { nombre: 'Bedivere', role: 'merlin', team: 'loyal', estado: 'vivo' },
      { nombre: 'Ector', role: 'perceval', team: 'loyal', estado: 'vivo' },
      { nombre: 'Kay', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
      { nombre: 'Elaine', role: 'morgana', team: 'spy', estado: 'vivo' },
      { nombre: 'Viviana', role: 'mordred', team: 'spy', estado: 'vivo' },
      { nombre: 'Arturo', role: 'assassin', team: 'spy', estado: 'vivo' },
      { nombre: 'Merlín', role: 'loyal_servant', team: 'loyal', estado: 'vivo' },
    ],
  },
];

