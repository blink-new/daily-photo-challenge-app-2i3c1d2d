
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { AuthProvider } from '../context/auth';
import { ChallengeProvider } from '../context/challenge';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="dark" />
      <AuthProvider>
        <ChallengeProvider>
          <Stack
            screenOptions={{
              headerShown: false,
              animation: 'slide_from_right',
            }}
          />
        </ChallengeProvider>
      </AuthProvider>
    </TamaguiProvider>
  );
}