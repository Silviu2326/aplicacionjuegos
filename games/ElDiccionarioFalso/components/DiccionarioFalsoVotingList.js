import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoVotingList = ({ playerId }) => {
  const currentDefinitions = useDiccionarioFalsoStore((state) => state.currentDefinitions);
  const votes = useDiccionarioFalsoStore((state) => state.votes);
  const voteForDefinition = useDiccionarioFalsoStore((state) => state.voteForDefinition);
  const hasPlayerVoted = useDiccionarioFalsoStore((state) => state.hasPlayerVoted);
  
  const playerVote = votes[playerId];
  const hasVoted = hasPlayerVoted(playerId);
  
  const handleVote = (definitionId) => {
    // Verificar si es tu propia definición
    const definition = currentDefinitions.find(d => d.id === definitionId);
    if (definition && definition.playerId === playerId) {
      Alert.alert('No permitido', 'No puedes votar por tu propia definición');
      return;
    }
    
    const success = voteForDefinition(playerId, definitionId);
    if (!success) {
      Alert.alert('Error', 'No se pudo registrar tu voto. Verifica que no hayas votado ya.');
    }
  };
  
  if (currentDefinitions.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No hay definiciones para votar</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Vota por la definición correcta</Text>
        {hasVoted && (
          <Text style={styles.votedIndicator}>✓ Ya votaste</Text>
        )}
      </View>
      
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>📋 Instrucciones de votación</Text>
        <Text style={styles.instructionsText}>
          Lee todas las definiciones cuidadosamente y elige la que creas que es la correcta.
          {'\n\n'}• Recuerda que no puedes votar por tu propia definición
          {'\n'}• Ganarás 2 puntos si votas correctamente
          {'\n'}• Cada voto que reciba tu definición falsa te dará 1 punto adicional
        </Text>
      </View>
      
      {currentDefinitions.map((definition, index) => {
        const isVoted = playerVote === definition.id;
        const isMyDefinition = definition.playerId === playerId;
        const isDisabled = hasVoted || isMyDefinition;
        
        return (
          <TouchableOpacity
            key={definition.id}
            style={[
              styles.definitionCard,
              isVoted && styles.definitionCardVoted,
              isDisabled && !isVoted && styles.definitionCardDisabled,
            ]}
            onPress={() => handleVote(definition.id)}
            disabled={isDisabled}
          >
            <View style={styles.definitionHeader}>
              <Text style={styles.definitionNumber}>Opción {index + 1}</Text>
              {isVoted && (
                <Text style={styles.votedBadge}>✓ Tu voto</Text>
              )}
              {isMyDefinition && (
                <Text style={styles.myDefinitionBadge}>Tu definición</Text>
              )}
            </View>
            <Text style={styles.definitionText}>{definition.text}</Text>
            {isVoted && (
              <View style={styles.voteConfirmation}>
                <Text style={styles.voteConfirmationText}>✓ Votaste por esta opción</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  votedIndicator: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: '#e3f2fd',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#1976d2',
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: '#1976d2',
    lineHeight: 22,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 40,
  },
  definitionCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  definitionCardVoted: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  definitionCardDisabled: {
    opacity: 0.6,
    backgroundColor: '#f5f5f5',
  },
  definitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  definitionNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  votedBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4caf50',
    backgroundColor: '#c8e6c9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  myDefinitionBadge: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ff9800',
    backgroundColor: '#ffe0b2',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  definitionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  voteConfirmation: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#4caf50',
  },
  voteConfirmationText: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
  },
});
