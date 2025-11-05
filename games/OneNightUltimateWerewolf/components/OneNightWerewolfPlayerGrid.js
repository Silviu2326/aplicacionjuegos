import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';

export const OneNightWerewolfPlayerGrid = ({ onPlayerSelect, selectable = false, showVotes = false }) => {
  const players = useOneNightWerewolfStore((state) => state.players);
  const votes = useOneNightWerewolfStore((state) => state.votes);
  const currentPlayerId = useOneNightWerewolfStore((state) => state.currentPlayerId);
  
  const handlePlayerPress = (playerId) => {
    if (selectable && onPlayerSelect) {
      onPlayerSelect(playerId);
    }
  };
  
  const getPlayerVotes = (playerId) => {
    if (!showVotes) return 0;
    return Object.values(votes).filter(votedForId => votedForId === playerId).length;
  };
  
  return (
    <View style={styles.container}>
      {players.map((player) => {
        const voteCount = getPlayerVotes(player.id);
        const isCurrentPlayer = player.id === currentPlayerId;
        const hasVote = voteCount > 0;
        
        return (
          <TouchableOpacity
            key={player.id}
            style={[
              styles.playerCard,
              selectable && styles.selectable,
              isCurrentPlayer && styles.currentPlayer,
              hasVote && styles.hasVote,
            ]}
            onPress={() => handlePlayerPress(player.id)}
            disabled={!selectable}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {player.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.playerName} numberOfLines={1}>
              {player.name}
            </Text>
            {showVotes && voteCount > 0 && (
              <View style={styles.voteBadge}>
                <Text style={styles.voteText}>{voteCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 16,
  },
  playerCard: {
    width: 100,
    height: 120,
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectable: {
    borderColor: '#2196F3',
    borderWidth: 3,
  },
  currentPlayer: {
    borderColor: '#4CAF50',
    backgroundColor: '#f1f8f4',
  },
  hasVote: {
    borderColor: '#FF5722',
    backgroundColor: '#fff3f0',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  voteBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#FF5722',
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  voteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

