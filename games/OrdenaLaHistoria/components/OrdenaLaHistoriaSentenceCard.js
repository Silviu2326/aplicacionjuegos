import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const OrdenaLaHistoriaSentenceCard = ({ sentence, onReveal }) => {
  const [isRevealed, setIsRevealed] = useState(false);

  const handlePress = () => {
    if (!isRevealed && onReveal) {
      onReveal();
    }
    setIsRevealed(true);
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={isRevealed}
    >
      {!isRevealed ? (
        <View style={styles.hiddenContainer}>
          <Text style={styles.hiddenText}>Toca para revelar tu frase</Text>
          <Text style={styles.hiddenHint}>¡Recuerda! No puedes leerla en voz alta</Text>
        </View>
      ) : (
        <View style={styles.revealedContainer}>
          <Text style={styles.sentenceText}>{sentence}</Text>
          <Text style={styles.warningText}>
            ⚠️ Describe tu frase, no la leas textualmente
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 16,
    minHeight: 200,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  hiddenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  hiddenText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666666',
    textAlign: 'center',
    marginBottom: 8,
  },
  hiddenHint: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  revealedContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sentenceText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
    lineHeight: 28,
    marginBottom: 16,
  },
  warningText: {
    fontSize: 14,
    color: '#FF6B6B',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 12,
  },
});
