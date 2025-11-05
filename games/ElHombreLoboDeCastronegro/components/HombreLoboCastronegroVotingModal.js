import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';

export const HombreLoboCastronegroVotingModal = ({ 
  visible, 
  players, 
  currentPlayerId, 
  onVote, 
  onClose,
  title = 'Votación',
  subtitle = 'Selecciona al jugador que quieres votar',
}) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handleVote = () => {
    if (selectedPlayer && onVote) {
      onVote(selectedPlayer.id);
      setSelectedPlayer(null);
      if (onClose) onClose();
    }
  };

  const alivePlayers = players.filter((p) => p.isAlive && !p.isDead && p.id !== currentPlayerId);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
          
          <ScrollView style={styles.playerList}>
            {alivePlayers.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={[
                  styles.playerOption,
                  selectedPlayer?.id === player.id && styles.playerOptionSelected,
                ]}
                onPress={() => setSelectedPlayer(player)}
              >
                <View
                  style={[
                    styles.playerAvatar,
                    { backgroundColor: player.color },
                  ]}
                >
                  <Text style={styles.playerInitial}>
                    {player.name?.charAt(0).toUpperCase() || '?'}
                  </Text>
                </View>
                <Text style={styles.playerName}>{player.name}</Text>
                {selectedPlayer?.id === player.id && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.voteButton, !selectedPlayer && styles.buttonDisabled]}
              onPress={handleVote}
              disabled={!selectedPlayer}
            >
              <Text style={styles.buttonText}>Votar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#1a1a2e',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 20,
    textAlign: 'center',
  },
  playerList: {
    maxHeight: 400,
  },
  playerOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  playerOptionSelected: {
    borderColor: '#4caf50',
    backgroundColor: '#1e3a2e',
  },
  playerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  playerInitial: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  playerName: {
    flex: 1,
    fontSize: 18,
    color: '#fff',
  },
  checkmark: {
    fontSize: 24,
    color: '#4caf50',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#666',
  },
  voteButton: {
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

