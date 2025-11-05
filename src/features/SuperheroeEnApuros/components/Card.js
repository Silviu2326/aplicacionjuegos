import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export const SuperheroeEnApurosCard = ({ title, description, type = 'power', onPress }) => {
  const [scaleAnim] = React.useState(new Animated.Value(1));

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const cardStyle = type === 'power' ? styles.powerCard : styles.problemCard;
  const icon = type === 'power' ? '⚡' : '🚨';
  const titleStyle = type === 'power' ? styles.powerTitle : styles.problemTitle;

  return (
    <Animated.View
      style={[
        styles.card,
        cardStyle,
        { transform: [{ scale: scaleAnim }] },
      ]}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cardIcon}>{icon}</Text>
        <Text style={[styles.cardTitle, titleStyle]}>{title}</Text>
      </View>
      <View style={styles.cardBody}>
        <Text style={styles.cardDescription}>{description}</Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
  },
  powerCard: {
    borderColor: '#9B59B6',
    backgroundColor: '#F4F1F8',
  },
  problemCard: {
    borderColor: '#E74C3C',
    backgroundColor: '#FDF2F2',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  powerTitle: {
    color: '#9B59B6',
  },
  problemTitle: {
    color: '#E74C3C',
  },
  cardBody: {
    marginTop: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: '#34495e',
    lineHeight: 24,
    textAlign: 'center',
  },
});

