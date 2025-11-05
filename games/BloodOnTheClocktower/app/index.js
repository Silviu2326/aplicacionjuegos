import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useBloodOnTheClocktowerStore } from '../store/bloodOnTheClocktowerStore';
import { GAME_CONFIG } from '../constants/BloodOnTheClocktowerRoles';

export const BloodOnTheClocktowerIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  const [isStoryteller, setIsStoryteller] = useState(false);
  
  const players = useBloodOnTheClocktowerStore((state) => state.players);
  const currentRoomCode = useBloodOnTheClocktowerStore((state) => state.roomCode);
  const hostPlayerId = useBloodOnTheClocktowerStore((state) => state.hostPlayerId);
  const createRoom = useBloodOnTheClocktowerStore((state) => state.createRoom);
  const joinRoom = useBloodOnTheClocktowerStore((state) => state.joinRoom);
  const removePlayer = useBloodOnTheClocktowerStore((state) => state.removePlayer);
  const startGame = useBloodOnTheClocktowerStore((state) => state.startGame);
  
  const isHost = players.length > 0 && players[0].isHost;
  
  const handleCreateRoom = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }
    
    const code = createRoom(playerName.trim(), isStoryteller);
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
    
    if (players.length > GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }
    
    const success = startGame();
    if (success) {
      navigation?.navigate('lobby');
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego');
    }
  };
  
  if (!currentRoomCode) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Blood on the Clocktower</Text>
          <Text style={styles.subtitle}>Juego de Deducción Social</Text>
          
          <View style={styles.infoCard}>
            <Text style={styles.description}>
              Blood on the Clocktower es un juego de deducción social y engaño para 5 a 15 jugadores.
              Los jugadores se dividen en dos equipos: el Bien (Aldeanos y Forasteros) y el Mal (el Demonio y sus Esbirros).
              {'\n\n'}
              El objetivo del equipo del Bien es identificar y ejecutar al Demonio.
              El objetivo del equipo del Mal es sobrevivir y reducir la población hasta que solo queden dos jugadores vivos.
            </Text>
          </View>

          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Características del Juego</Text>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🎭</Text>
              <Text style={styles.featureText}>Roles únicos con habilidades especiales</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌙</Text>
              <Text style={styles.featureText}>Fases nocturnas con acciones secretas</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🗣️</Text>
              <Text style={styles.featureText}>Discusión y debate durante el día</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>⚖️</Text>
              <Text style={styles.featureText}>Sistema de votación y ejecuciones</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👻</Text>
              <Text style={styles.featureText}>Los muertos pueden votar una vez</Text>
            </View>
          </View>

          <View style={styles.statsSection}>
            <Text style={styles.statsTitle}>Estadísticas de la Comunidad</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12,847</Text>
                <Text style={styles.statLabel}>Partidas Jugadas</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>3,291</Text>
                <Text style={styles.statLabel}>Jugadores Activos</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>156</Text>
                <Text style={styles.statLabel}>Salas Activas</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.formSection}>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              value={playerName}
              onChangeText={setPlayerName}
            />
            
            {!isJoining ? (
              <>
                <View style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={styles.checkbox}
                    onPress={() => setIsStoryteller(!isStoryteller)}
                  >
                    <Text style={styles.checkboxText}>
                      {isStoryteller ? '✓' : '○'} Ser el Narrador
                    </Text>
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity style={styles.button} onPress={handleCreateRoom}>
                  <Text style={styles.buttonText}>Crear Sala</Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => setIsJoining(true)}
                >
                  <Text style={styles.buttonText}>Unirse a Sala</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TextInput
                  style={styles.input}
                  placeholder="Código de sala"
                  value={roomCode}
                  onChangeText={setRoomCode}
                  autoCapitalize="characters"
                />
                <TouchableOpacity style={styles.button} onPress={handleJoinRoom}>
                  <Text style={styles.buttonText}>Unirse</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.secondaryButton]}
                  onPress={() => setIsJoining(false)}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
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
        <Text style={styles.roomCodeHint}>
          Comparte este código con otros jugadores para que se unan
        </Text>
      </View>

      <View style={styles.gameInfoSection}>
        <Text style={styles.gameInfoTitle}>Información de la Partida</Text>
        <View style={styles.gameInfoCard}>
          <Text style={styles.gameInfoText}>
            <Text style={styles.gameInfoLabel}>Guion:</Text> Trouble Brewing
          </Text>
          <Text style={styles.gameInfoText}>
            <Text style={styles.gameInfoLabel}>Jugadores necesarios:</Text> {GAME_CONFIG.MIN_PLAYERS}-{GAME_CONFIG.MAX_PLAYERS}
          </Text>
          <Text style={styles.gameInfoText}>
            <Text style={styles.gameInfoLabel}>Tiempo estimado:</Text> 60-90 minutos
          </Text>
          <Text style={styles.gameInfoText}>
            <Text style={styles.gameInfoLabel}>Dificultad:</Text> Intermedia
          </Text>
        </View>
      </View>
      
      <ScrollView style={styles.playerListContainer}>
        <Text style={styles.playerListTitle}>
          Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
        </Text>
        <View style={styles.playerGrid}>
          {players.map((player) => (
            <View key={player.id} style={styles.playerItem}>
              <View
                style={[
                  styles.playerAvatar,
                  { backgroundColor: player.color || '#ccc' },
                ]}
              >
                <Text style={styles.playerInitial}>
                  {player.name?.charAt(0).toUpperCase() || '?'}
                </Text>
              </View>
              <Text style={styles.playerName} numberOfLines={1}>
                {player.name}
              </Text>
              {player.isHost && (
                <Text style={styles.hostBadge}>Anfitrión</Text>
              )}
              {player.isStoryteller && (
                <Text style={styles.storytellerBadge}>Narrador</Text>
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
            (players.length < GAME_CONFIG.MIN_PLAYERS || players.length > GAME_CONFIG.MAX_PLAYERS) &&
              styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={
            players.length < GAME_CONFIG.MIN_PLAYERS || players.length > GAME_CONFIG.MAX_PLAYERS
          }
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
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    marginBottom: 30,
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    lineHeight: 24,
  },
  featuresSection: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: 12,
    width: 30,
  },
  featureText: {
    fontSize: 15,
    color: '#ddd',
    flex: 1,
  },
  statsSection: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  statCard: {
    backgroundColor: '#0f3460',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 100,
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
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
  checkboxContainer: {
    marginBottom: 15,
  },
  checkbox: {
    padding: 10,
    backgroundColor: '#16213e',
    borderRadius: 10,
  },
  checkboxText: {
    color: '#fff',
    fontSize: 16,
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
    backgroundColor: '#16213e',
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
    color: '#aaa',
    marginBottom: 5,
  },
  roomCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4caf50',
    letterSpacing: 5,
    marginBottom: 8,
  },
  roomCodeHint: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
    marginTop: 5,
    fontStyle: 'italic',
  },
  gameInfoSection: {
    marginBottom: 20,
  },
  gameInfoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  gameInfoCard: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
  },
  gameInfoText: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 8,
    lineHeight: 20,
  },
  gameInfoLabel: {
    fontWeight: 'bold',
    color: '#fff',
  },
  playerListContainer: {
    flex: 1,
    marginBottom: 20,
  },
  playerListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
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
    width: 100,
  },
  playerAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  playerInitial: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  playerName: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 3,
  },
  hostBadge: {
    marginTop: 2,
    fontSize: 10,
    color: '#4caf50',
    fontWeight: '600',
  },
  storytellerBadge: {
    marginTop: 2,
    fontSize: 10,
    color: '#ffa500',
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
    backgroundColor: '#666',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

