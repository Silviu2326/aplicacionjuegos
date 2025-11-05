import { Stack } from 'expo-router';

export default function OneNightWerewolfLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="oneNightWerewolfLobby" />
      <Stack.Screen name="oneNightWerewolfSetup" />
      <Stack.Screen name="oneNightWerewolfGame" />
      <Stack.Screen name="oneNightWerewolfResults" />
    </Stack>
  );
}

