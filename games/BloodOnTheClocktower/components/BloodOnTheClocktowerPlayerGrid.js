import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const BloodOnTheClocktowerPlayerGrid = ({ players, onPlayerPress, currentPlayerId }) => {
  const getPlayerStatus = (player) => {
    if (!player.isAlive) return 'dead';
    if (player.onBlock) return 'on-block';
    if (player.nominatedBy) return 'nominated';
    return 'alive';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'dead':
        return '#666';
      case 'on-block':
        return '#ff0000';
      case 'nominated':
        return '#ff8800';
      case 'alive':
      default:
        return '#4caf50';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'dead':
        return '💀';
      case 'on-block':
        return '⛓️';
      case 'nominated':
        return '🎯';
      case 'alive':
      default:
        return '✓';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {players.map((player) => {
          const status = getPlayerStatus(player);
          const isCurrentPlayer = player.id === currentPlayerId;
          
          return (
            <TouchableOpacity
              key={player.id}
              style={[
                styles.playerCircle,
                {
                  backgroundColor: player.color || '#ccc',
                  borderColor: isCurrentPlayer ? '#fff' : getStatusColor(status),
                  borderWidth: isCurrentPlayer ? 3 : 2,
                },
              ]}
              onPress={() => onPlayerPress && onPlayerPress(player)}
              disabled={!onPlayerPress}
            >
              <Text style={styles.playerInitial}>
                {player.name?.charAt(0).toUpperCase() || '?'}
              </Text>
              <View
                style={[
                  styles.statusBadge,
                  { backgroundColor: getStatusColor(status) },
                ]}
              >
                <Text style={styles.statusText}>{getStatusText(status)}</Text>
              </View>
              {!player.isAlive && !player.ghostVoteUsed && (
                <View style={styles.ghostVoteBadge}>
                  <Text style={styles.ghostVoteText}>👻</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  playerInitial: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  statusBadge: {
    position: 'absolute',
    bottom: -5,
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
  ghostVoteBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#9c27b0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  ghostVoteText: {
    fontSize: 10,
  },
});

