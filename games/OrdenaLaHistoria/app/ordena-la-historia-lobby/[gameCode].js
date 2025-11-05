import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrdenaLaHistoriaStore } from '../../store/ordenaLaHistoriaStore';
import { OrdenaLaHistoriaPlayerAvatar } from '../../components/OrdenaLaHistoriaPlayerAvatar';
import { GAME_CONFIG } from '../../constants/ordenaLaHistoriaStories';

export default function OrdenaLaHistoriaLobbyScreen({ route }) {
  const router = useRouter();
  // Intentar obtener params de Expo Router, si falla usar route.params del Navigator
  let paramsFromRouter = {};
  try {
    if (typeof useLocalSearchParams === 'function') {
      paramsFromRouter = useLocalSearchParams() || {};
    }
  } catch (e) {
    // Ignorar error si no estamos en contexto de Expo Router
  }
  const [playerName, setPlayerName] = useState('');
  
  // Obtener gameCode de params (Expo Router) o route (Navigator) o store
  const gameCodeFromParams = paramsFromRouter?.gameCode || route?.params?.gameCode;

  const players = useOrdenaLaHistoriaStore((state) => state.players);
  const currentGameCode = useOrdenaLaHistoriaStore((state) => state.gameCode);
  const hostPlayerId = useOrdenaLaHistoriaStore((state) => state.hostPlayerId);
  const currentPlayerId = useOrdenaLaHistoriaStore((state) => state.currentPlayerId);
  const selectedPackage = useOrdenaLaHistoriaStore((state) => state.selectedPackage);
  const addPlayer = useOrdenaLaHistoriaStore((state) => state.addPlayer);
  const removePlayer = useOrdenaLaHistoriaStore((state) => state.removePlayer);
  const startGame = useOrdenaLaHistoriaStore((state) => state.startGame);
  const isHost = useOrdenaLaHistoriaStore((state) => state.isHost());

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }

    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }

    if (players.some((p) => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Ya existe un jugador con ese nombre');
      return;
    }

    addPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert('Error', `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar`);
      return;
    }

    if (!selectedPackage) {
      Alert.alert('Error', 'No se ha seleccionado un paquete de historias');
      return;
    }

    // Verificar que el número de jugadores coincida con alguna historia disponible
    // Por ahora, asumimos que hay una historia con el número correcto de frases
    const success = startGame();
    if (success) {
      router.push(`/games/OrdenaLaHistoria/app/ordena-la-historia-game/${gameCode || currentGameCode}`);
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego. Verifica que el número de jugadores coincida con el número de frases de la historia.');
    }
  };

  const displayGameCode = gameCodeFromParams || currentGameCode;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Sala de Espera</Text>

        {displayGameCode && (
          <View style={styles.codeContainer}>
            <Text style={styles.codeLabel}>Código de Partida:</Text>
            <Text style={styles.codeText}>{displayGameCode}</Text>
            <Text style={styles.codeHint}>
              Comparte este código con otros jugadores para que se unan
            </Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
          </Text>
          <Text style={styles.sectionHint}>
            Mínimo {GAME_CONFIG.MIN_PLAYERS} jugadores
          </Text>

          {players.length === 0 && (
            <Text style={styles.emptyText}>No hay jugadores todavía</Text>
          )}

          <View style={styles.playersGrid}>
            {players.map((player) => (
              <View key={player.id} style={styles.playerItem}>
                <OrdenaLaHistoriaPlayerAvatar player={player} size={70} showName={true} />
                {(isHost || player.id === currentPlayerId) && player.id !== hostPlayerId && (
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePlayer(player.id)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>

        {isHost && (
          <View style={styles.hostSection}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del jugador"
              value={playerName}
              onChangeText={setPlayerName}
              onSubmitEditing={handleAddPlayer}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
              <Text style={styles.addButtonText}>Añadir Jugador</Text>
            </TouchableOpacity>
          </View>
        )}

        {isHost && players.length >= GAME_CONFIG.MIN_PLAYERS && (
          <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
            <Text style={styles.startButtonText}>Iniciar Juego</Text>
          </TouchableOpacity>
        )}

        {!isHost && (
          <Text style={styles.waitingText}>
            Esperando a que el anfitrión inicie el juego...
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 24,
  },
  codeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  codeLabel: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4ECDC4',
    letterSpacing: 4,
    marginBottom: 8,
  },
  codeHint: {
    fontSize: 12,
    color: '#999999',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  sectionHint: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 20,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  playerItem: {
    position: 'relative',
    margin: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#E74C3C',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  removeButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  hostSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addButton: {
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  startButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  waitingText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 24,
  },
});
