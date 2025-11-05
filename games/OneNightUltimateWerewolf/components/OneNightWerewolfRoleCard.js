import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ROLE_INFO } from '../constants/OneNightWerewolfRoles';

export const OneNightWerewolfRoleCard = ({ role, showDescription = true, style }) => {
  if (!role) return null;
  
  const roleInfo = ROLE_INFO[role];
  if (!roleInfo) return null;
  
  const getTeamColor = (team) => {
    switch (team) {
      case 'werewolf':
        return '#8B0000';
      case 'village':
        return '#4CAF50';
      case 'tanner':
        return '#FF9800';
      default:
        return '#757575';
    }
  };
  
  return (
    <View style={[styles.container, { borderColor: getTeamColor(roleInfo.team) }, style]}>
      <View style={[styles.header, { backgroundColor: getTeamColor(roleInfo.team) }]}>
        <Text style={styles.roleName}>{roleInfo.name}</Text>
        <Text style={styles.teamText}>{roleInfo.team === 'werewolf' ? 'Lobo' : roleInfo.team === 'village' ? 'Aldea' : 'Curtidor'}</Text>
      </View>
      
      {showDescription && (
        <View style={styles.body}>
          <Text style={styles.description}>{roleInfo.description}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 3,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 200,
    margin: 8,
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  roleName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  teamText: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.9,
  },
  body: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    textAlign: 'center',
  },
});

