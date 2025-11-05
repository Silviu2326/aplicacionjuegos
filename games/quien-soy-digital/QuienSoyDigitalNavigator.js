import React, { useState } from 'react';
import { QuienSoyDigitalIndex } from './app/index';
import { QuienSoyDigitalSetupScreen } from './app/quienSoyDigitalSetupScreen';
import { QuienSoyDigitalGameScreen } from './app/quienSoyDigitalGameScreen';
import { QuienSoyDigitalResultsScreen } from './app/quienSoyDigitalResultsScreen';

export const QuienSoyDigitalNavigator = () => {
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
      return <QuienSoyDigitalIndex navigation={navigation} route={route} />;
    case 'setup':
      return <QuienSoyDigitalSetupScreen navigation={navigation} route={route} />;
    case 'game':
      return <QuienSoyDigitalGameScreen navigation={navigation} route={route} />;
    case 'results':
      return <QuienSoyDigitalResultsScreen navigation={navigation} route={route} />;
    default:
      return <QuienSoyDigitalIndex navigation={navigation} route={route} />;
  }
};

