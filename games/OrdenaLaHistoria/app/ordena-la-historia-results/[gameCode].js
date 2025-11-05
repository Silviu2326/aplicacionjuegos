import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useOrdenaLaHistoriaStore } from '../../store/ordenaLaHistoriaStore';
import { OrdenaLaHistoriaPlayerAvatar } from '../../components/OrdenaLaHistoriaPlayerAvatar';

export default function OrdenaLaHistoriaResultsScreen({ route }) {
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
  const isCorrect = useOrdenaLaHistoriaStore((state) => state.isCorrect);
  const revealedStory = useOrdenaLaHistoriaStore((state) => state.revealedStory);
  const correctOrder = useOrdenaLaHistoriaStore((state) => state.correctOrder);
  const assignedSentences = useOrdenaLaHistoriaStore((state) => state.assignedSentences);
  const resetGame = useOrdenaLaHistoriaStore((state) => state.resetGame);
  const currentGameCode = useOrdenaLaHistoriaStore((state) => state.gameCode);
  const isHost = useOrdenaLaHistoriaStore((state) => state.isHost());

  const displayGameCode = gameCodeFromParams || currentGameCode;

  const handleNewRound = () => {
    resetGame();
    router.push(`/games/OrdenaLaHistoria/app/ordena-la-historia-lobby/${displayGameCode}`);
  };

  const getPlayerById = (playerId) => {
    return players.find((p) => p.id === playerId);
  };

  // Construir la historia correcta
  const correctStory = correctOrder.map((playerId) => {
    const player = getPlayerById(playerId);
    return {
      playerId,
      playerName: player?.name || 'Jugador',
      sentence: assignedSentences[playerId] || '',
    };
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.resultHeader}>
          <Text style={styles.title}>Resultado</Text>
          <View style={[styles.resultBadge, isCorrect ? styles.resultBadgeSuccess : styles.resultBadgeFail]}>
            <Text style={styles.resultBadgeText}>
              {isCorrect ? '¡Correcto! 🎉' : 'Incorrecto ❌'}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tu Orden Propuesto</Text>
          {revealedStory.map((item, index) => {
            const player = getPlayerById(item.playerId);
            return (
              <View key={index} style={styles.storyItem}>
                <View style={styles.storyItemHeader}>
                  <View style={styles.orderNumber}>
                    <Text style={styles.orderNumberText}>{index + 1}º</Text>
                  </View>
                  <OrdenaLaHistoriaPlayerAvatar player={player || { name: item.playerName, color: '#CCCCCC' }} size={40} showName={false} />
                  <Text style={styles.playerName}>{item.playerName}</Text>
                </View>
                <Text style={styles.sentenceText}>{item.sentence}</Text>
              </View>
            );
          })}
        </View>

        {!isCorrect && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Orden Correcto</Text>
            {correctStory.map((item, index) => {
              const player = getPlayerById(item.playerId);
              return (
                <View key={index} style={styles.storyItem}>
                  <View style={styles.storyItemHeader}>
                    <View style={[styles.orderNumber, styles.orderNumberCorrect]}>
                      <Text style={styles.orderNumberText}>{index + 1}º</Text>
                    </View>
                    <OrdenaLaHistoriaPlayerAvatar player={player || { name: item.playerName, color: '#CCCCCC' }} size={40} showName={false} />
                    <Text style={styles.playerName}>{item.playerName}</Text>
                  </View>
                  <Text style={styles.sentenceText}>{item.sentence}</Text>
                </View>
              );
            })}
          </View>
        )}

        {isHost && (
          <TouchableOpacity style={styles.newRoundButton} onPress={handleNewRound}>
            <Text style={styles.newRoundButtonText}>Jugar Otra Ronda</Text>
          </TouchableOpacity>
        )}

        {!isHost && (
          <Text style={styles.waitingText}>
            Esperando a que el anfitrión inicie otra ronda...
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
  resultHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 16,
  },
  resultBadge: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resultBadgeSuccess: {
    backgroundColor: '#2ECC71',
  },
  resultBadgeFail: {
    backgroundColor: '#E74C3C',
  },
  resultBadgeText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
    textAlign: 'center',
  },
  storyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  storyItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderNumber: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  orderNumberCorrect: {
    backgroundColor: '#2ECC71',
  },
  orderNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    marginLeft: 12,
  },
  sentenceText: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
    fontStyle: 'italic',
  },
  newRoundButton: {
    backgroundColor: '#4ECDC4',
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
  newRoundButtonText: {
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
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
});
