import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { QuienSoyDigitalCard } from '../components/QuienSoyDigitalCard';
import { QuienSoyDigitalTimer } from '../components/QuienSoyDigitalTimer';
import { QuienSoyDigitalTiltInstructions } from '../components/QuienSoyDigitalTiltInstructions';
import { useQuienSoyDigitalStore } from '../store/quienSoyDigitalStore';
import { useQuienSoyDigitalGameLogic } from '../hooks/useQuienSoyDigitalGameLogic';

export const QuienSoyDigitalGameScreen = ({ navigation }) => {
  const [showInstructions, setShowInstructions] = useState(true);
  
  const {
    getCurrentWord,
    markAsCorrect,
    passWord,
    gameStatus,
    correctAnswers,
    passedWords,
    timeLimit,
  } = useQuienSoyDigitalStore();

  const { timeRemaining } = useQuienSoyDigitalGameLogic(
    gameStatus === 'playing' && !showInstructions
  );

  const currentWord = getCurrentWord();

  // Detectar cambios en el estado del juego
  useEffect(() => {
    if (gameStatus === 'results') {
      navigation?.navigate('results');
    }
  }, [gameStatus, navigation]);

  const handleStartGame = () => {
    setShowInstructions(false);
  };

  const handleSkipInstructions = () => {
    setShowInstructions(false);
  };

  // Si aún no hay palabra actual, mostrar loading
  if (!currentWord && gameStatus === 'playing') {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Preparando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {showInstructions ? (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>Instrucciones</Text>
          <QuienSoyDigitalTiltInstructions />
          <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
            <Text style={styles.startButtonText}>Comenzar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.skipButton} onPress={handleSkipInstructions}>
            <Text style={styles.skipButtonText}>Saltar instrucciones</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.gameHeader}>
            <QuienSoyDigitalTimer
              timeRemaining={timeRemaining}
              totalTime={timeLimit}
            />
            <View style={styles.statsContainer}>
              <Text style={styles.statsText}>✓ {correctAnswers}</Text>
              <Text style={styles.statsText}>→ {passedWords}</Text>
            </View>
          </View>

          <QuienSoyDigitalCard word={currentWord} />

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.actionButton, styles.correctButton]}
              onPress={markAsCorrect}
            >
              <Text style={styles.actionButtonText}>✓ Acertar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.actionButton, styles.passButton]}
              onPress={passWord}
            >
              <Text style={styles.actionButtonText}>→ Pasar</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 24,
    color: '#999',
    textAlign: 'center',
    marginTop: 100,
  },
  instructionsContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  instructionsTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  gameHeader: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 10,
    gap: 20,
  },
  statsText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
  actionsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 15,
    backgroundColor: '#f5f5f5',
  },
  actionButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  correctButton: {
    backgroundColor: '#4CAF50',
  },
  passButton: {
    backgroundColor: '#FF9800',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    padding: 15,
    marginTop: 10,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 14,
  },
});

