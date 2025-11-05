import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';

export const DiccionarioDiabolicoFin = ({ navigation }) => {
  const players = useDiccionarioDiabolicoStore((state) => state.players);
  const resetGame = useDiccionarioDiabolicoStore((state) => state.resetGame);
  
  // Ordenar jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const maxScore = winner?.score || 0;
  const winners = sortedPlayers.filter(p => p.score === maxScore);
  
  const handlePlayAgain = () => {
    resetGame();
    if (navigation) {
      navigation.navigate('index');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Fin del Juego!</Text>
      </View>
      
      <View style={styles.winnerSection}>
        {winners.length === 1 ? (
          <>
            <Text style={styles.winnerLabel}>🏆 Maestro del Engaño</Text>
            <Text style={styles.winnerName}>{winner.name}</Text>
            <Text style={styles.winnerScore}>{winner.score} puntos</Text>
          </>
        ) : (
          <>
            <Text style={styles.winnerLabel}>🏆 Maestros del Engaño</Text>
            {winners.map((player, index) => (
              <View key={player.id} style={styles.multipleWinner}>
                <Text style={styles.winnerName}>{player.name}</Text>
                <Text style={styles.winnerScore}>{player.score} puntos</Text>
              </View>
            ))}
          </>
        )}
      </View>
      
      <View style={styles.scoreboardSection}>
        <Text style={styles.sectionTitle}>Clasificación Final</Text>
        {sortedPlayers.map((player, index) => {
          const isWinner = winners.some(w => w.id === player.id);
          
          return (
            <View
              key={player.id}
              style={[
                styles.scoreboardItem,
                isWinner && styles.scoreboardItemWinner,
                index === 0 && styles.scoreboardItemFirst,
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={[styles.rank, isWinner && styles.rankWinner]}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                </Text>
              </View>
              <View style={styles.playerInfo}>
                <Text style={[styles.scoreboardPlayerName, isWinner && styles.scoreboardPlayerNameWinner]}>
                  {player.name}
                </Text>
              </View>
              <Text style={[styles.scoreboardScore, isWinner && styles.scoreboardScoreWinner]}>
                {player.score}
              </Text>
            </View>
          );
        })}
      </View>
      
      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={handlePlayAgain}
      >
        <Text style={styles.playAgainButtonText}>Jugar Otra Vez</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 30,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  winnerSection: {
    backgroundColor: '#fff3cd',
    padding: 30,
    margin: 20,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffc107',
  },
  winnerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 12,
  },
  winnerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  winnerScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  multipleWinner: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreboardSection: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 20,
    marginTop: 0,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scoreboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scoreboardItemFirst: {
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    marginBottom: 8,
  },
  scoreboardItemWinner: {
    backgroundColor: '#fff3cd',
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
  },
  rank: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
  },
  rankWinner: {
    color: '#856404',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scoreboardPlayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreboardPlayerNameWinner: {
    color: '#856404',
  },
  scoreboardScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  scoreboardScoreWinner: {
    color: '#856404',
  },
  playAgainButton: {
    backgroundColor: '#6200ee',
    padding: 20,
    margin: 20,
    marginBottom: 40,
    borderRadius: 12,
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
