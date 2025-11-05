import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { ConexionInesperadaConceptPair } from '../components/ConexionInesperadaConceptPair';
import { ConexionInesperadaTimer } from '../components/ConexionInesperadaTimer';
import { ConexionInesperadaResponseInput } from '../components/ConexionInesperadaResponseInput';
import { ConexionInesperadaVotingCard } from '../components/ConexionInesperadaVotingCard';
import { ConexionInesperadaScoreboard } from '../components/ConexionInesperadaScoreboard';
import { useConexionInesperadaStore } from '../store/useConexionInesperadaStore';

export const ConexionInesperadaPartida = ({ navigation }) => {
  const gameStatus = useConexionInesperadaStore((state) => state.gameStatus);
  const currentConceptPair = useConexionInesperadaStore((state) => state.currentConceptPair);
  const writingTimeRemaining = useConexionInesperadaStore((state) => state.writingTimeRemaining);
  const votingTimeRemaining = useConexionInesperadaStore((state) => state.votingTimeRemaining);
  const currentResponses = useConexionInesperadaStore((state) => state.currentResponses);
  const players = useConexionInesperadaStore((state) => state.players);
  const currentRound = useConexionInesperadaStore((state) => state.currentRound);
  const maxRounds = useConexionInesperadaStore((state) => state.maxRounds);
  
  const submitResponse = useConexionInesperadaStore((state) => state.submitResponse);
  const startVotingPhase = useConexionInesperadaStore((state) => state.startVotingPhase);
  const submitVote = useConexionInesperadaStore((state) => state.submitVote);
  const finishRound = useConexionInesperadaStore((state) => state.finishRound);
  const allPlayersResponded = useConexionInesperadaStore((state) => state.allPlayersResponded);
  const decrementWritingTime = useConexionInesperadaStore((state) => state.decrementWritingTime);
  const decrementVotingTime = useConexionInesperadaStore((state) => state.decrementVotingTime);
  
  // Para desarrollo: usar el primer jugador como jugador actual
  const currentPlayerId = players.length > 0 ? players[0].id : null;
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  
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
        navigation.navigate('conexion-inesperada-resultados');
      }, 1000);
    } else if (gameStatus === 'finished' && navigation && navigation.navigate) {
      navigation.navigate('conexion-inesperada-resultados');
    }
  }, [gameStatus, navigation]);
  
  const handleSubmitResponse = (playerId, response) => {
    submitResponse(playerId, response);
  };
  
  const handleVote = (voterPlayerId, responseId) => {
    const success = submitVote(voterPlayerId, responseId);
    if (!success) {
      Alert.alert('Error', 'No puedes votar por tu propia respuesta');
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
              navigation.navigate('conexion-inesperada-resultados');
            }
          },
        },
      ]
    );
  };
  
  if (gameStatus === 'setup') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Configurando partida...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <ConexionInesperadaScoreboard 
        players={players} 
        currentRound={currentRound} 
        maxRounds={maxRounds}
        currentResponses={currentResponses}
      />
      
      {gameStatus === 'writing' && (
        <View style={styles.phaseContainer}>
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseTitle}>✍️ Fase de Escritura</Text>
            <Text style={styles.phaseSubtitle}>Piensa en una conexión creativa entre estos conceptos</Text>
          </View>
          
          <ConexionInesperadaConceptPair conceptPair={currentConceptPair} />
          <ConexionInesperadaTimer timeRemaining={writingTimeRemaining} phase="writing" />
          
          {currentPlayer && (
            <ConexionInesperadaResponseInput
              onSubmit={handleSubmitResponse}
              playerId={currentPlayer.id}
              currentResponse={currentPlayer.currentResponse}
            />
          )}
          
          <View style={styles.waitingContainer}>
            <View style={styles.progressIndicator}>
              <View style={[
                styles.progressBar,
                { width: `${(currentResponses.length / players.length) * 100}%` }
              ]} />
            </View>
            <Text style={styles.waitingText}>
              {currentResponses.length === players.length 
                ? '✅ Todos han respondido' 
                : `Esperando respuestas: ${currentResponses.length}/${players.length}`}
            </Text>
            {currentResponses.length < players.length && (
              <Text style={styles.waitingHint}>
                Faltan {players.length - currentResponses.length} respuesta{players.length - currentResponses.length > 1 ? 's' : ''}
              </Text>
            )}
          </View>
        </View>
      )}
      
      {gameStatus === 'voting' && (
        <View style={styles.phaseContainer}>
          <View style={styles.phaseHeader}>
            <Text style={styles.phaseTitle}>🗳️ Fase de Votación</Text>
            <Text style={styles.phaseSubtitle}>Vota por la conexión más creativa (no puedes votar por la tuya)</Text>
          </View>
          
          <ConexionInesperadaConceptPair conceptPair={currentConceptPair} />
          <ConexionInesperadaTimer timeRemaining={votingTimeRemaining} phase="voting" />
          
          <View style={styles.responsesHeader}>
            <Text style={styles.responsesCount}>
              {currentResponses.length} {currentResponses.length === 1 ? 'respuesta' : 'respuestas'}
            </Text>
          </View>
          
          {currentResponses
            .sort((a, b) => (b.votes || 0) - (a.votes || 0))
            .map((response) => (
              <ConexionInesperadaVotingCard
                key={response.id}
                response={response}
                onVote={handleVote}
                voterPlayerId={currentPlayerId}
                votes={response.votes}
                showVotes={true}
              />
            ))}
          
          <TouchableOpacity
            style={styles.finishButton}
            onPress={handleFinishVoting}
          >
            <Text style={styles.finishButtonText}>✨ Finalizar Votación</Text>
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
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  phaseContainer: {
    marginTop: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  phaseHeader: {
    marginBottom: 20,
    alignItems: 'center',
  },
  phaseTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  phaseSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  responsesHeader: {
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#e0e0e0',
  },
  responsesCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
  },
  waitingContainer: {
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: 12,
    marginTop: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  progressIndicator: {
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
  },
  waitingText: {
    fontSize: 17,
    color: '#1a1a1a',
    fontWeight: '600',
    marginBottom: 4,
  },
  waitingHint: {
    fontSize: 13,
    color: '#999',
    fontStyle: 'italic',
  },
  finishButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  finishButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

