import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export const CriticoCineAbsurdoTituloGenerado = ({ movieData }) => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  if (!movieData) {
    return null;
  }

  const {
    titulo,
    genero,
    director,
    ano,
    duracion,
    sinopsis,
    elenco,
    ratingInicial,
    presupuesto,
    taquilla,
  } = movieData;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>Película de la Ronda:</Text>
        <Text style={styles.titulo}>{titulo}</Text>
      </View>

      <View style={styles.metadatosBasicos}>
        <View style={styles.metadatoItem}>
          <Text style={styles.metadatoLabel}>Género</Text>
          <Text style={styles.metadatoValor}>{genero}</Text>
        </View>
        <View style={styles.metadatoItem}>
          <Text style={styles.metadatoLabel}>Año</Text>
          <Text style={styles.metadatoValor}>{ano}</Text>
        </View>
        <View style={styles.metadatoItem}>
          <Text style={styles.metadatoLabel}>Duración</Text>
          <Text style={styles.metadatoValor}>{duracion} min</Text>
        </View>
      </View>

      <View style={styles.directorSection}>
        <Text style={styles.directorLabel}>Dirigida por</Text>
        <Text style={styles.directorNombre}>{director}</Text>
      </View>

      <View style={styles.ratingSection}>
        <Text style={styles.ratingLabel}>Rating Inicial:</Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <Text
              key={star}
              style={[
                styles.star,
                star <= Math.round(ratingInicial) && styles.starFilled,
              ]}
            >
              ★
            </Text>
          ))}
          <Text style={styles.ratingNumero}>{ratingInicial.toFixed(1)}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.detallesButton}
        onPress={() => setMostrarDetalles(!mostrarDetalles)}
      >
        <Text style={styles.detallesButtonText}>
          {mostrarDetalles ? 'Ocultar Detalles' : 'Ver Más Detalles'}
        </Text>
      </TouchableOpacity>

      {mostrarDetalles && (
        <View style={styles.detallesContainer}>
          <View style={styles.sinopsisSection}>
            <Text style={styles.sinopsisTitulo}>Sinopsis</Text>
            <Text style={styles.sinopsisTexto}>{sinopsis}</Text>
          </View>

          <View style={styles.elencoSection}>
            <Text style={styles.elencoTitulo}>Elenco Principal</Text>
            <View style={styles.elencoLista}>
              {elenco.map((actor, index) => (
                <Text key={index} style={styles.elencoActor}>
                  • {actor}
                </Text>
              ))}
            </View>
          </View>

          <View style={styles.finanzasSection}>
            <View style={styles.finanzaItem}>
              <Text style={styles.finanzaLabel}>Presupuesto</Text>
              <Text style={styles.finanzaValor}>${presupuesto}M</Text>
            </View>
            <View style={styles.finanzaItem}>
              <Text style={styles.finanzaLabel}>Taquilla</Text>
              <Text style={styles.finanzaValor}>${taquilla}M</Text>
            </View>
            <View style={styles.finanzaItem}>
              <Text style={styles.finanzaLabel}>Beneficio</Text>
              <Text
                style={[
                  styles.finanzaValor,
                  taquilla - presupuesto >= 0
                    ? styles.finanzaPositiva
                    : styles.finanzaNegativa,
                ]}
              >
                ${taquilla - presupuesto >= 0 ? '+' : ''}
                {taquilla - presupuesto}M
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 32,
  },
  metadatosBasicos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  metadatoItem: {
    alignItems: 'center',
  },
  metadatoLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  metadatoValor: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  directorSection: {
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  directorLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  directorNombre: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
    fontStyle: 'italic',
  },
  ratingSection: {
    alignItems: 'center',
    marginBottom: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  ratingLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    fontSize: 20,
    color: '#ddd',
    marginHorizontal: 2,
  },
  starFilled: {
    color: '#FFD700',
  },
  ratingNumero: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginLeft: 8,
  },
  detallesButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  detallesButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  detallesContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 2,
    borderTopColor: '#e0e0e0',
  },
  sinopsisSection: {
    marginBottom: 16,
  },
  sinopsisTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  sinopsisTexto: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    textAlign: 'justify',
  },
  elencoSection: {
    marginBottom: 16,
  },
  elencoTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  elencoLista: {
    marginLeft: 8,
  },
  elencoActor: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    lineHeight: 20,
  },
  finanzasSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  finanzaItem: {
    alignItems: 'center',
  },
  finanzaLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  finanzaValor: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  finanzaPositiva: {
    color: '#4CAF50',
  },
  finanzaNegativa: {
    color: '#f44336',
  },
});
