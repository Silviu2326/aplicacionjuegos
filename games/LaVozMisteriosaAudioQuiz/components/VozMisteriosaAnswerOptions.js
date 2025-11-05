import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

export const VozMisteriosaAnswerOptions = ({ 
  question, 
  onAnswer, 
  disabled 
}) => {
  const [textAnswer, setTextAnswer] = useState('');

  const handleMultipleChoice = (option) => {
    if (!disabled && onAnswer) {
      onAnswer(option);
    }
  };

  const handleTextSubmit = () => {
    if (!disabled && textAnswer.trim() && onAnswer) {
      onAnswer(textAnswer.trim());
    }
  };

  if (question.type === 'multiple_choice' && question.options) {
    return (
      <View style={styles.container}>
        <Text style={styles.questionText}>{question.question}</Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                disabled && styles.optionButtonDisabled,
              ]}
              onPress={() => handleMultipleChoice(option)}
              disabled={disabled}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  // Tipo texto
  return (
    <View style={styles.container}>
      <Text style={styles.questionText}>{question.question}</Text>
      <View style={styles.textInputContainer}>
        <TextInput
          style={[
            styles.textInput,
            disabled && styles.textInputDisabled,
          ]}
          placeholder="Escribe tu respuesta..."
          value={textAnswer}
          onChangeText={setTextAnswer}
          onSubmitEditing={handleTextSubmit}
          editable={!disabled}
          autoCapitalize="words"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={[
            styles.submitButton,
            (!textAnswer.trim() || disabled) && styles.submitButtonDisabled,
          ]}
          onPress={handleTextSubmit}
          disabled={!textAnswer.trim() || disabled}
        >
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
  },
  questionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    gap: 15,
  },
  optionButton: {
    backgroundColor: '#fff',
    padding: 18,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196f3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    minHeight: 60,
    justifyContent: 'center',
  },
  optionButtonDisabled: {
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
    lineHeight: 22,
  },
  textInputContainer: {
    gap: 15,
  },
  textInput: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2196f3',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  textInputDisabled: {
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  submitButton: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

