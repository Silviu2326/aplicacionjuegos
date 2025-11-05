import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const CriticoCineAbsurdoTablaPuntuaciones = ({ jugadores }) => {
  // Ordenar jugadores por puntuación (descendente)
  const jugadoresOrdenados = [...jugadores].sort((a, b) => b.score - a.score);

  // Función para obtener badge según posición
  const getBadge = (index) => {
    if (index === 0) return { emoji: '🥇', text: 'Oro', color: '#FFD700' };
    if (index === 1) return { emoji: '🥈', text: 'Plata', color: '#C0C0C0' };
    if (index === 2) return { emoji: '🥉', text: 'Bronce', color: '#CD7F32' };
    return null;
  };

  // Función para obtener nivel según puntuación
  const getNivel = (score) => {
    if (score >= 20) return { text: 'Maestro', emoji: '👑', color: '#FFD700' };
    if (score >= 15) return { text: 'Experto', emoji: '⭐', color: '#FF9800' };
    if (score >= 10) return { text: 'Avanzado', emoji: '✨', color: '#2196F3' };
    if (score >= 5) return { text: 'Intermedio', emoji: '🎯', color: '#4CAF50' };
    return { text: 'Principiante', emoji: '🌱', color: '#9E9E9E' };
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuaciones</Text>
      <ScrollView style={styles.scrollView}>
        {jugadoresOrdenados.map((jugador, index) => {
          const badge = getBadge(index);
          const nivel = getNivel(jugador.score);
          
          return (
            <View key={jugador.id} style={[
              styles.row,
              index === 0 && styles.rowFirst,
              jugador.isCurrentCritic && styles.rowCritico
            ]}>
              <View style={styles.positionContainer}>
                {badge ? (
                  <View style={[styles.badgeContainer, { backgroundColor: badge.color + '20' }]}>
                    <Text style={styles.badgeEmoji}>{badge.emoji}</Text>
                    <Text style={styles.badgeText}>{badge.text}</Text>
                  </View>
                ) : (
                  <Text style={styles.position}>{index + 1}°</Text>
                )}
              </View>
              <View style={styles.playerInfo}>
                <View style={styles.playerNameRow}>
                  <Text style={styles.playerName}>{jugador.name}</Text>
                  {jugador.isCurrentCritic && (
                    <View style={styles.criticBadge}>
                      <Text style={styles.criticBadgeText}>CRÍTICO</Text>
                    </View>
                  )}
                </View>
                <View style={styles.nivelContainer}>
                  <Text style={[styles.nivelText, { color: nivel.color }]}>
                    {nivel.emoji} {nivel.text}
                  </Text>
                </View>
              </View>
              <View style={styles.scoreContainer}>
                <Text style={styles.score}>{jugador.score.toFixed(1)}</Text>
                <Text style={styles.scoreLabel}>pts</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
    textAlign: 'center',
  },
  scrollView: {
    maxHeight: 300,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  rowFirst: {
    backgroundColor: '#FFF9C4',
    borderLeftWidth: 4,
    borderLeftColor: '#FFD700',
  },
  rowCritico: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  positionContainer: {
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  position: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  badgeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    minWidth: 50,
  },
  badgeEmoji: {
    fontSize: 20,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 2,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  playerNameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginRight: 8,
  },
  criticBadge: {
    backgroundColor: '#FF9800',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  criticBadgeText: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  nivelContainer: {
    marginTop: 4,
  },
  nivelText: {
    fontSize: 12,
    fontWeight: '600',
  },
  scoreContainer: {
    alignItems: 'flex-end',
  },
  score: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  scoreLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

