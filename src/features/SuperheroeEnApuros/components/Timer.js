import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const SuperheroeEnApurosTimer = ({ 
  timeRemaining, 
  totalTime, 
  isRunning = false,
  onComplete 
}) => {
  const progressAnim = useRef(new Animated.Value(1)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

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
    } else {
      pulseAnim.setValue(1);
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
    if (timeRemaining <= 10) return '🔥';
    if (timeRemaining <= 30) return '⏰';
    return '⏳';
  };

  const circumference = 2 * Math.PI * 50;
  const strokeDashoffset = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.timerCircle,
          { 
            transform: [{ scale: pulseAnim }],
            borderColor: getTimerColor(),
          },
        ]}
      >
        <Text style={styles.timerEmoji}>{getTimerEmoji()}</Text>
        <Text style={[styles.timerText, { color: getTimerColor() }]}>
          {formatTime(timeRemaining)}
        </Text>
        {timeRemaining <= 10 && (
          <Text style={[styles.warningText, { color: getTimerColor() }]}>
            ¡Rápido!
          </Text>
        )}
      </Animated.View>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { backgroundColor: getTimerColor() + '20' }]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  timerEmoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  timerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  warningText: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  progressBarContainer: {
    width: '100%',
    marginTop: 15,
    paddingHorizontal: 20,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
});

