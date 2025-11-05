import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HombreLoboCastronegroPlayerAvatar } from './HombreLoboCastronegroPlayerAvatar';

export const HombreLoboCastronegroPlayerGrid = ({ players, onPlayerPress, currentPlayerId, gamePhase, votes = {} }) => {
  const getPlayerStatus = (player) => {
    if (player.isDead || !player.isAlive) return 'dead';
    if (gamePhase === 'voting' && votes[currentPlayerId] === player.id) return 'selected';
    return 'alive';
  };

  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {players.map((player) => {
          const status = getPlayerStatus(player);
          const isCurrentPlayer = player.id === currentPlayerId;
          const voteCount = gamePhase === 'voting' 
            ? Object.values(votes).filter((targetId) => targetId === player.id).length 
            : 0;
          
          return (
            <TouchableOpacity
              key={player.id}
              style={styles.playerItem}
              onPress={() => onPlayerPress && onPlayerPress(player)}
              disabled={!onPlayerPress || player.isDead}
            >
              <HombreLoboCastronegroPlayerAvatar
                player={player}
                status={status}
                isCurrentPlayer={isCurrentPlayer}
                voteCount={voteCount}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerItem: {
    margin: 8,
  },
});

