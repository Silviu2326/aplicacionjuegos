import React, { useState } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';

export const CadenaEmojisInputNarracion = ({ onNarrationSubmit, initialValue = '' }) => {
  const [narration, setNarration] = useState(initialValue);

  const handleSubmit = () => {
    if (narration.trim() && onNarrationSubmit) {
      onNarrationSubmit(narration.trim());
      setNarration('');
    }
  };

  const characterCount = narration.length;
  const maxCharacters = 500;

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>Tu narración (opcional)</Text>
        <Text style={styles.characterCount}>
          {characterCount} / {maxCharacters}
        </Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu parte de la historia..."
        placeholderTextColor="#999"
        value={narration}
        onChangeText={(text) => {
          if (text.length <= maxCharacters) {
            setNarration(text);
          }
        }}
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        maxLength={maxCharacters}
      />
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          💡 Puedes escribir tu narración antes o después de elegir el emoji
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.submitButton, !narration.trim() && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={!narration.trim()}
      >
        <Text style={styles.submitButtonText}>
          {narration.trim() ? 'Guardar Narración' : 'Sin narración (continuar)'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  characterCount: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    minHeight: 100,
    backgroundColor: '#fafafa',
  },
  hintContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 6,
    padding: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  hintText: {
    fontSize: 11,
    color: '#1976D2',
    lineHeight: 16,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#cccccc',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

