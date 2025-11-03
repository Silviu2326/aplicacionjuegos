import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useTelefonoDescompuestoVisualStore } from '../store/telefonoDescompuestoVisualStore';
import { TelefonoDescompuestoVisualCanvas } from '../components/TelefonoDescompuestoVisualCanvas';
import { TelefonoDescompuestoVisualInput } from '../components/TelefonoDescompuestoVisualInput';
import { TelefonoDescompuestoVisualTimer } from '../components/TelefonoDescompuestoVisualTimer';

export const TelefonoDescompuestoVisualGame = ({ navigation }) => {
  const currentTurn = useTelefonoDescompuestoVisualStore((state) => state.currentTurn);
  const currentRound = useTelefonoDescompuestoVisualStore((state) => state.currentRound);
  const maxRounds = useTelefonoDescompuestoVisualStore((state) => state.maxRounds);
  const timeLimit = useTelefonoDescompuestoVisualStore((state) => state.timeLimit);
  const gameStatus = useTelefonoDescompuestoVisualStore((state) => state.gameStatus);
  const addEntry = useTelefonoDescompuestoVisualStore((state) => state.addEntry);
  const nextTurn = useTelefonoDescompuestoVisualStore((state) => state.nextTurn);
  const setGameStatus = useTelefonoDescompuestoVisualStore((state) => state.setGameStatus);

  useEffect(() => {
    if (gameStatus === 'results') {
      navigation?.navigate('results');
    }
  }, [gameStatus]);

  const handleDrawingComplete = (drawing) => {
    if (!currentTurn) return;
    
    addEntry(currentTurn.notebookId, {
      type: 'draw',
      content: drawing,
      playerId: currentTurn.playerId,
      playerName: currentTurn.playerName,
      round: currentRound,
    });
    
    // Pasar al siguiente turno o terminar
    nextTurn();
    
    // Si el juego terminó, nextTurn habrá cambiado el estado a 'results'
    const newStatus = useTelefonoDescompuestoVisualStore.getState().gameStatus;
    if (newStatus === 'results') {
      navigation?.navigate('results');
    }
  };

  const handleTextSubmit = (text) => {
    if (!currentTurn) return;
    
    addEntry(currentTurn.notebookId, {
      type: 'text',
      content: text,
      playerId: currentTurn.playerId,
      playerName: currentTurn.playerName,
      round: currentRound,
    });
    
    // Pasar al siguiente turno o terminar
    nextTurn();
    
    // Si el juego terminó, nextTurn habrá cambiado el estado a 'results'
    const newStatus = useTelefonoDescompuestoVisualStore.getState().gameStatus;
    if (newStatus === 'results') {
      navigation?.navigate('results');
    }
  };

  const handleTimeUp = () => {
    Alert.alert('Tiempo Agotado', 'Pasa el teléfono al siguiente jugador');
    if (currentTurn?.type === 'draw') {
      handleDrawingComplete([]);
    } else {
      handleTextSubmit('Sin respuesta');
    }
  };

  if (!currentTurn) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando turno...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerText}>Turno de {currentTurn.playerName}</Text>
          <Text style={styles.roundText}>Ronda {currentRound} de {maxRounds}</Text>
        </View>
        <TelefonoDescompuestoVisualTimer 
          timeLimit={timeLimit} 
          onTimeUp={handleTimeUp}
          isActive={true}
        />
      </View>

      {currentTurn.type === 'draw' ? (
        <View style={styles.content}>
          <Text style={styles.instruction}>
            {currentTurn.previousContent 
              ? `Dibuja: "${currentTurn.previousContent}"`
              : 'Dibuja la palabra asignada'}
          </Text>
          <Text style={styles.passHint}>Pasa el teléfono a {currentTurn.playerName}</Text>
          <TelefonoDescompuestoVisualCanvas 
            onDrawingComplete={handleDrawingComplete}
          />
        </View>
      ) : (
        <View style={styles.content}>
          <Text style={styles.passHint}>Pasa el teléfono a {currentTurn.playerName}</Text>
          <TelefonoDescompuestoVisualInput 
            drawing={currentTurn.previousContent}
            onSubmit={handleTextSubmit}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  roundText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  instruction: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 16,
    textAlign: 'center',
    color: '#333',
    backgroundColor: '#f5f5f5',
  },
  passHint: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    padding: 12,
    backgroundColor: '#fff3cd',
    fontStyle: 'italic',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

