import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ROLES } from '../constants/BloodOnTheClocktowerRoles';

export const BloodOnTheClocktowerGrimoireToken = ({
  player,
  role,
  tokens = [],
  onPress,
  isSelected = false,
}) => {
  const getAlignmentColor = (alignment) => {
    switch (alignment) {
      case 'good':
        return '#4caf50';
      case 'evil':
        return '#f44336';
      default:
        return '#666';
    }
  };

  const getTokenIcon = (token) => {
    switch (token) {
      case 'poisoned':
        return '☠️';
      case 'protected':
        return '🛡️';
      case 'drunk':
        return '🍺';
      case 'dead':
        return '💀';
      default:
        return '•';
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.token,
        {
          borderColor: isSelected ? '#fff' : getAlignmentColor(role?.alignment),
          backgroundColor: player?.isDead ? '#666' : player?.color || '#ccc',
        },
        isSelected && styles.selectedToken,
      ]}
      onPress={onPress}
    >
      <Text style={styles.playerInitial}>
        {player?.name?.charAt(0).toUpperCase() || '?'}
      </Text>
      
      {role && (
        <View style={styles.roleBadge}>
          <Text style={styles.roleText} numberOfLines={1}>
            {role.name.substring(0, 8)}
          </Text>
        </View>
      )}
      
      {tokens.length > 0 && (
        <View style={styles.tokensContainer}>
          {tokens.map((token, index) => (
            <View key={index} style={styles.tokenBadge}>
              <Text style={styles.tokenIcon}>{getTokenIcon(token)}</Text>
            </View>
          ))}
        </View>
      )}
      
      {player?.isDead && (
        <View style={styles.deadOverlay}>
          <Text style={styles.deadIcon}>💀</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  token: {
    width: 80,
    height: 100,
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  selectedToken: {
    borderWidth: 3,
    transform: [{ scale: 1.1 }],
  },
  playerInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  roleBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    width: '100%',
  },
  roleText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tokensContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 4,
    gap: 2,
  },
  tokenBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenIcon: {
    fontSize: 12,
  },
  deadOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deadIcon: {
    fontSize: 40,
  },
});

