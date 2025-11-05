import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useInsiderGameStore } from '../store/insiderGameStore';
import { InsiderPlayerList } from '../components/InsiderPlayerList';
import { WORD_LIST, getRandomCategory } from '../constants/insiderWordList';

// Nombres sugeridos
const SUGGESTED_NAMES = [
  'Ana', 'Carlos', 'María', 'Juan', 'Laura', 'Pedro', 'Sofia', 'Diego',
  'Elena', 'Miguel', 'Carmen', 'Luis', 'Isabel', 'Javier', 'Patricia', 'Roberto',
  'Marta', 'Fernando', 'Lucía', 'Alejandro', 'Paula', 'David', 'Cristina', 'Antonio',
  'Natalia', 'Rafael', 'Andrea', 'Sergio', 'Monica', 'Francisco', 'Beatriz', 'Manuel'
];

// Colores para avatares
const AVATAR_COLORS = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8',
  '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52BE80',
  '#EC7063', '#5DADE2', '#58D68D', '#F39C12', '#E74C3C',
  '#3498DB', '#1ABC9C', '#E67E22', '#9B59B6', '#34495E'
];

export const InsiderLobby = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  
  const players = useInsiderGameStore((state) => state.players);
  const addPlayer = useInsiderGameStore((state) => state.addPlayer);
  const removePlayer = useInsiderGameStore((state) => state.removePlayer);
  const startGame = useInsiderGameStore((state) => state.startGame);
  const selectCategoryAndWord = useInsiderGameStore((state) => state.selectCategoryAndWord);
  const selectedCategory = useInsiderGameStore((state) => state.selectedCategory);
  const secretWord = useInsiderGameStore((state) => state.secretWord);

  const getRandomSuggestedName = () => {
    const usedNames = players.map(p => p.name);
    const availableNames = SUGGESTED_NAMES.filter(name => !usedNames.includes(name));
    if (availableNames.length > 0) {
      return availableNames[Math.floor(Math.random() * availableNames.length)];
    }
    return `Jugador ${players.length + 1}`;
  };

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }

    const success = addPlayer(playerName.trim());
    if (success) {
      setPlayerName('');
    } else {
      Alert.alert('Error', 'Este nombre ya está en uso');
    }
  };

  const handleQuickAdd = () => {
    const suggestedName = getRandomSuggestedName();
    const success = addPlayer(suggestedName);
    if (!success) {
      Alert.alert('Error', 'No se pudo agregar el jugador');
    }
  };

  const handleStartGame = () => {
    if (players.length < 4 || players.length > 8) {
      Alert.alert('Error', `Se necesitan entre 4 y 8 jugadores para comenzar (actual: ${players.length})`);
      return;
    }

    // Seleccionar categoría y palabra automáticamente si no se ha hecho
    if (!selectedCategory || !secretWord) {
      const randomCategory = getRandomCategory();
      selectCategoryAndWord(randomCategory);
    }

    const success = startGame();
    if (success) {
      navigation?.navigate('role-reveal');
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego');
    }
  };

  const getCategoryName = () => {
    if (!selectedCategory) return 'Aleatoria';
    return WORD_LIST[selectedCategory]?.name || 'Aleatoria';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎮 Sala de Juego</Text>
        <Text style={styles.subtitle}>Prepara tu grupo de jugadores</Text>
      </View>
      
      <View style={styles.addPlayerCard}>
        <Text style={styles.cardTitle}>➕ Agregar Jugador</Text>
        <View style={styles.addPlayerSection}>
          <TextInput
            style={styles.input}
            placeholder="Escribe el nombre del jugador..."
            placeholderTextColor="#999"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickAddButton} onPress={handleQuickAdd}>
              <Text style={styles.quickAddButtonText}>⚡ Aleatorio</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.playerListCard}>
        <Text style={styles.cardTitle}>
          👥 Jugadores ({players.length} / 8)
        </Text>
        <ScrollView style={styles.playerListContainer}>
          {players.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateText}>No hay jugadores aún</Text>
              <Text style={styles.emptyStateSubtext}>Agrega al menos 4 jugadores para comenzar</Text>
            </View>
          ) : (
            <InsiderPlayerList 
              players={players}
              onRemovePlayer={removePlayer}
            />
          )}
        </ScrollView>
      </View>

      <View style={styles.infoCard}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📊 Jugadores:</Text>
          <Text style={[
            styles.infoValue,
            players.length < 4 && styles.infoValueWarning,
            players.length >= 4 && players.length <= 8 && styles.infoValueSuccess
          ]}>
            {players.length} / 8
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>📁 Categoría:</Text>
          <Text style={styles.infoValue}>{getCategoryName()}</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[
            styles.progressFill,
            { width: `${(players.length / 8) * 100}%` }
          ]} />
        </View>
      </View>

      <TouchableOpacity 
        style={[
          styles.startButton, 
          (players.length < 4 || players.length > 8) && styles.startButtonDisabled
        ]} 
        onPress={handleStartGame}
        disabled={players.length < 4 || players.length > 8}
      >
        <Text style={styles.startButtonText}>
          {players.length < 4 
            ? `Necesitas ${4 - players.length} jugador${4 - players.length > 1 ? 'es' : ''} más`
            : '🚀 Comenzar Juego'
          }
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
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
  addPlayerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  addPlayerSection: {
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#f8f8f8',
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    fontSize: 16,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quickAddButton: {
    flex: 1,
    backgroundColor: '#FF9800',
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickAddButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  playerListCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flex: 1,
  },
  playerListContainer: {
    flex: 1,
    maxHeight: 300,
  },
  emptyState: {
    padding: 30,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#999',
    marginBottom: 5,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#bbb',
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  infoValueWarning: {
    color: '#f44336',
  },
  infoValueSuccess: {
    color: '#4CAF50',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 18,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0.1,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

