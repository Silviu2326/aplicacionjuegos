import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Share, Alert, Animated } from 'react-native';
import { useCadaverExquisitoStore } from '../store/cadaverExquisitoStore';

export const CadaverExquisitoStoryReveal = ({ onPlayAgain, onBackToMenu }) => {
  const phrases = useCadaverExquisitoStore((state) => state.getFullStory());
  const players = useCadaverExquisitoStore((state) => state.players);
  const gameStats = useCadaverExquisitoStore((state) => state.getGameStats());
  const mostActivePlayer = useCadaverExquisitoStore((state) => state.getMostActivePlayer());
  const mostWordyPlayer = useCadaverExquisitoStore((state) => state.getMostWordyPlayer());
  const gameStartTime = useCadaverExquisitoStore((state) => state.gameStartTime);
  const gameEndTime = useCadaverExquisitoStore((state) => state.gameEndTime);
  
  const [isRevealing, setIsRevealing] = useState(true);
  const [visiblePhrases, setVisiblePhrases] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (isRevealing && visiblePhrases < phrases.length) {
      const timer = setTimeout(() => {
        setVisiblePhrases(visiblePhrases + 1);
      }, 600); // Revelar una frase cada 600ms
      return () => clearTimeout(timer);
    } else if (visiblePhrases >= phrases.length) {
      setIsRevealing(false);
      // Animar la aparición de las estadísticas
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    }
  }, [visiblePhrases, phrases.length, isRevealing]);

  const formatStory = () => {
    return phrases
      .slice(0, visiblePhrases)
      .map((phrase, index) => phrase.phrase)
      .join(' ');
  };

  const formatDuration = (seconds) => {
    if (seconds < 60) {
      return `${seconds}s`;
    }
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const handleShare = async () => {
    const storyText = phrases.map((p) => p.phrase).join(' ');
    const statsText = `📊 Estadísticas:
• ${gameStats.totalPhrases} frases
• ${gameStats.totalWords} palabras
• Promedio: ${gameStats.averageWordsPerPhrase} palabras/frase

Jugadores: ${players.map(p => p.name).join(', ')}`;
    
    const fullText = `🎭 Cadáver Exquisito 2.0\n\n${storyText}\n\n${statsText}`;
    
    try {
      await Share.share({
        message: fullText,
        title: 'Cadáver Exquisito - Historia Completa',
      });
    } catch (error) {
      Alert.alert('Error', 'No se pudo compartir la historia');
    }
  };

  const getDuration = () => {
    if (gameStartTime && gameEndTime) {
      return formatDuration(Math.round((gameEndTime - gameStartTime) / 1000));
    }
    return 'N/A';
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎭 La Historia Completa</Text>
        <Text style={styles.subtitle}>
          {phrases.length} frase{phrases.length !== 1 ? 's' : ''} • {players.length} jugador{players.length !== 1 ? 'es' : ''} • {getDuration()}
        </Text>
      </View>
      
      <ScrollView 
        style={styles.storyContainer} 
        contentContainerStyle={styles.storyContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.storyBox}>
          <Text style={styles.storyText}>{formatStory()}</Text>
          {isRevealing && visiblePhrases < phrases.length && (
            <View style={styles.revealingContainer}>
              <Text style={styles.revealingIndicator}>...</Text>
              <Text style={styles.revealingText}>Revelando...</Text>
            </View>
          )}
        </View>
        
        {!isRevealing && (
          <Animated.View style={{ opacity: fadeAnim }}>
            <TouchableOpacity 
              style={styles.statsToggleButton}
              onPress={() => setShowStats(!showStats)}
            >
              <Text style={styles.statsToggleText}>
                {showStats ? '▼' : '▶'} Ver Estadísticas Detalladas
              </Text>
            </TouchableOpacity>
            
            {showStats && (
              <View style={styles.statsContainer}>
                <Text style={styles.statsTitle}>📊 Estadísticas de la Partida</Text>
                
                <View style={styles.statsGrid}>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{gameStats.totalPhrases}</Text>
                    <Text style={styles.statLabel}>Frases</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{gameStats.totalWords}</Text>
                    <Text style={styles.statLabel}>Palabras</Text>
                  </View>
                  <View style={styles.statCard}>
                    <Text style={styles.statValue}>{gameStats.averageWordsPerPhrase}</Text>
                    <Text style={styles.statLabel}>Promedio/Frase</Text>
                  </View>
                </View>
                
                {gameStats.longestPhrase && (
                  <View style={styles.highlightCard}>
                    <Text style={styles.highlightTitle}>🏆 Frase más larga</Text>
                    <Text style={styles.highlightText}>
                      "{gameStats.longestPhrase.phrase}"
                    </Text>
                    <Text style={styles.highlightAuthor}>
                      — {gameStats.longestPhrase.playerName} ({gameStats.longestPhrase.wordCount} palabras)
                    </Text>
                  </View>
                )}
                
                {gameStats.shortestPhrase && gameStats.shortestPhrase.wordCount < gameStats.longestPhrase.wordCount && (
                  <View style={styles.highlightCard}>
                    <Text style={styles.highlightTitle}>⚡ Frase más corta</Text>
                    <Text style={styles.highlightText}>
                      "{gameStats.shortestPhrase.phrase}"
                    </Text>
                    <Text style={styles.highlightAuthor}>
                      — {gameStats.shortestPhrase.playerName} ({gameStats.shortestPhrase.wordCount} palabras)
                    </Text>
                  </View>
                )}
                
                {mostActivePlayer && (
                  <View style={styles.highlightCard}>
                    <Text style={styles.highlightTitle}>⭐ Más activo</Text>
                    <Text style={styles.highlightText}>
                      {mostActivePlayer.name} escribió {gameStats.phrasesPerPlayer[mostActivePlayer.name]} frase{gameStats.phrasesPerPlayer[mostActivePlayer.name] !== 1 ? 's' : ''}
                    </Text>
                  </View>
                )}
                
                {mostWordyPlayer && (
                  <View style={styles.highlightCard}>
                    <Text style={styles.highlightTitle}>📝 Más palabras</Text>
                    <Text style={styles.highlightText}>
                      {mostWordyPlayer.name} escribió {gameStats.wordsPerPlayer[mostWordyPlayer.name]} palabras en total
                    </Text>
                  </View>
                )}
                
                <View style={styles.playersStatsContainer}>
                  <Text style={styles.playersStatsTitle}>Contribuciones por jugador:</Text>
                  {players.map((player) => {
                    const playerPhrases = gameStats.phrasesPerPlayer[player.name] || 0;
                    const playerWords = gameStats.wordsPerPlayer[player.name] || 0;
                    const avgWords = gameStats.averageWordsPerPlayer[player.name] || 0;
                    
                    return (
                      <View key={player.id} style={styles.playerStatItem}>
                        <View style={styles.playerStatHeader}>
                          <Text style={styles.playerStatName}>{player.name}</Text>
                          <Text style={styles.playerStatBadge}>
                            {playerPhrases} frase{playerPhrases !== 1 ? 's' : ''}
                          </Text>
                        </View>
                        <View style={styles.playerStatDetails}>
                          <Text style={styles.playerStatDetail}>
                            {playerWords} palabras • Promedio: {avgWords} palabras/frase
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
            
            <View style={styles.contributorsContainer}>
              <Text style={styles.contributorsTitle}>📖 Contribuciones en orden:</Text>
              {phrases.map((phrase, index) => (
                <View key={index} style={styles.contributorItem}>
                  <View style={styles.contributorNumber}>
                    <Text style={styles.contributorNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.contributorContent}>
                    <Text style={styles.contributorPhrase}>"{phrase.phrase}"</Text>
                    <View style={styles.contributorFooter}>
                      <Text style={styles.contributorName}>{phrase.playerName}</Text>
                      <Text style={styles.contributorMeta}>
                        Ronda {phrase.round} • {phrase.wordCount || 0} palabras
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Animated.View>
        )}
      </ScrollView>
      
      {!isRevealing && (
        <Animated.View style={[styles.actionsContainer, { opacity: fadeAnim }]}>
          <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
            <Text style={styles.shareButtonText}>📤 Compartir Historia</Text>
          </TouchableOpacity>
          
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={onPlayAgain}>
              <Text style={styles.actionButtonText}>🔄 Jugar Otra Vez</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.actionButton, styles.backButton]} onPress={onBackToMenu}>
              <Text style={[styles.actionButtonText, styles.backButtonText]}>← Menú</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 2,
    borderBottomColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
  },
  storyContainer: {
    flex: 1,
  },
  storyContent: {
    padding: 20,
  },
  storyBox: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  storyText: {
    fontSize: 18,
    lineHeight: 30,
    color: '#333',
    textAlign: 'justify',
  },
  revealingContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  revealingIndicator: {
    fontSize: 32,
    color: '#2196F3',
    marginBottom: 8,
  },
  revealingText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  statsToggleButton: {
    padding: 14,
    backgroundColor: '#E3F2FD',
    borderRadius: 10,
    marginBottom: 16,
    alignItems: 'center',
  },
  statsToggleText: {
    color: '#1976D2',
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
    textAlign: 'center',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  statCard: {
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    minWidth: 80,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textTransform: 'uppercase',
  },
  highlightCard: {
    backgroundColor: '#FFF9C4',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
  },
  highlightTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F57F17',
    marginBottom: 8,
  },
  highlightText: {
    fontSize: 15,
    color: '#5D4037',
    lineHeight: 22,
    marginBottom: 6,
    fontStyle: 'italic',
  },
  highlightAuthor: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
  },
  playersStatsContainer: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  playersStatsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  playerStatItem: {
    padding: 12,
    backgroundColor: '#F9F9F9',
    borderRadius: 8,
    marginBottom: 8,
  },
  playerStatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerStatName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  playerStatBadge: {
    fontSize: 12,
    color: '#2196F3',
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  playerStatDetails: {
    marginTop: 4,
  },
  playerStatDetail: {
    fontSize: 12,
    color: '#666',
  },
  contributorsContainer: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contributorsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
  contributorItem: {
    flexDirection: 'row',
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  contributorNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2196F3',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contributorNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
  },
  contributorContent: {
    flex: 1,
  },
  contributorPhrase: {
    fontSize: 15,
    lineHeight: 22,
    color: '#333',
    marginBottom: 8,
    fontStyle: 'italic',
  },
  contributorFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contributorName: {
    fontWeight: '600',
    color: '#1976D2',
    fontSize: 13,
  },
  contributorMeta: {
    fontSize: 11,
    color: '#999',
  },
  actionsContainer: {
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  shareButton: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  shareButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#2196F3',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  backButton: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#2196F3',
    shadowOpacity: 0,
    elevation: 0,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 15,
    fontWeight: '600',
  },
  backButtonText: {
    color: '#2196F3',
  },
});
