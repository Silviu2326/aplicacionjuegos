import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const ConexionInesperadaConceptPair = ({ conceptPair }) => {
  if (!conceptPair || conceptPair.length !== 2) {
    return null;
  }

  const [concept1, concept2] = conceptPair;

  return (
    <View style={styles.container}>
      <View style={[styles.conceptCard, styles.conceptCardLeft]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardNumber}>1</Text>
        </View>
        <Text style={styles.conceptText}>{concept1}</Text>
      </View>
      
      <View style={styles.connectorContainer}>
        <View style={styles.connectorLine} />
        <View style={styles.connector}>
          <Text style={styles.connectorText}>⚡</Text>
          <Text style={styles.connectorLabel}>CONECTA</Text>
        </View>
        <View style={styles.connectorLine} />
      </View>
      
      <View style={[styles.conceptCard, styles.conceptCardRight]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardNumber}>2</Text>
        </View>
        <Text style={styles.conceptText}>{concept2}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 25,
    paddingHorizontal: 15,
  },
  conceptCard: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 25,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
    minHeight: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  conceptCardLeft: {
    borderColor: '#4A90E2',
    backgroundColor: '#E8F4FD',
  },
  conceptCardRight: {
    borderColor: '#E94B3C',
    backgroundColor: '#FDE8E6',
  },
  cardHeader: {
    position: 'absolute',
    top: 10,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  conceptText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 28,
    paddingHorizontal: 10,
  },
  connectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 10,
  },
  connectorLine: {
    flex: 1,
    height: 3,
    backgroundColor: '#FFD700',
    borderRadius: 2,
  },
  connector: {
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFD700',
    borderRadius: 30,
    width: 60,
    height: 60,
    shadowColor: '#FFD700',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  connectorText: {
    fontSize: 28,
  },
  connectorLabel: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: -5,
    letterSpacing: 1,
  },
});

