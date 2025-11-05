import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { FeedTheKrakenBoard } from '../components/FeedTheKrakenBoard';
import { FeedTheKrakenPlayerList } from '../components/FeedTheKrakenPlayerList';
import { FeedTheKrakenStatusDisplay } from '../components/FeedTheKrakenStatusDisplay';
import { FeedTheKrakenActionModal } from '../components/FeedTheKrakenActionModal';
import { FeedTheKrakenNavigationCardSelector } from '../components/FeedTheKrakenNavigationCardSelector';
import { useFeedTheKrakenStore } from '../store/feedTheKrakenStore';

export const FeedTheKrakenGameScreen = ({ navigation, route }) => {
  const { 
    gameStatus, 
    winner, 
    players, 
    shipPosition,
    currentPhase,
    captainId,
    lieutenantId,
    navigatorId,
    currentTurn,
    gameEvents,
    playedCard,
  } = useFeedTheKrakenStore();

  const captain = players.find(p => p.id === captainId);
  const lieutenant = players.find(p => p.id === lieutenantId);
  const navigator = players.find(p => p.id === navigatorId);
  
  // Generar eventos falsos si no hay eventos reales
  const displayEvents = gameEvents.length > 0 ? gameEvents : [
    { type: 'turn_start', message: `Turno ${currentTurn} iniciado`, timestamp: Date.now() },
    { type: 'phase_change', message: `Fase: ${currentPhase}`, timestamp: Date.now() - 10000 },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Feed the Kraken</Text>
        
        <FeedTheKrakenStatusDisplay 
          currentPhase={currentPhase}
          captain={captain}
          lieutenant={lieutenant}
          navigator={navigator}
          shipPosition={shipPosition}
        />

        <FeedTheKrakenBoard shipPosition={shipPosition} />

        <FeedTheKrakenPlayerList 
          players={players}
          captainId={captainId}
          lieutenantId={lieutenantId}
          navigatorId={navigatorId}
        />

        {/* Historial de eventos */}
        <View style={styles.eventsContainer}>
          <Text style={styles.eventsTitle}>📜 Historial del Juego</Text>
          <ScrollView style={styles.eventsList} nestedScrollEnabled>
            {displayEvents.slice(-10).reverse().map((event, index) => (
              <View key={index} style={styles.eventItem}>
                <Text style={styles.eventMessage}>{event.message || event.type}</Text>
                {event.timestamp && (
                  <Text style={styles.eventTime}>
                    {new Date(event.timestamp).toLocaleTimeString()}
                  </Text>
                )}
              </View>
            ))}
            {displayEvents.length === 0 && (
              <Text style={styles.noEventsText}>No hay eventos aún</Text>
            )}
          </ScrollView>
        </View>

        {/* Información del turno actual */}
        <View style={styles.turnInfoContainer}>
          <Text style={styles.turnInfoTitle}>Turno Actual: {currentTurn}</Text>
          {playedCard && (
            <View style={styles.lastCardContainer}>
              <Text style={styles.lastCardLabel}>Última carta jugada:</Text>
              <Text style={styles.lastCardText}>
                {playedCard === 'blue' ? '🔵 Azul' : playedCard === 'yellow' ? '🟡 Amarilla' : '🐙 Kraken'}
              </Text>
            </View>
          )}
        </View>

        {winner && (
          <View style={styles.winnerContainer}>
            <Text style={styles.winnerTitle}>¡Victoria!</Text>
            <Text style={styles.winnerText}>
              {winner === 'sailors' && '⚓ Los Marineros han ganado'}
              {winner === 'pirates' && '🏴‍☠️ Los Piratas han ganado'}
              {winner === 'cult' && '🐙 El Culto del Kraken ha ganado'}
            </Text>
            <Text style={styles.winnerSubtext}>
              {winner === 'sailors' && 'El barco llegó a salvo a Bluewater Bay'}
              {winner === 'pirates' && 'El barco fue llevado a la Ensenada de los Corsarios'}
              {winner === 'cult' && 'El Kraken ha sido invocado desde las profundidades'}
            </Text>
          </View>
        )}
      </ScrollView>

      {/* Modales y selectores de acciones */}
      <FeedTheKrakenActionModal />
      <FeedTheKrakenNavigationCardSelector />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  winnerContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  winnerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
  },
  winnerText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  winnerSubtext: {
    fontSize: 14,
    color: '#ccc',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  eventsContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    maxHeight: 200,
  },
  eventsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  eventsList: {
    maxHeight: 150,
  },
  eventItem: {
    backgroundColor: '#0f1626',
    borderRadius: 6,
    padding: 10,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#4a90e2',
  },
  eventMessage: {
    fontSize: 13,
    color: '#fff',
    marginBottom: 3,
  },
  eventTime: {
    fontSize: 11,
    color: '#888',
  },
  noEventsText: {
    fontSize: 14,
    color: '#888',
    textAlign: 'center',
    fontStyle: 'italic',
    padding: 10,
  },
  turnInfoContainer: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#4a90e2',
  },
  turnInfoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 10,
    textAlign: 'center',
  },
  lastCardContainer: {
    backgroundColor: '#0f1626',
    borderRadius: 6,
    padding: 10,
    alignItems: 'center',
  },
  lastCardLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  lastCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});

