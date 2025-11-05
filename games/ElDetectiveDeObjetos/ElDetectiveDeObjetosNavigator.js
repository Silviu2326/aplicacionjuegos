import React, { useState } from 'react';
import { DetectiveObjetosIndex } from './app/index';
import { DetectiveObjetosSetup } from './app/detective-objetos-setup';
import { DetectiveObjetosGame } from './app/detective-objetos-game';
import { DetectiveObjetosResults } from './app/detective-objetos-results';
import { useDetectiveObjetosStore } from './store/detectiveObjetosStore';

export const ElDetectiveDeObjetosNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useDetectiveObjetosStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'detective-objetos-setup') {
        setCurrentScreen('index');
      } else if (currentScreen === 'detective-objetos-game') {
        setCurrentScreen('detective-objetos-setup');
      } else if (currentScreen === 'detective-objetos-results') {
        const status = useDetectiveObjetosStore.getState().gameStatus;
        if (status === 'finished') {
          setCurrentScreen('index');
        } else {
          setCurrentScreen('detective-objetos-setup');
        }
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if ((gameStatus === 'playing') && currentScreen !== 'detective-objetos-game') {
      setCurrentScreen('detective-objetos-game');
    } else if (gameStatus === 'round-end' && currentScreen !== 'detective-objetos-results') {
      setCurrentScreen('detective-objetos-results');
    } else if (gameStatus === 'photo-capture' && currentScreen !== 'detective-objetos-setup') {
      setCurrentScreen('detective-objetos-setup');
    } else if (gameStatus === 'finished' && currentScreen !== 'detective-objetos-results') {
      setCurrentScreen('detective-objetos-results');
    } else if (gameStatus === 'setup' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <DetectiveObjetosIndex navigation={navigation} route={route} />;
    case 'detective-objetos-setup':
      return <DetectiveObjetosSetup navigation={navigation} route={route} />;
    case 'detective-objetos-game':
      return <DetectiveObjetosGame navigation={navigation} route={route} />;
    case 'detective-objetos-results':
      return <DetectiveObjetosResults navigation={navigation} route={route} />;
    default:
      return <DetectiveObjetosIndex navigation={navigation} route={route} />;
  }
};

