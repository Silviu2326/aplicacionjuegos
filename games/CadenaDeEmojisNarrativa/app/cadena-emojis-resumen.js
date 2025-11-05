import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from 'react-native';
import { useCadenaEmojisStore } from '../store/cadenaEmojisStore';
import { GAME_CONFIG } from '../constants/cadenaEmojisConstants';

export const CadenaEmojisResumen = ({ navigation }) => {
  const emojiChain = useCadenaEmojisStore((state) => state.getFullChain());
  const chainAsString = useCadenaEmojisStore((state) => state.getChainAsString());
  const fullNarration = useCadenaEmojisStore((state) => state.getFullNarration());
  const resetGame = useCadenaEmojisStore((state) => state.resetGame);
  const gameStats = useCadenaEmojisStore((state) => state.getGameStats());
  const theme = useCadenaEmojisStore((state) => state.theme);
  
  const formatDuration = (seconds) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const handlePlayAgain = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  const handleGoHome = () => {
    resetGame();
    if (navigation && navigation.navigate) {
      navigation.navigate('index');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.header}>
        <Text style={styles.title}>¡Historia Completada!</Text>
        {theme && (
          <View style={styles.themeBadge}>
            <Text style={styles.themeText}>Tema: {theme}</Text>
          </View>
        )}
      </View>
      
      {/* Estadísticas Generales */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📊 Estadísticas del Juego</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{gameStats.totalEmojis}</Text>
            <Text style={styles.statLabel}>Emojis Totales</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{gameStats.totalPlayers}</Text>
            <Text style={styles.statLabel}>Jugadores</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{gameStats.averageEmojisPerPlayer}</Text>
            <Text style={styles.statLabel}>Promedio/Jugador</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{formatDuration(gameStats.gameDuration)}</Text>
            <Text style={styles.statLabel}>Duración</Text>
          </View>
        </View>
        {gameStats.totalNarrations > 0 && (
          <View style={styles.narrationStats}>
            <Text style={styles.narrationStatsText}>
              📝 {gameStats.totalNarrations} narración{gameStats.totalNarrations !== 1 ? 'es' : ''} agregada{gameStats.totalNarrations !== 1 ? 's' : ''}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🔗 Cadena de Emojis</Text>
        <View style={styles.emojiChainContainer}>
          <Text style={styles.emojiChain}>{chainAsString || 'Sin emojis'}</Text>
        </View>
      </View>

      {/* Estadísticas por Jugador */}
      {gameStats.playerStats && gameStats.playerStats.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>👥 Contribuciones por Jugador</Text>
          <View style={styles.playerStatsContainer}>
            {gameStats.playerStats.map((player, index) => (
              <View key={player.id} style={styles.playerStatCard}>
                <Text style={styles.playerStatName}>{player.name}</Text>
                <View style={styles.playerStatDetails}>
                  <View style={styles.playerStatItem}>
                    <Text style={styles.playerStatValue}>{player.stats.emojisAdded}</Text>
                    <Text style={styles.playerStatLabel}>Emojis</Text>
                  </View>
                  <View style={styles.playerStatItem}>
                    <Text style={styles.playerStatValue}>{player.stats.narrationsCount}</Text>
                    <Text style={styles.playerStatLabel}>Narraciones</Text>
                  </View>
                  {player.stats.totalChars > 0 && (
                    <View style={styles.playerStatItem}>
                      <Text style={styles.playerStatValue}>{player.stats.totalChars}</Text>
                      <Text style={styles.playerStatLabel}>Caracteres</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
      
      {emojiChain.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📖 Historia Completa</Text>
          <View style={styles.narrationContainer}>
            {emojiChain.map((entry, index) => (
              <View 
                key={index} 
                style={[
                  styles.narrationEntry,
                  index === emojiChain.length - 1 && styles.narrationEntryLast
                ]}
              >
                <View style={styles.emojiWithNarration}>
                  <View style={styles.emojiCircle}>
                    <Text style={styles.entryEmoji}>{entry.emoji}</Text>
                    <Text style={styles.entryIndex}>{index + 1}</Text>
                  </View>
                  <View style={styles.narrationTextContainer}>
                    <View style={styles.playerHeader}>
                      <Text style={styles.playerName}>{entry.playerName}</Text>
                      <Text style={styles.timestamp}>
                        {new Date(entry.timestamp).toLocaleTimeString('es-ES', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </Text>
                    </View>
                    {entry.narration ? (
                      <Text style={styles.narrationText}>{entry.narration}</Text>
                    ) : (
                      <Text style={styles.noNarrationText}>(Sin narración)</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {fullNarration && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📝 Narración Completa</Text>
          <View style={styles.fullNarrationContainer}>
            <Text style={styles.fullNarration}>{fullNarration}</Text>
          </View>
        </View>
      )}
      
      {/* Estadísticas de Narraciones */}
      {gameStats.longestNarration && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>📈 Detalles de Narraciones</Text>
          <View style={styles.narrationDetails}>
            <View style={styles.narrationDetailItem}>
              <Text style={styles.detailLabel}>Narración más larga:</Text>
              <Text style={styles.detailText} numberOfLines={3}>
                {gameStats.longestNarration}
              </Text>
              <Text style={styles.detailSubtext}>
                {gameStats.longestNarration.length} caracteres
              </Text>
            </View>
            {gameStats.shortestNarration && gameStats.shortestNarration !== gameStats.longestNarration && (
              <View style={styles.narrationDetailItem}>
                <Text style={styles.detailLabel}>Narración más corta:</Text>
                <Text style={styles.detailText} numberOfLines={2}>
                  {gameStats.shortestNarration}
                </Text>
                <Text style={styles.detailSubtext}>
                  {gameStats.shortestNarration.length} caracteres
                </Text>
              </View>
            )}
          </View>
        </View>
      )}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.playAgainButton} onPress={handlePlayAgain}>
          <Text style={styles.playAgainButtonText}>Jugar Otra Vez</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.homeButton} onPress={handleGoHome}>
          <Text style={styles.homeButtonText}>Volver al Inicio</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  themeBadge: {
    backgroundColor: '#E3F2FD',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  themeText: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  statItem: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  narrationStats: {
    marginTop: 12,
    padding: 12,
    backgroundColor: '#E8F5E9',
    borderRadius: 8,
  },
  narrationStatsText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 16,
  },
  emojiChainContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  emojiChain: {
    fontSize: 48,
    lineHeight: 60,
    textAlign: 'center',
  },
  narrationContainer: {
    marginTop: 8,
  },
  playerStatsContainer: {
    marginTop: 8,
  },
  playerStatCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  playerStatName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
  },
  playerStatDetails: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  playerStatItem: {
    alignItems: 'center',
  },
  playerStatValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#4CAF50',
    marginBottom: 4,
  },
  playerStatLabel: {
    fontSize: 11,
    color: '#666',
  },
  narrationEntry: {
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  narrationEntryLast: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  emojiWithNarration: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  emojiCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    position: 'relative',
  },
  entryEmoji: {
    fontSize: 32,
  },
  entryIndex: {
    position: 'absolute',
    bottom: -6,
    right: -6,
    backgroundColor: '#2196F3',
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
    width: 20,
    height: 20,
    borderRadius: 10,
    textAlign: 'center',
    lineHeight: 20,
  },
  narrationTextContainer: {
    flex: 1,
  },
  playerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  playerName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2196F3',
  },
  timestamp: {
    fontSize: 11,
    color: '#999',
  },
  narrationText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  noNarrationText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  fullNarrationContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
  },
  fullNarration: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    textAlign: 'justify',
  },
  narrationDetails: {
    marginTop: 8,
  },
  narrationDetailItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  detailLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  detailSubtext: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
  },
  actionsContainer: {
    marginTop: 8,
  },
  playAgainButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  playAgainButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  homeButton: {
    backgroundColor: '#666',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  homeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

