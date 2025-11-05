import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useCadenaEmojisStore } from '../store/cadenaEmojisStore';
import { GAME_CONFIG } from '../constants/cadenaEmojisConstants';

export const CadenaEmojisIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [maxEmojis, setMaxEmojis] = useState(GAME_CONFIG.DEFAULT_MAX_EMOJIS.toString());
  const [theme, setTheme] = useState('');
  const [roomCode, setRoomCode] = useState('');
  
  const players = useCadenaEmojisStore((state) => state.players);
  const addPlayer = useCadenaEmojisStore((state) => state.addPlayer);
  const removePlayer = useCadenaEmojisStore((state) => state.removePlayer);
  const setMaxEmojisAction = useCadenaEmojisStore((state) => state.setMaxEmojis);
  const setThemeAction = useCadenaEmojisStore((state) => state.setTheme);
  const generateRoomCodeAction = useCadenaEmojisStore((state) => state.generateRoomCode);
  const startGame = useCadenaEmojisStore((state) => state.startGame);
  const currentRoomCode = useCadenaEmojisStore((state) => state.roomCode);

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${GAME_CONFIG.MAX_PLAYERS} jugadores`);
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

  const handleCreateRoom = () => {
    const code = generateRoomCodeAction();
    setRoomCode(code);
    Alert.alert('Sala creada', `Código de sala: ${code}\n\nComparte este código con los demás jugadores.`);
  };

  const handleJoinRoom = () => {
    if (roomCode.trim().length === 0) {
      Alert.alert('Error', 'Ingresa un código de sala');
      return;
    }
    // En producción, aquí se validaría el código con el servidor
    Alert.alert('Sala encontrada', 'Te has unido a la sala');
  };

  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar máximo de emojis
    const maxEmojisNum = parseInt(maxEmojis, 10);
    if (maxEmojisNum >= GAME_CONFIG.MIN_EMOJIS && maxEmojisNum <= GAME_CONFIG.MAX_EMOJIS_LIMIT) {
      setMaxEmojisAction(maxEmojisNum);
    }
    
    // Configurar tema si se especificó
    if (theme.trim() !== '') {
      setThemeAction(theme.trim());
    }
    
    const success = startGame();
    if (success && navigation && navigation.navigate) {
      navigation.navigate('cadena-emojis-juego');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Cadena de Emojis Narrativa</Text>
      <Text style={styles.subtitle}>Crea historias colaborativas con emojis</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sala de Juego</Text>
        
        {!currentRoomCode ? (
          <View>
            <TouchableOpacity style={styles.roomButton} onPress={handleCreateRoom}>
              <Text style={styles.roomButtonText}>Crear Sala</Text>
            </TouchableOpacity>
            
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Código de sala"
                value={roomCode}
                onChangeText={setRoomCode}
                placeholderTextColor="#999"
              />
              <TouchableOpacity style={styles.joinButton} onPress={handleJoinRoom}>
                <Text style={styles.joinButtonText}>Unirse</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.roomCodeContainer}>
            <Text style={styles.roomCodeLabel}>Código de sala:</Text>
            <Text style={styles.roomCode}>{currentRoomCode}</Text>
            <Text style={styles.roomCodeHint}>Comparte este código con los demás jugadores</Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})</Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            placeholderTextColor="#999"
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
        <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
        
        <Text style={styles.label}>Número máximo de emojis</Text>
        <Text style={styles.labelHint}>
          Mínimo: {GAME_CONFIG.MIN_EMOJIS} | Máximo: {GAME_CONFIG.MAX_EMOJIS_LIMIT} | Recomendado: {GAME_CONFIG.DEFAULT_MAX_EMOJIS}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={`Ejemplo: ${GAME_CONFIG.DEFAULT_MAX_EMOJIS}`}
          value={maxEmojis}
          onChangeText={setMaxEmojis}
          keyboardType="numeric"
          placeholderTextColor="#999"
        />
        <View style={styles.emojiInfo}>
          <Text style={styles.emojiInfoText}>
            💡 Con más emojis tendrás una historia más larga y detallada
          </Text>
        </View>
        
        <Text style={styles.label}>Tema (opcional)</Text>
        <Text style={styles.labelHint}>Elige un tema para guiar la historia o déjalo libre</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.themeSuggestionsContainer}>
          <View style={styles.themeSuggestions}>
            {GAME_CONFIG.SUGGESTED_THEMES.map((suggestedTheme, index) => (
              <TouchableOpacity
                key={index}
                style={[styles.themeChip, theme === suggestedTheme && styles.themeChipActive]}
                onPress={() => setTheme(suggestedTheme)}
              >
                <Text style={[styles.themeChipText, theme === suggestedTheme && styles.themeChipTextActive]}>
                  {suggestedTheme}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="O escribe tu propio tema..."
          value={theme}
          onChangeText={setTheme}
          multiline
          numberOfLines={2}
          placeholderTextColor="#999"
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
  roomButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  roomButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
    color: '#333',
  },
  textArea: {
    height: 60,
    textAlignVertical: 'top',
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
    backgroundColor: '#FF9800',
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
  roomCodeContainer: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
  },
  roomCodeLabel: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 8,
  },
  roomCode: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#1976D2',
    letterSpacing: 4,
    marginBottom: 8,
  },
  roomCodeHint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
    fontWeight: '600',
    marginBottom: 4,
    marginTop: 12,
    color: '#333',
  },
  labelHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  themeSuggestionsContainer: {
    marginBottom: 12,
  },
  themeSuggestions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  themeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
    marginBottom: 8,
  },
  themeChipActive: {
    backgroundColor: '#2196F3',
  },
  themeChipText: {
    fontSize: 12,
    color: '#666',
  },
  themeChipTextActive: {
    color: 'white',
  },
  emojiInfo: {
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
  },
  emojiInfoText: {
    fontSize: 12,
    color: '#5D4037',
    lineHeight: 16,
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

