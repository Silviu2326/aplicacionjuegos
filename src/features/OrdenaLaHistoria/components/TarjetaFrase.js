import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const OrdenaLaHistoriaTarjetaFrase = ({ frase, index, isSelected, onPress, isRevealed = false }) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        isSelected && styles.cardSelected,
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardContent}>
        {isRevealed ? (
          <>
            <View style={styles.orderBadge}>
              <Text style={styles.orderBadgeText}>{index !== null ? index + 1 : '?'}</Text>
            </View>
            <Text style={styles.fraseText}>{frase}</Text>
          </>
        ) : (
          <View style={styles.hiddenContainer}>
            <Text style={styles.hiddenText}>Toca para revelar</Text>
            <Text style={styles.hiddenIcon}>🔒</Text>
          </View>
        )}
      </View>
      {isSelected && (
        <View style={styles.selectedIndicator}>
          <Text style={styles.selectedIndicatorText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 8,
    minHeight: 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  cardSelected: {
    borderColor: '#4ECDC4',
    backgroundColor: '#E8F8F7',
    shadowColor: '#4ECDC4',
    shadowOpacity: 0.3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderBadgeText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fraseText: {
    flex: 1,
    fontSize: 16,
    color: '#333333',
    lineHeight: 22,
    fontWeight: '500',
  },
  hiddenContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  hiddenText: {
    fontSize: 14,
    color: '#999999',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  hiddenIcon: {
    fontSize: 32,
  },
  selectedIndicator: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#2ECC71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIndicatorText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

