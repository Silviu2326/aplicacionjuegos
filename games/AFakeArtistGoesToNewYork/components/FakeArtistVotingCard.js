import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const FakeArtistVotingCard = ({ player, onVote, disabled, isSelected }) => {
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.selectedCard,
        disabled && styles.disabledCard,
      ]}
      onPress={onVote}
      disabled={disabled}
    >
      <View style={[styles.avatar, isSelected && styles.selectedAvatar]}>
        <Text style={styles.avatarText}>{getInitials(player.name)}</Text>
      </View>
      <Text style={[styles.playerName, isSelected && styles.selectedPlayerName]}>
        {player.name}
      </Text>
      {isSelected && (
        <Text style={styles.selectedBadge}>✓ Seleccionado</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedCard: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  disabledCard: {
    opacity: 0.5,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedAvatar: {
    backgroundColor: '#4CAF50',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedPlayerName: {
    color: '#4CAF50',
  },
  selectedBadge: {
    marginTop: 5,
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

