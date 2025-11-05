import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useOrdenaLaHistoriaStore } from '../store/ordenaLaHistoriaStore';
import { useRouter } from 'expo-router';
import { STORY_PACKAGES } from '../constants/ordenaLaHistoriaStories';

export const OrdenaLaHistoriaIndex = ({ navigation }) => {
  const router = useRouter();
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isJoining, setIsJoining] = useState(false);

  const createGame = useOrdenaLaHistoriaStore((state) => state.createGame);
  const joinGame = useOrdenaLaHistoriaStore((state) => state.joinGame);
  const currentGameCode = useOrdenaLaHistoriaStore((state) => state.gameCode);

  const handleCreateGame = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }

    if (!selectedPackage) {
      Alert.alert('Error', 'Por favor selecciona un paquete de historias');
      return;
    }

    const code = createGame(playerName.trim(), selectedPackage);
    setPlayerName('');

    Alert.alert('Partida creada', `Código de partida: ${code}\n\nComparte este código con tus amigos.`, [
      {
        text: 'OK',
        onPress: () => {
          if (navigation && navigation.navigate) {
            navigation.navigate('ordena-la-historia-lobby', { gameCode: code });
          } else {
            router.push(`/games/OrdenaLaHistoria/app/ordena-la-historia-lobby/${code}`);
          }
        },
      },
    ]);
  };

  const handleJoinGame = () => {
    if (playerName.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return;
    }

    if (gameCode.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa el código de la partida');
      return;
    }

    const playerId = joinGame(gameCode.trim().toUpperCase(), playerName.trim());
    if (playerId) {
      setPlayerName('');
      setGameCode('');
      setIsJoining(false);
      if (navigation && navigation.navigate) {
        navigation.navigate('ordena-la-historia-lobby', { gameCode: gameCode.trim().toUpperCase() });
      } else {
        router.push(`/games/OrdenaLaHistoria/app/ordena-la-historia-lobby/${gameCode.trim().toUpperCase()}`);
      }
    } else {
      Alert.alert('Error', 'No se pudo unir a la partida. Verifica el código.');
    }
  };

  if (currentGameCode) {
    // Si ya hay un código de partida, redirigir al lobby
    if (navigation && navigation.navigate) {
      navigation.navigate('ordena-la-historia-lobby', { gameCode: currentGameCode });
    } else {
      router.push(`/games/OrdenaLaHistoria/app/ordena-la-historia-lobby/${currentGameCode}`);
    }
    return null;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Ordena la Historia</Text>
        <Text style={styles.subtitle}>
          Reconstruye historias divididas en fragmentos mediante comunicación y deducción
        </Text>

        {!isJoining ? (
          <>
            <Text style={styles.sectionTitle}>Crear Partida</Text>

            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              value={playerName}
              onChangeText={setPlayerName}
            />

            <Text style={styles.label}>Selecciona un paquete de historias:</Text>
            {Object.values(STORY_PACKAGES).map((packageData) => (
              <TouchableOpacity
                key={packageData.id}
                style={[
                  styles.packageButton,
                  selectedPackage === packageData.id && styles.packageButtonSelected,
                ]}
                onPress={() => setSelectedPackage(packageData.id)}
              >
                <Text
                  style={[
                    styles.packageButtonText,
                    selectedPackage === packageData.id && styles.packageButtonTextSelected,
                  ]}
                >
                  {packageData.name}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity style={styles.button} onPress={handleCreateGame}>
              <Text style={styles.buttonText}>Crear Partida</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setIsJoining(true)}
            >
              <Text style={styles.linkButtonText}>O unirse a una partida existente</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <Text style={styles.sectionTitle}>Unirse a Partida</Text>

            <TextInput
              style={styles.input}
              placeholder="Tu nombre"
              value={playerName}
              onChangeText={setPlayerName}
            />

            <TextInput
              style={styles.input}
              placeholder="Código de partida"
              value={gameCode}
              onChangeText={setGameCode}
              autoCapitalize="characters"
            />

            <TouchableOpacity style={styles.button} onPress={handleJoinGame}>
              <Text style={styles.buttonText}>Unirse</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.linkButton}
              onPress={() => setIsJoining(false)}
            >
              <Text style={styles.linkButtonText}>O crear una nueva partida</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 12,
    marginTop: 8,
  },
  packageButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#E0E0E0',
  },
  packageButtonSelected: {
    borderColor: '#4ECDC4',
    backgroundColor: '#E8F8F7',
  },
  packageButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
    textAlign: 'center',
  },
  packageButtonTextSelected: {
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4ECDC4',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkButton: {
    padding: 12,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#4ECDC4',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});
