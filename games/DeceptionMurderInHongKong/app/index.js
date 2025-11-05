import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput, Alert } from 'react-native';
import { useDeceptionGameStore } from '../store/deceptionGameStore';
import { DeceptionPlayerGrid } from '../components/DeceptionPlayerGrid';

// Datos falsos de jugadores predefinidos para demo
const FAKE_PLAYERS = [
  'Chen Wei',
  'Li Mei',
  'Zhang Ming',
  'Wang Fang',
  'Liu Jun',
  'Huang Yu',
  'Kumar Singh',
  'Maria Garcia',
];

export const DeceptionMurderInHongKongIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  
  const { 
    players, 
    addPlayer, 
    removePlayer, 
    initializeGame, 
    resetGame,
    gameStatus,
    maxRounds,
    setMaxRounds
  } = useDeceptionGameStore();

  useEffect(() => {
    // Resetear el juego al entrar
    if (gameStatus !== 'lobby') {
      resetGame();
    }
  }, []);

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    } else {
      Alert.alert('Error', 'Por favor ingresa un nombre válido');
    }
  };

  const handleAddFakePlayer = () => {
    const availableFakePlayers = FAKE_PLAYERS.filter(
      name => !players.some(p => p.name === name)
    );
    if (availableFakePlayers.length > 0) {
      const randomName = availableFakePlayers[Math.floor(Math.random() * availableFakePlayers.length)];
      addPlayer(randomName);
    }
  };

  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (players.length < 4) {
      Alert.alert(
        'Jugadores insuficientes',
        'Se necesitan al menos 4 jugadores para iniciar el juego. Puedes agregar jugadores falsos usando el botón "Agregar Jugador Falso".',
        [
          { text: 'Agregar Jugadores Falsos', onPress: () => {
            const needed = 4 - players.length;
            for (let i = 0; i < needed; i++) {
              handleAddFakePlayer();
            }
          }},
          { text: 'Cancelar', style: 'cancel' }
        ]
      );
      return;
    }

    if (initializeGame()) {
      if (navigation && navigation.navigate) {
        navigation.navigate('deception-role-reveal');
      }
    } else {
      Alert.alert('Error', 'No se pudo inicializar el juego');
    }
  };

  const handleQuickStart = () => {
    resetGame();
    // Agregar 4-6 jugadores falsos automáticamente
    const numPlayers = 4 + Math.floor(Math.random() * 3); // 4-6 jugadores
    const shuffledFake = [...FAKE_PLAYERS].sort(() => Math.random() - 0.5);
    shuffledFake.slice(0, numPlayers).forEach(name => {
      addPlayer(name);
    });
    
    setTimeout(() => {
      if (initializeGame()) {
        if (navigation && navigation.navigate) {
          navigation.navigate('deception-role-reveal');
        }
      }
    }, 100);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Deception: Murder in Hong Kong</Text>
        <Text style={styles.subtitle}>Juego de deducción social</Text>
        <View style={styles.divider} />
        <Text style={styles.description}>
          En el corazón de la bulliciosa Hong Kong, se ha cometido un crimen y un equipo de investigadores debe resolverlo.
          Sin embargo, el asesino es uno de ellos.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración del Juego</Text>
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Rondas máximas: {maxRounds}</Text>
          <View style={styles.roundsButtons}>
            <TouchableOpacity 
              style={[styles.roundButton, maxRounds <= 1 && styles.roundButtonDisabled]} 
              onPress={() => setMaxRounds(Math.max(1, maxRounds - 1))}
              disabled={maxRounds <= 1}
            >
              <Text style={styles.roundButtonText}>-</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.roundButton, maxRounds >= 5 && styles.roundButtonDisabled]} 
              onPress={() => setMaxRounds(Math.min(5, maxRounds + 1))}
              disabled={maxRounds >= 5}
            >
              <Text style={styles.roundButtonText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length}/12)</Text>
        
        {players.length > 0 && (
          <DeceptionPlayerGrid 
            players={players}
            onPlayerPress={handleRemovePlayer}
            currentPlayerId={null}
          />
        )}

        <View style={styles.addPlayerContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.fakePlayerButton} 
          onPress={handleAddFakePlayer}
          disabled={players.length >= 12}
        >
          <Text style={styles.fakePlayerButtonText}>
            + Agregar Jugador Falso
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.actionsSection}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.quickStartButton]} 
          onPress={handleQuickStart}
        >
          <Text style={styles.actionButtonText}>Inicio Rápido</Text>
          <Text style={styles.actionButtonSubtext}>(Agregar jugadores automáticamente)</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.actionButton, styles.startButton, players.length < 4 && styles.buttonDisabled]} 
          onPress={handleStartGame}
          disabled={players.length < 4}
        >
          <Text style={styles.actionButtonText}>Iniciar Partida</Text>
          {players.length < 4 && (
            <Text style={styles.actionButtonSubtext}>
              (Se necesitan al menos 4 jugadores)
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.rulesSection}>
        <Text style={styles.rulesTitle}>Reglas del Juego</Text>
        <Text style={styles.rulesText}>
          • Mínimo 4 jugadores, máximo 12{'\n'}
          • Un jugador es el Asesino (selecciona la solución en secreto){'\n'}
          • Un jugador es el Científico Forense (conoce la solución, guía a los investigadores){'\n'}
          • Los demás son Investigadores (deben descubrir la solución){'\n'}
          • El Científico Forense usa fichas de escena para dar pistas{'\n'}
          • Los Investigadores tienen un número limitado de acusaciones{'\n'}
          • El juego termina cuando se encuentra la solución o se agotan las rondas
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 15,
    textAlign: 'center',
  },
  divider: {
    width: 60,
    height: 3,
    backgroundColor: '#4a90e2',
    marginBottom: 15,
  },
  description: {
    fontSize: 14,
    color: '#d0d0d0',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 20,
  },
  section: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  configLabel: {
    fontSize: 14,
    color: '#d0d0d0',
    flex: 1,
  },
  roundsButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  roundButton: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: '#4a90e2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundButtonDisabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  roundButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addPlayerContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 15,
  },
  input: {
    flex: 1,
    backgroundColor: '#0f3460',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  addButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  fakePlayerButton: {
    backgroundColor: '#2d4a6e',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4a90e2',
    borderStyle: 'dashed',
  },
  fakePlayerButtonText: {
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  actionsSection: {
    gap: 15,
    marginBottom: 20,
  },
  actionButton: {
    backgroundColor: '#4a90e2',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  quickStartButton: {
    backgroundColor: '#2ecc71',
  },
  startButton: {
    backgroundColor: '#e74c3c',
  },
  buttonDisabled: {
    backgroundColor: '#555',
    opacity: 0.6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    marginTop: 5,
    opacity: 0.8,
  },
  rulesSection: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  rulesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  rulesText: {
    fontSize: 12,
    color: '#b0b0b0',
    lineHeight: 20,
  },
});
