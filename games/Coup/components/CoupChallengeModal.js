import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { ACTION_INFO, ACTIONS } from '../constants/CoupActions';
import { CHARACTER_INFO, COUP_CHARACTERS } from '../constants/CoupCharacters';
import { useCoupGameStore } from '../store/coupGameStore';

export const CoupChallengeModal = ({ visible, onClose, currentPlayerId, pendingAction, pendingBlock }) => {
  const challenge = useCoupGameStore((state) => state.challenge);
  const challengeBlock = useCoupGameStore((state) => state.challengeBlock);
  const block = useCoupGameStore((state) => state.block);
  const pass = useCoupGameStore((state) => state.pass);
  const players = useCoupGameStore((state) => state.players);
  const waitingForChallenge = useCoupGameStore((state) => state.waitingForChallenge);
  const waitingForBlock = useCoupGameStore((state) => state.waitingForBlock);
  
  if (!visible || !currentPlayerId) return null;
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  if (!currentPlayer) return null;
  
  const handleChallenge = () => {
    if (pendingBlock) {
      challengeBlock(currentPlayerId);
    } else if (pendingAction) {
      challenge(currentPlayerId);
    }
    onClose();
  };
  
  const handleBlock = (character) => {
    if (pendingAction && pendingAction.targetId === currentPlayerId) {
      block(currentPlayerId, character);
    }
    // No cerrar el modal, puede ser desafiado
  };
  
  const handlePass = () => {
    pass();
    onClose();
  };
  
  // Si hay un bloqueo pendiente, mostrar opciones de desafiar bloqueo o pasar
  if (pendingBlock) {
    const blocker = players.find(p => p.id === pendingBlock.playerId);
    const actionInfo = pendingAction ? ACTION_INFO[pendingAction.action] : null;
    const blockCharacter = CHARACTER_INFO[pendingBlock.character];
    
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Bloqueo Declarado</Text>
            <Text style={styles.message}>
              {blocker?.name} declara {blockCharacter?.name} para bloquear {actionInfo?.name}
            </Text>
            <Text style={styles.question}>¿Qué quieres hacer?</Text>
            
            {waitingForChallenge && (
              <TouchableOpacity style={styles.challengeButton} onPress={handleChallenge}>
                <Text style={styles.buttonText}>Desafiar Bloqueo</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity style={styles.passButton} onPress={handlePass}>
              <Text style={styles.buttonText}>Pasar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  
  // Si hay una acción pendiente
  if (pendingAction) {
    const actionInfo = ACTION_INFO[pendingAction.action];
    const actionPlayer = players.find(p => p.id === pendingAction.playerId);
    const isTarget = pendingAction.targetId === currentPlayerId;
    const canBlock = actionInfo.canBeBlocked && isTarget;
    
    // Determinar qué personajes pueden bloquear
    const blockableCharacters = canBlock && actionInfo.blockableBy
      ? actionInfo.blockableBy.map(charKey => ({
          key: charKey,
          ...CHARACTER_INFO[charKey],
        }))
      : [];
    
    return (
      <Modal
        visible={visible}
        transparent
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Acción Declarada</Text>
            <Text style={styles.message}>
              {actionPlayer?.name} declara {actionInfo.name}
              {pendingAction.targetId && (
                ` a ${players.find(p => p.id === pendingAction.targetId)?.name}`
              )}
            </Text>
            <Text style={styles.question}>¿Qué quieres hacer?</Text>
            
            {waitingForChallenge && (
              <TouchableOpacity style={styles.challengeButton} onPress={handleChallenge}>
                <Text style={styles.buttonText}>Desafiar</Text>
              </TouchableOpacity>
            )}
            
            {canBlock && waitingForBlock && (
              <View style={styles.blockOptions}>
                <Text style={styles.blockTitle}>Bloquear con:</Text>
                {blockableCharacters.map(char => (
                  <TouchableOpacity
                    key={char.key}
                    style={styles.blockButton}
                    onPress={() => handleBlock(char.key)}
                  >
                    <Text style={styles.blockButtonText}>{char.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
            
            <TouchableOpacity style={styles.passButton} onPress={handlePass}>
              <Text style={styles.buttonText}>Pasar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }
  
  return null;
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    width: '85%',
    maxWidth: 400,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  message: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
    color: '#666',
  },
  question: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  challengeButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
  },
  blockOptions: {
    marginBottom: 12,
  },
  blockTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  blockButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  blockButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  passButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 14,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
