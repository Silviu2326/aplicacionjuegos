import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export const InsiderQuestionLog = ({ questions, players }) => {
  const getPlayerName = (playerId) => {
    const player = players.find(p => p.id === playerId);
    return player ? player.name : 'Desconocido';
  };

  const getAnswerEmoji = (answer) => {
    switch (answer) {
      case 'yes':
        return '✓';
      case 'no':
        return '✗';
      case 'dont-know':
        return '?';
      default:
        return '';
    }
  };

  const getAnswerText = (answer) => {
    switch (answer) {
      case 'yes':
        return 'Sí';
      case 'no':
        return 'No';
      case 'dont-know':
        return 'No lo sé';
      default:
        return 'Pendiente';
    }
  };

  const getAnswerColor = (answer) => {
    switch (answer) {
      case 'yes':
        return '#4CAF50';
      case 'no':
        return '#f44336';
      case 'dont-know':
        return '#ff9800';
      default:
        return '#999';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historial de Preguntas</Text>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={true}>
        {questions.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No hay preguntas aún</Text>
          </View>
        ) : (
          questions.map((question, index) => (
            <View key={question.id} style={styles.questionItem}>
              <View style={styles.questionHeader}>
                <Text style={styles.questionNumber}>#{index + 1}</Text>
                <Text style={styles.questionPlayer}>
                  {getPlayerName(question.playerId)}
                </Text>
              </View>
              <Text style={styles.questionText}>{question.question}</Text>
              {question.answer ? (
                <View style={styles.answerContainer}>
                  <Text style={[styles.answerEmoji, { color: getAnswerColor(question.answer) }]}>
                    {getAnswerEmoji(question.answer)}
                  </Text>
                  <Text style={[styles.answerText, { color: getAnswerColor(question.answer) }]}>
                    {getAnswerText(question.answer)}
                  </Text>
                </View>
              ) : (
                <Text style={styles.pendingText}>Esperando respuesta del Guía...</Text>
              )}
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  scrollView: {
    flex: 1,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  questionItem: {
    backgroundColor: '#f5f5f5',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#2196F3',
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  questionNumber: {
    fontSize: 12,
    color: '#999',
    marginRight: 8,
    fontWeight: 'bold',
  },
  questionPlayer: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196F3',
  },
  questionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
    lineHeight: 22,
  },
  answerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  answerEmoji: {
    fontSize: 20,
    marginRight: 8,
    fontWeight: 'bold',
  },
  answerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pendingText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    marginTop: 5,
  },
});

