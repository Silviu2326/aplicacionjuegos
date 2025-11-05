import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Datos falsos de historial de partidas
const FAKE_HISTORIAL = [
  {
    id: 1,
    fecha: '2024-11-15',
    hora: '20:30',
    modo: 'individual',
    jugador: { nombre: 'María García', puntuacion: 145, aciertos: 12, fallos: 3 },
    rondas: 15,
    tiempoTotal: '0:12:45',
    preguntasCorrectas: 12,
    preguntasFallidas: 3,
    mejorRacha: 8,
    categoriaMasJugada: 'Ciencia',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 15,
    },
  },
  {
    id: 2,
    fecha: '2024-11-14',
    hora: '18:15',
    modo: 'multijugador',
    jugadores: [
      { nombre: 'Juan Pérez', puntuacion: 180, aciertos: 15, fallos: 2 },
      { nombre: 'Ana López', puntuacion: 165, aciertos: 14, fallos: 3 },
      { nombre: 'Carlos Ruiz', puntuacion: 150, aciertos: 13, fallos: 4 },
    ],
    ganador: 'Juan Pérez',
    rondas: 15,
    tiempoTotal: '0:18:30',
    preguntasCorrectas: 42,
    preguntasFallidas: 9,
    mejorRacha: 12,
    categoriaMasJugada: 'Historia',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 15,
    },
  },
  {
    id: 3,
    fecha: '2024-11-13',
    hora: '22:00',
    modo: 'individual',
    jugador: { nombre: 'Pedro Sánchez', puntuacion: 98, aciertos: 8, fallos: 5 },
    rondas: 10,
    tiempoTotal: '0:08:20',
    preguntasCorrectas: 8,
    preguntasFallidas: 5,
    mejorRacha: 5,
    categoriaMasJugada: 'Naturaleza',
    dificultad: 'facil',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 10,
    },
  },
  {
    id: 4,
    fecha: '2024-11-12',
    hora: '16:45',
    modo: 'multijugador',
    jugadores: [
      { nombre: 'Laura Martínez', puntuacion: 200, aciertos: 18, fallos: 2 },
      { nombre: 'David González', puntuacion: 195, aciertos: 17, fallos: 3 },
    ],
    ganador: 'Laura Martínez',
    rondas: 20,
    tiempoTotal: '0:25:15',
    preguntasCorrectas: 35,
    preguntasFallidas: 5,
    mejorRacha: 15,
    categoriaMasJugada: 'Ciencia',
    dificultad: 'dificil',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 20,
    },
  },
  {
    id: 5,
    fecha: '2024-11-11',
    hora: '19:30',
    modo: 'individual',
    jugador: { nombre: 'Sofía Rodríguez', puntuacion: 125, aciertos: 10, fallos: 4 },
    rondas: 12,
    tiempoTotal: '0:10:30',
    preguntasCorrectas: 10,
    preguntasFallidas: 4,
    mejorRacha: 7,
    categoriaMasJugada: 'Cultura Pop',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'puntos',
      puntuacionObjetivo: 15,
    },
  },
  {
    id: 6,
    fecha: '2024-11-10',
    hora: '14:20',
    modo: 'multijugador',
    jugadores: [
      { nombre: 'Miguel Torres', puntuacion: 175, aciertos: 15, fallos: 3 },
      { nombre: 'Elena Fernández', puntuacion: 160, aciertos: 14, fallos: 4 },
      { nombre: 'Roberto Díaz', puntuacion: 155, aciertos: 13, fallos: 5 },
      { nombre: 'Carmen Morales', puntuacion: 140, aciertos: 12, fallos: 6 },
    ],
    ganador: 'Miguel Torres',
    rondas: 15,
    tiempoTotal: '0:22:45',
    preguntasCorrectas: 54,
    preguntasFallidas: 18,
    mejorRacha: 10,
    categoriaMasJugada: 'Geografía',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 15,
    },
  },
  {
    id: 7,
    fecha: '2024-11-09',
    hora: '21:00',
    modo: 'individual',
    jugador: { nombre: 'Isabel Jiménez', puntuacion: 110, aciertos: 9, fallos: 6 },
    rondas: 10,
    tiempoTotal: '0:09:15',
    preguntasCorrectas: 9,
    preguntasFallidas: 6,
    mejorRacha: 4,
    categoriaMasJugada: 'Animales',
    dificultad: 'facil',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 10,
    },
  },
  {
    id: 8,
    fecha: '2024-11-08',
    hora: '17:30',
    modo: 'multijugador',
    jugadores: [
      { nombre: 'Francisco Herrera', puntuacion: 190, aciertos: 16, fallos: 2 },
      { nombre: 'Patricia Ramos', puntuacion: 185, aciertos: 15, fallos: 3 },
    ],
    ganador: 'Francisco Herrera',
    rondas: 15,
    tiempoTotal: '0:19:20',
    preguntasCorrectas: 31,
    preguntasFallidas: 5,
    mejorRacha: 13,
    categoriaMasJugada: 'Tecnología',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'puntos',
      puntuacionObjetivo: 15,
    },
  },
  {
    id: 9,
    fecha: '2024-11-07',
    hora: '20:15',
    modo: 'individual',
    jugador: { nombre: 'Antonio Moreno', puntuacion: 135, aciertos: 11, fallos: 4 },
    rondas: 12,
    tiempoTotal: '0:11:30',
    preguntasCorrectas: 11,
    preguntasFallidas: 4,
    mejorRacha: 8,
    categoriaMasJugada: 'Mitos',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 12,
    },
  },
  {
    id: 10,
    fecha: '2024-11-06',
    hora: '15:45',
    modo: 'multijugador',
    jugadores: [
      { nombre: 'Lucía Castro', puntuacion: 165, aciertos: 14, fallos: 3 },
      { nombre: 'Manuel Vega', puntuacion: 160, aciertos: 13, fallos: 4 },
      { nombre: 'Rosa Ortega', puntuacion: 155, aciertos: 12, fallos: 5 },
    ],
    ganador: 'Lucía Castro',
    rondas: 15,
    tiempoTotal: '0:20:10',
    preguntasCorrectas: 39,
    preguntasFallidas: 12,
    mejorRacha: 11,
    categoriaMasJugada: 'Comida',
    dificultad: 'medio',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 15,
    },
  },
  {
    id: 11,
    fecha: '2024-11-05',
    hora: '19:00',
    modo: 'individual',
    jugador: { nombre: 'Javier Navarro', puntuacion: 88, aciertos: 7, fallos: 6 },
    rondas: 10,
    tiempoTotal: '0:08:45',
    preguntasCorrectas: 7,
    preguntasFallidas: 6,
    mejorRacha: 3,
    categoriaMasJugada: 'Deportes',
    dificultad: 'facil',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 10,
    },
  },
  {
    id: 12,
    fecha: '2024-11-04',
    hora: '16:30',
    modo: 'multijugador',
    jugadores: [
      { nombre: 'Marta Serrano', puntuacion: 205, aciertos: 18, fallos: 1 },
      { nombre: 'Daniel Pardo', puntuacion: 195, aciertos: 17, fallos: 2 },
      { nombre: 'Cristina Blanco', puntuacion: 180, aciertos: 16, fallos: 3 },
    ],
    ganador: 'Marta Serrano',
    rondas: 20,
    tiempoTotal: '0:28:15',
    preguntasCorrectas: 51,
    preguntasFallidas: 6,
    mejorRacha: 18,
    categoriaMasJugada: 'Ciencia',
    dificultad: 'dificil',
    configuracion: {
      modoVictoria: 'rondas',
      rondasTotales: 20,
    },
  },
];

