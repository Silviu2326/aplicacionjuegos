import React, { useState, useEffect } from 'react';
import { DiccionarioDiabolicoIndex } from './app/index';
import { DiccionarioDiabolicoJuego } from './app/diccionario-diabolico-juego';
import { DiccionarioDiabolicoFin } from './app/diccionario-diabolico-fin';
import { useDiccionarioDiabolicoStore } from './store/diccionarioDiabolicoStore';

export const ElDiccionarioDiabolicoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useDiccionarioDiabolicoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'diccionario-diabolico-juego') {
        setCurrentScreen('index');
      } else if (currentScreen === 'diccionario-diabolico-fin') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'writing' || gameStatus === 'voting' || gameStatus === 'lobby') {
      if (currentScreen !== 'diccionario-diabolico-juego') {
        setCurrentScreen('diccionario-diabolico-juego');
      }
    } else if (gameStatus === 'results') {
      if (currentScreen !== 'diccionario-diabolico-juego') {
        setCurrentScreen('diccionario-diabolico-juego');
      }
    } else if (gameStatus === 'finished') {
      if (currentScreen !== 'diccionario-diabolico-fin') {
        setCurrentScreen('diccionario-diabolico-fin');
      }
    } else if (gameStatus === 'setup') {
      if (currentScreen !== 'index') {
        setCurrentScreen('index');
      }
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <DiccionarioDiabolicoIndex navigation={navigation} route={route} />;
    case 'diccionario-diabolico-juego':
      return <DiccionarioDiabolicoJuego navigation={navigation} route={route} />;
    case 'diccionario-diabolico-fin':
      return <DiccionarioDiabolicoFin navigation={navigation} route={route} />;
    default:
      return <DiccionarioDiabolicoIndex navigation={navigation} route={route} />;
  }
};
