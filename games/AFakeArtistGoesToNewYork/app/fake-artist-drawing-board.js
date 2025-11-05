import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useFakeArtistGameStore } from '../store/fakeArtistGameStore';
import { FakeArtistDrawingCanvas } from '../components/FakeArtistDrawingCanvas';
import { FakeArtistColorPalette } from '../components/FakeArtistColorPalette';
import { FakeArtistPlayerList } from '../components/FakeArtistPlayerList';

export const FakeArtistDrawingBoard = ({ navigation }) => {
  const players = useFakeArtistGameStore((state) => state.players);
  const currentTurnIndex = useFakeArtistGameStore((state) => state.currentTurnIndex);
  const drawingStrokes = useFakeArtistGameStore((state) => state.drawingStrokes);
  const strokesPerPlayer = useFakeArtistGameStore((state) => state.strokesPerPlayer);
  const maxStrokesPerPlayer = useFakeArtistGameStore((state) => state.maxStrokesPerPlayer);
  const gameStatus = useFakeArtistGameStore((state) => state.gameStatus);
  const addStroke = useFakeArtistGameStore((state) => state.addStroke);
  const startDrawing = useFakeArtistGameStore((state) => state.startDrawing);

  const currentPlayer = players[currentTurnIndex];
  const totalStrokes = drawingStrokes.length;
  const totalPlayers = players.length;
  const maxTotalStrokes = totalPlayers * maxStrokesPerPlayer;
  const remainingStrokes = maxTotalStrokes - totalStrokes;

  useEffect(() => {
    if (gameStatus === 'drawing') {
      // El juego ya está en marcha
    } else {
      startDrawing();
    }
  }, []);

  useEffect(() => {
    if (gameStatus === 'voting') {
      navigation?.navigate('voting');
    }
  }, [gameStatus]);

  const handleStrokeComplete = (path, color) => {
    if (currentPlayer) {
      addStroke(currentPlayer.id, path, color);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dibujo Colaborativo</Text>
        <Text style={styles.turnInfo}>
          Turno de: <Text style={styles.currentPlayerName}>{currentPlayer?.name}</Text>
        </Text>
        <Text style={styles.strokeInfo}>
          Trazos restantes: {remainingStrokes} / {maxTotalStrokes}
        </Text>
      </View>

      <View style={styles.canvasContainer}>
        <FakeArtistDrawingCanvas
          strokes={drawingStrokes}
          onStrokeComplete={handleStrokeComplete}
          disabled={!currentPlayer}
        />
      </View>

      <View style={styles.paletteContainer}>
        <FakeArtistColorPalette />
      </View>

      <View style={styles.playerListContainer}>
        <FakeArtistPlayerList 
          players={players}
          currentTurnIndex={currentTurnIndex}
          showTurnIndicator={true}
        />
      </View>

      <View style={styles.instructions}>
        <Text style={styles.instructionText}>
          Añade un único trazo continuo al dibujo. Sé creativo pero no demasiado obvio.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  turnInfo: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  currentPlayerName: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  strokeInfo: {
    fontSize: 14,
    color: '#999',
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paletteContainer: {
    height: 60,
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  playerListContainer: {
    height: 100,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  instructions: {
    backgroundColor: '#E3F2FD',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#2196F3',
  },
  instructionText: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
  },
});

