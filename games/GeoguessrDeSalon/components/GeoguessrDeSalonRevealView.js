import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GeoguessrDeSalonLocationCard } from './GeoguessrDeSalonLocationCard';
import { useGeoguessrDeSalonStore } from '../store/geoguessrDeSalonStore';

export const GeoguessrDeSalonRevealView = ({ onContinue }) => {
  const { currentLocation, currentRound, totalRounds, roundHistory, players } = useGeoguessrDeSalonStore();
  
  // Encontrar el ganador de esta ronda si existe
  const lastRoundResult = roundHistory[roundHistory.length - 1];
  const roundWinner = lastRoundResult ? players.find(p => p.id === lastRoundResult.winnerId) : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🎯 Ubicación Revelada</Text>
          <Text style={styles.roundText}>Ronda {currentRound} de {totalRounds}</Text>
        </View>
        
        {roundWinner && (
          <View style={styles.winnerBanner}>
            <Text style={styles.winnerText}>🏆 ¡{roundWinner.name} adivinó correctamente!</Text>
          </View>
        )}

        {!roundWinner && (
          <View style={styles.noWinnerBanner}>
            <Text style={styles.noWinnerText}>❌ Nadie adivinó esta ronda</Text>
          </View>
        )}
        
        <GeoguessrDeSalonLocationCard location={currentLocation} showName={true} showHints={true} />

        <View style={styles.detailsContainer}>
          <Text style={styles.detailsTitle}>📍 Detalles de la Ubicación</Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Nombre Completo:</Text>
            <Text style={styles.detailValue}>{currentLocation?.name}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>País:</Text>
            <Text style={styles.detailValue}>{currentLocation?.country}</Text>
          </View>
          
          {currentLocation?.city && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Ciudad:</Text>
              <Text style={styles.detailValue}>{currentLocation.city}</Text>
            </View>
          )}
          
          {currentLocation?.continent && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Continente:</Text>
              <Text style={styles.detailValue}>{currentLocation.continent}</Text>
            </View>
          )}
          
          {currentLocation?.coordinates && (
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Coordenadas:</Text>
              <Text style={styles.detailValue}>
                {currentLocation.coordinates.lat.toFixed(4)}°N, {currentLocation.coordinates.lng.toFixed(4)}°E
              </Text>
            </View>
          )}
        </View>

        {currentLocation?.hints && currentLocation.hints.length > 0 && (
          <View style={styles.hintsContainer}>
            <Text style={styles.hintsTitle}>💡 Pistas de esta ubicación:</Text>
            {currentLocation.hints.map((hint, index) => (
              <View key={index} style={styles.hintItem}>
                <Text style={styles.hintText}>• {hint}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity style={styles.continueButton} onPress={onContinue}>
          <Text style={styles.continueButtonText}>
            {currentRound >= totalRounds ? '📊 Ver Resultados Finales' : '➡️ Siguiente Ronda'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  roundText: {
    fontSize: 18,
    color: '#4a90e2',
    fontWeight: '600',
  },
  winnerBanner: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  winnerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  noWinnerBanner: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  noWinnerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  detailsContainer: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  detailLabel: {
    fontSize: 16,
    color: '#ccc',
    fontWeight: '600',
    flex: 1,
  },
  detailValue: {
    fontSize: 16,
    color: '#4a90e2',
    fontWeight: 'bold',
    flex: 2,
    textAlign: 'right',
  },
  hintsContainer: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 12,
    marginVertical: 15,
  },
  hintsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  hintItem: {
    paddingVertical: 6,
    paddingLeft: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  continueButton: {
    backgroundColor: '#4a90e2',
    paddingVertical: 18,
    paddingHorizontal: 30,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
    shadowColor: '#4a90e2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

