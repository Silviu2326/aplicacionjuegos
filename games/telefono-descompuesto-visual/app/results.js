import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useTelefonoDescompuestoVisualStore } from '../store/telefonoDescompuestoVisualStore';
import { TelefonoDescompuestoVisualResultsReel } from '../components/TelefonoDescompuestoVisualResultsReel';

export const TelefonoDescompuestoVisualResults = ({ navigation }) => {
  const notebooks = useTelefonoDescompuestoVisualStore((state) => state.notebooks);
  const reset = useTelefonoDescompuestoVisualStore((state) => state.reset);

  const handleBackToMenu = () => {
    reset();
    navigation?.navigate('index');
  };

  const handlePlayAgain = () => {
    reset();
    navigation?.navigate('lobby');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡La Gran Revelación!</Text>
        <Text style={styles.subtitle}>
          Descubre cómo se transformaron las palabras y dibujos
        </Text>
      </View>

      <TelefonoDescompuestoVisualResultsReel notebooks={notebooks} />

      <View style={styles.actions}>
        <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
          <Text style={styles.buttonText}>Jugar de Nuevo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.buttonSecondary]} 
          onPress={handleBackToMenu}
        >
          <Text style={[styles.buttonText, styles.buttonTextSecondary]}>
            Volver al Menú
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#4CAF50',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  actions: {
    padding: 16,
    gap: 12,
  },
  button: {
    padding: 16,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#f44336',
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

