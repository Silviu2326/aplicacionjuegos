import React, { useState } from 'react';
import { BloodOnTheClocktowerIndex } from './app/index';
import { BloodOnTheClocktowerLobby } from './app/blood-on-the-clocktower-lobby';
import { BloodOnTheClocktowerGame } from './app/blood-on-the-clocktower-game';
import { BloodOnTheClocktowerStoryteller } from './app/blood-on-the-clocktower-storyteller';
import { useBloodOnTheClocktowerStore } from './store/bloodOnTheClocktowerStore';

export const BloodOnTheClocktowerNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const players = useBloodOnTheClocktowerStore((state) => state.players);
  const gameStatus = useBloodOnTheClocktowerStore((state) => state.gameStatus);
  
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
    if (gameStatus === 'setup' && currentScreen !== 'lobby') {
      setCurrentScreen('lobby');
    } else if (gameStatus === 'first-night' && currentScreen !== 'storyteller') {
      setCurrentScreen('storyteller');
    } else if ((gameStatus === 'day' || gameStatus === 'night' || gameStatus === 'nomination' || gameStatus === 'voting' || gameStatus === 'execution') && currentScreen !== 'game') {
      setCurrentScreen('game');
    }
  }, [gameStatus]);
  
  switch (currentScreen) {
    case 'index':
      return <BloodOnTheClocktowerIndex navigation={navigation} route={route} />;
    case 'lobby':
      return <BloodOnTheClocktowerLobby navigation={navigation} route={{ ...route, params: { ...route.params, playerId } }} />;
    case 'game':
      return <BloodOnTheClocktowerGame navigation={navigation} route={{ ...route, params: { ...route.params, playerId } }} />;
    case 'storyteller':
      return <BloodOnTheClocktowerStoryteller navigation={navigation} route={{ ...route, params: { ...route.params, playerId } }} />;
    default:
      return <BloodOnTheClocktowerIndex navigation={navigation} route={route} />;
  }
};

