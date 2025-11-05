import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export const MascaradeActionBar = ({ 
  onSwap, 
  onLook, 
  onAnnounce,
  isFirstFourRounds = false,
  disabled = false,
}) => {
  
  const handleSwap = () => {
    if (onSwap) {
      onSwap();
    }
  };
  
  const handleLook = () => {
    if (onLook) {
      onLook();
    }
  };
  
  const handleAnnounce = () => {
    if (onAnnounce) {
      onAnnounce();
    }
  };
  
  return (
    <View style={styles.container}>
      {isFirstFourRounds ? (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            Debes intercambiar cartas (primeras 4 rondas)
          </Text>
        </View>
      ) : (
        <>
          <TouchableOpacity
            style={[styles.button, styles.swapButton, disabled && styles.buttonDisabled]}
            onPress={handleSwap}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>Intercambiar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.lookButton, disabled && styles.buttonDisabled]}
            onPress={handleLook}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>Mirar Carta</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.button, styles.announceButton, disabled && styles.buttonDisabled]}
            onPress={handleAnnounce}
            disabled={disabled}
          >
            <Text style={styles.buttonText}>Anunciar Rol</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  swapButton: {
    backgroundColor: '#2196F3',
  },
  lookButton: {
    backgroundColor: '#FF9800',
  },
  announceButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  infoContainer: {
    flex: 1,
    padding: 12,
    backgroundColor: '#FFE082',
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#E65100',
    textAlign: 'center',
  },
});

