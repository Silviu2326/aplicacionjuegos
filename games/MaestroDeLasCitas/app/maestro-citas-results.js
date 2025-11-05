import React from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useMaestroCitasStore } from '../store/maestroCitasStore';

export const MaestroDeLasCitasResults = ({ navigation }) => {
  const players = useMaestroCitasStore((state) => state.getSortedPlayers());
  const answerHistory = useMaestroCitasStore((state) => state.answerHistory);
  const winner = useMaestroCitasStore((state) => state.getWinner());
  const resetGame = useMaestroCitasStore((state) => state.resetGame);
  
  // Calcular estadísticas
  const calculateStats = () => {
    if (answerHistory.length === 0) return null;
    
    const correctAnswers = answerHistory.filter(e => e.isCorrect).length;
    const incorrectAnswers = answerHistory.length - correctAnswers;
    const accuracy = Math.round((correctAnswers / answerHistory.length) * 100);
    const totalPoints = answerHistory.reduce((sum, e) => sum + e.points, 0);
    const avgTime = Math.round(answerHistory.reduce((sum, e) => sum + e.timeTaken, 0) / answerHistory.length);
    const fastestAnswer = Math.min(...answerHistory.map(e => e.timeTaken));
    const slowestAnswer = Math.max(...answerHistory.map(e => e.timeTaken));
    
    // Categorías más acertadas
    const categoryStats = {};
    answerHistory.forEach(entry => {
      // Necesitamos obtener la categoría de la cita, pero no está en el historial
      // Por ahora calculamos solo con las respuestas
    });
    
    return {
      correctAnswers,
      incorrectAnswers,
      accuracy,
      totalPoints,
      avgTime,
      fastestAnswer,
      slowestAnswer,
    };
  };
  
  const stats = calculateStats();
  
  const handleNewGame = () => {
    resetGame();
    navigation.navigate('home');
  };
  
  const handleMainMenu = () => {
    resetGame();
    navigation.navigate('home');
  };
  
  const getMedal = (position) => {
    if (position === 0) return '🥇';
    if (position === 1) return '🥈';
    if (position === 2) return '🥉';
    return null;
  };
  
  const getPerformanceMessage = () => {
    if (!stats) return '';
    if (stats.accuracy >= 90) return '¡Excelente! Eres un verdadero maestro de las citas 🏆';
    if (stats.accuracy >= 75) return '¡Muy bien! Tienes un gran conocimiento 📚';
    if (stats.accuracy >= 60) return 'Buen trabajo, sigue practicando 💪';
    if (stats.accuracy >= 50) return 'No está mal, pero puedes mejorar 📖';
    return 'Sigue practicando, mejorarás con el tiempo 🌟';
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Resultados Finales</Text>
        {winner && (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerLabel}>🏆 Ganador</Text>
            <Text style={styles.winnerName}>{winner.name}</Text>
            <Text style={styles.winnerScore}>{winner.score} puntos</Text>
            <Text style={styles.winnerAccuracy}>
              {winner.correctAnswers} / {answerHistory.length} correctas
            </Text>
            {stats && (
              <Text style={styles.winnerPerformance}>
                {stats.accuracy}% de precisión
              </Text>
            )}
          </View>
        )}
        {stats && (
          <View style={styles.performanceContainer}>
            <Text style={styles.performanceMessage}>
              {getPerformanceMessage()}
            </Text>
          </View>
        )}
      </View>
      
      {/* Estadísticas generales */}
      {stats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estadísticas Generales</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.accuracy}%</Text>
              <Text style={styles.statLabel}>Precisión</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.correctAnswers}</Text>
              <Text style={styles.statLabel}>Correctas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.incorrectAnswers}</Text>
              <Text style={styles.statLabel}>Incorrectas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalPoints}</Text>
              <Text style={styles.statLabel}>Puntos Total</Text>
            </View>
          </View>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.avgTime}s</Text>
              <Text style={styles.statLabel}>Tiempo Promedio</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.fastestAnswer}s</Text>
              <Text style={styles.statLabel}>Respuesta Más Rápida</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.slowestAnswer}s</Text>
              <Text style={styles.statLabel}>Respuesta Más Lenta</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{answerHistory.length}</Text>
              <Text style={styles.statLabel}>Total Rondas</Text>
            </View>
          </View>
        </View>
      )}
      
      {/* Tabla de puntuaciones */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Clasificación Final</Text>
        {players.map((player, index) => (
          <View
            key={player.id}
            style={[
              styles.playerRow,
              index === 0 && styles.playerRowFirst,
            ]}
          >
            <View style={styles.playerRank}>
              {getMedal(index) ? (
                <Text style={styles.medalText}>{getMedal(index)}</Text>
              ) : (
                <Text style={styles.rankText}>{index + 1}</Text>
              )}
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              <View style={styles.playerStatsRow}>
                <Text style={styles.playerStats}>
                  {player.correctAnswers} / {answerHistory.length} correctas
                </Text>
                {answerHistory.length > 0 && (
                  <Text style={styles.playerAccuracy}>
                    ({Math.round((player.correctAnswers / answerHistory.length) * 100)}%)
                  </Text>
                )}
              </View>
            </View>
            <Text style={styles.playerScore}>{player.score} pts</Text>
          </View>
        ))}
      </View>
      
      {/* Historial de respuestas */}
      {answerHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial de Respuestas</Text>
          {answerHistory.map((entry, index) => (
            <View key={index} style={styles.historyEntry}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyRound}>Ronda {entry.round}</Text>
                <Text style={[
                  styles.historyStatus,
                  entry.isCorrect ? styles.historyStatusCorrect : styles.historyStatusIncorrect
                ]}>
                  {entry.isCorrect ? '✓ Correcta' : '✗ Incorrecta'}
                </Text>
              </View>
              <Text style={styles.historyQuote}>"{entry.quote}"</Text>
              <View style={styles.historyDetails}>
                <Text style={styles.historyDetail}>
                  Tiempo: {entry.timeTaken}s
                </Text>
                <Text style={styles.historyDetail}>
                  Puntos: {entry.points}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}
      
      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, styles.newGameButton]}
          onPress={handleNewGame}
        >
          <Text style={styles.actionButtonText}>Nueva Partida</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.actionButton, styles.menuButton]}
          onPress={handleMainMenu}
        >
          <Text style={styles.actionButtonText}>Menú Principal</Text>
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
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  winnerContainer: {
    backgroundColor: '#fff3cd',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    width: '100%',
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  winnerLabel: {
    fontSize: 16,
    color: '#856404',
    marginBottom: 5,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  winnerScore: {
    fontSize: 20,
    color: '#4caf50',
    fontWeight: '600',
    marginBottom: 5,
  },
  winnerAccuracy: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  playerRowFirst: {
    backgroundColor: '#fff9e6',
    borderRadius: 8,
    borderBottomWidth: 0,
    marginBottom: 5,
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  playerRank: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e0e0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  rankText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  playerStats: {
    fontSize: 12,
    color: '#666',
  },
  playerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  playerStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  playerAccuracy: {
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '600',
    marginLeft: 6,
  },
  medalText: {
    fontSize: 24,
  },
  performanceContainer: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 15,
    marginTop: 15,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  performanceMessage: {
    fontSize: 16,
    color: '#1565c0',
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 22,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  historyEntry: {
    padding: 15,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyRound: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  historyStatus: {
    fontSize: 12,
    fontWeight: '600',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  historyStatusCorrect: {
    backgroundColor: '#4caf50',
    color: '#ffffff',
  },
  historyStatusIncorrect: {
    backgroundColor: '#f44336',
    color: '#ffffff',
  },
  historyQuote: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 8,
  },
  historyDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  historyDetail: {
    fontSize: 12,
    color: '#999',
  },
  actionsContainer: {
    marginTop: 20,
  },
  actionButton: {
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  newGameButton: {
    backgroundColor: '#4caf50',
  },
  menuButton: {
    backgroundColor: '#2196f3',
  },
  actionButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

