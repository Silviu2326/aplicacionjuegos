import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ROLES } from '../store/feedTheKrakenStore';
import { ROLE_INFO } from '../constants/FeedTheKrakenGameData';

export const FeedTheKrakenPlayerList = ({ 
  players, 
  captainId, 
  lieutenantId, 
  navigatorId 
}) => {
  const getPlayerStatus = (player) => {
    const statuses = [];
    if (player.id === captainId) statuses.push('👑 Capitán');
    if (player.id === lieutenantId) statuses.push('⭐ Teniente');
    if (player.id === navigatorId) statuses.push('🧭 Navegante');
    if (player.inJail) statuses.push('🔒 Calabozo');
    if (player.eliminated) statuses.push('❌ Eliminado');
    if (player.hasGun) statuses.push('🔫 Pistola');
    return statuses;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tripulación</Text>
      <ScrollView style={styles.scrollView}>
        {players.map((player) => {
          const roleInfo = player.role ? ROLE_INFO[player.role] : null;
          const statuses = getPlayerStatus(player);
          
          return (
            <View 
              key={player.id} 
              style={[
                styles.playerCard,
                player.eliminated && styles.eliminatedCard,
                player.inJail && styles.jailCard,
              ]}
            >
              <View style={styles.playerHeader}>
                <Text style={styles.playerName}>{player.name}</Text>
                {roleInfo && (
                  <View style={[styles.roleBadge, { backgroundColor: roleInfo.color }]}>
                    <Text style={styles.roleIcon}>{roleInfo.icon}</Text>
                  </View>
                )}
              </View>
              
              {statuses.length > 0 && (
                <View style={styles.statusContainer}>
                  {statuses.map((status, index) => (
                    <Text key={index} style={styles.statusText}>
                      {status}
                    </Text>
                  ))}
                </View>
              )}

              {player.eliminated && (
                <Text style={styles.eliminatedText}>Eliminado</Text>
              )}
              {player.inJail && (
                <Text style={styles.jailText}>En el Calabozo</Text>
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
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    maxHeight: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  scrollView: {
    maxHeight: 350,
  },
  playerCard: {
    backgroundColor: '#0f1626',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  eliminatedCard: {
    opacity: 0.5,
    borderColor: '#666',
  },
  jailCard: {
    borderColor: '#f5a623',
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  roleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roleIcon: {
    fontSize: 24,
  },
  statusContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  statusText: {
    fontSize: 12,
    color: '#ccc',
    marginRight: 10,
    marginBottom: 5,
  },
  eliminatedText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: 'bold',
    marginTop: 5,
  },
  jailText: {
    fontSize: 14,
    color: '#f5a623',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

