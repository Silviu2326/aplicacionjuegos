import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, Animated } from 'react-native';
import { EventosLineaTiempoConfusa } from '../constants/EventosLineaTiempoConfusa';
import { LineaDeTiempoConfusaTarjetaEvento } from '../components/TarjetaEvento';
import { LineaDeTiempoConfusaHUD } from '../components/HUD';
import { LineaDeTiempoConfusaContenedor } from '../components/ContenedorLineaTiempo';

export const LineaDeTiempoConfusaJugar = () => {
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentRound, setCurrentRound] = useState(0);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [difficulty, setDifficulty] = useState('normal'); // facil, normal, dificil
  const [gameStatus, setGameStatus] = useState('idle'); // idle, playing, result
  const [fadeAnim] = useState(new Animated.Value(1));
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('success'); // success, error

  useEffect(() => {
    if (gameStatus === 'idle' || gameStatus === 'result') {
      loadNewRound();
    }
  }, [currentRound, difficulty]);

  const loadNewRound = () => {
    let numEvents = 3;
    if (difficulty === 'facil') numEvents = 3;
    else if (difficulty === 'normal') numEvents = 4;
    else if (difficulty === 'dificil') numEvents = 5;

    const allCategories = Object.keys(EventosLineaTiempoConfusa);
    const randomCategory = allCategories[Math.floor(Math.random() * allCategories.length)];
    const categoryEvents = EventosLineaTiempoConfusa[randomCategory];

    // Seleccionar eventos aleatorios
    const shuffled = [...categoryEvents].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numEvents);
    
    // Ordenar por fecha para obtener el orden correcto
    const sorted = [...selected].sort((a, b) => a.ano - b.ano);
    
    setCurrentEvents(selected);
    setSelectedOrder([]);
    setGameStatus('playing');
    setShowFeedback(false);
  };

  const handleCardSelect = (eventId) => {
    if (selectedOrder.includes(eventId)) {
      // Remover si ya está seleccionado
      setSelectedOrder(selectedOrder.filter(id => id !== eventId));
    } else {
      // Agregar al final si hay espacio
      if (selectedOrder.length < currentEvents.length) {
        setSelectedOrder([...selectedOrder, eventId]);
      }
    }
  };

  const handleConfirmOrder = () => {
    if (selectedOrder.length !== currentEvents.length) {
      Alert.alert('Completa el orden', 'Debes ordenar todos los eventos antes de confirmar.');
      return;
    }

    // Verificar si el orden es correcto
    const correctOrder = [...currentEvents].sort((a, b) => a.ano - b.ano).map(e => e.id);
    const isCorrect = JSON.stringify(selectedOrder) === JSON.stringify(correctOrder);

    if (isCorrect) {
      // Respuesta correcta
      setScore(score + 1);
      setFeedbackMessage('¡Correcto! 🎉');
      setFeedbackType('success');
      showFeedbackAnimation();
    } else {
      // Respuesta incorrecta
      const newLives = lives - 1;
      setLives(newLives);
      setFeedbackMessage('Incorrecto. Pierdes una vida ❌');
      setFeedbackType('error');
      showFeedbackAnimation();

      if (newLives <= 0) {
        // Game over
        setTimeout(() => {
          Alert.alert(
            '¡Fin del juego!',
            `Tu puntuación final: ${score} puntos\n¿Quieres jugar de nuevo?`,
            [
              { text: 'Cancelar', style: 'cancel' },
              {
                text: 'Jugar de nuevo',
                onPress: () => {
                  setScore(0);
                  setLives(3);
                  setCurrentRound(0);
                  loadNewRound();
                },
              },
            ]
          );
        }, 1500);
        return;
      }
    }

    setGameStatus('result');
    setTimeout(() => {
      setCurrentRound(currentRound + 1);
      setGameStatus('idle');
    }, 2500);
  };

  const showFeedbackAnimation = () => {
    setShowFeedback(true);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.delay(1500),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowFeedback(false);
      fadeAnim.setValue(1);
    });
  };

  const handleReset = () => {
    setScore(0);
    setLives(3);
    setCurrentRound(0);
    setSelectedOrder([]);
    loadNewRound();
  };

  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    handleReset();
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <LineaDeTiempoConfusaHUD 
        score={score} 
        lives={lives} 
        round={currentRound + 1}
        difficulty={difficulty}
        onDifficultyChange={handleDifficultyChange}
      />

      {showFeedback && (
        <Animated.View 
          style={[
            styles.feedbackContainer,
            { opacity: fadeAnim },
            feedbackType === 'success' ? styles.feedbackSuccess : styles.feedbackError,
          ]}
        >
          <Text style={styles.feedbackText}>{feedbackMessage}</Text>
        </Animated.View>
      )}

      {currentEvents.length > 0 && (
        <>
          <View style={styles.gameArea}>
            <Text style={styles.sectionTitle}>Ordena los eventos (del más antiguo al más reciente)</Text>
            
            <LineaDeTiempoConfusaContenedor
              events={currentEvents}
              selectedOrder={selectedOrder}
              onCardSelect={handleCardSelect}
            />

            <View style={styles.cardsContainer}>
              <Text style={styles.cardsTitle}>Eventos disponibles:</Text>
              <View style={styles.cardsGrid}>
                {currentEvents.map((event) => {
                  const isSelected = selectedOrder.includes(event.id);
                  const position = selectedOrder.indexOf(event.id);
                  return (
                    <LineaDeTiempoConfusaTarjetaEvento
                      key={event.id}
                      event={event}
                      isSelected={isSelected}
                      position={position !== -1 ? position + 1 : null}
                      onPress={() => handleCardSelect(event.id)}
                    />
                  );
                })}
              </View>
            </View>
          </View>

          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[
                styles.confirmButton,
                selectedOrder.length !== currentEvents.length && styles.confirmButtonDisabled,
              ]}
              onPress={handleConfirmOrder}
              disabled={selectedOrder.length !== currentEvents.length}
            >
              <Text style={styles.confirmButtonText}>
                Confirmar Orden ({selectedOrder.length}/{currentEvents.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reiniciar Partida</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 15,
  },
  gameArea: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  cardsContainer: {
    marginTop: 20,
  },
  cardsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionsContainer: {
    marginTop: 30,
    marginBottom: 20,
  },
  confirmButton: {
    backgroundColor: '#27ae60',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonDisabled: {
    backgroundColor: '#95a5a6',
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  feedbackContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 1000,
  },
  feedbackSuccess: {
    backgroundColor: '#27ae60',
  },
  feedbackError: {
    backgroundColor: '#e74c3c',
  },
  feedbackText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
