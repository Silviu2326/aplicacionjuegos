import React, { useState, useMemo } from 'react';
import { View, StyleSheet, Modal, TouchableOpacity, Text, TextInput, ScrollView, FlatList } from 'react-native';
import { GAME_CONFIG } from '../constants/cadenaEmojisConstants';

export const CadenaEmojisSelector = ({ visible, onSelect, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Obtener todas las categorías de las constantes
  const categories = useMemo(() => {
    const cats = { all: 'Todos' };
    Object.keys(GAME_CONFIG.EMOJI_CATEGORIES).forEach(key => {
      cats[key] = GAME_CONFIG.EMOJI_CATEGORIES[key].name;
    });
    return cats;
  }, []);

  // Obtener todos los emojis de todas las categorías
  const allEmojis = useMemo(() => {
    return Object.values(GAME_CONFIG.EMOJI_CATEGORIES)
      .map(category => category.emojis)
      .flat();
  }, []);

  const popularEmojis = GAME_CONFIG.POPULAR_EMOJIS;

  // Función de búsqueda mejorada
  const getFilteredEmojis = useMemo(() => {
    let emojis = [];
    
    if (selectedCategory === 'all') {
      emojis = searchQuery.trim() ? allEmojis : popularEmojis;
    } else {
      const category = GAME_CONFIG.EMOJI_CATEGORIES[selectedCategory];
      emojis = category ? category.emojis : [];
    }
    
    // Filtrar por búsqueda si hay texto
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      // Crear un conjunto de palabras clave comunes para cada emoji
      // Por ahora, simplemente buscar en todos los emojis disponibles
      return emojis.filter((emoji, index) => {
        // Buscar en los primeros emojis populares si es búsqueda genérica
        if (query.length < 2) return index < 50;
        return true;
      });
    }
    
    return emojis;
  }, [selectedCategory, searchQuery, allEmojis, popularEmojis]);

  const renderEmojiItem = ({ item }) => (
    <TouchableOpacity
      style={styles.emojiButton}
      onPress={() => {
        onSelect(item);
        setSearchQuery('');
        onClose();
      }}
    >
      <Text style={styles.emojiText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Selecciona un Emoji</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.searchInput}
            placeholder="Buscar emoji..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />

          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
            {Object.entries(categories).map(([key, label]) => (
              <TouchableOpacity
                key={key}
                style={[
                  styles.categoryButton,
                  selectedCategory === key && styles.categoryButtonActive,
                ]}
                onPress={() => setSelectedCategory(key)}
              >
                <Text
                  style={[
                    styles.categoryButtonText,
                    selectedCategory === key && styles.categoryButtonTextActive,
                  ]}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <FlatList
            data={getFilteredEmojis}
            renderItem={renderEmojiItem}
            numColumns={6}
            keyExtractor={(item, index) => `${item}-${index}`}
            contentContainerStyle={styles.emojiGrid}
            style={styles.emojiList}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Text style={styles.emptyText}>No se encontraron emojis</Text>
              </View>
            }
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 24,
    color: '#666',
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 12,
    margin: 16,
    fontSize: 16,
    color: '#333',
  },
  categoriesContainer: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 8,
  },
  categoryButtonActive: {
    backgroundColor: '#2196F3',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#ffffff',
  },
  emojiList: {
    flex: 1,
  },
  emojiGrid: {
    padding: 16,
  },
  emojiButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  emojiText: {
    fontSize: 32,
  },
  emptyState: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});

