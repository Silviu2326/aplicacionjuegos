import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useElSuperlativoStore } from '../store/elSuperlativoStore';
import { ElSuperlativoHeader } from '../components/ElSuperlativoHeader';
import { ElSuperlativoQuestionCard } from '../components/ElSuperlativoQuestionCard';
import { ElSuperlativoActionButton } from '../components/ElSuperlativoActionButton';

export const ElSuperlativoGame = ({ navigation }) => {
  const currentQuestion = useElSuperlativoStore((state) => state.currentQuestion);
  const nextQuestion = useElSuperlativoStore((state) => state.nextQuestion);
  const questionsAnswered = useElSuperlativoStore((state) => state.questionsAnswered);
  const updateGameTime = useElSuperlativoStore((state) => state.updateGameTime);
  const gameStartTime = useElSuperlativoStore((state) => state.gameStartTime);
  
  const [timeElapsed, setTimeElapsed] = useState(0);

  useEffect(() => {
    // Actualizar tiempo cada segundo
    const interval = setInterval(() => {
      updateGameTime();
      if (gameStartTime) {
        setTimeElapsed(Math.floor((Date.now() - gameStartTime) / 1000));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [updateGameTime, gameStartTime]);

  const handleNext = () => {
    nextQuestion();
  };

  const handleBack = () => {
    if (navigation && navigation.goBack) {
      navigation.goBack();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <ElSuperlativoHeader onBack={handleBack} showBackButton={true} />
      
      <View style={styles.content}>
        {/* Estadísticas en tiempo real */}
        <View style={styles.statsBar}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{questionsAnswered}</Text>
            <Text style={styles.statLabel}>Pregunta #{questionsAnswered}</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{formatTime(timeElapsed)}</Text>
            <Text style={styles.statLabel}>Tiempo</Text>
          </View>
        </View>

        {/* Caja de instrucciones mejorada */}
        <View style={styles.instructionBox}>
          <Text style={styles.instructionIcon}>📢</Text>
          <Text style={styles.instructionText}>
            Lee la pregunta en voz alta para todos los jugadores
          </Text>
        </View>

        {/* Tarjeta de pregunta */}
        <ElSuperlativoQuestionCard question={currentQuestion} />

        {/* Indicadores de progreso */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            {questionsAnswered === 1 
              ? '¡Primera pregunta! 🎉' 
              : `Has respondido ${questionsAnswered} pregunta${questionsAnswered > 1 ? 's' : ''}`
            }
          </Text>
        </View>

        {/* Tips contextuales */}
        <View style={styles.tipsBox}>
          <Text style={styles.tipsTitle}>💡 Recuerda</Text>
          <Text style={styles.tipItem}>• Todos deben señalar al mismo tiempo</Text>
          <Text style={styles.tipItem}>• No te puedes votar a ti mismo/a</Text>
          <Text style={styles.tipItem}>• Disfruta del debate, es la mejor parte</Text>
        </View>

        {/* Contenedor de acciones */}
        <View style={styles.actionContainer}>
          <Text style={styles.actionHint}>
            Cuando todos hayan señalado y debatido, presiona el botón para continuar
          </Text>
          <ElSuperlativoActionButton
            onPress={handleNext}
            text="Siguiente Pregunta ➜"
            disabled={!currentQuestion}
          />
        </View>
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
    flex: 1,
    paddingBottom: 30,
  },
  statsBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statBox: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ff9800',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  instructionBox: {
    backgroundColor: '#fff3cd',
    margin: 20,
    padding: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ffc107',
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  instructionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  instructionText: {
    fontSize: 16,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '600',
    flex: 1,
  },
  progressContainer: {
    backgroundColor: '#e3f2fd',
    marginHorizontal: 20,
    marginBottom: 15,
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  progressText: {
    fontSize: 14,
    color: '#1976d2',
    fontWeight: '600',
  },
  tipsBox: {
    backgroundColor: '#f3e5f5',
    margin: 20,
    padding: 18,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#9c27b0',
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#7b1fa2',
    marginBottom: 10,
    textAlign: 'center',
  },
  tipItem: {
    fontSize: 13,
    color: '#6a1b9a',
    lineHeight: 20,
    marginBottom: 6,
    paddingLeft: 8,
  },
  actionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  actionHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    fontStyle: 'italic',
    paddingHorizontal: 10,
  },
});

export default ElSuperlativoGame;

