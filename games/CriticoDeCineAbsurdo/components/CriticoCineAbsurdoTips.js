import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TIPS_CRITICO = [
  '💡 Describe la trama de forma absurda pero coherente',
  '🎭 Incluye detalles sobre personajes y sus motivaciones',
  '🎬 Habla sobre la dirección y el estilo cinematográfico',
  '⭐ Da tu veredicto final con entusiasmo',
  '🎪 Sé creativo y diviértete con la premisa absurda',
  '📝 Crea una historia que tenga sentido dentro del absurdo',
  '🎨 Describe el aspecto visual y la estética',
  '🎵 Menciona la música o banda sonora imaginaria',
];

const TIPS_AUDIENCIA = [
  '👂 Escucha atentamente la crítica del jugador',
  '⭐ Evalúa la creatividad y la improvisación',
  '🎭 Considera qué tan entretenida fue la actuación',
  '🎬 Califica la coherencia de la historia inventada',
  '💫 Sé justo en tu evaluación',
  '🎪 Disfruta del espectáculo absurdo',
];

export const CriticoCineAbsurdoTips = ({ esCritico = false }) => {
  const tips = esCritico ? TIPS_CRITICO : TIPS_AUDIENCIA;
  const tipAleatorio = tips[Math.floor(Math.random() * tips.length)];

  return (
    <View style={styles.container}>
      <Text style={styles.label}>💡 Tip</Text>
      <Text style={styles.tip}>{tipAleatorio}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  tip: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
});

