import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useQuePrefieresExtremoStore } from '../store/quePrefieresExtremoStore';
import { CATEGORIES, GAME_MODES } from '../constants/QuePrefieresExtremoQuestions';

export const QuePrefieresExtremoIndex = ({ navigation }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [showGameModes, setShowGameModes] = useState(false);
  const [showStats, setShowStats] = useState(false);
  
  const {
    reset,
    gameMode,
    selectedCategories,
    setGameMode,
    toggleCategory,
    getSessionStats,
  } = useQuePrefieresExtremoStore();

  const handleStartGame = () => {
    reset();
    navigation?.navigate('game');
  };

  const sessionStats = getSessionStats();
  const selectedMode = GAME_MODES.find(m => m.id === gameMode);
  const hasSelectedCategories = selectedCategories.length > 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>¿Qué Prefieres? (Extremo)</Text>
        <Text style={styles.subtitle}>
          Un juego social diseñado para provocar conversaciones, debates y risas entre amigos.
          {'\n\n'}
          El objetivo no es ganar, sino conocer mejor a los demás jugadores y a uno mismo a través de dilemas hipotéticos.
          {'\n\n'}
          Elige entre dos opciones extremas y justifica tu decisión. ¡Que comience el debate!
        </Text>
      </View>

      {/* Modos de Juego */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setShowGameModes(!showGameModes)}
        >
          <Text style={styles.sectionTitle}>🎮 Modo de Juego</Text>
          <Text style={styles.sectionToggle}>{showGameModes ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {showGameModes && (
          <View style={styles.optionsContainer}>
            {GAME_MODES.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.optionButton,
                  gameMode === mode.id && styles.optionButtonSelected,
                ]}
                onPress={() => setGameMode(mode.id)}
              >
                <Text style={[
                  styles.optionText,
                  gameMode === mode.id && styles.optionTextSelected,
                ]}>
                  {mode.name}
                </Text>
                <Text style={[
                  styles.optionDescription,
                  gameMode === mode.id && styles.optionDescriptionSelected,
                ]}>
                  {mode.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
        {!showGameModes && selectedMode && (
          <Text style={styles.selectedInfo}>Modo seleccionado: {selectedMode.name}</Text>
        )}
      </View>

      {/* Selección de Categorías */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setShowCategories(!showCategories)}
        >
          <Text style={styles.sectionTitle}>🏷️ Categorías</Text>
          <Text style={styles.sectionToggle}>{showCategories ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {showCategories && (
          <View style={styles.optionsContainer}>
            <Text style={styles.categoryHint}>
              {hasSelectedCategories 
                ? `${selectedCategories.length} categoría(s) seleccionada(s)`
                : 'Todas las categorías seleccionadas (toca para filtrar)'}
            </Text>
            <View style={styles.categoriesGrid}>
              {CATEGORIES.map((category) => {
                const isSelected = selectedCategories.includes(category.id) || selectedCategories.length === 0;
                return (
                  <TouchableOpacity
                    key={category.id}
                    style={[
                      styles.categoryButton,
                      isSelected && styles.categoryButtonSelected,
                    ]}
                    onPress={() => toggleCategory(category.id)}
                  >
                    <Text style={styles.categoryIcon}>{category.icon}</Text>
                    <Text style={[
                      styles.categoryText,
                      isSelected && styles.categoryTextSelected,
                    ]}>
                      {category.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}
      </View>

      {/* Estadísticas de Sesión */}
      {sessionStats.totalQuestions > 0 && (
        <View style={styles.section}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowStats(!showStats)}
          >
            <Text style={styles.sectionTitle}>📊 Estadísticas de Sesión</Text>
            <Text style={styles.sectionToggle}>{showStats ? '▼' : '▶'}</Text>
          </TouchableOpacity>
          {showStats && (
            <View style={styles.statsContainer}>
              <View style={styles.statRow}>
                <Text style={styles.statLabel}>Preguntas respondidas:</Text>
                <Text style={styles.statValue}>{sessionStats.totalQuestions}</Text>
              </View>
              {Object.keys(sessionStats.categoryStats).length > 0 && (
                <View style={styles.categoryStatsContainer}>
                  <Text style={styles.categoryStatsTitle}>Por categoría:</Text>
                  {Object.entries(sessionStats.categoryStats).map(([category, stats]) => {
                    const categoryInfo = CATEGORIES.find(c => c.id === category);
                    return (
                      <View key={category} style={styles.categoryStatRow}>
                        <Text style={styles.categoryStatLabel}>
                          {categoryInfo?.icon} {categoryInfo?.name}: {stats.count}
                        </Text>
                      </View>
                    );
                  })}
                </View>
              )}
            </View>
          )}
        </View>
      )}

      {/* Botón Principal */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.button} onPress={handleStartGame}>
          <Text style={styles.buttonText}>🚀 Iniciar Partida</Text>
        </TouchableOpacity>
        {sessionStats.totalQuestions > 0 && (
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={() => {
              reset();
              setShowStats(false);
            }}
          >
            <Text style={[styles.buttonText, styles.secondaryButtonText]}>
              🔄 Nueva Partida
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Info Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          💡 Consejo: Selecciona categorías o un modo específico para personalizar tu experiencia.
          {'\n\n'}
          Las estadísticas mostradas incluyen datos de sesiones anteriores para mayor diversión.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 20,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  sectionToggle: {
    fontSize: 16,
    color: '#666',
  },
  selectedInfo: {
    fontSize: 14,
    color: '#4CAF50',
    fontStyle: 'italic',
    marginTop: 5,
  },
  optionsContainer: {
    marginTop: 10,
  },
  optionButton: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  optionButtonSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  optionTextSelected: {
    color: '#2E7D32',
  },
  optionDescription: {
    fontSize: 13,
    color: '#666',
  },
  optionDescriptionSelected: {
    color: '#4CAF50',
  },
  categoryHint: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryButton: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  categoryButtonSelected: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
  },
  categoryIcon: {
    fontSize: 24,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    textAlign: 'center',
  },
  categoryTextSelected: {
    color: '#1976D2',
  },
  statsContainer: {
    marginTop: 10,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  statLabel: {
    fontSize: 15,
    color: '#666',
  },
  statValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  categoryStatsContainer: {
    marginTop: 10,
  },
  categoryStatsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  categoryStatRow: {
    paddingVertical: 5,
  },
  categoryStatLabel: {
    fontSize: 13,
    color: '#666',
  },
  actionSection: {
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 18,
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtonText: {
    color: '#4CAF50',
  },
  footer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#fff3cd',
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  footerText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 20,
  },
});

