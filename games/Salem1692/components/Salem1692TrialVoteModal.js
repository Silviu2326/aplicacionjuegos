import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Salem1692Card } from './Salem1692Card';

export const Salem1692TrialVoteModal = ({ 
  visible, 
  trial, 
  players, 
  currentPlayerId,
  onVote,
  canVote = true,
}) => {
  const [selectedVote, setSelectedVote] = useState(null);
  
  if (!visible || !trial.active) return null;
  
  const accusedPlayer = players.find(p => p.id === trial.accusedPlayerId);
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  const hasVoted = trial.votes[currentPlayerId] !== undefined;
  
  const handleVote = (vote) => {
    if (!canVote || hasVoted) return;
    setSelectedVote(vote);
    if (onVote) {
      onVote(vote);
      setSelectedVote(null);
    }
  };
  
  // Contar votos
  const saveVotes = Object.values(trial.votes).filter(v => v === 'save').length;
  const condemnVotes = Object.values(trial.votes).filter(v => v === 'condemn').length;
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {}}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <Text style={styles.title}>¡JUICIO!</Text>
          
          {accusedPlayer && (
            <View style={styles.accusedSection}>
              <Text style={styles.accusedName}>{accusedPlayer.name}</Text>
              <Text style={styles.accusedLabel}>está siendo juzgado</Text>
            </View>
          )}
          
          <View style={styles.trialCardsSection}>
            <Text style={styles.sectionTitle}>Cartas de Juicio Reveladas:</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {trial.revealedTrialCards.map((card, index) => (
                <Salem1692Card
                  key={index}
                  card={card}
                  size="medium"
                  isPlayable={false}
                />
              ))}
            </ScrollView>
          </View>
          
          {!hasVoted && canVote && (
            <View style={styles.voteSection}>
              <Text style={styles.voteTitle}>Tu Voto:</Text>
              <View style={styles.voteButtons}>
                <TouchableOpacity
                  style={[
                    styles.voteButton,
                    styles.saveButton,
                    selectedVote === 'save' && styles.voteButtonSelected,
                  ]}
                  onPress={() => handleVote('save')}
                >
                  <Text style={styles.voteButtonText}>💚 Salvar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[
                    styles.voteButton,
                    styles.condemnButton,
                    selectedVote === 'condemn' && styles.voteButtonSelected,
                  ]}
                  onPress={() => handleVote('condemn')}
                >
                  <Text style={styles.voteButtonText}>💀 Condenar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          
          {hasVoted && (
            <View style={styles.votedSection}>
              <Text style={styles.votedText}>
                Ya has votado: {trial.votes[currentPlayerId] === 'save' ? '💚 Salvar' : '💀 Condenar'}
              </Text>
            </View>
          )}
          
          {trial.votingComplete && (
            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>Resultados de la Votación:</Text>
              <Text style={styles.resultsText}>
                Salvar: {saveVotes} | Condenar: {condemnVotes}
              </Text>
              <Text style={styles.resultsVerdict}>
                {condemnVotes > saveVotes 
                  ? '❌ Condenado' 
                  : '✅ Absuelto'}
              </Text>
            </View>
          )}
          
          {!trial.votingComplete && (
            <View style={styles.votingProgress}>
              <Text style={styles.progressText}>
                Votos recibidos: {Object.keys(trial.votes).length} / {players.filter(p => p.isAlive).length}
              </Text>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '90%',
    maxHeight: '90%',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#d32f2f',
    textAlign: 'center',
    marginBottom: 20,
  },
  accusedSection: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#ffebee',
    borderRadius: 12,
  },
  accusedName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c62828',
  },
  accusedLabel: {
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  trialCardsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  voteSection: {
    marginBottom: 20,
  },
  voteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
    textAlign: 'center',
  },
  voteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  voteButton: {
    flex: 1,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 8,
    borderWidth: 3,
    borderColor: 'transparent',
  },
  saveButton: {
    backgroundColor: '#c8e6c9',
  },
  condemnButton: {
    backgroundColor: '#ffcdd2',
  },
  voteButtonSelected: {
    borderColor: '#333',
    transform: [{ scale: 1.05 }],
  },
  voteButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  votedSection: {
    padding: 16,
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    marginBottom: 20,
  },
  votedText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1976d2',
  },
  resultsSection: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    marginTop: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  resultsText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    color: '#666',
  },
  resultsVerdict: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  votingProgress: {
    padding: 12,
    backgroundColor: '#fff3e0',
    borderRadius: 8,
    marginTop: 16,
  },
  progressText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#e65100',
    fontWeight: '600',
  },
});

