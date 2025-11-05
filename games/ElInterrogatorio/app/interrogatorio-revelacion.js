import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useInterrogatorioStore } from '../store/interrogatorioStore';
import { InterrogatorioHeader } from '../components/InterrogatorioHeader';

export const ElInterrogatorioRevelacion = ({ navigation }) => {
  const currentSituation = useInterrogatorioStore((state) => state.currentSituation);
  const accusation = useInterrogatorioStore((state) => state.accusation);
  const accusationCorrect = useInterrogatorioStore((state) => state.accusationCorrect);
  const accusationSimilarity = useInterrogatorioStore((state) => state.accusationSimilarity);
  const currentRound = useInterrogatorioStore((state) => state.currentRound);
  const players = useInterrogatorioStore((state) => state.players);
  const maxRounds = useInterrogatorioStore((state) => state.maxRounds);
  const getCurrentSuspect = useInterrogatorioStore((state) => state.getCurrentSuspect);
  const endRound = useInterrogatorioStore((state) => state.endRound);
  const nextRound = useInterrogatorioStore((state) => state.nextRound);
  const resetGame = useInterrogatorioStore((state) => state.resetGame);
  const roundStats = useInterrogatorioStore((state) => state.roundStats);
  const questionHistory = useInterrogatorioStore((state) => state.questionHistory);
  const maxQuestions = useInterrogatorioStore((state) => state.maxQuestions);
  const questionsRemaining = useInterrogatorioStore((state) => state.questionsRemaining);

  const suspect = getCurrentSuspect();

  const handleNextRound = () => {
    endRound();
    nextRound();
    if (navigation && navigation.navigate) {
      navigation.navigate('asignacion');
    }
  };

  const handleFinishGame = () => {
    endRound();
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const shouldContinue = maxRounds === null || currentRound < maxRounds;

  return (
    <ScrollView style={styles.container}>
      <InterrogatorioHeader 
        title="Revelación"
        currentRound={currentRound}
      />
      
      <View style={styles.content}>
        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Resultado de la Ronda</Text>
          
          {accusation && (
            <View style={styles.accusationSection}>
              <Text style={styles.accusationLabel}>Acusación de los Detectives:</Text>
              <Text style={styles.accusationText}>"{accusation}"</Text>
            </View>
          )}
          
          <View style={styles.situationSection}>
            <Text style={styles.situationLabel}>Situación Real:</Text>
            <Text style={styles.situationText}>{currentSituation}</Text>
          </View>
          
          {accusationSimilarity > 0 && (
            <View style={styles.similaritySection}>
              <Text style={styles.similarityLabel}>Similitud con la situación:</Text>
              <View style={styles.similarityBar}>
                <View 
                  style={[
                    styles.similarityBarFill, 
                    { width: `${accusationSimilarity}%` },
                    accusationCorrect ? styles.similarityBarCorrect : styles.similarityBarIncorrect
                  ]} 
                />
              </View>
              <Text style={styles.similarityPercentage}>{accusationSimilarity}%</Text>
            </View>
          )}
          
          <View style={[
            styles.resultBox,
            accusationCorrect ? styles.resultBoxCorrect : styles.resultBoxIncorrect
          ]}>
            <Text style={styles.resultIcon}>
              {accusationCorrect ? '✓' : '✗'}
            </Text>
            <Text style={styles.resultText}>
              {accusationCorrect
                ? 'Los Detectives ganan esta ronda'
                : 'El Sospechoso gana esta ronda'}
            </Text>
          </View>
        </View>
        
        <View style={styles.roundStatsCard}>
          <Text style={styles.roundStatsTitle}>📊 Estadísticas de la Ronda</Text>
          <View style={styles.roundStatsRow}>
            <View style={styles.roundStatItem}>
              <Text style={styles.roundStatValue}>{maxQuestions - questionsRemaining}</Text>
              <Text style={styles.roundStatLabel}>Preguntas usadas</Text>
            </View>
            <View style={styles.roundStatItem}>
              <Text style={styles.roundStatValue}>{questionHistory.length}</Text>
              <Text style={styles.roundStatLabel}>Preguntas registradas</Text>
            </View>
            <View style={styles.roundStatItem}>
              <Text style={styles.roundStatValue}>{questionsRemaining}</Text>
              <Text style={styles.roundStatLabel}>Preguntas restantes</Text>
            </View>
          </View>
        </View>

        <View style={styles.scoresCard}>
          <Text style={styles.scoresTitle}>🏆 Puntuaciones Totales</Text>
          <View style={styles.scoresList}>
            {players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => {
                const isLeader = index === 0 && player.score > 0;
                const isSuspect = suspect && player.id === suspect.id;
                return (
                  <View 
                    key={player.id} 
                    style={[
                      styles.scoreRow,
                      isLeader && styles.scoreRowLeader,
                      isSuspect && styles.scoreRowSuspect
                    ]}
                  >
                    <View style={styles.scoreRowLeft}>
                      <Text style={styles.scoreRank}>
                        {isLeader ? '🥇' : index + 1 === 1 ? '🥇' : index + 1 === 2 ? '🥈' : index + 1 === 3 ? '🥉' : `${index + 1}.`}
                      </Text>
                      <Text style={styles.scoreName}>{player.name}</Text>
                      {isSuspect && <Text style={styles.suspectBadge}>🔍 Sospechoso</Text>}
                    </View>
                    <Text style={[styles.scoreValue, isLeader && styles.scoreValueLeader]}>
                      {player.score} {player.score === 1 ? 'punto' : 'puntos'}
                    </Text>
                  </View>
                );
              })}
          </View>
        </View>

        {shouldContinue ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNextRound}>
            <Text style={styles.nextButtonText}>Siguiente Ronda</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.finishButton} onPress={handleFinishGame}>
            <Text style={styles.finishButtonText}>Finalizar Juego</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.menuButton} onPress={handleFinishGame}>
          <Text style={styles.menuButtonText}>Volver al Menú</Text>
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
  content: {
    padding: 20,
  },
  resultCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  accusationSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  accusationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  accusationText: {
    fontSize: 18,
    color: '#333',
    fontStyle: 'italic',
  },
  situationSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff3e0',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ff5722',
  },
  situationLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  situationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  resultBox: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  resultBoxCorrect: {
    backgroundColor: '#c8e6c9',
    borderWidth: 2,
    borderColor: '#4caf50',
  },
  resultBoxIncorrect: {
    backgroundColor: '#ffcdd2',
    borderWidth: 2,
    borderColor: '#f44336',
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  resultText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  similaritySection: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  similarityLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  similarityBar: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  similarityBarFill: {
    height: '100%',
    borderRadius: 10,
  },
  similarityBarCorrect: {
    backgroundColor: '#4caf50',
  },
  similarityBarIncorrect: {
    backgroundColor: '#ff9800',
  },
  similarityPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  roundStatsCard: {
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
  roundStatsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  roundStatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  roundStatItem: {
    alignItems: 'center',
  },
  roundStatValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 5,
  },
  roundStatLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  scoresList: {
    marginTop: 10,
  },
  scoreRowLeader: {
    backgroundColor: '#fff9c4',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  scoreRowSuspect: {
    backgroundColor: '#fff3e0',
  },
  scoreRowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  scoreRank: {
    fontSize: 20,
    marginRight: 10,
    width: 40,
    textAlign: 'center',
  },
  suspectBadge: {
    fontSize: 12,
    color: '#ff5722',
    fontWeight: '600',
    marginLeft: 10,
    backgroundColor: '#ffe0b2',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  scoreValueLeader: {
    color: '#ff6f00',
    fontSize: 22,
  },
  scoresCard: {
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
  scoresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scoreName: {
    fontSize: 16,
    color: '#333',
  },
  scoreValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  nextButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  finishButton: {
    backgroundColor: '#ff5722',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  menuButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ElInterrogatorioRevelacion;

