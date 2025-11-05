import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Datos falsos de historial de partidas
const FAKE_HISTORIAL = [
  {
    id: 1,
    fecha: '2024-11-03',
    puntuacion: 15,
    rondas: 15,
    dificultad: 'normal',
    tiempoTotal: '12:45',
    categoria: 'Historia Antigua',
    mejorRacha: 8,
  },
  {
    id: 2,
    fecha: '2024-11-02',
    puntuacion: 22,
    rondas: 22,
    dificultad: 'facil',
    tiempoTotal: '18:30',
    categoria: 'Tecnología Móvil',
    mejorRacha: 12,
  },
  {
    id: 3,
    fecha: '2024-11-01',
    puntuacion: 8,
    rondas: 11,
    dificultad: 'dificil',
    tiempoTotal: '15:20',
    categoria: 'Exploración Espacial',
    mejorRacha: 5,
  },
  {
    id: 4,
    fecha: '2024-10-31',
    puntuacion: 19,
    rondas: 22,
    dificultad: 'normal',
    tiempoTotal: '14:10',
    categoria: 'Cultura Pop Siglo XX',
    mejorRacha: 10,
  },
  {
    id: 5,
    fecha: '2024-10-30',
    puntuacion: 31,
    rondas: 31,
    dificultad: 'facil',
    tiempoTotal: '22:05',
    categoria: 'Inventos Clave',
    mejorRacha: 18,
  },
  {
    id: 6,
    fecha: '2024-10-29',
    puntuacion: 12,
    rondas: 15,
    dificultad: 'normal',
    tiempoTotal: '11:30',
    categoria: 'Literatura',
    mejorRacha: 7,
  },
  {
    id: 7,
    fecha: '2024-10-28',
    puntuacion: 6,
    rondas: 9,
    dificultad: 'dificil',
    tiempoTotal: '10:15',
    categoria: 'Guerras Mundiales',
    mejorRacha: 4,
  },
  {
    id: 8,
    fecha: '2024-10-27',
    puntuacion: 27,
    rondas: 27,
    dificultad: 'normal',
    tiempoTotal: '19:45',
    categoria: 'Ciencia',
    mejorRacha: 15,
  },
];

export const LineaDeTiempoConfusaHistorial = () => {
  const [filter, setFilter] = useState('todos'); // todos, facil, normal, dificil

  const filteredHistorial = filter === 'todos' 
    ? FAKE_HISTORIAL 
    : FAKE_HISTORIAL.filter(item => item.dificultad === filter);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'facil': return '#27ae60';
      case 'normal': return '#f39c12';
      case 'dificil': return '#e74c3c';
      default: return '#7f8c8d';
    }
  };

  const getDifficultyLabel = (difficulty) => {
    switch (difficulty) {
      case 'facil': return 'Fácil';
      case 'normal': return 'Normal';
      case 'dificil': return 'Difícil';
      default: return difficulty;
    }
  };

  const totalPartidas = FAKE_HISTORIAL.length;
  const promedioPuntuacion = Math.round(
    FAKE_HISTORIAL.reduce((sum, item) => sum + item.puntuacion, 0) / totalPartidas
  );
  const mejorPuntuacion = Math.max(...FAKE_HISTORIAL.map(item => item.puntuacion));
  const mejorRachaGlobal = Math.max(...FAKE_HISTORIAL.map(item => item.mejorRacha));

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{totalPartidas}</Text>
          <Text style={styles.summaryLabel}>Partidas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{promedioPuntuacion}</Text>
          <Text style={styles.summaryLabel}>Promedio</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{mejorPuntuacion}</Text>
          <Text style={styles.summaryLabel}>Mejor</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{mejorRachaGlobal}</Text>
          <Text style={styles.summaryLabel}>Racha</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por dificultad:</Text>
        <View style={styles.filterButtons}>
          {['todos', 'facil', 'normal', 'dificil'].map((filt) => (
            <TouchableOpacity
              key={filt}
              style={[
                styles.filterButton,
                filter === filt && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(filt)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filter === filt && styles.filterButtonTextActive,
                ]}
              >
                {filt === 'todos' ? 'Todos' : filt === 'facil' ? 'Fácil' : filt === 'normal' ? 'Normal' : 'Difícil'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.historialList}>
        {filteredHistorial.map((partida) => (
          <View key={partida.id} style={styles.historialCard}>
            <View style={styles.historialHeader}>
              <Text style={styles.historialFecha}>{partida.fecha}</Text>
              <View
                style={[
                  styles.difficultyBadge,
                  { backgroundColor: getDifficultyColor(partida.dificultad) },
                ]}
              >
                <Text style={styles.difficultyBadgeText}>
                  {getDifficultyLabel(partida.dificultad)}
                </Text>
              </View>
            </View>

            <View style={styles.historialStats}>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Puntuación</Text>
                <Text style={styles.statItemValue}>{partida.puntuacion}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Rondas</Text>
                <Text style={styles.statItemValue}>{partida.rondas}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Tiempo</Text>
                <Text style={styles.statItemValue}>{partida.tiempoTotal}</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statItemLabel}>Mejor Racha</Text>
                <Text style={styles.statItemValue}>{partida.mejorRacha}</Text>
              </View>
            </View>

            <View style={styles.categoriaContainer}>
              <Text style={styles.categoriaLabel}>Categoría principal:</Text>
              <Text style={styles.categoriaText}>{partida.categoria}</Text>
            </View>
          </View>
        ))}
      </View>
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
    marginBottom: 20,
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
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  filterContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
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
  },
  filterButton: {
    flex: 1,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#ecf0f1',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
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
  difficultyBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  difficultyBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  historialStats: {
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
    color: '#2c3e50',
  },
  categoriaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoriaLabel: {
    fontSize: 12,
    color: '#7f8c8d',
    marginRight: 8,
  },
  categoriaText: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
  },
});
