
import React from 'react';
import { View, Text, XStack } from 'tamagui';
import { TouchableOpacity } from 'react-native';
import { Link, usePathname } from 'expo-router';
import { Home, Camera, User } from 'lucide-react-native';

export default function TabBar() {
  const pathname = usePathname();

  const tabs = [
    {
      name: 'Home',
      href: '/',
      icon: Home,
    },
    {
      name: 'Camera',
      href: '/camera',
      icon: Camera,
    },
    {
      name: 'Profile',
      href: '/profile',
      icon: User,
    },
  ];

  return (
    <XStack
      backgroundColor="white"
      borderTopWidth={1}
      borderTopColor="#eee"
      height={60}
      justifyContent="space-around"
      alignItems="center"
      shadowColor="#000"
      shadowOffset={{ width: 0, height: -2 }}
      shadowOpacity={0.05}
      shadowRadius={3}
      elevation={5}
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.href;
        const Icon = tab.icon;
        
        return (
          <Link key={tab.name} href={tab.href} asChild>
            <TouchableOpacity style={{ alignItems: 'center' }}>
              <View padding="$2">
                <Icon
                  size={24}
                  color={isActive ? '#6c5ce7' : '#999'}
                />
                <Text
                  fontFamily="Poppins-Medium"
                  fontSize={12}
                  color={isActive ? '#6c5ce7' : '#999'}
                  marginTop="$1"
                >
                  {tab.name}
                </Text>
              </View>
            </TouchableOpacity>
          </Link>
        );
      })}
    </XStack>
  );
}