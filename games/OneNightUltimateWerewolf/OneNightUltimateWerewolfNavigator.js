import React, { useState, useEffect } from 'react';
import { OneNightWerewolfIndex } from './app/index';
import { OneNightWerewolfLobby } from './app/oneNightWerewolfLobby';
import { OneNightWerewolfSetup } from './app/oneNightWerewolfSetup';
import { OneNightWerewolfGame } from './app/oneNightWerewolfGame';
import { OneNightWerewolfResults } from './app/oneNightWerewolfResults';
import { useOneNightWerewolfStore } from './store/oneNightWerewolfStore';

export const OneNightUltimateWerewolfNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useOneNightWerewolfStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'oneNightWerewolfResults') {
        setCurrentScreen('index');
      } else if (currentScreen === 'oneNightWerewolfGame') {
        setCurrentScreen('oneNightWerewolfSetup');
      } else if (currentScreen === 'oneNightWerewolfSetup') {
        setCurrentScreen('oneNightWerewolfLobby');
      } else if (currentScreen === 'oneNightWerewolfLobby') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'night' && currentScreen !== 'oneNightWerewolfGame') {
      setCurrentScreen('oneNightWerewolfGame');
    } else if (gameStatus === 'discussion' && currentScreen !== 'oneNightWerewolfGame') {
      setCurrentScreen('oneNightWerewolfGame');
    } else if (gameStatus === 'voting' && currentScreen !== 'oneNightWerewolfGame') {
      setCurrentScreen('oneNightWerewolfGame');
    } else if (gameStatus === 'results' && currentScreen !== 'oneNightWerewolfResults') {
      setCurrentScreen('oneNightWerewolfResults');
    } else if (gameStatus === 'lobby' && currentScreen === 'oneNightWerewolfGame') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <OneNightWerewolfIndex navigation={navigation} route={route} />;
    case 'oneNightWerewolfLobby':
      return <OneNightWerewolfLobby navigation={navigation} route={route} />;
    case 'oneNightWerewolfSetup':
      return <OneNightWerewolfSetup navigation={navigation} route={route} />;
    case 'oneNightWerewolfGame':
      return <OneNightWerewolfGame navigation={navigation} route={route} />;
    case 'oneNightWerewolfResults':
      return <OneNightWerewolfResults navigation={navigation} route={route} />;
    default:
      return <OneNightWerewolfIndex navigation={navigation} route={route} />;
  }
};

