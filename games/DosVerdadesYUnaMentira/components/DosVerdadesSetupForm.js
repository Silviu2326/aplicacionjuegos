import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useDosVerdadesStore } from '../store/dosVerdadesStore';
import { GAME_CONFIG } from '../constants/dosVerdadesStatements';
import { DosVerdadesPlayerHUD } from './DosVerdadesPlayerHUD';

export const DosVerdadesSetupForm = ({ onStartGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [debateTime, setDebateTime] = useState(GAME_CONFIG.DEFAULT_DEBATE_TIME.toString());
  const [votingTime, setVotingTime] = useState(GAME_CONFIG.DEFAULT_VOTING_TIME.toString());
  const [pointsForCorrect, setPointsForCorrect] = useState(GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS.toString());
  const [pointsForFooling, setPointsForFooling] = useState(GAME_CONFIG.DEFAULT_POINTS_FOR_FOOLING.toString());
  const [maxRounds, setMaxRounds] = useState('');
  
  const players = useDosVerdadesStore((state) => state.players);
  const addPlayer = useDosVerdadesStore((state) => state.addPlayer);
  const removePlayer = useDosVerdadesStore((state) => state.removePlayer);
  const setDebateTimeAction = useDosVerdadesStore((state) => state.setDebateTime);
  const setVotingTimeAction = useDosVerdadesStore((state) => state.setVotingTime);
  const setPointsForCorrectGuess = useDosVerdadesStore((state) => state.setPointsForCorrectGuess);
  const setPointsForFoolingAction = useDosVerdadesStore((state) => state.setPointsForFooling);
  const setMaxRoundsAction = useDosVerdadesStore((state) => state.setMaxRounds);
  const startGame = useDosVerdadesStore((state) => state.startGame);

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
      Alert.alert('Tiempo inválido', `El tiempo de debate debe estar entre ${GAME_CONFIG.MIN_DEBATE_TIME} y ${GAME_CONFIG.MAX_DEBATE_TIME} segundos`);
      return;
    }
    
    const voting = parseInt(votingTime, 10);
    if (voting >= GAME_CONFIG.MIN_VOTING_TIME && voting <= GAME_CONFIG.MAX_VOTING_TIME) {
      setVotingTimeAction(voting);
    } else {
      Alert.alert('Tiempo inválido', `El tiempo de votación debe estar entre ${GAME_CONFIG.MIN_VOTING_TIME} y ${GAME_CONFIG.MAX_VOTING_TIME} segundos`);
      return;
    }
    
    // Configurar puntos
    const pointsCorrect = parseInt(pointsForCorrect, 10);
    if (pointsCorrect >= 1) {
      setPointsForCorrectGuess(pointsCorrect);
    }
    
    const pointsFool = parseInt(pointsForFooling, 10);
    if (pointsFool >= 1) {
      setPointsForFoolingAction(pointsFool);
    }
    
    // Configurar rondas máximas
    if (maxRounds.trim() !== '') {
      const rounds = parseInt(maxRounds, 10);
      if (rounds >= 1) {
        setMaxRoundsAction(rounds);
      }
    } else {
      setMaxRoundsAction(null); // Rondas ilimitadas
    }
    
    const success = startGame();
    if (success && onStartGame) {
      onStartGame();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Dos Verdades y Una Mentira</Text>
        <Text style={styles.subtitle}>Un juego social para conocerse mejor</Text>
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionText}>
            📖 Cada jugador presenta tres afirmaciones sobre sí mismo: dos verdades y una mentira. 
            Los demás deben descubrir cuál es la mentira mediante preguntas y votación.
          </Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>👥 Jugadores ({players.length}/{GAME_CONFIG.MAX_PLAYERS})</Text>
          {players.length < GAME_CONFIG.MIN_PLAYERS && (
            <Text style={styles.warningText}>
              ⚠️ Mínimo {GAME_CONFIG.MIN_PLAYERS} jugadores
            </Text>
          )}
        </View>
        
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Nombre del jugador"
            value={playerName}
            onChangeText={setPlayerName}
            onSubmitEditing={handleAddPlayer}
            returnKeyType="done"
            maxLength={20}
          />
          <TouchableOpacity
            style={[styles.addButton, playerName.trim() === '' && styles.addButtonDisabled]}
            onPress={handleAddPlayer}
            disabled={playerName.trim() === ''}
          >
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        
        {players.length > 0 && (
          <DosVerdadesPlayerHUD 
            players={players}
            narratorId={null}
          />
        )}
        
        {players.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              💡 Agrega jugadores para comenzar
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>⚙️ Configuración del Juego</Text>
        
        <View style={styles.configGroup}>
          <Text style={styles.configGroupTitle}>⏱️ Temporizadores</Text>
          
          <View style={styles.configRow}>
            <View style={styles.configLabelContainer}>
              <Text style={styles.configLabel}>Tiempo de debate</Text>
              <Text style={styles.configHint}>
                ({GAME_CONFIG.MIN_DEBATE_TIME}-{GAME_CONFIG.MAX_DEBATE_TIME}s)
              </Text>
            </View>
            <TextInput
              style={styles.configInput}
              value={debateTime}
              onChangeText={setDebateTime}
              keyboardType="numeric"
              placeholder={GAME_CONFIG.DEFAULT_DEBATE_TIME.toString()}
            />
            <Text style={styles.configUnit}>seg</Text>
          </View>
          
          <View style={styles.configRow}>
            <View style={styles.configLabelContainer}>
              <Text style={styles.configLabel}>Tiempo de votación</Text>
              <Text style={styles.configHint}>
                ({GAME_CONFIG.MIN_VOTING_TIME}-{GAME_CONFIG.MAX_VOTING_TIME}s)
              </Text>
            </View>
            <TextInput
              style={styles.configInput}
              value={votingTime}
              onChangeText={setVotingTime}
              keyboardType="numeric"
              placeholder={GAME_CONFIG.DEFAULT_VOTING_TIME.toString()}
            />
            <Text style={styles.configUnit}>seg</Text>
          </View>
        </View>
        
        <View style={styles.configGroup}>
          <Text style={styles.configGroupTitle}>🏆 Sistema de Puntos</Text>
          
          <View style={styles.configRow}>
            <View style={styles.configLabelContainer}>
              <Text style={styles.configLabel}>Puntos por adivinar</Text>
              <Text style={styles.configHint}>Cuando detectas la mentira</Text>
            </View>
            <TextInput
              style={styles.configInput}
              value={pointsForCorrect}
              onChangeText={setPointsForCorrect}
              keyboardType="numeric"
              placeholder={GAME_CONFIG.DEFAULT_POINTS_FOR_CORRECT_GUESS.toString()}
            />
          </View>
          
          <View style={styles.configRow}>
            <View style={styles.configLabelContainer}>
              <Text style={styles.configLabel}>Puntos por engañar</Text>
              <Text style={styles.configHint}>Por cada jugador que no adivine</Text>
            </View>
            <TextInput
              style={styles.configInput}
              value={pointsForFooling}
              onChangeText={setPointsForFooling}
              keyboardType="numeric"
              placeholder={GAME_CONFIG.DEFAULT_POINTS_FOR_FOOLING.toString()}
            />
          </View>
        </View>
        
        <View style={styles.configGroup}>
          <Text style={styles.configGroupTitle}>🔄 Rondas</Text>
          
          <View style={styles.configRow}>
            <View style={styles.configLabelContainer}>
              <Text style={styles.configLabel}>Rondas máximas</Text>
              <Text style={styles.configHint}>Deja vacío para jugar hasta que todos sean narradores</Text>
            </View>
            <TextInput
              style={styles.configInput}
              value={maxRounds}
              onChangeText={setMaxRounds}
              keyboardType="numeric"
              placeholder="Ilimitadas"
            />
          </View>
        </View>
      </View>
      
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Consejos</Text>
        <Text style={styles.infoText}>
          • Las afirmaciones pueden ser sobre experiencias, habilidades o hechos personales{'\n'}
          • Durante el debate, haz preguntas para descubrir inconsistencias{'\n'}
          • Como narrador, intenta hacer que todas las afirmaciones suenen creíbles{'\n'}
          • Cuanto más tiempo de debate, más oportunidades de descubrir la mentira
        </Text>
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
            : '🚀 Comenzar Juego'}
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
  },
  descriptionBox: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 12,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#4caf50',
  },
  descriptionText: {
    fontSize: 14,
    color: '#2e7d32',
    lineHeight: 20,
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  warningText: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: '600',
  },
  sectionHint: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  emptyState: {
    padding: 20,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
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
    minWidth: 50,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: '#ccc',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  configGroup: {
    marginBottom: 20,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  configGroupTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 12,
  },
  configRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  configLabelContainer: {
    flex: 1,
    marginRight: 10,
  },
  configLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    marginBottom: 3,
  },
  configHint: {
    fontSize: 12,
    color: '#999',
  },
  configInput: {
    width: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  configUnit: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    width: 35,
  },
  infoBox: {
    backgroundColor: '#fff3cd',
    margin: 10,
    padding: 20,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ffc107',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 22,
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

