import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { useInterrogatorioStore } from '../store/interrogatorioStore';
import { InterrogatorioHeader } from '../components/InterrogatorioHeader';
import { InterrogatorioQuestionCounter } from '../components/InterrogatorioQuestionCounter';

export const ElInterrogatorioRonda = ({ navigation }) => {
  const [accusationText, setAccusationText] = useState('');
  const [showAccusationModal, setShowAccusationModal] = useState(false);
  const [questionText, setQuestionText] = useState('');
  const [showQuestionInput, setShowQuestionInput] = useState(false);

  const questionsRemaining = useInterrogatorioStore((state) => state.questionsRemaining);
  const maxQuestions = useInterrogatorioStore((state) => state.maxQuestions);
  const useQuestion = useInterrogatorioStore((state) => state.useQuestion);
  const submitAccusation = useInterrogatorioStore((state) => state.submitAccusation);
  const endRound = useInterrogatorioStore((state) => state.endRound);
  const currentRound = useInterrogatorioStore((state) => state.currentRound);
  const getCurrentSuspect = useInterrogatorioStore((state) => state.getCurrentSuspect);
  const getDetectives = useInterrogatorioStore((state) => state.getDetectives);
  const questionHistory = useInterrogatorioStore((state) => state.questionHistory);

  const suspect = getCurrentSuspect();
  const detectives = getDetectives();

  const handleUseQuestion = () => {
    if (questionsRemaining > 0) {
      if (showQuestionInput) {
        // Si hay texto de pregunta, guardarlo
        useQuestion(questionText.trim() || undefined);
        setQuestionText('');
        setShowQuestionInput(false);
        Alert.alert('Pregunta registrada', `Quedan ${questionsRemaining - 1} preguntas`);
      } else {
        // Mostrar input para registrar la pregunta
        setShowQuestionInput(true);
      }
    } else {
      Alert.alert('Sin preguntas', 'No quedan más preguntas. Deben hacer una acusación.');
    }
  };
  
  const handleSkipQuestionInput = () => {
    useQuestion();
    setShowQuestionInput(false);
    Alert.alert('Pregunta usada', `Quedan ${questionsRemaining - 1} preguntas`);
  };

  const handleShowAccusation = () => {
    setShowAccusationModal(true);
  };

  const handleSubmitAccusation = () => {
    if (accusationText.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una acusación');
      return;
    }

    const isCorrect = submitAccusation(accusationText.trim());
    setShowAccusationModal(false);
    setAccusationText('');

    if (navigation && navigation.navigate) {
      navigation.navigate('revelacion');
    }
  };

  const handleQuestionsExhausted = () => {
    Alert.alert(
      'Preguntas agotadas',
      'Se han agotado las preguntas. Deben hacer una acusación final.',
      [
        {
          text: 'Hacer acusación',
          onPress: handleShowAccusation,
        },
      ]
    );
  };

  useEffect(() => {
    if (questionsRemaining === 0) {
      handleQuestionsExhausted();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionsRemaining]);

  return (
    <View style={styles.container}>
      <InterrogatorioHeader 
        title="El Interrogatorio"
        currentRound={currentRound}
        currentSuspect={suspect}
      />
      
      <ScrollView style={styles.content}>
        <InterrogatorioQuestionCounter
          questionsRemaining={questionsRemaining}
          maxQuestions={maxQuestions}
        />

        <View style={styles.instructionsCard}>
          <Text style={styles.instructionsTitle}>📋 Instrucciones</Text>
          <Text style={styles.instructionsText}>
            • Los detectives hacen preguntas al sospechoso por turnos{'\n'}
            • El sospechoso solo puede responder: 'Sí', 'No' o 'Quizás'{'\n'}
            • Después de cada pregunta, marca que se usó una pregunta{'\n'}
            • Cuando creas tener la respuesta, haz una acusación{'\n'}
            • Si se agotan las preguntas, deben hacer una acusación final
          </Text>
        </View>
        
        {questionHistory.length > 0 && (
          <View style={styles.historyCard}>
            <Text style={styles.historyTitle}>📝 Historial de Preguntas ({questionHistory.length})</Text>
            <ScrollView style={styles.historyList} nestedScrollEnabled>
              {questionHistory.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <Text style={styles.historyNumber}>{index + 1}.</Text>
                  <Text style={styles.historyQuestion}>{item.question}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <View style={styles.detectivesCard}>
          <Text style={styles.detectivesTitle}>Detectives</Text>
          {detectives.map((detective, index) => (
            <Text key={detective.id} style={styles.detectiveName}>
              {index + 1}. {detective.name}
            </Text>
          ))}
        </View>

        {showQuestionInput ? (
          <View style={styles.questionInputCard}>
            <Text style={styles.questionInputLabel}>Registrar pregunta (opcional):</Text>
            <TextInput
              style={styles.questionInput}
              value={questionText}
              onChangeText={setQuestionText}
              placeholder="Escribe la pregunta realizada..."
              multiline
            />
            <View style={styles.questionInputButtons}>
              <TouchableOpacity 
                style={styles.skipButton} 
                onPress={handleSkipQuestionInput}
              >
                <Text style={styles.skipButtonText}>Omitir</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.registerButton} 
                onPress={handleUseQuestion}
              >
                <Text style={styles.registerButtonText}>Registrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <TouchableOpacity style={styles.questionButton} onPress={handleUseQuestion}>
            <Text style={styles.questionButtonText}>
              Usar Pregunta ({questionsRemaining} restantes)
            </Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.accusationButton} onPress={handleShowAccusation}>
          <Text style={styles.accusationButtonText}>Hacer Acusación</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={showAccusationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAccusationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Acusación Final</Text>
            <Text style={styles.modalHint}>
              ¿Qué crees que hizo el sospechoso?
            </Text>
            <TextInput
              style={styles.modalInput}
              value={accusationText}
              onChangeText={setAccusationText}
              placeholder="Escribe tu acusación aquí..."
              multiline
              numberOfLines={4}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => {
                  setShowAccusationModal(false);
                  setAccusationText('');
                }}
              >
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalSubmitButton}
                onPress={handleSubmitAccusation}
              >
                <Text style={styles.modalSubmitButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  instructionsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  detectivesCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  detectivesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  detectiveName: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    paddingLeft: 10,
  },
  questionButton: {
    backgroundColor: '#2196f3',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  accusationButton: {
    backgroundColor: '#f44336',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  accusationButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    width: '90%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalHint: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalCancelButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  modalCancelButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSubmitButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  modalSubmitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  historyCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    maxHeight: 200,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  historyList: {
    maxHeight: 150,
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722',
    width: 30,
  },
  historyQuestion: {
    fontSize: 15,
    color: '#555',
    flex: 1,
  },
  questionInputCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  questionInputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 10,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 60,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  questionInputButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  skipButton: {
    flex: 1,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  skipButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    flex: 1,
    backgroundColor: '#2196f3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginLeft: 10,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ElInterrogatorioRonda;

