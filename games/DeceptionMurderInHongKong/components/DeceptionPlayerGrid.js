import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export const DeceptionPlayerGrid = ({ players = [], onPlayerPress, currentPlayerId }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.container}
    >
      {players.map((player) => (
        <TouchableOpacity
          key={player.id}
          style={[
            styles.playerCard,
            player.id === currentPlayerId && styles.currentPlayer,
            player.status === 'accused' && styles.accusedPlayer,
            player.status === 'speaking' && styles.speakingPlayer,
          ]}
          onPress={() => onPlayerPress?.(player)}
        >
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>
              {player.name?.charAt(0).toUpperCase() || '?'}
            </Text>
          </View>
          <Text style={styles.playerName} numberOfLines={1}>
            {player.name || 'Jugador'}
          </Text>
          {player.hasBadge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Placa</Text>
            </View>
          )}
          {player.role && (
            <Text style={styles.roleLabel}>{player.role}</Text>
          )}
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  playerCard: {
    alignItems: 'center',
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    minWidth: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  currentPlayer: {
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  accusedPlayer: {
    borderWidth: 2,
    borderColor: '#e74c3c',
  },
  speakingPlayer: {
    borderWidth: 2,
    borderColor: '#f39c12',
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerName: {
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 5,
  },
  badge: {
    backgroundColor: '#2ecc71',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 5,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  roleLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 5,
  },
});
