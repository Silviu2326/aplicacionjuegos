import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const CriticoCineAbsurdoTemporizador = ({ tiempoRestante, activo = true }) => {
  const minutos = Math.floor(tiempoRestante / 60);
  const segundos = tiempoRestante % 60;
  const tiempoFormateado = `${minutos}:${segundos.toString().padStart(2, '0')}`;
  
  // Determinar color según el tiempo restante
  const getColor = () => {
    if (tiempoRestante <= 10) return '#f44336'; // Rojo
    if (tiempoRestante <= 30) return '#ff9800'; // Naranja
    return '#4CAF50'; // Verde
  };

  if (!activo) {
    return null;
  }

  return (
    <View style={[styles.container, { borderColor: getColor() }]}>
      <Text style={styles.label}>Tiempo Restante</Text>
      <Text style={[styles.tiempo, { color: getColor() }]}>
        {tiempoFormateado}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tiempo: {
    fontSize: 36,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

