import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TrivialPursuitClasicoMovilJugar } from './tabs/Jugar';
import { TrivialPursuitClasicoMovilHistorial } from './tabs/Historial';
import { TrivialPursuitClasicoMovilInstrucciones } from './tabs/Instrucciones';

export const TrivialPursuitClasicoMovilIndex = () => {
  const [activeTab, setActiveTab] = useState('jugar');

  const tabs = [
    { id: 'jugar', label: '🎮 Jugar', component: TrivialPursuitClasicoMovilJugar },
    { id: 'historial', label: '📜 Historial', component: TrivialPursuitClasicoMovilHistorial },
    { id: 'instrucciones', label: 'ℹ️ Instrucciones', component: TrivialPursuitClasicoMovilInstrucciones },
  ];

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || TrivialPursuitClasicoMovilJugar;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Trivial Pursuit Clásico</Text>
        <Text style={styles.subtitle}>Demuestra que eres el que más sabe</Text>
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
    backgroundColor: '#9B59B6',
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
    backgroundColor: '#8E44AD',
    borderBottomWidth: 2,
    borderBottomColor: '#9B59B6',
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
    borderBottomColor: '#FFD700',
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

