import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAmongUsMesaStore } from '../store/amongUsMesaStore';
import { AmongUsMesaMap } from '../components/AmongUsMesaMap';
import { AmongUsMesaTaskItem } from '../components/AmongUsMesaTaskItem';
import { AmongUsMesaPlayerAvatar } from '../components/AmongUsMesaPlayerAvatar';
import { MAP_ROOMS, SABOTAGES } from '../constants/AmongUsMesaGameSettings';

export const AmongUsMesaGameScreen = ({ navigation, playerId }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [showPlayersNearby, setShowPlayersNearby] = useState(true);
  const [gameStartTime] = useState(Date.now());
  const [showStats, setShowStats] = useState(false);
  
  const players = useAmongUsMesaStore((state) => state.players);
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const gameStatus = useAmongUsMesaStore((state) => state.gameStatus);
  const taskProgress = useAmongUsMesaStore((state) => state.taskProgress);
  const activeSabotage = useAmongUsMesaStore((state) => state.activeSabotage);
  const completedTasks = useAmongUsMesaStore((state) => state.completedTasks);
  const totalTasks = useAmongUsMesaStore((state) => state.totalTasks);
  const location = currentPlayer?.location;
  
  const updatePlayerLocation = useAmongUsMesaStore((state) => state.updatePlayerLocation);
  const completeTask = useAmongUsMesaStore((state) => state.completeTask);
  const reportBody = useAmongUsMesaStore((state) => state.reportBody);
  const callEmergencyMeeting = useAmongUsMesaStore((state) => state.callEmergencyMeeting);
  const eliminatePlayer = useAmongUsMesaStore((state) => state.eliminatePlayer);
  const sabotage = useAmongUsMesaStore((state) => state.sabotage);
  
  const isImpostor = currentPlayer?.role === 'impostor';
  const isAlive = currentPlayer?.isAlive;
  const playersInSameLocation = players.filter(
    p => p.location === location && p.id !== playerId && p.isAlive && p.role !== 'impostor'
  );
  const allPlayersInLocation = players.filter(
    p => p.location === location && p.id !== playerId && p.isAlive
  );
  const alivePlayers = players.filter(p => p.isAlive);
  const deadPlayers = players.filter(p => !p.isAlive);
  const playerTasks = currentPlayer?.tasks || [];
  const completedPlayerTasks = playerTasks.filter(t => t.completed).length;
  const totalPlayerTasks = playerTasks.length;
  
  // Calcular tiempo de juego
  const gameTime = Math.floor((Date.now() - gameStartTime) / 1000);
  const gameMinutes = Math.floor(gameTime / 60);
  const gameSeconds = gameTime % 60;
  
  useEffect(() => {
    if (gameStatus === 'meeting' || gameStatus === 'voting') {
      navigation?.navigate('meeting');
    }
  }, [gameStatus]);
  
  const handleRoomSelect = (roomId) => {
    if (!isAlive) return;
    updatePlayerLocation(playerId, roomId);
    setSelectedRoom(roomId);
  };
  
  const handleCompleteTask = (taskId) => {
    if (!isAlive || isImpostor) return;
    completeTask(playerId, taskId);
  };
  
  const handleReportBody = () => {
    if (!isAlive) return;
    // Simular encontrar un cuerpo (en el juego real, esto se haría al tocar un cuerpo)
    const deadPlayer = players.find(p => !p.isAlive && p.location === location);
    if (deadPlayer) {
      reportBody(playerId, deadPlayer.id, location);
    } else {
      Alert.alert('Información', 'No hay cuerpos para reportar en esta ubicación');
    }
  };
  
  const handleEmergencyButton = () => {
    if (!isAlive) return;
    callEmergencyMeeting(playerId);
  };
  
  const handleKill = () => {
    if (!isAlive || !isImpostor) return;
    if (playersInSameLocation.length === 0) {
      Alert.alert('Información', 'No hay tripulantes en tu ubicación');
      return;
    }
    
    Alert.alert(
      'Eliminar Tripulante',
      `¿Eliminar a ${playersInSameLocation[0].name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => eliminatePlayer(playerId, playersInSameLocation[0].id),
        },
      ]
    );
  };
  
  const handleSabotage = () => {
    if (!isAlive || !isImpostor) return;
    
    Alert.alert(
      'Sabotear',
      'Selecciona un sabotaje',
      SABOTAGES.map(sabotage => ({
        text: sabotage.name,
        onPress: () => {
          sabotage(playerId, sabotage.id);
          Alert.alert('Sabotaje', `${sabotage.name} activado: ${sabotage.description}`);
        },
      })).concat([{ text: 'Cancelar', style: 'cancel' }])
    );
  };
  
  if (!isAlive) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.ghostContainer}>
          <Text style={styles.ghostTitle}>👻 Eres un fantasma</Text>
          <Text style={styles.ghostText}>
            Has sido eliminado. Puedes observar el juego pero no puedes interactuar.
          </Text>
          
          <View style={styles.ghostInfo}>
            <Text style={styles.ghostInfoTitle}>Estado del Juego</Text>
            <View style={styles.ghostInfoRow}>
              <Text style={styles.ghostInfoLabel}>Progreso de tareas:</Text>
              <Text style={styles.ghostInfoValue}>{Math.round(taskProgress)}%</Text>
            </View>
            <View style={styles.ghostInfoRow}>
              <Text style={styles.ghostInfoLabel}>Tareas completadas:</Text>
              <Text style={styles.ghostInfoValue}>{completedTasks}/{totalTasks}</Text>
            </View>
            <View style={styles.ghostInfoRow}>
              <Text style={styles.ghostInfoLabel}>Jugadores vivos:</Text>
              <Text style={styles.ghostInfoValue}>{alivePlayers.length}/{players.length}</Text>
            </View>
            <View style={styles.ghostInfoRow}>
              <Text style={styles.ghostInfoLabel}>Tiempo de juego:</Text>
              <Text style={styles.ghostInfoValue}>{gameMinutes}:{gameSeconds.toString().padStart(2, '0')}</Text>
            </View>
          </View>
          
          <View style={styles.ghostPlayers}>
            <Text style={styles.ghostPlayersTitle}>Jugadores Vivos</Text>
            <View style={styles.ghostPlayersGrid}>
              {alivePlayers.map(player => (
                <View key={player.id} style={styles.ghostPlayerCard}>
                  <AmongUsMesaPlayerAvatar player={player} size={50} showStatus={false} />
                  <Text style={styles.ghostPlayerName}>{player.name}</Text>
                  <Text style={styles.ghostPlayerLocation}>
                    {MAP_ROOMS.find(r => r.id === player.location)?.name || 'Desconocido'}
                  </Text>
                </View>
              ))}
            </View>
          </View>
          
          {activeSabotage && (
            <View style={styles.ghostSabotage}>
              <Text style={styles.ghostSabotageTitle}>⚠️ Sabotaje Activo</Text>
              <Text style={styles.ghostSabotageText}>{activeSabotage.name}</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.headerTitle}>Among Us</Text>
          <TouchableOpacity style={styles.statsButton} onPress={() => setShowStats(!showStats)}>
            <Text style={styles.statsButtonText}>📊</Text>
          </TouchableOpacity>
        </View>
        
        {!isImpostor && (
          <View style={styles.taskProgressContainer}>
            <Text style={styles.taskProgressLabel}>Progreso de Tareas</Text>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${taskProgress}%` }]} />
            </View>
            <View style={styles.progressInfo}>
              <Text style={styles.progressText}>{Math.round(taskProgress)}%</Text>
              <Text style={styles.progressDetails}>
                {completedPlayerTasks}/{totalPlayerTasks} tareas completadas
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.gameInfo}>
          <Text style={styles.gameInfoText}>
            ⏱️ {gameMinutes}:{gameSeconds.toString().padStart(2, '0')} | 
            👥 {alivePlayers.length} vivos | 
            {isImpostor ? ' 👹 Impostor' : ' 👨‍🚀 Tripulante'}
          </Text>
        </View>
      </View>
      
      {showStats && (
        <View style={styles.statsPanel}>
          <Text style={styles.statsPanelTitle}>Estadísticas del Juego</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{alivePlayers.length}</Text>
              <Text style={styles.statLabel}>Jugadores Vivos</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{deadPlayers.length}</Text>
              <Text style={styles.statLabel}>Eliminados</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{Math.round(taskProgress)}%</Text>
              <Text style={styles.statLabel}>Progreso</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{completedTasks}/{totalTasks}</Text>
              <Text style={styles.statLabel}>Tareas</Text>
            </View>
          </View>
          {!isImpostor && (
            <View style={styles.playerTaskProgress}>
              <Text style={styles.playerTaskProgressText}>
                Tus tareas: {completedPlayerTasks}/{totalPlayerTasks} completadas
              </Text>
            </View>
          )}
        </View>
      )}
      
      <ScrollView style={styles.content}>
        <AmongUsMesaMap
          currentLocation={location}
          players={players}
          onRoomSelect={handleRoomSelect}
        />
        
        {showPlayersNearby && allPlayersInLocation.length > 0 && (
          <View style={styles.playersNearbySection}>
            <Text style={styles.sectionTitle}>
              👥 Jugadores en {MAP_ROOMS.find(r => r.id === location)?.name || location}
            </Text>
            <View style={styles.playersNearbyGrid}>
              {allPlayersInLocation.map(player => (
                <View key={player.id} style={styles.playerNearbyCard}>
                  <AmongUsMesaPlayerAvatar player={player} size={50} showStatus={false} />
                  <Text style={styles.playerNearbyName}>{player.name}</Text>
                  {isImpostor && player.role === 'crewmate' && (
                    <Text style={styles.playerNearbyRole}>Tripulante</Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}
        
        {!isImpostor && (
          <View style={styles.tasksSection}>
            <Text style={styles.sectionTitle}>
              ✅ Tus Tareas ({completedPlayerTasks}/{totalPlayerTasks})
            </Text>
            {currentPlayer.tasks.length === 0 ? (
              <Text style={styles.noTasksText}>No tienes tareas asignadas</Text>
            ) : (
              currentPlayer.tasks.map((task) => (
                <AmongUsMesaTaskItem
                  key={task.id}
                  task={task}
                  onComplete={handleCompleteTask}
                />
              ))
            )}
          </View>
        )}
        
        {isImpostor && (
          <View style={styles.impostorSection}>
            <Text style={styles.sectionTitle}>👹 Acciones de Impostor</Text>
            <Text style={styles.impostorInfo}>
              Tu objetivo es eliminar a los tripulantes sin ser descubierto. 
              Sabotea sistemas para crear distracciones y elimina cuando tengas la oportunidad.
            </Text>
            
            <View style={styles.impostorStats}>
              <View style={styles.impostorStatItem}>
                <Text style={styles.impostorStatValue}>{alivePlayers.length - (players.filter(p => p.role === 'impostor' && p.isAlive).length)}</Text>
                <Text style={styles.impostorStatLabel}>Tripulantes Restantes</Text>
              </View>
              <View style={styles.impostorStatItem}>
                <Text style={styles.impostorStatValue}>
                  {players.filter(p => p.role === 'impostor' && p.isAlive).length}
                </Text>
                <Text style={styles.impostorStatLabel}>Impostores Vivos</Text>
              </View>
            </View>
            
            {playersInSameLocation.length > 0 ? (
              <View style={styles.killSection}>
                <Text style={styles.killSectionTitle}>Objetivos Disponibles</Text>
                {playersInSameLocation.map(target => (
                  <TouchableOpacity 
                    key={target.id}
                    style={styles.killButton} 
                    onPress={() => {
                      Alert.alert(
                        'Eliminar Tripulante',
                        `¿Eliminar a ${target.name}?`,
                        [
                          { text: 'Cancelar', style: 'cancel' },
                          {
                            text: 'Eliminar',
                            style: 'destructive',
                            onPress: () => eliminatePlayer(playerId, target.id),
                          },
                        ]
                      );
                    }}
                  >
                    <Text style={styles.killButtonText}>
                      🗡️ Eliminar {target.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.noKillAvailable}>
                <Text style={styles.noKillAvailableText}>
                  No hay tripulantes en tu ubicación actual
                </Text>
              </View>
            )}
            
            <TouchableOpacity style={styles.sabotageButton} onPress={handleSabotage}>
              <Text style={styles.sabotageButtonText}>⚡ Sabotear Sistema</Text>
            </TouchableOpacity>
            
            <View style={styles.impostorTips}>
              <Text style={styles.impostorTipsTitle}>💡 Consejos</Text>
              <Text style={styles.impostorTipText}>• Usa sabotajes para dividir a los tripulantes</Text>
              <Text style={styles.impostorTipText}>• Sé cuidadoso con tus eliminations</Text>
              <Text style={styles.impostorTipText}>• Crea alibis creíbles durante las reuniones</Text>
            </View>
          </View>
        )}
        
        {activeSabotage && (
          <View style={[
            styles.sabotageAlert,
            activeSabotage.urgency === 'critica' && styles.sabotageAlertCritical
          ]}>
            <View style={styles.sabotageAlertHeader}>
              <Text style={styles.sabotageAlertIcon}>
                {activeSabotage.icon || '⚠️'}
              </Text>
              <Text style={styles.sabotageAlertText}>
                {activeSabotage.urgency === 'critica' ? '🚨 CRÍTICO: ' : '⚠️ '}
                {activeSabotage.name}
              </Text>
            </View>
            <Text style={styles.sabotageAlertDescription}>
              {activeSabotage.description}
            </Text>
            {activeSabotage.room && (
              <Text style={styles.sabotageAlertLocation}>
                📍 Debe arreglarse en: {MAP_ROOMS.find(r => r.id === activeSabotage.room)?.name}
              </Text>
            )}
            {!isImpostor && (
              <TouchableOpacity
                style={[
                  styles.fixButton,
                  activeSabotage.urgency === 'critica' && styles.fixButtonCritical
                ]}
                onPress={() => {
                  const fixSabotage = useAmongUsMesaStore.getState().fixSabotage;
                  if (location === activeSabotage.room) {
                    fixSabotage(playerId, activeSabotage.id);
                    Alert.alert('✅ Éxito', `${activeSabotage.name} arreglado`);
                  } else {
                    Alert.alert(
                      '⚠️ Ubicación incorrecta',
                      `Debes estar en ${MAP_ROOMS.find(r => r.id === activeSabotage.room)?.name} para arreglar este sabotaje`
                    );
                  }
                }}
              >
                <Text style={styles.fixButtonText}>
                  {location === activeSabotage.room ? '🔧 Arreglar Ahora' : '📍 Ir a Arreglar'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </ScrollView>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.reportButton} onPress={handleReportBody}>
          <Text style={styles.reportButtonText}>📢 Reportar Cuerpo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.emergencyButton}
          onPress={handleEmergencyButton}
        >
          <Text style={styles.emergencyButtonText}>🚨 Emergencia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  statsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  statsButtonText: {
    fontSize: 20,
  },
  taskProgressContainer: {
    marginTop: 10,
  },
  taskProgressLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  progressDetails: {
    fontSize: 12,
    color: '#999',
  },
  gameInfo: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  gameInfoText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statsPanel: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statsPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  playerTaskProgress: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
  },
  playerTaskProgressText: {
    fontSize: 14,
    color: '#2e7d32',
    textAlign: 'center',
    fontWeight: '600',
  },
  progressBar: {
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  progressText: {
    marginTop: 5,
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  tasksSection: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  impostorSection: {
    marginTop: 20,
    backgroundColor: '#ffebee',
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#d32f2f',
  },
  impostorInfo: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  killButton: {
    backgroundColor: '#d32f2f',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  killButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sabotageButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  sabotageButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sabotageAlert: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  sabotageAlertText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 5,
  },
  sabotageAlertDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  fixButton: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  fixButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  actionButtons: {
    flexDirection: 'row',
    padding: 15,
    gap: 10,
  },
  reportButton: {
    flex: 1,
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  reportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emergencyButton: {
    flex: 1,
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ghostTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  ghostText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    paddingHorizontal: 30,
    marginBottom: 30,
  },
  ghostContainer: {
    padding: 20,
  },
  ghostInfo: {
    padding: 20,
    backgroundColor: '#fff',
    marginHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ghostInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  ghostInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  ghostInfoLabel: {
    fontSize: 14,
    color: '#666',
  },
  ghostInfoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  ghostPlayers: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  ghostPlayersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  ghostPlayersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  ghostPlayerCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    margin: 5,
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  ghostPlayerName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 5,
  },
  ghostPlayerLocation: {
    fontSize: 12,
    color: '#666',
    marginTop: 3,
  },
  ghostSabotage: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  ghostSabotageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 5,
  },
  ghostSabotageText: {
    fontSize: 14,
    color: '#666',
  },
  playersNearbySection: {
    marginTop: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playersNearbyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  playerNearbyCard: {
    alignItems: 'center',
    margin: 5,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '30%',
  },
  playerNearbyName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    marginTop: 5,
    textAlign: 'center',
  },
  playerNearbyRole: {
    fontSize: 10,
    color: '#4caf50',
    marginTop: 2,
  },
  noTasksText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
  impostorStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  impostorStatItem: {
    alignItems: 'center',
  },
  impostorStatValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  impostorStatLabel: {
    fontSize: 12,
    color: '#fff',
    marginTop: 5,
  },
  killSection: {
    marginBottom: 15,
  },
  killSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  noKillAvailable: {
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
    marginBottom: 15,
  },
  noKillAvailableText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  impostorTips: {
    marginTop: 15,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 8,
  },
  impostorTipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  impostorTipText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  sabotageAlertCritical: {
    backgroundColor: '#ffebee',
    borderColor: '#d32f2f',
  },
  sabotageAlertHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sabotageAlertIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  sabotageAlertLocation: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 10,
  },
  fixButtonCritical: {
    backgroundColor: '#d32f2f',
  },
});

