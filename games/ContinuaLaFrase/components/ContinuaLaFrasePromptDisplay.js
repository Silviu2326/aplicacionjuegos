import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ContinuaLaFrasePromptDisplay = ({ prompt, roundNumber, maxRounds }) => {
  if (!prompt) return null;

  return (
    <View style={styles.container}>
      {roundNumber && (
        <View style={styles.roundBadge}>
          <Text style={styles.roundBadgeText}>
            Ronda {roundNumber}{maxRounds ? ` de ${maxRounds}` : ''}
          </Text>
        </View>
      )}
      <View style={styles.promptWrapper}>
        <Text style={styles.promptLabel}>Continúa la frase:</Text>
        <Text style={styles.promptText}>{prompt}</Text>
      </View>
      <View style={styles.hintContainer}>
        <Text style={styles.hintText}>
          💭 Escribe algo creativo, divertido o sorprendente
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    marginVertical: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#2196F3',
    position: 'relative',
  },
  roundBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#ff9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  roundBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  promptWrapper: {
    marginTop: 8,
  },
  promptLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  promptText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
    letterSpacing: 0.5,
  },
  hintContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  hintText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

