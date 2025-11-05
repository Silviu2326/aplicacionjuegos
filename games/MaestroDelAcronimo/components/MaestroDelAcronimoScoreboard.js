import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const MaestroDelAcronimoScoreboard = ({ players, currentRound, maxRounds }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers.length > 0 && sortedPlayers[0].score > 0 ? sortedPlayers[0] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuación</Text>
      {currentRound && maxRounds && (
        <Text style={styles.subtitle}>
          Ronda {currentRound} de {maxRounds}
        </Text>
      )}
      
      {sortedPlayers.length === 0 ? (
        <Text style={styles.emptyText}>No hay jugadores</Text>
      ) : (
        <ScrollView style={styles.playersList}>
          {sortedPlayers.map((player, index) => {
            const isWinner = index === 0 && winner && winner.score > 0;
            const podiumPosition = index < 3 ? index + 1 : null;
            
            return (
              <View
                key={player.id}
                style={[
                  styles.playerRow,
                  isWinner && styles.playerRowWinner,
                  podiumPosition === 1 && styles.playerRowGold,
                  podiumPosition === 2 && styles.playerRowSilver,
                  podiumPosition === 3 && styles.playerRowBronze,
                ]}
              >
                <View style={styles.positionContainer}>
                  {podiumPosition === 1 && <Text style={styles.medal}>🥇</Text>}
                  {podiumPosition === 2 && <Text style={styles.medal}>🥈</Text>}
                  {podiumPosition === 3 && <Text style={styles.medal}>🥉</Text>}
                  {!podiumPosition && (
                    <Text style={styles.position}>{index + 1}º</Text>
                  )}
                </View>
                
                <View style={styles.playerInfo}>
                  <Text style={[styles.playerName, isWinner && styles.playerNameWinner]}>
                    {player.name}
                  </Text>
                </View>
                
                <Text style={[styles.playerScore, isWinner && styles.playerScoreWinner]}>
                  {player.score} pts
                </Text>
              </View>
            );
          })}
        </ScrollView>
      )}
      
      {winner && winner.score > 0 && maxRounds && currentRound >= maxRounds && (
        <View style={styles.winnerContainer}>
          <Text style={styles.winnerText}>🏆 Maestro del Acrónimo 🏆</Text>
          <Text style={styles.winnerName}>{winner.name}</Text>
          <Text style={styles.winnerScore}>{winner.score} puntos</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 15,
    marginHorizontal: 10,
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  playersList: {
    maxHeight: 400,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerRowWinner: {
    backgroundColor: '#fff9c4',
    borderColor: '#ffd600',
    borderWidth: 2,
  },
  playerRowGold: {
    backgroundColor: '#fff9c4',
    borderColor: '#ffd600',
    borderWidth: 2,
  },
  playerRowSilver: {
    backgroundColor: '#e8e8e8',
    borderColor: '#9e9e9e',
    borderWidth: 2,
  },
  playerRowBronze: {
    backgroundColor: '#ffe0b2',
    borderColor: '#ff9800',
    borderWidth: 2,
  },
  positionContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  medal: {
    fontSize: 28,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  playerNameWinner: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6f00',
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  playerScoreWinner: {
    fontSize: 20,
    color: '#ff6f00',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  winnerContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff9c4',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ffd600',
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  winnerScore: {
    fontSize: 18,
    color: '#666',
  },
});

