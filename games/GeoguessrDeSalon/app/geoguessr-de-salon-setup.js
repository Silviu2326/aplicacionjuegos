import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useGeoguessrDeSalonStore, GAME_MODES } from '../store/geoguessrDeSalonStore';
import { GeoguessrDeSalonScoreboard } from '../components/GeoguessrDeSalonScoreboard';

export const GeoguessrDeSalonSetupScreen = ({ navigation }) => {
  const [playerName, setPlayerName] = useState('');
  const { 
    players, 
    gameMode, 
    totalRounds,
    addPlayer, 
    removePlayer, 
    setGameMode, 
    setTotalRounds,
    startGame, 
    resetGame 
  } = useGeoguessrDeSalonStore();

  const handleAddPlayer = () => {
    if (playerName.trim()) {
      addPlayer(playerName.trim());
      setPlayerName('');
    }
  };

  const handleStartGame = () => {
    if (players.length >= 2) {
      if (startGame()) {
        navigation?.navigate('geoguessr-de-salon-game');
      }
    }
  };

  const handleReset = () => {
    resetGame();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.headerSection}>
          <Text style={styles.title}>🌍 Geoguessr de Salón</Text>
          <Text style={styles.subtitle}>Juego de geografía colaborativa</Text>
        </View>
        
        <View style={styles.descriptionBox}>
          <Text style={styles.descriptionTitle}>📖 ¿Cómo se juega?</Text>
          <Text style={styles.description}>
            Los jugadores, llamados 'Exploradores', deben adivinar una ubicación del mundo 
            haciendo preguntas de sí o no al 'Guía', quien es el único que puede ver la 
            imagen y el nombre de la ubicación. El Guía solo puede responder 'Sí', 'No' o 
            'Irrelevante'. Gana el jugador que acumule más puntos al adivinar correctamente 
            las ubicaciones.
          </Text>
          
          <View style={styles.rulesList}>
            <Text style={styles.ruleItem}>✓ El Guía rota cada ronda</Text>
            <Text style={styles.ruleItem}>✓ Si adivinas mal, pierdes tu siguiente turno</Text>
            <Text style={styles.ruleItem}>✓ Solo puedes hacer preguntas de sí/no</Text>
            <Text style={styles.ruleItem}>✓ El Guía debe ser honesto en sus respuestas</Text>
          </View>
        </View>

        {/* Selector de modo de juego */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Modo de Juego</Text>
          <View style={styles.modeContainer}>
            <TouchableOpacity
              style={[
                styles.modeButton,
                gameMode === GAME_MODES.COUNTRY && styles.modeButtonActive
              ]}
              onPress={() => setGameMode(GAME_MODES.COUNTRY)}
            >
              <Text style={[
                styles.modeButtonText,
                gameMode === GAME_MODES.COUNTRY && styles.modeButtonTextActive
              ]}>
                Adivinar País
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.modeButton,
                gameMode === GAME_MODES.CITY && styles.modeButtonActive
              ]}
              onPress={() => setGameMode(GAME_MODES.CITY)}
            >
              <Text style={[
                styles.modeButtonText,
                gameMode === GAME_MODES.CITY && styles.modeButtonTextActive
              ]}>
                Adivinar Ciudad
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Selector de número de rondas */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Número de Rondas</Text>
          <View style={styles.roundsContainer}>
            {[3, 5, 7, 10].map((rounds) => (
              <TouchableOpacity
                key={rounds}
                style={[
                  styles.roundButton,
                  totalRounds === rounds && styles.roundButtonActive
                ]}
                onPress={() => setTotalRounds(rounds)}
              >
                <Text style={[
                  styles.roundButtonText,
                  totalRounds === rounds && styles.roundButtonTextActive
                ]}>
                  {rounds}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Jugadores */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Jugadores ({players.length}/2+)</Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Nombre del jugador"
              value={playerName}
              onChangeText={setPlayerName}
              onSubmitEditing={handleAddPlayer}
              placeholderTextColor="#888"
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddPlayer}>
              <Text style={styles.addButtonText}>Agregar</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.playersList}>
            {players.map((player) => (
              <View key={player.id} style={styles.playerItem}>
                <Text style={styles.playerName}>{player.name}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removePlayer(player.id)}
                >
                  <Text style={styles.removeButtonText}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Botones de acción */}
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < 2 && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={players.length < 2}
        >
          <Text style={styles.startButtonText}>Iniciar Partida</Text>
        </TouchableOpacity>

        {players.length > 0 && (
          <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
            <Text style={styles.resetButtonText}>Reiniciar</Text>
          </TouchableOpacity>
        )}

        {players.length < 2 && (
          <Text style={styles.warningText}>
            Se requieren al menos 2 jugadores para iniciar
          </Text>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#a0a0a0',
    marginBottom: 20,
    textAlign: 'center',
  },
  headerSection: {
    marginBottom: 25,
    alignItems: 'center',
  },
  descriptionBox: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'left',
    lineHeight: 22,
    marginBottom: 15,
  },
  rulesList: {
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#2a2a3e',
  },
  ruleItem: {
    fontSize: 14,
    color: '#fff',
    marginVertical: 5,
    lineHeight: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  modeContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  modeButton: {
    flex: 1,
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  modeButtonActive: {
    backgroundColor: '#4a90e2',
  },
  modeButtonText: {
    color: '#ccc',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modeButtonTextActive: {
    color: '#fff',
  },
  roundsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  roundButton: {
    flex: 1,
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  roundButtonActive: {
    backgroundColor: '#4a90e2',
  },
  roundButtonText: {
    color: '#ccc',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roundButtonTextActive: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#16213e',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: '#4a90e2',
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
  playersList: {
    maxHeight: 200,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerName: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  removeButton: {
    backgroundColor: '#d32f2f',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 6,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  startButton: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  startButtonDisabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#666',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  warningText: {
    color: '#f5a623',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});

