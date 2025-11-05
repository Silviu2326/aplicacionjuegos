import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { QuePrefieresExtremoOptionButton } from './QuePrefieresExtremoOptionButton';

export const QuePrefieresExtremoDilemmaCard = ({
  question,
  onOptionSelect,
  disabled = false,
  selectedOption = null,
  showResult = false,
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [question]);

  // Resetear animaciones cuando cambia la pregunta
  useEffect(() => {
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
  }, [question?.id]);

  if (!question) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>¿Qué Prefieres?</Text>
        {question.difficulty && (
          <View style={styles.difficultyBadge}>
            <Text style={styles.difficultyText}>
              {question.difficulty === 'alto' ? '🔥' : question.difficulty === 'medio' ? '⚡' : '💫'}
              {' '}
              {question.difficulty === 'alto' ? 'Extremo' : question.difficulty === 'medio' ? 'Medio' : 'Fácil'}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.optionsContainer}>
        <QuePrefieresExtremoOptionButton
          option={question.option1}
          optionIndex={0}
          onSelect={onOptionSelect}
          disabled={disabled}
          isSelected={selectedOption === 0}
          showResult={showResult && selectedOption !== null}
        />
        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>O</Text>
          <View style={styles.divider} />
        </View>
        <QuePrefieresExtremoOptionButton
          option={question.option2}
          optionIndex={1}
          onSelect={onOptionSelect}
          disabled={disabled}
          isSelected={selectedOption === 1}
          showResult={showResult && selectedOption !== null}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  titleContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 10,
  },
  difficultyBadge: {
    backgroundColor: '#FFF3CD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#FFC107',
    marginTop: 8,
  },
  difficultyText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#856404',
  },
  optionsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#666',
  },
});

