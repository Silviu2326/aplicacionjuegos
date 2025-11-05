import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';

export const OneNightWerewolfTimer = ({ onTimeUp }) => {
  const timeRemaining = useOneNightWerewolfStore((state) => state.discussionTimeRemaining);
  const discussionStarted = useOneNightWerewolfStore((state) => state.discussionStarted);
  
  const [displayTime, setDisplayTime] = useState(timeRemaining);
  
  useEffect(() => {
    setDisplayTime(timeRemaining);
  }, [timeRemaining]);
  
  useEffect(() => {
    if (!discussionStarted) return;
    
    if (displayTime <= 0) {
      if (onTimeUp) {
        onTimeUp();
      }
      return;
    }
    
    const interval = setInterval(() => {
      setDisplayTime((prev) => {
        if (prev <= 1) {
          if (onTimeUp) {
            onTimeUp();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [discussionStarted, displayTime, onTimeUp]);
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getColor = () => {
    if (displayTime > 180) return '#4CAF50'; // Verde
    if (displayTime > 60) return '#FF9800'; // Naranja
    return '#F44336'; // Rojo
  };
  
  if (!discussionStarted) return null;
  
  return (
    <View style={styles.container}>
      <View style={[styles.timerCircle, { borderColor: getColor() }]}>
        <Text style={[styles.timerText, { color: getColor() }]}>
          {formatTime(displayTime)}
        </Text>
      </View>
      <Text style={styles.label}>Tiempo restante</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  timerText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    fontWeight: '600',
  },
});

