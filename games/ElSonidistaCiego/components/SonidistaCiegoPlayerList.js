import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const SonidistaCiegoPlayerList = ({ players, onRemovePlayer, currentBlindSoundIndex = null }) => {
  if (!players || players.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hay jugadores agregados</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {players.map((player, index) => {
        const isBlindSound = currentBlindSoundIndex !== null && index === currentBlindSoundIndex;
        return (
          <View
            key={player.id}
            style={[
              styles.playerItem,
              isBlindSound && styles.playerItemBlindSound,
            ]}
          >
            <View style={styles.playerInfo}>
              <Text style={styles.playerNumber}>{index + 1}.</Text>
              <Text style={[styles.playerName, isBlindSound && styles.playerNameBlindSound]}>
                {player.name}
              </Text>
              {isBlindSound && (
                <Text style={styles.blindSoundBadge}>👁️ Sonidista Ciego</Text>
              )}
            </View>
            {onRemovePlayer && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => onRemovePlayer(player.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            )}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  playerItemBlindSound: {
    backgroundColor: '#fff3e0',
    borderWidth: 2,
    borderColor: '#ff5722',
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerNumber: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  playerNameBlindSound: {
    fontWeight: 'bold',
    color: '#ff5722',
  },
  blindSoundBadge: {
    fontSize: 12,
    color: '#ff5722',
    marginLeft: 10,
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

