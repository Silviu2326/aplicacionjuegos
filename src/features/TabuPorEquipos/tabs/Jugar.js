import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated, TextInput } from 'react-native';
import { TabuPorEquiposCard } from '../components/Card';
import { TabuPorEquiposTimer } from '../components/Timer';
import { TabuPorEquiposHUD } from '../components/HUD';
import { getRandomCard } from '../constants/TabuPorEquiposData';

export const TabuPorEquiposJugar = () => {
  // Estado de equipos
  const [equipo1, setEquipo1] = useState({ nombre: 'Equipo 1', puntuacion: 0 });
  const [equipo2, setEquipo2] = useState({ nombre: 'Equipo 2', puntuacion: 0 });
  
  // Estado del juego
  const [equipoActual, setEquipoActual] = useState(1);
  const [rondaActual, setRondaActual] = useState(1);
  const [rondasTotales, setRondasTotales] = useState(5);
  const [tiempoRonda, setTiempoRonda] = useState(60);
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  
  // Estado de la tarjeta actual
  const [tarjetaActual, setTarjetaActual] = useState(null);
  const [tarjetasUsadas, setTarjetasUsadas] = useState([]);
  
  // Estadísticas de la ronda
  const [palabrasAdivinadas, setPalabrasAdivinadas] = useState(0);
  const [palabrasTabu, setPalabrasTabu] = useState(0);
  const [palabrasPasadas, setPalabrasPasadas] = useState(0);
  
  // Estado del juego
  const [estadoJuego, setEstadoJuego] = useState('config'); // config, preparando, jugando, pausado, finalizado
  
  const [fadeAnim] = useState(new Animated.Value(0));

  // Configuración inicial
  const [nombreEquipo1, setNombreEquipo1] = useState('Equipo 1');
  const [nombreEquipo2, setNombreEquipo2] = useState('Equipo 2');
  const [configurado, setConfigurado] = useState(false);

  // Timer effect
  useEffect(() => {
    if (isRunning && tiempoRestante > 0 && estadoJuego === 'jugando') {
      const interval = setInterval(() => {
        setTiempoRestante((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            handleTiempoAgotado();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isRunning, tiempoRestante, estadoJuego]);

  // Efecto de animación cuando cambia la tarjeta
  useEffect(() => {
    if (tarjetaActual) {
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }).start();
    }
  }, [tarjetaActual]);

  const obtenerNuevaTarjeta = () => {
    const nuevaTarjeta = getRandomCard();
    setTarjetaActual(nuevaTarjeta);
    setTarjetasUsadas([...tarjetasUsadas, nuevaTarjeta]);
    return nuevaTarjeta;
  };

  const iniciarConfiguracion = () => {
    setEquipo1({ nombre: nombreEquipo1, puntuacion: 0 });
    setEquipo2({ nombre: nombreEquipo2, puntuacion: 0 });
    setConfigurado(true);
    setEstadoJuego('preparando');
    setRondaActual(1);
    setEquipoActual(1);
    resetearEstadisticasRonda();
  };

  const iniciarRonda = () => {
    if (!tarjetaActual) {
      obtenerNuevaTarjeta();
    }
    setEstadoJuego('jugando');
    setIsRunning(true);
    setTiempoRestante(tiempoRonda);
  };

  const pausarRonda = () => {
    setIsRunning(false);
    setEstadoJuego('pausado');
  };

  const reanudarRonda = () => {
    if (tiempoRestante > 0) {
      setIsRunning(true);
      setEstadoJuego('jugando');
    }
  };

  const finalizarRonda = () => {
    setIsRunning(false);
    setEstadoJuego('finalizado');
    
    const equipo = equipoActual === 1 ? equipo1 : equipo2;
    const nuevaPuntuacion = palabrasAdivinadas - palabrasTabu;
    
    Alert.alert(
      `⏰ Ronda Finalizada`,
      `${equipo.nombre}:\n✅ Aciertos: ${palabrasAdivinadas}\n🚫 Tabú: ${palabrasTabu}\n⏭️ Pasadas: ${palabrasPasadas}\n\nPuntos: ${nuevaPuntuacion > 0 ? '+' : ''}${nuevaPuntuacion}`,
      [
        { text: 'Continuar', onPress: cambiarTurno },
      ]
    );
  };

  const cambiarTurno = () => {
    const nuevoEquipo = equipoActual === 1 ? 2 : 1;
    const nuevaRonda = equipoActual === 2 ? rondaActual + 1 : rondaActual;
    
    if (nuevaRonda > rondasTotales) {
      finalizarJuego();
    } else {
      setEquipoActual(nuevoEquipo);
      if (nuevoEquipo === 1) {
        setRondaActual(nuevaRonda);
      }
      resetearEstadisticasRonda();
      setTarjetaActual(null);
      setEstadoJuego('preparando');
      setTiempoRestante(tiempoRonda);
      setIsRunning(false);
    }
  };

  const finalizarJuego = () => {
    const ganador = equipo1.puntuacion > equipo2.puntuacion ? equipo1 : 
                   equipo2.puntuacion > equipo1.puntuacion ? equipo2 : null;
    
    Alert.alert(
      '🎉 ¡Juego Finalizado!',
      ganador 
        ? `🏆 ${ganador.nombre} gana con ${ganador.puntuacion} puntos!\n\n${equipo1.nombre}: ${equipo1.puntuacion} puntos\n${equipo2.nombre}: ${equipo2.puntuacion} puntos`
        : `🤝 ¡Empate!\n\n${equipo1.nombre}: ${equipo1.puntuacion} puntos\n${equipo2.nombre}: ${equipo2.puntuacion} puntos`,
      [
        { 
          text: 'Nueva Partida', 
          onPress: resetearJuego 
        },
        { 
          text: 'Ver Historial', 
          style: 'cancel' 
        },
      ]
    );
  };

  const resetearJuego = () => {
    setEquipo1({ nombre: nombreEquipo1, puntuacion: 0 });
    setEquipo2({ nombre: nombreEquipo2, puntuacion: 0 });
    setRondaActual(1);
    setEquipoActual(1);
    setEstadoJuego('preparando');
    resetearEstadisticasRonda();
    setTarjetaActual(null);
    setTarjetasUsadas([]);
    setTiempoRestante(tiempoRonda);
    setIsRunning(false);
  };

  const resetearEstadisticasRonda = () => {
    setPalabrasAdivinadas(0);
    setPalabrasTabu(0);
    setPalabrasPasadas(0);
  };

  const handleAcierto = () => {
    if (!tarjetaActual) return;
    
    if (equipoActual === 1) {
      setEquipo1({ ...equipo1, puntuacion: equipo1.puntuacion + 1 });
    } else {
      setEquipo2({ ...equipo2, puntuacion: equipo2.puntuacion + 1 });
    }
    
    setPalabrasAdivinadas(palabrasAdivinadas + 1);
    obtenerNuevaTarjeta();
  };

  const handleTabu = () => {
    if (!tarjetaActual) return;
    
    if (equipoActual === 1) {
      setEquipo1({ ...equipo1, puntuacion: Math.max(0, equipo1.puntuacion - 1) });
    } else {
      setEquipo2({ ...equipo2, puntuacion: Math.max(0, equipo2.puntuacion - 1) });
    }
    
    setPalabrasTabu(palabrasTabu + 1);
    obtenerNuevaTarjeta();
  };

  const handlePasar = () => {
    if (!tarjetaActual) return;
    setPalabrasPasadas(palabrasPasadas + 1);
    obtenerNuevaTarjeta();
  };

  const handleTiempoAgotado = () => {
    setIsRunning(false);
    finalizarRonda();
  };

  // Actualizar equipos cuando cambian los nombres
  useEffect(() => {
    if (configurado) {
      setEquipo1({ nombre: nombreEquipo1, puntuacion: equipo1.puntuacion });
      setEquipo2({ nombre: nombreEquipo2, puntuacion: equipo2.puntuacion });
    }
  }, [nombreEquipo1, nombreEquipo2]);

  if (!configurado) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.configContainer}>
          <Text style={styles.configTitle}>⚙️ Configuración del Juego</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre del Equipo 1</Text>
            <TextInput
              style={styles.textInput}
              value={nombreEquipo1}
              onChangeText={setNombreEquipo1}
              placeholder="Introduce el nombre del equipo 1"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nombre del Equipo 2</Text>
            <TextInput
              style={styles.textInput}
              value={nombreEquipo2}
              onChangeText={setNombreEquipo2}
              placeholder="Introduce el nombre del equipo 2"
              placeholderTextColor="#999"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>⏱️ Tiempo por Ronda (segundos)</Text>
            <View style={styles.timeButtons}>
              {[30, 60, 90, 120].map((tiempo) => (
                <TouchableOpacity
                  key={tiempo}
                  style={[
                    styles.timeButton,
                    tiempoRonda === tiempo && styles.timeButtonActive,
                  ]}
                  onPress={() => {
                    setTiempoRonda(tiempo);
                    setTiempoRestante(tiempo);
                  }}
                >
                  <Text
                    style={[
                      styles.timeButtonText,
                      tiempoRonda === tiempo && styles.timeButtonTextActive,
                    ]}
                  >
                    {tiempo}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>🎯 Número de Rondas</Text>
            <View style={styles.timeButtons}>
              {[3, 5, 7, 10].map((rondas) => (
                <TouchableOpacity
                  key={rondas}
                  style={[
                    styles.timeButton,
                    rondasTotales === rondas && styles.timeButtonActive,
                  ]}
                  onPress={() => setRondasTotales(rondas)}
                >
                  <Text
                    style={[
                      styles.timeButtonText,
                      rondasTotales === rondas && styles.timeButtonTextActive,
                    ]}
                  >
                    {rondas}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <TouchableOpacity
            style={styles.startGameButton}
            onPress={iniciarConfiguracion}
          >
            <Text style={styles.startGameButtonText}>
              🎮 Iniciar Juego
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TabuPorEquiposHUD
        equipo1={equipo1}
        equipo2={equipo2}
        equipoActual={equipoActual}
        rondaActual={rondaActual}
        rondasTotales={rondasTotales}
        palabrasAdivinadas={palabrasAdivinadas}
        palabrasTabu={palabrasTabu}
        palabrasPasadas={palabrasPasadas}
      />

      {estadoJuego === 'jugando' && (
        <TabuPorEquiposTimer
          timeRemaining={tiempoRestante}
          totalTime={tiempoRonda}
          isRunning={isRunning}
          onComplete={handleTiempoAgotado}
        />
      )}

      {estadoJuego === 'preparando' && (
        <View style={styles.preparandoContainer}>
          <Text style={styles.preparandoText}>
            👤 {equipoActual === 1 ? equipo1.nombre : equipo2.nombre} - Preparados
          </Text>
          <Text style={styles.preparandoSubtext}>
            Presiona "Iniciar Ronda" cuando estés listo
          </Text>
        </View>
      )}

      {tarjetaActual && (
        <Animated.View style={{ opacity: fadeAnim }}>
          <TabuPorEquiposCard
            palabra={tarjetaActual.palabra}
            tabu={tarjetaActual.tabu}
          />
        </Animated.View>
      )}

      <View style={styles.controlsContainer}>
        {estadoJuego === 'preparando' && (
          <TouchableOpacity
            style={styles.controlButton}
            onPress={() => {
              obtenerNuevaTarjeta();
              iniciarRonda();
            }}
          >
            <Text style={styles.controlButtonText}>
              ▶️ Iniciar Ronda
            </Text>
          </TouchableOpacity>
        )}

        {estadoJuego === 'jugando' && (
          <>
            <View style={styles.gameButtonsRow}>
              <TouchableOpacity
                style={[styles.gameButton, styles.aciertoButton]}
                onPress={handleAcierto}
              >
                <Text style={styles.gameButtonText}>✅ Acierto</Text>
                <Text style={styles.gameButtonSubtext}>+1 punto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.gameButton, styles.tabuButton]}
                onPress={handleTabu}
              >
                <Text style={styles.gameButtonText}>🚫 Tabú</Text>
                <Text style={styles.gameButtonSubtext}>-1 punto</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.gameButton, styles.pasarButton]}
                onPress={handlePasar}
              >
                <Text style={styles.gameButtonText}>⏭️ Pasar</Text>
                <Text style={styles.gameButtonSubtext}>Sin puntos</Text>
              </TouchableOpacity>
            </View>

            {isRunning ? (
              <TouchableOpacity
                style={[styles.controlButton, styles.pauseButton]}
                onPress={pausarRonda}
              >
                <Text style={styles.controlButtonText}>⏸️ Pausar</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.controlButton, styles.resumeButton]}
                onPress={reanudarRonda}
              >
                <Text style={styles.controlButtonText}>▶️ Reanudar</Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={[styles.controlButton, styles.finishButton]}
              onPress={finalizarRonda}
            >
              <Text style={styles.controlButtonText}>⏹️ Finalizar Ronda</Text>
            </TouchableOpacity>
          </>
        )}

        {estadoJuego === 'pausado' && (
          <TouchableOpacity
            style={[styles.controlButton, styles.resumeButton]}
            onPress={reanudarRonda}
          >
            <Text style={styles.controlButtonText}>▶️ Reanudar Ronda</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.controlButton, styles.resetButton]}
          onPress={() => {
            Alert.alert(
              '🔄 Reiniciar Partida',
              '¿Estás seguro de que quieres reiniciar? Se perderán todos los datos.',
              [
                { text: 'Cancelar', style: 'cancel' },
                { text: 'Reiniciar', style: 'destructive', onPress: resetearJuego },
              ]
            );
          }}
        >
          <Text style={styles.controlButtonText}>🔄 Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  configContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  configTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#C0392B',
    marginBottom: 25,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  textInput: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '600',
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  timeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ECECEC',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeButtonActive: {
    backgroundColor: '#E74C3C',
    borderColor: '#C0392B',
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  timeButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  startGameButton: {
    backgroundColor: '#27AE60',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startGameButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  preparandoContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  preparandoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  preparandoSubtext: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  controlsContainer: {
    marginTop: 20,
    gap: 12,
  },
  controlButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: '#F39C12',
  },
  resumeButton: {
    backgroundColor: '#27AE60',
  },
  finishButton: {
    backgroundColor: '#E74C3C',
  },
  resetButton: {
    backgroundColor: '#95A5A6',
    marginTop: 10,
  },
  gameButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 12,
  },
  gameButton: {
    flex: 1,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  aciertoButton: {
    backgroundColor: '#27AE60',
  },
  tabuButton: {
    backgroundColor: '#E74C3C',
  },
  pasarButton: {
    backgroundColor: '#F39C12',
  },
  gameButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  gameButtonSubtext: {
    color: '#ffffff',
    fontSize: 11,
    opacity: 0.9,
  },
});

