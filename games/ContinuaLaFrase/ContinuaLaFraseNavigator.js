import React, { useState } from 'react';
import { ContinuaLaFraseIndex } from './app/index';
import { ContinuaLaFraseGameScreen } from './app/continuaLaFraseGameScreen';
import { ContinuaLaFraseFinalResults } from './app/continuaLaFraseFinalResults';
import { useContinuaLaFraseStore } from './store/continuaLaFraseStore';

export const ContinuaLaFraseNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useContinuaLaFraseStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'writing' && currentScreen !== 'continua-la-frase-game-screen') {
      setCurrentScreen('continua-la-frase-game-screen');
    } else if (gameStatus === 'voting' && currentScreen !== 'continua-la-frase-game-screen') {
      setCurrentScreen('continua-la-frase-game-screen');
    } else if ((gameStatus === 'results' || gameStatus === 'finished') && currentScreen !== 'continua-la-frase-final-results') {
      setCurrentScreen('continua-la-frase-final-results');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <ContinuaLaFraseIndex navigation={navigation} route={route} />;
    case 'continua-la-frase-game-screen':
      return <ContinuaLaFraseGameScreen navigation={navigation} route={route} />;
    case 'continua-la-frase-final-results':
      return <ContinuaLaFraseFinalResults navigation={navigation} route={route} />;
    default:
      return <ContinuaLaFraseIndex navigation={navigation} route={route} />;
  }
};

