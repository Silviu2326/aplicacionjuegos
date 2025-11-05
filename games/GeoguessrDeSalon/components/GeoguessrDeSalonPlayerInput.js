import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const GeoguessrDeSalonPlayerInput = ({ 
  playerName, 
  onGuess, 
  disabled = false 
}) => {
  const [guess, setGuess] = useState('');
  const [showTips, setShowTips] = useState(false);

  const handleSubmit = () => {
    if (guess.trim() && !disabled) {
      onGuess(guess.trim());
      setGuess('');
    }
  };

  const exampleQuestions = [
    '¿Está en Europa?',
    '¿Es una capital?',
    '¿Hay playas cerca?',
    '¿Es un país tropical?',
    '¿Hablan inglés?',
    '¿Está en el hemisferio sur?',
    '¿Es una isla?',
    '¿Hay montañas?',
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>🎯 Tu Turno, {playerName}</Text>
        <TouchableOpacity 
          style={styles.tipsButton}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.tipsButtonText}>💡 {showTips ? 'Ocultar' : 'Mostrar'} consejos</Text>
        </TouchableOpacity>
      </View>

      {showTips && (
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Consejos para hacer preguntas:</Text>
          <ScrollView style={styles.tipsList}>
            {exampleQuestions.map((question, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipText}>• {question}</Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.tipsNote}>
            Recuerda: Solo puedes hacer preguntas de sí/no o intentar adivinar directamente la ubicación.
          </Text>
        </View>
      )}

      <View style={styles.inputSection}>
        <Text style={styles.inputLabel}>Escribe tu respuesta o pregunta:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, disabled && styles.inputDisabled]}
            placeholder="Ej: ¿Está en Asia? o París, Francia"
            value={guess}
            onChangeText={setGuess}
            onSubmitEditing={handleSubmit}
            editable={!disabled}
            placeholderTextColor="#888"
            multiline={false}
            autoCapitalize="words"
            autoCorrect={false}
          />
          <TouchableOpacity 
            style={[styles.button, disabled && styles.buttonDisabled]} 
            onPress={handleSubmit}
            disabled={disabled || !guess.trim()}
          >
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
        
        {guess.trim().length > 0 && guess.trim().length < 5 && (
          <Text style={styles.warningText}>
            ⚠️ Tu respuesta parece muy corta. Asegúrate de escribir el nombre completo.
          </Text>
        )}

        {disabled && (
          <View style={styles.disabledContainer}>
            <Text style={styles.disabledText}>
              ⛔ No puedes adivinar en este turno
            </Text>
            <Text style={styles.disabledSubtext}>
              Espera tu siguiente turno o haz una pregunta de sí/no al Guía.
            </Text>
          </View>
        )}

        {!disabled && (
          <View style={styles.helpContainer}>
            <Text style={styles.helpText}>
              💬 Puedes hacer preguntas de sí/no al Guía o intentar adivinar la ubicación directamente.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  tipsButton: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tipsButtonText: {
    color: '#4a90e2',
    fontSize: 12,
    fontWeight: '600',
  },
  tipsContainer: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  tipsList: {
    maxHeight: 120,
    marginBottom: 10,
  },
  tipItem: {
    paddingVertical: 4,
  },
  tipText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  tipsNote: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 5,
  },
  inputSection: {
    marginTop: 10,
  },
  inputLabel: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#2a2a3e',
  },
  inputDisabled: {
    opacity: 0.5,
    backgroundColor: '#0f0f1a',
    borderColor: '#1a1a1a',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    minWidth: 80,
  },
  buttonDisabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  warningText: {
    color: '#f5a623',
    fontSize: 12,
    marginTop: 5,
    fontStyle: 'italic',
  },
  disabledContainer: {
    backgroundColor: '#1a1a1a',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#f44336',
  },
  disabledText: {
    color: '#f44336',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  disabledSubtext: {
    color: '#888',
    fontSize: 12,
    textAlign: 'center',
  },
  helpContainer: {
    backgroundColor: '#1a1a2e',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  helpText: {
    color: '#4a90e2',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

