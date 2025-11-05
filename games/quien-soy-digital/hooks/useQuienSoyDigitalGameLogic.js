import { useEffect, useRef } from 'react';
import { useQuienSoyDigitalStore } from '../store/quienSoyDigitalStore';
import { Audio } from 'expo-av';
import { useDeviceTilt } from './useDeviceTilt';

/**
 * Hook principal que maneja la lógica del juego
 * Incluye temporizador, detección de inclinaciones y sonidos
 */
export const useQuienSoyDigitalGameLogic = (enabled = true) => {
  const {
    timeRemaining,
    updateTimeRemaining,
    markAsCorrect,
    passWord,
    gameStatus,
    timeLimit,
  } = useQuienSoyDigitalStore();

  const timerRef = useRef(null);
  const soundRef = useRef({
    correct: null,
    pass: null,
    timesUp: null,
  });

  // Cargar sonidos al montar
  useEffect(() => {
    const loadSounds = async () => {
      try {
        // Nota: Los sonidos deben estar en assets/sounds/
        // Por ahora usamos placeholders, se pueden añadir después
        // const { sound: correctSound } = await Audio.Sound.createAsync(
        //   require('../assets/sounds/correct_answer.mp3')
        // );
        // soundRef.current.correct = correctSound;
      } catch (error) {
        console.log('Error loading sounds:', error);
      }
    };

    loadSounds();

    return () => {
      // Limpiar sonidos al desmontar
      Object.values(soundRef.current).forEach((sound) => {
        if (sound) {
          sound.unloadAsync();
        }
      });
    };
  }, []);

  // Reproducir sonido
  const playSound = async (type) => {
    try {
      const sound = soundRef.current[type];
      if (sound) {
        await sound.replayAsync();
      }
    } catch (error) {
      console.log('Error playing sound:', error);
    }
  };

  // Manejar acierto
  const handleCorrect = async () => {
    await playSound('correct');
    markAsCorrect();
  };

  // Manejar pase
  const handlePass = async () => {
    await playSound('pass');
    passWord();
  };

  // Temporizador
  useEffect(() => {
    if (gameStatus !== 'playing' || !enabled) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    timerRef.current = setInterval(() => {
      const currentTime = useQuienSoyDigitalStore.getState().timeRemaining;
      const newTime = currentTime - 1;
      updateTimeRemaining(newTime);

      if (newTime <= 0) {
        playSound('timesUp');
      }
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameStatus, enabled, updateTimeRemaining]);

  // Configurar detección de inclinaciones
  useDeviceTilt({
    onTiltDown: handleCorrect,
    onTiltUp: handlePass,
    enabled: enabled && gameStatus === 'playing',
  });

  return {
    timeRemaining,
    timeLimit,
  };
};

