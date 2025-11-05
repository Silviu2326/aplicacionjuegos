import React from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import { useDetectiveObjetosStore } from '../store/detectiveObjetosStore';
import { DETECTIVE_OBJETOS_CONFIG } from '../constants/detectiveObjetosConfig';

export const DetectiveObjetosImageView = () => {
  const currentImageUri = useDetectiveObjetosStore((state) => state.currentImageUri);
  const currentZoomLevel = useDetectiveObjetosStore((state) => state.currentZoomLevel);
  const getCurrentZoomValue = useDetectiveObjetosStore((state) => state.getCurrentZoomValue);
  
  const zoomValue = getCurrentZoomValue();
  const [zoomAnim] = React.useState(new Animated.Value(zoomValue));
  
  React.useEffect(() => {
    // Animar el cambio de zoom
    Animated.timing(zoomAnim, {
      toValue: zoomValue,
      duration: DETECTIVE_OBJETOS_CONFIG.ZOOM_TRANSITION_DURATION,
      useNativeDriver: true,
    }).start();
  }, [currentZoomLevel]);
  
  if (!currentImageUri) {
    return (
      <View style={styles.container}>
        <View style={styles.placeholder}>
          {/* Placeholder cuando no hay imagen */}
        </View>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Animated.Image
          source={{ uri: currentImageUri }}
          style={[
            styles.image,
            {
              transform: [
                {
                  scale: zoomAnim,
                },
              ],
            },
          ]}
          resizeMode="cover"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#1a1a1a',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

