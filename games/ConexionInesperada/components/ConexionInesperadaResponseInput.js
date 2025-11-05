import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export const ConexionInesperadaResponseInput = ({ onSubmit, playerId, currentResponse }) => {
  const [response, setResponse] = useState(currentResponse || '');

  const MIN_CHARS = 10;
  const MAX_CHARS = 200;
  
  const getCharCountColor = () => {
    const length = response.length;
    if (length < MIN_CHARS) return '#ff9800';
    if (length > MAX_CHARS * 0.9) return '#f44336';
    return '#4CAF50';
  };

  const getCharCountStatus = () => {
    const length = response.length;
    if (length < MIN_CHARS) return `Faltan ${MIN_CHARS - length} caracteres`;
    if (length > MAX_CHARS * 0.9) return `Quedan ${MAX_CHARS - length} caracteres`;
    return 'Perfecto';
  };

  const handleSubmit = () => {
    const trimmedResponse = response.trim();
    if (trimmedResponse.length < MIN_CHARS) {
      Alert.alert(
        'Respuesta muy corta', 
        `Por favor, escribe una conexión más elaborada (mínimo ${MIN_CHARS} caracteres).`
      );
      return;
    }
    if (trimmedResponse.length > MAX_CHARS) {
      Alert.alert(
        'Respuesta muy larga', 
        `Por favor, acorta tu respuesta (máximo ${MAX_CHARS} caracteres).`
      );
      return;
    }
    if (onSubmit) {
      onSubmit(playerId, trimmedResponse);
    }
  };

  const isEditable = !currentResponse;
  const isValidLength = response.trim().length >= MIN_CHARS && response.trim().length <= MAX_CHARS;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>💡 Escribe tu conexión creativa</Text>
        <Text style={styles.hint}>Explica cómo estos dos conceptos se relacionan de manera inesperada</Text>
      </View>
      
      <TextInput
        style={[
          styles.input,
          !isEditable && styles.inputDisabled,
          response.length >= MIN_CHARS && response.length <= MAX_CHARS && styles.inputValid
        ]}
        multiline
        numberOfLines={5}
        placeholder="Ejemplo: Ambos tienen que ver con la velocidad de transmisión de información a través del tiempo y el espacio..."
        placeholderTextColor="#999"
        value={response}
        onChangeText={setResponse}
        maxLength={MAX_CHARS}
        editable={isEditable}
        textAlignVertical="top"
      />
      
      <View style={styles.footer}>
        <View style={styles.charCountContainer}>
          <View style={[styles.charCountBar, { 
            width: `${Math.min((response.length / MAX_CHARS) * 100, 100)}%`,
            backgroundColor: getCharCountColor()
          }]} />
        </View>
        <Text style={[styles.charCount, { color: getCharCountColor() }]}>
          {response.length}/{MAX_CHARS}
        </Text>
        {response.length > 0 && response.length < MIN_CHARS && (
          <Text style={styles.charCountHint}>
            {getCharCountStatus()}
          </Text>
        )}
      </View>
      
      {!currentResponse && (
        <TouchableOpacity
          style={[
            styles.submitButton,
            !isValidLength && styles.submitButtonDisabled
          ]}
          onPress={handleSubmit}
          disabled={!isValidLength}
        >
          <Text style={styles.submitButtonText}>
            ✨ Enviar Conexión
          </Text>
        </TouchableOpacity>
      )}
      
      {currentResponse && (
        <View style={styles.submittedContainer}>
          <View style={styles.submittedHeader}>
            <Text style={styles.submittedIcon}>✓</Text>
            <Text style={styles.submittedText}>Respuesta enviada exitosamente</Text>
          </View>
          <View style={styles.submittedResponseContainer}>
            <Text style={styles.submittedResponse}>{currentResponse}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 22,
    backgroundColor: '#fff',
    borderRadius: 20,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  header: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 6,
  },
  hint: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  input: {
    borderWidth: 2,
    borderColor: '#d0d0d0',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 130,
    textAlignVertical: 'top',
    backgroundColor: '#fafafa',
    color: '#1a1a1a',
    lineHeight: 22,
  },
  inputDisabled: {
    backgroundColor: '#f5f5f5',
    borderColor: '#e0e0e0',
    opacity: 0.7,
  },
  inputValid: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
  },
  footer: {
    marginTop: 10,
    alignItems: 'flex-end',
  },
  charCountContainer: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 6,
  },
  charCountBar: {
    height: '100%',
    borderRadius: 2,
  },
  charCount: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  charCountHint: {
    fontSize: 11,
    color: '#ff9800',
    marginTop: 4,
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginTop: 18,
    alignItems: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  submittedContainer: {
    marginTop: 18,
    padding: 18,
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  submittedHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  submittedIcon: {
    fontSize: 20,
    color: '#4CAF50',
    marginRight: 8,
    fontWeight: 'bold',
  },
  submittedText: {
    color: '#2E7D32',
    fontWeight: 'bold',
    fontSize: 15,
  },
  submittedResponseContainer: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  submittedResponse: {
    color: '#1a1a1a',
    fontSize: 15,
    fontStyle: 'italic',
    lineHeight: 22,
  },
});

