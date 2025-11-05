import React, { useEffect } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useDiccionarioFalsoStore } from '../store/diccionarioFalsoStore';
import { DiccionarioFalsoHUD } from '../components/DiccionarioFalsoHUD';
import { DiccionarioFalsoWordDisplay } from '../components/DiccionarioFalsoWordDisplay';
import { DiccionarioFalsoDefinitionInput } from '../components/DiccionarioFalsoDefinitionInput';
import { DiccionarioFalsoVotingList } from '../components/DiccionarioFalsoVotingList';
import { DiccionarioFalsoRoundResults } from '../components/DiccionarioFalsoRoundResults';
import { DiccionarioFalsoPlayerList } from '../components/DiccionarioFalsoPlayerList';
import { TouchableOpacity, Text } from 'react-native';

export const DiccionarioFalsoJuego = ({ navigation }) => {
  const gameStatus = useDiccionarioFalsoStore((state) => state.gameStatus);
  const currentPlayerId = useDiccionarioFalsoStore((state) => state.currentPlayerId);
  const startRound = useDiccionarioFalsoStore((state) => state.startRound);
  const nextRound = useDiccionarioFalsoStore((state) => state.nextRound);
  const currentRound = useDiccionarioFalsoStore((state) => state.currentRound);
  const maxRounds = useDiccionarioFalsoStore((state) => state.maxRounds);
  
  // Iniciar la ronda cuando se carga la pantalla si está en lobby
  useEffect(() => {
    if (gameStatus === 'lobby') {
      const success = startRound();
      if (!success && navigation) {
        // Si no se puede iniciar ronda, volver al index
        navigation.navigate('index');
      }
    }
  }, [gameStatus]);
  
  // Navegar automáticamente según el estado
  useEffect(() => {
    if (gameStatus === 'finished') {
      // Navegar a la pantalla de resultados finales
      if (navigation) {
        setTimeout(() => {
          navigation.navigate('el-diccionario-falso-resultados');
        }, 2000);
      }
    }
  }, [gameStatus, navigation]);
  
  if (!currentPlayerId) {
    return null;
  }
  
  // Determinar qué componente mostrar según la fase
  let mainContent = null;
  
  if (gameStatus === 'writing') {
    mainContent = (
      <ScrollView style={styles.content}>
        <View style={styles.contentWrapper}>
          <DiccionarioFalsoWordDisplay />
          <View style={styles.playerListContainer}>
            <DiccionarioFalsoPlayerList
              currentPlayerId={currentPlayerId}
              showSubmissionStatus={true}
            />
          </View>
          <DiccionarioFalsoDefinitionInput playerId={currentPlayerId} />
        </View>
      </ScrollView>
    );
  } else if (gameStatus === 'voting') {
    mainContent = (
      <ScrollView style={styles.content}>
        <View style={styles.contentWrapper}>
          <DiccionarioFalsoWordDisplay />
          <View style={styles.playerListContainer}>
            <DiccionarioFalsoPlayerList
              currentPlayerId={currentPlayerId}
              showSubmissionStatus={true}
            />
          </View>
          <DiccionarioFalsoVotingList playerId={currentPlayerId} />
        </View>
      </ScrollView>
    );
  } else if (gameStatus === 'results') {
    mainContent = (
      <ScrollView style={styles.content}>
        <View style={styles.contentWrapper}>
          <DiccionarioFalsoRoundResults />
          <View style={styles.nextRoundContainer}>
            {currentRound < maxRounds ? (
              <TouchableOpacity
                style={styles.nextRoundButton}
                onPress={() => {
                  nextRound();
                }}
              >
                <Text style={styles.nextRoundButtonText}>
                  Siguiente Ronda
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.finishGameButton}
                onPress={() => {
                  if (navigation) {
                    navigation.navigate('el-diccionario-falso-resultados');
                  }
                }}
              >
                <Text style={styles.finishGameButtonText}>
                  Ver Resultados Finales
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    );
  } else if (gameStatus === 'lobby') {
    // Esperando a iniciar la ronda
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Preparando la ronda...</Text>
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {gameStatus !== 'results' && <DiccionarioFalsoHUD />}
      {mainContent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
  contentWrapper: {
    paddingTop: 80, // Espacio para el HUD
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  playerListContainer: {
    marginBottom: 16,
  },
  nextRoundContainer: {
    marginTop: 24,
    marginBottom: 16,
  },
  nextRoundButton: {
    backgroundColor: '#2196f3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextRoundButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  finishGameButton: {
    backgroundColor: '#4caf50',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  finishGameButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    fontSize: 18,
    color: '#666',
    fontStyle: 'italic',
  },
});
