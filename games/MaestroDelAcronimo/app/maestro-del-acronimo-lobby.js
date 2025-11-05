import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useMaestroDelAcronimoStore } from '../store/maestroDelAcronimoStore';
import { GAME_CONFIG } from '../constants/MaestroDelAcronimoConfig';

export const MaestroDelAcronimoLobby = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [maxRounds, setMaxRounds] = useState(GAME_CONFIG.DEFAULT_ROUNDS.toString());
  const [writingTime, setWritingTime] = useState(GAME_CONFIG.DEFAULT_WRITING_TIME.toString());
  const [votingTime, setVotingTime] = useState(GAME_CONFIG.DEFAULT_VOTING_TIME.toString());
  const [isCreating, setIsCreating] = useState(false);
  
  const players = useMaestroDelAcronimoStore((state) => state.players);
  const currentGameCode = useMaestroDelAcronimoStore((state) => state.gameCode);
  const addPlayer = useMaestroDelAcronimoStore((state) => state.addPlayer);
  const removePlayer = useMaestroDelAcronimoStore((state) => state.removePlayer);
  const createGame = useMaestroDelAcronimoStore((state) => state.createGame);
  const joinGame = useMaestroDelAcronimoStore((state) => state.joinGame);
  const setMaxRoundsAction = useMaestroDelAcronimoStore((state) => state.setMaxRounds);
  const setWritingTimeAction = useMaestroDelAcronimoStore((state) => state.setWritingTime);
  const setVotingTimeAction = useMaestroDelAcronimoStore((state) => state.setVotingTime);
  const startGame = useMaestroDelAcronimoStore((state) => state.startGame);

  const handleCreateGame = () => {
    const code = createGame();
    setIsCreating(true);
    Alert.alert(
      'Partida creada',
      `Código de la partida: ${code}\n\nComparte este código con tus amigos para que se unan.`,
      [{ text: 'OK' }]
    );
  };

  const handleJoinGame = () => {
    if (!gameCode.trim()) {
      Alert.alert('Error', 'Por favor ingresa un código de partida');
      return;
    }
    
    const success = joinGame(gameCode.trim().toUpperCase());
    if (success) {
      setIsCreating(true);
      Alert.alert('Éxito', 'Te has unido a la partida');
    } else {
      Alert.alert('Error', 'No se pudo unir a la partida. Verifica el código.');
    }
  };

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar rondas
    const rounds = parseInt(maxRounds, 10);
    if (rounds >= GAME_CONFIG.MIN_ROUNDS && rounds <= GAME_CONFIG.MAX_ROUNDS) {
      setMaxRoundsAction(rounds);
    }
    
    // Configurar tiempos
    const writing = parseInt(writingTime, 10);
    if (writing >= GAME_CONFIG.MIN_WRITING_TIME && writing <= GAME_CONFIG.MAX_WRITING_TIME) {
      setWritingTimeAction(writing);
    }
    
    const voting = parseInt(votingTime, 10);
    if (voting >= GAME_CONFIG.MIN_VOTING_TIME && voting <= GAME_CONFIG.MAX_VOTING_TIME) {
      setVotingTimeAction(voting);
    }
    
    const success = startGame();
    if (success && onStartGame) {
      onStartGame();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Maestro del Acrónimo</Text>
      <Text style={styles.subtitle}>Crea o únete a una partida</Text>
      
      {!currentGameCode && !isCreating && (
        <View style={styles.section}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={handleCreateGame}
          >
            <Text style={styles.createButtonText}>Crear Partida</Text>
          </TouchableOpacity>
          
          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>O</Text>
            <View style={styles.dividerLine} />
          </View>
          
          <Text style={styles.label}>Unirse a partida</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Código de partida"
              value={gameCode}
              onChangeText={setGameCode}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={styles.joinButton}
              onPress={handleJoinGame}
            >
              <Text style={styles.joinButtonText}>Unirse</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      
      {currentGameCode && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Código de la partida</Text>
          <Text style={styles.gameCode}>{currentGameCode}</Text>
          <Text style={styles.codeHint}>Comparte este código con tus amigos</Text>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length})</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
            <Text style={styles.addButtonText}>Añadir</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.playersList}>
          {players.map((player) => (
            <View key={player.id} style={styles.playerItem}>
              <Text style={styles.playerName}>{player.name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemovePlayer(player.id)}
              >
                <Text style={styles.removeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        
        <Text style={styles.label}>Número de rondas ({GAME_CONFIG.MIN_ROUNDS}-{GAME_CONFIG.MAX_ROUNDS})</Text>
        <TextInput
          style={styles.input}
          placeholder={`${GAME_CONFIG.DEFAULT_ROUNDS} rondas`}
          value={maxRounds}
          onChangeText={setMaxRounds}
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Tiempo de escritura (segundos, {GAME_CONFIG.MIN_WRITING_TIME}-{GAME_CONFIG.MAX_WRITING_TIME})</Text>
        <TextInput
          style={styles.input}
          placeholder={`${GAME_CONFIG.DEFAULT_WRITING_TIME} segundos`}
          value={writingTime}
          onChangeText={setWritingTime}
          keyboardType="numeric"
        />
        
        <Text style={styles.label}>Tiempo de votación (segundos, {GAME_CONFIG.MIN_VOTING_TIME}-{GAME_CONFIG.MAX_VOTING_TIME})</Text>
        <TextInput
          style={styles.input}
          placeholder={`${GAME_CONFIG.DEFAULT_VOTING_TIME} segundos`}
          value={votingTime}
          onChangeText={setVotingTime}
          keyboardType="numeric"
        />
      </View>
      
      <TouchableOpacity
        style={[
          styles.startButton,
          players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled
        ]}
        onPress={handleStartGame}
        disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
      >
        <Text style={styles.startButtonText}>Comenzar Partida</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
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
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  createButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#999',
    fontSize: 14,
  },
  gameCode: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
    letterSpacing: 4,
    marginVertical: 10,
  },
  codeHint: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
  },
  addButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  joinButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 6,
    justifyContent: 'center',
  },
  joinButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  playersList: {
    marginTop: 8,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    padding: 4,
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#f44336',
    fontSize: 20,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 12,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

