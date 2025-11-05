import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { DosVerdadesUnaMentiraStatementCard } from './DosVerdadesUnaMentiraStatementCard';

export const DosVerdadesUnaMentiraVotingView = ({
  statements,
  lieIndex,
  showRevelation = false,
  voteResults = null,
  playerVote = null,
  onVote,
  onSubmitVote,
  disabled = false,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(playerVote);

  const handleStatementPress = (index) => {
    if (disabled || showRevelation) return;
    setSelectedIndex(index);
    if (onVote) {
      onVote(index);
    }
  };

  const handleSubmit = () => {
    if (selectedIndex === null || selectedIndex === undefined) {
      Alert.alert('Selecciona una afirmación', 'Debes elegir cuál crees que es la mentira antes de votar.');
      return;
    }
    if (onSubmitVote) {
      onSubmitVote(selectedIndex);
    }
  };

  const getVoteCount = (index) => {
    if (!voteResults || !voteResults.statementVotes) return 0;
    return voteResults.statementVotes[index] || 0;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {showRevelation ? 'Resultados de la Votación' : 'Selecciona la Mentira'}
        </Text>
        {!showRevelation && (
          <Text style={styles.subtitle}>
            Toca la afirmación que crees que es falsa
          </Text>
        )}
      </View>

      {statements.map((statement, index) => {
        const isSelected = !showRevelation && selectedIndex === index;
        const isLie = index === lieIndex;
        const voteCount = showRevelation ? getVoteCount(index) : null;

        return (
          <View key={statement.id || index} style={styles.statementWrapper}>
            <DosVerdadesUnaMentiraStatementCard
              statement={statement}
              index={index}
              isSelected={isSelected}
              isLie={isLie}
              showRevelation={showRevelation}
              onPress={() => handleStatementPress(index)}
              disabled={disabled}
            />
            {showRevelation && voteCount !== null && (
              <View style={styles.voteCountContainer}>
                <Text style={styles.voteCountText}>
                  {voteCount} {voteCount === 1 ? 'voto' : 'votos'}
                </Text>
              </View>
            )}
          </View>
        );
      })}

      {!showRevelation && !disabled && (
        <TouchableOpacity
          style={[
            styles.submitButton,
            selectedIndex === null && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit}
          disabled={selectedIndex === null}
        >
          <Text style={styles.submitButtonText}>
            Confirmar Voto
          </Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statementWrapper: {
    marginBottom: 5,
  },
  voteCountContainer: {
    marginHorizontal: 10,
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    alignItems: 'center',
  },
  voteCountText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  submitButton: {
    backgroundColor: '#4caf50',
    margin: 20,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
