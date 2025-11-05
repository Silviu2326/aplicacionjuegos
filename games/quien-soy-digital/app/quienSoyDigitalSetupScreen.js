import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
import { QuienSoyDigitalCategorySelector } from '../components/QuienSoyDigitalCategorySelector';
import { useQuienSoyDigitalStore } from '../store/quienSoyDigitalStore';
import { TIME_OPTIONS } from '../constants/QuienSoyDigitalDecks';

export const QuienSoyDigitalSetupScreen = ({ navigation }) => {
  const selectDeck = useQuienSoyDigitalStore((state) => state.selectDeck);
  const setTimeLimit = useQuienSoyDigitalStore((state) => state.setTimeLimit);
  const currentPlayer = useQuienSoyDigitalStore((state) => state.currentPlayer);
  const timeLimit = useQuienSoyDigitalStore((state) => state.timeLimit);

  const handleCategorySelect = (deckId) => {
    selectDeck(deckId);
    navigation?.navigate('game');
  };

  const handleTimeSelect = (seconds) => {
    setTimeLimit(seconds);
  };

  const handleBack = () => {
    navigation?.navigate('index');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    return `${mins} min`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Text style={styles.backButtonText}>← Atrás</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Jugador {currentPlayer}</Text>
      </View>
      
      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.timeSection}>
          <Text style={styles.sectionTitle}>Duración de la Ronda</Text>
          <View style={styles.timeOptionsContainer}>
            {TIME_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={[
                  styles.timeOption,
                  timeLimit === option && styles.timeOptionSelected,
                ]}
                onPress={() => handleTimeSelect(option)}
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.timeOptionText,
                    timeLimit === option && styles.timeOptionTextSelected,
                  ]}
                >
                  {formatTime(option)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <QuienSoyDigitalCategorySelector onSelectCategory={handleCategorySelect} />
      </ScrollView>
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
  content: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  timeSection: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  timeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 10,
  },
  timeOption: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  timeOptionSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  timeOptionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  timeOptionTextSelected: {
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

