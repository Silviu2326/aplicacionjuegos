import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useFakeArtistGameStore } from '../store/fakeArtistGameStore';
import { FakeArtistPlayerList } from '../components/FakeArtistPlayerList';

export const FakeArtistGameLobby = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  
  const players = useFakeArtistGameStore((state) => state.players);
  const addPlayer = useFakeArtistGameStore((state) => state.addPlayer);
  const removePlayer = useFakeArtistGameStore((state) => state.removePlayer);
  const startGame = useFakeArtistGameStore((state) => state.startGame);
  const currentMasterIndex = useFakeArtistGameStore((state) => state.currentMasterIndex);
  const selectCategoryAndWord = useFakeArtistGameStore((state) => state.selectCategoryAndWord);

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }

    const success = addPlayer(playerName.trim());
    if (success) {
      setPlayerName('');
    } else {
      Alert.alert('Error', 'Este nombre ya está en uso');
    }
  };

  const handleStartGame = () => {
    if (players.length < 4) {
      Alert.alert('Error', 'Se necesitan al menos 4 jugadores para comenzar');
      return;
    }

    const success = startGame();
    if (success) {
      navigation?.navigate('role-reveal');
    }
  };

  const masterPlayer = players[currentMasterIndex];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sala de Juego</Text>
      
      <View style={styles.masterSection}>
        <Text style={styles.masterLabel}>Maestro de la Pregunta:</Text>
        <Text style={styles.masterName}>
          {masterPlayer ? masterPlayer.name : 'Esperando jugadores...'}
        </Text>
      </View>

      <View style={styles.addPlayerSection}>
        <TextInput
          style={styles.input}
          placeholder="Nombre del jugador"
          value={playerName}
          onChangeText={setPlayerName}
          onSubmitEditing={handleAddPlayer}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
          <Text style={styles.addButtonText}>Agregar</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.playerListContainer}>
        <FakeArtistPlayerList 
          players={players}
          onRemovePlayer={removePlayer}
          currentMasterIndex={currentMasterIndex}
        />
      </ScrollView>

      <View style={styles.playerCount}>
        <Text style={styles.playerCountText}>
          {players.length} / 10 jugadores
        </Text>
      </View>

      <TouchableOpacity 
        style={[styles.startButton, players.length < 4 && styles.startButtonDisabled]} 
        onPress={handleStartGame}
        disabled={players.length < 4}
      >
        <Text style={styles.startButtonText}>Comenzar Juego</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  masterSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  masterLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  masterName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  addPlayerSection: {
    flexDirection: 'row',
    marginBottom: 20,
    gap: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  playerListContainer: {
    flex: 1,
    marginBottom: 20,
  },
  playerCount: {
    marginBottom: 10,
  },
  playerCountText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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

