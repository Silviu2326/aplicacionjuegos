import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import { ROLES } from '../constants/hombreLoboCastronegroRoles';
import { ROLE_ACTION_MESSAGES } from '../constants/hombreLoboCastronegroPhases';

export const HombreLoboCastronegroNightActionOverlay = ({
  visible,
  roleId,
  players,
  currentPlayerId,
  onAction,
  onSkip,
  message,
  nightPhase,
  nightVictim,
}) => {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const roleKey = roleId ? roleId.toUpperCase().replace(/-/g, '_') : null;
  const role = roleKey ? ROLES[roleKey] : null;

  const handleConfirm = () => {
    if (onAction && selectedTarget) {
      onAction(selectedTarget.id);
      setSelectedTarget(null);
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    }
  };

  const getActionMessage = () => {
    if (message) return message;
    if (roleId === 'hombre_lobo') {
      return ROLE_ACTION_MESSAGES.HOMBRE_LOBO;
    }
    if (roleId === 'vidente') {
      return ROLE_ACTION_MESSAGES.VIDENTE;
    }
    if (roleId === 'bruja') {
      if (nightVictim) {
        const victimPlayer = players.find(p => p.id === nightVictim);
        return ROLE_ACTION_MESSAGES.BRUJA_SAVE.replace('{victim}', victimPlayer?.name || 'Alguien');
      }
      return ROLE_ACTION_MESSAGES.BRUJA_KILL;
    }
    return 'Realiza tu acción nocturna.';
  };

  const availableTargets = players.filter((p) => {
    if (p.id === currentPlayerId) return false;
    if (roleId === 'hombre_lobo') {
      // Los lobos pueden elegir a cualquiera excepto a otros lobos
      return p.isAlive && p.roleId !== 'hombre_lobo';
    }
    return p.isAlive && !p.isDead;
  });

  const needsTarget = role?.nightAction && role.nightActionType !== 'kill';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={handleSkip}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>Fase de Noche</Text>
          <Text style={styles.message}>{getActionMessage()}</Text>
          
          {needsTarget && (
            <ScrollView style={styles.targetList}>
              {availableTargets.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={[
                    styles.targetOption,
                    selectedTarget?.id === player.id && styles.targetOptionSelected,
                  ]}
                  onPress={() => setSelectedTarget(player)}
                >
                  <View style={[styles.targetAvatar, { backgroundColor: player.color }]}>
                    <Text style={styles.targetInitial}>
                      {player.name?.charAt(0).toUpperCase() || '?'}
                    </Text>
                  </View>
                  <Text style={styles.targetName}>{player.name}</Text>
                  {selectedTarget?.id === player.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}

          {roleId === 'hombre_lobo' && (
            <View style={styles.wolvesInfo}>
              <Text style={styles.wolvesTitle}>Otros Hombres Lobo:</Text>
              {players
                .filter((p) => p.roleId === 'hombre_lobo' && p.id !== currentPlayerId)
                .map((wolf) => (
                  <Text key={wolf.id} style={styles.wolfName}>
                    • {wolf.name}
                  </Text>
                ))}
            </View>
          )}

          <View style={styles.buttonContainer}>
            {needsTarget ? (
              <>
                <TouchableOpacity
                  style={[styles.button, styles.skipButton]}
                  onPress={handleSkip}
                >
                  <Text style={styles.buttonText}>Pasar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    styles.confirmButton,
                    !selectedTarget && styles.buttonDisabled,
                  ]}
                  onPress={handleConfirm}
                  disabled={!selectedTarget}
                >
                  <Text style={styles.buttonText}>Confirmar</Text>
                </TouchableOpacity>
              </>
            ) : (
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleSkip}
              >
                <Text style={styles.buttonText}>Continuar</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  container: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    padding: 20,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  message: {
    fontSize: 18,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 26,
  },
  targetList: {
    maxHeight: 300,
    marginBottom: 20,
  },
  targetOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  targetOptionSelected: {
    borderColor: '#4caf50',
    backgroundColor: '#1e3a2e',
  },
  targetAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  targetInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  targetName: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  checkmark: {
    fontSize: 24,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  wolvesInfo: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  wolvesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 10,
  },
  wolfName: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 10,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  skipButton: {
    backgroundColor: '#666',
  },
  confirmButton: {
    backgroundColor: '#4caf50',
  },
  buttonDisabled: {
    backgroundColor: '#333',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

