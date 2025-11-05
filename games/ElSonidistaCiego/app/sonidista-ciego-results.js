import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSonidistaCiegoStore } from '../store/sonidistaCiegoStore';
import { SonidistaCiegoScoreboard } from '../components/SonidistaCiegoScoreboard';

export const ElSonidistaCiegoResults = ({ navigation }) => {
  const currentRound = useSonidistaCiegoStore((state) => state.currentRound);
  const players = useSonidistaCiegoStore((state) => state.players);
  const maxRounds = useSonidistaCiegoStore((state) => state.maxRounds);
  const currentScenario = useSonidistaCiegoStore((state) => state.currentScenario);
  const guess = useSonidistaCiegoStore((state) => state.guess);
  const guessCorrect = useSonidistaCiegoStore((state) => state.guessCorrect);
  const gameStatus = useSonidistaCiegoStore((state) => state.gameStatus);
  const nextRound = useSonidistaCiegoStore((state) => state.nextRound);
  const getCurrentBlindSound = useSonidistaCiegoStore((state) => state.getCurrentBlindSound);
  const getGameStatistics = useSonidistaCiegoStore((state) => state.getGameStatistics);
  
  const blindSound = getCurrentBlindSound();
  const isFinished = gameStatus === 'finished';
  const stats = getGameStatistics();

  // Calcular el siguiente Sonidista Ciego
  const currentBlindSoundIndex = useSonidistaCiegoStore((state) => state.currentBlindSoundIndex);
  const nextBlindSoundIndex = currentBlindSoundIndex !== null && players.length > 0
    ? (currentBlindSoundIndex + 1) % players.length
    : 0;
  const nextBlindSound = players[nextBlindSoundIndex];

  const handleNextRound = () => {
    nextRound();
    if (navigation && navigation.navigate) {
      navigation.navigate('play');
    }
  };

  const handleBackToLobby = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  // Determinar el ganador si el juego terminó
  const getWinner = () => {
    if (!isFinished || players.length === 0) return null;
    const maxScore = Math.max(...players.map(p => p.score));
    const winners = players.filter(p => p.score === maxScore);
    return winners;
  };

  const winners = isFinished ? getWinner() : null;
  const progressText = maxRounds 
    ? `Ronda ${currentRound} de ${maxRounds}`
    : `Ronda ${currentRound}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isFinished ? '🏁 Juego Finalizado' : '📊 Resultados de la Ronda'}
        </Text>
        {!isFinished && <Text style={styles.roundText}>{progressText}</Text>}
      </View>

      <View style={styles.content}>
        {!isFinished && (
          <View style={styles.resultCard}>
            <View style={styles.scenarioSection}>
              <Text style={styles.sectionLabel}>🎭 Escenario:</Text>
              <Text style={styles.scenarioText}>{currentScenario}</Text>
            </View>
            
            {blindSound && (
              <View style={styles.playerSection}>
                <Text style={styles.sectionLabel}>👁️ Sonidista Ciego:</Text>
                <Text style={styles.playerName}>{blindSound.name}</Text>
              </View>
            )}
            
            {guess && (
              <View style={styles.guessSection}>
                <Text style={styles.sectionLabel}>💭 Adivinanza:</Text>
                <Text style={styles.guessText}>"{guess}"</Text>
              </View>
            )}
            
            <View style={[
              styles.resultBadge,
              guessCorrect ? styles.resultBadgeCorrect : styles.resultBadgeIncorrect
            ]}>
              <Text style={styles.resultBadgeIcon}>
                {guessCorrect ? '✓' : '✗'}
              </Text>
              <Text style={styles.resultBadgeText}>
                {guessCorrect ? '¡Acierto!' : 'Fallo'}
              </Text>
            </View>
            
            {blindSound && (
              <View style={styles.scoreChangeCard}>
                <Text style={styles.scoreChangeTitle}>Puntos obtenidos:</Text>
                {guessCorrect ? (
                  <View style={styles.scoreChangeRow}>
                    <Text style={styles.scoreChangeName}>{blindSound.name}</Text>
                    <Text style={styles.scoreChangeValue}>+1 punto</Text>
                  </View>
                ) : (
                  <View>
                    {players.filter(p => p.id !== blindSound.id).map(helper => (
                      <View key={helper.id} style={styles.scoreChangeRow}>
                        <Text style={styles.scoreChangeName}>{helper.name}</Text>
                        <Text style={styles.scoreChangeValue}>+1 punto</Text>
                      </View>
                    ))}
                  </View>
                )}
              </View>
            )}
          </View>
        )}

        <View style={styles.scoreboardSection}>
          <SonidistaCiegoScoreboard 
            players={players} 
            showDetailedStats={true}
          />
        </View>

        {!isFinished && nextBlindSound && (
          <View style={styles.nextRoundCard}>
            <Text style={styles.nextRoundTitle}>⏭️ Próxima Ronda</Text>
            <Text style={styles.nextRoundText}>
              El próximo Sonidista Ciego será:
            </Text>
            <Text style={styles.nextRoundName}>{nextBlindSound.name}</Text>
          </View>
        )}

        {isFinished && winners && (
          <View style={styles.winnerCard}>
            <Text style={styles.winnerTitle}>
              🏆 {winners.length > 1 ? 'Ganadores' : 'Ganador'}
            </Text>
            {winners.map((winner, index) => (
              <View key={winner.id} style={styles.winnerItem}>
                <Text style={styles.winnerRank}>
                  {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                </Text>
                <View style={styles.winnerInfo}>
                  <Text style={styles.winnerName}>{winner.name}</Text>
                  <Text style={styles.winnerScore}>
                    {winner.score} {winner.score === 1 ? 'punto' : 'puntos'}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {isFinished && (
          <View style={styles.finalStatsCard}>
            <Text style={styles.finalStatsTitle}>📈 Estadísticas Finales</Text>
            <View style={styles.finalStatsGrid}>
              <View style={styles.finalStatItem}>
                <Text style={styles.finalStatValue}>{stats.totalRoundsPlayed}</Text>
                <Text style={styles.finalStatLabel}>Rondas jugadas</Text>
              </View>
              <View style={styles.finalStatItem}>
                <Text style={styles.finalStatValue}>{stats.accuracy}%</Text>
                <Text style={styles.finalStatLabel}>Precisión global</Text>
              </View>
              <View style={styles.finalStatItem}>
                <Text style={styles.finalStatValue}>{stats.totalCorrectGuesses}</Text>
                <Text style={styles.finalStatLabel}>Aciertos</Text>
              </View>
              <View style={styles.finalStatItem}>
                <Text style={styles.finalStatValue}>{stats.totalIncorrectGuesses}</Text>
                <Text style={styles.finalStatLabel}>Fallos</Text>
              </View>
            </View>
            {stats.hardestScenario && (
              <View style={styles.hardestScenarioCard}>
                <Text style={styles.hardestScenarioLabel}>😅 Escenario más difícil:</Text>
                <Text style={styles.hardestScenarioText}>{stats.hardestScenario}</Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.actions}>
          {!isFinished ? (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextRound}
            >
              <Text style={styles.nextButtonText}>
                ▶️ Siguiente Ronda
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.backButton}
              onPress={handleBackToLobby}
            >
              <Text style={styles.backButtonText}>
                🏠 Volver al Inicio
              </Text>
            </TouchableOpacity>
          )}
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
    backgroundColor: '#ff5722',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  roundText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.95,
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  scenarioSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  playerSection: {
    marginBottom: 20,
    paddingBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  guessSection: {
    marginBottom: 20,
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  scenarioText: {
    fontSize: 24,
    color: '#ff5722',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 32,
  },
  playerName: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    textAlign: 'center',
  },
  guessText: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 26,
  },
  resultBadge: {
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resultBadgeCorrect: {
    backgroundColor: '#4caf50',
  },
  resultBadgeIncorrect: {
    backgroundColor: '#f44336',
  },
  resultBadgeIcon: {
    fontSize: 48,
    color: '#fff',
    marginBottom: 10,
  },
  resultBadgeText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  scoreChangeCard: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  scoreChangeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  scoreChangeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
  },
  scoreChangeName: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600',
  },
  scoreChangeValue: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  scoreboardSection: {
    marginBottom: 20,
  },
  nextRoundCard: {
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff9800',
    borderStyle: 'dashed',
  },
  nextRoundTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 10,
  },
  nextRoundText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  nextRoundName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  winnerCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#ff9800',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
    borderWidth: 3,
    borderColor: '#ff9800',
  },
  winnerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 20,
    textAlign: 'center',
  },
  winnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    marginBottom: 12,
  },
  winnerRank: {
    fontSize: 32,
    marginRight: 15,
  },
  winnerInfo: {
    flex: 1,
  },
  winnerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  winnerScore: {
    fontSize: 16,
    color: '#666',
  },
  finalStatsCard: {
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
  finalStatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  finalStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  finalStatItem: {
    alignItems: 'center',
    margin: 10,
    minWidth: 100,
  },
  finalStatValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 5,
  },
  finalStatLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  hardestScenarioCard: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  hardestScenarioLabel: {
    fontSize: 13,
    color: '#c62828',
    fontWeight: '600',
    marginBottom: 5,
  },
  hardestScenarioText: {
    fontSize: 15,
    color: '#424242',
    fontWeight: '600',
  },
  actions: {
    marginTop: 10,
    marginBottom: 20,
  },
  nextButton: {
    backgroundColor: '#4caf50',
    padding: 22,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4caf50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#2196f3',
    padding: 22,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#2196f3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ElSonidistaCiegoResults;

