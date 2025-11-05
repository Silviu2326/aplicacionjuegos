import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaestroDelAcronimoScoreboard } from '../components/MaestroDelAcronimoScoreboard';
import { MaestroDelAcronimoVotingCard } from '../components/MaestroDelAcronimoVotingCard';
import { MaestroDelAcronimoAcronymDisplay } from '../components/MaestroDelAcronimoAcronymDisplay';
import { useMaestroDelAcronimoStore } from '../store/maestroDelAcronimoStore';

export const MaestroDelAcronimoResults = ({ navigation }) => {
  const gameStatus = useMaestroDelAcronimoStore((state) => state.gameStatus);
  const currentAcronym = useMaestroDelAcronimoStore((state) => state.currentAcronym);
  const currentPhrases = useMaestroDelAcronimoStore((state) => state.currentPhrases);
  const players = useMaestroDelAcronimoStore((state) => state.players);
  const currentRound = useMaestroDelAcronimoStore((state) => state.currentRound);
  const maxRounds = useMaestroDelAcronimoStore((state) => state.maxRounds);
  const currentPlayerId = useMaestroDelAcronimoStore((state) => state.currentPlayerId);
  
  const startNextRound = useMaestroDelAcronimoStore((state) => state.startNextRound);
  const resetGame = useMaestroDelAcronimoStore((state) => state.resetGame);
  
  const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isFinished = gameStatus === 'finished';
  
  const handleNextRound = () => {
    startNextRound();
    if (navigation && navigation.navigate) {
      navigation.navigate('maestro-del-acronimo-game');
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
      
      {currentAcronym && (
        <View style={styles.acronymContainer}>
          <Text style={styles.acronymLabel}>Acrónimo de la ronda:</Text>
          <MaestroDelAcronimoAcronymDisplay acronym={currentAcronym} />
        </View>
      )}
      
      {currentPhrases.length > 0 && (
        <View style={styles.phrasesContainer}>
          <Text style={styles.phrasesTitle}>Frases con votos:</Text>
          <ScrollView style={styles.phrasesList}>
            {currentPhrases.map((phrase) => (
              <MaestroDelAcronimoVotingCard
                key={phrase.id}
                phrase={phrase}
                onVote={() => {}}
                voterPlayerId={effectivePlayerId}
                showVotes={true}
              />
            ))}
          </ScrollView>
        </View>
      )}
      
      <MaestroDelAcronimoScoreboard 
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
        <View style={styles.finishedContainer}>
          <Text style={styles.finishedText}>🏆 ¡Partida Finalizada! 🏆</Text>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>Nueva Partida</Text>
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  acronymContainer: {
    marginBottom: 20,
  },
  acronymLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  phrasesContainer: {
    marginBottom: 20,
  },
  phrasesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  phrasesList: {
    maxHeight: 400,
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
  finishedContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  finishedText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ff6f00',
    marginBottom: 20,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
    minWidth: 200,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

