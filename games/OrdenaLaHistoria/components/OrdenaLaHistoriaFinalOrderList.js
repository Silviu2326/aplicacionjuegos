import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { OrdenaLaHistoriaPlayerAvatar } from './OrdenaLaHistoriaPlayerAvatar';

export const OrdenaLaHistoriaFinalOrderList = ({
  players,
  proposedOrder,
  onOrderChange,
  isEditable = true,
}) => {
  const [localOrder, setLocalOrder] = useState(proposedOrder || []);

  const handleMoveUp = (index) => {
    if (index === 0 || !isEditable) return;

    const newOrder = [...localOrder];
    [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    setLocalOrder(newOrder);
    if (onOrderChange) {
      onOrderChange(newOrder);
    }
  };

  const handleMoveDown = (index) => {
    if (index === localOrder.length - 1 || !isEditable) return;

    const newOrder = [...localOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setLocalOrder(newOrder);
    if (onOrderChange) {
      onOrderChange(newOrder);
    }
  };

  const getPlayerById = (playerId) => {
    return players.find((p) => p.id === playerId);
  };

  const displayOrder = proposedOrder && proposedOrder.length > 0 ? proposedOrder : localOrder;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Orden Propuesto</Text>
      <Text style={styles.subtitle}>
        {isEditable
          ? 'Reorganiza el orden arrastrando o usando los botones'
          : 'Orden final establecido'}
      </Text>

      {displayOrder.length === 0 && (
        <Text style={styles.emptyText}>Aún no se ha establecido un orden</Text>
      )}

      {displayOrder.map((playerId, index) => {
        const player = getPlayerById(playerId);
        if (!player) return null;

        return (
          <View key={playerId} style={styles.orderItem}>
            <View style={styles.orderNumber}>
              <Text style={styles.orderNumberText}>{index + 1}º</Text>
            </View>

            <OrdenaLaHistoriaPlayerAvatar player={player} size={50} showName={true} />

            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>{player.name}</Text>
              {player.sentence && (
                <Text style={styles.playerHint} numberOfLines={2}>
                  {player.sentence.substring(0, 50)}...
                </Text>
              )}
            </View>

            {isEditable && (
              <View style={styles.controls}>
                <TouchableOpacity
                  style={[styles.controlButton, index === 0 && styles.controlButtonDisabled]}
                  onPress={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  <Text style={styles.controlButtonText}>↑</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.controlButton,
                    index === displayOrder.length - 1 && styles.controlButtonDisabled,
                  ]}
                  onPress={() => handleMoveDown(index)}
                  disabled={index === displayOrder.length - 1}
                >
                  <Text style={styles.controlButtonText}>↓</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    marginTop: 32,
    fontStyle: 'italic',
  },
  orderItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  orderNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  playerHint: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  controls: {
    flexDirection: 'column',
    marginLeft: 8,
  },
  controlButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  controlButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.5,
  },
  controlButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
});
