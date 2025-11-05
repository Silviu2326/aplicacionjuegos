import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useHombreLoboCastronegroStore } from '../store/hombreLoboCastronegroStore';
import { HombreLoboCastronegroPlayerGrid } from '../components/HombreLoboCastronegroPlayerGrid';
import { ROLES } from '../constants/hombreLoboCastronegroRoles';

export const HombreLoboCastronegroFinPartida = ({ navigation, route }) => {
  const winner = useHombreLoboCastronegroStore((state) => state.winner);
  const players = useHombreLoboCastronegroStore((state) => state.players);
  const assignedRoles = useHombreLoboCastronegroStore((state) => state.assignedRoles);
  const gameStats = useHombreLoboCastronegroStore((state) => state.gameStats);
  const dayNumber = useHombreLoboCastronegroStore((state) => state.dayNumber);
  const resetGame = useHombreLoboCastronegroStore((state) => state.resetGame);
  
  const getWinnerText = () => {
    if (winner === 'villagers') {
      return '¡Los Aldeanos han ganado!';
    } else if (winner === 'wolves') {
      return '¡Los Hombres Lobo han ganado!';
    }
    return 'Juego finalizado';
  };
  
  const getWinnerColor = () => {
    if (winner === 'villagers') {
      return '#4caf50';
    } else if (winner === 'wolves') {
      return '#f44336';
    }
    return '#666';
  };
  
  const handleNewGame = () => {
    resetGame();
    navigation?.navigate('index');
  };
  
  const handleBackToMenu = () => {
    resetGame();
    navigation?.navigate('index');
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Fin de la Partida</Text>
        
        <View style={[styles.winnerBanner, { backgroundColor: getWinnerColor() }]}>
          <Text style={styles.winnerText}>{getWinnerText()}</Text>
        </View>
        
        <View style={styles.statsSection}>
          <Text style={styles.statsTitle}>📊 Estadísticas de la Partida</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>Días Transcurridos</Text>
              <Text style={styles.statCardValue}>{dayNumber}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>Noches</Text>
              <Text style={styles.statCardValue}>{gameStats.totalNights}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>Muertes Totales</Text>
              <Text style={styles.statCardValue}>{gameStats.totalDeaths}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>Linchamientos</Text>
              <Text style={styles.statCardValue}>{gameStats.totalLynches}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>Muertes Nocturnas</Text>
              <Text style={styles.statCardValue}>{gameStats.totalNightDeaths}</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statCardLabel}>Roles Revelados</Text>
              <Text style={styles.statCardValue}>{gameStats.rolesRevealed.length}</Text>
            </View>
          </View>
        </View>
        
        <View style={styles.rolesSection}>
          <Text style={styles.rolesTitle}>🎭 Roles de los Jugadores</Text>
          {players.map((player) => {
            const roleId = assignedRoles[player.id];
            // Convertir ID a clave del objeto ROLES (ej: 'hombre_lobo' -> 'HOMBRE_LOBO')
            const roleKey = roleId ? roleId.toUpperCase().replace(/-/g, '_') : null;
            const role = roleKey ? ROLES[roleKey] : null;
            const alignmentColor = role?.alignment === 'good' ? '#4caf50' : 
                                  role?.alignment === 'evil' ? '#f44336' : '#FFA500';
            const isAlive = player.isAlive && !player.isDead;
            
            return (
              <View key={player.id} style={[styles.roleCard, !isAlive && styles.roleCardDead]}>
                <View style={styles.roleCardHeader}>
                  <View style={[styles.playerAvatar, { backgroundColor: player.color }, !isAlive && styles.avatarDead]}>
                    <Text style={styles.playerInitial}>
                      {player.name?.charAt(0).toUpperCase() || '?'}
                    </Text>
                    {!isAlive && <Text style={styles.deadIcon}>💀</Text>}
                  </View>
                  <View style={styles.roleCardInfo}>
                    <Text style={[styles.playerName, !isAlive && styles.deadName]}>
                      {player.name} {role?.icon || ''}
                    </Text>
                    <Text style={[styles.roleName, { color: alignmentColor }]}>
                      {role?.name || 'Desconocido'}
                    </Text>
                    <Text style={styles.statusText}>
                      {isAlive ? '✅ Vivo' : '💀 Muerto'}
                    </Text>
                  </View>
                  <View style={[styles.alignmentBadge, { backgroundColor: alignmentColor }]}>
                    <Text style={styles.alignmentText}>
                      {role?.alignment === 'good' ? 'Bueno' : 
                       role?.alignment === 'evil' ? 'Malvado' : 'Neutral'}
                    </Text>
                  </View>
                </View>
                <Text style={styles.roleDescription}>{role?.description || ''}</Text>
              </View>
            );
          })}
        </View>
        
        <View style={styles.playersSection}>
          <Text style={styles.playersTitle}>Jugadores</Text>
          <HombreLoboCastronegroPlayerGrid
            players={players}
            currentPlayerId={null}
          />
        </View>
        
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
            <Text style={styles.buttonText}>Nueva Partida</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuButton} onPress={handleBackToMenu}>
            <Text style={styles.buttonText}>Volver al Menú</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  winnerBanner: {
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  winnerText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
  statsSection: {
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  statCardLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 5,
    textAlign: 'center',
  },
  statCardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  rolesSection: {
    marginBottom: 30,
  },
  rolesTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  roleCard: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  roleCardDead: {
    opacity: 0.7,
    borderLeftWidth: 4,
    borderLeftColor: '#666',
  },
  avatarDead: {
    opacity: 0.5,
  },
  deadIcon: {
    position: 'absolute',
    fontSize: 20,
  },
  statusText: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 3,
  },
  deadName: {
    textDecorationLine: 'line-through',
  },
  roleCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  playerInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  roleCardInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  roleName: {
    fontSize: 16,
    fontWeight: '600',
  },
  alignmentBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  alignmentText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  roleDescription: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  playersSection: {
    marginBottom: 30,
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  buttonContainer: {
    marginTop: 20,
  },
  newGameButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  menuButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

