import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const InsiderTimerDisplay = ({ timeRemaining, label = 'Tiempo restante' }) => {
  const formatTime = (milliseconds) => {
    if (!milliseconds || milliseconds < 0) return '00:00';
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const getProgressColor = () => {
    if (!timeRemaining) return '#4CAF50';
    
    const totalSeconds = Math.floor(timeRemaining / 1000);
    const totalMinutes = Math.floor(totalSeconds / 60);
    
    if (totalMinutes < 1) return '#f44336'; // Rojo cuando queda menos de 1 minuto
    if (totalMinutes < 2) return '#ff9800'; // Naranja cuando queda menos de 2 minutos
    return '#4CAF50'; // Verde cuando hay más tiempo
  };

  const progressColor = getProgressColor();
  const formattedTime = formatTime(timeRemaining);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.timerContainer, { borderColor: progressColor }]}>
        <Text style={[styles.timerText, { color: progressColor }]}>
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  timerContainer: {
    borderWidth: 3,
    borderRadius: 50,
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

