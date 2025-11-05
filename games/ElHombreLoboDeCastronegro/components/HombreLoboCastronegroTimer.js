import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HombreLoboCastronegroTimer = ({ endTime, onTimeUp, label = 'Tiempo restante' }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    if (!endTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
      setTimeRemaining(remaining);

      if (remaining === 0 && onTimeUp) {
        onTimeUp();
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [endTime, onTimeUp]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    // Asumiendo un tiempo máximo de 180 segundos (3 minutos)
    const maxTime = 180;
    return Math.min(timeRemaining / maxTime, 1);
  };

  const getColor = () => {
    if (timeRemaining > 60) return '#4caf50';
    if (timeRemaining > 30) return '#FFA500';
    return '#f44336';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.timerContainer}>
        <View style={[styles.progressBar, { width: `${getProgress() * 100}%`, backgroundColor: getColor() }]} />
        <Text style={[styles.timerText, { color: getColor() }]}>
          {formatTime(timeRemaining)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
    marginVertical: 10,
  },
  label: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 8,
    textAlign: 'center',
  },
  timerContainer: {
    height: 40,
    backgroundColor: '#0f1624',
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  progressBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    height: '100%',
    opacity: 0.3,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
    zIndex: 1,
  },
});

