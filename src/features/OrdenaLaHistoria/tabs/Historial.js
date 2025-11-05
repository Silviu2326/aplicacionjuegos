import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Datos falsos de historial de partidas
const FAKE_HISTORIAL = [
  {
    id: 1,
    fecha: '2024-11-15',
    hora: '14:30',
    puntuacion: 18,
    rondas: 18,
    dificultad: 'normal',
    tiempoTotal: '45:23',
    paquete: 'Aventura',
    mejorRacha: 12,
    historiasCompletadas: [
      { titulo: 'El Mapa del Tesoro', correcto: true },
      { titulo: 'La Expedición Perdida', correcto: true },
      { titulo: 'El Naufragio', correcto: false },
      { titulo: 'El Mapa del Tesoro', correcto: true },
    ],
    promedioTiempoPorRonda: '2:31',
  },
  {
    id: 2,
    fecha: '2024-11-14',
    hora: '20:15',
    puntuacion: 25,
    rondas: 25,
    dificultad: 'facil',
    tiempoTotal: '62:45',
    paquete: 'Comedia',
    mejorRacha: 18,
    historiasCompletadas: [
      { titulo: 'La Paella del Amor', correcto: true },
      { titulo: 'El Día del Caos', correcto: true },
      { titulo: 'La Entrevista Desastrosa', correcto: true },
    ],
    promedioTiempoPorRonda: '2:30',
  },
  {
    id: 3,
    fecha: '2024-11-13',
    hora: '16:45',
    puntuacion: 12,
    rondas: 15,
    dificultad: 'dificil',
    tiempoTotal: '38:20',
    paquete: 'Ciencia Ficción',
    mejorRacha: 7,
    historiasCompletadas: [
      { titulo: 'Transmisión Desconocida', correcto: true },
      { titulo: 'El Portal Dimensional', correcto: false },
      { titulo: 'La Rebelión de los Androides', correcto: true },
      { titulo: 'El Portal Dimensional', correcto: false },
      { titulo: 'Transmisión Desconocida', correcto: true },
    ],
    promedioTiempoPorRonda: '2:33',
  },
  {
    id: 4,
    fecha: '2024-11-12',
    hora: '10:20',
    puntuacion: 30,
    rondas: 30,
    dificultad: 'normal',
    tiempoTotal: '78:15',
    paquete: 'Misterio',
    mejorRacha: 22,
    historiasCompletadas: [
      { titulo: 'El Caso del Diamante Perdido', correcto: true },
      { titulo: 'La Mansión Embrujada', correcto: true },
      { titulo: 'El Enigma del Código', correcto: true },
    ],
    promedioTiempoPorRonda: '2:36',
  },
  {
    id: 5,
    fecha: '2024-11-11',
    hora: '19:00',
    puntuacion: 8,
    rondas: 11,
    dificultad: 'dificil',
    tiempoTotal: '32:10',
    paquete: 'Terror',
    mejorRacha: 5,
    historiasCompletadas: [
      { titulo: 'La Casa del Final', correcto: false },
      { titulo: 'El Espejo Maldito', correcto: false },
      { titulo: 'La Casa del Final', correcto: true },
      { titulo: 'El Espejo Maldito', correcto: false },
    ],
    promedioTiempoPorRonda: '2:55',
  },
  {
    id: 6,
    fecha: '2024-11-10',
    hora: '15:30',
    puntuacion: 22,
    rondas: 22,
    dificultad: 'normal',
    tiempoTotal: '55:40',
    paquete: 'Romance',
    mejorRacha: 15,
    historiasCompletadas: [
      { titulo: 'El Encuentro en la Lluvia', correcto: true },
      { titulo: 'Cartas de Amor Perdidas', correcto: true },
    ],
    promedioTiempoPorRonda: '2:32',
  },
  {
    id: 7,
    fecha: '2024-11-09',
    hora: '12:00',
    puntuacion: 35,
    rondas: 35,
    dificultad: 'facil',
    tiempoTotal: '88:22',
    paquete: 'Fantasía',
    mejorRacha: 28,
    historiasCompletadas: [
      { titulo: 'El Libro de los Hechizos', correcto: true },
      { titulo: 'El Bosque Encantado', correcto: true },
    ],
    promedioTiempoPorRonda: '2:31',
  },
  {
    id: 8,
    fecha: '2024-11-08',
    hora: '21:15',
    puntuacion: 15,
    rondas: 18,
    dificultad: 'normal',
    tiempoTotal: '42:30',
    paquete: 'Aventura',
    mejorRacha: 10,
    historiasCompletadas: [
      { titulo: 'El Mapa del Tesoro', correcto: true },
      { titulo: 'La Expedición Perdida', correcto: false },
      { titulo: 'El Naufragio', correcto: false },
    ],
    promedioTiempoPorRonda: '2:21',
  },
];

