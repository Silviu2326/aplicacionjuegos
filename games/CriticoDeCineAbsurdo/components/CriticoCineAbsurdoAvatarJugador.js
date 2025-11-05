import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CriticoCineAbsurdoAvatarJugador = ({ 
  jugador, 
  esCritico = false,
  mostrarPuntuacion = false 
}) => {
  // Obtener iniciales del nombre
  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Color de fondo basado en el nombre
  const getAvatarColor = (name) => {
    const colors = [
      '#2196F3', '#4CAF50', '#FF9800', '#9C27B0',
      '#F44336', '#00BCD4', '#FFC107', '#E91E63',
      '#3F51B5', '#8BC34A', '#FF5722', '#795548',
    ];
    const index = name.length % colors.length;
    return colors[index];
  };

  const avatarColor = getAvatarColor(jugador.name);
  const initials = getInitials(jugador.name);

  return (
    <View style={styles.container}>
      <View style={[
        styles.avatar,
        { backgroundColor: avatarColor },
        esCritico && styles.avatarCritico
      ]}>
        <Text style={styles.initials}>{initials}</Text>
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {jugador.name}
      </Text>
      {esCritico && (
        <View style={styles.criticBadge}>
          <Text style={styles.criticBadgeText}>CRÍTICO</Text>
        </View>
      )}
      {mostrarPuntuacion && (
        <Text style={styles.score}>{jugador.score.toFixed(1)} pts</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 8,
    width: 80,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatarCritico: {
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 8,
    elevation: 5,
  },
  initials: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    maxWidth: 80,
  },
  criticBadge: {
    backgroundColor: '#FF9800',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginTop: 4,
  },
  criticBadgeText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
  score: {
    fontSize: 10,
    color: '#666',
    marginTop: 4,
  },
});

