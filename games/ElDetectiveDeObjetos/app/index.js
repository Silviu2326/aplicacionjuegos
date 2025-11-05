import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';
import { DETECTIVE_OBJETOS_CONFIG, OBJECT_EXAMPLES, DETECTIVE_TIPS } from '../constants/detectiveObjetosConfig';
import { DetectiveObjetosPlayerList } from '../components/DetectiveObjetosPlayerList';

export const DetectiveObjetosIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [maxRounds, setMaxRounds] = useState(DETECTIVE_OBJETOS_CONFIG.DEFAULT_MAX_ROUNDS.toString());
  const [showInstructions, setShowInstructions] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  const players = useDetectiveObjetosStore((state) => state.players);
  const addPlayer = useDetectiveObjetosStore((state) => state.addPlayer);
  const removePlayer = useDetectiveObjetosStore((state) => state.removePlayer);
  const setMaxRoundsAction = useDetectiveObjetosStore((state) => state.setMaxRounds);
  const startGame = useDetectiveObjetosStore((state) => state.startGame);
  const resetGame = useDetectiveObjetosStore((state) => state.resetGame);
  
  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }
    
    if (players.length >= DETECTIVE_OBJETOS_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${DETECTIVE_OBJETOS_CONFIG.MAX_PLAYERS} jugadores`);
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };
  
  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };
  
  const handleStartGame = () => {
    if (players.length < DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar número de rondas
    const rounds = parseInt(maxRounds, 10);
    if (rounds >= DETECTIVE_OBJETOS_CONFIG.MIN_ROUNDS && rounds <= DETECTIVE_OBJETOS_CONFIG.MAX_ROUNDS) {
      setMaxRoundsAction(rounds);
    }
    
    const success = startGame();
    if (success && navigation) {
      navigation.navigate('detective-objetos-setup');
    }
  };

  const handleReset = () => {
    Alert.alert(
      'Reiniciar juego',
      '¿Estás seguro de que quieres reiniciar? Se perderán todos los datos.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          style: 'destructive',
          onPress: () => {
            resetGame();
            setPlayerName('');
            setMaxRounds(DETECTIVE_OBJETOS_CONFIG.DEFAULT_MAX_ROUNDS.toString());
          },
        },
      ]
    );
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔍 El Detective de Objetos</Text>
        <Text style={styles.subtitle}>Adivina el objeto a partir de una foto macro</Text>
      </View>

      {/* Botones de información */}
      <View style={styles.infoButtons}>
        <TouchableOpacity
          style={[styles.infoButton, showInstructions && styles.infoButtonActive]}
          onPress={() => setShowInstructions(!showInstructions)}
        >
          <Text style={styles.infoButtonText}>📖 Instrucciones</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoButton, showTips && styles.infoButtonActive]}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.infoButtonText}>💡 Consejos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.infoButton, showExamples && styles.infoButtonActive]}
          onPress={() => setShowExamples(!showExamples)}
        >
          <Text style={styles.infoButtonText}>🎯 Ejemplos</Text>
        </TouchableOpacity>
      </View>

      {/* Instrucciones */}
      {showInstructions && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Cómo Jugar</Text>
          <View style={styles.instructionsList}>
            <Text style={styles.instructionItem}>
              <Text style={styles.bold}>1.</Text> El fotógrafo toma una foto muy de cerca (macro) de un objeto común.
            </Text>
            <Text style={styles.instructionItem}>
              <Text style={styles.bold}>2.</Text> La imagen se muestra con máximo zoom (muy abstracta).
            </Text>
            <Text style={styles.instructionItem}>
              <Text style={styles.bold}>3.</Text> Los detectives intentan adivinar el objeto por turnos.
            </Text>
            <Text style={styles.instructionItem}>
              <Text style={styles.bold}>4.</Text> Si un detective falla, la imagen se acerca un poco más (zoom out).
            </Text>
            <Text style={styles.instructionItem}>
              <Text style={styles.bold}>5.</Text> Si alguien acierta, gana un punto. Si nadie acierta antes de que la imagen se revele completamente, el fotógrafo gana.
            </Text>
            <Text style={styles.instructionItem}>
              <Text style={styles.bold}>6.</Text> El jugador con más puntos al final gana.
            </Text>
          </View>
        </View>
      )}

      {/* Consejos */}
      {showTips && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>💡 Consejos para Detectives</Text>
          {DETECTIVE_TIPS.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Ejemplos de objetos */}
      {showExamples && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🎯 Ejemplos de Objetos</Text>
          <Text style={styles.examplesHint}>
            Estos son algunos objetos que puedes usar para tomar fotos:
          </Text>
          {OBJECT_EXAMPLES.map((category, index) => (
            <View key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              <View style={styles.examplesGrid}>
                {category.examples.map((example, exIndex) => (
                  <View key={exIndex} style={styles.exampleTag}>
                    <Text style={styles.exampleText}>{example}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length}/{DETECTIVE_OBJETOS_CONFIG.MAX_PLAYERS})</Text>
        <Text style={styles.sectionHint}>
          Mínimo {DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS} jugadores
        </Text>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
          />
          <TouchableOpacity
            style={styles.addButton}
            onPress={handleAddPlayer}
          >
            <Text style={styles.addButtonText}>Agregar</Text>
          </TouchableOpacity>
        </View>
        
        {players.length > 0 && (
          <DetectiveObjetosPlayerList />
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
        
        <View style={styles.configRow}>
          <Text style={styles.configLabel}>Número de rondas</Text>
          <TextInput
            style={styles.configInput}
            value={maxRounds}
            onChangeText={setMaxRounds}
            keyboardType="numeric"
            placeholder={DETECTIVE_OBJETOS_CONFIG.DEFAULT_MAX_ROUNDS.toString()}
          />
        </View>
        <Text style={styles.configHint}>
          Mínimo {DETECTIVE_OBJETOS_CONFIG.MIN_ROUNDS}, máximo {DETECTIVE_OBJETOS_CONFIG.MAX_ROUNDS} rondas
        </Text>
      </View>

      {/* Estadísticas rápidas */}
      {players.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📊 Resumen</Text>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{players.length}</Text>
              <Text style={styles.summaryLabel}>Jugadores</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>{maxRounds}</Text>
              <Text style={styles.summaryLabel}>Rondas</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryValue}>
                {players.reduce((sum, p) => sum + (p.score || 0), 0)}
              </Text>
              <Text style={styles.summaryLabel}>Puntos totales</Text>
            </View>
          </View>
        </View>
      )}
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>
            {players.length < DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS
              ? `Necesitas ${DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS - players.length} jugador${DETECTIVE_OBJETOS_CONFIG.MIN_PLAYERS - players.length > 1 ? 'es' : ''} más`
              : '🚀 Comenzar Juego'}
          </Text>
        </TouchableOpacity>

        {players.length > 0 && (
          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleReset}
          >
            <Text style={styles.resetButtonText}>🔄 Reiniciar Juego</Text>
          </TouchableOpacity>
        )}
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
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196f3',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  sectionHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#fff',
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
    fontWeight: 'bold',
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  configInput: {
    width: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  startButton: {
    backgroundColor: '#2196f3',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  infoButtons: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  infoButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoButtonActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  infoButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  instructionsList: {
    gap: 10,
  },
  instructionItem: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
    marginBottom: 8,
  },
  bold: {
    fontWeight: 'bold',
    color: '#2196f3',
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 18,
    color: '#2196f3',
    marginRight: 10,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
  examplesHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  categoryContainer: {
    marginBottom: 20,
  },
  categoryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 10,
  },
  examplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  exampleTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  exampleText: {
    fontSize: 13,
    color: '#1976d2',
  },
  configHint: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
    fontStyle: 'italic',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196f3',
  },
  summaryLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  actionsContainer: {
    padding: 20,
    gap: 15,
  },
  resetButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetectiveObjetosIndex;

