import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EntrevistadorInesperadoCharacterCard = ({ character }) => {
  if (!character) {
    return null;
  }

  const getRandomEmoji = () => {
    const emojis = ['🎭', '🎪', '🎨', '🎯', '🎲', '🎴', '🎵', '🎶', '🎸', '🎹', '🎺', '🎻', '🎼', '🎽', '🎾', '🎿'];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>{getRandomEmoji()}</Text>
      </View>
      <Text style={styles.label}>🎯 Tu personaje secreto es:</Text>
      <View style={styles.characterContainer}>
        <Text style={styles.character}>{character}</Text>
      </View>
      <View style={styles.tipsBox}>
        <Text style={styles.tipsTitle}>💡 Consejos para tu actuación:</Text>
        <Text style={styles.tipsText}>
          • Responde como si fueras este personaje{'\n'}
          • Da pistas sutiles sin revelar directamente quién eres{'\n'}
          • Sé creativo y mantén el personaje consistente{'\n'}
          • Diviértete actuando en la entrevista
        </Text>
      </View>
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>
          ⚠️ No reveles tu identidad directamente. ¡Mantén el misterio!
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 3,
    borderColor: '#4caf50',
  },
  iconContainer: {
    marginBottom: 20,
  },
  icon: {
    fontSize: 60,
  },
  label: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: '600',
  },
  characterContainer: {
    backgroundColor: '#f1f8f4',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4caf50',
    borderStyle: 'dashed',
  },
  character: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    textAlign: 'center',
    lineHeight: 32,
  },
  tipsBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    width: '100%',
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  tipsText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  warningBox: {
    backgroundColor: '#fff3cd',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '600',
  },
});

