import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useInterrogatorioStore } from '../store/interrogatorioStore';
import { InterrogatorioHeader } from '../components/InterrogatorioHeader';
import { InterrogatorioPlayerInput } from '../components/InterrogatorioPlayerInput';
import { InterrogatorioGameSettings } from '../components/InterrogatorioGameSettings';

const MIN_PLAYERS = 3;
const MAX_PLAYERS = 10;

export const ElInterrogatorioIndex = ({ navigation }) => {
  const players = useInterrogatorioStore((state) => state.players);
  const addPlayer = useInterrogatorioStore((state) => state.addPlayer);
  const removePlayer = useInterrogatorioStore((state) => state.removePlayer);
  const maxQuestions = useInterrogatorioStore((state) => state.maxQuestionsConfig);
  const setMaxQuestions = useInterrogatorioStore((state) => state.setMaxQuestions);
  const maxRounds = useInterrogatorioStore((state) => state.maxRounds);
  const setMaxRounds = useInterrogatorioStore((state) => state.setMaxRounds);
  const situationTheme = useInterrogatorioStore((state) => state.situationTheme);
  const setSituationTheme = useInterrogatorioStore((state) => state.setSituationTheme);
  const startGame = useInterrogatorioStore((state) => state.startGame);
  const resetGame = useInterrogatorioStore((state) => state.resetGame);

  const handleAddPlayer = (name) => {
    addPlayer(name);
  };

  const handleStart = () => {
    if (players.length < MIN_PLAYERS) {
      return;
    }
    resetGame();
    const success = startGame();
    if (success && navigation && navigation.navigate) {
      navigation.navigate('asignacion');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <InterrogatorioHeader 
        title="El Interrogatorio"
        subtitle="Juego de deducción social"
      />
      
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>📋 ¿Cómo se juega?</Text>
          <Text style={styles.description}>
            Un jugador es el <Text style={styles.highlight}>'sospechoso'</Text> y recibe una situación secreta y absurda.
            Los demás jugadores son <Text style={styles.highlight}>'detectives'</Text> y deben descubrir qué hizo el sospechoso
            haciendo preguntas. El sospechoso solo puede responder <Text style={styles.highlight}>'Sí'</Text>, <Text style={styles.highlight}>'No'</Text> o <Text style={styles.highlight}>'Quizás'</Text>.
          </Text>
        </View>
        
        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>📜 Reglas del Juego</Text>
          <View style={styles.rulesList}>
            <Text style={styles.ruleItem}>• Se selecciona aleatoriamente un sospechoso por ronda</Text>
            <Text style={styles.ruleItem}>• El sospechoso recibe una situación secreta</Text>
            <Text style={styles.ruleItem}>• Los detectives tienen un número limitado de preguntas</Text>
            <Text style={styles.ruleItem}>• El sospechoso solo puede responder: Sí, No o Quizás</Text>
            <Text style={styles.ruleItem}>• Los detectives deben acusar al final de cada ronda</Text>
            <Text style={styles.ruleItem}>• Si aciertan, los detectives ganan puntos</Text>
            <Text style={styles.ruleItem}>• Si fallan, el sospechoso gana puntos</Text>
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              👥 Jugadores ({players.length}/{MAX_PLAYERS})
            </Text>
            {players.length > 0 && (
              <View style={styles.playerStats}>
                <Text style={styles.playerStatsText}>
                  {players.length} jugador{players.length !== 1 ? 'es' : ''} • Mínimo {MIN_PLAYERS}
                </Text>
              </View>
            )}
          </View>
          
          <InterrogatorioPlayerInput
            onAddPlayer={handleAddPlayer}
            maxPlayers={MAX_PLAYERS}
            currentCount={players.length}
          />
          
          {players.length > 0 && (
            <View style={styles.playerList}>
              {players.map((player, index) => (
                <View key={player.id} style={styles.playerItem}>
                  <View style={styles.playerInfo}>
                    <Text style={styles.playerNumber}>{index + 1}</Text>
                    <Text style={styles.playerName}>{player.name}</Text>
                    {player.score > 0 && (
                      <Text style={styles.playerScore}>🏆 {player.score}</Text>
                    )}
                  </View>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removePlayer(player.id)}
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
                No hay jugadores aún. Agrega al menos {MIN_PLAYERS} jugadores para comenzar.
              </Text>
            </View>
          )}
        </View>

        <InterrogatorioGameSettings
          maxQuestions={maxQuestions}
          onMaxQuestionsChange={setMaxQuestions}
          maxRounds={maxRounds}
          onMaxRoundsChange={setMaxRounds}
          situationTheme={situationTheme}
          onThemeChange={setSituationTheme}
        />
        
        <TouchableOpacity
          style={[
            styles.startButton,
            players.length < MIN_PLAYERS && styles.startButtonDisabled,
          ]}
          onPress={handleStart}
          disabled={players.length < MIN_PLAYERS}
        >
          <Text style={styles.startButtonText}>
            {players.length < MIN_PLAYERS
              ? `Necesitas ${
                  MIN_PLAYERS - players.length
                } jugador${MIN_PLAYERS - players.length > 1 ? 'es' : ''} más`
              : 'Comenzar Juego'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#ff5722',
  },
  rulesCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  rulesTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  rulesList: {
    paddingLeft: 5,
  },
  ruleItem: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
    marginBottom: 8,
  },
  sectionHeader: {
    marginBottom: 10,
  },
  playerStats: {
    marginTop: 5,
  },
  playerStatsText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff5722',
    marginRight: 12,
    width: 30,
    textAlign: 'center',
  },
  playerScore: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
    marginLeft: 'auto',
    marginRight: 10,
  },
  emptyState: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
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
  playerList: {
    marginTop: 10,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  removeButton: {
    backgroundColor: '#f44336',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#ff5722',
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

export default ElInterrogatorioIndex;

