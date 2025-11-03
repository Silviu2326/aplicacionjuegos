import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, PanResponder } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export const TelefonoDescompuestoVisualCanvas = ({ 
  onDrawingComplete, 
  initialContent = null 
}) => {
  const [paths, setPaths] = useState(initialContent || []);
  const [currentPath, setCurrentPath] = useState(null);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(3);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        const newPath = {
          id: Date.now(),
          color,
          strokeWidth: brushSize,
          points: [{ x: locationX, y: locationY }],
        };
        setCurrentPath(newPath);
      },
      onPanResponderMove: (evt) => {
        const { locationX, locationY } = evt.nativeEvent;
        if (currentPath) {
          setCurrentPath({
            ...currentPath,
            points: [...currentPath.points, { x: locationX, y: locationY }],
          });
        }
      },
      onPanResponderRelease: () => {
        if (currentPath) {
          setPaths([...paths, currentPath]);
          setCurrentPath(null);
        }
      },
    })
  ).current;

  const undo = () => {
    setPaths(paths.slice(0, -1));
  };

  const clear = () => {
    setPaths([]);
    setCurrentPath(null);
  };

  const handleComplete = () => {
    onDrawingComplete(paths);
  };

  const colors = ['#000000', '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];
  const brushSizes = [2, 4, 6, 8, 10];

  const renderPath = (path) => {
    if (path.points.length === 0) return null;
    
    let pathData = `M${path.points[0].x},${path.points[0].y}`;
    for (let i = 1; i < path.points.length; i++) {
      pathData += ` L${path.points[i].x},${path.points[i].y}`;
    }

    return (
      <Path
        key={path.id}
        d={pathData}
        stroke={path.color}
        strokeWidth={path.strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <View style={styles.colorPicker}>
          {colors.map((c) => (
            <TouchableOpacity
              key={c}
              style={[styles.colorButton, { backgroundColor: c }, color === c && styles.selectedColor]}
              onPress={() => setColor(c)}
            />
          ))}
        </View>
        
        <View style={styles.brushSizePicker}>
          {brushSizes.map((size) => (
            <TouchableOpacity
              key={size}
              style={[
                styles.brushButton, 
                brushSize === size && styles.selectedBrush,
                { width: 24, height: 24, justifyContent: 'center', alignItems: 'center' }
              ]}
              onPress={() => setBrushSize(size)}
            >
              <View 
                style={{
                  width: size,
                  height: size,
                  borderRadius: size / 2,
                  backgroundColor: color,
                }} 
              />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton} onPress={undo} disabled={paths.length === 0}>
          <Text style={styles.actionButtonText}>Deshacer</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.actionButton} onPress={clear}>
          <Text style={styles.actionButtonText}>Limpiar</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.canvasContainer} {...panResponder.panHandlers}>
        <Svg style={styles.canvas} width="100%" height="100%">
          {paths.map(renderPath)}
          {currentPath && renderPath(currentPath)}
        </Svg>
      </View>

      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>Finalizar Dibujo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  toolbar: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  colorPicker: {
    flexDirection: 'row',
    gap: 8,
  },
  colorButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  selectedColor: {
    borderColor: '#000',
    borderWidth: 3,
  },
  brushSizePicker: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  brushButton: {
    padding: 4,
  },
  selectedBrush: {
    backgroundColor: '#e0e0e0',
    borderRadius: 12,
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#2196F3',
    borderRadius: 6,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  canvasContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ddd',
    margin: 8,
    borderRadius: 8,
  },
  canvas: {
    flex: 1,
  },
  completeButton: {
    margin: 16,
    padding: 16,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

