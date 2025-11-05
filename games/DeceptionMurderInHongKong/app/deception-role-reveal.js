import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { DeceptionRoleCard } from '../components/DeceptionRoleCard';
import { useDeceptionGameStore } from '../store/deceptionGameStore';
import { getRoleData, DECEPTION_ROLES } from '../constants/DeceptionRoles';
import { WEAPONS, CLUES } from '../constants/DeceptionCards';

export const DeceptionRoleReveal = ({ navigation, route }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [solutionSelected, setSolutionSelected] = useState(false);
  const [selectedWeapon, setSelectedWeapon] = useState(null);
  const [selectedClue, setSelectedClue] = useState(null);
  
  const { 
    players, 
    murdererId, 
    forensicScientistId,
    solution,
    murdererSelectSolution,
    gameStatus,
    dealCards
  } = useDeceptionGameStore();

  const currentPlayer = players[currentPlayerIndex];
  const isMurderer = currentPlayer?.id === murdererId;
  const isForensicScientist = currentPlayer?.id === forensicScientistId;
  const isInvestigator = !isMurderer && !isForensicScientist;

  useEffect(() => {
    // Si es el asesino y no ha seleccionado solución, mostrar opciones
    if (isMurderer && !solution.weapon && !solution.clue) {
      setSolutionSelected(false);
    } else if (isMurderer && solution.weapon && solution.clue) {
      setSolutionSelected(true);
    }
  }, [isMurderer, solution]);

  const handleNextPlayer = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
    } else {
      // Todos han visto sus roles, continuar al juego
      if (navigation && navigation.navigate) {
        navigation.navigate('deception-game-board');
      }
    }
  };

  const handlePreviousPlayer = () => {
    if (currentPlayerIndex > 0) {
      setCurrentPlayerIndex(currentPlayerIndex - 1);
    }
  };

  const handleSelectSolution = () => {
    if (selectedWeapon && selectedClue) {
      if (murdererSelectSolution(selectedWeapon.id, selectedClue.id)) {
        setSolutionSelected(true);
        Alert.alert('Solución seleccionada', 'Has seleccionado tu solución secreta.');
      }
    } else {
      Alert.alert('Selección incompleta', 'Por favor selecciona un arma y una pista clave.');
    }
  };

  const handleContinue = () => {
    if (isMurderer && !solutionSelected) {
      Alert.alert('Acción requerida', 'Debes seleccionar tu solución secreta antes de continuar.');
      return;
    }
    
    if (currentPlayerIndex < players.length - 1) {
      handleNextPlayer();
    } else {
      // Repartir cartas si aún no se han repartido
      if (players.length > 0 && players[0].weaponCards.length === 0) {
        dealCards();
      }
      
      if (navigation && navigation.navigate) {
        navigation.navigate('deception-game-board');
      }
    }
  };

  const roleData = currentPlayer ? getRoleData(currentPlayer.role) : null;

  // Si es el asesino y no ha seleccionado solución, mostrar selección
  if (isMurderer && !solutionSelected) {
    return (
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Tu Rol: Asesino</Text>
          <Text style={styles.subtitle}>Selecciona tu solución secreta</Text>
        </View>

        <View style={styles.roleCardContainer}>
          <DeceptionRoleCard 
            role={roleData}
            playerName={currentPlayer?.name}
          />
        </View>

        <View style={styles.solutionSection}>
          <Text style={styles.sectionTitle}>Selecciona el Arma</Text>
          <View style={styles.cardsGrid}>
            {WEAPONS.slice(0, 12).map((weapon) => (
              <TouchableOpacity
                key={weapon.id}
                style={[
                  styles.cardOption,
                  selectedWeapon?.id === weapon.id && styles.cardOptionSelected
                ]}
                onPress={() => setSelectedWeapon(weapon)}
              >
                <Text style={[
                  styles.cardOptionText,
                  selectedWeapon?.id === weapon.id && styles.cardOptionTextSelected
                ]}>
                  {weapon.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>Selecciona la Pista Clave</Text>
          <View style={styles.cardsGrid}>
            {CLUES.slice(0, 12).map((clue) => (
              <TouchableOpacity
                key={clue.id}
                style={[
                  styles.cardOption,
                  selectedClue?.id === clue.id && styles.cardOptionSelected
                ]}
                onPress={() => setSelectedClue(clue)}
              >
                <Text style={[
                  styles.cardOptionText,
                  selectedClue?.id === clue.id && styles.cardOptionTextSelected
                ]}>
                  {clue.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <TouchableOpacity 
          style={[styles.button, styles.primaryButton, (!selectedWeapon || !selectedClue) && styles.buttonDisabled]} 
          onPress={handleSelectSolution}
          disabled={!selectedWeapon || !selectedClue}
        >
          <Text style={styles.buttonText}>Confirmar Solución</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  // Vista normal para otros roles
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>Tu Rol</Text>
        <Text style={styles.playerInfo}>
          Jugador: {currentPlayer?.name || 'Desconocido'}
        </Text>
        <Text style={styles.progressText}>
          {currentPlayerIndex + 1} de {players.length}
        </Text>
      </View>

      <View style={styles.roleCardContainer}>
        <DeceptionRoleCard 
          role={roleData}
          playerName={currentPlayer?.name}
        />
      </View>

      {isForensicScientist && solution.weapon && solution.clue && (
        <View style={styles.solutionInfo}>
          <Text style={styles.solutionTitle}>Solución del Crimen (Solo tú la conoces)</Text>
          <View style={styles.solutionCards}>
            <View style={styles.solutionCard}>
              <Text style={styles.solutionLabel}>Arma:</Text>
              <Text style={styles.solutionValue}>{solution.weapon.name}</Text>
            </View>
            <View style={styles.solutionCard}>
              <Text style={styles.solutionLabel}>Pista Clave:</Text>
              <Text style={styles.solutionValue}>{solution.clue.name}</Text>
            </View>
          </View>
          <Text style={styles.solutionHint}>
            Recuerda: No puedes hablar. Usa las fichas de escena para guiar a los investigadores.
          </Text>
        </View>
      )}

      {isMurderer && solutionSelected && (
        <View style={styles.solutionInfo}>
          <Text style={styles.solutionTitle}>Tu Solución Seleccionada</Text>
          <View style={styles.solutionCards}>
            <View style={styles.solutionCard}>
              <Text style={styles.solutionLabel}>Arma:</Text>
              <Text style={styles.solutionValue}>{solution.weapon?.name}</Text>
            </View>
            <View style={styles.solutionCard}>
              <Text style={styles.solutionLabel}>Pista Clave:</Text>
              <Text style={styles.solutionValue}>{solution.clue?.name}</Text>
            </View>
          </View>
          <Text style={styles.solutionHint}>
            Tu objetivo es evitar que los investigadores descubran esta combinación.
          </Text>
        </View>
      )}

      <View style={styles.navigationButtons}>
        {currentPlayerIndex > 0 && (
          <TouchableOpacity 
            style={[styles.button, styles.secondaryButton]} 
            onPress={handlePreviousPlayer}
          >
            <Text style={styles.buttonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity 
          style={[styles.button, styles.primaryButton]} 
          onPress={handleContinue}
        >
          <Text style={styles.buttonText}>
            {currentPlayerIndex < players.length - 1 ? 'Siguiente' : 'Continuar al Juego'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#a0a0a0',
    marginBottom: 15,
    textAlign: 'center',
  },
  playerInfo: {
    fontSize: 16,
    color: '#4a90e2',
    marginBottom: 5,
  },
  progressText: {
    fontSize: 14,
    color: '#888',
  },
  roleCardContainer: {
    marginBottom: 30,
  },
  solutionSection: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#0f3460',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  cardOption: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#4a90e2',
    minWidth: '30%',
    flex: 1,
    minWidth: '45%',
  },
  cardOptionSelected: {
    backgroundColor: '#4a90e2',
    borderColor: '#2ecc71',
  },
  cardOptionText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
  cardOptionTextSelected: {
    fontWeight: 'bold',
    color: '#fff',
  },
  solutionInfo: {
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  solutionCards: {
    gap: 15,
    marginBottom: 15,
  },
  solutionCard: {
    backgroundColor: '#0f3460',
    padding: 15,
    borderRadius: 8,
  },
  solutionLabel: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 5,
  },
  solutionValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4a90e2',
  },
  solutionHint: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'center',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
  },
  primaryButton: {
    backgroundColor: '#4a90e2',
  },
  secondaryButton: {
    backgroundColor: '#555',
  },
  buttonDisabled: {
    backgroundColor: '#555',
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
