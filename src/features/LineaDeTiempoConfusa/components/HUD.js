import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const LineaDeTiempoConfusaHUD = ({ score, lives, round, difficulty, onDifficultyChange }) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Puntuación</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Ronda</Text>
          <Text style={styles.statValue}>{round}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Vidas</Text>
          <View style={styles.livesContainer}>
            {[...Array(3)].map((_, index) => (
              <Text
                key={index}
                style={[
                  styles.lifeIcon,
                  index >= lives && styles.lifeIconEmpty,
                ]}
              >
                ❤️
              </Text>
            ))}
          </View>
        </View>
      </View>

      <View style={styles.difficultyContainer}>
        <Text style={styles.difficultyLabel}>Dificultad:</Text>
        <View style={styles.difficultyButtons}>
          {['facil', 'normal', 'dificil'].map((diff) => (
            <TouchableOpacity
              key={diff}
              style={[
                styles.difficultyButton,
                difficulty === diff && styles.difficultyButtonActive,
              ]}
              onPress={() => onDifficultyChange(diff)}
            >
              <Text
                style={[
                  styles.difficultyButtonText,
                  difficulty === diff && styles.difficultyButtonTextActive,
                ]}
              >
                {diff === 'facil' ? 'Fácil' : diff === 'normal' ? 'Normal' : 'Difícil'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  livesContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  lifeIcon: {
    fontSize: 20,
  },
  lifeIconEmpty: {
    opacity: 0.3,
  },
  difficultyContainer: {
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    paddingTop: 15,
  },
  difficultyLabel: {
    fontSize: 14,
    color: '#34495e',
    marginBottom: 10,
    fontWeight: '600',
  },
  difficultyButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  difficultyButton: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#3498db',
  },
  difficultyButtonText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
});
