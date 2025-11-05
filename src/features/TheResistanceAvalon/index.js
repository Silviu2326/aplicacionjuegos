import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TheResistanceAvalonJugar } from './tabs/Jugar';
import { TheResistanceAvalonHistorial } from './tabs/Historial';
import { TheResistanceAvalonInstrucciones } from './tabs/Instrucciones';

export const TheResistanceAvalonIndex = () => {
  const [activeTab, setActiveTab] = useState('jugar');

  const tabs = [
    { id: 'jugar', label: '🎮 Jugar', component: TheResistanceAvalonJugar },
    { id: 'historial', label: '📜 Historial', component: TheResistanceAvalonHistorial },
    { id: 'instrucciones', label: 'ℹ️ Instrucciones', component: TheResistanceAvalonInstrucciones },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || TheResistanceAvalonJugar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>The Resistance: Avalon</Text>
        <Text style={styles.subtitle}>Juego de Deducción Social</Text>
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
    backgroundColor: '#1a1a1a',
  },
  header: {
    backgroundColor: '#8B4513',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#654321',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  tabContainer: {
    backgroundColor: '#A0522D',
    borderBottomWidth: 2,
    borderBottomColor: '#8B4513',
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
    borderBottomColor: '#ffd700',
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

