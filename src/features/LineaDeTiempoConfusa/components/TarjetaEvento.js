import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const LineaDeTiempoConfusaTarjetaEvento = ({ event, isSelected, position, onPress }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      {position && (
        <View style={styles.positionBadge}>
          <Text style={styles.positionText}>{position}</Text>
        </View>
      )}
      <Text style={styles.cardText}>{event.texto}</Text>
      {event.categoria && (
        <Text style={styles.categoryText}>{event.categoria}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    minWidth: '48%',
    borderWidth: 2,
    borderColor: '#ecf0f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#3498db',
    backgroundColor: '#ebf5fb',
  },
  positionBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: '#3498db',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  positionText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  cardText: {
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 11,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
});
