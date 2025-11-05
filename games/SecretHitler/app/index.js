import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useSecretHitlerStore } from '../store/secretHitlerStore';
import { GAME_CONFIG } from '../constants/SecretHitlerGameRules';

export const SecretHitlerIndex = ({ navigation }) => {
  const players = useSecretHitlerStore((state) => state.players);
  const addPlayer = useSecretHitlerStore((state) => state.addPlayer);
  const removePlayer = useSecretHitlerStore((state) => state.removePlayer);
  const initializeGame = useSecretHitlerStore((state) => state.initializeGame);
  
  const [playerName, setPlayerName] = useState('');
  
  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };
  
  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert('Error', `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para iniciar`);
      return;
    }
    
    if (initializeGame()) {
      if (navigation && navigation.navigate) {
        navigation.navigate('secret-hitler-game');
      }
    } else {
      Alert.alert('Error', 'No se pudo inicializar el juego');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Secret Hitler</Text>
        <Text style={styles.subtitle}>Juego de Deducción Social</Text>
        
        <View style={styles.addPlayerSection}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
            <Text style={styles.addButtonText}>Añadir Jugador</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.playersTitle}>
          Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
        </Text>
        
        {players.length === 0 ? (
          <Text style={styles.noPlayersText}>
            No hay jugadores añadidos. Añade al menos {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar.
          </Text>
        ) : (
          <View style={styles.playersList}>
            {players.map((player) => (
              <View key={player.id} style={styles.playerItem}>
                <Text style={styles.playerName}>{player.name}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>Iniciar Partida</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  addPlayerSection: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  noPlayersText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    padding: 20,
    fontStyle: 'italic',
  },
  playersList: {
    marginBottom: 24,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 4,
    paddingHorizontal: 8,
  },
  removeButtonText: {
    fontSize: 20,
    color: '#f44336',
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
