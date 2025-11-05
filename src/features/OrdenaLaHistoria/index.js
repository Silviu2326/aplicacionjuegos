import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { OrdenaLaHistoriaJugar } from './tabs/Jugar';
import { OrdenaLaHistoriaHistorial } from './tabs/Historial';
import { OrdenaLaHistoriaInstrucciones } from './tabs/Instrucciones';

export const OrdenaLaHistoriaIndex = () => {
  const [activeTab, setActiveTab] = useState('jugar');

  const tabs = [
    { id: 'jugar', label: '🎮 Jugar', component: OrdenaLaHistoriaJugar },
    { id: 'historial', label: '📜 Historial', component: OrdenaLaHistoriaHistorial },
    { id: 'instrucciones', label: 'ℹ️ Instrucciones', component: OrdenaLaHistoriaInstrucciones },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || OrdenaLaHistoriaJugar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Ordena la Historia</Text>
        <Text style={styles.subtitle}>Reconstruye historias divididas en fragmentos</Text>
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
    backgroundColor: '#4ECDC4',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  tabContainer: {
    backgroundColor: '#45B7D1',
    borderBottomWidth: 2,
    borderBottomColor: '#4ECDC4',
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
    borderBottomColor: '#FF6B6B',
  },
  tabText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    opacity: 0.7,
  },
  tabTextActive: {
    opacity: 1,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
});

