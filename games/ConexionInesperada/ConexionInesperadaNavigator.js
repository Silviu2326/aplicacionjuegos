import React, { useState } from 'react';
import { ConexionInesperadaIndex } from './app/index';
import { ConexionInesperadaPartida } from './app/conexion-inesperada-partida';
import { ConexionInesperadaResultados } from './app/conexion-inesperada-resultados';
import { useConexionInesperadaStore } from './store/useConexionInesperadaStore';

export const ConexionInesperadaNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useConexionInesperadaStore((state) => state.gameStatus);
  
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
    if (gameStatus === 'writing' && currentScreen !== 'conexion-inesperada-partida') {
      setCurrentScreen('conexion-inesperada-partida');
    } else if (gameStatus === 'voting' && currentScreen !== 'conexion-inesperada-partida') {
      setCurrentScreen('conexion-inesperada-partida');
    } else if ((gameStatus === 'results' || gameStatus === 'finished') && currentScreen !== 'conexion-inesperada-resultados') {
      setCurrentScreen('conexion-inesperada-resultados');
    }
  }, [gameStatus]);
  
  switch (currentScreen) {
    case 'index':
      return <ConexionInesperadaIndex navigation={navigation} route={route} />;
    case 'conexion-inesperada-partida':
      return <ConexionInesperadaPartida navigation={navigation} route={route} />;
    case 'conexion-inesperada-resultados':
      return <ConexionInesperadaResultados navigation={navigation} route={route} />;
    default:
      return <ConexionInesperadaIndex navigation={navigation} route={route} />;
  }
};

