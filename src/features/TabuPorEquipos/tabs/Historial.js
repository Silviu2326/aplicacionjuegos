import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Datos falsos de historial de partidas
const FAKE_HISTORIAL = [
  {
    id: 1,
    fecha: '2024-11-15',
    hora: '20:30',
    equipo1: { nombre: 'Los Tigres', puntuacion: 12 },
    equipo2: { nombre: 'Las Águilas', puntuacion: 15 },
    ganador: 'Las Águilas',
    rondas: 5,
    tiempoTotal: '1:25:30',
    palabrasAdivinadas: 45,
    palabrasTabu: 8,
    palabrasPasadas: 12,
    mejorRacha: 7,
    configuracion: {
      tiempoRonda: 60,
      rondasTotales: 5,
    },
  },
  {
    id: 2,
    fecha: '2024-11-14',
    hora: '18:15',
    equipo1: { nombre: 'Equipo Rojo', puntuacion: 18 },
    equipo2: { nombre: 'Equipo Azul', puntuacion: 14 },
    ganador: 'Equipo Rojo',
    rondas: 7,
    tiempoTotal: '1:45:20',
    palabrasAdivinadas: 52,
    palabrasTabu: 5,
    palabrasPasadas: 9,
    mejorRacha: 9,
    configuracion: {
      tiempoRonda: 90,
      rondasTotales: 7,
    },
  },
  {
    id: 3,
    fecha: '2024-11-13',
    hora: '22:00',
    equipo1: { nombre: 'Los Campeones', puntuacion: 10 },
    equipo2: { nombre: 'Los Invictos', puntuacion: 22 },
    ganador: 'Los Invictos',
    rondas: 5,
    tiempoTotal: '1:15:45',
    palabrasAdivinadas: 48,
    palabrasTabu: 12,
    palabrasPasadas: 6,
    mejorRacha: 5,
    configuracion: {
      tiempoRonda: 60,
      rondasTotales: 5,
    },
  },
  {
    id: 4,
    fecha: '2024-11-12',
    hora: '16:45',
    equipo1: { nombre: 'Rápidos y Furiosos', puntuacion: 20 },
    equipo2: { nombre: 'Los Veloces', puntuacion: 20 },
    ganador: null,
    rondas: 10,
    tiempoTotal: '2:30:15',
    palabrasAdivinadas: 68,
    palabrasTabu: 10,
    palabrasPasadas: 12,
    mejorRacha: 11,
    configuracion: {
      tiempoRonda: 120,
      rondasTotales: 10,
    },
  },
  {
    id: 5,
    fecha: '2024-11-11',
    hora: '19:30',
    equipo1: { nombre: 'Los Maestros', puntuacion: 25 },
    equipo2: { nombre: 'Los Novatos', puntuacion: 8 },
    ganador: 'Los Maestros',
    rondas: 5,
    tiempoTotal: '1:20:30',
    palabrasAdivinadas: 55,
    palabrasTabu: 3,
    palabrasPasadas: 4,
    mejorRacha: 15,
    configuracion: {
      tiempoRonda: 60,
      rondasTotales: 5,
    },
  },
  {
    id: 6,
    fecha: '2024-11-10',
    hora: '14:20',
    equipo1: { nombre: 'Equipo Alpha', puntuacion: 15 },
    equipo2: { nombre: 'Equipo Beta', puntuacion: 17 },
    ganador: 'Equipo Beta',
    rondas: 7,
    tiempoTotal: '1:50:10',
    palabrasAdivinadas: 58,
    palabrasTabu: 7,
    palabrasPasadas: 11,
    mejorRacha: 8,
    configuracion: {
      tiempoRonda: 90,
      rondasTotales: 7,
    },
  },
  {
    id: 7,
    fecha: '2024-11-09',
    hora: '21:00',
    equipo1: { nombre: 'Los Intrépidos', puntuacion: 14 },
    equipo2: { nombre: 'Los Valientes', puntuacion: 16 },
    ganador: 'Los Valientes',
    rondas: 5,
    tiempoTotal: '1:18:45',
    palabrasAdivinadas: 46,
    palabrasTabu: 9,
    palabrasPasadas: 7,
    mejorRacha: 6,
    configuracion: {
      tiempoRonda: 60,
      rondasTotales: 5,
    },
  },
  {
    id: 8,
    fecha: '2024-11-08',
    hora: '17:30',
    equipo1: { nombre: 'Los Expertos', puntuacion: 19 },
    equipo2: { nombre: 'Los Principiantes', puntuacion: 11 },
    ganador: 'Los Expertos',
    rondas: 5,
    tiempoTotal: '1:22:20',
    palabrasAdivinadas: 50,
    palabrasTabu: 6,
    palabrasPasadas: 8,
    mejorRacha: 10,
    configuracion: {
      tiempoRonda: 60,
      rondasTotales: 5,
    },
  },
];

