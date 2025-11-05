import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export const MaestroDelAcronimoAcronymDisplay = ({ acronym }) => {
  if (!acronym) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.acronymText}>{acronym}</Text>
      <Text style={styles.hintText}>
        Crea una frase donde cada palabra empiece con estas letras
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 24,
    marginVertical: 15,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 3,
    borderWidth: 3,
    borderColor: '#2196F3',
    alignItems: 'center',
  },
  acronymText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 12,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
    marginTop: 8,
  },
});

