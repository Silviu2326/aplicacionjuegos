import React, { useState } from 'react';
import { ElEntrevistadorInesperadoIndex } from './app/index';
import { ElEntrevistadorInesperadoSetup } from './app/el-entrevistador-inesperado-setup';
import { ElEntrevistadorInesperadoReveal } from './app/el-entrevistador-inesperado-reveal';
import { ElEntrevistadorInesperadoGame } from './app/el-entrevistador-inesperado-game';
import { ElEntrevistadorInesperadoResults } from './app/el-entrevistador-inesperado-results';
import { useEntrevistadorInesperadoStore } from './store/entrevistadorInesperadoStore';

export const ElEntrevistadorInesperadoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useEntrevistadorInesperadoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'game') {
        setCurrentScreen('reveal');
      } else if (currentScreen === 'reveal') {
        setCurrentScreen('setup');
      } else if (currentScreen === 'setup') {
        setCurrentScreen('index');
      } else if (currentScreen === 'results') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'setup' && currentScreen !== 'setup') {
      setCurrentScreen('setup');
    } else if (gameStatus === 'reveal' && currentScreen !== 'reveal') {
      setCurrentScreen('reveal');
    } else if (gameStatus === 'playing' && currentScreen !== 'game') {
      setCurrentScreen('game');
    } else if (gameStatus === 'finished' && currentScreen !== 'results') {
      setCurrentScreen('results');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <ElEntrevistadorInesperadoIndex navigation={navigation} route={route} />;
    case 'setup':
      return <ElEntrevistadorInesperadoSetup navigation={navigation} route={route} />;
    case 'reveal':
      return <ElEntrevistadorInesperadoReveal navigation={navigation} route={route} />;
    case 'game':
      return <ElEntrevistadorInesperadoGame navigation={navigation} route={route} />;
    case 'results':
      return <ElEntrevistadorInesperadoResults navigation={navigation} route={route} />;
    default:
      return <ElEntrevistadorInesperadoIndex navigation={navigation} route={route} />;
  }
};

