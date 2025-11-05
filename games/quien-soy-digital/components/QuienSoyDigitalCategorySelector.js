import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DECKS } from '../constants/QuienSoyDigitalDecks';

export const QuienSoyDigitalCategorySelector = ({ onSelectCategory }) => {
  const deckList = Object.values(DECKS);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Elige una Categoría</Text>
      <View style={styles.categoriesGrid}>
        {deckList.map((deck) => (
          <TouchableOpacity
            key={deck.id}
            style={styles.categoryCard}
            onPress={() => onSelectCategory(deck.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.categoryName}>{deck.name}</Text>
            <Text style={styles.categoryWordsCount}>
              {deck.words.length} palabras
            </Text>
          </TouchableOpacity>
        ))}
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
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  categoryCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  categoryWordsCount: {
    fontSize: 12,
    color: '#666',
  },
});

