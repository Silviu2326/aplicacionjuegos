import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { CoupCard } from './CoupCard';

export const CoupOpponentView = ({ player, onPress }) => {
  if (!player) return null;
  
  const revealedCount = player.influence.filter(inf => inf.revealed).length;
  const hiddenCount = player.influence.length - revealedCount;
  const influenceDisplay = player.influence.map((inf, index) => (
    <CoupCard
      key={index}
      character={inf.character}
      revealed={inf.revealed}
      size="small"
    />
  ));
  
  return (
    <View style={[styles.container, player.eliminated && styles.eliminated]}>
      <Text style={styles.playerName}>{player.name}</Text>
      
      <View style={styles.statsRow}>
        <Text style={styles.statText}>💰 {player.coins}</Text>
        <Text style={styles.statText}>
          {hiddenCount} {hiddenCount === 1 ? 'influencia' : 'influencias'}
        </Text>
      </View>
      
      <View style={styles.cardsRow}>
        {influenceDisplay}
      </View>
      
      {player.eliminated && (
        <View style={styles.eliminatedBadge}>
          <Text style={styles.eliminatedText}>Eliminado</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    margin: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    minWidth: 150,
  },
  eliminated: {
    opacity: 0.5,
    borderColor: '#f44336',
  },
  playerName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statText: {
    fontSize: 12,
    color: '#666',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  eliminatedBadge: {
    marginTop: 8,
    backgroundColor: '#f44336',
    padding: 4,
    borderRadius: 4,
  },
  eliminatedText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
