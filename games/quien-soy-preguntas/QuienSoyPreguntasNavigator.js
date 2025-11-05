import React, { useState } from 'react';
import { QuienSoyPreguntasIndex } from './app/index';
import { QuienSoyPreguntasSetup } from './app/quien-soy-preguntas-setup';
import { QuienSoyPreguntasGame } from './app/quien-soy-preguntas-game';
import { QuienSoyPreguntasResults } from './app/quien-soy-preguntas-results';

export const QuienSoyPreguntasNavigator = () => {
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
      return <QuienSoyPreguntasIndex navigation={navigation} route={route} />;
    case 'setup':
      return <QuienSoyPreguntasSetup navigation={navigation} route={route} />;
    case 'game':
      return <QuienSoyPreguntasGame navigation={navigation} route={route} />;
    case 'results':
      return <QuienSoyPreguntasResults navigation={navigation} route={route} />;
    default:
      return <QuienSoyPreguntasIndex navigation={navigation} route={route} />;
  }
};
