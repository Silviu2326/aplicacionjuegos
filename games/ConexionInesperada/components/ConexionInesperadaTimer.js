import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ConexionInesperadaTimer = ({ timeRemaining, phase }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPhaseText = () => {
    switch (phase) {
      case 'writing':
        return '⏱️ Tiempo para escribir';
      case 'voting':
        return '🗳️ Tiempo para votar';
      default:
        return '⏱️ Tiempo restante';
    }
  };

  const getPhaseEmoji = () => {
    switch (phase) {
      case 'writing':
        return '✍️';
      case 'voting':
        return '🗳️';
      default:
        return '⏱️';
    }
  };

  const getColor = () => {
    if (timeRemaining <= 10) return '#f44336';
    if (timeRemaining <= 30) return '#ff9800';
    return '#4CAF50';
  };

  const getBackgroundColor = () => {
    if (timeRemaining <= 10) return '#ffebee';
    if (timeRemaining <= 30) return '#fff3e0';
    return '#e8f5e9';
  };

  const getProgress = () => {
    // Calcular progreso basado en el tiempo inicial (estimado)
    const maxTime = phase === 'writing' ? 90 : 30;
    return Math.max(0, (timeRemaining / maxTime) * 100);
  };

  const isUrgent = timeRemaining <= 10;

  return (
    <View style={styles.container}>
      <Text style={styles.phaseText}>{getPhaseText()}</Text>
      <View style={[
        styles.timerContainer,
        { backgroundColor: getBackgroundColor() }
      ]}>
        <View style={styles.timerCircleContainer}>
          <View style={[
            styles.timerCircle,
            { borderColor: getColor() },
            isUrgent && styles.timerCircleUrgent
          ]}>
            <Text style={styles.timerEmoji}>{getPhaseEmoji()}</Text>
            <Text style={[styles.timerText, { color: getColor() }]}>
              {formatTime(timeRemaining)}
            </Text>
            {isUrgent && (
              <Text style={styles.urgentText}>¡Apúrate!</Text>
            )}
          </View>
          <View style={styles.progressRing}>
            <View style={[
              styles.progressFill,
              {
                width: `${getProgress()}%`,
                backgroundColor: getColor(),
              }
            ]} />
          </View>
        </View>
        {timeRemaining > 10 && (
          <Text style={[styles.timeHint, { color: getColor() }]}>
            {timeRemaining <= 30 ? 'Tiempo limitado' : 'Todo bajo control'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  phaseText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 12,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  timerContainer: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minWidth: 200,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  timerCircleContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  timerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  timerCircleUrgent: {
    borderWidth: 6,
    shadowColor: '#f44336',
    shadowOpacity: 0.4,
  },
  timerEmoji: {
    fontSize: 24,
    marginBottom: 4,
  },
  timerText: {
    fontSize: 26,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  urgentText: {
    fontSize: 10,
    color: '#f44336',
    fontWeight: 'bold',
    marginTop: 2,
    letterSpacing: 0.5,
  },
  progressRing: {
    position: 'absolute',
    bottom: -5,
    width: 110,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  timeHint: {
    fontSize: 12,
    fontWeight: '500',
    fontStyle: 'italic',
    marginTop: 4,
  },
});

