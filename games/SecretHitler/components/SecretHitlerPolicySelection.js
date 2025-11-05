import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';

export const SecretHitlerPolicySelection = ({ playerId }) => {
  const presidentId = useSecretHitlerStore((state) => state.presidentId);
  const chancellorId = useSecretHitlerStore((state) => state.chancellorId);
  const drawnPolicies = useSecretHitlerStore((state) => state.drawnPolicies);
  const policiesForChancellor = useSecretHitlerStore((state) => state.policiesForChancellor);
  const presidentDiscard = useSecretHitlerStore((state) => state.presidentDiscard);
  const chancellorDiscard = useSecretHitlerStore((state) => state.chancellorDiscard);
  const gamePhase = useSecretHitlerStore((state) => state.gamePhase);

  const isPresident = playerId === presidentId;
  const isChancellor = playerId === chancellorId;
  const isPresidentTurn = isPresident && gamePhase === 'legislative_session' && drawnPolicies.length > 0;
  const isChancellorTurn = isChancellor && gamePhase === 'legislative_session' && policiesForChancellor.length > 0;

  const handlePresidentDiscard = (index) => {
    if (isPresidentTurn) {
      presidentDiscard(index);
    }
  };

  const handleChancellorDiscard = (index) => {
    if (isChancellorTurn) {
      chancellorDiscard(index);
    }
  };

  const getPolicyColor = (policy) => {
    return policy === 'liberal' ? '#2196F3' : '#f44336';
  };

  const getPolicyText = (policy) => {
    return policy === 'liberal' ? 'L' : 'F';
  };

  if (isPresidentTurn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona una política para descartar</Text>
        <Text style={styles.subtitle}>Tienes 3 políticas. Descarta 1 y pasa 2 al Canciller.</Text>
        <ScrollView horizontal style={styles.policiesContainer}>
          {drawnPolicies.map((policy, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.policyCard,
                { backgroundColor: getPolicyColor(policy) },
              ]}
              onPress={() => handlePresidentDiscard(index)}
            >
              <Text style={styles.policyCardText}>{getPolicyText(policy)}</Text>
              <Text style={styles.discardText}>Toca para descartar</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (isChancellorTurn) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Selecciona una política para descartar</Text>
        <Text style={styles.subtitle}>
          El Presidente te pasó 2 políticas. Descarta 1 y promulga la otra.
        </Text>
        <ScrollView horizontal style={styles.policiesContainer}>
          {policiesForChancellor.map((policy, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.policyCard,
                { backgroundColor: getPolicyColor(policy) },
              ]}
              onPress={() => handleChancellorDiscard(index)}
            >
              <Text style={styles.policyCardText}>{getPolicyText(policy)}</Text>
              <Text style={styles.discardText}>Toca para descartar</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    textAlign: 'center',
  },
  policiesContainer: {
    flexDirection: 'row',
  },
  policyCard: {
    width: 120,
    height: 160,
    borderRadius: 12,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  policyCardText: {
    color: '#fff',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  discardText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
    opacity: 0.9,
  },
});
