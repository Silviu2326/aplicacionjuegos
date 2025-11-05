import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { ROLES } from '../constants/BloodOnTheClocktowerRoles';

export const BloodOnTheClocktowerNightPhaseManager = ({
  nightSequence,
  currentStep,
  onActionComplete,
  onPhaseComplete,
  isStoryteller = false,
}) => {
  const [currentAction, setCurrentAction] = useState(null);

  useEffect(() => {
    if (currentStep < nightSequence.length) {
      setCurrentAction(nightSequence[currentStep]);
    } else {
      setCurrentAction(null);
    }
  }, [currentStep, nightSequence]);

  const handleActionComplete = () => {
    if (onActionComplete) {
      onActionComplete(currentStep);
    }
  };

  const handleSkipPhase = () => {
    if (onPhaseComplete) {
      onPhaseComplete();
    }
  };

  if (!currentAction) {
    return (
      <View style={styles.container}>
        <Text style={styles.completeText}>Fase nocturna completada</Text>
        <TouchableOpacity style={styles.button} onPress={handleSkipPhase}>
          <Text style={styles.buttonText}>Continuar al Día</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { player, roleId, role } = currentAction;
  const roleKey = roleId?.toUpperCase().replace(/-/g, '_');
  const roleData = ROLES[roleKey] || role;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fase Nocturna</Text>
      <Text style={styles.stepText}>
        Paso {currentStep + 1} de {nightSequence.length}
      </Text>

      <View style={styles.actionCard}>
        <Text style={styles.playerName}>{player?.name}</Text>
        <Text style={styles.roleName}>{roleData?.name || 'Desconocido'}</Text>
        
        <View style={styles.abilitySection}>
          <Text style={styles.abilityLabel}>Habilidad:</Text>
          <Text style={styles.abilityText}>{roleData?.ability || 'Sin habilidad'}</Text>
        </View>

        {isStoryteller && (
          <View style={styles.instructionsSection}>
            <Text style={styles.instructionsTitle}>Instrucciones para el Narrador:</Text>
            <Text style={styles.instructionsText}>
              Despierta a {player?.name} y permite que use su habilidad.
              {roleData?.firstNight && ' Esta es la primera noche.'}
            </Text>
          </View>
        )}

        <TouchableOpacity style={styles.completeButton} onPress={handleActionComplete}>
          <Text style={styles.completeButtonText}>Acción Completada</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.sequencePreview}>
        <Text style={styles.sequenceTitle}>Secuencia completa:</Text>
        {nightSequence.map((action, index) => {
          const actionRole = ROLES[action.roleId?.toUpperCase().replace(/-/g, '_')] || action.role;
          return (
            <View
              key={index}
              style={[
                styles.sequenceItem,
                index === currentStep && styles.currentSequenceItem,
              ]}
            >
              <Text style={styles.sequenceNumber}>{index + 1}.</Text>
              <Text style={styles.sequencePlayer}>{action.player?.name}</Text>
              <Text style={styles.sequenceRole}>{actionRole?.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#1a1a2e',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  stepText: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 20,
    textAlign: 'center',
  },
  actionCard: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  playerName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  roleName: {
    fontSize: 18,
    color: '#4caf50',
    marginBottom: 15,
    textAlign: 'center',
  },
  abilitySection: {
    backgroundColor: '#0f3460',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  abilityLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#aaa',
    marginBottom: 5,
  },
  abilityText: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
  },
  instructionsSection: {
    backgroundColor: '#0f3460',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#ffa500',
  },
  instructionsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffa500',
    marginBottom: 5,
  },
  instructionsText: {
    fontSize: 14,
    color: '#fff',
    lineHeight: 20,
  },
  completeButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  completeText: {
    fontSize: 20,
    color: '#4caf50',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  sequencePreview: {
    maxHeight: 200,
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
  },
  sequenceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  sequenceItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#0f3460',
  },
  currentSequenceItem: {
    backgroundColor: '#0f3460',
    borderRadius: 5,
    paddingLeft: 5,
  },
  sequenceNumber: {
    fontSize: 14,
    color: '#aaa',
    width: 30,
  },
  sequencePlayer: {
    fontSize: 14,
    color: '#fff',
    flex: 1,
    fontWeight: '600',
  },
  sequenceRole: {
    fontSize: 14,
    color: '#4caf50',
    flex: 1,
  },
});

