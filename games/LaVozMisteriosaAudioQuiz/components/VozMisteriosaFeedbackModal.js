import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';

export const VozMisteriosaFeedbackModal = ({
  visible,
  isCorrect,
  correctAnswer,
  funFact,
  onClose,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={[
            styles.iconContainer,
            isCorrect ? styles.iconContainerCorrect : styles.iconContainerIncorrect,
          ]}>
            <Text style={styles.icon}>
              {isCorrect ? '✅' : '❌'}
            </Text>
          </View>

          <Text style={[
            styles.resultText,
            isCorrect ? styles.resultTextCorrect : styles.resultTextIncorrect,
          ]}>
            {isCorrect ? '¡Correcto!' : 'Incorrecto'}
          </Text>

          {!isCorrect && correctAnswer && (
            <View style={styles.answerContainer}>
              <Text style={styles.answerLabel}>La respuesta correcta es:</Text>
              <Text style={styles.answerText}>{correctAnswer}</Text>
            </View>
          )}

          {funFact && (
            <View style={styles.funFactContainer}>
              <Text style={styles.funFactLabel}>💡 Dato curioso:</Text>
              <Text style={styles.funFactText}>{funFact}</Text>
            </View>
          )}

          {isCorrect && (
            <View style={styles.celebrationContainer}>
              <Text style={styles.celebrationText}>🎉 ¡Excelente! 🎉</Text>
            </View>
          )}

          <TouchableOpacity
            style={[
              styles.closeButton,
              isCorrect ? styles.closeButtonCorrect : styles.closeButtonIncorrect,
            ]}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    maxWidth: 400,
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
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  iconContainerCorrect: {
    backgroundColor: '#c8e6c9',
  },
  iconContainerIncorrect: {
    backgroundColor: '#ffcdd2',
  },
  icon: {
    fontSize: 50,
  },
  resultText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  resultTextCorrect: {
    color: '#4caf50',
  },
  resultTextIncorrect: {
    color: '#f44336',
  },
  answerContainer: {
    width: '100%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  answerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  answerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  funFactContainer: {
    width: '100%',
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  funFactLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5,
  },
  funFactText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  closeButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    minWidth: 150,
    alignItems: 'center',
  },
  closeButtonCorrect: {
    backgroundColor: '#4caf50',
  },
  closeButtonIncorrect: {
    backgroundColor: '#f44336',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  celebrationContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#fff9c4',
  },
  celebrationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f57f17',
    textAlign: 'center',
  },
});

