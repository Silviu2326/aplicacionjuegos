import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { MaestroDelAcronimoAcronymDisplay } from '../components/MaestroDelAcronimoAcronymDisplay';
import { MaestroDelAcronimoPhraseInput } from '../components/MaestroDelAcronimoPhraseInput';
import { MaestroDelAcronimoVotingCard } from '../components/MaestroDelAcronimoVotingCard';
import { MaestroDelAcronimoTimer } from '../components/MaestroDelAcronimoTimer';
import { MaestroDelAcronimoScoreboard } from '../components/MaestroDelAcronimoScoreboard';
import { useMaestroDelAcronimoStore } from '../store/maestroDelAcronimoStore';

export const MaestroDelAcronimoGame = ({ navigation }) => {
  const gameStatus = useMaestroDelAcronimoStore((state) => state.gameStatus);
  const currentAcronym = useMaestroDelAcronimoStore((state) => state.currentAcronym);
  const writingTimeRemaining = useMaestroDelAcronimoStore((state) => state.writingTimeRemaining);
  const votingTimeRemaining = useMaestroDelAcronimoStore((state) => state.votingTimeRemaining);
  const currentPhrases = useMaestroDelAcronimoStore((state) => state.currentPhrases);
  const players = useMaestroDelAcronimoStore((state) => state.players);
  const currentRound = useMaestroDelAcronimoStore((state) => state.currentRound);
  const maxRounds = useMaestroDelAcronimoStore((state) => state.maxRounds);
  const currentPlayerId = useMaestroDelAcronimoStore((state) => state.currentPlayerId);
  const writingTime = useMaestroDelAcronimoStore((state) => state.writingTime);
  const votingTime = useMaestroDelAcronimoStore((state) => state.votingTime);
  
  const submitPhrase = useMaestroDelAcronimoStore((state) => state.submitPhrase);
  const startVotingPhase = useMaestroDelAcronimoStore((state) => state.startVotingPhase);
  const submitVote = useMaestroDelAcronimoStore((state) => state.submitVote);
  const finishRound = useMaestroDelAcronimoStore((state) => state.finishRound);
  const allPlayersResponded = useMaestroDelAcronimoStore((state) => state.allPlayersResponded);
  const allPlayersVoted = useMaestroDelAcronimoStore((state) => state.allPlayersVoted);
  const decrementWritingTime = useMaestroDelAcronimoStore((state) => state.decrementWritingTime);
  const decrementVotingTime = useMaestroDelAcronimoStore((state) => state.decrementVotingTime);
  
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
  }, [gameStatus, currentPhrases.length, allPlayersResponded, startVotingPhase]);
  
  // Navegar a resultados cuando termine la ronda
  useEffect(() => {
    if (gameStatus === 'results' && navigation && navigation.navigate) {
      setTimeout(() => {
        navigation.navigate('maestro-del-acronimo-results');
      }, 1000);
    } else if (gameStatus === 'finished' && navigation && navigation.navigate) {
      navigation.navigate('maestro-del-acronimo-results');
    }
  }, [gameStatus, navigation]);
  
  const handleSubmitPhrase = (playerId, phrase) => {
    submitPhrase(playerId, phrase);
  };
  
  const handleVote = (voterPlayerId, phraseId) => {
    const success = submitVote(voterPlayerId, phraseId);
    if (!success) {
      Alert.alert('Error', 'No puedes votar por tu propia frase o ya votaste');
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
              navigation.navigate('maestro-del-acronimo-results');
            }
          },
        },
      ]
    );
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
        <Text style={styles.roundText}>
          Ronda {currentRound} de {maxRounds}
        </Text>
      </View>
      
      <MaestroDelAcronimoScoreboard 
        players={players} 
        currentRound={currentRound}
        maxRounds={maxRounds}
      />
      
      {gameStatus === 'writing' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase de Escritura</Text>
          
          <MaestroDelAcronimoTimer
            timeRemaining={writingTimeRemaining}
            totalTime={writingTime}
            phase="writing"
          />
          
          <MaestroDelAcronimoAcronymDisplay acronym={currentAcronym} />
          
          {currentPlayer && (
            <MaestroDelAcronimoPhraseInput
              onSubmit={handleSubmitPhrase}
              playerId={currentPlayer.id}
              currentPhrase={currentPlayer.currentPhrase}
              acronym={currentAcronym}
            />
          )}
          
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>
              Esperando frases: {currentPhrases.length}/{players.length}
            </Text>
          </View>
        </View>
      )}
      
      {gameStatus === 'voting' && (
        <View style={styles.phaseContainer}>
          <Text style={styles.phaseTitle}>Fase de Votación</Text>
          
          <MaestroDelAcronimoTimer
            timeRemaining={votingTimeRemaining}
            totalTime={votingTime}
            phase="voting"
          />
          
          <MaestroDelAcronimoAcronymDisplay acronym={currentAcronym} />
          
          <Text style={styles.votingInstructions}>
            Vota por la frase que más te guste (no puedes votar por la tuya)
          </Text>
          
          <ScrollView style={styles.phrasesContainer}>
            {currentPhrases.map((phrase) => (
              <MaestroDelAcronimoVotingCard
                key={phrase.id}
                phrase={phrase}
                onVote={handleVote}
                voterPlayerId={effectivePlayerId}
                showVotes={false}
              />
            ))}
          </ScrollView>
          
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
  },
  roundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
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
  votingInstructions: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginVertical: 15,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
  phrasesContainer: {
    maxHeight: 500,
  },
  waitingContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  waitingText: {
    fontSize: 16,
    color: '#666',
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

