import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useInsiderGameStore } from '../store/insiderGameStore';
import { InsiderPlayerList } from '../components/InsiderPlayerList';
import { GAME_RESULT, ROLES } from '../constants/insiderGameConfig';

export const InsiderResults = ({ navigation }) => {
  const players = useInsiderGameStore((state) => state.players);
  const insiderIndex = useInsiderGameStore((state) => state.insiderIndex);
  const guideIndex = useInsiderGameStore((state) => state.guideIndex);
  const gameResult = useInsiderGameStore((state) => state.gameResult);
  const secretWord = useInsiderGameStore((state) => state.secretWord);
  const accusedPlayer = useInsiderGameStore((state) => state.accusedPlayer);
  const guessedWord = useInsiderGameStore((state) => state.guessedWord);
  const wordGuessed = useInsiderGameStore((state) => state.wordGuessed);
  const resetGame = useInsiderGameStore((state) => state.resetGame);

  const insiderPlayer = players[insiderIndex];
  const guidePlayer = players[guideIndex];

  const handleNewGame = () => {
    resetGame();
    navigation?.navigate('index');
  };

  const getResultMessage = () => {
    if (!gameResult) return 'Resultado pendiente';
    
    switch (gameResult) {
      case GAME_RESULT.CITIZENS_WIN:
        return `¡El Infiltrado fue descubierto! ${insiderPlayer?.name} fue identificado correctamente. Los Ciudadanos y el Guía ganan.`;
      case GAME_RESULT.INSIDER_WINS:
        return `¡El Infiltrado ganó! ${accusedPlayer?.name} fue acusado incorrectamente. El Infiltrado pasó desapercibido.`;
      case GAME_RESULT.TIME_OUT:
        return `Se acabó el tiempo sin adivinar la palabra. ${insiderPlayer?.name} (Infiltrado) y ${guidePlayer?.name} (Guía) pierden. Los Ciudadanos ganan.`;
      default:
        return 'Resultado desconocido';
    }
  };

  const getWinners = () => {
    if (!gameResult) return [];
    
    switch (gameResult) {
      case GAME_RESULT.CITIZENS_WIN:
        // Ciudadanos y Guía ganan
        return players.filter((player, index) => 
          index !== insiderIndex && player.role !== ROLES.INSIDER
        );
      case GAME_RESULT.INSIDER_WINS:
        // Solo el Infiltrado gana
        return [insiderPlayer].filter(Boolean);
      case GAME_RESULT.TIME_OUT:
        // Solo los Ciudadanos ganan
        return players.filter((player, index) => 
          index !== insiderIndex && index !== guideIndex
        );
      default:
        return [];
    }
  };

  const winners = getWinners();
  const questions = useInsiderGameStore((state) => state.questions);
  const votes = useInsiderGameStore((state) => state.votes);
  const totalQuestions = questions.length;
  const answeredQuestions = questions.filter(q => q.answer !== null).length;
  const voteCounts = {};
  
  Object.values(votes).forEach((votedId) => {
    voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>🏆 Resultados</Text>
        <Text style={styles.subtitle}>Fin del juego</Text>
      </View>
      
      <View style={styles.resultContainer}>
        <Text style={styles.resultMessage}>{getResultMessage()}</Text>
        
        {secretWord && (
          <View style={styles.secretWordContainer}>
            <Text style={styles.secretWordLabel}>La palabra secreta era:</Text>
            <Text style={styles.secretWord}>{secretWord}</Text>
          </View>
        )}

        {wordGuessed && guessedWord && (
          <View style={styles.guessedWordContainer}>
            <Text style={styles.guessedWordLabel}>Palabra adivinada:</Text>
            <Text style={styles.guessedWord}>{guessedWord}</Text>
          </View>
        )}

        {insiderPlayer && (
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>El Infiltrado era:</Text>
            <Text style={styles.insiderName}>{insiderPlayer.name}</Text>
          </View>
        )}

        {guidePlayer && (
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>El Guía era:</Text>
            <Text style={styles.guideName}>{guidePlayer.name}</Text>
          </View>
        )}

        {accusedPlayer && (
          <View style={styles.roleContainer}>
            <Text style={styles.roleLabel}>Jugador acusado:</Text>
            <Text style={[
              styles.accusedName,
              accusedPlayer.id === insiderPlayer?.id ? styles.correctAccusation : styles.wrongAccusation
            ]}>
              {accusedPlayer.name}
            </Text>
          </View>
        )}
      </View>

      {winners.length > 0 && (
        <View style={styles.winnersContainer}>
          <Text style={styles.winnersLabel}>🎉 ¡Ganadores!</Text>
          <View style={styles.winnersList}>
            {winners.map((winner) => (
              <View key={winner.id} style={styles.winnerItem}>
                <Text style={styles.winnerEmoji}>
                  {winner.role === ROLES.GUIDE ? '👑' : winner.role === ROLES.INSIDER ? '🎭' : '👤'}
                </Text>
                <Text style={styles.winnerName}>{winner.name}</Text>
                <Text style={styles.winnerRole}>
                  {winner.role === ROLES.GUIDE ? 'Guía' : winner.role === ROLES.INSIDER ? 'Infiltrado' : 'Ciudadano'}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>📊 Estadísticas del Juego</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{totalQuestions}</Text>
            <Text style={styles.statLabel}>Preguntas Totales</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{answeredQuestions}</Text>
            <Text style={styles.statLabel}>Respondidas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>
              {Math.round((answeredQuestions / totalQuestions) * 100) || 0}%
            </Text>
            <Text style={styles.statLabel}>Tasa de Respuesta</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{wordGuessed ? '✓' : '✗'}</Text>
            <Text style={styles.statLabel}>Palabra Adivinada</Text>
          </View>
        </View>
      </View>

      {Object.keys(voteCounts).length > 0 && (
        <View style={styles.votesContainer}>
          <Text style={styles.sectionTitle}>🗳️ Distribución de Votos</Text>
          {players.map((player) => {
            const voteCount = voteCounts[player.id] || 0;
            const isInsider = player.id === insiderPlayer?.id;
            return (
              <View key={player.id} style={styles.voteItem}>
                <View style={styles.votePlayerInfo}>
                  <Text style={styles.votePlayerEmoji}>
                    {player.role === ROLES.GUIDE ? '👑' : player.role === ROLES.INSIDER ? '🎭' : '👤'}
                  </Text>
                  <Text style={styles.votePlayerName}>{player.name}</Text>
                  {isInsider && <Text style={styles.insiderBadge}>🎭 Infiltrado</Text>}
                </View>
                <View style={styles.voteBarContainer}>
                  <View style={[
                    styles.voteBar,
                    { width: `${(voteCount / players.length) * 100}%` },
                    isInsider && styles.voteBarInsider
                  ]} />
                  <Text style={styles.voteCount}>{voteCount} voto{voteCount !== 1 ? 's' : ''}</Text>
                </View>
              </View>
            );
          })}
        </View>
      )}

      <View style={styles.playersContainer}>
        <Text style={styles.playersLabel}>👥 Jugadores y Roles</Text>
        <InsiderPlayerList players={players} />
      </View>

      <TouchableOpacity style={styles.actionButton} onPress={handleNewGame}>
        <Text style={styles.actionButtonText}>Nuevo Juego</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  secretWordContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  secretWordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  secretWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  guessedWordContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  guessedWordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  guessedWord: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  roleContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  roleLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  insiderName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f44336',
  },
  guideName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  accusedName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  correctAccusation: {
    color: '#4CAF50',
  },
  wrongAccusation: {
    color: '#f44336',
  },
  winnersContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  winnersLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 15,
    textAlign: 'center',
  },
  winnersList: {
    width: '100%',
  },
  winnerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  winnerEmoji: {
    fontSize: 24,
    marginRight: 10,
  },
  winnerName: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: 'bold',
    flex: 1,
  },
  winnerRole: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  playersContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  playersLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  actionButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  votesContainer: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  voteItem: {
    marginBottom: 15,
  },
  votePlayerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  votePlayerEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  votePlayerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  insiderBadge: {
    backgroundColor: '#f44336',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  voteBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  voteBar: {
    height: 20,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    marginRight: 10,
  },
  voteBarInsider: {
    backgroundColor: '#f44336',
  },
  voteCount: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

