import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useCoupGameStore } from '../store/coupGameStore';
import { GAME_CONFIG } from '../constants/CoupActions';

export const CoupIndex = ({ navigation }) => {
  const players = useCoupGameStore((state) => state.players);
  const addPlayer = useCoupGameStore((state) => state.addPlayer);
  const removePlayer = useCoupGameStore((state) => state.removePlayer);
  const initializeGame = useCoupGameStore((state) => state.initializeGame);
  
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
        navigation.navigate('coup-game-screen');
      }
    } else {
      Alert.alert('Error', 'No se pudo inicializar el juego');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Coup</Text>
        <Text style={styles.subtitle}>Juego de Faroleo y Estrategia</Text>
        
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
        
        <TouchableOpacity
          style={styles.rulesButton}
          onPress={() => navigation?.navigate('coup-rules-screen')}
        >
          <Text style={styles.rulesButtonText}>Ver Reglas</Text>
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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  addPlayerSection: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  noPlayersText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    padding: 20,
  },
  playersList: {
    marginBottom: 24,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  rulesButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  rulesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
