import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, Modal } from 'react-native';
import { generarPartidaAleatoria, getRoleName, getRoleDescription, CONFIG_RONDAS, TIEMPO_NEGOCIACION } from '../constants/DatosFalsosTwoRooms';

export const TwoRoomsAndABoomJugar = () => {
  const [partidaActual, setPartidaActual] = useState(null);
  const [estadoJuego, setEstadoJuego] = useState('lobby'); // lobby, role_reveal, playing, revealing, finished
  const [jugadores, setJugadores] = useState([]);
  const [jugadorActual, setJugadorActual] = useState(null);
  const [rondaActual, setRondaActual] = useState(1);
  const [rondasTotales, setRondasTotales] = useState(3);
  const [liderHabitacion1, setLiderHabitacion1] = useState(null);
  const [liderHabitacion2, setLiderHabitacion2] = useState(null);
  const [rehenesHabitacion1, setRehenesHabitacion1] = useState([]);
  const [rehenesHabitacion2, setRehenesHabitacion2] = useState([]);
  const [fase, setFase] = useState('eleccion_lider'); // eleccion_lider, seleccion_rehenes, intercambio, revelacion
  const [tiempoRestante, setTiempoRestante] = useState(0);
  const [gameLog, setGameLog] = useState([]);
  const [mostrarRol, setMostrarRol] = useState(false);
  const [mostrarFeedback, setMostrarFeedback] = useState(false);
  const [mensajeFeedback, setMensajeFeedback] = useState('');
  const [fadeAnim] = useState(new Animated.Value(1));
  const [presidenteRevelado, setPresidenteRevelado] = useState(false);
  const [bombaRevelada, setBombaRevelada] = useState(false);

  useEffect(() => {
    let interval = null;
    if (tiempoRestante > 0 && estadoJuego === 'playing') {
      interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (tiempoRestante === 0 && estadoJuego === 'playing') {
      mostrarAnimacionFeedback('¡Tiempo agotado!');
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [tiempoRestante, estadoJuego]);

  const iniciarPartida = () => {
    const partida = generarPartidaAleatoria();
    setPartidaActual(partida);
    setJugadores(partida.jugadores);
    setRondaActual(1);
    setRondasTotales(partida.rondasTotales || 3);
    setEstadoJuego('role_reveal');
    setLiderHabitacion1(null);
    setLiderHabitacion2(null);
    setRehenesHabitacion1([]);
    setRehenesHabitacion2([]);
    setFase('eleccion_lider');
    setGameLog([
      { type: 'game_start', message: 'La partida ha comenzado. Se revelarán los roles.', timestamp: Date.now() },
    ]);
    setJugadorActual(partida.jugadores[0]);
    setMostrarRol(true);
  };

  const cerrarRevelacionRol = () => {
    setMostrarRol(false);
    setEstadoJuego('playing');
    setFase('eleccion_lider');
    const tiempoInicial = TIEMPO_NEGOCIACION[rondaActual] || 180;
    setTiempoRestante(tiempoInicial);
    setGameLog((prev) => [
      ...prev,
      { type: 'phase_change', message: `Ronda ${rondaActual} - Fase de negociación iniciada`, timestamp: Date.now() },
    ]);
  };

  const obtenerJugadoresEnHabitacion = (habitacion) => {
    return jugadores.filter(j => j.habitacion === habitacion);
  };

  const obtenerHabitacionJugador = (jugadorId) => {
    const jugador = jugadores.find(j => j.id === jugadorId);
    return jugador ? jugador.habitacion : null;
  };

  const esLiderEnHabitacion = (jugadorId, habitacion) => {
    const lider = habitacion === 1 ? liderHabitacion1 : liderHabitacion2;
    return lider === jugadorId;
  };

  const seleccionarLider = (jugadorId, habitacion) => {
    if (fase !== 'eleccion_lider' || !jugadorActual) return;
    
    const jugador = jugadores.find(j => j.id === jugadorId);
    if (!jugador || jugador.habitacion !== habitacion) return;
    
    if (habitacion === 1) {
      setLiderHabitacion1(jugadorId);
      setGameLog((prev) => [
        ...prev,
        { type: 'eleccion_lider', message: `${jugador.name} es el líder de la Habitación 1`, timestamp: Date.now() },
      ]);
    } else {
      setLiderHabitacion2(jugadorId);
      setGameLog((prev) => [
        ...prev,
        { type: 'eleccion_lider', message: `${jugador.name} es el líder de la Habitación 2`, timestamp: Date.now() },
      ]);
    }
    
    // Si ambos líderes están seleccionados, pasar a selección de rehenes
    const nuevoLider1 = habitacion === 1 ? jugadorId : liderHabitacion1;
    const nuevoLider2 = habitacion === 2 ? jugadorId : liderHabitacion2;
    
    if (nuevoLider1 && nuevoLider2) {
      setTimeout(() => {
        setFase('seleccion_rehenes');
        mostrarAnimacionFeedback('Ambos líderes seleccionados. Ahora seleccionen rehenes.');
      }, 1000);
    }
  };

  const seleccionarRehen = (jugadorId, habitacion) => {
    if (fase !== 'seleccion_rehenes' || !jugadorActual) return;
    
    const numRehenesNecesarios = CONFIG_RONDAS[rondasTotales]?.[rondaActual - 1] || rondaActual;
    const rehenes = habitacion === 1 ? rehenesHabitacion1 : rehenesHabitacion2;
    const esLider = esLiderEnHabitacion(jugadorActual.id, habitacion);
    
    if (!esLider) {
      mostrarAnimacionFeedback('Solo el líder puede seleccionar rehenes');
      return;
    }
    
    const jugador = jugadores.find(j => j.id === jugadorId);
    if (!jugador || jugador.habitacion !== habitacion) return;
    
    if (rehenes.includes(jugadorId)) {
      // Deseleccionar
      if (habitacion === 1) {
        setRehenesHabitacion1(rehenesHabitacion1.filter(id => id !== jugadorId));
      } else {
        setRehenesHabitacion2(rehenesHabitacion2.filter(id => id !== jugadorId));
      }
    } else {
      // Seleccionar
      if (rehenes.length < numRehenesNecesarios) {
        if (habitacion === 1) {
          setRehenesHabitacion1([...rehenesHabitacion1, jugadorId]);
        } else {
          setRehenesHabitacion2([...rehenesHabitacion2, jugadorId]);
        }
      } else {
        mostrarAnimacionFeedback(`Solo puedes seleccionar ${numRehenesNecesarios} rehén(es)`);
      }
    }
  };

  const confirmarRehenes = (habitacion) => {
    const numRehenesNecesarios = CONFIG_RONDAS[rondasTotales]?.[rondaActual - 1] || rondaActual;
    const rehenes = habitacion === 1 ? rehenesHabitacion1 : rehenesHabitacion2;
    
    if (rehenes.length !== numRehenesNecesarios) {
      mostrarAnimacionFeedback(`Debes seleccionar exactamente ${numRehenesNecesarios} rehén(es)`);
      return;
    }
    
    const nombresRehenes = rehenes.map(id => jugadores.find(j => j.id === id)?.name).join(', ');
    setGameLog((prev) => [
      ...prev,
      { type: 'seleccion_rehenes', message: `Líder Habitación ${habitacion} seleccionó: ${nombresRehenes}`, timestamp: Date.now() },
    ]);
    
    // Si ambos líderes han confirmado, proceder al intercambio
    const rehenes1 = habitacion === 1 ? rehenes : rehenesHabitacion1;
    const rehenes2 = habitacion === 2 ? rehenes : rehenesHabitacion2;
    
    if (rehenes1.length === numRehenesNecesarios && rehenes2.length === numRehenesNecesarios) {
      realizarIntercambio();
    }
  };

  const realizarIntercambio = () => {
    setFase('intercambio');
    
    // Intercambiar rehenes entre habitaciones
    const nuevosJugadores = jugadores.map(jugador => {
      if (rehenesHabitacion1.includes(jugador.id)) {
        return { ...jugador, habitacion: 2 };
      } else if (rehenesHabitacion2.includes(jugador.id)) {
        return { ...jugador, habitacion: 1 };
      }
      return jugador;
    });
    
    setJugadores(nuevosJugadores);
    
    const nombres1 = rehenesHabitacion1.map(id => jugadores.find(j => j.id === id)?.name).join(', ');
    const nombres2 = rehenesHabitacion2.map(id => jugadores.find(j => j.id === id)?.name).join(', ');
    
    setGameLog((prev) => [
      ...prev,
      { type: 'intercambio', message: `Intercambio realizado: ${nombres1} ↔ ${nombres2}`, timestamp: Date.now() },
    ]);
    
    mostrarAnimacionFeedback('Intercambio completado');
    
    // Si es la última ronda, pasar a revelación
    if (rondaActual >= rondasTotales) {
      setTimeout(() => {
        setEstadoJuego('revealing');
        setFase('revelacion');
        mostrarAnimacionFeedback('Última ronda completada. Fase de revelación.');
      }, 2000);
    } else {
      // Continuar a siguiente ronda
      setTimeout(() => {
        iniciarSiguienteRonda();
      }, 2000);
    }
  };

  const iniciarSiguienteRonda = () => {
    setRondaActual(rondaActual + 1);
    setFase('eleccion_lider');
    setLiderHabitacion1(null);
    setLiderHabitacion2(null);
    setRehenesHabitacion1([]);
    setRehenesHabitacion2([]);
    const tiempoInicial = TIEMPO_NEGOCIACION[rondaActual + 1] || 180;
    setTiempoRestante(tiempoInicial);
    setGameLog((prev) => [
      ...prev,
      { type: 'ronda_fin', message: `Ronda ${rondaActual} completada. Iniciando Ronda ${rondaActual + 1}...`, timestamp: Date.now() },
    ]);
  };

  const revelarRol = (rolEspecifico) => {
    if (fase !== 'revelacion' || estadoJuego !== 'revealing') return;
    
    if (rolEspecifico === 'bomba' && !bombaRevelada) {
      const bomba = jugadores.find(j => j.role === 'bomba');
      if (bomba && (jugadorActual?.id === bomba.id || jugadorActual?.role === 'bomba')) {
        setBombaRevelada(true);
        setGameLog((prev) => [
          ...prev,
          { type: 'revelacion', message: `💣 ${bomba.name} revela: Soy la BOMBA`, timestamp: Date.now() },
        ]);
        
        if (presidenteRevelado) {
          calcularResultado();
        }
      } else {
        mostrarAnimacionFeedback('Solo la Bomba puede revelarse');
      }
    } else if (rolEspecifico === 'presidente' && !presidenteRevelado) {
      const presidente = jugadores.find(j => j.role === 'presidente');
      if (presidente && (jugadorActual?.id === presidente.id || jugadorActual?.role === 'presidente')) {
        setPresidenteRevelado(true);
        setGameLog((prev) => [
          ...prev,
          { type: 'revelacion', message: `👔 ${presidente.name} revela: Soy el PRESIDENTE`, timestamp: Date.now() },
        ]);
        
        if (bombaRevelada) {
          calcularResultado();
        }
      } else {
        mostrarAnimacionFeedback('Solo el Presidente puede revelarse');
      }
    }
  };

  const calcularResultado = () => {
    const presidente = jugadores.find(j => j.role === 'presidente');
    const bomba = jugadores.find(j => j.role === 'bomba');
    
    if (!presidente || !bomba) return;
    
    const mismoHabitacion = presidente.habitacion === bomba.habitacion;
    const ganador = mismoHabitacion ? 'Equipo Rojo' : 'Equipo Azul';
    
    setEstadoJuego('finished');
    setGameLog((prev) => [
      ...prev,
      { type: 'fin_juego', message: `🎉 ${ganador} gana! Presidente y Bomba ${mismoHabitacion ? 'están' : 'NO están'} en la misma habitación.`, timestamp: Date.now() },
    ]);
    
    setTimeout(() => {
      Alert.alert(
        '¡Fin del Juego!',
        `${ganador} gana!\n\nPresidente: Habitación ${presidente.habitacion}\nBomba: Habitación ${bomba.habitacion}`,
        [
          { text: 'Nueva partida', onPress: reiniciarPartida },
          { text: 'Volver al lobby', onPress: () => setEstadoJuego('lobby') },
        ]
      );
    }, 2000);
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
    setRondaActual(1);
    setRondasTotales(3);
    setLiderHabitacion1(null);
    setLiderHabitacion2(null);
    setRehenesHabitacion1([]);
    setRehenesHabitacion2([]);
    setFase('eleccion_lider');
    setTiempoRestante(0);
    setGameLog([]);
    setMostrarRol(false);
    setPresidenteRevelado(false);
    setBombaRevelada(false);
  };

  const cambiarJugador = () => {
    const indiceActual = jugadores.findIndex(j => j.id === jugadorActual?.id);
    const siguienteIndice = (indiceActual + 1) % jugadores.length;
    setJugadorActual(jugadores[siguienteIndice]);
    mostrarAnimacionFeedback(`Turno de ${jugadores[siguienteIndice]?.name}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (estadoJuego === 'lobby') {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.lobbyContainer}>
          <Text style={styles.lobbyTitle}>💣 Two Rooms and a Boom</Text>
          <Text style={styles.lobbyDescription}>
            Un emocionante juego de deducción social para 6 a 30 jugadores. Los participantes se dividen 
            en dos equipos: el Equipo Rojo y el Equipo Azul. El Equipo Azul debe proteger al Presidente, 
            asegurándose de que al final del juego esté en una habitación diferente a la de la Bomba. 
            El Equipo Rojo quiere que la Bomba y el Presidente terminen en la misma habitación.
          </Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.infoCardTitle}>📋 Reglas Básicas</Text>
            <Text style={styles.infoText}>• El juego se desarrolla en varias rondas (generalmente 3)</Text>
            <Text style={styles.infoText}>• En cada ronda, los jugadores se dividen en dos habitaciones</Text>
            <Text style={styles.infoText}>• Cada habitación elige un Líder</Text>
            <Text style={styles.infoText}>• Los Líderes seleccionan rehenes para intercambiar</Text>
            <Text style={styles.infoText}>• Al final, se revela si el Presidente y la Bomba están juntos</Text>
          </View>

          <TouchableOpacity style={styles.startButton} onPress={iniciarPartida}>
            <Text style={styles.startButtonText}>🎮 Iniciar Partida</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  const habitacionJugador = jugadorActual ? jugadorActual.habitacion : 1;
  const jugadoresHabitacion1 = obtenerJugadoresEnHabitacion(1);
  const jugadoresHabitacion2 = obtenerJugadoresEnHabitacion(2);
  const esLider1 = liderHabitacion1 === jugadorActual?.id;
  const esLider2 = liderHabitacion2 === jugadorActual?.id;
  const numRehenesNecesarios = CONFIG_RONDAS[rondasTotales]?.[rondaActual - 1] || rondaActual;

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
            <Text style={styles.modalRoleName}>{jugadorActual ? getRoleName(jugadorActual.role) : ''}</Text>
            <Text style={styles.modalTeam}>
              Equipo: {jugadorActual?.team === 'rojo' ? '🔴 Rojo' : jugadorActual?.team === 'azul' ? '🔵 Azul' : '⚪ Gris'}
            </Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={styles.modalDescription}>
                {jugadorActual ? getRoleDescription(jugadorActual.role, { team: jugadorActual.team, jugadores }) : ''}
              </Text>
            </ScrollView>
            <Text style={styles.modalHabitacion}>
              Habitación Inicial: {jugadorActual?.habitacion || 1}
            </Text>
            <TouchableOpacity style={styles.modalButton} onPress={cerrarRevelacionRol}>
              <Text style={styles.modalButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.gameHeader}>
        <View style={styles.headerRow}>
          <Text style={styles.roundText}>Ronda {rondaActual}/{rondasTotales}</Text>
          {tiempoRestante > 0 && (
            <Text style={styles.timerText}>⏱️ {formatTime(tiempoRestante)}</Text>
          )}
        </View>
        {jugadorActual && (
          <View style={styles.playerInfo}>
            <Text style={styles.currentPlayerText}>
              Jugador: {jugadorActual.name}
            </Text>
            <Text style={styles.currentHabitacionText}>
              Habitación: {habitacionJugador}
            </Text>
            {(esLider1 || esLider2) && (
              <Text style={styles.leaderBadge}>👑 LÍDER Habitación {esLider1 ? 1 : 2}</Text>
            )}
          </View>
        )}
        <TouchableOpacity style={styles.changePlayerButton} onPress={cambiarJugador}>
          <Text style={styles.changePlayerText}>Cambiar Jugador</Text>
        </TouchableOpacity>
      </View>

      {fase === 'eleccion_lider' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase: Elección de Líderes</Text>
          <Text style={styles.phaseDescription}>
            Cada habitación debe elegir un líder. Toca en un jugador de tu habitación para elegirlo como líder.
          </Text>
          
          <View style={styles.roomsContainer}>
            <View style={styles.roomCard}>
              <Text style={styles.roomTitle}>🏠 Habitación 1</Text>
              {liderHabitacion1 ? (
                <Text style={styles.leaderSelected}>
                  Líder: {jugadores.find(j => j.id === liderHabitacion1)?.name}
                </Text>
              ) : (
                <Text style={styles.leaderPending}>Sin líder</Text>
              )}
              <View style={styles.playersGrid}>
                {jugadoresHabitacion1.map((jugador) => (
                  <TouchableOpacity
                    key={jugador.id}
                    style={[
                      styles.playerCard,
                      liderHabitacion1 === jugador.id && styles.playerCardLeader,
                      jugador.id === jugadorActual?.id && styles.playerCardCurrent,
                    ]}
                    onPress={() => seleccionarLider(jugador.id, 1)}
                  >
                    <Text style={styles.playerName}>{jugador.name}</Text>
                    {liderHabitacion1 === jugador.id && <Text style={styles.leaderIcon}>👑</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.roomCard}>
              <Text style={styles.roomTitle}>🏠 Habitación 2</Text>
              {liderHabitacion2 ? (
                <Text style={styles.leaderSelected}>
                  Líder: {jugadores.find(j => j.id === liderHabitacion2)?.name}
                </Text>
              ) : (
                <Text style={styles.leaderPending}>Sin líder</Text>
              )}
              <View style={styles.playersGrid}>
                {jugadoresHabitacion2.map((jugador) => (
                  <TouchableOpacity
                    key={jugador.id}
                    style={[
                      styles.playerCard,
                      liderHabitacion2 === jugador.id && styles.playerCardLeader,
                      jugador.id === jugadorActual?.id && styles.playerCardCurrent,
                    ]}
                    onPress={() => seleccionarLider(jugador.id, 2)}
                  >
                    <Text style={styles.playerName}>{jugador.name}</Text>
                    {liderHabitacion2 === jugador.id && <Text style={styles.leaderIcon}>👑</Text>}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </View>
      )}

      {fase === 'seleccion_rehenes' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase: Selección de Rehenes</Text>
          <Text style={styles.phaseDescription}>
            Los líderes deben seleccionar {numRehenesNecesarios} rehén(es) para intercambiar.
          </Text>
          
          <View style={styles.roomsContainer}>
            <View style={styles.roomCard}>
              <Text style={styles.roomTitle}>🏠 Habitación 1</Text>
              {esLider1 ? (
                <>
                  <Text style={styles.selectedCount}>
                    Seleccionados: {rehenesHabitacion1.length}/{numRehenesNecesarios}
                  </Text>
                  <View style={styles.playersGrid}>
                    {jugadoresHabitacion1.map((jugador) => {
                      const esRehen = rehenesHabitacion1.includes(jugador.id);
                      return (
                        <TouchableOpacity
                          key={jugador.id}
                          style={[
                            styles.playerCard,
                            esRehen && styles.playerCardSelected,
                            jugador.id === jugadorActual?.id && styles.playerCardCurrent,
                          ]}
                          onPress={() => seleccionarRehen(jugador.id, 1)}
                        >
                          <Text style={styles.playerName}>{jugador.name}</Text>
                          {esRehen && <Text style={styles.selectedIcon}>✓</Text>}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {rehenesHabitacion1.length === numRehenesNecesarios && (
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => confirmarRehenes(1)}
                    >
                      <Text style={styles.confirmButtonText}>Confirmar Rehenes</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text style={styles.waitingText}>
                  Esperando a que {jugadores.find(j => j.id === liderHabitacion1)?.name} seleccione rehenes...
                </Text>
              )}
            </View>

            <View style={styles.roomCard}>
              <Text style={styles.roomTitle}>🏠 Habitación 2</Text>
              {esLider2 ? (
                <>
                  <Text style={styles.selectedCount}>
                    Seleccionados: {rehenesHabitacion2.length}/{numRehenesNecesarios}
                  </Text>
                  <View style={styles.playersGrid}>
                    {jugadoresHabitacion2.map((jugador) => {
                      const esRehen = rehenesHabitacion2.includes(jugador.id);
                      return (
                        <TouchableOpacity
                          key={jugador.id}
                          style={[
                            styles.playerCard,
                            esRehen && styles.playerCardSelected,
                            jugador.id === jugadorActual?.id && styles.playerCardCurrent,
                          ]}
                          onPress={() => seleccionarRehen(jugador.id, 2)}
                        >
                          <Text style={styles.playerName}>{jugador.name}</Text>
                          {esRehen && <Text style={styles.selectedIcon}>✓</Text>}
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                  {rehenesHabitacion2.length === numRehenesNecesarios && (
                    <TouchableOpacity
                      style={styles.confirmButton}
                      onPress={() => confirmarRehenes(2)}
                    >
                      <Text style={styles.confirmButtonText}>Confirmar Rehenes</Text>
                    </TouchableOpacity>
                  )}
                </>
              ) : (
                <Text style={styles.waitingText}>
                  Esperando a que {jugadores.find(j => j.id === liderHabitacion2)?.name} seleccione rehenes...
                </Text>
              )}
            </View>
          </View>
        </View>
      )}

      {fase === 'intercambio' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Intercambio Completado</Text>
          <Text style={styles.phaseDescription}>
            Los rehenes han sido intercambiados entre habitaciones.
          </Text>
        </View>
      )}

      {fase === 'revelacion' && estadoJuego === 'revealing' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase de Revelación</Text>
          <Text style={styles.phaseDescription}>
            Es hora de revelar los roles clave. Primero la Bomba, luego el Presidente.
          </Text>
          
          <View style={styles.revelationButtons}>
            {!bombaRevelada && (
              <TouchableOpacity
                style={[styles.revealButton, styles.revealButtonBomb]}
                onPress={() => revelarRol('bomba')}
                disabled={jugadorActual?.role !== 'bomba'}
              >
                <Text style={styles.revealButtonText}>
                  {jugadorActual?.role === 'bomba' ? '💣 Revelar: Soy la BOMBA' : 'Esperando a la Bomba...'}
                </Text>
              </TouchableOpacity>
            )}
            
            {bombaRevelada && !presidenteRevelado && (
              <TouchableOpacity
                style={[styles.revealButton, styles.revealButtonPresident]}
                onPress={() => revelarRol('presidente')}
                disabled={jugadorActual?.role !== 'presidente'}
              >
                <Text style={styles.revealButtonText}>
                  {jugadorActual?.role === 'presidente' ? '👔 Revelar: Soy el PRESIDENTE' : 'Esperando al Presidente...'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {estadoJuego === 'finished' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>¡Juego Terminado!</Text>
          <Text style={styles.phaseDescription}>
            {gameLog[gameLog.length - 1]?.message || 'El juego ha terminado.'}
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
    backgroundColor: '#0a0a0a',
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
    color: '#e94560',
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
    backgroundColor: '#1a1a2e',
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
    backgroundColor: '#e94560',
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
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  roundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffd700',
  },
  playerInfo: {
    marginBottom: 10,
  },
  currentPlayerText: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 5,
  },
  currentHabitacionText: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  leaderBadge: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffd700',
    marginTop: 5,
  },
  changePlayerButton: {
    backgroundColor: '#16213e',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
  },
  changePlayerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  phaseContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  phaseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e94560',
    marginBottom: 10,
  },
  phaseDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 15,
    lineHeight: 20,
  },
  roomsContainer: {
    gap: 15,
  },
  roomCard: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  roomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  leaderSelected: {
    fontSize: 14,
    color: '#ffd700',
    marginBottom: 10,
    fontWeight: '600',
  },
  leaderPending: {
    fontSize: 14,
    color: '#999',
    marginBottom: 10,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 10,
  },
  playerCard: {
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 12,
    minWidth: '30%',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerCardCurrent: {
    borderColor: '#e94560',
  },
  playerCardLeader: {
    borderColor: '#ffd700',
    backgroundColor: '#2a2a3e',
  },
  playerCardSelected: {
    borderColor: '#27ae60',
    backgroundColor: '#1a3a2a',
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  leaderIcon: {
    fontSize: 16,
    marginTop: 5,
  },
  selectedIcon: {
    fontSize: 20,
    color: '#27ae60',
    marginTop: 5,
  },
  selectedCount: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
    textAlign: 'center',
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  waitingText: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  revelationButtons: {
    gap: 15,
    marginTop: 15,
  },
  revealButton: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  revealButtonBomb: {
    backgroundColor: '#e74c3c',
  },
  revealButtonPresident: {
    backgroundColor: '#3498db',
  },
  revealButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  gameLogContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    maxHeight: 200,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#1a1a2e',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e94560',
    textAlign: 'center',
    marginBottom: 15,
  },
  modalRoleName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalTeam: {
    fontSize: 16,
    color: '#ccc',
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
  modalHabitacion: {
    fontSize: 14,
    color: '#ffd700',
    textAlign: 'center',
    marginBottom: 15,
    fontWeight: '600',
  },
  modalButton: {
    backgroundColor: '#e94560',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    backgroundColor: '#e94560',
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

