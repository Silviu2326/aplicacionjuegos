import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export const DeceptionSceneTile = ({ 
  sceneTile, 
  isForensicScientist = false,
  selectedOption = null,
  onOptionSelect 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.categoryName}>
        {sceneTile?.category || 'Categoría de Escena'}
      </Text>
      <ScrollView style={styles.optionsContainer}>
        {sceneTile?.options?.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.option,
              selectedOption === option && styles.selectedOption
            ]}
            onPress={() => isForensicScientist && onOptionSelect?.(option)}
            disabled={!isForensicScientist}
          >
            <Text style={styles.optionText}>{option}</Text>
            {selectedOption === option && (
              <View style={styles.marker} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  optionsContainer: {
    maxHeight: 200,
  },
  option: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedOption: {
    borderColor: '#4a90e2',
    backgroundColor: '#e3f2fd',
  },
  optionText: {
    fontSize: 14,
    flex: 1,
  },
  marker: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#4a90e2',
  },
});
