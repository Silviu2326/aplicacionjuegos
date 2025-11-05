import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Datos falsos de historial de partidas
const FAKE_HISTORIAL = [
  {
    id: 1,
    fecha: '2024-11-15',
    hora: '20:30',
    ganador: { nombre: 'María García', color: '#E74C3C', quesitos: 6 },
    jugadores: [
      { nombre: 'María García', color: '#E74C3C', quesitos: 6, enCentro: true },
      { nombre: 'Carlos López', color: '#3498DB', quesitos: 4, enCentro: false },
      { nombre: 'Ana Martínez', color: '#27AE60', quesitos: 3, enCentro: false },
    ],
    modo: 'Clásico',
    duracion: '45:23',
    preguntasRespondidas: 28,
    preguntasCorrectas: 18,
    mejorRacha: 5,
  },
  {
    id: 2,
    fecha: '2024-11-14',
    hora: '18:15',
    ganador: { nombre: 'Pedro Sánchez', color: '#F39C12', quesitos: 3 },
    jugadores: [
      { nombre: 'Pedro Sánchez', color: '#F39C12', quesitos: 3, enCentro: false },
      { nombre: 'Laura Ruiz', color: '#9B59B6', quesitos: 2, enCentro: false },
      { nombre: 'David Torres', color: '#E91E63', quesitos: 1, enCentro: false },
    ],
    modo: 'Rápido',
    duracion: '22:45',
    preguntasRespondidas: 15,
    preguntasCorrectas: 12,
    mejorRacha: 4,
  },
  {
    id: 3,
    fecha: '2024-11-13',
    hora: '22:00',
    ganador: { nombre: 'Sofía Hernández', color: '#27AE60', quesitos: 6 },
    jugadores: [
      { nombre: 'Sofía Hernández', color: '#27AE60', quesitos: 6, enCentro: true },
      { nombre: 'Miguel Díaz', color: '#3498DB', quesitos: 5, enCentro: false },
      { nombre: 'Elena Fernández', color: '#E74C3C', quesitos: 4, enCentro: false },
      { nombre: 'Jorge Morales', color: '#F39C12', quesitos: 3, enCentro: false },
    ],
    modo: 'Clásico',
    duracion: '52:10',
    preguntasRespondidas: 35,
    preguntasCorrectas: 24,
    mejorRacha: 6,
  },
  {
    id: 4,
    fecha: '2024-11-12',
    hora: '16:45',
    ganador: { nombre: 'Lucía Jiménez', color: '#9B59B6', quesitos: 6 },
    jugadores: [
      { nombre: 'Lucía Jiménez', color: '#9B59B6', quesitos: 6, enCentro: true },
      { nombre: 'Roberto Castro', color: '#E74C3C', quesitos: 5, enCentro: false },
    ],
    modo: 'Clásico',
    duracion: '38:20',
    preguntasRespondidas: 22,
    preguntasCorrectas: 16,
    mejorRacha: 5,
  },
  {
    id: 5,
    fecha: '2024-11-11',
    hora: '19:30',
    ganador: { nombre: 'Isabel Moreno', color: '#E91E63', quesitos: 3 },
    jugadores: [
      { nombre: 'Isabel Moreno', color: '#E91E63', quesitos: 3, enCentro: false },
      { nombre: 'Fernando Gutiérrez', color: '#3498DB', quesitos: 2, enCentro: false },
      { nombre: 'Carmen Delgado', color: '#F39C12', quesitos: 2, enCentro: false },
      { nombre: 'Antonio Navarro', color: '#27AE60', quesitos: 1, enCentro: false },
    ],
    modo: 'Rápido',
    duracion: '28:15',
    preguntasRespondidas: 18,
    preguntasCorrectas: 14,
    mejorRacha: 3,
  },
  {
    id: 6,
    fecha: '2024-11-10',
    hora: '14:20',
    ganador: { nombre: 'Patricia Vega', color: '#F39C12', quesitos: 6 },
    jugadores: [
      { nombre: 'Patricia Vega', color: '#F39C12', quesitos: 6, enCentro: true },
      { nombre: 'Alejandro Ramírez', color: '#3498DB', quesitos: 4, enCentro: false },
      { nombre: 'Mónica Ortega', color: '#E74C3C', quesitos: 3, enCentro: false },
      { nombre: 'Sergio Molina', color: '#27AE60', quesitos: 2, enCentro: false },
      { nombre: 'Rosa Serrano', color: '#9B59B6', quesitos: 1, enCentro: false },
    ],
    modo: 'Clásico',
    duracion: '61:45',
    preguntasRespondidas: 42,
    preguntasCorrectas: 28,
    mejorRacha: 7,
  },
  {
    id: 7,
    fecha: '2024-11-09',
    hora: '21:00',
    ganador: { nombre: 'Daniel Herrera', color: '#3498DB', quesitos: 3 },
    jugadores: [
      { nombre: 'Daniel Herrera', color: '#3498DB', quesitos: 3, enCentro: false },
      { nombre: 'Natalia Iglesias', color: '#E91E63', quesitos: 2, enCentro: false },
      { nombre: 'Manuel Campos', color: '#F39C12', quesitos: 1, enCentro: false },
    ],
    modo: 'Rápido',
    duracion: '25:30',
    preguntasRespondidas: 16,
    preguntasCorrectas: 13,
    mejorRacha: 4,
  },
  {
    id: 8,
    fecha: '2024-11-08',
    hora: '17:30',
    ganador: { nombre: 'Cristina Peña', color: '#9B59B6', quesitos: 6 },
    jugadores: [
      { nombre: 'Cristina Peña', color: '#9B59B6', quesitos: 6, enCentro: true },
      { nombre: 'Álvaro Martín', color: '#E74C3C', quesitos: 5, enCentro: false },
      { nombre: 'Beatriz Ramos', color: '#27AE60', quesitos: 4, enCentro: false },
    ],
    modo: 'Clásico',
    duracion: '48:12',
    preguntasRespondidas: 30,
    preguntasCorrectas: 21,
    mejorRacha: 6,
  },
];

