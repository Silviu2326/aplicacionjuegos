import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';
import { SecretHitlerBoard } from '../components/SecretHitlerBoard';
import { SecretHitlerPlayerList } from '../components/SecretHitlerPlayerList';
import { SecretHitlerVoteView } from '../components/SecretHitlerVoteView';
import { SecretHitlerPolicySelection } from '../components/SecretHitlerPolicySelection';
import { SecretHitlerRoleRevealModal } from '../components/SecretHitlerRoleRevealModal';
import { GAME_PHASES } from '../constants/SecretHitlerGameRules';

export const SecretHitlerGame = ({ navigation }) => {
  const players = useSecretHitlerStore((state) => state.players);
  const gamePhase = useSecretHitlerStore((state) => state.gamePhase);
  const gameStatus = useSecretHitlerStore((state) => state.gameStatus);
  const presidentId = useSecretHitlerStore((state) => state.presidentId);
  const chancellorId = useSecretHitlerStore((state) => state.chancellorId);
  const chancellorCandidateId = useSecretHitlerStore((state) => state.chancellorCandidateId);
  const proposeChancellor = useSecretHitlerStore((state) => state.proposeChancellor);
  const voteCount = useSecretHitlerStore((state) => state.voteCount);
  const gameLog = useSecretHitlerStore((state) => state.gameLog);
  const availableExecutivePower = useSecretHitlerStore((state) => state.availableExecutivePower);
  const useExecutivePower = useSecretHitlerStore((state) => state.useExecutivePower);
  const resetGame = useSecretHitlerStore((state) => state.resetGame);

  // Para desarrollo, usar el primer jugador como currentPlayerId
  const [currentPlayerId] = useState(players.length > 0 ? players[0].id : null);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [currentRoleRevealIndex, setCurrentRoleRevealIndex] = useState(0);

  // Manejar revelación de roles al inicio
  useEffect(() => {
    if (gameStatus === 'role_reveal' && players.length > 0 && currentRoleRevealIndex < players.length) {
      setShowRoleModal(true);
    }
  }, [gameStatus, players.length, currentRoleRevealIndex]);

  // Mostrar modal de votación cuando sea necesario
  useEffect(() => {
    if (gamePhase === GAME_PHASES.VOTING && currentPlayerId && !showVoteModal) {
      setShowVoteModal(true);
    }
  }, [gamePhase, currentPlayerId]);

  const handleRoleRevealClose = () => {
    if (currentRoleRevealIndex < players.length - 1) {
      setCurrentRoleRevealIndex(currentRoleRevealIndex + 1);
    } else {
      setShowRoleModal(false);
    }
  };

  const handleProposeChancellor = (chancellorId) => {
    if (proposeChancellor(chancellorId)) {
      // El modal de votación se mostrará automáticamente por el useEffect
    } else {
      Alert.alert('Error', 'No se puede proponer a ese jugador como Canciller');
    }
  };

  const handleUseExecutivePower = (targetId = null) => {
    if (availableExecutivePower === 'execution' && !targetId) {
      Alert.alert('Error', 'Debes seleccionar un jugador para ejecutar');
      return;
    }
    useExecutivePower(availableExecutivePower, targetId);
  };

  const handleReset = () => {
    Alert.alert(
      'Reiniciar Partida',
      '¿Estás seguro de que deseas reiniciar?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            resetGame();
            if (navigation && navigation.goBack) {
              navigation.goBack();
            }
          },
        },
      ]
    );
  };

  const currentPlayer = players.find((p) => p.id === currentPlayerId);
  const president = players.find((p) => p.id === presidentId);
  const chancellorCandidate = players.find((p) => p.id === chancellorCandidateId);

  if (gameStatus === 'game_over') {
    const lastLog = gameLog[gameLog.length - 1];
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.gameOverTitle}>¡Juego Terminado!</Text>
          <Text style={styles.gameOverMessage}>{lastLog?.message || 'El juego ha terminado'}</Text>
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Volver al Lobby</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <SecretHitlerBoard />

      {gamePhase === GAME_PHASES.ROLE_REVEAL && (
        <SecretHitlerRoleRevealModal
          visible={showRoleModal}
          onClose={handleRoleRevealClose}
          playerId={players[currentRoleRevealIndex]?.id}
        />
      )}

      {gamePhase === GAME_PHASES.GOVERNMENT_SELECTION && currentPlayerId === presidentId && (
        <View style={styles.governmentSelection}>
          <Text style={styles.sectionTitle}>Selecciona un Canciller</Text>
          <ScrollView horizontal>
            {players
              .filter((p) => !p.eliminated && p.id !== presidentId)
              .map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={styles.chancellorCandidate}
                  onPress={() => handleProposeChancellor(player.id)}
                >
                  <Text style={styles.candidateName}>{player.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}

      {gamePhase === GAME_PHASES.VOTING && (
        <View style={styles.votingInfo}>
          <Text style={styles.sectionTitle}>Votación en Curso</Text>
          <Text style={styles.votingDetails}>
            Presidente: {president?.name} | Canciller: {chancellorCandidate?.name}
          </Text>
          <Text style={styles.voteCount}>
            Ja: {voteCount.ja} | Nein: {voteCount.nein}
          </Text>
        </View>
      )}

      {gamePhase === GAME_PHASES.LEGISLATIVE_SESSION && (
        <SecretHitlerPolicySelection playerId={currentPlayerId} />
      )}

      {gamePhase === GAME_PHASES.EXECUTIVE_POWER && availableExecutivePower === 'execution' && currentPlayerId === presidentId && (
        <View style={styles.executivePower}>
          <Text style={styles.sectionTitle}>Poder Ejecutivo: Ejecución</Text>
          <Text style={styles.powerDescription}>
            Selecciona un jugador para ejecutar
          </Text>
          <ScrollView horizontal>
            {players
              .filter((p) => !p.eliminated && p.id !== presidentId && p.id !== chancellorId)
              .map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={[styles.chancellorCandidate, styles.executionButton]}
                  onPress={() => handleUseExecutivePower(player.id)}
                >
                  <Text style={styles.candidateName}>{player.name}</Text>
                </TouchableOpacity>
              ))}
          </ScrollView>
        </View>
      )}

      <SecretHitlerPlayerList currentPlayerId={currentPlayerId} />

      <SecretHitlerVoteView
        visible={showVoteModal}
        onClose={() => setShowVoteModal(false)}
        playerId={currentPlayerId}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
        <Text style={styles.resetButtonText}>Reiniciar Partida</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  gameOverTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  gameOverMessage: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  governmentSelection: {
    padding: 16,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 8,
  },
  votingInfo: {
    padding: 16,
    backgroundColor: '#E3F2FD',
    margin: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  votingDetails: {
    fontSize: 16,
    color: '#1976D2',
    marginBottom: 8,
  },
  voteCount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
  },
  chancellorCandidate: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    margin: 8,
    minWidth: 120,
    alignItems: 'center',
  },
  candidateName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  executivePower: {
    padding: 16,
    backgroundColor: '#FFEBEE',
    margin: 8,
    borderRadius: 8,
  },
  powerDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
  },
  executionButton: {
    backgroundColor: '#f44336',
  },
  resetButton: {
    backgroundColor: '#f44336',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
