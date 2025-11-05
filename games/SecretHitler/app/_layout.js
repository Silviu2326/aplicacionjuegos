import { Stack } from 'expo-router';

export default function SecretHitlerLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="secret-hitler-game" />
    </Stack>
  );
}
