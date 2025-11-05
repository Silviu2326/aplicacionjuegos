import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Salem1692Jugar } from './tabs/Jugar';
import { Salem1692Historial } from './tabs/Historial';
import { Salem1692Instrucciones } from './tabs/Instrucciones';

export const Salem1692Index = () => {
  const [activeTab, setActiveTab] = useState('jugar');

  const tabs = [
    { id: 'jugar', label: '🎮 Jugar', component: Salem1692Jugar },
    { id: 'historial', label: '📜 Historial', component: Salem1692Historial },
    { id: 'instrucciones', label: 'ℹ️ Instrucciones', component: Salem1692Instrucciones },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Salem1692Jugar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Salem 1692</Text>
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
    backgroundColor: '#6a1b9a',
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
    backgroundColor: '#7b1fa2',
    borderBottomWidth: 2,
    borderBottomColor: '#6a1b9a',
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

