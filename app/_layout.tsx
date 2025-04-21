
import { Stack, Slot } from 'expo-router';
import { TamaguiProvider } from 'tamagui';
import config from '../tamagui.config';
import { useFonts } from 'expo-font';
import { useState } from 'react';
import { View, Text } from 'tamagui';
import { StatusBar } from 'expo-status-bar';
import TabBar from '../components/TabBar';

// Fallback font families for web/preview
const fallbackFonts = {
  'Poppins-Regular': undefined,
  'Poppins-Medium': undefined,
  'Poppins-SemiBold': undefined,
  'Poppins-Bold': undefined,
};

export default function RootLayout() {
  // Try to load fonts, but don't crash if missing
  let fontsLoaded = true;
  try {
    // @ts-ignore
    [fontsLoaded] = useFonts({
      'Poppins-Regular': require('../assets/fonts/Poppins-Regular.ttf'),
      'Poppins-Medium': require('../assets/fonts/Poppins-Medium.ttf'),
      'Poppins-SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });
  } catch (e) {
    fontsLoaded = true; // fallback to system font
  }

  // Always render the app, fallback to system font if custom fonts missing
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