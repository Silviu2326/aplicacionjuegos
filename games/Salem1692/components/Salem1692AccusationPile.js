import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Salem1692Card } from './Salem1692Card';

export const Salem1692AccusationPile = ({ 
  accusations, 
  playerName,
}) => {
  if (!accusations || accusations.length === 0) {
    return null;
  }
  
  const count = accusations.length;
  const isTrialThreshold = count >= 7;
  
  return (
    <View style={styles.container}>
      <Text style={styles.playerName}>{playerName}</Text>
      <View style={styles.pileContainer}>
        <View style={styles.countBadge}>
          <Text style={styles.countText}>{count}</Text>
        </View>
        {accusations.length > 0 && (
          <View style={styles.cardStack}>
            <Salem1692Card
              card={accusations[0]}
              size="small"
              isPlayable={false}
            />
            {count > 1 && (
              <View style={styles.overlayCard}>
                <Text style={styles.overlayText}>+{count - 1}</Text>
              </View>
            )}
          </View>
        )}
      </View>
      {isTrialThreshold && (
        <View style={styles.trialBadge}>
          <Text style={styles.trialText}>¡JUICIO ACTIVO!</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  pileContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  countBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#f44336',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    borderWidth: 2,
    borderColor: '#fff',
  },
  countText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardStack: {
    position: 'relative',
  },
  overlayCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  overlayText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  trialBadge: {
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#d32f2f',
    borderRadius: 8,
  },
  trialText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

