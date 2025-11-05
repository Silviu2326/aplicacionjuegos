import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEntrevistadorInesperadoStore } from '../store/entrevistadorInesperadoStore';

export const ElEntrevistadorInesperadoIndex = ({ navigation }) => {
  const resetGame = useEntrevistadorInesperadoStore((state) => state.resetGame);

  const handleStart = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('setup');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>El Entrevistador Inesperado</Text>
        <Text style={styles.subtitle}>
          Un juego social de improvisación y deducción
        </Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Un jugador es elegido como el 'Entrevistado' y recibe una identidad
          extremadamente peculiar en secreto. El resto de los jugadores deben
          hacerle preguntas de una entrevista de trabajo completamente normal,
          mientras el Entrevistado responde en personaje sin revelar su identidad.
        </Text>
        
        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📋 Cómo Jugar</Text>
          <Text style={styles.infoText}>
            • Se necesitan 3 o más jugadores{'\n'}
            • Cada ronda, un jugador es el Entrevistado{'\n'}
            • Los demás hacen preguntas de entrevista{'\n'}
            • El Entrevistado responde en personaje{'\n'}
            • Los Entrevistadores intentan adivinar la identidad{'\n'}
            • El entrevistado gana puntos si mantiene su secreto{'\n'}
            • Los entrevistadores ganan puntos si adivinan correctamente
          </Text>
        </View>

        <View style={styles.featuresBox}>
          <Text style={styles.featuresTitle}>✨ Características</Text>
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🎭</Text>
              <Text style={styles.featureText}>90+ personajes únicos</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>💼</Text>
              <Text style={styles.featureText}>100+ preguntas de entrevista</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>⏱️</Text>
              <Text style={styles.featureText}>Temporizadores configurables</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🏆</Text>
              <Text style={styles.featureText}>Sistema de puntuación</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>🎨</Text>
              <Text style={styles.featureText}>Temas de personajes</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureEmoji}>📊</Text>
              <Text style={styles.featureText}>Estadísticas detalladas</Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.startButton} onPress={handleStart}>
          <Text style={styles.startButtonText}>🚀 Comenzar Juego</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featuresBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  featureEmoji: {
    fontSize: 32,
    marginBottom: 5,
  },
  featureText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  startButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ElEntrevistadorInesperadoIndex;

