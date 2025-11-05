import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export const InsiderPlayerList = ({ 
  players, 
  onRemovePlayer,
  onVote,
  currentVoterId,
  votes = {},
  showVoteButtons = false,
  disabled = false
}) => {
  const renderPlayer = ({ item }) => {
    const hasVoted = votes[item.id] !== undefined;
    const isVotedByCurrent = votes[currentVoterId] === item.id;
    
    return (
      <View style={[styles.playerItem, isVotedByCurrent && styles.votedPlayerItem]}>
        <View style={styles.playerInfo}>
          <Text style={[styles.playerName, isVotedByCurrent && styles.votedPlayerName]}>
            {item.name}
          </Text>
          {item.role && (
            <Text style={styles.roleBadge}>
              {item.role === 'guide' ? '👑' : item.role === 'insider' ? '🎭' : '👤'}
            </Text>
          )}
          {hasVoted && showVoteButtons && (
            <Text style={styles.voteIndicator}>✓</Text>
          )}
        </View>
        {onRemovePlayer && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemovePlayer(item.id)}
          >
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        )}
        {onVote && showVoteButtons && !disabled && item.id !== currentVoterId && (
          <TouchableOpacity
            style={[styles.voteButton, isVotedByCurrent && styles.voteButtonSelected]}
            onPress={() => onVote(item.id)}
          >
            <Text style={styles.voteButtonText}>
              {isVotedByCurrent ? 'Votado' : 'Votar'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  votedPlayerItem: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    marginRight: 8,
  },
  votedPlayerName: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  roleBadge: {
    fontSize: 18,
    marginRight: 8,
  },
  voteIndicator: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  voteButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    marginLeft: 8,
  },
  voteButtonSelected: {
    backgroundColor: '#4CAF50',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

