import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ROLES } from '../constants/BloodOnTheClocktowerRoles';

export const BloodOnTheClocktowerRoleInfoModal = ({ visible, onClose, roleId, playerName }) => {
  if (!roleId) return null;
  
  const roleKey = roleId.toUpperCase().replace(/-/g, '_');
  const role = ROLES[roleKey];
  
  if (!role) return null;
  
  const getAlignmentColor = (alignment) => {
    switch (alignment) {
      case 'good':
        return '#4caf50';
      case 'evil':
        return '#f44336';
      default:
        return '#666';
    }
  };
  
  const getTeamName = (team) => {
    switch (team) {
      case 'townsfolk':
        return 'Aldeano';
      case 'outsider':
        return 'Forastero';
      case 'minion':
        return 'Esbirro';
      case 'demon':
        return 'Demonio';
      default:
        return 'Desconocido';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>{role.name}</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.content}>
            {playerName && (
              <Text style={styles.playerName}>Jugador: {playerName}</Text>
            )}
            
            <View style={styles.infoSection}>
              <View
                style={[
                  styles.alignmentBadge,
                  { backgroundColor: getAlignmentColor(role.alignment) },
                ]}
              >
                <Text style={styles.alignmentText}>
                  {role.alignment === 'good' ? 'Equipo del Bien' : 'Equipo del Mal'}
                </Text>
              </View>
              
              <View style={styles.teamBadge}>
                <Text style={styles.teamText}>{getTeamName(role.team)}</Text>
              </View>
            </View>
            
            <View style={styles.abilitySection}>
              <Text style={styles.abilityTitle}>Habilidad:</Text>
              <Text style={styles.abilityText}>{role.ability}</Text>
            </View>
            
            <View style={styles.timingSection}>
              <Text style={styles.timingTitle}>Cuándo actúas:</Text>
              <Text style={styles.timingText}>
                {role.firstNight && 'Primera noche'}
                {role.firstNight && role.otherNights && ', '}
                {role.otherNights && 'Otras noches'}
                {!role.firstNight && !role.otherNights && 'Solo durante el día'}
              </Text>
            </View>
            
            {role.nameEn && (
              <View style={styles.nameSection}>
                <Text style={styles.nameEnText}>Nombre en inglés: {role.nameEn}</Text>
              </View>
            )}
          </ScrollView>
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
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 15,
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
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
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  infoSection: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  alignmentBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  alignmentText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  teamBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#2196F3',
  },
  teamText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  abilitySection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
  },
  abilityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  abilityText: {
    fontSize: 15,
    color: '#666',
    lineHeight: 22,
  },
  timingSection: {
    marginBottom: 15,
  },
  timingTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  timingText: {
    fontSize: 14,
    color: '#666',
  },
  nameSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  nameEnText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
});

