import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoDefinitionInput = ({ playerId }) => {
  const [definitionText, setDefinitionText] = useState('');
  
  const currentWord = useDiccionarioFalsoStore((state) => state.currentWord);
  const submitDefinition = useDiccionarioFalsoStore((state) => state.submitDefinition);
  const hasPlayerSubmitted = useDiccionarioFalsoStore((state) => state.hasPlayerSubmitted);
  
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
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>💡 Instrucciones</Text>
        <Text style={styles.instructionsText}>
          Escribe una definición falsa pero creíble para la palabra "{currentWord.palabra}".
          Tu objetivo es hacer que otros jugadores crean que tu definición es la verdadera.
        </Text>
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💭 Consejos rápidos:</Text>
          <Text style={styles.tipItem}>• Usa un lenguaje formal y académico</Text>
          <Text style={styles.tipItem}>• Mínimo 10 caracteres para enviar</Text>
          <Text style={styles.tipItem}>• Sé creativo pero creíble</Text>
        </View>
      </View>
      
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
            placeholder="Escribe tu definición falsa aquí..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={6}
            value={definitionText}
            onChangeText={setDefinitionText}
            editable={!submitted}
            maxLength={500}
          />
          <View style={styles.inputFooter}>
            <Text style={styles.characterCount}>
              {definitionText.length}/500 caracteres
            </Text>
            <TouchableOpacity
              style={[
                styles.submitButton,
                definitionText.trim().length < 10 && styles.submitButtonDisabled,
              ]}
              onPress={handleSubmit}
              disabled={definitionText.trim().length < 10}
            >
              <Text style={styles.submitButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructionsContainer: {
    backgroundColor: '#fff3cd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
    marginBottom: 12,
  },
  tipsBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(133, 100, 4, 0.3)',
  },
  tipsTitle: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 6,
  },
  tipItem: {
    fontSize: 12,
    color: '#856404',
    lineHeight: 18,
    marginBottom: 4,
  },
  submittedContainer: {
    backgroundColor: '#d4edda',
    padding: 24,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#28a745',
  },
  submittedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 8,
  },
  submittedHint: {
    fontSize: 14,
    color: '#155724',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    fontSize: 16,
    color: '#333',
    textAlignVertical: 'top',
    minHeight: 120,
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 12,
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
  },
  submitButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
