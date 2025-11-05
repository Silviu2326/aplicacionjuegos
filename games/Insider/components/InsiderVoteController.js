import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { InsiderPlayerList } from './InsiderPlayerList';

export const InsiderVoteController = ({ 
  players, 
  currentVoterId, 
  votes, 
  onVote,
  disabled = false 
}) => {
  const currentVoter = players.find(p => p.id === currentVoterId);
  const hasVoted = currentVoter && votes[currentVoterId] !== undefined;
  const allVoted = players.every(player => votes[player.id] !== undefined);

  return (
    <View style={styles.container}>
      {currentVoter && (
        <View style={styles.header}>
          <Text style={styles.title}>
            {currentVoter.name}, ¿quién crees que es el Infiltrado?
          </Text>
          {hasVoted && (
            <View style={styles.votedIndicator}>
              <Text style={styles.votedText}>✓ Voto registrado</Text>
            </View>
          )}
        </View>
      )}
      
      <View style={styles.playerListContainer}>
        <InsiderPlayerList
          players={players.filter(p => p.id !== currentVoterId)}
          onVote={onVote}
          currentVoterId={currentVoterId}
          votes={votes}
          showVoteButtons={true}
          disabled={disabled || hasVoted}
        />
      </View>
      
      {allVoted && (
        <View style={styles.allVotedContainer}>
          <Text style={styles.allVotedText}>Todos los jugadores han votado</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  votedIndicator: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  votedText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  playerListContainer: {
    flex: 1,
  },
  allVotedContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  allVotedText: {
    fontSize: 16,
    color: '#2196F3',
    fontWeight: 'bold',
  },
});

