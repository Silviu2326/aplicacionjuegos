import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';

export const SecretHitlerVoteView = ({ visible, onClose, playerId }) => {
  const castVote = useSecretHitlerStore((state) => state.castVote);
  const presidentId = useSecretHitlerStore((state) => state.presidentId);
  const chancellorCandidateId = useSecretHitlerStore((state) => state.chancellorCandidateId);
  const players = useSecretHitlerStore((state) => state.players);
  const votes = useSecretHitlerStore((state) => state.votes);

  const president = players.find((p) => p.id === presidentId);
  const chancellorCandidate = players.find((p) => p.id === chancellorCandidateId);
  const hasVoted = votes[playerId] !== undefined;

  const handleVote = (vote) => {
    if (!hasVoted && castVote(playerId, vote)) {
      onClose();
    }
  };

  if (!visible || !president || !chancellorCandidate) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Votación del Gobierno</Text>
          <View style={styles.governmentInfo}>
            <Text style={styles.label}>Presidente:</Text>
            <Text style={styles.value}>{president.name}</Text>
            <Text style={styles.label}>Canciller:</Text>
            <Text style={styles.value}>{chancellorCandidate.name}</Text>
          </View>
          {hasVoted ? (
            <View style={styles.votedContainer}>
              <Text style={styles.votedText}>
                Ya has votado: {votes[playerId] === 'ja' ? 'Ja!' : 'Nein!'}
              </Text>
            </View>
          ) : (
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={[styles.voteButton, styles.jaButton]}
                onPress={() => handleVote('ja')}
              >
                <Text style={styles.buttonText}>Ja!</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.voteButton, styles.neinButton]}
                onPress={() => handleVote('nein')}
              >
                <Text style={styles.buttonText}>Nein!</Text>
              </TouchableOpacity>
            </View>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
    maxWidth: 400,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  governmentInfo: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  value: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  voteButton: {
    flex: 1,
    padding: 20,
    margin: 8,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jaButton: {
    backgroundColor: '#4CAF50',
  },
  neinButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  votedContainer: {
    padding: 16,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    marginBottom: 16,
  },
  votedText: {
    fontSize: 16,
    color: '#1976D2',
    fontWeight: '600',
  },
  closeButton: {
    padding: 12,
    paddingHorizontal: 24,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  closeButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
});
