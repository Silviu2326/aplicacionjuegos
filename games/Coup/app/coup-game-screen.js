import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCoupGameStore } from '../store/coupGameStore';
import { CoupPlayerHand } from '../components/CoupPlayerHand';
import { CoupOpponentView } from '../components/CoupOpponentView';
import { CoupActionModal } from '../components/CoupActionModal';
import { CoupChallengeModal } from '../components/CoupChallengeModal';
import { CoupGameLog } from '../components/CoupGameLog';

export const CoupGameScreen = ({ navigation }) => {
  const gameStatus = useCoupGameStore((state) => state.gameStatus);
  const players = useCoupGameStore((state) => state.players);
  const currentPlayerId = useCoupGameStore((state) => state.currentPlayerId);
  const pendingAction = useCoupGameStore((state) => state.pendingAction);
  const pendingBlock = useCoupGameStore((state) => state.pendingBlock);
  const waitingForChallenge = useCoupGameStore((state) => state.waitingForChallenge);
  const waitingForBlock = useCoupGameStore((state) => state.waitingForBlock);
  const waitingForResponse = useCoupGameStore((state) => state.waitingForResponse);
  const gameLog = useCoupGameStore((state) => state.gameLog);
  const getCurrentPlayer = useCoupGameStore((state) => state.getCurrentPlayer);
  const getAlivePlayers = useCoupGameStore((state) => state.getAlivePlayers);
  
  const [actionModalVisible, setActionModalVisible] = useState(false);
  const [challengeModalVisible, setChallengeModalVisible] = useState(false);
  
  const currentPlayer = getCurrentPlayer();
  const alivePlayers = getAlivePlayers();
  const opponents = players.filter(p => p.id !== currentPlayerId && !p.eliminated);
  
  // Mostrar modal de desafío/bloqueo cuando corresponda
  useEffect(() => {
    if (waitingForChallenge || waitingForBlock) {
      const isCurrentPlayerTurn = currentPlayerId && pendingAction && pendingAction.playerId === currentPlayerId;
      if (!isCurrentPlayerTurn) {
        setChallengeModalVisible(true);
      }
    } else {
      setChallengeModalVisible(false);
    }
  }, [waitingForChallenge, waitingForBlock, pendingAction, currentPlayerId]);
  
  // Detectar fin del juego
  useEffect(() => {
    if (gameStatus === 'finished') {
      const winner = alivePlayers[0];
      Alert.alert(
        '¡Juego Terminado!',
        winner ? `${winner.name} ha ganado la partida` : 'La partida ha terminado',
        [
          {
            text: 'Volver al inicio',
            onPress: () => {
              useCoupGameStore.getState().resetGame();
              navigation?.navigate('index');
            },
          },
        ]
      );
    }
  }, [gameStatus, alivePlayers]);
  
  const handleActionPress = () => {
    if (currentPlayer && currentPlayer.id === currentPlayerId && !waitingForChallenge && !waitingForBlock) {
      setActionModalVisible(true);
    }
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
  
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.gameTitle}>Coup</Text>
          {currentPlayer && (
            <Text style={styles.turnIndicator}>
              Turno de: {currentPlayer.name}
            </Text>
          )}
        </View>
        
        {/* Oponentes */}
        {opponents.length > 0 && (
          <View style={styles.opponentsSection}>
            <Text style={styles.sectionTitle}>Oponentes</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {opponents.map((opponent) => (
                <CoupOpponentView key={opponent.id} player={opponent} />
              ))}
            </ScrollView>
          </View>
        )}
        
        {/* Jugador actual */}
        {currentPlayer && (
          <View style={styles.currentPlayerSection}>
            <CoupPlayerHand player={currentPlayer} isCurrentPlayer={true} />
          </View>
        )}
        
        {/* Log del juego */}
        <CoupGameLog logs={gameLog} />
      </ScrollView>
      
      {/* Botón de acción (solo si es el turno del jugador actual) */}
      {currentPlayer && currentPlayer.id === currentPlayerId && !waitingForChallenge && !waitingForBlock && (
        <View style={styles.actionButtonContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={handleActionPress}
          >
            <Text style={styles.actionButtonText}>
              {currentPlayer.coins >= 10 ? 'Realizar Golpe de Estado (Obligatorio)' : 'Realizar Acción'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
      
      {/* Modal de acción */}
      {currentPlayer && (
        <CoupActionModal
          visible={actionModalVisible}
          onClose={() => setActionModalVisible(false)}
          player={currentPlayer}
        />
      )}
      
      {/* Modal de desafío/bloqueo */}
      <CoupChallengeModal
        visible={challengeModalVisible}
        onClose={() => setChallengeModalVisible(false)}
        currentPlayerId={currentPlayerId}
        pendingAction={pendingAction}
        pendingBlock={pendingBlock}
      />
      
      {/* Botón para volver */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => {
          Alert.alert(
            'Abandonar partida',
            '¿Estás seguro de que quieres abandonar la partida?',
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Abandonar',
                style: 'destructive',
                onPress: () => {
                  useCoupGameStore.getState().resetGame();
                  navigation?.navigate('index');
                },
              },
            ]
          );
        }}
      >
        <Text style={styles.backButtonText}>Abandonar</Text>
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
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  gameTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  turnIndicator: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  opponentsSection: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  currentPlayerSection: {
    marginBottom: 16,
  },
  actionButtonContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#f44336',
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
    color: '#666',
  },
});
