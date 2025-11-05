import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EntrevistadorInesperadoTimer = ({ timeRemaining, label }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimeColor = () => {
    if (timeRemaining <= 30) return '#f44336';
    if (timeRemaining <= 60) return '#ff9800';
    return '#4caf50';
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={[styles.timerCircle, { borderColor: getTimeColor() }]}>
        <Text style={[styles.timerText, { color: getTimeColor() }]}>
          {formatTime(timeRemaining)}
        </Text>
      </View>
      {timeRemaining <= 30 && (
        <Text style={styles.warningText}>¡Tiempo casi agotado!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    fontWeight: '600',
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  warningText: {
    marginTop: 10,
    fontSize: 14,
    color: '#f44336',
    fontWeight: '600',
  },
});

