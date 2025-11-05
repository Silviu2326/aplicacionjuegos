import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useGeoguessrDeSalonStore } from '../store/geoguessrDeSalonStore';

export const GeoguessrDeSalonScoreboard = ({ highlightWinner = false }) => {
  const { players, getWinner } = useGeoguessrDeSalonStore();
  const winner = highlightWinner ? getWinner() : null;
  const winnerIds = Array.isArray(winner) ? winner.map(w => w.id) : winner ? [winner.id] : [];

  // Ordenar jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Marcador</Text>
      <ScrollView style={styles.scrollView}>
        {sortedPlayers.map((player, index) => {
          const isWinner = winnerIds.includes(player.id);
          return (
            <View 
              key={player.id} 
              style={[
                styles.playerItem,
                isWinner && styles.winnerItem
              ]}
            >
              <View style={styles.playerInfo}>
                <Text style={[styles.rank, isWinner && styles.winnerRank]}>
                  #{index + 1}
                </Text>
                <Text style={[styles.playerName, isWinner && styles.winnerName]}>
                  {player.name}
                </Text>
              </View>
              <Text style={[styles.score, isWinner && styles.winnerScore]}>
                {player.score} {player.score === 1 ? 'punto' : 'puntos'}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  scrollView: {
    maxHeight: 300,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  winnerItem: {
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#fff',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
    marginRight: 15,
    minWidth: 40,
  },
  winnerRank: {
    color: '#fff',
  },
  playerName: {
    fontSize: 18,
    color: '#fff',
    flex: 1,
  },
  winnerName: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  winnerScore: {
    color: '#fff',
    fontSize: 20,
  },
});

