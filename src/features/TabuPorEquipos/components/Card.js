import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const TabuPorEquiposCard = ({ palabra, tabu = [], onPress }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));
  const [fadeAnim] = React.useState(new Animated.Value(1));

  React.useEffect(() => {
    // Animación de entrada
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [palabra]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[
        styles.card,
        { 
          transform: [{ scale: scaleAnim }],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.palabraContainer}>
        <Text style={styles.palabraLabel}>PALABRA A ADIVINAR</Text>
        <Text style={styles.palabra}>{palabra}</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.tabuContainer}>
        <Text style={styles.tabuLabel}>⚠️ PALABRAS TABÚ</Text>
        <View style={styles.tabuList}>
          {tabu.map((palabraTabu, index) => (
            <View key={index} style={styles.tabuItem}>
              <Text style={styles.tabuText}>🚫 {palabraTabu}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          ⚠️ No puedes usar estas palabras ni sus derivados
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#E74C3C',
  },
  palabraContainer: {
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 20,
    backgroundColor: '#FFF5F5',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#E74C3C',
    borderStyle: 'dashed',
  },
  palabraLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E74C3C',
    marginBottom: 10,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  palabra: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#C0392B',
    textAlign: 'center',
    letterSpacing: 2,
  },
  separator: {
    height: 2,
    backgroundColor: '#E74C3C',
    marginVertical: 15,
    borderRadius: 1,
  },
  tabuContainer: {
    marginTop: 10,
  },
  tabuLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C0392B',
    marginBottom: 15,
    textAlign: 'center',
    letterSpacing: 1,
  },
  tabuList: {
    gap: 10,
  },
  tabuItem: {
    backgroundColor: '#FFEBEE',
    borderRadius: 10,
    padding: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E74C3C',
  },
  tabuText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#C0392B',
    textAlign: 'center',
  },
  warningBox: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#FFC107',
  },
  warningText: {
    fontSize: 12,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '600',
  },
});

