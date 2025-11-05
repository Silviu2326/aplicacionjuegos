import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { OrdenaLaHistoriaTarjetaFrase } from './TarjetaFrase';

export const OrdenaLaHistoriaContenedorOrden = ({ frases, ordenSeleccionado, onFraseSelect }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orden Seleccionado</Text>
      <Text style={styles.subtitle}>Arrastra las frases para reorganizarlas</Text>
      
      {ordenSeleccionado.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Selecciona las frases en orden</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {ordenSeleccionado.map((fraseIndex, index) => {
            const frase = frases[fraseIndex];
            if (!frase) return null;
            
            return (
              <View key={`${fraseIndex}-${index}`} style={styles.ordenItem}>
                <View style={styles.positionBadge}>
                  <Text style={styles.positionText}>{index + 1}º</Text>
                </View>
                <View style={styles.fraseContainer}>
                  <Text style={styles.fraseText}>{frase}</Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => {
                    const newOrden = ordenSeleccionado.filter((_, i) => i !== index);
                    // Reconstruir el orden correctamente
                    if (onFraseSelect) {
                      // Simular la remoción
                      onFraseSelect(fraseIndex, false);
                    }
                  }}
                >
                  <Text style={styles.removeButtonText}>×</Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

// Versión mejorada con funcionalidad de arrastrar
export const OrdenaLaHistoriaContenedorOrdenMejorado = ({ frases, ordenSeleccionado, onOrdenChange }) => {
  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newOrden = [...ordenSeleccionado];
    [newOrden[index - 1], newOrden[index]] = [newOrden[index], newOrden[index - 1]];
    if (onOrdenChange) onOrdenChange(newOrden);
  };

  const handleMoveDown = (index) => {
    if (index === ordenSeleccionado.length - 1) return;
    const newOrden = [...ordenSeleccionado];
    [newOrden[index], newOrden[index + 1]] = [newOrden[index + 1], newOrden[index]];
    if (onOrdenChange) onOrdenChange(newOrden);
  };

  const handleRemove = (index) => {
    const newOrden = ordenSeleccionado.filter((_, i) => i !== index);
    if (onOrdenChange) onOrdenChange(newOrden);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orden de la Historia</Text>
      <Text style={styles.subtitle}>
        {ordenSeleccionado.length}/{frases.length} frases ordenadas
      </Text>
      
      {ordenSeleccionado.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Toca las frases para comenzar a ordenarlas</Text>
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          {ordenSeleccionado.map((fraseIndex, index) => {
            const frase = frases[fraseIndex];
            if (!frase) return null;
            
            return (
              <View key={`${fraseIndex}-${index}`} style={styles.ordenItem}>
                <View style={styles.positionBadge}>
                  <Text style={styles.positionText}>{index + 1}º</Text>
                </View>
                <View style={styles.fraseContainer}>
                  <Text style={styles.fraseText}>{frase}</Text>
                </View>
                <View style={styles.controls}>
                  <TouchableOpacity
                    style={[styles.controlButton, index === 0 && styles.controlButtonDisabled]}
                    onPress={() => handleMoveUp(index)}
                    disabled={index === 0}
                  >
                    <Text style={styles.controlButtonText}>↑</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.controlButton,
                      index === ordenSeleccionado.length - 1 && styles.controlButtonDisabled,
                    ]}
                    onPress={() => handleMoveDown(index)}
                    disabled={index === ordenSeleccionado.length - 1}
                  >
                    <Text style={styles.controlButtonText}>↓</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemove(index)}
                  >
                    <Text style={styles.removeButtonText}>×</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999999',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 300,
  },
  ordenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  positionBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  positionText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  fraseContainer: {
    flex: 1,
  },
  fraseText: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 20,
  },
  controls: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  controlButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#45B7D1',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  controlButtonDisabled: {
    backgroundColor: '#CCCCCC',
    opacity: 0.5,
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E74C3C',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 4,
  },
  removeButtonText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

