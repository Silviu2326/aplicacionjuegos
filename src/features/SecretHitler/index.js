import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { SecretHitlerJugar } from './tabs/Jugar';
import { SecretHitlerHistorial } from './tabs/Historial';
import { SecretHitlerInstrucciones } from './tabs/Instrucciones';

export const SecretHitlerIndex = () => {
  const [activeTab, setActiveTab] = useState('jugar');

  const tabs = [
    { id: 'jugar', label: '🎮 Jugar', component: SecretHitlerJugar },
    { id: 'historial', label: '📜 Historial', component: SecretHitlerHistorial },
    { id: 'instrucciones', label: 'ℹ️ Instrucciones', component: SecretHitlerInstrucciones },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || SecretHitlerJugar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Secret Hitler</Text>
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
    backgroundColor: '#d32f2f',
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#b71c1c',
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
    backgroundColor: '#c62828',
    borderBottomWidth: 2,
    borderBottomColor: '#b71c1c',
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
