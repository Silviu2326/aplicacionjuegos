import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrdenaLaHistoriaStore } from '../../store/ordenaLaHistoriaStore';
import { OrdenaLaHistoriaSentenceCard } from '../../components/OrdenaLaHistoriaSentenceCard';
import { OrdenaLaHistoriaTimerDisplay } from '../../components/OrdenaLaHistoriaTimerDisplay';
import { OrdenaLaHistoriaPlayerAvatar } from '../../components/OrdenaLaHistoriaPlayerAvatar';
import { OrdenaLaHistoriaFinalOrderList } from '../../components/OrdenaLaHistoriaFinalOrderList';

export default function OrdenaLaHistoriaGameScreen({ route }) {
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
  
  // Obtener gameCode de params (Expo Router) o route (Navigator) o store
  const gameCodeFromParams = paramsFromRouter?.gameCode || route?.params?.gameCode;

  const players = useOrdenaLaHistoriaStore((state) => state.players);
  const currentPlayerId = useOrdenaLaHistoriaStore((state) => state.currentPlayerId);
  const gameStatus = useOrdenaLaHistoriaStore((state) => state.gameStatus);
  const timerRemaining = useOrdenaLaHistoriaStore((state) => state.timerRemaining);
  const timer = useOrdenaLaHistoriaStore((state) => state.timer);
  const isTimerRunning = useOrdenaLaHistoriaStore((state) => state.isTimerRunning);
  const getPlayerSentence = useOrdenaLaHistoriaStore((state) => state.getPlayerSentence);
  const proposedOrder = useOrdenaLaHistoriaStore((state) => state.proposedOrder);
  const setProposedOrder = useOrdenaLaHistoriaStore((state) => state.setProposedOrder);
  const updateTimer = useOrdenaLaHistoriaStore((state) => state.updateTimer);
  const endGame = useOrdenaLaHistoriaStore((state) => state.endGame);
  const isHost = useOrdenaLaHistoriaStore((state) => state.isHost());
  const currentGameCode = useOrdenaLaHistoriaStore((state) => state.gameCode);

  const [localProposedOrder, setLocalProposedOrder] = useState([]);

  const currentPlayer = players.find((p) => p.id === currentPlayerId) || players[0];
  const currentPlayerSentence = currentPlayer ? getPlayerSentence(currentPlayer.id) : null;

  // Inicializar el orden propuesto con los jugadores en orden aleatorio si está vacío
  useEffect(() => {
    if (players.length > 0 && localProposedOrder.length === 0) {
      const playerIds = [...players].map((p) => p.id).sort(() => Math.random() - 0.5);
      setLocalProposedOrder(playerIds);
      setProposedOrder(playerIds);
    }
  }, [players]);

  // Manejar el temporizador
  useEffect(() => {
    if (!isTimerRunning || gameStatus !== 'playing') return;

    const interval = setInterval(() => {
      const remaining = timerRemaining - 1;
      updateTimer(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
        // El timer llega a 0, finalizar el juego
        if (localProposedOrder.length === players.length) {
          endGame();
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isTimerRunning, timerRemaining, gameStatus, localProposedOrder.length, players.length, endGame, updateTimer]);

  // Navegar a resultados cuando el juego termine
  useEffect(() => {
    if (gameStatus === 'results') {
      const gameCodeToUse = gameCodeFromParams || currentGameCode;
      if (router && router.push) {
        router.push(`/games/OrdenaLaHistoria/app/ordena-la-historia-results/${gameCodeToUse}`);
      }
    }
  }, [gameStatus, gameCodeFromParams, currentGameCode, router]);

  const handleOrderChange = (newOrder) => {
    setLocalProposedOrder(newOrder);
    setProposedOrder(newOrder);
  };

  const handleConfirmOrder = () => {
    if (localProposedOrder.length !== players.length) {
      Alert.alert('Error', 'Debes ordenar a todos los jugadores');
      return;
    }

    endGame();
  };

  if (gameStatus !== 'playing') {
    // Si no estamos en estado playing, redirigir
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ordena la Historia</Text>

        <OrdenaLaHistoriaTimerDisplay timeRemaining={timerRemaining} totalTime={timer} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Frase Secreta</Text>
          {currentPlayerSentence ? (
            <OrdenaLaHistoriaSentenceCard sentence={currentPlayerSentence} />
          ) : (
            <Text style={styles.noSentenceText}>No se ha asignado una frase aún</Text>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jugadores</Text>
          <View style={styles.playersGrid}>
            {players.map((player) => (
              <OrdenaLaHistoriaPlayerAvatar
                key={player.id}
                player={player}
                size={60}
                showName={true}
              />
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <OrdenaLaHistoriaFinalOrderList
            players={players}
            proposedOrder={localProposedOrder}
            onOrderChange={handleOrderChange}
            isEditable={true}
          />
        </View>

        {localProposedOrder.length === players.length && (
          <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmOrder}>
            <Text style={styles.confirmButtonText}>Confirmar Orden</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.instructionText}>
          ⚠️ Recuerda: Describe tu frase sin leerla textualmente. Colabora con tu equipo para
          deducir el orden correcto.
        </Text>
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
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 12,
    textAlign: 'center',
  },
  noSentenceText: {
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
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
  },
  confirmButton: {
    backgroundColor: '#2ECC71',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFD700',
  },
});
