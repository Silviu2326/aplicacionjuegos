import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const OrdenaLaHistoriaPlayerAvatar = ({ player, size = 60, showName = true }) => {
  const initials = player.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: player.color,
          },
        ]}
      >
        <Text style={[styles.initials, { fontSize: size * 0.35 }]}>{initials}</Text>
        {player.isHost && (
          <View style={styles.hostBadge}>
            <Text style={styles.hostBadgeText}>★</Text>
          </View>
        )}
      </View>
      {showName && (
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  initials: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  hostBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#FFD700',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  hostBadgeText: {
    fontSize: 14,
    color: '#000000',
  },
  name: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
    maxWidth: 80,
  },
});
