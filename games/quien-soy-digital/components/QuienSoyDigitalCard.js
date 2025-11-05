import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const QuienSoyDigitalCard = ({ word }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  React.useEffect(() => {
    // Animación de entrada cuando cambia la palabra
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [word]);

  React.useEffect(() => {
    // Resetear animaciones cuando cambia la palabra
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.8);
  }, [word]);

  if (!word) {
    return (
      <View style={styles.container}>
        <Text style={styles.noWordText}>Preparando...</Text>
      </View>
    );
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.wordText}>{word}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  wordText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  noWordText: {
    fontSize: 24,
    color: '#999',
    textAlign: 'center',
  },
});

