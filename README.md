# Expo React Native Starter Kit

A modern, feature-rich starter template for cross-platform development with Expo, Tamagui, and Supabase.

## Tech Stack

- 📱 [Expo](https://expo.dev/) (SDK 52)
- ⚛️ React Native 0.76.9
- 🏗️ TypeScript
- 🚦 [Expo Router](https://docs.expo.dev/router/introduction/) (File-based routing)
- 💅 [Tamagui](https://tamagui.dev/) (Cross-platform UI components)
- 🔐 [Supabase](https://supabase.com/) (Backend & Auth)
- 💾 AsyncStorage (Local persistence)

## Getting Started

### Prerequisites

- Node.js 16+
- npm/yarn
- iOS Simulator / Android Emulator for mobile development
- Supabase account and project

### Installation

1. Clone the repository:
\`\`\`bash
git clone [your-repo-url]
cd expo-react-native
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Environment setup:
\`\`\`bash
# Copy env example and add your Supabase credentials
cp env.example .env
\`\`\`

4. Start development server:
\`\`\`bash
npm run ios     # for iOS
npm run android # for Android
npm run web     # for web
\`\`\`

## Project Structure

\`\`\`
├── app/            # File-based routing directory
├── lib/            # Core configurations
│   └── supabase.ts # Supabase client setup
├── hooks/          # Custom React hooks
│   └── useAuth.ts  # Authentication hook
└── assets/         # Static assets
\`\`\`

## Features

- 🔐 **Authentication Ready**: Built-in auth flow with Supabase
- 📱 **Cross Platform**: Works on iOS, Android, and Web
- 🎯 **Type Safety**: Full TypeScript support
- 📍 **File-based Routing**: Intuitive page organization
- 💅 **Modern UI**: Tamagui components with theme support

## Development Notes

### Important Commands

\`\`\`bash
# Clear Metro cache (use when facing build issues)
rm -rf node_modules/.cache

# Install new dependencies (use --legacy-peer-deps due to version conflicts)
npm install package-name --legacy-peer-deps
\`\`\`

### Authentication Usage

\`\`\`typescript
import { useAuth } from '../hooks/useAuth';

function MyComponent() {
  const { user, signIn, signOut, loading } = useAuth();
  // ... use auth functions
}
\`\`\`

### Environment Variables

- All environment variables must be prefixed with \`EXPO_PUBLIC_\`
- Required variables:
  - \`EXPO_PUBLIC_SUPABASE_URL\`
  - \`EXPO_PUBLIC_SUPABASE_ANON_KEY\`

## Troubleshooting

1. **Build Issues**
   - Clear Metro cache
   - Ensure correct dependency versions
   - Check Expo SDK compatibility

2. **Styling Issues**
   - Use Tamagui props for styling
   - Avoid mixing styling systems

## Contributing

[Add your contribution guidelines here]

## License

[Add your license here] 