import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useGeoguessrDeSalonStore } from '../store/geoguessrDeSalonStore';
import { GeoguessrDeSalonScoreboard } from '../components/GeoguessrDeSalonScoreboard';

export const GeoguessrDeSalonResultsScreen = ({ navigation }) => {
  const { getWinner, resetGame, roundHistory, players, totalRounds } = useGeoguessrDeSalonStore();
  const winner = getWinner();
  const [showHistory, setShowHistory] = useState(false);

  const handlePlayAgain = () => {
    resetGame();
    navigation?.navigate('index');
  };

  const handleBackToMenu = () => {
    resetGame();
    navigation?.goBack();
  };

  // Calcular estadísticas
  const totalRoundsPlayed = roundHistory.length;
  const roundsWithWinners = roundHistory.filter(r => r.winnerId).length;
  const statsByPlayer = players.map(player => {
    const wins = roundHistory.filter(r => r.winnerId === player.id).length;
    return {
      player,
      wins,
      winRate: totalRoundsPlayed > 0 ? (wins / totalRoundsPlayed * 100).toFixed(1) : 0,
    };
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🎉 ¡Juego Terminado!</Text>
          <Text style={styles.subtitle}>{totalRoundsPlayed} rondas completadas</Text>
        </View>

        {winner && (
          <View style={styles.winnerContainer}>
            {Array.isArray(winner) ? (
              <>
                <Text style={styles.winnerLabel}>🤝 ¡Empate!</Text>
                <Text style={styles.winnerNames}>
                  {winner.map(w => w.name).join(', ')}
                </Text>
                <Text style={styles.winnerScore}>
                  {winner[0].score} {winner[0].score === 1 ? 'punto' : 'puntos'}
                </Text>
              </>
            ) : (
              <>
                <Text style={styles.winnerLabel}>🏆 ¡Ganador!</Text>
                <Text style={styles.winnerName}>{winner.name}</Text>
                <Text style={styles.winnerScore}>
                  {winner.score} {winner.score === 1 ? 'punto' : 'puntos'}
                </Text>
                <Text style={styles.winnerStats}>
                  {roundHistory.filter(r => r.winnerId === winner.id).length} de {totalRoundsPlayed} rondas ganadas
                </Text>
              </>
            )}
          </View>
        )}

        <GeoguessrDeSalonScoreboard highlightWinner={true} />

        {/* Estadísticas */}
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>📊 Estadísticas del Juego</Text>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Rondas jugadas:</Text>
            <Text style={styles.statValue}>{totalRoundsPlayed}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Rondas con ganador:</Text>
            <Text style={styles.statValue}>{roundsWithWinners}</Text>
          </View>
          <View style={styles.statRow}>
            <Text style={styles.statLabel}>Rondas sin ganador:</Text>
            <Text style={styles.statValue}>{totalRoundsPlayed - roundsWithWinners}</Text>
          </View>
        </View>

        {/* Estadísticas por jugador */}
        <View style={styles.playerStatsContainer}>
          <Text style={styles.statsTitle}>👥 Estadísticas por Jugador</Text>
          {statsByPlayer.map((stat, index) => (
            <View key={stat.player.id} style={styles.playerStatItem}>
              <View style={styles.playerStatHeader}>
                <Text style={styles.playerStatName}>{stat.player.name}</Text>
                <Text style={styles.playerStatScore}>{stat.player.score} puntos</Text>
              </View>
              <View style={styles.playerStatDetails}>
                <Text style={styles.playerStatDetail}>
                  🏆 {stat.wins} {stat.wins === 1 ? 'ronda ganada' : 'rondas ganadas'}
                </Text>
                <Text style={styles.playerStatDetail}>
                  📈 {stat.winRate}% de victorias
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Historial de rondas */}
        <TouchableOpacity 
          style={styles.historyToggle}
          onPress={() => setShowHistory(!showHistory)}
        >
          <Text style={styles.historyToggleText}>
            📜 Historial de Rondas {showHistory ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {showHistory && roundHistory.length > 0 && (
          <View style={styles.historyContainer}>
            {roundHistory.map((round, index) => {
              const roundWinner = round.winnerId ? players.find(p => p.id === round.winnerId) : null;
              const guide = players.find(p => p.id === round.guideId);
              
              return (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyRound}>Ronda {round.round}</Text>
                    {roundWinner ? (
                      <Text style={styles.historyWinner}>🏆 {roundWinner.name}</Text>
                    ) : (
                      <Text style={styles.historyNoWinner}>❌ Sin ganador</Text>
                    )}
                  </View>
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyLocation}>📍 {round.location.name}</Text>
                    <Text style={styles.historyGuide}>🧭 Guía: {guide?.name || 'Desconocido'}</Text>
                    {round.location.country && (
                      <Text style={styles.historyCountry}>🌍 {round.location.country}</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePlayAgain}>
            <Text style={styles.buttonText}>🔄 Jugar de Nuevo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.secondaryButton]} onPress={handleBackToMenu}>
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>🏠 Volver al Menú</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
  },
  winnerContainer: {
    backgroundColor: '#4caf50',
    padding: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 3,
    borderColor: '#fff',
  },
  winnerLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  winnerNames: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  winnerScore: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 5,
  },
  winnerStats: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  statsContainer: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  statLabel: {
    fontSize: 16,
    color: '#ccc',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  playerStatsContainer: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
  },
  playerStatItem: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerStatName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerStatScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  playerStatDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  playerStatDetail: {
    fontSize: 14,
    color: '#ccc',
  },
  historyToggle: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  historyToggleText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  historyContainer: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
  },
  historyItem: {
    backgroundColor: '#1a1a2e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  historyRound: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  historyWinner: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  historyNoWinner: {
    fontSize: 16,
    color: '#888',
  },
  historyDetails: {
    marginTop: 5,
  },
  historyLocation: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
  },
  historyGuide: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 3,
  },
  historyCountry: {
    fontSize: 14,
    color: '#4a90e2',
  },
  buttonsContainer: {
    marginTop: 30,
    gap: 15,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#666',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#fff',
  },
});

