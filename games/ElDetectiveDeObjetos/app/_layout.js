import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="detective-objetos-setup" />
      <Stack.Screen name="detective-objetos-game" />
      <Stack.Screen name="detective-objetos-results" />
    </Stack>
  );
}

