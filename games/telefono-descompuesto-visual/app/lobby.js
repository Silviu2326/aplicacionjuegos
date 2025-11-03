import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTelefonoDescompuestoVisualStore } from '../store/telefonoDescompuestoVisualStore';
import { TelefonoDescompuestoVisualPlayerList } from '../components/TelefonoDescompuestoVisualPlayerList';

export const TelefonoDescompuestoVisualLobby = ({ navigation }) => {
  const [playerNameInput, setPlayerNameInput] = useState('');
  
  const players = useTelefonoDescompuestoVisualStore((state) => state.players);
  const addPlayer = useTelefonoDescompuestoVisualStore((state) => state.addPlayer);
  const removePlayer = useTelefonoDescompuestoVisualStore((state) => state.removePlayer);
  const initializeNotebooks = useTelefonoDescompuestoVisualStore((state) => state.initializeNotebooks);
  const setGameStatus = useTelefonoDescompuestoVisualStore((state) => state.setGameStatus);
  const startFirstTurn = useTelefonoDescompuestoVisualStore((state) => state.startFirstTurn);

  const handleAddPlayer = () => {
    if (!playerNameInput.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerNameInput.trim().toLowerCase())) {
      Alert.alert('Error', 'Ya existe un jugador con ese nombre');
      return;
    }

    const newPlayerId = `player-${Date.now()}`;
    addPlayer({
      id: newPlayerId,
      name: playerNameInput.trim(),
      status: 'listo',
    });
    
    setPlayerNameInput('');
  };

  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (players.length < 3) {
      Alert.alert('Error', 'Se necesitan al menos 3 jugadores para comenzar');
      return;
    }
    
    initializeNotebooks();
    startFirstTurn();
    setGameStatus('playing');
    navigation?.navigate('game');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.title}>Configurar Jugadores</Text>
      <Text style={styles.instruction}>
        Agrega los nombres de todos los jugadores que participarán en esta partida.
        {'\n\n'}Mínimo 3 jugadores. Pasa el teléfono entre jugadores durante el juego.
      </Text>

      <View style={styles.addPlayerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del jugador"
          value={playerNameInput}
          onChangeText={setPlayerNameInput}
          onSubmitEditing={handleAddPlayer}
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <TelefonoDescompuestoVisualPlayerList 
        players={players} 
        hostId={null}
        onRemovePlayer={handleRemovePlayer}
      />

      {players.length >= 3 && (
        <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
          <Text style={styles.startButtonText}>Iniciar Juego</Text>
        </TouchableOpacity>
      )}

      {players.length < 3 && (
        <Text style={styles.warningText}>
          Necesitas al menos {3 - players.length} jugador{players.length < 2 ? 'es' : ''} más
        </Text>
      )}

      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation?.navigate('index')}
      >
        <Text style={styles.backButtonText}>Volver al Menú</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#333',
  },
  instruction: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  addPlayerContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 14,
    color: '#FF9800',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  backButton: {
    marginTop: 20,
    padding: 12,
    alignItems: 'center',
  },
  backButtonText: {
    color: '#666',
    fontSize: 16,
  },
});

