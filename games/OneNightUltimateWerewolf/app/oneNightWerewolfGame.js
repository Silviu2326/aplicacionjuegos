import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';
import { OneNightWerewolfPlayerGrid } from '../components/OneNightWerewolfPlayerGrid';
import { OneNightWerewolfRoleCard } from '../components/OneNightWerewolfRoleCard';
import { OneNightWerewolfTimer } from '../components/OneNightWerewolfTimer';
import { OneNightWerewolfNightActionHandler } from '../components/OneNightWerewolfNightActionHandler';

export const OneNightWerewolfGame = ({ navigation }) => {
  const gameStatus = useOneNightWerewolfStore((state) => state.gameStatus);
  const players = useOneNightWerewolfStore((state) => state.players);
  const currentPlayerId = useOneNightWerewolfStore((state) => state.currentPlayerId);
  const nightNarration = useOneNightWerewolfStore((state) => state.nightNarration);
  const waitingForNightAction = useOneNightWerewolfStore((state) => state.waitingForNightAction);
  const castVote = useOneNightWerewolfStore((state) => state.castVote);
  const votes = useOneNightWerewolfStore((state) => state.votes);
  const startVoting = useOneNightWerewolfStore((state) => state.startVoting);
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  
  useEffect(() => {
    if (gameStatus === 'results') {
      if (navigation && navigation.navigate) {
        navigation.navigate('oneNightWerewolfResults');
      }
    }
  }, [gameStatus, navigation]);
  
  const handleVote = (targetPlayerId) => {
    if (currentPlayerId) {
      castVote(currentPlayerId, targetPlayerId);
    }
  };
  
  const handleTimeUp = () => {
    startVoting();
  };
  
  const renderNightPhase = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.narrationText}>{nightNarration}</Text>
        
        {waitingForNightAction && (
          <OneNightWerewolfNightActionHandler />
        )}
        
        {!waitingForNightAction && (
          <View style={styles.waitingContainer}>
            <Text style={styles.waitingText}>Esperando acciones de otros jugadores...</Text>
          </View>
        )}
      </View>
    );
  };
  
  const renderDiscussionPhase = () => {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.phaseTitle}>Fase de Discusión</Text>
          <Text style={styles.narrationText}>{nightNarration}</Text>
          
          <OneNightWerewolfTimer onTimeUp={handleTimeUp} />
          
          {currentPlayer && (
            <View style={styles.currentRoleContainer}>
              <Text style={styles.currentRoleLabel}>Tu rol inicial era:</Text>
              <OneNightWerewolfRoleCard role={currentPlayer.initialRole} />
              <Text style={styles.reminderText}>
                Recuerda: tu rol puede haber cambiado durante la noche
              </Text>
            </View>
          )}
          
          <View style={styles.playersSection}>
            <Text style={styles.sectionTitle}>Jugadores</Text>
            <OneNightWerewolfPlayerGrid selectable={false} />
          </View>
        </View>
      </ScrollView>
    );
  };
  
  const renderVotingPhase = () => {
    const hasVoted = currentPlayerId && votes[currentPlayerId];
    
    return (
      <ScrollView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.phaseTitle}>Fase de Votación</Text>
          <Text style={styles.narrationText}>{nightNarration}</Text>
          
          {!hasVoted ? (
            <View style={styles.votingSection}>
              <Text style={styles.votingInstruction}>
                Selecciona al jugador que crees que debe ser eliminado:
              </Text>
              <OneNightWerewolfPlayerGrid
                onPlayerSelect={handleVote}
                selectable={true}
              />
            </View>
          ) : (
            <View style={styles.votedContainer}>
              <Text style={styles.votedText}>
                Has votado por: {players.find(p => p.id === votes[currentPlayerId])?.name}
              </Text>
              <Text style={styles.waitingText}>
                Esperando a que todos voten...
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  };
  
  const renderContent = () => {
    switch (gameStatus) {
      case 'night':
        return renderNightPhase();
      case 'discussion':
        return renderDiscussionPhase();
      case 'voting':
        return renderVotingPhase();
      default:
        return (
          <View style={styles.container}>
            <Text style={styles.waitingText}>Cargando...</Text>
          </View>
        );
    }
  };
  
  return renderContent();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    padding: 20,
  },
  phaseTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 16,
  },
  narrationText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  waitingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  waitingText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  currentRoleContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  currentRoleLabel: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 12,
    fontWeight: '600',
  },
  reminderText: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 8,
    fontStyle: 'italic',
  },
  playersSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  votingSection: {
    marginTop: 24,
  },
  votingInstruction: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  votedContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  votedText: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

