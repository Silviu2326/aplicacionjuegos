import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MAP_ROOMS } from '../constants/AmongUsMesaGameSettings';

export const AmongUsMesaMap = ({ currentLocation, players, onRoomSelect, disabled = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa de la Nave</Text>
      <View style={styles.mapGrid}>
        {MAP_ROOMS.map((room) => {
          const playersInRoom = players.filter(p => p.location === room.id && p.isAlive);
          const isCurrentLocation = currentLocation === room.id;
          
          return (
            <TouchableOpacity
              key={room.id}
              style={[
                styles.room,
                {
                  backgroundColor: room.color,
                  opacity: isCurrentLocation ? 1 : 0.7,
                },
                isCurrentLocation && styles.currentRoom,
                disabled && styles.disabled,
              ]}
              onPress={() => !disabled && onRoomSelect && onRoomSelect(room.id)}
              disabled={disabled}
            >
              <Text style={styles.roomName}>{room.name}</Text>
              {playersInRoom.length > 0 && (
                <View style={styles.playersIndicator}>
                  <Text style={styles.playersCount}>{playersInRoom.length}</Text>
                </View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
      {currentLocation && (
        <Text style={styles.currentLocationText}>
          Ubicación actual: {MAP_ROOMS.find(r => r.id === currentLocation)?.name}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  mapGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  room: {
    width: '30%',
    aspectRatio: 1,
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  currentRoom: {
    borderWidth: 4,
    borderColor: '#fff',
    shadowOpacity: 0.5,
    elevation: 10,
  },
  disabled: {
    opacity: 0.5,
  },
  roomName: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  playersIndicator: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  playersCount: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  currentLocationText: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

