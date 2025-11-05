import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useFeedTheKrakenStore } from '../store/feedTheKrakenStore';
import { ROLE_INFO, STRATEGY_TIPS } from '../constants/FeedTheKrakenGameData';

export const FeedTheKrakenRoleReveal = ({ navigation, route }) => {
  const [showStrategy, setShowStrategy] = useState(false);
  const { players, currentPlayerId, continueAfterRoleReveal } = useFeedTheKrakenStore();
  
  // Por ahora, mostrar el rol del primer jugador (en producción, esto sería dinámico)
  const player = players.find(p => p.id === currentPlayerId) || players[0];
  const roleInfo = player?.role ? ROLE_INFO[player.role] : null;
  const strategyTips = player?.role ? STRATEGY_TIPS[player.role] || [] : [];

  const handleContinue = () => {
    continueAfterRoleReveal();
    if (navigation && navigation.navigate) {
      navigation.navigate('feed-the-kraken-game-screen');
    }
  };

  if (!player || !roleInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No se pudo cargar el rol</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Tu Rol</Text>
        
        <View style={styles.roleCard}>
          <Text style={styles.roleIcon}>{roleInfo.icon}</Text>
          <Text style={styles.roleName}>{roleInfo.name}</Text>
          <View style={[styles.roleColorBar, { backgroundColor: roleInfo.color }]} />
          <Text style={styles.roleDescription}>{roleInfo.description}</Text>
          <Text style={styles.playerName}>Jugador: {player.name}</Text>
        </View>

        <View style={styles.objectivesSection}>
          <Text style={styles.sectionTitle}>Objetivos</Text>
          {roleInfo.objectives && roleInfo.objectives.map((objective, index) => (
            <View key={index} style={styles.objectiveItem}>
              <Text style={styles.objectiveText}>✓ {objective}</Text>
            </View>
          ))}
        </View>

        <View style={styles.abilitiesSection}>
          <Text style={styles.sectionTitle}>Habilidades</Text>
          {roleInfo.abilities && roleInfo.abilities.map((ability, index) => (
            <View key={index} style={styles.abilityItem}>
              <Text style={styles.abilityText}>• {ability}</Text>
            </View>
          ))}
        </View>

        <View style={styles.winConditionSection}>
          <Text style={styles.sectionTitle}>Condición de Victoria</Text>
          <Text style={styles.winConditionText}>{roleInfo.winCondition}</Text>
        </View>

        <TouchableOpacity 
          style={styles.strategyButton} 
          onPress={() => setShowStrategy(!showStrategy)}
        >
          <Text style={styles.strategyButtonText}>
            {showStrategy ? '📖 Ocultar' : '📖 Mostrar'} Estrategia
          </Text>
        </TouchableOpacity>

        {showStrategy && strategyTips.length > 0 && (
          <View style={styles.strategySection}>
            <Text style={styles.sectionTitle}>Consejos Estratégicos</Text>
            {strategyTips.map((tip, index) => (
              <View key={index} style={styles.strategyItem}>
                <Text style={styles.strategyText}>💡 {tip}</Text>
              </View>
            ))}
          </View>
        )}

        <Text style={styles.warningText}>
          ⚠️ Mantén tu rol en secreto. No compartas esta información con otros jugadores.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continuar al Juego</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 30,
    textAlign: 'center',
  },
  roleCard: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 30,
    marginBottom: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  roleIcon: {
    fontSize: 80,
    marginBottom: 15,
  },
  roleName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  roleColorBar: {
    width: '100%',
    height: 4,
    borderRadius: 2,
    marginBottom: 20,
  },
  roleDescription: {
    fontSize: 16,
    color: '#ccc',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  playerName: {
    fontSize: 14,
    color: '#888',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a90e2',
    marginBottom: 15,
    textAlign: 'center',
  },
  objectivesSection: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
  },
  objectiveItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  objectiveText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  abilitiesSection: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
  },
  abilityItem: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  abilityText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  winConditionSection: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
    borderWidth: 2,
    borderColor: '#4a90e2',
  },
  winConditionText: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    lineHeight: 22,
  },
  strategyButton: {
    backgroundColor: '#16213e',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#f5a623',
  },
  strategyButtonText: {
    color: '#f5a623',
    fontSize: 16,
    fontWeight: 'bold',
  },
  strategySection: {
    backgroundColor: '#16213e',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    width: '100%',
    maxWidth: 400,
    borderWidth: 1,
    borderColor: '#f5a623',
  },
  strategyItem: {
    marginBottom: 12,
    paddingLeft: 10,
  },
  strategyText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
  },
  warningText: {
    fontSize: 14,
    color: '#f5a623',
    textAlign: 'center',
    marginBottom: 30,
    paddingHorizontal: 20,
    lineHeight: 20,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 8,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#d32f2f',
    fontSize: 16,
  },
});

