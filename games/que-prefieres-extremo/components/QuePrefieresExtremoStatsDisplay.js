import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const QuePrefieresExtremoStatsDisplay = ({ stats, question, selectedOption }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const bar1Anim = useRef(new Animated.Value(0)).current;
  const bar2Anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(bar1Anim, {
        toValue: stats.option1Percent / 100,
        duration: 800,
        useNativeDriver: false,
      }),
      Animated.timing(bar2Anim, {
        toValue: stats.option2Percent / 100,
        duration: 800,
        useNativeDriver: false,
      }),
    ]).start();
  }, [stats]);

  if (!stats || (stats.option1Percent === 0 && stats.option2Percent === 0 && !stats.total)) {
    return (
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <Text style={styles.title}>Estadísticas</Text>
        <Text style={styles.noStatsText}>
          ¡Eres el primero en responder esta pregunta!
        </Text>
      </Animated.View>
    );
  }

  const option1Selected = selectedOption === 0;
  const option2Selected = selectedOption === 1;
  const isMajority1 = stats.option1Percent >= 50;
  const isMajority2 = stats.option2Percent >= 50;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        },
      ]}
    >
      <Text style={styles.title}>📊 Estadísticas Globales</Text>
      {stats.total && (
        <Text style={styles.totalText}>
          {stats.total.toLocaleString()} persona(s) han respondido
        </Text>
      )}

      <View style={styles.statsContainer}>
        {/* Opción 1 */}
        <View style={[
          styles.statItem,
          option1Selected && styles.statItemSelected,
        ]}>
          <View style={styles.optionHeader}>
            <Text style={[
              styles.optionText,
              option1Selected && styles.optionTextSelected,
            ]}>
              {question.option1}
            </Text>
            {option1Selected && (
              <Text style={styles.selectedBadge}>✓ Tu elección</Text>
            )}
            {isMajority1 && !option1Selected && (
              <Text style={styles.majorityBadge}>⭐ Mayoría</Text>
            )}
          </View>
          <View style={styles.barContainer}>
            <Animated.View 
              style={[
                styles.bar, 
                styles.barOption1, 
                { 
                  width: bar1Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]} 
            />
          </View>
          <View style={styles.percentRow}>
            <Text style={[
              styles.percentText,
              option1Selected && styles.percentTextSelected,
            ]}>
              {stats.option1Percent}%
            </Text>
            {stats.option1 > 0 && (
              <Text style={styles.countText}>
                ({stats.option1.toLocaleString()} {stats.option1 === 1 ? 'voto' : 'votos'})
              </Text>
            )}
          </View>
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Opción 2 */}
        <View style={[
          styles.statItem,
          option2Selected && styles.statItemSelected,
        ]}>
          <View style={styles.optionHeader}>
            <Text style={[
              styles.optionText,
              option2Selected && styles.optionTextSelected,
            ]}>
              {question.option2}
            </Text>
            {option2Selected && (
              <Text style={styles.selectedBadge}>✓ Tu elección</Text>
            )}
            {isMajority2 && !option2Selected && (
              <Text style={styles.majorityBadge}>⭐ Mayoría</Text>
            )}
          </View>
          <View style={styles.barContainer}>
            <Animated.View 
              style={[
                styles.bar, 
                styles.barOption2, 
                { 
                  width: bar2Anim.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0%', '100%'],
                  }),
                },
              ]} 
            />
          </View>
          <View style={styles.percentRow}>
            <Text style={[
              styles.percentText,
              option2Selected && styles.percentTextSelected,
            ]}>
              {stats.option2Percent}%
            </Text>
            {stats.option2 > 0 && (
              <Text style={styles.countText}>
                ({stats.option2.toLocaleString()} {stats.option2 === 1 ? 'voto' : 'votos'})
              </Text>
            )}
          </View>
        </View>
      </View>

      {/* Mensaje adicional */}
      {(option1Selected || option2Selected) && (
        <View style={styles.messageContainer}>
          {((option1Selected && isMajority1) || (option2Selected && isMajority2)) ? (
            <Text style={styles.messageText}>
              🎯 ¡Tu elección coincide con la mayoría!
            </Text>
          ) : (
            <Text style={styles.messageText}>
              💪 Tu elección va contra la corriente
            </Text>
          )}
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    margin: 20,
    marginTop: 10,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  totalText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  statsContainer: {
    gap: 15,
  },
  statItem: {
    marginBottom: 5,
    padding: 12,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  statItemSelected: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  optionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    flex: 1,
    lineHeight: 20,
  },
  optionTextSelected: {
    color: '#2E7D32',
    fontWeight: '600',
  },
  selectedBadge: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
  majorityBadge: {
    backgroundColor: '#FFC107',
    color: '#333',
    fontSize: 11,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    marginLeft: 8,
  },
  barContainer: {
    height: 30,
    backgroundColor: '#E0E0E0',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 8,
  },
  bar: {
    height: '100%',
    borderRadius: 15,
  },
  barOption1: {
    backgroundColor: '#4CAF50',
  },
  barOption2: {
    backgroundColor: '#2196F3',
  },
  percentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  percentTextSelected: {
    color: '#2E7D32',
    fontSize: 20,
  },
  countText: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 5,
  },
  messageContainer: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#FFF3CD',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#FFC107',
  },
  messageText: {
    fontSize: 14,
    color: '#856404',
    textAlign: 'center',
    fontWeight: '500',
  },
  noStatsText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 10,
  },
});

