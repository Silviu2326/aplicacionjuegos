import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const EntrevistadorInesperadoPlayerList = ({ players, intervieweeId }) => {
  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>👥 Jugadores ({players.length})</Text>
      {sortedPlayers.map((player, index) => (
        <View
          key={player.id}
          style={[
            styles.playerCard,
            intervieweeId === player.id && styles.intervieweeCard,
            index === 0 && styles.topPlayerCard,
          ]}
        >
          <View style={styles.rankContainer}>
            <Text style={styles.rankEmoji}>{getRankEmoji(index)}</Text>
          </View>
          <View style={styles.playerInfo}>
            <View style={styles.playerNameRow}>
              <Text
                style={[
                  styles.playerName,
                  intervieweeId === player.id && styles.intervieweeName,
                ]}
              >
                {player.name}
                {intervieweeId === player.id && ' 👤'}
              </Text>
              {index === 0 && player.score > 0 && (
                <Text style={styles.leaderBadge}>👑 Líder</Text>
              )}
            </View>
            <View style={styles.scoreRow}>
              <Text style={styles.playerScore}>
                {player.score} {player.score === 1 ? 'punto' : 'puntos'}
              </Text>
              {player.score > 0 && (
                <View style={styles.scoreBar}>
                  <View 
                    style={[
                      styles.scoreBarFill, 
                      { width: `${Math.min(100, (player.score / Math.max(1, sortedPlayers[0]?.score || 1)) * 100)}%` }
                    ]} 
                  />
                </View>
              )}
            </View>
          </View>
          {intervieweeId === player.id && (
            <View style={styles.intervieweeBadge}>
              <Text style={styles.intervieweeBadgeText}>🎭 Entrevistado</Text>
            </View>
          )}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  playerCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  topPlayerCard: {
    borderWidth: 2,
    borderColor: '#ffd700',
    backgroundColor: '#fffef0',
  },
  intervieweeCard: {
    borderWidth: 2,
    borderColor: '#4caf50',
    backgroundColor: '#f1f8f4',
  },
  rankContainer: {
    marginRight: 12,
    width: 30,
    alignItems: 'center',
  },
  rankEmoji: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
  },
  playerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    flexWrap: 'wrap',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  intervieweeName: {
    color: '#4caf50',
    fontWeight: 'bold',
  },
  leaderBadge: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ff9800',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerScore: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    minWidth: 80,
  },
  scoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    overflow: 'hidden',
    maxWidth: 150,
  },
  scoreBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 3,
  },
  intervieweeBadge: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginLeft: 8,
  },
  intervieweeBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
});