export const TrivialPursuitClasicoMovilHistorial = () => {
  const [filter, setFilter] = useState('todos'); // todos, clasico, rapido

  const filteredHistorial = FAKE_HISTORIAL.filter((item) => {
    if (filter === 'todos') return true;
    if (filter === 'clasico') return item.modo === 'Clásico';
    if (filter === 'rapido') return item.modo === 'Rápido';
    return true;
  });

  const totalPartidas = FAKE_HISTORIAL.length;
  const partidasClasico = FAKE_HISTORIAL.filter(p => p.modo === 'Clásico').length;
  const partidasRapido = FAKE_HISTORIAL.filter(p => p.modo === 'Rápido').length;
  
  const totalPreguntasRespondidas = FAKE_HISTORIAL.reduce((sum, item) => sum + item.preguntasRespondidas, 0);
  const totalPreguntasCorrectas = FAKE_HISTORIAL.reduce((sum, item) => sum + item.preguntasCorrectas, 0);
  const promedioAciertos = totalPartidas > 0 ? Math.round((totalPreguntasCorrectas / totalPreguntasRespondidas) * 100) : 0;
  
  const totalDuracion = FAKE_HISTORIAL.reduce((sum, item) => {
    const [minutos, segundos] = item.duracion.split(':').map(Number);
    return sum + minutos * 60 + segundos;
  }, 0);
  const horasTotales = Math.floor(totalDuracion / 3600);
  const minutosTotales = Math.floor((totalDuracion % 3600) / 60);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPartidas}</Text>
          <Text style={styles.summaryLabel}>Partidas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPreguntasCorrectas}</Text>
          <Text style={styles.summaryLabel}>Aciertos</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{promedioAciertos}%</Text>
          <Text style={styles.summaryLabel}>Precisión</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPreguntasRespondidas}</Text>
          <Text style={styles.summaryLabel}>Preguntas</Text>
        </View>
      </View>

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>⏱️ Tiempo Total Jugado</Text>
        <Text style={styles.timeSummaryValue}>
          {horasTotales}h {minutosTotales}m
        </Text>
      </View>

      <View style={styles.modosSummary}>
        <View style={styles.modoCard}>
          <Text style={styles.modoCardLabel}>📚 Clásico</Text>
          <Text style={styles.modoCardValue}>{partidasClasico}</Text>
        </View>
        <View style={styles.modoCard}>
          <Text style={styles.modoCardLabel}>⚡ Rápido</Text>
          <Text style={styles.modoCardValue}>{partidasRapido}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar partidas:</Text>
        <View style={styles.filterButtons}>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'clasico', label: 'Clásico' },
            { id: 'rapido', label: 'Rápido' },
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
              <View style={styles.ganadorBadge}>
                <View style={[styles.ganadorColor, { backgroundColor: partida.ganador.color }]} />
                <Text style={styles.ganadorBadgeText}>
                  🏆 {partida.ganador.nombre}
                </Text>
              </View>
            </View>

            <View style={styles.modoBadge}>
              <Text style={styles.modoBadgeText}>
                {partida.modo === 'Clásico' ? '📚' : '⚡'} {partida.modo}
              </Text>
            </View>

            <View style={styles.jugadoresResult}>
              {partida.jugadores.map((jugador, i) => (
                <View key={i} style={styles.jugadorResultItem}>
                  <View style={[styles.jugadorColorDot, { backgroundColor: jugador.color }]} />
                  <Text style={styles.jugadorResultNombre}>{jugador.nombre}</Text>
                  <Text style={styles.jugadorResultQuesitos}>
                    {jugador.quesitos} quesitos
                  </Text>
                  {jugador.enCentro && <Text style={styles.centroBadge}>📍</Text>}
                </View>
              ))}
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Duración</Text>
                <Text style={styles.statItemValue}>{partida.duracion}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Preguntas</Text>
                <Text style={styles.statItemValue}>{partida.preguntasRespondidas}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Racha</Text>
                <Text style={styles.statItemValue}>{partida.mejorRacha}</Text>
              </View>
            </View>

            <View style={styles.aciertosStats}>
              <View style={styles.aciertoStatItem}>
                <Text style={styles.aciertoStatLabel}>✅ Correctas</Text>
                <Text style={[styles.aciertoStatValue, styles.statSuccess]}>
                  {partida.preguntasCorrectas}
                </Text>
              </View>
              <View style={styles.aciertoStatItem}>
                <Text style={styles.aciertoStatLabel}>❌ Incorrectas</Text>
                <Text style={[styles.aciertoStatValue, styles.statError]}>
                  {partida.preguntasRespondidas - partida.preguntasCorrectas}
                </Text>
              </View>
              <View style={styles.aciertoStatItem}>
                <Text style={styles.aciertoStatLabel}>📊 Precisión</Text>
                <Text style={[styles.aciertoStatValue, styles.statInfo]}>
                  {Math.round((partida.preguntasCorrectas / partida.preguntasRespondidas) * 100)}%
                </Text>
              </View>
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
    borderColor: '#9B59B6',
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#9B59B6',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  timeSummary: {
    backgroundColor: '#9B59B6',
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
  modosSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    gap: 10,
  },
  modoCard: {
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
  modoCardLabel: {
    fontSize: 10,
    color: '#7f8c8d',
    marginBottom: 5,
    textAlign: 'center',
  },
  modoCardValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#9B59B6',
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
    backgroundColor: '#9B59B6',
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27AE60',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  ganadorColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  ganadorBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  modoBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#F4ECF7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  modoBadgeText: {
    color: '#9B59B6',
    fontSize: 11,
    fontWeight: '600',
  },
  jugadoresResult: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  jugadorResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    padding: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  jugadorColorDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  jugadorResultNombre: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
  },
  jugadorResultQuesitos: {
    fontSize: 12,
    color: '#7f8c8d',
    fontWeight: 'bold',
  },
  centroBadge: {
    fontSize: 14,
    marginLeft: 5,
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
    color: '#9B59B6',
  },
  aciertosStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 10,
  },
  aciertoStatItem: {
    alignItems: 'center',
  },
  aciertoStatLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  aciertoStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statSuccess: {
    color: '#27AE60',
  },
  statError: {
    color: '#E74C3C',
  },
  statInfo: {
    color: '#9B59B6',
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

