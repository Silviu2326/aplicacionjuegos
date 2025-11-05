import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useBloodOnTheClocktowerStore } from '../store/bloodOnTheClocktowerStore';
import { BloodOnTheClocktowerGrimoireToken } from '../components/BloodOnTheClocktowerGrimoireToken';
import { BloodOnTheClocktowerNightPhaseManager } from '../components/BloodOnTheClocktowerNightPhaseManager';
import { ROLES } from '../constants/BloodOnTheClocktowerRoles';

export const BloodOnTheClocktowerStoryteller = ({ navigation, route }) => {
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showNightManager, setShowNightManager] = useState(false);
  
  const players = useBloodOnTheClocktowerStore((state) => state.players);
  const gameStatus = useBloodOnTheClocktowerStore((state) => state.gameStatus);
  const phase = useBloodOnTheClocktowerStore((state) => state.phase);
  const dayNumber = useBloodOnTheClocktowerStore((state) => state.dayNumber);
  const nightSequence = useBloodOnTheClocktowerStore((state) => state.nightSequence);
  const nightPhaseStep = useBloodOnTheClocktowerStore((state) => state.nightPhaseStep);
  const grimoire = useBloodOnTheClocktowerStore((state) => state.grimoire);
  const poisonedPlayers = useBloodOnTheClocktowerStore((state) => state.poisonedPlayers);
  const protectedPlayers = useBloodOnTheClocktowerStore((state) => state.protectedPlayers);
  const deadByNight = useBloodOnTheClocktowerStore((state) => state.deadByNight);
  const gameLog = useBloodOnTheClocktowerStore((state) => state.gameLog);
  
  const alivePlayers = players.filter(p => p.isAlive);
  const deadPlayers = players.filter(p => !p.isAlive);
  
  const getPlayerRole = useBloodOnTheClocktowerStore((state) => state.getPlayerRole);
  const advanceNightPhase = useBloodOnTheClocktowerStore((state) => state.advanceNightPhase);
  const startDay = useBloodOnTheClocktowerStore((state) => state.startDay);
  const startNight = useBloodOnTheClocktowerStore((state) => state.startNight);
  const killPlayer = useBloodOnTheClocktowerStore((state) => state.killPlayer);
  const protectPlayer = useBloodOnTheClocktowerStore((state) => state.protectPlayer);
  const poisonPlayer = useBloodOnTheClocktowerStore((state) => state.poisonPlayer);
  const executePlayer = useBloodOnTheClocktowerStore((state) => state.executePlayer);
  
  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
  };
  
  const handleNightActionComplete = (step) => {
    advanceNightPhase();
  };
  
  const handleNightPhaseComplete = () => {
    startDay();
    setShowNightManager(false);
  };
  
  const handleStartNight = () => {
    startNight();
    setShowNightManager(true);
  };
  
  if (showNightManager && (phase === 'night' || gameStatus === 'first-night')) {
    return (
      <BloodOnTheClocktowerNightPhaseManager
        nightSequence={nightSequence}
        currentStep={nightPhaseStep}
        onActionComplete={handleNightActionComplete}
        onPhaseComplete={handleNightPhaseComplete}
        isStoryteller={true}
      />
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Grimorio del Narrador</Text>
        <View style={styles.phaseInfo}>
          <Text style={styles.phaseText}>
            {phase === 'day' ? `Día ${dayNumber}` : phase === 'night' ? 'Noche' : gameStatus === 'first-night' ? 'Primera Noche' : 'Setup'}
          </Text>
        </View>
      </View>
      
      <ScrollView style={styles.grimoireSection}>
        <Text style={styles.sectionTitle}>Jugadores</Text>
        <View style={styles.tokensGrid}>
          {players.map((player) => {
            const role = getPlayerRole(player.id);
            const roleKey = player.roleId?.toUpperCase().replace(/-/g, '_');
            const roleData = ROLES[roleKey] || role;
            
            // Tokens del grimorio (información del Narrador)
            const tokens = [];
            if (player.isDead) tokens.push('dead');
            if (poisonedPlayers.includes(player.id)) tokens.push('poisoned');
            if (protectedPlayers.includes(player.id)) tokens.push('protected');
            if (deadByNight.includes(player.id)) tokens.push('dead');
            
            return (
              <BloodOnTheClocktowerGrimoireToken
                key={player.id}
                player={player}
                role={roleData}
                tokens={tokens}
                onPress={() => handlePlayerPress(player)}
                isSelected={selectedPlayer?.id === player.id}
              />
            );
          })}
        </View>
        
        {selectedPlayer && (
          <View style={styles.selectedPlayerInfo}>
            <View style={styles.selectedPlayerHeader}>
              <Text style={styles.selectedPlayerTitle}>
                {selectedPlayer.name}
              </Text>
              <View style={styles.selectedPlayerStatus}>
                {selectedPlayer.isAlive ? (
                  <Text style={styles.aliveBadge}>✓ Vivo</Text>
                ) : (
                  <Text style={styles.deadBadge}>💀 Muerto</Text>
                )}
              </View>
            </View>
            
            <Text style={styles.selectedPlayerRole}>
              {getPlayerRole(selectedPlayer.id)?.name || 'Sin rol'}
            </Text>
            
            <View style={styles.playerTokensInfo}>
              <Text style={styles.tokensTitle}>Estado:</Text>
              <View style={styles.tokensList}>
                {poisonedPlayers.includes(selectedPlayer.id) && (
                  <View style={styles.tokenBadge}>
                    <Text style={styles.tokenText}>☠️ Envenenado</Text>
                  </View>
                )}
                {protectedPlayers.includes(selectedPlayer.id) && (
                  <View style={styles.tokenBadge}>
                    <Text style={styles.tokenText}>🛡️ Protegido</Text>
                  </View>
                )}
                {deadByNight.includes(selectedPlayer.id) && (
                  <View style={styles.tokenBadge}>
                    <Text style={styles.tokenText}>💀 Muerto esta noche</Text>
                  </View>
                )}
                {!poisonedPlayers.includes(selectedPlayer.id) && 
                 !protectedPlayers.includes(selectedPlayer.id) && 
                 !deadByNight.includes(selectedPlayer.id) && (
                  <Text style={styles.noTokens}>Sin modificadores</Text>
                )}
              </View>
            </View>
            
            <View style={styles.playerActions}>
              {!selectedPlayer.isDead && (
                <>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.killButton]}
                    onPress={() => {
                      killPlayer(selectedPlayer.id);
                      setSelectedPlayer(null);
                    }}
                  >
                    <Text style={styles.actionButtonText}>💀 Matar</Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.actionButton, 
                      styles.protectButton,
                      protectedPlayers.includes(selectedPlayer.id) && styles.activeAction
                    ]}
                    onPress={() => {
                      protectPlayer(selectedPlayer.id);
                    }}
                  >
                    <Text style={styles.actionButtonText}>
                      {protectedPlayers.includes(selectedPlayer.id) ? '🛡️ Protegido' : '🛡️ Proteger'}
                    </Text>
                  </TouchableOpacity>
                  
                  <TouchableOpacity
                    style={[
                      styles.actionButton, 
                      styles.poisonButton,
                      poisonedPlayers.includes(selectedPlayer.id) && styles.activeAction
                    ]}
                    onPress={() => {
                      poisonPlayer(selectedPlayer.id);
                    }}
                  >
                    <Text style={styles.actionButtonText}>
                      {poisonedPlayers.includes(selectedPlayer.id) ? '☠️ Envenenado' : '☠️ Envenenar'}
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>
        )}
        
        <View style={styles.grimoireStatsSection}>
          <Text style={styles.grimoireStatsTitle}>📊 Resumen del Grimorio</Text>
          <View style={styles.grimoireStatsGrid}>
            <View style={styles.grimoireStatCard}>
              <Text style={styles.grimoireStatNumber}>{alivePlayers.length}</Text>
              <Text style={styles.grimoireStatLabel}>Jugadores Vivos</Text>
            </View>
            <View style={styles.grimoireStatCard}>
              <Text style={styles.grimoireStatNumber}>{deadPlayers.length}</Text>
              <Text style={styles.grimoireStatLabel}>Muertos</Text>
            </View>
            <View style={styles.grimoireStatCard}>
              <Text style={styles.grimoireStatNumber}>{protectedPlayers.length}</Text>
              <Text style={styles.grimoireStatLabel}>Protegidos</Text>
            </View>
            <View style={styles.grimoireStatCard}>
              <Text style={styles.grimoireStatNumber}>{poisonedPlayers.length}</Text>
              <Text style={styles.grimoireStatLabel}>Envenenados</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.controlsSection}>
        {gameStatus === 'first-night' && (
          <TouchableOpacity style={styles.controlButton} onPress={handleStartNight}>
            <Text style={styles.controlButtonText}>Iniciar Primera Noche</Text>
          </TouchableOpacity>
        )}
        
        {phase === 'day' && (
          <TouchableOpacity style={styles.controlButton} onPress={handleStartNight}>
            <Text style={styles.controlButtonText}>Iniciar Noche</Text>
          </TouchableOpacity>
        )}
        
        {phase === 'night' && !showNightManager && (
          <TouchableOpacity style={styles.controlButton} onPress={() => setShowNightManager(true)}>
            <Text style={styles.controlButtonText}>Continuar Noche</Text>
          </TouchableOpacity>
        )}
        
        <TouchableOpacity
          style={[styles.controlButton, styles.gameButton]}
          onPress={() => navigation?.navigate('game')}
        >
          <Text style={styles.controlButtonText}>Ir a Vista de Juego</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
  },
  phaseInfo: {
    backgroundColor: '#16213e',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  phaseText: {
    fontSize: 18,
    color: '#ffa500',
    fontWeight: 'bold',
  },
  grimoireSection: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  tokensGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 20,
  },
  selectedPlayerInfo: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  selectedPlayerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  selectedPlayerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    flex: 1,
  },
  selectedPlayerStatus: {
    marginLeft: 10,
  },
  aliveBadge: {
    backgroundColor: '#4caf50',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  deadBadge: {
    backgroundColor: '#f44336',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  selectedPlayerRole: {
    fontSize: 16,
    color: '#4caf50',
    marginBottom: 15,
    fontWeight: '600',
  },
  playerTokensInfo: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  tokensTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  tokensList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tokenBadge: {
    backgroundColor: '#16213e',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  tokenText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  noTokens: {
    fontSize: 12,
    color: '#aaa',
    fontStyle: 'italic',
  },
  activeAction: {
    opacity: 0.7,
    borderWidth: 2,
    borderColor: '#fff',
  },
  grimoireStatsSection: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
  },
  grimoireStatsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  grimoireStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 10,
  },
  grimoireStatCard: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 90,
  },
  grimoireStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffa500',
    marginBottom: 4,
  },
  grimoireStatLabel: {
    fontSize: 11,
    color: '#aaa',
    textAlign: 'center',
  },
  playerActions: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  killButton: {
    backgroundColor: '#f44336',
  },
  protectButton: {
    backgroundColor: '#4caf50',
  },
  poisonButton: {
    backgroundColor: '#9c27b0',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  controlsSection: {
    gap: 10,
  },
  controlButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  gameButton: {
    backgroundColor: '#4caf50',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

