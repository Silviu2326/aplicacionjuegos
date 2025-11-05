import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useMaestroCitasStore } from '../store/maestroCitasStore';
import { CATEGORIES } from '../constants/MaestroCitasData';

export const MaestroDeLasCitasHome = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [numPlayers, setNumPlayers] = useState(1);
  const [playerNames, setPlayerNames] = useState(['']);
  
  const gameMode = useMaestroCitasStore((state) => state.gameMode);
  const numRounds = useMaestroCitasStore((state) => state.numRounds);
  const timePerQuestion = useMaestroCitasStore((state) => state.timePerQuestion);
  const selectedCategories = useMaestroCitasStore((state) => state.selectedCategories);
  
  const setGameMode = useMaestroCitasStore((state) => state.setGameMode);
  const setNumRounds = useMaestroCitasStore((state) => state.setNumRounds);
  const setTimePerQuestion = useMaestroCitasStore((state) => state.setTimePerQuestion);
  const setSelectedCategories = useMaestroCitasStore((state) => state.setSelectedCategories);
  const addPlayer = useMaestroCitasStore((state) => state.addPlayer);
  const resetGame = useMaestroCitasStore((state) => state.resetGame);
  const startGame = useMaestroCitasStore((state) => state.startGame);
  const setCurrentPlayer = useMaestroCitasStore((state) => state.setCurrentPlayer);
  
  const handleModeChange = (mode) => {
    setGameMode(mode);
    if (mode === 'single') {
      setNumPlayers(1);
      setPlayerNames(['']);
    } else {
      setNumPlayers(2);
      setPlayerNames(['', '']);
    }
  };
  
  const handleNumPlayersChange = (num) => {
    const newNum = parseInt(num) || 1;
    if (newNum >= 1 && newNum <= 8) {
      setNumPlayers(newNum);
      const newNames = Array(newNum).fill('').map((_, i) => playerNames[i] || '');
      setPlayerNames(newNames);
    }
  };
  
  const handlePlayerNameChange = (index, name) => {
    const newNames = [...playerNames];
    newNames[index] = name;
    setPlayerNames(newNames);
  };
  
  const toggleCategory = (category) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
  };
  
  const handleStartGame = () => {
    // Resetear juego anterior
    resetGame();
    
    // Validar y agregar jugadores
    if (gameMode === 'single') {
      const name = playerName.trim() || 'Jugador';
      const playerId = addPlayer(name);
      setCurrentPlayer(playerId);
    } else {
      // Modo multijugador
      if (playerNames.some(name => name.trim() === '')) {
        Alert.alert('Error', 'Por favor, ingresa un nombre para todos los jugadores');
        return;
      }
      
      playerNames.forEach((name, index) => {
        const playerId = addPlayer(name.trim() || `Jugador ${index + 1}`);
        if (index === 0) {
          setCurrentPlayer(playerId);
        }
      });
    }
    
    // Iniciar juego
    if (startGame()) {
      navigation.navigate('maestro-citas-game');
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego');
    }
  };
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>📚 Maestro de las Citas</Text>
          <View style={styles.titleUnderline} />
        </View>
        <Text style={styles.subtitle}>Pon a prueba tu conocimiento de citas famosas</Text>
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>
            💡 Adivina quién dijo cada cita famosa. Selecciona la respuesta correcta antes de que se acabe el tiempo.
          </Text>
        </View>
      </View>
      
      {/* Modo de juego */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Modo de Juego</Text>
        <View style={styles.modeButtons}>
          <TouchableOpacity
            style={[styles.modeButton, gameMode === 'single' && styles.modeButtonActive]}
            onPress={() => handleModeChange('single')}
          >
            <Text style={[styles.modeButtonText, gameMode === 'single' && styles.modeButtonTextActive]}>
              Un Jugador
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.modeButton, gameMode === 'multiplayer' && styles.modeButtonActive]}
            onPress={() => handleModeChange('multiplayer')}
          >
            <Text style={[styles.modeButtonText, gameMode === 'multiplayer' && styles.modeButtonTextActive]}>
              Multijugador
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Configuración de jugadores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          {gameMode === 'single' ? 'Tu Nombre' : 'Jugadores'}
        </Text>
        
        {gameMode === 'single' ? (
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu nombre"
            value={playerName}
            onChangeText={setPlayerName}
          />
        ) : (
          <>
            <View style={styles.numPlayersContainer}>
              <Text style={styles.label}>Número de jugadores:</Text>
              <TextInput
                style={styles.numPlayersInput}
                keyboardType="numeric"
                value={numPlayers.toString()}
                onChangeText={handleNumPlayersChange}
                placeholder="2"
              />
            </View>
            {playerNames.map((name, index) => (
              <TextInput
                key={index}
                style={styles.input}
                placeholder={`Jugador ${index + 1}`}
                value={name}
                onChangeText={(text) => handlePlayerNameChange(index, text)}
              />
            ))}
          </>
        )}
      </View>
      
      {/* Configuración de rondas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Número de Rondas</Text>
        <View style={styles.roundsContainer}>
          {[10, 20, 30].map((rounds) => (
            <TouchableOpacity
              key={rounds}
              style={[styles.roundButton, numRounds === rounds && styles.roundButtonActive]}
              onPress={() => setNumRounds(rounds)}
            >
              <Text style={[styles.roundButtonText, numRounds === rounds && styles.roundButtonTextActive]}>
                {rounds}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Configuración de tiempo */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tiempo por Pregunta</Text>
        <View style={styles.timeContainer}>
          {[15, 30, 45, 60].map((time) => (
            <TouchableOpacity
              key={time}
              style={[styles.timeButton, timePerQuestion === time && styles.timeButtonActive]}
              onPress={() => setTimePerQuestion(time)}
            >
              <Text style={[styles.timeButtonText, timePerQuestion === time && styles.timeButtonTextActive]}>
                {time}s
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      {/* Categorías */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎯 Categorías (Opcional)</Text>
        <Text style={styles.sectionSubtitle}>Selecciona categorías específicas o déjalo vacío para jugar con todas</Text>
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((category) => {
            const getCategoryIcon = () => {
              const icons = {
                'Cine': '🎬',
                'Literatura': '📖',
                'Filosofía': '🤔',
                'Historia': '📜',
                'Ciencia': '🔬',
                'Música': '🎵',
                'Arte': '🎨',
              };
              return icons[category] || '📚';
            };
            
            return (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategories.includes(category) && styles.categoryButtonActive
                ]}
                onPress={() => toggleCategory(category)}
              >
                <Text style={styles.categoryIcon}>{getCategoryIcon()}</Text>
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategories.includes(category) && styles.categoryButtonTextActive
                ]}>
                  {category}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        {selectedCategories.length > 0 && (
          <View style={styles.selectedCategoriesInfo}>
            <Text style={styles.selectedCategoriesText}>
              {selectedCategories.length} categoría{selectedCategories.length > 1 ? 's' : ''} seleccionada{selectedCategories.length > 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>
      
      {/* Resumen de configuración */}
      <View style={styles.summarySection}>
        <Text style={styles.summaryTitle}>📋 Resumen de Configuración</Text>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Rondas:</Text>
          <Text style={styles.summaryValue}>{numRounds}</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tiempo por pregunta:</Text>
          <Text style={styles.summaryValue}>{timePerQuestion}s</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Categorías:</Text>
          <Text style={styles.summaryValue}>
            {selectedCategories.length === 0 ? 'Todas' : selectedCategories.length}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Jugadores:</Text>
          <Text style={styles.summaryValue}>
            {gameMode === 'single' ? '1' : numPlayers}
          </Text>
        </View>
      </View>
      
      {/* Botón de inicio */}
      <TouchableOpacity style={styles.startButton} onPress={handleStartGame}>
        <Text style={styles.startButtonText}>🚀 Iniciar Partida</Text>
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
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 20,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleUnderline: {
    width: 80,
    height: 4,
    backgroundColor: '#2196f3',
    borderRadius: 2,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    borderRadius: 12,
    padding: 15,
    marginTop: 10,
    width: '100%',
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  infoText: {
    fontSize: 14,
    color: '#1565c0',
    lineHeight: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 25,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  modeButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  modeButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#2196f3',
  },
  modeButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  modeButtonTextActive: {
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  numPlayersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 10,
  },
  numPlayersInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    width: 80,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  roundsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  roundButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  roundButtonActive: {
    backgroundColor: '#4caf50',
  },
  roundButtonText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  roundButtonTextActive: {
    color: '#ffffff',
  },
  timeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeButton: {
    flex: 1,
    minWidth: '22%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
  },
  timeButtonActive: {
    backgroundColor: '#ff9800',
  },
  timeButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  timeButtonTextActive: {
    color: '#ffffff',
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
    marginBottom: 10,
    minWidth: '48%',
  },
  categoryButtonActive: {
    backgroundColor: '#2196f3',
    borderColor: '#2196f3',
    shadowColor: '#2196f3',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  categoryIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  selectedCategoriesInfo: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8f5e9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  selectedCategoriesText: {
    fontSize: 12,
    color: '#2e7d32',
    fontWeight: '600',
    textAlign: 'center',
  },
  summarySection: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#2196f3',
    fontWeight: '700',
  },
  startButton: {
    backgroundColor: '#4caf50',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  startButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

