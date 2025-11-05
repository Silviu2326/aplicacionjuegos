import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';

export const DetectiveObjetosPlayerList = () => {
  const players = useDetectiveObjetosStore((state) => state.players);
  const currentPhotographerIndex = useDetectiveObjetosStore((state) => state.currentPhotographerIndex);
  const currentDetectiveIndex = useDetectiveObjetosStore((state) => state.currentDetectiveIndex);
  const gameStatus = useDetectiveObjetosStore((state) => state.gameStatus);
  const getCurrentPhotographer = useDetectiveObjetosStore((state) => state.getCurrentPhotographer);
  const getCurrentDetective = useDetectiveObjetosStore((state) => state.getCurrentDetective);
  const getPlayerStats = useDetectiveObjetosStore((state) => state.getPlayerStats);
  
  const photographer = getCurrentPhotographer();
  const currentDetective = gameStatus === 'playing' ? getCurrentDetective() : null;
  
  // Ordenar jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>👥 Jugadores</Text>
        {sortedPlayers.length > 0 && (
          <Text style={styles.subtitle}>
            {sortedPlayers.length} jugador{sortedPlayers.length !== 1 ? 'es' : ''} • Total: {sortedPlayers.reduce((sum, p) => sum + p.score, 0)} pts
          </Text>
        )}
      </View>
      
      {sortedPlayers.map((player, sortedIndex) => {
        const originalIndex = players.findIndex(p => p.id === player.id);
        const isPhotographer = originalIndex === currentPhotographerIndex;
        const isCurrentDetective = currentDetective && player.id === currentDetective.id;
        const isActive = isPhotographer || isCurrentDetective;
        const playerStats = getPlayerStats(player.id);
        const isTopPlayer = sortedIndex === 0 && player.score > 0;
        
        return (
          <View
            key={player.id}
            style={[
              styles.playerCard,
              isActive && styles.playerCardActive,
              isPhotographer && styles.playerCardPhotographer,
              isTopPlayer && styles.playerCardTop,
            ]}
          >
            <View style={styles.playerMainInfo}>
              <View style={styles.playerRank}>
                {isTopPlayer && <Text style={styles.rankIcon}>🏆</Text>}
                <Text style={styles.rankNumber}>{sortedIndex + 1}</Text>
              </View>
              <View style={styles.playerInfo}>
                <Text
                  style={[
                    styles.playerName,
                    isActive && styles.playerNameActive,
                  ]}
                >
                  {player.name}
                  {isPhotographer && ' 📷'}
                  {isCurrentDetective && ' 🔍'}
                </Text>
                <View style={styles.playerRoles}>
                  {isPhotographer && (
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleText}>📷 Fotógrafo</Text>
                    </View>
                  )}
                  {isCurrentDetective && !isPhotographer && (
                    <View style={styles.roleBadge}>
                      <Text style={styles.roleText}>🔍 En turno</Text>
                    </View>
                  )}
                </View>
                {playerStats?.stats && gameStatus !== 'setup' && (
                  <View style={styles.playerMiniStats}>
                    <Text style={styles.miniStat}>
                      ✅ {playerStats.stats.correctGuesses || 0}
                    </Text>
                    <Text style={styles.miniStat}>
                      🏆 {playerStats.stats.roundsWon || 0}
                    </Text>
                  </View>
                )}
              </View>
              <View style={styles.scoreContainer}>
                <Text style={[styles.score, isActive && styles.scoreActive]}>
                  {player.score}
                </Text>
                <Text style={styles.scoreLabel}>pts</Text>
              </View>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
  },
  playerCard: {
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerCardTop: {
    borderColor: '#ffd700',
    backgroundColor: '#fffef0',
  },
  playerCardActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  playerCardPhotographer: {
    backgroundColor: '#fff3e0',
    borderColor: '#ff9800',
  },
  playerMainInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  playerRank: {
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 30,
  },
  rankIcon: {
    fontSize: 16,
    marginRight: 4,
  },
  rankNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#999',
    minWidth: 20,
  },
  playerInfo: {
    flex: 1,
  },
  playerRoles: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 5,
    marginTop: 4,
  },
  roleBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  roleText: {
    fontSize: 11,
    color: '#1976d2',
    fontWeight: '600',
  },
  playerMiniStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 6,
  },
  miniStat: {
    fontSize: 11,
    color: '#666',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  playerNameActive: {
    color: '#1976d2',
    fontWeight: 'bold',
  },
  playerRole: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  score: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 4,
  },
  scoreActive: {
    color: '#1976d2',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#999',
  },
});

