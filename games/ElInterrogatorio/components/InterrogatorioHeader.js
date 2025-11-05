import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const InterrogatorioHeader = ({ title, subtitle, currentRound, currentSuspect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'El Interrogatorio'}</Text>
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {currentRound && (
        <Text style={styles.info}>Ronda {currentRound}</Text>
      )}
      {currentSuspect && (
        <Text style={styles.info}>Sospechoso: {currentSuspect.name}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#ff5722',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#888',
    marginTop: 5,
  },
});

export default InterrogatorioHeader;

