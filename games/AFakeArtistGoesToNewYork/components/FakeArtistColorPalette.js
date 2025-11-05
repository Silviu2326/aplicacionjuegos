import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

const COLORS = [
  '#000000', // Negro
  '#FF0000', // Rojo
  '#0000FF', // Azul
  '#008000', // Verde
  '#FFA500', // Naranja
  '#800080', // Morado
  '#FFC0CB', // Rosa
  '#FFFF00', // Amarillo
  '#A52A2A', // Marrón
  '#808080', // Gris
];

export const FakeArtistColorPalette = ({ onColorSelect, selectedColor }) => {
  const [currentSelectedColor, setCurrentSelectedColor] = useState(selectedColor || COLORS[0]);

  const handleColorPress = (color) => {
    setCurrentSelectedColor(color);
    if (onColorSelect) {
      onColorSelect(color);
    }
  };

  return (
    <View style={styles.container}>
      {COLORS.map((color) => (
        <TouchableOpacity
          key={color}
          style={[
            styles.colorButton,
            { backgroundColor: color },
            currentSelectedColor === color && styles.selectedColorButton,
          ]}
          onPress={() => handleColorPress(color)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 10,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedColorButton: {
    borderWidth: 3,
    borderColor: '#333',
    transform: [{ scale: 1.2 }],
  },
});

