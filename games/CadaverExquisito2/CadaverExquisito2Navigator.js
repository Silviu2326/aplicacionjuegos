import React, { useState } from 'react';
import { CadaverExquisitoIndex } from './app/index';
import { CadaverExquisitoJuego } from './app/cadaver-exquisito-juego';
import { CadaverExquisitoResultados } from './app/cadaver-exquisito-resultados';
import { useCadaverExquisitoStore } from './store/cadaverExquisitoStore';

export const CadaverExquisito2Navigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useCadaverExquisitoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'playing' && currentScreen !== 'cadaver-exquisito-juego') {
      setCurrentScreen('cadaver-exquisito-juego');
    } else if (gameStatus === 'finished' && currentScreen !== 'cadaver-exquisito-resultados') {
      setCurrentScreen('cadaver-exquisito-resultados');
    }
  }, [gameStatus]);
  
  switch (currentScreen) {
    case 'index':
      return <CadaverExquisitoIndex navigation={navigation} route={route} />;
    case 'cadaver-exquisito-juego':
      return <CadaverExquisitoJuego navigation={navigation} route={route} />;
    case 'cadaver-exquisito-resultados':
      return <CadaverExquisitoResultados navigation={navigation} route={route} />;
    default:
      return <CadaverExquisitoIndex navigation={navigation} route={route} />;
  }
};
