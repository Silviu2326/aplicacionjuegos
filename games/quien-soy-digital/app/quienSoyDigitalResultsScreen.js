import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useQuienSoyDigitalStore } from '../store/quienSoyDigitalStore';

export const QuienSoyDigitalResultsScreen = ({ navigation }) => {
  const {
    correctAnswers,
    passedWords,
    roundHistory,
    currentPlayer,
    nextPlayer,
    startNewRound,
    resetGame,
  } = useQuienSoyDigitalStore();

  const handleNextPlayer = () => {
    nextPlayer();
    navigation?.navigate('setup');
  };

  const handleNewRound = () => {
    startNewRound();
    navigation?.navigate('game');
  };

  const handleBackToMenu = () => {
    resetGame();
    navigation?.navigate('index');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Resultados - Jugador {currentPlayer}</Text>

      <View style={styles.summaryContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{correctAnswers}</Text>
          <Text style={styles.statLabel}>Aciertos</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{passedWords}</Text>
          <Text style={styles.statLabel}>Pasadas</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{correctAnswers + passedWords}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>

      {roundHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <Text style={styles.historyTitle}>Historial de Palabras</Text>
          {roundHistory.map((item, index) => (
            <View
              key={index}
              style={[
                styles.historyItem,
                item.guessed ? styles.historyItemCorrect : styles.historyItemPassed,
              ]}
            >
              <Text style={styles.historyWord}>{item.word}</Text>
              <Text style={styles.historyStatus}>
                {item.guessed ? '✓ Acertada' : '→ Pasada'}
              </Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNextPlayer}>
          <Text style={styles.buttonText}>Siguiente Jugador</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleNewRound}>
          <Text style={[styles.buttonText, styles.secondaryButtonText]}>Nueva Ronda</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.tertiaryButton]}
          onPress={handleBackToMenu}
        >
          <Text style={[styles.buttonText, styles.tertiaryButtonText]}>Menú Principal</Text>
        </TouchableOpacity>
      </View>
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
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  historyItemCorrect: {
    backgroundColor: '#E8F5E9',
  },
  historyItemPassed: {
    backgroundColor: '#FFF3E0',
  },
  historyWord: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  historyStatus: {
    fontSize: 14,
    color: '#666',
  },
  actionsContainer: {
    gap: 15,
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  tertiaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4CAF50',
  },
  tertiaryButtonText: {
    color: '#666',
  },
});

