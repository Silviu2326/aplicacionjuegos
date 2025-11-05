import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Audio } from 'expo-av';

export const VozMisteriosaAudioPlayer = ({ audioUrl, onReplay, maxReplays, replaysUsed, disabled }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const loadAndPlay = async () => {
    if (disabled || (maxReplays && replaysUsed >= maxReplays) || !audioUrl) {
      if (!audioUrl) {
        setError('Archivo de audio no disponible');
      }
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Si hay un sonido cargado, lo descargamos primero
      if (sound) {
        await sound.unloadAsync();
      }

      // Simulación de audio para datos falsos
      if (audioUrl && audioUrl.startsWith('simulado://')) {
        // Simular carga de audio
        await new Promise(resolve => setTimeout(resolve, 500));
        
        setIsPlaying(true);
        setIsLoading(false);
        
        // Simular duración del audio (3-5 segundos)
        const duration = 3000 + Math.random() * 2000;
        setTimeout(() => {
          setIsPlaying(false);
        }, duration);

        // Notificar al componente padre sobre el replay
        if (onReplay) {
          onReplay();
        }
        return;
      }

      // Cargar el audio real si existe
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioUrl,
        { shouldPlay: true }
      );

      setSound(newSound);

      // Configurar callbacks
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setIsPlaying(false);
        }
      });

      setIsPlaying(true);
      setIsLoading(false);

      // Notificar al componente padre sobre el replay
      if (onReplay) {
        onReplay();
      }
    } catch (err) {
      console.error('Error al cargar/reproducir audio:', err);
      // Si falla, usar simulación como respaldo
      if (audioUrl && audioUrl.startsWith('simulado://')) {
        setIsPlaying(true);
        setIsLoading(false);
        const duration = 3000 + Math.random() * 2000;
        setTimeout(() => {
          setIsPlaying(false);
        }, duration);
        if (onReplay) {
          onReplay();
        }
      } else {
        setError('Error al reproducir el audio');
        setIsLoading(false);
        setIsPlaying(false);
      }
    }
  };

  const stopAudio = async () => {
    if (isPlaying) {
      if (sound) {
        try {
          await sound.stopAsync();
        } catch (err) {
          console.error('Error al detener audio:', err);
        }
      }
      // Para audio simulado, simplemente detener
      setIsPlaying(false);
    }
  };

  const canReplay = !disabled && audioUrl && (!maxReplays || replaysUsed < maxReplays);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.playButton,
          (!canReplay || isLoading) && styles.playButtonDisabled,
        ]}
        onPress={loadAndPlay}
        disabled={!canReplay || isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.playButtonText}>
            {isPlaying ? '▶️' : '🔊'} {isPlaying ? 'Reproduciendo...' : 'Reproducir Audio'}
          </Text>
        )}
      </TouchableOpacity>

      {maxReplays && (
        <Text style={styles.replayInfo}>
          Repeticiones: {replaysUsed}/{maxReplays}
        </Text>
      )}

      {error && (
        <Text style={styles.errorText}>{error}</Text>
      )}

      {isPlaying && (
        <TouchableOpacity
          style={styles.stopButton}
          onPress={stopAudio}
        >
          <Text style={styles.stopButtonText}>⏹️ Detener</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  playButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 200,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  playButtonDisabled: {
    backgroundColor: '#ccc',
  },
  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  replayInfo: {
    marginTop: 10,
    fontSize: 14,
    color: '#666',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: '#f44336',
  },
  stopButton: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f44336',
    borderRadius: 15,
  },
  stopButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

