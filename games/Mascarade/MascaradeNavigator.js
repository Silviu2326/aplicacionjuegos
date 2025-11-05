import React, { useState } from 'react';
import { MascaradeIndex } from './app/index';
import { MascaradeGameScreen } from './app/mascarade-game';
import { MascaradeRulesScreen } from './app/mascarade-rules';
import { useMascaradeStore } from './store/mascaradeStore';

export const MascaradeNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useMascaradeStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'mascarade-rules') {
        setCurrentScreen('index');
      } else if (currentScreen === 'mascarade-game') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'mascarade-game') {
      setCurrentScreen('mascarade-game');
    } else if (gameStatus === 'lobby' && currentScreen === 'mascarade-game') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <MascaradeIndex navigation={navigation} route={route} />;
    case 'mascarade-game':
      return <MascaradeGameScreen navigation={navigation} route={route} />;
    case 'mascarade-rules':
      return <MascaradeRulesScreen navigation={navigation} route={route} />;
    default:
      return <MascaradeIndex navigation={navigation} route={route} />;
  }
};

