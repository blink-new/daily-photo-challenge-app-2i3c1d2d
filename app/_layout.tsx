
import { Stack, Slot } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { View } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import TabBar from '../components/TabBar';

export default function RootLayout() {
  return (
    <TamaguiProvider config={config}>
      <StatusBar style="dark" />
      <View flex={1}>
        <Slot />
        <TabBar />
      </View>
    </TamaguiProvider>
  );
}