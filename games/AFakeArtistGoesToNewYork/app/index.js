import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useFakeArtistGameStore } from '../store/fakeArtistGameStore';

export const AFakeArtistGoesToNewYorkIndex = ({ navigation }) => {
  const resetGame = useFakeArtistGameStore((state) => state.resetGame);

  const handleStart = () => {
    resetGame();
    navigation?.navigate('lobby');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>A Fake Artist</Text>
      <Text style={styles.subtitle}>Goes to New York</Text>
      
      <Text style={styles.description}>
        Un vibrante juego de fiesta que combina el dibujo colaborativo con la deducción social.
        {'\n\n'}
        Todos los jugadores, excepto uno, conocen una palabra secreta y deben dibujar una parte de ella en un lienzo compartido. El jugador restante es el 'Artista Falso', que debe fingir que lo sabe.
        {'\n\n'}
        En cada turno, un jugador añade un único trazo continuo al dibujo. Los artistas reales deben ser lo suficientemente explícitos para que sus compañeros sepan que están en el mismo equipo, pero lo suficientemente sutiles como para no revelar la palabra al impostor.
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
    fontSize: 24,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
    fontStyle: 'italic',
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

