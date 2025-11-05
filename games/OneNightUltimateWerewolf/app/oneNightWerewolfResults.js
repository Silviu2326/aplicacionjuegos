import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';
import { OneNightWerewolfRoleCard } from '../components/OneNightWerewolfRoleCard';
import { OneNightWerewolfPlayerGrid } from '../components/OneNightWerewolfPlayerGrid';
import { ROLE_INFO } from '../constants/OneNightWerewolfRoles';

export const OneNightWerewolfResults = ({ navigation }) => {
  const players = useOneNightWerewolfStore((state) => state.players);
  const centerCards = useOneNightWerewolfStore((state) => state.centerCards);
  const eliminatedPlayer = useOneNightWerewolfStore((state) => state.eliminatedPlayer);
  const winningTeam = useOneNightWerewolfStore((state) => state.winningTeam);
  const votes = useOneNightWerewolfStore((state) => state.votes);
  const showCenterCardsInResults = useOneNightWerewolfStore((state) => state.showCenterCardsInResults);
  const resetGame = useOneNightWerewolfStore((state) => state.resetGame);
  
  const eliminated = players.find(p => p.id === eliminatedPlayer);
  
  const getWinningTeamText = () => {
    switch (winningTeam) {
      case 'village':
        return '¡La Aldea Gana!';
      case 'werewolf':
        return '¡Los Hombres Lobo Ganan!';
      case 'tanner':
        return '¡El Curtidor Gana!';
      default:
        return 'Empate';
    }
  };
  
  const getWinningTeamColor = () => {
    switch (winningTeam) {
      case 'village':
        return '#4CAF50';
      case 'werewolf':
        return '#8B0000';
      case 'tanner':
        return '#FF9800';
      default:
        return '#757575';
    }
  };
  
  const handleNewGame = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };
  
  const getVoteCountForPlayer = (playerId) => {
    return Object.values(votes).filter(votedForId => votedForId === playerId).length;
  };

  const getRoleChangeCount = () => {
    return players.filter(p => p.initialRole !== p.currentRole).length;
  };

  const getTeamDistribution = () => {
    const teams = { werewolf: 0, village: 0, tanner: 0 };
    players.forEach(player => {
      const roleInfo = ROLE_INFO[player.currentRole];
      if (roleInfo && teams[roleInfo.team] !== undefined) {
        teams[roleInfo.team]++;
      }
    });
    return teams;
  };

  const teamDistribution = getTeamDistribution();
  const roleChanges = getRoleChangeCount();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.resultBanner, { backgroundColor: getWinningTeamColor() }]}>
          <Text style={styles.resultIcon}>
            {winningTeam === 'village' ? '🏆' : winningTeam === 'werewolf' ? '🐺' : '🎭'}
          </Text>
          <Text style={styles.resultTitle}>{getWinningTeamText()}</Text>
          <Text style={styles.resultSubtitle}>
            {winningTeam === 'village' 
              ? 'La aldea ha encontrado y eliminado a un Hombre Lobo'
              : winningTeam === 'werewolf'
              ? 'Los Hombres Lobo han sobrevivido'
              : 'El Curtidor ha logrado su objetivo'}
          </Text>
        </View>
        
        {eliminated && (
          <View style={styles.eliminatedContainer}>
            <Text style={styles.eliminatedLabel}>Jugador Eliminado</Text>
            <Text style={styles.eliminatedName}>{eliminated.name}</Text>
            <View style={styles.eliminatedRoleCard}>
              <OneNightWerewolfRoleCard role={eliminated.currentRole} />
            </View>
            <View style={styles.voteInfo}>
              <Text style={styles.voteInfoText}>
                Recibió {getVoteCountForPlayer(eliminated.id)} voto{getVoteCountForPlayer(eliminated.id) > 1 ? 's' : ''}
              </Text>
            </View>
          </View>
        )}

        {!eliminated && (
          <View style={styles.tieContainer}>
            <Text style={styles.tieIcon}>⚖️</Text>
            <Text style={styles.tieText}>Empate en la votación</Text>
            <Text style={styles.tieSubtext}>Ningún jugador fue eliminado</Text>
          </View>
        )}
        
        <View style={styles.statsContainer}>
          <Text style={styles.statsTitle}>Estadísticas de la Partida</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{players.length}</Text>
              <Text style={styles.statLabel}>Jugadores</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{roleChanges}</Text>
              <Text style={styles.statLabel}>Cambios de Rol</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{Object.keys(votes).length}</Text>
              <Text style={styles.statLabel}>Votos Emitidos</Text>
            </View>
          </View>
          <View style={styles.teamDistribution}>
            <Text style={styles.distributionTitle}>Distribución Final de Equipos</Text>
            <View style={styles.distributionRow}>
              <View style={[styles.distributionItem, { backgroundColor: '#8B0000' }]}>
                <Text style={styles.distributionNumber}>{teamDistribution.werewolf}</Text>
                <Text style={styles.distributionLabel}>Lobos</Text>
              </View>
              <View style={[styles.distributionItem, { backgroundColor: '#4CAF50' }]}>
                <Text style={styles.distributionNumber}>{teamDistribution.village}</Text>
                <Text style={styles.distributionLabel}>Aldea</Text>
              </View>
              <View style={[styles.distributionItem, { backgroundColor: '#FF9800' }]}>
                <Text style={styles.distributionNumber}>{teamDistribution.tanner}</Text>
                <Text style={styles.distributionLabel}>Curtidor</Text>
              </View>
            </View>
          </View>
        </View>
        
        <View style={styles.playersSection}>
          <Text style={styles.sectionTitle}>Roles de Todos los Jugadores</Text>
          <Text style={styles.sectionSubtitle}>
            Compara el rol inicial con el rol final de cada jugador
          </Text>
          {players.map((player) => {
            const changed = player.initialRole !== player.currentRole;
            const voteCount = getVoteCountForPlayer(player.id);
            const wasEliminated = eliminated && eliminated.id === player.id;
            
            return (
              <View 
                key={player.id} 
                style={[
                  styles.playerResultContainer,
                  wasEliminated && styles.playerResultContainerEliminated,
                ]}
              >
                <View style={styles.playerResultHeader}>
                  <Text style={styles.playerResultName}>{player.name}</Text>
                  {wasEliminated && (
                    <View style={styles.eliminatedBadge}>
                      <Text style={styles.eliminatedBadgeText}>ELIMINADO</Text>
                    </View>
                  )}
                  {voteCount > 0 && !wasEliminated && (
                    <View style={styles.voteBadge}>
                      <Text style={styles.voteBadgeText}>{voteCount} voto{voteCount > 1 ? 's' : ''}</Text>
                    </View>
                  )}
                </View>
                <View style={styles.roleComparison}>
                  <View style={styles.roleBox}>
                    <Text style={styles.roleLabel}>Rol Inicial</Text>
                    <OneNightWerewolfRoleCard role={player.initialRole} showDescription={false} />
                  </View>
                  {changed && <Text style={styles.arrow}>→</Text>}
                  {!changed && <Text style={styles.arrow}>=</Text>}
                  <View style={styles.roleBox}>
                    <Text style={styles.roleLabel}>Rol Final</Text>
                    <OneNightWerewolfRoleCard role={player.currentRole} showDescription={false} />
                    {changed && (
                      <View style={styles.changedBadge}>
                        <Text style={styles.changedBadgeText}>Cambiado</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            );
          })}
        </View>
        
        {showCenterCardsInResults && (
          <View style={styles.centerCardsSection}>
            <Text style={styles.sectionTitle}>Cartas del Centro</Text>
            <Text style={styles.sectionSubtitle}>
              Estas cartas estuvieron en el centro durante toda la partida
            </Text>
            <View style={styles.centerCardsContainer}>
              {centerCards.map((card, index) => (
                <View key={index} style={styles.centerCardWrapper}>
                  <Text style={styles.centerCardLabel}>Carta {index + 1}</Text>
                  <OneNightWerewolfRoleCard role={card} showDescription={false} />
                </View>
              ))}
            </View>
          </View>
        )}
        
        <TouchableOpacity style={styles.newGameButton} onPress={handleNewGame}>
          <Text style={styles.newGameButtonText}>Nueva Partida</Text>
          <Text style={styles.newGameButtonSubtext}>
            Volver a la pantalla principal
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  resultBanner: {
    padding: 24,
    borderRadius: 12,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  resultIcon: {
    fontSize: 48,
    marginBottom: 8,
  },
  resultTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  resultSubtitle: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.95,
    lineHeight: 20,
  },
  eliminatedContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#F44336',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eliminatedLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  eliminatedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F44336',
    marginBottom: 16,
  },
  eliminatedRoleCard: {
    marginBottom: 12,
  },
  voteInfo: {
    marginTop: 8,
    padding: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  voteInfoText: {
    fontSize: 13,
    color: '#666',
    fontWeight: '600',
  },
  tieContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FF9800',
  },
  tieIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  tieText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  tieSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  teamDistribution: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  distributionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  distributionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  distributionItem: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  distributionNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  distributionLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  playersSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  playerResultContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playerResultContainerEliminated: {
    borderWidth: 2,
    borderColor: '#F44336',
    backgroundColor: '#fff5f5',
  },
  playerResultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    flexWrap: 'wrap',
  },
  playerResultName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    marginRight: 8,
  },
  eliminatedBadge: {
    backgroundColor: '#F44336',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  eliminatedBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  voteBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginLeft: 8,
  },
  voteBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  roleComparison: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  roleBox: {
    flex: 1,
    alignItems: 'center',
  },
  roleLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#666',
    marginHorizontal: 8,
    fontWeight: 'bold',
  },
  changedBadge: {
    marginTop: 8,
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'center',
  },
  changedBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  centerCardsSection: {
    marginBottom: 24,
  },
  centerCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  centerCardWrapper: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  centerCardLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  newGameButton: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  newGameButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  newGameButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
});

