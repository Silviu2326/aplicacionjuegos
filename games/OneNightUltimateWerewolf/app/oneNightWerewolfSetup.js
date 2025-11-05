import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';
import { ROLES, ROLE_INFO, RECOMMENDED_ROLE_SETS, GAME_CONFIG } from '../constants/OneNightWerewolfRoles';
import { OneNightWerewolfRoleCard } from '../components/OneNightWerewolfRoleCard';

export const OneNightWerewolfSetup = ({ navigation }) => {
  const players = useOneNightWerewolfStore((state) => state.players);
  const selectedRoles = useOneNightWerewolfStore((state) => state.selectedRoles);
  const setSelectedRoles = useOneNightWerewolfStore((state) => state.setSelectedRoles);
  const startGame = useOneNightWerewolfStore((state) => state.startGame);
  
  const [localSelectedRoles, setLocalSelectedRoles] = useState(selectedRoles.length > 0 ? selectedRoles : []);
  
  const totalCardsNeeded = players.length + 3;
  
  const allAvailableRoles = Object.values(ROLES);
  
  const toggleRole = (role) => {
    const newSelection = localSelectedRoles.includes(role)
      ? localSelectedRoles.filter(r => r !== role)
      : [...localSelectedRoles, role];
    setLocalSelectedRoles(newSelection);
  };
  
  const useRecommendedRoles = () => {
    const recommended = RECOMMENDED_ROLE_SETS[players.length];
    if (recommended) {
      setLocalSelectedRoles(recommended);
    }
  };
  
  const handleStartGame = () => {
    if (localSelectedRoles.length < totalCardsNeeded) {
      Alert.alert(
        'Roles insuficientes',
        `Necesitas al menos ${totalCardsNeeded} roles (${players.length} jugadores + 3 cartas del centro)`
      );
      return;
    }
    
    setSelectedRoles(localSelectedRoles);
    
    if (startGame()) {
      if (navigation && navigation.navigate) {
        navigation.navigate('oneNightWerewolfGame');
      }
    } else {
      Alert.alert('Error', 'No se pudo iniciar el juego');
    }
  };
  
  const getTeamColor = (team) => {
    switch (team) {
      case 'werewolf': return '#8B0000';
      case 'village': return '#4CAF50';
      case 'tanner': return '#FF9800';
      default: return '#757575';
    }
  };

  const getRoleCount = (role) => {
    return localSelectedRoles.filter(r => r === role).length;
  };

  const roleCounts = {};
  localSelectedRoles.forEach(role => {
    roleCounts[role] = (roleCounts[role] || 0) + 1;
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Configuración de Partida</Text>
          <Text style={styles.subtitle}>
            Selecciona los roles que estarán en esta partida
          </Text>
        </View>
        
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Jugadores:</Text>
            <Text style={styles.infoValue}>{players.length}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Cartas del centro:</Text>
            <Text style={styles.infoValue}>3</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Total necesario:</Text>
            <Text style={[styles.infoValue, styles.infoValueHighlight]}>
              {totalCardsNeeded} roles
            </Text>
          </View>
          <View style={[styles.infoRow, styles.progressRow]}>
            <Text style={styles.infoLabel}>Seleccionados:</Text>
            <View style={styles.progressBarContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { 
                    width: `${Math.min(100, (localSelectedRoles.length / totalCardsNeeded) * 100)}%`,
                    backgroundColor: localSelectedRoles.length >= totalCardsNeeded ? '#4CAF50' : '#2196F3'
                  }
                ]}
              />
            </View>
            <Text style={styles.infoValue}>
              {localSelectedRoles.length} / {totalCardsNeeded}
            </Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.recommendedButton} onPress={useRecommendedRoles}>
          <Text style={styles.recommendedButtonIcon}>⭐</Text>
          <Text style={styles.recommendedButtonText}>
            Usar Roles Recomendados
          </Text>
          <Text style={styles.recommendedButtonSubtext}>
            Optimizado para {players.length} jugadores
          </Text>
        </TouchableOpacity>
        
        {localSelectedRoles.length > 0 && (
          <View style={styles.selectedRolesContainer}>
            <Text style={styles.sectionTitle}>
              Roles Seleccionados ({localSelectedRoles.length})
            </Text>
            <View style={styles.selectedRolesGrid}>
              {Object.entries(roleCounts).map(([role, count]) => {
                const roleInfo = ROLE_INFO[role];
                return (
                  <View key={role} style={styles.selectedRoleItem}>
                    <OneNightWerewolfRoleCard role={role} showDescription={false} />
                    {count > 1 && (
                      <View style={[styles.roleCountBadge, { backgroundColor: getTeamColor(roleInfo.team) }]}>
                        <Text style={styles.roleCountText}>×{count}</Text>
                      </View>
                    )}
                  </View>
                );
              })}
            </View>
          </View>
        )}
        
        <Text style={styles.sectionTitle}>Roles Disponibles</Text>
        <Text style={styles.sectionSubtitle}>
          Toca un rol para añadirlo o quitarlo
        </Text>
        
        <View style={styles.rolesContainer}>
          {allAvailableRoles.map((role) => {
            const isSelected = localSelectedRoles.includes(role);
            const roleInfo = ROLE_INFO[role];
            const count = getRoleCount(role);
            
            return (
              <TouchableOpacity
                key={role}
                style={[
                  styles.roleButton,
                  isSelected && styles.roleButtonSelected,
                  { borderColor: getTeamColor(roleInfo.team) },
                ]}
                onPress={() => toggleRole(role)}
              >
                <View style={styles.roleButtonContent}>
                  <View style={[styles.roleTeamIndicator, { backgroundColor: getTeamColor(roleInfo.team) }]} />
                  <Text style={[
                    styles.roleButtonText,
                    isSelected && styles.roleButtonTextSelected,
                  ]}>
                    {roleInfo.name}
                  </Text>
                  {count > 0 && (
                    <View style={styles.roleButtonCount}>
                      <Text style={styles.roleButtonCountText}>{count}</Text>
                    </View>
                  )}
                </View>
                <Text style={styles.roleButtonDescription}>
                  {roleInfo.description.substring(0, 50)}...
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
        
        <TouchableOpacity
          style={[
            styles.startButton,
            localSelectedRoles.length < totalCardsNeeded && styles.startButtonDisabled,
          ]}
          onPress={handleStartGame}
          disabled={localSelectedRoles.length < totalCardsNeeded}
        >
          <Text style={styles.startButtonText}>Iniciar Partida</Text>
          <Text style={styles.startButtonSubtext}>
            {localSelectedRoles.length >= totalCardsNeeded
              ? '¡Todo listo! Comienza la noche...'
              : `Faltan ${totalCardsNeeded - localSelectedRoles.length} rol${totalCardsNeeded - localSelectedRoles.length > 1 ? 'es' : ''}`}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressRow: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#BBDEFB',
  },
  infoLabel: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  infoValueHighlight: {
    fontSize: 16,
    color: '#0D47A1',
  },
  progressBarContainer: {
    flex: 1,
    height: 8,
    backgroundColor: '#BBDEFB',
    borderRadius: 4,
    marginHorizontal: 12,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 4,
  },
  recommendedButton: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  recommendedButtonIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  recommendedButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  recommendedButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  selectedRolesContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
  },
  selectedRolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 12,
  },
  selectedRoleItem: {
    margin: 8,
    position: 'relative',
  },
  roleCountBadge: {
    position: 'absolute',
    top: -8,
    right: -8,
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  roleCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rolesContainer: {
    marginBottom: 24,
  },
  roleButton: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 10,
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  roleButtonSelected: {
    backgroundColor: '#E8F5E9',
    borderWidth: 3,
  },
  roleButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  roleTeamIndicator: {
    width: 4,
    height: 20,
    borderRadius: 2,
    marginRight: 10,
  },
  roleButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  roleButtonTextSelected: {
    color: '#2E7D32',
  },
  roleButtonCount: {
    backgroundColor: '#2196F3',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  roleButtonCountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
  },
  roleButtonDescription: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  roleCard: {
    marginVertical: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  startButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  startButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
});

