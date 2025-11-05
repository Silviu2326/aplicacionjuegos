import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useBloodOnTheClocktowerStore } from '../store/bloodOnTheClocktowerStore';
import { BloodOnTheClocktowerPlayerGrid } from '../components/BloodOnTheClocktowerPlayerGrid';
import { BloodOnTheClocktowerRoleInfoModal } from '../components/BloodOnTheClocktowerRoleInfoModal';
import { getScriptById } from '../constants/BloodOnTheClocktowerScripts';
import { ROLES } from '../constants/BloodOnTheClocktowerRoles';

export const BloodOnTheClocktowerLobby = ({ navigation, route }) => {
  const playerId = route?.params?.playerId;
  const [showRoleModal, setShowRoleModal] = React.useState(false);
  
  const players = useBloodOnTheClocktowerStore((state) => state.players);
  const gameStatus = useBloodOnTheClocktowerStore((state) => state.gameStatus);
  const assignedRoles = useBloodOnTheClocktowerStore((state) => state.assignedRoles);
  const currentScript = useBloodOnTheClocktowerStore((state) => state.currentScript);
  const getPlayerRole = useBloodOnTheClocktowerStore((state) => state.getPlayerRole);
  
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const playerRole = currentPlayer ? getPlayerRole(currentPlayer.id) : null;
  const script = getScriptById(currentScript);
  
  // Obtener roles del guion para preview
  const allRolesInScript = [
    ...(script.townsfolk || []),
    ...(script.outsiders || []),
    ...(script.minions || []),
    ...(script.demon || []),
  ].map(roleId => {
    const roleKey = roleId.toUpperCase().replace(/-/g, '_');
    return ROLES[roleKey];
  }).filter(Boolean);
  
  const townsfolkCount = allRolesInScript.filter(r => r.team === 'townsfolk').length;
  const outsidersCount = allRolesInScript.filter(r => r.team === 'outsider').length;
  const minionsCount = allRolesInScript.filter(r => r.team === 'minion').length;
  const demonsCount = allRolesInScript.filter(r => r.team === 'demon').length;
  
  useEffect(() => {
    if (gameStatus === 'setup' || gameStatus === 'first-night') {
      // Mostrar rol al jugador
      if (currentPlayer && playerRole) {
        setShowRoleModal(true);
      }
    }
  }, [gameStatus, currentPlayer, playerRole]);
  
  const handleContinue = () => {
    if (gameStatus === 'setup' || gameStatus === 'first-night') {
      navigation?.navigate('storyteller');
    } else {
      navigation?.navigate('game');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blood on the Clocktower</Text>
      
      {gameStatus === 'setup' && (
        <View style={styles.setupSection}>
          <Text style={styles.setupTitle}>⚙️ Configuración del Juego</Text>
          <Text style={styles.setupText}>
            Los roles han sido asignados aleatoriamente. El Narrador está preparando la primera noche.
          </Text>
          <View style={styles.scriptInfo}>
            <Text style={styles.scriptLabel}>Guion activo: <Text style={styles.scriptName}>{script.name}</Text></Text>
            <View style={styles.roleDistribution}>
              <View style={styles.roleTypeItem}>
                <Text style={styles.roleTypeIcon}>👥</Text>
                <Text style={styles.roleTypeText}>{townsfolkCount} Aldeanos</Text>
              </View>
              <View style={styles.roleTypeItem}>
                <Text style={styles.roleTypeIcon}>🧙</Text>
                <Text style={styles.roleTypeText}>{outsidersCount} Forasteros</Text>
              </View>
              <View style={styles.roleTypeItem}>
                <Text style={styles.roleTypeIcon}>😈</Text>
                <Text style={styles.roleTypeText}>{minionsCount} Esbirros</Text>
              </View>
              <View style={styles.roleTypeItem}>
                <Text style={styles.roleTypeIcon}>👹</Text>
                <Text style={styles.roleTypeText}>{demonsCount} Demonio</Text>
              </View>
            </View>
          </View>
        </View>
      )}
      
      {gameStatus === 'first-night' && (
        <View style={styles.setupSection}>
          <Text style={styles.setupTitle}>🌙 Primera Noche</Text>
          <Text style={styles.setupText}>
            El Narrador está despertando a los jugadores para que usen sus habilidades especiales de la primera noche.
          </Text>
          <View style={styles.nightInfo}>
            <Text style={styles.nightHint}>
              ⚠️ Presta atención a la información que recibes, será crucial para la deducción.
            </Text>
          </View>
        </View>
      )}
      
      <View style={styles.playersSection}>
        <View style={styles.playersHeader}>
          <Text style={styles.playersTitle}>Jugadores ({players.length})</Text>
          <View style={styles.playersStatus}>
            <View style={styles.statusIndicator}>
              <View style={[styles.statusDot, { backgroundColor: '#4caf50' }]} />
              <Text style={styles.statusText}>{players.filter(p => p.isAlive).length} Vivos</Text>
            </View>
          </View>
        </View>
        <BloodOnTheClocktowerPlayerGrid
          players={players}
          currentPlayerId={currentPlayer?.id}
        />
      </View>

      {gameStatus === 'setup' && (
        <View style={styles.rolePreviewSection}>
          <Text style={styles.rolePreviewTitle}>📋 Roles Disponibles en el Guion</Text>
          <ScrollView style={styles.rolePreviewList} horizontal showsHorizontalScrollIndicator={false}>
            {allRolesInScript.slice(0, 8).map((role, index) => (
              <View key={index} style={styles.rolePreviewCard}>
                <Text style={styles.rolePreviewName} numberOfLines={1}>
                  {role.name}
                </Text>
                <Text style={styles.rolePreviewTeam}>
                  {role.team === 'townsfolk' ? '👥' : role.team === 'outsider' ? '🧙' : role.team === 'minion' ? '😈' : '👹'}
                </Text>
              </View>
            ))}
          </ScrollView>
          <Text style={styles.rolePreviewHint}>
            Estos son algunos de los roles que pueden estar en juego
          </Text>
        </View>
      )}
      
      {currentPlayer && playerRole && (
        <View style={styles.roleInfoSection}>
          <TouchableOpacity
            style={styles.roleButton}
            onPress={() => setShowRoleModal(true)}
          >
            <Text style={styles.roleButtonText}>👁️ Ver Mi Rol</Text>
          </TouchableOpacity>
          <View style={styles.roleHintCard}>
            <Text style={styles.roleHintText}>
              💡 Recuerda: Mantén tu rol en secreto. Solo tú y el Narrador conocen tu verdadera identidad.
            </Text>
          </View>
        </View>
      )}
      
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
      
      <BloodOnTheClocktowerRoleInfoModal
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        roleId={currentPlayer?.roleId}
        playerName={currentPlayer?.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  setupSection: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  setupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  setupText: {
    fontSize: 14,
    color: '#ccc',
    lineHeight: 20,
    marginBottom: 10,
  },
  scriptInfo: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
  },
  scriptLabel: {
    fontSize: 14,
    color: '#aaa',
    marginBottom: 10,
  },
  scriptName: {
    fontWeight: 'bold',
    color: '#ffa500',
  },
  roleDistribution: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  roleTypeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0f3460',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 8,
    minWidth: 120,
  },
  roleTypeIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  roleTypeText: {
    fontSize: 13,
    color: '#ddd',
    fontWeight: '600',
  },
  nightInfo: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#0f3460',
  },
  nightHint: {
    fontSize: 13,
    color: '#ffa500',
    fontStyle: 'italic',
    lineHeight: 18,
  },
  playersHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  playersStatus: {
    flexDirection: 'row',
    gap: 15,
  },
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  statusText: {
    fontSize: 12,
    color: '#aaa',
  },
  rolePreviewSection: {
    backgroundColor: '#16213e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  rolePreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  rolePreviewList: {
    marginBottom: 10,
  },
  rolePreviewCard: {
    backgroundColor: '#0f3460',
    padding: 12,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 90,
    alignItems: 'center',
  },
  rolePreviewName: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  rolePreviewTeam: {
    fontSize: 20,
  },
  rolePreviewHint: {
    fontSize: 11,
    color: '#aaa',
    fontStyle: 'italic',
    textAlign: 'center',
  },
  roleInfoSection: {
    marginBottom: 20,
  },
  roleHintCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#2196F3',
  },
  roleHintText: {
    fontSize: 12,
    color: '#ddd',
    lineHeight: 18,
  },
  playersSection: {
    flex: 1,
    marginBottom: 20,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  roleButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  roleButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

