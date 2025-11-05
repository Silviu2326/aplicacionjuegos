import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';

export const DosVerdadesTurnResultModal = ({
  visible,
  statements,
  lieIndex,
  voteResults,
  players,
  narrator,
  onClose,
}) => {
  if (!visible || !statements || lieIndex === null) return null;

  const lieStatement = statements[lieIndex];
  const correctGuesses = voteResults?.correctGuesses || [];
  const correctPlayers = players.filter(p => correctGuesses.includes(p.id));
  const narratorPoints = players.find(p => p.id === narrator?.id)?.score || 0;

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <ScrollView style={styles.scrollView}>
            <View style={styles.header}>
              <Text style={styles.title}>¡Resultados del Turno!</Text>
              {narrator && (
                <Text style={styles.narratorName}>Narrador: {narrator.name}</Text>
              )}
            </View>

            <View style={styles.lieSection}>
              <Text style={styles.lieLabel}>La mentira era:</Text>
              <View style={styles.lieCard}>
                <Text style={styles.lieText}>{lieStatement.text}</Text>
              </View>
            </View>

            <View style={styles.resultsSection}>
              <Text style={styles.resultsTitle}>Puntuación del Turno</Text>
              
              {correctPlayers.length > 0 ? (
                <View style={styles.correctSection}>
                  <Text style={styles.correctTitle}>
                    ✅ {correctPlayers.length} jugador{correctPlayers.length !== 1 ? 'es' : ''} adivinó correctamente:
                  </Text>
                  {correctPlayers.map(player => (
                    <Text key={player.id} style={styles.playerName}>
                      • {player.name} (+1 punto)
                    </Text>
                  ))}
                </View>
              ) : (
                <View style={styles.noCorrectSection}>
                  <Text style={styles.noCorrectText}>
                    ❌ Nadie adivinó la mentira
                  </Text>
                </View>
              )}

              {narrator && (
                <View style={styles.narratorSection}>
                  <Text style={styles.narratorScoreText}>
                    {narrator.name} engañó a {players.length - 1 - correctPlayers.length} jugador{players.length - 1 - correctPlayers.length !== 1 ? 'es' : ''}
                  </Text>
                  <Text style={styles.narratorPointsText}>
                    Puntuación total: {narratorPoints} puntos
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.voteBreakdown}>
              <Text style={styles.voteBreakdownTitle}>Distribución de votos:</Text>
              {statements.map((statement, index) => {
                const voteCount = voteResults?.statementVotes?.[index] || 0;
                const isLie = index === lieIndex;
                return (
                  <View key={statement.id || index} style={styles.voteItem}>
                    <Text style={styles.voteItemText}>
                      Afirmación {index + 1}: {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
                      {isLie && ' ❌ MENTIRA'}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={onClose}
          >
            <Text style={styles.closeButtonText}>Continuar</Text>
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
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  narratorName: {
    fontSize: 16,
    color: '#666',
  },
  lieSection: {
    marginBottom: 20,
  },
  lieLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f44336',
    marginBottom: 10,
  },
  lieCard: {
    backgroundColor: '#ffebee',
    borderWidth: 3,
    borderColor: '#f44336',
    borderRadius: 12,
    padding: 15,
  },
  lieText: {
    fontSize: 16,
    color: '#c62828',
    fontWeight: '600',
    lineHeight: 22,
  },
  resultsSection: {
    marginBottom: 20,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  correctSection: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  correctTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 10,
  },
  playerName: {
    fontSize: 15,
    color: '#333',
    marginLeft: 10,
    marginBottom: 5,
  },
  noCorrectSection: {
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  noCorrectText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e65100',
    textAlign: 'center',
  },
  narratorSection: {
    backgroundColor: '#fff9e6',
    borderRadius: 12,
    padding: 15,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  narratorScoreText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  narratorPointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8c00',
  },
  voteBreakdown: {
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
  },
  voteBreakdownTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  voteItem: {
    marginBottom: 8,
  },
  voteItemText: {
    fontSize: 14,
    color: '#666',
  },
  closeButton: {
    backgroundColor: '#4caf50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

