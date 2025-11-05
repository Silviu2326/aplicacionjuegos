import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';

export const DiccionarioFalsoRoundResults = () => {
  const roundResults = useDiccionarioFalsoStore((state) => state.roundResults);
  const currentWord = useDiccionarioFalsoStore((state) => state.currentWord);
  const players = useDiccionarioFalsoStore((state) => state.players);
  const currentDefinitions = useDiccionarioFalsoStore((state) => state.currentDefinitions);
  
  if (!roundResults || !currentWord) {
    return null;
  }
  
  const getPlayerName = (playerId) => {
    if (playerId === 'system') return 'Sistema (Definición Real)';
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Desconocido';
  };
  
  // Calcular estadísticas de la ronda
  const totalVotes = Object.keys(roundResults.voteBreakdown).reduce(
    (sum, key) => sum + (roundResults.voteBreakdown[key]?.length || 0),
    0
  );
  const correctVotes = roundResults.votesForCorrect || 0;
  const correctPercentage = totalVotes > 0 
    ? Math.round((correctVotes / totalVotes) * 100) 
    : 0;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📊 Resultados de la Ronda</Text>
        <Text style={styles.subtitle}>
          {correctVotes} de {totalVotes} jugadores identificaron la definición correcta ({correctPercentage}%)
        </Text>
      </View>
      
      {/* Definición correcta destacada */}
      <View style={styles.correctDefinitionContainer}>
        <Text style={styles.correctLabel}>✓ DEFINICIÓN CORRECTA</Text>
        <Text style={styles.correctText}>{roundResults.correctDefinition.text}</Text>
      </View>
      
      {/* Desglose de votos */}
      <View style={styles.voteBreakdownContainer}>
        <Text style={styles.sectionTitle}>Desglose de votos</Text>
        {currentDefinitions.map((definition, index) => {
          const votes = roundResults.voteBreakdown[definition.id] || [];
          const author = roundResults.definitionAuthors[definition.id] || getPlayerName(definition.playerId);
          const isCorrect = definition.isReal;
          
          return (
            <View
              key={definition.id}
              style={[
                styles.definitionResultCard,
                isCorrect && styles.definitionResultCardCorrect,
              ]}
            >
              <View style={styles.definitionResultHeader}>
                <Text style={styles.definitionResultNumber}>Opción {index + 1}</Text>
                {isCorrect && (
                  <Text style={styles.correctBadge}>✓ CORRECTA</Text>
                )}
              </View>
              <Text style={styles.definitionResultText}>{definition.text}</Text>
              <View style={styles.definitionResultFooter}>
                <Text style={styles.definitionResultAuthor}>
                  {isCorrect ? 'Definición del diccionario' : `Por: ${author}`}
                </Text>
                <Text style={styles.definitionResultVotes}>
                  {votes.length} {votes.length === 1 ? 'voto' : 'votos'}
                </Text>
              </View>
              {votes.length > 0 && (
                <View style={styles.votersList}>
                  <Text style={styles.votersLabel}>Votaron:</Text>
                  <Text style={styles.votersText}>{votes.join(', ')}</Text>
                </View>
              )}
            </View>
          );
        })}
      </View>
      
      {/* Puntos ganados */}
      <View style={styles.pointsContainer}>
        <Text style={styles.sectionTitle}>Puntos ganados esta ronda</Text>
        {players.map((player) => {
          const points = roundResults.pointsEarned[player.id] || 0;
          return (
            <View key={player.id} style={styles.pointsCard}>
              <Text style={styles.pointsPlayerName}>{player.name}</Text>
              <Text style={[styles.pointsValue, points > 0 && styles.pointsValuePositive]}>
                {points > 0 ? '+' : ''}{points} {points === 1 ? 'punto' : 'puntos'}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
  correctDefinitionContainer: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 12,
    marginBottom: 24,
    borderWidth: 3,
    borderColor: '#2e7d32',
  },
  correctLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 1,
  },
  correctText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 26,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  voteBreakdownContainer: {
    marginBottom: 24,
  },
  definitionResultCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  definitionResultCardCorrect: {
    borderColor: '#4caf50',
    backgroundColor: '#e8f5e9',
  },
  definitionResultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  definitionResultNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  correctBadge: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#4caf50',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  definitionResultText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 12,
  },
  definitionResultFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  definitionResultAuthor: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  definitionResultVotes: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196f3',
  },
  votersList: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  votersLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
  votersText: {
    fontSize: 14,
    color: '#666',
  },
  pointsContainer: {
    marginBottom: 24,
  },
  pointsCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  pointsPlayerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  pointsValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  pointsValuePositive: {
    color: '#4caf50',
  },
});
