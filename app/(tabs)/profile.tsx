
import React, { useEffect, useState } from 'react';
import { View, YStack, XStack, Text, H2, H3, ScrollView, Avatar, Separator } from 'tamagui';
import { useAuth } from '../../context/auth';
import { useChallenge } from '../../context/challenge';
import { Button } from '../../components/ui/Button';
import { Image } from 'expo-image';
import { Grid, LogOut, Settings, Award } from 'lucide-react-native';
import { RefreshControl } from 'react-native';
import { supabase } from '../../lib/supabase';

type Profile = {
  username: string;
  avatar_url: string | null;
  created_at: string;
};

export default function Profile() {
  const { user, signOut } = useAuth();
  const { userSubmissions, fetchUserSubmissions } = useChallenge();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user) {
      loadProfile();
      fetchUserSubmissions(user.id);
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('username, avatar_url, created_at')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (user) {
      await loadProfile();
      await fetchUserSubmissions(user.id);
    }
    setRefreshing(false);
  };

  if (!user) {
    return null;
  }

  return (
    <ScrollView 
      flex={1} 
      backgroundColor="$gray100"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <YStack padding="$4" space="$6">
        <YStack 
          backgroundColor="white" 
          borderRadius="$4" 
          padding="$4"
          alignItems="center"
          space="$4"
        >
          <Avatar circular size="$10">
            <Avatar.Image src={profile?.avatar_url || undefined} />
            <Avatar.Fallback backgroundColor="$purple200">
              <Text color="$purple800" fontSize="$6" fontWeight="bold">
                {profile?.username?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </Avatar.Fallback>
          </Avatar>
          
          <YStack alignItems="center" space="$1">
            <H2 color="$gray800">{profile?.username || 'User'}</H2>
            <Text color="$gray600">{user.email}</Text>
          </YStack>
          
          <XStack space="$4">
            <YStack alignItems="center">
              <Text fontSize="$5" fontWeight="bold" color="$purple600">
                {userSubmissions.length}
              </Text>
              <Text color="$gray600">Submissions</Text>
            </YStack>
            
            <Separator vertical />
            
            <YStack alignItems="center">
              <Text fontSize="$5" fontWeight="bold" color="$purple600">
                0
              </Text>
              <Text color="$gray600">Wins</Text>
            </YStack>
          </XStack>
          
          <XStack space="$2">
            <Button variant="outline" size="small" icon={<Settings size={16} />}>
              Edit Profile
            </Button>
            <Button 
              variant="secondary" 
              size="small" 
              icon={<LogOut size={16} />}
              onPress={signOut}
            >
              Sign Out
            </Button>
          </XStack>
        </YStack>

        <YStack space="$2">
          <H3 color="$gray800">Your Submissions</H3>
          
          {userSubmissions.length > 0 ? (
            <YStack>
              <XStack flexWrap="wrap">
                {userSubmissions.map((submission, index) => (
                  <View 
                    key={submission.id} 
                    width="33%" 
                    aspectRatio={1}
                    padding="$1"
                  >
                    <Image
                      source={{ uri: submission.image_url }}
                      style={{ flex: 1, borderRadius: 8 }}
                      contentFit="cover"
                    />
                  </View>
                ))}
              </XStack>
            </YStack>
          ) : (
            <View 
              backgroundColor="white" 
              padding="$4" 
              borderRadius="$4" 
              alignItems="center"
              space="$2"
            >
              <Grid size={40} color="#7c3aed" opacity={0.5} />
              <Text color="$gray600" textAlign="center">
                You haven't submitted any photos yet.
              </Text>
              <Text color="$gray600" textAlign="center">
                Join a challenge to get started!
              </Text>
            </View>
          )}
        </YStack>

        <YStack space="$2">
          <H3 color="$gray800">Achievements</H3>
          
          <View 
            backgroundColor="white" 
            padding="$4" 
            borderRadius="$4" 
            alignItems="center"
            space="$2"
          >
            <Award size={40} color="#7c3aed" opacity={0.5} />
            <Text color="$gray600" textAlign="center">
              Complete challenges to earn achievements
            </Text>
          </View>
        </YStack>
      </YStack>
    </ScrollView>
  );
}