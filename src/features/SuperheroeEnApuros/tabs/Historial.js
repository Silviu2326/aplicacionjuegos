import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Datos falsos de historial de partidas
const FAKE_HISTORIAL = [
  {
    id: 1,
    fecha: '2024-11-15',
    hora: '20:30',
    puntuacion: 45,
    rondas: 15,
    tiempoTotal: '1:25:30',
    mejorRacha: 8,
    modoVotacion: true,
    misiones: [
      {
        poder: 'Controlar el crecimiento de las uñas',
        problema: 'Se ha atascado la tostada en la tostadora',
        votos: 3,
        tiempoUsado: '0:52',
      },
      {
        poder: 'Hablar fluidamente con los muebles',
        problema: 'Te persigue una abeja muy insistente',
        votos: 5,
        tiempoUsado: '1:05',
      },
      {
        poder: 'Hacer que cualquier queso cante ópera',
        problema: 'El silencio en el ascensor es increíblemente incómodo',
        votos: 4,
        tiempoUsado: '0:48',
      },
      {
        poder: 'Teletransportarse, pero solo a tiendas de calcetines',
        problema: 'Necesitas encontrar el mando a distancia de la tele',
        votos: 6,
        tiempoUsado: '1:12',
      },
      {
        poder: 'Invocar una llovizna de purpurina no biodegradable',
        problema: 'Tu planta se está muriendo de sed',
        votos: 2,
        tiempoUsado: '0:35',
      },
    ],
    promedioVotos: 4,
    promedioTiempo: '0:58',
  },
  {
    id: 2,
    fecha: '2024-11-14',
    hora: '18:15',
    puntuacion: 32,
    rondas: 12,
    tiempoTotal: '1:05:20',
    mejorRacha: 6,
    modoVotacion: false,
    misiones: [
      {
        poder: 'Capacidad de oler los colores',
        problema: 'Has olvidado la contraseña de tu ordenador',
        votos: 0,
        tiempoUsado: '1:00',
      },
      {
        poder: 'Convertir tu sudor en refresco de cola light',
        problema: 'Estás en una primera cita y no tienes tema de conversación',
        votos: 0,
        tiempoUsado: '0:55',
      },
      {
        poder: 'Controlar el tiempo, pero solo en tu microondas',
        problema: 'Se ha ido la luz en toda la casa',
        votos: 0,
        tiempoUsado: '1:10',
      },
    ],
    promedioVotos: 0,
    promedioTiempo: '1:01',
  },
  {
    id: 3,
    fecha: '2024-11-13',
    hora: '22:00',
    puntuacion: 58,
    rondas: 20,
    tiempoTotal: '1:48:15',
    mejorRacha: 12,
    modoVotacion: true,
    misiones: [
      {
        poder: 'Hacer que los calcetines siempre encuentren su pareja',
        problema: 'Se te ha roto la cremallera de los pantalones',
        votos: 7,
        tiempoUsado: '0:42',
      },
      {
        poder: 'Poder doblar la realidad, pero solo en fotografías',
        problema: 'Tu teléfono se ha quedado sin batería en mitad de una llamada',
        votos: 5,
        tiempoUsado: '1:00',
      },
      {
        poder: 'Hacer que los objetos inanimados te den consejos',
        problema: 'Has perdido tu progreso en un videojuego',
        votos: 8,
        tiempoUsado: '0:58',
      },
      {
        poder: 'Controlar la gravedad, pero solo en tu habitación',
        problema: 'Un gato se ha subido a tu coche y no quiere bajarse',
        votos: 6,
        tiempoUsado: '1:15',
      },
      {
        poder: 'Hacer que los errores tipográficos se corrijan solos',
        problema: 'Has enviado un mensaje a la persona equivocada',
        votos: 9,
        tiempoUsado: '0:50',
      },
    ],
    promedioVotos: 7,
    promedioTiempo: '0:59',
  },
  {
    id: 4,
    fecha: '2024-11-12',
    hora: '16:45',
    puntuacion: 28,
    rondas: 10,
    tiempoTotal: '0:52:30',
    mejorRacha: 5,
    modoVotacion: true,
    misiones: [
      {
        poder: 'Ver el futuro, pero solo de eventos irrelevantes',
        problema: 'Ha empezado a llover justo cuando saliste sin paraguas',
        votos: 3,
        tiempoUsado: '0:45',
      },
      {
        poder: 'Poder ver a través de objetos, pero solo si son transparentes',
        problema: 'Se te ha metido algo en el ojo',
        votos: 4,
        tiempoUsado: '1:00',
      },
      {
        poder: 'Leer las emociones de los electrodomésticos',
        problema: 'La nevera hace un ruido extraño',
        votos: 2,
        tiempoUsado: '0:50',
      },
    ],
    promedioVotos: 3,
    promedioTiempo: '0:58',
  },
  {
    id: 5,
    fecha: '2024-11-11',
    hora: '19:30',
    puntuacion: 67,
    rondas: 22,
    tiempoTotal: '2:15:45',
    mejorRacha: 15,
    modoVotacion: true,
    misiones: [
      {
        poder: 'Crear objetos de la nada, pero solo si son inútiles',
        problema: 'Has olvidado comprar el ingrediente principal',
        votos: 8,
        tiempoUsado: '1:05',
      },
      {
        poder: 'Hacer que aparezcan flores, pero solo en lugares incómodos',
        problema: 'Tu planta se está muriendo de sed',
        votos: 6,
        tiempoUsado: '0:52',
      },
      {
        poder: 'Generar burbujas de jabón de tamaño épico',
        problema: 'El desagüe del lavabo está atascado',
        votos: 10,
        tiempoUsado: '1:18',
      },
      {
        poder: 'Crear música con solo pensar en ella',
        problema: 'El silencio en el ascensor es increíblemente incómodo',
        votos: 7,
        tiempoUsado: '0:48',
      },
      {
        poder: 'Hacer que los objetos se muevan, pero solo cuando no los miras',
        problema: 'Necesitas encontrar el mando a distancia de la tele',
        votos: 9,
        tiempoUsado: '1:00',
      },
    ],
    promedioVotos: 8,
    promedioTiempo: '1:00',
  },
  {
    id: 6,
    fecha: '2024-11-10',
    hora: '14:20',
    puntuacion: 38,
    rondas: 14,
    tiempoTotal: '1:12:10',
    mejorRacha: 7,
    modoVotacion: false,
    misiones: [
      {
        poder: 'Ralentizar el tiempo, pero solo para ti mismo',
        problema: 'Te has quedado dormido y has perdido la alarma',
        votos: 0,
        tiempoUsado: '1:05',
      },
      {
        poder: 'Acelerar el tiempo, pero solo en tu jardín',
        problema: 'Tu planta se está muriendo de sed',
        votos: 0,
        tiempoUsado: '0:55',
      },
      {
        poder: 'Poder rebobinar el tiempo, pero solo 5 segundos',
        problema: 'Has enviado un mensaje sin querer',
        votos: 0,
        tiempoUsado: '1:10',
      },
    ],
    promedioVotos: 0,
    promedioTiempo: '1:03',
  },
  {
    id: 7,
    fecha: '2024-11-09',
    hora: '21:00',
    puntuacion: 52,
    rondas: 18,
    tiempoTotal: '1:35:20',
    mejorRacha: 10,
    modoVotacion: true,
    misiones: [
      {
        poder: 'Controlar el fuego, pero solo de velas',
        problema: 'Se ha ido la luz en toda la casa',
        votos: 5,
        tiempoUsado: '0:58',
      },
      {
        poder: 'Manipular el agua, pero solo si está en vasos',
        problema: 'Tu planta se está muriendo de sed',
        votos: 6,
        tiempoUsado: '1:05',
      },
      {
        poder: 'Controlar el viento, pero solo dentro de edificios',
        problema: 'Hay mucho viento y no puedes abrir tu paraguas',
        votos: 4,
        tiempoUsado: '0:52',
      },
      {
        poder: 'Poder crear hielo, pero solo en forma de cubitos',
        problema: 'Hace demasiado calor y no tienes aire acondicionado',
        votos: 7,
        tiempoUsado: '1:12',
      },
    ],
    promedioVotos: 5.5,
    promedioTiempo: '1:01',
  },
  {
    id: 8,
    fecha: '2024-11-08',
    hora: '17:30',
    puntuacion: 41,
    rondas: 16,
    tiempoTotal: '1:28:45',
    mejorRacha: 9,
    modoVotacion: true,
    misiones: [
      {
        poder: 'Leer la mente, pero solo pensamientos sobre comida',
        problema: 'Has pedido comida picante por error',
        votos: 6,
        tiempoUsado: '1:00',
      },
      {
        poder: 'Persuadir a cualquiera, pero solo para que te dé su sándwich',
        problema: 'Se te ha acabado el agua justo cuando tenías sed',
        votos: 5,
        tiempoUsado: '0:55',
      },
      {
        poder: 'Hacer que la gente olvide cosas, pero solo contraseñas',
        problema: 'Has olvidado la contraseña de tu ordenador',
        votos: 8,
        tiempoUsado: '1:08',
      },
    ],
    promedioVotos: 6.3,
    promedioTiempo: '1:01',
  },
];

