import React from 'react';
import { DosVerdadesSetupForm } from '../components/DosVerdadesSetupForm';

export const DosVerdadesIndex = ({ navigation }) => {
  const handleStartGame = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('juego');
    }
  };

  return <DosVerdadesSetupForm onStartGame={handleStartGame} />;
};

export default DosVerdadesIndex;

