import React from 'react';
import { View, StyleSheet } from 'react-native';
import { ConexionInesperadaPlayerSetup } from '../components/ConexionInesperadaPlayerSetup';

export const ConexionInesperadaIndex = ({ navigation }) => {
  const handleStartGame = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('conexion-inesperada-partida');
    }
  };

  return (
    <View style={styles.container}>
      <ConexionInesperadaPlayerSetup onStartGame={handleStartGame} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});

