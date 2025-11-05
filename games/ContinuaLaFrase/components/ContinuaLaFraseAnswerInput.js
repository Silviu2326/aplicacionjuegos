import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

// Respuestas de ejemplo falsas para sugerencias
const EXAMPLE_RESPONSES = [
  'algo completamente inesperado y hilarante',
  'una situación sumamente embarazosa',
  'algo que cambiaría el mundo para siempre',
  'la cosa más absurda que puedas imaginar',
  'algo que solo yo entendería',
  'una respuesta que haría reír a todos',
  'algo completamente imposible pero divertido',
];

export const ContinuaLaFraseAnswerInput = ({ 
  onSubmit, 
  playerId, 
  currentResponse,
  disabled = false,
  maxLength = 200,
}) => {
  const [answer, setAnswer] = useState(currentResponse || '');
  const [charCount, setCharCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (currentResponse) {
      setAnswer(currentResponse);
      setCharCount(currentResponse.length);
    } else {
      setAnswer('');
      setCharCount(0);
    }
  }, [currentResponse]);

  const handleTextChange = (text) => {
    if (text.length <= maxLength) {
      setAnswer(text);
      setCharCount(text.length);
      setShowSuggestions(text.length < 10 && text.length > 0);
    }
  };

  const handleSubmit = () => {
    if (!answer.trim()) {
      Alert.alert('Respuesta vacía', 'Por favor escribe una respuesta para continuar');
      return;
    }

    if (answer.trim().length < 3) {
      Alert.alert('Respuesta muy corta', 'Por favor escribe al menos 3 caracteres');
      return;
    }

    if (onSubmit && playerId) {
      const success = onSubmit(playerId, answer);
      if (success) {
        setAnswer('');
        setCharCount(0);
        setShowSuggestions(false);
      }
    }
  };

  const handleSuggestionPress = (suggestion) => {
    setAnswer(suggestion);
    setCharCount(suggestion.length);
    setShowSuggestions(false);
  };

  const getRandomSuggestions = () => {
    const shuffled = [...EXAMPLE_RESPONSES].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 2);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>Tu respuesta:</Text>
        <Text style={[
          styles.charCount,
          charCount > maxLength * 0.9 && styles.charCountWarning,
          charCount === maxLength && styles.charCountError
        ]}>
          {charCount}/{maxLength}
        </Text>
      </View>
      
      <TextInput
        style={[
          styles.input,
          charCount > maxLength * 0.9 && styles.inputWarning,
          charCount === maxLength && styles.inputError
        ]}
        placeholder="Escribe tu continuación de la frase aquí..."
        placeholderTextColor="#999"
        value={answer}
        onChangeText={handleTextChange}
        multiline
        numberOfLines={4}
        editable={!disabled && !currentResponse}
        maxLength={maxLength}
        textAlignVertical="top"
      />
      
      {showSuggestions && !currentResponse && !disabled && (
        <View style={styles.suggestionsContainer}>
          <Text style={styles.suggestionsLabel}>💡 Ideas:</Text>
          {getRandomSuggestions().map((suggestion, index) => (
            <TouchableOpacity
              key={index}
              style={styles.suggestionItem}
              onPress={() => handleSuggestionPress(suggestion)}
            >
              <Text style={styles.suggestionText}>{suggestion}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
      
      {currentResponse ? (
        <View style={styles.submittedContainer}>
          <View style={styles.submittedHeader}>
            <Text style={styles.submittedText}>✓ Respuesta enviada</Text>
            <Text style={styles.charCountSmall}>{currentResponse.length} caracteres</Text>
          </View>
          <View style={styles.responseBox}>
            <Text style={styles.currentResponseText}>{currentResponse}</Text>
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.submitButton,
            (disabled || !answer.trim() || answer.trim().length < 3) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={disabled || !answer.trim() || answer.trim().length < 3}
        >
          <Text style={styles.submitButtonText}>
            {answer.trim().length < 3 ? 'Escribe al menos 3 caracteres' : 'Enviar Respuesta'}
          </Text>
        </TouchableOpacity>
      )}
      
      {!currentResponse && answer.length > 0 && answer.length < 10 && (
        <Text style={styles.hintText}>
          💡 Escribe algo creativo y divertido. Cuanto más original, mejor.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  charCountWarning: {
    color: '#ff9800',
  },
  charCountError: {
    color: '#f44336',
    fontWeight: 'bold',
  },
  charCountSmall: {
    fontSize: 11,
    color: '#4CAF50',
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    textAlignVertical: 'top',
    minHeight: 120,
    maxHeight: 200,
    marginBottom: 10,
    color: '#333',
  },
  inputWarning: {
    borderColor: '#ff9800',
  },
  inputError: {
    borderColor: '#f44336',
  },
  suggestionsContainer: {
    backgroundColor: '#f0f7ff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  suggestionsLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2196F3',
    marginBottom: 8,
  },
  suggestionItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: '#e3f2fd',
  },
  suggestionText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  submittedContainer: {
    backgroundColor: '#f1f8f4',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  submittedHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  submittedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    fontSize: 14,
  },
  responseBox: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c8e6c9',
  },
  currentResponseText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  hintText: {
    fontSize: 12,
    color: '#999',
    marginTop: 8,
    fontStyle: 'italic',
    textAlign: 'center',
  },
});

