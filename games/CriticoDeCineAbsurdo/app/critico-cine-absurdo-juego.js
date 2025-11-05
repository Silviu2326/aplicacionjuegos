import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native';
import { CriticoCineAbsurdoTituloGenerado } from '../components/CriticoCineAbsurdoTituloGenerado';
import { CriticoCineAbsurdoTemporizador } from '../components/CriticoCineAbsurdoTemporizador';
import { CriticoCineAbsurdoPanelVotacion } from '../components/CriticoCineAbsurdoPanelVotacion';
import { CriticoCineAbsurdoTablaPuntuaciones } from '../components/CriticoCineAbsurdoTablaPuntuaciones';
import { CriticoCineAbsurdoAvatarJugador } from '../components/CriticoCineAbsurdoAvatarJugador';
import { CriticoCineAbsurdoTips } from '../components/CriticoCineAbsurdoTips';
import { useCriticoCineAbsurdoStore } from '../store/criticoCineAbsurdoStore';

export const CriticoCineAbsurdoJuego = ({ navigation }) => {
  const gameStatus = useCriticoCineAbsurdoStore((state) => state.gameStatus);
  const players = useCriticoCineAbsurdoStore((state) => state.players);
  const currentCriticId = useCriticoCineAbsurdoStore((state) => state.currentCriticId);
  const currentMovieData = useCriticoCineAbsurdoStore((state) => state.currentMovieData);
  const turnTimeRemaining = useCriticoCineAbsurdoStore((state) => state.turnTimeRemaining);
  const votingPhase = useCriticoCineAbsurdoStore((state) => state.votingPhase);
  const currentRound = useCriticoCineAbsurdoStore((state) => state.currentRound);
  const maxRounds = useCriticoCineAbsurdoStore((state) => state.maxRounds);
  const votes = useCriticoCineAbsurdoStore((state) => state.votes);
  
  const generateNewTitle = useCriticoCineAbsurdoStore((state) => state.generateNewTitle);
  const decrementTurnTime = useCriticoCineAbsurdoStore((state) => state.decrementTurnTime);
  const startVotingPhase = useCriticoCineAbsurdoStore((state) => state.startVotingPhase);
  const submitVote = useCriticoCineAbsurdoStore((state) => state.submitVote);
  const finishRound = useCriticoCineAbsurdoStore((state) => state.finishRound);
  const allPlayersVoted = useCriticoCineAbsurdoStore((state) => state.allPlayersVoted);
  
  // Para desarrollo: usar el primer jugador como jugador actual (en producción sería el jugador real)
  const currentPlayerId = players.length > 0 ? players[0].id : null;
  const currentCritic = players.find(p => p.id === currentCriticId);
  
  // Verificar si el jugador actual ya votó
  const getCurrentPlayerVote = () => {
    if (!currentPlayerId || !currentCriticId) return null;
    const vote = votes.find(v => v.voterId === currentPlayerId && v.criticId === currentCriticId);
    return vote ? vote.stars : null;
  };
  
  // Timer para el turno del crítico
  useEffect(() => {
    if (gameStatus === 'playing' && !votingPhase) {
      const interval = setInterval(() => {
        decrementTurnTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [gameStatus, votingPhase, decrementTurnTime]);
  
  // Navegar a resultados cuando termine el juego
  useEffect(() => {
    if (gameStatus === 'finished' && navigation && navigation.navigate) {
      navigation.navigate('critico-cine-absurdo-resultados');
    }
  }, [gameStatus, navigation]);
  
  const handleGenerateNewTitle = () => {
    Alert.alert(
      'Generar nuevo título',
      '¿Estás seguro de que quieres generar un nuevo título?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Generar',
          onPress: () => {
            generateNewTitle();
          },
        },
      ]
    );
  };
  
  const handleVote = (stars) => {
    if (!currentPlayerId || !currentCriticId) {
      Alert.alert('Error', 'No se puede votar en este momento');
      return;
    }
    
    const success = submitVote(currentPlayerId, stars);
    if (!success) {
      Alert.alert('Error', 'No puedes votar por ti mismo o ya votaste');
    }
  };
  
  const handleFinishVoting = () => {
    if (!allPlayersVoted()) {
      Alert.alert(
        'Espera',
        'No todos los jugadores han votado todavía'
      );
      return;
    }
    
    Alert.alert(
      'Finalizar votación',
      '¿Todos los jugadores han votado?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          onPress: () => {
            const isFinished = finishRound();
            if (isFinished && navigation && navigation.navigate) {
              navigation.navigate('critico-cine-absurdo-resultados');
            }
          },
        },
      ]
    );
  };
  
  const handleSkipTimer = () => {
    Alert.alert(
      'Saltar temporizador',
      '¿Terminar el turno del crítico ahora?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Terminar',
          onPress: () => {
            startVotingPhase();
          },
        },
      ]
    );
  };
  
  if (!currentCritic) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Cargando...</Text>
      </View>
    );
  }
  
  const isCurrentPlayerCritic = currentPlayerId === currentCriticId;
  const currentPlayerVote = getCurrentPlayerVote();
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.roundInfo}>
          Ronda {currentRound} de {maxRounds}
        </Text>
        
        <View style={styles.playersAvatars}>
          {players.map((player) => (
            <CriticoCineAbsurdoAvatarJugador
              key={player.id}
              jugador={player}
              esCritico={player.id === currentCriticId}
              mostrarPuntuacion={true}
            />
          ))}
        </View>
        
        <CriticoCineAbsurdoTablaPuntuaciones jugadores={players} />
        
        {!votingPhase ? (
          <>
            <CriticoCineAbsurdoTituloGenerado movieData={currentMovieData} />
            
            <View style={styles.criticSection}>
              <Text style={styles.criticLabel}>Crítico de turno:</Text>
              <Text style={styles.criticName}>{currentCritic.name}</Text>
            {isCurrentPlayerCritic && (
              <>
                <Text style={styles.instructions}>
                  ¡Es tu turno! Improvisa una sinopsis y crítica para esta película.
                  Habla sobre la trama, personajes, dirección y da tu veredicto final.
                </Text>
                <CriticoCineAbsurdoTips esCritico={true} />
              </>
            )}
            </View>
            
            <CriticoCineAbsurdoTemporizador 
              tiempoRestante={turnTimeRemaining} 
              activo={!votingPhase}
            />
            
            {!isCurrentPlayerCritic && (
              <>
                <Text style={styles.audienceText}>
                  Escucha atentamente la crítica de {currentCritic.name}
                </Text>
                <CriticoCineAbsurdoTips esCritico={false} />
              </>
            )}
            
            {isCurrentPlayerCritic && (
              <TouchableOpacity
                style={styles.generateButton}
                onPress={handleGenerateNewTitle}
              >
                <Text style={styles.generateButtonText}>Generar Nuevo Título</Text>
              </TouchableOpacity>
            )}
            
            {isCurrentPlayerCritic && (
              <TouchableOpacity
                style={styles.skipButton}
                onPress={handleSkipTimer}
              >
                <Text style={styles.skipButtonText}>Terminar Turno</Text>
              </TouchableOpacity>
            )}
          </>
        ) : (
          <>
            <View style={styles.votingSection}>
              <Text style={styles.votingTitle}>Fase de Votación</Text>
              <Text style={styles.votingSubtitle}>
                La actuación de {currentCritic.name} ha terminado.
                Ahora califica su desempeño.
              </Text>
              
              {!isCurrentPlayerCritic && (
                <>
                  <CriticoCineAbsurdoTips esCritico={false} />
                  <CriticoCineAbsurdoPanelVotacion
                    criticName={currentCritic.name}
                    onVote={handleVote}
                    disabled={currentPlayerVote !== null}
                    currentVote={currentPlayerVote}
                  />
                </>
              )}
              
              {isCurrentPlayerCritic && (
                <View style={styles.waitingSection}>
                  <Text style={styles.waitingText}>
                    Espera a que la audiencia vote tu actuación
                  </Text>
                </View>
              )}
              
              <TouchableOpacity
                style={styles.finishVotingButton}
                onPress={handleFinishVoting}
              >
                <Text style={styles.finishVotingButtonText}>
                  Finalizar Votación
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
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
    padding: 20,
  },
  roundInfo: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 16,
  },
  playersAvatars: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 16,
  },
  criticSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    alignItems: 'center',
  },
  criticLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  criticName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF9800',
    marginBottom: 8,
  },
  instructions: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 20,
  },
  audienceText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 12,
    fontStyle: 'italic',
  },
  generateButton: {
    backgroundColor: '#9C27B0',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 12,
  },
  generateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  skipButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  votingSection: {
    marginTop: 20,
  },
  votingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  votingSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  waitingSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginVertical: 16,
  },
  waitingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  finishVotingButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  finishVotingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

