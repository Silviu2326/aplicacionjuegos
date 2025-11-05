import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const ConexionInesperadaScoreboard = ({ players, currentRound, maxRounds, currentResponses = [] }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  // Calcular estadísticas adicionales
  const getPlayerStats = (playerId) => {
    const responses = currentResponses.filter(r => r.playerId === playerId);
    const totalVotes = responses.reduce((sum, r) => sum + (r.votes || 0), 0);
    const wins = responses.filter(r => {
      const maxVotes = Math.max(...currentResponses.map(res => res.votes || 0));
      return r.votes === maxVotes && maxVotes > 0;
    }).length;
    return { totalVotes, wins, responsesCount: responses.length };
  };

  const getProgressPercentage = () => {
    return Math.round((currentRound / maxRounds) * 100);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>🏆 Clasificación</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[styles.progressFill, { width: `${getProgressPercentage()}%` }]} 
              />
            </View>
            <Text style={styles.progressText}>{getProgressPercentage()}%</Text>
          </View>
        </View>
        <Text style={styles.roundText}>
          Ronda {currentRound} de {maxRounds}
        </Text>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {sortedPlayers.map((player, index) => {
          const stats = getPlayerStats(player.id);
          const isTopThree = index < 3;
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerRow,
                index === 0 && styles.firstPlace,
                index === 1 && styles.secondPlace,
                index === 2 && styles.thirdPlace,
              ]}
            >
              <View style={styles.positionContainer}>
                <Text style={styles.positionText}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `${index + 1}.`}
                </Text>
              </View>
              
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>{player.name}</Text>
                {stats.responsesCount > 0 && (
                  <View style={styles.statsRow}>
                    <Text style={styles.statsText}>
                      {stats.wins} {stats.wins === 1 ? 'victoria' : 'victorias'}
                    </Text>
                    <Text style={styles.statsSeparator}>•</Text>
                    <Text style={styles.statsText}>
                      {stats.totalVotes} {stats.totalVotes === 1 ? 'voto' : 'votos'}
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.scoreContainer}>
                <Text style={[
                  styles.scoreText,
                  isTopThree && styles.scoreTextTop
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
    borderRadius: 20,
    padding: 18,
    marginVertical: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 8,
    maxHeight: 400,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  header: {
    marginBottom: 15,
    paddingBottom: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginRight: 8,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    minWidth: 35,
  },
  roundText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 300,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 5,
    borderRadius: 12,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  firstPlace: {
    backgroundColor: '#fff9c4',
    borderWidth: 3,
    borderColor: '#ffd700',
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  secondPlace: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#c0c0c0',
  },
  thirdPlace: {
    backgroundColor: '#ffe0b2',
    borderWidth: 2,
    borderColor: '#cd7f32',
  },
  positionContainer: {
    width: 45,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsText: {
    fontSize: 11,
    color: '#888',
    fontWeight: '500',
  },
  statsSeparator: {
    fontSize: 11,
    color: '#ccc',
    marginHorizontal: 6,
  },
  scoreContainer: {
    alignItems: 'flex-end',
    minWidth: 70,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  scoreTextTop: {
    fontSize: 22,
    color: '#2E7D32',
  },
  scoreLabel: {
    fontSize: 10,
    color: '#888',
    marginTop: 2,
    fontWeight: '500',
  },
});

