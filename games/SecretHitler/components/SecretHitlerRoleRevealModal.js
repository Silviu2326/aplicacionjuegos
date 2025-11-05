import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';

export const SecretHitlerRoleRevealModal = ({ visible, onClose, playerId }) => {
  const players = useSecretHitlerStore((state) => state.players);
  const completeRoleReveal = useSecretHitlerStore((state) => state.completeRoleReveal);

  const player = players.find((p) => p.id === playerId);

  if (!visible || !player || !player.role) {
    return null;
  }

  const { role, team, isHitler } = player;

  // Los fascistas (excepto Hitler) conocen a otros fascistas
  const fascistTeammates = isHitler || role === 'fascist'
    ? players.filter((p) => p.team === 'fascist' && p.id !== playerId)
    : [];

  const getRoleDisplayName = () => {
    if (isHitler) return 'Hitler';
    if (role === 'fascist') return 'Fascista';
    return 'Liberal';
  };

  const getTeamColor = () => {
    if (team === 'fascist') return '#f44336';
    return '#2196F3';
  };

  const handleContinue = () => {
    if (playerId === players[players.length - 1].id) {
      // Si es el último jugador, iniciar el juego
      completeRoleReveal();
    }
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.playerName}>{player.name}</Text>
          <View
            style={[
              styles.roleCard,
              { backgroundColor: getTeamColor() },
            ]}
          >
            <Text style={styles.roleTitle}>Tu rol es:</Text>
            <Text style={styles.roleName}>{getRoleDisplayName()}</Text>
            <Text style={styles.teamName}>
              Equipo: {team === 'fascist' ? 'Fascista' : 'Liberal'}
            </Text>
          </View>

          {isHitler && (
            <View style={styles.hitlerInfo}>
              <Text style={styles.hitlerWarning}>
                ⚠️ Si eres elegido Canciller después de que se promulguen 3 políticas
                fascistas, los Fascistas ganan inmediatamente.
              </Text>
            </View>
          )}

          {role === 'fascist' && fascistTeammates.length > 0 && (
            <View style={styles.teammatesContainer}>
              <Text style={styles.teammatesTitle}>Tus compañeros fascistas:</Text>
              {fascistTeammates.map((teammate) => (
                <Text key={teammate.id} style={styles.teammateName}>
                  • {teammate.name}
                  {teammate.isHitler && ' (Hitler)'}
                </Text>
              ))}
            </View>
          )}

          {role === 'liberal' && (
            <View style={styles.liberalInfo}>
              <Text style={styles.liberalText}>
                Tu objetivo es promulgar 5 políticas liberales o ejecutar a Hitler.
              </Text>
            </View>
          )}

          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    maxWidth: 400,
    alignItems: 'center',
  },
  playerName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  roleCard: {
    width: '100%',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  roleTitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  roleName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  teamName: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
  },
  hitlerInfo: {
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  hitlerWarning: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  teammatesContainer: {
    backgroundColor: '#F8D7DA',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  teammatesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#721C24',
    marginBottom: 8,
  },
  teammateName: {
    fontSize: 14,
    color: '#721C24',
    marginVertical: 4,
  },
  liberalInfo: {
    backgroundColor: '#D1ECF1',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
  },
  liberalText: {
    fontSize: 14,
    color: '#0C5460',
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 8,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
