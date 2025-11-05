import React, { useState } from 'react';
import { QuePrefieresExtremoIndex } from './app/index';
import { QuePrefieresExtremoGame } from './app/que-prefieres-extremo-game';

export const QuePrefieresExtremoNavigator = () => {
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
      return <QuePrefieresExtremoIndex navigation={navigation} />;
    case 'game':
      return <QuePrefieresExtremoGame navigation={navigation} route={route} />;
    default:
      return <QuePrefieresExtremoIndex navigation={navigation} />;
  }
};

