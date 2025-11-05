import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MaestroDelAcronimoTimer = ({ 
  timeRemaining, 
  totalTime, 
  phase = 'writing' // 'writing' o 'voting'
}) => {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timeString = `${minutes}:${seconds.toString().padStart(2, '0')}`;

  const getPhaseText = () => {
    return phase === 'writing' ? 'Tiempo para escribir' : 'Tiempo para votar';
  };

  const getColor = () => {
    if (percentage > 50) return '#4CAF50';
    if (percentage > 25) return '#ff9800';
    return '#f44336';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.phaseText}>{getPhaseText()}</Text>
      <View style={styles.timerContainer}>
        <View style={styles.timeDisplay}>
          <Text style={[styles.timeText, { color: getColor() }]}>
            {timeString}
          </Text>
        </View>
        <View style={styles.barContainer}>
          <View 
            style={[
              styles.bar, 
              { 
                width: `${percentage}%`,
                backgroundColor: getColor(),
              }
            ]} 
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  phaseText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
  },
  timerContainer: {
    alignItems: 'center',
  },
  timeDisplay: {
    marginBottom: 12,
  },
  timeText: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  barContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: 4,
    transition: 'width 1s ease',
  },
});

