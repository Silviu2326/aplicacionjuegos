import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const HombreLoboCastronegroPlayerAvatar = ({ player, status, isCurrentPlayer, voteCount = 0 }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'dead':
        return '#666';
      case 'selected':
        return '#4caf50';
      case 'alive':
      default:
        return '#2196F3';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'dead':
        return '💀';
      case 'selected':
        return '✓';
      case 'alive':
      default:
        return '';
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatarCircle,
          {
            backgroundColor: player.color || '#ccc',
            borderColor: isCurrentPlayer ? '#FFD700' : getStatusColor(status),
            borderWidth: isCurrentPlayer ? 4 : 2,
            opacity: status === 'dead' ? 0.5 : 1,
          },
        ]}
      >
        <Text style={styles.playerInitial}>
          {player.name?.charAt(0).toUpperCase() || '?'}
        </Text>
        {status !== 'alive' && (
          <View style={[styles.statusBadge, { backgroundColor: getStatusColor(status) }]}>
            <Text style={styles.statusText}>{getStatusIcon(status)}</Text>
          </View>
        )}
      </View>
      <Text style={[styles.playerName, status === 'dead' && styles.deadName]} numberOfLines={1}>
        {player.name}
      </Text>
      {voteCount > 0 && (
        <View style={styles.voteBadge}>
          <Text style={styles.voteCount}>{voteCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'relative',
  },
  avatarCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  playerInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
  },
  playerName: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    maxWidth: 80,
  },
  deadName: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  voteBadge: {
    position: 'absolute',
    top: -10,
    left: -10,
    backgroundColor: '#f44336',
    borderRadius: 12,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  voteCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

