import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const Salem1692PlayerDisplay = ({ 
  player, 
  onPress, 
  isSelected = false,
  showRole = false,
  showAccusations = true,
}) => {
  if (!player) return null;
  
  return (
    <TouchableOpacity
      style={[
        styles.container,
        !player.isAlive && styles.deadPlayer,
        isSelected && styles.selectedPlayer,
      ]}
      onPress={onPress}
      disabled={!player.isAlive || !onPress}
    >
      <View style={styles.header}>
        <Text style={styles.playerName}>{player.name}</Text>
        {showRole && player.role && (
          <Text style={styles.roleText}>
            {player.role === 'witch' ? '🧙 Bruja' : '👨‍🌾 Aldeano'}
          </Text>
        )}
        {!player.isAlive && (
          <Text style={styles.deadText}>💀 Eliminado</Text>
        )}
      </View>
      
      {showAccusations && player.accusations && player.accusations.length > 0 && (
        <View style={styles.accusationsContainer}>
          <Text style={styles.accusationsText}>
            Acusaciones: {player.accusations.length}
          </Text>
          {player.accusations.length >= 7 && (
            <Text style={styles.trialWarning}>¡JUICIO!</Text>
          )}
        </View>
      )}
      
      {player.hasConspiracy && (
        <View style={styles.conspiracyBadge}>
          <Text style={styles.conspiracyText}>🔮 Conspiración</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deadPlayer: {
    opacity: 0.5,
    backgroundColor: '#f5f5f5',
  },
  selectedPlayer: {
    borderColor: '#4CAF50',
    borderWidth: 3,
    backgroundColor: '#e8f5e9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  roleText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  deadText: {
    fontSize: 14,
    color: '#f44336',
    fontWeight: 'bold',
  },
  accusationsContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#ffebee',
    borderRadius: 8,
  },
  accusationsText: {
    fontSize: 14,
    color: '#c62828',
    fontWeight: '600',
  },
  trialWarning: {
    fontSize: 16,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 4,
    textAlign: 'center',
  },
  conspiracyBadge: {
    marginTop: 8,
    padding: 6,
    backgroundColor: '#6a1b9a',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  conspiracyText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
});

