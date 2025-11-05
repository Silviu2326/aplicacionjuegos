import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MAP_CONFIG } from '../constants/FeedTheKrakenGameData';

export const FeedTheKrakenBoard = ({ shipPosition }) => {
  const currentPosition = MAP_CONFIG.positions.find(p => p.id === shipPosition) || MAP_CONFIG.positions[5];
  const distanceToBluewater = 5 - shipPosition;
  const distanceToCorsairs = Math.abs(-5 - shipPosition);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa del Barco</Text>
      
      {/* Información de distancia */}
      <View style={styles.distanceInfo}>
        <View style={styles.distanceBox}>
          <Text style={styles.distanceLabel}>Distancia a Bluewater Bay</Text>
          <Text style={[styles.distanceValue, { color: '#4a90e2' }]}>
            {distanceToBluewater} posición{distanceToBluewater !== 1 ? 'es' : ''}
          </Text>
        </View>
        <View style={styles.distanceBox}>
          <Text style={styles.distanceLabel}>Distancia a Corsarios</Text>
          <Text style={[styles.distanceValue, { color: '#f5a623' }]}>
            {distanceToCorsairs} posición{distanceToCorsairs !== 1 ? 'es' : ''}
          </Text>
        </View>
      </View>

      <View style={styles.mapContainer}>
        {/* Posición de Bluewater Bay (arriba) */}
        <View style={styles.positionContainer}>
          <View style={[
            styles.positionBox,
            shipPosition === 5 && styles.activePosition,
            styles.victoryPosition
          ]}>
            <Text style={styles.positionLabel}>Bluewater Bay</Text>
            <Text style={styles.positionType}>Victoria Marineros</Text>
            {currentPosition.id === 5 && currentPosition.description && (
              <Text style={styles.positionDescription}>{currentPosition.description}</Text>
            )}
            {shipPosition === 5 && <Text style={styles.shipMarker}>🚢</Text>}
          </View>
        </View>

        {/* Posiciones intermedias */}
        <View style={styles.middlePositions}>
          {[4, 3, 2, 1].map(pos => {
            const posData = MAP_CONFIG.positions.find(p => p.id === pos);
            return (
              <View key={pos} style={styles.positionContainer}>
                <View style={[
                  styles.positionBox,
                  shipPosition === pos && styles.activePosition,
                  posData?.dangerLevel && styles[`danger${posData.dangerLevel}`]
                ]}>
                  <Text style={styles.positionLabel}>{posData?.name || `Posición ${pos}`}</Text>
                  {posData?.dangerLevel && (
                    <Text style={styles.dangerLevel}>⚠️ {posData.dangerLevel}</Text>
                  )}
                  {shipPosition === pos && <Text style={styles.shipMarker}>🚢</Text>}
                </View>
              </View>
            );
          })}
        </View>

        {/* Posición de inicio */}
        <View style={styles.positionContainer}>
          <View style={[
            styles.positionBox,
            shipPosition === 0 && styles.activePosition,
            styles.startPosition
          ]}>
            <Text style={styles.positionLabel}>Puerto de Partida</Text>
            {currentPosition.id === 0 && currentPosition.description && (
              <Text style={styles.positionDescription}>{currentPosition.description}</Text>
            )}
            {shipPosition === 0 && <Text style={styles.shipMarker}>🚢</Text>}
          </View>
        </View>

        {/* Posiciones intermedias hacia abajo */}
        <View style={styles.middlePositions}>
          {[-1, -2, -3, -4].map(pos => {
            const posData = MAP_CONFIG.positions.find(p => p.id === pos);
            return (
              <View key={pos} style={styles.positionContainer}>
                <View style={[
                  styles.positionBox,
                  shipPosition === pos && styles.activePosition,
                  posData?.dangerLevel && styles[`danger${posData.dangerLevel}`]
                ]}>
                  <Text style={styles.positionLabel}>{posData?.name || `Posición ${Math.abs(pos)}`}</Text>
                  {posData?.dangerLevel && (
                    <Text style={styles.dangerLevel}>⚠️ {posData.dangerLevel}</Text>
                  )}
                  {shipPosition === pos && <Text style={styles.shipMarker}>🚢</Text>}
                </View>
              </View>
            );
          })}
        </View>

        {/* Posición de Ensenada de los Corsarios (abajo) */}
        <View style={styles.positionContainer}>
          <View style={[
            styles.positionBox,
            shipPosition === -5 && styles.activePosition,
            styles.victoryPosition
          ]}>
            <Text style={styles.positionLabel}>Ensenada Corsarios</Text>
            <Text style={styles.positionType}>Victoria Piratas</Text>
            {currentPosition.id === -5 && currentPosition.description && (
              <Text style={styles.positionDescription}>{currentPosition.description}</Text>
            )}
            {shipPosition === -5 && <Text style={styles.shipMarker}>🚢</Text>}
          </View>
        </View>
      </View>

      <View style={styles.positionInfo}>
        <Text style={styles.positionText}>
          Posición actual: {currentPosition.name}
        </Text>
        {currentPosition.description && (
          <Text style={styles.positionDescriptionText}>{currentPosition.description}</Text>
        )}
        {currentPosition.lore && (
          <Text style={styles.positionLore}>💭 {currentPosition.lore}</Text>
        )}
        <Text style={styles.positionValue}>
          Valor: {shipPosition}
        </Text>
        {currentPosition.dangerLevel && (
          <Text style={styles.dangerLevelText}>
            Nivel de peligro: {currentPosition.dangerLevel}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  mapContainer: {
    alignItems: 'center',
  },
  positionContainer: {
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  positionBox: {
    backgroundColor: '#0f1626',
    borderRadius: 8,
    padding: 15,
    minWidth: 200,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  activePosition: {
    borderColor: '#4a90e2',
    backgroundColor: '#1a2a4a',
  },
  victoryPosition: {
    backgroundColor: '#2a4a2a',
    borderColor: '#4a90e2',
  },
  startPosition: {
    backgroundColor: '#4a4a2a',
  },
  positionLabel: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  positionType: {
    fontSize: 12,
    color: '#a0a0a0',
  },
  shipMarker: {
    fontSize: 30,
    marginTop: 5,
  },
  middlePositions: {
    width: '100%',
  },
  positionInfo: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#0f1626',
    borderRadius: 8,
    alignItems: 'center',
  },
  positionText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  positionValue: {
    fontSize: 18,
    color: '#4a90e2',
    fontWeight: 'bold',
    marginTop: 5,
  },
  distanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#0f1626',
    borderRadius: 8,
  },
  distanceBox: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  distanceLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    textAlign: 'center',
  },
  distanceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  positionDescription: {
    fontSize: 11,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  positionDescriptionText: {
    fontSize: 13,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 5,
    lineHeight: 18,
  },
  positionLore: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  dangerLevel: {
    fontSize: 10,
    color: '#f5a623',
    marginTop: 3,
    fontWeight: 'bold',
  },
  dangerLevelText: {
    fontSize: 12,
    color: '#f5a623',
    marginTop: 5,
    fontWeight: 'bold',
  },
});

