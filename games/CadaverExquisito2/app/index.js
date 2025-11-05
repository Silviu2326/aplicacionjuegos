import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CadaverExquisitoPlayerSetup } from '../components/CadaverExquisitoPlayerSetup';

export const CadaverExquisitoIndex = ({ navigation }) => {
  const handleStartGame = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('cadaver-exquisito-juego');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CadaverExquisitoPlayerSetup onStartGame={handleStartGame} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
  },
});
