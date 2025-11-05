import React, { useState } from 'react';
import { DosVerdadesIndex } from './app/index';
import { DosVerdadesJuego } from './app/juego';
import { DosVerdadesResultados } from './app/resultados';
import { useDosVerdadesStore } from './store/dosVerdadesStore';

export const DosVerdadesYUnaMentiraNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useDosVerdadesStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'juego') {
        setCurrentScreen('index');
      } else if (currentScreen === 'resultados') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if ((gameStatus === 'playing' || gameStatus === 'debate' || gameStatus === 'voting' || gameStatus === 'revelation') 
        && currentScreen !== 'juego') {
      setCurrentScreen('juego');
    } else if (gameStatus === 'finished' && currentScreen !== 'resultados') {
      setCurrentScreen('resultados');
    } else if (gameStatus === 'setup' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <DosVerdadesIndex navigation={navigation} route={route} />;
    case 'juego':
      return <DosVerdadesJuego navigation={navigation} route={route} />;
    case 'resultados':
      return <DosVerdadesResultados navigation={navigation} route={route} />;
    default:
      return <DosVerdadesIndex navigation={navigation} route={route} />;
  }
};

