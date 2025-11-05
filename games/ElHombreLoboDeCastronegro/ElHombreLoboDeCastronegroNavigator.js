import React, { useState } from 'react';
import { HombreLoboCastronegroIndex } from './app/index';
import { HombreLoboCastronegroLobby } from './app/hombre-lobo-castronegro-lobby';
import { HombreLoboCastronegroPartida } from './app/hombre-lobo-castronegro-partida';
import { HombreLoboCastronegroFinPartida } from './app/hombre-lobo-castronegro-fin-partida';
import { useHombreLoboCastronegroStore } from './store/hombreLoboCastronegroStore';

export const ElHombreLoboDeCastronegroNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useHombreLoboCastronegroStore((state) => state.gameStatus);
  const players = useHombreLoboCastronegroStore((state) => state.players);
  
  // Determinar playerId (para desarrollo, usar el primer jugador)
  const playerId = players.length > 0 ? players[0].id : null;
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'hombre-lobo-castronegro-partida') {
        setCurrentScreen('hombre-lobo-castronegro-lobby');
      } else if (currentScreen === 'hombre-lobo-castronegro-lobby') {
        setCurrentScreen('index');
      } else if (currentScreen === 'hombre-lobo-castronegro-fin-partida') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: { ...screenParams, playerId },
  };
  
  // Navegación automática basada en el estado del juego
  React.useEffect(() => {
    if (gameStatus === 'setup' && currentScreen !== 'hombre-lobo-castronegro-lobby') {
      setCurrentScreen('hombre-lobo-castronegro-lobby');
    } else if ((gameStatus === 'first_night' || gameStatus === 'night' || 
                gameStatus === 'day' || gameStatus === 'debate' || 
                gameStatus === 'voting' || gameStatus === 'revelation') && 
                currentScreen !== 'hombre-lobo-castronegro-partida') {
      setCurrentScreen('hombre-lobo-castronegro-partida');
    } else if (gameStatus === 'finished' && currentScreen !== 'hombre-lobo-castronegro-fin-partida') {
      setCurrentScreen('hombre-lobo-castronegro-fin-partida');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <HombreLoboCastronegroIndex navigation={navigation} route={route} />;
    case 'hombre-lobo-castronegro-lobby':
      return <HombreLoboCastronegroLobby navigation={navigation} route={route} />;
    case 'hombre-lobo-castronegro-partida':
      return <HombreLoboCastronegroPartida navigation={navigation} route={route} />;
    case 'hombre-lobo-castronegro-fin-partida':
      return <HombreLoboCastronegroFinPartida navigation={navigation} route={route} />;
    default:
      return <HombreLoboCastronegroIndex navigation={navigation} route={route} />;
  }
};

