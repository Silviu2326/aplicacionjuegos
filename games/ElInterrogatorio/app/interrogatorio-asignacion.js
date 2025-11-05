import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useInterrogatorioStore } from '../store/interrogatorioStore';
import { InterrogatorioHeader } from '../components/InterrogatorioHeader';

export const ElInterrogatorioAsignacion = ({ navigation }) => {
  const selectSuspect = useInterrogatorioStore((state) => state.selectSuspect);
  const currentRound = useInterrogatorioStore((state) => state.currentRound);
  const players = useInterrogatorioStore((state) => state.players);
  const currentSuspectIndex = useInterrogatorioStore((state) => state.currentSuspectIndex);
  const getCurrentSuspect = useInterrogatorioStore((state) => state.getCurrentSuspect);
  const roundStats = useInterrogatorioStore((state) => state.roundStats);

  useEffect(() => {
    // Seleccionar sospechoso aleatoriamente al montar
    selectSuspect();
  }, [currentRound]);

  const handleContinue = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('secreto');
    }
  };

  const suspect = getCurrentSuspect();
  const detectives = players.filter((_, index) => index !== currentSuspectIndex);
  
  // Calcular estadísticas
  const totalRounds = roundStats.length;
  const suspectWins = roundStats.filter(stat => !stat.correct).length;
  const detectivesWins = roundStats.filter(stat => stat.correct).length;
  const suspectScore = suspect ? suspect.score : 0;

  return (
    <ScrollView style={styles.container}>
      <InterrogatorioHeader 
        title="Asignación de Rol"
        currentRound={currentRound}
      />
      
      <View style={styles.content}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>🎲 Selección Aleatoria</Text>
          <Text style={styles.instruction}>
            La aplicación ha seleccionado aleatoriamente al sospechoso para esta ronda.
            El sospechoso recibirá una situación secreta que los detectives deben descubrir.
          </Text>
        </View>
        
        <View style={styles.suspectCard}>
          <View style={styles.suspectHeader}>
            <Text style={styles.suspectIcon}>🔍</Text>
            <Text style={styles.suspectLabel}>El Sospechoso es:</Text>
          </View>
          <Text style={styles.suspectName}>{suspect ? suspect.name : '...'}</Text>
          {suspect && suspectScore > 0 && (
            <Text style={styles.suspectScore}>🏆 Puntuación: {suspectScore} puntos</Text>
          )}
        </View>
        
        <View style={styles.detectivesCard}>
          <View style={styles.detectivesHeader}>
            <Text style={styles.detectivesIcon}>👮</Text>
            <Text style={styles.detectivesLabel}>Los Detectives ({detectives.length}):</Text>
          </View>
          {detectives.map((player, index) => (
            <View key={player.id} style={styles.detectiveItem}>
              <Text style={styles.detectiveNumber}>{index + 1}.</Text>
              <Text style={styles.detectiveName}>{player.name}</Text>
              {player.score > 0 && (
                <Text style={styles.detectiveScore}>🏆 {player.score}</Text>
              )}
            </View>
          ))}
        </View>
        
        {totalRounds > 0 && (
          <View style={styles.statsCard}>
            <Text style={styles.statsTitle}>📊 Estadísticas del Juego</Text>
            <View style={styles.statsRow}>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{totalRounds}</Text>
                <Text style={styles.statLabel}>Rondas</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{suspectWins}</Text>
                <Text style={styles.statLabel}>Sospechoso</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={styles.statValue}>{detectivesWins}</Text>
                <Text style={styles.statLabel}>Detectives</Text>
              </View>
            </View>
          </View>
        )}
        
        <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continuar →</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  infoCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  suspectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  suspectIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  suspectScore: {
    fontSize: 16,
    color: '#4caf50',
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  detectivesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  detectivesIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  detectiveItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingLeft: 10,
  },
  detectiveNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff5722',
    width: 30,
  },
  detectiveScore: {
    fontSize: 14,
    color: '#4caf50',
    fontWeight: '600',
    marginLeft: 'auto',
  },
  statsCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff5722',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  suspectCard: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ff5722',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  suspectLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  suspectName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ff5722',
  },
  detectivesCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  detectivesLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  detectiveName: {
    fontSize: 16,
    color: '#555',
    marginBottom: 8,
    paddingLeft: 10,
  },
  continueButton: {
    backgroundColor: '#ff5722',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ElInterrogatorioAsignacion;

