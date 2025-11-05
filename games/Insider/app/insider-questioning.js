import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useInsiderGameStore } from '../store/insiderGameStore';
import { InsiderTimerDisplay } from '../components/InsiderTimerDisplay';
import { InsiderQuestionLog } from '../components/InsiderQuestionLog';
import { ROLES } from '../constants/insiderGameConfig';

// Sugerencias de preguntas
const QUESTION_SUGGESTIONS = [
  '¿Es un ser vivo?',
  '¿Es un objeto inanimado?',
  '¿Es un animal?',
  '¿Es más grande que un coche?',
  '¿Se puede comer?',
  '¿Se encuentra en la naturaleza?',
  '¿Es de color...?',
  '¿Tiene más de 4 patas?',
  '¿Puede volar?',
  '¿Vive en el agua?',
  '¿Es una herramienta?',
  '¿Se usa para...?',
  '¿Es redondo?',
  '¿Es de metal?',
  '¿Es de madera?',
  '¿Es transparente?',
  '¿Se puede tocar?',
  '¿Hace ruido?',
  '¿Tiene ruedas?',
  '¿Se puede llevar?',
];

export const InsiderQuestioning = ({ navigation }) => {
  const [questionText, setQuestionText] = useState('');
  const [currentAnswerQuestionId, setCurrentAnswerQuestionId] = useState(null);
  const [answerText, setAnswerText] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const players = useInsiderGameStore((state) => state.players);
  const currentPlayerId = players[0]?.id; // Por ahora, usar el primer jugador como referencia
  const guideIndex = useInsiderGameStore((state) => state.guideIndex);
  const insiderIndex = useInsiderGameStore((state) => state.insiderIndex);
  const guidePlayer = players[guideIndex];
  const isGuide = currentPlayerId === guidePlayer?.id;
  const isInsider = currentPlayerId === players[insiderIndex]?.id;
  const isCitizen = !isGuide && !isInsider;
  
  const questions = useInsiderGameStore((state) => state.questions);
  const timeRemaining = useInsiderGameStore((state) => state.timeRemaining);
  const wordGuessed = useInsiderGameStore((state) => state.wordGuessed);
  const secretWord = useInsiderGameStore((state) => state.secretWord);
  const guessedWord = useInsiderGameStore((state) => state.guessedWord);
  
  const askQuestion = useInsiderGameStore((state) => state.askQuestion);
  const answerQuestion = useInsiderGameStore((state) => state.answerQuestion);
  const guessWord = useInsiderGameStore((state) => state.guessWord);

  useEffect(() => {
    if (wordGuessed) {
      // La palabra fue adivinada, avanzar a discusión
      setTimeout(() => {
        navigation?.navigate('voting');
      }, 2000);
    }
  }, [wordGuessed]);

  const handleAskQuestion = () => {
    if (questionText.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una pregunta');
      return;
    }

    if (isGuide) {
      Alert.alert('Información', 'El Guía no puede hacer preguntas, solo responder');
      return;
    }

    askQuestion(currentPlayerId, questionText);
    setQuestionText('');
  };

  const handleAnswerQuestion = (questionId, answer) => {
    if (!isGuide) {
      Alert.alert('Error', 'Solo el Guía puede responder preguntas');
      return;
    }

    answerQuestion(questionId, answer);
    setCurrentAnswerQuestionId(null);
  };

  const handleGuessWord = () => {
    if (answerText.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una palabra');
      return;
    }

    if (isGuide) {
      Alert.alert('Información', 'El Guía no puede adivinar la palabra');
      return;
    }

    const correct = guessWord(currentPlayerId, answerText);
    if (correct) {
      Alert.alert('¡Correcto!', `¡La palabra era "${secretWord}"! Ahora deben identificar al Infiltrado.`);
    } else {
      Alert.alert('Incorrecto', 'Esa no es la palabra correcta. Continúa haciendo preguntas.');
      setAnswerText('');
    }
  };

  const pendingQuestions = questions.filter(q => q.answer === null);
  const answeredQuestions = questions.filter(q => q.answer !== null);
  const yesCount = answeredQuestions.filter(q => q.answer === 'yes').length;
  const noCount = answeredQuestions.filter(q => q.answer === 'no').length;
  const dontKnowCount = answeredQuestions.filter(q => q.answer === 'dont-know').length;
  
  const getRandomSuggestion = () => {
    const randomIndex = Math.floor(Math.random() * QUESTION_SUGGESTIONS.length);
    return QUESTION_SUGGESTIONS[randomIndex];
  };

  const handleUseSuggestion = () => {
    setQuestionText(getRandomSuggestion());
    setShowSuggestions(false);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>💭 Fase de Preguntas</Text>
      
      {isGuide && (
        <View style={styles.guideInfo}>
          <Text style={styles.guideText}>
            Eres el Guía. La palabra secreta es: <Text style={styles.secretWordText}>{secretWord}</Text>
          </Text>
          <Text style={styles.guideInstruction}>
            Responde 'Sí', 'No' o 'No lo sé' a las preguntas de los jugadores.
          </Text>
        </View>
      )}

      {(isInsider || isCitizen) && (
        <View style={styles.playerInfo}>
          {isInsider && (
            <Text style={styles.insiderHint}>
              Eres el Infiltrado. La palabra secreta es: <Text style={styles.secretWordText}>{secretWord}</Text>
              {'\n'}Dirige sutilmente las preguntas sin delatarte.
            </Text>
          )}
          {isCitizen && (
            <Text style={styles.citizenHint}>
              Eres un Ciudadano. Haz preguntas de sí/no al Guía para adivinar la palabra secreta.
            </Text>
          )}
        </View>
      )}

      <InsiderTimerDisplay 
        timeRemaining={timeRemaining} 
        label="Tiempo para adivinar"
      />

      {wordGuessed && (
        <View style={styles.guessedContainer}>
          <Text style={styles.guessedText}>
            ¡La palabra fue adivinada! "{guessedWord}"
          </Text>
          <Text style={styles.guessedSubtext}>
            Avanzando a la fase de discusión...
          </Text>
        </View>
      )}

      {!isGuide && !wordGuessed && (
        <View style={styles.questionSection}>
          <View style={styles.suggestionHeader}>
            <Text style={styles.sectionTitle}>💡 Pregunta al Guía</Text>
            <TouchableOpacity 
              style={styles.suggestionButton}
              onPress={() => setShowSuggestions(!showSuggestions)}
            >
              <Text style={styles.suggestionButtonText}>
                {showSuggestions ? 'Ocultar' : 'Sugerencias'}
              </Text>
            </TouchableOpacity>
          </View>
          
          {showSuggestions && (
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Ejemplos de preguntas:</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.suggestionsScroll}>
                {QUESTION_SUGGESTIONS.slice(0, 8).map((suggestion, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.suggestionChip}
                    onPress={() => {
                      setQuestionText(suggestion);
                      setShowSuggestions(false);
                    }}
                  >
                    <Text style={styles.suggestionChipText}>{suggestion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
              <TouchableOpacity style={styles.randomSuggestionButton} onPress={handleUseSuggestion}>
                <Text style={styles.randomSuggestionText}>🎲 Pregunta Aleatoria</Text>
              </TouchableOpacity>
            </View>
          )}
          
          <TextInput
            style={styles.questionInput}
            placeholder="Escribe tu pregunta (ej: ¿Es un animal?)"
            placeholderTextColor="#999"
            value={questionText}
            onChangeText={setQuestionText}
            multiline
          />
          <TouchableOpacity style={styles.askButton} onPress={handleAskQuestion}>
            <Text style={styles.askButtonText}>📤 Hacer Pregunta</Text>
          </TouchableOpacity>
        </View>
      )}

      {!isGuide && !wordGuessed && (
        <View style={styles.guessSection}>
          <TextInput
            style={styles.guessInput}
            placeholder="¿Crees saber la palabra? Escríbela aquí"
            value={answerText}
            onChangeText={setAnswerText}
          />
          <TouchableOpacity style={styles.guessButton} onPress={handleGuessWord}>
            <Text style={styles.guessButtonText}>Adivinar Palabra</Text>
          </TouchableOpacity>
        </View>
      )}

      {isGuide && pendingQuestions.length > 0 && (
        <View style={styles.answerSection}>
          <Text style={styles.answerTitle}>Preguntas pendientes:</Text>
          <ScrollView style={styles.pendingQuestions}>
            {pendingQuestions.map((question) => {
              const player = players.find(p => p.id === question.playerId);
              return (
                <View key={question.id} style={styles.pendingQuestionItem}>
                  <Text style={styles.pendingQuestionPlayer}>{player?.name}:</Text>
                  <Text style={styles.pendingQuestionText}>{question.question}</Text>
                  <View style={styles.answerButtons}>
                    <TouchableOpacity
                      style={[styles.answerButton, styles.yesButton]}
                      onPress={() => handleAnswerQuestion(question.id, 'yes')}
                    >
                      <Text style={styles.answerButtonText}>Sí</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.answerButton, styles.noButton]}
                      onPress={() => handleAnswerQuestion(question.id, 'no')}
                    >
                      <Text style={styles.answerButtonText}>No</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.answerButton, styles.dontKnowButton]}
                      onPress={() => handleAnswerQuestion(question.id, 'dont-know')}
                    >
                      <Text style={styles.answerButtonText}>No sé</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      <View style={styles.statsCard}>
        <Text style={styles.sectionTitle}>📊 Estadísticas</Text>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{questions.length}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.statYes]}>{yesCount}</Text>
            <Text style={styles.statLabel}>Sí</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.statNo]}>{noCount}</Text>
            <Text style={styles.statLabel}>No</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.statDontKnow]}>{dontKnowCount}</Text>
            <Text style={styles.statLabel}>No sé</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, styles.statPending]}>{pendingQuestions.length}</Text>
            <Text style={styles.statLabel}>Pendientes</Text>
          </View>
        </View>
      </View>

      <View style={styles.questionLogContainer}>
        <InsiderQuestionLog questions={questions} players={players} />
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
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  guideInfo: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  guideText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  secretWordText: {
    fontWeight: 'bold',
    color: '#2196F3',
    fontSize: 18,
  },
  guideInstruction: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  playerInfo: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  insiderHint: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  citizenHint: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  guessedContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  guessedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 5,
  },
  guessedSubtext: {
    fontSize: 14,
    color: '#666',
  },
  questionSection: {
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  suggestionButton: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  suggestionButtonText: {
    color: '#2196F3',
    fontSize: 12,
    fontWeight: 'bold',
  },
  suggestionsContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
  },
  suggestionsTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '500',
  },
  suggestionsScroll: {
    marginBottom: 10,
  },
  suggestionChip: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  suggestionChipText: {
    fontSize: 12,
    color: '#333',
  },
  randomSuggestionButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: 'center',
  },
  randomSuggestionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  questionInput: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginBottom: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  askButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  askButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guessSection: {
    marginBottom: 15,
  },
  guessInput: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
    marginBottom: 10,
  },
  guessButton: {
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  guessButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  answerSection: {
    marginBottom: 15,
    maxHeight: 200,
  },
  answerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  pendingQuestions: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
  },
  pendingQuestionItem: {
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  pendingQuestionPlayer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  pendingQuestionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  answerButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  answerButton: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  yesButton: {
    backgroundColor: '#4CAF50',
  },
  noButton: {
    backgroundColor: '#f44336',
  },
  dontKnowButton: {
    backgroundColor: '#FF9800',
  },
  answerButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  questionLogContainer: {
    minHeight: 200,
    marginTop: 10,
  },
  statsCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
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
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statYes: {
    color: '#4CAF50',
  },
  statNo: {
    color: '#f44336',
  },
  statDontKnow: {
    color: '#FF9800',
  },
  statPending: {
    color: '#2196F3',
  },
});

