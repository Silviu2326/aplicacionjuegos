import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useSonidistaCiegoStore } from '../store/sonidistaCiegoStore';
import { SonidistaCiegoPlayerList } from '../components/SonidistaCiegoPlayerList';
import { SonidistaCiegoInstructions } from '../components/SonidistaCiegoInstructions';
import { SonidistaCiegoScoreboard } from '../components/SonidistaCiegoScoreboard';
import { SCENARIOS } from '../constants/SonidistaCiegoScenarios';

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

export const ElSonidistaCiegoIndex = ({ navigation }) => {
  const players = useSonidistaCiegoStore((state) => state.players);
  const addPlayer = useSonidistaCiegoStore((state) => state.addPlayer);
  const removePlayer = useSonidistaCiegoStore((state) => state.removePlayer);
  const maxRounds = useSonidistaCiegoStore((state) => state.maxRounds);
  const setMaxRounds = useSonidistaCiegoStore((state) => state.setMaxRounds);
  const allowDuplicateScenarios = useSonidistaCiegoStore((state) => state.allowDuplicateScenarios);
  const setAllowDuplicateScenarios = useSonidistaCiegoStore((state) => state.setAllowDuplicateScenarios);
  const getGameStatistics = useSonidistaCiegoStore((state) => state.getGameStatistics);
  const startGame = useSonidistaCiegoStore((state) => state.startGame);
  const resetGame = useSonidistaCiegoStore((state) => state.resetGame);
  
  const [showInstructions, setShowInstructions] = React.useState(false);
  const [showStats, setShowStats] = React.useState(false);
  const [playerName, setPlayerName] = React.useState('');

  const stats = getGameStatistics();
  const hasPreviousGame = stats.totalRoundsPlayed > 0;

  const handleAddPlayer = () => {
    if (playerName.trim() && players.length < MAX_PLAYERS) {
      const trimmedName = playerName.trim();
      // Verificar nombre duplicado
      if (players.some(p => p.name.toLowerCase() === trimmedName.toLowerCase())) {
        Alert.alert('Nombre duplicado', 'Ya existe un jugador con ese nombre. Por favor, elige otro.');
        return;
      }
      addPlayer(trimmedName);
      setPlayerName('');
    }
  };

  const handleAddRandomPlayers = () => {
    const randomNames = [
      'Ana', 'Carlos', 'María', 'Juan', 'Laura', 'Pedro', 'Sofía', 'Diego',
      'Elena', 'Miguel', 'Carmen', 'Luis', 'Isabel', 'Pablo', 'Lucía', 'Roberto',
      'Patricia', 'Andrés', 'Marta', 'Javier'
    ];
    
    const availableNames = randomNames.filter(name => 
      !players.some(p => p.name.toLowerCase() === name.toLowerCase())
    );
    
    const remainingSlots = MAX_PLAYERS - players.length;
    const namesToAdd = availableNames.slice(0, remainingSlots);
    
    namesToAdd.forEach(name => {
      addPlayer(name);
    });
    
    if (namesToAdd.length === 0) {
      Alert.alert('Info', 'No hay más nombres disponibles o ya se alcanzó el máximo de jugadores.');
    }
  };

  const handleStart = () => {
    if (players.length < MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Necesitas al menos ${MIN_PLAYERS} jugadores para comenzar.`
      );
      return;
    }
    resetGame();
    const success = startGame();
    if (success && navigation && navigation.navigate) {
      navigation.navigate('play');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 El Sonidista Ciego</Text>
        <Text style={styles.subtitle}>Juego social • {SCENARIOS.length} escenarios disponibles</Text>
      </View>
      
      <View style={styles.content}>
        <View style={styles.descriptionCard}>
          <Text style={styles.description}>
            Un jugador asume el rol del 'Sonidista Ciego' y debe cerrar los ojos.
            La aplicación revela un escenario secreto al resto de los jugadores,
            quienes se convierten en 'Sonidistas Ayudantes'. Por turnos, cada
            Ayudante debe producir un único sonido característico de ese escenario.
            El Sonidista Ciego debe adivinar el lugar o la situación.
          </Text>
        </View>
        
        <View style={styles.buttonRow}>
          <TouchableOpacity
            style={[styles.iconButton, styles.instructionsButton]}
            onPress={() => setShowInstructions(true)}
          >
            <Text style={styles.iconButtonText}>📖</Text>
            <Text style={styles.iconButtonLabel}>Instrucciones</Text>
          </TouchableOpacity>
          
          {hasPreviousGame && (
            <TouchableOpacity
              style={[styles.iconButton, styles.statsButton]}
              onPress={() => setShowStats(!showStats)}
            >
              <Text style={styles.iconButtonText}>📊</Text>
              <Text style={styles.iconButtonLabel}>Estadísticas</Text>
            </TouchableOpacity>
          )}
        </View>

        {showStats && hasPreviousGame && (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>📈 Estadísticas de la Partida</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalRoundsPlayed}</Text>
                <Text style={styles.statLabel}>Rondas jugadas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.accuracy}%</Text>
                <Text style={styles.statLabel}>Precisión</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalCorrectGuesses}</Text>
                <Text style={styles.statLabel}>Aciertos</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{stats.totalIncorrectGuesses}</Text>
                <Text style={styles.statLabel}>Fallos</Text>
              </View>
            </View>
            {stats.mostSuccessfulPlayer && (
              <View style={styles.bestPlayerCard}>
                <Text style={styles.bestPlayerLabel}>🏆 Mejor jugador</Text>
                <Text style={styles.bestPlayerName}>{stats.mostSuccessfulPlayer.name}</Text>
              </View>
            )}
          </View>
        )}
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              👥 Jugadores ({players.length}/{MAX_PLAYERS})
            </Text>
            {players.length < MAX_PLAYERS && (
              <TouchableOpacity
                style={styles.randomButton}
                onPress={handleAddRandomPlayers}
              >
                <Text style={styles.randomButtonText}>+ Aleatorios</Text>
              </TouchableOpacity>
            )}
          </View>
          <Text style={styles.sectionHint}>
            Mínimo {MIN_PLAYERS} jugadores necesarios
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del jugador"
              placeholderTextColor="#999"
              value={playerName}
              onChangeText={setPlayerName}
              onSubmitEditing={handleAddPlayer}
              maxLength={20}
            />
            <TouchableOpacity
              style={[
                styles.addButton,
                (!playerName.trim() || players.length >= MAX_PLAYERS) && styles.addButtonDisabled,
              ]}
              onPress={handleAddPlayer}
              disabled={!playerName.trim() || players.length >= MAX_PLAYERS}
            >
              <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity>
          </View>
          
          {players.length > 0 && (
            <>
              <SonidistaCiegoPlayerList
                players={players}
                onRemovePlayer={removePlayer}
              />
              {hasPreviousGame && (
                <SonidistaCiegoScoreboard 
                  players={players} 
                  showDetailedStats={true}
                />
              )}
            </>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎲 Rondas</Text>
          <View style={styles.roundsContainer}>
            <TouchableOpacity
              style={[styles.roundButton, maxRounds === null && styles.roundButtonActive]}
              onPress={() => setMaxRounds(null)}
            >
              <Text style={[styles.roundButtonText, maxRounds === null && styles.roundButtonTextActive]}>
                ∞ Ilimitadas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundButton, maxRounds === 5 && styles.roundButtonActive]}
              onPress={() => setMaxRounds(5)}
            >
              <Text style={[styles.roundButtonText, maxRounds === 5 && styles.roundButtonTextActive]}>
                5
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundButton, maxRounds === 10 && styles.roundButtonActive]}
              onPress={() => setMaxRounds(10)}
            >
              <Text style={[styles.roundButtonText, maxRounds === 10 && styles.roundButtonTextActive]}>
                10
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roundButton, maxRounds === 15 && styles.roundButtonActive]}
              onPress={() => setMaxRounds(15)}
            >
              <Text style={[styles.roundButtonText, maxRounds === 15 && styles.roundButtonTextActive]}>
                15
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>⚙️ Configuración</Text>
          <TouchableOpacity
            style={styles.configRow}
            onPress={() => setAllowDuplicateScenarios(!allowDuplicateScenarios)}
          >
            <View style={styles.configInfo}>
              <Text style={styles.configLabel}>Permitir escenarios repetidos</Text>
              <Text style={styles.configDescription}>
                Si está desactivado, cada escenario solo aparecerá una vez
              </Text>
            </View>
            <View style={[
              styles.toggle,
              allowDuplicateScenarios && styles.toggleActive,
            ]}>
              <Text style={styles.toggleText}>
                {allowDuplicateScenarios ? 'ON' : 'OFF'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < MIN_PLAYERS && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={players.length < MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>
            {players.length < MIN_PLAYERS
              ? `Necesitas ${
                  MIN_PLAYERS - players.length
                } jugador${MIN_PLAYERS - players.length > 1 ? 'es' : ''} más`
              : '🚀 Comenzar Juego'}
          </Text>
        </TouchableOpacity>
      </View>

      {showInstructions && (
        <SonidistaCiegoInstructions
          visible={showInstructions}
          onClose={() => setShowInstructions(false)}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff5722',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.95,
  },
  content: {
    padding: 20,
  },
  descriptionCard: {
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
  description: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  iconButton: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  instructionsButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  statsButton: {
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  iconButtonText: {
    fontSize: 28,
    marginBottom: 5,
  },
  iconButtonLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  statsCard: {
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
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    margin: 8,
    minWidth: 80,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  bestPlayerCard: {
    backgroundColor: '#fff3e0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ff9800',
  },
  bestPlayerLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  bestPlayerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5722',
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionHint: {
    fontSize: 13,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  randomButton: {
    backgroundColor: '#9c27b0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  randomButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 14,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#fafafa',
  },
  addButton: {
    backgroundColor: '#4caf50',
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#4caf50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
  roundsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    flexWrap: 'wrap',
  },
  roundButton: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ddd',
    minWidth: 70,
    alignItems: 'center',
    margin: 5,
    backgroundColor: '#fafafa',
  },
  roundButtonActive: {
    backgroundColor: '#ff5722',
    borderColor: '#ff5722',
  },
  roundButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  roundButtonTextActive: {
    color: '#fff',
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  configInfo: {
    flex: 1,
    marginRight: 15,
  },
  configLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  configDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  toggle: {
    backgroundColor: '#ddd',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 60,
    alignItems: 'center',
  },
  toggleActive: {
    backgroundColor: '#4caf50',
  },
  toggleText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#ff5722',
    margin: 20,
    marginTop: 10,
    padding: 22,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#ff5722',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ElSonidistaCiegoIndex;

