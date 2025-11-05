import React, { useState, useEffect } from 'react';
import { LaVozMisteriosaAudioQuizIndex } from './app/index';
import { LaVozMisteriosaAudioQuizSetup } from './app/setup-voz-misteriosa';
import { LaVozMisteriosaAudioQuizJuego } from './app/juego-voz-misteriosa';
import { LaVozMisteriosaAudioQuizResultado } from './app/resultado-voz-misteriosa';
import { useVozMisteriosaStore } from './store/vozMisteriosaStore';

export const LaVozMisteriosaAudioQuizNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useVozMisteriosaStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'resultado-voz-misteriosa') {
        setCurrentScreen('juego-voz-misteriosa');
      } else if (currentScreen === 'juego-voz-misteriosa') {
        setCurrentScreen('setup-voz-misteriosa');
      } else if (currentScreen === 'setup-voz-misteriosa') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'setup' && currentScreen !== 'setup-voz-misteriosa') {
      setCurrentScreen('setup-voz-misteriosa');
    } else if (gameStatus === 'playing' && currentScreen !== 'juego-voz-misteriosa') {
      setCurrentScreen('juego-voz-misteriosa');
    } else if (gameStatus === 'results' && currentScreen !== 'resultado-voz-misteriosa') {
      setCurrentScreen('resultado-voz-misteriosa');
    } else if (gameStatus === 'finished' && currentScreen !== 'resultado-voz-misteriosa') {
      setCurrentScreen('resultado-voz-misteriosa');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <LaVozMisteriosaAudioQuizIndex navigation={navigation} route={route} />;
    case 'setup-voz-misteriosa':
      return <LaVozMisteriosaAudioQuizSetup navigation={navigation} route={route} />;
    case 'juego-voz-misteriosa':
      return <LaVozMisteriosaAudioQuizJuego navigation={navigation} route={route} />;
    case 'resultado-voz-misteriosa':
      return <LaVozMisteriosaAudioQuizResultado navigation={navigation} route={route} />;
    default:
      return <LaVozMisteriosaAudioQuizIndex navigation={navigation} route={route} />;
  }
};

