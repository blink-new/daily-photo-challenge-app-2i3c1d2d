
import { createTamagui } from 'tamagui';
import { createInterFont } from '@tamagui/font-inter';
import { shorthands } from '@tamagui/shorthands';
import { themes, tokens } from '@tamagui/themes';
import { createMedia } from '@tamagui/react-native-media-driver';

const headingFont = createInterFont({
  size: {
    1: 12,
    2: 14,
    3: 16,
    4: 18,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 48,
    12: 56,
    13: 64,
    14: 72,
  },
  transform: {
    6: 'uppercase',
    7: 'none',
  },
  weight: {
    1: '300',
    2: '400',
    3: '500',
    4: '600',
    5: '700',
    6: '800',
  },
  color: {
    1: '$colorFocus',
    2: '$color',
    3: '$color',
    4: '$color',
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: -1,
    8: -1,
    9: -2,
    10: -2,
    11: -3,
    12: -4,
    13: -4,
    14: -4,
  },
  face: {
    700: { normal: 'InterBold' },
    800: { normal: 'InterBold' },
    900: { normal: 'InterBold' },
  },
});

const bodyFont = createInterFont(
  {
    face: {
      normal: { normal: 'Inter' },
    },
  },
  {
    sizeSize: (size) => Math.round(size * 1.1),
    sizeLineHeight: (size) => Math.round(size * 1.5 > 30 ? size * 1.2 : size * 1.5),
  }
);

// Custom colors with purple theme
const customTokens = {
  ...tokens,
  color: {
    ...tokens.color,
    purple50: '#f5f3ff',
    purple100: '#ede9fe',
    purple200: '#ddd6fe',
    purple300: '#c4b5fd',
    purple400: '#a78bfa',
    purple500: '#8b5cf6',
    purple600: '#7c3aed',
    purple700: '#6d28d9',
    purple800: '#5b21b6',
    purple900: '#4c1d95',
  },
};

// Custom themes with purple as primary
const customThemes = {
  ...themes,
  light: {
    ...themes.light,
    background: '#f9fafb',
    color: '#1f2937',
    primary: '#7c3aed',
  },
  dark: {
    ...themes.dark,
    background: '#1f2937',
    color: '#f9fafb',
    primary: '#8b5cf6',
  },
};

const config = createTamagui({
  defaultFont: 'body',
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  tokens: customTokens,
  themes: customThemes,
  shorthands,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

export type AppConfig = typeof config;

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default config;