import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const DosVerdadesUnaMentiraScoreboard = ({ players }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = sortedPlayers.length > 1 && 
    sortedPlayers[0].score === sortedPlayers[1].score;

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const getRankStyle = (index) => {
    if (index === 0) return styles.playerItemWinner;
    if (index === 1) return styles.playerItemSecond;
    if (index === 2) return styles.playerItemThird;
    return styles.playerItem;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Resultados Finales</Text>
        {winner && !isTie && (
          <Text style={styles.winnerText}>
            ¡{winner.name} es el ganador!
          </Text>
        )}
        {isTie && (
          <Text style={styles.winnerText}>
            ¡Empate!
          </Text>
        )}
      </View>

      <View style={styles.podium}>
        {sortedPlayers.slice(0, 3).map((player, index) => (
          <View
            key={player.id}
            style={[
              styles.podiumItem,
              index === 0 && styles.podiumItemFirst,
              index === 1 && styles.podiumItemSecond,
              index === 2 && styles.podiumItemThird,
            ]}
          >
            <Text style={styles.podiumRank}>{getRankEmoji(index)}</Text>
            <Text style={styles.podiumName} numberOfLines={1}>
              {player.name}
            </Text>
            <Text style={styles.podiumScore}>{player.score} pts</Text>
          </View>
        ))}
      </View>

      {sortedPlayers.length > 3 && (
        <View style={styles.remainingPlayers}>
          <Text style={styles.remainingTitle}>Resto de jugadores</Text>
          {sortedPlayers.slice(3).map((player, index) => (
            <View
              key={player.id}
              style={[styles.playerItem, getRankStyle(index + 3)]}
            >
              <View style={styles.playerRankContainer}>
                <Text style={styles.playerRank}>{index + 4}.</Text>
                <Text style={styles.playerName}>{player.name}</Text>
              </View>
              <Text style={styles.playerScore}>{player.score} pts</Text>
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4caf50',
    marginTop: 5,
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    minHeight: 200,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
  },
  podiumItemFirst: {
    backgroundColor: '#fff9e6',
    borderWidth: 3,
    borderColor: '#ffd700',
    minHeight: 180,
    justifyContent: 'center',
  },
  podiumItemSecond: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#c0c0c0',
    minHeight: 150,
    justifyContent: 'center',
  },
  podiumItemThird: {
    backgroundColor: '#fff4e6',
    borderWidth: 2,
    borderColor: '#cd7f32',
    minHeight: 120,
    justifyContent: 'center',
  },
  podiumRank: {
    fontSize: 40,
    marginBottom: 10,
  },
  podiumName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  podiumScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  remainingPlayers: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  remainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerItemWinner: {
    backgroundColor: '#fff9e6',
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  playerItemSecond: {
    backgroundColor: '#f5f5f5',
    borderColor: '#c0c0c0',
  },
  playerItemThird: {
    backgroundColor: '#fff4e6',
    borderColor: '#cd7f32',
  },
  playerRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginRight: 10,
    width: 30,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
});
