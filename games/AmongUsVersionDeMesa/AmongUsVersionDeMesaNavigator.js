import React, { useState } from 'react';
import { AmongUsMesaIndex } from './app/index';
import { AmongUsMesaRoleReveal } from './app/among-us-mesa-role-reveal';
import { AmongUsMesaGameScreen } from './app/among-us-mesa-game';
import { AmongUsMesaMeetingScreen } from './app/among-us-mesa-meeting';
import { useAmongUsMesaStore } from './store/amongUsMesaStore';

export const AmongUsVersionDeMesaNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const players = useAmongUsMesaStore((state) => state.players);
  const gameStatus = useAmongUsMesaStore((state) => state.gameStatus);
  
  // Determinar playerId (para desarrollo, usar el primer jugador)
  const playerId = players.length > 0 ? players[0].id : null;
  
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
    if (gameStatus === 'role-reveal' && currentScreen !== 'role-reveal') {
      setCurrentScreen('role-reveal');
    } else if (gameStatus === 'playing' && currentScreen !== 'game') {
      setCurrentScreen('game');
    } else if ((gameStatus === 'meeting' || gameStatus === 'voting') && currentScreen !== 'meeting') {
      setCurrentScreen('meeting');
    }
  }, [gameStatus]);
  
  switch (currentScreen) {
    case 'index':
      return <AmongUsMesaIndex navigation={navigation} route={route} />;
    case 'role-reveal':
      return <AmongUsMesaRoleReveal navigation={navigation} route={route} playerId={playerId} />;
    case 'game':
      return <AmongUsMesaGameScreen navigation={navigation} route={route} playerId={playerId} />;
    case 'meeting':
      return <AmongUsMesaMeetingScreen navigation={navigation} route={route} playerId={playerId} />;
    default:
      return <AmongUsMesaIndex navigation={navigation} route={route} />;
  }
};

