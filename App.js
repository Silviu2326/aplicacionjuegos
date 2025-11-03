import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { TelefonoDescompuestoVisualNavigator } from './games/telefono-descompuesto-visual/TelefonoDescompuestoVisualNavigator';

export default function App() {
  return (
    <>
      {Platform.OS !== 'web' && <StatusBar style="auto" />}
      <TelefonoDescompuestoVisualNavigator />
    </>
  );
}

