import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { QuePrefieresExtremoDilemmaCard } from '../components/QuePrefieresExtremoDilemmaCard';
import { QuePrefieresExtremoStatsDisplay } from '../components/QuePrefieresExtremoStatsDisplay';
import { useQuePrefieresExtremoStore } from '../store/quePrefieresExtremoStore';
import { CATEGORIES } from '../constants/QuePrefieresExtremoQuestions';

export const QuePrefieresExtremoGame = ({ navigation }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  const {
    getCurrentQuestion,
    nextQuestion,
    selectOption,
    getQuestionStats,
    currentQuestionIndex,
    gameMode,
    getSessionStats,
  } = useQuePrefieresExtremoStore();

  useEffect(() => {
    // Cargar primera pregunta
    const question = getCurrentQuestion();
    setCurrentQuestion(question);
    setSelectedOption(null);
    setShowStats(false);
    setAnimationKey(prev => prev + 1);
  }, []);

  const handleOptionSelect = (optionIndex) => {
    if (selectedOption !== null) return; // Ya se seleccionó una opción

    setSelectedOption(optionIndex);
    
    // Registrar la selección en el store
    if (currentQuestion) {
      selectOption(currentQuestion.id, optionIndex);
      
      // Mostrar estadísticas después de un breve delay
      setTimeout(() => {
        setShowStats(true);
      }, 600);
    }
  };

  const handleNextQuestion = () => {
    const question = nextQuestion();
    if (question) {
      setCurrentQuestion(question);
      setSelectedOption(null);
      setShowStats(false);
      setAnimationKey(prev => prev + 1);
    } else {
      // No hay más preguntas, mostrar alerta
      Alert.alert(
        '¡Felicidades!',
        'Has completado todas las preguntas disponibles. ¿Quieres reiniciar o volver al menú?',
        [
          {
            text: 'Reiniciar',
            onPress: () => {
              const reset = useQuePrefieresExtremoStore.getState().resetSession;
              reset();
              const newQuestion = getCurrentQuestion();
              setCurrentQuestion(newQuestion);
              setSelectedOption(null);
              setShowStats(false);
              setAnimationKey(0);
            },
          },
          {
            text: 'Menú',
            onPress: () => navigation?.navigate('index'),
          },
        ]
      );
    }
  };

  const handleBackToMenu = () => {
    const sessionStats = getSessionStats();
    if (sessionStats.totalQuestions > 0) {
      Alert.alert(
        '¿Salir del juego?',
        `Has respondido ${sessionStats.totalQuestions} pregunta(s) en esta sesión. ¿Quieres volver al menú?`,
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Salir',
            onPress: () => navigation?.navigate('index'),
          },
        ]
      );
    } else {
      navigation?.navigate('index');
    }
  };

  const stats = currentQuestion ? getQuestionStats(currentQuestion.id) : null;
  const categoryInfo = currentQuestion 
    ? CATEGORIES.find(c => c.id === currentQuestion.category)
    : null;
  const sessionStats = getSessionStats();

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.contentContainer}
      key={animationKey}
    >
      {/* Header con información */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackToMenu}>
          <Text style={styles.backButtonText}>← Menú</Text>
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoText}>
              Pregunta #{currentQuestionIndex + 1}
            </Text>
            {categoryInfo && (
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryEmoji}>{categoryInfo.icon}</Text>
                <Text style={styles.categoryName}>{categoryInfo.name}</Text>
              </View>
            )}
          </View>
          {sessionStats.totalQuestions > 0 && (
            <Text style={styles.sessionInfo}>
              Sesión: {sessionStats.totalQuestions} respondidas
            </Text>
          )}
        </View>
      </View>

      {/* Card de pregunta */}
      {currentQuestion && (
        <QuePrefieresExtremoDilemmaCard
          question={currentQuestion}
          onOptionSelect={handleOptionSelect}
          disabled={selectedOption !== null}
          selectedOption={selectedOption}
          showResult={showStats}
        />
      )}

      {/* Estadísticas */}
      {showStats && stats && currentQuestion && (
        <QuePrefieresExtremoStatsDisplay
          stats={stats}
          question={currentQuestion}
          selectedOption={selectedOption}
        />
      )}

      {/* Mensaje de justificación */}
      {selectedOption !== null && !showStats && (
        <View style={styles.justificationPrompt}>
          <Text style={styles.justificationText}>
            💬 Ahora justifica tu decisión ante el grupo
          </Text>
        </View>
      )}

      {/* Acciones */}
      {selectedOption !== null && (
        <View style={styles.actionsContainer}>
          {showStats && (
            <TouchableOpacity 
              style={styles.shareButton} 
              onPress={() => {
                Alert.alert(
                  'Compartir',
                  `Pregunta: ${currentQuestion.option1} O ${currentQuestion.option2}\n` +
                  `Tu elección: ${selectedOption === 0 ? currentQuestion.option1 : currentQuestion.option2}\n` +
                  `Estadísticas: ${stats.option1Percent}% vs ${stats.option2Percent}%`,
                  [{ text: 'OK' }]
                );
              }}
            >
              <Text style={styles.shareButtonText}>📤 Compartir</Text>
            </TouchableOpacity>
          )}
          
          <TouchableOpacity style={styles.nextButton} onPress={handleNextQuestion}>
            <Text style={styles.nextButtonText}>
              {showStats ? '➡️ Siguiente Pregunta' : '➡️ Continuar'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Footer con información adicional */}
      {currentQuestion && (
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            💡 Recuerda: El objetivo es debatir y conocer mejor a los demás. 
            ¡Pasa el dispositivo al siguiente jugador después de justificar tu elección!
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  headerInfo: {
    marginTop: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  categoryEmoji: {
    fontSize: 16,
    marginRight: 5,
  },
  categoryName: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  sessionInfo: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  justificationPrompt: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  justificationText: {
    fontSize: 16,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '500',
  },
  actionsContainer: {
    padding: 20,
    paddingTop: 10,
  },
  shareButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  shareButtonText: {
    color: '#2196F3',
    fontSize: 16,
    fontWeight: '600',
  },
  nextButton: {
    width: '100%',
    padding: 18,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    margin: 20,
    marginTop: 10,
    padding: 15,
    backgroundColor: '#E8F5E9',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  footerText: {
    fontSize: 13,
    color: '#2E7D32',
    lineHeight: 20,
    textAlign: 'center',
  },
});

