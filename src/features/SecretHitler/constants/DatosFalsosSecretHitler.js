// Datos falsos para el historial de partidas de Secret Hitler

const nombresJugadores = [
  'Alejandro', 'María', 'Carlos', 'Laura', 'David', 'Ana', 'Pablo', 'Sofía',
  'Javier', 'Elena', 'Miguel', 'Carmen', 'Diego', 'Patricia', 'Roberto', 'Isabel',
  'Fernando', 'Lucía', 'Manuel', 'Andrea', 'José', 'Marta', 'Antonio', 'Natalia',
  'Luis', 'Cristina', 'Juan', 'Beatriz', 'Pedro', 'Raquel'
];

const generarJugadoresAleatorios = (cantidad) => {
  const jugadores = [];
  const nombresUsados = new Set();
  
  while (jugadores.length < cantidad) {
    const nombre = nombresJugadores[Math.floor(Math.random() * nombresJugadores.length)];
    if (!nombresUsados.has(nombre)) {
      nombresUsados.add(nombre);
      jugadores.push({
        id: `player_${jugadores.length + 1}`,
        nombre: nombre,
        rol: null, // Se asignará después
      });
    }
  }
  
  return jugadores;
};

const rolesDistribucion = {
  5: { liberales: 3, fascistas: 1, hitler: 1 },
  6: { liberales: 4, fascistas: 1, hitler: 1 },
  7: { liberales: 4, fascistas: 2, hitler: 1 },
  8: { liberales: 5, fascistas: 2, hitler: 1 },
  9: { liberales: 5, fascistas: 3, hitler: 1 },
  10: { liberales: 6, fascistas: 3, hitler: 1 },
};

const asignarRoles = (jugadores) => {
  const cantidad = jugadores.length;
  const distribucion = rolesDistribucion[cantidad];
  const roles = [];
  
  // Agregar liberales
  for (let i = 0; i < distribucion.liberales; i++) {
    roles.push('Liberal');
  }
  
  // Agregar fascistas
  for (let i = 0; i < distribucion.fascistas; i++) {
    roles.push('Fascista');
  }
  
  // Agregar Hitler
  roles.push('Hitler');
  
  // Mezclar roles
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [roles[i], roles[j]] = [roles[j], roles[i]];
  }
  
  // Asignar roles a jugadores
  jugadores.forEach((jugador, index) => {
    jugador.rol = roles[index];
  });
  
  return jugadores;
};

const eventosPosibles = [
  'Política Liberal promulgada',
  'Política Fascista promulgada',
  'Elección de gobierno aprobada',
  'Elección de gobierno rechazada',
  'Investigación realizada',
  'Elección especial convocada',
  'Vista previa de políticas',
  'Ejecución realizada',
  'Veto solicitado',
  'Veto rechazado',
  'Hitler elegido Canciller',
];

const generarEventos = (duracionMinutos) => {
  const cantidadEventos = Math.floor(duracionMinutos / 2) + Math.floor(Math.random() * 5);
  const eventos = [];
  
  for (let i = 0; i < cantidadEventos; i++) {
    eventos.push({
      timestamp: new Date(Date.now() - Math.random() * duracionMinutos * 60000).toISOString(),
      tipo: eventosPosibles[Math.floor(Math.random() * eventosPosibles.length)],
      jugador: nombresJugadores[Math.floor(Math.random() * nombresJugadores.length)],
      descripcion: `${eventosPosibles[Math.floor(Math.random() * eventosPosibles.length)]} por ${nombresJugadores[Math.floor(Math.random() * nombresJugadores.length)]}`,
    });
  }
  
  return eventos.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
};

const generarPartida = (id, fecha, numJugadores) => {
  const jugadores = generarJugadoresAleatorios(numJugadores);
  asignarRoles(jugadores);
  
  const hitler = jugadores.find(j => j.rol === 'Hitler');
  const fascistas = jugadores.filter(j => j.rol === 'Fascista' || j.rol === 'Hitler');
  const liberales = jugadores.filter(j => j.rol === 'Liberal');
  
  // Determinar ganador
  const ganaLiberales = Math.random() > 0.4;
  const políticasLiberales = ganaLiberales ? 5 : Math.floor(Math.random() * 5);
  const políticasFascistas = ganaLiberales ? Math.floor(Math.random() * 6) : 6;
  const hitlerElegido = !ganaLiberales && Math.random() > 0.5;
  const hitlerEjecutado = ganaLiberales && Math.random() > 0.7;
  
  const duracionMinutos = Math.floor(Math.random() * 40) + 15;
  const min = Math.floor(duracionMinutos);
  const sec = Math.floor((duracionMinutos - min) * 60);
  const duracion = `${min}:${sec.toString().padStart(2, '0')}`;
  
  const rondas = Math.floor(duracionMinutos / 3) + Math.floor(Math.random() * 5);
  const eleccionesFallidas = Math.floor(Math.random() * 3);
  const ejecuciones = Math.floor(Math.random() * 2);
  
  return {
    id: `partida_${id}`,
    fecha: fecha,
    numJugadores: numJugadores,
    duracion: duracion,
    ganador: ganaLiberales ? 'Liberales' : 'Fascistas',
    hitler: hitler.nombre,
    políticasLiberales: políticasLiberales,
    políticasFascistas: políticasFascistas,
    rondas: rondas,
    eleccionesFallidas: eleccionesFallidas,
    ejecuciones: ejecuciones,
    hitlerElegidoCanciller: hitlerElegido,
    hitlerEjecutado: hitlerEjecutado,
    jugadores: jugadores,
    eventos: generarEventos(duracionMinutos),
    motivoVictoria: hitlerElegido 
      ? 'Hitler elegido Canciller' 
      : hitlerEjecutado 
        ? 'Hitler ejecutado' 
        : ganaLiberales 
          ? '5 Políticas Liberales promulgadas' 
          : '6 Políticas Fascistas promulgadas',
  };
};

// Generar 50 partidas falsas con fechas variadas
const PARTIDAS_SECRET_HITLER_FAKE = [];

for (let i = 0; i < 50; i++) {
  const diasAtras = Math.floor(Math.random() * 60);
  const fecha = new Date();
  fecha.setDate(fecha.getDate() - diasAtras);
  fecha.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60), 0, 0);
  
  const numJugadores = Math.floor(Math.random() * 6) + 5; // Entre 5 y 10 jugadores
  
  PARTIDAS_SECRET_HITLER_FAKE.push(
    generarPartida(i + 1, fecha.toISOString(), numJugadores)
  );
}

// Ordenar por fecha (más recientes primero)
PARTIDAS_SECRET_HITLER_FAKE.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

export { PARTIDAS_SECRET_HITLER_FAKE };