export const TabuPorEquiposHistorial = () => {
  const [filter, setFilter] = useState('todos'); // todos, ganadasEquipo1, ganadasEquipo2, empates

  const filteredHistorial = FAKE_HISTORIAL.filter((item) => {
    if (filter === 'todos') return true;
    if (filter === 'ganadasEquipo1') return item.ganador === item.equipo1.nombre;
    if (filter === 'ganadasEquipo2') return item.ganador === item.equipo2.nombre;
    if (filter === 'empates') return item.ganador === null;
    return true;
  });

  const totalPartidas = FAKE_HISTORIAL.length;
  const partidasGanadasEquipo1 = FAKE_HISTORIAL.filter(p => p.ganador === p.equipo1.nombre).length;
  const partidasGanadasEquipo2 = FAKE_HISTORIAL.filter(p => p.ganador === p.equipo2.nombre).length;
  const empates = FAKE_HISTORIAL.filter(p => p.ganador === null).length;
  
  const totalPalabrasAdivinadas = FAKE_HISTORIAL.reduce((sum, item) => sum + item.palabrasAdivinadas, 0);
  const totalPalabrasTabu = FAKE_HISTORIAL.reduce((sum, item) => sum + item.palabrasTabu, 0);
  const promedioPalabrasPorPartida = Math.round(totalPalabrasAdivinadas / totalPartidas);
  
  const totalTiempoJugado = FAKE_HISTORIAL.reduce((sum, item) => {
    const [horas, minutos, segundos] = item.tiempoTotal.split(':').map(Number);
    return sum + horas * 3600 + minutos * 60 + segundos;
  }, 0);
  const horasTotales = Math.floor(totalTiempoJugado / 3600);
  const minutosTotales = Math.floor((totalTiempoJugado % 3600) / 60);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPartidas}</Text>
          <Text style={styles.summaryLabel}>Partidas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPalabrasAdivinadas}</Text>
          <Text style={styles.summaryLabel}>Aciertos</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPalabrasTabu}</Text>
          <Text style={styles.summaryLabel}>Tabú</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{promedioPalabrasPorPartida}</Text>
          <Text style={styles.summaryLabel}>Promedio</Text>
        </View>
      </View>

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>⏱️ Tiempo Total Jugado</Text>
        <Text style={styles.timeSummaryValue}>
          {horasTotales}h {minutosTotales}m
        </Text>
      </View>

      <View style={styles.winsSummary}>
        <View style={styles.winCard}>
          <Text style={styles.winCardLabel}>🏆 Equipo 1</Text>
          <Text style={styles.winCardValue}>{partidasGanadasEquipo1}</Text>
        </View>
        <View style={styles.winCard}>
          <Text style={styles.winCardLabel}>🤝 Empates</Text>
          <Text style={styles.winCardValue}>{empates}</Text>
        </View>
        <View style={styles.winCard}>
          <Text style={styles.winCardLabel}>🏆 Equipo 2</Text>
          <Text style={styles.winCardValue}>{partidasGanadasEquipo2}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar partidas:</Text>
        <View style={styles.filterButtons}>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'ganadasEquipo1', label: 'Equipo 1' },
            { id: 'ganadasEquipo2', label: 'Equipo 2' },
            { id: 'empates', label: 'Empates' },
          ].map((filt) => (
            <TouchableOpacity
              key={filt.id}
              style={[
                styles.filterButton,
                filter === filt.id && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(filt.id)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === filt.id && styles.filterButtonTextActive,
                ]}
              >
                {filt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.historialList}>
        {filteredHistorial.map((partida) => (
          <View key={partida.id} style={styles.historialCard}>
            <View style={styles.historialHeader}>
              <View>
                <Text style={styles.historialFecha}>{partida.fecha}</Text>
                <Text style={styles.historialHora}>{partida.hora}</Text>
              </View>
              {partida.ganador ? (
                <View style={styles.ganadorBadge}>
                  <Text style={styles.ganadorBadgeText}>
                    🏆 {partida.ganador}
                  </Text>
                </View>
              ) : (
                <View style={styles.empateBadge}>
                  <Text style={styles.empateBadgeText}>🤝 Empate</Text>
                </View>
              )}
            </View>

            <View style={styles.equiposResult}>
              <View style={[
                styles.equipoResult,
                partida.ganador === partida.equipo1.nombre && styles.equipoGanador,
              ]}>
                <Text style={styles.equipoResultNombre}>{partida.equipo1.nombre}</Text>
                <Text style={styles.equipoResultPuntuacion}>{partida.equipo1.puntuacion}</Text>
              </View>
              <Text style={styles.vsText}>VS</Text>
              <View style={[
                styles.equipoResult,
                partida.ganador === partida.equipo2.nombre && styles.equipoGanador,
              ]}>
                <Text style={styles.equipoResultNombre}>{partida.equipo2.nombre}</Text>
                <Text style={styles.equipoResultPuntuacion}>{partida.equipo2.puntuacion}</Text>
              </View>
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Rondas</Text>
                <Text style={styles.statItemValue}>{partida.rondas}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Tiempo</Text>
                <Text style={styles.statItemValue}>{partida.tiempoTotal}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Racha</Text>
                <Text style={styles.statItemValue}>{partida.mejorRacha}</Text>
              </View>
            </View>

            <View style={styles.palabrasStats}>
              <View style={styles.palabraStatItem}>
                <Text style={styles.palabraStatLabel}>✅ Aciertos</Text>
                <Text style={[styles.palabraStatValue, styles.statSuccess]}>
                  {partida.palabrasAdivinadas}
                </Text>
              </View>
              <View style={styles.palabraStatItem}>
                <Text style={styles.palabraStatLabel}>🚫 Tabú</Text>
                <Text style={[styles.palabraStatValue, styles.statError]}>
                  {partida.palabrasTabu}
                </Text>
              </View>
              <View style={styles.palabraStatItem}>
                <Text style={styles.palabraStatLabel}>⏭️ Pasadas</Text>
                <Text style={[styles.palabraStatValue, styles.statWarning]}>
                  {partida.palabrasPasadas}
                </Text>
              </View>
            </View>

            <View style={styles.configInfo}>
              <Text style={styles.configInfoText}>
                ⏱️ {partida.configuracion.tiempoRonda}s por ronda • {partida.configuracion.rondasTotales} rondas
              </Text>
            </View>
          </View>
        ))}
      </View>

      {filteredHistorial.length === 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay partidas con estos filtros</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 15,
  },
  statsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#E74C3C',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  timeSummary: {
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  timeSummaryLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 5,
  },
  timeSummaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  winsSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  winCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  winCardLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    marginBottom: 5,
    textAlign: 'center',
  },
  winCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#E74C3C',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  historialList: {
    gap: 15,
  },
  historialCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 2,
    borderColor: '#ECECEC',
  },
  historialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  historialFecha: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  historialHora: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  ganadorBadge: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ganadorBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  empateBadge: {
    backgroundColor: '#F39C12',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  empateBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  equiposResult: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  equipoResult: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
  },
  equipoGanador: {
    backgroundColor: '#E8F5E9',
    borderWidth: 2,
    borderColor: '#27AE60',
  },
  equipoResultNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 5,
    textAlign: 'center',
  },
  equipoResultPuntuacion: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  vsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7f8c8d',
    paddingHorizontal: 10,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  statItem: {
    alignItems: 'center',
  },
  statItemLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  palabrasStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  palabraStatItem: {
    alignItems: 'center',
  },
  palabraStatLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  palabraStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statSuccess: {
    color: '#27AE60',
  },
  statError: {
    color: '#E74C3C',
  },
  statWarning: {
    color: '#F39C12',
  },
  configInfo: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  configInfoText: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    fontStyle: 'italic',
  },
});

