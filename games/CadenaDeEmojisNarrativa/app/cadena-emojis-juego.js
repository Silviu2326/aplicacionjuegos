import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { CadenaEmojisVisor } from '../components/CadenaEmojisVisor';
import { CadenaEmojisSelector } from '../components/CadenaEmojisSelector';
import { CadenaEmojisPanelJugador } from '../components/CadenaEmojisPanelJugador';
import { CadenaEmojisInputNarracion } from '../components/CadenaEmojisInputNarracion';
import { useCadenaEmojisStore } from '../store/cadenaEmojisStore';

export const CadenaEmojisJuego = ({ navigation }) => {
  const [selectorVisible, setSelectorVisible] = useState(false);
  const [narration, setNarration] = useState('');
  
  const gameStatus = useCadenaEmojisStore((state) => state.gameStatus);
  const isGameFinished = useCadenaEmojisStore((state) => state.isGameFinished);
  const finishGame = useCadenaEmojisStore((state) => state.finishGame);
  const addEmojiToChain = useCadenaEmojisStore((state) => state.addEmojiToChain);
  const emojiChain = useCadenaEmojisStore((state) => state.getFullChain());
  const canAddMoreEmojis = useCadenaEmojisStore((state) => state.canAddMoreEmojis);

  useEffect(() => {
    if (isGameFinished() && navigation && navigation.navigate) {
      navigation.navigate('cadena-emojis-resumen');
    }
  }, [gameStatus, navigation, isGameFinished]);

  const handleEmojiSelect = (emoji) => {
    setSelectorVisible(false);
    // Si hay narración, se guardará junto con el emoji
    // Si no, se puede añadir después
    if (narration.trim()) {
      handleAddEmojiWithNarration(emoji, narration);
      setNarration('');
    } else {
      // Permitir añadir emoji sin narración (se puede añadir después)
      handleAddEmojiWithNarration(emoji, '');
    }
  };

  const handleAddEmojiWithNarration = (emoji, narrationText) => {
    const success = addEmojiToChain(emoji, narrationText);
    if (!success) {
      Alert.alert('Error', 'No se pudo añadir el emoji a la cadena');
    }
  };

  const handleNarrationSubmit = (narrationText) => {
    setNarration(narrationText);
    // La narración se guardará cuando se seleccione el emoji
  };

  const handleFinishEarly = () => {
    Alert.alert(
      'Finalizar Partida',
      '¿Estás seguro de que deseas finalizar la partida ahora?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Finalizar',
          onPress: () => {
            finishGame();
            if (navigation && navigation.navigate) {
              navigation.navigate('cadena-emojis-resumen');
            }
          },
        },
      ]
    );
  };

  if (gameStatus !== 'playing') {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>El juego no está en curso</Text>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation && navigation.navigate && navigation.navigate('index')}
        >
          <Text style={styles.backButtonText}>Volver al inicio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <CadenaEmojisPanelJugador />
      
      <CadenaEmojisVisor />
      
      {canAddMoreEmojis() ? (
        <>
          <View style={styles.instructionBox}>
            <View style={styles.instructionHeader}>
              <Text style={styles.instructionIcon}>📝</Text>
              <Text style={styles.instructionTitle}>Instrucciones</Text>
            </View>
            <View style={styles.instructionSteps}>
              {emojiChain.length === 0 ? (
                <>
                  <View style={styles.stepItem}>
                    <Text style={styles.stepNumber}>1</Text>
                    <Text style={styles.stepText}>Elige un emoji para comenzar la historia</Text>
                  </View>
                  <View style={styles.stepItem}>
                    <Text style={styles.stepNumber}>2</Text>
                    <Text style={styles.stepText}>Narra en voz alta o escribe tu parte de la historia</Text>
                  </View>
                </>
              ) : (
                <>
                  <View style={styles.stepItem}>
                    <Text style={styles.stepNumber}>1</Text>
                    <Text style={styles.stepText}>Narra la historia completa desde el primer emoji hasta el último</Text>
                  </View>
                  <View style={styles.stepItem}>
                    <Text style={styles.stepNumber}>2</Text>
                    <Text style={styles.stepText}>Añade tu emoji para continuar la historia</Text>
                  </View>
                  <View style={styles.stepItem}>
                    <Text style={styles.stepNumber}>3</Text>
                    <Text style={styles.stepText}>Escribe o narra tu parte de la historia</Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <CadenaEmojisInputNarracion
            onNarrationSubmit={handleNarrationSubmit}
            initialValue={narration}
          />

          <TouchableOpacity
            style={styles.selectEmojiButton}
            onPress={() => setSelectorVisible(true)}
          >
            <Text style={styles.selectEmojiButtonText}>
              {emojiChain.length === 0 ? 'Elegir Primer Emoji' : 'Añadir Emoji'}
            </Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.finishedBox}>
          <Text style={styles.finishedText}>
            ¡Has alcanzado el límite de emojis! La historia está completa.
          </Text>
          <TouchableOpacity
            style={styles.viewResultsButton}
            onPress={() => {
              finishGame();
              if (navigation && navigation.navigate) {
                navigation.navigate('cadena-emojis-resumen');
              }
            }}
          >
            <Text style={styles.viewResultsButtonText}>Ver Resumen</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity style={styles.finishEarlyButton} onPress={handleFinishEarly}>
        <Text style={styles.finishEarlyButtonText}>Finalizar Partida Ahora</Text>
      </TouchableOpacity>

      <CadenaEmojisSelector
        visible={selectorVisible}
        onSelect={handleEmojiSelect}
        onClose={() => setSelectorVisible(false)}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  errorText: {
    fontSize: 16,
    color: '#f44336',
    textAlign: 'center',
    marginTop: 100,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    marginHorizontal: 40,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionBox: {
    backgroundColor: '#FFF9C4',
    borderRadius: 8,
    padding: 16,
    marginVertical: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  instructionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  instructionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F57F17',
  },
  instructionSteps: {
    marginTop: 4,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  stepNumber: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FBC02D',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 24,
    marginRight: 12,
    flexShrink: 0,
  },
  stepText: {
    fontSize: 14,
    color: '#5D4037',
    lineHeight: 20,
    flex: 1,
  },
  selectEmojiButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  selectEmojiButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  finishedBox: {
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    marginVertical: 16,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  finishedText: {
    fontSize: 16,
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  viewResultsButton: {
    backgroundColor: '#4CAF50',
    padding: 14,
    borderRadius: 8,
    paddingHorizontal: 32,
  },
  viewResultsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  finishEarlyButton: {
    backgroundColor: '#FF9800',
    padding: 14,
    borderRadius: 8,
    marginTop: 16,
    alignItems: 'center',
  },
  finishEarlyButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});

