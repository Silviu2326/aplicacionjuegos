import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFakeArtistGameStore } from '../store/fakeArtistGameStore';
import { FakeArtistVotingCard } from '../components/FakeArtistVotingCard';
import { FakeArtistPlayerList } from '../components/FakeArtistPlayerList';

export const FakeArtistVoting = ({ navigation }) => {
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votedPlayers, setVotedPlayers] = useState(new Set());
  
  const players = useFakeArtistGameStore((state) => state.players);
  const votes = useFakeArtistGameStore((state) => state.votes);
  const discussionPhase = useFakeArtistGameStore((state) => state.discussionPhase);
  const castVote = useFakeArtistGameStore((state) => state.castVote);
  const startVoting = useFakeArtistGameStore((state) => state.startVoting);
  const finishVoting = useFakeArtistGameStore((state) => state.finishVoting);
  const drawingStrokes = useFakeArtistGameStore((state) => state.drawingStrokes);

  const currentVoter = players[currentVoterIndex];
  const hasVoted = currentVoter && votes[currentVoter.id];
  const allVoted = players.every(player => votes[player.id]);

  useEffect(() => {
    if (discussionPhase) {
      // En fase de discusión
    } else {
      // Iniciar votación
      startVoting();
    }
  }, []);

  const handleVote = (votedPlayerId) => {
    if (!currentVoter) return;
    
    castVote(currentVoter.id, votedPlayerId);
    setVotedPlayers(new Set([...votedPlayers, currentVoter.id]));
    
    // Si todos han votado, avanzar automáticamente
    const newVotes = { ...votes, [currentVoter.id]: votedPlayerId };
    const allVotedNow = players.every(player => newVotes[player.id]);
    
    if (allVotedNow && currentVoterIndex === players.length - 1) {
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

  if (discussionPhase) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Fase de Discusión</Text>
        <Text style={styles.subtitle}>
          Discute con los demás jugadores sobre quién crees que es el Artista Falso
        </Text>
        
        <ScrollView style={styles.strokesContainer}>
          <Text style={styles.strokesLabel}>Trazos del dibujo:</Text>
          {drawingStrokes.map((stroke, index) => {
            const player = players.find(p => p.id === stroke.playerId);
            return (
              <View key={stroke.id} style={styles.strokeItem}>
                <Text style={styles.strokeText}>
                  Trazo {index + 1}: {player?.name}
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSkipDiscussion}>
          <Text style={styles.buttonText}>Comenzar Votación</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (!currentVoter) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votación</Text>
      <Text style={styles.voterName}>
        {currentVoter.name}, ¿quién crees que es el Artista Falso?
      </Text>

      <ScrollView style={styles.votingGrid}>
        {players
          .filter(player => player.id !== currentVoter.id)
          .map((player) => (
            <FakeArtistVotingCard
              key={player.id}
              player={player}
              onVote={() => handleVote(player.id)}
              disabled={hasVoted}
              isSelected={votes[currentVoter.id] === player.id}
            />
          ))}
      </ScrollView>

      {hasVoted && (
        <View style={styles.votedContainer}>
          <Text style={styles.votedText}>✓ Voto registrado</Text>
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>
              {currentVoterIndex < players.length - 1 ? 'Siguiente Jugador' : 'Ver Resultados'}
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.progress}>
        {currentVoterIndex + 1} / {players.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  voterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  votingGrid: {
    flex: 1,
    marginBottom: 20,
  },
  votedContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  votedText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 15,
  },
  nextButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  strokesContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    maxHeight: 300,
  },
  strokesLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  strokeItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  strokeText: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

