import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet, Animated } from 'react-native';

export const QuePrefieresExtremoOptionButton = ({ 
  option, 
  optionIndex, 
  onSelect,
  disabled = false,
  isSelected = false,
  showResult = false,
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  const pulseAnim = React.useRef(new Animated.Value(1)).current;
  const glowAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSelected && showResult) {
      // Animación de pulso cuando se selecciona
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      // Animación de brillo
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      glowAnim.setValue(0);
    }
  }, [isSelected, showResult]);

  const handlePressIn = () => {
    if (disabled) return;
    setIsPressed(true);
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    if (disabled) return;
    setIsPressed(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePress = () => {
    if (disabled) return;
    onSelect(optionIndex);
  };

  return (
    <Animated.View 
      style={[
        { 
          transform: [
            { scale: Animated.multiply(scaleAnim, pulseAnim) },
          ],
        },
      ]}
    >
      <TouchableOpacity
        style={[
          styles.button,
          isPressed && styles.buttonPressed,
          disabled && styles.buttonDisabled,
          isSelected && showResult && styles.buttonSelected,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        activeOpacity={0.8}
      >
        {isSelected && showResult && (
          <Text style={styles.selectedIcon}>✓</Text>
        )}
        <Text style={[
          styles.buttonText, 
          disabled && styles.buttonTextDisabled,
          isSelected && showResult && styles.buttonTextSelected,
        ]}>
          {option}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    position: 'relative',
  },
  buttonPressed: {
    backgroundColor: '#E8F5E9',
    borderColor: '#2E7D32',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonSelected: {
    backgroundColor: '#C8E6C9',
    borderColor: '#2E7D32',
    borderWidth: 4,
    shadowColor: '#4CAF50',
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 8,
  },
  selectedIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
    fontSize: 24,
    color: '#2E7D32',
    fontWeight: 'bold',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  buttonTextDisabled: {
    color: '#999',
  },
  buttonTextSelected: {
    color: '#1B5E20',
    fontWeight: 'bold',
    fontSize: 19,
  },
});

