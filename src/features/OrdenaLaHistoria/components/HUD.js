import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const OrdenaLaHistoriaHUD = ({ 
  puntuacion, 
  ronda, 
  vidas, 
  dificultad, 
  onDificultadChange,
  tiempoRestante,
  tiempoTotal,
}) => {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  const tiempoFormateado = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  const porcentajeTiempo = tiempoTotal > 0 ? (tiempoRestante / tiempoTotal) * 100 : 0;
  const isLowTime = tiempoRestante <= 60;
  const isCriticalTime = tiempoRestante <= 30;

  const getTimerColor = () => {
    if (isCriticalTime) return '#E74C3C';
    if (isLowTime) return '#F39C12';
    return '#2ECC71';
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Puntuación</Text>
          <Text style={styles.statValue}>{puntuacion}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Ronda</Text>
          <Text style={styles.statValue}>{ronda}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Vidas</Text>
          <View style={styles.livesContainer}>
            {[...Array(3)].map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.lifeIcon,
                  index >= vidas && styles.lifeIconEmpty,
                ]}
              >
                ❤️
              </Text>
            ))}
          </View>
        </View>
      </View>

      {tiempoRestante !== undefined && tiempoTotal !== undefined && (
        <View style={styles.timerContainer}>
          <Text style={styles.timerLabel}>Tiempo Restante</Text>
          <View style={[styles.timerCircle, { borderColor: getTimerColor() }]}>
            <Text style={[styles.timerText, { color: getTimerColor() }]}>
              {tiempoFormateado}
            </Text>
            <View
              style={[
                styles.timerProgress,
                {
                  height: `${porcentajeTiempo}%`,
                  backgroundColor: getTimerColor(),
                },
              ]}
            />
          </View>
          {isLowTime && (
            <Text style={[styles.timerWarning, { color: getTimerColor() }]}>
              {isCriticalTime ? '¡Tiempo crítico!' : '¡Poco tiempo!'}
            </Text>
          )}
        </View>
      )}

      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyLabel}>Dificultad:</Text>
        <View style={styles.difficultyButtons}>
          {['facil', 'normal', 'dificil'].map((diff) => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.difficultyButton,
                dificultad === diff && styles.difficultyButtonActive,
              ]}
              onPress={() => onDificultadChange && onDificultadChange(diff)}
            >
              <Text
                style={[
                  styles.difficultyButtonText,
                  dificultad === diff && styles.difficultyButtonTextActive,
                ]}
              >
                {diff === 'facil' ? 'Fácil' : diff === 'normal' ? 'Normal' : 'Difícil'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  livesContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  lifeIcon: {
    fontSize: 20,
  },
  lifeIconEmpty: {
    opacity: 0.3,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  timerLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  timerCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    zIndex: 1,
  },
  timerProgress: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    opacity: 0.2,
    zIndex: 0,
  },
  timerWarning: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  difficultyContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 15,
  },
  difficultyLabel: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
    fontWeight: '600',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  difficultyButton: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#4ECDC4',
  },
  difficultyButtonText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
});

