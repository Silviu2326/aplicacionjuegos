import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { Salem1692PlayerDisplay } from './Salem1692PlayerDisplay';

export const Salem1692NightPhaseModal = ({ 
  visible, 
  witches, 
  players, 
  currentPlayerId,
  conspiracyTarget,
  onSelectTarget,
  onEndNight,
}) => {
  const [selectedTarget, setSelectedTarget] = useState(null);
  
  const isWitch = witches.includes(currentPlayerId);
  const alivePlayers = players.filter(p => p.isAlive && p.id !== currentPlayerId);
  const canSelect = isWitch && !conspiracyTarget;
  
  const handleSelectTarget = (playerId) => {
    if (!canSelect) return;
    setSelectedTarget(playerId);
  };
  
  const handleConfirm = () => {
    if (!selectedTarget) {
      Alert.alert('Error', 'Debes seleccionar un objetivo para la Conspiración');
      return;
    }
    
    if (onSelectTarget) {
      onSelectTarget(selectedTarget);
      setSelectedTarget(null);
    }
  };
  
  if (!visible) return null;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Fase de Noche</Text>
          
          {isWitch ? (
            <>
              <Text style={styles.subtitle}>
                Eres una Bruja. Elige un objetivo para la carta de Conspiración.
              </Text>
              
              {conspiracyTarget ? (
                <View style={styles.confirmedContainer}>
                  <Text style={styles.confirmedText}>
                    Objetivo seleccionado: {
                      players.find(p => p.id === conspiracyTarget)?.name || 'Desconocido'
                    }
                  </Text>
                  <Text style={styles.waitingText}>
                    Esperando a que las demás brujas confirmen...
                  </Text>
                </View>
              ) : (
                <>
                  <ScrollView style={styles.playersList}>
                    {alivePlayers.map(player => (
                      <Salem1692PlayerDisplay
                        key={player.id}
                        player={player}
                        onPress={() => handleSelectTarget(player.id)}
                        isSelected={selectedTarget === player.id}
                      />
                    ))}
                  </ScrollView>
                  
                  <TouchableOpacity
                    style={[
                      styles.confirmButton,
                      !selectedTarget && styles.confirmButtonDisabled,
                    ]}
                    onPress={handleConfirm}
                    disabled={!selectedTarget}
                  >
                    <Text style={styles.confirmButtonText}>Confirmar Objetivo</Text>
                  </TouchableOpacity>
                </>
              )}
            </>
          ) : (
            <View style={styles.waitingContainer}>
              <Text style={styles.waitingText}>
                Es de noche. Las brujas están eligiendo su objetivo...
              </Text>
              <Text style={styles.waitingText}>
                Cierra los ojos y espera.
              </Text>
            </View>
          )}
          
          {!isWitch && (
            <TouchableOpacity
              style={styles.endNightButton}
              onPress={onEndNight}
            >
              <Text style={styles.endNightButtonText}>Continuar al Día</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#6a1b9a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
  },
  playersList: {
    maxHeight: 400,
    marginBottom: 16,
  },
  confirmedContainer: {
    padding: 20,
    backgroundColor: '#2d2d2d',
    borderRadius: 12,
    marginBottom: 16,
  },
  confirmedText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  waitingText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginTop: 12,
  },
  waitingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#6a1b9a',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 12,
  },
  confirmButtonDisabled: {
    backgroundColor: '#444',
    opacity: 0.5,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  endNightButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  endNightButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

