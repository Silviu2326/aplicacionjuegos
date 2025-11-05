import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PARTIDAS_SALEM_FAKE } from '../constants/DatosFalsosSalem';

export const Salem1692Historial = () => {
  const [filterGanador, setFilterGanador] = useState('todos'); // todos, Aldeanos, Brujas
  const [filterJugadores, setFilterJugadores] = useState('todos'); // todos, 4-5, 6-7, 8-9, 10+

  const filteredPartidas = PARTIDAS_SALEM_FAKE.filter((partida) => {
    const matchGanador = filterGanador === 'todos' || partida.ganador === filterGanador;
    let matchJugadores = true;
    if (filterJugadores === '4-5') matchJugadores = partida.numJugadores >= 4 && partida.numJugadores <= 5;
    else if (filterJugadores === '6-7') matchJugadores = partida.numJugadores >= 6 && partida.numJugadores <= 7;
    else if (filterJugadores === '8-9') matchJugadores = partida.numJugadores >= 8 && partida.numJugadores <= 9;
    else if (filterJugadores === '10+') matchJugadores = partida.numJugadores >= 10;
    
    return matchGanador && matchJugadores;
  });

  const estadisticas = {
    totalPartidas: PARTIDAS_SALEM_FAKE.length,
    partidasAldeanos: PARTIDAS_SALEM_FAKE.filter(p => p.ganador === 'Aldeanos').length,
    partidasBrujas: PARTIDAS_SALEM_FAKE.filter(p => p.ganador === 'Brujas').length,
    promedioDuracion: Math.round(
      PARTIDAS_SALEM_FAKE.reduce((sum, p) => {
        const [min, sec] = p.duracion.split(':').map(Number);
        return sum + min * 60 + sec;
      }, 0) / PARTIDAS_SALEM_FAKE.length
    ),
    totalJugadoresEliminados: PARTIDAS_SALEM_FAKE.reduce((sum, p) => sum + p.jugadoresEliminados, 0),
    promedioJugadores: Math.round(
      PARTIDAS_SALEM_FAKE.reduce((sum, p) => sum + p.numJugadores, 0) / PARTIDAS_SALEM_FAKE.length
    ),
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGanadorColor = (ganador) => {
    return ganador === 'Aldeanos' ? '#3498db' : '#e74c3c';
  };

  const getGanadorIcon = (ganador) => {
    return ganador === 'Aldeanos' ? '👤' : '🧙';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.totalPartidas}</Text>
          <Text style={styles.summaryLabel}>Partidas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.partidasAldeanos}</Text>
          <Text style={styles.summaryLabel}>Aldeanos</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.partidasBrujas}</Text>
          <Text style={styles.summaryLabel}>Brujas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.promedioJugadores}</Text>
          <Text style={styles.summaryLabel}>Jugadores</Text>
        </View>
      </View>

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>Tiempo Promedio</Text>
        <Text style={styles.timeSummaryValue}>{formatTime(estadisticas.promedioDuracion)}</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por ganador:</Text>
        <View style={styles.filterButtons}>
          {['todos', 'Aldeanos', 'Brujas'].map((filt) => (
            <TouchableOpacity
              key={filt}
              style={[
                styles.filterButton,
                filterGanador === filt && styles.filterButtonActive,
              ]}
              onPress={() => setFilterGanador(filt)}
            >
              <Text
                style={[
                  styles.filterButtonText,
                  filterGanador === filt && styles.filterButtonTextActive,
                ]}
              >
                {filt}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por jugadores:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterButtons}>
            {['todos', '4-5', '6-7', '8-9', '10+'].map((filt) => (
              <TouchableOpacity
                key={filt}
                style={[
                  styles.filterButton,
                  filterJugadores === filt && styles.filterButtonActive,
                ]}
                onPress={() => setFilterJugadores(filt)}
              >
                <Text
                  style={[
                    styles.filterButtonText,
                    filterJugadores === filt && styles.filterButtonTextActive,
                  ]}
                >
                  {filt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      <View style={styles.historialList}>
        {filteredPartidas.map((partida) => {
          const victorias = partida.jugadores.filter(j => 
            (partida.ganador === 'Aldeanos' && j.role !== 'witch' && j.estado === 'vivo') ||
            (partida.ganador === 'Brujas' && j.role === 'witch' && j.estado === 'vivo')
          ).length;

          return (
            <View key={partida.id} style={styles.historialCard}>
              <View style={styles.historialHeader}>
                <View>
                  <Text style={styles.historialFecha}>{partida.fecha}</Text>
                  <Text style={styles.historialHora}>{partida.hora}</Text>
                </View>
                <View
                  style={[
                    styles.ganadorBadge,
                    { backgroundColor: getGanadorColor(partida.ganador) },
                  ]}
                >
                  <Text style={styles.ganadorBadgeText}>
                    {getGanadorIcon(partida.ganador)} {partida.ganador}
                  </Text>
                </View>
              </View>

              <View style={styles.historialStats}>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Jugadores</Text>
                  <Text style={styles.statItemValue}>{partida.numJugadores}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Brujas</Text>
                  <Text style={styles.statItemValue}>{partida.brujasIniciales}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Eliminados</Text>
                  <Text style={styles.statItemValue}>{partida.jugadoresEliminados}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Duración</Text>
                  <Text style={styles.statItemValue}>{partida.duracion}</Text>
                </View>
              </View>

              <View style={styles.eventosContainer}>
                <Text style={styles.eventosLabel}>Eventos principales:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.eventosList}>
                    {partida.eventos.slice(0, 5).map((evento, index) => (
                      <View key={index} style={styles.eventoItem}>
                        <Text style={styles.eventoText}>
                          {evento.tipo === 'accusation' 
                            ? `⚔️ ${evento.jugador} → ${evento.objetivo}`
                            : evento.resultado === 'condenado'
                            ? `⚖️ ${evento.acusado} condenado`
                            : `⚖️ ${evento.acusado} absuelto`
                          }
                        </Text>
                        <Text style={styles.eventoTimestamp}>{evento.timestamp}</Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>

              <View style={styles.jugadoresContainer}>
                <Text style={styles.jugadoresLabel}>Jugadores:</Text>
                <View style={styles.jugadoresGrid}>
                  {partida.jugadores.map((jugador, index) => (
                    <View key={index} style={styles.jugadorItem}>
                      <Text style={styles.jugadorIcon}>
                        {jugador.role === 'witch' ? '🧙' : '👤'}
                      </Text>
                      <Text style={[
                        styles.jugadorNombre,
                        jugador.estado === 'eliminado' && styles.jugadorEliminado
                      ]}>
                        {jugador.nombre}
                      </Text>
                      {jugador.estado === 'eliminado' && (
                        <Text style={styles.jugadorEstado}>💀</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>

              <View style={styles.victoriaContainer}>
                <Text style={styles.victoriaText}>
                  {victorias} {partida.ganador === 'Aldeanos' ? 'aldeano(s)' : 'bruja(s)'} sobrevivieron
                </Text>
              </View>
            </View>
          );
        })}
      </View>

      {filteredPartidas.length === 0 && (
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
    backgroundColor: '#1a1a1a',
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
    backgroundColor: '#2d2d2d',
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
    color: '#fff',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#aaa',
  },
  timeSummary: {
    backgroundColor: '#6a1b9a',
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
    backgroundColor: '#2d2d2d',
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
    color: '#fff',
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
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#6a1b9a',
  },
  filterButtonText: {
    fontSize: 12,
    color: '#aaa',
    fontWeight: '600',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  historialList: {
    gap: 15,
  },
  historialCard: {
    backgroundColor: '#2d2d2d',
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
    color: '#fff',
  },
  historialHora: {
    fontSize: 12,
    color: '#aaa',
  },
  ganadorBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  ganadorBadgeText: {
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
    borderBottomColor: '#444',
  },
  statItem: {
    alignItems: 'center',
  },
  statItemLabel: {
    fontSize: 11,
    color: '#aaa',
    marginBottom: 5,
  },
  statItemValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  eventosContainer: {
    marginBottom: 15,
  },
  eventosLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  eventosList: {
    flexDirection: 'row',
    gap: 8,
  },
  eventoItem: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 10,
    minWidth: 120,
  },
  eventoText: {
    fontSize: 12,
    color: '#fff',
    marginBottom: 4,
  },
  eventoTimestamp: {
    fontSize: 10,
    color: '#aaa',
  },
  jugadoresContainer: {
    marginBottom: 15,
  },
  jugadoresLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  jugadoresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  jugadorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 8,
    gap: 6,
  },
  jugadorIcon: {
    fontSize: 16,
  },
  jugadorNombre: {
    fontSize: 12,
    color: '#fff',
  },
  jugadorEliminado: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  jugadorEstado: {
    fontSize: 12,
  },
  victoriaContainer: {
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#444',
  },
  victoriaText: {
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

