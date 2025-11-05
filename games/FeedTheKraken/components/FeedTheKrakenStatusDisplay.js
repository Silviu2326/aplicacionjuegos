import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TURN_PHASE } from '../store/feedTheKrakenStore';

export const FeedTheKrakenStatusDisplay = ({ 
  currentPhase, 
  captain, 
  lieutenant, 
  navigator,
  shipPosition 
}) => {
  const getPhaseName = (phase) => {
    const phaseNames = {
      [TURN_PHASE.CAPTAIN_SELECTION]: 'Selección de Capitán',
      [TURN_PHASE.LIEUTENANT_SELECTION]: 'Selección de Teniente',
      [TURN_PHASE.NAVIGATOR_SELECTION]: 'Selección de Navegante',
      [TURN_PHASE.CAPTAIN_CARD_PASS]: 'Capitán pasa carta',
      [TURN_PHASE.LIEUTENANT_CARD_PASS]: 'Teniente pasa carta',
      [TURN_PHASE.NAVIGATOR_CARD_PLAY]: 'Navegante juega carta',
      [TURN_PHASE.CREW_ACTIONS]: 'Acciones de la Tripulación',
      [TURN_PHASE.CAPTAIN_ACCUSATION]: 'Acusación del Capitán',
      [TURN_PHASE.VOTING]: 'Votación',
    };
    return phaseNames[phase] || 'Fase del juego';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estado del Juego</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Fase Actual</Text>
        <Text style={styles.phaseText}>{getPhaseName(currentPhase)}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Oficiales</Text>
        {captain && (
          <View style={styles.officerRow}>
            <Text style={styles.officerLabel}>👑 Capitán:</Text>
            <Text style={styles.officerName}>{captain.name}</Text>
          </View>
        )}
        {lieutenant && (
          <View style={styles.officerRow}>
            <Text style={styles.officerLabel}>⭐ Teniente:</Text>
            <Text style={styles.officerName}>{lieutenant.name}</Text>
          </View>
        )}
        {navigator && (
          <View style={styles.officerRow}>
            <Text style={styles.officerLabel}>🧭 Navegante:</Text>
            <Text style={styles.officerName}>{navigator.name}</Text>
          </View>
        )}
        {!lieutenant && (
          <Text style={styles.waitingText}>Esperando selección de oficiales...</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Posición del Barco</Text>
        <View style={styles.positionIndicator}>
          <View style={styles.positionBar}>
            <View 
              style={[
                styles.positionMarker, 
                { 
                  left: `${((shipPosition + 5) / 10) * 100}%`,
                  backgroundColor: shipPosition > 0 ? '#4a90e2' : shipPosition < 0 ? '#f5a623' : '#666',
                }
              ]} 
            />
          </View>
          <View style={styles.positionLabels}>
            <Text style={styles.positionLabelLeft}>Corsarios (-5)</Text>
            <Text style={styles.positionLabelCenter}>Inicio (0)</Text>
            <Text style={styles.positionLabelRight}>Bluewater (+5)</Text>
          </View>
        </View>
        <Text style={styles.positionValue}>Posición: {shipPosition}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  phaseText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 10,
    backgroundColor: '#0f1626',
    borderRadius: 8,
  },
  officerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#0f1626',
    borderRadius: 6,
  },
  officerLabel: {
    fontSize: 14,
    color: '#ccc',
    marginRight: 10,
  },
  officerName: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
  waitingText: {
    fontSize: 14,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
    padding: 10,
  },
  positionIndicator: {
    marginVertical: 10,
  },
  positionBar: {
    height: 30,
    backgroundColor: '#0f1626',
    borderRadius: 15,
    position: 'relative',
    marginBottom: 10,
  },
  positionMarker: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    top: 0,
    transform: [{ translateX: -15 }],
    borderWidth: 3,
    borderColor: '#fff',
  },
  positionLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  positionLabelLeft: {
    fontSize: 12,
    color: '#f5a623',
  },
  positionLabelCenter: {
    fontSize: 12,
    color: '#888',
  },
  positionLabelRight: {
    fontSize: 12,
    color: '#4a90e2',
  },
  positionValue: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },
});

