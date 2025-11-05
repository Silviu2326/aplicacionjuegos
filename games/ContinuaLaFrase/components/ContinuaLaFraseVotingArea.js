import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useContinuaLaFraseStore } from '../store/continuaLaFraseStore';

export const ContinuaLaFraseVotingArea = ({ 
  responses, 
  onVote, 
  voterPlayerId,
  showVotes = false,
}) => {
  const playerVotes = useContinuaLaFraseStore((state) => state.playerVotes);
  const players = useContinuaLaFraseStore((state) => state.players);

  const handleVote = (responseId) => {
    if (onVote && voterPlayerId) {
      onVote(voterPlayerId, responseId);
    }
  };

  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Jugador';
  };

  const totalVotes = responses.reduce((sum, r) => sum + (r.votes || 0), 0);
  const hasEveryoneVoted = Object.keys(playerVotes).length === players.length;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.instructions}>
          {showVotes 
            ? 'Resultados de las respuestas:' 
            : 'Vota por la respuesta que más te guste (no puedes votar por la tuya)'}
        </Text>
        {!showVotes && (
          <View style={styles.votingStats}>
            <Text style={styles.statsText}>
              {Object.keys(playerVotes).length} de {players.length} jugadores han votado
            </Text>
          </View>
        )}
        {showVotes && totalVotes > 0 && (
          <View style={styles.votingStats}>
            <Text style={styles.statsText}>
              Total: {totalVotes} {totalVotes === 1 ? 'voto' : 'votos'}
            </Text>
          </View>
        )}
      </View>
      
      {responses.map((response) => {
        const hasVoted = playerVotes[voterPlayerId] === response.id;
        const isOwnResponse = response.playerId === voterPlayerId;
        const hasAlreadyVoted = !!playerVotes[voterPlayerId];
        const canVote = !hasVoted && !isOwnResponse && !hasAlreadyVoted && voterPlayerId;

        return (
          <TouchableOpacity
            key={response.id}
            style={[
              styles.responseCard,
              hasVoted && styles.responseCardVoted,
              isOwnResponse && styles.responseCardOwn,
              showVotes && response.votes > 0 && styles.responseCardWithVotes,
            ]}
            onPress={() => canVote && handleVote(response.id)}
            disabled={!canVote || hasVoted}
          >
            <View style={styles.responseContent}>
              <Text style={styles.responseText}>{response.response}</Text>
              
              {showVotes && (
                <View style={styles.votesContainer}>
                  <Text style={styles.votesText}>
                    {response.votes} {response.votes === 1 ? 'voto' : 'votos'}
                  </Text>
                </View>
              )}
              
              {showVotes && (
                <Text style={styles.authorText}>
                  - {getPlayerName(response.playerId)}
                </Text>
              )}
              
              {hasVoted && (
                <View style={styles.votedBadge}>
                  <Text style={styles.votedBadgeText}>✓ Votado</Text>
                </View>
              )}
              
              {isOwnResponse && (
                <View style={styles.ownBadge}>
                  <Text style={styles.ownBadgeText}>Tu respuesta</Text>
                </View>
              )}
            </View>
            
            {canVote && !hasVoted && (
              <View style={styles.voteButton}>
                <Text style={styles.voteButtonText}>Votar</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
  headerContainer: {
    marginBottom: 15,
  },
  instructions: {
    fontSize: 15,
    textAlign: 'center',
    color: '#333',
    marginBottom: 10,
    fontWeight: '600',
    paddingHorizontal: 10,
  },
  votingStats: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  statsText: {
    fontSize: 13,
    color: '#1976d2',
    fontWeight: '600',
  },
  responseCard: {
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
  responseCardVoted: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
  },
  responseCardOwn: {
    borderColor: '#9e9e9e',
    backgroundColor: '#f5f5f5',
    opacity: 0.7,
  },
  responseCardWithVotes: {
    borderColor: '#ff9800',
    backgroundColor: '#fff3e0',
  },
  responseContent: {
    flex: 1,
  },
  responseText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 10,
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

