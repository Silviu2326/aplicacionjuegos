import React, { useState } from 'react';
import { InsiderIndex } from './app/index';
import { InsiderLobby } from './app/insider-lobby';
import { InsiderRoleReveal } from './app/insider-role-reveal';
import { InsiderQuestioning } from './app/insider-questioning';
import { InsiderVoting } from './app/insider-voting';
import { InsiderResults } from './app/insider-results';

export const InsiderNavigator = () => {
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
      return <InsiderIndex navigation={navigation} route={route} />;
    case 'lobby':
      return <InsiderLobby navigation={navigation} route={route} />;
    case 'role-reveal':
      return <InsiderRoleReveal navigation={navigation} route={route} />;
    case 'questioning':
      return <InsiderQuestioning navigation={navigation} route={route} />;
    case 'voting':
      return <InsiderVoting navigation={navigation} route={route} />;
    case 'results':
      return <InsiderResults navigation={navigation} route={route} />;
    default:
      return <InsiderIndex navigation={navigation} route={route} />;
  }
};

