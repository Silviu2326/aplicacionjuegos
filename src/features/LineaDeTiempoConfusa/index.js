import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { LineaDeTiempoConfusaJugar } from './tabs/Jugar';
import { LineaDeTiempoConfusaHistorial } from './tabs/Historial';
import { LineaDeTiempoConfusaEstadisticas } from './tabs/Estadisticas';
import { LineaDeTiempoConfusaInstrucciones } from './tabs/Instrucciones';

export const LineaDeTiempoConfusaIndex = () => {
  const [activeTab, setActiveTab] = useState('jugar');

  const tabs = [
    { id: 'jugar', label: '🎮 Jugar', component: LineaDeTiempoConfusaJugar },
    { id: 'historial', label: '📜 Historial', component: LineaDeTiempoConfusaHistorial },
    { id: 'estadisticas', label: '📊 Estadísticas', component: LineaDeTiempoConfusaEstadisticas },
    { id: 'instrucciones', label: 'ℹ️ Instrucciones', component: LineaDeTiempoConfusaInstrucciones },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || LineaDeTiempoConfusaJugar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Línea de Tiempo Confusa</Text>
        <Text style={styles.subtitle}>Ordena los eventos históricos</Text>
      </View>

      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabScroll}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab.id}
              style={[styles.tab, activeTab === tab.id && styles.tabActive]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[styles.tabText, activeTab === tab.id && styles.tabTextActive]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.content}>
        <ActiveComponent />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#2c3e50',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ecf0f1',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#bdc3c7',
  },
  tabContainer: {
    backgroundColor: '#34495e',
    borderBottomWidth: 2,
    borderBottomColor: '#2c3e50',
  },
  tabScroll: {
    flexGrow: 0,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: '#3498db',
  },
  tabText: {
    color: '#95a5a6',
    fontSize: 14,
    fontWeight: '600',
  },
  tabTextActive: {
    color: '#ecf0f1',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});
