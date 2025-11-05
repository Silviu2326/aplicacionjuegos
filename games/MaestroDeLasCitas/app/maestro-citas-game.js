import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { MaestroCitasQuoteCard } from '../components/MaestroCitasQuoteCard';
import { MaestroCitasAnswerOption } from '../components/MaestroCitasAnswerOption';
import { MaestroCitasScoreboard } from '../components/MaestroCitasScoreboard';
import { MaestroCitasTimerBar } from '../components/MaestroCitasTimerBar';
import { useMaestroCitasStore } from '../store/maestroCitasStore';

export const MaestroDeLasCitasGame = ({ navigation }) => {
  const currentRound = useMaestroCitasStore((state) => state.currentRound);
  const numRounds = useMaestroCitasStore((state) => state.numRounds);
  const currentQuote = useMaestroCitasStore((state) => state.currentQuote);
  const timeRemaining = useMaestroCitasStore((state) => state.timeRemaining);
  const timePerQuestion = useMaestroCitasStore((state) => state.timePerQuestion);
  const selectedAnswer = useMaestroCitasStore((state) => state.selectedAnswer);
  const answerRevealed = useMaestroCitasStore((state) => state.answerRevealed);
  const players = useMaestroCitasStore((state) => state.players);
  const currentPlayer = useMaestroCitasStore((state) => state.getCurrentPlayer());
  const answerHistory = useMaestroCitasStore((state) => state.answerHistory);
  
  const selectAnswer = useMaestroCitasStore((state) => state.selectAnswer);
  const nextRound = useMaestroCitasStore((state) => state.nextRound);
  const decrementTime = useMaestroCitasStore((state) => state.decrementTime);
  
  // Timer
  useEffect(() => {
    const interval = setInterval(() => {
      decrementTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [decrementTime]);
  
  // Navegar a resultados cuando termine el juego
  useEffect(() => {
    const gameStatus = useMaestroCitasStore.getState().gameStatus;
    if (gameStatus === 'finished') {
      navigation.navigate('maestro-citas-results');
    }
  }, [navigation]);
  
  const handleAnswerSelect = (answerIndex) => {
    selectAnswer(answerIndex);
  };
  
  const handleNextRound = () => {
    if (answerRevealed) {
      nextRound();
    }
  };
  
  if (!currentQuote) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }
  
  const score = currentPlayer?.score || 0;
  
  return (
    <View style={styles.container}>
      <MaestroCitasScoreboard
        currentRound={currentRound}
        totalRounds={numRounds}
        score={score}
        players={players}
      />
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MaestroCitasTimerBar
          timeRemaining={timeRemaining}
          totalTime={timePerQuestion}
        />
        
        <MaestroCitasQuoteCard quote={currentQuote.quote} category={currentQuote.category} />
        
        <View style={styles.optionsContainer}>
          {currentQuote.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === currentQuote.correctAnswer;
            
            return (
              <MaestroCitasAnswerOption
                key={index}
                option={option}
                index={index}
                isSelected={isSelected}
                isCorrect={isCorrect}
                isRevealed={answerRevealed}
                onPress={() => handleAnswerSelect(index)}
              />
            );
          })}
        </View>
        
        {answerRevealed && (
          <View style={styles.feedbackContainer}>
            {selectedAnswer === currentQuote.correctAnswer ? (
              <View style={styles.feedbackCorrect}>
                <Text style={styles.feedbackIcon}>✓</Text>
                <Text style={styles.feedbackText}>¡Correcto! Bien hecho</Text>
                <Text style={styles.feedbackPoints}>+{answerHistory[answerHistory.length - 1]?.points || 0} puntos</Text>
              </View>
            ) : (
              <View style={styles.feedbackIncorrect}>
                <Text style={styles.feedbackIcon}>✗</Text>
                <Text style={styles.feedbackText}>Incorrecto</Text>
                <Text style={styles.feedbackCorrectAnswer}>
                  La respuesta correcta era: {currentQuote.options[currentQuote.correctAnswer]}
                </Text>
              </View>
            )}
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextRound}
            >
              <Text style={styles.nextButtonText}>
                {currentRound >= numRounds ? 'Ver Resultados' : 'Siguiente Ronda'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 30,
  },
  loadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  optionsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 20,
  },
  nextButton: {
    backgroundColor: '#4caf50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  feedbackContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  feedbackCorrect: {
    backgroundColor: '#e8f5e9',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  feedbackIncorrect: {
    backgroundColor: '#ffebee',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#f44336',
  },
  feedbackIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  feedbackText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  feedbackPoints: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: '600',
  },
  feedbackCorrectAnswer: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

