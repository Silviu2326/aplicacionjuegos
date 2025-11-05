import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const AmongUsMesaPlayerAvatar = ({ player, size = 60, showName = true, showStatus = true }) => {
  const isAlive = player.isAlive;
  const isEjected = player.role && !isAlive;
  
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.avatar,
          {
            width: size,
            height: size,
            backgroundColor: player.color,
            opacity: isAlive ? 1 : 0.5,
          },
        ]}
      >
        {isEjected && (
          <View style={styles.ejectedMark}>
            <Text style={styles.ejectedText}>✕</Text>
          </View>
        )}
      </View>
      {showName && (
        <Text style={[styles.name, { fontSize: size * 0.2 }]} numberOfLines={1}>
          {player.name}
        </Text>
      )}
      {showStatus && (
        <Text style={[styles.status, { fontSize: size * 0.15 }]}>
          {isAlive ? 'Vivo' : 'Muerto'}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 5,
  },
  avatar: {
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  ejectedMark: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 50,
  },
  ejectedText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  name: {
    marginTop: 5,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
  },
  status: {
    marginTop: 2,
    color: '#666',
    textAlign: 'center',
  },
});