export const VerdaderoOFalsoExtremoHistorial = () => {
  const [filter, setFilter] = useState('todos'); // todos, individual, multijugador

  const filteredHistorial = FAKE_HISTORIAL.filter((item) => {
    if (filter === 'todos') return true;
    if (filter === 'individual') return item.modo === 'individual';
    if (filter === 'multijugador') return item.modo === 'multijugador';
    return true;
  });

  const totalPartidas = FAKE_HISTORIAL.length;
  const partidasIndividual = FAKE_HISTORIAL.filter(p => p.modo === 'individual').length;
  const partidasMultijugador = FAKE_HISTORIAL.filter(p => p.modo === 'multijugador').length;
  
  const totalPreguntasCorrectas = FAKE_HISTORIAL.reduce((sum, item) => sum + item.preguntasCorrectas, 0);
  const totalPreguntasFallidas = FAKE_HISTORIAL.reduce((sum, item) => sum + item.preguntasFallidas, 0);
  const promedioPreguntasPorPartida = Math.round(totalPreguntasCorrectas / totalPartidas);
  
  const totalTiempoJugado = FAKE_HISTORIAL.reduce((sum, item) => {
    const [horas, minutos, segundos] = item.tiempoTotal.split(':').map(Number);
    return sum + horas * 3600 + minutos * 60 + segundos;
  }, 0);
  const horasTotales = Math.floor(totalTiempoJugado / 3600);
  const minutosTotales = Math.floor((totalTiempoJugado % 3600) / 60);

  // Categoría más jugada
  const categoriasCount = {};
  FAKE_HISTORIAL.forEach(item => {
    categoriasCount[item.categoriaMasJugada] = (categoriasCount[item.categoriaMasJugada] || 0) + 1;
  });
  const categoriaMasPopular = Object.keys(categoriasCount).reduce((a, b) => 
    categoriasCount[a] > categoriasCount[b] ? a : b, Object.keys(categoriasCount)[0]
  );

  // Mejor racha
  const mejorRachaGlobal = Math.max(...FAKE_HISTORIAL.map(item => item.mejorRacha));

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
          <Text style={styles.summaryValue}>{totalPreguntasFallidas}</Text>
          <Text style={styles.summaryLabel}>Fallos</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{promedioPreguntasPorPartida}</Text>
          <Text style={styles.summaryLabel}>Promedio</Text>
        </View>
      </View>

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>⏱️ Tiempo Total Jugado</Text>
        <Text style={styles.timeSummaryValue}>
          {horasTotales}h {minutosTotales}m
        </Text>
      </View>

      <View style={styles.categorySummary}>
        <Text style={styles.categorySummaryLabel}>📊 Categoría Más Popular</Text>
        <Text style={styles.categorySummaryValue}>{categoriaMasPopular}</Text>
      </View>

      <View style={styles.rachaSummary}>
        <Text style={styles.rachaSummaryLabel}>🔥 Mejor Racha</Text>
        <Text style={styles.rachaSummaryValue}>{mejorRachaGlobal} aciertos seguidos</Text>
      </View>

      <View style={styles.winsSummary}>
        <View style={styles.winCard}>
          <Text style={styles.winCardLabel}>👤 Individual</Text>
          <Text style={styles.winCardValue}>{partidasIndividual}</Text>
        </View>
        <View style={styles.winCard}>
          <Text style={styles.winCardLabel}>👥 Multijugador</Text>
          <Text style={styles.winCardValue}>{partidasMultijugador}</Text>
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar partidas:</Text>
        <View style={styles.filterButtons}>
          {[
            { id: 'todos', label: 'Todos' },
            { id: 'individual', label: 'Individual' },
            { id: 'multijugador', label: 'Multijugador' },
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
              <View style={styles.modoBadge}>
                <Text style={styles.modoBadgeText}>
                  {partida.modo === 'individual' ? '👤' : '👥'} {partida.modo === 'individual' ? 'Individual' : 'Multijugador'}
                </Text>
              </View>
            </View>

            {partida.modo === 'individual' ? (
              <View style={styles.jugadorResult}>
                <Text style={styles.jugadorResultNombre}>{partida.jugador.nombre}</Text>
                <Text style={styles.jugadorResultPuntuacion}>{partida.jugador.puntuacion} puntos</Text>
                <Text style={styles.jugadorResultStats}>
                  ✅ {partida.jugador.aciertos} | ❌ {partida.jugador.fallos}
                </Text>
              </View>
            ) : (
              <View style={styles.jugadoresResult}>
                {partida.jugadores.map((jugador, index) => (
                  <View
                    key={index}
                    style={[
                      styles.jugadorMultijugador,
                      partida.ganador === jugador.nombre && styles.jugadorGanador,
                    ]}
                  >
                    <Text style={styles.jugadorMultijugadorNombre}>
                      {jugador.nombre} {partida.ganador === jugador.nombre && '🏆'}
                    </Text>
                    <Text style={styles.jugadorMultijugadorPuntuacion}>{jugador.puntuacion} pts</Text>
                    <Text style={styles.jugadorMultijugadorStats}>
                      ✅{jugador.aciertos} ❌{jugador.fallos}
                    </Text>
                  </View>
                ))}
              </View>
            )}

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

            <View style={styles.preguntasStats}>
              <View style={styles.preguntaStatItem}>
                <Text style={styles.preguntaStatLabel}>✅ Correctas</Text>
                <Text style={[styles.preguntaStatValue, styles.statSuccess]}>
                  {partida.preguntasCorrectas}
                </Text>
              </View>
              <View style={styles.preguntaStatItem}>
                <Text style={styles.preguntaStatLabel}>❌ Fallidas</Text>
                <Text style={[styles.preguntaStatValue, styles.statError]}>
                  {partida.preguntasFallidas}
                </Text>
              </View>
            </View>

            <View style={styles.configInfo}>
              <Text style={styles.configInfoText}>
                📊 {partida.categoriaMasJugada} • {partida.dificultad} • {
                  partida.configuracion.modoVictoria === 'rondas' 
                    ? `${partida.configuracion.rondasTotales} rondas`
                    : `${partida.configuracion.puntuacionObjetivo} puntos`
                }
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
  categorySummary: {
    backgroundColor: '#27AE60',
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
  categorySummaryLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 5,
  },
  categorySummaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  rachaSummary: {
    backgroundColor: '#F39C12',
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
  rachaSummaryLabel: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginBottom: 5,
  },
  rachaSummaryValue: {
    fontSize: 22,
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
    color: '#E74C3C',
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
  modoBadge: {
    backgroundColor: '#E74C3C',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  modoBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  jugadorResult: {
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    marginBottom: 15,
  },
  jugadorResultNombre: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  jugadorResultPuntuacion: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginBottom: 5,
  },
  jugadorResultStats: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  jugadoresResult: {
    gap: 10,
    marginBottom: 15,
  },
  jugadorMultijugador: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  jugadorGanador: {
    backgroundColor: '#D5F4E6',
    borderWidth: 2,
    borderColor: '#27AE60',
  },
  jugadorMultijugadorNombre: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    flex: 1,
  },
  jugadorMultijugadorPuntuacion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginHorizontal: 10,
  },
  jugadorMultijugadorStats: {
    fontSize: 12,
    color: '#7f8c8d',
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
  preguntasStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  preguntaStatItem: {
    alignItems: 'center',
  },
  preguntaStatLabel: {
    fontSize: 11,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  preguntaStatValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statSuccess: {
    color: '#27AE60',
  },
  statError: {
    color: '#E74C3C',
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

