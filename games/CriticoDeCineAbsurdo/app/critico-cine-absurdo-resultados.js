import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { CriticoCineAbsurdoTablaPuntuaciones } from '../components/CriticoCineAbsurdoTablaPuntuaciones';
import { CriticoCineAbsurdoAvatarJugador } from '../components/CriticoCineAbsurdoAvatarJugador';
import { useCriticoCineAbsurdoStore } from '../store/criticoCineAbsurdoStore';

export const CriticoCineAbsurdoResultados = ({ navigation }) => {
  const players = useCriticoCineAbsurdoStore((state) => state.players);
  const roundHistory = useCriticoCineAbsurdoStore((state) => state.roundHistory);
  const getWinner = useCriticoCineAbsurdoStore((state) => state.getWinner);
  const getSortedPlayers = useCriticoCineAbsurdoStore((state) => state.getSortedPlayers);
  const resetGame = useCriticoCineAbsurdoStore((state) => state.resetGame);
  
  const winner = getWinner();
  const sortedPlayers = getSortedPlayers();
  
  // Calcular estadísticas
  const totalRounds = roundHistory.length;
  const mejorCritica = roundHistory.length > 0 
    ? roundHistory.reduce((best, current) => 
        current.averageStars > best.averageStars ? current : best
      )
    : null;
  const promedioGeneral = roundHistory.length > 0
    ? roundHistory.reduce((sum, r) => sum + r.averageStars, 0) / roundHistory.length
    : 0;
  
  const handleNewGame = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };
  
  const handlePlayAgain = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Resultados Finales</Text>
        
        {winner && (
          <View style={styles.winnerSection}>
            <Text style={styles.winnerLabel}>¡Ganador!</Text>
            <CriticoCineAbsurdoAvatarJugador
              jugador={winner}
              esCritico={false}
              mostrarPuntuacion={true}
            />
            <Text style={styles.winnerName}>{winner.name}</Text>
            <Text style={styles.winnerScore}>
              {winner.score.toFixed(1)} puntos
            </Text>
            <Text style={styles.winnerMessage}>
              ¡Felicidades! Eres el Crítico de Cine Absurdo definitivo.
            </Text>
          </View>
        )}
        
        <CriticoCineAbsurdoTablaPuntuaciones jugadores={sortedPlayers} />
        
        <View style={styles.estadisticasSection}>
          <Text style={styles.estadisticasTitle}>Estadísticas de la Partida</Text>
          <View style={styles.estadisticasGrid}>
            <View style={styles.estadisticaItem}>
              <Text style={styles.estadisticaLabel}>Total de Rondas</Text>
              <Text style={styles.estadisticaValor}>{totalRounds}</Text>
            </View>
            <View style={styles.estadisticaItem}>
              <Text style={styles.estadisticaLabel}>Promedio General</Text>
              <Text style={styles.estadisticaValor}>{promedioGeneral.toFixed(1)} ⭐</Text>
            </View>
            {mejorCritica && (
              <View style={styles.estadisticaItem}>
                <Text style={styles.estadisticaLabel}>Mejor Crítica</Text>
                <Text style={styles.estadisticaValor}>{mejorCritica.averageStars.toFixed(1)} ⭐</Text>
                <Text style={styles.estadisticaSubtext}>{mejorCritica.criticName}</Text>
              </View>
            )}
          </View>
        </View>
        
        {mejorCritica && (
          <View style={styles.mejorCriticaSection}>
            <Text style={styles.mejorCriticaTitle}>🌟 Mejor Crítica de la Partida</Text>
            <Text style={styles.mejorCriticaPelicula}>{mejorCritica.movieData?.titulo}</Text>
            <Text style={styles.mejorCriticaCritico}>
              Por: {mejorCritica.criticName} • {mejorCritica.averageStars.toFixed(1)} estrellas
            </Text>
          </View>
        )}
        
        <View style={styles.historialSection}>
          <Text style={styles.historialTitle}>Historial de Críticas</Text>
          {roundHistory.map((entry, index) => (
            <View key={index} style={styles.historialItem}>
              <View style={styles.historialHeader}>
                <Text style={styles.historialRonda}>Ronda {entry.round}</Text>
                <Text style={styles.historialStars}>
                  {entry.averageStars.toFixed(1)} ⭐
                </Text>
              </View>
              <Text style={styles.historialPelicula}>{entry.movieData?.titulo}</Text>
              <Text style={styles.historialCritico}>
                Crítico: {entry.criticName} • {entry.totalVotes} votos
              </Text>
            </View>
          ))}
        </View>
        
        <View style={styles.playersGrid}>
          <Text style={styles.playersGridTitle}>Podio</Text>
          {sortedPlayers.slice(0, 3).map((player, index) => (
            <View key={player.id} style={styles.podiumItem}>
              <Text style={styles.podiumPosition}>
                {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'} {index + 1}°
              </Text>
              <CriticoCineAbsurdoAvatarJugador
                jugador={player}
                esCritico={false}
                mostrarPuntuacion={true}
              />
            </View>
          ))}
        </View>
        
        <TouchableOpacity
          style={styles.newGameButton}
          onPress={handleNewGame}
        >
          <Text style={styles.newGameButtonText}>Nueva Partida</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.playAgainButton}
          onPress={handlePlayAgain}
        >
          <Text style={styles.playAgainButtonText}>Jugar Otra Vez</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    color: '#333',
  },
  winnerSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  winnerLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  winnerName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  winnerScore: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 8,
  },
  winnerMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
  playersGrid: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  playersGridTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  podiumItem: {
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  podiumItemLast: {
    borderBottomWidth: 0,
  },
  podiumPosition: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  newGameButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  newGameButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  playAgainButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  estadisticasSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    marginBottom: 24,
  },
  estadisticasTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  estadisticasGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  estadisticaItem: {
    alignItems: 'center',
    marginBottom: 12,
    minWidth: 100,
  },
  estadisticaLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  estadisticaValor: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  estadisticaSubtext: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  mejorCriticaSection: {
    backgroundColor: '#FFF9C4',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  mejorCriticaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  mejorCriticaPelicula: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  mejorCriticaCritico: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  historialSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  historialTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  historialItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historialRonda: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  historialStars: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FF9800',
  },
  historialPelicula: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  historialCritico: {
    fontSize: 12,
    color: '#999',
  },
});

