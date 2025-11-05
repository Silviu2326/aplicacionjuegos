import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';
import { DiccionarioFalsoScoreboard } from '../components/DiccionarioFalsoScoreboard';

export const DiccionarioFalsoResultados = ({ navigation }) => {
  const players = useDiccionarioFalsoStore((state) => state.players);
  const resetGame = useDiccionarioFalsoStore((state) => state.resetGame);
  const maxRounds = useDiccionarioFalsoStore((state) => state.maxRounds);
  const currentRound = useDiccionarioFalsoStore((state) => state.currentRound);
  
  // Ordenar jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const maxScore = winner?.score || 0;
  const winners = sortedPlayers.filter(p => p.score === maxScore);
  
  // Calcular estadísticas
  const totalRounds = currentRound || maxRounds;
  const averageScore = players.length > 0 
    ? Math.round((players.reduce((sum, p) => sum + p.score, 0) / players.length) * 10) / 10
    : 0;
  const highestScore = maxScore;
  const lowestScore = sortedPlayers.length > 0 
    ? sortedPlayers[sortedPlayers.length - 1].score 
    : 0;
  const scoreRange = highestScore - lowestScore;
  
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
            <Text style={styles.winnerScore}>{winner.score} {winner.score === 1 ? 'punto' : 'puntos'}</Text>
          </>
        ) : (
          <>
            <Text style={styles.winnerLabel}>🏆 Maestros del Engaño</Text>
            {winners.map((player) => (
              <View key={player.id} style={styles.multipleWinner}>
                <Text style={styles.winnerName}>{player.name}</Text>
                <Text style={styles.winnerScore}>{player.score} {player.score === 1 ? 'punto' : 'puntos'}</Text>
              </View>
            ))}
          </>
        )}
      </View>
      
      <View style={styles.scoreboardSection}>
        <DiccionarioFalsoScoreboard />
      </View>
      
      {/* Estadísticas del juego */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>📊 Estadísticas de la Partida</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{totalRounds}</Text>
            <Text style={styles.statLabel}>Rondas jugadas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{averageScore}</Text>
            <Text style={styles.statLabel}>Puntos promedio</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{highestScore}</Text>
            <Text style={styles.statLabel}>Puntuación máxima</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{scoreRange}</Text>
            <Text style={styles.statLabel}>Diferencia de puntos</Text>
          </View>
        </View>
        
        {/* Logros especiales */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.achievementsTitle}>🏆 Logros Especiales</Text>
          {winners.length === 1 && (
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>👑</Text>
              <Text style={styles.achievementText}>
                <Text style={styles.achievementName}>{winner.name}</Text> ha demostrado ser el verdadero Maestro del Engaño con {winner.score} puntos.
              </Text>
            </View>
          )}
          {scoreRange === 0 && players.length > 1 && (
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>⚖️</Text>
              <Text style={styles.achievementText}>
                ¡Empate perfecto! Todos los jugadores terminaron con la misma puntuación.
              </Text>
            </View>
          )}
          {highestScore === 0 && (
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>🎯</Text>
              <Text style={styles.achievementText}>
                ¡Nadie logró puntos! Fue una partida muy difícil.
              </Text>
            </View>
          )}
          {averageScore >= 10 && (
            <View style={styles.achievementItem}>
              <Text style={styles.achievementEmoji}>⭐</Text>
              <Text style={styles.achievementText}>
                Partida de alto nivel con un promedio de {averageScore} puntos por jugador.
              </Text>
            </View>
          )}
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={handlePlayAgain}
        >
          <Text style={styles.playAgainButtonText}>Jugar de Nuevo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196f3',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  winnerSection: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffd700',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  winnerLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 12,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  winnerScore: {
    fontSize: 24,
    fontWeight: '600',
    color: '#666',
  },
  multipleWinner: {
    alignItems: 'center',
    marginBottom: 16,
  },
  scoreboardSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  actionsContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  playAgainButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsSection: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  achievementsContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  achievementsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  achievementEmoji: {
    fontSize: 24,
    marginRight: 12,
  },
  achievementText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  achievementName: {
    fontWeight: 'bold',
    color: '#333',
  },
});
