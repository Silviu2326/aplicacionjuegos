import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Salem1692Card } from './Salem1692Card';

export const Salem1692HandView = ({ 
  hand, 
  onCardPress, 
  selectedCardId = null,
  isPlayable = true,
}) => {
  if (!hand || hand.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes cartas en tu mano</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tu Mano ({hand.length})</Text>
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {hand.map((card, index) => (
          <Salem1692Card
            key={card.instanceId || index}
            card={card}
            onPress={() => onCardPress && onCardPress(card)}
            isSelected={selectedCardId === (card.instanceId || card.id)}
            isPlayable={isPlayable}
            size="small"
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderTopWidth: 2,
    borderTopColor: '#ddd',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  scrollContent: {
    paddingHorizontal: 4,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  emptyText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
});

