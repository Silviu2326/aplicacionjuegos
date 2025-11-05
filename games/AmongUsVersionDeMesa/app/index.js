import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAmongUsMesaStore } from '../store/amongUsMesaStore';
import { AmongUsMesaPlayerAvatar } from '../components/AmongUsMesaPlayerAvatar';
import { GAME_CONFIG, EXAMPLE_STATISTICS, FAKE_PLAYER_NAMES } from '../constants/AmongUsMesaGameSettings';

export const AmongUsMesaIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showRules, setShowRules] = useState(false);
  
  // Simular datos falsos de estadísticas
  const [fakeStats] = useState({
    ...EXAMPLE_STATISTICS,
    winRate: Math.round((EXAMPLE_STATISTICS.wins.crewmates / EXAMPLE_STATISTICS.totalGames) * 100),
    favoriteRoom: 'Cafetería',
    lastPlayed: 'Hace 2 horas',
    streak: 3,
  });
  
  const players = useAmongUsMesaStore((state) => state.players);
  const currentRoomCode = useAmongUsMesaStore((state) => state.roomCode);
  const hostPlayerId = useAmongUsMesaStore((state) => state.hostPlayerId);
  const createRoom = useAmongUsMesaStore((state) => state.createRoom);
  const joinRoom = useAmongUsMesaStore((state) => state.joinRoom);
  const removePlayer = useAmongUsMesaStore((state) => state.removePlayer);
  const startGame = useAmongUsMesaStore((state) => state.startGame);
  const settings = useAmongUsMesaStore((state) => state.settings);
  const updateSettings = useAmongUsMesaStore((state) => state.updateSettings);
  
  const isHost = players.length > 0 && players[0].isHost;
  
  const handleCreateRoom = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }
    
    const code = createRoom(playerName.trim());
    setPlayerName('');
    Alert.alert('Sala creada', `Código de sala: ${code}`, [
      { text: 'OK' }
    ]);
  };
  
  const handleJoinRoom = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }
    
    if (roomCode.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el código de la sala');
      return;
    }
    
    const success = joinRoom(roomCode.trim().toUpperCase(), playerName.trim());
    if (success) {
      setPlayerName('');
      setRoomCode('');
      setIsJoining(false);
    } else {
      Alert.alert('Error', 'No se pudo unir a la sala. Verifica el código.');
    }
  };
  
  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert('Error', `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar`);
      return;
    }
    
    const success = startGame();
    if (success) {
      navigation?.navigate('role-reveal');
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego');
    }
  };
  
  const handleAddBot = () => {
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${GAME_CONFIG.MAX_PLAYERS} jugadores`);
      return;
    }
    
    // Generar nombre aleatorio de bot
    const availableNames = FAKE_PLAYER_NAMES.filter(name => 
      !players.some(p => p.name === name)
    );
    const botName = availableNames[Math.floor(Math.random() * availableNames.length)] || `Bot${players.length + 1}`;
    
    const success = joinRoom(currentRoomCode, botName);
    if (!success) {
      Alert.alert('Error', 'No se pudo agregar el bot');
    }
  };
  
  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };
  
  if (!currentRoomCode) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Among Us</Text>
          <Text style={styles.subtitle}>Versión de Mesa</Text>
        </View>
        
        <View style={styles.quickStats}>
          <TouchableOpacity style={styles.statCard} onPress={() => setShowStats(!showStats)}>
            <Text style={styles.statEmoji}>📊</Text>
            <Text style={styles.statLabel}>Estadísticas</Text>
            <Text style={styles.statValue}>{fakeStats.totalGames} partidas</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.statCard} onPress={() => setShowRules(!showRules)}>
            <Text style={styles.statEmoji}>📖</Text>
            <Text style={styles.statLabel}>Reglas</Text>
            <Text style={styles.statValue}>Ver guía</Text>
          </TouchableOpacity>
        </View>
        
        {showStats && (
          <View style={styles.statsPanel}>
            <Text style={styles.statsTitle}>Tus Estadísticas</Text>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Partidas totales: {fakeStats.totalGames}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Victorias Tripulantes: {fakeStats.wins.crewmates}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Victorias Impostores: {fakeStats.wins.impostors}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Tasa de victoria: {fakeStats.winRate}%</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Racha actual: {fakeStats.streak} partidas</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Última partida: {fakeStats.lastPlayed}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Tareas completadas: {fakeStats.totalTasksCompleted}</Text>
            </View>
            <View style={styles.statsRow}>
              <Text style={styles.statsText}>Eliminaciones: {fakeStats.totalKills}</Text>
            </View>
          </View>
        )}
        
        {showRules && (
          <View style={styles.rulesPanel}>
            <Text style={styles.rulesTitle}>Cómo Jugar</Text>
            <Text style={styles.rulesText}>
              <Text style={styles.rulesBold}>Tripulantes:</Text> Completa todas tus tareas o identifica y expulsa a los impostores.{'\n\n'}
              <Text style={styles.rulesBold}>Impostores:</Text> Elimina a los tripulantes sin ser descubierto. Puedes sabotear sistemas y usar conductos.{'\n\n'}
              <Text style={styles.rulesBold}>Reuniones:</Text> Se activan al reportar un cuerpo o presionar el botón de emergencia. Discute y vota para expulsar sospechosos.{'\n\n'}
              <Text style={styles.rulesBold}>Victoria:</Text> Tripulantes ganan completando todas las tareas o expulsando a todos los impostores. Impostores ganan si son iguales o más que los tripulantes.
            </Text>
            <TouchableOpacity style={styles.closeRulesButton} onPress={() => setShowRules(false)}>
              <Text style={styles.closeRulesText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        )}
        
        <View style={styles.formSection}>
          <Text style={styles.sectionTitle}>Crear o Unirse</Text>
          <TextInput
            style={styles.input}
            placeholder="Tu nombre"
            value={playerName}
            onChangeText={setPlayerName}
            maxLength={20}
          />
          
          {!isJoining ? (
            <>
              <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
                <Text style={styles.buttonText}>🎮 Crear Sala</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setIsJoining(true)}
              >
                <Text style={styles.buttonText}>🔗 Unirse a Sala</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                style={styles.input}
                placeholder="Código de sala (ej: ABC123)"
                value={roomCode}
                onChangeText={setRoomCode}
                autoCapitalize="characters"
                maxLength={6}
              />
              <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
                <Text style={styles.buttonText}>✅ Unirse</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => setIsJoining(false)}
              >
                <Text style={styles.buttonText}>❌ Cancelar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>💡 Consejos</Text>
          <Text style={styles.infoText}>• Mínimo {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar</Text>
          <Text style={styles.infoText}>• Máximo {GAME_CONFIG.MAX_PLAYERS} jugadores por sala</Text>
          <Text style={styles.infoText}>• El anfitrión puede configurar el juego</Text>
          <Text style={styles.infoText}>• Observa bien y toma notas durante las reuniones</Text>
        </View>
      </ScrollView>
    );
  }
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sala de Juego</Text>
      
      <View style={styles.roomCodeSection}>
        <Text style={styles.roomCodeLabel}>Código de Sala:</Text>
        <Text style={styles.roomCode}>{currentRoomCode}</Text>
      </View>
      
      {isHost && (
        <View style={styles.settingsSection}>
          <Text style={styles.settingsTitle}>⚙️ Configuración del Juego</Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>👹 Impostores:</Text>
              <Text style={styles.settingDescription}>
                {settings.impostorCount === 1 ? '1 impostor' : `${settings.impostorCount} impostores`}
              </Text>
            </View>
            <View style={styles.settingControls}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ impostorCount: Math.max(1, settings.impostorCount - 1) })}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{settings.impostorCount}</Text>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ impostorCount: Math.min(Math.floor(players.length / 2), settings.impostorCount + 1) })}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>✅ Tareas por jugador:</Text>
              <Text style={styles.settingDescription}>
                Cada tripulante tendrá {settings.taskCount} tareas
              </Text>
            </View>
            <View style={styles.settingControls}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ taskCount: Math.max(1, settings.taskCount - 1) })}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{settings.taskCount}</Text>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ taskCount: Math.min(5, settings.taskCount + 1) })}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>⏱️ Tiempo de discusión:</Text>
              <Text style={styles.settingDescription}>
                {Math.floor(settings.discussionTime / 1000)} segundos
              </Text>
            </View>
            <View style={styles.settingControls}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ discussionTime: Math.max(30000, settings.discussionTime - 10000) })}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{Math.floor(settings.discussionTime / 1000)}s</Text>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ discussionTime: Math.min(300000, settings.discussionTime + 10000) })}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>🗳️ Tiempo de votación:</Text>
              <Text style={styles.settingDescription}>
                {Math.floor(settings.votingTime / 1000)} segundos
              </Text>
            </View>
            <View style={styles.settingControls}>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ votingTime: Math.max(15000, settings.votingTime - 5000) })}
              >
                <Text style={styles.settingButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{Math.floor(settings.votingTime / 1000)}s</Text>
              <TouchableOpacity
                style={styles.settingButton}
                onPress={() => updateSettings({ votingTime: Math.min(60000, settings.votingTime + 5000) })}
              >
                <Text style={styles.settingButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={styles.addBotButton} onPress={handleAddBot}>
            <Text style={styles.addBotText}>🤖 Agregar Bot (Demo)</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <ScrollView style={styles.playerListContainer}>
        <Text style={styles.playerListTitle}>Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})</Text>
        <View style={styles.playerGrid}>
          {players.map((player) => (
            <View key={player.id} style={styles.playerItem}>
              <AmongUsMesaPlayerAvatar player={player} size={70} />
              {player.isHost && (
                <Text style={styles.hostBadge}>Anfitrión</Text>
              )}
              {isHost && !player.isHost && (
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </ScrollView>
      
      {isHost && (
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled
          ]}
          onPress={handleStartGame}
          disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>Comenzar Juego</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 30,
    textAlign: 'center',
  },
  quickStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statEmoji: {
    fontSize: 30,
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  statsPanel: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statsText: {
    fontSize: 16,
    color: '#666',
  },
  rulesPanel: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  rulesText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
    marginBottom: 15,
  },
  rulesBold: {
    fontWeight: 'bold',
    color: '#333',
  },
  closeRulesButton: {
    backgroundColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  closeRulesText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoSection: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  formSection: {
    width: '100%',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roomCodeSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomCodeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  roomCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    letterSpacing: 5,
  },
  settingsSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  settingButton: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: '#4caf50',
    justifyContent: 'center',
    alignItems: 'center',
  },
  settingButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 30,
    textAlign: 'center',
  },
  settingInfo: {
    flex: 1,
    marginRight: 10,
  },
  settingDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  addBotButton: {
    backgroundColor: '#9c27b0',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  addBotText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playerListContainer: {
    flex: 1,
    marginBottom: 20,
  },
  playerListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  playerGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  playerItem: {
    alignItems: 'center',
    margin: 10,
    position: 'relative',
  },
  hostBadge: {
    marginTop: 5,
    fontSize: 12,
    color: '#4caf50',
    fontWeight: '600',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
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

