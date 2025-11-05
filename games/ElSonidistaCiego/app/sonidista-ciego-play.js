import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput, ScrollView } from 'react-native';
import { useSonidistaCiegoStore } from '../store/sonidistaCiegoStore';
import { SonidistaCiegoScenarioCard } from '../components/SonidistaCiegoScenarioCard';

export const ElSonidistaCiegoPlay = ({ navigation }) => {
  const currentScenario = useSonidistaCiegoStore((state) => state.currentScenario);
  const currentRound = useSonidistaCiegoStore((state) => state.currentRound);
  const players = useSonidistaCiegoStore((state) => state.players);
  const maxRounds = useSonidistaCiegoStore((state) => state.maxRounds);
  const currentBlindSoundIndex = useSonidistaCiegoStore((state) => state.currentBlindSoundIndex);
  const getCurrentBlindSound = useSonidistaCiegoStore((state) => state.getCurrentBlindSound);
  const getHelpers = useSonidistaCiegoStore((state) => state.getHelpers);
  const startRound = useSonidistaCiegoStore((state) => state.startRound);
  const submitGuess = useSonidistaCiegoStore((state) => state.submitGuess);
  const endRound = useSonidistaCiegoStore((state) => state.endRound);
  
  const [guess, setGuess] = useState('');
  const [showScenario, setShowScenario] = useState(false);
  const [phase, setPhase] = useState('waiting'); // 'waiting', 'revealing', 'sounds', 'guessing'
  const [completedHelpers, setCompletedHelpers] = useState([]);
  
  const blindSound = getCurrentBlindSound();
  const helpers = getHelpers();

  useEffect(() => {
    if (!currentScenario) {
      startRound();
    }
    if (currentScenario && !showScenario) {
      setPhase('revealing');
    }
    // Resetear completados cuando cambia la ronda
    setCompletedHelpers([]);
  }, [currentRound, currentScenario]);

  const handleRevealScenario = () => {
    setShowScenario(true);
    setPhase('sounds');
  };

  const handleHelperCompleted = (helperId) => {
    if (!completedHelpers.includes(helperId)) {
      setCompletedHelpers([...completedHelpers, helperId]);
    }
  };

  const handleStartGuessing = () => {
    if (completedHelpers.length < helpers.length) {
      Alert.alert(
        'Espera',
        `Aún faltan ${helpers.length - completedHelpers.length} ayudante${helpers.length - completedHelpers.length > 1 ? 's' : ''} por hacer su sonido.`,
        [{ text: 'Continuar de todos modos', onPress: () => setPhase('guessing') }, { text: 'Esperar', style: 'cancel' }]
      );
      return;
    }
    setPhase('guessing');
  };

  const handleSubmitGuess = (isCorrect = null) => {
    // Si se presiona directamente Acierto/Fallo sin texto
    if (isCorrect !== null) {
      const finalGuess = guess.trim() || (isCorrect ? currentScenario : '');
      submitGuess(finalGuess);
      endRound(isCorrect);
      if (navigation && navigation.navigate) {
        navigation.navigate('results');
      }
      return;
    }
    
    // Si se envía desde el input de texto
    if (!guess.trim()) {
      Alert.alert('Error', 'Por favor ingresa tu adivinanza o usa los botones Acierto/Fallo');
      return;
    }
    
    const isCorrectResult = submitGuess(guess.trim());
    endRound(isCorrectResult);
    
    if (navigation && navigation.navigate) {
      navigation.navigate('results');
    }
  };

  if (phase === 'waiting' || !blindSound) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Preparando ronda...</Text>
        </View>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>⏳ Cargando escenario...</Text>
        </View>
      </View>
    );
  }

  const progressText = maxRounds 
    ? `Ronda ${currentRound} de ${maxRounds}`
    : `Ronda ${currentRound}`;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 El Sonidista Ciego</Text>
        <Text style={styles.roundText}>{progressText}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.blindSoundCard}>
          <Text style={styles.blindSoundLabel}>👁️ El Sonidista Ciego es:</Text>
          <Text style={styles.blindSoundName}>{blindSound.name}</Text>
          <View style={styles.instructionBox}>
            <Text style={styles.blindSoundInstruction}>
              ⚠️ {blindSound.name} debe cerrar los ojos o usar un antifaz antes de continuar
            </Text>
          </View>
        </View>

        {phase === 'revealing' && !showScenario && (
          <View style={styles.phaseContainer}>
            <Text style={styles.phaseTitle}>Sonidistas Ayudantes</Text>
            <View style={styles.infoBox}>
              <Text style={styles.phaseText}>
                Presiona el botón cuando {blindSound.name} esté listo y con los ojos cerrados
              </Text>
              <Text style={styles.helperCount}>
                Hay {helpers.length} ayudante{helpers.length !== 1 ? 's' : ''} en esta ronda
              </Text>
            </View>
            <TouchableOpacity
              style={styles.revealButton}
              onPress={handleRevealScenario}
            >
              <Text style={styles.revealButtonText}>🔓 Revelar Escenario</Text>
            </TouchableOpacity>
          </View>
        )}

        {phase === 'sounds' && showScenario && (
          <View style={styles.phaseContainer}>
            <SonidistaCiegoScenarioCard 
              scenario={currentScenario}
              onReveal={handleRevealScenario}
            />
            
            <View style={styles.helpersCard}>
              <Text style={styles.helpersTitle}>Sonidistas Ayudantes ({completedHelpers.length}/{helpers.length})</Text>
              <View style={styles.helpersList}>
                {helpers.map((helper, index) => {
                  const hasCompleted = completedHelpers.includes(helper.id);
                  return (
                    <View 
                      key={helper.id} 
                      style={[
                        styles.helperItem,
                        hasCompleted && styles.helperItemCompleted,
                      ]}
                    >
                      <Text style={styles.helperNumber}>{index + 1}.</Text>
                      <Text style={[
                        styles.helperName,
                        hasCompleted && styles.helperNameCompleted,
                      ]}>
                        {helper.name}
                      </Text>
                      {hasCompleted && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                      {!hasCompleted && (
                        <TouchableOpacity
                          style={styles.markCompleteButton}
                          onPress={() => handleHelperCompleted(helper.id)}
                        >
                          <Text style={styles.markCompleteText}>Marcar completado</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  );
                })}
              </View>
              <View style={styles.helpersInstructionBox}>
                <Text style={styles.helpersInstruction}>
                  💡 Por turnos, cada Ayudante debe hacer UN ÚNICO sonido relacionado con el escenario.
                  No hablen, solo sonidos. Cuando terminen, márquense como completados.
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[
                styles.continueButton,
                completedHelpers.length < helpers.length && styles.continueButtonDisabled,
              ]}
              onPress={handleStartGuessing}
              disabled={completedHelpers.length < helpers.length}
            >
              <Text style={styles.continueButtonText}>
                {completedHelpers.length < helpers.length
                  ? `Esperando ayudantes (${completedHelpers.length}/${helpers.length})`
                  : '✓ Todos han completado - Continuar'}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {phase === 'guessing' && (
          <View style={styles.phaseContainer}>
            <View style={styles.guessingHeader}>
              <Text style={styles.guessingTitle}>
                👀 {blindSound.name}, puedes abrir los ojos
              </Text>
              <Text style={styles.guessingSubtitle}>
                ¿Qué escenario crees que era?
              </Text>
            </View>
            
            <View style={styles.guessInputContainer}>
              <TextInput
                style={styles.guessInput}
                placeholder="Escribe tu adivinanza aquí..."
                placeholderTextColor="#999"
                value={guess}
                onChangeText={setGuess}
                multiline
                maxLength={100}
                autoFocus
              />
              {guess.trim().length > 0 && (
                <Text style={styles.charCount}>
                  {guess.trim().length}/100 caracteres
                </Text>
              )}
            </View>

            <View style={styles.quickActionsContainer}>
              <Text style={styles.quickActionsLabel}>Acción rápida:</Text>
              <View style={styles.buttonsRow}>
                <TouchableOpacity
                  style={[styles.resultButton, styles.correctButton]}
                  onPress={() => handleSubmitGuess(true)}
                >
                  <Text style={styles.resultButtonText}>✓ Acierto</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.resultButton, styles.incorrectButton]}
                  onPress={() => handleSubmitGuess(false)}
                >
                  <Text style={styles.resultButtonText}>✗ Fallo</Text>
                </TouchableOpacity>
              </View>
            </View>

            {guess.trim().length > 0 && (
              <TouchableOpacity
                style={styles.submitButton}
                onPress={() => handleSubmitGuess(null)}
              >
                <Text style={styles.submitButtonText}>
                  Enviar adivinanza: "{guess.trim()}"
                </Text>
              </TouchableOpacity>
            )}
          </View>
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
    backgroundColor: '#ff5722',
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  roundText: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.95,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
  content: {
    padding: 20,
  },
  blindSoundCard: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 3,
    borderColor: '#ff9800',
  },
  blindSoundLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    fontWeight: '600',
  },
  blindSoundName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 15,
  },
  instructionBox: {
    backgroundColor: '#fff3e0',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
    width: '100%',
  },
  blindSoundInstruction: {
    fontSize: 15,
    color: '#e65100',
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 22,
  },
  phaseContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  infoBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  phaseText: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 10,
    lineHeight: 24,
    fontWeight: '600',
  },
  helperCount: {
    fontSize: 14,
    color: '#1976d2',
    textAlign: 'center',
    fontWeight: '600',
  },
  revealButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4caf50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  revealButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  helpersCard: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  helpersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  helpersList: {
    marginBottom: 15,
  },
  helperItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  helperItemCompleted: {
    backgroundColor: '#e8f5e9',
    borderColor: '#4caf50',
  },
  helperNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
    marginRight: 12,
    minWidth: 30,
  },
  helperName: {
    fontSize: 17,
    color: '#333',
    flex: 1,
    fontWeight: '600',
  },
  helperNameCompleted: {
    color: '#2e7d32',
    textDecorationLine: 'line-through',
  },
  checkmark: {
    fontSize: 24,
    color: '#4caf50',
    marginLeft: 10,
  },
  markCompleteButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 10,
  },
  markCompleteText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  helpersInstructionBox: {
    backgroundColor: '#fff3e0',
    padding: 12,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#ff9800',
  },
  helpersInstruction: {
    fontSize: 13,
    color: '#e65100',
    lineHeight: 20,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#2196f3',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#2196f3',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  guessingHeader: {
    alignItems: 'center',
    marginBottom: 25,
  },
  guessingTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  guessingSubtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  guessInputContainer: {
    marginBottom: 20,
  },
  guessInput: {
    borderWidth: 3,
    borderColor: '#ff5722',
    borderRadius: 15,
    padding: 20,
    fontSize: 18,
    minHeight: 120,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    color: '#333',
  },
  charCount: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
    marginTop: 5,
  },
  quickActionsContainer: {
    marginBottom: 20,
  },
  quickActionsLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '600',
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
  },
  resultButton: {
    flex: 1,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  correctButton: {
    backgroundColor: '#4caf50',
  },
  incorrectButton: {
    backgroundColor: '#f44336',
  },
  resultButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#ff5722',
    padding: 18,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#ff5722',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ElSonidistaCiegoPlay;

