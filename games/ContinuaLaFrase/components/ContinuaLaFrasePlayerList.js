import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const ContinuaLaFrasePlayerList = ({ players, currentPlayerId, showRoundVotes = true }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const totalPlayers = players.length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👥 Jugadores ({totalPlayers})</Text>
        {sortedPlayers.length > 0 && sortedPlayers[0].score > 0 && (
          <View style={styles.leaderBadge}>
            <Text style={styles.leaderBadgeText}>🏆 Líder</Text>
          </View>
        )}
      </View>
      <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
        {sortedPlayers.map((player, index) => {
          const isCurrentPlayer = player.id === currentPlayerId;
          const isLeader = index === 0 && player.score > 0;
          const hasRoundVotes = showRoundVotes && player.votes !== undefined && player.votes > 0;
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerItem,
                isCurrentPlayer && styles.playerItemCurrent,
                isLeader && styles.playerItemFirst,
              ]}
            >
              <View style={styles.positionContainer}>
                {index === 0 && player.score > 0 ? (
                  <Text style={styles.medal}>🥇</Text>
                ) : index === 1 && sortedPlayers[0].score > 0 ? (
                  <Text style={styles.medal}>🥈</Text>
                ) : index === 2 && sortedPlayers[0].score > 0 ? (
                  <Text style={styles.medal}>🥉</Text>
                ) : (
                  <Text style={styles.positionNumber}>#{index + 1}</Text>
                )}
              </View>
              
              <View style={styles.playerInfo}>
                <View style={styles.playerNameRow}>
                  <Text style={[
                    styles.playerName,
                    isCurrentPlayer && styles.playerNameCurrent,
                    isLeader && styles.playerNameLeader
                  ]}>
                    {isCurrentPlayer && '👤 '}
                    {player.name}
                  </Text>
                  {isCurrentPlayer && (
                    <View style={styles.currentBadge}>
                      <Text style={styles.currentBadgeText}>TÚ</Text>
                    </View>
                  )}
                </View>
                {hasRoundVotes && (
                  <View style={styles.votesContainer}>
                    <Text style={styles.votesText}>
                      ✨ {player.votes} {player.votes === 1 ? 'voto' : 'votos'} esta ronda
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.scoreContainer}>
                <Text style={[
                  styles.playerScore,
                  isLeader && styles.playerScoreLeader
                ]}>
                  {player.score}
                </Text>
                <Text style={styles.scoreLabel}>pts</Text>
              </View>
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
    maxHeight: 250,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  leaderBadge: {
    backgroundColor: '#fff9c4',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffd600',
  },
  leaderBadgeText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  list: {
    flex: 1,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerItemCurrent: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196F3',
    borderWidth: 2,
  },
  playerItemFirst: {
    backgroundColor: '#fff9c4',
    borderColor: '#ffd600',
    borderWidth: 2,
  },
  positionContainer: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  positionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#999',
  },
  medal: {
    fontSize: 24,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  playerNameCurrent: {
    color: '#1976d2',
  },
  playerNameLeader: {
    color: '#ff6f00',
    fontWeight: 'bold',
  },
  currentBadge: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  currentBadgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  votesContainer: {
    marginTop: 4,
  },
  votesText: {
    fontSize: 12,
    color: '#ff9800',
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'flex-end',
    marginLeft: 10,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  playerScoreLeader: {
    color: '#ff6f00',
    fontSize: 20,
  },
  scoreLabel: {
    fontSize: 10,
    color: '#999',
    marginTop: 2,
  },
});

