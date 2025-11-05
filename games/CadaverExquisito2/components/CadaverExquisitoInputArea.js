import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useCadaverExquisitoStore } from '../store/cadaverExquisitoStore';
import { GAME_CONFIG } from '../constants/CadaverExquisitoGameConfig';

export const CadaverExquisitoInputArea = ({ onPhraseAdded }) => {
  const [phrase, setPhrase] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const lastPhrase = useCadaverExquisitoStore((state) => state.getLastVisiblePhrase());
  const initialTheme = useCadaverExquisitoStore((state) => state.initialTheme);
  const addPhrase = useCadaverExquisitoStore((state) => state.addPhrase);
  const currentPlayer = useCadaverExquisitoStore((state) => state.getCurrentPlayer());
  const phrases = useCadaverExquisitoStore((state) => state.phrases);
  
  const isFirstPhrase = !lastPhrase;

  useEffect(() => {
    const words = phrase.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    setCharCount(phrase.length);
  }, [phrase]);

  const handleSubmit = () => {
    const trimmedPhrase = phrase.trim();
    
    if (trimmedPhrase === '') {
      Alert.alert('⚠️ Frase vacía', 'Por favor escribe una frase antes de continuar');
      return;
    }
    
    if (trimmedPhrase.length < 3) {
      Alert.alert('⚠️ Frase muy corta', 'Tu frase debe tener al menos 3 caracteres');
      return;
    }
    
    if (wordCount < 2) {
      Alert.alert(
        '⚠️ Frase muy corta', 
        'Intenta escribir al menos 2 palabras para hacer la historia más interesante'
      );
      return;
    }
    
    if (trimmedPhrase.length > 500) {
      Alert.alert('⚠️ Frase muy larga', 'Tu frase no puede tener más de 500 caracteres');
      return;
    }
    
    const success = addPhrase(trimmedPhrase);
    if (success) {
      setPhrase('');
      setWordCount(0);
      setCharCount(0);
      if (onPhraseAdded) {
        onPhraseAdded();
      }
    } else {
      Alert.alert('Error', 'No se pudo agregar la frase. Intenta nuevamente.');
    }
  };

  const handleQuickStarter = (starter) => {
    setPhrase(starter);
    setShowSuggestions(false);
  };

  const getSuggestions = () => {
    if (!lastPhrase) {
      return GAME_CONFIG.QUICK_STARTERS.slice(0, 5);
    }
    
    // Sugerencias basadas en el contexto
    const suggestions = [
      'Entonces...',
      'De repente...',
      'Sin embargo...',
      'Mientras tanto...',
      'Pero entonces...',
      'Al día siguiente...',
      'Por eso...',
      'Como resultado...',
      'A pesar de eso...',
      'Finalmente...',
    ];
    
    return suggestions.slice(0, 5);
  };

  const getEncouragement = () => {
    if (wordCount === 0) {
      return '💡 Escribe tu continuación de la historia...';
    }
    if (wordCount < 3) {
      return '✨ Puedes hacerlo más interesante añadiendo más detalles...';
    }
    if (wordCount < 5) {
      return '👍 ¡Buen comienzo!';
    }
    if (wordCount < 10) {
      return '🌟 ¡Excelente!';
    }
    return '🎉 ¡Tu contribución es muy detallada!';
  };

  const getCharacterCountColor = () => {
    if (charCount === 0) return '#999';
    if (charCount < 100) return '#4CAF50';
    if (charCount < 300) return '#FF9800';
    return '#f44336';
  };

  return (
    <View style={styles.container}>
      <View style={styles.lastPhraseContainer}>
        <Text style={styles.lastPhraseLabel}>
          {isFirstPhrase ? '🎬 Inicia la historia:' : '📖 Última frase escrita:'}
        </Text>
        
        {isFirstPhrase && initialTheme && (
          <View style={styles.themeContainer}>
            <Text style={styles.themeLabel}>💡 Tema sugerido:</Text>
            <Text style={styles.themeText}>{initialTheme}</Text>
          </View>
        )}
        
        {lastPhrase && (
          <View style={styles.lastPhraseBox}>
            <Text style={styles.lastPhraseText}>{lastPhrase.phrase}</Text>
            <View style={styles.lastPhraseFooter}>
              <Text style={styles.lastPhraseAuthor}>— {lastPhrase.playerName}</Text>
              <Text style={styles.lastPhraseRound}>Ronda {lastPhrase.round}</Text>
            </View>
          </View>
        )}
        
        {!lastPhrase && !initialTheme && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateText}>
              ¡Eres el primero! Crea el inicio de una historia increíble.
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.inputContainer}>
        <View style={styles.inputHeader}>
          <Text style={styles.inputLabel}>
            ✍️ {isFirstPhrase ? 'Escribe el inicio:' : 'Continúa la historia:'}
          </Text>
          <TouchableOpacity 
            style={styles.suggestionsButton}
            onPress={() => setShowSuggestions(!showSuggestions)}
          >
            <Text style={styles.suggestionsButtonText}>
              {showSuggestions ? '▼' : '▶'} Sugerencias
            </Text>
          </TouchableOpacity>
        </View>
        
        {showSuggestions && (
          <View style={styles.suggestionsContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {getSuggestions().map((suggestion, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.suggestionChip}
                  onPress={() => handleQuickStarter(suggestion)}
                >
                  <Text style={styles.suggestionChipText}>{suggestion}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        
        <TextInput
          style={[
            styles.textInput,
            charCount > 0 && styles.textInputActive,
            charCount > 500 && styles.textInputWarning
          ]}
          placeholder={isFirstPhrase 
            ? "Ej: Érase una vez un dragón que quería aprender a cocinar..."
            : "Escribe aquí tu continuación..."
          }
          value={phrase}
          onChangeText={setPhrase}
          multiline
          numberOfLines={4}
          textAlignVertical="top"
          autoFocus
          maxLength={500}
        />
        
        <View style={styles.statsContainer}>
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Palabras:</Text>
              <Text style={[styles.statValue, { color: wordCount >= 2 ? '#4CAF50' : '#999' }]}>
                {wordCount}
              </Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statLabel}>Caracteres:</Text>
              <Text style={[styles.statValue, { color: getCharacterCountColor() }]}>
                {charCount}/500
              </Text>
            </View>
          </View>
          <Text style={styles.encouragementText}>{getEncouragement()}</Text>
        </View>
        
        <TouchableOpacity 
          style={[
            styles.submitButton,
            (phrase.trim().length < 3 || wordCount < 2) && styles.submitButtonDisabled
          ]} 
          onPress={handleSubmit}
          disabled={phrase.trim().length < 3 || wordCount < 2}
        >
          <Text style={styles.submitButtonText}>
            ✓ Confirmar y Continuar
          </Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.hintContainer}>
        <Text style={styles.hint}>
          💡 Solo puedes ver la última frase. La historia completa se revelará al final de la partida.
        </Text>
        <Text style={styles.hintSmall}>
          {phrases.length + 1}ª frase de la historia
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  lastPhraseContainer: {
    marginBottom: 24,
  },
  lastPhraseLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  themeContainer: {
    backgroundColor: '#FFF9C4',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#FBC02D',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  themeLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#F57F17',
    marginBottom: 6,
  },
  themeText: {
    fontSize: 15,
    color: '#5D4037',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  lastPhraseBox: {
    backgroundColor: '#E8F5E9',
    padding: 16,
    borderRadius: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lastPhraseText: {
    fontSize: 17,
    color: '#2E7D32',
    lineHeight: 26,
    marginBottom: 10,
  },
  lastPhraseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastPhraseAuthor: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    fontWeight: '500',
  },
  lastPhraseRound: {
    fontSize: 11,
    color: '#999',
    backgroundColor: '#C8E6C9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  emptyState: {
    padding: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  inputContainer: {
    marginBottom: 16,
  },
  inputHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  suggestionsButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
  },
  suggestionsButtonText: {
    fontSize: 12,
    color: '#1976D2',
    fontWeight: '600',
  },
  suggestionsContainer: {
    marginBottom: 12,
    maxHeight: 50,
  },
  suggestionChip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#BDBDBD',
  },
  suggestionChipText: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    padding: 16,
    fontSize: 16,
    minHeight: 140,
    backgroundColor: 'white',
    marginBottom: 12,
  },
  textInputActive: {
    borderColor: '#2196F3',
  },
  textInputWarning: {
    borderColor: '#f44336',
  },
  statsContainer: {
    marginBottom: 12,
    padding: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 8,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#999',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  encouragementText: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 4,
  },
  submitButton: {
    backgroundColor: '#2196F3',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#2196F3',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc',
    shadowOpacity: 0,
    elevation: 0,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  hintContainer: {
    marginTop: 8,
    padding: 12,
    backgroundColor: '#FFF3E0',
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#FF9800',
  },
  hint: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 4,
  },
  hintSmall: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
});
