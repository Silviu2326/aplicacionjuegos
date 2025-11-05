import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const DosVerdadesUnaMentiraPlayerHUD = ({ players, narratorId }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getPlayerStats = (player) => {
    if (!player.stats) return null;
    const stats = player.stats;
    const accuracy = stats.totalVotes > 0 
      ? Math.round((stats.correctGuesses / stats.totalVotes) * 100) 
      : 0;
    return { accuracy, ...stats };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Jugadores ({players.length})</Text>
      <ScrollView style={styles.list}>
        {sortedPlayers.map((player, index) => {
          const isNarrator = player.id === narratorId;
          const playerStats = getPlayerStats(player);
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerItem,
                isNarrator && styles.playerItemNarrator,
                index === 0 && styles.playerItemFirst,
              ]}
            >
              <View style={styles.playerMainInfo}>
                <View style={styles.playerNameContainer}>
                  <Text style={styles.playerRank}>#{index + 1}</Text>
                  <Text style={styles.playerName}>
                    {isNarrator && '🎤 '}
                    {player.name}
                    {index === 0 && ' 🏆'}
                  </Text>
                </View>
                <Text style={styles.playerScore}>{player.score} pts</Text>
              </View>
              
              {playerStats && (
                <View style={styles.playerStatsContainer}>
                  <View style={styles.statRow}>
                    <Text style={styles.statText}>
                      🎯 Precisión: {playerStats.accuracy}%
                    </Text>
                    {isNarrator && playerStats.timesNarrator > 0 && (
                      <Text style={styles.statText}>
                        😈 Engañó: {playerStats.timesFooled}
                      </Text>
                    )}
                  </View>
                </View>
              )}
              
              {isNarrator && (
                <View style={styles.badgesContainer}>
                  <Text style={styles.narratorBadge}>🎭 Narrador</Text>
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    maxHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  playerItem: {
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerMainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerRank: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
    marginRight: 8,
    minWidth: 30,
  },
  playerItemNarrator: {
    backgroundColor: '#fff9e6',
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  playerItemFirst: {
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  playerStatsContainer: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  badgesContainer: {
    marginTop: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  playerScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 10,
  },
  narratorBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff8c00',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 5,
    marginTop: 5,
  },
});
