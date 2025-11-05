import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';
import { DetectiveObjetosPlayerList } from '../components/DetectiveObjetosPlayerList';

export const DetectiveObjetosResults = ({ navigation }) => {
  const [showHistory, setShowHistory] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const roundWinner = useDetectiveObjetosStore((state) => state.roundWinner);
  const getCurrentPhotographer = useDetectiveObjetosStore((state) => state.getCurrentPhotographer);
  const currentRound = useDetectiveObjetosStore((state) => state.currentRound);
  const maxRounds = useDetectiveObjetosStore((state) => state.maxRounds);
  const gameStatus = useDetectiveObjetosStore((state) => state.gameStatus);
  const nextRound = useDetectiveObjetosStore((state) => state.nextRound);
  const players = useDetectiveObjetosStore((state) => state.players);
  const roundHistory = useDetectiveObjetosStore((state) => state.roundHistory);
  const getRoundHistory = useDetectiveObjetosStore((state) => state.getRoundHistory);
  const getPlayerStats = useDetectiveObjetosStore((state) => state.getPlayerStats);
  
  const photographer = getCurrentPhotographer();
  const history = getRoundHistory();
  
  // Navegar automáticamente cuando el juego termina
  useEffect(() => {
    if (gameStatus === 'finished') {
      // El juego terminó, mostrar resultados finales
    }
  }, [gameStatus]);
  
  const handleNextRound = () => {
    nextRound();
    // El store cambiará el estado a 'photo-capture', lo que activará la navegación automática
    if (navigation) {
      navigation.navigate('detective-objetos-setup');
    }
  };
  
  const handleEndGame = () => {
    if (navigation) {
      navigation.navigate('index');
    }
  };
  
  const isGameFinished = gameStatus === 'finished' || (maxRounds !== null && currentRound >= maxRounds);
  
  // Calcular ganador del juego
  const getGameWinner = () => {
    if (players.length === 0) return null;
    const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
    const maxScore = sortedPlayers[0].score;
    return sortedPlayers.filter(p => p.score === maxScore);
  };
  
  const winners = isGameFinished ? getGameWinner() : null;

  // Calcular estadísticas
  const calculateStats = () => {
    const stats = {
      totalRounds: history.length + (isGameFinished ? 0 : 1),
      totalGuesses: history.reduce((sum, r) => sum + (r.guessesCount || 0), 0),
      photographerWins: history.filter(r => r.photographerWon).length,
      detectiveWins: history.filter(r => !r.photographerWon).length,
      averageZoomLevels: history.length > 0 
        ? (history.reduce((sum, r) => sum + (r.zoomLevelsUsed || 0), 0) / history.length).toFixed(1)
        : 0,
    };
    return stats;
  };

  const stats = calculateStats();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isGameFinished ? '🏆 Fin del Juego' : `🎯 Ronda ${currentRound} - Resultado`}
        </Text>
        {!isGameFinished && maxRounds && (
          <Text style={styles.subtitle}>
            Ronda {currentRound} de {maxRounds}
          </Text>
        )}
      </View>

      {/* Botones de información */}
      {history.length > 0 && (
        <View style={styles.infoButtons}>
          <TouchableOpacity
            style={[styles.infoButton, showHistory && styles.infoButtonActive]}
            onPress={() => setShowHistory(!showHistory)}
          >
            <Text style={styles.infoButtonText}>📜 Historial</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.infoButton, showStats && styles.infoButtonActive]}
            onPress={() => setShowStats(!showStats)}
          >
            <Text style={styles.infoButtonText}>📊 Estadísticas</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.resultSection}>
        {roundWinner ? (
          <View style={styles.winnerCard}>
            <Text style={styles.winnerEmoji}>🎉</Text>
            <Text style={styles.winnerText}>
              {roundWinner.playerName} ha adivinado correctamente!
            </Text>
            <Text style={styles.winnerSubtext}>
              +1 punto
            </Text>
          </View>
        ) : (
          <View style={styles.winnerCard}>
            <Text style={styles.winnerEmoji}>📷</Text>
            <Text style={styles.winnerText}>
              {photographer?.name || 'El fotógrafo'} ha ganado esta ronda!
            </Text>
            <Text style={styles.winnerSubtext}>
              La imagen se reveló por completo sin aciertos
            </Text>
          </View>
        )}
      </View>
      
      {/* Historial de rondas */}
      {showHistory && history.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📜 Historial de Rondas</Text>
          {history.map((round, index) => (
            <View key={index} style={styles.historyCard}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyRound}>Ronda {round.round}</Text>
                <Text style={styles.historyWinner}>
                  {round.winner ? `🏆 ${round.winner.name}` : `📷 ${round.photographer?.name || 'Fotógrafo'}`}
                </Text>
              </View>
              <View style={styles.historyDetails}>
                <Text style={styles.historyDetail}>
                  📷 Fotógrafo: {round.photographer?.name || 'N/A'}
                </Text>
                <Text style={styles.historyDetail}>
                  🔍 Niveles de zoom usados: {round.zoomLevelsUsed || 0}
                </Text>
                <Text style={styles.historyDetail}>
                  💭 Intentos: {round.guessesCount || 0}
                </Text>
              </View>
            </View>
          ))}
        </View>
      )}

      {/* Estadísticas */}
      {showStats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Estadísticas del Juego</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalRounds}</Text>
              <Text style={styles.statLabel}>Rondas</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.totalGuesses}</Text>
              <Text style={styles.statLabel}>Intentos</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.photographerWins}</Text>
              <Text style={styles.statLabel}>Ganadas por Fotógrafo</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.detectiveWins}</Text>
              <Text style={styles.statLabel}>Ganadas por Detectives</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statValue}>{stats.averageZoomLevels}</Text>
              <Text style={styles.statLabel}>Promedio Zoom</Text>
            </View>
          </View>
        </View>
      )}

      {isGameFinished && winners && winners.length > 0 && (
        <View style={styles.finalWinnerSection}>
          <Text style={styles.finalWinnerTitle}>🏆 Ganador{winners.length > 1 ? 'es' : ''} del Juego</Text>
          {winners.map((winner, index) => {
            const playerStats = getPlayerStats(winner.id);
            return (
              <View key={winner.id} style={styles.finalWinnerCard}>
                <View style={styles.winnerInfo}>
                  <Text style={styles.finalWinnerName}>{winner.name}</Text>
                  <Text style={styles.finalWinnerScore}>{winner.score} puntos</Text>
                </View>
                {playerStats?.stats && (
                  <View style={styles.winnerStats}>
                    <Text style={styles.winnerStatText}>
                      ✅ {playerStats.stats.correctGuesses || 0} aciertos
                    </Text>
                    <Text style={styles.winnerStatText}>
                      🏆 {playerStats.stats.roundsWon || 0} rondas ganadas
                    </Text>
                    <Text style={styles.winnerStatText}>
                      📷 {playerStats.stats.roundsAsPhotographer || 0} como fotógrafo
                    </Text>
                  </View>
                )}
              </View>
            );
          })}
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Puntuaciones</Text>
        <DetectiveObjetosPlayerList />
      </View>
      
      <View style={styles.actions}>
        {!isGameFinished ? (
          <TouchableOpacity
            style={styles.button}
            onPress={handleNextRound}
          >
            <Text style={styles.buttonText}>Siguiente Ronda</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.button}
            onPress={handleEndGame}
          >
            <Text style={styles.buttonText}>Volver al Inicio</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  resultSection: {
    padding: 20,
  },
  winnerCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
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
  winnerEmoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
  },
  winnerSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  finalWinnerSection: {
    padding: 20,
  },
  finalWinnerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 15,
  },
  finalWinnerCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  finalWinnerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  finalWinnerScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff9800',
  },
  section: {
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  actions: {
    padding: 20,
  },
  button: {
    backgroundColor: '#2196f3',
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
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  infoButtons: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoButtonActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  infoButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  historyCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  historyRound: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  historyWinner: {
    fontSize: 14,
    fontWeight: '600',
    color: '#4caf50',
  },
  historyDetails: {
    gap: 5,
  },
  historyDetail: {
    fontSize: 13,
    color: '#666',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  statCard: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  winnerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  winnerStats: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ffd700',
    gap: 5,
  },
  winnerStatText: {
    fontSize: 13,
    color: '#666',
  },
});

export default DetectiveObjetosResults;

