import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useHombreLoboCastronegroStore } from '../store/hombreLoboCastronegroStore';
import { GAME_CONFIG } from '../constants/hombreLoboCastronegroRoles';

export const HombreLoboCastronegroIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [isJoining, setIsJoining] = useState(false);
  
  const players = useHombreLoboCastronegroStore((state) => state.players);
  const currentRoomCode = useHombreLoboCastronegroStore((state) => state.roomCode);
  const hostPlayerId = useHombreLoboCastronegroStore((state) => state.hostPlayerId);
  const createRoom = useHombreLoboCastronegroStore((state) => state.createRoom);
  const joinRoom = useHombreLoboCastronegroStore((state) => state.joinRoom);
  const removePlayer = useHombreLoboCastronegroStore((state) => state.removePlayer);
  const startGame = useHombreLoboCastronegroStore((state) => state.startGame);
  
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
    
    if (players.length > GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }
    
    const success = startGame();
    if (success) {
      navigation?.navigate('hombre-lobo-castronegro-lobby');
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego');
    }
  };
  
  if (!currentRoomCode) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>El Hombre Lobo de Castronegro</Text>
          <Text style={styles.subtitle}>Juego de Deducción Social</Text>
          
          <Text style={styles.description}>
            🐺 El Hombre Lobo de Castronegro es un juego de roles ocultos y deducción social diseñado para grupos de 8 a 24 jugadores.
            {'\n\n'}
            🌙 En la misteriosa aldea de Castronegro, algunos aldeanos se han convertido en hombres lobo bajo la luna llena.
            Durante la noche, los lobos atacan a los inocentes. Durante el día, los aldeanos deben descubrir quiénes son los lobos antes de que sea demasiado tarde.
            {'\n\n'}
            ⚔️ Cada jugador tiene un rol único con habilidades especiales. La Vidente puede descubrir identidades, la Bruja puede salvar o matar, el Protector puede defender, y muchos más roles esperan ser descubiertos.
            {'\n\n'}
            🎭 ¿Podrás descubrir a los lobos antes de que sea demasiado tarde? ¿O serás tú la próxima víctima?
          </Text>
          
          <View style={styles.featuresSection}>
            <Text style={styles.featuresTitle}>Características del Juego:</Text>
            <Text style={styles.feature}>🔮 Más de 12 roles únicos con habilidades especiales</Text>
            <Text style={styles.feature}>🌙 Sistema de noche y día con acciones estratégicas</Text>
            <Text style={styles.feature}>💬 Debates y votaciones para descubrir a los lobos</Text>
            <Text style={styles.feature}>📊 Estadísticas detalladas de cada partida</Text>
            <Text style={styles.feature}>🎯 Mecánicas avanzadas de protección y sabotaje</Text>
          </View>
          
          <View style={styles.formSection}>
            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              value={playerName}
              onChangeText={setPlayerName}
              placeholderTextColor="#999"
            />
            
            {!isJoining ? (
              <>
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
                  placeholderTextColor="#999"
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
  description: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  featuresSection: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
    marginHorizontal: 10,
  },
  featuresTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 15,
    textAlign: 'center',
  },
  feature: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 8,
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
    color: '#000',
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

