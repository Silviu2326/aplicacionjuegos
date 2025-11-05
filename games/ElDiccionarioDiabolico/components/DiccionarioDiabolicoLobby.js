import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';
import { DICCIONARIO_DIABOLICO_CONFIG } from '../constants/DiccionarioDiabolicoConfig';

export const DiccionarioDiabolicoLobby = () => {
  const players = useDiccionarioDiabolicoStore((state) => state.players);
  const gameCode = useDiccionarioDiabolicoStore((state) => state.gameCode);
  const hostPlayerId = useDiccionarioDiabolicoStore((state) => state.hostPlayerId);
  const currentPlayerId = useDiccionarioDiabolicoStore((state) => state.currentPlayerId);
  
  const isHost = hostPlayerId === currentPlayerId;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>El Diccionario Diabólico</Text>
        {gameCode && (
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Código de partida:</Text>
            <Text style={styles.codeText}>{gameCode}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Jugadores ({players.length}/{DICCIONARIO_DIABOLICO_CONFIG.MAX_PLAYERS})
        </Text>
        <Text style={styles.sectionHint}>
          Mínimo {DICCIONARIO_DIABOLICO_CONFIG.MIN_PLAYERS} jugadores
        </Text>
        
        {players.map((player, index) => (
          <View key={player.id} style={styles.playerItem}>
            <Text style={styles.playerName}>
              {index + 1}. {player.name}
              {player.isHost && <Text style={styles.hostBadge}> (Anfitrión)</Text>}
            </Text>
          </View>
        ))}
        
        {players.length === 0 && (
          <Text style={styles.emptyText}>No hay jugadores todavía</Text>
        )}
      </View>
      
      {!isHost && players.length > 0 && (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>
            Esperando a que el anfitrión inicie el juego...
          </Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#6200ee',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  codeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  codeLabel: {
    color: '#fff',
    fontSize: 12,
    marginBottom: 4,
  },
  codeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    letterSpacing: 4,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  playerItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  hostBadge: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 20,
  },
  waitingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  waitingText: {
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
});
