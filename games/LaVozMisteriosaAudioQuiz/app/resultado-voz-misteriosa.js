import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useVozMisteriosaStore } from '../store/vozMisteriosaStore';
import { VozMisteriosaScoreboard } from '../components/VozMisteriosaScoreboard';

export const LaVozMisteriosaAudioQuizResultado = ({ navigation }) => {
  const players = useVozMisteriosaStore((state) => state.players);
  const getWinner = useVozMisteriosaStore((state) => state.getWinner);
  const resetGame = useVozMisteriosaStore((state) => state.resetGame);
  const currentRound = useVozMisteriosaStore((state) => state.currentRound);
  
  const winner = getWinner();
  const isTie = Array.isArray(winner);
  
  // Calcular estadísticas
  const totalQuestions = currentRound * players.length;
  const totalPoints = players.reduce((sum, p) => sum + p.score, 0);
  const averageScore = players.length > 0 ? (totalPoints / players.length).toFixed(1) : 0;
  const maxScore = Math.max(...players.map(p => p.score));
  const minScore = Math.min(...players.map(p => p.score));
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const handleNewGame = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const handlePlayAgain = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('setup-voz-misteriosa');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Juego Terminado!</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.winnerContainer}>
          {isTie ? (
            <>
              <Text style={styles.winnerLabel}>¡Empate!</Text>
              <Text style={styles.winnerText}>
                {winner.length} jugador{winner.length > 1 ? 'es' : ''} empataron con {winner[0].score} puntos
              </Text>
              <View style={styles.winnersList}>
                {winner.map((player, index) => (
                  <Text key={player.id} style={styles.winnerName}>
                    {index + 1}. {player.name} 👑
                  </Text>
                ))}
              </View>
            </>
          ) : winner ? (
            <>
              <Text style={styles.winnerLabel}>¡Ganador!</Text>
              <Text style={styles.winnerName}>👑 {winner.name} 👑</Text>
              <Text style={styles.winnerScore}>{winner.score} puntos</Text>
            </>
          ) : (
            <Text style={styles.winnerLabel}>No hay ganador</Text>
          )}
        </View>

        <VozMisteriosaScoreboard 
          players={players}
          currentPlayerId={null}
        />

        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>📊 Estadísticas de la Partida</Text>
          
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{currentRound}</Text>
              <Text style={styles.statLabel}>Rondas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{totalQuestions}</Text>
              <Text style={styles.statLabel}>Preguntas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{averageScore}</Text>
              <Text style={styles.statLabel}>Puntos Promedio</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{maxScore}</Text>
              <Text style={styles.statLabel}>Puntuación Máxima</Text>
            </View>
          </View>
        </View>

        <View style={styles.rankingSection}>
          <Text style={styles.rankingTitle}>🏅 Clasificación Final</Text>
          {sortedPlayers.map((player, index) => {
            const position = index + 1;
            const medal = position === 1 ? '🥇' : position === 2 ? '🥈' : position === 3 ? '🥉' : `${position}.`;
            const percentage = maxScore > 0 ? ((player.score / maxScore) * 100).toFixed(0) : 0;
            
            return (
              <View key={player.id} style={[
                styles.rankingItem,
                position === 1 && styles.rankingItemFirst,
                position === 2 && styles.rankingItemSecond,
                position === 3 && styles.rankingItemThird,
              ]}>
                <View style={styles.rankingPosition}>
                  <Text style={styles.rankingMedal}>{medal}</Text>
                </View>
                <View style={styles.rankingInfo}>
                  <Text style={[
                    styles.rankingName,
                    position <= 3 && styles.rankingNameHighlight,
                  ]}>
                    {player.name}
                  </Text>
                  <View style={styles.rankingBarContainer}>
                    <View style={[
                      styles.rankingBar,
                      { width: `${percentage}%` },
                      position === 1 && styles.rankingBarGold,
                      position === 2 && styles.rankingBarSilver,
                      position === 3 && styles.rankingBarBronze,
                    ]} />
                  </View>
                </View>
                <View style={styles.rankingScore}>
                  <Text style={[
                    styles.rankingScoreText,
                    position <= 3 && styles.rankingScoreHighlight,
                  ]}>
                    {player.score}
                  </Text>
                  <Text style={styles.rankingScoreLabel}>pts</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.actionsContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handlePlayAgain}
          >
            <Text style={styles.actionButtonText}>Jugar Otra Vez</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={handleNewGame}
          >
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
              Nueva Partida
            </Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: '#9c27b0',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  winnerContainer: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  winnerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#9c27b0',
    marginBottom: 10,
    textAlign: 'center',
  },
  winnerScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  winnerText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
  },
  winnersList: {
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  actionsContainer: {
    gap: 15,
    marginTop: 20,
  },
  actionButton: {
    backgroundColor: '#9c27b0',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#9c27b0',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonTextSecondary: {
    color: '#9c27b0',
  },
  statsSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#9c27b0',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  rankingSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  rankingTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginVertical: 5,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  rankingItemFirst: {
    backgroundColor: '#fff9c4',
    borderWidth: 2,
    borderColor: '#fdd835',
  },
  rankingItemSecond: {
    backgroundColor: '#e8eaf6',
    borderWidth: 2,
    borderColor: '#9fa8da',
  },
  rankingItemThird: {
    backgroundColor: '#fce4ec',
    borderWidth: 2,
    borderColor: '#f48fb1',
  },
  rankingPosition: {
    width: 50,
    alignItems: 'center',
  },
  rankingMedal: {
    fontSize: 24,
  },
  rankingInfo: {
    flex: 1,
    marginLeft: 15,
  },
  rankingName: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
    marginBottom: 8,
  },
  rankingNameHighlight: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rankingBarContainer: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  rankingBar: {
    height: '100%',
    backgroundColor: '#9c27b0',
    borderRadius: 4,
  },
  rankingBarGold: {
    backgroundColor: '#fdd835',
  },
  rankingBarSilver: {
    backgroundColor: '#9fa8da',
  },
  rankingBarBronze: {
    backgroundColor: '#f48fb1',
  },
  rankingScore: {
    alignItems: 'flex-end',
  },
  rankingScoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  rankingScoreHighlight: {
    fontSize: 28,
    color: '#9c27b0',
  },
  rankingScoreLabel: {
    fontSize: 12,
    color: '#666',
  },
});

export default LaVozMisteriosaAudioQuizResultado;

