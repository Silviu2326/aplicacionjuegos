import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const VozMisteriosaScoreboard = ({ players, currentPlayerId }) => {
  // Ordenar jugadores por puntuación (mayor a menor)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuaciones</Text>
      <ScrollView style={styles.scrollView}>
        {sortedPlayers.map((player, index) => {
          const isCurrentPlayer = player.id === currentPlayerId;
          const isLeader = index === 0 && player.score > 0;
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerRow,
                isCurrentPlayer && styles.playerRowCurrent,
                isLeader && styles.playerRowLeader,
              ]}
            >
              <View style={styles.playerInfo}>
                <Text style={[
                  styles.playerName,
                  isCurrentPlayer && styles.playerNameCurrent,
                  isLeader && styles.playerNameLeader,
                ]}>
                  {isLeader && '👑 '}
                  {isCurrentPlayer && '▶️ '}
                  {player.name}
                </Text>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[
                  styles.playerScore,
                  isCurrentPlayer && styles.playerScoreCurrent,
                  isLeader && styles.playerScoreLeader,
                ]}>
                  {player.score}
                </Text>
                <Text style={styles.scoreLabel}>puntos</Text>
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
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 200,
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  playerRowCurrent: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  playerRowLeader: {
    backgroundColor: '#fff9c4',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  playerNameCurrent: {
    fontWeight: 'bold',
    color: '#2196f3',
  },
  playerNameLeader: {
    color: '#f57f17',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  playerScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  playerScoreCurrent: {
    color: '#2196f3',
  },
  playerScoreLeader: {
    color: '#f57f17',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
  },
});

