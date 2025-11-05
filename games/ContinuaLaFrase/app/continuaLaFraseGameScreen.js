import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { ContinuaLaFrasePromptDisplay } from '../components/ContinuaLaFrasePromptDisplay';
import { ContinuaLaFraseAnswerInput } from '../components/ContinuaLaFraseAnswerInput';
import { ContinuaLaFraseVotingArea } from '../components/ContinuaLaFraseVotingArea';
import { ContinuaLaFrasePlayerList } from '../components/ContinuaLaFrasePlayerList';
import { useContinuaLaFraseStore } from '../store/continuaLaFraseStore';

export const ContinuaLaFraseGameScreen = ({ navigation }) => {
  const gameStatus = useContinuaLaFraseStore((state) => state.gameStatus);
  const currentPrompt = useContinuaLaFraseStore((state) => state.currentPrompt);
  const writingTimeRemaining = useContinuaLaFraseStore((state) => state.writingTimeRemaining);
  const votingTimeRemaining = useContinuaLaFraseStore((state) => state.votingTimeRemaining);
  const currentResponses = useContinuaLaFraseStore((state) => state.currentResponses);
  const players = useContinuaLaFraseStore((state) => state.players);
  const currentRound = useContinuaLaFraseStore((state) => state.currentRound);
  const maxRounds = useContinuaLaFraseStore((state) => state.maxRounds);
  const currentPlayerId = useContinuaLaFraseStore((state) => state.currentPlayerId);
  
  const submitResponse = useContinuaLaFraseStore((state) => state.submitResponse);
  const startVotingPhase = useContinuaLaFraseStore((state) => state.startVotingPhase);
  const submitVote = useContinuaLaFraseStore((state) => state.submitVote);
  const finishRound = useContinuaLaFraseStore((state) => state.finishRound);
  const allPlayersResponded = useContinuaLaFraseStore((state) => state.allPlayersResponded);
  const allPlayersVoted = useContinuaLaFraseStore((state) => state.allPlayersVoted);
  const decrementWritingTime = useContinuaLaFraseStore((state) => state.decrementWritingTime);
  const decrementVotingTime = useContinuaLaFraseStore((state) => state.decrementVotingTime);
  
  // Para desarrollo: usar el primer jugador como jugador actual si no hay uno asignado
  const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
  const currentPlayer = players.find(p => p.id === effectivePlayerId);
  
  // Timer para escritura
  useEffect(() => {
    if (gameStatus === 'writing') {
      const interval = setInterval(() => {
        decrementWritingTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, decrementWritingTime]);
  
  // Timer para votación
  useEffect(() => {
    if (gameStatus === 'voting') {
      const interval = setInterval(() => {
        decrementVotingTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, decrementVotingTime]);
  
  // Verificar si todos respondieron y pasar a votación
  useEffect(() => {
    if (gameStatus === 'writing' && allPlayersResponded()) {
      startVotingPhase();
    }
  }, [gameStatus, currentResponses.length, allPlayersResponded, startVotingPhase]);
  
  // Navegar a resultados cuando termine la ronda
  useEffect(() => {
    if (gameStatus === 'results' && navigation && navigation.navigate) {
      // Pequeño delay para que se vea el estado
      setTimeout(() => {
        navigation.navigate('continua-la-frase-final-results');
      }, 1000);
    } else if (gameStatus === 'finished' && navigation && navigation.navigate) {
      navigation.navigate('continua-la-frase-final-results');
    }
  }, [gameStatus, navigation]);
  
  const handleSubmitResponse = (playerId, response) => {
    submitResponse(playerId, response);
  };
  
  const handleVote = (voterPlayerId, responseId) => {
    const success = submitVote(voterPlayerId, responseId);
    if (!success) {
      Alert.alert('Error', 'No puedes votar por tu propia respuesta o ya votaste');
    }
  };
  
  const handleFinishVoting = () => {
    Alert.alert(
      'Finalizar votación',
      '¿Todos los jugadores han votado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          onPress: () => {
            const isFinished = finishRound();
            if (isFinished && navigation && navigation.navigate) {
              navigation.navigate('continua-la-frase-final-results');
            }
          },
        },
      ]
    );
  };
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  if (gameStatus === 'setup' || gameStatus === 'lobby') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Configurando partida...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.roundContainer}>
          <Text style={styles.roundLabel}>RONDA</Text>
          <Text style={styles.roundText}>
            {currentRound} / {maxRounds}
          </Text>
        </View>
        {gameStatus === 'writing' && (
          <View style={[
            styles.timerContainer,
            writingTimeRemaining <= 10 && styles.timerContainerUrgent
          ]}>
            <Text style={styles.timerLabel}>⏱️ Escribiendo</Text>
            <Text style={[
              styles.timerText,
              writingTimeRemaining <= 10 && styles.timerTextUrgent
            ]}>
              {formatTime(writingTimeRemaining)}
            </Text>
          </View>
        )}
        {gameStatus === 'voting' && (
          <View style={[
            styles.timerContainer,
            votingTimeRemaining <= 10 && styles.timerContainerUrgent
          ]}>
            <Text style={styles.timerLabel}>🗳️ Votando</Text>
            <Text style={[
              styles.timerText,
              votingTimeRemaining <= 10 && styles.timerTextUrgent
            ]}>
              {formatTime(votingTimeRemaining)}
            </Text>
          </View>
        )}
      </View>
      
      <ContinuaLaFrasePlayerList 
        players={players} 
        currentPlayerId={effectivePlayerId}
      />
      
      {gameStatus === 'writing' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase de Escritura</Text>
          <ContinuaLaFrasePromptDisplay 
            prompt={currentPrompt}
            roundNumber={currentRound}
            maxRounds={maxRounds}
          />
          
          {currentPlayer && (
            <ContinuaLaFraseAnswerInput
              onSubmit={handleSubmitResponse}
              playerId={currentPlayer.id}
              currentResponse={currentPlayer.currentResponse}
            />
          )}
          
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingTitle}>Esperando respuestas...</Text>
            <View style={styles.progressBarContainer}>
              <View style={[
                styles.progressBar,
                { width: `${(currentResponses.length / players.length) * 100}%` }
              ]} />
            </View>
            <Text style={styles.waitingText}>
              {currentResponses.length} de {players.length} jugadores han respondido
            </Text>
            {currentResponses.length === players.length && (
              <Text style={styles.allRespondedText}>
                ✓ ¡Todos han respondido! Esperando finalizar la votación...
              </Text>
            )}
          </View>
        </View>
      )}
      
      {gameStatus === 'voting' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase de Votación</Text>
          <ContinuaLaFrasePromptDisplay 
            prompt={currentPrompt}
            roundNumber={currentRound}
            maxRounds={maxRounds}
          />
          
          <ContinuaLaFraseVotingArea
            responses={currentResponses}
            onVote={handleVote}
            voterPlayerId={effectivePlayerId}
            showVotes={false}
          />
          
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishVoting}
          >
            <Text style={styles.finishButtonText}>Finalizar Votación</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingHorizontal: 10,
    gap: 10,
  },
  roundContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    alignItems: 'center',
    minWidth: 100,
  },
  roundLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  roundText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2196F3',
    marginTop: 2,
  },
  timerContainer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#4CAF50',
    alignItems: 'center',
    minWidth: 120,
  },
  timerContainerUrgent: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  timerLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
    letterSpacing: 1,
    marginBottom: 4,
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  timerTextUrgent: {
    color: '#f44336',
    fontSize: 22,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  phaseContainer: {
    marginTop: 10,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  waitingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e3f2fd',
  },
  waitingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    transition: 'width 0.3s ease',
  },
  waitingText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  allRespondedText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginTop: 8,
  },
  finishButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

