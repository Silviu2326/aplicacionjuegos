import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoPlayerList = ({ currentPlayerId, showSubmissionStatus = false }) => {
  const players = useDiccionarioFalsoStore((state) => state.players);
  const hasPlayerSubmitted = useDiccionarioFalsoStore((state) => state.hasPlayerSubmitted);
  const hasPlayerVoted = useDiccionarioFalsoStore((state) => state.hasPlayerVoted);
  const gameStatus = useDiccionarioFalsoStore((state) => state.gameStatus);
  
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Jugadores</Text>
      {players.map((player) => {
        const isCurrentPlayer = player.id === currentPlayerId;
        const hasSubmitted = showSubmissionStatus && gameStatus === 'writing' ? hasPlayerSubmitted(player.id) : null;
        const hasVoted = showSubmissionStatus && gameStatus === 'voting' ? hasPlayerVoted(player.id) : null;
        
        return (
          <View
            key={player.id}
            style={[
              styles.playerCard,
              isCurrentPlayer && styles.playerCardCurrent,
            ]}
          >
            <View style={styles.playerInfo}>
              <Text style={styles.playerName}>
                {player.name}
                {player.isHost && ' 👑'}
                {isCurrentPlayer && ' (Tú)'}
              </Text>
              <Text style={styles.playerScore}>
                {player.score} {player.score === 1 ? 'punto' : 'puntos'}
              </Text>
            </View>
            {showSubmissionStatus && (
              <View style={styles.statusContainer}>
                {gameStatus === 'writing' && (
                  <Text style={[styles.statusText, hasSubmitted && styles.statusTextDone]}>
                    {hasSubmitted ? '✓ Enviado' : 'Escribiendo...'}
                  </Text>
                )}
                {gameStatus === 'voting' && (
                  <Text style={[styles.statusText, hasVoted && styles.statusTextDone]}>
                    {hasVoted ? '✓ Votó' : 'Votando...'}
                  </Text>
                )}
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
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  playerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerCardCurrent: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  playerScore: {
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    marginLeft: 8,
  },
  statusText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  statusTextDone: {
    color: '#4caf50',
    fontWeight: '600',
  },
});
