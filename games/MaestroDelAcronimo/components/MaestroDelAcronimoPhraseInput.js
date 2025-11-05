import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { validatePhrase, getAcronymLetters } from '../utils/maestroDelAcronimoGenerator';

export const MaestroDelAcronimoPhraseInput = ({ 
  onSubmit, 
  playerId, 
  currentPhrase,
  acronym,
  disabled = false,
}) => {
  const [phrase, setPhrase] = useState(currentPhrase || '');
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (acronym && phrase.trim()) {
      const valid = validatePhrase(phrase, acronym);
      setIsValid(valid);
    } else {
      setIsValid(false);
    }
  }, [phrase, acronym]);

  const handleSubmit = () => {
    if (!phrase.trim()) {
      Alert.alert('Error', 'Por favor escribe una frase');
      return;
    }

    if (!validatePhrase(phrase, acronym)) {
      Alert.alert(
        'Frase inválida',
        `La frase debe tener palabras que empiecen con las letras: ${getAcronymLetters(acronym)}`
      );
      return;
    }

    if (onSubmit && playerId) {
      const success = onSubmit(playerId, phrase);
      if (success) {
        setPhrase('');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tu frase:</Text>
      {acronym && (
        <Text style={styles.acronymHint}>
          Debe empezar con: {getAcronymLetters(acronym)}
        </Text>
      )}
      <TextInput
        style={[
          styles.input,
          phrase.trim() && !isValid && styles.inputInvalid,
          phrase.trim() && isValid && styles.inputValid,
        ]}
        placeholder="Escribe tu frase aquí..."
        value={phrase}
        onChangeText={setPhrase}
        multiline
        numberOfLines={3}
        editable={!disabled && !currentPhrase}
        maxLength={200}
      />
      {phrase.trim() && !isValid && (
        <Text style={styles.validationError}>
          ✗ La frase no coincide con el acrónimo
        </Text>
      )}
      {phrase.trim() && isValid && (
        <Text style={styles.validationSuccess}>
          ✓ La frase es válida
        </Text>
      )}
      {currentPhrase ? (
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedText}>✓ Frase enviada</Text>
          <Text style={styles.currentPhraseText}>{currentPhrase}</Text>
        </View>
      ) : (
        <TouchableOpacity
          style={[
            styles.submitButton, 
            (disabled || !phrase.trim() || !isValid) && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={disabled || !phrase.trim() || !isValid}
        >
          <Text style={styles.submitButtonText}>Enviar Frase</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    marginHorizontal: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  acronymHint: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: '#ddd',
    textAlignVertical: 'top',
    minHeight: 100,
    marginBottom: 8,
  },
  inputValid: {
    borderColor: '#4CAF50',
  },
  inputInvalid: {
    borderColor: '#f44336',
  },
  validationError: {
    color: '#f44336',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  validationSuccess: {
    color: '#4CAF50',
    fontSize: 14,
    marginBottom: 10,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
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
  submittedText: {
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 14,
  },
  currentPhraseText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
  },
});

