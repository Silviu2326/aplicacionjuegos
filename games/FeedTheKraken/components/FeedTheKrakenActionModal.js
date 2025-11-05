import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import { useFeedTheKrakenStore } from '../store/feedTheKrakenStore';
import { TURN_PHASE } from '../store/feedTheKrakenStore';

export const FeedTheKrakenActionModal = () => {
  const {
    currentPhase,
    players,
    captainId,
    lieutenantId,
    navigatorId,
    pendingMutiny,
    pendingAccusation,
    activeVotes,
    initiateMutiny,
    voteOnMutiny,
    captainAccuse,
    voteOnAccusation,
    resolveMutiny,
    resolveAccusation,
    currentPlayerId,
    selectLieutenant,
    selectNavigator,
  } = useFeedTheKrakenStore();

  const [showAccusationModal, setShowAccusationModal] = useState(false);
  const [showVoteModal, setShowVoteModal] = useState(false);
  const [showSelectOfficerModal, setShowSelectOfficerModal] = useState(false);
  const [officerType, setOfficerType] = useState(''); // 'lieutenant' or 'navigator'

  // Por ahora usar el primer jugador como currentPlayer (en producción sería dinámico)
  const currentPlayer = players.find(p => p.id === currentPlayerId) || players[0];

  const handleInitiateMutiny = () => {
    if (currentPlayer && !currentPlayer.isCaptain && !currentPlayer.isLieutenant && !currentPlayer.isNavigator) {
      initiateMutiny(currentPlayer.id);
      setShowVoteModal(true);
    }
  };

  const handleVoteMutiny = (vote) => {
    if (currentPlayer) {
      voteOnMutiny(currentPlayer.id, vote);
      setShowVoteModal(false);
    }
  };

  const handleAccuse = (accusedId) => {
    if (currentPlayer && currentPlayer.id === captainId) {
      captainAccuse(accusedId);
      setShowVoteModal(true);
    }
  };

  const handleVoteAccusation = (vote) => {
    if (currentPlayer) {
      voteOnAccusation(currentPlayer.id, vote);
      setShowVoteModal(false);
    }
  };

  const handleSelectLieutenant = (playerId) => {
    selectLieutenant(playerId);
    setShowSelectOfficerModal(false);
  };

  const handleSelectNavigator = (playerId) => {
    selectNavigator(playerId);
    setShowSelectOfficerModal(false);
  };

  const availablePlayersForOfficer = players.filter(p => 
    !p.eliminated && 
    !p.inJail && 
    p.id !== currentPlayer?.id
  );

  const availablePlayers = players.filter(p => 
    !p.eliminated && 
    !p.inJail && 
    p.id !== currentPlayer?.id &&
    p.id !== captainId &&
    p.id !== lieutenantId &&
    p.id !== navigatorId
  );

  const showSelectLieutenantButton = currentPhase === TURN_PHASE.LIEUTENANT_SELECTION && 
    currentPlayer && 
    currentPlayer.id === captainId &&
    !lieutenantId;

  const showSelectNavigatorButton = currentPhase === TURN_PHASE.NAVIGATOR_SELECTION && 
    currentPlayer && 
    currentPlayer.id === lieutenantId &&
    !navigatorId;

  const showMutinyButton = currentPhase === TURN_PHASE.CREW_ACTIONS && 
    currentPlayer && 
    !currentPlayer.isCaptain && 
    !currentPlayer.isLieutenant && 
    !currentPlayer.isNavigator;

  const showAccusationButton = currentPhase === TURN_PHASE.CREW_ACTIONS && 
    currentPlayer && 
    currentPlayer.id === captainId;

  const showVoting = (pendingMutiny || pendingAccusation) && 
    !activeVotes.some(v => v.playerId === currentPlayer?.id);

  return (
    <View>
      {/* Botones de acción */}
      {showSelectLieutenantButton && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => {
            setOfficerType('lieutenant');
            setShowSelectOfficerModal(true);
          }}
        >
          <Text style={styles.actionButtonText}>⭐ Seleccionar Teniente</Text>
        </TouchableOpacity>
      )}

      {showSelectNavigatorButton && (
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={() => {
            setOfficerType('navigator');
            setShowSelectOfficerModal(true);
          }}
        >
          <Text style={styles.actionButtonText}>🧭 Seleccionar Navegante</Text>
        </TouchableOpacity>
      )}

      {showMutinyButton && (
        <TouchableOpacity style={styles.actionButton} onPress={handleInitiateMutiny}>
          <Text style={styles.actionButtonText}>🚨 Iniciar Motín</Text>
        </TouchableOpacity>
      )}

      {showAccusationButton && (
        <TouchableOpacity style={styles.actionButton} onPress={() => setShowAccusationModal(true)}>
          <Text style={styles.actionButtonText}>⚖️ Acusar Jugador</Text>
        </TouchableOpacity>
      )}

      {/* Modal de selección de jugador para acusación */}
      <Modal
        visible={showAccusationModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowAccusationModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>¿A quién acusar?</Text>
            <ScrollView>
              {availablePlayers.map((player) => (
                <TouchableOpacity
                  key={player.id}
                  style={styles.playerOption}
                  onPress={() => {
                    handleAccuse(player.id);
                    setShowAccusationModal(false);
                  }}
                >
                  <Text style={styles.playerOptionText}>{player.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAccusationModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de votación */}
      <Modal
        visible={showVoting || showVoteModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowVoteModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {pendingMutiny ? 'Votar en el Motín' : 'Votar en la Acusación'}
            </Text>
            <Text style={styles.modalDescription}>
              {pendingMutiny 
                ? '¿Apoyas el motín contra el Capitán?'
                : '¿Es el acusado culpable?'}
            </Text>
            
            <View style={styles.voteButtons}>
              <TouchableOpacity
                style={[styles.voteButton, styles.voteYes]}
                onPress={() => {
                  if (pendingMutiny) {
                    handleVoteMutiny('yes');
                  } else {
                    handleVoteAccusation('guilty');
                  }
                }}
              >
                <Text style={styles.voteButtonText}>
                  {pendingMutiny ? 'Sí' : 'Culpable'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.voteButton, styles.voteNo]}
                onPress={() => {
                  if (pendingMutiny) {
                    handleVoteMutiny('no');
                  } else {
                    handleVoteAccusation('innocent');
                  }
                }}
              >
                <Text style={styles.voteButtonText}>
                  {pendingMutiny ? 'No' : 'Inocente'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal de selección de oficial */}
      <Modal
        visible={showSelectOfficerModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSelectOfficerModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {officerType === 'lieutenant' ? 'Seleccionar Teniente' : 'Seleccionar Navegante'}
            </Text>
            <Text style={styles.modalDescription}>
              {officerType === 'lieutenant' 
                ? 'Elige a un jugador para que sea tu Teniente.'
                : 'Elige a un jugador para que sea el Navegante.'}
            </Text>
            <ScrollView>
              {availablePlayersForOfficer.map((player) => {
                // No permitir seleccionar al mismo jugador o a oficiales ya asignados
                if (officerType === 'lieutenant' && player.id === captainId) return null;
                if (officerType === 'navigator' && (player.id === captainId || player.id === lieutenantId)) return null;
                
                return (
                  <TouchableOpacity
                    key={player.id}
                    style={styles.playerOption}
                    onPress={() => {
                      if (officerType === 'lieutenant') {
                        handleSelectLieutenant(player.id);
                      } else {
                        handleSelectNavigator(player.id);
                      }
                    }}
                  >
                    <Text style={styles.playerOptionText}>{player.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowSelectOfficerModal(false)}
            >
              <Text style={styles.closeButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    backgroundColor: '#4a90e2',
    padding: 15,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    width: '80%',
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },
  playerOption: {
    backgroundColor: '#0f1626',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  playerOptionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
  voteButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  voteButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  voteYes: {
    backgroundColor: '#4a90e2',
  },
  voteNo: {
    backgroundColor: '#d32f2f',
  },
  voteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    backgroundColor: '#666',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

