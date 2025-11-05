import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, Modal } from 'react-native';
import { generarPartidaAleatoria } from '../constants/DatosFalsosAvalon';

// Configuración de misiones según número de jugadores
const MISIONES_CONFIG = {
  5: [2, 3, 2, 3, 3],
  6: [2, 3, 4, 3, 4],
  7: [2, 3, 3, 4, 4],
  8: [3, 4, 4, 5, 5],
  9: [3, 4, 4, 5, 5],
  10: [3, 4, 4, 5, 5],
};

const getRoleName = (role) => {
  const roleNames = {
    merlin: 'Merlín',
    perceval: 'Perceval',
    loyal_servant: 'Servidor Leal',
    assassin: 'Asesino',
    morgana: 'Morgana',
    mordred: 'Mordred',
    oberon: 'Oberón',
    minion: 'Esbirro',
  };
  return roleNames[role] || role;
};

const getRoleDescription = (role, gameInfo) => {
  if (role === 'merlin') {
    const spies = gameInfo.jugadores
      .filter(j => j.team === 'spy' && j.role !== 'mordred')
      .map(j => j.name);
    return `Eres Merlín. Conoces el mal, pero ellos no te conocen. Si te descubren, todo estará perdido.\n\nLos esbirros de Mordred son: ${spies.join(', ')}.`;
  }
  if (role === 'perceval') {
    const merlin = gameInfo.jugadores.find(j => j.role === 'merlin');
    const morgana = gameInfo.jugadores.find(j => j.role === 'morgana');
    if (merlin && morgana) {
      return `Eres Perceval. La Dama del Lago te ha concedido una visión. Ves a ${merlin.name} y ${morgana.name} como figuras de gran poder, pero no sabes cuál es Merlín y cuál es Morgana.`;
    }
    return `Eres Perceval. Eres leal al reino.`;
  }
  if (role === 'assassin') {
    const spies = gameInfo.jugadores
      .filter(j => j.team === 'spy' && j.role !== 'assassin')
      .map(j => j.name);
    return `Eres el Asesino. Tu objetivo es sabotear las misiones y, si los Leales ganan, asesinar a Merlín.\n\nTus compañeros esbirros son: ${spies.join(', ')}.`;
  }
  if (role === 'morgana') {
    const spies = gameInfo.jugadores
      .filter(j => j.team === 'spy' && j.role !== 'morgana')
      .map(j => j.name);
    return `Eres Morgana. Apareces como Merlín ante Perceval. Sabotea las misiones.\n\nTus compañeros esbirros son: ${spies.join(', ')}.`;
  }
  if (role === 'mordred') {
    const spies = gameInfo.jugadores
      .filter(j => j.team === 'spy' && j.role !== 'mordred')
      .map(j => j.name);
    return `Eres Mordred. Eres invisible ante Merlín. Sabotea las misiones.\n\nTus compañeros esbirros son: ${spies.join(', ')}.`;
  }
  if (role === 'minion') {
    const spies = gameInfo.jugadores
      .filter(j => j.team === 'spy' && j.role !== 'minion')
      .map(j => j.name);
    return `Eres un Esbirro de Mordred. Tu objetivo es sabotear las misiones.\n\nTus compañeros esbirros son: ${spies.join(', ')}.`;
  }
  return `Eres un Servidor Leal de Arturo. Tu objetivo es completar las misiones con éxito.`;
};

