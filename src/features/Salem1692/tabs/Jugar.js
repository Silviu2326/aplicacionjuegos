import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { PARTIDAS_SALEM_FAKE, generarPartidaAleatoria } from '../constants/DatosFalsosSalem';

export const Salem1692Jugar = () => {
  const [partidaActual, setPartidaActual] = useState(null);
  const [estadoJuego, setEstadoJuego] = useState('lobby'); // lobby, night, day, trial, finished
  const [jugadores, setJugadores] = useState([]);
  const [jugadorActual, setJugadorActual] = useState(null);
  const [fase, setFase] = useState('day'); // night, day
  const [accusations, setAccusations] = useState({});
  const [trial, setTrial] = useState(null);
  const [gameLog, setGameLog] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(null);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState('');
  const [fadeAnim] = useState(new Animated.Value(1));

  useEffect(() => {
    if (estadoJuego === 'night' && tiempoRestante !== null && tiempoRestante > 0) {
      const interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            avanzarFase();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [tiempoRestante, estadoJuego]);

  const iniciarPartida = () => {
    const partida = generarPartidaAleatoria();
    setPartidaActual(partida);
    setJugadores(partida.jugadores);
    setEstadoJuego('night');
    setFase('night');
    setAccusations({});
    setTrial(null);
    setTiempoRestante(60); // 60 segundos para fase noche
    setGameLog([
      { type: 'game_start', message: 'La partida ha comenzado. Fase de Noche.', timestamp: Date.now() },
      { type: 'info', message: `Hay ${partida.numWitches} bruja(s) entre los jugadores.`, timestamp: Date.now() },
    ]);
    setJugadorActual(partida.jugadores[0]);
  };

  const avanzarFase = () => {
    if (estadoJuego === 'night') {
      setEstadoJuego('day');
      setFase('day');
      setTiempoRestante(null);
      setGameLog((prev) => [
        ...prev,
        { type: 'phase_change', message: 'El día ha comenzado. Los jugadores pueden robar cartas y acusar.', timestamp: Date.now() },
      ]);
      // Simular turno de jugador
      const siguienteJugador = jugadores[(jugadores.indexOf(jugadorActual) + 1) % jugadores.length];
      setJugadorActual(siguienteJugador);
    }
  };

  const handleAccusar = (jugadorId) => {
    if (estadoJuego !== 'day' || jugadorId === jugadorActual?.id) return;

    const nuevasAccusations = { ...accusations };
    if (!nuevasAccusations[jugadorId]) {
      nuevasAccusations[jugadorId] = 0;
    }
    nuevasAccusations[jugadorId] += 1;

    setAccusations(nuevasAccusations);
    const jugadorAcusado = jugadores.find(j => j.id === jugadorId);

    setGameLog((prev) => [
      ...prev,
      { type: 'accusation', message: `${jugadorActual?.name} acusa a ${jugadorAcusado?.name}.`, timestamp: Date.now() },
    ]);

    mostrarAnimacionFeedback(`Acusación a ${jugadorAcusado?.name}`);

    // Si llega a 7 acusaciones, iniciar juicio
    if (nuevasAccusations[jugadorId] >= 7) {
      iniciarJuicio(jugadorId);
    }
  };

  const iniciarJuicio = (jugadorId) => {
    const acusado = jugadores.find(j => j.id === jugadorId);
    const cartasJuicio = acusado?.trialCards || [];
    const tieneCartaBruja = cartasJuicio.some(c => c.id === 'trial_witch');

    setTrial({
      acusadoId: jugadorId,
      acusadoNombre: acusado?.name,
      cartasReveladas: cartasJuicio,
      tieneCartaBruja,
      votos: {},
      completado: false,
    });

    setEstadoJuego('trial');
    setGameLog((prev) => [
      ...prev,
      { type: 'trial_start', message: `¡Se inicia un juicio contra ${acusado?.name}!`, timestamp: Date.now() },
      { type: 'trial_cards', message: tieneCartaBruja ? `${acusado?.name} revela una carta de Bruja.` : `${acusado?.name} no revela cartas de Bruja.`, timestamp: Date.now() },
    ]);
  };

  const handleVotar = (voto) => {
    if (!trial || trial.completado) return;

    const nuevosVotos = { ...trial.votos };
    nuevosVotos[jugadorActual?.id] = voto;

    const todosHanVotado = Object.keys(nuevosVotos).length >= jugadores.filter(j => j.isAlive).length;

    setTrial({
      ...trial,
      votos: nuevosVotos,
      completado: todosHanVotado,
    });

    if (todosHanVotado) {
      resolverJuicio();
    } else {
      mostrarAnimacionFeedback(`Voto registrado: ${voto === 'condemn' ? 'Condenar' : 'Salvar'}`);
    }
  };

  const resolverJuicio = () => {
    const votosCondenar = Object.values(trial.votos).filter(v => v === 'condemn').length;
    const votosSalvar = Object.values(trial.votos).filter(v => v === 'save').length;
    const condenado = votosCondenar > votosSalvar;

    const jugadoresActualizados = jugadores.map(j => {
      if (j.id === trial.acusadoId) {
        return { ...j, isAlive: !condenado };
      }
      return j;
    });

    setJugadores(jugadoresActualizados);
    const nuevoEstado = jugadoresActualizados.filter(j => j.isAlive).length > 0 ? 'day' : 'finished';
    setEstadoJuego(nuevoEstado);

    setGameLog((prev) => [
      ...prev,
      { 
        type: condenado ? 'trial_condemned' : 'trial_saved', 
        message: condenado 
          ? `${trial.acusadoNombre} ha sido condenado y eliminado.` 
          : `${trial.acusadoNombre} ha sido absuelto.`,
        timestamp: Date.now() 
      },
    ]);

    if (nuevoEstado === 'finished') {
      const brujasVivas = jugadoresActualizados.filter(j => j.isAlive && j.role === 'witch').length;
      const ganador = brujasVivas === 0 ? 'Aldeanos' : 'Brujas';
      mostrarAnimacionFeedback(`¡${ganador} ganan!`);
      setTimeout(() => {
        Alert.alert('¡Fin del juego!', `¡${ganador} han ganado la partida!`, [
          { text: 'Nueva partida', onPress: reiniciarPartida },
          { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
        ]);
      }, 2000);
    } else {
      setTrial(null);
      setAccusations({});
    }
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
      Animated.delay(1500),
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
    setAccusations({});
    setTrial(null);
    setGameLog([]);
    setTiempoRestante(null);
  };

  const getRoleIcon = (role) => {
    return role === 'witch' ? '🧙' : '👤';
  };

  const getRoleColor = (role) => {
    return role === 'witch' ? '#e74c3c' : '#3498db';
  };

  if (estadoJuego === 'lobby') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.lobbyContainer}>
          <Text style={styles.lobbyTitle}>¡Bienvenido a Salem 1692!</Text>
          <Text style={styles.lobbyDescription}>
            Un juego de deducción social donde los Aldeanos deben descubrir a las Brujas antes de que sea demasiado tarde.
          </Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>📋 Reglas Básicas</Text>
            <Text style={styles.infoText}>• Durante la Noche, las Brujas eligen un objetivo</Text>
            <Text style={styles.infoText}>• Durante el Día, los jugadores pueden acusar a otros</Text>
            <Text style={styles.infoText}>• 7 acusaciones activan un Juicio</Text>
            <Text style={styles.infoText}>• Los Aldeanos ganan eliminando a todas las Brujas</Text>
            <Text style={styles.infoText}>• Las Brujas ganan eliminando a todos los Aldeanos</Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={iniciarPartida}>
            <Text style={styles.startButtonText}>🎮 Iniciar Partida</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  if (estadoJuego === 'trial' && trial) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.trialContainer}>
          <Text style={styles.trialTitle}>⚖️ JUICIO</Text>
          <Text style={styles.trialSubtitle}>Contra: {trial.acusadoNombre}</Text>

          <View style={styles.trialCardsContainer}>
            <Text style={styles.sectionTitle}>Cartas de Juicio Reveladas:</Text>
            {trial.cartasReveladas.map((carta, index) => (
              <View key={index} style={styles.trialCard}>
                <Text style={styles.trialCardText}>
                  {carta.id === 'trial_witch' ? '🧙 Bruja' : '✅ No es Bruja'}
                </Text>
              </View>
            ))}
          </View>

          {trial.tieneCartaBruja && (
            <View style={styles.warningBox}>
              <Text style={styles.warningText}>⚠️ {trial.acusadoNombre} reveló una carta de Bruja</Text>
            </View>
          )}

          <View style={styles.votingSection}>
            <Text style={styles.sectionTitle}>Votación:</Text>
            <Text style={styles.votingInfo}>
              Votos registrados: {Object.keys(trial.votos).length}/{jugadores.filter(j => j.isAlive).length}
            </Text>

            {!trial.completado && (
              <View style={styles.voteButtons}>
                <TouchableOpacity
                  style={[styles.voteButton, styles.voteSave]}
                  onPress={() => handleVotar('save')}
                >
                  <Text style={styles.voteButtonText}>✅ Salvar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.voteButton, styles.voteCondemn]}
                  onPress={() => handleVotar('condemn')}
                >
                  <Text style={styles.voteButtonText}>❌ Condenar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.gameLogContainer}>
            <Text style={styles.sectionTitle}>Registro del Juego:</Text>
            <ScrollView style={styles.logScroll}>
              {gameLog.slice(-10).map((log, index) => (
                <Text key={index} style={styles.logEntry}>
                  {log.message}
                </Text>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {mostrarFeedback && (
        <Animated.View style={[styles.feedbackContainer, { opacity: fadeAnim }]}>
          <Text style={styles.feedbackText}>{mensajeFeedback}</Text>
        </Animated.View>
      )}

      <View style={styles.gameHeader}>
        <Text style={styles.phaseText}>
          {fase === 'night' ? '🌙 Fase de Noche' : '☀️ Fase de Día'}
        </Text>
        {tiempoRestante !== null && (
          <Text style={styles.timerText}>⏱️ {tiempoRestante}s</Text>
        )}
        {jugadorActual && (
          <Text style={styles.currentPlayerText}>
            Jugador actual: {jugadorActual.name} {getRoleIcon(jugadorActual.role)}
          </Text>
        )}
      </View>

      <View style={styles.playersSection}>
        <Text style={styles.sectionTitle}>Jugadores:</Text>
        <View style={styles.playersGrid}>
          {jugadores.map((jugador) => {
            const numAccusations = accusations[jugador.id] || 0;
            const isAlive = jugador.isAlive;
            
            return (
              <TouchableOpacity
                key={jugador.id}
                style={[
                  styles.playerCard,
                  !isAlive && styles.playerCardDead,
                  jugador.id === jugadorActual?.id && styles.playerCardCurrent,
                ]}
                onPress={() => estadoJuego === 'day' && isAlive && jugador.id !== jugadorActual?.id && handleAccusar(jugador.id)}
                disabled={estadoJuego !== 'day' || !isAlive || jugador.id === jugadorActual?.id}
              >
                <Text style={styles.playerName}>{jugador.name}</Text>
                <Text style={styles.playerRole}>{getRoleIcon(jugador.role)}</Text>
                {numAccusations > 0 && (
                  <View style={styles.accusationBadge}>
                    <Text style={styles.accusationText}>{numAccusations}/7</Text>
                  </View>
                )}
                {!isAlive && <Text style={styles.deadText}>💀</Text>}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <View style={styles.actionsSection}>
        <Text style={styles.sectionTitle}>Acciones:</Text>
        {estadoJuego === 'night' && (
          <TouchableOpacity style={styles.actionButton} onPress={avanzarFase}>
            <Text style={styles.actionButtonText}>Finalizar Fase de Noche</Text>
          </TouchableOpacity>
        )}
        {estadoJuego === 'day' && (
          <>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={() => {
                const siguiente = jugadores[(jugadores.indexOf(jugadorActual) + 1) % jugadores.length];
                setJugadorActual(siguiente);
                mostrarAnimacionFeedback(`Turno de ${siguiente.name}`);
              }}
            >
              <Text style={styles.actionButtonText}>Siguiente Turno</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSecondary} onPress={avanzarFase}>
              <Text style={styles.actionButtonText}>Finalizar Día → Noche</Text>
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.gameLogContainer}>
        <Text style={styles.sectionTitle}>Registro del Juego:</Text>
        <ScrollView style={styles.logScroll}>
          {gameLog.slice(-15).map((log, index) => (
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
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
    backgroundColor: '#6a1b9a',
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
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  timerText: {
    fontSize: 16,
    color: '#ffd700',
    marginBottom: 5,
  },
  currentPlayerText: {
    fontSize: 14,
    color: '#ccc',
  },
  playersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  playerCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerCardCurrent: {
    borderColor: '#ffd700',
  },
  playerCardDead: {
    opacity: 0.5,
    backgroundColor: '#1a1a1a',
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  playerRole: {
    fontSize: 24,
  },
  accusationBadge: {
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginTop: 5,
  },
  accusationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  deadText: {
    fontSize: 20,
    marginTop: 5,
  },
  actionsSection: {
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#6a1b9a',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonSecondary: {
    backgroundColor: '#4a148c',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  gameLogContainer: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  trialContainer: {
    padding: 20,
  },
  trialTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  trialSubtitle: {
    fontSize: 20,
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 30,
  },
  trialCardsContainer: {
    marginBottom: 20,
  },
  trialCard: {
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  trialCardText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  warningBox: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  warningText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  votingSection: {
    marginBottom: 20,
  },
  votingInfo: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 15,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'center',
  },
  voteButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  voteSave: {
    backgroundColor: '#27ae60',
  },
  voteCondemn: {
    backgroundColor: '#e74c3c',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#6a1b9a',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  feedbackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

