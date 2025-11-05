import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useElSuperlativoStore } from '../store/elSuperlativoStore';
import { ElSuperlativoHeader } from '../components/ElSuperlativoHeader';

export const ElSuperlativoIndex = ({ navigation }) => {
  const startGame = useElSuperlativoStore((state) => state.startGame);

  const handleStart = () => {
    startGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('el-superlativo-game');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <ElSuperlativoHeader />
      
      <View style={styles.content}>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>
            El Superlativo es un juego social y de fiesta diseñado para revelar las verdades más graciosas y ocultas de un grupo de amigos. 
            El objetivo principal no es competir, sino generar risas, debates y anécdotas inolvidables.
          </Text>
        </View>

        <View style={styles.instructionsContainer}>
          <Text style={styles.instructionsTitle}>📖 Instrucciones</Text>
          <Text style={styles.instructionStep}>1. Reunir a 3 o más amigos en un círculo</Text>
          <Text style={styles.instructionStep}>2. Leer la pregunta en voz alta</Text>
          <Text style={styles.instructionStep}>3. Todos piensan a quién del grupo describe mejor</Text>
          <Text style={styles.instructionStep}>4. ¡Señalar todos a la vez! (no te puedes votar a ti mismo)</Text>
          <Text style={styles.instructionStep}>5. Contar los votos y debatir</Text>
          <Text style={styles.instructionStep}>6. La persona más votada explica por qué</Text>
          <Text style={styles.instructionStep}>7. Pasar a la siguiente pregunta</Text>
        </View>

        <TouchableOpacity
          style={styles.startButton}
          onPress={handleStart}
        >
          <Text style={styles.startButtonText}>Comenzar Juego</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  descriptionContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    textAlign: 'center',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  instructionStep: {
    fontSize: 15,
    color: '#555',
    lineHeight: 24,
    marginBottom: 8,
    paddingLeft: 10,
  },
  startButton: {
    backgroundColor: '#ff9800',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default ElSuperlativoIndex;

