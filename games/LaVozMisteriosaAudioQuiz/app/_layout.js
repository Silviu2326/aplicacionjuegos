import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="setup-voz-misteriosa" />
      <Stack.Screen name="juego-voz-misteriosa" />
      <Stack.Screen name="resultado-voz-misteriosa" />
    </Stack>
  );
}

