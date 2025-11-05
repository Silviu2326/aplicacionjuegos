import React, { useState, useEffect } from 'react';
import { ElSuperlativoIndex } from './app/index';
import { ElSuperlativoGame } from './app/el-superlativo-game';
import { useElSuperlativoStore } from './store/elSuperlativoStore';

export const ElSuperlativoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useElSuperlativoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'el-superlativo-game') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'el-superlativo-game') {
      setCurrentScreen('el-superlativo-game');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <ElSuperlativoIndex navigation={navigation} route={route} />;
    case 'el-superlativo-game':
      return <ElSuperlativoGame navigation={navigation} route={route} />;
    default:
      return <ElSuperlativoIndex navigation={navigation} route={route} />;
  }
};

