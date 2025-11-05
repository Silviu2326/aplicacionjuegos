import React, { useState } from 'react';
import { MaestroDelAcronimoIndex } from './app/index';
import { MaestroDelAcronimoGame } from './app/maestro-del-acronimo-game';
import { MaestroDelAcronimoResults } from './app/maestro-del-acronimo-results';
import { useMaestroDelAcronimoStore } from './store/maestroDelAcronimoStore';

export const MaestroDelAcronimoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useMaestroDelAcronimoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'maestro-del-acronimo-game') {
        setCurrentScreen('index');
      } else if (currentScreen === 'maestro-del-acronimo-results') {
        setCurrentScreen('maestro-del-acronimo-game');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if ((gameStatus === 'writing' || gameStatus === 'voting') && currentScreen !== 'maestro-del-acronimo-game') {
      setCurrentScreen('maestro-del-acronimo-game');
    } else if ((gameStatus === 'results' || gameStatus === 'finished') && currentScreen !== 'maestro-del-acronimo-results') {
      setCurrentScreen('maestro-del-acronimo-results');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <MaestroDelAcronimoIndex navigation={navigation} route={route} />;
    case 'maestro-del-acronimo-game':
      return <MaestroDelAcronimoGame navigation={navigation} route={route} />;
    case 'maestro-del-acronimo-results':
      return <MaestroDelAcronimoResults navigation={navigation} route={route} />;
    default:
      return <MaestroDelAcronimoIndex navigation={navigation} route={route} />;
  }
};

