import React, { useState, useEffect } from 'react';
import { SecretHitlerIndex } from './app/index';
import { SecretHitlerGame } from './app/secret-hitler-game';
import { useSecretHitlerStore } from './store/secretHitlerStore';

export const SecretHitlerNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useSecretHitlerStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'secret-hitler-game') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if ((gameStatus === 'playing' || gameStatus === 'role_reveal') && currentScreen !== 'secret-hitler-game') {
      setCurrentScreen('secret-hitler-game');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <SecretHitlerIndex navigation={navigation} route={route} />;
    case 'secret-hitler-game':
      return <SecretHitlerGame navigation={navigation} route={route} />;
    default:
      return <SecretHitlerIndex navigation={navigation} route={route} />;
  }
};
