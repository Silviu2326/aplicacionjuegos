import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useInterrogatorioStore } from '../store/interrogatorioStore';
import { InterrogatorioSecretCard } from '../components/InterrogatorioSecretCard';
import { InterrogatorioHeader } from '../components/InterrogatorioHeader';

export const ElInterrogatorioSecreto = ({ navigation }) => {
  const startSecretPhase = useInterrogatorioStore((state) => state.startSecretPhase);
  const currentSituation = useInterrogatorioStore((state) => state.currentSituation);
  const currentRound = useInterrogatorioStore((state) => state.currentRound);
  const getCurrentSuspect = useInterrogatorioStore((state) => state.getCurrentSuspect);
  const maxQuestions = useInterrogatorioStore((state) => state.maxQuestions);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    // Asignar situación al montar
    if (!currentSituation) {
      startSecretPhase();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startRoundPhase = useInterrogatorioStore((state) => state.startRoundPhase);
  
  const handleUnderstood = () => {
    startRoundPhase();
    if (navigation && navigation.navigate) {
      navigation.navigate('ronda');
    }
  };

  const suspect = getCurrentSuspect();

  return (
    <ScrollView style={styles.container}>
      <InterrogatorioHeader 
        title="Situación Secreta"
        currentRound={currentRound}
        currentSuspect={suspect}
      />
      
      <View style={styles.content}>
        {showInstructions && (
          <View style={styles.instructionsCard}>
            <Text style={styles.instructionsTitle}>⚠️ Instrucciones Importantes</Text>
            <Text style={styles.instructionsText}>
              • Solo <Text style={styles.bold}>TÚ</Text> puedes ver esta situación secreta{'\n'}
              • <Text style={styles.bold}>NO</Text> la compartas con los detectives{'\n'}
              • Memoriza la situación, no podrás verla durante el interrogatorio{'\n'}
              • Los detectives tienen {maxQuestions} preguntas para descubrirla{'\n'}
              • Solo puedes responder: <Text style={styles.bold}>Sí</Text>, <Text style={styles.bold}>No</Text> o <Text style={styles.bold}>Quizás</Text>{'\n'}
              • Si no te descubren, ganas puntos
            </Text>
            <Text 
              style={styles.hideInstructions}
              onPress={() => setShowInstructions(false)}
            >
              Ocultar instrucciones
            </Text>
          </View>
        )}
        
        {currentSituation && (
          <InterrogatorioSecretCard
            situation={currentSituation}
            onUnderstood={handleUnderstood}
          />
        )}
        
        {!showInstructions && (
          <View style={styles.showInstructionsButton}>
            <Text 
              style={styles.showInstructionsText}
              onPress={() => setShowInstructions(true)}
            >
              Mostrar instrucciones
            </Text>
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
  content: {
    padding: 20,
  },
  instructionsCard: {
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionsText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
  bold: {
    fontWeight: 'bold',
    color: '#ff5722',
  },
  hideInstructions: {
    fontSize: 14,
    color: '#ff5722',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  showInstructionsButton: {
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  showInstructionsText: {
    fontSize: 14,
    color: '#ff5722',
    textDecorationLine: 'underline',
  },
});

export default ElInterrogatorioSecreto;

