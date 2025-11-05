import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const THEMES = [
  { id: null, name: 'Aleatorio', icon: '🎲', description: 'Cualquier situación' },
  { id: 'oficina', name: 'Oficina', icon: '💼', description: 'Situaciones de trabajo' },
  { id: 'familiar', name: 'Familiar', icon: '👨‍👩‍👧‍👦', description: 'Situaciones familiares' },
  { id: 'vacaciones', name: 'Vacaciones', icon: '🏖️', description: 'Situaciones de viaje' },
  { id: 'tecnologia', name: 'Tecnología', icon: '💻', description: 'Situaciones tecnológicas' },
  { id: 'comida', name: 'Comida', icon: '🍕', description: 'Situaciones con comida' },
  { id: 'relaciones', name: 'Relaciones', icon: '💑', description: 'Situaciones de pareja' },
];

export const InterrogatorioGameSettings = ({
  maxQuestions,
  onMaxQuestionsChange,
  maxRounds,
  onMaxRoundsChange,
  situationTheme,
  onThemeChange,
}) => {
  const [questionsText, setQuestionsText] = useState(maxQuestions.toString());
  const [roundsText, setRoundsText] = useState(maxRounds ? maxRounds.toString() : '');

  useEffect(() => {
    setQuestionsText(maxQuestions.toString());
  }, [maxQuestions]);

  useEffect(() => {
    setRoundsText(maxRounds ? maxRounds.toString() : '');
  }, [maxRounds]);

  const handleQuestionsChange = (text) => {
    setQuestionsText(text);
    const num = parseInt(text, 10);
    if (!isNaN(num) && num > 0) {
      onMaxQuestionsChange(num);
    }
  };

  const handleRoundsChange = (text) => {
    setRoundsText(text);
    if (text.trim() === '') {
      onMaxRoundsChange(null);
    } else {
      const num = parseInt(text, 10);
      if (!isNaN(num) && num > 0) {
        onMaxRoundsChange(num);
      }
    }
  };

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.containerTitle}>⚙️ Configuración del Juego</Text>
      
      <View style={styles.section}>
        <Text style={styles.label}>📝 Número de preguntas por ronda</Text>
        <Text style={styles.hint}>Mínimo: 5 • Máximo: 50</Text>
        <TextInput
          style={styles.input}
          value={questionsText}
          onChangeText={handleQuestionsChange}
          keyboardType="numeric"
          placeholder="20"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🔄 Máximo de rondas (opcional)</Text>
        <Text style={styles.hint}>Deja vacío para ilimitado</Text>
        <TextInput
          style={styles.input}
          value={roundsText}
          onChangeText={handleRoundsChange}
          keyboardType="numeric"
          placeholder="Ilimitado"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>🎭 Tema de situaciones</Text>
        <Text style={styles.hint}>Selecciona un tema o usa aleatorio</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeScroll}>
          {THEMES.map((theme) => (
            <TouchableOpacity
              key={theme.id || 'random'}
              style={[
                styles.themeButton,
                situationTheme === theme.id && styles.themeButtonSelected
              ]}
              onPress={() => handleThemeSelect(theme.id)}
            >
              <Text style={styles.themeIcon}>{theme.icon}</Text>
              <Text style={[
                styles.themeName,
                situationTheme === theme.id && styles.themeNameSelected
              ]}>
                {theme.name}
              </Text>
              <Text style={styles.themeDescription}>{theme.description}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  containerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  hint: {
    fontSize: 13,
    color: '#888',
    marginBottom: 10,
    fontStyle: 'italic',
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  themeScroll: {
    marginTop: 10,
  },
  themeButton: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 12,
    marginRight: 10,
    alignItems: 'center',
    minWidth: 120,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  themeButtonSelected: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff5722',
    borderWidth: 3,
  },
  themeIcon: {
    fontSize: 32,
    marginBottom: 5,
  },
  themeName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  themeNameSelected: {
    color: '#ff5722',
    fontWeight: 'bold',
  },
  themeDescription: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
});

export default InterrogatorioGameSettings;

