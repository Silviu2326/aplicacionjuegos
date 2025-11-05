import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const SonidistaCiegoScoreboard = ({ players, showDetailedStats = false }) => {
  if (!players || players.length === 0) {
    return null;
  }

  // Ordenar jugadores por puntuación (de mayor a menor)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuación</Text>
      <ScrollView style={styles.scrollView}>
        {sortedPlayers.map((player, index) => {
          const isWinner = index === 0 && sortedPlayers.length > 1 && 
            sortedPlayers[0].score > sortedPlayers[1]?.score;
          const totalGuesses = (player.correctGuesses || 0) + (player.incorrectGuesses || 0);
          const accuracy = totalGuesses > 0
            ? ((player.correctGuesses || 0) / totalGuesses * 100).toFixed(0)
            : 0;
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerRow,
                isWinner && styles.playerRowWinner,
              ]}
            >
              <View style={styles.playerInfo}>
                <Text style={styles.rank}>
                  {isWinner ? '🏆' : `${index + 1}.`}
                </Text>
                <View style={styles.playerDetails}>
                  <Text style={[
                    styles.playerName,
                    isWinner && styles.playerNameWinner,
                  ]}>
                    {player.name}
                  </Text>
                  {showDetailedStats && totalGuesses > 0 && (
                    <View style={styles.statsRow}>
                      <Text style={styles.statText}>
                        {player.correctGuesses || 0}✓ {player.incorrectGuesses || 0}✗
                      </Text>
                      <Text style={styles.accuracyText}>
                        {accuracy}% precisión
                      </Text>
                    </View>
                  )}
                  {showDetailedStats && player.roundsAsBlindSound > 0 && (
                    <Text style={styles.statText}>
                      {player.roundsAsBlindSound} ronda{player.roundsAsBlindSound !== 1 ? 's' : ''} como Sonidista
                    </Text>
                  )}
                </View>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[styles.score, isWinner && styles.scoreWinner]}>
                  {player.score}
                </Text>
                <Text style={styles.scoreLabel}>
                  {player.score === 1 ? 'punto' : 'puntos'}
                </Text>
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
    padding: 20,
    borderRadius: 15,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 400,
  },
  playerRow: {
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
  playerRowWinner: {
    backgroundColor: '#fff3e0',
    borderWidth: 2,
    borderColor: '#ff9800',
    shadowColor: '#ff9800',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 12,
    minWidth: 35,
    textAlign: 'center',
  },
  playerDetails: {
    flex: 1,
  },
  playerName: {
    fontSize: 17,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  playerNameWinner: {
    color: '#ff5722',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginRight: 8,
  },
  accuracyText: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  scoreWinner: {
    fontSize: 28,
    color: '#ff9800',
  },
  scoreLabel: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
});

