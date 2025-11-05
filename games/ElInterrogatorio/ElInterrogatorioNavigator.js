import React, { useState, useEffect } from 'react';
import { ElInterrogatorioIndex } from './app/index';
import { ElInterrogatorioAsignacion } from './app/interrogatorio-asignacion';
import { ElInterrogatorioSecreto } from './app/interrogatorio-secreto';
import { ElInterrogatorioRonda } from './app/interrogatorio-ronda';
import { ElInterrogatorioRevelacion } from './app/interrogatorio-revelacion';
import { useInterrogatorioStore } from './store/interrogatorioStore';

export const ElInterrogatorioNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useInterrogatorioStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'revelacion') {
        setCurrentScreen('ronda');
      } else if (currentScreen === 'ronda') {
        setCurrentScreen('secreto');
      } else if (currentScreen === 'secreto') {
        setCurrentScreen('asignacion');
      } else if (currentScreen === 'asignacion') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'asignacion' && currentScreen !== 'asignacion') {
      setCurrentScreen('asignacion');
    } else if (gameStatus === 'secreto' && currentScreen !== 'secreto') {
      setCurrentScreen('secreto');
    } else if (gameStatus === 'ronda' && currentScreen !== 'ronda') {
      setCurrentScreen('ronda');
    } else if (gameStatus === 'revelacion' && currentScreen !== 'revelacion') {
      setCurrentScreen('revelacion');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <ElInterrogatorioIndex navigation={navigation} route={route} />;
    case 'asignacion':
      return <ElInterrogatorioAsignacion navigation={navigation} route={route} />;
    case 'secreto':
      return <ElInterrogatorioSecreto navigation={navigation} route={route} />;
    case 'ronda':
      return <ElInterrogatorioRonda navigation={navigation} route={route} />;
    case 'revelacion':
      return <ElInterrogatorioRevelacion navigation={navigation} route={route} />;
    default:
      return <ElInterrogatorioIndex navigation={navigation} route={route} />;
  }
};