export const SuperheroeEnApurosHistorial = () => {
  const [filter, setFilter] = useState('todos'); // todos, conVotacion, sinVotacion

  const filteredHistorial = FAKE_HISTORIAL.filter((item) => {
    if (filter === 'todos') return true;
    if (filter === 'conVotacion') return item.modoVotacion;
    if (filter === 'sinVotacion') return !item.modoVotacion;
    return true;
  });

  const totalPartidas = FAKE_HISTORIAL.length;
  const promedioPuntuacion = Math.round(
    FAKE_HISTORIAL.reduce((sum, item) => sum + item.puntuacion, 0) / totalPartidas
  );
  const mejorPuntuacion = Math.max(...FAKE_HISTORIAL.map(item => item.puntuacion));
  const mejorRachaGlobal = Math.max(...FAKE_HISTORIAL.map(item => item.mejorRacha));
  const totalTiempoJugado = FAKE_HISTORIAL.reduce((sum, item) => {
    const [horas, minutos, segundos] = item.tiempoTotal.split(':').map(Number);
    return sum + horas * 3600 + minutos * 60 + segundos;
  }, 0);
  const horasTotales = Math.floor(totalTiempoJugado / 3600);
  const minutosTotales = Math.floor((totalTiempoJugado % 3600) / 60);

  const totalVotos = FAKE_HISTORIAL
    .filter(item => item.modoVotacion)
    .reduce((sum, item) => {
      return sum + item.misiones.reduce((mSum, m) => mSum + m.votos, 0);
    }, 0);

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

      <View style={styles.votosSummary}>
        <Text style={styles.votosSummaryLabel}>Total de Votos Recibidos</Text>
        <Text style={styles.votosSummaryValue}>{totalVotos}</Text>
      </View>

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Filtrar por modo:</Text>
        <View style={styles.filterButtons}>
          {['todos', 'conVotacion', 'sinVotacion'].map((filt) => (
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
                {filt === 'todos' ? 'Todos' : filt === 'conVotacion' ? 'Con Votación' : 'Sin Votación'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.historialList}>
        {filteredHistorial.map((partida) => {
          const totalVotosPartida = partida.misiones.reduce((sum, m) => sum + m.votos, 0);
          const misionConMasVotos = partida.misiones.reduce((max, m) => 
            m.votos > max.votos ? m : max, 
            partida.misiones[0] || { votos: 0 }
          );

          return (
            <View key={partida.id} style={styles.historialCard}>
              <View style={styles.historialHeader}>
                <View>
                  <Text style={styles.historialFecha}>{partida.fecha}</Text>
                  <Text style={styles.historialHora}>{partida.hora}</Text>
                </View>
                <View
                  style={[
                    styles.modoBadge,
                    partida.modoVotacion ? styles.modoBadgeVotacion : styles.modoBadgeNormal,
                  ]}
                >
                  <Text style={styles.modoBadgeText}>
                    {partida.modoVotacion ? '🗳️ Con Votación' : '🎮 Normal'}
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
                  <Text style={styles.statItemLabel}>Racha</Text>
                  <Text style={styles.statItemValue}>{partida.mejorRacha}</Text>
                </View>
              </View>

              {partida.modoVotacion && (
                <View style={styles.votosContainer}>
                  <Text style={styles.votosLabel}>
                    Total de votos: {totalVotosPartida} | Promedio: {partida.promedioVotos.toFixed(1)}
                  </Text>
                  {misionConMasVotos.votos > 0 && (
                    <View style={styles.mejorMisionContainer}>
                      <Text style={styles.mejorMisionLabel}>🏆 Misión más votada:</Text>
                      <Text style={styles.mejorMisionPoder}>
                        {misionConMasVotos.poder}
                      </Text>
                      <Text style={styles.mejorMisionProblema}>
                        Problema: {misionConMasVotos.problema}
                      </Text>
                      <Text style={styles.mejorMisionVotos}>
                        {misionConMasVotos.votos} votos
                      </Text>
                    </View>
                  )}
                </View>
              )}

              <View style={styles.misionesContainer}>
                <Text style={styles.misionesLabel}>
                  Misiones completadas ({partida.misiones.length}):
                </Text>
                {partida.misiones.slice(0, 3).map((mision, index) => (
                  <View key={index} style={styles.misionItem}>
                    <View style={styles.misionHeader}>
                      <Text style={styles.misionIndex}>#{index + 1}</Text>
                      {partida.modoVotacion && (
                        <Text style={styles.misionVotos}>
                          {mision.votos} {mision.votos === 1 ? 'voto' : 'votos'}
                        </Text>
                      )}
                    </View>
                    <Text style={styles.misionPoder}>
                      ⚡ {mision.poder}
                    </Text>
                    <Text style={styles.misionProblema}>
                      🚨 {mision.problema}
                    </Text>
                    <Text style={styles.misionTiempo}>
                      ⏱️ {mision.tiempoUsado}
                    </Text>
                  </View>
                ))}
                {partida.misiones.length > 3 && (
                  <Text style={styles.masMisiones}>
                    +{partida.misiones.length - 3} misiones más
                  </Text>
                )}
              </View>

              <View style={styles.promedioContainer}>
                <Text style={styles.promedioText}>
                  ⏱️ Promedio por misión: {partida.promedioTiempo}
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
    color: '#9B59B6',
    marginBottom: 5,
  },
  summaryLabel: {
    fontSize: 12,
    color: '#7f8c8d',
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
  votosSummary: {
    backgroundColor: '#FFD700',
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
  votosSummaryLabel: {
    fontSize: 12,
    color: '#2c3e50',
    marginBottom: 5,
    fontWeight: '600',
  },
  votosSummaryValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
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
  modoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  modoBadgeVotacion: {
    backgroundColor: '#4CAF50',
  },
  modoBadgeNormal: {
    backgroundColor: '#95A5A6',
  },
  modoBadgeText: {
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
    color: '#9B59B6',
  },
  votosContainer: {
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  votosLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  mejorMisionContainer: {
    backgroundColor: '#FFF9E6',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  mejorMisionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  mejorMisionPoder: {
    fontSize: 13,
    color: '#9B59B6',
    fontWeight: '600',
    marginBottom: 3,
  },
  mejorMisionProblema: {
    fontSize: 12,
    color: '#E74C3C',
    marginBottom: 5,
  },
  mejorMisionVotos: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
  misionesContainer: {
    marginBottom: 15,
  },
  misionesLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#34495e',
    marginBottom: 10,
  },
  misionItem: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#9B59B6',
  },
  misionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  misionIndex: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#9B59B6',
  },
  misionVotos: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  misionPoder: {
    fontSize: 13,
    color: '#9B59B6',
    fontWeight: '600',
    marginBottom: 4,
  },
  misionProblema: {
    fontSize: 13,
    color: '#E74C3C',
    marginBottom: 4,
  },
  misionTiempo: {
    fontSize: 11,
    color: '#7f8c8d',
    fontStyle: 'italic',
  },
  masMisiones: {
    fontSize: 12,
    color: '#7f8c8d',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 5,
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

