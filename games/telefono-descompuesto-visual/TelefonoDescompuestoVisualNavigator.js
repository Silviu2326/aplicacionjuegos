import React, { useState } from 'react';
import { TelefonoDescompuestoVisualIndex } from './app/index';
import { TelefonoDescompuestoVisualLobby } from './app/lobby';
import { TelefonoDescompuestoVisualGame } from './app/game';
import { TelefonoDescompuestoVisualResults } from './app/results';

export const TelefonoDescompuestoVisualNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});

  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
  };

  const route = {
    params: screenParams,
  };

  switch (currentScreen) {
    case 'index':
      return <TelefonoDescompuestoVisualIndex navigation={navigation} />;
    case 'lobby':
      return <TelefonoDescompuestoVisualLobby navigation={navigation} route={route} />;
    case 'game':
      return <TelefonoDescompuestoVisualGame navigation={navigation} route={route} />;
    case 'results':
      return <TelefonoDescompuestoVisualResults navigation={navigation} route={route} />;
    default:
      return <TelefonoDescompuestoVisualIndex navigation={navigation} />;
  }
};

