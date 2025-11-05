import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export const InterrogatorioPlayerInput = ({ onAddPlayer, maxPlayers, currentCount }) => {
  const [playerName, setPlayerName] = useState('');

  const handleAdd = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa un nombre');
      return;
    }

    if (currentCount >= maxPlayers) {
      Alert.alert('Error', `Máximo ${maxPlayers} jugadores`);
      return;
    }

    onAddPlayer(playerName.trim());
    setPlayerName('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nombre del jugador"
        value={playerName}
        onChangeText={setPlayerName}
        onSubmitEditing={handleAdd}
        returnKeyType="done"
      />
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Agregar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#ff5722',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default InterrogatorioPlayerInput;

