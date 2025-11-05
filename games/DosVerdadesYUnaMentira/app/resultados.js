import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDosVerdadesStore } from '../store/dosVerdadesStore';

export const DosVerdadesResultados = ({ navigation }) => {
  const [showStats, setShowStats] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const players = useDosVerdadesStore((state) => state.players);
  const resetGame = useDosVerdadesStore((state) => state.resetGame);
  const gameStats = useDosVerdadesStore((state) => state.gameStats);
  const turnHistory = useDosVerdadesStore((state) => state.turnHistory);
  const getPlayerStats = useDosVerdadesStore((state) => state.getPlayerStats);

  const handlePlayAgain = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];
  const isTie = sortedPlayers.length > 1 && 
    sortedPlayers[0].score === sortedPlayers[1].score;

  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };

  const getRankStyle = (index) => {
    if (index === 0) return styles.playerItemWinner;
    if (index === 1) return styles.playerItemSecond;
    if (index === 2) return styles.playerItemThird;
    return styles.playerItem;
  };

  const getAverageScore = () => {
    if (players.length === 0) return 0;
    const total = players.reduce((sum, p) => sum + p.score, 0);
    return (total / players.length).toFixed(1);
  };

  const getHighestScore = () => {
    return sortedPlayers[0]?.score || 0;
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.title}>🏆 Resultados Finales</Text>
          {winner && !isTie && (
            <Text style={styles.winnerText}>
              ¡{winner.name} es el Maestro del Engaño! 🎭
            </Text>
          )}
          {isTie && (
            <Text style={styles.winnerText}>
              ¡Empate! Todos son grandes mentirosos 🎉
            </Text>
          )}
          
          <View style={styles.summaryBox}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total de turnos</Text>
              <Text style={styles.summaryValue}>{gameStats.totalTurns}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Adivinanzas correctas</Text>
              <Text style={styles.summaryValue}>{gameStats.totalCorrectGuesses}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Jugadores engañados</Text>
              <Text style={styles.summaryValue}>{gameStats.totalPlayersFooled}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Puntuación promedio</Text>
              <Text style={styles.summaryValue}>{getAverageScore()}</Text>
            </View>
          </View>
        </View>

        <View style={styles.podium}>
          {sortedPlayers.slice(0, 3).map((player, index) => (
            <View
              key={player.id}
              style={[
                styles.podiumItem,
                index === 0 && styles.podiumItemFirst,
                index === 1 && styles.podiumItemSecond,
                index === 2 && styles.podiumItemThird,
              ]}
            >
              <Text style={styles.podiumRank}>{getRankEmoji(index)}</Text>
              <Text style={styles.podiumName} numberOfLines={1}>
                {player.name}
              </Text>
              <Text style={styles.podiumScore}>{player.score} pts</Text>
            </View>
          ))}
        </View>

        {sortedPlayers.length > 3 && (
          <View style={styles.remainingPlayers}>
            <Text style={styles.remainingTitle}>Resto de jugadores</Text>
            {sortedPlayers.slice(3).map((player, index) => (
              <View
                key={player.id}
                style={[styles.playerItem, getRankStyle(index + 3)]}
              >
                <View style={styles.playerRankContainer}>
                  <Text style={styles.playerRank}>{index + 4}.</Text>
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>
                <Text style={styles.playerScore}>{player.score} pts</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowStats(!showStats)}
        >
          <Text style={styles.toggleButtonText}>
            {showStats ? '▼' : '▶'} Estadísticas Detalladas
          </Text>
        </TouchableOpacity>

        {showStats && (
          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>📊 Estadísticas del Juego</Text>
            
            {gameStats.mostSuccessfulNarrator && (
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>🎤 Narrador más exitoso</Text>
                <Text style={styles.statValue}>
                  {gameStats.mostSuccessfulNarrator.name} ({gameStats.mostSuccessfulNarrator.fools} engañados)
                </Text>
              </View>
            )}
            
            {gameStats.bestDetective && (
              <View style={styles.statCard}>
                <Text style={styles.statLabel}>🔍 Mejor detective</Text>
                <Text style={styles.statValue}>
                  {gameStats.bestDetective.name} ({gameStats.bestDetective.correct} adivinanzas correctas)
                </Text>
              </View>
            )}

            <View style={styles.playersStatsGrid}>
              {sortedPlayers.map((player) => {
                const stats = getPlayerStats(player.id);
                if (!stats) return null;
                
                return (
                  <View key={player.id} style={styles.playerStatCard}>
                    <Text style={styles.playerStatName}>{player.name}</Text>
                    <Text style={styles.playerStatText}>
                      🎯 Precisión: {stats.accuracy}%
                    </Text>
                    <Text style={styles.playerStatText}>
                      ✅ Correctas: {stats.correctGuesses}/{stats.totalTurnsPlayed}
                    </Text>
                    <Text style={styles.playerStatText}>
                      🎤 Como narrador: {stats.turnsAsNarrator} turnos
                    </Text>
                    {stats.turnsAsNarrator > 0 && (
                      <Text style={styles.playerStatText}>
                        🎭 Promedio engañados: {stats.avgFooled}
                      </Text>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}

        <TouchableOpacity
          style={styles.toggleButton}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Text style={styles.toggleButtonText}>
            {showHistory ? '▼' : '▶'} Historial de Turnos
          </Text>
        </TouchableOpacity>

        {showHistory && turnHistory.length > 0 && (
          <View style={styles.historySection}>
            <Text style={styles.historyTitle}>📜 Historial Completo</Text>
            {turnHistory.map((turn, index) => (
              <View key={index} style={styles.historyCard}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyRound}>Ronda {turn.round}</Text>
                  <Text style={styles.historyNarrator}>🎤 {turn.narratorName}</Text>
                </View>
                <View style={styles.historyStats}>
                  <Text style={styles.historyStat}>
                    ✅ {turn.correctGuesses.length} adivinaron correctamente
                  </Text>
                  <Text style={styles.historyStat}>
                    🎭 {turn.playersFooled} jugadores engañados
                  </Text>
                </View>
                <View style={styles.historyStatements}>
                  {turn.statements.map((stmt, idx) => (
                    <View 
                      key={idx} 
                      style={[
                        styles.historyStatement,
                        idx === turn.lieIndex && styles.historyStatementLie
                      ]}
                    >
                      <Text style={styles.historyStatementText}>
                        {idx === turn.lieIndex ? '❌ ' : '✅ '}
                        {stmt}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={handlePlayAgain}
      >
        <Text style={styles.playAgainButtonText}>Jugar de nuevo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#4caf50',
    marginTop: 10,
    marginBottom: 15,
  },
  summaryBox: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  summaryItem: {
    alignItems: 'center',
    width: '45%',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
    textAlign: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  podium: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    padding: 20,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    minHeight: 200,
  },
  podiumItem: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    marginHorizontal: 5,
    backgroundColor: '#f9f9f9',
  },
  podiumItemFirst: {
    backgroundColor: '#fff9e6',
    borderWidth: 3,
    borderColor: '#ffd700',
    minHeight: 180,
    justifyContent: 'center',
  },
  podiumItemSecond: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#c0c0c0',
    minHeight: 150,
    justifyContent: 'center',
  },
  podiumItemThird: {
    backgroundColor: '#fff4e6',
    borderWidth: 2,
    borderColor: '#cd7f32',
    minHeight: 120,
    justifyContent: 'center',
  },
  podiumRank: {
    fontSize: 40,
    marginBottom: 10,
  },
  podiumName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  podiumScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
  remainingPlayers: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  remainingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  playerItem: {
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
  playerItemWinner: {
    backgroundColor: '#fff9e6',
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  playerItemSecond: {
    backgroundColor: '#f5f5f5',
    borderColor: '#c0c0c0',
  },
  playerItemThird: {
    backgroundColor: '#fff4e6',
    borderColor: '#cd7f32',
  },
  playerRankContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerRank: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginRight: 10,
    width: 30,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  playAgainButton: {
    backgroundColor: '#4caf50',
    margin: 20,
    padding: 20,
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
  playAgainButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#fff',
    margin: 10,
    marginTop: 15,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
  },
  statsSection: {
    backgroundColor: '#fff',
    margin: 10,
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
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  playersStatsGrid: {
    marginTop: 15,
  },
  playerStatCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerStatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  playerStatText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historySection: {
    backgroundColor: '#fff',
    margin: 10,
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
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  historyCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  historyRound: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  historyNarrator: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  historyStats: {
    marginBottom: 10,
  },
  historyStat: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  historyStatements: {
    marginTop: 10,
  },
  historyStatement: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyStatementLie: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 2,
  },
  historyStatementText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

export default DosVerdadesResultados;

