import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';

export const SecretHitlerPlayerList = ({ currentPlayerId }) => {
  const players = useSecretHitlerStore((state) => state.players);
  const presidentId = useSecretHitlerStore((state) => state.presidentId);
  const chancellorId = useSecretHitlerStore((state) => state.chancellorId);
  const chancellorCandidateId = useSecretHitlerStore((state) => state.chancellorCandidateId);
  const votes = useSecretHitlerStore((state) => state.votes);
  const gamePhase = useSecretHitlerStore((state) => state.gamePhase);

  const getPlayerStatus = (player) => {
    if (player.eliminated) return 'Eliminado';
    if (player.id === presidentId) return 'Presidente';
    if (player.id === chancellorId) return 'Canciller';
    if (player.id === chancellorCandidateId) return 'Candidato a Canciller';
    return '';
  };

  const hasVoted = (playerId) => {
    return votes[playerId] !== undefined;
  };

  return (
    <ScrollView style={styles.container}>
      {players.map((player) => (
        <View
          key={player.id}
          style={[
            styles.playerItem,
            player.eliminated && styles.playerEliminated,
            player.id === presidentId && styles.playerPresident,
            player.id === chancellorId && styles.playerChancellor,
          ]}
        >
          <View style={styles.playerInfo}>
            <Text style={styles.playerName}>{player.name}</Text>
            {getPlayerStatus(player) !== '' && (
              <Text style={styles.playerStatus}>{getPlayerStatus(player)}</Text>
            )}
          </View>
          {gamePhase === 'voting' && !player.eliminated && (
            <View style={styles.voteIndicator}>
              {hasVoted(player.id) ? (
                <Text style={styles.votedText}>✓</Text>
              ) : (
                <Text style={styles.pendingText}>⏳</Text>
              )}
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerEliminated: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5',
  },
  playerPresident: {
    borderColor: '#FFD700',
    borderWidth: 2,
    backgroundColor: '#FFF9C4',
  },
  playerChancellor: {
    borderColor: '#FFA500',
    borderWidth: 2,
    backgroundColor: '#FFE0B2',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  playerStatus: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  voteIndicator: {
    marginLeft: 12,
  },
  votedText: {
    fontSize: 20,
    color: '#4CAF50',
  },
  pendingText: {
    fontSize: 20,
    color: '#FFC107',
  },
});
