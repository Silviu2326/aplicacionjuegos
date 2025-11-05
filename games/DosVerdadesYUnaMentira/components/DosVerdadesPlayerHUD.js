import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const DosVerdadesPlayerHUD = ({ players, narratorId }) => {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Jugadores</Text>
      <ScrollView style={styles.list}>
        {sortedPlayers.map((player, index) => {
          const isNarrator = player.id === narratorId;
          
          return (
            <View
              key={player.id}
              style={[
                styles.playerItem,
                isNarrator && styles.playerItemNarrator,
                index === 0 && styles.playerItemFirst,
              ]}
            >
              <View style={styles.playerInfo}>
                <Text style={styles.playerName}>
                  {isNarrator && '🎤 '}
                  {player.name}
                  {index === 0 && ' 🏆'}
                </Text>
                <Text style={styles.playerScore}>{player.score} pts</Text>
              </View>
              {isNarrator && (
                <Text style={styles.narratorBadge}>Narrador</Text>
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    maxHeight: 200,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  list: {
    flex: 1,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerItemNarrator: {
    backgroundColor: '#fff9e6',
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  playerItemFirst: {
    borderColor: '#ffd700',
    borderWidth: 2,
  },
  playerInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    flex: 1,
  },
  playerScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
    marginLeft: 10,
  },
  narratorBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ff8c00',
    backgroundColor: '#fff3cd',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 10,
  },
});

