import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ACTIONS, ACTION_INFO, GAME_CONFIG } from '../constants/CoupActions';
import { useCoupGameStore } from '../store/coupGameStore';

export const CoupActionModal = ({ visible, onClose, player }) => {
  const declareAction = useCoupGameStore((state) => state.declareAction);
  const [selectedTarget, setSelectedTarget] = useState(null);
  const alivePlayers = useCoupGameStore((state) => state.getAlivePlayers());
  const waitingForTarget = useCoupGameStore((state) => state.waitingForTarget);
  const pendingAction = useCoupGameStore((state) => state.pendingAction);
  
  if (!player) return null;
  
  const handleAction = (action) => {
    const actionInfo = ACTION_INFO[action];
    
    if (actionInfo.targetRequired) {
      // Si necesita objetivo, mostrar selección de objetivos
      if (!selectedTarget) {
        // Mantener el modal abierto para seleccionar objetivo
        return;
      }
      declareAction(action, selectedTarget.id);
      setSelectedTarget(null);
    } else {
      declareAction(action);
    }
    
    if (!waitingForTarget) {
      onClose();
    }
  };
  
  const handleTargetSelect = (targetPlayer) => {
    setSelectedTarget(targetPlayer);
    if (pendingAction) {
      declareAction(pendingAction.action, targetPlayer.id);
      setSelectedTarget(null);
      onClose();
    }
  };
  
  const availableActions = Object.values(ACTIONS).filter(action => {
    const actionInfo = ACTION_INFO[action];
    
    // Si tiene 10+ monedas, solo puede hacer Coup
    if (player.coins >= GAME_CONFIG.MANDATORY_COUP_COINS && action !== ACTIONS.COUP) {
      return false;
    }
    
    // Verificar si tiene suficiente dinero para acciones que requieren coste
    if (actionInfo.cost > 0 && player.coins < actionInfo.cost) {
      return false;
    }
    
    return true;
  });
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Selecciona una Acción</Text>
          
          {waitingForTarget && !selectedTarget ? (
            <View>
              <Text style={styles.subtitle}>Selecciona un objetivo:</Text>
              <ScrollView style={styles.targetsList}>
                {alivePlayers
                  .filter(p => p.id !== player.id)
                  .map(targetPlayer => (
                    <TouchableOpacity
                      key={targetPlayer.id}
                      style={styles.targetButton}
                      onPress={() => handleTargetSelect(targetPlayer)}
                    >
                      <Text style={styles.targetName}>{targetPlayer.name}</Text>
                      <Text style={styles.targetInfo}>
                        💰 {targetPlayer.coins} | Influencias: {targetPlayer.influence.filter(inf => !inf.revealed).length}
                      </Text>
                    </TouchableOpacity>
                  ))}
              </ScrollView>
            </View>
          ) : (
            <ScrollView style={styles.actionsList}>
              {availableActions.map(action => {
                const actionInfo = ACTION_INFO[action];
                const canAfford = actionInfo.cost === 0 || player.coins >= actionInfo.cost;
                const needsTarget = actionInfo.targetRequired;
                
                return (
                  <TouchableOpacity
                    key={action}
                    style={[
                      styles.actionButton,
                      !canAfford && styles.actionButtonDisabled,
                    ]}
                    onPress={() => {
                      if (needsTarget && !selectedTarget) {
                        // Mantener modal abierto para seleccionar objetivo
                        setSelectedTarget(null);
                        declareAction(action);
                      } else {
                        handleAction(action);
                      }
                    }}
                    disabled={!canAfford}
                  >
                    <Text style={styles.actionName}>{actionInfo.name}</Text>
                    <Text style={styles.actionDescription}>
                      {actionInfo.description}
                    </Text>
                    {actionInfo.cost > 0 && (
                      <Text style={styles.actionCost}>
                        Coste: {actionInfo.cost} monedas
                      </Text>
                    )}
                    {needsTarget && (
                      <Text style={styles.actionNote}>Requiere objetivo</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          )}
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
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
    width: '90%',
    maxHeight: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#666',
  },
  actionsList: {
    maxHeight: 400,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  actionButtonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  actionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  actionDescription: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  actionCost: {
    fontSize: 11,
    color: '#fff',
    fontStyle: 'italic',
  },
  actionNote: {
    fontSize: 11,
    color: '#fff',
    marginTop: 4,
  },
  targetsList: {
    maxHeight: 300,
  },
  targetButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  targetName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  targetInfo: {
    fontSize: 12,
    color: '#fff',
  },
  closeButton: {
    backgroundColor: '#f44336',
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
