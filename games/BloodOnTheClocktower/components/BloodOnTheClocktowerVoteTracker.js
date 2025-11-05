import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const BloodOnTheClocktowerVoteTracker = ({
  votes,
  players,
  nomineeId,
  requiredVotes,
}) => {
  const getVoteCount = () => {
    return Object.values(votes).filter(v => v.nomineeId === nomineeId).length;
  };

  const getVoters = () => {
    return Object.entries(votes)
      .filter(([_, vote]) => vote.nomineeId === nomineeId)
      .map(([voterId]) => {
        const player = players.find(p => p.id === voterId);
        return player;
      })
      .filter(Boolean);
  };

  const voteCount = getVoteCount();
  const voters = getVoters();
  const hasEnoughVotes = voteCount >= requiredVotes;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Votación</Text>
        <View style={styles.voteCountContainer}>
          <Text style={styles.voteCount}>{voteCount}</Text>
          <Text style={styles.voteRequired}>/ {requiredVotes}</Text>
        </View>
      </View>

      <View
        style={[
          styles.progressBar,
          { width: `${(voteCount / requiredVotes) * 100}%` },
          hasEnoughVotes && styles.progressBarComplete,
        ]}
      />

      {hasEnoughVotes && (
        <View style={styles.successMessage}>
          <Text style={styles.successText}>
            ✓ Votación alcanzada. El nominado queda en el patíbulo.
          </Text>
        </View>
      )}

      <ScrollView style={styles.votersList}>
        <Text style={styles.votersTitle}>Votantes:</Text>
        {voters.length > 0 ? (
          voters.map((voter) => (
            <View key={voter.id} style={styles.voterItem}>
              <View
                style={[
                  styles.voterAvatar,
                  { backgroundColor: voter.color || '#ccc' },
                ]}
              >
                <Text style={styles.voterInitial}>
                  {voter.name?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
              <Text style={styles.voterName}>{voter.name}</Text>
              {!voter.isAlive && (
                <Text style={styles.ghostVote}>👻 Voto fantasma</Text>
              )}
            </View>
          ))
        ) : (
          <Text style={styles.noVotesText}>Aún no hay votos</Text>
        )}
      </ScrollView>

      <View style={styles.allPlayersSection}>
        <Text style={styles.allPlayersTitle}>Todos los jugadores:</Text>
        <View style={styles.allPlayersGrid}>
          {players
            .filter((p) => p.isAlive || (!p.isAlive && !p.ghostVoteUsed))
            .map((player) => {
              const hasVoted = votes[player.id];
              const votedForNominee = hasVoted?.nomineeId === nomineeId;

              return (
                <View
                  key={player.id}
                  style={[
                    styles.playerVoteItem,
                    hasVoted && styles.playerVoted,
                    votedForNominee && styles.playerVotedForNominee,
                  ]}
                >
                  <View
                    style={[
                      styles.playerVoteAvatar,
                      { backgroundColor: player.color || '#ccc' },
                      !player.isAlive && styles.deadPlayer,
                    ]}
                  >
                    <Text style={styles.playerVoteInitial}>
                      {player.name?.charAt(0).toUpperCase() || '?'}
                    </Text>
                  </View>
                  <Text style={styles.playerVoteName} numberOfLines={1}>
                    {player.name}
                  </Text>
                  {hasVoted && (
                    <Text style={styles.voteStatus}>
                      {votedForNominee ? '✓' : '○'}
                    </Text>
                  )}
                </View>
              );
            })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  voteCountContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  voteCount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  voteRequired: {
    fontSize: 18,
    color: '#666',
    marginLeft: 5,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4caf50',
    borderRadius: 4,
    marginBottom: 15,
  },
  progressBarComplete: {
    backgroundColor: '#4caf50',
  },
  successMessage: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  successText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  votersList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  votersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  voterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  voterAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  voterInitial: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  voterName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  ghostVote: {
    fontSize: 12,
    color: '#9c27b0',
    marginLeft: 10,
  },
  noVotesText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
  allPlayersSection: {
    marginTop: 20,
  },
  allPlayersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  allPlayersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  playerVoteItem: {
    alignItems: 'center',
    width: 80,
    padding: 8,
    borderRadius: 10,
    backgroundColor: '#f5f5f5',
  },
  playerVoted: {
    backgroundColor: '#e3f2fd',
  },
  playerVotedForNominee: {
    backgroundColor: '#c8e6c9',
  },
  playerVoteAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  deadPlayer: {
    opacity: 0.5,
  },
  playerVoteInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerVoteName: {
    fontSize: 12,
    color: '#333',
    textAlign: 'center',
    marginBottom: 3,
  },
  voteStatus: {
    fontSize: 16,
    color: '#4caf50',
  },
});

