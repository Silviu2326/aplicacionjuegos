import { Stack } from 'expo-router';

export default function Salem1692Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#1a1a1a' },
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="salem1692-game-screen" />
    </Stack>
  );
}

