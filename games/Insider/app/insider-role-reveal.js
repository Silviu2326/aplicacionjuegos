import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useInsiderGameStore } from '../store/insiderGameStore';
import { InsiderRoleCard } from '../components/InsiderRoleCard';

export const InsiderRoleReveal = ({ navigation }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [roleRevealed, setRoleRevealed] = useState(false);
  
  const players = useInsiderGameStore((state) => state.players);
  const revealRoleToPlayer = useInsiderGameStore((state) => state.revealRoleToPlayer);
  const secretWord = useInsiderGameStore((state) => state.secretWord);
  const startQuestioning = useInsiderGameStore((state) => state.startQuestioning);

  const currentPlayer = players[currentPlayerIndex];
  const roleInfo = currentPlayer ? revealRoleToPlayer(currentPlayer.id) : null;

  useEffect(() => {
    setRoleRevealed(false);
  }, [currentPlayerIndex]);

  const handleRevealRole = () => {
    setRoleRevealed(true);
  };

  const handleNext = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setRoleRevealed(false);
    } else {
      // Todos han visto sus roles, avanzar a la fase de preguntas
      if (!secretWord) {
        Alert.alert('Error', 'No se ha seleccionado una palabra secreta');
        return;
      }
      
      startQuestioning();
      navigation?.navigate('questioning');
    }
  };

  const handleBack = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(currentPlayerIndex - 1);
      setRoleRevealed(false);
    }
  };

  if (!currentPlayer) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 Revelación de Roles</Text>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[
              styles.progressFill,
              { width: `${((currentPlayerIndex + 1) / players.length) * 100}%` }
            ]} />
          </View>
          <Text style={styles.progressText}>
            Jugador {currentPlayerIndex + 1} de {players.length}
          </Text>
        </View>
      </View>

      <View style={styles.playerCard}>
        <Text style={styles.playerEmoji}>👤</Text>
        <Text style={styles.playerName}>{currentPlayer.name}</Text>
        <Text style={styles.instruction}>
          Pasa el dispositivo a {currentPlayer.name} para revelar su rol
        </Text>
      </View>

      {!roleRevealed ? (
        <View style={styles.revealSection}>
          <Text style={styles.revealHint}>
            Cuando {currentPlayer.name} esté listo, toca el botón para revelar su rol secreto
          </Text>
          <TouchableOpacity style={styles.revealButton} onPress={handleRevealRole}>
            <Text style={styles.revealButtonText}>🔓 Revelar Rol</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.roleContainer}>
          <InsiderRoleCard
            visible={roleRevealed}
            role={roleInfo?.role}
            word={roleInfo?.word}
            playerName={currentPlayer.name}
            onClose={() => {}}
          />
        </View>
      )}

      <View style={styles.navigationButtons}>
        {currentPlayerIndex > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handleBack}>
            <Text style={styles.navButtonText}>⬅️ Anterior</Text>
          </TouchableOpacity>
        )}
        
        {roleRevealed && (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>
              {currentPlayerIndex < players.length - 1 ? 'Siguiente ➡️' : '🚀 Comenzar Juego'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 30,
    marginTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  progressContainer: {
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  playerCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 30,
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerEmoji: {
    fontSize: 60,
    marginBottom: 15,
  },
  playerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  instruction: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  revealSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  revealHint: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    paddingHorizontal: 20,
  },
  revealButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 50,
    paddingVertical: 18,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  revealButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  roleContainer: {
    width: '100%',
    marginBottom: 30,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    marginTop: 'auto',
    paddingTop: 20,
  },
  navButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
});

