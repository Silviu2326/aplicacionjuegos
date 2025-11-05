import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useBloodOnTheClocktowerStore } from '../store/bloodOnTheClocktowerStore';
import { BloodOnTheClocktowerPlayerGrid } from '../components/BloodOnTheClocktowerPlayerGrid';
import { BloodOnTheClocktowerRoleInfoModal } from '../components/BloodOnTheClocktowerRoleInfoModal';
import { BloodOnTheClocktowerVoteTracker } from '../components/BloodOnTheClocktowerVoteTracker';

export const BloodOnTheClocktowerGame = ({ navigation, route }) => {
  const playerId = route?.params?.playerId;
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  
  const players = useBloodOnTheClocktowerStore((state) => state.players);
  const gameStatus = useBloodOnTheClocktowerStore((state) => state.gameStatus);
  const phase = useBloodOnTheClocktowerStore((state) => state.phase);
  const dayNumber = useBloodOnTheClocktowerStore((state) => state.dayNumber);
  const currentNomination = useBloodOnTheClocktowerStore((state) => state.currentNomination);
  const nominations = useBloodOnTheClocktowerStore((state) => state.nominations);
  const votes = useBloodOnTheClocktowerStore((state) => state.votes);
  const gameLog = useBloodOnTheClocktowerStore((state) => state.gameLog);
  const executedPlayer = useBloodOnTheClocktowerStore((state) => state.executedPlayer);
  
  const getPlayerRole = useBloodOnTheClocktowerStore((state) => state.getPlayerRole);
  const nominatePlayer = useBloodOnTheClocktowerStore((state) => state.nominatePlayer);
  const startVoting = useBloodOnTheClocktowerStore((state) => state.startVoting);
  const castVote = useBloodOnTheClocktowerStore((state) => state.castVote);
  const finishVoting = useBloodOnTheClocktowerStore((state) => state.finishVoting);
  const executePlayer = useBloodOnTheClocktowerStore((state) => state.executePlayer);
  
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const playerRole = currentPlayer ? getPlayerRole(currentPlayer.id) : null;
  const alivePlayers = players.filter(p => p.isAlive);
  const deadPlayers = players.filter(p => !p.isAlive);
  const requiredVotes = Math.ceil(alivePlayers.length / 2);
  
  // Estadísticas del juego
  const totalNominations = nominations.length;
  const totalExecutions = deadPlayers.filter(p => p.isDead).length;
  const playersWithVotes = Object.keys(votes).length;
  
  const canNominate = currentPlayer && currentPlayer.isAlive && gameStatus === 'day' && !currentNomination;
  const canVote = gameStatus === 'voting' || gameStatus === 'execution';
  const hasVoted = currentPlayer && votes[currentPlayer.id];
  
  const handlePlayerPress = (player) => {
    if (canNominate && player.id !== currentPlayer.id) {
      Alert.alert(
        'Nominar Jugador',
        `¿Quieres nominar a ${player.name} para ejecución?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Nominar',
            onPress: () => {
              const success = nominatePlayer(currentPlayer.id, player.id);
              if (!success) {
                Alert.alert('Error', 'No se pudo realizar la nominación');
              }
            },
          },
        ]
      );
    } else if (canVote && !hasVoted && player.id !== currentPlayer.id) {
      Alert.alert(
        'Votar',
        `¿Quieres votar por ${player.name}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Votar',
            onPress: () => {
              const nomineeId = gameStatus === 'execution' ? currentNomination?.nomineeId : player.id;
              const success = castVote(currentPlayer.id, nomineeId);
              if (!success) {
                Alert.alert('Error', 'No se pudo registrar el voto');
              }
            },
          },
        ]
      );
    }
  };
  
  const handleStartVoting = () => {
    if (currentNomination) {
      startVoting();
    }
  };
  
  const handleFinishVoting = () => {
    finishVoting();
  };
  
  const handleExecute = () => {
    if (currentNomination && gameStatus === 'execution') {
      Alert.alert(
        'Ejecutar',
        `¿Ejecutar a ${players.find(p => p.id === currentNomination.nomineeId)?.name}?`,
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Ejecutar',
            style: 'destructive',
            onPress: () => {
              executePlayer(currentNomination.nomineeId);
            },
          },
        ]
      );
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Blood on the Clocktower</Text>
        <View style={styles.phaseInfo}>
          <Text style={styles.phaseText}>
            {phase === 'day' ? `☀️ Día ${dayNumber}` : phase === 'night' ? '🌙 Noche' : '🎮 Fase de Juego'}
          </Text>
          <View style={styles.phaseStats}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Vivos:</Text>
              <Text style={styles.statValue}>{alivePlayers.length}</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Muertos:</Text>
              <Text style={[styles.statValue, styles.deadStat]}>{deadPlayers.length}</Text>
            </View>
          </View>
        </View>
      </View>
      
      {executedPlayer && (
        <View style={styles.deathAnnouncement}>
          <Text style={styles.deathText}>
            {players.find(p => p.id === executedPlayer)?.name} ha sido ejecutado.
          </Text>
        </View>
      )}
      
      {currentNomination && (
        <View style={styles.nominationBanner}>
          <Text style={styles.nominationText}>
            {players.find(p => p.id === currentNomination.nominatorId)?.name} ha nominado a{' '}
            {players.find(p => p.id === currentNomination.nomineeId)?.name}
          </Text>
        </View>
      )}
      
      {gameStatus === 'voting' || gameStatus === 'execution' ? (
        <BloodOnTheClocktowerVoteTracker
          votes={votes}
          players={players}
          nomineeId={currentNomination?.nomineeId}
          requiredVotes={requiredVotes}
        />
      ) : (
        <>
          <View style={styles.playersSection}>
            <BloodOnTheClocktowerPlayerGrid
              players={players}
              onPlayerPress={handlePlayerPress}
              currentPlayerId={currentPlayer?.id}
            />
          </View>
          
          <View style={styles.gameStatsSection}>
            <Text style={styles.gameStatsTitle}>📊 Estadísticas de la Partida</Text>
            <View style={styles.gameStatsGrid}>
              <View style={styles.gameStatCard}>
                <Text style={styles.gameStatNumber}>{totalNominations}</Text>
                <Text style={styles.gameStatLabel}>Nominaciones</Text>
              </View>
              <View style={styles.gameStatCard}>
                <Text style={styles.gameStatNumber}>{totalExecutions}</Text>
                <Text style={styles.gameStatLabel}>Ejecuciones</Text>
              </View>
              <View style={styles.gameStatCard}>
                <Text style={styles.gameStatNumber}>{playersWithVotes}</Text>
                <Text style={styles.gameStatLabel}>Han Votado</Text>
              </View>
              <View style={styles.gameStatCard}>
                <Text style={styles.gameStatNumber}>{alivePlayers.length}/{players.length}</Text>
                <Text style={styles.gameStatLabel}>Vivos</Text>
              </View>
            </View>
          </View>

          <ScrollView style={styles.gameLogSection}>
            <View style={styles.gameLogHeader}>
              <Text style={styles.gameLogTitle}>📜 Registro del Juego</Text>
              <Text style={styles.gameLogCount}>
                {gameLog.length} eventos
              </Text>
            </View>
            {gameLog.length > 0 ? (
              gameLog.slice(-15).reverse().map((entry, index) => {
                const getEntryIcon = (type) => {
                  switch(type) {
                    case 'death': return '💀';
                    case 'nomination': return '🎯';
                    case 'execution': return '⚔️';
                    case 'on-block': return '⛓️';
                    default: return '📝';
                  }
                };
                return (
                  <View key={index} style={styles.logEntry}>
                    <Text style={styles.logIcon}>{getEntryIcon(entry.type)}</Text>
                    <View style={styles.logContent}>
                      <Text style={styles.logText}>{entry.message}</Text>
                      <Text style={styles.logTime}>
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </Text>
                    </View>
                  </View>
                );
              })
            ) : (
              <View style={styles.emptyLog}>
                <Text style={styles.emptyLogText}>
                  Aún no hay eventos registrados
                </Text>
              </View>
            )}
          </ScrollView>
          
          <View style={styles.actionsSection}>
            {canNominate && (
              <View style={styles.actionInfoCard}>
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => {
                    Alert.alert(
                      'Información de Nominación',
                      'Toca a un jugador para nominarlo. Solo los jugadores vivos pueden nominar. Se necesita mayoría de votos para ejecutar.',
                      [{ text: 'OK' }]
                    );
                  }}
                >
                  <Text style={styles.actionButtonText}>🎯 Nominar Jugador</Text>
                </TouchableOpacity>
                <Text style={styles.actionHint}>
                  Se necesitan {requiredVotes} votos para ejecutar a un jugador
                </Text>
              </View>
            )}
            
            {currentNomination && gameStatus === 'nomination' && (
              <TouchableOpacity style={styles.actionButton} onPress={handleStartVoting}>
                <Text style={styles.actionButtonText}>Iniciar Votación</Text>
              </TouchableOpacity>
            )}
            
            {gameStatus === 'voting' && (
              <TouchableOpacity style={styles.actionButton} onPress={handleFinishVoting}>
                <Text style={styles.actionButtonText}>Finalizar Votación</Text>
              </TouchableOpacity>
            )}
            
            {gameStatus === 'execution' && (
              <TouchableOpacity
                style={[styles.actionButton, styles.executeButton]}
                onPress={handleExecute}
              >
                <Text style={styles.actionButtonText}>Ejecutar</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={styles.roleButton}
              onPress={() => setShowRoleModal(true)}
            >
              <Text style={styles.roleButtonText}>👁️ Ver Mi Rol</Text>
            </TouchableOpacity>
            
            {playerRole && (
              <View style={styles.playerRoleHint}>
                <Text style={styles.playerRoleHintText}>
                  Rol: <Text style={styles.playerRoleName}>{playerRole.name}</Text>
                </Text>
                <Text style={styles.playerRoleTeam}>
                  {playerRole.team === 'townsfolk' ? '👥 Aldeano' : 
                   playerRole.team === 'outsider' ? '🧙 Forastero' : 
                   playerRole.team === 'minion' ? '😈 Esbirro' : '👹 Demonio'}
                </Text>
              </View>
            )}
          </View>
        </>
      )}
      
      <BloodOnTheClocktowerRoleInfoModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        roleId={currentPlayer?.roleId}
        playerName={currentPlayer?.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  phaseInfo: {
    backgroundColor: '#16213e',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 18,
    color: '#4caf50',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  phaseStats: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginTop: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  statValue: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  deadStat: {
    color: '#f44336',
  },
  gameStatsSection: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  gameStatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  gameStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  gameStatCard: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 80,
  },
  gameStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 4,
  },
  gameStatLabel: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
  },
  gameLogHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  gameLogCount: {
    fontSize: 12,
    color: '#aaa',
  },
  logEntry: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
    alignItems: 'flex-start',
  },
  logIcon: {
    fontSize: 20,
    marginRight: 10,
    marginTop: 2,
  },
  logContent: {
    flex: 1,
  },
  emptyLog: {
    padding: 20,
    alignItems: 'center',
  },
  emptyLogText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  actionInfoCard: {
    marginBottom: 10,
  },
  actionHint: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  playerRoleHint: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#9c27b0',
  },
  playerRoleHintText: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 4,
  },
  playerRoleName: {
    fontWeight: 'bold',
    color: '#9c27b0',
  },
  playerRoleTeam: {
    fontSize: 12,
    color: '#aaa',
  },
  deathAnnouncement: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  deathText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nominationBanner: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  nominationText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  playersSection: {
    marginBottom: 20,
  },
  gameLogSection: {
    maxHeight: 150,
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  gameLogTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  logEntry: {
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  logText: {
    color: '#ccc',
    fontSize: 14,
    marginBottom: 3,
  },
  logTime: {
    color: '#666',
    fontSize: 12,
  },
  actionsSection: {
    gap: 10,
  },
  actionButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  executeButton: {
    backgroundColor: '#f44336',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  roleButton: {
    backgroundColor: '#9c27b0',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

