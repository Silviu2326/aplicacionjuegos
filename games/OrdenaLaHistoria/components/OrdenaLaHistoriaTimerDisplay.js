import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const OrdenaLaHistoriaTimerDisplay = ({ timeRemaining, totalTime }) => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const progress = totalTime > 0 ? timeRemaining / totalTime : 0;
  const isLowTime = timeRemaining <= 60; // Menos de 1 minuto
  const isCriticalTime = timeRemaining <= 30; // Menos de 30 segundos

  const getTimerColor = () => {
    if (isCriticalTime) return '#E74C3C';
    if (isLowTime) return '#F39C12';
    return '#2ECC71';
  };

  return (
    <View style={styles.container}>
      <View style={[styles.timerCircle, { borderColor: getTimerColor() }]}>
        <Text style={[styles.timerText, { color: getTimerColor() }]}>{formattedTime}</Text>
        <View
          style={[
            styles.progressBar,
            {
              width: `${progress * 100}%`,
              backgroundColor: getTimerColor(),
            },
          ]}
        />
      </View>
      {isLowTime && (
        <Text style={styles.warningText}>
          {isCriticalTime ? '¡Tiempo crítico!' : '¡Poco tiempo!'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 16,
  },
  timerCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,
  },
  progressBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    height: '100%',
    opacity: 0.2,
    zIndex: 0,
  },
  warningText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#E74C3C',
    textTransform: 'uppercase',
  },
});
