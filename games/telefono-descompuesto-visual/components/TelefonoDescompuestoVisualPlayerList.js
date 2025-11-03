import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const TelefonoDescompuestoVisualPlayerList = ({ players, hostId, onRemovePlayer }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugadores ({players.length})</Text>
      {players.length === 0 ? (
        <Text style={styles.emptyText}>No hay jugadores agregados</Text>
      ) : (
        players.map((player) => (
          <View key={player.id} style={styles.playerItem}>
            <Text style={styles.playerName}>
              {player.name}
              {player.id === hostId && <Text style={styles.hostBadge}> (Anfitrión)</Text>}
            </Text>
            <View style={styles.playerActions}>
              {player.status && (
                <Text style={styles.playerStatus}>{player.status}</Text>
              )}
              {onRemovePlayer && (
                <TouchableOpacity 
                  style={styles.removeButton}
                  onPress={() => onRemovePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginVertical: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 6,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  hostBadge: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  playerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  playerStatus: {
    fontSize: 14,
    color: '#666',
  },
  removeButton: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
});

