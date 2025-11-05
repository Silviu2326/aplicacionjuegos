import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const ConexionInesperadaVotingCard = ({ 
  response, 
  onVote, 
  voterPlayerId, 
  isVoted = false,
  showVotes = false,
  votes = 0,
}) => {
  const [hasVoted, setHasVoted] = useState(isVoted);

  const handleVote = () => {
    if (hasVoted || !onVote) return;
    
    // Verificar que no se vote por la propia respuesta
    if (response.playerId === voterPlayerId) {
      return;
    }
    
    if (onVote(voterPlayerId, response.id)) {
      setHasVoted(true);
    }
  };

  const canVote = !hasVoted && response.playerId !== voterPlayerId;
  const isOwnResponse = response.playerId === voterPlayerId;
  const isTopVoted = showVotes && votes > 0;

  return (
    <TouchableOpacity
      style={[
        styles.card,
        hasVoted && styles.cardVoted,
        showVotes && votes > 0 && styles.cardWithVotes,
        isOwnResponse && styles.cardOwnResponse,
        !canVote && !isOwnResponse && styles.cardDisabled,
      ]}
      onPress={handleVote}
      disabled={!canVote}
      activeOpacity={canVote ? 0.7 : 1}
    >
      <View style={styles.cardHeader}>
        {isTopVoted && (
          <View style={styles.topVotedBadge}>
            <Text style={styles.topVotedText}>🔥</Text>
          </View>
        )}
        {hasVoted && (
          <View style={styles.votedBadge}>
            <Text style={styles.votedBadgeIcon}>✓</Text>
            <Text style={styles.votedBadgeText}>Votado</Text>
          </View>
        )}
        {isOwnResponse && (
          <View style={styles.ownResponseBadge}>
            <Text style={styles.ownResponseBadgeText}>👤 Tu respuesta</Text>
          </View>
        )}
      </View>

      <View style={styles.content}>
        <Text style={[
          styles.responseText,
          isOwnResponse && styles.responseTextOwn
        ]}>
          "{response.response}"
        </Text>
      </View>

      <View style={styles.footer}>
        {showVotes && (
          <View style={[
            styles.votesContainer,
            isTopVoted && styles.votesContainerTop
          ]}>
            <Text style={styles.votesIcon}>🗳️</Text>
            <Text style={styles.votesText}>
              {votes} {votes === 1 ? 'voto' : 'votos'}
            </Text>
          </View>
        )}
        {canVote && (
          <TouchableOpacity
            style={styles.voteButton}
            onPress={handleVote}
            activeOpacity={0.8}
          >
            <Text style={styles.voteButtonText}>Votar ✨</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 18,
    padding: 18,
    marginVertical: 10,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardVoted: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
    borderWidth: 3,
  },
  cardWithVotes: {
    borderColor: '#ff9800',
    backgroundColor: '#fff3e0',
    borderWidth: 3,
  },
  cardOwnResponse: {
    borderColor: '#9e9e9e',
    backgroundColor: '#f5f5f5',
    opacity: 0.8,
  },
  cardDisabled: {
    opacity: 0.6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 12,
    minHeight: 30,
  },
  topVotedBadge: {
    backgroundColor: '#ff9800',
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  topVotedText: {
    fontSize: 16,
  },
  votedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginRight: 8,
  },
  votedBadgeIcon: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 4,
  },
  votedBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  ownResponseBadge: {
    backgroundColor: '#9e9e9e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ownResponseBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    marginBottom: 15,
  },
  responseText: {
    fontSize: 17,
    color: '#1a1a1a',
    lineHeight: 24,
    fontStyle: 'italic',
    textAlign: 'left',
  },
  responseTextOwn: {
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  votesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff9800',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  votesContainerTop: {
    backgroundColor: '#ff6f00',
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  votesIcon: {
    fontSize: 16,
    marginRight: 6,
  },
  votesText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  voteButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

