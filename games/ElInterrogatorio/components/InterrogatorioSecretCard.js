import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export const InterrogatorioSecretCard = ({ situation, onUnderstood }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.stamp}>
          <Text style={styles.stampText}>CONFIDENCIAL</Text>
        </View>
        <Text style={styles.label}>SITUACIÓN SECRETA</Text>
        <View style={styles.divider} />
        <Text style={styles.situation}>{situation}</Text>
        <View style={styles.divider} />
        <Text style={styles.instruction}>
          Lee y memoriza esta situación. Solo tú la conoces.
        </Text>
        <TouchableOpacity style={styles.button} onPress={onUnderstood}>
          <Text style={styles.buttonText}>Entendido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  card: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    position: 'relative',
  },
  stamp: {
    position: 'absolute',
    top: 20,
    right: 20,
    borderWidth: 2,
    borderColor: '#f44336',
    paddingHorizontal: 10,
    paddingVertical: 5,
    transform: [{ rotate: '15deg' }],
  },
  stampText: {
    color: '#f44336',
    fontWeight: 'bold',
    fontSize: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 15,
  },
  situation: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 28,
    marginVertical: 20,
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#ff5722',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default InterrogatorioSecretCard;

