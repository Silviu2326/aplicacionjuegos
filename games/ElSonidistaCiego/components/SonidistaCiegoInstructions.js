import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ScrollView } from 'react-native';

export const SonidistaCiegoInstructions = ({ visible, onClose }) => {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Instrucciones del Juego</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Descripción General</Text>
              <Text style={styles.text}>
                El Sonidista Ciego es un juego de fiesta social y creativo diseñado para grupos
                de tres o más jugadores. El objetivo principal es adivinar un escenario secreto
                basándose únicamente en los sonidos creados por los demás participantes.
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Instrucciones Paso a Paso</Text>
              
              <View style={styles.step}>
                <Text style={styles.stepNumber}>1.</Text>
                <Text style={styles.stepText}>
                  Reúnan al grupo (mínimo 3 jugadores) y abran la aplicación del juego.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>2.</Text>
                <Text style={styles.stepText}>
                  Nombren al primer jugador que será 'El Sonidista Ciego'. Este jugador debe cerrar
                  los ojos o usar un antifaz.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>3.</Text>
                <Text style={styles.stepText}>
                  El resto de los jugadores, los 'Sonidistas Ayudantes', pulsan 'Empezar Ronda' en
                  el móvil.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>4.</Text>
                <Text style={styles.stepText}>
                  La aplicación mostrará un escenario secreto en la pantalla, visible solo para
                  los Ayudantes (ej: 'Un circo').
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>5.</Text>
                <Text style={styles.stepText}>
                  En orden, cada Ayudante hace un único sonido relacionado con el escenario. Por
                  ejemplo, el rugido de un león, la música del carrusel, los aplausos del público,
                  etc. Es importante no hablar.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>6.</Text>
                <Text style={styles.stepText}>
                  Después de que todos los Ayudantes hayan hecho su sonido, el Sonidista Ciego
                  abre los ojos y tiene un intento para adivinar el escenario.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>7.</Text>
                <Text style={styles.stepText}>
                  Si el Sonidista Ciego adivina correctamente, se pulsa el botón 'Acierto' y gana
                  un punto. Si falla, se pulsa 'Fallo' y el equipo de Ayudantes gana un punto.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>8.</Text>
                <Text style={styles.stepText}>
                  La aplicación pasa a la pantalla de puntuación y el rol de Sonidista Ciego rota
                  al siguiente jugador de la lista.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>9.</Text>
                <Text style={styles.stepText}>
                  El juego continúa durante un número predefinido de rondas o hasta que los
                  jugadores decidan terminar.
                </Text>
              </View>

              <View style={styles.step}>
                <Text style={styles.stepNumber}>10.</Text>
                <Text style={styles.stepText}>
                  Al final, el jugador con la puntuación más alta es declarado el ganador.
                </Text>
              </View>
            </View>
          </ScrollView>

          <TouchableOpacity style={styles.closeButtonLarge} onPress={onClose}>
            <Text style={styles.closeButtonLargeText}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    width: '90%',
    maxHeight: '90%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  step: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  stepNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722',
    marginRight: 10,
    minWidth: 25,
  },
  stepText: {
    flex: 1,
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  closeButtonLarge: {
    backgroundColor: '#2196f3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    margin: 20,
  },
  closeButtonLargeText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

