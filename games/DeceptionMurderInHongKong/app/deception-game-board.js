import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal } from 'react-native';
import { DeceptionPlayerGrid } from '../components/DeceptionPlayerGrid';
import { DeceptionSceneTile } from '../components/DeceptionSceneTile';
import { DeceptionSolutionModal } from '../components/DeceptionSolutionModal';
import { DeceptionEvidenceCard } from '../components/DeceptionEvidenceCard';
import { useDeceptionGameStore } from '../store/deceptionGameStore';
import { DECEPTION_ROLES } from '../constants/DeceptionRoles';
import { getSceneTileById, SCENE_TILES } from '../constants/DeceptionCards';

export const DeceptionGameBoard = ({ navigation, route }) => {
  const [showAccusationModal, setShowAccusationModal] = useState(false);
  const [showSceneTileModal, setShowSceneTileModal] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);

  const {
    players,
    currentRound,
    maxRounds,
    phase,
    currentSceneTile,
    selectedSceneOption,
    sceneTilesHistory,
    solution,
    accusations,
    forensicScientistId,
    murdererId,
    currentPlayerId,
    getSceneTiles,
    forensicSelectOption,
    makeAccusation,
    startRound,
    gameStatus,
  } = useDeceptionGameStore();

  // Datos falsos: jugador actual simulado
  const fakeCurrentPlayerId = players[0]?.id || null;
  const currentPlayer = players.find(p => p.id === fakeCurrentPlayerId) || players[0];
  const isForensicScientist = currentPlayer?.id === forensicScientistId;
  const isMurderer = currentPlayer?.id === murdererId;
  const isInvestigator = !isForensicScientist && !isMurderer;

  // Fichas de escena disponibles para el científico forense
  const availableSceneTiles = getSceneTiles();
  const [localSceneTiles, setLocalSceneTiles] = useState(availableSceneTiles);

  useEffect(() => {
    // Si no hay fichas locales, inicializar
    if (localSceneTiles.length === 0) {
      setLocalSceneTiles(availableSceneTiles);
    }
  }, []);

  const handleSceneTileSelect = (sceneTile, option) => {
    if (forensicSelectOption(sceneTile.id, option)) {
      setShowSceneTileModal(false);
      Alert.alert('Pista revelada', `Has seleccionado: ${option}`);
    }
  };

  const handleMakeAccusation = () => {
    if (!selectedWeapon || !selectedClue) {
      Alert.alert('Selección incompleta', 'Por favor selecciona un arma y una pista clave.');
      return;
    }

    if (!currentPlayer?.hasBadge) {
      Alert.alert('Sin placa', 'Ya has usado tu placa. No puedes hacer más acusaciones.');
      return;
    }

    const accusation = makeAccusation(fakeCurrentPlayerId, selectedWeapon.id, selectedClue.id);
    
    if (accusation) {
      setShowAccusationModal(false);
      setSelectedWeapon(null);
      setSelectedClue(null);
      
      if (accusation.correct) {
        Alert.alert(
          '¡Victoria!',
          '¡Has encontrado la solución correcta! Los investigadores ganan.',
          [
            {
              text: 'Finalizar',
              onPress: () => {
                if (navigation && navigation.goBack) {
                  navigation.goBack();
                }
              }
            }
          ]
        );
      } else {
        Alert.alert('Acusación incorrecta', 'La combinación no es correcta. Has perdido tu placa.');
      }
    }
  };

  const handleNextRound = () => {
    if (currentRound < maxRounds) {
      startRound();
      Alert.alert('Nueva ronda', `Ronda ${currentRound + 1} de ${maxRounds}`);
    } else {
      Alert.alert(
        'Juego terminado',
        'Se han agotado todas las rondas. El asesino gana.',
        [
          {
            text: 'Finalizar',
            onPress: () => {
              if (navigation && navigation.goBack) {
                navigation.goBack();
              }
            }
          }
        ]
      );
    }
  };

  // Obtener todas las armas y pistas disponibles para acusación
  const allWeapons = currentPlayer?.weaponCards || [];
  const allClues = currentPlayer?.clueCards || [];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header con información del juego */}
      <View style={styles.header}>
        <Text style={styles.title}>Tablero de Juego</Text>
        <View style={styles.gameInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Ronda:</Text>
            <Text style={styles.infoValue}>{currentRound} / {maxRounds}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Fase:</Text>
            <Text style={styles.infoValue}>{phase === 'discussion' ? 'Discusión' : phase === 'accusation' ? 'Acusación' : 'Resolución'}</Text>
          </View>
        </View>
      </View>

      {/* Información del jugador actual */}
      <View style={styles.playerInfoCard}>
        <Text style={styles.playerInfoTitle}>Tu Información</Text>
        <Text style={styles.playerName}>{currentPlayer?.name || 'Jugador'}</Text>
        <Text style={styles.playerRole}>
          {isForensicScientist ? '🔬 Científico Forense' : 
           isMurderer ? '🔪 Asesino' : 
           '🔍 Investigador'}
        </Text>
        {isInvestigator && (
          <View style={styles.badgeInfo}>
            <Text style={styles.badgeText}>
              {currentPlayer?.hasBadge ? '✅ Tienes placa' : '❌ Sin placa'}
            </Text>
          </View>
        )}
      </View>

      {/* Grid de jugadores */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Jugadores ({players.length})</Text>
        <DeceptionPlayerGrid 
          players={players}
          currentPlayerId={fakeCurrentPlayerId}
        />
      </View>

      {/* Ficha de escena actual */}
      {currentSceneTile && selectedSceneOption && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pista Actual del Científico Forense</Text>
          <DeceptionSceneTile
            sceneTile={currentSceneTile}
            selectedOption={selectedSceneOption}
            isForensicScientist={false}
          />
        </View>
      )}

      {/* Historial de fichas de escena */}
      {sceneTilesHistory.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Historial de Pistas</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {sceneTilesHistory.map((history, index) => (
              <View key={index} style={styles.historyCard}>
                <Text style={styles.historyCategory}>{history.sceneTile.category}</Text>
                <Text style={styles.historyOption}>{history.option}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      {/* Cartas del jugador actual */}
      {currentPlayer && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Tus Cartas</Text>
          
          <View style={styles.cardsSection}>
            <Text style={styles.cardsSubtitle}>Armas ({allWeapons.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
              {allWeapons.map((weapon, index) => (
                <DeceptionEvidenceCard
                  key={index}
                  card={weapon}
                  type="weapon"
                  isSelectable={isInvestigator && currentPlayer.hasBadge}
                  isSelected={selectedWeapon?.id === weapon.id}
                  onPress={() => {
                    if (isInvestigator && currentPlayer.hasBadge) {
                      setSelectedWeapon(weapon);
                    }
                  }}
                />
              ))}
            </ScrollView>
          </View>

          <View style={styles.cardsSection}>
            <Text style={styles.cardsSubtitle}>Pistas Clave ({allClues.length})</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardsScroll}>
              {allClues.map((clue, index) => (
                <DeceptionEvidenceCard
                  key={index}
                  card={clue}
                  type="clue"
                  isSelectable={isInvestigator && currentPlayer.hasBadge}
                  isSelected={selectedClue?.id === clue.id}
                  onPress={() => {
                    if (isInvestigator && currentPlayer.hasBadge) {
                      setSelectedClue(clue);
                    }
                  }}
                />
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Historial de acusaciones */}
      {accusations.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Acusaciones ({accusations.length})</Text>
          <ScrollView style={styles.accusationsList}>
            {accusations.map((accusation, index) => {
              const accPlayer = players.find(p => p.id === accusation.playerId);
              return (
                <View 
                  key={index} 
                  style={[
                    styles.accusationCard,
                    accusation.correct && styles.accusationCorrect
                  ]}
                >
                  <Text style={styles.accusationPlayer}>
                    {accPlayer?.name || 'Jugador'}
                  </Text>
                  <Text style={styles.accusationDetails}>
                    {accusation.weapon.name} + {accusation.clue.name}
                  </Text>
                  <Text style={[
                    styles.accusationResult,
                    accusation.correct ? styles.accusationResultCorrect : styles.accusationResultWrong
                  ]}>
                    {accusation.correct ? '✅ Correcto' : '❌ Incorrecto'}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
      )}

      {/* Acciones del jugador */}
      <View style={styles.actionsSection}>
        {isForensicScientist && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.forensicButton]}
            onPress={() => setShowSceneTileModal(true)}
          >
            <Text style={styles.actionButtonText}>🔬 Revelar Nueva Pista</Text>
          </TouchableOpacity>
        )}

        {isInvestigator && currentPlayer?.hasBadge && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.accusationButton]}
            onPress={() => setShowAccusationModal(true)}
          >
            <Text style={styles.actionButtonText}>⚖️ Hacer Acusación</Text>
          </TouchableOpacity>
        )}

        {currentRound < maxRounds && (
          <TouchableOpacity 
            style={[styles.actionButton, styles.roundButton]}
            onPress={handleNextRound}
          >
            <Text style={styles.actionButtonText}>➡️ Siguiente Ronda</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Modal para seleccionar ficha de escena (Científico Forense) */}
      <Modal
        visible={showSceneTileModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowSceneTileModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Selecciona una Ficha de Escena</Text>
            <ScrollView style={styles.modalScroll}>
              {localSceneTiles.map((tile, index) => (
                <View key={index} style={styles.sceneTileModalCard}>
                  <Text style={styles.sceneTileModalCategory}>{tile.category}</Text>
                  {tile.options.map((option, optIndex) => (
                    <TouchableOpacity
                      key={optIndex}
                      style={styles.sceneTileOption}
                      onPress={() => handleSceneTileSelect(tile, option)}
                    >
                      <Text style={styles.sceneTileOptionText}>{option}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setShowSceneTileModal(false)}
            >
              <Text style={styles.modalCloseButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal de acusación */}
      <DeceptionSolutionModal
        visible={showAccusationModal}
        onClose={() => {
          setShowAccusationModal(false);
          setSelectedWeapon(null);
          setSelectedClue(null);
        }}
        weapons={allWeapons}
        clues={allClues}
        onSubmitSolution={handleMakeAccusation}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  contentContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  gameInfo: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    gap: 5,
    backgroundColor: '#16213e',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#a0a0a0',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  playerInfoCard: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4a90e2',
    alignItems: 'center',
  },
  playerInfoTitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  playerName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  playerRole: {
    fontSize: 16,
    color: '#4a90e2',
    marginBottom: 10,
  },
  badgeInfo: {
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  badgeText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  cardsSection: {
    marginBottom: 20,
  },
  cardsSubtitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 10,
  },
  cardsScroll: {
    marginHorizontal: -5,
  },
  historyCard: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 150,
  },
  historyCategory: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  historyOption: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  accusationsList: {
    maxHeight: 200,
  },
  accusationCard: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  accusationCorrect: {
    borderColor: '#2ecc71',
    backgroundColor: '#1e3a2e',
  },
  accusationPlayer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  accusationDetails: {
    fontSize: 12,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  accusationResult: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  accusationResultCorrect: {
    color: '#2ecc71',
  },
  accusationResultWrong: {
    color: '#e74c3c',
  },
  actionsSection: {
    gap: 12,
    marginTop: 10,
  },
  actionButton: {
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  forensicButton: {
    backgroundColor: '#2ecc71',
  },
  accusationButton: {
    backgroundColor: '#e74c3c',
  },
  roundButton: {
    backgroundColor: '#4a90e2',
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
    borderRadius: 20,
    padding: 20,
    width: '90%',
    maxHeight: '80%',
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalScroll: {
    maxHeight: 400,
  },
  sceneTileModalCard: {
    backgroundColor: '#0f3460',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  sceneTileModalCategory: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  sceneTileOption: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  sceneTileOptionText: {
    color: '#fff',
    fontSize: 14,
  },
  modalCloseButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    marginTop: 15,
    alignItems: 'center',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
