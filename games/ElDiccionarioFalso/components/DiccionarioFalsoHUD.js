import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoHUD = () => {
  const currentRound = useDiccionarioFalsoStore((state) => state.currentRound);
  const maxRounds = useDiccionarioFalsoStore((state) => state.maxRounds);
  const players = useDiccionarioFalsoStore((state) => state.players);
  
  // Ordenar jugadores por puntuación (top 3)
  const topPlayers = [...players]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  
  return (
    <View style={styles.container}>
      <View style={styles.roundInfo}>
        <Text style={styles.roundLabel}>Ronda</Text>
        <Text style={styles.roundText}>
          {currentRound}/{maxRounds}
        </Text>
      </View>
      
      <View style={styles.scoresContainer}>
        <Text style={styles.scoresTitle}>Top 3</Text>
        {topPlayers.map((player, index) => (
          <View key={player.id} style={styles.scoreItem}>
            <Text style={styles.scoreRank}>{index + 1}.</Text>
            <Text style={styles.scoreName} numberOfLines={1}>
              {player.name}
            </Text>
            <Text style={styles.scoreValue}>{player.score}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(33, 150, 243, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  roundInfo: {
    alignItems: 'center',
    marginRight: 20,
  },
  roundLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  roundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoresContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  scoresTitle: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.9,
    marginRight: 8,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  scoreRank: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 4,
  },
  scoreName: {
    fontSize: 12,
    color: '#fff',
    maxWidth: 60,
    marginRight: 4,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
