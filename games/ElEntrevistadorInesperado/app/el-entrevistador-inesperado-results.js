import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useEntrevistadorInesperadoStore } from '../store/entrevistadorInesperadoStore';
import { EntrevistadorInesperadoPlayerList } from '../components/EntrevistadorInesperadoPlayerList';

export const ElEntrevistadorInesperadoResults = ({ navigation }) => {
  const players = useEntrevistadorInesperadoStore((state) => state.players);
  const currentRound = useEntrevistadorInesperadoStore((state) => state.currentRound);
  const currentCharacter = useEntrevistadorInesperadoStore(
    (state) => state.currentCharacter
  );
  const correctGuess = useEntrevistadorInesperadoStore((state) => state.correctGuess);
  const getCurrentInterviewee = useEntrevistadorInesperadoStore(
    (state) => state.getCurrentInterviewee
  );
  const roundHistory = useEntrevistadorInesperadoStore((state) => state.roundHistory);
  const gameStats = useEntrevistadorInesperadoStore((state) => state.gameStats);
  const nextTurn = useEntrevistadorInesperadoStore((state) => state.nextTurn);
  const resetGame = useEntrevistadorInesperadoStore((state) => state.resetGame);

  const interviewee = getCurrentInterviewee();
  const winner = players.reduce((prev, current) =>
    prev.score > current.score ? prev : current
  );

  const handleNextRound = () => {
    nextTurn();
    if (navigation && navigation.navigate) {
      navigation.navigate('reveal');
    }
  };

  const handleNewGame = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const handleFinishGame = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Resultados de la Ronda</Text>
        <Text style={styles.roundNumber}>Ronda {currentRound}</Text>
      </View>

      <View style={styles.content}>
        {currentCharacter && (
          <View style={styles.characterRevealBox}>
            <Text style={styles.characterRevealLabel}>El personaje secreto era:</Text>
            <Text style={styles.characterRevealText}>{currentCharacter}</Text>
          </View>
        )}

        {correctGuess && (
          <View style={styles.correctGuessBox}>
            <Text style={styles.correctGuessLabel}>¡Adivinanza Correcta!</Text>
            <Text style={styles.correctGuessText}>
              {players.find((p) => p.id === correctGuess)?.name} adivinó
              correctamente
            </Text>
          </View>
        )}

        {!correctGuess && interviewee && (
          <View style={styles.secretKeptBox}>
            <Text style={styles.secretKeptLabel}>¡Secreto Guardado!</Text>
            <Text style={styles.secretKeptText}>
              {interviewee.name} mantuvo su secreto y ganó puntos extra
            </Text>
          </View>
        )}

        <View style={styles.scoresSection}>
          <Text style={styles.scoresTitle}>Puntuaciones</Text>
          <EntrevistadorInesperadoPlayerList
            players={[...players].sort((a, b) => b.score - a.score)}
            intervieweeId={null}
          />
        </View>

        {winner && (
          <View style={styles.winnerBox}>
            <Text style={styles.winnerLabel}>🏆 Líder Actual</Text>
            <Text style={styles.winnerName}>{winner.name}</Text>
            <Text style={styles.winnerScore}>{winner.score} puntos</Text>
          </View>
        )}

        {gameStats && gameStats.totalRounds > 0 && (
          <View style={styles.statsBox}>
            <Text style={styles.statsTitle}>📊 Estadísticas del Juego</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{gameStats.totalRounds}</Text>
                <Text style={styles.statLabel}>Rondas jugadas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{gameStats.totalGuesses}</Text>
                <Text style={styles.statLabel}>Adivinanzas totales</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{gameStats.correctGuesses}</Text>
                <Text style={styles.statLabel}>Adivinanzas correctas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{gameStats.secretsKept}</Text>
                <Text style={styles.statLabel}>Secretos guardados</Text>
              </View>
            </View>
            {gameStats.totalGuesses > 0 && (
              <View style={styles.accuracyBox}>
                <Text style={styles.accuracyLabel}>
                  Precisión: {Math.round((gameStats.correctGuesses / gameStats.totalGuesses) * 100)}%
                </Text>
              </View>
            )}
          </View>
        )}

        {roundHistory && roundHistory.length > 0 && (
          <View style={styles.historyBox}>
            <Text style={styles.historyTitle}>📜 Historial de Rondas</Text>
            {roundHistory.slice(-5).reverse().map((round, index) => (
              <View key={index} style={styles.historyItem}>
                <View style={styles.historyHeader}>
                  <Text style={styles.historyRound}>Ronda {round.round}</Text>
                  {round.wasSecretKept ? (
                    <Text style={styles.historyBadge}>🔒 Secreto guardado</Text>
                  ) : (
                    <Text style={styles.historyBadgeCorrect}>✅ Adivinado</Text>
                  )}
                </View>
                <Text style={styles.historyInterviewee}>
                  Entrevistado: {round.interviewee}
                </Text>
                <Text style={styles.historyCharacter}>
                  Personaje: {round.character}
                </Text>
                {round.correctGuess && (
                  <Text style={styles.historyCorrect}>
                    Adivinado por: {round.correctGuess}
                  </Text>
                )}
                <Text style={styles.historyGuesses}>
                  {round.totalGuesses} adivinanza{round.totalGuesses !== 1 ? 's' : ''}
                </Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.nextRoundButton}
            onPress={handleNextRound}
          >
            <Text style={styles.nextRoundButtonText}>Siguiente Ronda</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishGame}
          >
            <Text style={styles.finishButtonText}>Terminar Juego</Text>
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
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  roundNumber: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  content: {
    padding: 20,
  },
  characterRevealBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  characterRevealLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  characterRevealText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4caf50',
    textAlign: 'center',
  },
  correctGuessBox: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  correctGuessLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  correctGuessText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  secretKeptBox: {
    backgroundColor: '#ff9800',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  secretKeptLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  secretKeptText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  scoresSection: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  scoresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  winnerBox: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffd700',
  },
  winnerLabel: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
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
  },
  buttonContainer: {
    gap: 15,
    marginBottom: 20,
  },
  nextRoundButton: {
    backgroundColor: '#4caf50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextRoundButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#f44336',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
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
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
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
  accuracyBox: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  accuracyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  historyBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  historyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyRound: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff9800',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyBadgeCorrect: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4caf50',
    backgroundColor: '#f1f8f4',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  historyInterviewee: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  historyCharacter: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  historyCorrect: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
    marginBottom: 4,
  },
  historyGuesses: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default ElEntrevistadorInesperadoResults;

