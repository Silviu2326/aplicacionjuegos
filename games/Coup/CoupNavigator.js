import React, { useState } from 'react';
import { CoupIndex } from './app/index';
import { CoupGameScreen } from './app/coup-game-screen';
import { CoupRulesScreen } from './app/coup-rules-screen';
import { useCoupGameStore } from './store/coupGameStore';

export const CoupNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useCoupGameStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'coup-rules-screen') {
        setCurrentScreen('index');
      } else if (currentScreen === 'coup-game-screen') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'coup-game-screen') {
      setCurrentScreen('coup-game-screen');
    } else if (gameStatus === 'setup' && currentScreen === 'coup-game-screen') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <CoupIndex navigation={navigation} route={route} />;
    case 'coup-game-screen':
      return <CoupGameScreen navigation={navigation} route={route} />;
    case 'coup-rules-screen':
      return <CoupRulesScreen navigation={navigation} route={route} />;
    default:
      return <CoupIndex navigation={navigation} route={route} />;
  }
};
