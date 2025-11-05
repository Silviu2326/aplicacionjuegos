import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export const DeceptionEvidenceCard = ({ 
  card, 
  type, // 'weapon' o 'clue'
  isSelectable = false,
  isSelected = false,
  onPress 
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        isSelectable && styles.selectable
      ]}
      onPress={onPress}
      disabled={!isSelectable}
    >
      {card?.image && (
        <Image source={card.image} style={styles.cardImage} />
      )}
      <Text style={styles.cardName}>{card?.name || 'Carta'}</Text>
      <Text style={styles.cardType}>{type === 'weapon' ? 'Arma' : 'Pista Clave'}</Text>
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedCheckmark}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 12,
    margin: 5,
    alignItems: 'center',
    minWidth: 110,
    borderWidth: 2,
    borderColor: '#0f3460',
  },
  selectable: {
    borderColor: '#4a90e2',
    backgroundColor: '#1e3a5e',
  },
  selected: {
    borderColor: '#2ecc71',
    backgroundColor: '#1e3a2e',
  },
  cardImage: {
    width: 70,
    height: 70,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardName: {
    fontSize: 13,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
    color: '#fff',
  },
  cardType: {
    fontSize: 11,
    color: '#a0a0a0',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  selectedCheckmark: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
