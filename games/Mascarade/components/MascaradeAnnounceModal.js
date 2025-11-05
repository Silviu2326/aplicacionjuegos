import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Modal, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView,
  FlatList 
} from 'react-native';
import { CHARACTER_INFO, MASCARADE_CHARACTERS } from '../constants/MascaradeCharacterData';

export const MascaradeAnnounceModal = ({ 
  visible, 
  onClose, 
  onSelectCharacter,
  availableCharacters = [],
}) => {
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  
  const handleSelect = (character) => {
    setSelectedCharacter(character);
  };
  
  const handleConfirm = () => {
    if (selectedCharacter && onSelectCharacter) {
      onSelectCharacter(selectedCharacter);
      setSelectedCharacter(null);
      onClose();
    }
  };
  
  const handleCancel = () => {
    setSelectedCharacter(null);
    onClose();
  };
  
  const charactersToShow = availableCharacters.length > 0 
    ? availableCharacters 
    : Object.values(MASCARADE_CHARACTERS);
  
  const renderCharacter = ({ item }) => {
    const characterInfo = CHARACTER_INFO[item];
    const isSelected = selectedCharacter === item;
    
    return (
      <TouchableOpacity
        style={[
          styles.characterItem,
          isSelected && styles.characterItemSelected
        ]}
        onPress={() => handleSelect(item)}
      >
        <View style={[styles.characterColor, { backgroundColor: characterInfo?.color || '#666' }]} />
        <View style={styles.characterInfo}>
          <Text style={styles.characterName}>{characterInfo?.name || item}</Text>
          <Text style={styles.characterPower}>{characterInfo?.power || ''}</Text>
        </View>
        {isSelected && (
          <Text style={styles.checkmark}>✓</Text>
        )}
      </TouchableOpacity>
    );
  };
  
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={handleCancel}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Anunciar Rol</Text>
          <Text style={styles.modalSubtitle}>
            Selecciona el personaje que quieres anunciar
          </Text>
          
          <FlatList
            data={charactersToShow}
            renderItem={renderCharacter}
            keyExtractor={(item) => item}
            style={styles.charactersList}
            contentContainerStyle={styles.charactersListContent}
          />
          
          <View style={styles.modalActions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.button, 
                styles.confirmButton,
                !selectedCharacter && styles.buttonDisabled
              ]}
              onPress={handleConfirm}
              disabled={!selectedCharacter}
            >
              <Text style={styles.buttonText}>Confirmar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  charactersList: {
    maxHeight: 400,
  },
  charactersListContent: {
    paddingBottom: 10,
  },
  characterItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  characterItemSelected: {
    borderColor: '#4CAF50',
    backgroundColor: '#E8F5E9',
  },
  characterColor: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  characterPower: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  checkmark: {
    fontSize: 24,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  button: {
    flex: 1,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  cancelButton: {
    backgroundColor: '#f44336',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

