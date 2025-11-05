import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { PARTIDAS_AVALON_FAKE } from '../constants/DatosFalsosAvalon';

export const TheResistanceAvalonHistorial = () => {
  const [filterGanador, setFilterGanador] = useState('todos'); // todos, Leales, Esbirros
  const [filterJugadores, setFilterJugadores] = useState('todos'); // todos, 5, 6, 7, 8, 9, 10

  const filteredPartidas = PARTIDAS_AVALON_FAKE.filter((partida) => {
    const matchGanador = filterGanador === 'todos' || partida.ganador === filterGanador;
    const matchJugadores = filterJugadores === 'todos' || partida.numJugadores === parseInt(filterJugadores);
    
    return matchGanador && matchJugadores;
  });

  const estadisticas = {
    totalPartidas: PARTIDAS_AVALON_FAKE.length,
    partidasLeales: PARTIDAS_AVALON_FAKE.filter(p => p.ganador === 'Leales').length,
    partidasEsbirros: PARTIDAS_AVALON_FAKE.filter(p => p.ganador === 'Esbirros').length,
    promedioDuracion: Math.round(
      PARTIDAS_AVALON_FAKE.reduce((sum, p) => {
        const [min, sec] = p.duracion.split(':').map(Number);
        return sum + min * 60 + sec;
      }, 0) / PARTIDAS_AVALON_FAKE.length
    ),
    promedioMisionesExitosas: Math.round(
      PARTIDAS_AVALON_FAKE.reduce((sum, p) => sum + p.misionesExitosas, 0) / PARTIDAS_AVALON_FAKE.length
    ),
    promedioMisionesFallidas: Math.round(
      PARTIDAS_AVALON_FAKE.reduce((sum, p) => sum + p.misionesFallidas, 0) / PARTIDAS_AVALON_FAKE.length
    ),
    promedioJugadores: Math.round(
      PARTIDAS_AVALON_FAKE.reduce((sum, p) => sum + p.numJugadores, 0) / PARTIDAS_AVALON_FAKE.length
    ),
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getGanadorColor = (ganador) => {
    return ganador === 'Leales' ? '#27ae60' : '#e74c3c';
  };

  const getGanadorIcon = (ganador) => {
    return ganador === 'Leales' ? '🛡️' : '⚔️';
  };

  const getRoleIcon = (role) => {
    const icons = {
      merlin: '🧙',
      perceval: '👁️',
      loyal_servant: '🛡️',
      assassin: '🗡️',
      morgana: '🔮',
      mordred: '👹',
      oberon: '👤',
      minion: '⚔️',
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
          <Text style={styles.summaryValue}>{estadisticas.partidasLeales}</Text>
          <Text style={styles.summaryLabel}>Leales</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.partidasEsbirros}</Text>
          <Text style={styles.summaryLabel}>Esbirros</Text>
        </View>
        <View style={styles.summaryCard}>
          <Text style={styles.summaryValue}>{estadisticas.promedioJugadores}</Text>
          <Text style={styles.summaryLabel}>Jugadores</Text>
        </View>
      </View>

      <View style={styles.timeSummary}>
        <Text style={styles.timeSummaryLabel}>Tiempo Promedio</Text>
        <Text style={styles.timeSummaryValue}>{formatTime(estadisticas.promedioDuracion)}</Text>
        <Text style={styles.timeSummaryLabel}>Misiones Exitosas (promedio)</Text>
        <Text style={styles.timeSummaryValue}>{estadisticas.promedioMisionesExitosas.toFixed(1)}</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por ganador:</Text>
        <View style={styles.filterButtons}>
          {['todos', 'Leales', 'Esbirros'].map((filt) => (
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
            {['todos', '5', '6', '7', '8', '9', '10'].map((filt) => (
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
            (partida.ganador === 'Leales' && j.team === 'loyal' && j.estado === 'vivo') ||
            (partida.ganador === 'Esbirros' && j.team === 'spy' && j.estado === 'vivo')
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
                  <Text style={styles.statItemLabel}>Esbirros</Text>
                  <Text style={styles.statItemValue}>{partida.numSpies}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Éxitos</Text>
                  <Text style={[styles.statItemValue, styles.statSuccess]}>{partida.misionesExitosas}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Fracasos</Text>
                  <Text style={[styles.statItemValue, styles.statFail]}>{partida.misionesFallidas}</Text>
                </View>
                <View style={styles.statItem}>
                  <Text style={styles.statItemLabel}>Duración</Text>
                  <Text style={styles.statItemValue}>{partida.duracion}</Text>
                </View>
              </View>

              <View style={styles.missionsSummary}>
                <Text style={styles.missionsSummaryLabel}>Progreso de Misiones:</Text>
                <View style={styles.missionsBar}>
                  {[1, 2, 3, 4, 5].map((num) => {
                    const isExito = num <= partida.misionesExitosas;
                    const isFracaso = num > partida.misionesExitosas && 
                      num <= partida.misionesExitosas + partida.misionesFallidas;
                    return (
                      <View
                        key={num}
                        style={[
                          styles.missionDot,
                          isExito && styles.missionDotSuccess,
                          isFracaso && styles.missionDotFail,
                          !isExito && !isFracaso && styles.missionDotPending,
                        ]}
                      />
                    );
                  })}
                </View>
                <Text style={styles.missionsSummaryText}>
                  {partida.misionesExitosas} éxitos / {partida.misionesFallidas} fracasos
                </Text>
              </View>

              <View style={styles.eventosContainer}>
                <Text style={styles.eventosLabel}>Eventos principales:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.eventosList}>
                    {partida.eventos.slice(0, 6).map((evento, index) => (
                      <View key={index} style={styles.eventoItem}>
                        <Text style={styles.eventoText}>
                          {evento.tipo === 'team_proposal'
                            ? `👑 ${evento.lider} propone equipo`
                            : evento.tipo === 'vote'
                            ? evento.resultado === 'aprobado'
                              ? `✅ Votación aprobada`
                              : `❌ Votación rechazada`
                            : evento.tipo === 'mission'
                            ? evento.resultado === 'exito'
                              ? `✅ Misión ${evento.mision || 'exitosa'}`
                              : `❌ Misión ${evento.mision || 'saboteada'}`
                            : evento.tipo === 'assassination'
                            ? evento.acertado
                              ? `🗡️ Asesinato exitoso`
                              : `🗡️ Asesinato fallido`
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
                        jugador.team === 'loyal' ? styles.teamLoyal : styles.teamSpy
                      ]}>
                        {jugador.team === 'loyal' ? '🛡️' : '⚔️'}
                      </Text>
                      {jugador.estado === 'eliminado' && (
                        <Text style={styles.jugadorEstado}>💀</Text>
                      )}
                    </View>
                  ))}
                </View>
              </View>

              {partida.votosRechazados > 0 && (
                <View style={styles.rejectedVotes}>
                  <Text style={styles.rejectedVotesText}>
                    ⚠️ {partida.votosRechazados} votos rechazados durante la partida
                  </Text>
                </View>
              )}

              <View style={styles.victoriaContainer}>
                <Text style={styles.victoriaText}>
                  {victorias} {partida.ganador === 'Leales' ? 'leal(es)' : 'esbirro(s)'} sobrevivieron
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
    backgroundColor: '#8B4513',
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
    backgroundColor: '#8B4513',
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
  statSuccess: {
    color: '#27ae60',
  },
  statFail: {
    color: '#e74c3c',
  },
  missionsSummary: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  missionsSummaryLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 10,
  },
  missionsBar: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'center',
  },
  missionDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#666',
  },
  missionDotSuccess: {
    backgroundColor: '#27ae60',
    borderColor: '#27ae60',
  },
  missionDotFail: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  missionDotPending: {
    backgroundColor: '#1a1a1a',
  },
  missionsSummaryText: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'center',
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
  jugadorTeam: {
    fontSize: 12,
  },
  teamLoyal: {
    color: '#27ae60',
  },
  teamSpy: {
    color: '#e74c3c',
  },
  jugadorEstado: {
    fontSize: 12,
  },
  rejectedVotes: {
    backgroundColor: '#e74c3c',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
  },
  rejectedVotesText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
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

