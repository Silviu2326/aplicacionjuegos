import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';
import { GAME_CONFIG, SAMPLE_PLAYER_NAMES, SAMPLE_GAME_STATS } from '../constants/OneNightWerewolfRoles';

export const OneNightWerewolfIndex = ({ navigation }) => {
  const players = useOneNightWerewolfStore((state) => state.players);
  const addPlayer = useOneNightWerewolfStore((state) => state.addPlayer);
  const removePlayer = useOneNightWerewolfStore((state) => state.removePlayer);
  const generateRoomCode = useOneNightWerewolfStore((state) => state.generateRoomCode);
  const roomCode = useOneNightWerewolfStore((state) => state.roomCode);
  
  const [playerName, setPlayerName] = useState('');
  
  React.useEffect(() => {
    if (!roomCode) {
      generateRoomCode();
    }
  }, []);
  
  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Ya existe un jugador con ese nombre');
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };
  
  const handleQuickAdd = () => {
    const availableNames = SAMPLE_PLAYER_NAMES.filter(
      name => !players.some(p => p.name.toLowerCase() === name.toLowerCase())
    );
    
    if (availableNames.length === 0) {
      Alert.alert('Info', 'No hay más nombres disponibles para añadir rápidamente');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }
    
    const randomName = availableNames[Math.floor(Math.random() * availableNames.length)];
    addPlayer(randomName);
  };
  
  const handleJoinRoom = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert('Error', `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para iniciar`);
      return;
    }
    
    if (navigation && navigation.navigate) {
      navigation.navigate('oneNightWerewolfLobby');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>One Night Ultimate Werewolf</Text>
          <Text style={styles.subtitle}>Juego social de deducción</Text>
          <Text style={styles.description}>
            Un juego rápido de deducción donde cada jugador tiene un rol secreto. 
            Durante la noche, los roles especiales actúan. Luego, todos despiertan 
            y tienen 5 minutos para discutir y encontrar a los Hombres Lobo.
          </Text>
        </View>
        
        {roomCode && (
          <View style={styles.roomCodeContainer}>
            <Text style={styles.roomCodeLabel}>Código de Sala</Text>
            <Text style={styles.roomCode}>{roomCode}</Text>
            <Text style={styles.roomCodeHint}>
              Comparte este código con otros jugadores
            </Text>
          </View>
        )}
        
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{SAMPLE_GAME_STATS.totalGames}</Text>
            <Text style={styles.statLabel}>Partidas Jugadas</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{SAMPLE_GAME_STATS.villageWins}</Text>
            <Text style={styles.statLabel}>Victorias Aldea</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{SAMPLE_GAME_STATS.werewolfWins}</Text>
            <Text style={styles.statLabel}>Victorias Lobos</Text>
          </View>
        </View>
        
        <View style={styles.addPlayerSection}>
          <Text style={styles.sectionTitle}>Añadir Jugadores</Text>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            placeholderTextColor="#999"
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity 
              style={[styles.addButton, styles.addButtonPrimary]} 
              onPress={handleAddPlayer}
            >
              <Text style={styles.addButtonText}>Añadir Jugador</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.addButton, styles.addButtonSecondary]} 
              onPress={handleQuickAdd}
            >
              <Text style={styles.addButtonTextSecondary}>Añadir Aleatorio</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.playersSection}>
          <Text style={styles.playersTitle}>
            Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
          </Text>
          {players.length < GAME_CONFIG.MIN_PLAYERS && (
            <Text style={styles.warningText}>
              Necesitas al menos {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar
            </Text>
          )}
          
          {players.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>👥</Text>
              <Text style={styles.noPlayersText}>
                No hay jugadores añadidos
              </Text>
              <Text style={styles.emptyStateHint}>
                Añade al menos {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar una partida
              </Text>
            </View>
          ) : (
            <View style={styles.playersList}>
              {players.map((player, index) => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerInfo}>
                    <View style={styles.playerNumber}>
                      <Text style={styles.playerNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
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
        </View>
        
        <TouchableOpacity
          style={[
            styles.joinButton,
            players.length < GAME_CONFIG.MIN_PLAYERS && styles.joinButtonDisabled,
          ]}
          onPress={handleJoinRoom}
          disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
        >
          <Text style={styles.joinButtonText}>Ir a la Sala</Text>
          <Text style={styles.joinButtonSubtext}>
            {players.length >= GAME_CONFIG.MIN_PLAYERS 
              ? 'Listo para configurar la partida' 
              : `Faltan ${GAME_CONFIG.MIN_PLAYERS - players.length} jugador${GAME_CONFIG.MIN_PLAYERS - players.length > 1 ? 'es' : ''}`}
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
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    color: '#8B0000',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
    paddingHorizontal: 10,
  },
  roomCodeContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomCodeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  roomCode: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 6,
    marginBottom: 8,
  },
  roomCodeHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statBox: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  addPlayerSection: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  addButton: {
    flex: 1,
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  addButtonPrimary: {
    backgroundColor: '#2196F3',
  },
  addButtonSecondary: {
    backgroundColor: '#f0f0f0',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  addButtonTextSecondary: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  playersSection: {
    marginBottom: 24,
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  warningText: {
    fontSize: 13,
    color: '#FF9800',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  noPlayersText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  emptyStateHint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  playersList: {
    marginBottom: 24,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playerNumberText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 18,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  joinButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  joinButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  joinButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
});

