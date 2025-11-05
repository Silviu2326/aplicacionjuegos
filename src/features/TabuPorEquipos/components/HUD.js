import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const TabuPorEquiposHUD = ({ 
  equipo1 = { nombre: 'Equipo 1', puntuacion: 0 },
  equipo2 = { nombre: 'Equipo 2', puntuacion: 0 },
  equipoActual = 1,
  rondaActual = 1,
  rondasTotales = 5,
  palabrasAdivinadas = 0,
  palabrasTabu = 0,
  palabrasPasadas = 0,
}) => {
  const esEquipo1 = equipoActual === 1;
  const equipoEnTurno = esEquipo1 ? equipo1 : equipo2;

  return (
    <View style={styles.container}>
      <View style={styles.equiposRow}>
        <View style={[
          styles.equipoBox,
          esEquipo1 && styles.equipoBoxActive,
        ]}>
          <Text style={styles.equipoLabel}>{equipo1.nombre}</Text>
          <Text style={[
            styles.equipoPuntuacion,
            esEquipo1 && styles.equipoPuntuacionActive,
          ]}>
            {equipo1.puntuacion}
          </Text>
          {esEquipo1 && (
            <Text style={styles.turnoBadge}>▶️ EN TURNO</Text>
          )}
        </View>

        <View style={styles.vsContainer}>
          <Text style={styles.vsText}>VS</Text>
        </View>

        <View style={[
          styles.equipoBox,
          !esEquipo1 && styles.equipoBoxActive,
        ]}>
          <Text style={styles.equipoLabel}>{equipo2.nombre}</Text>
          <Text style={[
            styles.equipoPuntuacion,
            !esEquipo1 && styles.equipoPuntuacionActive,
          ]}>
            {equipo2.puntuacion}
          </Text>
          {!esEquipo1 && (
            <Text style={styles.turnoBadge}>▶️ EN TURNO</Text>
          )}
        </View>
      </View>

      <View style={styles.rondaInfo}>
        <Text style={styles.rondaText}>
          Ronda {rondaActual} de {rondasTotales}
        </Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>✅ Aciertos</Text>
          <Text style={[styles.statValue, styles.statValueSuccess]}>
            {palabrasAdivinadas}
          </Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>🚫 Tabú</Text>
          <Text style={[styles.statValue, styles.statValueError]}>
            {palabrasTabu}
          </Text>
        </View>
        
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>⏭️ Pasadas</Text>
          <Text style={[styles.statValue, styles.statValueWarning]}>
            {palabrasPasadas}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  equiposRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  equipoBox: {
    flex: 1,
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  equipoBoxActive: {
    backgroundColor: '#FFEBEE',
    borderColor: '#E74C3C',
    shadowColor: '#E74C3C',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  equipoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 5,
    textAlign: 'center',
  },
  equipoPuntuacion: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#7f8c8d',
  },
  equipoPuntuacionActive: {
    color: '#E74C3C',
    fontSize: 32,
  },
  turnoBadge: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginTop: 5,
    letterSpacing: 0.5,
  },
  vsContainer: {
    paddingHorizontal: 15,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C0392B',
    letterSpacing: 2,
  },
  rondaInfo: {
    alignItems: 'center',
    marginBottom: 15,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#ECECEC',
  },
  rondaText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    letterSpacing: 1,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ECECEC',
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginBottom: 5,
    fontWeight: '600',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  statValueSuccess: {
    color: '#27AE60',
  },
  statValueError: {
    color: '#E74C3C',
  },
  statValueWarning: {
    color: '#F39C12',
  },
});

