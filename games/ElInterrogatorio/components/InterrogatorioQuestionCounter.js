import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const InterrogatorioQuestionCounter = ({ questionsRemaining, maxQuestions }) => {
  const percentage = maxQuestions > 0 ? (questionsRemaining / maxQuestions) * 100 : 0;
  const isLow = percentage <= 25;

  return (
    <View style={styles.container}>
      <View style={styles.counterBox}>
        <Text style={styles.label}>Preguntas Restantes</Text>
        <Text style={[styles.counter, isLow && styles.counterLow]}>
          {questionsRemaining}
        </Text>
        <View style={styles.barContainer}>
          <View style={[styles.bar, { width: `${percentage}%` }, isLow && styles.barLow]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  counterBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 10,
  },
  counterLow: {
    color: '#f44336',
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
    backgroundColor: '#ff5722',
    borderRadius: 4,
  },
  barLow: {
    backgroundColor: '#f44336',
  },
});

export default InterrogatorioQuestionCounter;

