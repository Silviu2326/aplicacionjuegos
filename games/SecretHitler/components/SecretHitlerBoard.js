import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';

export const SecretHitlerBoard = () => {
  const liberalPolicies = useSecretHitlerStore((state) => state.liberalPolicies);
  const fascistPolicies = useSecretHitlerStore((state) => state.fascistPolicies);

  return (
    <View style={styles.container}>
      <View style={styles.boardSection}>
        <Text style={styles.boardTitle}>Políticas Liberales</Text>
        <View style={styles.policySlots}>
          {[0, 1, 2, 3, 4].map((index) => (
            <View
              key={index}
              style={[
                styles.policySlot,
                index < liberalPolicies && styles.policySlotFilled,
              ]}
            >
              {index < liberalPolicies && (
                <Text style={styles.policyText}>L</Text>
              )}
            </View>
          ))}
        </View>
        <Text style={styles.policyCount}>{liberalPolicies}/5</Text>
      </View>

      <View style={styles.boardSection}>
        <Text style={[styles.boardTitle, styles.fascistTitle]}>
          Políticas Fascistas
        </Text>
        <View style={styles.policySlots}>
          {[0, 1, 2, 3, 4, 5].map((index) => (
            <View
              key={index}
              style={[
                styles.policySlot,
                styles.fascistSlot,
                index < fascistPolicies && styles.policySlotFilledFascist,
              ]}
            >
              {index < fascistPolicies && (
                <Text style={styles.policyText}>F</Text>
              )}
            </View>
          ))}
        </View>
        <Text style={styles.policyCount}>{fascistPolicies}/6</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    margin: 8,
  },
  boardSection: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  boardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 12,
  },
  fascistTitle: {
    color: '#f44336',
  },
  policySlots: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 8,
  },
  policySlot: {
    width: 40,
    height: 50,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderRadius: 4,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  fascistSlot: {
    borderColor: '#f44336',
  },
  policySlotFilled: {
    backgroundColor: '#2196F3',
  },
  policySlotFilledFascist: {
    backgroundColor: '#f44336',
  },
  policyText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  policyCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});
