import { useState, useEffect } from 'react';
import { Accelerometer } from 'expo-sensors';
import { TILT_THRESHOLD } from '../constants/QuienSoyDigitalDecks';

/**
 * Hook para detectar inclinaciones del dispositivo
 * @param {Function} onTiltDown - Callback cuando se inclina hacia abajo (acierto)
 * @param {Function} onTiltUp - Callback cuando se inclina hacia arriba (pasar)
 * @param {boolean} enabled - Si el acelerómetro está habilitado
 */
export const useDeviceTilt = ({
  onTiltDown,
  onTiltUp,
  enabled = true,
}) => {
  const [subscription, setSubscription] = useState(null);
  const [lastTilt, setLastTilt] = useState(null);
  const [tiltCooldown, setTiltCooldown] = useState(false);

  useEffect(() => {
    if (!enabled) {
      if (subscription) {
        subscription.remove();
        setSubscription(null);
      }
      return;
    }

    // Configurar el acelerómetro para actualizarse más rápido
    Accelerometer.setUpdateInterval(100);

    let currentCooldown = false;
    let currentLastTilt = null;

    const sub = Accelerometer.addListener((accelerometerData) => {
      const { x, y, z } = accelerometerData;
      
      // Calcular la inclinación basada en el eje Y (hacia arriba/abajo)
      // Y positivo = inclinado hacia arriba, Y negativo = inclinado hacia abajo
      const tilt = y;
      
      // Cooldown para evitar múltiples detecciones muy rápidas
      if (currentCooldown) return;
      
      // Detectar inclinación hacia abajo (Y negativo, acertar)
      if (tilt < -TILT_THRESHOLD && currentLastTilt !== 'down') {
        currentLastTilt = 'down';
        currentCooldown = true;
        setLastTilt('down');
        setTiltCooldown(true);
        onTiltDown?.();
        
        // Resetear cooldown después de 1 segundo
        setTimeout(() => {
          currentCooldown = false;
          currentLastTilt = null;
          setTiltCooldown(false);
          setLastTilt(null);
        }, 1000);
      }
      // Detectar inclinación hacia arriba (Y positivo, pasar)
      else if (tilt > TILT_THRESHOLD && currentLastTilt !== 'up') {
        currentLastTilt = 'up';
        currentCooldown = true;
        setLastTilt('up');
        setTiltCooldown(true);
        onTiltUp?.();
        
        // Resetear cooldown después de 1 segundo
        setTimeout(() => {
          currentCooldown = false;
          currentLastTilt = null;
          setTiltCooldown(false);
          setLastTilt(null);
        }, 1000);
      }
    });

    setSubscription(sub);

    return () => {
      if (sub) {
        sub.remove();
      }
    };
  }, [enabled, onTiltDown, onTiltUp]);
};

