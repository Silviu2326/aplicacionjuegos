import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export const MaestroCitasAnswerOption = ({ 
  option, 
  index, 
  isSelected, 
  isCorrect, 
  isRevealed, 
  onPress 
}) => {
  if (!option) return null;
  
  const getButtonStyle = () => {
    if (!isRevealed) {
      // Estado normal o seleccionado (antes de revelar)
      return isSelected ? styles.buttonSelected : styles.button;
    } else {
      // Estado revelado
      if (isCorrect) {
        return styles.buttonCorrect;
      } else if (isSelected && !isCorrect) {
        return styles.buttonIncorrect;
      } else {
        return styles.buttonRevealed;
      }
    }
  };
  
  const getTextStyle = () => {
    if (!isRevealed) {
      return isSelected ? styles.textSelected : styles.text;
    } else {
      if (isCorrect) {
        return styles.textCorrect;
      } else if (isSelected && !isCorrect) {
        return styles.textIncorrect;
      } else {
        return styles.textRevealed;
      }
    }
  };
  
  const getIcon = () => {
    if (!isRevealed) return null;
    if (isCorrect) return '✓';
    if (isSelected && !isCorrect) return '✗';
    return null;
  };
  
  return (
    <TouchableOpacity
      style={[styles.container, getButtonStyle()]}
      onPress={onPress}
      disabled={isRevealed || isSelected}
      activeOpacity={0.7}
    >
      <View style={styles.optionContent}>
        {getIcon() && (
          <View style={styles.iconContainer}>
            <Text style={styles.iconText}>{getIcon()}</Text>
          </View>
        )}
        <Text style={getTextStyle()}>{option}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 8,
    borderRadius: 12,
    padding: 18,
    minHeight: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f0f0f0',
    borderWidth: 2,
    borderColor: '#ddd',
  },
  buttonSelected: {
    backgroundColor: '#e3f2fd',
    borderWidth: 2,
    borderColor: '#2196f3',
  },
  buttonCorrect: {
    backgroundColor: '#4caf50',
    borderWidth: 2,
    borderColor: '#2e7d32',
  },
  buttonIncorrect: {
    backgroundColor: '#f44336',
    borderWidth: 2,
    borderColor: '#c62828',
  },
  buttonRevealed: {
    backgroundColor: '#f5f5f5',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  textSelected: {
    fontSize: 16,
    color: '#1976d2',
    textAlign: 'center',
    fontWeight: '600',
  },
  textCorrect: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  textIncorrect: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  textRevealed: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    fontWeight: '400',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconContainer: {
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});

