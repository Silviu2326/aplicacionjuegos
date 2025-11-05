import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';
import { PHOTOGRAPHER_TIPS, OBJECT_EXAMPLES } from '../constants/detectiveObjetosConfig';

export const DetectiveObjetosSetup = ({ navigation }) => {
  const [imageUri, setImageUri] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  
  const getCurrentPhotographer = useDetectiveObjetosStore((state) => state.getCurrentPhotographer);
  const setCurrentImage = useDetectiveObjetosStore((state) => state.setCurrentImage);
  const currentRound = useDetectiveObjetosStore((state) => state.currentRound);
  const players = useDetectiveObjetosStore((state) => state.players);
  const maxRounds = useDetectiveObjetosStore((state) => state.maxRounds);
  
  const photographer = getCurrentPhotographer();
  
  const requestCameraPermission = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        'Permisos necesarios',
        'Se necesita acceso a la cámara para tomar fotos.',
        [{ text: 'OK' }]
      );
      return false;
    }
    return true;
  };
  
  const takePhoto = async () => {
    const hasPermission = await requestCameraPermission();
    if (!hasPermission) return;
    
    setIsLoading(true);
    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo tomar la foto. Intenta nuevamente.');
      console.error('Error taking photo:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const pickImage = async () => {
    setIsLoading(true);
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });
      
      if (!result.canceled && result.assets && result.assets.length > 0) {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert('Error', 'No se pudo seleccionar la imagen. Intenta nuevamente.');
      console.error('Error picking image:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleConfirmPhoto = () => {
    if (!imageUri) {
      Alert.alert('Error', 'Por favor toma o selecciona una foto primero.');
      return;
    }
    
    setCurrentImage(imageUri);
    if (navigation) {
      navigation.navigate('detective-objetos-game');
    }
  };
  
  const handleRetakePhoto = () => {
    setImageUri(null);
  };
  
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>📷 Ronda {currentRound}{maxRounds ? ` / ${maxRounds}` : ''}</Text>
        <Text style={styles.subtitle}>
          Fotógrafo: {photographer?.name || 'N/A'}
        </Text>
        <View style={styles.headerInfo}>
          <Text style={styles.headerInfoText}>
            {players.length} jugador{players.length !== 1 ? 'es' : ''} • {players.length - 1} detective{players.length - 1 !== 1 ? 's' : ''}
          </Text>
        </View>
      </View>

      {/* Botones de ayuda */}
      <View style={styles.helpButtons}>
        <TouchableOpacity
          style={[styles.helpButton, showTips && styles.helpButtonActive]}
          onPress={() => setShowTips(!showTips)}
        >
          <Text style={styles.helpButtonText}>💡 Consejos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.helpButton, showExamples && styles.helpButtonActive]}
          onPress={() => setShowExamples(!showExamples)}
        >
          <Text style={styles.helpButtonText}>🎯 Ejemplos</Text>
        </TouchableOpacity>
      </View>

      {/* Consejos */}
      {showTips && (
        <View style={styles.helpSection}>
          <Text style={styles.helpSectionTitle}>💡 Consejos para el Fotógrafo</Text>
          {PHOTOGRAPHER_TIPS.map((tip, index) => (
            <View key={index} style={styles.tipItem}>
              <Text style={styles.tipBullet}>•</Text>
              <Text style={styles.tipText}>{tip}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Ejemplos */}
      {showExamples && (
        <View style={styles.helpSection}>
          <Text style={styles.helpSectionTitle}>🎯 Ejemplos de Objetos</Text>
          <Text style={styles.examplesHint}>
            Algunos objetos que puedes fotografiar:
          </Text>
          {OBJECT_EXAMPLES.slice(0, 4).map((category, index) => (
            <View key={index} style={styles.categoryContainer}>
              <Text style={styles.categoryTitle}>{category.category}</Text>
              <View style={styles.examplesGrid}>
                {category.examples.slice(0, 4).map((example, exIndex) => (
                  <View key={exIndex} style={styles.exampleTag}>
                    <Text style={styles.exampleText}>{example}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>
      )}
      
      <View style={styles.content}>
        <Text style={styles.instruction}>
          📸 Toma una foto muy de cerca (macro) de un objeto común. La imagen debe ser lo más abstracta posible al inicio.
        </Text>
        <Text style={styles.instructionHint}>
          Cuanto más cerca y abstracta sea la foto, más difícil será para los detectives adivinarlo.
        </Text>
        
        {imageUri ? (
          <View style={styles.imagePreviewContainer}>
            <Image source={{ uri: imageUri }} style={styles.imagePreview} />
            <View style={styles.imageActions}>
              <TouchableOpacity
                style={[styles.button, styles.retakeButton]}
                onPress={handleRetakePhoto}
              >
                <Text style={styles.buttonText}>Tomar otra foto</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={handleConfirmPhoto}
              >
                <Text style={styles.buttonText}>Confirmar foto</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={styles.photoOptions}>
            <TouchableOpacity
              style={[styles.button, styles.photoButton, isLoading && styles.buttonDisabled]}
              onPress={takePhoto}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>📷 Tomar foto</Text>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.button, styles.photoButton, isLoading && styles.buttonDisabled]}
              onPress={pickImage}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>🖼️ Seleccionar de galería</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#2196f3',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  instruction: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  photoOptions: {
    flex: 1,
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  photoButton: {
    backgroundColor: '#2196f3',
  },
  confirmButton: {
    backgroundColor: '#4caf50',
  },
  retakeButton: {
    backgroundColor: '#ff9800',
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  imagePreviewContainer: {
    flex: 1,
  },
  imagePreview: {
    width: '100%',
    height: 400,
    borderRadius: 10,
    marginBottom: 20,
  },
  imageActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    gap: 15,
  },
  headerInfo: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  headerInfoText: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
  helpButtons: {
    flexDirection: 'row',
    padding: 10,
    gap: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  helpButton: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  helpButtonActive: {
    backgroundColor: '#e3f2fd',
    borderColor: '#2196f3',
  },
  helpButtonText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#333',
  },
  helpSection: {
    backgroundColor: '#fff',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  helpSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'flex-start',
  },
  tipBullet: {
    fontSize: 16,
    color: '#2196f3',
    marginRight: 8,
    fontWeight: 'bold',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  examplesHint: {
    fontSize: 13,
    color: '#666',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  categoryContainer: {
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2196f3',
    marginBottom: 8,
  },
  examplesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  exampleTag: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#bbdefb',
  },
  exampleText: {
    fontSize: 12,
    color: '#1976d2',
  },
  instructionHint: {
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default DetectiveObjetosSetup;

