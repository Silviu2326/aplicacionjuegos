import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useMascaradeStore } from '../store/mascaradeStore';
import { GAME_CONFIG } from '../constants/MascaradeCharacterData';

// Datos falsos para estadísticas y historial
const FAKE_STATS = {
  totalGames: 47,
  wins: 12,
  favoriteCharacter: 'Rey',
  totalCoinsEarned: 234,
  averageGameDuration: '18 min',
  bestStreak: 3,
};

const FAKE_GAME_HISTORY = [
  { id: 1, date: '2024-01-15', winner: 'Ana', coins: 13, players: 5, duration: '22 min', character: 'Rey' },
  { id: 2, date: '2024-01-12', winner: 'Carlos', coins: 15, players: 4, duration: '16 min', character: 'Bruja' },
  { id: 3, date: '2024-01-10', winner: 'María', coins: 13, players: 6, duration: '25 min', character: 'Juez' },
  { id: 4, date: '2024-01-08', winner: 'Luis', coins: 14, players: 5, duration: '19 min', character: 'Ladrón' },
  { id: 5, date: '2024-01-05', winner: 'Sofía', coins: 13, players: 4, duration: '17 min', character: 'Reina' },
];

export const MascaradeIndex = ({ navigation }) => {
  const players = useMascaradeStore((state) => state.players);
  const addPlayer = useMascaradeStore((state) => state.addPlayer);
  const removePlayer = useMascaradeStore((state) => state.removePlayer);
  const initializeGame = useMascaradeStore((state) => state.initializeGame);
  
  const [playerName, setPlayerName] = useState('');
  const [showStats, setShowStats] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  
  const handleAddPlayer = () => {
    if (!playerName.trim()) {
      Alert.alert('Error', 'Por favor ingresa un nombre válido');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `El máximo de jugadores es ${GAME_CONFIG.MAX_PLAYERS}`);
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };
  
  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert('Error', `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para iniciar`);
      return;
    }
    
    if (initializeGame()) {
      if (navigation && navigation.navigate) {
        navigation.navigate('mascarade-game');
      }
    } else {
      Alert.alert('Error', 'No se pudo inicializar el juego');
    }
  };
  
  const winRate = FAKE_STATS.totalGames > 0 
    ? Math.round((FAKE_STATS.wins / FAKE_STATS.totalGames) * 100) 
    : 0;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* Header mejorado */}
        <View style={styles.header}>
          <Text style={styles.title}>🎭 Mascarade</Text>
          <Text style={styles.subtitle}>Juego de Identidades Ocultas y Faroleo</Text>
          <Text style={styles.description}>
            Un juego de estrategia, engaño y memoria donde cada jugador intenta acumular 13 monedas.
          </Text>
        </View>

        {/* Estadísticas rápidas */}
        <View style={styles.statsQuickView}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{FAKE_STATS.totalGames}</Text>
            <Text style={styles.statLabel}>Partidas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{winRate}%</Text>
            <Text style={styles.statLabel}>Victorias</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{FAKE_STATS.bestStreak}</Text>
            <Text style={styles.statLabel}>Racha</Text>
          </View>
        </View>

        {/* Sección de añadir jugadores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Añadir Jugadores</Text>
          <View style={styles.addPlayerSection}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del jugador"
              value={playerName}
              onChangeText={setPlayerName}
              onSubmitEditing={handleAddPlayer}
              placeholderTextColor="#999"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
              <Text style={styles.addButtonText}>➕ Añadir</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.playersTitle}>
            Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
          </Text>
          
          {players.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🎯</Text>
              <Text style={styles.noPlayersText}>
                No hay jugadores añadidos
              </Text>
              <Text style={styles.emptyStateSubtext}>
                Añade al menos {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar una partida
              </Text>
            </View>
          ) : (
            <View style={styles.playersList}>
              {players.map((player, index) => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerInfo}>
                    <View style={styles.playerNumber}>
                      <Text style={styles.playerNumberText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.playerName}>{player.name}</Text>
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePlayer(player.id)}
                  >
                    <Text style={styles.removeButtonText}>✕</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </View>

        {/* Botones principales */}
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>🚀 Iniciar Partida</Text>
        </TouchableOpacity>

        {/* Botones secundarios */}
        <View style={styles.secondaryButtons}>
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowStats(!showStats)}
          >
            <Text style={styles.secondaryButtonText}>
              📊 {showStats ? 'Ocultar' : 'Ver'} Estadísticas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => setShowHistory(!showHistory)}
          >
            <Text style={styles.secondaryButtonText}>
              📜 {showHistory ? 'Ocultar' : 'Ver'} Historial
            </Text>
          </TouchableOpacity>
        </View>

        {/* Panel de estadísticas */}
        {showStats && (
          <View style={styles.statsPanel}>
            <Text style={styles.panelTitle}>📊 Estadísticas</Text>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Total Partidas</Text>
                <Text style={styles.statItemValue}>{FAKE_STATS.totalGames}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Victorias</Text>
                <Text style={styles.statItemValue}>{FAKE_STATS.wins}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Tasa de Victoria</Text>
                <Text style={styles.statItemValue}>{winRate}%</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Personaje Favorito</Text>
                <Text style={styles.statItemValue}>{FAKE_STATS.favoriteCharacter}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Monedas Totales</Text>
                <Text style={styles.statItemValue}>{FAKE_STATS.totalCoinsEarned}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Duración Promedio</Text>
                <Text style={styles.statItemValue}>{FAKE_STATS.averageGameDuration}</Text>
              </View>
            </View>
          </View>
        )}

        {/* Panel de historial */}
        {showHistory && (
          <View style={styles.historyPanel}>
            <Text style={styles.panelTitle}>📜 Historial de Partidas</Text>
            <ScrollView style={styles.historyList} nestedScrollEnabled>
              {FAKE_GAME_HISTORY.map((game) => (
                <View key={game.id} style={styles.historyItem}>
                  <View style={styles.historyHeader}>
                    <Text style={styles.historyDate}>{game.date}</Text>
                    <View style={styles.historyWinner}>
                      <Text style={styles.historyWinnerLabel}>🏆</Text>
                      <Text style={styles.historyWinnerName}>{game.winner}</Text>
                    </View>
                  </View>
                  <View style={styles.historyDetails}>
                    <View style={styles.historyDetail}>
                      <Text style={styles.historyDetailLabel}>Personaje:</Text>
                      <Text style={styles.historyDetailValue}>{game.character}</Text>
                    </View>
                    <View style={styles.historyDetail}>
                      <Text style={styles.historyDetailLabel}>Monedas:</Text>
                      <Text style={styles.historyDetailValue}>{game.coins} 💰</Text>
                    </View>
                    <View style={styles.historyDetail}>
                      <Text style={styles.historyDetailLabel}>Jugadores:</Text>
                      <Text style={styles.historyDetailValue}>{game.players}</Text>
                    </View>
                    <View style={styles.historyDetail}>
                      <Text style={styles.historyDetailLabel}>Duración:</Text>
                      <Text style={styles.historyDetailValue}>{game.duration}</Text>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        
        <TouchableOpacity
          style={styles.rulesButton}
          onPress={() => navigation?.navigate('mascarade-rules')}
        >
          <Text style={styles.rulesButtonText}>📖 Ver Reglas Completas</Text>
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
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 8,
    color: '#666',
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
    color: '#888',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  statsQuickView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  addPlayerSection: {
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  playersTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    marginTop: 8,
    color: '#333',
  },
  emptyState: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    marginBottom: 16,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  noPlayersText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  playersList: {
    marginBottom: 16,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 14,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerNumber: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerNumberText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  removeButton: {
    backgroundColor: '#f44336',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  secondaryButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 4,
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '600',
  },
  statsPanel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  panelTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  statItemLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textAlign: 'center',
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  historyPanel: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 400,
  },
  historyList: {
    maxHeight: 350,
  },
  historyItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  historyDate: {
    fontSize: 12,
    color: '#999',
    fontWeight: '600',
  },
  historyWinner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyWinnerLabel: {
    fontSize: 16,
    marginRight: 4,
  },
  historyWinnerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  historyDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  historyDetail: {
    flexDirection: 'row',
    marginRight: 16,
    marginBottom: 4,
  },
  historyDetailLabel: {
    fontSize: 12,
    color: '#666',
    marginRight: 4,
  },
  historyDetailValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  rulesButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  rulesButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

