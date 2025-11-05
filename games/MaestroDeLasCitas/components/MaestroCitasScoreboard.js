import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MaestroCitasScoreboard = ({ currentRound, totalRounds, score, players }) => {
  const progressPercentage = (currentRound / totalRounds) * 100;
  
  const getMedal = (position) => {
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return null;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.infoRow}>
        <View style={styles.roundContainer}>
          <Text style={styles.roundLabel}>Ronda</Text>
          <Text style={styles.roundText}>
            {currentRound} / {totalRounds}
          </Text>
        </View>
        {players && players.length > 0 && (
          <View style={styles.scoreContainer}>
            <Text style={styles.scoreLabel}>Puntos</Text>
            <Text style={styles.scoreText}>
              {score || players[0]?.score || 0}
            </Text>
          </View>
        )}
      </View>
      
      {/* Barra de progreso */}
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPercentage}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round(progressPercentage)}% completado
        </Text>
      </View>
      
      {/* Mostrar tabla de puntuaciones si hay múltiples jugadores */}
      {players && players.length > 1 && (
        <View style={styles.playersContainer}>
          {players
            .sort((a, b) => b.score - a.score)
            .map((player, index) => {
              const medal = getMedal(index);
              return (
                <View 
                  key={player.id} 
                  style={[
                    styles.playerRow,
                    index === 0 && styles.playerRowFirst
                  ]}
                >
                  <View style={styles.playerLeft}>
                    {medal && (
                      <Text style={styles.medal}>{medal}</Text>
                    )}
                    <Text style={styles.playerRank}>
                      {!medal && `${index + 1}.`}
                    </Text>
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
                  <View style={styles.playerRight}>
                    <Text style={styles.playerScore}>{player.score}</Text>
                    <Text style={styles.playerScoreLabel}>pts</Text>
                  </View>
                </View>
              );
            })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  roundContainer: {
    alignItems: 'flex-start',
  },
  roundLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roundText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2196f3',
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    fontWeight: '500',
  },
  playersContainer: {
    marginTop: 5,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 4,
  },
  playerRowFirst: {
    backgroundColor: '#fff9e6',
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  playerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  medal: {
    fontSize: 20,
    marginRight: 8,
  },
  playerRank: {
    fontSize: 14,
    color: '#999',
    fontWeight: '600',
    marginRight: 8,
    minWidth: 20,
  },
  playerName: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
    flex: 1,
  },
  playerRight: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  playerScore: {
    fontSize: 18,
    color: '#2196f3',
    fontWeight: '700',
    marginRight: 4,
  },
  playerScoreLabel: {
    fontSize: 11,
    color: '#999',
    fontWeight: '500',
  },
});

