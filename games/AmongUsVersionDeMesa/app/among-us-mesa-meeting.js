import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert, TextInput } from 'react-native';
import { useAmongUsMesaStore } from '../store/amongUsMesaStore';
import { AmongUsMesaVotingCard } from '../components/AmongUsMesaVotingCard';
import { AmongUsMesaPlayerAvatar } from '../components/AmongUsMesaPlayerAvatar';
import { GAME_CONFIG, MAP_ROOMS } from '../constants/AmongUsMesaGameSettings';

export const AmongUsMesaMeetingScreen = ({ navigation, playerId }) => {
  const [discussionTime, setDiscussionTime] = useState(GAME_CONFIG.DISCUSSION_TIME);
  const [votingTime, setVotingTime] = useState(GAME_CONFIG.VOTING_TIME);
  const [showVoteBreakdown, setShowVoteBreakdown] = useState(false);
  const [notes, setNotes] = useState('');
  
  const players = useAmongUsMesaStore((state) => state.players);
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const gameStatus = useAmongUsMesaStore((state) => state.gameStatus);
  const meetingCause = useAmongUsMesaStore((state) => state.meetingCause);
  const votes = useAmongUsMesaStore((state) => state.votes);
  const ejectedPlayer = useAmongUsMesaStore((state) => state.ejectedPlayer);
  const voteResults = useAmongUsMesaStore((state) => state.voteResults);
  const reportedBodies = useAmongUsMesaStore((state) => state.reportedBodies);
  
  const startVoting = useAmongUsMesaStore((state) => state.startVoting);
  const castVote = useAmongUsMesaStore((state) => state.castVote);
  const finishVoting = useAmongUsMesaStore((state) => state.finishVoting);
  
  const alivePlayers = players.filter(p => p.isAlive);
  const hasVoted = votes[playerId] !== undefined;
  const selectedVote = votes[playerId];
  const totalVotes = Object.keys(votes).length;
  const remainingVotes = alivePlayers.length - totalVotes;
  
  // Calcular estadísticas de votación
  const voteCounts = {};
  Object.values(votes).forEach(votedId => {
    if (votedId !== 'skip') {
      voteCounts[votedId] = (voteCounts[votedId] || 0) + 1;
    }
  });
  const skipVotes = Object.values(votes).filter(v => v === 'skip').length;
  const mostVotedId = Object.keys(voteCounts).reduce((a, b) => 
    voteCounts[a] > voteCounts[b] ? a : b, null
  );
  const mostVotedPlayer = mostVotedId ? players.find(p => p.id === mostVotedId) : null;
  
  useEffect(() => {
    if (gameStatus === 'meeting') {
      const timer = setInterval(() => {
        setDiscussionTime((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            startVoting();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
    
    if (gameStatus === 'voting') {
      const timer = setInterval(() => {
        setVotingTime((prev) => {
          if (prev <= 1000) {
            clearInterval(timer);
            finishVoting();
            return 0;
          }
          return prev - 1000;
        });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [gameStatus]);
  
  useEffect(() => {
    if (gameStatus === 'playing' && ejectedPlayer) {
      // Esperar un momento para mostrar resultados y luego volver al juego
      setTimeout(() => {
        navigation?.navigate('game');
      }, 3000);
    }
  }, [gameStatus, ejectedPlayer]);
  
  const formatTime = (ms) => {
    const seconds = Math.ceil(ms / 1000);
    return `${seconds}s`;
  };
  
  const handleVote = (votedPlayerId) => {
    if (hasVoted) return;
    castVote(playerId, votedPlayerId);
  };
  
  const handleSkip = () => {
    if (hasVoted) return;
    castVote(playerId, 'skip');
  };
  
  if (gameStatus === 'meeting') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Reunión de Emergencia</Text>
          <Text style={styles.cause}>
            {meetingCause === 'body-reported' ? '📢 Cuerpo Reportado' : '🚨 Botón de Emergencia'}
          </Text>
          {meetingCause === 'body-reported' && reportedBodies.length > 0 && (
            <View style={styles.reportedBodyInfo}>
              <Text style={styles.reportedBodyText}>
                💀 Cuerpo encontrado en: {MAP_ROOMS.find(r => r.id === reportedBodies[reportedBodies.length - 1].location)?.name || 'Desconocido'}
              </Text>
            </View>
          )}
          <Text style={styles.timer}>⏱️ Tiempo de discusión: {formatTime(discussionTime)}</Text>
        </View>
        
        <ScrollView style={styles.content}>
          <Text style={styles.instructions}>
            Discute con los demás jugadores. ¿Quién es sospechoso? ¿Dónde estabas cuando ocurrió?
          </Text>
          
          <View style={styles.playersGrid}>
            {alivePlayers.map((player) => (
              <View key={player.id} style={styles.playerCard}>
                <AmongUsMesaPlayerAvatar player={player} size={50} showStatus={false} />
                <Text style={styles.playerName}>{player.name}</Text>
                <Text style={styles.playerLocation}>
                  📍 {MAP_ROOMS.find(r => r.id === player.location)?.name || player.location || 'Desconocido'}
                </Text>
                {player.role === 'impostor' && currentPlayer.role === 'impostor' && (
                  <Text style={styles.impostorMark}>👹</Text>
                )}
              </View>
            ))}
          </View>
          
          <View style={styles.notesSection}>
            <Text style={styles.notesTitle}>📝 Notas de la Reunión</Text>
            <TextInput
              style={styles.notesInput}
              placeholder="Escribe tus notas aquí..."
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
            />
          </View>
          
          <View style={styles.tipsSection}>
            <Text style={styles.tipsTitle}>💡 Consejos para la Discusión</Text>
            <Text style={styles.tipText}>• Pregunta a otros jugadores dónde estaban</Text>
            <Text style={styles.tipText}>• Busca inconsistencias en las historias</Text>
            <Text style={styles.tipText}>• Recuerda quién estaba cerca de las ubicaciones</Text>
            <Text style={styles.tipText}>• Observa el comportamiento durante la votación</Text>
          </View>
        </ScrollView>
        
        <TouchableOpacity
          style={[styles.startVotingButton, discussionTime > 5000 && styles.disabled]}
          onPress={() => {
            if (discussionTime <= 5000) {
              startVoting();
            }
          }}
          disabled={discussionTime > 5000}
        >
          <Text style={styles.startVotingButtonText}>
            {discussionTime > 5000 ? `⏳ Espera ${formatTime(discussionTime - 5000)}` : '🗳️ Iniciar Votación'}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  if (gameStatus === 'voting') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🗳️ Votación</Text>
          <Text style={styles.timer}>⏱️ Tiempo restante: {formatTime(votingTime)}</Text>
          <View style={styles.votingProgress}>
            <Text style={styles.votingProgressText}>
              {totalVotes}/{alivePlayers.length} votos registrados
            </Text>
            {remainingVotes > 0 && (
              <Text style={styles.votingProgressRemaining}>
                {remainingVotes} pendiente{remainingVotes > 1 ? 's' : ''}
              </Text>
            )}
          </View>
        </View>
        
        <ScrollView style={styles.content}>
          <Text style={styles.votingInstructions}>
            Vota por el jugador que crees que es el impostor, o salta el voto.
          </Text>
          
          {mostVotedPlayer && Object.keys(voteCounts).length > 0 && (
            <View style={styles.leadingVote}>
              <Text style={styles.leadingVoteTitle}>📊 Voto Actualmente Líder</Text>
              <View style={styles.leadingVoteCard}>
                <AmongUsMesaPlayerAvatar player={mostVotedPlayer} size={60} showStatus={false} />
                <Text style={styles.leadingVoteName}>{mostVotedPlayer.name}</Text>
                <Text style={styles.leadingVoteCount}>{voteCounts[mostVotedId]} voto{voteCounts[mostVotedId] > 1 ? 's' : ''}</Text>
              </View>
            </View>
          )}
          
          <View style={styles.votingGrid}>
            {alivePlayers.map((player) => {
              const playerVotes = voteCounts[player.id] || 0;
              return (
                <View key={player.id}>
                  <AmongUsMesaVotingCard
                    player={player}
                    onVote={handleVote}
                    isSelected={selectedVote === player.id}
                    disabled={hasVoted}
                  />
                  {playerVotes > 0 && (
                    <View style={styles.voteCountBadge}>
                      <Text style={styles.voteCountText}>{playerVotes}</Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
          
          {skipVotes > 0 && (
            <View style={styles.skipVotesInfo}>
              <Text style={styles.skipVotesText}>
                ⏭️ {skipVotes} voto{skipVotes > 1 ? 's' : ''} saltado{skipVotes > 1 ? 's' : ''}
              </Text>
            </View>
          )}
          
          {!hasVoted && (
            <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
              <Text style={styles.skipButtonText}>⏭️ Saltar Voto</Text>
            </TouchableOpacity>
          )}
          
          {hasVoted && (
            <View style={styles.votedIndicator}>
              <Text style={styles.votedText}>✅ Voto registrado</Text>
              {selectedVote && selectedVote !== 'skip' && (
                <Text style={styles.votedDetails}>
                  Votaste por: {players.find(p => p.id === selectedVote)?.name}
                </Text>
              )}
              {selectedVote === 'skip' && (
                <Text style={styles.votedDetails}>Saltaste el voto</Text>
              )}
            </View>
          )}
          
          <TouchableOpacity 
            style={styles.breakdownButton} 
            onPress={() => setShowVoteBreakdown(!showVoteBreakdown)}
          >
            <Text style={styles.breakdownButtonText}>
              {showVoteBreakdown ? '⬇️ Ocultar' : '📊 Ver'} Desglose de Votos
            </Text>
          </TouchableOpacity>
          
          {showVoteBreakdown && (
            <View style={styles.breakdownPanel}>
              <Text style={styles.breakdownTitle}>Desglose de Votos</Text>
              {alivePlayers.map(player => {
                const playerVotes = voteCounts[player.id] || 0;
                const voters = Object.keys(votes)
                  .filter(voterId => votes[voterId] === player.id)
                  .map(voterId => players.find(p => p.id === voterId))
                  .filter(Boolean);
                
                return (
                  <View key={player.id} style={styles.breakdownItem}>
                    <Text style={styles.breakdownPlayerName}>
                      {player.name}: {playerVotes} voto{playerVotes !== 1 ? 's' : ''}
                    </Text>
                    {voters.length > 0 && (
                      <View style={styles.breakdownVoters}>
                        {voters.map(voter => (
                          <Text key={voter.id} style={styles.breakdownVoter}>
                            • {voter.name}
                          </Text>
                        ))}
                      </View>
                    )}
                  </View>
                );
              })}
              {skipVotes > 0 && (
                <View style={styles.breakdownItem}>
                  <Text style={styles.breakdownPlayerName}>
                    Saltado: {skipVotes} voto{skipVotes !== 1 ? 's' : ''}
                  </Text>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
  
  if (ejectedPlayer) {
    const wasImpostor = ejectedPlayer.role === 'impostor';
    
    return (
      <View style={styles.container}>
        <View style={[styles.ejectionResult, wasImpostor ? styles.impostorResult : styles.crewmateResult]}>
          <Text style={styles.ejectionTitle}>
            {ejectedPlayer.name} fue expulsado
          </Text>
          <Text style={styles.ejectionRole}>
            {wasImpostor ? '👹 ERA UN IMPOSTOR' : '👨‍🚀 ERA UN TRIPULANTE'}
          </Text>
          {voteResults && (
            <View style={styles.voteBreakdown}>
              <Text style={styles.voteBreakdownTitle}>Resultados de la votación:</Text>
              {Object.entries(voteResults).map(([playerId, votes]) => {
                const player = players.find(p => p.id === playerId);
                return (
                  <Text key={playerId} style={styles.voteBreakdownItem}>
                    {player?.name}: {votes} votos
                  </Text>
                );
              })}
            </View>
          )}
        </View>
      </View>
    );
  }
  
  return null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  cause: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  timer: {
    fontSize: 16,
    color: '#f44336',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    padding: 15,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 24,
  },
  playersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  playerCard: {
    width: '45%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 5,
  },
  playerLocation: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  impostorMark: {
    fontSize: 20,
    marginTop: 5,
  },
  reportedBodyInfo: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
  },
  reportedBodyText: {
    fontSize: 14,
    color: '#d32f2f',
    fontWeight: '600',
  },
  notesSection: {
    marginTop: 20,
    marginBottom: 20,
  },
  notesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  notesInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  tipsSection: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
    lineHeight: 20,
  },
  votingProgress: {
    marginTop: 10,
    alignItems: 'center',
  },
  votingProgressText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  votingProgressRemaining: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  leadingVote: {
    backgroundColor: '#fff3cd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#ffc107',
  },
  leadingVoteTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  leadingVoteCard: {
    alignItems: 'center',
  },
  leadingVoteName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  leadingVoteCount: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  voteCountBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: '#4caf50',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  voteCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  skipVotesInfo: {
    backgroundColor: '#fff3cd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  skipVotesText: {
    fontSize: 14,
    color: '#856404',
    fontWeight: '600',
  },
  votedDetails: {
    fontSize: 14,
    color: '#2e7d32',
    marginTop: 5,
  },
  breakdownButton: {
    backgroundColor: '#2196F3',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  breakdownButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  breakdownPanel: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  breakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  breakdownItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  breakdownPlayerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  breakdownVoters: {
    marginLeft: 15,
    marginTop: 5,
  },
  breakdownVoter: {
    fontSize: 14,
    color: '#666',
    marginBottom: 3,
  },
  startVotingButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    margin: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  startVotingButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: '#ccc',
  },
  votingInstructions: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  votingGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  skipButton: {
    backgroundColor: '#ff9800',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  skipButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  votedIndicator: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  votedText: {
    color: '#4caf50',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ejectionResult: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  impostorResult: {
    backgroundColor: '#d32f2f',
  },
  crewmateResult: {
    backgroundColor: '#1976d2',
  },
  ejectionTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  ejectionRole: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  voteBreakdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 20,
    borderRadius: 10,
    width: '90%',
  },
  voteBreakdownTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  voteBreakdownItem: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },
});

