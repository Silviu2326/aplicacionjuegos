import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTelefonoDescompuestoVisualStore } from '../store/telefonoDescompuestoVisualStore';

export const TelefonoDescompuestoVisualIndex = ({ navigation }) => {
  const reset = useTelefonoDescompuestoVisualStore((state) => state.reset);

  const handleNewGame = () => {
    reset();
    navigation?.navigate('lobby');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Teléfono Descompuesto Visual</Text>
      <Text style={styles.subtitle}>
        Un juego hilarante donde los dibujos y las palabras se transforman de manera inesperada.
        {'\n\n'}Pasa el teléfono entre jugadores y diviértete viendo cómo se transforman las ideas.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleNewGame}>
        <Text style={styles.buttonText}>Nuevo Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
    padding: 18,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonTextSecondary: {
    color: '#fff',
  },
});

