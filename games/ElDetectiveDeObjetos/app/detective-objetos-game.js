import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';
import { DetectiveObjetosImageView } from '../components/DetectiveObjetosImageView';
import { DetectiveObjetosPlayerList } from '../components/DetectiveObjetosPlayerList';
import { DetectiveObjetosPhotographerControls } from '../components/DetectiveObjetosPhotographerControls';
import { DETECTIVE_OBJETOS_CONFIG } from '../constants/detectiveObjetosConfig';

export const DetectiveObjetosGame = ({ navigation }) => {
  const gameStatus = useDetectiveObjetosStore((state) => state.gameStatus);
  const currentPlayerId = useDetectiveObjetosStore((state) => state.currentPlayerId);
  const getCurrentPhotographer = useDetectiveObjetosStore((state) => state.getCurrentPhotographer);
  const players = useDetectiveObjetosStore((state) => state.players);
  const currentRound = useDetectiveObjetosStore((state) => state.currentRound);
  const currentZoomLevel = useDetectiveObjetosStore((state) => state.currentZoomLevel);
  const maxZoomLevels = useDetectiveObjetosStore((state) => state.maxZoomLevels);
  const getCurrentDetective = useDetectiveObjetosStore((state) => state.getCurrentDetective);
  const guessesCount = useDetectiveObjetosStore((state) => state.guessesCount);
  
  const photographer = getCurrentPhotographer();
  const currentDetective = getCurrentDetective();
  const effectivePlayerId = currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isPhotographer = photographer && effectivePlayerId === photographer.id;
  
  // Calcular progreso de zoom
  const zoomProgress = ((currentZoomLevel + 1) / maxZoomLevels) * 100;
  const remainingZoomLevels = maxZoomLevels - currentZoomLevel - 1;
  
  // Navegar automáticamente cuando cambia el estado
  useEffect(() => {
    if (gameStatus === 'round-end') {
      // Esperar un momento antes de navegar para mostrar el resultado
      const timer = setTimeout(() => {
        if (navigation) {
          navigation.navigate('detective-objetos-results');
        }
      }, 2000);
      return () => clearTimeout(timer);
    } else if (gameStatus === 'photo-capture') {
      if (navigation) {
        navigation.navigate('detective-objetos-setup');
      }
    }
  }, [gameStatus, navigation]);
  
  // Si no hay imagen, redirigir a setup
  const currentImageUri = useDetectiveObjetosStore((state) => state.currentImageUri);
  useEffect(() => {
    if (gameStatus === 'playing' && !currentImageUri) {
      if (navigation) {
        navigation.navigate('detective-objetos-setup');
      }
    }
  }, [gameStatus, currentImageUri, navigation]);
  
  if (gameStatus !== 'playing') {
    return null;
  }
  
  return (
    <View style={styles.container}>
      {/* Header con información de la ronda */}
      <View style={styles.header}>
        <Text style={styles.headerText}>
          🔍 Ronda {currentRound} • Turno {guessesCount + 1}
        </Text>
        {currentDetective && (
          <Text style={styles.detectiveText}>
            Detective: {currentDetective.name}
          </Text>
        )}
      </View>

      {/* Indicador de zoom */}
      <View style={styles.zoomIndicator}>
        <View style={styles.zoomIndicatorBar}>
          <View 
            style={[
              styles.zoomIndicatorProgress, 
              { width: `${zoomProgress}%` }
            ]} 
          />
        </View>
        <View style={styles.zoomIndicatorText}>
          <Text style={styles.zoomIndicatorLabel}>
            Nivel de zoom: {currentZoomLevel + 1} / {maxZoomLevels}
          </Text>
          <Text style={styles.zoomIndicatorHint}>
            {remainingZoomLevels > 0 
              ? `${remainingZoomLevels} nivel${remainingZoomLevels !== 1 ? 'es' : ''} restante${remainingZoomLevels !== 1 ? 's' : ''}`
              : '¡Imagen completa!'}
          </Text>
        </View>
      </View>

      <View style={styles.imageSection}>
        <DetectiveObjetosImageView />
      </View>
      
      {isPhotographer && (
        <View style={styles.controlsSection}>
          <DetectiveObjetosPhotographerControls />
        </View>
      )}
      
      <View style={styles.playerSection}>
        <DetectiveObjetosPlayerList />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196f3',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  detectiveText: {
    color: '#bbdefb',
    fontSize: 14,
    fontWeight: '600',
  },
  zoomIndicator: {
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  zoomIndicatorBar: {
    height: 8,
    backgroundColor: '#333',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  zoomIndicatorProgress: {
    height: '100%',
    backgroundColor: '#2196f3',
    borderRadius: 4,
  },
  zoomIndicatorText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  zoomIndicatorLabel: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  zoomIndicatorHint: {
    color: '#bbdefb',
    fontSize: 12,
    fontStyle: 'italic',
  },
  imageSection: {
    flex: 1,
  },
  controlsSection: {
    backgroundColor: '#fff',
  },
  playerSection: {
    maxHeight: 200,
    backgroundColor: '#fff',
  },
});

export default DetectiveObjetosGame;

