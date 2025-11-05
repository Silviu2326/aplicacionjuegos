import React, { useState, useEffect } from 'react';
import { FeedTheKrakenIndex } from './app/index';
import { FeedTheKrakenRoleReveal } from './app/feed-the-kraken-role-reveal';
import { FeedTheKrakenGameScreen } from './app/feed-the-kraken-game-screen';
import { useFeedTheKrakenStore } from './store/feedTheKrakenStore';

export const FeedTheKrakenNavigator = () => {
  const [currentScreen, setCurrentScreen] = useState('index');
  const [screenParams, setScreenParams] = useState({});
  
  const gameStatus = useFeedTheKrakenStore((state) => state.gameStatus);
  
  const navigation = {
    navigate: (screen, params) => {
      setScreenParams(params || {});
      setCurrentScreen(screen);
    },
    goBack: () => {
      if (currentScreen === 'feed-the-kraken-game-screen') {
        setCurrentScreen('feed-the-kraken-role-reveal');
      } else if (currentScreen === 'feed-the-kraken-role-reveal') {
        setCurrentScreen('index');
      }
    },
  };
  
  const route = {
    params: screenParams,
  };
  
  // Navegación automática basada en el estado del juego
  useEffect(() => {
    if (gameStatus === 'role_reveal' && currentScreen !== 'feed-the-kraken-role-reveal') {
      setCurrentScreen('feed-the-kraken-role-reveal');
    } else if (gameStatus === 'playing' && currentScreen !== 'feed-the-kraken-game-screen') {
      setCurrentScreen('feed-the-kraken-game-screen');
    } else if (gameStatus === 'lobby' && currentScreen !== 'index') {
      setCurrentScreen('index');
    } else if (gameStatus === 'finished') {
      // Mantener en game-screen para mostrar resultados
      if (currentScreen !== 'feed-the-kraken-game-screen') {
        setCurrentScreen('feed-the-kraken-game-screen');
      }
    }
  }, [gameStatus, currentScreen]);
  
  switch (currentScreen) {
    case 'index':
      return <FeedTheKrakenIndex navigation={navigation} route={route} />;
    case 'feed-the-kraken-role-reveal':
      return <FeedTheKrakenRoleReveal navigation={navigation} route={route} />;
    case 'feed-the-kraken-game-screen':
      return <FeedTheKrakenGameScreen navigation={navigation} route={route} />;
    default:
      return <FeedTheKrakenIndex navigation={navigation} route={route} />;
  }
};

