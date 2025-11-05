import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useInsiderGameStore } from '../store/insiderGameStore';
import { InsiderTimerDisplay } from '../components/InsiderTimerDisplay';
import { InsiderVoteController } from '../components/InsiderVoteController';
import { InsiderQuestionLog } from '../components/InsiderQuestionLog';

export const InsiderVoting = ({ navigation }) => {
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  
  const players = useInsiderGameStore((state) => state.players);
  const votes = useInsiderGameStore((state) => state.votes);
  const discussionPhase = useInsiderGameStore((state) => state.discussionPhase);
  const timeRemaining = useInsiderGameStore((state) => state.timeRemaining);
  const questions = useInsiderGameStore((state) => state.questions);
  const castVote = useInsiderGameStore((state) => state.castVote);
  const startVoting = useInsiderGameStore((state) => state.startVoting);
  const finishVoting = useInsiderGameStore((state) => state.finishVoting);

  const currentVoter = players[currentVoterIndex];
  const currentVoterId = currentVoter?.id;
  const hasVoted = currentVoter && votes[currentVoterId];
  const allVoted = players.every(player => votes[player.id]);

  useEffect(() => {
    if (discussionPhase) {
      // En fase de discusión, esperar a que termine el tiempo
      const interval = setInterval(() => {
        const state = useInsiderGameStore.getState();
        if (state.gameStatus === 'voting' || state.timeRemaining <= 0) {
          clearInterval(interval);
          if (state.gameStatus !== 'voting') {
            startVoting();
          }
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // Iniciar votación
      startVoting();
    }
  }, [discussionPhase]);

  useEffect(() => {
    if (allVoted && currentVoterIndex === players.length - 1) {
      // Todos han votado, avanzar a resultados
      setTimeout(() => {
        finishVoting();
        navigation?.navigate('results');
      }, 1000);
    }
  }, [allVoted, currentVoterIndex, players.length]);

  const handleVote = (votedPlayerId) => {
    if (!currentVoter) return;
    
    castVote(currentVoterId, votedPlayerId);
    
    // Si todos han votado, avanzar automáticamente
    const newVotes = { ...votes, [currentVoterId]: votedPlayerId };
    const allVotedNow = players.every(player => newVotes[player.id]);
    
    if (allVotedNow) {
      setTimeout(() => {
        finishVoting();
        navigation?.navigate('results');
      }, 500);
    }
  };

  const handleNext = () => {
    if (currentVoterIndex < players.length - 1) {
      setCurrentVoterIndex(currentVoterIndex + 1);
    } else {
      // Todos han votado
      finishVoting();
      navigation?.navigate('results');
    }
  };

  const handleSkipDiscussion = () => {
    startVoting();
  };

  if (discussionPhase && timeRemaining > 0) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>💬 Fase de Discusión</Text>
          <Text style={styles.subtitle}>
            Discute con los demás jugadores sobre quién crees que es el Infiltrado
          </Text>
        </View>
        
        <View style={styles.timerCard}>
          <InsiderTimerDisplay 
            timeRemaining={timeRemaining} 
            label="Tiempo de discusión"
          />
        </View>

        <View style={styles.discussionCard}>
          <Text style={styles.sectionTitle}>💡 Consejos para la discusión:</Text>
          <View style={styles.tipsList}>
            <Text style={styles.tipItem}>• Analiza las preguntas que cada jugador hizo</Text>
            <Text style={styles.tipItem}>• Observa quién parecía saber demasiado</Text>
            <Text style={styles.tipItem}>• Considera quién dirigió las preguntas hacia la respuesta</Text>
            <Text style={styles.tipItem}>• Revisa el historial de preguntas y respuestas</Text>
          </View>
        </View>
        
        <View style={styles.questionLogContainer}>
          <InsiderQuestionLog questions={questions} players={players} />
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSkipDiscussion}>
          <Text style={styles.buttonText}>🗳️ Comenzar Votación</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  if (!currentVoter) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  const votesSoFar = Object.keys(votes).length;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🗳️ Votación</Text>
        <View style={styles.progressCard}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${(votesSoFar / players.length) * 100}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            {votesSoFar} de {players.length} votos registrados
          </Text>
        </View>
      </View>

      <InsiderVoteController
        players={players}
        currentVoterId={currentVoterId}
        votes={votes}
        onVote={handleVote}
        disabled={hasVoted}
      />

      {hasVoted && (
        <View style={styles.votedCard}>
          <Text style={styles.votedMessage}>✓ Voto registrado correctamente</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentVoterIndex < players.length - 1 ? 'Siguiente Jugador ➡️' : 'Ver Resultados 🏆'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    marginBottom: 20,
    marginTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  timerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  discussionCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tipsList: {
    marginLeft: 10,
  },
  tipItem: {
    fontSize: 14,
    color: '#555',
    lineHeight: 24,
    marginBottom: 8,
  },
  progressCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  questionLogContainer: {
    flex: 1,
    marginBottom: 20,
    maxHeight: 300,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  votedCard: {
    backgroundColor: '#E8F5E9',
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  votedMessage: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

