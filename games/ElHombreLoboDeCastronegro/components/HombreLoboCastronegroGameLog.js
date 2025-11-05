import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const HombreLoboCastronegroGameLog = ({ gameLog }) => {
  const getLogIcon = (type) => {
    switch (type) {
      case 'game_start':
        return '🎮';
      case 'night_death':
        return '🌙';
      case 'lynch':
        return '⚖️';
      case 'no_lynch':
        return '⏸️';
      case 'role_reveal':
        return '🎭';
      case 'night_action':
        return '👁️';
      case 'protection_success':
        return '🛡️';
      case 'witch_saved':
        return '🧪';
      case 'lovers_death':
        return '💔';
      case 'hunter_shot':
        return '🔫';
      default:
        return '📝';
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial del Juego</Text>
      <ScrollView style={styles.logContainer}>
        {gameLog.length === 0 ? (
          <Text style={styles.emptyLog}>Aún no hay eventos en el juego.</Text>
        ) : (
          gameLog.map((log, index) => (
            <View key={index} style={styles.logEntry}>
              <Text style={styles.logIcon}>{getLogIcon(log.type)}</Text>
              <View style={styles.logContent}>
                <Text style={styles.logMessage}>{log.message}</Text>
                <Text style={styles.logTime}>{formatTime(log.timestamp)}</Text>
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  logContainer: {
    maxHeight: 150,
  },
  emptyLog: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  logEntry: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0f1624',
  },
  logIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  logContent: {
    flex: 1,
  },
  logMessage: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  logTime: {
    fontSize: 12,
    color: '#666',
  },
});

