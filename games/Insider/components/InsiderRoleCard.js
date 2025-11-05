import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { ROLES } from '../constants/insiderGameConfig';

export const InsiderRoleCard = ({ visible, role, word, playerName, onClose }) => {
  const getRoleInfo = () => {
    switch (role) {
      case ROLES.GUIDE:
        return {
          title: 'Eres el Guía',
          emoji: '👑',
          description: 'Conoces la palabra secreta. Tu objetivo es responder preguntas de sí/no para ayudar a los demás a adivinar la palabra, pero sin ser demasiado obvio.',
          wordLabel: 'La palabra secreta es:',
          showWord: true,
        };
      case ROLES.INSIDER:
        return {
          title: 'Eres el Infiltrado',
          emoji: '🎭',
          description: 'También conoces la palabra secreta, pero debes ocultarlo. Tu objetivo es dirigir sutilmente las preguntas hacia la respuesta correcta sin que los demás se den cuenta de que ya sabías la palabra.',
          wordLabel: 'La palabra secreta es:',
          showWord: true,
        };
      case ROLES.CITIZEN:
        return {
          title: 'Eres un Ciudadano',
          emoji: '👤',
          description: 'No conoces la palabra secreta. Tu objetivo es hacer preguntas de sí/no al Guía para adivinar la palabra, y luego identificar quién es el Infiltrado.',
          wordLabel: null,
          showWord: false,
        };
      default:
        return {
          title: 'Rol desconocido',
          emoji: '❓',
          description: '',
          wordLabel: null,
          showWord: false,
        };
    }
  };

  const roleInfo = getRoleInfo();

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.emoji}>{roleInfo.emoji}</Text>
          <Text style={styles.title}>{roleInfo.title}</Text>
          
          {playerName && (
            <Text style={styles.playerName}>{playerName}</Text>
          )}
          
          <Text style={styles.description}>{roleInfo.description}</Text>
          
          {roleInfo.showWord && word && (
            <View style={styles.wordContainer}>
              <Text style={styles.wordLabel}>{roleInfo.wordLabel}</Text>
              <Text style={styles.secretWord}>{word}</Text>
              <Text style={styles.wordHint}>
                Mantén esto en secreto. No reveles esta información a los demás jugadores.
              </Text>
            </View>
          )}
          
          {onClose && (
            <Text style={styles.closeHint}>Toca para cerrar</Text>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 30,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  emoji: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  playerName: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 25,
  },
  wordContainer: {
    width: '100%',
    backgroundColor: '#E8F5E9',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  wordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
  },
  secretWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 10,
    textAlign: 'center',
  },
  wordHint: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  closeHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 20,
    fontStyle: 'italic',
  },
});

