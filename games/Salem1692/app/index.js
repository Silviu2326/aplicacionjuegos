import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useSalem1692GameStore } from '../store/salem1692GameStore';
import { GAME_CONFIG } from '../constants/Salem1692CardData';

export const Salem1692Index = ({ navigation }) => {
  const players = useSalem1692GameStore((state) => state.players);
  const addPlayer = useSalem1692GameStore((state) => state.addPlayer);
  const removePlayer = useSalem1692GameStore((state) => state.removePlayer);
  const initializeGame = useSalem1692GameStore((state) => state.initializeGame);
  
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
        navigation.navigate('salem1692-game-screen');
      }
    } else {
      Alert.alert('Error', 'No se pudo inicializar el juego');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Salem 1692</Text>
        <Text style={styles.subtitle}>Juego de Deducción Social</Text>
        <Text style={styles.description}>
          En Salem 1692, los jugadores asumen roles secretos de Bruja o Aldeano. 
          Los Aldeanos deben descubrir y eliminar a las Brujas, mientras que las 
          Brujas intentan eliminarlos o convertirlos.
        </Text>
        
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
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Instrucciones:</Text>
          <Text style={styles.infoText}>
            • El juego se desarrolla en fases de Noche y Día{'\n'}
            • Durante la Noche, las Brujas eligen un objetivo para la Conspiración{'\n'}
            • Durante el Día, los jugadores roban cartas y acusan a otros{'\n'}
            • 7 acusaciones activan un Juicio donde se revelan cartas y se vota{'\n'}
            • Los Aldeanos ganan eliminando a todas las Brujas{'\n'}
            • Las Brujas ganan eliminando a todos los Aldeanos
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#fff',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 16,
    color: '#ccc',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 24,
    color: '#aaa',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  addPlayerSection: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#444',
    color: '#fff',
  },
  addButton: {
    backgroundColor: '#6a1b9a',
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  noPlayersText: {
    fontSize: 14,
    color: '#aaa',
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
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    color: '#fff',
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
    backgroundColor: '#444',
    opacity: 0.5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoSection: {
    backgroundColor: '#2d2d2d',
    borderRadius: 8,
    padding: 16,
    marginTop: 12,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#fff',
  },
  infoText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 22,
  },
});

