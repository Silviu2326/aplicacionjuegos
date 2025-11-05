import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Alert,
  Modal 
} from 'react-native';
import { useMascaradeStore } from '../store/mascaradeStore';
import { MascaradePlayerDisplay } from '../components/MascaradePlayerDisplay';
import { MascaradeActionBar } from '../components/MascaradeActionBar';
import { MascaradeAnnounceModal } from '../components/MascaradeAnnounceModal';
import { MascaradeChallengeOverlay } from '../components/MascaradeChallengeOverlay';

export const MascaradeGameScreen = ({ navigation }) => {
  const gameStatus = useMascaradeStore((state) => state.gameStatus);
  const players = useMascaradeStore((state) => state.players);
  const currentPlayerId = useMascaradeStore((state) => state.currentPlayerId);
  const currentRound = useMascaradeStore((state) => state.currentRound);
  const isFirstFourRounds = useMascaradeStore((state) => state.isFirstFourRounds);
  const bank = useMascaradeStore((state) => state.bank);
  const court = useMascaradeStore((state) => state.court);
  const pendingAnnouncement = useMascaradeStore((state) => state.pendingAnnouncement);
  const waitingForChallenges = useMascaradeStore((state) => state.waitingForChallenges);
  const swapInProgress = useMascaradeStore((state) => state.swapInProgress);
  const availableCharacters = useMascaradeStore((state) => state.availableCharacters);
  const gameLog = useMascaradeStore((state) => state.gameLog);
  
  const startTurn = useMascaradeStore((state) => state.startTurn);
  const initiateSwap = useMascaradeStore((state) => state.initiateSwap);
  const lookAtCard = useMascaradeStore((state) => state.lookAtCard);
  const announceRole = useMascaradeStore((state) => state.announceRole);
  const challengeAnnouncement = useMascaradeStore((state) => state.challengeAnnouncement);
  const resolveAnnouncement = useMascaradeStore((state) => state.resolveAnnouncement);
  const resetGame = useMascaradeStore((state) => state.resetGame);
  
  const [announceModalVisible, setAnnounceModalVisible] = useState(false);
  const [swapModalVisible, setSwapModalVisible] = useState(false);
  const [showLog, setShowLog] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const isCurrentPlayerLocal = currentPlayerId !== null; // Asumiendo que el jugador local es el actual
  
  // Calcular estadísticas en tiempo real
  const totalCoinsInGame = players.reduce((sum, p) => sum + p.coins, 0) + bank + court;
  const richestPlayer = players.reduce((max, p) => p.coins > max.coins ? p : max, players[0]);
  const poorestPlayer = players.reduce((min, p) => p.coins < min.coins ? p : min, players[0]);
  const averageCoins = players.length > 0 ? Math.round(totalCoinsInGame / players.length) : 0;
  
  // Iniciar turno cuando cambia el jugador actual
  useEffect(() => {
    if (gameStatus === 'playing' && currentPlayerId) {
      startTurn();
    }
  }, [currentPlayerId, gameStatus]);
  
  // Detectar fin del juego
  useEffect(() => {
    if (gameStatus === 'finished') {
      const winner = players.find(p => p.coins >= 13) || 
                     players.reduce((max, p) => p.coins > max.coins ? p : max, players[0]);
      Alert.alert(
        '¡Juego Terminado!',
        winner ? `${winner.name} ha ganado la partida con ${winner.coins} monedas` : 'La partida ha terminado',
        [
          {
            text: 'Volver al inicio',
            onPress: () => {
              resetGame();
              navigation?.navigate('index');
            },
          },
        ]
      );
    }
  }, [gameStatus, players]);
  
  const handleSwap = () => {
    if (isFirstFourRounds) {
      // En las primeras 4 rondas, mostrar selector de jugador
      setSwapModalVisible(true);
    } else {
      setSwapModalVisible(true);
    }
  };
  
  const handleSwapWithPlayer = (targetPlayerId) => {
    if (initiateSwap(targetPlayerId)) {
      // Aquí se manejaría la animación/acción de intercambio
      // Por ahora, simulamos que se intercambia
      setTimeout(() => {
        // Esta lógica se manejaría en el store
        setSwapModalVisible(false);
      }, 1000);
    }
  };
  
  const handleLook = () => {
    lookAtCard();
    // Mostrar la carta por un momento
    Alert.alert(
      'Tu Personaje',
      `Eres el ${currentPlayer?.character || 'desconocido'}`,
      [{ text: 'OK' }]
    );
  };
  
  const handleAnnounce = () => {
    setAnnounceModalVisible(true);
  };
  
  const handleAnnounceSelect = (character) => {
    announceRole(character);
  };
  
  const handleChallenge = () => {
    if (currentPlayerId && pendingAnnouncement) {
      challengeAnnouncement(currentPlayerId);
      // El store manejará la resolución
    }
  };
  
  const handlePass = () => {
    resolveAnnouncement();
  };
  
  if (gameStatus !== 'playing') {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>El juego no está en curso</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation?.navigate('index')}
        >
          <Text style={styles.backButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const announcedPlayer = pendingAnnouncement 
    ? players.find(p => p.id === pendingAnnouncement.playerId)
    : null;
  
  const getLogIcon = (type) => {
    switch(type) {
      case 'game_start': return '🎮';
      case 'cards_hidden': return '🃏';
      case 'turn_start': return '⏰';
      case 'swap': return '🔄';
      case 'look': return '👁️';
      case 'announce': return '📢';
      case 'challenge': return '⚔️';
      case 'game_over': return '🏆';
      default: return '📝';
    }
  };

  const formatLogTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Header mejorado */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.gameTitle}>🎭 Mascarade</Text>
            <TouchableOpacity
              style={styles.infoButton}
              onPress={() => setShowStats(!showStats)}
            >
              <Text style={styles.infoButtonText}>📊</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.roundInfo}>
            <Text style={styles.roundText}>Ronda {currentRound}</Text>
            {isFirstFourRounds && (
              <Text style={styles.roundWarning}>⚠️ Primera fase: Intercambio obligatorio</Text>
            )}
          </View>
          <View style={styles.statsContainer}>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeLabel}>Banco</Text>
              <Text style={styles.statBadgeValue}>{bank} 💰</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeLabel}>Juzgado</Text>
              <Text style={styles.statBadgeValue}>{court} 💰</Text>
            </View>
            <View style={styles.statBadge}>
              <Text style={styles.statBadgeLabel}>Total</Text>
              <Text style={styles.statBadgeValue}>{totalCoinsInGame} 💰</Text>
            </View>
          </View>
          {currentPlayer && (
            <View style={styles.turnIndicatorContainer}>
              <Text style={styles.turnIndicator}>
                ⭐ Turno de: <Text style={styles.turnPlayerName}>{currentPlayer.name}</Text>
              </Text>
            </View>
          )}
        </View>

        {/* Panel de estadísticas expandible */}
        {showStats && (
          <View style={styles.statsPanel}>
            <Text style={styles.panelTitle}>📊 Estadísticas en Tiempo Real</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Más Rico</Text>
                <Text style={styles.statItemValue}>{richestPlayer?.name || 'N/A'}</Text>
                <Text style={styles.statItemSubvalue}>{richestPlayer?.coins || 0} 💰</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Más Pobre</Text>
                <Text style={styles.statItemValue}>{poorestPlayer?.name || 'N/A'}</Text>
                <Text style={styles.statItemSubvalue}>{poorestPlayer?.coins || 0} 💰</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Promedio</Text>
                <Text style={styles.statItemValue}>{averageCoins} 💰</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Jugadores</Text>
                <Text style={styles.statItemValue}>{players.length}</Text>
              </View>
            </View>
          </View>
        )}
        
        {/* Jugadores */}
        <View style={styles.playersSection}>
          <Text style={styles.sectionTitle}>👥 Jugadores</Text>
          <View style={styles.playersContainer}>
            {players.map((player) => (
              <MascaradePlayerDisplay
                key={player.id}
                player={player}
                isCurrentTurn={player.id === currentPlayerId}
                isLocalPlayer={player.id === currentPlayerId}
              />
            ))}
          </View>
        </View>

        {/* Log de eventos */}
        <View style={styles.logSection}>
          <TouchableOpacity
            style={styles.logHeader}
            onPress={() => setShowLog(!showLog)}
          >
            <Text style={styles.logTitle}>📜 Log de Eventos</Text>
            <Text style={styles.logToggle}>{showLog ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          {showLog && (
            <ScrollView style={styles.logContainer} nestedScrollEnabled>
              {gameLog.length === 0 ? (
                <Text style={styles.logEmpty}>No hay eventos aún</Text>
              ) : (
                gameLog.slice().reverse().map((log, index) => (
                  <View key={index} style={styles.logItem}>
                    <Text style={styles.logIcon}>{getLogIcon(log.type)}</Text>
                    <View style={styles.logContent}>
                      <Text style={styles.logMessage}>{log.message}</Text>
                      <Text style={styles.logTime}>{formatLogTime(log.timestamp)}</Text>
                    </View>
                  </View>
                ))
              )}
            </ScrollView>
          )}
        </View>
      </ScrollView>
      
      {/* Barra de acciones (solo para el jugador actual) */}
      {currentPlayer && currentPlayer.id === currentPlayerId && !waitingForChallenges && (
        <MascaradeActionBar
          onSwap={handleSwap}
          onLook={handleLook}
          onAnnounce={handleAnnounce}
          isFirstFourRounds={isFirstFourRounds}
          disabled={swapInProgress || waitingForChallenges}
        />
      )}
      
      {/* Modal de anuncio de rol */}
      <MascaradeAnnounceModal
        visible={announceModalVisible}
        onClose={() => setAnnounceModalVisible(false)}
        onSelectCharacter={handleAnnounceSelect}
        availableCharacters={availableCharacters}
      />
      
      {/* Overlay de desafío */}
      {pendingAnnouncement && currentPlayerId !== pendingAnnouncement.playerId && (
        <MascaradeChallengeOverlay
          visible={waitingForChallenges}
          announcedCharacter={pendingAnnouncement.character}
          announcedPlayerName={announcedPlayer?.name || 'Un jugador'}
          onChallenge={handleChallenge}
          onPass={handlePass}
          timeLimit={30}
        />
      )}
      
      {/* Modal de selección de jugador para intercambio */}
      <Modal
        visible={swapModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setSwapModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Seleccionar Jugador</Text>
            <Text style={styles.modalSubtitle}>
              Elige con quién intercambiar cartas
            </Text>
            <ScrollView style={styles.playersModalList}>
              {players
                .filter(p => p.id !== currentPlayerId)
                .map((player) => (
                  <TouchableOpacity
                    key={player.id}
                    style={styles.playerModalItem}
                    onPress={() => handleSwapWithPlayer(player.id)}
                  >
                    <Text style={styles.playerModalName}>{player.name}</Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCancelButton}
              onPress={() => setSwapModalVisible(false)}
            >
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      {/* Botón para volver */}
      <TouchableOpacity
        style={styles.backButtonFixed}
        onPress={() => {
          Alert.alert(
            '¿Salir de la partida?',
            '¿Estás seguro de que quieres salir?',
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Salir',
                style: 'destructive',
                onPress: () => {
                  resetGame();
                  navigation?.navigate('index');
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.backButtonText}>← Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  header: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  infoButton: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonText: {
    fontSize: 20,
  },
  roundInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  roundText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  roundWarning: {
    fontSize: 12,
    color: '#FF9800',
    fontStyle: 'italic',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
  },
  statBadge: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 8,
    alignItems: 'center',
    minWidth: 70,
  },
  statBadgeLabel: {
    fontSize: 10,
    color: '#666',
    marginBottom: 4,
  },
  statBadgeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  turnIndicatorContainer: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
  },
  turnIndicator: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  turnPlayerName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E7D32',
  },
  statsPanel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  panelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statItemLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  statItemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  statItemSubvalue: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  playersSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    paddingLeft: 4,
  },
  playersContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  logHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  logTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  logToggle: {
    fontSize: 14,
    color: '#666',
  },
  logContainer: {
    maxHeight: 200,
    padding: 12,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logIcon: {
    fontSize: 20,
    marginRight: 12,
  },
  logContent: {
    flex: 1,
  },
  logMessage: {
    fontSize: 13,
    color: '#333',
    marginBottom: 4,
  },
  logTime: {
    fontSize: 10,
    color: '#999',
  },
  logEmpty: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    margin: 20,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButtonFixed: {
    position: 'absolute',
    top: 40,
    left: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    padding: 10,
    borderRadius: 8,
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '85%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  playersModalList: {
    maxHeight: 300,
  },
  playerModalItem: {
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 8,
  },
  playerModalName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  modalCancelButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#f44336',
    borderRadius: 8,
    alignItems: 'center',
  },
  modalCancelText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

