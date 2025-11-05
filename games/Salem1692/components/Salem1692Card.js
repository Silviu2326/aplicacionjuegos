import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Salem1692Card = ({ 
  card, 
  onPress, 
  isSelected = false,
  isPlayable = true,
  size = 'medium', // 'small', 'medium', 'large'
}) => {
  if (!card) return null;
  
  const sizeStyles = {
    small: { width: 80, height: 120, fontSize: 10 },
    medium: { width: 120, height: 180, fontSize: 14 },
    large: { width: 160, height: 240, fontSize: 16 },
  };
  
  const currentSize = sizeStyles[size] || sizeStyles.medium;
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          width: currentSize.width,
          height: currentSize.height,
        },
        isSelected && styles.selectedCard,
        !isPlayable && styles.disabledCard,
      ]}
      onPress={onPress}
      disabled={!isPlayable || !onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        <Text 
          style={[
            styles.cardName, 
            { fontSize: currentSize.fontSize }
          ]}
          numberOfLines={2}
        >
          {card.name}
        </Text>
        <Text 
          style={[
            styles.cardDescription,
            { fontSize: currentSize.fontSize - 2 }
          ]}
          numberOfLines={6}
        >
          {card.description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    margin: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    borderColor: '#4CAF50',
    borderWidth: 3,
    backgroundColor: '#e8f5e9',
    transform: [{ scale: 1.05 }],
  },
  disabledCard: {
    opacity: 0.5,
  },
  cardContent: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
  },
  cardName: {
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    color: '#666',
    textAlign: 'center',
    flex: 1,
  },
});

