import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="dos-verdades-una-mentira-juego" />
      <Stack.Screen name="dos-verdades-una-mentira-resultados" />
    </Stack>
  );
}
