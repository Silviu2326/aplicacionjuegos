import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const SuperheroeEnApurosHUD = ({ 
  puntuacion = 0, 
  rondas = 0,
  mejorRacha = 0,
  modoVotacion = false,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Puntuación</Text>
          <Text style={styles.statValue}>{puntuacion}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Rondas</Text>
          <Text style={styles.statValue}>{rondas}</Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Mejor Racha</Text>
          <Text style={styles.statValue}>{mejorRacha}</Text>
        </View>
      </View>

      {modoVotacion && (
        <View style={styles.votacionBadge}>
          <Text style={styles.votacionText}>🗳️ Modo Votación Activado</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statBox: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginBottom: 5,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  votacionBadge: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
    alignItems: 'center',
  },
  votacionText: {
    fontSize: 14,
    color: '#9B59B6',
    fontWeight: '600',
  },
});

