import React, { useState, useEffect } from 'react';
import { GeoguessrDeSalonIndex } from './app/index';
import { GeoguessrDeSalonGameScreen } from './app/geoguessr-de-salon-game';
import { GeoguessrDeSalonResultsScreen } from './app/geoguessr-de-salon-results';
import { useGeoguessrDeSalonStore, GAME_STATUS } from './store/geoguessrDeSalonStore';

export const GeoguessrDeSalonNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useGeoguessrDeSalonStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'geoguessr-de-salon-game') {
        setCurrentScreen('index');
      } else if (currentScreen === 'geoguessr-de-salon-results') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === GAME_STATUS.SETUP && currentScreen !== 'index') {
      setCurrentScreen('index');
    } else if (gameStatus === GAME_STATUS.PLAYING && currentScreen !== 'geoguessr-de-salon-game') {
      setCurrentScreen('geoguessr-de-salon-game');
    } else if (gameStatus === GAME_STATUS.FINISHED && currentScreen !== 'geoguessr-de-salon-results') {
      setCurrentScreen('geoguessr-de-salon-results');
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <GeoguessrDeSalonIndex navigation={navigation} route={route} />;
    case 'geoguessr-de-salon-game':
      return <GeoguessrDeSalonGameScreen navigation={navigation} route={route} />;
    case 'geoguessr-de-salon-results':
      return <GeoguessrDeSalonResultsScreen navigation={navigation} route={route} />;
    default:
      return <GeoguessrDeSalonIndex navigation={navigation} route={route} />;
  }
};

