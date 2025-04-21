
import React, { useState } from 'react';
import { View, YStack, XStack, Text, H1, H3, ScrollView } from 'tamagui';
import { Image } from 'expo-image';
import { useAuth } from '../context/auth';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { router } from 'expo-router';
import { Camera, Image as ImageIcon } from 'lucide-react-native';

export default function Welcome() {
  const { signIn, signUp, error } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email, password);
      } else {
        await signUp(email, password, username);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView flex={1} backgroundColor="white">
      <YStack flex={1} padding="$4" space="$6" alignItems="center">
        <YStack alignItems="center" marginTop="$8" space="$2">
          <XStack space="$2" alignItems="center">
            <Camera size={36} color="#7c3aed" />
            <H1 color="$purple800" fontWeight="bold">
              DailySnap
            </H1>
          </XStack>
          <H3 color="$gray600" textAlign="center">
            Daily photo challenges to inspire your creativity
          </H3>
        </YStack>

        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000' }}
          style={{ width: '100%', height: 250, borderRadius: 16 }}
          contentFit="cover"
        />

        <YStack space="$4" width="100%" maxWidth={400}>
          {!isLogin && (
            <Input
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
              autoCapitalize="none"
            />
          )}
          
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          
          <Input
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            isPassword
          />
          
          {error && (
            <Text color="$red500" fontSize="$3">
              {error}
            </Text>
          )}
          
          <Button
            variant="primary"
            size="large"
            fullWidth
            loading={loading}
            onPress={handleAuth}
          >
            {isLogin ? 'Sign In' : 'Sign Up'}
          </Button>
          
          <XStack justifyContent="center">
            <Text color="$gray600">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
            </Text>
            <Text
              color="$purple500"
              fontWeight="600"
              onPress={() => setIsLogin(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </Text>
          </XStack>
        </YStack>

        <YStack space="$2" marginTop="$4" alignItems="center">
          <Text color="$gray600" fontSize="$3" fontWeight="500">
            Join thousands of photographers
          </Text>
          <XStack space="$4" alignItems="center">
            <XStack alignItems="center" space="$1">
              <Camera size={16} color="#7c3aed" />
              <Text color="$gray700">Daily Challenges</Text>
            </XStack>
            <XStack alignItems="center" space="$1">
              <ImageIcon size={16} color="#7c3aed" />
              <Text color="$gray700">Share Your Work</Text>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}