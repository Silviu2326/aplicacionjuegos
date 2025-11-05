import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="sonidista-ciego-play" />
      <Stack.Screen name="sonidista-ciego-results" />
    </Stack>
  );
}

