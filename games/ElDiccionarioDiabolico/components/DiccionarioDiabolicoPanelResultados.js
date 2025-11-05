import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';

export const DiccionarioDiabolicoPanelResultados = ({ navigation }) => {
  const roundResults = useDiccionarioDiabolicoStore((state) => state.roundResults);
  const currentWord = useDiccionarioDiabolicoStore((state) => state.currentWord);
  const players = useDiccionarioDiabolicoStore((state) => state.players);
  const currentRound = useDiccionarioDiabolicoStore((state) => state.currentRound);
  const maxRounds = useDiccionarioDiabolicoStore((state) => state.maxRounds);
  const nextRound = useDiccionarioDiabolicoStore((state) => state.nextRound);
  const gameStatus = useDiccionarioDiabolicoStore((state) => state.gameStatus);
  
  if (!roundResults || !currentWord) {
    return null;
  }
  
  const { correctDefinition, definitionAuthors, voteBreakdown, pointsEarned, votesForCorrect } = roundResults;
  
  // Ordenar jugadores por puntuación
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resultados de la Ronda</Text>
      </View>
      
      {/* Palabra */}
      <View style={styles.wordSection}>
        <Text style={styles.wordLabel}>Palabra:</Text>
        <Text style={styles.wordText}>{currentWord.palabra}</Text>
      </View>
      
      {/* Definición correcta */}
      <View style={styles.correctDefinitionSection}>
        <Text style={styles.correctLabel}>✓ Definición Correcta:</Text>
        <Text style={styles.correctText}>{correctDefinition?.text}</Text>
        <Text style={styles.votesInfo}>
          {votesForCorrect} jugador{votesForCorrect !== 1 ? 'es' : ''} acert{votesForCorrect !== 1 ? 'aron' : 'ó'}
        </Text>
      </View>
      
      {/* Autores de definiciones falsas */}
      <View style={styles.authorsSection}>
        <Text style={styles.sectionTitle}>Autores de las definiciones falsas:</Text>
        {Object.entries(definitionAuthors).map(([definitionId, authorName]) => {
          const votes = voteBreakdown[definitionId] || [];
          const definition = Object.keys(definitionAuthors).indexOf(definitionId);
          
          return (
            <View key={definitionId} style={styles.authorItem}>
              <Text style={styles.authorName}>
                {authorName}: {votes.length} voto{votes.length !== 1 ? 's' : ''}
              </Text>
              {votes.length > 0 && (
                <Text style={styles.votersList}>
                  Votaron: {votes.join(', ')}
                </Text>
              )}
            </View>
          );
        })}
      </View>
      
      {/* Puntos ganados en esta ronda */}
      <View style={styles.pointsSection}>
        <Text style={styles.sectionTitle}>Puntos ganados esta ronda:</Text>
        {players.map(player => {
          const points = pointsEarned[player.id] || 0;
          if (points === 0) return null;
          
          return (
            <View key={player.id} style={styles.pointsItem}>
              <Text style={styles.playerName}>{player.name}:</Text>
              <Text style={styles.pointsText}>+{points} puntos</Text>
            </View>
          );
        })}
      </View>
      
      {/* Tabla de puntuaciones */}
      <View style={styles.scoreboardSection}>
        <Text style={styles.sectionTitle}>Puntuaciones Totales:</Text>
        {sortedPlayers.map((player, index) => (
          <View
            key={player.id}
            style={[
              styles.scoreboardItem,
              index === 0 && styles.scoreboardItemFirst,
            ]}
          >
            <View style={styles.rankContainer}>
              <Text style={styles.rank}>#{index + 1}</Text>
            </View>
            <View style={styles.playerInfo}>
              <Text style={styles.scoreboardPlayerName}>{player.name}</Text>
            </View>
            <Text style={styles.scoreboardScore}>{player.score}</Text>
          </View>
        ))}
      </View>
      
      {currentRound < maxRounds && (
        <TouchableOpacity
          style={styles.nextRoundButton}
          onPress={() => {
            const success = nextRound();
            if (success && navigation) {
              // El store cambiará el estado a 'writing', lo que activará la navegación
            }
          }}
        >
          <Text style={styles.nextRoundButtonText}>Siguiente Ronda</Text>
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
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  wordSection: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6200ee',
  },
  wordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  wordText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  correctDefinitionSection: {
    backgroundColor: '#d4edda',
    padding: 16,
    margin: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#28a745',
  },
  correctLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#155724',
    marginBottom: 12,
  },
  correctText: {
    fontSize: 16,
    color: '#155724',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  votesInfo: {
    fontSize: 14,
    color: '#155724',
  },
  authorsSection: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  authorItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  authorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  votersList: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  pointsSection: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    marginTop: 0,
    borderRadius: 12,
  },
  pointsItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#28a745',
  },
  scoreboardSection: {
    backgroundColor: '#fff',
    padding: 16,
    margin: 16,
    marginTop: 0,
    marginBottom: 32,
    borderRadius: 12,
  },
  scoreboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scoreboardItemFirst: {
    backgroundColor: '#fff3cd',
    borderRadius: 8,
    marginBottom: 8,
  },
  rankContainer: {
    width: 40,
    alignItems: 'center',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  scoreboardPlayerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreboardScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6200ee',
  },
  nextRoundButton: {
    backgroundColor: '#6200ee',
    padding: 20,
    margin: 16,
    marginBottom: 32,
    borderRadius: 12,
    alignItems: 'center',
  },
  nextRoundButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
