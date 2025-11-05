import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useOneNightWerewolfStore } from '../store/oneNightWerewolfStore';
import { OneNightWerewolfPlayerGrid } from '../components/OneNightWerewolfPlayerGrid';
import { GAME_CONFIG } from '../constants/OneNightWerewolfRoles';

export const OneNightWerewolfLobby = ({ navigation }) => {
  const players = useOneNightWerewolfStore((state) => state.players);
  const roomCode = useOneNightWerewolfStore((state) => state.roomCode);
  const hostId = useOneNightWerewolfStore((state) => state.hostId);
  
  const handleStartSetup = () => {
    if (navigation && navigation.navigate) {
      navigation.navigate('oneNightWerewolfSetup');
    }
  };
  
  const currentPlayer = players.find(p => p.id === hostId);
  const isReady = players.length >= GAME_CONFIG.MIN_PLAYERS;
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Sala de Espera</Text>
          <Text style={styles.subtitle}>
            Preparando la partida...
          </Text>
        </View>
        
        {roomCode && (
          <View style={styles.roomCodeContainer}>
            <Text style={styles.roomCodeLabel}>Código de Sala</Text>
            <Text style={styles.roomCode}>{roomCode}</Text>
            <View style={styles.roomCodeActions}>
              <Text style={styles.roomCodeHint}>
                Comparte este código con otros jugadores para que se unan a la partida
              </Text>
            </View>
          </View>
        )}
        
        <View style={styles.infoBox}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Jugadores:</Text>
            <Text style={styles.infoValue}>
              {players.length} / {GAME_CONFIG.MAX_PLAYERS}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Mínimo requerido:</Text>
            <Text style={styles.infoValue}>{GAME_CONFIG.MIN_PLAYERS} jugadores</Text>
          </View>
          {currentPlayer && (
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Anfitrión:</Text>
              <Text style={styles.infoValue}>{currentPlayer.name}</Text>
            </View>
          )}
        </View>
        
        <View style={styles.playersSection}>
          <Text style={styles.playersTitle}>Jugadores en la Sala</Text>
          {players.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>👥</Text>
              <Text style={styles.emptyStateText}>
                No hay jugadores en la sala
              </Text>
            </View>
          ) : (
            <>
              <OneNightWerewolfPlayerGrid selectable={false} />
              <View style={styles.playersList}>
                {players.map((player, index) => (
                  <View key={player.id} style={styles.playerListItem}>
                    <View style={styles.playerBadge}>
                      <Text style={styles.playerBadgeText}>{index + 1}</Text>
                    </View>
                    <Text style={styles.playerListItemName}>{player.name}</Text>
                    {player.id === hostId && (
                      <View style={styles.hostBadge}>
                        <Text style={styles.hostBadgeText}>Anfitrión</Text>
                      </View>
                    )}
                  </View>
                ))}
              </View>
            </>
          )}
        </View>
        
        <View style={styles.statusContainer}>
          {isReady ? (
            <View style={styles.readyStatus}>
              <Text style={styles.readyIcon}>✅</Text>
              <Text style={styles.readyText}>
                La sala está lista para comenzar
              </Text>
            </View>
          ) : (
            <View style={styles.waitingStatus}>
              <Text style={styles.waitingIcon}>⏳</Text>
              <Text style={styles.waitingText}>
                Esperando más jugadores... ({GAME_CONFIG.MIN_PLAYERS - players.length} faltante{GAME_CONFIG.MIN_PLAYERS - players.length > 1 ? 's' : ''})
              </Text>
            </View>
          )}
        </View>
        
        <TouchableOpacity
          style={[
            styles.setupButton,
            !isReady && styles.setupButtonDisabled,
          ]}
          onPress={handleStartSetup}
          disabled={!isReady}
        >
          <Text style={styles.setupButtonText}>Configurar Partida</Text>
          <Text style={styles.setupButtonSubtext}>
            Seleccionar roles y comenzar
          </Text>
        </TouchableOpacity>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>💡 Consejos</Text>
          <Text style={styles.tipText}>
            • El juego funciona mejor con 5-8 jugadores
          </Text>
          <Text style={styles.tipText}>
            • Cada jugador recibirá un rol secreto al inicio
          </Text>
          <Text style={styles.tipText}>
            • Durante la noche, algunos roles actuarán en secreto
          </Text>
          <Text style={styles.tipText}>
            • Después tendrán 5 minutos para discutir y votar
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  header: {
    marginBottom: 24,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  roomCodeContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#2196F3',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  roomCodeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    fontWeight: '600',
  },
  roomCode: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 6,
    marginBottom: 12,
  },
  roomCodeActions: {
    marginTop: 8,
  },
  roomCodeHint: {
    fontSize: 12,
    color: '#999',
    textAlign: 'center',
    lineHeight: 18,
  },
  infoBox: {
    backgroundColor: '#E3F2FD',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#2196F3',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 14,
    color: '#1976D2',
    fontWeight: 'bold',
  },
  playersSection: {
    marginBottom: 24,
  },
  playersTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  playersList: {
    marginTop: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
  },
  playerListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  playerBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  playerBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  playerListItemName: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    fontWeight: '500',
  },
  hostBadge: {
    backgroundColor: '#FF9800',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  hostBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  emptyState: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  statusContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  readyStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readyIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  readyText: {
    fontSize: 16,
    color: '#4CAF50',
    fontWeight: '600',
  },
  waitingStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  waitingIcon: {
    fontSize: 24,
    marginRight: 8,
  },
  waitingText: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: '600',
  },
  setupButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  setupButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  setupButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  setupButtonSubtext: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.9,
  },
  tipsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#333',
  },
  tipText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

