import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const GeoguessrDeSalonLocationCard = ({ location, showName = false, showHints = false }) => {
  const [showHintsSection, setShowHintsSection] = useState(false);

  if (!location) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando ubicación...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: location.imageUrl }} 
        style={styles.image}
        resizeMode="cover"
      />
      {showName && (
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{location.name}</Text>
          {location.continent && (
            <Text style={styles.continent}>{location.continent}</Text>
          )}
        </View>
      )}
      
      {showName && location.coordinates && (
        <View style={styles.coordinatesContainer}>
          <Text style={styles.coordinatesText}>
            📍 {location.coordinates.lat.toFixed(4)}°N, {location.coordinates.lng.toFixed(4)}°E
          </Text>
        </View>
      )}

      {showHints && location.hints && location.hints.length > 0 && (
        <View style={styles.hintsContainer}>
          <TouchableOpacity 
            style={styles.hintsHeader}
            onPress={() => setShowHintsSection(!showHintsSection)}
          >
            <Text style={styles.hintsHeaderText}>
              💡 Pistas {showHintsSection ? '▲' : '▼'}
            </Text>
          </TouchableOpacity>
          {showHintsSection && (
            <ScrollView style={styles.hintsList}>
              {location.hints.map((hint, index) => (
                <View key={index} style={styles.hintItem}>
                  <Text style={styles.hintText}>• {hint}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#1a1a2e',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: 300,
  },
  nameContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  continent: {
    fontSize: 16,
    color: '#4a90e2',
    textAlign: 'center',
    fontWeight: '600',
  },
  coordinatesContainer: {
    backgroundColor: '#16213e',
    padding: 10,
    alignItems: 'center',
  },
  coordinatesText: {
    fontSize: 14,
    color: '#ccc',
    fontFamily: 'monospace',
  },
  hintsContainer: {
    backgroundColor: '#16213e',
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  hintsHeader: {
    padding: 15,
    backgroundColor: '#1a1a2e',
  },
  hintsHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
  },
  hintsList: {
    maxHeight: 150,
    padding: 10,
  },
  hintItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    padding: 40,
  },
});

