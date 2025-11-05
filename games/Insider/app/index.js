import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useInsiderGameStore } from '../store/insiderGameStore';

export const InsiderIndex = ({ navigation }) => {
  const resetGame = useInsiderGameStore((state) => state.resetGame);

  const handleStart = () => {
    resetGame();
    navigation?.navigate('lobby');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.emoji}>🎭</Text>
        <Text style={styles.title}>Insider</Text>
        <Text style={styles.subtitle}>El juego de deducción y engaño</Text>
      </View>
      
      <View style={styles.infoCard}>
        <Text style={styles.sectionTitle}>📋 ¿Cómo se juega?</Text>
        <Text style={styles.description}>
          Un emocionante juego de deducción social para 4 a 8 jugadores que combina la adivinación de palabras con la búsqueda de un traidor oculto.
        </Text>
        
        <View style={styles.rolesSection}>
          <Text style={styles.rolesTitle}>👥 Los Roles:</Text>
          <View style={styles.roleItem}>
            <Text style={styles.roleEmoji}>👑</Text>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleName}>Guía</Text>
              <Text style={styles.roleDescription}>Conoce la palabra secreta y debe guiar a los demás con respuestas de 'Sí', 'No' o 'No lo sé'.</Text>
            </View>
          </View>
          <View style={styles.roleItem}>
            <Text style={styles.roleEmoji}>🎭</Text>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleName}>Infiltrado</Text>
              <Text style={styles.roleDescription}>También conoce la palabra pero debe ocultarlo. Debe dirigir sutilmente las preguntas sin ser descubierto.</Text>
            </View>
          </View>
          <View style={styles.roleItem}>
            <Text style={styles.roleEmoji}>👤</Text>
            <View style={styles.roleTextContainer}>
              <Text style={styles.roleName}>Ciudadanos</Text>
              <Text style={styles.roleDescription}>No conocen la palabra. Deben hacer preguntas al Guía para adivinar la palabra y luego identificar al Infiltrado.</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.objectiveCard}>
        <Text style={styles.sectionTitle}>🎯 Objetivo del Juego</Text>
        <Text style={styles.objectiveText}>
          1. Adivinar la palabra secreta haciendo preguntas de sí/no al Guía{'\n'}
          2. Identificar correctamente quién es el Infiltrado{'\n'}
          3. El Infiltrado gana si no es descubierto
        </Text>
      </View>

      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>4-8</Text>
            <Text style={styles.statLabel}>Jugadores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5 min</Text>
            <Text style={styles.statLabel}>Preguntas</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>3 min</Text>
            <Text style={styles.statLabel}>Discusión</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Categorías</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleStart}>
        <Text style={styles.buttonText}>🚀 Empezar Juego</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 10,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
  },
  rolesSection: {
    marginTop: 10,
  },
  rolesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  roleItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  roleEmoji: {
    fontSize: 32,
    marginRight: 12,
  },
  roleTextContainer: {
    flex: 1,
  },
  roleName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roleDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  objectiveCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  objectiveText: {
    fontSize: 16,
    color: '#2E7D32',
    lineHeight: 26,
  },
  statsCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 40,
    paddingVertical: 18,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

