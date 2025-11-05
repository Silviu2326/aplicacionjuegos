import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useDosVerdadesUnaMentiraStore } from '../store/dosVerdadesUnaMentiraStore';
import { DosVerdadesUnaMentiraScoreboard } from '../components/DosVerdadesUnaMentiraScoreboard';

export const DosVerdadesUnaMentiraResultados = ({ navigation }) => {
  const [showStats, setShowStats] = useState(false);
  
  const players = useDosVerdadesUnaMentiraStore((state) => state.players);
  const gameStats = useDosVerdadesUnaMentiraStore((state) => state.gameStats);
  const getGameStatistics = useDosVerdadesUnaMentiraStore((state) => state.getGameStatistics);
  const resetGame = useDosVerdadesUnaMentiraStore((state) => state.resetGame);

  const statistics = getGameStatistics();

  const handlePlayAgain = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const renderStatistics = () => {
    if (!statistics || players.length === 0) return null;

    return (
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>📊 Estadísticas del Juego</Text>
        
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{gameStats.totalRounds || 0}</Text>
            <Text style={styles.statLabel}>Rondas jugadas</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{gameStats.totalStatements || 0}</Text>
            <Text style={styles.statLabel}>Afirmaciones totales</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{gameStats.totalVotes || 0}</Text>
            <Text style={styles.statLabel}>Votos realizados</Text>
          </View>
          
          <View style={styles.statCard}>
            <Text style={styles.statValue}>
              {statistics.averageAccuracy ? Math.round(statistics.averageAccuracy * 100) : 0}%
            </Text>
            <Text style={styles.statLabel}>Precisión promedio</Text>
          </View>
        </View>

        {statistics.mostFoolingPlayer && (
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>🎭 Maestro del Engaño</Text>
            <Text style={styles.highlightName}>
              {statistics.mostFoolingPlayer.name}
            </Text>
            <Text style={styles.highlightSubtext}>
              Engañó a {statistics.mostFoolingPlayer.stats.timesFooled} jugador{statistics.mostFoolingPlayer.stats.timesFooled !== 1 ? 'es' : ''}
            </Text>
          </View>
        )}

        {statistics.mostAccuratePlayer && statistics.mostAccuratePlayer.stats.totalVotes > 0 && (
          <View style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>🎯 Detector de Mentiras</Text>
            <Text style={styles.highlightName}>
              {statistics.mostAccuratePlayer.name}
            </Text>
            <Text style={styles.highlightSubtext}>
              {Math.round((statistics.mostAccuratePlayer.stats.correctGuesses / statistics.mostAccuratePlayer.stats.totalVotes) * 100)}% de precisión
            </Text>
          </View>
        )}

        {gameStats.roundHistory && gameStats.roundHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>📜 Historial de Rondas</Text>
            {gameStats.roundHistory.slice(-5).reverse().map((round, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyRound}>Ronda {round.round}</Text>
                <Text style={styles.historyNarrator}>Narrador: {round.narratorName}</Text>
                <View style={styles.historyStats}>
                  <Text style={styles.historyStat}>
                    ✅ {round.correctGuesses} adivinaron
                  </Text>
                  <Text style={styles.historyStat}>
                    😈 {round.playersFooled} engañados
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🏆 Resultados Finales</Text>
        <Text style={styles.headerSubtitle}>¡Gracias por jugar!</Text>
      </View>
      
      <DosVerdadesUnaMentiraScoreboard players={players} />
      
      <TouchableOpacity
        style={styles.statsToggleButton}
        onPress={() => setShowStats(!showStats)}
      >
        <Text style={styles.statsToggleText}>
          {showStats ? '📊 Ocultar estadísticas' : '📊 Ver estadísticas detalladas'}
        </Text>
      </TouchableOpacity>
      
      {showStats && renderStatistics()}
      
      <TouchableOpacity
        style={styles.playAgainButton}
        onPress={handlePlayAgain}
      >
        <Text style={styles.playAgainButtonText}>🔄 Jugar de nuevo</Text>
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
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#ffd700',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 18,
    color: '#666',
  },
  statsToggleButton: {
    backgroundColor: '#2196f3',
    margin: 15,
    padding: 15,
    borderRadius: 12,
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
  statsToggleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: '#fff',
    margin: 15,
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  highlightCard: {
    backgroundColor: '#fff9e6',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#ffd700',
    alignItems: 'center',
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  highlightName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff8c00',
    marginBottom: 5,
  },
  highlightSubtext: {
    fontSize: 16,
    color: '#666',
  },
  historyContainer: {
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  historyRound: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  historyNarrator: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  historyStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  historyStat: {
    fontSize: 14,
    color: '#555',
    fontWeight: '600',
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
});
