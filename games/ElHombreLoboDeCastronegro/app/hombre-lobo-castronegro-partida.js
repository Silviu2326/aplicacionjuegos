import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useHombreLoboCastronegroStore } from '../store/hombreLoboCastronegroStore';
import { HombreLoboCastronegroPlayerGrid } from '../components/HombreLoboCastronegroPlayerGrid';
import { HombreLoboCastronegroRoleCard } from '../components/HombreLoboCastronegroRoleCard';
import { HombreLoboCastronegroTimer } from '../components/HombreLoboCastronegroTimer';
import { HombreLoboCastronegroVotingModal } from '../components/HombreLoboCastronegroVotingModal';
import { HombreLoboCastronegroNightActionOverlay } from '../components/HombreLoboCastronegroNightActionOverlay';
import { HombreLoboCastronegroGameLog } from '../components/HombreLoboCastronegroGameLog';
import { NARRATOR_MESSAGES } from '../constants/hombreLoboCastronegroPhases';

export const HombreLoboCastronegroPartida = ({ navigation, route }) => {
  const playerId = route?.params?.playerId;
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showVotingModal, setShowVotingModal] = useState(false);
  const [showNightAction, setShowNightAction] = useState(false);
  
  const players = useHombreLoboCastronegroStore((state) => state.players);
  const gameStatus = useHombreLoboCastronegroStore((state) => state.gameStatus);
  const dayNumber = useHombreLoboCastronegroStore((state) => state.dayNumber);
  const nightVictim = useHombreLoboCastronegroStore((state) => state.nightVictim);
  const lynchedPlayer = useHombreLoboCastronegroStore((state) => state.lynchedPlayer);
  const votes = useHombreLoboCastronegroStore((state) => state.votes);
  const voteResults = useHombreLoboCastronegroStore((state) => state.voteResults);
  const debateEndTime = useHombreLoboCastronegroStore((state) => state.debateEndTime);
  const votingEndTime = useHombreLoboCastronegroStore((state) => state.votingEndTime);
  const currentNightRole = useHombreLoboCastronegroStore((state) => state.currentNightRole);
  const assignedRoles = useHombreLoboCastronegroStore((state) => state.assignedRoles);
  const gameLog = useHombreLoboCastronegroStore((state) => state.gameLog);
  const gameStats = useHombreLoboCastronegroStore((state) => state.gameStats);
  const investigationResults = useHombreLoboCastronegroStore((state) => state.investigationResults);
  
  const startDebate = useHombreLoboCastronegroStore((state) => state.startDebate);
  const startVoting = useHombreLoboCastronegroStore((state) => state.startVoting);
  const castVote = useHombreLoboCastronegroStore((state) => state.castVote);
  const resolveVoting = useHombreLoboCastronegroStore((state) => state.resolveVoting);
  const startNightPhase = useHombreLoboCastronegroStore((state) => state.startNightPhase);
  const performNightAction = useHombreLoboCastronegroStore((state) => state.performNightAction);
  
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const playerRoleId = currentPlayer ? assignedRoles[currentPlayer.id] : null;
  const isPlayerAlive = currentPlayer?.isAlive && !currentPlayer?.isDead;
  
  // Mostrar overlay de acción nocturna cuando es el turno del jugador
  useEffect(() => {
    if ((gameStatus === 'first_night' || gameStatus === 'night') && 
        currentNightRole === playerRoleId && 
        isPlayerAlive) {
      setShowNightAction(true);
    } else {
      setShowNightAction(false);
    }
  }, [gameStatus, currentNightRole, playerRoleId, isPlayerAlive]);
  
  // Iniciar debate automáticamente al comenzar el día
  useEffect(() => {
    if (gameStatus === 'day' && !debateEndTime) {
      startDebate();
    }
  }, [gameStatus, debateEndTime]);
  
  // Finalizar debate e iniciar votación
  useEffect(() => {
    if (gameStatus === 'debate' && debateEndTime && Date.now() >= debateEndTime) {
      startVoting();
    }
  }, [gameStatus, debateEndTime]);
  
  // Finalizar votación
  useEffect(() => {
    if (gameStatus === 'voting' && votingEndTime && Date.now() >= votingEndTime) {
      resolveVoting();
    }
  }, [gameStatus, votingEndTime]);
  
  const handlePlayerPress = (player) => {
    if (gameStatus === 'voting' && isPlayerAlive && !votes[currentPlayer.id]) {
      setShowVotingModal(true);
    }
  };
  
  const handleVote = (targetId) => {
    castVote(currentPlayer.id, targetId);
    setShowVotingModal(false);
  };
  
  const handleNightAction = (targetId) => {
    const actionType = playerRoleId === 'hombre_lobo' ? 'kill' : 
                      playerRoleId === 'vidente' ? 'investigate' : 'other';
    performNightAction(currentPlayer.id, actionType, targetId);
    setShowNightAction(false);
  };
  
  const handleSkipNightAction = () => {
    performNightAction(currentPlayer.id, 'skip');
    setShowNightAction(false);
  };
  
  const getPhaseMessage = () => {
    if (gameStatus === 'first_night' || gameStatus === 'night') {
      return NARRATOR_MESSAGES.NIGHT_START;
    }
    if (gameStatus === 'day' && nightVictim) {
      const victim = players.find(p => p.id === nightVictim);
      return NARRATOR_MESSAGES.VICTIM_REVEALED.replace('{victim}', victim?.name || 'Alguien');
    }
    if (gameStatus === 'day') {
      return NARRATOR_MESSAGES.DAY_START;
    }
    if (gameStatus === 'debate') {
      return NARRATOR_MESSAGES.DEBATE_START.replace('{time}', '3');
    }
    if (gameStatus === 'voting') {
      return NARRATOR_MESSAGES.VOTING_START;
    }
    if (gameStatus === 'revelation' && lynchedPlayer) {
      const lynched = players.find(p => p.id === lynchedPlayer);
      return NARRATOR_MESSAGES.LYNCH_REVEAL.replace('{player}', lynched?.name || 'Alguien');
    }
    return '';
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>El Hombre Lobo de Castronegro</Text>
        <View style={styles.phaseInfo}>
          <Text style={styles.phaseText}>
            {gameStatus === 'day' ? `☀️ Día ${dayNumber}` : 
             gameStatus === 'night' || gameStatus === 'first_night' ? '🌙 Noche' : 
             gameStatus === 'debate' ? '💬 Debate' :
             gameStatus === 'voting' ? '⚖️ Votación' : 
             gameStatus === 'revelation' ? '🎭 Revelación' : '🎮 Juego'}
          </Text>
        </View>
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Vivos:</Text>
            <Text style={styles.statValue}>
              {players.filter(p => p.isAlive && !p.isDead).length}/{players.length}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Muertos:</Text>
            <Text style={styles.statValue}>
              {players.filter(p => p.isDead || !p.isAlive).length}
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Noches:</Text>
            <Text style={styles.statValue}>{gameStats.totalNights}</Text>
          </View>
        </View>
      </View>
      
      {getPhaseMessage() && (
        <View style={styles.messageBanner}>
          <Text style={styles.messageText}>{getPhaseMessage()}</Text>
        </View>
      )}
      
      {(gameStatus === 'debate' || gameStatus === 'voting') && (
        <HombreLoboCastronegroTimer
          endTime={gameStatus === 'debate' ? debateEndTime : votingEndTime}
          onTimeUp={() => {
            if (gameStatus === 'debate') {
              startVoting();
            } else {
              resolveVoting();
            }
          }}
          label={gameStatus === 'debate' ? 'Tiempo de Debate' : 'Tiempo de Votación'}
        />
      )}
      
      <View style={styles.playersSection}>
        <HombreLoboCastronegroPlayerGrid
          players={players}
          onPlayerPress={handlePlayerPress}
          currentPlayerId={currentPlayer?.id}
          gamePhase={gameStatus}
          votes={votes}
        />
      </View>
      
      {gameStatus === 'voting' && isPlayerAlive && !votes[currentPlayer.id] && (
        <TouchableOpacity
          style={styles.voteButton}
          onPress={() => setShowVotingModal(true)}
        >
          <Text style={styles.voteButtonText}>Votar</Text>
        </TouchableOpacity>
      )}
      
      <HombreLoboCastronegroGameLog gameLog={gameLog} />
      
      {playerRoleId === 'vidente' && investigationResults[currentPlayer.id] && (
        <View style={styles.investigationSection}>
          <Text style={styles.investigationTitle}>🔮 Tus Investigaciones:</Text>
          {Object.entries(investigationResults[currentPlayer.id]).map(([targetId, result]) => {
            const target = players.find(p => p.id === targetId);
            return (
              <View key={targetId} style={styles.investigationItem}>
                <Text style={styles.investigationText}>
                  {target?.name}: {result === 'evil' ? '🐺 Malvado' : '👨‍🌾 Bueno'}
                </Text>
              </View>
            );
          })}
        </View>
      )}
      
      <View style={styles.actionButtonsRow}>
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => setShowRoleModal(true)}
        >
          <Text style={styles.roleButtonText}>👁️ Ver Mi Rol</Text>
        </TouchableOpacity>
      </View>
      
      <HombreLoboCastronegroRoleCard
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        roleId={playerRoleId}
      />
      
      <HombreLoboCastronegroVotingModal
        visible={showVotingModal}
        players={players}
        currentPlayerId={currentPlayer?.id}
        onVote={handleVote}
        onClose={() => setShowVotingModal(false)}
      />
      
      <HombreLoboCastronegroNightActionOverlay
        visible={showNightAction}
        roleId={playerRoleId}
        players={players}
        currentPlayerId={currentPlayer?.id}
        onAction={handleNightAction}
        onSkip={handleSkipNightAction}
        nightPhase={gameStatus}
        nightVictim={nightVictim}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  phaseInfo: {
    backgroundColor: '#16213e',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#0f1624',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: '#aaa',
    marginBottom: 3,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50',
  },
  investigationSection: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#9c27b0',
  },
  investigationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#9c27b0',
    marginBottom: 10,
  },
  investigationItem: {
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#0f1624',
  },
  investigationText: {
    fontSize: 14,
    color: '#fff',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  messageBanner: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  messageText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
  },
  playersSection: {
    flex: 1,
    marginBottom: 15,
  },
  voteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

