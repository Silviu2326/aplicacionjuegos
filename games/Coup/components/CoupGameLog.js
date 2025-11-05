import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

export const CoupGameLog = ({ logs = [] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro del Juego</Text>
      <ScrollView style={styles.logContainer} nestedScrollEnabled>
        {logs.map((log, index) => (
          <View key={index} style={styles.logEntry}>
            <Text style={styles.logMessage}>{log.message}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  logContainer: {
    maxHeight: 150,
  },
  logEntry: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 4,
    backgroundColor: '#fff',
    borderRadius: 4,
  },
  logMessage: {
    fontSize: 12,
    color: '#666',
  },
});
