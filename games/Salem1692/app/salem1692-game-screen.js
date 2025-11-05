import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useSalem1692GameStore } from '../store/salem1692GameStore';
import { Salem1692PlayerDisplay } from '../components/Salem1692PlayerDisplay';
import { Salem1692HandView } from '../components/Salem1692HandView';
import { Salem1692AccusationPile } from '../components/Salem1692AccusationPile';
import { Salem1692NightPhaseModal } from '../components/Salem1692NightPhaseModal';
import { Salem1692TrialVoteModal } from '../components/Salem1692TrialVoteModal';
import { ACTION_CARDS } from '../constants/Salem1692CardData';

export const Salem1692GameScreen = ({ navigation }) => {
  const gameStatus = useSalem1692GameStore((state) => state.gameStatus);
  const gamePhase = useSalem1692GameStore((state) => state.gamePhase);
  const players = useSalem1692GameStore((state) => state.players);
  const currentPlayerId = useSalem1692GameStore((state) => state.currentPlayerId);
  const nightPhase = useSalem1692GameStore((state) => state.nightPhase);
  const trial = useSalem1692GameStore((state) => state.trial);
  const gameLog = useSalem1692GameStore((state) => state.gameLog);
  
  const startPlayerTurn = useSalem1692GameStore((state) => state.startPlayerTurn);
  const playCard = useSalem1692GameStore((state) => state.playCard);
  const setConspiracyTarget = useSalem1692GameStore((state) => state.setConspiracyTarget);
  const endNightPhase = useSalem1692GameStore((state) => state.endNightPhase);
  const castVote = useSalem1692GameStore((state) => state.castVote);
  const resetGame = useSalem1692GameStore((state) => state.resetGame);
  
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [showNightModal, setShowNightModal] = useState(false);
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const isNightPhase = gamePhase === 'night' && nightPhase.active;
  const isTrialActive = trial.active;
  
  useEffect(() => {
    if (gameStatus === 'night' && nightPhase.active) {
      setShowNightModal(true);
    } else {
      setShowNightModal(false);
    }
  }, [gameStatus, nightPhase.active]);
  
  useEffect(() => {
    if (gameStatus === 'finished') {
      const alivePlayers = players.filter(p => p.isAlive);
      const aliveWitches = alivePlayers.filter(p => p.role === 'witch');
      const winner = aliveWitches.length > 0 ? 'Brujas' : 'Aldeanos';
      
      Alert.alert(
        '¡Juego Terminado!',
        `¡Los ${winner} han ganado la partida!`,
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
  }, [gameStatus]);
  
  const handleCardSelect = (card) => {
    setSelectedCard(card);
    setSelectedTarget(null);
  };
  
  const handlePlayerSelect = (playerId) => {
    if (!selectedCard) return;
    
    // Verificar si la carta necesita objetivo
    if (selectedCard.canTargetPlayer && !playerId) {
      Alert.alert('Error', 'Esta carta necesita un objetivo');
      return;
    }
    
    if (selectedCard.canTargetPlayer && playerId === currentPlayerId) {
      Alert.alert('Error', 'No puedes elegirte a ti mismo');
      return;
    }
    
    setSelectedTarget(playerId);
    
    // Jugar carta
    if (playCard(currentPlayerId, selectedCard.instanceId || selectedCard.id, playerId)) {
      setSelectedCard(null);
      setSelectedTarget(null);
    } else {
      Alert.alert('Error', 'No se pudo jugar la carta');
    }
  };
  
  const handleStartTurn = () => {
    if (startPlayerTurn(currentPlayerId)) {
      setSelectedCard(null);
      setSelectedTarget(null);
    }
  };
  
  const handleNightTargetSelect = (targetPlayerId) => {
    if (setConspiracyTarget(targetPlayerId)) {
      // Puede que necesites lógica adicional aquí
    }
  };
  
  const handleEndNight = () => {
    endNightPhase();
    setShowNightModal(false);
  };
  
  const handleVote = (vote) => {
    castVote(currentPlayerId, vote);
  };
  
  if (gameStatus === 'lobby' || gameStatus === 'finished') {
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
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.gameTitle}>Salem 1692</Text>
        <Text style={styles.phaseText}>
          {isNightPhase ? '🌙 Noche' : isTrialActive ? '⚖️ Juicio' : '☀️ Día'}
        </Text>
        {currentPlayer && (
          <Text style={styles.turnIndicator}>
            Jugador: {currentPlayer.name}
          </Text>
        )}
      </View>
      
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        {/* Lista de jugadores */}
        <View style={styles.playersSection}>
          <Text style={styles.sectionTitle}>Jugadores</Text>
          {players.map((player) => (
            <View key={player.id} style={styles.playerContainer}>
              <Salem1692PlayerDisplay
                player={player}
                onPress={() => handlePlayerSelect(player.id)}
                isSelected={selectedTarget === player.id}
                showRole={!player.isAlive}
              />
              {player.accusations && player.accusations.length > 0 && (
                <Salem1692AccusationPile
                  accusations={player.accusations}
                  playerName={player.name}
                />
              )}
            </View>
          ))}
        </View>
        
        {/* Log del juego */}
        {gameLog.length > 0 && (
          <View style={styles.logSection}>
            <Text style={styles.sectionTitle}>Historial</Text>
            <ScrollView style={styles.logScroll}>
              {gameLog.slice(-10).reverse().map((log, index) => (
                <Text key={index} style={styles.logText}>
                  {log.message}
                </Text>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
      
      {/* Mano del jugador */}
      {currentPlayer && currentPlayer.isAlive && !isNightPhase && !isTrialActive && (
        <Salem1692HandView
          hand={currentPlayer.hand}
          onCardPress={handleCardSelect}
          selectedCardId={selectedCard?.instanceId || selectedCard?.id}
        />
      )}
      
      {/* Botón para iniciar turno */}
      {currentPlayer && currentPlayer.isAlive && !isNightPhase && !isTrialActive && gamePhase === 'day' && (
        <TouchableOpacity
          style={styles.turnButton}
          onPress={handleStartTurn}
        >
          <Text style={styles.turnButtonText}>Iniciar Turno</Text>
        </TouchableOpacity>
      )}
      
      {/* Modal de Fase de Noche */}
      <Salem1692NightPhaseModal
        visible={showNightModal}
        witches={nightPhase.witches}
        players={players}
        currentPlayerId={currentPlayerId}
        conspiracyTarget={nightPhase.conspiracyTarget}
        onSelectTarget={handleNightTargetSelect}
        onEndNight={handleEndNight}
      />
      
      {/* Modal de Juicio */}
      <Salem1692TrialVoteModal
        visible={isTrialActive}
        trial={trial}
        players={players}
        currentPlayerId={currentPlayerId}
        onVote={handleVote}
        canVote={currentPlayer && currentPlayer.isAlive}
      />
      
      {/* Botón de volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Alert.alert(
            'Salir del juego',
            '¿Estás seguro de que quieres salir?',
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Salir',
                onPress: () => {
                  resetGame();
                  navigation?.navigate('index');
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.backButtonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#2d2d2d',
    padding: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#6a1b9a',
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
  },
  phaseText: {
    fontSize: 18,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 4,
  },
  turnIndicator: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  playersSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  playerContainer: {
    marginBottom: 16,
  },
  logSection: {
    marginTop: 20,
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    padding: 12,
  },
  logScroll: {
    maxHeight: 150,
  },
  logText: {
    fontSize: 12,
    color: '#ccc',
    marginBottom: 4,
    paddingLeft: 8,
    borderLeftWidth: 2,
    borderLeftColor: '#6a1b9a',
  },
  turnButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  turnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#444',
    padding: 12,
    alignItems: 'center',
    margin: 8,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 100,
  },
});

