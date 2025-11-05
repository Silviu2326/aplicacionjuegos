import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';

export const DiccionarioDiabolicoListaVotacion = ({ playerId }) => {
  const currentDefinitions = useDiccionarioDiabolicoStore((state) => state.currentDefinitions);
  const votes = useDiccionarioDiabolicoStore((state) => state.votes);
  const voteForDefinition = useDiccionarioDiabolicoStore((state) => state.voteForDefinition);
  const hasPlayerVoted = useDiccionarioDiabolicoStore((state) => state.hasPlayerVoted);
  
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
      
      <Text style={styles.hint}>
        Lee todas las definiciones y elige la que creas que es la correcta.
        No puedes votar por tu propia definición.
      </Text>
      
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
      
      {hasVoted && (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>
            Esperando a que los demás jugadores voten...
          </Text>
        </View>
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
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  votedIndicator: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  hint: {
    padding: 16,
    backgroundColor: '#fff3cd',
    margin: 16,
    borderRadius: 8,
    color: '#856404',
    fontSize: 14,
    textAlign: 'center',
  },
  definitionCard: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 12,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  definitionCardVoted: {
    borderColor: '#28a745',
    backgroundColor: '#d4edda',
  },
  definitionCardDisabled: {
    opacity: 0.6,
    borderColor: '#ccc',
  },
  definitionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  definitionNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
  },
  votedBadge: {
    backgroundColor: '#28a745',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
  },
  myDefinitionBadge: {
    backgroundColor: '#ffc107',
    color: '#856404',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 'bold',
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
    borderTopColor: '#28a745',
  },
  voteConfirmationText: {
    color: '#28a745',
    fontWeight: 'bold',
    fontSize: 14,
  },
  waitingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  waitingText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    padding: 40,
  },
});