export const TheResistanceAvalonJugar = () => {
  const [partidaActual, setPartidaActual] = useState(null);
  const [estadoJuego, setEstadoJuego] = useState('lobby'); // lobby, role_reveal, setup, playing, assassination, finished
  const [jugadores, setJugadores] = useState([]);
  const [jugadorActual, setJugadorActual] = useState(null);
  const [misionActual, setMisionActual] = useState(1);
  const [puntosLeales, setPuntosLeales] = useState(0);
  const [puntosEsbirros, setPuntosEsbirros] = useState(0);
  const [liderActual, setLiderActual] = useState(0);
  const [equipoPropuesto, setEquipoPropuesto] = useState([]);
  const [votosEquipo, setVotosEquipo] = useState({});
  const [votosMision, setVotosMision] = useState({});
  const [fase, setFase] = useState('team_selection'); // team_selection, team_vote, mission_vote, mission_result
  const [votosRechazados, setVotosRechazados] = useState(0);
  const [resultadosMisiones, setResultadosMisiones] = useState([]);
  const [gameLog, setGameLog] = useState([]);
  const [mostrarRol, setMostrarRol] = useState(false);
  const [mostrarAsesinato, setMostrarAsesinato] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState('');
  const [fadeAnim] = useState(new Animated.Value(1));

  const iniciarPartida = () => {
    const partida = generarPartidaAleatoria();
    setPartidaActual(partida);
    setJugadores(partida.jugadores);
    setEstadoJuego('role_reveal');
    setMisionActual(1);
    setPuntosLeales(0);
    setPuntosEsbirros(0);
    setLiderActual(0);
    setEquipoPropuesto([]);
    setVotosEquipo({});
    setVotosMision({});
    setFase('team_selection');
    setVotosRechazados(0);
    setResultadosMisiones([]);
    setGameLog([
      { type: 'game_start', message: 'La partida ha comenzado. Se revelarán los roles.', timestamp: Date.now() },
    ]);
    setJugadorActual(partida.jugadores[0]);
    setMostrarRol(true);
  };

  const cerrarRevelacionRol = () => {
    setMostrarRol(false);
    setEstadoJuego('setup');
    setFase('team_selection');
    setGameLog((prev) => [
      ...prev,
      { type: 'phase_change', message: `Misión ${misionActual} - El Líder es ${jugadores[liderActual]?.name}`, timestamp: Date.now() },
    ]);
  };

  const seleccionarJugadorEquipo = (jugadorId) => {
    if (fase !== 'team_selection' || jugadorActual?.id !== jugadores[liderActual]?.id) return;
    
    const numJugadoresNecesarios = MISIONES_CONFIG[jugadores.length]?.[misionActual - 1] || 2;
    
    if (equipoPropuesto.includes(jugadorId)) {
      setEquipoPropuesto(equipoPropuesto.filter(id => id !== jugadorId));
    } else if (equipoPropuesto.length < numJugadoresNecesarios) {
      setEquipoPropuesto([...equipoPropuesto, jugadorId]);
    }
  };

  const confirmarEquipo = () => {
    const numJugadoresNecesarios = MISIONES_CONFIG[jugadores.length]?.[misionActual - 1] || 2;
    
    if (equipoPropuesto.length !== numJugadoresNecesarios) {
      mostrarAnimacionFeedback(`Debes seleccionar exactamente ${numJugadoresNecesarios} jugadores`);
      return;
    }
    
    setFase('team_vote');
    setVotosEquipo({});
    const nombresEquipo = equipoPropuesto.map(id => jugadores.find(j => j.id === id)?.name).join(', ');
    setGameLog((prev) => [
      ...prev,
      { type: 'team_proposal', message: `${jugadores[liderActual]?.name} propone el equipo: ${nombresEquipo}`, timestamp: Date.now() },
    ]);
    mostrarAnimacionFeedback(`Equipo propuesto. Esperando votos...`);
  };

  const votarEquipo = (voto) => {
    if (fase !== 'team_vote' || !jugadorActual) return;
    
    const nuevosVotos = { ...votosEquipo };
    nuevosVotos[jugadorActual.id] = voto === 'approve';
    
    setVotosEquipo(nuevosVotos);
    
    if (Object.keys(nuevosVotos).length === jugadores.length) {
      const votosAprobar = Object.values(nuevosVotos).filter(v => v).length;
      const aprobado = votosAprobar > jugadores.length / 2;
      
      if (aprobado) {
        setFase('mission_vote');
        setVotosMision({});
        setGameLog((prev) => [
          ...prev,
          { type: 'vote', message: `Equipo aprobado (${votosAprobar} a favor, ${jugadores.length - votosAprobar} en contra)`, timestamp: Date.now() },
        ]);
        mostrarAnimacionFeedback('Equipo aprobado. Iniciando misión...');
      } else {
        setVotosRechazados(votosRechazados + 1);
        const siguienteLider = (liderActual + 1) % jugadores.length;
        setLiderActual(siguienteLider);
        setFase('team_selection');
        setEquipoPropuesto([]);
        setVotosEquipo({});
        
        if (votosRechazados >= 4) {
          // Victoria automática de esbirros
          setEstadoJuego('finished');
          setPuntosEsbirros(3);
          mostrarAnimacionFeedback('¡5 votos rechazados! Los Esbirros ganan.');
          setTimeout(() => {
            Alert.alert('¡Fin del juego!', 'Los Esbirros ganan por 5 votos rechazados consecutivos.', [
              { text: 'Nueva partida', onPress: reiniciarPartida },
              { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
            ]);
          }, 2000);
        } else {
          setGameLog((prev) => [
            ...prev,
            { type: 'vote', message: `Equipo rechazado (${votosAprobar} a favor, ${jugadores.length - votosAprobar} en contra). Votos rechazados: ${votosRechazados + 1}`, timestamp: Date.now() },
            { type: 'phase_change', message: `Nuevo Líder: ${jugadores[siguienteLider]?.name}`, timestamp: Date.now() },
          ]);
          mostrarAnimacionFeedback(`Equipo rechazado. Nuevo líder: ${jugadores[siguienteLider]?.name}`);
        }
      }
    } else {
      mostrarAnimacionFeedback(`Voto registrado: ${voto === 'approve' ? 'Aprobar' : 'Rechazar'}`);
    }
  };

  const votarMision = (voto) => {
    if (fase !== 'mission_vote' || !jugadorActual) return;
    if (!equipoPropuesto.includes(jugadorActual.id)) {
      mostrarAnimacionFeedback('No estás en el equipo de la misión');
      return;
    }
    
    // Los leales solo pueden votar éxito
    if (jugadorActual.team === 'loyal' && voto === 'fail') {
      mostrarAnimacionFeedback('Los Leales solo pueden votar Éxito');
      return;
    }
    
    const nuevosVotos = { ...votosMision };
    nuevosVotos[jugadorActual.id] = voto === 'success';
    
    setVotosMision(nuevosVotos);
    
    if (Object.keys(nuevosVotos).length === equipoPropuesto.length) {
      resolverMision(nuevosVotos);
    } else {
      mostrarAnimacionFeedback(`Voto registrado: ${voto === 'success' ? 'Éxito' : 'Fracaso'}`);
    }
  };

  const resolverMision = (votos) => {
    const votosExito = Object.values(votos).filter(v => v).length;
    const votosFracaso = Object.values(votos).filter(v => !v).length;
    
    // Para misión 4 con 7+ jugadores, se necesitan 2 fracasos
    const necesitaFracasos = misionActual === 4 && jugadores.length >= 7 ? 2 : 1;
    const misionExito = votosFracaso < necesitaFracasos;
    
    const resultado = {
      mision: misionActual,
      exito: misionExito,
      votosExito,
      votosFracaso,
      equipo: equipoPropuesto.map(id => jugadores.find(j => j.id === id)?.name),
    };
    
    setResultadosMisiones([...resultadosMisiones, resultado]);
    
    if (misionExito) {
      setPuntosLeales(puntosLeales + 1);
      setGameLog((prev) => [
        ...prev,
        { type: 'mission', message: `¡Misión ${misionActual} exitosa! Éxitos: ${votosExito}, Fracasos: ${votosFracaso}`, timestamp: Date.now() },
      ]);
      
      if (puntosLeales + 1 >= 3) {
        // Los leales ganaron, pero hay fase de asesinato si hay asesino
        const hayAsesino = jugadores.some(j => j.role === 'assassin');
        if (hayAsesino) {
          setEstadoJuego('assassination');
          setMostrarAsesinato(true);
        } else {
          setEstadoJuego('finished');
          setTimeout(() => {
            Alert.alert('¡Fin del juego!', '¡Los Leales ganan!', [
              { text: 'Nueva partida', onPress: reiniciarPartida },
              { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
            ]);
          }, 2000);
        }
      } else {
        siguienteMision();
      }
    } else {
      setPuntosEsbirros(puntosEsbirros + 1);
      setGameLog((prev) => [
        ...prev,
        { type: 'mission', message: `¡Misión ${misionActual} saboteada! Éxitos: ${votosExito}, Fracasos: ${votosFracaso}`, timestamp: Date.now() },
      ]);
      
      if (puntosEsbirros + 1 >= 3) {
        setEstadoJuego('finished');
        setTimeout(() => {
          Alert.alert('¡Fin del juego!', '¡Los Esbirros ganan!', [
            { text: 'Nueva partida', onPress: reiniciarPartida },
            { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
          ]);
        }, 2000);
      } else {
        siguienteMision();
      }
    }
  };

  const siguienteMision = () => {
    if (misionActual < 5) {
      setMisionActual(misionActual + 1);
      const siguienteLider = (liderActual + 1) % jugadores.length;
      setLiderActual(siguienteLider);
      setFase('team_selection');
      setEquipoPropuesto([]);
      setVotosEquipo({});
      setVotosMision({});
      setVotosRechazados(0);
      setGameLog((prev) => [
        ...prev,
        { type: 'phase_change', message: `Misión ${misionActual + 1} - Nuevo Líder: ${jugadores[siguienteLider]?.name}`, timestamp: Date.now() },
      ]);
    }
  };

  const realizarAsesinato = (jugadorId) => {
    const objetivo = jugadores.find(j => j.id === jugadorId);
    const esMerlin = objetivo?.role === 'merlin';
    
    setMostrarAsesinato(false);
    
    if (esMerlin) {
      setPuntosEsbirros(3);
      setPuntosLeales(0);
      setGameLog((prev) => [
        ...prev,
        { type: 'assassination', message: `¡El Asesino ha identificado correctamente a Merlín (${objetivo.name})! Los Esbirros ganan.`, timestamp: Date.now() },
      ]);
      setTimeout(() => {
        Alert.alert('¡Fin del juego!', '¡El Asesino ha identificado a Merlín! Los Esbirros ganan.', [
          { text: 'Nueva partida', onPress: reiniciarPartida },
          { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
        ]);
      }, 2000);
    } else {
      setGameLog((prev) => [
        ...prev,
        { type: 'assassination', message: `El Asesino falló. ${objetivo.name} no es Merlín. Los Leales ganan.`, timestamp: Date.now() },
      ]);
      setTimeout(() => {
        Alert.alert('¡Fin del juego!', '¡El Asesino falló! Los Leales ganan.', [
          { text: 'Nueva partida', onPress: reiniciarPartida },
          { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
        ]);
      }, 2000);
    }
    setEstadoJuego('finished');
  };

  const mostrarAnimacionFeedback = (mensaje) => {
    setMensajeFeedback(mensaje);
    setMostrarFeedback(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setMostrarFeedback(false);
      fadeAnim.setValue(1);
    });
  };

  const reiniciarPartida = () => {
    setPartidaActual(null);
    setEstadoJuego('lobby');
    setJugadores([]);
    setJugadorActual(null);
    setMisionActual(1);
    setPuntosLeales(0);
    setPuntosEsbirros(0);
    setLiderActual(0);
    setEquipoPropuesto([]);
    setVotosEquipo({});
    setVotosMision({});
    setFase('team_selection');
    setVotosRechazados(0);
    setResultadosMisiones([]);
    setGameLog([]);
    setMostrarRol(false);
    setMostrarAsesinato(false);
  };

  const cambiarJugador = () => {
    const indiceActual = jugadores.findIndex(j => j.id === jugadorActual?.id);
    const siguienteIndice = (indiceActual + 1) % jugadores.length;
    setJugadorActual(jugadores[siguienteIndice]);
    mostrarAnimacionFeedback(`Turno de ${jugadores[siguienteIndice]?.name}`);
  };

  if (estadoJuego === 'lobby') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.lobbyContainer}>
          <Text style={styles.lobbyTitle}>⚔️ The Resistance: Avalon</Text>
          <Text style={styles.lobbyDescription}>
            Un juego de deducción social ambientado en el legendario mundo del Rey Arturo. 
            Los Leales deben completar 3 misiones exitosas, mientras que los Esbirros intentan sabotearlas.
          </Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>📋 Reglas Básicas</Text>
            <Text style={styles.infoText}>• 5 rondas de misiones (3 éxitos para ganar)</Text>
            <Text style={styles.infoText}>• El Líder propone un equipo para cada misión</Text>
            <Text style={styles.infoText}>• Todos votan para aprobar o rechazar el equipo</Text>
            <Text style={styles.infoText}>• Los miembros del equipo votan Éxito o Fracaso</Text>
            <Text style={styles.infoText}>• Si los Leales ganan, el Asesino puede intentar asesinar a Merlín</Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={iniciarPartida}>
            <Text style={styles.startButtonText}>🎮 Iniciar Partida</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const numJugadoresNecesarios = MISIONES_CONFIG[jugadores.length]?.[misionActual - 1] || 2;
  const esLider = jugadorActual?.id === jugadores[liderActual]?.id;
  const estaEnEquipo = equipoPropuesto.includes(jugadorActual?.id);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {mostrarFeedback && (
        <Animated.View style={[styles.feedbackContainer, { opacity: fadeAnim }]}>
          <Text style={styles.feedbackText}>{mensajeFeedback}</Text>
        </Animated.View>
      )}

      <Modal
        visible={mostrarRol}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Tu Rol Secreto</Text>
            <Text style={styles.modalRoleName}>{getRoleName(jugadorActual?.role)}</Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalDescription}>
                {jugadorActual ? getRoleDescription(jugadorActual.role, { jugadores }) : ''}
              </Text>
            </ScrollView>
            <TouchableOpacity style={styles.modalButton} onPress={cerrarRevelacionRol}>
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={mostrarAsesinato}
        transparent={true}
        animationType="fade"
        onRequestClose={() => {}}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🗡️ Fase de Asesinato</Text>
            <Text style={styles.modalDescription}>
              Los Leales han completado 3 misiones. El Asesino debe identificar a Merlín.
            </Text>
            <Text style={styles.modalDescription}>
              {jugadorActual?.role === 'assassin' 
                ? 'Selecciona al jugador que crees que es Merlín:'
                : 'Esperando al Asesino...'}
            </Text>
            {jugadorActual?.role === 'assassin' && (
              <ScrollView style={styles.playersList}>
                {jugadores
                  .filter(j => j.id !== jugadorActual.id)
                  .map((jugador) => (
                    <TouchableOpacity
                      key={jugador.id}
                      style={styles.playerSelectButton}
                      onPress={() => realizarAsesinato(jugador.id)}
                    >
                      <Text style={styles.playerSelectText}>{jugador.name}</Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      <View style={styles.gameHeader}>
        <View style={styles.scoreContainer}>
          <View style={[styles.scoreCard, styles.scoreLeal]}>
            <Text style={styles.scoreLabel}>Leales</Text>
            <Text style={styles.scoreValue}>{puntosLeales}/3</Text>
          </View>
          <View style={[styles.scoreCard, styles.scoreEsbirro]}>
            <Text style={styles.scoreLabel}>Esbirros</Text>
            <Text style={styles.scoreValue}>{puntosEsbirros}/3</Text>
          </View>
        </View>
        <Text style={styles.missionText}>Misión {misionActual}/5</Text>
        {jugadorActual && (
          <Text style={styles.currentPlayerText}>
            Jugador: {jugadorActual.name} ({getRoleName(jugadorActual.role)})
          </Text>
        )}
        {esLider && <Text style={styles.leaderBadge}>👑 LÍDER</Text>}
        <TouchableOpacity style={styles.changePlayerButton} onPress={cambiarJugador}>
          <Text style={styles.changePlayerText}>Cambiar Jugador</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.missionsBoard}>
        <Text style={styles.sectionTitle}>Tablero de Misiones</Text>
        <View style={styles.missionsGrid}>
          {[1, 2, 3, 4, 5].map((num) => {
            const resultado = resultadosMisiones.find(r => r.mision === num);
            return (
              <View key={num} style={[styles.missionCard, num === misionActual && styles.missionCardActive]}>
                <Text style={styles.missionNumber}>Misión {num}</Text>
                {resultado ? (
                  <Text style={[styles.missionResult, resultado.exito ? styles.missionSuccess : styles.missionFail]}>
                    {resultado.exito ? '✅ Éxito' : '❌ Fracaso'}
                  </Text>
                ) : (
                  <Text style={styles.missionPending}>{num === misionActual ? 'En curso' : 'Pendiente'}</Text>
                )}
              </View>
            );
          })}
        </View>
      </View>

      {fase === 'team_selection' && esLider && (
        <View style={styles.teamSelection}>
          <Text style={styles.sectionTitle}>
            Selecciona {numJugadoresNecesarios} jugadores para la Misión {misionActual}
          </Text>
          <Text style={styles.selectedCount}>
            Seleccionados: {equipoPropuesto.length}/{numJugadoresNecesarios}
          </Text>
          <View style={styles.playersGrid}>
            {jugadores.map((jugador) => {
              const seleccionado = equipoPropuesto.includes(jugador.id);
              return (
                <TouchableOpacity
                  key={jugador.id}
                  style={[
                    styles.playerCard,
                    seleccionado && styles.playerCardSelected,
                    jugador.id === jugadorActual?.id && styles.playerCardCurrent,
                  ]}
                  onPress={() => seleccionarJugadorEquipo(jugador.id)}
                >
                  <Text style={styles.playerName}>{jugador.name}</Text>
                  {seleccionado && <Text style={styles.selectedIcon}>✓</Text>}
                </TouchableOpacity>
              );
            })}
          </View>
          <TouchableOpacity
            style={[
              styles.confirmButton,
              equipoPropuesto.length !== numJugadoresNecesarios && styles.confirmButtonDisabled,
            ]}
            onPress={confirmarEquipo}
            disabled={equipoPropuesto.length !== numJugadoresNecesarios}
          >
            <Text style={styles.confirmButtonText}>Confirmar Equipo</Text>
          </TouchableOpacity>
        </View>
      )}

      {fase === 'team_selection' && !esLider && (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>
            Esperando a que {jugadores[liderActual]?.name} proponga un equipo...
          </Text>
        </View>
      )}

      {fase === 'team_vote' && (
        <View style={styles.votingContainer}>
          <Text style={styles.sectionTitle}>Votación del Equipo</Text>
          <Text style={styles.teamInfo}>
            Equipo propuesto: {equipoPropuesto.map(id => jugadores.find(j => j.id === id)?.name).join(', ')}
          </Text>
          <Text style={styles.voteCount}>
            Votos: {Object.keys(votosEquipo).length}/{jugadores.length}
          </Text>
          {!votosEquipo[jugadorActual?.id] && (
            <View style={styles.voteButtons}>
              <TouchableOpacity
                style={[styles.voteButton, styles.voteApprove]}
                onPress={() => votarEquipo('approve')}
              >
                <Text style={styles.voteButtonText}>✅ Aprobar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.voteButton, styles.voteReject]}
                onPress={() => votarEquipo('reject')}
              >
                <Text style={styles.voteButtonText}>❌ Rechazar</Text>
              </TouchableOpacity>
            </View>
          )}
          {votosEquipo[jugadorActual?.id] !== undefined && (
            <Text style={styles.votedText}>
              Ya votaste: {votosEquipo[jugadorActual.id] ? '✅ Aprobar' : '❌ Rechazar'}
            </Text>
          )}
          {votosRechazados > 0 && (
            <Text style={styles.rejectedCount}>Votos rechazados: {votosRechazados}/5</Text>
          )}
        </View>
      )}

      {fase === 'mission_vote' && estaEnEquipo && (
        <View style={styles.votingContainer}>
          <Text style={styles.sectionTitle}>Votación de la Misión</Text>
          <Text style={styles.teamInfo}>
            Estás en el equipo de la misión. Tu voto es secreto.
          </Text>
          {!votosMision[jugadorActual?.id] && (
            <View style={styles.voteButtons}>
              <TouchableOpacity
                style={[styles.voteButton, styles.voteSuccess]}
                onPress={() => votarMision('success')}
              >
                <Text style={styles.voteButtonText}>✅ Éxito</Text>
              </TouchableOpacity>
              {jugadorActual?.team === 'spy' && (
                <TouchableOpacity
                  style={[styles.voteButton, styles.voteFail]}
                  onPress={() => votarMision('fail')}
                >
                  <Text style={styles.voteButtonText}>❌ Fracaso</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          {votosMision[jugadorActual?.id] !== undefined && (
            <Text style={styles.votedText}>
              Ya votaste: {votosMision[jugadorActual.id] ? '✅ Éxito' : '❌ Fracaso'}
            </Text>
          )}
          <Text style={styles.voteCount}>
            Votos de misión: {Object.keys(votosMision).length}/{equipoPropuesto.length}
          </Text>
        </View>
      )}

      {fase === 'mission_vote' && !estaEnEquipo && (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>
            Esperando a que los miembros del equipo voten...
          </Text>
        </View>
      )}

      <View style={styles.gameLogContainer}>
        <Text style={styles.sectionTitle}>Registro del Juego</Text>
        <ScrollView style={styles.logScroll}>
          {gameLog.slice(-10).map((log, index) => (
            <Text key={index} style={styles.logEntry}>
              {log.message}
            </Text>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity style={styles.resetButton} onPress={reiniciarPartida}>
        <Text style={styles.resetButtonText}>🔄 Reiniciar Partida</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  contentContainer: {
    padding: 15,
  },
  lobbyContainer: {
    alignItems: 'center',
    padding: 20,
  },
  lobbyTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 15,
    textAlign: 'center',
  },
  lobbyDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  infoCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  infoCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 8,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: '#8B4513',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameHeader: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  scoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  scoreCard: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  scoreLeal: {
    backgroundColor: '#27ae60',
  },
  scoreEsbirro: {
    backgroundColor: '#e74c3c',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 5,
  },
  scoreValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  missionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  currentPlayerText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 5,
  },
  leaderBadge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 10,
  },
  changePlayerButton: {
    backgroundColor: '#8B4513',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  changePlayerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  missionsBoard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  missionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  missionCard: {
    flex: 1,
    minWidth: '30%',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  missionCardActive: {
    borderColor: '#ffd700',
  },
  missionNumber: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 5,
  },
  missionResult: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  missionSuccess: {
    color: '#27ae60',
  },
  missionFail: {
    color: '#e74c3c',
  },
  missionPending: {
    fontSize: 12,
    color: '#999',
  },
  teamSelection: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  selectedCount: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 15,
    textAlign: 'center',
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 15,
  },
  playerCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 12,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerCardSelected: {
    borderColor: '#27ae60',
    backgroundColor: '#2d5a2d',
  },
  playerCardCurrent: {
    borderColor: '#ffd700',
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  selectedIcon: {
    fontSize: 20,
    color: '#27ae60',
    marginTop: 5,
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  confirmButtonDisabled: {
    backgroundColor: '#666',
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  waitingContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
  },
  votingContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  teamInfo: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  voteCount: {
    fontSize: 14,
    color: '#ffd700',
    marginBottom: 15,
    textAlign: 'center',
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  voteButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  voteApprove: {
    backgroundColor: '#27ae60',
  },
  voteReject: {
    backgroundColor: '#e74c3c',
  },
  voteSuccess: {
    backgroundColor: '#27ae60',
  },
  voteFail: {
    backgroundColor: '#e74c3c',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  votedText: {
    fontSize: 14,
    color: '#ffd700',
    textAlign: 'center',
    marginTop: 10,
  },
  rejectedCount: {
    fontSize: 14,
    color: '#e74c3c',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  gameLogContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    maxHeight: 200,
  },
  logScroll: {
    maxHeight: 150,
  },
  logEntry: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 5,
    lineHeight: 18,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2d2d2d',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalRoleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalScroll: {
    maxHeight: 300,
    marginBottom: 15,
  },
  modalDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersList: {
    maxHeight: 200,
    marginTop: 10,
  },
  playerSelectButton: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  playerSelectText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  feedbackContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#8B4513',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  feedbackText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

