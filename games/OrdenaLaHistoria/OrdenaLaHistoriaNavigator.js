import React, { useState, useEffect } from 'react';
import { OrdenaLaHistoriaIndex } from './app/index';
import { useOrdenaLaHistoriaStore } from './store/ordenaLaHistoriaStore';

// Importar las pantallas directamente (no como rutas dinámicas para el Navigator)
import OrdenaLaHistoriaLobbyScreen from './app/ordena-la-historia-lobby/[gameCode]';
import OrdenaLaHistoriaGameScreen from './app/ordena-la-historia-game/[gameCode]';
import OrdenaLaHistoriaResultsScreen from './app/ordena-la-historia-results/[gameCode]';

export const OrdenaLaHistoriaNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});

  const gameStatus = useOrdenaLaHistoriaStore((state) => state.gameStatus);
  const gameCode = useOrdenaLaHistoriaStore((state) => state.gameCode);

  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'results') {
        setCurrentScreen('game');
      } else if (currentScreen === 'game') {
        setCurrentScreen('lobby');
      } else if (currentScreen === 'lobby') {
        setCurrentScreen('index');
      }
    },
  };

  const route = {
    params: { ...screenParams, gameCode: gameCode || screenParams.gameCode },
  };

  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'lobby' && currentScreen !== 'lobby' && gameCode) {
      setCurrentScreen('lobby');
    } else if (gameStatus === 'playing' && currentScreen !== 'game') {
      setCurrentScreen('game');
    } else if (gameStatus === 'results' && currentScreen !== 'results') {
      setCurrentScreen('results');
    } else if (gameStatus === 'finished' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen, gameCode]);

  switch (currentScreen) {
    case 'index':
      return <OrdenaLaHistoriaIndex navigation={navigation} route={route} />;
    case 'lobby':
      return <OrdenaLaHistoriaLobbyScreen route={route} />;
    case 'game':
      return <OrdenaLaHistoriaGameScreen route={route} />;
    case 'results':
      return <OrdenaLaHistoriaResultsScreen route={route} />;
    default:
      return <OrdenaLaHistoriaIndex navigation={navigation} route={route} />;
  }
};
