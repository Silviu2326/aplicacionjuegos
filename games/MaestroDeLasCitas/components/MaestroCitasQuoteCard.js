import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MaestroCitasQuoteCard = ({ quote, category }) => {
  if (!quote) return null;
  
  const getCategoryColor = () => {
    const colors = {
      'Cine': '#e91e63',
      'Literatura': '#2196f3',
      'Filosofía': '#9c27b0',
      'Historia': '#ff9800',
      'Ciencia': '#4caf50',
      'Música': '#f44336',
      'Arte': '#00bcd4',
    };
    return colors[category] || '#666';
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.quoteContainer}>
        <View style={styles.quoteIcon}>
          <Text style={styles.quoteIconText}>"</Text>
        </View>
        <Text style={styles.quoteText}>{quote}</Text>
        <View style={styles.quoteIconEnd}>
          <Text style={styles.quoteIconText}>"</Text>
        </View>
        {category && (
          <View style={[styles.categoryBadge, { backgroundColor: getCategoryColor() }]}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  quoteContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    minHeight: 140,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 5,
    borderLeftColor: '#2196f3',
    position: 'relative',
  },
  quoteText: {
    fontSize: 22,
    fontStyle: 'italic',
    textAlign: 'center',
    color: '#333',
    lineHeight: 32,
    fontWeight: '500',
    letterSpacing: 0.3,
  },
  quoteIcon: {
    position: 'absolute',
    top: 15,
    left: 20,
  },
  quoteIconEnd: {
    position: 'absolute',
    bottom: 15,
    right: 20,
  },
  quoteIconText: {
    fontSize: 48,
    color: '#e0e0e0',
    fontWeight: 'bold',
    fontFamily: 'serif',
  },
  categoryBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});

