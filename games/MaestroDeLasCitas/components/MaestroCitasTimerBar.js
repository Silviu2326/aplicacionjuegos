import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const MaestroCitasTimerBar = ({ timeRemaining, totalTime }) => {
  if (totalTime === 0) return null;
  
  const percentage = (timeRemaining / totalTime) * 100;
  const animatedWidth = useRef(new Animated.Value(percentage)).current;
  
  useEffect(() => {
    Animated.timing(animatedWidth, {
      toValue: percentage,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [percentage]);
  
  // Color según tiempo restante
  const getBarColor = () => {
    if (percentage > 60) return '#4caf50'; // Verde
    if (percentage > 30) return '#ff9800'; // Naranja
    if (percentage > 10) return '#ff5722'; // Naranja oscuro
    return '#f44336'; // Rojo
  };
  
  const getTimerTextColor = () => {
    if (percentage > 60) return '#4caf50';
    if (percentage > 30) return '#ff9800';
    if (percentage > 10) return '#ff5722';
    return '#f44336';
  };
  
  const isLowTime = percentage <= 10;
  
  return (
    <View style={styles.container}>
      <View style={styles.timerInfo}>
        <View style={[styles.timerCircle, isLowTime && styles.timerCircleWarning]}>
          <Text style={[styles.timerText, { color: getTimerTextColor() }]}>
            {timeRemaining}s
          </Text>
        </View>
        {isLowTime && (
          <Text style={styles.warningText}>¡Tiempo limitado!</Text>
        )}
      </View>
      <View style={styles.barContainer}>
        <Animated.View 
          style={[
            styles.bar, 
            { 
              width: animatedWidth.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
              backgroundColor: getBarColor(),
            }
          ]} 
        />
        <View style={styles.barGlow} />
      </View>
      <View style={styles.timeLabels}>
        <Text style={styles.timeLabel}>0s</Text>
        <Text style={styles.timeLabel}>{totalTime}s</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  timerInfo: {
    alignItems: 'center',
    marginBottom: 12,
  },
  timerCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#f5f5f5',
    borderWidth: 3,
    borderColor: '#2196f3',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timerCircleWarning: {
    borderColor: '#f44336',
    backgroundColor: '#ffebee',
  },
  timerText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#2196f3',
  },
  warningText: {
    fontSize: 12,
    color: '#f44336',
    fontWeight: '600',
    marginTop: 5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  barContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  bar: {
    height: '100%',
    borderRadius: 6,
  },
  barGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 6,
  },
  timeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    paddingHorizontal: 2,
  },
  timeLabel: {
    fontSize: 10,
    color: '#999',
    fontWeight: '500',
  },
});

