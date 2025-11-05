import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { GeoguessrDeSalonLocationCard } from './GeoguessrDeSalonLocationCard';
import { useGeoguessrDeSalonStore } from '../store/geoguessrDeSalonStore';

export const GeoguessrDeSalonGuideView = ({ onGuessCorrect, onGuessIncorrect }) => {
  const { currentLocation, currentRound, totalRounds, endRoundWithoutWinner } = useGeoguessrDeSalonStore();
  const [showTips, setShowTips] = useState(false);

  const handleEndRound = () => {
    if (endRoundWithoutWinner()) {
      // La ronda terminará automáticamente y se mostrará la vista de revelación
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>🧭 Eres el Guía</Text>
          <Text style={styles.roundBadge}>Ronda {currentRound}/{totalRounds}</Text>
        </View>
        
        <Text style={styles.instruction}>
          Observa la ubicación y responde a las preguntas de los Exploradores.
          Solo puedes responder: "Sí", "No" o "Irrelevante".
        </Text>

        <GeoguessrDeSalonLocationCard location={currentLocation} showName={true} showHints={true} />

        <View style={styles.infoBox}>
          <Text style={styles.infoTitle}>📋 Información de la Ubicación</Text>
          {currentLocation && (
            <>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>País:</Text>
                <Text style={styles.infoValue}>{currentLocation.country}</Text>
              </View>
              {currentLocation.city && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Ciudad:</Text>
                  <Text style={styles.infoValue}>{currentLocation.city}</Text>
                </View>
              )}
              {currentLocation.continent && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Continente:</Text>
                  <Text style={styles.infoValue}>{currentLocation.continent}</Text>
                </View>
              )}
            </>
          )}
        </View>

        <TouchableOpacity 
          style={styles.tipsButton}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.tipsButtonText}>
            💡 Consejos para el Guía {showTips ? '▲' : '▼'}
          </Text>
        </TouchableOpacity>

        {showTips && (
          <View style={styles.tipsContainer}>
            <Text style={styles.tipItem}>✓ Sé honesto con tus respuestas</Text>
            <Text style={styles.tipItem}>✓ Solo responde "Sí", "No" o "Irrelevante"</Text>
            <Text style={styles.tipItem}>✓ No des pistas adicionales con palabras</Text>
            <Text style={styles.tipItem}>✓ Si la pregunta es ambigua, di "Irrelevante"</Text>
            <Text style={styles.tipItem}>✓ Mantén un tono neutral</Text>
          </View>
        )}

        <View style={styles.controlsContainer}>
          <Text style={styles.controlsTitle}>¿Alguien intentó adivinar?</Text>
          <Text style={styles.controlsSubtitle}>
            Marca si la respuesta fue correcta o incorrecta
          </Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity 
              style={[styles.button, styles.correctButton]} 
              onPress={onGuessCorrect}
            >
              <Text style={styles.buttonText}>✅ Correcto</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.incorrectButton]} 
              onPress={onGuessIncorrect}
            >
              <Text style={styles.buttonText}>❌ Incorrecto</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.divider} />
          
          <Text style={styles.endRoundLabel}>Si nadie puede adivinar:</Text>
          <TouchableOpacity 
            style={[styles.button, styles.endRoundButton]} 
            onPress={handleEndRound}
          >
            <Text style={styles.buttonText}>⏭️ Terminar Ronda sin Ganador</Text>
          </TouchableOpacity>
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  roundBadge: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    backgroundColor: '#16213e',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
  },
  infoBox: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginVertical: 15,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a3e',
  },
  infoLabel: {
    fontSize: 14,
    color: '#ccc',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#4a90e2',
    fontWeight: 'bold',
  },
  tipsButton: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
  },
  tipsButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    textAlign: 'center',
  },
  tipsContainer: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  tipItem: {
    fontSize: 14,
    color: '#ccc',
    marginVertical: 5,
    lineHeight: 20,
  },
  controlsContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#16213e',
    borderRadius: 12,
  },
  controlsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  controlsSubtitle: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
    marginBottom: 15,
  },
  button: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  correctButton: {
    backgroundColor: '#4caf50',
  },
  incorrectButton: {
    backgroundColor: '#f44336',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a3e',
    marginVertical: 15,
  },
  endRoundLabel: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    marginBottom: 10,
  },
  endRoundButton: {
    backgroundColor: '#666',
    flex: 1,
    paddingVertical: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

