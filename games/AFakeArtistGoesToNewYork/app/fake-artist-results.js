import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { useFakeArtistGameStore } from '../store/fakeArtistGameStore';
import { FakeArtistPlayerList } from '../components/FakeArtistPlayerList';
import { FakeArtistDrawingCanvas } from '../components/FakeArtistDrawingCanvas';

export const FakeArtistResults = ({ navigation }) => {
  const [fakeArtistGuess, setFakeArtistGuess] = useState('');
  
  const players = useFakeArtistGameStore((state) => state.players);
  const fakeArtistIndex = useFakeArtistGameStore((state) => state.fakeArtistIndex);
  const gameResult = useFakeArtistGameStore((state) => state.gameResult);
  const secretWord = useFakeArtistGameStore((state) => state.secretWord);
  const fakeArtistGuessState = useFakeArtistGameStore((state) => state.fakeArtistGuess);
  const drawingStrokes = useFakeArtistGameStore((state) => state.drawingStrokes);
  const submitFakeArtistGuess = useFakeArtistGameStore((state) => state.submitFakeArtistGuess);
  const resetGame = useFakeArtistGameStore((state) => state.resetGame);
  const nextRound = useFakeArtistGameStore((state) => state.nextRound);

  const fakeArtistPlayer = players[fakeArtistIndex];
  const needsGuess = gameResult === 'fake-artist-discovered' && !fakeArtistGuessState;

  useEffect(() => {
    if (fakeArtistGuessState) {
      // Ya se ha enviado la adivinanza
    }
  }, [fakeArtistGuessState]);

  const handleSubmitGuess = () => {
    if (fakeArtistGuess.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa una palabra');
      return;
    }
    
    submitFakeArtistGuess(fakeArtistGuess.trim());
  };

  const handleNewGame = () => {
    resetGame();
    navigation?.navigate('index');
  };

  const handleNextRound = () => {
    nextRound();
    navigation?.navigate('lobby');
  };

  const getResultMessage = () => {
    if (!gameResult) return 'Resultado pendiente';
    
    switch (gameResult) {
      case 'fake-artist-discovered':
        if (!fakeArtistGuessState) {
          return `${fakeArtistPlayer?.name} fue descubierto. Tiene una última oportunidad para adivinar la palabra.`;
        }
        const correct = fakeArtistGuessState.toLowerCase().trim() === secretWord.toLowerCase().trim();
        if (correct) {
          return `¡${fakeArtistPlayer?.name} adivinó correctamente! El Artista Falso y el Maestro ganan.`;
        } else {
          return `${fakeArtistPlayer?.name} no adivinó. Los Artistas Reales ganan.`;
        }
      case 'fake-artist-wins':
        return `¡El Artista Falso y el Maestro ganan! ${fakeArtistPlayer?.name} logró pasar desapercibido.`;
      case 'fake-artist-guessed':
        return `¡El Artista Falso adivinó correctamente! ${fakeArtistPlayer?.name} y el Maestro ganan.`;
      case 'real-artists-win':
        return `¡Los Artistas Reales ganan! El Artista Falso fue descubierto y no adivinó la palabra.`;
      default:
        return 'Resultado desconocido';
    }
  };

  const getWinners = () => {
    if (!gameResult) return [];
    
    const fakeArtistPlayer = players[fakeArtistIndex];
    const masterPlayer = players[0]; // El primer jugador es el maestro inicial
    
    switch (gameResult) {
      case 'fake-artist-wins':
      case 'fake-artist-guessed':
        return [fakeArtistPlayer, masterPlayer].filter(Boolean);
      case 'real-artists-win':
        return players.filter((_, index) => index !== fakeArtistIndex && index !== 0);
      default:
        return [];
    }
  };

  const winners = getWinners();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultados</Text>
      
      <View style={styles.resultContainer}>
        <Text style={styles.resultMessage}>{getResultMessage()}</Text>
        
        {secretWord && (
          <View style={styles.secretWordContainer}>
            <Text style={styles.secretWordLabel}>La palabra secreta era:</Text>
            <Text style={styles.secretWord}>{secretWord}</Text>
          </View>
        )}

        {fakeArtistPlayer && (
          <View style={styles.fakeArtistContainer}>
            <Text style={styles.fakeArtistLabel}>El Artista Falso era:</Text>
            <Text style={styles.fakeArtistName}>{fakeArtistPlayer.name}</Text>
          </View>
        )}
      </View>

      {needsGuess && (
        <View style={styles.guessContainer}>
          <Text style={styles.guessLabel}>
            {fakeArtistPlayer?.name}, adivina la palabra secreta:
          </Text>
          <TextInput
            style={styles.guessInput}
            placeholder="Escribe tu respuesta"
            value={fakeArtistGuess}
            onChangeText={setFakeArtistGuess}
            onSubmitEditing={handleSubmitGuess}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitGuess}>
            <Text style={styles.submitButtonText}>Enviar Respuesta</Text>
          </TouchableOpacity>
        </View>
      )}

      {winners.length > 0 && (
        <View style={styles.winnersContainer}>
          <Text style={styles.winnersLabel}>¡Ganadores!</Text>
          {winners.map((winner) => (
            <Text key={winner.id} style={styles.winnerName}>
              {winner.name}
            </Text>
          ))}
        </View>
      )}

      <View style={styles.drawingPreview}>
        <Text style={styles.drawingLabel}>Dibujo Final:</Text>
        <View style={styles.canvasContainer}>
          <FakeArtistDrawingCanvas
            strokes={drawingStrokes}
            disabled={true}
            readOnly={true}
          />
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.actionButton} onPress={handleNextRound}>
          <Text style={styles.actionButtonText}>Nueva Ronda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.newGameButton]} onPress={handleNewGame}>
          <Text style={styles.actionButtonText}>Nuevo Juego</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultMessage: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 26,
  },
  secretWordContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  secretWordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  secretWord: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  fakeArtistContainer: {
    alignItems: 'center',
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  fakeArtistLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  fakeArtistName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f44336',
  },
  guessContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  guessLabel: {
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  guessInput: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    fontSize: 18,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  submitButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  winnersContainer: {
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
  },
  winnersLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
  },
  winnerName: {
    fontSize: 18,
    color: '#2E7D32',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  drawingPreview: {
    marginBottom: 20,
  },
  drawingLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  canvasContainer: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  newGameButton: {
    backgroundColor: '#2196F3',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

