import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { QuienSoyPreguntasCategorySelector } from '../components/QuienSoyPreguntasCategorySelector';
import { useQuienSoyPreguntasStore } from '../store/quienSoyPreguntasStore';

export const QuienSoyPreguntasSetup = ({ navigation }) => {
  const selectCategory = useQuienSoyPreguntasStore((state) => state.selectCategory);
  const currentPlayer = useQuienSoyPreguntasStore((state) => state.currentPlayer);

  const handleCategorySelect = (categoryId) => {
    selectCategory(categoryId);
    navigation?.navigate('game');
  };

  const handleBack = () => {
    navigation?.navigate('index');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Jugador {currentPlayer}</Text>
      </View>
      <QuienSoyPreguntasCategorySelector onSelectCategory={handleCategorySelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
    marginRight: 50,
  },
});
