import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDosVerdadesUnaMentiraStore } from '../store/dosVerdadesUnaMentiraStore';
import { GAME_CONFIG } from '../constants/DosVerdadesUnaMentiraGameConfig';
import { DosVerdadesUnaMentiraPlayerHUD } from '../components/DosVerdadesUnaMentiraPlayerHUD';

export const DosVerdadesUnaMentiraIndex = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const [debateTime, setDebateTime] = useState(GAME_CONFIG.DEFAULT_DEBATE_TIME.toString());
  const [votingTime, setVotingTime] = useState(GAME_CONFIG.DEFAULT_VOTING_TIME.toString());
  const [pointsCorrect, setPointsCorrect] = useState(GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS.toString());
  const [pointsFooling, setPointsFooling] = useState(GAME_CONFIG.DEFAULT_POINTS_FOR_FOOLING.toString());
  const [showInstructions, setShowInstructions] = useState(false);
  
  const players = useDosVerdadesUnaMentiraStore((state) => state.players);
  const addPlayer = useDosVerdadesUnaMentiraStore((state) => state.addPlayer);
  const removePlayer = useDosVerdadesUnaMentiraStore((state) => state.removePlayer);
  const setDebateTimeAction = useDosVerdadesUnaMentiraStore((state) => state.setDebateTime);
  const setVotingTimeAction = useDosVerdadesUnaMentiraStore((state) => state.setVotingTime);
  const setPointsForCorrectGuess = useDosVerdadesUnaMentiraStore((state) => state.setPointsForCorrectGuess);
  const setPointsForFooling = useDosVerdadesUnaMentiraStore((state) => state.setPointsForFooling);
  const startGame = useDosVerdadesUnaMentiraStore((state) => state.startGame);

  const handleAddPlayer = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }
    
    if (players.some(p => p.name.toLowerCase() === playerName.trim().toLowerCase())) {
      Alert.alert('Error', 'Este nombre ya está en uso');
      return;
    }
    
    if (players.length >= GAME_CONFIG.MAX_PLAYERS) {
      Alert.alert('Error', `Máximo ${GAME_CONFIG.MAX_PLAYERS} jugadores`);
      return;
    }
    
    addPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleRemovePlayer = (playerId) => {
    removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (players.length < GAME_CONFIG.MIN_PLAYERS) {
      Alert.alert(
        'Jugadores insuficientes',
        `Se necesitan al menos ${GAME_CONFIG.MIN_PLAYERS} jugadores para comenzar`
      );
      return;
    }
    
    // Configurar tiempos
    const debate = parseInt(debateTime, 10);
    if (debate >= GAME_CONFIG.MIN_DEBATE_TIME && debate <= GAME_CONFIG.MAX_DEBATE_TIME) {
      setDebateTimeAction(debate);
    } else {
      Alert.alert('Error', `El tiempo de debate debe estar entre ${GAME_CONFIG.MIN_DEBATE_TIME} y ${GAME_CONFIG.MAX_DEBATE_TIME} segundos`);
      return;
    }
    
    const voting = parseInt(votingTime, 10);
    if (voting >= GAME_CONFIG.MIN_VOTING_TIME && voting <= GAME_CONFIG.MAX_VOTING_TIME) {
      setVotingTimeAction(voting);
    } else {
      Alert.alert('Error', `El tiempo de votación debe estar entre ${GAME_CONFIG.MIN_VOTING_TIME} y ${GAME_CONFIG.MAX_VOTING_TIME} segundos`);
      return;
    }
    
    // Configurar puntos
    const ptsCorrect = parseInt(pointsCorrect, 10);
    if (ptsCorrect >= 1 && ptsCorrect <= 10) {
      setPointsForCorrectGuess(ptsCorrect);
    }
    
    const ptsFooling = parseInt(pointsFooling, 10);
    if (ptsFooling >= 1 && ptsFooling <= 10) {
      setPointsForFooling(ptsFooling);
    }
    
    const success = startGame();
    if (success && navigation && navigation.navigate) {
      navigation.navigate('dos-verdades-una-mentira-juego');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Dos Verdades, Una Mentira</Text>
        <Text style={styles.subtitle}>Un juego social para conocerse mejor</Text>
        <TouchableOpacity
          style={styles.instructionsButton}
          onPress={() => setShowInstructions(!showInstructions)}
        >
          <Text style={styles.instructionsButtonText}>
            {showInstructions ? '📖 Ocultar instrucciones' : '📖 Ver instrucciones'}
          </Text>
        </TouchableOpacity>
      </View>
      
      {showInstructions && (
        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>📋 Cómo jugar:</Text>
          <Text style={styles.instructionsText}>
            • Cada jugador toma turnos como "narrador"{'\n'}
            • El narrador presenta 3 afirmaciones: 2 verdades y 1 mentira{'\n'}
            • Los demás jugadores discuten y hacen preguntas durante el debate{'\n'}
            • Después del debate, todos votan cuál creen que es la mentira{'\n'}
            • El narrador gana puntos por cada jugador que no adivine{'\n'}
            • Los jugadores ganan puntos si adivinan correctamente{'\n'}
            • El juego continúa hasta que todos hayan sido narradores{'\n'}
            • ¡Gana quien tenga más puntos al final!
          </Text>
        </View>
      )}
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})</Text>
        <Text style={styles.sectionHint}>
          Mínimo {GAME_CONFIG.MIN_PLAYERS} jugadores
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
          <DosVerdadesUnaMentiraPlayerHUD 
            players={players}
            narratorId={null}
          />
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración del Juego</Text>
        
        <View style={styles.configRow}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.configLabel}>Tiempo de debate</Text>
            <Text style={styles.configHint}>
              {GAME_CONFIG.MIN_DEBATE_TIME}-{GAME_CONFIG.MAX_DEBATE_TIME} segundos
            </Text>
          </View>
          <TextInput
            style={styles.configInput}
            value={debateTime}
            onChangeText={setDebateTime}
            keyboardType="numeric"
            placeholder={GAME_CONFIG.DEFAULT_DEBATE_TIME.toString()}
          />
        </View>
        
        <View style={styles.configRow}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.configLabel}>Tiempo de votación</Text>
            <Text style={styles.configHint}>
              {GAME_CONFIG.MIN_VOTING_TIME}-{GAME_CONFIG.MAX_VOTING_TIME} segundos
            </Text>
          </View>
          <TextInput
            style={styles.configInput}
            value={votingTime}
            onChangeText={setVotingTime}
            keyboardType="numeric"
            placeholder={GAME_CONFIG.DEFAULT_VOTING_TIME.toString()}
          />
        </View>
        
        <View style={styles.configRow}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.configLabel}>Puntos por adivinar</Text>
            <Text style={styles.configHint}>Puntos por adivinar correctamente</Text>
          </View>
          <TextInput
            style={styles.configInput}
            value={pointsCorrect}
            onChangeText={setPointsCorrect}
            keyboardType="numeric"
            placeholder={GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS.toString()}
          />
        </View>
        
        <View style={styles.configRow}>
          <View style={styles.configLabelContainer}>
            <Text style={styles.configLabel}>Puntos por engañar</Text>
            <Text style={styles.configHint}>Puntos por cada jugador engañado</Text>
          </View>
          <TextInput
            style={styles.configInput}
            value={pointsFooling}
            onChangeText={setPointsFooling}
            keyboardType="numeric"
            placeholder={GAME_CONFIG.DEFAULT_POINTS_FOR_FOOLING.toString()}
          />
        </View>
      </View>
      
      <TouchableOpacity
        style={[
          styles.startButton,
          players.length < GAME_CONFIG.MIN_PLAYERS && styles.startButtonDisabled,
        ]}
        onPress={handleStartGame}
        disabled={players.length < GAME_CONFIG.MIN_PLAYERS}
      >
        <Text style={styles.startButtonText}>
          {players.length < GAME_CONFIG.MIN_PLAYERS
            ? `Necesitas ${GAME_CONFIG.MIN_PLAYERS - players.length} jugador${GAME_CONFIG.MIN_PLAYERS - players.length > 1 ? 'es' : ''} más`
            : 'Comenzar Juego'}
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
  header: {
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
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
    marginTop: 5,
    marginBottom: 15,
  },
  instructionsButton: {
    backgroundColor: '#2196f3',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  instructionsButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  instructionsContainer: {
    backgroundColor: '#e3f2fd',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
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
    backgroundColor: '#4caf50',
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
  configLabelContainer: {
    flex: 1,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
    marginBottom: 4,
  },
  configHint: {
    fontSize: 12,
    color: '#999',
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
    backgroundColor: '#4caf50',
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
});
