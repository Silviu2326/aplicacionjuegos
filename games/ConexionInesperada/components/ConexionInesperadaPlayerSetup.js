import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useConexionInesperadaStore } from '../store/useConexionInesperadaStore';
import { GAME_CONFIG } from '../constants/ConexionInesperadaConceptList';

export const ConexionInesperadaPlayerSetup = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [maxRounds, setMaxRounds] = useState(GAME_CONFIG.DEFAULT_ROUNDS.toString());
  const [writingTime, setWritingTime] = useState(GAME_CONFIG.DEFAULT_WRITING_TIME.toString());
  const [votingTime, setVotingTime] = useState(GAME_CONFIG.DEFAULT_VOTING_TIME.toString());
  
  const players = useConexionInesperadaStore((state) => state.players);
  const addPlayer = useConexionInesperadaStore((state) => state.addPlayer);
  const removePlayer = useConexionInesperadaStore((state) => state.removePlayer);
  const setMaxRoundsAction = useConexionInesperadaStore((state) => state.setMaxRounds);
  const setWritingTimeAction = useConexionInesperadaStore((state) => state.setWritingTime);
  const setVotingTimeAction = useConexionInesperadaStore((state) => state.setVotingTime);
  const startGame = useConexionInesperadaStore((state) => state.startGame);

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
    if (rounds >= 1 && rounds <= 50) {
      setMaxRoundsAction(rounds);
    }
    
    // Configurar tiempos
    const writing = parseInt(writingTime, 10);
    if (writing >= 30 && writing <= 300) {
      setWritingTimeAction(writing);
    }
    
    const voting = parseInt(votingTime, 10);
    if (voting >= 10 && voting <= 120) {
      setVotingTimeAction(voting);
    }
    
    const success = startGame();
    if (success && onStartGame) {
      onStartGame();
    }
  };

  // Datos de ejemplo para facilitar pruebas
  const exampleNames = ['Ana', 'Carlos', 'María', 'Luis', 'Sofía', 'Diego'];
  
  const handleAddExamplePlayers = () => {
    const remainingNames = exampleNames.filter(name => 
      !players.some(p => p.name.toLowerCase() === name.toLowerCase())
    );
    
    remainingNames.slice(0, GAME_CONFIG.MIN_PLAYERS - players.length).forEach(name => {
      addPlayer(name);
    });
    
    if (remainingNames.length === 0) {
      Alert.alert('Info', 'Todos los nombres de ejemplo ya están en uso');
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>⚡ Conexión Inesperada</Text>
        <Text style={styles.subtitle}>Encuentra la conexión más creativa entre dos conceptos aparentemente sin relación</Text>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>👥 Jugadores</Text>
          <View style={styles.playerCountBadge}>
            <Text style={styles.playerCountText}>{players.length}</Text>
          </View>
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            placeholderTextColor="#999"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
          />
          <TouchableOpacity 
            style={[styles.addButton, playerName.trim() === '' && styles.addButtonDisabled]} 
            onPress={handleAddPlayer}
            disabled={playerName.trim() === ''}
          >
            <Text style={styles.addButtonText}>+ Añadir</Text>
          </TouchableOpacity>
        </View>
        
        {players.length < GAME_CONFIG.MIN_PLAYERS && (
          <TouchableOpacity 
            style={styles.exampleButton}
            onPress={handleAddExamplePlayers}
          >
            <Text style={styles.exampleButtonText}>
              🎲 Añadir jugadores de ejemplo
            </Text>
          </TouchableOpacity>
        )}
        
        {players.length > 0 && (
          <View style={styles.playersList}>
            {players.map((player, index) => (
              <View key={player.id} style={styles.playerItem}>
                <View style={styles.playerInfo}>
                  <View style={styles.playerAvatar}>
                    <Text style={styles.playerAvatarText}>
                      {player.name.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <Text style={styles.playerName}>{player.name}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => handleRemovePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        
        {players.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>No hay jugadores aún</Text>
            <Text style={styles.emptyStateHint}>
              Añade al menos {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
        </View>
        
        <View style={styles.configItem}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.label}>📊 Número de rondas</Text>
            <Text style={styles.labelHint}>(1-50)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={`${GAME_CONFIG.DEFAULT_ROUNDS} rondas`}
            placeholderTextColor="#999"
            value={maxRounds}
            onChangeText={setMaxRounds}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.configItem}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.label}>✍️ Tiempo de escritura</Text>
            <Text style={styles.labelHint}>(30-300 segundos)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={`${GAME_CONFIG.DEFAULT_WRITING_TIME} segundos`}
            placeholderTextColor="#999"
            value={writingTime}
            onChangeText={setWritingTime}
            keyboardType="numeric"
          />
        </View>
        
        <View style={styles.configItem}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.label}>🗳️ Tiempo de votación</Text>
            <Text style={styles.labelHint}>(10-120 segundos)</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder={`${GAME_CONFIG.DEFAULT_VOTING_TIME} segundos`}
            placeholderTextColor="#999"
            value={votingTime}
            onChangeText={setVotingTime}
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.startButton,
          players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled
        ]}
        onPress={handleStartGame}
        disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
      >
        <Text style={styles.startButtonText}>
          {players.length < GAME_CONFIG.MIN_PLAYERS 
            ? `Se necesitan ${GAME_CONFIG.MIN_PLAYERS} jugadores` 
            : '🚀 Comenzar Partida'}
        </Text>
      </TouchableOpacity>
      
      {players.length < GAME_CONFIG.MIN_PLAYERS && (
        <Text style={styles.minPlayersHint}>
          Faltan {GAME_CONFIG.MIN_PLAYERS - players.length} jugador{GAME_CONFIG.MIN_PLAYERS - players.length > 1 ? 'es' : ''} para comenzar
        </Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#1a1a1a',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    textAlign: 'center',
    color: '#666',
    lineHeight: 22,
    paddingHorizontal: 10,
  },
  section: {
    marginBottom: 24,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
  },
  playerCountBadge: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  playerCountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    backgroundColor: '#fafafa',
    marginRight: 10,
    color: '#1a1a1a',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  addButtonDisabled: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  exampleButton: {
    backgroundColor: '#e3f2fd',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  exampleButtonText: {
    color: '#2196F3',
    fontWeight: '600',
    fontSize: 14,
  },
  playersList: {
    marginTop: 12,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerAvatarText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  playerName: {
    fontSize: 17,
    color: '#1a1a1a',
    fontWeight: '600',
  },
  removeButton: {
    padding: 6,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#ffebee',
  },
  removeButtonText: {
    color: '#f44336',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 8,
    fontWeight: '500',
  },
  emptyStateHint: {
    fontSize: 13,
    color: '#bbb',
    textAlign: 'center',
  },
  configItem: {
    marginBottom: 20,
  },
  configLabelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  labelHint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 24,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  startButtonDisabled: {
    backgroundColor: '#cccccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  minPlayersHint: {
    textAlign: 'center',
    color: '#999',
    fontSize: 13,
    marginBottom: 20,
    fontStyle: 'italic',
  },
});

