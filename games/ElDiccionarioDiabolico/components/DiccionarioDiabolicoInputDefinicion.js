import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';

export const DiccionarioDiabolicoInputDefinicion = ({ playerId }) => {
  const [definitionText, setDefinitionText] = useState('');
  
  const currentWord = useDiccionarioDiabolicoStore((state) => state.currentWord);
  const getCurrentLector = useDiccionarioDiabolicoStore((state) => state.getCurrentLector);
  const isPlayerLector = useDiccionarioDiabolicoStore((state) => state.isPlayerLector);
  const submitDefinition = useDiccionarioDiabolicoStore((state) => state.submitDefinition);
  const hasPlayerSubmitted = useDiccionarioDiabolicoStore((state) => state.hasPlayerSubmitted);
  
  const lector = getCurrentLector();
  const isLector = isPlayerLector(playerId);
  const submitted = hasPlayerSubmitted(playerId);
  
  const handleSubmit = () => {
    if (!definitionText.trim()) {
      Alert.alert('Error', 'Por favor escribe una definición');
      return;
    }
    
    if (definitionText.trim().length < 10) {
      Alert.alert('Error', 'La definición debe tener al menos 10 caracteres');
      return;
    }
    
    const success = submitDefinition(playerId, definitionText);
    if (success) {
      setDefinitionText('');
      Alert.alert('¡Enviado!', 'Tu definición ha sido enviada. Espera a que los demás terminen.');
    }
  };
  
  if (!currentWord) {
    return null;
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.wordContainer}>
        <Text style={styles.wordLabel}>Palabra a definir:</Text>
        <Text style={styles.wordText}>{currentWord.palabra}</Text>
      </View>
      
      {isLector && (
        <View style={styles.lectorContainer}>
          <Text style={styles.lectorLabel}>Eres el Lector</Text>
          <View style={styles.realDefinitionContainer}>
            <Text style={styles.realDefinitionLabel}>Definición real (solo para ti):</Text>
            <Text style={styles.realDefinitionText}>{currentWord.definicion}</Text>
          </View>
          <Text style={styles.lectorHint}>
            Escribe una definición falsa pero creíble para esta palabra.
          </Text>
        </View>
      )}
      
      {!isLector && (
        <View style={styles.writerContainer}>
          <Text style={styles.writerLabel}>Eres un Escritor</Text>
          <Text style={styles.writerHint}>
            Escribe una definición falsa pero creíble para esta palabra.
          </Text>
        </View>
      )}
      
      {submitted ? (
        <View style={styles.submittedContainer}>
          <Text style={styles.submittedText}>✓ Definición enviada</Text>
          <Text style={styles.submittedHint}>
            Esperando a que los demás jugadores terminen...
          </Text>
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Escribe tu definición aquí..."
            value={definitionText}
            onChangeText={setDefinitionText}
            multiline
            numberOfLines={6}
            textAlignVertical="top"
            editable={!submitted}
          />
          <Text style={styles.characterCount}>
            {definitionText.length} caracteres
          </Text>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={submitted}
          >
            <Text style={styles.submitButtonText}>Enviar Definición</Text>
          </TouchableOpacity>
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
  wordContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  wordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
    textAlign: 'center',
  },
  lectorContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  lectorLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 12,
  },
  realDefinitionContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  realDefinitionLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  realDefinitionText: {
    fontSize: 16,
    color: '#333',
    fontStyle: 'italic',
  },
  lectorHint: {
    fontSize: 14,
    color: '#856404',
  },
  writerContainer: {
    backgroundColor: '#e7f3ff',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  writerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0d47a1',
    marginBottom: 8,
  },
  writerHint: {
    fontSize: 14,
    color: '#0d47a1',
  },
  inputContainer: {
    padding: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 150,
    textAlignVertical: 'top',
  },
  characterCount: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  submittedContainer: {
    backgroundColor: '#d4edda',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#28a745',
  },
  submittedText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 8,
  },
  submittedHint: {
    fontSize: 14,
    color: '#155724',
    textAlign: 'center',
  },
});
