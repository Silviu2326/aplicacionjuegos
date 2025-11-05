import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AmongUsMesaPlayerAvatar } from './AmongUsMesaPlayerAvatar';

export const AmongUsMesaVotingCard = ({ player, onVote, isSelected = false, disabled = false }) => {
  if (!player.isAlive) {
    return (
      <View style={[styles.container, styles.dead]}>
        <AmongUsMesaPlayerAvatar player={player} size={50} showStatus={false} />
        <Text style={styles.deadText}>Muerto</Text>
      </View>
    );
  }
  
  return (
    <TouchableOpacity
      style={[styles.container, isSelected && styles.selected, disabled && styles.disabled]}
      onPress={() => !disabled && onVote && onVote(player.id)}
      disabled={disabled}
    >
      <AmongUsMesaPlayerAvatar player={player} size={60} showStatus={false} />
      <Text style={styles.name}>{player.name}</Text>
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 120,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    padding: 10,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selected: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  dead: {
    opacity: 0.5,
    backgroundColor: '#f0f0f0',
  },
  disabled: {
    opacity: 0.5,
  },
  name: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  deadText: {
    marginTop: 5,
    fontSize: 10,
    color: '#999',
    fontStyle: 'italic',
  },
  selectedIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

