import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const LineaDeTiempoConfusaContenedor = ({ events, selectedOrder, onCardSelect }) => {
  const getEventById = (id) => events.find(e => e.id === id);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Línea de Tiempo</Text>
      <View style={styles.timeline}>
        {events.map((_, index) => {
          const eventId = selectedOrder[index];
          const event = eventId ? getEventById(eventId) : null;
          
          return (
            <View key={index} style={styles.slotContainer}>
              <View style={styles.slotNumber}>
                <Text style={styles.slotNumberText}>{index + 1}</Text>
              </View>
              <View style={[styles.slot, !event && styles.slotEmpty]}>
                {event ? (
                  <View style={styles.selectedCard}>
                    <Text style={styles.selectedCardText}>{event.texto}</Text>
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => onCardSelect(event.id)}
                    >
                      <Text style={styles.removeButtonText}>×</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <Text style={styles.placeholderText}>Vacío</Text>
                )}
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  timeline: {
    gap: 15,
  },
  slotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  slotNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  slotNumberText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  slot: {
    flex: 1,
    minHeight: 70,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    borderWidth: 2,
    borderColor: '#3498db',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  slotEmpty: {
    borderColor: '#bdc3c7',
    borderStyle: 'dashed',
    backgroundColor: '#f8f9fa',
  },
  placeholderText: {
    color: '#95a5a6',
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  selectedCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  selectedCardText: {
    flex: 1,
    fontSize: 14,
    color: '#2c3e50',
    fontWeight: '600',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#e74c3c',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
