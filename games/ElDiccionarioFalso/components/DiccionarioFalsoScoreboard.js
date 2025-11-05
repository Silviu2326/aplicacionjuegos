import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoScoreboard = () => {
  const players = useDiccionarioFalsoStore((state) => state.players);
  const currentPlayerId = useDiccionarioFalsoStore((state) => state.currentPlayerId);
  
  // Ordenar jugadores por puntuación (mayor a menor)
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  const getRankEmoji = (index) => {
    if (index === 0) return '🥇';
    if (index === 1) return '🥈';
    if (index === 2) return '🥉';
    return `${index + 1}.`;
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Clasificación</Text>
      </View>
      
      {sortedPlayers.length === 0 ? (
        <Text style={styles.emptyText}>No hay jugadores</Text>
      ) : (
        sortedPlayers.map((player, index) => {
          const isCurrentPlayer = player.id === currentPlayerId;
          const isFirst = index === 0;
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerRow,
                isCurrentPlayer && styles.playerRowCurrent,
                isFirst && styles.playerRowWinner,
              ]}
            >
              <View style={styles.rankContainer}>
                <Text style={styles.rankText}>{getRankEmoji(index)}</Text>
              </View>
              <View style={styles.playerInfo}>
                <View style={styles.playerNameContainer}>
                  <Text style={styles.playerName}>
                    {player.name}
                    {player.isHost && ' 👑'}
                    {isCurrentPlayer && ' (Tú)'}
                  </Text>
                  {isFirst && (
                    <Text style={styles.winnerLabel}>🏆 Maestro del Engaño</Text>
                  )}
                </View>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[styles.scoreText, isFirst && styles.scoreTextWinner]}>
                  {player.score}
                </Text>
                <Text style={styles.scoreLabel}>
                  {player.score === 1 ? 'punto' : 'puntos'}
                </Text>
              </View>
            </View>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  playerRowCurrent: {
    borderColor: '#2196f3',
    backgroundColor: '#e3f2fd',
  },
  playerRowWinner: {
    borderColor: '#ffd700',
    backgroundColor: '#fff9c4',
    borderWidth: 3,
  },
  rankContainer: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rankText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerNameContainer: {
    flexDirection: 'column',
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  winnerLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff9800',
    marginTop: 4,
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreTextWinner: {
    color: '#ff9800',
    fontSize: 28,
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
});
