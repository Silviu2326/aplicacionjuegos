import React, { useState, useEffect } from 'react';
import { Salem1692Index } from './app/index';
import { Salem1692GameScreen } from './app/salem1692-game-screen';
import { useSalem1692GameStore } from './store/salem1692GameStore';

export const Salem1692Navigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useSalem1692GameStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'salem1692-game-screen') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if ((gameStatus === 'night' || gameStatus === 'day' || gameStatus === 'trial') && currentScreen !== 'salem1692-game-screen') {
      setCurrentScreen('salem1692-game-screen');
    } else if (gameStatus === 'lobby' && currentScreen === 'salem1692-game-screen') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <Salem1692Index navigation={navigation} route={route} />;
    case 'salem1692-game-screen':
      return <Salem1692GameScreen navigation={navigation} route={route} />;
    default:
      return <Salem1692Index navigation={navigation} route={route} />;
  }
};

