// Datos falsos para el módulo Salem1692

const NOMBRES_JUGADORES = [
  'Ana', 'Carlos', 'María', 'Pedro', 'Laura', 'Juan', 'Sofía', 'Diego',
  'Elena', 'Miguel', 'Carmen', 'Luis', 'Isabel', 'Roberto', 'Patricia', 'Fernando'
];

const generarJugador = (nombre, role, index) => ({
  id: `jugador_${index}_${Date.now()}`,
  name: nombre,
  role: role,
  isAlive: true,
  hand: [],
  trialCards: [
    { id: role === 'witch' ? 'trial_witch' : 'trial_not_witch', name: role === 'witch' ? 'Bruja' : 'No es Bruja' },
    { id: 'trial_not_witch', name: 'No es Bruja' },
    { id: 'trial_not_witch', name: 'No es Bruja' },
  ],
  hasConspiracy: false,
  accusations: [],
});

export const generarPartidaAleatoria = () => {
  const numJugadores = Math.floor(Math.random() * 6) + 5; // 5-10 jugadores
  
  // Calcular número de brujas según reglas
  let numWitches;
  if (numJugadores <= 5) numWitches = 1;
  else if (numJugadores <= 7) numWitches = 2;
  else if (numJugadores <= 9) numWitches = 3;
  else numWitches = 4;

  // Mezclar nombres disponibles
  const nombresDisponibles = [...NOMBRES_JUGADORES].sort(() => Math.random() - 0.5);
  const jugadoresNombres = nombresDisponibles.slice(0, numJugadores);

  // Asignar roles
  const roles = [];
  for (let i = 0; i < numWitches; i++) {
    roles.push('witch');
  }
  for (let i = numWitches; i < numJugadores; i++) {
    roles.push('villager');
  }
  
  // Mezclar roles
  const rolesMezclados = roles.sort(() => Math.random() - 0.5);

  // Crear jugadores
  const jugadores = jugadoresNombres.map((nombre, index) => 
    generarJugador(nombre, rolesMezclados[index], index)
  );

  return {
    id: `partida_${Date.now()}`,
    fecha: new Date().toISOString().split('T')[0],
    hora: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }),
    jugadores,
    numJugadores,
    numWitches,
    numVillagers: numJugadores - numWitches,
    estado: 'en_curso',
  };
};

