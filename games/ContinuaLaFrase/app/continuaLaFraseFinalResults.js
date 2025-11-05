import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { ContinuaLaFraseScoreboard } from '../components/ContinuaLaFraseScoreboard';
import { ContinuaLaFraseVotingArea } from '../components/ContinuaLaFraseVotingArea';
import { useContinuaLaFraseStore } from '../store/continuaLaFraseStore';

export const ContinuaLaFraseFinalResults = ({ navigation }) => {
  const gameStatus = useContinuaLaFraseStore((state) => state.gameStatus);
  const currentPrompt = useContinuaLaFraseStore((state) => state.currentPrompt);
  const currentResponses = useContinuaLaFraseStore((state) => state.currentResponses);
  const players = useContinuaLaFraseStore((state) => state.players);
  const currentRound = useContinuaLaFraseStore((state) => state.currentRound);
  const maxRounds = useContinuaLaFraseStore((state) => state.maxRounds);
  const currentPlayerId = useContinuaLaFraseStore((state) => state.currentPlayerId);
  
  const startNextRound = useContinuaLaFraseStore((state) => state.startNextRound);
  const resetGame = useContinuaLaFraseStore((state) => state.resetGame);
  
  const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isFinished = gameStatus === 'finished';
  
  const handleNextRound = () => {
    startNextRound();
    if (navigation && navigation.navigate) {
      navigation.navigate('continua-la-frase-game-screen');
    }
  };
  
  const handleReset = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>
        {isFinished ? 'Resultados Finales' : 'Resultados de la Ronda'}
      </Text>
      
      {currentPrompt && (
        <View style={styles.promptContainer}>
          <View style={styles.promptHeader}>
            <Text style={styles.promptLabel}>📝 Frase de la ronda:</Text>
            {currentRound && maxRounds && (
              <Text style={styles.roundInfo}>Ronda {currentRound} de {maxRounds}</Text>
            )}
          </View>
          <Text style={styles.promptText}>{currentPrompt}</Text>
        </View>
      )}
      
      {currentResponses.length > 0 && (
        <View style={styles.responsesContainer}>
          <Text style={styles.responsesTitle}>Respuestas con votos:</Text>
          <ContinuaLaFraseVotingArea
            responses={currentResponses}
            onVote={() => {}}
            voterPlayerId={effectivePlayerId}
            showVotes={true}
          />
        </View>
      )}
      
      <ContinuaLaFraseScoreboard 
        players={players} 
        currentRound={currentRound}
        maxRounds={maxRounds}
      />
      
      {!isFinished && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={handleNextRound}
        >
          <Text style={styles.nextButtonText}>Siguiente Ronda</Text>
        </TouchableOpacity>
      )}
      
      {isFinished && (
        <TouchableOpacity
          style={styles.resetButton}
          onPress={handleReset}
        >
          <Text style={styles.resetButtonText}>Nueva Partida</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  promptContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
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
  promptHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  promptLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2196F3',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  roundInfo: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff9800',
    backgroundColor: '#fff3e0',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  promptText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    lineHeight: 28,
    fontStyle: 'italic',
  },
  responsesContainer: {
    marginBottom: 20,
  },
  responsesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

