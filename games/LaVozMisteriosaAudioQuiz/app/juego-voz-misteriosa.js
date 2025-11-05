import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useVozMisteriosaStore } from '../store/vozMisteriosaStore';
import { VozMisteriosaAudioPlayer } from '../components/VozMisteriosaAudioPlayer';
import { VozMisteriosaAnswerOptions } from '../components/VozMisteriosaAnswerOptions';
import { VozMisteriosaTimerBar } from '../components/VozMisteriosaTimerBar';
import { VozMisteriosaScoreboard } from '../components/VozMisteriosaScoreboard';
import { VozMisteriosaFeedbackModal } from '../components/VozMisteriosaFeedbackModal';
import { 
  getRandomQuestionFromCategories,
  CATEGORIES,
  CATEGORY_LABELS,
} from '../constants/VozMisteriosaGameSettings';

export const LaVozMisteriosaAudioQuizJuego = ({ navigation }) => {
  const gameStatus = useVozMisteriosaStore((state) => state.gameStatus);
  const currentQuestion = useVozMisteriosaStore((state) => state.currentQuestion);
  const selectedCategories = useVozMisteriosaStore((state) => state.selectedCategories);
  const selectQuestion = useVozMisteriosaStore((state) => state.selectQuestion);
  const submitAnswer = useVozMisteriosaStore((state) => state.submitAnswer);
  const incrementReplays = useVozMisteriosaStore((state) => state.incrementReplays);
  const timeRemaining = useVozMisteriosaStore((state) => state.timeRemaining);
  const timePerQuestion = useVozMisteriosaStore((state) => state.timePerQuestion);
  const replaysUsed = useVozMisteriosaStore((state) => state.replaysUsed);
  const maxReplays = useVozMisteriosaStore((state) => state.maxReplays);
  const startTimer = useVozMisteriosaStore((state) => state.startTimer);
  const stopTimer = useVozMisteriosaStore((state) => state.stopTimer);
  const currentPlayerAnswer = useVozMisteriosaStore((state) => state.currentPlayerAnswer);
  const currentPlayerAnswerCorrect = useVozMisteriosaStore((state) => state.currentPlayerAnswerCorrect);
  const currentRound = useVozMisteriosaStore((state) => state.currentRound);
  const players = useVozMisteriosaStore((state) => state.players);
  const currentPlayerIndex = useVozMisteriosaStore((state) => state.currentPlayerIndex);
  const getCurrentPlayer = useVozMisteriosaStore((state) => state.getCurrentPlayer);
  const nextTurn = useVozMisteriosaStore((state) => state.nextTurn);
  
  const [showFeedback, setShowFeedback] = useState(false);
  const [answerSubmitted, setAnswerSubmitted] = useState(false);

  const currentPlayer = getCurrentPlayer();

  const handleTimeUp = useCallback(() => {
    if (answerSubmitted) return;
    
    setAnswerSubmitted(true);
    stopTimer();
    submitAnswer('');
    setShowFeedback(true);
  }, [answerSubmitted, stopTimer, submitAnswer]);

  // Cargar pregunta cuando comienza el turno
  useEffect(() => {
    if (gameStatus === 'playing' && !currentQuestion) {
      const question = getRandomQuestionFromCategories(selectedCategories);
      if (question) {
        selectQuestion(question);
      }
    }
  }, [gameStatus, currentQuestion, selectedCategories, selectQuestion]);

  // Iniciar temporizador cuando hay una pregunta
  useEffect(() => {
    if (currentQuestion && timeRemaining === timePerQuestion && !answerSubmitted) {
      startTimer();
    }
    
    return () => {
      stopTimer();
    };
  }, [currentQuestion, timeRemaining, timePerQuestion, answerSubmitted, startTimer, stopTimer]);

  // Manejar tiempo agotado
  useEffect(() => {
    if (timeRemaining === 0 && currentQuestion && !answerSubmitted && gameStatus === 'playing') {
      handleTimeUp();
    }
  }, [timeRemaining, currentQuestion, answerSubmitted, gameStatus, handleTimeUp]);

  const handleReplay = () => {
    incrementReplays();
  };

  const handleAnswer = (answer) => {
    if (answerSubmitted) return;
    
    setAnswerSubmitted(true);
    stopTimer();
    const isCorrect = submitAnswer(answer);
    setShowFeedback(true);
  };

  const handleFeedbackClose = () => {
    setShowFeedback(false);
    setAnswerSubmitted(false);
    
    // Avanzar al siguiente turno
    setTimeout(() => {
      nextTurn();
      
      // Si el juego terminó, navegar a resultados
      const newGameStatus = useVozMisteriosaStore.getState().gameStatus;
      if (newGameStatus === 'finished') {
        if (navigation && navigation.navigate) {
          navigation.navigate('resultado-voz-misteriosa');
        }
      }
    }, 300);
  };

  if (!currentPlayer) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cargando...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>La Voz Misteriosa</Text>
        <Text style={styles.roundText}>Ronda {currentRound}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.currentPlayerCard}>
          <Text style={styles.currentPlayerLabel}>Jugador Actual:</Text>
          <Text style={styles.currentPlayerName}>{currentPlayer.name}</Text>
          <View style={styles.playerStatsRow}>
            <View style={styles.playerStat}>
              <Text style={styles.playerStatValue}>{currentPlayer.score}</Text>
              <Text style={styles.playerStatLabel}>Puntos</Text>
            </View>
            <View style={styles.playerStatDivider} />
            <View style={styles.playerStat}>
              <Text style={styles.playerStatValue}>{currentRound}</Text>
              <Text style={styles.playerStatLabel}>Ronda</Text>
            </View>
            <View style={styles.playerStatDivider} />
            <View style={styles.playerStat}>
              <Text style={styles.playerStatValue}>{replaysUsed}/{maxReplays}</Text>
              <Text style={styles.playerStatLabel}>Repeticiones</Text>
            </View>
          </View>
        </View>

        {currentQuestion && (
          <>
            <View style={styles.categoryCard}>
              <Text style={styles.categoryIcon}>
                {currentQuestion.category === CATEGORIES.MUSICA ? '🎵' :
                 currentQuestion.category === CATEGORIES.CINE_TV ? '🎬' :
                 currentQuestion.category === CATEGORIES.ANIMALES ? '🦁' :
                 currentQuestion.category === CATEGORIES.DIBUJOS_ANIMADOS ? '🎨' :
                 currentQuestion.category === CATEGORIES.SONIDOS_COTIDIANOS ? '🔊' :
                 currentQuestion.category === CATEGORIES.VIDEOJUEGOS ? '🎮' : '❓'}
              </Text>
              <Text style={styles.categoryLabel}>
                {CATEGORY_LABELS[currentQuestion.category] || currentQuestion.category}
              </Text>
            </View>

            <VozMisteriosaTimerBar
              timeRemaining={timeRemaining}
              totalTime={timePerQuestion}
              onTimeUp={handleTimeUp}
            />

            <VozMisteriosaAudioPlayer
              audioUrl={currentQuestion.audioUrl}
              onReplay={handleReplay}
              maxReplays={maxReplays}
              replaysUsed={replaysUsed}
              disabled={answerSubmitted}
            />

            <VozMisteriosaAnswerOptions
              question={currentQuestion}
              onAnswer={handleAnswer}
              disabled={answerSubmitted}
            />

            <VozMisteriosaScoreboard
              players={players}
              currentPlayerId={currentPlayer.id}
            />
          </>
        )}

        {!currentQuestion && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Cargando pregunta...</Text>
          </View>
        )}
      </View>

      <VozMisteriosaFeedbackModal
        visible={showFeedback}
        isCorrect={currentPlayerAnswerCorrect}
        correctAnswer={currentQuestion?.correctAnswer}
        funFact={currentQuestion?.funFact}
        onClose={handleFeedbackClose}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#9c27b0',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  roundText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  currentPlayerCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  currentPlayerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  currentPlayerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9c27b0',
  },
  categoryCard: {
    backgroundColor: '#e1bee7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  categoryIcon: {
    fontSize: 24,
  },
  categoryLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  playerStatsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    gap: 15,
  },
  playerStat: {
    alignItems: 'center',
  },
  playerStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9c27b0',
  },
  playerStatLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  playerStatDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#ddd',
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

export default LaVozMisteriosaAudioQuizJuego;

