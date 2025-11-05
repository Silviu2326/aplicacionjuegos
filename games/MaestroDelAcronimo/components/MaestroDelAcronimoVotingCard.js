import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useMaestroDelAcronimoStore } from '../store/maestroDelAcronimoStore';

export const MaestroDelAcronimoVotingCard = ({ 
  phrase, 
  onVote, 
  voterPlayerId,
  showVotes = false,
}) => {
  const playerVotes = useMaestroDelAcronimoStore((state) => state.playerVotes);
  const players = useMaestroDelAcronimoStore((state) => state.players);
  const canVoteForPhrase = useMaestroDelAcronimoStore((state) => state.canVoteForPhrase);

  const handleVote = () => {
    if (onVote && voterPlayerId && phrase) {
      onVote(voterPlayerId, phrase.id);
    }
  };

  const hasVoted = playerVotes[voterPlayerId] === phrase.id;
  const isOwnPhrase = phrase.playerId === voterPlayerId;
  const hasAlreadyVoted = !!playerVotes[voterPlayerId];
  const canVote = canVoteForPhrase 
    ? canVoteForPhrase(voterPlayerId, phrase.id)
    : !hasVoted && !isOwnPhrase && !hasAlreadyVoted && voterPlayerId;

  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Jugador';
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        hasVoted && styles.cardVoted,
        isOwnPhrase && styles.cardOwn,
        showVotes && phrase.votes > 0 && styles.cardWithVotes,
      ]}
      onPress={() => canVote && !hasVoted && handleVote()}
      disabled={!canVote || hasVoted || isOwnPhrase}
    >
      <View style={styles.content}>
        <Text style={styles.phraseText}>{phrase.phrase}</Text>
        
        {showVotes && (
          <View style={styles.votesContainer}>
            <Text style={styles.votesText}>
              {phrase.votes} {phrase.votes === 1 ? 'voto' : 'votos'}
            </Text>
          </View>
        )}
        
        {showVotes && (
          <Text style={styles.authorText}>
            - {getPlayerName(phrase.playerId)}
          </Text>
        )}
        
        {hasVoted && (
          <View style={styles.votedBadge}>
            <Text style={styles.votedBadgeText}>✓ Votado</Text>
          </View>
        )}
        
        {isOwnPhrase && (
          <View style={styles.ownBadge}>
            <Text style={styles.ownBadgeText}>Tu frase</Text>
          </View>
        )}
      </View>
      
      {canVote && !hasVoted && !isOwnPhrase && (
        <View style={styles.voteButton}>
          <Text style={styles.voteButtonText}>Votar</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardVoted: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
  },
  cardOwn: {
    borderColor: '#9e9e9e',
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  cardWithVotes: {
    borderColor: '#ff9800',
    backgroundColor: '#fff3e0',
  },
  content: {
    flex: 1,
  },
  phraseText: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
    fontWeight: '500',
  },
  votesContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#ff9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
    marginBottom: 5,
  },
  votesText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  authorText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 5,
  },
  votedBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  votedBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ownBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#9e9e9e',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginTop: 5,
  },
  ownBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  voteButton: {
    marginTop: 10,
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

