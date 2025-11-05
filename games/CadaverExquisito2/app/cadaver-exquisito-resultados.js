import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { CadaverExquisitoStoryReveal } from '../components/CadaverExquisitoStoryReveal';
import { useCadaverExquisitoStore } from '../store/cadaverExquisitoStore';

export const CadaverExquisitoResultados = ({ navigation }) => {
  const resetGame = useCadaverExquisitoStore((state) => state.resetGame);

  const handlePlayAgain = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const handleBackToMenu = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <CadaverExquisitoStoryReveal
          onPlayAgain={handlePlayAgain}
          onBackToMenu={handleBackToMenu}
        />
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
