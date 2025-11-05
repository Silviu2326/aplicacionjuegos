import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';

export const DetectiveObjetosPhotographerControls = () => {
  const gameStatus = useDetectiveObjetosStore((state) => state.gameStatus);
  const handleIncorrectGuess = useDetectiveObjetosStore((state) => state.handleIncorrectGuess);
  const handleCorrectGuess = useDetectiveObjetosStore((state) => state.handleCorrectGuess);
  const getCurrentDetective = useDetectiveObjetosStore((state) => state.getCurrentDetective);
  const isImageFullyRevealed = useDetectiveObjetosStore((state) => state.isImageFullyRevealed);
  const currentZoomLevel = useDetectiveObjetosStore((state) => state.currentZoomLevel);
  const maxZoomLevels = useDetectiveObjetosStore((state) => state.maxZoomLevels);
  
  // Solo mostrar en estado 'playing'
  if (gameStatus !== 'playing') {
    return null;
  }
  
  const currentDetective = getCurrentDetective();
  const remainingZoomLevels = maxZoomLevels - currentZoomLevel - 1;
  
  const handleCorrect = () => {
    if (!currentDetective) return;
    
    Alert.alert(
      '¡Acierto!',
      `${currentDetective.name} ha adivinado correctamente.`,
      [
        {
          text: 'Confirmar',
          onPress: () => {
            handleCorrectGuess(currentDetective.id);
          },
        },
      ]
    );
  };
  
  const handleIncorrect = () => {
    if (!currentDetective) return;
    
    if (isImageFullyRevealed()) {
      Alert.alert(
        'Imagen Completa',
        'La imagen se ha revelado por completo. El fotógrafo gana esta ronda.',
        [
          {
            text: 'OK',
            onPress: () => {
              handleIncorrectGuess();
            },
          },
        ]
      );
    } else {
      Alert.alert(
        'Incorrecto',
        `${currentDetective.name} no acertó. La imagen se revelará un poco más.`,
        [
          {
            text: 'Continuar',
            onPress: () => {
              handleIncorrectGuess();
            },
          },
        ]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Turno de: {currentDetective?.name || 'N/A'}
        </Text>
        <Text style={styles.zoomInfo}>
          Niveles de zoom restantes: {remainingZoomLevels}
        </Text>
      </View>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.incorrectButton]}
          onPress={handleIncorrect}
        >
          <Text style={styles.buttonText}>❌ Incorrecto</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.button, styles.correctButton]}
          onPress={handleCorrect}
        >
          <Text style={styles.buttonText}>✅ Correcto</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
  },
  infoContainer: {
    marginBottom: 15,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  zoomInfo: {
    fontSize: 14,
    color: '#666',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  incorrectButton: {
    backgroundColor: '#f44336',
  },
  correctButton: {
    backgroundColor: '#4caf50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