// Historial de partidas falsas
export const PARTIDAS_SALEM_FAKE = [
  {
    id: 1,
    fecha: '2024-11-15',
    hora: '20:30',
    duracion: '45:23',
    numJugadores: 7,
    ganador: 'Aldeanos',
    brujasIniciales: 2,
    jugadoresEliminados: 2,
    eventos: [
      { tipo: 'accusation', jugador: 'Carlos', objetivo: 'Ana', timestamp: '00:05' },
      { tipo: 'accusation', jugador: 'María', objetivo: 'Ana', timestamp: '00:08' },
      { tipo: 'trial', acusado: 'Ana', resultado: 'absuelto', timestamp: '00:12' },
      { tipo: 'accusation', jugador: 'Pedro', objetivo: 'Laura', timestamp: '00:18' },
      { tipo: 'trial', acusado: 'Laura', resultado: 'condenado', timestamp: '00:25' },
      { tipo: 'accusation', jugador: 'Juan', objetivo: 'Sofía', timestamp: '00:30' },
      { tipo: 'trial', acusado: 'Sofía', resultado: 'condenado', timestamp: '00:38' },
    ],
    jugadores: [
      { nombre: 'Ana', role: 'villager', estado: 'vivo' },
      { nombre: 'Carlos', role: 'villager', estado: 'vivo' },
      { nombre: 'María', role: 'witch', estado: 'eliminado' },
      { nombre: 'Pedro', role: 'villager', estado: 'vivo' },
      { nombre: 'Laura', role: 'witch', estado: 'eliminado' },
      { nombre: 'Juan', role: 'villager', estado: 'vivo' },
      { nombre: 'Sofía', role: 'villager', estado: 'vivo' },
    ],
  },
  {
    id: 2,
    fecha: '2024-11-14',
    hora: '19:15',
    duracion: '38:45',
    numJugadores: 6,
    ganador: 'Brujas',
    brujasIniciales: 2,
    jugadoresEliminados: 4,
    eventos: [
      { tipo: 'accusation', jugador: 'Elena', objetivo: 'Miguel', timestamp: '00:04' },
      { tipo: 'accusation', jugador: 'Carmen', objetivo: 'Miguel', timestamp: '00:07' },
      { tipo: 'trial', acusado: 'Miguel', resultado: 'absuelto', timestamp: '00:11' },
      { tipo: 'accusation', jugador: 'Luis', objetivo: 'Isabel', timestamp: '00:16' },
      { tipo: 'trial', acusado: 'Isabel', resultado: 'condenado', timestamp: '00:22' },
      { tipo: 'accusation', jugador: 'Roberto', objetivo: 'Patricia', timestamp: '00:28' },
      { tipo: 'trial', acusado: 'Patricia', resultado: 'condenado', timestamp: '00:35' },
    ],
    jugadores: [
      { nombre: 'Elena', role: 'villager', estado: 'eliminado' },
      { nombre: 'Miguel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Carmen', role: 'witch', estado: 'vivo' },
      { nombre: 'Luis', role: 'villager', estado: 'eliminado' },
      { nombre: 'Isabel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Roberto', role: 'villager', estado: 'vivo' },
      { nombre: 'Patricia', role: 'witch', estado: 'vivo' },
    ],
  },
  {
    id: 3,
    fecha: '2024-11-13',
    hora: '21:00',
    duracion: '52:10',
    numJugadores: 8,
    ganador: 'Aldeanos',
    brujasIniciales: 3,
    jugadoresEliminados: 3,
    eventos: [
      { tipo: 'accusation', jugador: 'Ana', objetivo: 'Diego', timestamp: '00:06' },
      { tipo: 'accusation', jugador: 'Carlos', objetivo: 'Diego', timestamp: '00:09' },
      { tipo: 'trial', acusado: 'Diego', resultado: 'condenado', timestamp: '00:15' },
      { tipo: 'accusation', jugador: 'María', objetivo: 'Pedro', timestamp: '00:20' },
      { tipo: 'trial', acusado: 'Pedro', resultado: 'absuelto', timestamp: '00:26' },
      { tipo: 'accusation', jugador: 'Laura', objetivo: 'Juan', timestamp: '00:32' },
      { tipo: 'trial', acusado: 'Juan', resultado: 'condenado', timestamp: '00:40' },
      { tipo: 'accusation', jugador: 'Sofía', objetivo: 'Elena', timestamp: '00:45' },
      { tipo: 'trial', acusado: 'Elena', resultado: 'condenado', timestamp: '00:50' },
    ],
    jugadores: [
      { nombre: 'Ana', role: 'villager', estado: 'vivo' },
      { nombre: 'Carlos', role: 'villager', estado: 'vivo' },
      { nombre: 'María', role: 'villager', estado: 'vivo' },
      { nombre: 'Diego', role: 'witch', estado: 'eliminado' },
      { nombre: 'Pedro', role: 'villager', estado: 'vivo' },
      { nombre: 'Laura', role: 'villager', estado: 'vivo' },
      { nombre: 'Juan', role: 'witch', estado: 'eliminado' },
      { nombre: 'Sofía', role: 'villager', estado: 'vivo' },
      { nombre: 'Elena', role: 'witch', estado: 'eliminado' },
    ],
  },
  {
    id: 4,
    fecha: '2024-11-12',
    hora: '18:45',
    duracion: '41:30',
    numJugadores: 5,
    ganador: 'Brujas',
    brujasIniciales: 1,
    jugadoresEliminados: 4,
    eventos: [
      { tipo: 'accusation', jugador: 'Miguel', objetivo: 'Carmen', timestamp: '00:05' },
      { tipo: 'trial', acusado: 'Carmen', resultado: 'absuelto', timestamp: '00:10' },
      { tipo: 'accusation', jugador: 'Luis', objetivo: 'Isabel', timestamp: '00:15' },
      { tipo: 'trial', acusado: 'Isabel', resultado: 'condenado', timestamp: '00:22' },
      { tipo: 'accusation', jugador: 'Roberto', objetivo: 'Patricia', timestamp: '00:28' },
      { tipo: 'trial', acusado: 'Patricia', resultado: 'condenado', timestamp: '00:35' },
    ],
    jugadores: [
      { nombre: 'Miguel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Carmen', role: 'witch', estado: 'vivo' },
      { nombre: 'Luis', role: 'villager', estado: 'eliminado' },
      { nombre: 'Isabel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Roberto', role: 'villager', estado: 'eliminado' },
      { nombre: 'Patricia', role: 'villager', estado: 'eliminado' },
    ],
  },
  {
    id: 5,
    fecha: '2024-11-11',
    hora: '22:20',
    duracion: '55:15',
    numJugadores: 9,
    ganador: 'Aldeanos',
    brujasIniciales: 3,
    jugadoresEliminados: 3,
    eventos: [
      { tipo: 'accusation', jugador: 'Ana', objetivo: 'Carlos', timestamp: '00:07' },
      { tipo: 'accusation', jugador: 'María', objetivo: 'Carlos', timestamp: '00:10' },
      { tipo: 'trial', acusado: 'Carlos', resultado: 'condenado', timestamp: '00:18' },
      { tipo: 'accusation', jugador: 'Pedro', objetivo: 'Laura', timestamp: '00:24' },
      { tipo: 'trial', acusado: 'Laura', resultado: 'absuelto', timestamp: '00:31' },
      { tipo: 'accusation', jugador: 'Juan', objetivo: 'Sofía', timestamp: '00:38' },
      { tipo: 'trial', acusado: 'Sofía', resultado: 'condenado', timestamp: '00:45' },
      { tipo: 'accusation', jugador: 'Diego', objetivo: 'Elena', timestamp: '00:50' },
      { tipo: 'trial', acusado: 'Elena', resultado: 'condenado', timestamp: '00:55' },
    ],
    jugadores: [
      { nombre: 'Ana', role: 'villager', estado: 'vivo' },
      { nombre: 'Carlos', role: 'witch', estado: 'eliminado' },
      { nombre: 'María', role: 'villager', estado: 'vivo' },
      { nombre: 'Pedro', role: 'villager', estado: 'vivo' },
      { nombre: 'Laura', role: 'villager', estado: 'vivo' },
      { nombre: 'Juan', role: 'villager', estado: 'vivo' },
      { nombre: 'Sofía', role: 'witch', estado: 'eliminado' },
      { nombre: 'Diego', role: 'villager', estado: 'vivo' },
      { nombre: 'Elena', role: 'witch', estado: 'eliminado' },
    ],
  },
  {
    id: 6,
    fecha: '2024-11-10',
    hora: '17:30',
    duracion: '33:45',
    numJugadores: 6,
    ganador: 'Brujas',
    brujasIniciales: 2,
    jugadoresEliminados: 4,
    eventos: [
      { tipo: 'accusation', jugador: 'Miguel', objetivo: 'Carmen', timestamp: '00:04' },
      { tipo: 'trial', acusado: 'Carmen', resultado: 'absuelto', timestamp: '00:09' },
      { tipo: 'accusation', jugador: 'Luis', objetivo: 'Isabel', timestamp: '00:14' },
      { tipo: 'trial', acusado: 'Isabel', resultado: 'condenado', timestamp: '00:20' },
      { tipo: 'accusation', jugador: 'Roberto', objetivo: 'Patricia', timestamp: '00:26' },
      { tipo: 'trial', acusado: 'Patricia', resultado: 'condenado', timestamp: '00:32' },
    ],
    jugadores: [
      { nombre: 'Miguel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Carmen', role: 'witch', estado: 'vivo' },
      { nombre: 'Luis', role: 'villager', estado: 'eliminado' },
      { nombre: 'Isabel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Roberto', role: 'villager', estado: 'eliminado' },
      { nombre: 'Patricia', role: 'witch', estado: 'vivo' },
    ],
  },
  {
    id: 7,
    fecha: '2024-11-09',
    hora: '19:50',
    duracion: '48:20',
    numJugadores: 7,
    ganador: 'Aldeanos',
    brujasIniciales: 2,
    jugadoresEliminados: 2,
    eventos: [
      { tipo: 'accusation', jugador: 'Ana', objetivo: 'Carlos', timestamp: '00:06' },
      { tipo: 'accusation', jugador: 'María', objetivo: 'Carlos', timestamp: '00:09' },
      { tipo: 'trial', acusado: 'Carlos', resultado: 'condenado', timestamp: '00:15' },
      { tipo: 'accusation', jugador: 'Pedro', objetivo: 'Laura', timestamp: '00:22' },
      { tipo: 'trial', acusado: 'Laura', resultado: 'condenado', timestamp: '00:30' },
      { tipo: 'accusation', jugador: 'Juan', objetivo: 'Sofía', timestamp: '00:36' },
      { tipo: 'trial', acusado: 'Sofía', resultado: 'absuelto', timestamp: '00:42' },
    ],
    jugadores: [
      { nombre: 'Ana', role: 'villager', estado: 'vivo' },
      { nombre: 'Carlos', role: 'witch', estado: 'eliminado' },
      { nombre: 'María', role: 'villager', estado: 'vivo' },
      { nombre: 'Pedro', role: 'villager', estado: 'vivo' },
      { nombre: 'Laura', role: 'witch', estado: 'eliminado' },
      { nombre: 'Juan', role: 'villager', estado: 'vivo' },
      { nombre: 'Sofía', role: 'villager', estado: 'vivo' },
    ],
  },
  {
    id: 8,
    fecha: '2024-11-08',
    hora: '16:15',
    duracion: '39:55',
    numJugadores: 8,
    ganador: 'Brujas',
    brujasIniciales: 3,
    jugadoresEliminados: 5,
    eventos: [
      { tipo: 'accusation', jugador: 'Diego', objetivo: 'Elena', timestamp: '00:05' },
      { tipo: 'trial', acusado: 'Elena', resultado: 'absuelto', timestamp: '00:11' },
      { tipo: 'accusation', jugador: 'Miguel', objetivo: 'Carmen', timestamp: '00:17' },
      { tipo: 'trial', acusado: 'Carmen', resultado: 'condenado', timestamp: '00:24' },
      { tipo: 'accusation', jugador: 'Luis', objetivo: 'Isabel', timestamp: '00:30' },
      { tipo: 'trial', acusado: 'Isabel', resultado: 'condenado', timestamp: '00:37' },
    ],
    jugadores: [
      { nombre: 'Diego', role: 'villager', estado: 'eliminado' },
      { nombre: 'Elena', role: 'witch', estado: 'vivo' },
      { nombre: 'Miguel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Carmen', role: 'villager', estado: 'eliminado' },
      { nombre: 'Luis', role: 'villager', estado: 'eliminado' },
      { nombre: 'Isabel', role: 'villager', estado: 'eliminado' },
      { nombre: 'Roberto', role: 'villager', estado: 'vivo' },
      { nombre: 'Patricia', role: 'witch', estado: 'vivo' },
    ],
  },
];

