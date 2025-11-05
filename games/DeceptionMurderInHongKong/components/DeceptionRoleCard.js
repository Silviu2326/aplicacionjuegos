import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { DECEPTION_ROLES } from '../constants/DeceptionRoles';

export const DeceptionRoleCard = ({ role, playerName }) => {
  const getRoleIcon = () => {
    if (!role) return '❓';
    const roleKey = Object.keys(DECEPTION_ROLES).find(
      key => DECEPTION_ROLES[key] === role.name?.toLowerCase()?.replace(/\s+/g, '_') ||
             DECEPTION_ROLES[key] === role.name?.toLowerCase()
    );
    
    if (role.name?.toLowerCase().includes('asesino') || role.name?.toLowerCase().includes('murderer')) {
      return '🔪';
    } else if (role.name?.toLowerCase().includes('científico') || role.name?.toLowerCase().includes('forensic')) {
      return '🔬';
    } else if (role.name?.toLowerCase().includes('investigador') || role.name?.toLowerCase().includes('investigator')) {
      return '🔍';
    } else if (role.name?.toLowerCase().includes('cómplice') || role.name?.toLowerCase().includes('accomplice')) {
      return '👥';
    } else if (role.name?.toLowerCase().includes('testigo') || role.name?.toLowerCase().includes('witness')) {
      return '👁️';
    }
    return '🎭';
  };

  const getRoleColor = () => {
    if (!role) return '#4a90e2';
    const roleName = role.name?.toLowerCase() || '';
    if (roleName.includes('asesino') || roleName.includes('murderer')) {
      return '#e74c3c';
    } else if (roleName.includes('científico') || roleName.includes('forensic')) {
      return '#2ecc71';
    } else if (roleName.includes('investigador') || roleName.includes('investigator')) {
      return '#4a90e2';
    } else if (roleName.includes('cómplice') || roleName.includes('accomplice')) {
      return '#f39c12';
    } else if (roleName.includes('testigo') || roleName.includes('witness')) {
      return '#9b59b6';
    }
    return '#4a90e2';
  };

  const roleColor = getRoleColor();
  const roleIcon = getRoleIcon();

  return (
    <View style={[styles.container, { borderColor: roleColor }]}>
      <View style={[styles.iconContainer, { backgroundColor: roleColor }]}>
        <Text style={styles.roleIcon}>{roleIcon}</Text>
      </View>
      <Text style={[styles.roleName, { color: roleColor }]}>
        {role?.name || 'Rol'}
      </Text>
      {role?.image && (
        <Image source={role.image} style={styles.roleImage} />
      )}
      <Text style={styles.roleDescription}>
        {role?.description || 'Descripción del rol'}
      </Text>
      {role?.winCondition && (
        <View style={styles.winConditionContainer}>
          <Text style={styles.winConditionLabel}>Objetivo:</Text>
          <Text style={styles.winConditionText}>
            {role.winCondition}
          </Text>
        </View>
      )}
      {playerName && (
        <View style={styles.playerNameContainer}>
          <Text style={styles.playerNameLabel}>Jugador:</Text>
          <Text style={styles.playerName}>{playerName}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 25,
    margin: 10,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    minWidth: 300,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  roleIcon: {
    fontSize: 40,
  },
  roleName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  roleImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  roleDescription: {
    fontSize: 14,
    color: '#d0d0d0',
    textAlign: 'center',
    marginBottom: 15,
    lineHeight: 20,
  },
  winConditionContainer: {
    backgroundColor: '#0f3460',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    width: '100%',
  },
  winConditionLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  winConditionText: {
    fontSize: 12,
    color: '#fff',
    lineHeight: 16,
  },
  playerNameContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
    width: '100%',
    alignItems: 'center',
  },
  playerNameLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  playerName: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: 'bold',
  },
});
