import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const COMENTARIOS_VOTACION = {
  1: { text: 'Muy pobre', emoji: '😞', color: '#f44336' },
  2: { text: 'Pobre', emoji: '😐', color: '#ff9800' },
  3: { text: 'Regular', emoji: '😊', color: '#ffc107' },
  4: { text: 'Bueno', emoji: '😄', color: '#4caf50' },
  5: { text: 'Excelente', emoji: '🤩', color: '#2196f3' },
};

export const CriticoCineAbsurdoPanelVotacion = ({ 
  criticName, 
  onVote, 
  disabled = false,
  currentVote = null 
}) => {
  const [selectedStars, setSelectedStars] = useState(currentVote || 0);

  const handleStarPress = (stars) => {
    if (disabled) return;
    setSelectedStars(stars);
  };

  const handleSubmitVote = () => {
    if (selectedStars === 0) {
      Alert.alert('Error', 'Por favor selecciona una calificación');
      return;
    }
    if (onVote) {
      onVote(selectedStars);
    }
  };

  const comentario = selectedStars > 0 ? COMENTARIOS_VOTACION[selectedStars] : null;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Califica la actuación de {criticName}</Text>
      <Text style={styles.subtitle}>Selecciona de 1 a 5 estrellas</Text>
      
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            style={styles.starButton}
            onPress={() => handleStarPress(star)}
            disabled={disabled}
          >
            <Text style={[
              styles.star,
              selectedStars >= star && styles.starSelected,
              disabled && styles.starDisabled
            ]}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      {comentario && !disabled && (
        <View style={[styles.comentarioContainer, { backgroundColor: comentario.color + '20' }]}>
          <Text style={styles.comentarioEmoji}>{comentario.emoji}</Text>
          <Text style={[styles.comentarioText, { color: comentario.color }]}>
            {comentario.text}
          </Text>
        </View>
      )}
      
      {!disabled && (
        <TouchableOpacity
          style={[styles.submitButton, selectedStars === 0 && styles.submitButtonDisabled]}
          onPress={handleSubmitVote}
          disabled={selectedStars === 0}
        >
          <Text style={styles.submitButtonText}>
            {currentVote ? 'Cambiar Voto' : 'Enviar Voto'}
          </Text>
        </TouchableOpacity>
      )}
      
      {disabled && currentVote > 0 && (
        <View style={styles.votedContainer}>
          <Text style={styles.votedText}>
            ✅ Ya votaste: {currentVote} estrellas
          </Text>
          {COMENTARIOS_VOTACION[currentVote] && (
            <Text style={styles.votedComentario}>
              {COMENTARIOS_VOTACION[currentVote].emoji} {COMENTARIOS_VOTACION[currentVote].text}
            </Text>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  starButton: {
    padding: 8,
  },
  star: {
    fontSize: 40,
    color: '#ddd',
  },
  starSelected: {
    color: '#FFD700',
  },
  starDisabled: {
    opacity: 0.5,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    padding: 14,
    paddingHorizontal: 32,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  comentarioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  comentarioEmoji: {
    fontSize: 24,
    marginRight: 8,
  },
  comentarioText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  votedContainer: {
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  votedText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 4,
  },
  votedComentario: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
});

