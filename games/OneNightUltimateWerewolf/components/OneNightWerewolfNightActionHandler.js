import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';
import { ROLES } from '../constants/OneNightWerewolfRoles';
import { OneNightWerewolfPlayerGrid } from './OneNightWerewolfPlayerGrid';
import { OneNightWerewolfRoleCard } from './OneNightWerewolfRoleCard';

export const OneNightWerewolfNightActionHandler = () => {
  const players = useOneNightWerewolfStore((state) => state.players);
  const centerCards = useOneNightWerewolfStore((state) => state.centerCards);
  const currentPlayerId = useOneNightWerewolfStore((state) => state.currentPlayerId);
  const waitingForNightAction = useOneNightWerewolfStore((state) => state.waitingForNightAction);
  const performNightAction = useOneNightWerewolfStore((state) => state.performNightAction);
  
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedCenterCard, setSelectedCenterCard] = useState(null);
  const [selectedTwoPlayers, setSelectedTwoPlayers] = useState([]);
  
  const currentPlayer = players.find(p => p.id === currentPlayerId);
  
  if (!currentPlayer || !waitingForNightAction) {
    return null;
  }
  
  const currentRole = currentPlayer.currentRole;
  
  const handleActionComplete = () => {
    let actionData = {};
    
    switch (currentRole) {
      case ROLES.SEER:
        // La Vidente puede ver una carta de jugador o dos del centro
        if (selectedTarget) {
          actionData = { type: 'look_at_player', targetPlayerId: selectedTarget };
        } else if (selectedCenterCard !== null && selectedCenterCard.length === 2) {
          actionData = { type: 'look_at_center', centerCardIndices: selectedCenterCard };
        } else {
          Alert.alert('Acción requerida', 'Debes seleccionar un jugador o dos cartas del centro');
          return;
        }
        break;
        
      case ROLES.ROBBER:
        // El Ladrón intercambia con otro jugador
        if (!selectedTarget) {
          Alert.alert('Acción requerida', 'Debes seleccionar un jugador para intercambiar');
          return;
        }
        actionData = { type: 'swap', targetPlayerId: selectedTarget };
        break;
        
      case ROLES.TROUBLEMAKER:
        // La Alborotadora intercambia dos jugadores
        if (selectedTwoPlayers.length !== 2) {
          Alert.alert('Acción requerida', 'Debes seleccionar dos jugadores para intercambiar');
          return;
        }
        actionData = {
          type: 'swap_two_others',
          targetPlayer1Id: selectedTwoPlayers[0],
          targetPlayer2Id: selectedTwoPlayers[1],
        };
        break;
        
      case ROLES.DRUNK:
        // El Borracho intercambia con una carta del centro
        if (selectedCenterCard === null || selectedCenterCard.length !== 1) {
          Alert.alert('Acción requerida', 'Debes seleccionar una carta del centro');
          return;
        }
        actionData = { type: 'swap_with_center', centerCardIndex: selectedCenterCard[0] };
        break;
        
      default:
        // Roles que no requieren acción interactiva
        actionData = { type: 'automatic' };
        break;
    }
    
    if (performNightAction(actionData)) {
      setSelectedTarget(null);
      setSelectedCenterCard(null);
      setSelectedTwoPlayers([]);
    }
  };
  
  const handlePlayerSelect = (playerId) => {
    if (playerId === currentPlayerId) {
      Alert.alert('Acción inválida', 'No puedes seleccionarte a ti mismo');
      return;
    }
    
    switch (currentRole) {
      case ROLES.SEER:
        // Vidente: selecciona un jugador O dos cartas del centro
        setSelectedTarget(playerId);
        setSelectedCenterCard(null);
        break;
        
      case ROLES.ROBBER:
        // Ladrón: selecciona un jugador para intercambiar
        setSelectedTarget(playerId);
        break;
        
      case ROLES.TROUBLEMAKER:
        // Alborotadora: selecciona dos jugadores
        if (selectedTwoPlayers.includes(playerId)) {
          setSelectedTwoPlayers(selectedTwoPlayers.filter(id => id !== playerId));
        } else if (selectedTwoPlayers.length < 2) {
          setSelectedTwoPlayers([...selectedTwoPlayers, playerId]);
        } else {
          Alert.alert('Selección completa', 'Ya has seleccionado dos jugadores');
        }
        break;
        
      default:
        break;
    }
  };
  
  const handleCenterCardSelect = (index) => {
    if (currentRole === ROLES.SEER) {
      // Vidente puede seleccionar dos cartas del centro
      if (selectedCenterCard.includes(index)) {
        setSelectedCenterCard(selectedCenterCard.filter(i => i !== index));
      } else if (selectedCenterCard.length < 2) {
        setSelectedCenterCard([...selectedCenterCard, index]);
      } else {
        Alert.alert('Selección completa', 'Ya has seleccionado dos cartas');
      }
    } else if (currentRole === ROLES.DRUNK) {
      // Borracho selecciona una carta del centro
      setSelectedCenterCard([index]);
    }
  };
  
  const renderActionInterface = () => {
    switch (currentRole) {
      case ROLES.WEREWOLF:
      case ROLES.MASON:
      case ROLES.INSOMNIAC:
        // Estos roles solo necesitan confirmar que vieron/reconocieron
        return (
          <View style={styles.actionContainer}>
            <Text style={styles.instructionText}>
              {currentRole === ROLES.WEREWOLF && 'Reconoce a otros Hombres Lobo.'}
              {currentRole === ROLES.MASON && 'Reconoce a otros Masones.'}
              {currentRole === ROLES.INSOMNIAC && 'Mira tu propia carta.'}
            </Text>
            <TouchableOpacity style={styles.confirmButton} onPress={handleActionComplete}>
              <Text style={styles.confirmButtonText}>Continuar</Text>
            </TouchableOpacity>
          </View>
        );
        
      case ROLES.SEER:
        return (
          <View style={styles.actionContainer}>
            <Text style={styles.instructionText}>
              Puedes mirar la carta de un jugador o dos cartas del centro.
            </Text>
            <Text style={styles.subtitle}>Selecciona un jugador:</Text>
            <OneNightWerewolfPlayerGrid
              onPlayerSelect={handlePlayerSelect}
              selectable={!selectedTarget && selectedCenterCard.length === 0}
            />
            <Text style={styles.subtitle}>O selecciona dos cartas del centro:</Text>
            <View style={styles.centerCardsContainer}>
              {centerCards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.centerCard,
                    selectedCenterCard.includes(index) && styles.selectedCenterCard,
                  ]}
                  onPress={() => handleCenterCardSelect(index)}
                  disabled={selectedTarget !== null}
                >
                  <Text style={styles.centerCardText}>Carta {index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {(selectedTarget || selectedCenterCard.length > 0) && (
              <TouchableOpacity style={styles.confirmButton} onPress={handleActionComplete}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            )}
          </View>
        );
        
      case ROLES.ROBBER:
        return (
          <View style={styles.actionContainer}>
            <Text style={styles.instructionText}>
              Intercambia tu carta con la de otro jugador.
            </Text>
            <OneNightWerewolfPlayerGrid
              onPlayerSelect={handlePlayerSelect}
              selectable={!selectedTarget}
            />
            {selectedTarget && (
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedText}>
                  Intercambiarás con: {players.find(p => p.id === selectedTarget)?.name}
                </Text>
                <TouchableOpacity style={styles.confirmButton} onPress={handleActionComplete}>
                  <Text style={styles.confirmButtonText}>Confirmar</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
        
      case ROLES.TROUBLEMAKER:
        return (
          <View style={styles.actionContainer}>
            <Text style={styles.instructionText}>
              Intercambia las cartas de otros dos jugadores.
            </Text>
            <OneNightWerewolfPlayerGrid
              onPlayerSelect={handlePlayerSelect}
              selectable={selectedTwoPlayers.length < 2}
            />
            {selectedTwoPlayers.length > 0 && (
              <View style={styles.selectedInfo}>
                <Text style={styles.selectedText}>
                  Intercambiarás: {selectedTwoPlayers.map(id => players.find(p => p.id === id)?.name).join(' y ')}
                </Text>
                {selectedTwoPlayers.length === 2 && (
                  <TouchableOpacity style={styles.confirmButton} onPress={handleActionComplete}>
                    <Text style={styles.confirmButtonText}>Confirmar</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
          </View>
        );
        
      case ROLES.DRUNK:
        return (
          <View style={styles.actionContainer}>
            <Text style={styles.instructionText}>
              Intercambia tu carta con una del centro (sin mirar).
            </Text>
            <View style={styles.centerCardsContainer}>
              {centerCards.map((card, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.centerCard,
                    selectedCenterCard.includes(index) && styles.selectedCenterCard,
                  ]}
                  onPress={() => handleCenterCardSelect(index)}
                >
                  <Text style={styles.centerCardText}>Carta {index + 1}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedCenterCard.length > 0 && (
              <TouchableOpacity style={styles.confirmButton} onPress={handleActionComplete}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            )}
          </View>
        );
        
      default:
        return (
          <TouchableOpacity style={styles.confirmButton} onPress={handleActionComplete}>
            <Text style={styles.confirmButtonText}>Continuar</Text>
          </TouchableOpacity>
        );
    }
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <OneNightWerewolfRoleCard role={currentRole} />
        {renderActionInterface()}
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
  actionContainer: {
    marginTop: 20,
  },
  instructionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginTop: 16,
    marginBottom: 8,
  },
  centerCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
  },
  centerCard: {
    width: 80,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedCenterCard: {
    borderColor: '#2196F3',
    backgroundColor: '#E3F2FD',
  },
  centerCardText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  selectedInfo: {
    marginTop: 20,
    alignItems: 'center',
  },
  selectedText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

