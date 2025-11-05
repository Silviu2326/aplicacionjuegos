import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MascaradeCard } from './MascaradeCard';

export const MascaradePlayerDisplay = ({ 
  player, 
  isCurrentTurn = false,
  isLocalPlayer = false,
}) => {
  const { name, coins, character, cardRevealed } = player;
  
  return (
    <View style={[
      styles.container,
      isCurrentTurn && styles.currentTurn,
      isLocalPlayer && styles.localPlayer
    ]}>
      <Text style={styles.playerName}>{name}</Text>
      <View style={styles.coinsContainer}>
        <Text style={styles.coinsText}>{coins} 💰</Text>
      </View>
      <MascaradeCard 
        character={character}
        revealed={cardRevealed || isLocalPlayer}
        size="medium"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 12,
    margin: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    minWidth: 100,
  },
  currentTurn: {
    borderColor: '#4CAF50',
    borderWidth: 3,
    backgroundColor: '#E8F5E9',
  },
  localPlayer: {
    borderColor: '#2196F3',
    borderWidth: 2,
    backgroundColor: '#E3F2FD',
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#333',
  },
  coinsContainer: {
    marginBottom: 8,
  },
  coinsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF9800',
  },
});

