import React, { useState, useEffect } from 'react';
import { ElSonidistaCiegoIndex } from './app/index';
import { ElSonidistaCiegoPlay } from './app/sonidista-ciego-play';
import { ElSonidistaCiegoResults } from './app/sonidista-ciego-results';
import { useSonidistaCiegoStore } from './store/sonidistaCiegoStore';

export const ElSonidistaCiegoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useSonidistaCiegoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'results') {
        setCurrentScreen('play');
      } else if (currentScreen === 'play') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'play') {
      setCurrentScreen('play');
    } else if (gameStatus === 'results' && currentScreen !== 'results') {
      setCurrentScreen('results');
    } else if (gameStatus === 'finished' && currentScreen !== 'results') {
      setCurrentScreen('results');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <ElSonidistaCiegoIndex navigation={navigation} route={route} />;
    case 'play':
      return <ElSonidistaCiegoPlay navigation={navigation} route={route} />;
    case 'results':
      return <ElSonidistaCiegoResults navigation={navigation} route={route} />;
    default:
      return <ElSonidistaCiegoIndex navigation={navigation} route={route} />;
  }
};

