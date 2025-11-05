import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoWordDisplay = () => {
  const currentWord = useDiccionarioFalsoStore((state) => state.currentWord);
  const currentRound = useDiccionarioFalsoStore((state) => state.currentRound);
  const maxRounds = useDiccionarioFalsoStore((state) => state.maxRounds);
  
  if (!currentWord) {
    return null;
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.roundInfo}>
        <Text style={styles.roundText}>
          Ronda {currentRound} de {maxRounds}
        </Text>
        <Text style={styles.roundProgress}>
          {Math.round((currentRound / maxRounds) * 100)}% completado
        </Text>
      </View>
      <View style={styles.wordContainer}>
        <Text style={styles.wordLabel}>📝 Palabra de la ronda:</Text>
        <Text style={styles.wordText}>{currentWord.palabra}</Text>
        <View style={styles.wordInfo}>
          <Text style={styles.wordInfoText}>
            {currentWord.palabra.length} letras
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 24,
  },
  roundInfo: {
    marginBottom: 12,
  },
  roundText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  roundProgress: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  wordContainer: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    borderWidth: 3,
    borderColor: '#2196f3',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: '80%',
    alignItems: 'center',
  },
  wordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196f3',
    textAlign: 'center',
  },
  wordInfo: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  wordInfoText: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
