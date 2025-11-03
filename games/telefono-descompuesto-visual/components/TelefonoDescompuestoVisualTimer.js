import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TelefonoDescompuestoVisualTimer = ({ 
  timeLimit, 
  onTimeUp, 
  isActive = true 
}) => {
  const [timeLeft, setTimeLeft] = useState(timeLimit);

  useEffect(() => {
    if (!isActive) return;
    
    if (timeLeft <= 0) {
      onTimeUp?.();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          onTimeUp?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isActive, onTimeUp]);

  useEffect(() => {
    setTimeLeft(timeLimit);
  }, [timeLimit]);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const isWarning = timeLeft <= 10;

  return (
    <View style={[styles.container, isWarning && styles.warning]}>
      <Text style={[styles.time, isWarning && styles.warningText]}>
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 12,
    backgroundColor: '#2196F3',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
  },
  warning: {
    backgroundColor: '#FF5722',
  },
  time: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  warningText: {
    color: '#fff',
  },
});

