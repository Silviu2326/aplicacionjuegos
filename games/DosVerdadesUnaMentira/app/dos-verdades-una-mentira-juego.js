import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDosVerdadesUnaMentiraStore } from '../store/dosVerdadesUnaMentiraStore';
import { DosVerdadesUnaMentiraPlayerHUD } from '../components/DosVerdadesUnaMentiraPlayerHUD';
import { DosVerdadesUnaMentiraVotingView } from '../components/DosVerdadesUnaMentiraVotingView';

export const DosVerdadesUnaMentiraJuego = ({ navigation }) => {
  const [localVote, setLocalVote] = useState(null);
  
  const gameStatus = useDosVerdadesUnaMentiraStore((state) => state.gameStatus);
  const players = useDosVerdadesUnaMentiraStore((state) => state.players);
  const currentPlayerId = useDosVerdadesUnaMentiraStore((state) => state.currentPlayerId);
  const currentStatements = useDosVerdadesUnaMentiraStore((state) => state.currentStatements);
  const lieIndex = useDosVerdadesUnaMentiraStore((state) => state.lieIndex);
  const votes = useDosVerdadesUnaMentiraStore((state) => state.votes);
  const debateTimeRemaining = useDosVerdadesUnaMentiraStore((state) => state.debateTimeRemaining);
  const votingTimeRemaining = useDosVerdadesUnaMentiraStore((state) => state.votingTimeRemaining);
  const currentRound = useDosVerdadesUnaMentiraStore((state) => state.currentRound);
  
  const getCurrentNarrator = useDosVerdadesUnaMentiraStore((state) => state.getCurrentNarrator);
  const decrementDebateTime = useDosVerdadesUnaMentiraStore((state) => state.decrementDebateTime);
  const decrementVotingTime = useDosVerdadesUnaMentiraStore((state) => state.decrementVotingTime);
  const startVotingPhase = useDosVerdadesUnaMentiraStore((state) => state.startVotingPhase);
  const submitVote = useDosVerdadesUnaMentiraStore((state) => state.submitVote);
  const revealResults = useDosVerdadesUnaMentiraStore((state) => state.revealResults);
  const nextTurn = useDosVerdadesUnaMentiraStore((state) => state.nextTurn);
  const allPlayersVoted = useDosVerdadesUnaMentiraStore((state) => state.allPlayersVoted);
  const getVoteResults = useDosVerdadesUnaMentiraStore((state) => state.getVoteResults);
  
  const narrator = getCurrentNarrator();
  const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isNarrator = narrator && effectivePlayerId === narrator.id;
  const playerVote = votes[effectivePlayerId];
  const voteResults = gameStatus === 'revelation' ? getVoteResults() : null;
  const gameStats = useDosVerdadesUnaMentiraStore((state) => state.gameStats);

  // Temporizador de debate
  useEffect(() => {
    if (gameStatus === 'debate') {
      const interval = setInterval(() => {
        decrementDebateTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, debateTimeRemaining]);

  // Temporizador de votación
  useEffect(() => {
    if (gameStatus === 'voting') {
      const interval = setInterval(() => {
        decrementVotingTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, votingTimeRemaining]);

  // Verificar si todos votaron
  useEffect(() => {
    if (gameStatus === 'voting' && allPlayersVoted()) {
      // Esperar un momento antes de revelar
      const timeout = setTimeout(() => {
        revealResults();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [gameStatus, votes, allPlayersVoted]);

  // Navegación automática a resultados cuando termina el juego
  useEffect(() => {
    if (gameStatus === 'finished') {
      if (navigation && navigation.navigate) {
        navigation.navigate('dos-verdades-una-mentira-resultados');
      }
    }
  }, [gameStatus]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleVote = (statementIndex) => {
    if (gameStatus === 'voting' && !isNarrator && effectivePlayerId) {
      setLocalVote(statementIndex);
      submitVote(effectivePlayerId, statementIndex);
    }
  };

  const handleSubmitVote = (statementIndex) => {
    if (gameStatus === 'voting' && !isNarrator && effectivePlayerId) {
      submitVote(effectivePlayerId, statementIndex);
      Alert.alert('Voto registrado', 'Tu voto ha sido guardado');
    }
  };

  const handleSkipDebate = () => {
    startVotingPhase();
  };

  const handleReveal = () => {
    revealResults();
  };

  const handleNextTurn = () => {
    nextTurn();
  };

  const renderPhaseContent = () => {
    if (gameStatus === 'debate') {
      return (
        <View style={styles.phaseContainer}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Tiempo de debate</Text>
            <Text style={styles.timer}>{formatTime(debateTimeRemaining)}</Text>
          </View>
          
          {isNarrator && (
            <View style={styles.narratorInstructions}>
              <Text style={styles.instructionsTitle}>📢 Eres el narrador</Text>
              <Text style={styles.instructionsText}>
                Lee las tres afirmaciones en voz alta al grupo. Durante el debate, los demás jugadores te harán preguntas.
              </Text>
            </View>
          )}
          
          {!isNarrator && (
            <View style={styles.playerInstructions}>
              <Text style={styles.instructionsTitle}>💬 Fase de debate</Text>
              <Text style={styles.instructionsText}>
                Discute con los demás jugadores y haz preguntas al narrador para intentar descubrir cuál es la mentira.
              </Text>
            </View>
          )}
          
          <View style={styles.statementsContainer}>
            {currentStatements.map((statement, index) => (
              <View key={statement.id} style={styles.statementPreview}>
                <Text style={styles.statementPreviewNumber}>Afirmación {index + 1}</Text>
                <Text style={styles.statementPreviewText}>{statement.text}</Text>
              </View>
            ))}
          </View>
          
          {isNarrator && (
            <TouchableOpacity
              style={styles.skipButton}
              onPress={handleSkipDebate}
            >
              <Text style={styles.skipButtonText}>Finalizar debate</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    }

    if (gameStatus === 'voting') {
      return (
        <View style={styles.phaseContainer}>
          <View style={styles.timerContainer}>
            <Text style={styles.timerLabel}>Tiempo de votación</Text>
            <Text style={styles.timer}>{formatTime(votingTimeRemaining)}</Text>
          </View>
          
          {isNarrator && (
            <View style={styles.narratorInstructions}>
              <Text style={styles.instructionsTitle}>⏳ Esperando votos</Text>
              <Text style={styles.instructionsText}>
                Los demás jugadores están votando. No puedes votar ya que eres el narrador.
              </Text>
            </View>
          )}
          
          <DosVerdadesUnaMentiraVotingView
            statements={currentStatements}
            lieIndex={lieIndex}
            showRevelation={false}
            playerVote={playerVote}
            onVote={handleVote}
            onSubmitVote={handleSubmitVote}
            disabled={isNarrator}
          />
        </View>
      );
    }

    if (gameStatus === 'revelation') {
      const totalVoters = players.length - 1; // Excluir narrador
      const correctCount = voteResults ? voteResults.correctGuesses.length : 0;
      const fooledCount = totalVoters - correctCount;
      
      return (
        <View style={styles.phaseContainer}>
          <View style={styles.revelationHeader}>
            <Text style={styles.revelationTitle}>🎉 ¡Revelación!</Text>
            {voteResults && (
              <>
                <View style={styles.revelationStats}>
                  <View style={styles.revelationStatCard}>
                    <Text style={styles.revelationStatValue}>{correctCount}</Text>
                    <Text style={styles.revelationStatLabel}>✅ Adivinaron</Text>
                  </View>
                  <View style={styles.revelationStatCard}>
                    <Text style={styles.revelationStatValue}>{fooledCount}</Text>
                    <Text style={styles.revelationStatLabel}>😈 Engañados</Text>
                  </View>
                </View>
                {voteResults.playerVotes && Object.keys(voteResults.playerVotes).length > 0 && (
                  <View style={styles.votesBreakdown}>
                    <Text style={styles.votesBreakdownTitle}>Votos por afirmación:</Text>
                    {[0, 1, 2].map(index => (
                      <View key={index} style={styles.voteBreakdownItem}>
                        <Text style={styles.voteBreakdownLabel}>
                          Afirmación {index + 1}: {voteResults.statementVotes[index] || 0} votos
                        </Text>
                      </View>
                    ))}
                  </View>
                )}
              </>
            )}
          </View>
          
          <DosVerdadesUnaMentiraVotingView
            statements={currentStatements}
            lieIndex={lieIndex}
            showRevelation={true}
            voteResults={voteResults}
            disabled={true}
          />
          
          <TouchableOpacity
            style={styles.nextButton}
            onPress={handleNextTurn}
          >
            <Text style={styles.nextButtonText}>
              {gameStatus === 'finished' ? 'Ver resultados finales' : 'Siguiente turno'}
            </Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Ronda {currentRound}</Text>
          <Text style={styles.gameStats}>
            📊 {gameStats.totalStatements || 0} afirmaciones • {gameStats.totalVotes || 0} votos
          </Text>
        </View>
        {narrator && (
          <View style={styles.narratorContainer}>
            <Text style={styles.narratorLabel}>🎤 Narrador:</Text>
            <Text style={styles.narratorName}>{narrator.name}</Text>
            {narrator.stats && narrator.stats.timesNarrator > 0 && (
              <Text style={styles.narratorStats}>
                Tasa de engaño: {Math.round(narrator.stats.averageFoolingRate * 100) / 100} por ronda
              </Text>
            )}
          </View>
        )}
      </View>
      
      <DosVerdadesUnaMentiraPlayerHUD
        players={players}
        narratorId={narrator?.id}
      />
      
      <ScrollView style={styles.content}>
        {renderPhaseContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  headerTop: {
    alignItems: 'center',
    marginBottom: 10,
  },
  gameStats: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
  },
  narratorContainer: {
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  narratorLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  narratorName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff8c00',
    marginBottom: 5,
  },
  narratorStats: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  content: {
    flex: 1,
  },
  phaseContainer: {
    padding: 10,
  },
  timerContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    margin: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  timerLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  timer: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  narratorInstructions: {
    backgroundColor: '#fff9e6',
    padding: 15,
    borderRadius: 12,
    margin: 10,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  playerInstructions: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    margin: 10,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  statementsContainer: {
    margin: 10,
  },
  statementPreview: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  statementPreviewNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  statementPreviewText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
  },
  skipButton: {
    backgroundColor: '#ff9800',
    margin: 20,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  revelationHeader: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    margin: 10,
  },
  revelationTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  revelationSubtitle: {
    fontSize: 18,
    color: '#666',
  },
  revelationStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 15,
    marginBottom: 15,
  },
  revelationStatCard: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  revelationStatValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  revelationStatLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  votesBreakdown: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    width: '100%',
  },
  votesBreakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  voteBreakdownItem: {
    padding: 8,
    marginBottom: 5,
  },
  voteBreakdownLabel: {
    fontSize: 14,
    color: '#555',
  },
  nextButton: {
    backgroundColor: '#4caf50',
    margin: 20,
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
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
