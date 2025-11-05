import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useDiccionarioDiabolicoStore } from '../store/diccionarioDiabolicoStore';
import { DiccionarioDiabolicoHUD } from '../components/DiccionarioDiabolicoHUD';
import { DiccionarioDiabolicoInputDefinicion } from '../components/DiccionarioDiabolicoInputDefinicion';
import { DiccionarioDiabolicoListaVotacion } from '../components/DiccionarioDiabolicoListaVotacion';
import { DiccionarioDiabolicoPanelResultados } from '../components/DiccionarioDiabolicoPanelResultados';

export const DiccionarioDiabolicoJuego = ({ navigation }) => {
  const gameStatus = useDiccionarioDiabolicoStore((state) => state.gameStatus);
  const currentPlayerId = useDiccionarioDiabolicoStore((state) => state.currentPlayerId);
  const startRound = useDiccionarioDiabolicoStore((state) => state.startRound);
  const nextRound = useDiccionarioDiabolicoStore((state) => state.nextRound);
  
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
    if (gameStatus === 'results') {
      // Mostrar resultados por unos segundos antes de permitir continuar
      // La navegación se maneja con botones en el componente de resultados
    } else if (gameStatus === 'finished') {
      // Navegar a la pantalla de fin
      if (navigation) {
        setTimeout(() => {
          navigation.navigate('diccionario-diabolico-fin');
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
      <View style={styles.content}>
        <DiccionarioDiabolicoInputDefinicion playerId={currentPlayerId} />
      </View>
    );
  } else if (gameStatus === 'voting') {
    mainContent = (
      <View style={styles.content}>
        <DiccionarioDiabolicoListaVotacion playerId={currentPlayerId} />
      </View>
    );
  } else if (gameStatus === 'results') {
    mainContent = (
      <View style={styles.content}>
        <DiccionarioDiabolicoPanelResultados navigation={navigation} />
      </View>
    );
  } else if (gameStatus === 'lobby') {
    // Esperando a iniciar la ronda
    return null;
  }
  
  return (
    <View style={styles.container}>
      {gameStatus !== 'results' && <DiccionarioDiabolicoHUD />}
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
    marginTop: 80, // Espacio para el HUD
  },
});
