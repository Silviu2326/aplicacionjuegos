import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useCadaverExquisitoStore } from '../store/cadaverExquisitoStore';

export const CadaverExquisitoTurnIndicator = () => {
  const currentPlayer = useCadaverExquisitoStore((state) => state.getCurrentPlayer());
  const currentRound = useCadaverExquisitoStore((state) => state.currentRound);
  const players = useCadaverExquisitoStore((state) => state.players);
  const maxRounds = useCadaverExquisitoStore((state) => state.maxRounds);
  const phrases = useCadaverExquisitoStore((state) => state.phrases);
  
  const [pulseAnim] = useState(new Animated.Value(1));
  const [fadeAnim] = useState(new Animated.Value(0));
  
  useEffect(() => {
    // Animación de pulso
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
    
    // Animación de fade in
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [currentPlayer]);
  
  if (!currentPlayer) {
    return null;
  }
  
  const playerIndex = players.findIndex(p => p.id === currentPlayer.id);
  const phrasesInCurrentRound = phrases.filter(p => p.round === currentRound).length;
  const totalPhrases = phrases.length;
  
  const getProgressPercentage = () => {
    if (maxRounds) {
      return ((currentRound - 1) / maxRounds) * 100;
    }
    return 0;
  };
  
  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: pulseAnim }],
        }
      ]}
    >
      <View style={styles.header}>
        <Text style={styles.turnLabel}>🎯 Turno de</Text>
      </View>
      
      <View style={styles.playerCard}>
        <View style={styles.playerNumberBadge}>
          <Text style={styles.playerNumberText}>{playerIndex + 1}</Text>
        </View>
        <Text style={styles.playerName}>{currentPlayer.name}</Text>
        <View style={styles.playerIndicator}>
          <View style={styles.indicatorDot} />
          <Text style={styles.indicatorText}>Escribiendo...</Text>
        </View>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Ronda</Text>
          <Text style={styles.infoValue}>
            {currentRound}
            {maxRounds ? ` / ${maxRounds}` : ''}
          </Text>
        </View>
        
        <View style={styles.infoDivider} />
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Jugador</Text>
          <Text style={styles.infoValue}>
            {playerIndex + 1} / {players.length}
          </Text>
        </View>
        
        <View style={styles.infoDivider} />
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Frases</Text>
          <Text style={styles.infoValue}>{totalPhrases}</Text>
        </View>
      </View>
      
      {maxRounds && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${getProgressPercentage()}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {Math.round(getProgressPercentage())}% completado
          </Text>
        </View>
      )}
      
      <View style={styles.roundInfo}>
        <Text style={styles.roundInfoText}>
          {phrasesInCurrentRound === 0 
            ? 'Iniciando nueva ronda...'
            : `${phrasesInCurrentRound} frase${phrasesInCurrentRound !== 1 ? 's' : ''} en esta ronda`
          }
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E3F2FD',
  },
  header: {
    alignItems: 'center',
    marginBottom: 12,
  },
  turnLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  playerCard: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#BBDEFB',
  },
  playerNumberBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  playerNumberText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
    textAlign: 'center',
  },
  playerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  indicatorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
    marginRight: 6,
  },
  indicatorText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
    marginBottom: 12,
  },
  infoItem: {
    alignItems: 'center',
    flex: 1,
  },
  infoDivider: {
    width: 1,
    backgroundColor: '#E0E0E0',
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  roundInfo: {
    paddingTop: 8,
    alignItems: 'center',
  },
  roundInfoText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});
