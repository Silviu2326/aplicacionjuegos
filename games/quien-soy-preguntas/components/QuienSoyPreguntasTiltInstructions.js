import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const QuienSoyPreguntasTiltInstructions = () => {
  return (
    <View style={styles.container}>
      <View style={styles.instructionCard}>
        <Text style={styles.instructionIcon}>⬇️</Text>
        <Text style={styles.instructionText}>
          Inclina hacia ABAJO para acertar
        </Text>
      </View>
      <View style={styles.instructionCard}>
        <Text style={styles.instructionIcon}>⬆️</Text>
        <Text style={styles.instructionText}>
          Inclina hacia ARRIBA para pasar
        </Text>
      </View>
      <Text style={styles.hintText}>
        Coloca el móvil en tu frente con la pantalla hacia los demás
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    width: '100%',
  },
  instructionIcon: {
    fontSize: 32,
    marginRight: 15,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
  },
});
