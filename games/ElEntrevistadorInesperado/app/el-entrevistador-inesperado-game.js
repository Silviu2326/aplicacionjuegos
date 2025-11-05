import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { useEntrevistadorInesperadoStore } from '../store/entrevistadorInesperadoStore';
import { EntrevistadorInesperadoPlayerList } from '../components/EntrevistadorInesperadoPlayerList';
import { EntrevistadorInesperadoTimer } from '../components/EntrevistadorInesperadoTimer';
import { EntrevistadorInesperadoGuessModal } from '../components/EntrevistadorInesperadoGuessModal';
import { getRandomQuestion } from '../constants/EntrevistadorInesperadoQuestions';

export const ElEntrevistadorInesperadoGame = ({ navigation }) => {
  const [showGuessModal, setShowGuessModal] = useState(false);
  const [suggestedQuestion, setSuggestedQuestion] = useState('');

  const gameStatus = useEntrevistadorInesperadoStore((state) => state.gameStatus);
  const players = useEntrevistadorInesperadoStore((state) => state.players);
  const currentPlayerId = useEntrevistadorInesperadoStore(
    (state) => state.currentPlayerId
  );
  const interviewTimeRemaining = useEntrevistadorInesperadoStore(
    (state) => state.interviewTimeRemaining
  );
  const guessTimeRemaining = useEntrevistadorInesperadoStore(
    (state) => state.guessTimeRemaining
  );
  const currentRound = useEntrevistadorInesperadoStore(
    (state) => state.currentRound
  );
  const correctGuess = useEntrevistadorInesperadoStore(
    (state) => state.correctGuess
  );
  const guesses = useEntrevistadorInesperadoStore(
    (state) => state.guesses
  );

  const getCurrentInterviewee = useEntrevistadorInesperadoStore(
    (state) => state.getCurrentInterviewee
  );
  const isCurrentPlayerInterviewee = useEntrevistadorInesperadoStore(
    (state) => state.isCurrentPlayerInterviewee
  );
  const decrementInterviewTime = useEntrevistadorInesperadoStore(
    (state) => state.decrementInterviewTime
  );
  const decrementGuessTime = useEntrevistadorInesperadoStore(
    (state) => state.decrementGuessTime
  );
  const startGuessPhase = useEntrevistadorInesperadoStore(
    (state) => state.startGuessPhase
  );
  const submitGuess = useEntrevistadorInesperadoStore(
    (state) => state.submitGuess
  );
  const endRound = useEntrevistadorInesperadoStore((state) => state.endRound);

  const interviewee = getCurrentInterviewee();
  const effectivePlayerId =
    currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isInterviewee = isCurrentPlayerInterviewee();

  // Generar pregunta sugerida
  useEffect(() => {
    if (gameStatus === 'playing' && !isInterviewee) {
      setSuggestedQuestion(getRandomQuestion());
    }
  }, [gameStatus, isInterviewee]);

  // Temporizador de entrevista
  useEffect(() => {
    if (gameStatus === 'playing') {
      const interval = setInterval(() => {
        decrementInterviewTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, interviewTimeRemaining]);

  // Temporizador de adivinanza
  useEffect(() => {
    if (gameStatus === 'guessing') {
      const interval = setInterval(() => {
        decrementGuessTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, guessTimeRemaining]);

  // Navegación automática a resultados cuando termina el juego
  useEffect(() => {
    if (gameStatus === 'finished') {
      if (navigation && navigation.navigate) {
        navigation.navigate('results');
      }
    }
  }, [gameStatus]);

  // Si alguien adivinó correctamente, terminar la ronda
  useEffect(() => {
    if (correctGuess && gameStatus === 'playing') {
      const timeout = setTimeout(() => {
        endRound();
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [correctGuess, gameStatus]);

  const handleStartGuessing = () => {
    startGuessPhase();
  };

  const handleSubmitGuess = (guessText) => {
    if (effectivePlayerId) {
      submitGuess(effectivePlayerId, guessText);
    }
  };

  const renderGameContent = () => {
    if (gameStatus === 'playing') {
      return (
        <View style={styles.phaseContainer}>
          <EntrevistadorInesperadoTimer
            timeRemaining={interviewTimeRemaining}
            label="Tiempo de entrevista"
          />

          {isInterviewee ? (
            <View style={styles.intervieweeInstructions}>
              <Text style={styles.instructionsTitle}>🎭 Eres el Entrevistado</Text>
              <Text style={styles.instructionsText}>
                Responde las preguntas de los entrevistadores desde la
                perspectiva de tu personaje secreto. Da pistas sutiles sin
                revelar directamente quién eres.
              </Text>
            </View>
          ) : (
            <View style={styles.interviewerInstructions}>
              <Text style={styles.instructionsTitle}>💼 Eres un Entrevistador</Text>
              <Text style={styles.instructionsText}>
                Haz preguntas de entrevista de trabajo al entrevistado. Escucha
                atentamente sus respuestas para intentar adivinar su personaje
                secreto.
              </Text>

              {suggestedQuestion && (
                <View style={styles.suggestedQuestionBox}>
                  <Text style={styles.suggestedQuestionLabel}>
                    Pregunta sugerida:
                  </Text>
                  <Text style={styles.suggestedQuestion}>
                    {suggestedQuestion}
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.guessButton}
                onPress={() => setShowGuessModal(true)}
              >
                <Text style={styles.guessButtonText}>🔍 Adivinar Personaje</Text>
              </TouchableOpacity>

              {Object.keys(guesses).length > 0 && (
                <View style={styles.guessesBox}>
                  <Text style={styles.guessesTitle}>
                    📝 Adivinanzas realizadas ({Object.keys(guesses).length})
                  </Text>
                  {Object.entries(guesses).map(([playerId, guess]) => {
                    const player = players.find(p => p.id === playerId);
                    return (
                      <View key={playerId} style={styles.guessItem}>
                        <Text style={styles.guessPlayerName}>
                          {player?.name || 'Jugador'}: 
                        </Text>
                        <Text style={styles.guessText}>{guess}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          )}

          {isInterviewee && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleStartGuessing}
            >
              <Text style={styles.skipButtonText}>
                Finalizar entrevista e iniciar adivinanzas
              </Text>
            </TouchableOpacity>
          )}

          {correctGuess && (
            <View style={styles.correctGuessBox}>
              <Text style={styles.correctGuessText}>
                ¡{players.find((p) => p.id === correctGuess)?.name} adivinó
                correctamente!
              </Text>
            </View>
          )}
        </View>
      );
    }

    if (gameStatus === 'guessing') {
      return (
        <View style={styles.phaseContainer}>
          <EntrevistadorInesperadoTimer
            timeRemaining={guessTimeRemaining}
            label="Tiempo para adivinar"
          />

          {!isInterviewee && (
            <View style={styles.guessingInstructions}>
              <Text style={styles.instructionsTitle}>
                ⏰ Fase de Adivinanza
              </Text>
              <Text style={styles.instructionsText}>
                Ahora es el momento de adivinar el personaje secreto del
                entrevistado.
              </Text>

              <TouchableOpacity
                style={styles.guessButton}
                onPress={() => setShowGuessModal(true)}
              >
                <Text style={styles.guessButtonText}>🔍 Adivinar Personaje</Text>
              </TouchableOpacity>

              {Object.keys(guesses).length > 0 && (
                <View style={styles.guessesBox}>
                  <Text style={styles.guessesTitle}>
                    📝 Adivinanzas realizadas ({Object.keys(guesses).length})
                  </Text>
                  {Object.entries(guesses).map(([playerId, guess]) => {
                    const player = players.find(p => p.id === playerId);
                    return (
                      <View key={playerId} style={styles.guessItem}>
                        <Text style={styles.guessPlayerName}>
                          {player?.name || 'Jugador'}: 
                        </Text>
                        <Text style={styles.guessText}>{guess}</Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          )}

          {isInterviewee && (
            <View style={styles.intervieweeInstructions}>
              <Text style={styles.instructionsTitle}>⏳ Esperando adivinanzas</Text>
              <Text style={styles.instructionsText}>
                Los entrevistadores están adivinando tu personaje. No puedes
                adivinar ya que eres el entrevistado.
              </Text>
            </View>
          )}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ronda {currentRound}</Text>
        {interviewee && (
          <Text style={styles.intervieweeName}>
            Entrevistado: {interviewee.name}
          </Text>
        )}
      </View>

      <EntrevistadorInesperadoPlayerList
        players={players}
        intervieweeId={interviewee?.id}
      />

      <ScrollView style={styles.content}>{renderGameContent()}</ScrollView>

      <EntrevistadorInesperadoGuessModal
        visible={showGuessModal}
        onClose={() => setShowGuessModal(false)}
        onSubmitGuess={handleSubmitGuess}
        disabled={isInterviewee}
      />
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
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  intervieweeName: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
  },
  phaseContainer: {
    padding: 20,
  },
  intervieweeInstructions: {
    backgroundColor: '#fff9e6',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  interviewerInstructions: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  suggestedQuestionBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  suggestedQuestionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  suggestedQuestion: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  guessButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 15,
  },
  guessButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  correctGuessBox: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 15,
    marginTop: 20,
    alignItems: 'center',
  },
  correctGuessText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  guessingInstructions: {
    backgroundColor: '#e3f2fd',
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  guessesBox: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  guessesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  guessItem: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#2196f3',
  },
  guessPlayerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 4,
  },
  guessText: {
    fontSize: 14,
    color: '#555',
    fontStyle: 'italic',
  },
});

export default ElEntrevistadorInesperadoGame;

