import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { SuperheroeEnApurosCard } from '../components/Card';
import { SuperheroeEnApurosTimer } from '../components/Timer';
import { SuperheroeEnApurosHUD } from '../components/HUD';
import { generateMission, generateHeroName } from '../constants/SuperheroeEnApurosData';

export const SuperheroeEnApurosJugar = () => {
  const [puntuacion, setPuntuacion] = useState(0);
  const [rondas, setRondas] = useState(0);
  const [mejorRacha, setMejorRacha] = useState(0);
  const [rachaActual, setRachaActual] = useState(0);
  const [misionActual, setMisionActual] = useState(null);
  const [nombreHeroe, setNombreHeroe] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState(60);
  const [tiempoTotal, setTiempoTotal] = useState(60);
  const [isRunning, setIsRunning] = useState(false);
  const [estadoJuego, setEstadoJuego] = useState('idle'); // idle, playing, voting, finished
  const [modoVotacion, setModoVotacion] = useState(false);
  const [votos, setVotos] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isRunning && tiempoRestante > 0) {
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
  }, [isRunning, tiempoRestante]);

  const generarNuevaMision = () => {
    const nuevaMision = generateMission();
    const nombre = generateHeroName(nuevaMision.poder);
    
    setMisionActual(nuevaMision);
    setNombreHeroe(nombre);
    setTiempoRestante(tiempoTotal);
    setIsRunning(false);
    setEstadoJuego('idle');
    setVotos(0);
    
    // Animación de entrada
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const iniciarNarracion = () => {
    if (!misionActual) {
      generarNuevaMision();
    }
    setIsRunning(true);
    setEstadoJuego('playing');
  };

  const pausarNarracion = () => {
    setIsRunning(false);
  };

  const reanudarNarracion = () => {
    if (tiempoRestante > 0) {
      setIsRunning(true);
    }
  };

  const finalizarNarracion = () => {
    setIsRunning(false);
    if (modoVotacion) {
      setEstadoJuego('voting');
    } else {
      setEstadoJuego('finished');
      setRondas(rondas + 1);
    }
  };

  const handleTiempoAgotado = () => {
    setIsRunning(false);
    Alert.alert(
      '⏰ Tiempo Agotado',
      'El tiempo se ha acabado. ¿Quieres finalizar esta narración?',
      [
        { text: 'Continuar', onPress: finalizarNarracion },
        { text: 'Nueva Misión', onPress: () => {
          setRondas(rondas + 1);
          generarNuevaMision();
        }},
      ]
    );
  };

  const votarPorHistoria = () => {
    const nuevosVotos = votos + 1;
    setVotos(nuevosVotos);
    setPuntuacion(puntuacion + 1);
    const nuevaRacha = rachaActual + 1;
    setRachaActual(nuevaRacha);
    if (nuevaRacha > mejorRacha) {
      setMejorRacha(nuevaRacha);
    }
    
    Alert.alert(
      '✅ Voto Registrado',
      `¡Historia increíble! Tienes ${nuevosVotos} votos.`,
      [
        { text: 'Continuar', onPress: () => {
          setEstadoJuego('finished');
          setRondas(rondas + 1);
        }},
      ]
    );
  };

  const cambiarTiempo = (nuevoTiempo) => {
    setTiempoTotal(nuevoTiempo);
    setTiempoRestante(nuevoTiempo);
    setIsRunning(false);
  };

  const resetearPartida = () => {
    Alert.alert(
      '🔄 Reiniciar Partida',
      '¿Estás seguro de que quieres reiniciar? Se perderán todos los datos de la partida actual.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            setPuntuacion(0);
            setRondas(0);
            setMejorRacha(0);
            setRachaActual(0);
            setMisionActual(null);
            setNombreHeroe(null);
            setTiempoRestante(tiempoTotal);
            setIsRunning(false);
            setEstadoJuego('idle');
            setVotos(0);
            fadeAnim.setValue(0);
          },
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SuperheroeEnApurosHUD
        puntuacion={puntuacion}
        rondas={rondas}
        mejorRacha={mejorRacha}
        modoVotacion={modoVotacion}
      />

      {/* Selector de tiempo */}
      <View style={styles.timeSelector}>
        <Text style={styles.timeSelectorLabel}>⏱️ Duración de Narración:</Text>
        <View style={styles.timeButtons}>
          {[30, 60, 90, 120].map((tiempo) => (
            <TouchableOpacity
              key={tiempo}
              style={[
                styles.timeButton,
                tiempoTotal === tiempo && styles.timeButtonActive,
              ]}
              onPress={() => cambiarTiempo(tiempo)}
            >
              <Text
                style={[
                  styles.timeButtonText,
                  tiempoTotal === tiempo && styles.timeButtonTextActive,
                ]}
              >
                {tiempo}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Toggle de modo votación */}
      <View style={styles.votacionToggle}>
        <Text style={styles.votacionToggleLabel}>🗳️ Modo Votación:</Text>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            modoVotacion && styles.toggleButtonActive,
          ]}
          onPress={() => setModoVotacion(!modoVotacion)}
        >
          <Text
            style={[
              styles.toggleButtonText,
              modoVotacion && styles.toggleButtonTextActive,
            ]}
          >
            {modoVotacion ? 'Activado' : 'Desactivado'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Timer */}
      {estadoJuego === 'playing' && (
        <SuperheroeEnApurosTimer
          timeRemaining={tiempoRestante}
          totalTime={tiempoTotal}
          isRunning={isRunning}
          onComplete={handleTiempoAgotado}
        />
      )}

      {/* Misión actual */}
      {misionActual && (
        <Animated.View style={{ opacity: fadeAnim }}>
          {nombreHeroe && (
            <View style={styles.heroNameContainer}>
              <Text style={styles.heroNameLabel}>Tu nombre de superhéroe:</Text>
              <Text style={styles.heroName}>{nombreHeroe}</Text>
            </View>
          )}

          <SuperheroeEnApurosCard
            title="⚡ TU SUPER PODER"
            description={misionActual.poder}
            type="power"
          />

          <SuperheroeEnApurosCard
            title="🚨 TU PROBLEMA"
            description={misionActual.problema}
            type="problem"
          />

          {estadoJuego === 'voting' && (
            <View style={styles.votingContainer}>
              <Text style={styles.votingTitle}>🗳️ Votación</Text>
              <Text style={styles.votingText}>
                ¿Los demás jugadores votan por tu historia?
              </Text>
              <View style={styles.votingStats}>
                <Text style={styles.votingStatsText}>
                  Votos recibidos: {votos}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.voteButton}
                onPress={votarPorHistoria}
              >
                <Text style={styles.voteButtonText}>
                  +1 Voto
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      )}

      {/* Controles de juego */}
      <View style={styles.controlsContainer}>
        {estadoJuego === 'idle' && !misionActual && (
          <TouchableOpacity
            style={styles.generateButton}
            onPress={generarNuevaMision}
          >
            <Text style={styles.generateButtonText}>
              🎲 Generar Misión
            </Text>
          </TouchableOpacity>
        )}

        {misionActual && estadoJuego === 'idle' && (
          <TouchableOpacity
            style={styles.startButton}
            onPress={iniciarNarracion}
          >
            <Text style={styles.startButtonText}>
              ▶️ Iniciar Narración
            </Text>
          </TouchableOpacity>
        )}

        {estadoJuego === 'playing' && (
          <>
            {isRunning ? (
              <TouchableOpacity
                style={styles.pauseButton}
                onPress={pausarNarracion}
              >
                <Text style={styles.pauseButtonText}>
                  ⏸️ Pausar
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.resumeButton}
                onPress={reanudarNarracion}
              >
                <Text style={styles.resumeButtonText}>
                  ▶️ Reanudar
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.finishButton}
              onPress={finalizarNarracion}
            >
              <Text style={styles.finishButtonText}>
                ✅ Finalizar Narración
              </Text>
            </TouchableOpacity>
          </>
        )}

        {estadoJuego === 'finished' && (
          <>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={generarNuevaMision}
            >
              <Text style={styles.nextButtonText}>
                ➡️ Siguiente Misión
              </Text>
            </TouchableOpacity>

            {modoVotacion && (
              <TouchableOpacity
                style={styles.voteButtonLarge}
                onPress={() => setEstadoJuego('voting')}
              >
                <Text style={styles.voteButtonLargeText}>
                  🗳️ Abrir Votación
                </Text>
              </TouchableOpacity>
            )}
          </>
        )}

        {estadoJuego === 'voting' && (
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => {
              setEstadoJuego('finished');
              setRondas(rondas + 1);
            }}
          >
            <Text style={styles.nextButtonText}>
              ➡️ Continuar
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.resetButton}
          onPress={resetearPartida}
        >
          <Text style={styles.resetButtonText}>
            🔄 Reiniciar Partida
          </Text>
        </TouchableOpacity>
      </View>

      {/* Instrucciones rápidas */}
      {!misionActual && (
        <View style={styles.instructionsBox}>
          <Text style={styles.instructionsTitle}>📖 Cómo Jugar</Text>
          <Text style={styles.instructionsText}>
            1. Presiona "Generar Misión" para obtener tu poder y problema{'\n'}
            2. Presiona "Iniciar Narración" y cuenta cómo resolverías el problema{'\n'}
            3. ¡Sé creativo y diviértete! 🎭
          </Text>
        </View>
      )}
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
  },
  timeSelector: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  timeSelectorLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  timeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  timeButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  timeButtonActive: {
    backgroundColor: '#9B59B6',
  },
  timeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  timeButtonTextActive: {
    color: '#ffffff',
  },
  votacionToggle: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  votacionToggleLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
  },
  toggleButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#ecf0f1',
  },
  toggleButtonActive: {
    backgroundColor: '#9B59B6',
  },
  toggleButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
  },
  toggleButtonTextActive: {
    color: '#ffffff',
  },
  heroNameContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  heroNameLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  heroName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  votingContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  votingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
    textAlign: 'center',
  },
  votingText: {
    fontSize: 16,
    color: '#34495e',
    marginBottom: 15,
    textAlign: 'center',
  },
  votingStats: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  votingStatsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  voteButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  voteButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  controlsContainer: {
    marginTop: 20,
    gap: 10,
  },
  generateButton: {
    backgroundColor: '#9B59B6',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  generateButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#27AE60',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  pauseButton: {
    backgroundColor: '#F39C12',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  pauseButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resumeButton: {
    backgroundColor: '#27AE60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  resumeButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#E74C3C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: '#3498DB',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  nextButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  voteButtonLarge: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  voteButtonLargeText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#95A5A6',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsBox: {
    backgroundColor: '#E8F4F8',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#3498DB',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 14,
    color: '#34495e',
    lineHeight: 22,
  },
});

