import React, { useState } from 'react';
import { CadenaEmojisIndex } from './app/index';
import { CadenaEmojisJuego } from './app/cadena-emojis-juego';
import { CadenaEmojisResumen } from './app/cadena-emojis-resumen';
import { useCadenaEmojisStore } from './store/cadenaEmojisStore';

export const CadenaDeEmojisNarrativaNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useCadenaEmojisStore((state) => state.gameStatus);
  
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
    if (gameStatus === 'playing' && currentScreen !== 'cadena-emojis-juego') {
      setCurrentScreen('cadena-emojis-juego');
    } else if (gameStatus === 'finished' && currentScreen !== 'cadena-emojis-resumen') {
      setCurrentScreen('cadena-emojis-resumen');
    }
  }, [gameStatus]);
  
  switch (currentScreen) {
    case 'index':
      return <CadenaEmojisIndex navigation={navigation} route={route} />;
    case 'cadena-emojis-juego':
      return <CadenaEmojisJuego navigation={navigation} route={route} />;
    case 'cadena-emojis-resumen':
      return <CadenaEmojisResumen navigation={navigation} route={route} />;
    default:
      return <CadenaEmojisIndex navigation={navigation} route={route} />;
  }
};

