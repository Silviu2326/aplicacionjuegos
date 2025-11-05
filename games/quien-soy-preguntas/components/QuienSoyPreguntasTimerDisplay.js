import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const QuienSoyPreguntasTimerDisplay = ({ timeRemaining, totalTime }) => {
  const percentage = totalTime > 0 ? (timeRemaining / totalTime) * 100 : 0;
  const isLowTime = timeRemaining <= 10;

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.timerBackground}>
        <View
          style={[
            styles.timerFill,
            { width: `${percentage}%` },
            isLowTime && styles.timerFillLow,
          ]}
        />
      </View>
      <Text style={[styles.timeText, isLowTime && styles.timeTextLow]}>
        {formatTime(timeRemaining)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  timerBackground: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  timerFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  timerFillLow: {
    backgroundColor: '#F44336',
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  timeTextLow: {
    color: '#F44336',
  },
});
