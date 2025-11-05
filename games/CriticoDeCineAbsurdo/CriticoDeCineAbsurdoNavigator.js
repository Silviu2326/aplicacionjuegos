import React, { useState } from 'react';
import { CriticoCineAbsurdoIndex } from './app/index';
import { CriticoCineAbsurdoJuego } from './app/critico-cine-absurdo-juego';
import { CriticoCineAbsurdoResultados } from './app/critico-cine-absurdo-resultados';
import { useCriticoCineAbsurdoStore } from './store/criticoCineAbsurdoStore';

export const CriticoDeCineAbsurdoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useCriticoCineAbsurdoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'critico-cine-absurdo-juego') {
        setCurrentScreen('index');
      } else if (currentScreen === 'critico-cine-absurdo-resultados') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'critico-cine-absurdo-juego') {
      setCurrentScreen('critico-cine-absurdo-juego');
    } else if (gameStatus === 'finished' && currentScreen !== 'critico-cine-absurdo-resultados') {
      setCurrentScreen('critico-cine-absurdo-resultados');
    } else if (gameStatus === 'setup' && currentScreen === 'critico-cine-absurdo-juego') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <CriticoCineAbsurdoIndex navigation={navigation} route={route} />;
    case 'critico-cine-absurdo-juego':
      return <CriticoCineAbsurdoJuego navigation={navigation} route={route} />;
    case 'critico-cine-absurdo-resultados':
      return <CriticoCineAbsurdoResultados navigation={navigation} route={route} />;
    default:
      return <CriticoCineAbsurdoIndex navigation={navigation} route={route} />;
  }
};

