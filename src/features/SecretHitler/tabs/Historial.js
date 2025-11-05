import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal } from 'react-native';
import { PARTIDAS_SECRET_HITLER_FAKE } from '../constants/DatosFalsosSecretHitler';

export const SecretHitlerHistorial = () => {
  const [filterGanador, setFilterGanador] = useState('todos'); // todos, Liberales, Fascistas
  const [filterJugadores, setFilterJugadores] = useState('todos'); // todos, 5, 6, 7, 8, 9, 10
  const [partidaSeleccionada, setPartidaSeleccionada] = useState(null);

  const filteredPartidas = PARTIDAS_SECRET_HITLER_FAKE.filter((partida) => {
    const matchGanador = filterGanador === 'todos' || partida.ganador === filterGanador;
    const matchJugadores = filterJugadores === 'todos' || partida.numJugadores === parseInt(filterJugadores);
    
    return matchGanador && matchJugadores;
  });

  const estadisticas = {
    totalPartidas: PARTIDAS_SECRET_HITLER_FAKE.length,
    partidasLiberales: PARTIDAS_SECRET_HITLER_FAKE.filter(p => p.ganador === 'Liberales').length,
    partidasFascistas: PARTIDAS_SECRET_HITLER_FAKE.filter(p => p.ganador === 'Fascistas').length,
    promedioDuracion: Math.round(
      PARTIDAS_SECRET_HITLER_FAKE.reduce((sum, p) => {
        const [min, sec] = p.duracion.split(':').map(Number);
        return sum + min * 60 + sec;
      }, 0) / PARTIDAS_SECRET_HITLER_FAKE.length
    ),
    totalEjecuciones: PARTIDAS_SECRET_HITLER_FAKE.reduce((sum, p) => sum + p.ejecuciones, 0),
    hitlerElegidoVeces: PARTIDAS_SECRET_HITLER_FAKE.filter(p => p.hitlerElegidoCanciller).length,
    hitlerEjecutadoVeces: PARTIDAS_SECRET_HITLER_FAKE.filter(p => p.hitlerEjecutado).length,
    promedioJugadores: Math.round(
      PARTIDAS_SECRET_HITLER_FAKE.reduce((sum, p) => sum + p.numJugadores, 0) / PARTIDAS_SECRET_HITLER_FAKE.length
    ),
    totalRondas: PARTIDAS_SECRET_HITLER_FAKE.reduce((sum, p) => sum + p.rondas, 0),
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const formatFecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const hoy = new Date();
    const ayer = new Date(hoy);
    ayer.setDate(ayer.getDate() - 1);
    
    if (fecha.toDateString() === hoy.toDateString()) {
      return `Hoy ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    } else if (fecha.toDateString() === ayer.toDateString()) {
      return `Ayer ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    } else {
      return `${fecha.getDate()}/${fecha.getMonth() + 1}/${fecha.getFullYear()} ${fecha.getHours().toString().padStart(2, '0')}:${fecha.getMinutes().toString().padStart(2, '0')}`;
    }
  };

  const getGanadorColor = (ganador) => {
    return ganador === 'Liberales' ? '#3498db' : '#e74c3c';
  };

  const getGanadorIcon = (ganador) => {
    return ganador === 'Liberales' ? '🛡️' : '⚔️';
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsTitle}>📊 Estadísticas Generales</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{estadisticas.totalPartidas}</Text>
            <Text style={styles.statLabel}>Partidas Totales</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{estadisticas.partidasLiberales}</Text>
            <Text style={styles.statLabel}>Victorias Liberales</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{estadisticas.partidasFascistas}</Text>
            <Text style={styles.statLabel}>Victorias Fascistas</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{formatTime(estadisticas.promedioDuracion)}</Text>
            <Text style={styles.statLabel}>Duración Promedio</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{estadisticas.hitlerEjecutadoVeces}</Text>
            <Text style={styles.statLabel}>Hitler Ejecutado</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>{estadisticas.totalEjecuciones}</Text>
            <Text style={styles.statLabel}>Total Ejecuciones</Text>
          </View>
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <Text style={styles.filtersTitle}>🔍 Filtros</Text>
        
        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Ganador:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterButtons}>
            {['todos', 'Liberales', 'Fascistas'].map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={[styles.filterButton, filterGanador === opcion && styles.filterButtonActive]}
                onPress={() => setFilterGanador(opcion)}
              >
                <Text style={[styles.filterButtonText, filterGanador === opcion && styles.filterButtonTextActive]}>
                  {opcion === 'todos' ? 'Todos' : opcion}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.filterGroup}>
          <Text style={styles.filterLabel}>Jugadores:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterButtons}>
            {['todos', '5', '6', '7', '8', '9', '10'].map((opcion) => (
              <TouchableOpacity
                key={opcion}
                style={[styles.filterButton, filterJugadores === opcion && styles.filterButtonActive]}
                onPress={() => setFilterJugadores(opcion)}
              >
                <Text style={[styles.filterButtonText, filterJugadores === opcion && styles.filterButtonTextActive]}>
                  {opcion === 'todos' ? 'Todos' : `${opcion} jugadores`}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <Text style={styles.resultadosText}>
          {filteredPartidas.length} partida{filteredPartidas.length !== 1 ? 's' : ''} encontrada{filteredPartidas.length !== 1 ? 's' : ''}
        </Text>
      </View>

      <View style={styles.partidasContainer}>
        {filteredPartidas.map((partida) => (
          <TouchableOpacity
            key={partida.id}
            style={[styles.partidaCard, { borderLeftColor: getGanadorColor(partida.ganador) }]}
            onPress={() => setPartidaSeleccionada(partida)}
          >
            <View style={styles.partidaHeader}>
              <View style={styles.partidaTitleRow}>
                <Text style={styles.partidaIcon}>{getGanadorIcon(partida.ganador)}</Text>
                <View style={styles.partidaInfo}>
                  <Text style={[styles.partidaGanador, { color: getGanadorColor(partida.ganador) }]}>
                    {partida.ganador} Ganan
                  </Text>
                  <Text style={styles.partidaFecha}>{formatFecha(partida.fecha)}</Text>
                </View>
              </View>
            </View>

            <View style={styles.partidaStats}>
              <View style={styles.partidaStat}>
                <Text style={styles.partidaStatLabel}>👥</Text>
                <Text style={styles.partidaStatValue}>{partida.numJugadores}</Text>
              </View>
              <View style={styles.partidaStat}>
                <Text style={styles.partidaStatLabel}>⏱️</Text>
                <Text style={styles.partidaStatValue}>{partida.duracion}</Text>
              </View>
              <View style={styles.partidaStat}>
                <Text style={styles.partidaStatLabel}>🔵</Text>
                <Text style={styles.partidaStatValue}>{partida.políticasLiberales}/5</Text>
              </View>
              <View style={styles.partidaStat}>
                <Text style={styles.partidaStatLabel}>🔴</Text>
                <Text style={styles.partidaStatValue}>{partida.políticasFascistas}/6</Text>
              </View>
              <View style={styles.partidaStat}>
                <Text style={styles.partidaStatLabel}>🎯</Text>
                <Text style={styles.partidaStatValue}>{partida.rondas}</Text>
              </View>
            </View>

            <View style={styles.partidaFooter}>
              <Text style={styles.partidaHitler}>👤 Hitler: {partida.hitler}</Text>
              <Text style={styles.partidaMotivo}>📌 {partida.motivoVictoria}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        visible={partidaSeleccionada !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setPartidaSeleccionada(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Detalles de la Partida</Text>
              <TouchableOpacity onPress={() => setPartidaSeleccionada(null)}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {partidaSeleccionada && (
              <ScrollView style={styles.modalBody}>
                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Información General</Text>
                  <Text style={styles.modalText}>📅 Fecha: {formatFecha(partidaSeleccionada.fecha)}</Text>
                  <Text style={styles.modalText}>👥 Jugadores: {partidaSeleccionada.numJugadores}</Text>
                  <Text style={styles.modalText}>⏱️ Duración: {partidaSeleccionada.duracion}</Text>
                  <Text style={styles.modalText}>🏆 Ganador: <Text style={{ color: getGanadorColor(partidaSeleccionada.ganador), fontWeight: 'bold' }}>{partidaSeleccionada.ganador}</Text></Text>
                  <Text style={styles.modalText}>📌 Motivo: {partidaSeleccionada.motivoVictoria}</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Políticas</Text>
                  <Text style={styles.modalText}>🔵 Liberales: {partidaSeleccionada.políticasLiberales}/5</Text>
                  <Text style={styles.modalText}>🔴 Fascistas: {partidaSeleccionada.políticasFascistas}/6</Text>
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Estadísticas</Text>
                  <Text style={styles.modalText}>🎯 Rondas: {partidaSeleccionada.rondas}</Text>
                  <Text style={styles.modalText}>❌ Elecciones Fallidas: {partidaSeleccionada.eleccionesFallidas}</Text>
                  <Text style={styles.modalText}>💀 Ejecuciones: {partidaSeleccionada.ejecuciones}</Text>
                  <Text style={styles.modalText}>👤 Hitler: {partidaSeleccionada.hitler}</Text>
                  {partidaSeleccionada.hitlerElegidoCanciller && (
                    <Text style={[styles.modalText, styles.warningText]}>⚠️ Hitler fue elegido Canciller</Text>
                  )}
                  {partidaSeleccionada.hitlerEjecutado && (
                    <Text style={[styles.modalText, styles.successText]}>✅ Hitler fue ejecutado</Text>
                  )}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Jugadores y Roles</Text>
                  {partidaSeleccionada.jugadores.map((jugador) => (
                    <View key={jugador.id} style={styles.jugadorRow}>
                      <Text style={styles.modalText}>
                        {jugador.nombre} - <Text style={{ 
                          color: jugador.rol === 'Liberal' ? '#3498db' : jugador.rol === 'Hitler' ? '#e74c3c' : '#c0392b',
                          fontWeight: 'bold'
                        }}>{jugador.rol}</Text>
                      </Text>
                    </View>
                  ))}
                </View>

                <View style={styles.modalSection}>
                  <Text style={styles.modalSectionTitle}>Eventos ({partidaSeleccionada.eventos.length})</Text>
                  {partidaSeleccionada.eventos.slice(0, 10).map((evento, index) => (
                    <View key={index} style={styles.eventoRow}>
                      <Text style={styles.eventoText}>• {evento.descripcion}</Text>
                    </View>
                  ))}
                  {partidaSeleccionada.eventos.length > 10 && (
                    <Text style={styles.moreEventsText}>... y {partidaSeleccionada.eventos.length - 10} eventos más</Text>
                  )}
                </View>
              </ScrollView>
            )}

            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setPartidaSeleccionada(null)}
            >
              <Text style={styles.modalButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  statsContainer: {
    padding: 16,
    backgroundColor: '#2a2a2a',
    marginBottom: 16,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: '48%',
    backgroundColor: '#333333',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#cccccc',
    textAlign: 'center',
  },
  filtersContainer: {
    padding: 16,
    backgroundColor: '#2a2a2a',
    marginBottom: 16,
  },
  filtersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  filterGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#333333',
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#444444',
  },
  filterButtonActive: {
    backgroundColor: '#d32f2f',
    borderColor: '#ffd700',
  },
  filterButtonText: {
    color: '#cccccc',
    fontSize: 12,
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  resultadosText: {
    fontSize: 14,
    color: '#cccccc',
    marginTop: 8,
    fontStyle: 'italic',
  },
  partidasContainer: {
    padding: 16,
  },
  partidaCard: {
    backgroundColor: '#2a2a2a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderColor: '#444444',
  },
  partidaHeader: {
    marginBottom: 12,
  },
  partidaTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  partidaIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  partidaInfo: {
    flex: 1,
  },
  partidaGanador: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  partidaFecha: {
    fontSize: 12,
    color: '#999999',
  },
  partidaStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#333333',
  },
  partidaStat: {
    alignItems: 'center',
  },
  partidaStatLabel: {
    fontSize: 16,
    marginBottom: 4,
  },
  partidaStatValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  partidaFooter: {
    marginTop: 8,
  },
  partidaHitler: {
    fontSize: 12,
    color: '#cccccc',
    marginBottom: 4,
  },
  partidaMotivo: {
    fontSize: 12,
    color: '#999999',
    fontStyle: 'italic',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#2a2a2a',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    paddingBottom: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  modalClose: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  modalBody: {
    maxHeight: '70%',
  },
  modalSection: {
    marginBottom: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffd700',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 8,
    lineHeight: 20,
  },
  warningText: {
    color: '#f39c12',
  },
  successText: {
    color: '#2ecc71',
  },
  jugadorRow: {
    paddingVertical: 4,
  },
  eventoRow: {
    paddingVertical: 4,
  },
  eventoText: {
    fontSize: 12,
    color: '#999999',
    lineHeight: 18,
  },
  moreEventsText: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
    marginTop: 8,
  },
  modalButton: {
    backgroundColor: '#d32f2f',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  modalButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
