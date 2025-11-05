import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFakeArtistGameStore } from '../store/fakeArtistGameStore';
import { WORD_PACKS } from '../constants/FakeArtistWordPacks';

export const FakeArtistRoleReveal = ({ navigation }) => {
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [roleRevealed, setRoleRevealed] = useState(false);
  
  const players = useFakeArtistGameStore((state) => state.players);
  const revealRoleToPlayer = useFakeArtistGameStore((state) => state.revealRoleToPlayer);
  const selectCategoryAndWord = useFakeArtistGameStore((state) => state.selectCategoryAndWord);
  const selectedCategory = useFakeArtistGameStore((state) => state.selectedCategory);
  const secretWord = useFakeArtistGameStore((state) => state.secretWord);
  const currentMasterIndex = useFakeArtistGameStore((state) => state.currentMasterIndex);

  const currentPlayer = players[currentPlayerIndex];
  const isMaster = currentPlayerIndex === currentMasterIndex;
  const roleInfo = currentPlayer ? revealRoleToPlayer(currentPlayer.id) : null;

  useEffect(() => {
    setRoleRevealed(false);
  }, [currentPlayerIndex]);

  const handleRevealRole = () => {
    setRoleRevealed(true);
  };

  const handleCategorySelection = (category) => {
    const success = selectCategoryAndWord(category);
    if (success) {
      Alert.alert('Palabra seleccionada', 'La palabra secreta ha sido guardada.');
    } else {
      Alert.alert('Error', 'No se pudo seleccionar la palabra');
    }
  };

  const handleNext = () => {
    if (currentPlayerIndex < players.length - 1) {
      setCurrentPlayerIndex(currentPlayerIndex + 1);
      setRoleRevealed(false);
    } else {
      // Todos han visto sus roles, avanzar al dibujo
      if (!secretWord && isMaster) {
        Alert.alert('Atención', 'El Maestro debe seleccionar una categoría y palabra primero');
        return;
      }
      
      if (!secretWord) {
        Alert.alert('Esperando', 'El Maestro debe seleccionar la palabra secreta');
        return;
      }
      
      navigation?.navigate('drawing-board');
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
      <Text style={styles.playerName}>{currentPlayer.name}</Text>
      <Text style={styles.instruction}>
        Pasa el dispositivo a {currentPlayer.name}
      </Text>

      {!roleRevealed ? (
        <TouchableOpacity style={styles.revealButton} onPress={handleRevealRole}>
          <Text style={styles.revealButtonText}>Revelar Rol</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.roleContainer}>
          {isMaster ? (
            <View style={styles.masterContainer}>
              <Text style={styles.roleTitle}>Eres el Maestro de la Pregunta</Text>
              <Text style={styles.roleDescription}>
                Selecciona una categoría y luego una palabra secreta
              </Text>
              
              {!selectedCategory ? (
                <View style={styles.categoriesContainer}>
                  {Object.keys(WORD_PACKS).map((categoryKey) => (
                    <TouchableOpacity
                      key={categoryKey}
                      style={styles.categoryButton}
                      onPress={() => handleCategorySelection(categoryKey)}
                    >
                      <Text style={styles.categoryButtonText}>
                        {WORD_PACKS[categoryKey].name}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <View style={styles.wordContainer}>
                  <Text style={styles.wordLabel}>Palabra seleccionada:</Text>
                  <Text style={styles.secretWord}>{secretWord}</Text>
                  <Text style={styles.wordHint}>
                    Mantén esto en secreto. Los artistas reales verán esta palabra.
                  </Text>
                </View>
              )}
            </View>
          ) : roleInfo?.role === 'fake-artist' ? (
            <View style={styles.fakeArtistContainer}>
              <Text style={styles.roleTitle}>Eres el Artista Falso</Text>
              <Text style={styles.roleX}>✗</Text>
              <Text style={styles.roleDescription}>
                No sabes qué palabra se está dibujando. Tu objetivo es fingir que lo sabes y evitar ser descubierto.
              </Text>
            </View>
          ) : (
            <View style={styles.realArtistContainer}>
              <Text style={styles.roleTitle}>Eres un Artista Real</Text>
              <Text style={styles.secretWord}>{secretWord}</Text>
              <Text style={styles.roleDescription}>
                Esta es la palabra que debes dibujar. Sé lo suficientemente explícito para que otros artistas reales te entiendan, pero no demasiado obvio para que el impostor no descubra la palabra.
              </Text>
            </View>
          )}
        </View>
      )}

      <View style={styles.navigationButtons}>
        {currentPlayerIndex > 0 && (
          <TouchableOpacity style={styles.navButton} onPress={handleBack}>
            <Text style={styles.navButtonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        
        {roleRevealed && (
          <TouchableOpacity style={styles.navButton} onPress={handleNext}>
            <Text style={styles.navButtonText}>
              {currentPlayerIndex < players.length - 1 ? 'Siguiente' : 'Comenzar Dibujo'}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={styles.progress}>
        {currentPlayerIndex + 1} / {players.length}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  instruction: {
    fontSize: 18,
    color: '#666',
    marginBottom: 40,
    textAlign: 'center',
  },
  revealButton: {
    backgroundColor: '#2196F3',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  revealButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  roleContainer: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 30,
  },
  masterContainer: {
    alignItems: 'center',
    width: '100%',
  },
  fakeArtistContainer: {
    alignItems: 'center',
    width: '100%',
  },
  realArtistContainer: {
    alignItems: 'center',
    width: '100%',
  },
  roleTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  roleX: {
    fontSize: 80,
    color: '#f44336',
    marginBottom: 20,
  },
  secretWord: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 20,
    textAlign: 'center',
  },
  roleDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
  },
  categoriesContainer: {
    width: '100%',
    marginTop: 20,
  },
  categoryButton: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: '#2196F3',
  },
  categoryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
  },
  wordContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  wordLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  wordHint: {
    fontSize: 14,
    color: '#999',
    marginTop: 10,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  navButton: {
    backgroundColor: '#4CAF50',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 20,
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: 14,
    color: '#999',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
  },
});

