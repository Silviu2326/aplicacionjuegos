import React, { useState, useEffect } from 'react';
import { MaestroDeLasCitasHome } from './app/maestro-citas-home';
import { MaestroDeLasCitasGame } from './app/maestro-citas-game';
import { MaestroDeLasCitasResults } from './app/maestro-citas-results';
import { useMaestroCitasStore } from './store/maestroCitasStore';

export const MaestroDeLasCitasNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useMaestroCitasStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'maestro-citas-game') {
        setCurrentScreen('home');
      } else if (currentScreen === 'maestro-citas-results') {
        setCurrentScreen('home');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'maestro-citas-game') {
      setCurrentScreen('maestro-citas-game');
    } else if (gameStatus === 'finished' && currentScreen !== 'maestro-citas-results') {
      setCurrentScreen('maestro-citas-results');
    } else if (gameStatus === 'lobby' && currentScreen !== 'home') {
      setCurrentScreen('home');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'home':
      return <MaestroDeLasCitasHome navigation={navigation} route={route} />;
    case 'maestro-citas-game':
      return <MaestroDeLasCitasGame navigation={navigation} route={route} />;
    case 'maestro-citas-results':
      return <MaestroDeLasCitasResults navigation={navigation} route={route} />;
    default:
      return <MaestroDeLasCitasHome navigation={navigation} route={route} />;
  }
};

