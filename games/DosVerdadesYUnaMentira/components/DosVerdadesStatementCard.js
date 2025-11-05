import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const DosVerdadesStatementCard = ({
  statement,
  index,
  isSelected,
  isLie,
  showRevelation,
  onPress,
  disabled = false,
}) => {
  const getCardStyle = () => {
    if (showRevelation) {
      return isLie
        ? styles.cardLie
        : styles.cardTruth;
    }
    if (isSelected) {
      return styles.cardSelected;
    }
    return styles.card;
  };

  const getTextStyle = () => {
    if (showRevelation) {
      return isLie ? styles.textLie : styles.textTruth;
    }
    return styles.text;
  };

  const CardContent = (
    <View style={[styles.cardContainer, getCardStyle()]}>
      <Text style={styles.statementNumber}>Afirmación {index + 1}</Text>
      <Text style={getTextStyle()}>{statement.text}</Text>
      {showRevelation && (
        <View style={styles.revelationBadge}>
          <Text style={styles.revelationText}>
            {isLie ? '❌ MENTIRA' : '✅ VERDAD'}
          </Text>
        </View>
      )}
      {isSelected && !showRevelation && (
        <View style={styles.selectedBadge}>
          <Text style={styles.selectedText}>✓ Seleccionada</Text>
        </View>
      )}
    </View>
  );

  if (disabled || showRevelation) {
    return CardContent;
  }

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      disabled={disabled}
    >
      {CardContent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    marginHorizontal: 10,
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
  },
  card: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  cardSelected: {
    backgroundColor: '#e3f2fd',
    borderWidth: 3,
    borderColor: '#2196f3',
  },
  cardTruth: {
    backgroundColor: '#e8f5e9',
    borderWidth: 3,
    borderColor: '#4caf50',
  },
  cardLie: {
    backgroundColor: '#ffebee',
    borderWidth: 3,
    borderColor: '#f44336',
  },
  statementNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  text: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
    fontWeight: '500',
  },
  textTruth: {
    fontSize: 18,
    color: '#2e7d32',
    lineHeight: 24,
    fontWeight: '600',
  },
  textLie: {
    fontSize: 18,
    color: '#c62828',
    lineHeight: 24,
    fontWeight: '600',
  },
  selectedBadge: {
    marginTop: 10,
    alignSelf: 'flex-start',
    backgroundColor: '#2196f3',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  selectedText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  revelationBadge: {
    marginTop: 15,
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  revelationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

