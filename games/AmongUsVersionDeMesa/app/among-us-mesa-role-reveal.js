import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAmongUsMesaStore } from '../store/amongUsMesaStore';
import { AmongUsMesaRoleRevealModal } from '../components/AmongUsMesaRoleRevealModal';
import { MAP_ROOMS } from '../constants/AmongUsMesaGameSettings';

export const AmongUsMesaRoleReveal = ({ navigation, playerId }) => {
  const [modalVisible, setModalVisible] = useState(true);
  const [roleRevealed, setRoleRevealed] = useState(false);
  
  const players = useAmongUsMesaStore((state) => state.players);
  const currentPlayer = players.find(p => p.id === playerId) || players[0];
  const revealRoleToPlayer = useAmongUsMesaStore((state) => state.revealRoleToPlayer);
  const startPlaying = useAmongUsMesaStore((state) => state.startPlaying);
  
  const roleInfo = currentPlayer ? revealRoleToPlayer(playerId) : null;
  
  useEffect(() => {
    if (roleInfo) {
      setRoleRevealed(true);
    }
  }, [roleInfo]);
  
  const handleCloseModal = () => {
    setModalVisible(false);
  };
  
  const handleStartPlaying = () => {
    startPlaying();
    navigation?.navigate('game');
  };
  
  if (!roleInfo) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Cargando...</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <AmongUsMesaRoleRevealModal
        visible={modalVisible}
        role={roleInfo.role}
        onClose={handleCloseModal}
      />
      
      {!modalVisible && (
        <View style={styles.content}>
          <Text style={styles.title}>Tu Rol</Text>
          
          <View style={[styles.roleCard, roleInfo.role === 'impostor' ? styles.impostorCard : styles.crewmateCard]}>
            <Text style={styles.roleText}>
              {roleInfo.role === 'impostor' ? '👹 IMPOSTOR' : '👨‍🚀 TRIPULANTE'}
            </Text>
            
            {roleInfo.role === 'impostor' ? (
              <View style={styles.instructions}>
                <Text style={styles.instructionTitle}>🎯 Tu Objetivo:</Text>
                <Text style={styles.instructionText}>
                  • Elimina a los tripulantes sin ser descubierto{'\n'}
                  • Puedes sabotear sistemas para crear distracciones{'\n'}
                  • Puedes usar conductos de ventilación para moverte rápidamente{'\n'}
                  • Gana si el número de impostores es igual o mayor al de tripulantes{'\n\n'}
                  <Text style={styles.instructionBold}>💡 Estrategia:</Text>{'\n'}
                  • Sé cuidadoso con tus eliminaciones{'\n'}
                  • Crea alibis creíbles durante las reuniones{'\n'}
                  • Usa los sabotajes sabiamente para dividir a los tripulantes{'\n'}
                  • Observa el comportamiento de otros jugadores
                </Text>
              </View>
            ) : (
              <View style={styles.instructions}>
                <Text style={styles.instructionTitle}>🎯 Tu Objetivo:</Text>
                <Text style={styles.instructionText}>
                  • Completa todas tus tareas{'\n'}
                  • Identifica y expulsa a los impostores{'\n'}
                  • Reporta cuerpos y participa en reuniones{'\n'}
                  • Gana si completas todas las tareas o expulsas a todos los impostores{'\n\n'}
                  <Text style={styles.instructionBold}>💡 Estrategia:</Text>{'\n'}
                  • Observa el comportamiento de otros jugadores{'\n'}
                  • Presta atención a las ubicaciones y movimientos{'\n'}
                  • Toma notas durante las reuniones{'\n'}
                  • Arregla los sabotajes rápidamente
                </Text>
                
                {roleInfo.tasks && roleInfo.tasks.length > 0 && (
                  <View style={styles.tasksPreview}>
                    <Text style={styles.tasksPreviewTitle}>
                      ✅ Tus Tareas ({roleInfo.tasks.length}):
                    </Text>
                    {roleInfo.tasks.slice(0, 5).map((task, index) => (
                      <View key={task.id} style={styles.taskPreviewRow}>
                        <Text style={styles.taskPreviewIcon}>{task.icon || '✅'}</Text>
                        <View style={styles.taskPreviewInfo}>
                          <Text style={styles.taskPreviewItem}>{task.name}</Text>
                          <Text style={styles.taskPreviewRoom}>
                            📍 {MAP_ROOMS.find(r => r.id === task.room)?.name || task.room}
                          </Text>
                        </View>
                      </View>
                    ))}
                    {roleInfo.tasks.length > 5 && (
                      <Text style={styles.taskPreviewItem}>
                        ... y {roleInfo.tasks.length - 5} tarea{roleInfo.tasks.length - 5 > 1 ? 's' : ''} más
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )}
          </View>
          
          <TouchableOpacity style={styles.startButton} onPress={handleStartPlaying}>
            <Text style={styles.startButtonText}>Continuar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 100,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
  },
  roleCard: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  impostorCard: {
    backgroundColor: '#d32f2f',
  },
  crewmateCard: {
    backgroundColor: '#1976d2',
  },
  roleText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
  },
  instructions: {
    marginTop: 20,
  },
  instructionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  instructionText: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
  },
  tasksPreview: {
    marginTop: 20,
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 10,
  },
  tasksPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  taskPreviewItem: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  taskPreviewRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  taskPreviewIcon: {
    fontSize: 20,
    marginRight: 10,
  },
  taskPreviewInfo: {
    flex: 1,
  },
  taskPreviewRoom: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  instructionBold: {
    fontWeight: 'bold',
  },
  startButton: {
    backgroundColor: '#4caf50',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

