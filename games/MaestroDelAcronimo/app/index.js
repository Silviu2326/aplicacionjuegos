import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaestroDelAcronimoLobby } from './maestro-del-acronimo-lobby';

export const MaestroDelAcronimoIndex = ({ navigation }) => {
  const handleStartGame = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('maestro-del-acronimo-game');
    }
  };

  return (
    <View style={styles.container}>
      <MaestroDelAcronimoLobby onStartGame={handleStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

