import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import { ROLES } from '../constants/hombreLoboCastronegroRoles';

export const HombreLoboCastronegroRoleCard = ({ visible, roleId, onClose }) => {
  if (!roleId) return null;
  
  // Convertir ID a clave del objeto ROLES (ej: 'hombre_lobo' -> 'HOMBRE_LOBO')
  const roleKey = roleId.toUpperCase().replace(/-/g, '_');
  const role = ROLES[roleKey];
  
  if (!role) return null;

  const alignmentColor = role.alignment === 'good' ? '#4caf50' : role.alignment === 'evil' ? '#f44336' : '#FFA500';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.cardContainer}>
          <View style={[styles.header, { backgroundColor: alignmentColor }]}>
            <Text style={styles.roleIcon}>{role.icon || '🎭'}</Text>
            <Text style={styles.roleName}>{role.name}</Text>
            <Text style={styles.alignment}>
              {role.alignment === 'good' ? 'Bueno' : role.alignment === 'evil' ? 'Malvado' : 'Neutral'}
            </Text>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.description}>{role.description}</Text>
            
            <View style={styles.abilitySection}>
              <Text style={styles.abilityTitle}>Habilidad:</Text>
              <Text style={styles.abilityText}>{role.ability}</Text>
            </View>
            
            <View style={styles.objectiveSection}>
              <Text style={styles.objectiveTitle}>Objetivo:</Text>
              <Text style={styles.objectiveText}>
                {role.winCondition || (role.alignment === 'good' 
                  ? 'Descubrir y eliminar a todos los Hombres Lobo.'
                  : role.alignment === 'evil'
                  ? 'Eliminar a suficientes aldeanos para igualar o superar su número.'
                  : 'Sobrevivir y cumplir tu objetivo especial.')}
              </Text>
            </View>
            
            {role.nightAction && (
              <View style={styles.nightActionBadge}>
                <Text style={styles.nightActionText}>
                  🌙 Tiene acción nocturna
                </Text>
              </View>
            )}
          </View>
          
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  cardContainer: {
    backgroundColor: '#1a1a2e',
    borderRadius: 20,
    width: '100%',
    maxWidth: 400,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  roleIcon: {
    fontSize: 48,
    marginBottom: 10,
  },
  roleName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  alignment: {
    fontSize: 18,
    color: '#fff',
    fontWeight: '600',
  },
  content: {
    padding: 20,
  },
  description: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  abilitySection: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
  },
  abilityTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
    marginBottom: 10,
  },
  abilityText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  objectiveSection: {
    padding: 15,
    backgroundColor: '#16213e',
    borderRadius: 10,
  },
  objectiveTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFA500',
    marginBottom: 10,
  },
  objectiveText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  nightActionBadge: {
    backgroundColor: '#16213e',
    padding: 10,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  nightActionText: {
    fontSize: 14,
    color: '#FFD700',
    fontWeight: '600',
  },
  closeButton: {
    backgroundColor: '#2196F3',
    padding: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

