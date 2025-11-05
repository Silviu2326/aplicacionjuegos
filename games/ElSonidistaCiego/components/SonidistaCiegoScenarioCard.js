import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

export const SonidistaCiegoScenarioCard = ({ scenario, onReveal }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  if (!scenario) {
    return null;
  }

  const handleReveal = () => {
    setIsRevealed(true);
    if (onReveal) {
      onReveal();
    }
    // Animación de fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.container}>
      {!isRevealed ? (
        <TouchableOpacity
          style={styles.hiddenCard}
          onPress={handleReveal}
          activeOpacity={0.8}
        >
          <View style={styles.hiddenContent}>
            <Text style={styles.hiddenIcon}>🔒</Text>
            <Text style={styles.hiddenLabel}>Toca para revelar el escenario</Text>
            <Text style={styles.hiddenSubtext}>
              Asegúrate de que el Sonidista Ciego no pueda ver
            </Text>
            <View style={styles.hintContainer}>
              <Text style={styles.hintText}>💡 Consejo: Coloca el móvil de forma que solo los Ayudantes puedan verlo</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <Animated.View 
          style={[
            styles.revealedCard,
            {
              opacity: fadeAnim,
              transform: [{
                scale: fadeAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.9, 1],
                }),
              }],
            },
          ]}
        >
          <View style={styles.revealedContent}>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>🎭 Escenario Secreto</Text>
            </View>
            <View style={styles.scenarioContainer}>
              <Text style={styles.scenario}>{scenario}</Text>
            </View>
            <View style={styles.warningContainer}>
              <Text style={styles.warningIcon}>⚠️</Text>
              <Text style={styles.warning}>
                El Sonidista Ciego NO debe ver esto
              </Text>
            </View>
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Instrucciones para los Ayudantes:</Text>
              <Text style={styles.instructionsText}>
                • Cada uno debe hacer UN ÚNICO sonido{'\n'}
                • No hablen, solo sonidos{'\n'}
                • Vayan por turnos en orden
              </Text>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    width: '100%',
  },
  hiddenCard: {
    backgroundColor: '#1a1a1a',
    padding: 40,
    borderRadius: 20,
    alignItems: 'center',
    minHeight: 200,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  hiddenContent: {
    alignItems: 'center',
  },
  hiddenIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  hiddenLabel: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
  },
  hiddenSubtext: {
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  hintContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  hintText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  revealedCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#ff5722',
    shadowColor: '#ff5722',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    overflow: 'hidden',
  },
  revealedContent: {
    padding: 25,
  },
  labelContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#666',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  scenarioContainer: {
    backgroundColor: '#fff3e0',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff9800',
    borderStyle: 'dashed',
  },
  scenario: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff5722',
    textAlign: 'center',
    lineHeight: 40,
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  warningIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  warning: {
    flex: 1,
    fontSize: 15,
    color: '#f44336',
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 13,
    color: '#424242',
    lineHeight: 20,
  },
});

