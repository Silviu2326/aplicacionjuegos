import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';
import { useCadenaEmojisStore } from '../store/cadenaEmojisStore';

export const CadenaEmojisVisor = () => {
  const emojiChain = useCadenaEmojisStore((state) => state.getFullChain());

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {emojiChain.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📖</Text>
            <Text style={styles.emptyText}>La historia comenzará aquí...</Text>
            <Text style={styles.emptySubtext}>Añade el primer emoji para comenzar</Text>
          </View>
        ) : (
          emojiChain.map((entry, index) => (
            <View key={index} style={styles.emojiContainer}>
              <View style={styles.emojiWrapper}>
                <Text style={styles.emoji}>{entry.emoji}</Text>
                <View style={styles.emojiIndex}>
                  <Text style={styles.emojiIndexText}>{index + 1}</Text>
                </View>
              </View>
              {entry.narration && (
                <View style={styles.narrationPreviewContainer}>
                  <Text style={styles.narrationPreview} numberOfLines={2}>
                    {entry.narration}
                  </Text>
                </View>
              )}
              <Text style={styles.playerInitial}>{entry.playerName.charAt(0).toUpperCase()}</Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 200,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scrollView: {
    flexGrow: 0,
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  emojiContainer: {
    alignItems: 'center',
    marginHorizontal: 12,
    minWidth: 80,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  narrationPreview: {
    fontSize: 10,
    color: '#666',
    textAlign: 'center',
    maxWidth: 80,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  emptySubtext: {
    fontSize: 12,
    color: '#999',
    fontStyle: 'italic',
  },
  emojiWrapper: {
    position: 'relative',
    marginBottom: 8,
  },
  emojiIndex: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  emojiIndexText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  narrationPreviewContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 6,
    marginTop: 4,
    maxWidth: 90,
  },
  playerInitial: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    width: 18,
    height: 18,
    borderRadius: 9,
    textAlign: 'center',
    lineHeight: 18,
    borderWidth: 2,
    borderColor: 'white',
  },
});

