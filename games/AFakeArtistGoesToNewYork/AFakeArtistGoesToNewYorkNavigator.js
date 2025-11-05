import React, { useState } from 'react';
import { AFakeArtistGoesToNewYorkIndex } from './app/index';
import { FakeArtistGameLobby } from './app/fake-artist-game-lobby';
import { FakeArtistRoleReveal } from './app/fake-artist-role-reveal';
import { FakeArtistDrawingBoard } from './app/fake-artist-drawing-board';
import { FakeArtistVoting } from './app/fake-artist-voting';
import { FakeArtistResults } from './app/fake-artist-results';

export const AFakeArtistGoesToNewYorkNavigator = () => {
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
      return <AFakeArtistGoesToNewYorkIndex navigation={navigation} route={route} />;
    case 'lobby':
      return <FakeArtistGameLobby navigation={navigation} route={route} />;
    case 'role-reveal':
      return <FakeArtistRoleReveal navigation={navigation} route={route} />;
    case 'drawing-board':
      return <FakeArtistDrawingBoard navigation={navigation} route={route} />;
    case 'voting':
      return <FakeArtistVoting navigation={navigation} route={route} />;
    case 'results':
      return <FakeArtistResults navigation={navigation} route={route} />;
    default:
      return <AFakeArtistGoesToNewYorkIndex navigation={navigation} route={route} />;
  }
};

