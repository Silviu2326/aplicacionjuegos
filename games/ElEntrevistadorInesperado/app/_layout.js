import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="el-entrevistador-inesperado-setup" />
      <Stack.Screen name="el-entrevistador-inesperado-reveal" />
      <Stack.Screen name="el-entrevistador-inesperado-game" />
      <Stack.Screen name="el-entrevistador-inesperado-results" />
    </Stack>
  );
}

