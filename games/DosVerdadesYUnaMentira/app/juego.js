import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useDosVerdadesStore } from '../store/dosVerdadesStore';
import { DosVerdadesPlayerHUD } from '../components/DosVerdadesPlayerHUD';
import { DosVerdadesVotingInterface } from '../components/DosVerdadesVotingInterface';
import { DosVerdadesTurnResultModal } from '../components/DosVerdadesTurnResultModal';

export const DosVerdadesJuego = ({ navigation }) => {
  const [localVote, setLocalVote] = useState(null);
  const [showResultModal, setShowResultModal] = useState(false);
  
  const gameStatus = useDosVerdadesStore((state) => state.gameStatus);
  const players = useDosVerdadesStore((state) => state.players);
  const currentPlayerId = useDosVerdadesStore((state) => state.currentPlayerId);
  const currentStatements = useDosVerdadesStore((state) => state.currentStatements);
  const lieIndex = useDosVerdadesStore((state) => state.lieIndex);
  const votes = useDosVerdadesStore((state) => state.votes);
  const debateTimeRemaining = useDosVerdadesStore((state) => state.debateTimeRemaining);
  const votingTimeRemaining = useDosVerdadesStore((state) => state.votingTimeRemaining);
  const currentRound = useDosVerdadesStore((state) => state.currentRound);
  const gameStats = useDosVerdadesStore((state) => state.gameStats);
  const turnHistory = useDosVerdadesStore((state) => state.turnHistory);
  
  const getCurrentNarrator = useDosVerdadesStore((state) => state.getCurrentNarrator);
  const decrementDebateTime = useDosVerdadesStore((state) => state.decrementDebateTime);
  const decrementVotingTime = useDosVerdadesStore((state) => state.decrementVotingTime);
  const startVotingPhase = useDosVerdadesStore((state) => state.startVotingPhase);
  const submitVote = useDosVerdadesStore((state) => state.submitVote);
  const revealResults = useDosVerdadesStore((state) => state.revealResults);
  const nextTurn = useDosVerdadesStore((state) => state.nextTurn);
  const allPlayersVoted = useDosVerdadesStore((state) => state.allPlayersVoted);
  const getVoteResults = useDosVerdadesStore((state) => state.getVoteResults);
  const getPlayerStats = useDosVerdadesStore((state) => state.getPlayerStats);
  
  const narrator = getCurrentNarrator();
  const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isNarrator = narrator && effectivePlayerId === narrator.id;
  const playerVote = votes[effectivePlayerId];
  const voteResults = gameStatus === 'revelation' ? getVoteResults() : null;

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

  // Mostrar modal de resultados cuando se revelan
  useEffect(() => {
    if (gameStatus === 'revelation') {
      setShowResultModal(true);
    }
  }, [gameStatus]);

  // Navegación automática a resultados cuando termina el juego
  useEffect(() => {
    if (gameStatus === 'finished') {
      if (navigation && navigation.navigate) {
        navigation.navigate('resultados');
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
    setShowResultModal(false);
    nextTurn();
  };

  const handleCloseModal = () => {
    setShowResultModal(false);
    handleNextTurn();
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
          
          <DosVerdadesVotingInterface
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
      return (
        <View style={styles.phaseContainer}>
          <View style={styles.revelationHeader}>
            <Text style={styles.revelationTitle}>¡Revelación!</Text>
            {voteResults && (
              <Text style={styles.revelationSubtitle}>
                {voteResults.correctGuesses.length} jugador{voteResults.correctGuesses.length !== 1 ? 'es' : ''} adivinó correctamente
              </Text>
            )}
          </View>
          
          <DosVerdadesVotingInterface
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

  const getVotingProgress = () => {
    if (!narrator) return 0;
    const votingPlayers = players.filter(p => p.id !== narrator.id);
    const votedCount = votingPlayers.filter(p => votes[p.id] !== undefined).length;
    return votingPlayers.length > 0 ? (votedCount / votingPlayers.length) * 100 : 0;
  };

  const votingProgress = gameStatus === 'voting' ? getVotingProgress() : 0;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>🎯 Ronda {currentRound}</Text>
          {gameStats.totalTurns > 0 && (
            <Text style={styles.statsMini}>
              Turno {gameStats.totalTurns + 1}
            </Text>
          )}
        </View>
        {narrator && (
          <View style={styles.narratorInfo}>
            <Text style={styles.narratorLabel}>🎤 Narrador:</Text>
            <Text style={styles.narratorName}>{narrator.name}</Text>
            {!isNarrator && effectivePlayerId && getPlayerStats(effectivePlayerId) && (
              <Text style={styles.playerStatsMini}>
                Tu precisión: {getPlayerStats(effectivePlayerId).accuracy}%
              </Text>
            )}
          </View>
        )}
      </View>
      
      <DosVerdadesPlayerHUD
        players={players}
        narratorId={narrator?.id}
      />
      
      {gameStatus === 'voting' && (
        <View style={styles.progressBarContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressBarFill, { width: `${votingProgress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {Math.round(votingProgress)}% de votos recibidos
          </Text>
        </View>
      )}
      
      <ScrollView style={styles.content}>
        {renderPhaseContent()}
        
        {gameStatus === 'debate' && !isNarrator && (
          <View style={styles.tipsBox}>
            <Text style={styles.tipsTitle}>💡 Preguntas sugeridas</Text>
            <Text style={styles.tipText}>
              • "¿Cuándo sucedió esto?"{'\n'}
              • "¿Dónde estabas cuando pasó?"{'\n'}
              • "¿Puedes darnos más detalles?"{'\n'}
              • "¿Hay testigos de esto?"{'\n'}
              • "¿Por qué elegiste estas afirmaciones?"
            </Text>
          </View>
        )}
        
        {gameStatus === 'voting' && isNarrator && (
          <View style={styles.waitingBox}>
            <Text style={styles.waitingText}>
              ⏳ Esperando a que los demás jugadores voten...
            </Text>
            <Text style={styles.waitingSubtext}>
              Mientras tanto, piensa en cómo defenderás tus afirmaciones cuando se revelen los resultados.
            </Text>
          </View>
        )}
      </ScrollView>

      <DosVerdadesTurnResultModal
        visible={showResultModal && gameStatus === 'revelation'}
        statements={currentStatements}
        lieIndex={lieIndex}
        voteResults={voteResults}
        players={players}
        narrator={narrator}
        onClose={handleCloseModal}
      />
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
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  statsMini: {
    fontSize: 14,
    color: '#999',
    fontWeight: '500',
  },
  narratorInfo: {
    alignItems: 'center',
    marginTop: 5,
  },
  narratorLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  narratorName: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
    marginTop: 2,
  },
  playerStatsMini: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  progressBarContainer: {
    backgroundColor: '#fff',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  tipsBox: {
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#1565c0',
    lineHeight: 20,
  },
  waitingBox: {
    backgroundColor: '#fff3cd',
    margin: 10,
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ffc107',
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
    textAlign: 'center',
  },
  waitingSubtext: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    lineHeight: 20,
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

export default DosVerdadesJuego;

