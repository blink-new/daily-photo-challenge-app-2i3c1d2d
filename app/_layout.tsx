
import { Stack } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { useFonts } from 'expo-font';
import { useEffect, useState } from 'react';
import { View, Text } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import TabBar from '../components/TabBar';
import { Slot } from 'expo-router';

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
  });

  // Prevent rendering until the font has loaded or there was an error
  if (!fontsLoaded && !fontError) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Loading...</Text>
      </View>
    );
  }

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