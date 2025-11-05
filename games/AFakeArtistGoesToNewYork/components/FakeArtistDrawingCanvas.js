import React, { useState, useRef } from 'react';
import { View, StyleSheet, PanResponder, Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const FakeArtistDrawingCanvas = ({ 
  strokes = [], 
  onStrokeComplete, 
  disabled = false,
  readOnly = false 
}) => {
  const [currentPath, setCurrentPath] = useState('');
  const [currentColor, setCurrentColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);
  const pathRef = useRef('');

  const defaultColors = [
    '#000000', '#FF0000', '#0000FF', '#008000', '#FFA500',
    '#800080', '#FFC0CB', '#FFFF00', '#A52A2A', '#808080',
  ];

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !disabled && !readOnly,
      onMoveShouldSetPanResponder: () => !disabled && !readOnly,
      
      onPanResponderGrant: (evt) => {
        if (disabled || readOnly) return;
        
        const { locationX, locationY } = evt.nativeEvent;
        const path = `M ${locationX} ${locationY}`;
        pathRef.current = path;
        setCurrentPath(path);
        setIsDrawing(true);
      },
      
      onPanResponderMove: (evt) => {
        if (disabled || readOnly || !isDrawing) return;
        
        const { locationX, locationY } = evt.nativeEvent;
        const newPath = `${pathRef.current} L ${locationX} ${locationY}`;
        pathRef.current = newPath;
        setCurrentPath(newPath);
      },
      
      onPanResponderRelease: () => {
        if (disabled || readOnly || !isDrawing) return;
        
        if (pathRef.current && onStrokeComplete) {
          const randomColor = defaultColors[Math.floor(Math.random() * defaultColors.length)];
          onStrokeComplete(pathRef.current, randomColor);
        }
        
        pathRef.current = '';
        setCurrentPath('');
        setIsDrawing(false);
      },
    })
  ).current;

  return (
    <View style={styles.container} {...panResponder.panHandlers}>
      <Svg height="100%" width="100%" style={styles.svg}>
        {/* Renderizar trazos guardados */}
        {strokes.map((stroke, index) => (
          <Path
            key={stroke.id || index}
            d={stroke.path}
            stroke={stroke.color || '#000000'}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        
        {/* Renderizar trazo actual en progreso */}
        {currentPath && (
          <Path
            d={currentPath}
            stroke={currentColor}
            strokeWidth="3"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  svg: {
    flex: 1,
  },
});

