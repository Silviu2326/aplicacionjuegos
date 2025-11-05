import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { useCadenaEmojisStore } from '../store/cadenaEmojisStore';

export const CadenaEmojisPanelJugador = () => {
  const currentPlayer = useCadenaEmojisStore((state) => state.getCurrentPlayer());
  const emojiChain = useCadenaEmojisStore((state) => state.getFullChain());
  const maxEmojis = useCadenaEmojisStore((state) => state.maxEmojis);
  const players = useCadenaEmojisStore((state) => state.players);
  const currentPlayerIndex = useCadenaEmojisStore((state) => state.currentPlayerIndex);
  const isMyTurn = true; // En producción, verificar si es el turno del jugador actual

  if (!currentPlayer) {
    return null;
  }

  const progress = emojiChain.length / maxEmojis;
  const remainingEmojis = maxEmojis - emojiChain.length;
  const nextPlayerIndex = (currentPlayerIndex + 1) % players.length;
  const nextPlayer = players[nextPlayerIndex];
  const playerTurnNumber = Math.floor(emojiChain.length / players.length) + 1;

  return (
    <View style={styles.container}>
      <View style={styles.playerInfo}>
        <View style={styles.playerHeader}>
          <View style={styles.playerNameContainer}>
            <Text style={styles.playerLabel}>Turno de:</Text>
            <Text style={styles.playerName}>{currentPlayer.name}</Text>
          </View>
          <View style={styles.turnBadge}>
            <Text style={styles.turnBadgeText}>Ronda {playerTurnNumber}</Text>
          </View>
        </View>
        {nextPlayer && (
          <Text style={styles.nextPlayerText}>
            Siguiente: {nextPlayer.name}
          </Text>
        )}
      </View>

      {isMyTurn && (
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionIcon}>💡</Text>
          <Text style={styles.instructionText}>
            {emojiChain.length === 0
              ? '¡Elige el primer emoji y comienza la historia!'
              : `Narra la historia completa desde el principio y luego añade tu emoji`}
          </Text>
        </View>
      )}

      <View style={styles.progressContainer}>
        <View style={styles.progressHeader}>
          <Text style={styles.progressText}>
            {emojiChain.length} / {maxEmojis} emojis
          </Text>
          {remainingEmojis > 0 && (
            <Text style={styles.remainingText}>
              {remainingEmojis} restante{remainingEmojis !== 1 ? 's' : ''}
            </Text>
          )}
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${Math.min(progress * 100, 100)}%` }]} />
        </View>
        <View style={styles.progressPercentage}>
          <Text style={styles.progressPercentageText}>
            {Math.round(progress * 100)}% completado
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerInfo: {
    marginBottom: 12,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  playerNameContainer: {
    flex: 1,
  },
  playerLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  playerName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2196F3',
  },
  turnBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  turnBadgeText: {
    fontSize: 11,
    color: '#1976D2',
    fontWeight: '600',
  },
  nextPlayerText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  instructionContainer: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  instructionIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  instructionText: {
    fontSize: 14,
    color: '#1976D2',
    flex: 1,
    lineHeight: 20,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 5,
    minWidth: 2,
  },
  progressPercentage: {
    alignItems: 'center',
  },
  progressPercentageText: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  remainingText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

