import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';
import { DICCIONARIO_DIABOLICO_CONFIG } from '../constants/DiccionarioDiabolicoConfig';
import { DiccionarioDiabolicoLobby } from '../components/DiccionarioDiabolicoLobby';

export const DiccionarioDiabolicoIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [maxRounds, setMaxRounds] = useState(DICCIONARIO_DIABOLICO_CONFIG.DEFAULT_MAX_ROUNDS.toString());
  
  const gameStatus = useDiccionarioDiabolicoStore((state) => state.gameStatus);
  const players = useDiccionarioDiabolicoStore((state) => state.players);
  const addPlayer = useDiccionarioDiabolicoStore((state) => state.addPlayer);
  const removePlayer = useDiccionarioDiabolicoStore((state) => state.removePlayer);
  const setMaxRoundsAction = useDiccionarioDiabolicoStore((state) => state.setMaxRounds);
  const startGame = useDiccionarioDiabolicoStore((state) => state.startGame);
  const currentPlayerId = useDiccionarioDiabolicoStore((state) => state.currentPlayerId);
  const setCurrentPlayer = useDiccionarioDiabolicoStore((state) => state.setCurrentPlayer);
  const hostPlayerId = useDiccionarioDiabolicoStore((state) => state.hostPlayerId);
  
  // Si estamos en lobby, mostrar el componente de lobby
  if (gameStatus === 'lobby') {
    return <DiccionarioDiabolicoLobby />;
  }
  
  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }
    
    if (players.length >= DICCIONARIO_DIABOLICO_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${DICCIONARIO_DIABOLICO_CONFIG.MAX_PLAYERS} jugadores`);
      return;
    }
    
    const result = addPlayer(playerName.trim());
    if (result && result.playerId) {
      // Si es el primer jugador, establecerlo como jugador actual
      if (players.length === 0 && !currentPlayerId) {
        setCurrentPlayer(result.playerId);
      }
      setPlayerName('');
    }
  };
  
  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };
  
  const handleStartGame = () => {
    if (players.length < DICCIONARIO_DIABOLICO_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${DICCIONARIO_DIABOLICO_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar número de rondas
    const rounds = parseInt(maxRounds, 10);
    if (rounds >= DICCIONARIO_DIABOLICO_CONFIG.MIN_ROUNDS && rounds <= DICCIONARIO_DIABOLICO_CONFIG.MAX_ROUNDS) {
      setMaxRoundsAction(rounds);
    }
    
    const success = startGame();
    if (success) {
      // Navegar automáticamente a la primera ronda
      setTimeout(() => {
        if (navigation) {
          navigation.navigate('diccionario-diabolico-juego');
        }
      }, 500);
    }
  };
  
  const isHost = hostPlayerId === currentPlayerId;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>El Diccionario Diabólico</Text>
        <Text style={styles.subtitle}>Juego social de palabras y faroleo</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length}/{DICCIONARIO_DIABOLICO_CONFIG.MAX_PLAYERS})</Text>
        <Text style={styles.sectionHint}>
          Mínimo {DICCIONARIO_DIABOLICO_CONFIG.MIN_PLAYERS} jugadores
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPlayer}
          >
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
        
        {players.length > 0 && (
          <View style={styles.playersList}>
            {players.map((player, index) => (
              <View key={player.id} style={styles.playerItem}>
                <Text style={styles.playerName}>
                  {index + 1}. {player.name}
                  {player.isHost && <Text style={styles.hostBadge}> (Anfitrión)</Text>}
                </Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Número de rondas:</Text>
          <TextInput
            style={styles.roundsInput}
            value={maxRounds}
            onChangeText={setMaxRounds}
            keyboardType="numeric"
          />
        </View>
      </View>
      
      {isHost && players.length >= DICCIONARIO_DIABOLICO_CONFIG.MIN_PLAYERS && (
        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStartGame}
        >
          <Text style={styles.startButtonText}>Comenzar Juego</Text>
        </TouchableOpacity>
      )}
      
      {!isHost && (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>
            Solo el anfitrión puede comenzar el juego
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    padding: 20,
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 12,
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
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#6200ee',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersList: {
    marginTop: 8,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6200ee',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  hostBadge: {
    color: '#6200ee',
    fontWeight: 'bold',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#ff4444',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
  },
  roundsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    width: 80,
    textAlign: 'center',
    fontSize: 16,
  },
  startButton: {
    backgroundColor: '#6200ee',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
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
