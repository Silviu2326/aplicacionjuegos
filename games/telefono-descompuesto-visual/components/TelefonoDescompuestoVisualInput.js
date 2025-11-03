import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export const TelefonoDescompuestoVisualInput = ({ 
  drawing, 
  onSubmit, 
  onCancel 
}) => {
  const [text, setText] = useState('');
  const maxLength = 200;

  const handleSubmit = () => {
    if (text.trim().length > 0) {
      onSubmit(text.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Qué crees que es este dibujo?</Text>
      
      {drawing && (
        <View style={styles.drawingContainer}>
          <Text style={styles.drawingPlaceholder}>Dibujo del jugador anterior</Text>
          {/* Aquí iría el componente de dibujo renderizado */}
        </View>
      )}

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Escribe tu interpretación aquí..."
        value={text}
        onChangeText={setText}
        maxLength={maxLength}
      />
      
      <Text style={styles.counter}>
        {text.length}/{maxLength} caracteres
      </Text>

      <View style={styles.buttonContainer}>
        {onCancel && (
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={[styles.submitButton, text.trim().length === 0 && styles.submitButtonDisabled]} 
          onPress={handleSubmit}
          disabled={text.trim().length === 0}
        >
          <Text style={styles.submitButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  drawingContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  drawingPlaceholder: {
    color: '#999',
    fontSize: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  counter: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  submitButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
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
  cancelButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

