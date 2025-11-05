import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PARTIDAS_TWO_ROOMS_FAKE, getRoleName } from '../constants/DatosFalsosTwoRooms';

export const TwoRoomsAndABoomHistorial = () => {
  const [filterGanador, setFilterGanador] = useState('todos'); // todos, Equipo Rojo, Equipo Azul
  const [filterJugadores, setFilterJugadores] = useState('todos'); // todos, 6-10, 11-15, 16-20

  const filteredPartidas = PARTIDAS_TWO_ROOMS_FAKE.filter((partida) => {
    const matchGanador = filterGanador === 'todos' || partida.ganador === filterGanador;
    let matchJugadores = true;
    
    if (filterJugadores !== 'todos') {
      const num = partida.numJugadores;
      if (filterJugadores === '6-10') matchJugadores = num >= 6 && num <= 10;
      else if (filterJugadores === '11-15') matchJugadores = num >= 11 && num <= 15;
      else if (filterJugadores === '16-20') matchJugadores = num >= 16 && num <= 20;
    }
    
    return matchGanador && matchJugadores;
  });

  const estadisticas = {
    totalPartidas: PARTIDAS_TWO_ROOMS_FAKE.length,
    partidasRojo: PARTIDAS_TWO_ROOMS_FAKE.filter(p => p.ganador === 'Equipo Rojo').length,
    partidasAzul: PARTIDAS_TWO_ROOMS_FAKE.filter(p => p.ganador === 'Equipo Azul').length,
    promedioDuracion: Math.round(
      PARTIDAS_TWO_ROOMS_FAKE.reduce((sum, p) => {
        const [min, sec] = p.duracion.split(':').map(Number);
        return sum + min * 60 + sec;
      }, 0) / PARTIDAS_TWO_ROOMS_FAKE.length
    ),
    promedioJugadores: Math.round(
      PARTIDAS_TWO_ROOMS_FAKE.reduce((sum, p) => sum + p.numJugadores, 0) / PARTIDAS_TWO_ROOMS_FAKE.length
    ),
    promedioRondas: Math.round(
      PARTIDAS_TWO_ROOMS_FAKE.reduce((sum, p) => sum + p.rondas, 0) / PARTIDAS_TWO_ROOMS_FAKE.length
    ),
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGanadorColor = (ganador) => {
    return ganador === 'Equipo Azul' ? '#3498db' : '#e74c3c';
  };

  const getGanadorIcon = (ganador) => {
    return ganador === 'Equipo Azul' ? '🔵' : '🔴';
  };

  const getRoleIcon = (role) => {
    const icons = {
      presidente: '👔',
      bomba: '💣',
      jugador: '👤',
      timido: '😰',
      ingeniero: '🔧',
      espia: '🕵️',
      medico: '⚕️',
      kamikaze: '💥',
    };
    return icons[role] || '👤';
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.statsSummary}>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.totalPartidas}</Text>
          <Text style={styles.summaryLabel}>Partidas</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.partidasRojo}</Text>
          <Text style={styles.summaryLabel}>Rojo</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.partidasAzul}</Text>
          <Text style={styles.summaryLabel}>Azul</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.promedioJugadores}</Text>
          <Text style={styles.summaryLabel}>Jugadores</Text>
        </View>
      </View>

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>Tiempo Promedio</Text>
        <Text style={styles.timeSummaryValue}>{formatTime(estadisticas.promedioDuracion)}</Text>
        <Text style={styles.timeSummaryLabel}>Rondas Promedio</Text>
        <Text style={styles.timeSummaryValue}>{estadisticas.promedioRondas.toFixed(1)}</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por ganador:</Text>
        <View style={styles.filterButtons}>
          {['todos', 'Equipo Rojo', 'Equipo Azul'].map((filt) => (
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
                {filt === 'todos' ? 'Todos' : filt === 'Equipo Rojo' ? '🔴 Rojo' : '🔵 Azul'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por jugadores:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterButtons}>
            {['todos', '6-10', '11-15', '16-20'].map((filt) => (
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
          const mismoHabitacion = partida.habitacionFinalPresidente === partida.habitacionFinalBomba;
          const victorias = partida.jugadores.filter(j => 
            (partida.ganador === 'Equipo Azul' && j.team === 'azul' && j.estado === 'vivo') ||
            (partida.ganador === 'Equipo Rojo' && j.team === 'rojo' && j.estado === 'vivo')
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
                  <Text style={styles.statItemLabel}>Rondas</Text>
                  <Text style={styles.statItemValue}>{partida.rondas}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Duración</Text>
                  <Text style={styles.statItemValue}>{partida.duracion}</Text>
                </View>
              </View>

              <View style={styles.revelationSummary}>
                <Text style={styles.revelationLabel}>Revelación Final:</Text>
                <View style={styles.revelationDetails}>
                  <View style={styles.revelationItem}>
                    <Text style={styles.revelationIcon}>👔</Text>
                    <Text style={styles.revelationText}>
                      Presidente: Habitación {partida.habitacionFinalPresidente}
                    </Text>
                  </View>
                  <View style={styles.revelationItem}>
                    <Text style={styles.revelationIcon}>💣</Text>
                    <Text style={styles.revelationText}>
                      Bomba: Habitación {partida.habitacionFinalBomba}
                    </Text>
                  </View>
                  <View style={[
                    styles.resultBadge,
                    { backgroundColor: mismoHabitacion ? '#e74c3c' : '#3498db' }
                  ]}>
                    <Text style={styles.resultBadgeText}>
                      {mismoHabitacion ? '💥 Misma Habitación' : '✅ Habitaciones Diferentes'}
                    </Text>
                  </View>
                </View>
              </View>

              <View style={styles.eventosContainer}>
                <Text style={styles.eventosLabel}>Eventos principales:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.eventosList}>
                    {partida.eventos.slice(0, 8).map((evento, index) => (
                      <View key={index} style={styles.eventoItem}>
                        <Text style={styles.eventoText}>
                          {evento.tipo === 'ronda_inicio'
                            ? `🔄 Ronda ${evento.ronda}`
                            : evento.tipo === 'eleccion_lider'
                            ? `👑 ${evento.lider} líder Hab. ${evento.habitacion}`
                            : evento.tipo === 'seleccion_rehenes'
                            ? `👥 Rehenes seleccionados`
                            : evento.tipo === 'intercambio'
                            ? `↔️ ${evento.rehenesIntercambiados} rehenes intercambiados`
                            : evento.tipo === 'revelacion'
                            ? evento.rol === 'bomba'
                              ? `💣 ${evento.jugador} revela: BOMBA`
                              : `👔 ${evento.jugador} revela: PRESIDENTE`
                            : evento.tipo === 'fin_juego'
                            ? `🎉 ${evento.ganador} gana`
                            : evento.tipo === 'ronda_fin'
                            ? `✅ Ronda ${evento.ronda} completada`
                            : evento.tipo}
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
                        {getRoleIcon(jugador.role)}
                      </Text>
                      <Text style={[
                        styles.jugadorNombre,
                        jugador.estado === 'eliminado' && styles.jugadorEliminado
                      ]}>
                        {jugador.nombre}
                      </Text>
                      <Text style={[
                        styles.jugadorTeam,
                        jugador.team === 'azul' ? styles.teamAzul : jugador.team === 'rojo' ? styles.teamRojo : styles.teamGris
                      ]}>
                        {jugador.team === 'azul' ? '🔵' : jugador.team === 'rojo' ? '🔴' : '⚪'}
                      </Text>
                      <Text style={styles.jugadorHabitacion}>
                        Hab. {jugador.habitacionFinal}
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
                  {victorias} {partida.ganador === 'Equipo Azul' ? 'azul(es)' : 'rojo(s)'} sobrevivieron
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
    backgroundColor: '#0a0a0a',
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
    backgroundColor: '#1a1a2e',
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
    backgroundColor: '#e94560',
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
    marginBottom: 10,
  },
  filterContainer: {
    backgroundColor: '#1a1a2e',
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
    backgroundColor: '#0a0a0a',
    alignItems: 'center',
  },
  filterButtonActive: {
    backgroundColor: '#e94560',
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
    backgroundColor: '#1a1a2e',
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
    flex: 1,
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
  revelationSummary: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  revelationLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  revelationDetails: {
    gap: 8,
  },
  revelationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 10,
  },
  revelationIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  revelationText: {
    fontSize: 14,
    color: '#ccc',
    flex: 1,
  },
  resultBadge: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  resultBadgeText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
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
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 10,
    minWidth: 140,
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
    backgroundColor: '#0a0a0a',
    borderRadius: 8,
    padding: 8,
    gap: 6,
    flex: 1,
    minWidth: '45%',
  },
  jugadorIcon: {
    fontSize: 16,
  },
  jugadorNombre: {
    fontSize: 12,
    color: '#fff',
    flex: 1,
  },
  jugadorEliminado: {
    textDecorationLine: 'line-through',
    color: '#aaa',
  },
  jugadorTeam: {
    fontSize: 12,
  },
  teamAzul: {
    color: '#3498db',
  },
  teamRojo: {
    color: '#e74c3c',
  },
  teamGris: {
    color: '#95a5a6',
  },
  jugadorHabitacion: {
    fontSize: 10,
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

