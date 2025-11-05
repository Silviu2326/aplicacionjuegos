import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const VozMisteriosaTimerBar = ({ timeRemaining, totalTime, onTimeUp }) => {
  const animatedWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (timeRemaining <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }

    const progress = timeRemaining / totalTime;
    
    Animated.timing(animatedWidth, {
      toValue: progress,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [timeRemaining, totalTime]);

  // Determinar color según el tiempo restante
  const getColor = () => {
    const percentage = timeRemaining / totalTime;
    if (percentage > 0.5) {
      return '#4caf50'; // Verde
    } else if (percentage > 0.25) {
      return '#ff9800'; // Naranja
    } else {
      return '#f44336'; // Rojo
    }
  };

  const widthInterpolate = animatedWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.timerBarContainer}>
        <Animated.View
          style={[
            styles.timerBar,
            {
              width: widthInterpolate,
              backgroundColor: getColor(),
            },
          ]}
        />
      </View>
      <Text style={styles.timerText}>
        {timeRemaining}s
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  timerBarContainer: {
    width: '100%',
    height: 20,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 5,
  },
  timerBar: {
    height: '100%',
    borderRadius: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

