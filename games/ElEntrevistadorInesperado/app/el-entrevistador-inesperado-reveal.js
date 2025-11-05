import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useEntrevistadorInesperadoStore } from '../store/entrevistadorInesperadoStore';
import { EntrevistadorInesperadoCharacterCard } from '../components/EntrevistadorInesperadoCharacterCard';
import { EntrevistadorInesperadoPlayerList } from '../components/EntrevistadorInesperadoPlayerList';

export const ElEntrevistadorInesperadoReveal = ({ navigation }) => {
  const currentCharacter = useEntrevistadorInesperadoStore(
    (state) => state.currentCharacter
  );
  const players = useEntrevistadorInesperadoStore((state) => state.players);
  const currentPlayerId = useEntrevistadorInesperadoStore(
    (state) => state.currentPlayerId
  );
  const currentRound = useEntrevistadorInesperadoStore(
    (state) => state.currentRound
  );
  const getCurrentInterviewee = useEntrevistadorInesperadoStore(
    (state) => state.getCurrentInterviewee
  );
  const isCurrentPlayerInterviewee = useEntrevistadorInesperadoStore(
    (state) => state.isCurrentPlayerInterviewee
  );
  const startRevealPhase = useEntrevistadorInesperadoStore(
    (state) => state.startRevealPhase
  );
  const startGamePhase = useEntrevistadorInesperadoStore(
    (state) => state.startGamePhase
  );

  useEffect(() => {
    // Asignar personaje al iniciar la fase de revelación
    if (!currentCharacter) {
      startRevealPhase();
    }
  }, []);

  const interviewee = getCurrentInterviewee();
  const effectivePlayerId =
    currentPlayerId || (players.length > 0 ? players[0].id : null);
  const isInterviewee = isCurrentPlayerInterviewee();

  const handleContinue = () => {
    startGamePhase();
    if (navigation && navigation.navigate) {
      navigation.navigate('game');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ronda {currentRound}</Text>
        {interviewee && (
          <Text style={styles.intervieweeName}>
            Entrevistado: {interviewee.name}
          </Text>
        )}
      </View>

      <View style={styles.content}>
        {isInterviewee ? (
          <View style={styles.intervieweeView}>
            <EntrevistadorInesperadoCharacterCard
              character={currentCharacter}
            />
            <View style={styles.readyBox}>
              <Text style={styles.readyTitle}>✨ Prepárate para la entrevista</Text>
              <Text style={styles.instructions}>
                Cuando estés listo, presiona el botón para comenzar la entrevista.
                Recuerda mantener tu personaje y dar pistas sutiles sin revelar
                directamente quién eres.
              </Text>
            </View>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={handleContinue}
            >
              <Text style={styles.continueButtonText}>
                🎬 Comenzar Entrevista
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.interviewerView}>
            <View style={styles.waitingHeader}>
              <Text style={styles.waitingEmoji}>⏳</Text>
              <Text style={styles.waitingTitle}>
                Esperando a {interviewee?.name}
              </Text>
            </View>
            <View style={styles.waitingBox}>
              <Text style={styles.waitingText}>
                El entrevistado está revisando su personaje secreto. Cuando esté
                listo, comenzará la entrevista.
              </Text>
              <View style={styles.tipBox}>
                <Text style={styles.tipTitle}>💡 Consejo</Text>
                <Text style={styles.tipText}>
                  Prepárate con preguntas de entrevista para descubrir la identidad
                  del entrevistado. Escucha atentamente sus respuestas.
                </Text>
              </View>
            </View>
            <EntrevistadorInesperadoPlayerList
              players={players}
              intervieweeId={interviewee?.id}
            />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#4caf50',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  intervieweeName: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  intervieweeView: {
    flex: 1,
    justifyContent: 'center',
  },
  readyBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginVertical: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  readyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  continueButton: {
    backgroundColor: '#4caf50',
    padding: 18,
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
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  interviewerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  waitingHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  waitingEmoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  waitingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  waitingBox: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  waitingText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  tipBox: {
    backgroundColor: '#e3f2fd',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#2196f3',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default ElEntrevistadorInesperadoReveal;

