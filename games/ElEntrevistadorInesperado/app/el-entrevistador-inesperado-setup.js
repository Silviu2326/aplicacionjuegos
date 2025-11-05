import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useEntrevistadorInesperadoStore } from '../store/entrevistadorInesperadoStore';
import { EntrevistadorInesperadoPlayerList } from '../components/EntrevistadorInesperadoPlayerList';
import { CHARACTER_THEMES } from '../constants/EntrevistadorInesperadoCharacters';

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

export const ElEntrevistadorInesperadoSetup = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [interviewTime, setInterviewTime] = useState('300');
  const [maxRounds, setMaxRounds] = useState('');
  
  const players = useEntrevistadorInesperadoStore((state) => state.players);
  const addPlayer = useEntrevistadorInesperadoStore((state) => state.addPlayer);
  const removePlayer = useEntrevistadorInesperadoStore((state) => state.removePlayer);
  const setInterviewTimeAction = useEntrevistadorInesperadoStore(
    (state) => state.setInterviewTime
  );
  const setMaxRoundsAction = useEntrevistadorInesperadoStore(
    (state) => state.setMaxRounds
  );
  const setCharacterTheme = useEntrevistadorInesperadoStore(
    (state) => state.setCharacterTheme
  );
  const characterTheme = useEntrevistadorInesperadoStore(
    (state) => state.characterTheme
  );
  const startGame = useEntrevistadorInesperadoStore((state) => state.startGame);

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }

    if (
      players.some(
        (p) => p.name.toLowerCase() === playerName.trim().toLowerCase()
      )
    ) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }

    if (players.length >= MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${MAX_PLAYERS} jugadores`);
      return;
    }

    addPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (players.length < MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }

    // Configurar tiempos
    const interview = parseInt(interviewTime, 10);
    if (interview >= 60 && interview <= 600) {
      setInterviewTimeAction(interview);
    }

    // Configurar rondas
    const rounds = maxRounds.trim() === '' ? null : parseInt(maxRounds, 10);
    if (rounds !== null && rounds > 0) {
      setMaxRoundsAction(rounds);
    } else {
      setMaxRoundsAction(null);
    }

    const success = startGame();
    if (success && navigation && navigation.navigate) {
      navigation.navigate('reveal');
    }
  };

  const handleThemeSelect = (theme) => {
    setCharacterTheme(theme);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Configuración del Juego</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          Jugadores ({players.length}/{MAX_PLAYERS})
        </Text>
        <Text style={styles.sectionHint}>
          Mínimo {MIN_PLAYERS} jugadores
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
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        {players.length > 0 && (
          <EntrevistadorInesperadoPlayerList
            players={players}
            intervieweeId={null}
          />
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎨 Tema de Personajes</Text>
        <Text style={styles.sectionHint}>
          Selecciona un tema para los personajes o deja aleatorio
        </Text>
        <View style={styles.themeContainer}>
          <TouchableOpacity
            style={[styles.themeButton, characterTheme === null && styles.themeButtonActive]}
            onPress={() => handleThemeSelect(null)}
          >
            <Text style={styles.themeButtonEmoji}>🎲</Text>
            <Text style={[styles.themeButtonText, characterTheme === null && styles.themeButtonTextActive]}>
              Aleatorio
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, characterTheme === 'fantasy' && styles.themeButtonActive]}
            onPress={() => handleThemeSelect('fantasy')}
          >
            <Text style={styles.themeButtonEmoji}>🧙</Text>
            <Text style={[styles.themeButtonText, characterTheme === 'fantasy' && styles.themeButtonTextActive]}>
              Fantasía
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, characterTheme === 'animals' && styles.themeButtonActive]}
            onPress={() => handleThemeSelect('animals')}
          >
            <Text style={styles.themeButtonEmoji}>🐾</Text>
            <Text style={[styles.themeButtonText, characterTheme === 'animals' && styles.themeButtonTextActive]}>
              Animales
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.themeButton, characterTheme === 'scifi' && styles.themeButtonActive]}
            onPress={() => handleThemeSelect('scifi')}
          >
            <Text style={styles.themeButtonEmoji}>🚀</Text>
            <Text style={[styles.themeButtonText, characterTheme === 'scifi' && styles.themeButtonTextActive]}>
              Ciencia Ficción
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración del Juego</Text>

        <View style={styles.configRow}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.configLabel}>
              ⏱️ Tiempo de entrevista
            </Text>
            <Text style={styles.configHint}>
              {Math.floor(parseInt(interviewTime || 300) / 60)} min {parseInt(interviewTime || 300) % 60} seg
            </Text>
          </View>
          <TextInput
            style={styles.configInput}
            value={interviewTime}
            onChangeText={setInterviewTime}
            keyboardType="numeric"
            placeholder="300"
          />
        </View>

        <View style={styles.configRow}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.configLabel}>
              🔄 Máximo de rondas
            </Text>
            <Text style={styles.configHint}>
              {maxRounds ? `${maxRounds} rondas` : 'Ilimitado'}
            </Text>
          </View>
          <TextInput
            style={styles.configInput}
            value={maxRounds}
            onChangeText={setMaxRounds}
            keyboardType="numeric"
            placeholder="Ilimitado"
          />
        </View>
      </View>

      <TouchableOpacity
        style={[
          styles.startButton,
          players.length < MIN_PLAYERS && styles.startButtonDisabled,
        ]}
        onPress={handleStartGame}
        disabled={players.length < MIN_PLAYERS}
      >
        <Text style={styles.startButtonText}>
          {players.length < MIN_PLAYERS
            ? `Necesitas ${
                MIN_PLAYERS - players.length
              } jugador${MIN_PLAYERS - players.length > 1 ? 'es' : ''} más`
            : 'Comenzar Juego'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 15,
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
    backgroundColor: '#fff',
  },
  addButton: {
    backgroundColor: '#4caf50',
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
  themeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  themeButton: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196f3',
    width: '48%',
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  themeButtonActive: {
    backgroundColor: '#2196f3',
    borderColor: '#1976d2',
  },
  themeButtonEmoji: {
    fontSize: 28,
    marginBottom: 5,
  },
  themeButtonText: {
    color: '#2196f3',
    fontSize: 14,
    fontWeight: '600',
  },
  themeButtonTextActive: {
    color: '#fff',
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  configLabelContainer: {
    flex: 1,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  configHint: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  configInput: {
    width: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  startButton: {
    backgroundColor: '#4caf50',
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

export default ElEntrevistadorInesperadoSetup;

