import React, { useState } from 'react';
import { DosVerdadesUnaMentiraIndex } from './app/index';
import { DosVerdadesUnaMentiraJuego } from './app/dos-verdades-una-mentira-juego';
import { DosVerdadesUnaMentiraResultados } from './app/dos-verdades-una-mentira-resultados';
import { useDosVerdadesUnaMentiraStore } from './store/dosVerdadesUnaMentiraStore';

export const DosVerdadesUnaMentiraNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useDosVerdadesUnaMentiraStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'dos-verdades-una-mentira-juego') {
        setCurrentScreen('index');
      } else if (currentScreen === 'dos-verdades-una-mentira-resultados') {
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
        && currentScreen !== 'dos-verdades-una-mentira-juego') {
      setCurrentScreen('dos-verdades-una-mentira-juego');
    } else if (gameStatus === 'finished' && currentScreen !== 'dos-verdades-una-mentira-resultados') {
      setCurrentScreen('dos-verdades-una-mentira-resultados');
    } else if (gameStatus === 'setup' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <DosVerdadesUnaMentiraIndex navigation={navigation} route={route} />;
    case 'dos-verdades-una-mentira-juego':
      return <DosVerdadesUnaMentiraJuego navigation={navigation} route={route} />;
    case 'dos-verdades-una-mentira-resultados':
      return <DosVerdadesUnaMentiraResultados navigation={navigation} route={route} />;
    default:
      return <DosVerdadesUnaMentiraIndex navigation={navigation} route={route} />;
  }
};
