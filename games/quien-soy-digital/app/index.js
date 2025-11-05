import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useQuienSoyDigitalStore } from '../store/quienSoyDigitalStore';

export const QuienSoyDigitalIndex = ({ navigation }) => {
  const resetGame = useQuienSoyDigitalStore((state) => state.resetGame);

  const handleStart = () => {
    resetGame();
    navigation?.navigate('setup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Quién Soy?</Text>
      <Text style={styles.subtitle}>
        Digital
      </Text>
      
      <Text style={styles.description}>
        Un juego social de adivinanzas perfecto para fiestas y reuniones.
        {'\n\n'}
        El objetivo es simple: descubre el personaje, objeto o animal mostrado en la pantalla haciendo preguntas de 'sí' o 'no'.
        {'\n\n'}
        Coloca el móvil en tu frente con la pantalla hacia los demás y comienza a preguntar. Inclina el móvil hacia abajo para acertar o hacia arriba para pasar.
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>Empezar Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 24,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

