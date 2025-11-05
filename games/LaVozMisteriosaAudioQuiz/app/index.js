import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useVozMisteriosaStore } from '../store/vozMisteriosaStore';
import { VozMisteriosaScoreboard } from '../components/VozMisteriosaScoreboard';

const MIN_PLAYERS_MULTIPLAYER = 2;
const MAX_PLAYERS = 10;

export const LaVozMisteriosaAudioQuizIndex = ({ navigation }) => {
  const players = useVozMisteriosaStore((state) => state.players);
  const addPlayer = useVozMisteriosaStore((state) => state.addPlayer);
  const removePlayer = useVozMisteriosaStore((state) => state.removePlayer);
  const gameMode = useVozMisteriosaStore((state) => state.gameMode);
  const setGameMode = useVozMisteriosaStore((state) => state.setGameMode);
  const resetGame = useVozMisteriosaStore((state) => state.resetGame);
  
  const [playerName, setPlayerName] = useState('');

  const handleAddPlayer = () => {
    if (playerName.trim() && players.length < MAX_PLAYERS) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleStart = () => {
    if (gameMode === 'multijugador' && players.length < MIN_PLAYERS_MULTIPLAYER) {
      return;
    }
    
    if (navigation && navigation.navigate) {
      navigation.navigate('setup-voz-misteriosa');
    }
  };

  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>La Voz Misteriosa</Text>
        <Text style={styles.subtitle}>Audio Quiz</Text>
      </View>
      
      <View style={styles.content}>
        <Text style={styles.description}>
          Pon a prueba tu oído y tus conocimientos sobre cultura popular, naturaleza y mucho más.
          Escucha clips de audio y adivina de qué se trata. Cada acierto suma puntos.
          ¡El jugador con la puntuación más alta gana!
        </Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de Juego</Text>
          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                gameMode === 'solitario' && styles.modeButtonActive,
              ]}
              onPress={() => setGameMode('solitario')}
            >
              <Text style={[
                styles.modeButtonText,
                gameMode === 'solitario' && styles.modeButtonTextActive,
              ]}>
                🎮 Solitario
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                gameMode === 'multijugador' && styles.modeButtonActive,
              ]}
              onPress={() => setGameMode('multijugador')}
            >
              <Text style={[
                styles.modeButtonText,
                gameMode === 'multijugador' && styles.modeButtonTextActive,
              ]}>
                👥 Multijugador
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {gameMode === 'multijugador' && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Jugadores ({players.length}/{MAX_PLAYERS})
            </Text>
            <Text style={styles.sectionHint}>
              Mínimo {MIN_PLAYERS_MULTIPLAYER} jugadores
            </Text>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Nombre del jugador"
                value={playerName}
                onChangeText={setPlayerName}
                onSubmitEditing={handleAddPlayer}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPlayer}
                disabled={!playerName.trim() || players.length >= MAX_PLAYERS}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            
            {players.length > 0 && (
              <VozMisteriosaScoreboard 
                players={players}
                currentPlayerId={null}
              />
            )}
          </View>
        )}

        {gameMode === 'solitario' && players.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Jugador</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                value={playerName}
                onChangeText={setPlayerName}
                onSubmitEditing={handleAddPlayer}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={handleAddPlayer}
                disabled={!playerName.trim()}
              >
                <Text style={styles.addButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        
        <TouchableOpacity
          style={[
            styles.startButton,
            (gameMode === 'multijugador' && players.length < MIN_PLAYERS_MULTIPLAYER) &&
              styles.startButtonDisabled,
            (gameMode === 'solitario' && players.length === 0) &&
              styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={
            (gameMode === 'multijugador' && players.length < MIN_PLAYERS_MULTIPLAYER) ||
            (gameMode === 'solitario' && players.length === 0)
          }
        >
          <Text style={styles.startButtonText}>
            {gameMode === 'multijugador' && players.length < MIN_PLAYERS_MULTIPLAYER
              ? `Necesitas ${
                  MIN_PLAYERS_MULTIPLAYER - players.length
                } jugador${MIN_PLAYERS_MULTIPLAYER - players.length > 1 ? 'es' : ''} más`
              : gameMode === 'solitario' && players.length === 0
              ? 'Agrega tu nombre'
              : 'Configurar Juego'}
          </Text>
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
  header: {
    backgroundColor: '#9c27b0',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  modeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  modeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#9c27b0',
    borderColor: '#9c27b0',
  },
  modeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#4caf50',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#9c27b0',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default LaVozMisteriosaAudioQuizIndex;

