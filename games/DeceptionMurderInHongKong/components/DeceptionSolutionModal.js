import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { DeceptionEvidenceCard } from './DeceptionEvidenceCard';

export const DeceptionSolutionModal = ({ 
  visible, 
  onClose, 
  weapons = [], 
  clues = [],
  onSubmitSolution 
}) => {
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);

  const handleSubmit = () => {
    if (selectedWeapon && selectedClue) {
      if (onSubmitSolution) {
        onSubmitSolution(selectedWeapon, selectedClue);
      }
      setSelectedWeapon(null);
      setSelectedClue(null);
      onClose();
    }
  };

  const handleClose = () => {
    setSelectedWeapon(null);
    setSelectedClue(null);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Hacer Acusación</Text>
          <Text style={styles.subtitle}>Selecciona el Arma y la Pista Clave</Text>
          
          <ScrollView style={styles.scrollContainer}>
            <Text style={styles.sectionTitle}>Armas</Text>
            <View style={styles.cardsContainer}>
              {weapons.map((weapon, index) => (
                <DeceptionEvidenceCard
                  key={index}
                  card={weapon}
                  type="weapon"
                  isSelectable={true}
                  isSelected={selectedWeapon === weapon}
                  onPress={() => setSelectedWeapon(weapon)}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Pistas Clave</Text>
            <View style={styles.cardsContainer}>
              {clues.map((clue, index) => (
                <DeceptionEvidenceCard
                  key={index}
                  card={clue}
                  type="clue"
                  isSelectable={true}
                  isSelected={selectedClue === clue}
                  onPress={() => setSelectedClue(clue)}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!selectedWeapon || !selectedClue) && styles.submitButtonDisabled
              ]}
              onPress={handleSubmit}
              disabled={!selectedWeapon || !selectedClue}
            >
              <Text style={styles.buttonText}>Acusar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 400,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
    color: '#fff',
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
    gap: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
    gap: 10,
  },
  cancelButton: {
    backgroundColor: '#555',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  submitButton: {
    backgroundColor: '#e74c3c',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    flex: 1,
  },
  submitButtonDisabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
