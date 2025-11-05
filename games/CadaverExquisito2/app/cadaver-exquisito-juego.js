import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert, SafeAreaView, Animated } from 'react-native';
import { CadaverExquisitoTurnIndicator } from '../components/CadaverExquisitoTurnIndicator';
import { CadaverExquisitoInputArea } from '../components/CadaverExquisitoInputArea';
import { useCadaverExquisitoStore } from '../store/cadaverExquisitoStore';

export const CadaverExquisitoJuego = ({ navigation }) => {
  const gameStatus = useCadaverExquisitoStore((state) => state.gameStatus);
  const isGameFinished = useCadaverExquisitoStore((state) => state.isGameFinished);
  const finishGame = useCadaverExquisitoStore((state) => state.finishGame);
  const phrases = useCadaverExquisitoStore((state) => state.phrases);
  const players = useCadaverExquisitoStore((state) => state.players);
  const currentRound = useCadaverExquisitoStore((state) => state.currentRound);
  
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    if (isGameFinished() && navigation && navigation.navigate) {
      setTimeout(() => {
        navigation.navigate('cadaver-exquisito-resultados');
      }, 500);
    }
  }, [gameStatus, navigation]);

  const handlePhraseAdded = () => {
    // Verificar si el juego terminó después de agregar la frase
    const finished = useCadaverExquisitoStore.getState().isGameFinished();
    if (finished && navigation && navigation.navigate) {
      setTimeout(() => {
        navigation.navigate('cadaver-exquisito-resultados');
      }, 500);
    }
  };

  const handleFinishEarly = () => {
    if (phrases.length < 3) {
      Alert.alert(
        '⚠️ Muy pocas frases',
        `Solo tienes ${phrases.length} frase${phrases.length !== 1 ? 's' : ''}. ¿Estás seguro de que quieres finalizar?`,
        [
          {
            text: 'Continuar jugando',
            style: 'cancel',
          },
          {
            text: 'Finalizar de todas formas',
            style: 'destructive',
            onPress: () => {
              finishGame();
              if (navigation && navigation.navigate) {
                navigation.navigate('cadaver-exquisito-resultados');
              }
            },
          },
        ]
      );
      return;
    }
    
    Alert.alert(
      'Finalizar Partida',
      `Has creado ${phrases.length} frase${phrases.length !== 1 ? 's' : ''} en ${currentRound} ronda${currentRound !== 1 ? 's' : ''}. ¿Estás seguro de que deseas finalizar la partida ahora?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Finalizar',
          onPress: () => {
            finishGame();
            if (navigation && navigation.navigate) {
              navigation.navigate('cadaver-exquisito-resultados');
            }
          },
        },
      ]
    );
  };

  if (gameStatus !== 'playing') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>El juego no está en curso</Text>
          <Text style={styles.errorSubtext}>
            Por favor, configura la partida desde el inicio.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation && navigation.navigate && navigation.navigate('index')}
          >
            <Text style={styles.backButtonText}>← Volver al inicio</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const progressPercentage = players.length > 0 
    ? Math.round((phrases.length / (players.length * currentRound)) * 100)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>🎭 Cadáver Exquisito</Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${Math.min(progressPercentage, 100)}%` }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {phrases.length} frase{phrases.length !== 1 ? 's' : ''} escrita{phrases.length !== 1 ? 's' : ''}
            </Text>
          </View>
        </View>
        
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <CadaverExquisitoTurnIndicator />
          <CadaverExquisitoInputArea onPhraseAdded={handlePhraseAdded} />
          
          <View style={styles.finishSection}>
            <TouchableOpacity 
              style={styles.finishEarlyButton} 
              onPress={handleFinishEarly}
            >
              <Text style={styles.finishEarlyButtonText}>🏁 Finalizar Partida</Text>
            </TouchableOpacity>
            <Text style={styles.finishHint}>
              Puedes finalizar la partida en cualquier momento para ver la historia completa
            </Text>
          </View>
        </ScrollView>
      </Animated.View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  header: {
    backgroundColor: 'white',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 12,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 6,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorIcon: {
    fontSize: 64,
    marginBottom: 20,
  },
  errorText: {
    fontSize: 20,
    color: '#f44336',
    textAlign: 'center',
    marginBottom: 8,
    fontWeight: '600',
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  backButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  finishSection: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  finishEarlyButton: {
    backgroundColor: '#FF9800',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    shadowColor: '#FF9800',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  finishEarlyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  finishHint: {
    fontSize: 11,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});
