import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CHARACTER_INFO } from '../constants/MascaradeCharacterData';

export const MascaradeCard = ({ 
  character, 
  revealed = false, 
  size = 'medium', 
  onPress 
}) => {
  const characterInfo = character ? CHARACTER_INFO[character] : null;
  
  const CardComponent = (
    <View style={[styles.container, styles[`size_${size}`]]}>
      <View style={[
        styles.card, 
        revealed && characterInfo ? { backgroundColor: characterInfo.color } : styles.cardBack,
        !revealed && styles.cardHidden
      ]}>
        {revealed && characterInfo ? (
          <>
            <Text style={styles.cardCharacterName}>{characterInfo.name}</Text>
            <Text style={styles.cardPower}>{characterInfo.power}</Text>
            <Text style={styles.cardDescription} numberOfLines={4}>
              {characterInfo.description}
            </Text>
          </>
        ) : (
          <Text style={styles.cardBackText}>?</Text>
        )}
      </View>
    </View>
  );
  
  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {CardComponent}
      </TouchableOpacity>
    );
  }
  
  return CardComponent;
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    padding: 8,
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
  cardHidden: {
    backgroundColor: '#2C2C2C',
  },
  cardCharacterName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 6,
  },
  cardPower: {
    fontSize: 11,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    fontStyle: 'italic',
    fontWeight: '600',
  },
  cardDescription: {
    fontSize: 9,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 12,
  },
  cardBackText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
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
    width: 120,
    height: 180,
  },
});

