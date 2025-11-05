import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ContinuaLaFraseLobby } from './continuaLaFraseLobby';

export const ContinuaLaFraseIndex = ({ navigation }) => {
  const handleStartGame = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('continua-la-frase-game-screen');
    }
  };

  return (
    <View style={styles.container}>
      <ContinuaLaFraseLobby onStartGame={handleStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

