import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useGeoguessrDeSalonStore } from '../store/geoguessrDeSalonStore';
import { GeoguessrDeSalonGuideView } from '../components/GeoguessrDeSalonGuideView';
import { GeoguessrDeSalonRevealView } from '../components/GeoguessrDeSalonRevealView';
import { GeoguessrDeSalonScoreboard } from '../components/GeoguessrDeSalonScoreboard';
import { GeoguessrDeSalonPlayerInput } from '../components/GeoguessrDeSalonPlayerInput';

export const GeoguessrDeSalonGameScreen = ({ navigation }) => {
  const {
    currentGuideId,
    currentExplorers,
    players,
    currentRound,
    totalRounds,
    roundEnded,
    currentLocation,
    attemptGuess,
    continueAfterReveal,
    nextRound,
  } = useGeoguessrDeSalonStore();

  const [currentExplorerIndex, setCurrentExplorerIndex] = useState(0);
  const [disabledPlayers, setDisabledPlayers] = useState(new Set());

  // Obtener el explorador actual
  const currentExplorer = players.find(p => 
    p.id === currentExplorers[currentExplorerIndex % currentExplorers.length]
  );

  // Manejar adivinanza correcta desde el Guía
  const handleGuessCorrect = () => {
    if (currentExplorer && currentLocation) {
      // Registrar el acierto
      attemptGuess(currentExplorer.id, currentLocation.name);
      // Resetear el estado de turnos
      setCurrentExplorerIndex(0);
      setDisabledPlayers(new Set());
    }
  };

  // Manejar adivinanza incorrecta desde el Guía
  const handleGuessIncorrect = () => {
    // El explorador no puede preguntar en su siguiente turno
    if (currentExplorer) {
      setDisabledPlayers(new Set([...disabledPlayers, currentExplorer.id]));
    }
    // Avanzar al siguiente explorador
    setCurrentExplorerIndex((prev) => (prev + 1) % currentExplorers.length);
  };

  // Manejar intento de adivinanza desde el explorador
  const handlePlayerGuess = (guess) => {
    if (!currentExplorer) return;
    
    const result = attemptGuess(currentExplorer.id, guess);
    if (result?.success) {
      // Adivinanza correcta - la ronda terminará automáticamente
      setCurrentExplorerIndex(0);
      setDisabledPlayers(new Set());
    } else {
      // Adivinanza incorrecta - penalización
      setDisabledPlayers(new Set([...disabledPlayers, currentExplorer.id]));
      setCurrentExplorerIndex((prev) => (prev + 1) % currentExplorers.length);
    }
  };

  // Continuar después de revelar
  const handleContinueAfterReveal = () => {
    setCurrentExplorerIndex(0);
    setDisabledPlayers(new Set());
    continueAfterReveal();
  };

  // Resetear el índice cuando cambia la ronda o los exploradores
  useEffect(() => {
    if (!roundEnded) {
      setCurrentExplorerIndex(0);
      setDisabledPlayers(new Set());
    }
  }, [currentRound, currentExplorers]);

  // Si la ronda ha terminado, mostrar vista de revelación
  if (roundEnded && currentLocation) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.roundInfo}>
            Ronda {currentRound} de {totalRounds}
          </Text>
          <GeoguessrDeSalonRevealView onContinue={handleContinueAfterReveal} />
          <GeoguessrDeSalonScoreboard />
        </View>
      </ScrollView>
    );
  }

  // Vista principal del juego
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.roundInfo}>
          Ronda {currentRound} de {totalRounds}
        </Text>

        <GeoguessrDeSalonScoreboard />

        {/* Vista del Guía */}
        {currentGuideId && (
          <View style={styles.guideSection}>
            <GeoguessrDeSalonGuideView
              onGuessCorrect={handleGuessCorrect}
              onGuessIncorrect={handleGuessIncorrect}
            />
          </View>
        )}

        {/* Vista de los Exploradores */}
        {currentExplorer && (
          <View style={styles.explorerSection}>
            <Text style={styles.explorerTitle}>
              Turno de: {currentExplorer.name}
            </Text>
            <Text style={styles.explorerInstruction}>
              Haz una pregunta de sí/no al Guía o intenta adivinar la ubicación.
            </Text>
            <GeoguessrDeSalonPlayerInput
              playerName={currentExplorer.name}
              onGuess={handlePlayerGuess}
              disabled={disabledPlayers.has(currentExplorer.id)}
            />
          </View>
        )}

        {/* Lista de exploradores */}
        <View style={styles.explorersList}>
          <Text style={styles.explorersListTitle}>Exploradores:</Text>
          {currentExplorers.map((explorerId, index) => {
            const explorer = players.find(p => p.id === explorerId);
            const isCurrent = index === (currentExplorerIndex % currentExplorers.length);
            const isDisabled = disabledPlayers.has(explorerId);
            
            return (
              <View 
                key={explorerId} 
                style={[
                  styles.explorerItem,
                  isCurrent && styles.explorerItemCurrent,
                  isDisabled && styles.explorerItemDisabled
                ]}
              >
                <Text style={[
                  styles.explorerItemText,
                  isCurrent && styles.explorerItemTextCurrent,
                  isDisabled && styles.explorerItemTextDisabled
                ]}>
                  {explorer?.name} {isCurrent && '(Actual)'} {isDisabled && '(Sin pregunta)'}
                </Text>
              </View>
            );
          })}
        </View>
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
  roundInfo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
    marginBottom: 20,
  },
  guideSection: {
    marginBottom: 20,
  },
  explorerSection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 12,
  },
  explorerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  explorerInstruction: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 15,
    textAlign: 'center',
  },
  explorersList: {
    marginTop: 20,
  },
  explorersListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  explorerItem: {
    backgroundColor: '#16213e',
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
  },
  explorerItemCurrent: {
    backgroundColor: '#4a90e2',
  },
  explorerItemDisabled: {
    opacity: 0.5,
    backgroundColor: '#333',
  },
  explorerItemText: {
    color: '#ccc',
    fontSize: 14,
  },
  explorerItemTextCurrent: {
    color: '#fff',
    fontWeight: 'bold',
  },
  explorerItemTextDisabled: {
    color: '#888',
  },
});

