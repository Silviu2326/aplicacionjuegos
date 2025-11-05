import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="interrogatorio-asignacion" />
      <Stack.Screen name="interrogatorio-secreto" />
      <Stack.Screen name="interrogatorio-ronda" />
      <Stack.Screen name="interrogatorio-revelacion" />
    </Stack>
  );
}

