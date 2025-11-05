import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useHombreLoboCastronegroStore } from '../store/hombreLoboCastronegroStore';
import { HombreLoboCastronegroPlayerGrid } from '../components/HombreLoboCastronegroPlayerGrid';
import { HombreLoboCastronegroRoleCard } from '../components/HombreLoboCastronegroRoleCard';

export const HombreLoboCastronegroLobby = ({ navigation, route }) => {
  const playerId = route?.params?.playerId;
  const [showRoleModal, setShowRoleModal] = useState(false);
  
  const players = useHombreLoboCastronegroStore((state) => state.players);
  const gameStatus = useHombreLoboCastronegroStore((state) => state.gameStatus);
  const assignedRoles = useHombreLoboCastronegroStore((state) => state.assignedRoles);
  const assignRoles = useHombreLoboCastronegroStore((state) => state.assignRoles);
  
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const playerRoleId = currentPlayer ? assignedRoles[currentPlayer.id] : null;
  
  useEffect(() => {
    if (gameStatus === 'setup' && playerRoleId) {
      setShowRoleModal(true);
    }
  }, [gameStatus, playerRoleId]);
  
  const handleContinue = () => {
    if (gameStatus === 'setup') {
      assignRoles();
    }
    
    if (gameStatus === 'first_night' || gameStatus === 'night' || gameStatus === 'day') {
      navigation?.navigate('hombre-lobo-castronegro-partida');
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>El Hombre Lobo de Castronegro</Text>
      
      {gameStatus === 'setup' && (
        <View style={styles.setupSection}>
          <Text style={styles.setupTitle}>🎮 Configuración del Juego</Text>
          <Text style={styles.setupText}>
            Los roles han sido asignados en secreto. Revisa tu rol cuidadosamente y prepárate para la primera noche en Castronegro.
          </Text>
          <Text style={styles.setupSubtext}>
            ⚠️ No reveles tu rol a otros jugadores. Mantén tu identidad en secreto.
          </Text>
        </View>
      )}
      
      {gameStatus === 'first_night' && (
        <View style={styles.setupSection}>
          <Text style={styles.setupTitle}>🌙 Primera Noche</Text>
          <Text style={styles.setupText}>
            La luna llena se alza sobre Castronegro. La oscuridad envuelve la aldea y los roles especiales se activarán en breve.
          </Text>
          <Text style={styles.setupSubtext}>
            🔮 Algunos jugadores despertarán esta noche para realizar sus acciones especiales.
          </Text>
        </View>
      )}
      
      <View style={styles.playersSection}>
        <Text style={styles.playersTitle}>Jugadores ({players.length})</Text>
        <HombreLoboCastronegroPlayerGrid
          players={players}
          currentPlayerId={currentPlayer?.id}
        />
      </View>
      
      {currentPlayer && playerRoleId && (
        <TouchableOpacity
          style={styles.roleButton}
          onPress={() => setShowRoleModal(true)}
        >
          <Text style={styles.roleButtonText}>Ver Mi Rol</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continuar</Text>
      </TouchableOpacity>
      
      <HombreLoboCastronegroRoleCard
        visible={showRoleModal}
        onClose={() => setShowRoleModal(false)}
        roleId={playerRoleId}
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
  setupSubtext: {
    fontSize: 12,
    color: '#FFA500',
    lineHeight: 18,
    fontStyle: 'italic',
    marginTop: 5,
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

