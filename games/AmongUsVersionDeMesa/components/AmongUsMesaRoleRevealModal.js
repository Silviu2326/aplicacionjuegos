import React, { useEffect, useState } from 'react';
import { View, Text, Modal, StyleSheet, Animated } from 'react-native';

export const AmongUsMesaRoleRevealModal = ({ visible, role, onClose }) => {
  const [fadeAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0.5));
  
  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          tension: 50,
          friction: 7,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      fadeAnim.setValue(0);
      scaleAnim.setValue(0.5);
    }
  }, [visible]);
  
  const isImpostor = role === 'impostor';
  const backgroundColor = isImpostor ? '#d32f2f' : '#1976d2';
  const roleText = isImpostor ? 'IMPOSTOR' : 'TRIPULANTE';
  const description = isImpostor
    ? 'Tu objetivo es eliminar a los tripulantes sin ser descubierto. Puedes sabotear sistemas y eliminar jugadores.'
    : 'Tu objetivo es completar todas tus tareas o identificar y expulsar a los impostores.';
  
  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContent,
            {
              backgroundColor,
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.roleText}>{roleText}</Text>
          <View style={styles.iconContainer}>
            <Text style={styles.icon}>{isImpostor ? '👹' : '👨‍🚀'}</Text>
          </View>
          <Text style={styles.description}>{description}</Text>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  roleText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  iconContainer: {
    marginVertical: 20,
  },
  icon: {
    fontSize: 80,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
});

