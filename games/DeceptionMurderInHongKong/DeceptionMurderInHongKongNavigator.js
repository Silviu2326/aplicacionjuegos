import React, { useState, useEffect } from 'react';
import { DeceptionMurderInHongKongIndex } from './app/index';
import { DeceptionRoleReveal } from './app/deception-role-reveal';
import { DeceptionGameBoard } from './app/deception-game-board';
import { useDeceptionGameStore } from './store/deceptionGameStore';

export const DeceptionMurderInHongKongNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useDeceptionGameStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'deception-game-board') {
        setCurrentScreen('deception-role-reveal');
      } else if (currentScreen === 'deception-role-reveal') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'role_reveal' && currentScreen !== 'deception-role-reveal') {
      setCurrentScreen('deception-role-reveal');
    } else if (gameStatus === 'playing' && currentScreen !== 'deception-game-board') {
      setCurrentScreen('deception-game-board');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <DeceptionMurderInHongKongIndex navigation={navigation} route={route} />;
    case 'deception-role-reveal':
      return <DeceptionRoleReveal navigation={navigation} route={route} />;
    case 'deception-game-board':
      return <DeceptionGameBoard navigation={navigation} route={route} />;
    default:
      return <DeceptionMurderInHongKongIndex navigation={navigation} route={route} />;
  }
};
