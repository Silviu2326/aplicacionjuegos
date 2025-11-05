import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useVozMisteriosaStore } from '../store/vozMisteriosaStore';
import { 
  CATEGORIES, 
  CATEGORY_LABELS,
  DIFFICULTY_SETTINGS 
} from '../constants/VozMisteriosaGameSettings';

export const LaVozMisteriosaAudioQuizSetup = ({ navigation }) => {
  const selectedCategories = useVozMisteriosaStore((state) => state.selectedCategories);
  const setSelectedCategories = useVozMisteriosaStore((state) => state.setSelectedCategories);
  const maxRounds = useVozMisteriosaStore((state) => state.maxRounds);
  const setMaxRounds = useVozMisteriosaStore((state) => state.setMaxRounds);
  const targetScore = useVozMisteriosaStore((state) => state.targetScore);
  const setTargetScore = useVozMisteriosaStore((state) => state.setTargetScore);
  const timePerQuestion = useVozMisteriosaStore((state) => state.timePerQuestion);
  const setTimePerQuestion = useVozMisteriosaStore((state) => state.setTimePerQuestion);
  const maxReplays = useVozMisteriosaStore((state) => state.maxReplays);
  const setMaxReplays = useVozMisteriosaStore((state) => state.setMaxReplays);
  const startGame = useVozMisteriosaStore((state) => state.startGame);
  
  const [difficulty, setDifficulty] = useState('normal');

  const toggleCategory = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    const settings = DIFFICULTY_SETTINGS[newDifficulty];
    setTimePerQuestion(settings.timePerQuestion);
    setMaxReplays(settings.maxReplays);
  };

  const handleStart = () => {
    if (selectedCategories.length === 0) {
      return;
    }
    
    const success = startGame();
    if (success && navigation && navigation.navigate) {
      navigation.navigate('juego-voz-misteriosa');
    }
  };

  const allCategories = Object.values(CATEGORIES);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configurar Partida</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorías</Text>
          <Text style={styles.sectionHint}>
            Selecciona al menos una categoría
          </Text>
          <View style={styles.categoriesGrid}>
            {allCategories.map((category) => {
              const isSelected = selectedCategories.includes(category);
              return (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    isSelected && styles.categoryButtonActive,
                  ]}
                  onPress={() => toggleCategory(category)}
                >
                  <Text style={[
                    styles.categoryButtonText,
                    isSelected && styles.categoryButtonTextActive,
                  ]}>
                    {CATEGORY_LABELS[category]}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dificultad</Text>
          <View style={styles.difficultyContainer}>
            {Object.keys(DIFFICULTY_SETTINGS).map((diff) => (
              <TouchableOpacity
                key={diff}
                style={[
                  styles.difficultyButton,
                  difficulty === diff && styles.difficultyButtonActive,
                ]}
                onPress={() => handleDifficultyChange(diff)}
              >
                <Text style={[
                  styles.difficultyButtonText,
                  difficulty === diff && styles.difficultyButtonTextActive,
                ]}>
                  {diff === 'facil' ? 'Fácil' : diff === 'normal' ? 'Normal' : 'Difícil'}
                </Text>
                <Text style={styles.difficultyDetails}>
                  {DIFFICULTY_SETTINGS[diff].timePerQuestion}s • {DIFFICULTY_SETTINGS[diff].maxReplays} rep.
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Condición de Victoria</Text>
          <Text style={styles.sectionHint}>
            Elige cómo terminará el juego
          </Text>
          
          <View style={styles.victoryContainer}>
            <TouchableOpacity
              style={[
                styles.victoryOption,
                maxRounds === null && targetScore === null && styles.victoryOptionActive,
              ]}
              onPress={() => {
                setMaxRounds(null);
                setTargetScore(null);
              }}
            >
              <Text style={[
                styles.victoryOptionText,
                maxRounds === null && targetScore === null && styles.victoryOptionTextActive,
              ]}>
                ♾️ Ilimitado
              </Text>
              <Text style={styles.victoryOptionSubtext}>Juega hasta que quieras</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.victoryOption,
                maxRounds === 5 && styles.victoryOptionActive,
              ]}
              onPress={() => {
                setMaxRounds(5);
                setTargetScore(null);
              }}
            >
              <Text style={[
                styles.victoryOptionText,
                maxRounds === 5 && styles.victoryOptionTextActive,
              ]}>
                🔢 5 Rondas
              </Text>
              <Text style={styles.victoryOptionSubtext}>Rápido y dinámico</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.victoryOption,
                maxRounds === 10 && styles.victoryOptionActive,
              ]}
              onPress={() => {
                setMaxRounds(10);
                setTargetScore(null);
              }}
            >
              <Text style={[
                styles.victoryOptionText,
                maxRounds === 10 && styles.victoryOptionTextActive,
              ]}>
                🎯 10 Rondas
              </Text>
              <Text style={styles.victoryOptionSubtext}>Partida estándar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.victoryOption,
                maxRounds === 15 && styles.victoryOptionActive,
              ]}
              onPress={() => {
                setMaxRounds(15);
                setTargetScore(null);
              }}
            >
              <Text style={[
                styles.victoryOptionText,
                maxRounds === 15 && styles.victoryOptionTextActive,
              ]}>
                🏆 15 Rondas
              </Text>
              <Text style={styles.victoryOptionSubtext}>Partida larga</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.victoryOption,
                targetScore === 10 && styles.victoryOptionActive,
              ]}
              onPress={() => {
                setTargetScore(10);
                setMaxRounds(null);
              }}
            >
              <Text style={[
                styles.victoryOptionText,
                targetScore === 10 && styles.victoryOptionTextActive,
              ]}>
                ⭐ Primero en 10 puntos
              </Text>
              <Text style={styles.victoryOptionSubtext}>Carrera de puntos</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.victoryOption,
                targetScore === 15 && styles.victoryOptionActive,
              ]}
              onPress={() => {
                setTargetScore(15);
                setMaxRounds(null);
              }}
            >
              <Text style={[
                styles.victoryOptionText,
                targetScore === 15 && styles.victoryOptionTextActive,
              ]}>
                🎖️ Primero en 15 puntos
              </Text>
              <Text style={styles.victoryOptionSubtext}>Desafío extendido</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resumen de Configuración</Text>
          <View style={styles.summaryContainer}>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Categorías seleccionadas:</Text>
              <Text style={styles.summaryValue}>{selectedCategories.length}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Dificultad:</Text>
              <Text style={styles.summaryValue}>
                {difficulty === 'facil' ? 'Fácil' : difficulty === 'normal' ? 'Normal' : 'Difícil'}
              </Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Tiempo por pregunta:</Text>
              <Text style={styles.summaryValue}>{timePerQuestion}s</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Repeticiones máximas:</Text>
              <Text style={styles.summaryValue}>{maxReplays}</Text>
            </View>
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Condición de victoria:</Text>
              <Text style={styles.summaryValue}>
                {maxRounds ? `${maxRounds} rondas` : targetScore ? `Primero en ${targetScore} puntos` : 'Ilimitado'}
              </Text>
            </View>
          </View>
        </View>
        
        <TouchableOpacity
          style={[
            styles.startButton,
            selectedCategories.length === 0 && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={selectedCategories.length === 0}
        >
          <Text style={styles.startButtonText}>
            {selectedCategories.length === 0
              ? 'Selecciona al menos una categoría'
              : 'Comenzar Juego'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#9c27b0',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    padding: 20,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    minWidth: '45%',
    alignItems: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#9c27b0',
    borderColor: '#9c27b0',
  },
  categoryButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  difficultyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  difficultyButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  difficultyButtonActive: {
    backgroundColor: '#9c27b0',
    borderColor: '#9c27b0',
  },
  difficultyButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  difficultyButtonTextActive: {
    color: '#fff',
  },
  difficultyDetails: {
    fontSize: 12,
    color: '#999',
  },
  victoryContainer: {
    gap: 10,
    marginTop: 10,
  },
  victoryOption: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
  },
  victoryOptionActive: {
    backgroundColor: '#9c27b0',
    borderColor: '#9c27b0',
  },
  victoryOptionText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  victoryOptionTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  victoryOptionSubtext: {
    fontSize: 12,
    color: '#999',
    marginTop: 5,
    textAlign: 'center',
  },
  summaryContainer: {
    marginTop: 10,
    gap: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9c27b0',
  },
  startButton: {
    backgroundColor: '#9c27b0',
    margin: 20,
    padding: 20,
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
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LaVozMisteriosaAudioQuizSetup;

