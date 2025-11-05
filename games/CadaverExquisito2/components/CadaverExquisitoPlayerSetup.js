import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useCadaverExquisitoStore } from '../store/cadaverExquisitoStore';
import { GAME_CONFIG } from '../constants/CadaverExquisitoGameConfig';

export const CadaverExquisitoPlayerSetup = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [maxRounds, setMaxRounds] = useState('');
  const [initialTheme, setInitialTheme] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showThemeSuggestions, setShowThemeSuggestions] = useState(false);
  
  const players = useCadaverExquisitoStore((state) => state.players);
  const addPlayer = useCadaverExquisitoStore((state) => state.addPlayer);
  const removePlayer = useCadaverExquisitoStore((state) => state.removePlayer);
  const setMaxRoundsAction = useCadaverExquisitoStore((state) => state.setMaxRounds);
  const setInitialThemeAction = useCadaverExquisitoStore((state) => state.setInitialTheme);
  const setTurnTimeLimit = useCadaverExquisitoStore((state) => state.setTurnTimeLimit);
  const startGame = useCadaverExquisitoStore((state) => state.startGame);
  const gameHistory = useCadaverExquisitoStore((state) => state.getGameHistory());

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (playerName.trim().length > 20) {
      Alert.alert('Error', 'El nombre no puede tener más de 20 caracteres');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${GAME_CONFIG.MAX_PLAYERS} jugadores`);
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleRemovePlayer = (playerId) => {
    if (players.length <= GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Atención',
        `Necesitas al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para jugar`
      );
      return;
    }
    removePlayer(playerId);
  };

  const handleSelectTheme = (theme) => {
    setInitialTheme(theme);
    setShowThemeSuggestions(false);
    setSelectedCategory(null);
  };

  const handleRandomTheme = () => {
    const allThemes = [
      ...Object.values(GAME_CONFIG.SUGGESTED_THEMES).flat(),
      ...GAME_CONFIG.RANDOM_THEMES,
    ];
    const randomTheme = allThemes[Math.floor(Math.random() * allThemes.length)];
    handleSelectTheme(randomTheme);
  };

  const handleRandomQuickStarter = () => {
    const randomStarter = GAME_CONFIG.QUICK_STARTERS[Math.floor(Math.random() * GAME_CONFIG.QUICK_STARTERS.length)];
    handleSelectTheme(randomStarter);
  };

  const getThemesByCategory = (category) => {
    return GAME_CONFIG.SUGGESTED_THEMES[category] || [];
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      fantasia: '🧙',
      comedia: '😄',
      misterio: '🔍',
      aventura: '⚔️',
      cienciaFiccion: '🚀',
    };
    return emojis[category] || '📝';
  };

  const getCategoryName = (category) => {
    const names = {
      fantasia: 'Fantasia',
      comedia: 'Comedia',
      misterio: 'Misterio',
      aventura: 'Aventura',
      cienciaFiccion: 'Ciencia Ficción',
    };
    return names[category] || category;
  };

  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar rondas máximas si se especificó
    if (maxRounds.trim() !== '') {
      const rounds = parseInt(maxRounds, 10);
      if (isNaN(rounds) || rounds < GAME_CONFIG.MIN_ROUNDS || rounds > GAME_CONFIG.MAX_ROUNDS_LIMIT) {
        Alert.alert(
          'Error',
          `El número de rondas debe estar entre ${GAME_CONFIG.MIN_ROUNDS} y ${GAME_CONFIG.MAX_ROUNDS_LIMIT}`
        );
        return;
      }
      setMaxRoundsAction(rounds);
    }
    
    // Configurar tema inicial si se especificó
    if (initialTheme.trim() !== '') {
      setInitialThemeAction(initialTheme.trim());
    }
    
    const success = startGame();
    if (success && onStartGame) {
      onStartGame();
    }
  };

  const suggestedThemesToShow = selectedCategory 
    ? getThemesByCategory(selectedCategory)
    : Object.values(GAME_CONFIG.SUGGESTED_THEMES).flat().slice(0, 5);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Cadáver Exquisito 2.0</Text>
        <Text style={styles.subtitle}>Crea historias increíbles juntos</Text>
        {gameHistory.length > 0 && (
          <Text style={styles.historyText}>
            {gameHistory.length} partida{gameHistory.length !== 1 ? 's' : ''} jugada{gameHistory.length !== 1 ? 's' : ''}
          </Text>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>
          👥 Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            maxLength={20}
          />
          <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        {players.length > 0 && (
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
                  onPress={() => handleRemovePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
        
        {players.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              Añade al menos {GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración de la Partida</Text>
        
        <Text style={styles.label}>Número máximo de rondas (opcional)</Text>
        <TextInput
          style={styles.input}
          placeholder={`Dejar vacío para ilimitado (máx. ${GAME_CONFIG.MAX_ROUNDS_LIMIT})`}
          value={maxRounds}
          onChangeText={setMaxRounds}
          keyboardType="numeric"
        />
        <Text style={styles.hint}>
          Cada jugador escribirá una frase por ronda. Si no especificas, el juego continuará hasta que lo finalices manualmente.
        </Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>✨ Tema Inicial (opcional)</Text>
        <Text style={styles.label}>Escribe un tema o selecciona uno sugerido</Text>
        
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ej: Un día, el Sol decidió tomarse unas vacaciones..."
          value={initialTheme}
          onChangeText={setInitialTheme}
          multiline
          numberOfLines={3}
        />
        
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={styles.quickButton} 
            onPress={handleRandomTheme}
          >
            <Text style={styles.quickButtonText}>🎲 Tema Aleatorio</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.quickButton} 
            onPress={handleRandomQuickStarter}
          >
            <Text style={styles.quickButtonText}>⚡ Inicio Rápido</Text>
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity 
          style={styles.toggleButton}
          onPress={() => {
            setShowThemeSuggestions(!showThemeSuggestions);
            setSelectedCategory(null);
          }}
        >
          <Text style={styles.toggleButtonText}>
            {showThemeSuggestions ? '▼' : '▶'} Ver Temas Sugeridos por Categoría
          </Text>
        </TouchableOpacity>
        
        {showThemeSuggestions && (
          <View style={styles.categoriesContainer}>
            <Text style={styles.categoriesTitle}>Categorías:</Text>
            <View style={styles.categoriesRow}>
              {Object.keys(GAME_CONFIG.SUGGESTED_THEMES).map((category) => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryButton,
                    selectedCategory === category && styles.categoryButtonActive
                  ]}
                  onPress={() => setSelectedCategory(
                    selectedCategory === category ? null : category
                  )}
                >
                  <Text style={styles.categoryButtonText}>
                    {getCategoryEmoji(category)} {getCategoryName(category)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            {selectedCategory && (
              <ScrollView style={styles.themesList} nestedScrollEnabled>
                {getThemesByCategory(selectedCategory).map((theme, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.themeItem}
                    onPress={() => handleSelectTheme(theme)}
                  >
                    <Text style={styles.themeItemText}>{theme}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}
            
            {!selectedCategory && (
              <View style={styles.themesHint}>
                <Text style={styles.themesHintText}>
                  Selecciona una categoría para ver temas sugeridos
                </Text>
              </View>
            )}
          </View>
        )}
      </View>
      
      <TouchableOpacity
        style={[
          styles.startButton,
          players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled
        ]}
        onPress={handleStartGame}
        disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
      >
        <Text style={styles.startButtonText}>
          {players.length < GAME_CONFIG.MIN_PLAYERS
            ? `Necesitas ${GAME_CONFIG.MIN_PLAYERS - players.length} jugador${GAME_CONFIG.MIN_PLAYERS - players.length !== 1 ? 'es' : ''} más`
            : '🚀 Comenzar Partida'}
        </Text>
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
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 4,
    color: '#666',
  },
  historyText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: 'white',
    marginRight: 8,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 8,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 50,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  playersList: {
    marginTop: 8,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
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
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  playerNumberText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  removeButton: {
    padding: 4,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    backgroundColor: '#ffebee',
  },
  removeButtonText: {
    color: '#f44336',
    fontSize: 18,
    fontWeight: 'bold',
  },
  emptyState: {
    padding: 16,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
    marginTop: 4,
    color: '#666',
  },
  hint: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
    fontStyle: 'italic',
  },
  quickActions: {
    flexDirection: 'row',
    marginTop: 8,
    marginBottom: 12,
    gap: 8,
  },
  quickButton: {
    flex: 1,
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  quickButtonText: {
    color: '#1976D2',
    fontSize: 13,
    fontWeight: '600',
  },
  toggleButton: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginTop: 8,
    marginBottom: 12,
  },
  toggleButtonText: {
    color: '#666',
    fontSize: 14,
    fontWeight: '500',
  },
  categoriesContainer: {
    marginTop: 8,
  },
  categoriesTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  categoryButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  categoryButtonActive: {
    backgroundColor: '#2196F3',
    borderColor: '#1976D2',
  },
  categoryButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  themesList: {
    maxHeight: 200,
    marginTop: 8,
  },
  themeItem: {
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4CAF50',
  },
  themeItemText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  themesHint: {
    padding: 16,
    alignItems: 'center',
  },
  themesHintText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  startButton: {
    backgroundColor: '#2196F3',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 24,
    shadowColor: '#2196F3',
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
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
