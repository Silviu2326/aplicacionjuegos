import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoupCard } from './CoupCard';

export const CoupPlayerHand = ({ player, isCurrentPlayer = false }) => {
  if (!player) return null;
  
  const revealedCount = player.influence.filter(inf => inf.revealed).length;
  const hiddenCount = player.influence.length - revealedCount;
  
  return (
    <View style={[styles.container, isCurrentPlayer && styles.currentPlayer]}>
      <View style={styles.header}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={styles.coinCount}>{player.coins} 💰</Text>
      </View>
      
      <View style={styles.cardsContainer}>
        {player.influence.map((inf, index) => (
          <View key={index} style={styles.cardWrapper}>
            <CoupCard
              character={inf.character}
              revealed={inf.revealed || isCurrentPlayer}
              size="small"
            />
            {inf.revealed && (
              <View style={styles.revealedBadge}>
                <Text style={styles.revealedText}>Revelada</Text>
              </View>
            )}
          </View>
        ))}
      </View>
      
      <Text style={styles.influenceInfo}>
        Influencias: {hiddenCount} ocultas, {revealedCount} reveladas
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  currentPlayer: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  coinCount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF9800',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  cardWrapper: {
    alignItems: 'center',
  },
  revealedBadge: {
    marginTop: 4,
    backgroundColor: '#f44336',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  revealedText: {
    color: '#fff',
    fontSize: 8,
    fontWeight: 'bold',
  },
  influenceInfo: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});
