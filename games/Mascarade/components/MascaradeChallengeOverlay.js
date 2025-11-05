import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet,
  Animated 
} from 'react-native';
import { CHARACTER_INFO } from '../constants/MascaradeCharacterData';

export const MascaradeChallengeOverlay = ({ 
  visible, 
  announcedCharacter,
  announcedPlayerName,
  onChallenge,
  onPass,
  timeLimit = 30,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timeLimit);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  const characterInfo = announcedCharacter ? CHARACTER_INFO[announcedCharacter] : null;
  
  useEffect(() => {
    if (visible) {
      setTimeRemaining(timeLimit);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
      
      const timer = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            if (onPass) {
              onPass();
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => {
        clearInterval(timer);
      };
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
      setTimeRemaining(timeLimit);
    }
  }, [visible, timeLimit]);
  
  if (!visible) {
    return null;
  }
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="none"
      onRequestClose={onPass}
    >
      <Animated.View style={[styles.overlay, { opacity: fadeAnim }]}>
        <View style={styles.content}>
          <Text style={styles.title}>¡Anuncio de Rol!</Text>
          
          <View style={styles.announcementContainer}>
            <Text style={styles.announcementText}>
              {announcedPlayerName} anunció:
            </Text>
            <Text style={styles.characterName}>
              "Soy el {characterInfo?.name || announcedCharacter}"
            </Text>
          </View>
          
          <View style={styles.timerContainer}>
            <Text style={styles.timerText}>
              {timeRemaining}s
            </Text>
          </View>
          
          <View style={styles.actionsContainer}>
            <TouchableOpacity
              style={[styles.button, styles.challengeButton]}
              onPress={onChallenge}
            >
              <Text style={styles.buttonText}>¡Desafiar!</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.passButton]}
              onPress={onPass}
            >
              <Text style={styles.buttonText}>Pasar</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.instruction}>
            Puedes desafiar si crees que también eres este personaje
          </Text>
        </View>
      </Animated.View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  announcementContainer: {
    alignItems: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    width: '100%',
  },
  announcementText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  characterName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  timerContainer: {
    marginBottom: 24,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF5722',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
    minHeight: 60,
    justifyContent: 'center',
  },
  challengeButton: {
    backgroundColor: '#f44336',
  },
  passButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