export const OrdenaLaHistoriaHistorial = () => {
  const [filter, setFilter] = useState('todos'); // todos, facil, normal, dificil
  const [paqueteFilter, setPaqueteFilter] = useState('todos');

  const paquetesDisponibles = ['todos', 'Aventura', 'Comedia', 'Ciencia Ficción', 'Misterio', 'Romance', 'Terror', 'Fantasía'];

  const filteredHistorial = FAKE_HISTORIAL.filter((item) => {
    const matchDificultad = filter === 'todos' || item.dificultad === filter;
    const matchPaquete = paqueteFilter === 'todos' || item.paquete === paqueteFilter;
    return matchDificultad && matchPaquete;
  });

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
  const totalTiempoJugado = FAKE_HISTORIAL.reduce((sum, item) => {
    const [minutos, segundos] = item.tiempoTotal.split(':').map(Number);
    return sum + minutos * 60 + segundos;
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

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>Tiempo Total Jugado</Text>
        <Text style={styles.timeSummaryValue}>
          {horasTotales}h {minutosTotales}m
        </Text>
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

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por paquete:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterButtons}>
            {paquetesDisponibles.map((paq) => (
              <TouchableOpacity
                key={paq}
                style={[
                  styles.filterButton,
                  paqueteFilter === paq && styles.filterButtonActive,
                ]}
                onPress={() => setPaqueteFilter(paq)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    paqueteFilter === paq && styles.filterButtonTextActive,
                  ]}
                >
                  {paq}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.historialList}>
        {filteredHistorial.map((partida) => {
          const correctas = partida.historiasCompletadas.filter(h => h.correcto).length;
          const totalHistorias = partida.historiasCompletadas.length;
          const porcentajeCorrecto = totalHistorias > 0 ? Math.round((correctas / totalHistorias) * 100) : 0;

          return (
            <View key={partida.id} style={styles.historialCard}>
              <View style={styles.historialHeader}>
                <View>
                  <Text style={styles.historialFecha}>{partida.fecha}</Text>
                  <Text style={styles.historialHora}>{partida.hora}</Text>
                </View>
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

              <View style={styles.paqueteBadge}>
                <Text style={styles.paqueteBadgeText}>📚 {partida.paquete}</Text>
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
                  <Text style={styles.statItemLabel}>Racha</Text>
                  <Text style={styles.statItemValue}>{partida.mejorRacha}</Text>
                </View>
              </View>

              <View style={styles.accuracyContainer}>
                <Text style={styles.accuracyLabel}>Precisión: {porcentajeCorrecto}%</Text>
                <View style={styles.accuracyBar}>
                  <View 
                    style={[
                      styles.accuracyBarFill, 
                      { width: `${porcentajeCorrecto}%`, backgroundColor: porcentajeCorrecto >= 70 ? '#27ae60' : porcentajeCorrecto >= 50 ? '#f39c12' : '#e74c3c' }
                    ]} 
                  />
                </View>
                <Text style={styles.accuracyText}>
                  {correctas}/{totalHistorias} historias correctas
                </Text>
              </View>

              <View style={styles.historiasContainer}>
                <Text style={styles.historiasLabel}>Historias completadas:</Text>
                {partida.historiasCompletadas.map((historia, index) => (
                  <View key={index} style={styles.historiaItem}>
                    <Text style={styles.historiaIcon}>
                      {historia.correcto ? '✅' : '❌'}
                    </Text>
                    <Text style={[
                      styles.historiaTitulo,
                      !historia.correcto && styles.historiaTituloIncorrecto
                    ]}>
                      {historia.titulo}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.promedioContainer}>
                <Text style={styles.promedioText}>
                  ⏱️ Promedio por ronda: {partida.promedioTiempoPorRonda}
                </Text>
              </View>
            </View>
          );
        })}
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
  timeSummary: {
    backgroundColor: '#4ECDC4',
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
    backgroundColor: '#4ECDC4',
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
    marginBottom: 10,
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
  paqueteBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#E8F8F7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginBottom: 15,
  },
  paqueteBadgeText: {
    color: '#4ECDC4',
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
  accuracyContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  accuracyLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 8,
  },
  accuracyBar: {
    height: 8,
    backgroundColor: '#ecf0f1',
    borderRadius: 4,
    marginBottom: 5,
    overflow: 'hidden',
  },
  accuracyBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  accuracyText: {
    fontSize: 12,
    color: '#7f8c8d',
  },
  historiasContainer: {
    marginBottom: 15,
  },
  historiasLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  historiaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingLeft: 5,
  },
  historiaIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  historiaTitulo: {
    fontSize: 13,
    color: '#2c3e50',
    flex: 1,
  },
  historiaTituloIncorrecto: {
    color: '#e74c3c',
    textDecorationLine: 'line-through',
  },
  promedioContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ecf0f1',
  },
  promedioText: {
    fontSize: 12,
    color: '#7f8c8d',
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

