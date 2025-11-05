import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const TabuPorEquiposTimer = ({ 
  timeRemaining, 
  totalTime, 
  isRunning = false,
  onComplete 
}) => {
  const progressAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning && timeRemaining > 0) {
      const progress = timeRemaining / totalTime;
      
      Animated.timing(progressAnim, {
        toValue: progress,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
  }, [timeRemaining, totalTime, isRunning]);

  useEffect(() => {
    if (timeRemaining <= 10 && timeRemaining > 0) {
      // Animación de pulso
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ])
      ).start();

      // Animación de sacudida
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      pulseAnim.setValue(1);
      shakeAnim.setValue(0);
    }
  }, [timeRemaining]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getTimerColor = () => {
    if (timeRemaining <= 10) return '#E74C3C';
    if (timeRemaining <= 30) return '#F39C12';
    return '#27AE60';
  };

  const getTimerEmoji = () => {
    if (timeRemaining <= 5) return '🔥';
    if (timeRemaining <= 10) return '⚡';
    if (timeRemaining <= 30) return '⏰';
    return '⏳';
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.timerCircle,
          { 
            transform: [
              { scale: pulseAnim },
              { translateX: shakeAnim },
            ],
            borderColor: getTimerColor(),
            backgroundColor: getTimerColor() + '15',
          },
        ]}
      >
        <Text style={styles.timerEmoji}>{getTimerEmoji()}</Text>
        <Text style={[styles.timerText, { color: getTimerColor() }]}>
          {formatTime(timeRemaining)}
        </Text>
        {timeRemaining <= 10 && (
          <Text style={[styles.warningText, { color: getTimerColor() }]}>
            ¡ÚLTIMOS SEGUNDOS!
          </Text>
        )}
      </Animated.View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { backgroundColor: getTimerColor() + '30' }]}>
          <Animated.View
            style={[
              styles.progressBarFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
                backgroundColor: getTimerColor(),
              },
            ]}
          />
        </View>
      </View>
      {!isRunning && timeRemaining > 0 && (
        <Text style={styles.pausedText}>⏸️ PAUSADO</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerCircle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  timerEmoji: {
    fontSize: 40,
    marginBottom: 8,
  },
  timerText: {
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  warningText: {
    fontSize: 11,
    fontWeight: 'bold',
    marginTop: 5,
    letterSpacing: 1,
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 5,
  },
  pausedText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    letterSpacing: 1,
  },
});

