import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CHARACTER_INFO, COUP_CHARACTERS } from '../constants/CoupCharacters';

export const CoupCard = ({ character, revealed = false, size = 'medium', onPress }) => {
  const cardName = revealed && character ? CHARACTER_INFO[character]?.name : '';
  const characterInfo = character ? CHARACTER_INFO[character] : null;
  
  // Colores para cada personaje
  const characterColors = {
    [COUP_CHARACTERS.DUKE]: '#9C27B0',
    [COUP_CHARACTERS.ASSASSIN]: '#F44336',
    [COUP_CHARACTERS.CAPTAIN]: '#2196F3',
    [COUP_CHARACTERS.AMBASSADOR]: '#FF9800',
    [COUP_CHARACTERS.CONTESSA]: '#E91E63',
  };
  
  const cardColor = character && revealed ? characterColors[character] : '#666';
  
  return (
    <View style={[styles.container, styles[`size_${size}`]]}>
      <View style={[styles.card, { backgroundColor: cardColor }, !revealed && styles.cardBack]}>
        {revealed && character && characterInfo ? (
          <>
            <Text style={styles.cardCharacterName}>{characterInfo.name}</Text>
            <Text style={styles.cardAction}>{characterInfo.action || 'Bloqueo'}</Text>
            {characterInfo.description && (
              <Text style={styles.cardDescription} numberOfLines={3}>
                {characterInfo.description}
              </Text>
            )}
          </>
        ) : (
          <Text style={styles.cardBackText}>?</Text>
        )}
      </View>
      {revealed && character && (
        <Text style={styles.cardName}>{cardName}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    padding: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardBack: {
    backgroundColor: '#424242',
  },
  cardCharacterName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardAction: {
    fontSize: 10,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    fontStyle: 'italic',
  },
  cardDescription: {
    fontSize: 8,
    color: '#fff',
    textAlign: 'center',
  },
  cardBackText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  cardName: {
    marginTop: 4,
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  size_small: {
    width: 60,
    height: 90,
  },
  size_medium: {
    width: 80,
    height: 120,
  },
  size_large: {
    width: 100,
    height: 150,
  },
});
