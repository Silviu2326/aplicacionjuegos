import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useCriticoCineAbsurdoStore } from '../store/criticoCineAbsurdoStore';

export const CriticoCineAbsurdoIndex = ({ navigation }) => {
  const players = useCriticoCineAbsurdoStore((state) => state.players);
  const maxRounds = useCriticoCineAbsurdoStore((state) => state.maxRounds);
  const turnTime = useCriticoCineAbsurdoStore((state) => state.turnTime);
  
  const addPlayer = useCriticoCineAbsurdoStore((state) => state.addPlayer);
  const removePlayer = useCriticoCineAbsurdoStore((state) => state.removePlayer);
  const setMaxRounds = useCriticoCineAbsurdoStore((state) => state.setMaxRounds);
  const setTurnTime = useCriticoCineAbsurdoStore((state) => state.setTurnTime);
  const startGame = useCriticoCineAbsurdoStore((state) => state.startGame);
  
  const [playerName, setPlayerName] = useState('');
  
  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido');
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };
  
  const handleStartGame = () => {
    if (players.length < 3) {
      Alert.alert('Error', 'Se necesitan al menos 3 jugadores para iniciar');
      return;
    }
    
    if (startGame()) {
      if (navigation && navigation.navigate) {
        navigation.navigate('critico-cine-absurdo-juego');
      }
    } else {
      Alert.alert('Error', 'No se pudo inicializar el juego');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Crítico de Cine Absurdo</Text>
        <Text style={styles.subtitle}>Juego de Improvisación y Creatividad</Text>
        
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Rondas:</Text>
            <View style={styles.configButtons}>
              {[3, 5, 7].map((rounds) => (
                <TouchableOpacity
                  key={rounds}
                  style={[
                    styles.configButton,
                    maxRounds === rounds && styles.configButtonActive
                  ]}
                  onPress={() => setMaxRounds(rounds)}
                >
                  <Text style={[
                    styles.configButtonText,
                    maxRounds === rounds && styles.configButtonTextActive
                  ]}>
                    {rounds}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Tiempo por turno:</Text>
            <View style={styles.configButtons}>
              {[60, 90, 120].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.configButton,
                    turnTime === time && styles.configButtonActive
                  ]}
                  onPress={() => setTurnTime(time)}
                >
                  <Text style={[
                    styles.configButtonText,
                    turnTime === time && styles.configButtonTextActive
                  ]}>
                    {time}s
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
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
            <Text style={styles.addButtonText}>Añadir Jugador</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.playersTitle}>
          Jugadores ({players.length})
        </Text>
        
        {players.length === 0 ? (
          <Text style={styles.noPlayersText}>
            No hay jugadores añadidos. Añade al menos 3 jugadores para comenzar.
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
            players.length < 3 && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < 3}
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
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    color: '#666',
  },
  configSection: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  configRow: {
    marginBottom: 16,
  },
  configLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#666',
  },
  configButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  configButton: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  configButtonActive: {
    backgroundColor: '#2196F3',
  },
  configButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  configButtonTextActive: {
    color: '#fff',
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
});

