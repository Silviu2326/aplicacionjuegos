import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';
import { DICCIONARIO_FALSO_CONFIG } from '../constants/DiccionarioFalsoConfig';
import { DiccionarioFalsoPlayerList } from '../components/DiccionarioFalsoPlayerList';
import { getWordsStats } from '../constants/DiccionarioFalsoWords';

export const DiccionarioFalsoIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [maxRounds, setMaxRounds] = useState(DICCIONARIO_FALSO_CONFIG.DEFAULT_MAX_ROUNDS.toString());
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTips, setShowTips] = useState(false);
  
  const gameStatus = useDiccionarioFalsoStore((state) => state.gameStatus);
  const players = useDiccionarioFalsoStore((state) => state.players);
  const addPlayer = useDiccionarioFalsoStore((state) => state.addPlayer);
  const removePlayer = useDiccionarioFalsoStore((state) => state.removePlayer);
  const setMaxRoundsAction = useDiccionarioFalsoStore((state) => state.setMaxRounds);
  const startGame = useDiccionarioFalsoStore((state) => state.startGame);
  const currentPlayerId = useDiccionarioFalsoStore((state) => state.currentPlayerId);
  const setCurrentPlayer = useDiccionarioFalsoStore((state) => state.setCurrentPlayer);
  const hostPlayerId = useDiccionarioFalsoStore((state) => state.hostPlayerId);
  
  const wordsStats = getWordsStats();
  
  // Si estamos en lobby, navegar a la pantalla de juego
  useEffect(() => {
    if (gameStatus === 'lobby' && navigation) {
      setTimeout(() => {
        navigation.navigate('el-diccionario-falso-juego');
      }, 500);
    }
  }, [gameStatus, navigation]);
  
  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }
    
    if (players.length >= DICCIONARIO_FALSO_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${DICCIONARIO_FALSO_CONFIG.MAX_PLAYERS} jugadores`);
      return;
    }
    
    const result = addPlayer(playerName.trim());
    if (result && result.playerId) {
      // Si es el primer jugador, establecerlo como jugador actual
      if (players.length === 0 && !currentPlayerId) {
        setCurrentPlayer(result.playerId);
      }
      setPlayerName('');
    }
  };
  
  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };
  
  const handleStartGame = () => {
    if (players.length < DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar número de rondas
    const rounds = parseInt(maxRounds, 10);
    if (rounds >= DICCIONARIO_FALSO_CONFIG.MIN_ROUNDS && rounds <= DICCIONARIO_FALSO_CONFIG.MAX_ROUNDS) {
      setMaxRoundsAction(rounds);
    }
    
    const success = startGame();
    if (success) {
      // Navegar automáticamente a la primera ronda
      setTimeout(() => {
        if (navigation) {
          navigation.navigate('el-diccionario-falso-juego');
        }
      }, 500);
    }
  };
  
  const isHost = hostPlayerId === currentPlayerId;
  
  const tips = [
    "Haz que tu definición falsa suene académica y formal para que sea más creíble.",
    "Usa palabras técnicas o antiguas para darle más autenticidad a tu definición.",
    "Evita definiciones demasiado obvias o cómicas, son fáciles de detectar.",
    "Intenta que tu definición tenga una longitud similar a las definiciones reales.",
    "Observa cómo otros votan para aprender sus estrategias.",
    "Una buena definición falsa mezcla verdad y ficción de forma convincente.",
  ];
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📚 El Diccionario Falso</Text>
        <Text style={styles.subtitle}>Juego social de creatividad y palabras</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{wordsStats.total}</Text>
            <Text style={styles.statLabel}>Palabras</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{players.length}</Text>
            <Text style={styles.statLabel}>Jugadores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{maxRounds}</Text>
            <Text style={styles.statLabel}>Rondas</Text>
          </View>
        </View>
      </View>
      
      {/* Información del juego */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setShowInstructions(!showInstructions)}
        >
          <Text style={styles.sectionTitle}>📖 ¿Cómo se juega?</Text>
          <Text style={styles.toggleIcon}>{showInstructions ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {showInstructions && (
          <View style={styles.instructionsContent}>
            <Text style={styles.instructionText}>
              <Text style={styles.boldText}>1. Escribe definiciones falsas:</Text> En cada ronda verás una palabra poco conocida. Tu objetivo es inventar una definición falsa pero creíble.
            </Text>
            <Text style={styles.instructionText}>
              <Text style={styles.boldText}>2. Vota por la definición correcta:</Text> Todas las definiciones (reales y falsas) se mezclan. Debes identificar cuál es la verdadera.
            </Text>
            <Text style={styles.instructionText}>
              <Text style={styles.boldText}>3. Gana puntos:</Text> 
              {'\n'}• +2 puntos por votar correctamente
              {'\n'}• +1 punto por cada jugador que vote por tu definición falsa
            </Text>
            <Text style={styles.instructionText}>
              <Text style={styles.boldText}>4. Gana el juego:</Text> El jugador con más puntos al final de todas las rondas gana.
            </Text>
          </View>
        )}
      </View>
      
      {/* Consejos */}
      <View style={styles.section}>
        <TouchableOpacity 
          style={styles.sectionHeader}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.sectionTitle}>💡 Consejos para ganar</Text>
          <Text style={styles.toggleIcon}>{showTips ? '▼' : '▶'}</Text>
        </TouchableOpacity>
        {showTips && (
          <View style={styles.tipsContent}>
            {tips.map((tip, index) => (
              <View key={index} style={styles.tipItem}>
                <Text style={styles.tipBullet}>•</Text>
                <Text style={styles.tipText}>{tip}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length}/{DICCIONARIO_FALSO_CONFIG.MAX_PLAYERS})</Text>
        <Text style={styles.sectionHint}>
          Mínimo {DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS} jugadores
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPlayer}
          >
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
        
        <DiccionarioFalsoPlayerList
          currentPlayerId={currentPlayerId}
          showSubmissionStatus={false}
        />
      </View>
      
      {isHost && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          <View style={styles.configRow}>
            <Text style={styles.configLabel}>Número de rondas:</Text>
            <TextInput
              style={styles.roundsInput}
              value={maxRounds}
              onChangeText={setMaxRounds}
              keyboardType="numeric"
              maxLength={2}
            />
          </View>
          <Text style={styles.configHint}>
            Entre {DICCIONARIO_FALSO_CONFIG.MIN_ROUNDS} y {DICCIONARIO_FALSO_CONFIG.MAX_ROUNDS} rondas
          </Text>
        </View>
      )}
      
      {isHost && (
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>Iniciar Partida</Text>
        </TouchableOpacity>
      )}
      
      {!isHost && players.length >= DICCIONARIO_FALSO_CONFIG.MIN_PLAYERS && (
        <View style={styles.waitingContainer}>
          <Text style={styles.waitingText}>
            ⏳ Esperando a que el anfitrión inicie la partida...
          </Text>
        </View>
      )}
      
      {/* Información adicional */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Información del juego</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Palabras disponibles:</Text>
            <Text style={styles.infoValue}>{wordsStats.total}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Longitud promedio:</Text>
            <Text style={styles.infoValue}>{wordsStats.averageLength} letras</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Palabra más larga:</Text>
            <Text style={styles.infoValue}>{wordsStats.longestWord.palabra}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Palabra más corta:</Text>
            <Text style={styles.infoValue}>{wordsStats.shortestWord.palabra}</Text>
          </View>
        </View>
        <View style={styles.pointsInfo}>
          <Text style={styles.pointsTitle}>Sistema de puntuación:</Text>
          <View style={styles.pointsRow}>
            <Text style={styles.pointsItem}>✓ Votar correctamente: +2 puntos</Text>
          </View>
          <View style={styles.pointsRow}>
            <Text style={styles.pointsItem}>✓ Cada voto a tu definición: +1 punto</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          ¡Diviértete creando definiciones creativas y engañando a tus amigos! 🎭
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2196f3',
    padding: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sectionHint: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  configRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 12,
  },
  roundsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 8,
    fontSize: 16,
    width: 60,
    textAlign: 'center',
  },
  configHint: {
    fontSize: 12,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#4caf50',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  waitingContainer: {
    backgroundColor: '#fff3cd',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  waitingText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  toggleIcon: {
    fontSize: 16,
    color: '#666',
  },
  instructionsContent: {
    marginTop: 12,
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
    marginBottom: 12,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#333',
  },
  tipsContent: {
    marginTop: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  tipBullet: {
    fontSize: 16,
    color: '#2196f3',
    marginRight: 8,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  infoGrid: {
    marginTop: 12,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196f3',
  },
  pointsInfo: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  pointsRow: {
    marginBottom: 8,
  },
  pointsItem: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  footer: {
    backgroundColor: '#e3f2fd',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  footerText: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
