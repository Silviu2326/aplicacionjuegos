import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useFeedTheKrakenStore } from '../store/feedTheKrakenStore';
import { FAKE_STATISTICS, STRATEGY_TIPS } from '../constants/FeedTheKrakenGameData';

export const FeedTheKrakenIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const { players, addPlayer, removePlayer, startGame, resetGame } = useFeedTheKrakenStore();

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (players.length >= 5 && players.length <= 11) {
      startGame();
      if (navigation && navigation.navigate) {
        navigation.navigate('feed-the-kraken-role-reveal');
      }
    }
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Feed the Kraken</Text>
        <Text style={styles.subtitle}>Juego de deducción social</Text>
        <Text style={styles.description}>
          La tripulación de un barco se divide en tres facciones secretas: los Marineros leales, 
          los Piratas y un solitario Líder de Secta adorador del Kraken. El objetivo de los 
          Marineros es llevar el barco a salvo al puerto de Bluewater Bay. Los Piratas intentan 
          navegar hacia la ensenada carmesí de los Corsarios. El Líder de la Secta busca invocar 
          al Kraken desde las profundidades del mar.
        </Text>

        <View style={styles.buttonRow}>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => setShowStats(!showStats)}
          >
            <Text style={styles.secondaryButtonText}>📊 Estadísticas</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => setShowTips(!showTips)}
          >
            <Text style={styles.secondaryButtonText}>💡 Consejos</Text>
          </TouchableOpacity>
        </View>

        {showStats && (
          <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Estadísticas del Juego</Text>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{FAKE_STATISTICS.totalGames.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Partidas Totales</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{FAKE_STATISTICS.totalPlayers.toLocaleString()}</Text>
                <Text style={styles.statLabel}>Jugadores</Text>
              </View>
            </View>
            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{FAKE_STATISTICS.averageGameDuration}</Text>
                <Text style={styles.statLabel}>Duración Promedio</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{FAKE_STATISTICS.mostCommonWinner}</Text>
                <Text style={styles.statLabel}>Ganador Más Común</Text>
              </View>
            </View>
            <Text style={styles.recentGamesTitle}>Partidas Recientes</Text>
            <ScrollView style={styles.recentGamesList}>
              {FAKE_STATISTICS.recentGames.map((game) => (
                <View key={game.id} style={styles.recentGameItem}>
                  <Text style={styles.recentGameWinner}>
                    {game.winner === 'Marineros' ? '⚓' : game.winner === 'Piratas' ? '🏴‍☠️' : '🐙'} {game.winner}
                  </Text>
                  <Text style={styles.recentGameDetails}>
                    {game.players} jugadores • {game.duration} • {game.date}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        {showTips && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipsTitle}>Consejos Estratégicos</Text>
            <ScrollView style={styles.tipsList}>
              {STRATEGY_TIPS.general.map((tip, index) => (
                <View key={index} style={styles.tipItem}>
                  <Text style={styles.tipText}>• {tip}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        )}

        <Text style={styles.playersLabel}>Jugadores ({players.length}/5-11)</Text>
        
        <View style={styles.inputContainer}>
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

        <ScrollView style={styles.playersList}>
          {players.map((player) => (
            <View key={player.id} style={styles.playerItem}>
              <Text style={styles.playerName}>{player.name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePlayer(player.id)}
              >
                <Text style={styles.removeButtonText}>Eliminar</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          style={[
            styles.startButton,
            (players.length < 5 || players.length > 11) && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < 5 || players.length > 11}
        >
          <Text style={styles.startButtonText}>Iniciar Partida</Text>
        </TouchableOpacity>

        {players.length > 0 && (
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        )}

        {players.length < 5 && (
          <Text style={styles.warningText}>
            Se requieren al menos 5 jugadores para iniciar
          </Text>
        )}
        {players.length > 11 && (
          <Text style={styles.warningText}>
            El juego admite máximo 11 jugadores
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 20,
  },
  playersLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersList: {
    maxHeight: 200,
    marginBottom: 20,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  startButtonDisabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#666',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  warningText: {
    color: '#f5a623',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  secondaryButton: {
    backgroundColor: '#16213e',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4a90e2',
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4a90e2',
    fontSize: 14,
    fontWeight: 'bold',
  },
  statsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  statBox: {
    backgroundColor: '#0f1626',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 5,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#ccc',
    textAlign: 'center',
  },
  recentGamesTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
  recentGamesList: {
    maxHeight: 150,
  },
  recentGameItem: {
    backgroundColor: '#0f1626',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
  },
  recentGameWinner: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 3,
  },
  recentGameDetails: {
    fontSize: 12,
    color: '#888',
  },
  tipsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#f5a623',
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  tipsList: {
    maxHeight: 200,
  },
  tipItem: {
    marginBottom: 10,
    paddingLeft: 5,
  },
  tipText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
});

