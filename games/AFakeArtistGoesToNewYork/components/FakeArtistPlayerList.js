import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export const FakeArtistPlayerList = ({ 
  players, 
  onRemovePlayer, 
  currentTurnIndex,
  currentMasterIndex,
  showTurnIndicator = false 
}) => {
  const renderPlayer = ({ item, index }) => {
    const isCurrentTurn = showTurnIndicator && index === currentTurnIndex;
    const isMaster = index === currentMasterIndex;
    
    return (
      <View style={[styles.playerItem, isCurrentTurn && styles.currentPlayerItem]}>
        <View style={styles.playerInfo}>
          {isMaster && (
            <Text style={styles.masterBadge}>👑</Text>
          )}
          {isCurrentTurn && (
            <Text style={styles.turnBadge}>✏️</Text>
          )}
          <Text style={[styles.playerName, isCurrentTurn && styles.currentPlayerName]}>
            {item.name}
          </Text>
        </View>
        {onRemovePlayer && (
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => onRemovePlayer(item.id)}
          >
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  currentPlayerItem: {
    backgroundColor: '#E8F5E9',
    borderColor: '#4CAF50',
    borderWidth: 2,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  masterBadge: {
    fontSize: 20,
    marginRight: 8,
  },
  turnBadge: {
    fontSize: 20,
    marginRight: 8,
  },
  playerName: {
    fontSize: 16,
    color: '#333',
  },
  currentPlayerName: {
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  removeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

