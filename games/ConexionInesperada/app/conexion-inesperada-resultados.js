import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';
import { ConexionInesperadaScoreboard } from '../components/ConexionInesperadaScoreboard';
import { useConexionInesperadaStore } from '../store/useConexionInesperadaStore';

export const ConexionInesperadaResultados = ({ navigation }) => {
  const gameStatus = useConexionInesperadaStore((state) => state.gameStatus);
  const players = useConexionInesperadaStore((state) => state.players);
  const currentRound = useConexionInesperadaStore((state) => state.currentRound);
  const maxRounds = useConexionInesperadaStore((state) => state.maxRounds);
  const currentResponses = useConexionInesperadaStore((state) => state.currentResponses);
  const getWinner = useConexionInesperadaStore((state) => state.getWinner);
  const startNextRound = useConexionInesperadaStore((state) => state.startNextRound);
  const resetGame = useConexionInesperadaStore((state) => state.resetGame);
  
  const isGameFinished = gameStatus === 'finished';
  const winner = isGameFinished ? getWinner() : null;
  
  // Obtener ganador de la ronda actual
  const getRoundWinner = () => {
    if (currentResponses.length === 0) return null;
    const winningResponse = currentResponses.reduce((prev, current) =>
      prev.votes > current.votes ? prev : current
    );
    return players.find(p => p.id === winningResponse.playerId);
  };
  
  const roundWinner = getRoundWinner();
  
  const handleNextRound = () => {
    startNextRound();
    if (navigation && navigation.navigate) {
      navigation.navigate('conexion-inesperada-partida');
    }
  };
  
  const handleNewGame = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };
  
  const handleBackToGame = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('conexion-inesperada-partida');
    }
  };
  
  // Calcular estadísticas
  const getTopResponse = () => {
    if (currentResponses.length === 0) return null;
    return currentResponses.reduce((prev, current) =>
      (prev.votes || 0) > (current.votes || 0) ? prev : current
    );
  };

  const topResponse = getTopResponse();
  const topResponsePlayer = topResponse ? players.find(p => p.id === topResponse.playerId) : null;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {isGameFinished ? (
        <>
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerTitle}>🎉 ¡Juego Terminado!</Text>
            {winner && (
              <>
                <View style={styles.winnerCrown}>
                  <Text style={styles.winnerEmoji}>🏆</Text>
                </View>
                <Text style={styles.winnerName}>{winner.name}</Text>
                <View style={styles.winnerStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{winner.score}</Text>
                    <Text style={styles.statLabel}>puntos</Text>
                  </View>
                  <View style={styles.statDivider} />
                  <View style={styles.statItem}>
                    <Text style={styles.statValue}>{maxRounds}</Text>
                    <Text style={styles.statLabel}>rondas</Text>
                  </View>
                </View>
                <Text style={styles.winnerMessage}>¡Felicidades por tu victoria!</Text>
              </>
            )}
          </View>
          
          <ConexionInesperadaScoreboard 
            players={players} 
            currentRound={maxRounds} 
            maxRounds={maxRounds}
            currentResponses={currentResponses}
          />
          
          {topResponse && topResponsePlayer && (
            <View style={styles.topResponseContainer}>
              <Text style={styles.topResponseTitle}>⭐ Mejor Respuesta del Juego</Text>
              <View style={styles.topResponseCard}>
                <Text style={styles.topResponseText}>"{topResponse.response}"</Text>
                <View style={styles.topResponseFooter}>
                  <Text style={styles.topResponseAuthor}>— {topResponsePlayer.name}</Text>
                  <View style={styles.topResponseBadge}>
                    <Text style={styles.topResponseVotes}>
                      🗳️ {topResponse.votes} {topResponse.votes === 1 ? 'voto' : 'votos'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          
          <View style={styles.responsesContainer}>
            <Text style={styles.sectionTitle}>📝 Últimas Respuestas</Text>
            {currentResponses
              .sort((a, b) => (b.votes || 0) - (a.votes || 0))
              .map((response, index) => {
                const player = players.find(p => p.id === response.playerId);
                const isTop = index === 0;
                return (
                  <View 
                    key={response.id} 
                    style={[
                      styles.responseItem,
                      isTop && styles.responseItemTop
                    ]}
                  >
                    {isTop && (
                      <View style={styles.topBadge}>
                        <Text style={styles.topBadgeText}>🥇</Text>
                      </View>
                    )}
                    <Text style={styles.responseText}>"{response.response}"</Text>
                    <View style={styles.responseFooter}>
                      <Text style={styles.responseAuthor}>
                        — {player ? player.name : 'Anónimo'}
                      </Text>
                      <Text style={styles.responseVotes}>
                        {response.votes || 0} {response.votes === 1 ? 'voto' : 'votos'}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
          
          <TouchableOpacity
            style={styles.newGameButton}
            onPress={handleNewGame}
          >
            <Text style={styles.buttonText}>🔄 Nueva Partida</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <View style={styles.roundResultContainer}>
            <Text style={styles.roundResultTitle}>✅ Ronda {currentRound - 1} Finalizada</Text>
            {roundWinner && topResponse && (
              <>
                <View style={styles.roundWinnerInfo}>
                  <Text style={styles.roundWinnerEmoji}>🏆</Text>
                  <View style={styles.roundWinnerText}>
                    <Text style={styles.roundWinnerName}>{roundWinner.name}</Text>
                    <Text style={styles.roundWinnerStats}>
                      Ganó con {topResponse.votes || 0} {topResponse.votes === 1 ? 'voto' : 'votos'}
                    </Text>
                  </View>
                </View>
              </>
            )}
            {!roundWinner && (
              <Text style={styles.roundResultText}>Ronda completada</Text>
            )}
          </View>
          
          <ConexionInesperadaScoreboard 
            players={players} 
            currentRound={currentRound} 
            maxRounds={maxRounds}
            currentResponses={currentResponses}
          />
          
          {topResponse && topResponsePlayer && (
            <View style={styles.topResponseContainer}>
              <Text style={styles.topResponseTitle}>⭐ Mejor Respuesta de la Ronda</Text>
              <View style={styles.topResponseCard}>
                <Text style={styles.topResponseText}>"{topResponse.response}"</Text>
                <View style={styles.topResponseFooter}>
                  <Text style={styles.topResponseAuthor}>— {topResponsePlayer.name}</Text>
                  <View style={styles.topResponseBadge}>
                    <Text style={styles.topResponseVotes}>
                      🗳️ {topResponse.votes || 0} {topResponse.votes === 1 ? 'voto' : 'votos'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          
          <View style={styles.responsesContainer}>
            <Text style={styles.sectionTitle}>📝 Respuestas de la Ronda</Text>
            {currentResponses
              .sort((a, b) => (b.votes || 0) - (a.votes || 0))
              .map((response, index) => {
                const player = players.find(p => p.id === response.playerId);
                const isTop = index === 0;
                return (
                  <View 
                    key={response.id} 
                    style={[
                      styles.responseItem,
                      isTop && styles.responseItemTop
                    ]}
                  >
                    {isTop && (
                      <View style={styles.topBadge}>
                        <Text style={styles.topBadgeText}>🥇</Text>
                      </View>
                    )}
                    <Text style={styles.responseText}>"{response.response}"</Text>
                    <View style={styles.responseFooter}>
                      <Text style={styles.responseAuthor}>
                        — {player ? player.name : 'Anónimo'}
                      </Text>
                      <Text style={styles.responseVotes}>
                        {response.votes || 0} {response.votes === 1 ? 'voto' : 'votos'}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
          
          {currentRound <= maxRounds ? (
            <TouchableOpacity
              style={styles.nextRoundButton}
              onPress={handleNextRound}
            >
              <Text style={styles.buttonText}>➡️ Siguiente Ronda</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.finishGameButton}
              onPress={() => {
                const finishRound = useConexionInesperadaStore.getState().finishRound;
                finishRound();
              }}
            >
              <Text style={styles.buttonText}>🏁 Finalizar Juego</Text>
            </TouchableOpacity>
          )}
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 15,
  },
  winnerContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ffd700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 4,
    borderColor: '#ffd700',
  },
  winnerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  winnerCrown: {
    marginBottom: 15,
  },
  winnerEmoji: {
    fontSize: 80,
  },
  winnerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  winnerStats: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  statItem: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#e0e0e0',
  },
  winnerMessage: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  roundResultContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  roundResultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    letterSpacing: 0.5,
  },
  roundWinnerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#fff9c4',
    padding: 15,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  roundWinnerEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  roundWinnerText: {
    flex: 1,
  },
  roundWinnerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  roundWinnerStats: {
    fontSize: 14,
    color: '#666',
  },
  roundResultText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  topResponseContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 3,
    borderColor: '#ff9800',
  },
  topResponseTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 15,
    textAlign: 'center',
  },
  topResponseCard: {
    backgroundColor: '#fff3e0',
    borderRadius: 12,
    padding: 18,
    borderLeftWidth: 5,
    borderLeftColor: '#ff9800',
  },
  topResponseText: {
    fontSize: 17,
    color: '#1a1a1a',
    marginBottom: 12,
    fontStyle: 'italic',
    lineHeight: 24,
  },
  topResponseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  topResponseAuthor: {
    fontSize: 15,
    color: '#666',
    fontWeight: '600',
  },
  topResponseBadge: {
    backgroundColor: '#ff9800',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  topResponseVotes: {
    fontSize: 13,
    color: '#fff',
    fontWeight: 'bold',
  },
  responsesContainer: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 18,
    textAlign: 'center',
  },
  responseItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    position: 'relative',
  },
  responseItemTop: {
    backgroundColor: '#fff9c4',
    borderLeftColor: '#ffd700',
    borderWidth: 2,
    borderColor: '#ffd700',
  },
  topBadge: {
    position: 'absolute',
    top: -8,
    right: 10,
    backgroundColor: '#ffd700',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  topBadgeText: {
    fontSize: 16,
  },
  responseText: {
    fontSize: 16,
    color: '#1a1a1a',
    marginBottom: 10,
    fontStyle: 'italic',
    lineHeight: 22,
    paddingRight: 10,
  },
  responseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  responseAuthor: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  responseVotes: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  nextRoundButton: {
    backgroundColor: '#4CAF50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  finishGameButton: {
    backgroundColor: '#ff9800',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#ff9800',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  newGameButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
});

