import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

export const TelefonoDescompuestoVisualResultsReel = ({ notebooks }) => {
  const [currentNotebookIndex, setCurrentNotebookIndex] = useState(0);

  const currentNotebook = notebooks[currentNotebookIndex];

  const nextNotebook = () => {
    if (currentNotebookIndex < notebooks.length - 1) {
      setCurrentNotebookIndex(currentNotebookIndex + 1);
    }
  };

  const prevNotebook = () => {
    if (currentNotebookIndex > 0) {
      setCurrentNotebookIndex(currentNotebookIndex - 1);
    }
  };

  if (!currentNotebook || notebooks.length === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.emptyText}>No hay resultados para mostrar</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Cuaderno de {currentNotebook.ownerName}
        </Text>
        <Text style={styles.counter}>
          {currentNotebookIndex + 1} / {notebooks.length}
        </Text>
      </View>

      <ScrollView style={styles.content}>
        {currentNotebook.entries.map((entry, index) => (
          <View key={index} style={styles.entryContainer}>
            <View style={styles.entryHeader}>
              <Text style={styles.entryLabel}>
                {entry.type === 'draw' ? '🎨 Dibujo' : '✍️ Texto'}
              </Text>
              <Text style={styles.entryPlayer}>por {entry.playerName}</Text>
            </View>
            
            <View style={styles.entryContent}>
              {entry.type === 'draw' ? (
                <View style={styles.drawingPlaceholder}>
                  <Text style={styles.placeholderText}>Dibujo</Text>
                  {/* Aquí iría el renderizado del dibujo */}
                </View>
              ) : (
                <Text style={styles.textContent}>{entry.content}</Text>
              )}
            </View>

            {index < currentNotebook.entries.length - 1 && (
              <View style={styles.arrow}>
                <Text style={styles.arrowText}>↓</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.navigation}>
        <TouchableOpacity 
          style={[styles.navButton, currentNotebookIndex === 0 && styles.navButtonDisabled]}
          onPress={prevNotebook}
          disabled={currentNotebookIndex === 0}
        >
          <Text style={styles.navButtonText}>← Anterior</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.navButton, currentNotebookIndex === notebooks.length - 1 && styles.navButtonDisabled]}
          onPress={nextNotebook}
          disabled={currentNotebookIndex === notebooks.length - 1}
        >
          <Text style={styles.navButtonText}>Siguiente →</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    backgroundColor: '#2196F3',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  counter: {
    fontSize: 16,
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  entryContainer: {
    marginBottom: 24,
  },
  entryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  entryPlayer: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
  },
  entryContent: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 16,
    minHeight: 100,
  },
  drawingPlaceholder: {
    height: 200,
    backgroundColor: '#fff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  placeholderText: {
    color: '#999',
    fontSize: 16,
  },
  textContent: {
    fontSize: 18,
    color: '#333',
    lineHeight: 24,
  },
  arrow: {
    alignItems: 'center',
    marginVertical: 8,
  },
  arrowText: {
    fontSize: 24,
    color: '#666',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#f5f5f5',
    gap: 12,
  },
  navButton: {
    flex: 1,
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonDisabled: {
    backgroundColor: '#ccc',
  },
  navButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginTop: 50,
  },
});

