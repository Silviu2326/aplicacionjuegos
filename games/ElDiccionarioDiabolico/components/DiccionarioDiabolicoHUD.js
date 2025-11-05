import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';

export const DiccionarioDiabolicoHUD = () => {
  const currentRound = useDiccionarioDiabolicoStore((state) => state.currentRound);
  const maxRounds = useDiccionarioDiabolicoStore((state) => state.maxRounds);
  const getCurrentLector = useDiccionarioDiabolicoStore((state) => state.getCurrentLector);
  const players = useDiccionarioDiabolicoStore((state) => state.players);
  
  const lector = getCurrentLector();
  
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
      
      {lector && (
        <View style={styles.lectorInfo}>
          <Text style={styles.lectorLabel}>Lector:</Text>
          <Text style={styles.lectorName}>{lector.name}</Text>
        </View>
      )}
      
      <View style={styles.scoresContainer}>
        <Text style={styles.scoresTitle}>Puntuaciones</Text>
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
    backgroundColor: 'rgba(98, 0, 238, 0.95)',
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
    zIndex: 1000,
  },
  roundInfo: {
    alignItems: 'center',
    minWidth: 60,
  },
  roundLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
  },
  roundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  lectorInfo: {
    flex: 1,
    marginLeft: 16,
  },
  lectorLabel: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
  },
  lectorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  scoresContainer: {
    flex: 1,
    marginLeft: 16,
    alignItems: 'flex-end',
  },
  scoresTitle: {
    fontSize: 10,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  scoreItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  scoreRank: {
    fontSize: 12,
    color: '#fff',
    marginRight: 4,
    minWidth: 20,
  },
  scoreName: {
    fontSize: 12,
    color: '#fff',
    marginRight: 8,
    maxWidth: 80,
  },
  scoreValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
});
