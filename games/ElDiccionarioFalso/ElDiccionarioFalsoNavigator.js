import React, { useState, useEffect } from 'react';
import { DiccionarioFalsoIndex } from './app/index';
import { DiccionarioFalsoJuego } from './app/el-diccionario-falso-juego';
import { DiccionarioFalsoResultados } from './app/el-diccionario-falso-resultados';
import { useDiccionarioFalsoStore } from './store/diccionarioFalsoStore';

export const ElDiccionarioFalsoNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useDiccionarioFalsoStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'el-diccionario-falso-juego') {
        setCurrentScreen('index');
      } else if (currentScreen === 'el-diccionario-falso-resultados') {
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
      if (currentScreen !== 'el-diccionario-falso-juego') {
        setCurrentScreen('el-diccionario-falso-juego');
      }
    } else if (gameStatus === 'results') {
      if (currentScreen !== 'el-diccionario-falso-juego') {
        setCurrentScreen('el-diccionario-falso-juego');
      }
    } else if (gameStatus === 'finished') {
      if (currentScreen !== 'el-diccionario-falso-resultados') {
        setCurrentScreen('el-diccionario-falso-resultados');
      }
    } else if (gameStatus === 'setup') {
      if (currentScreen !== 'index') {
        setCurrentScreen('index');
      }
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <DiccionarioFalsoIndex navigation={navigation} route={route} />;
    case 'el-diccionario-falso-juego':
      return <DiccionarioFalsoJuego navigation={navigation} route={route} />;
    case 'el-diccionario-falso-resultados':
      return <DiccionarioFalsoResultados navigation={navigation} route={route} />;
    default:
      return <DiccionarioFalsoIndex navigation={navigation} route={route} />;
  }
};
