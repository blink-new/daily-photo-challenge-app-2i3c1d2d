
import React, { useEffect, useState } from 'react';
import { View, YStack, XStack, Text, H2, ScrollView, Spinner } from 'tamagui';
import { useLocalSearchParams, router } from 'expo-router';
import { useChallenge, Challenge } from '../../context/challenge';
import { ChallengeTimer } from '../../components/ChallengeTimer';
import { SubmissionCard } from '../../components/SubmissionCard';
import { Button } from '../../components/ui/Button';
import { Image } from 'expo-image';
import { Camera, ArrowLeft } from 'lucide-react-native';
import { RefreshControl } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function ChallengeDetail() {
  const { id } = useLocalSearchParams();
  const { submissions, fetchSubmissions, loadingSubmissions } = useChallenge();
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (id) {
      loadChallenge();
      fetchSubmissions(id as string);
    }
  }, [id]);

  const loadChallenge = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('challenges')
        .select('*')
        .eq('id', id)
        .single();
      
      if (error) throw error;
      setChallenge(data);
    } catch (error) {
      console.error('Error loading challenge:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    if (id) {
      await loadChallenge();
      await fetchSubmissions(id as string);
    }
    setRefreshing(false);
  };

  const handleCameraPress = () => {
    router.push('/camera');
  };

  const handleBackPress = () => {
    router.back();
  };

  if (loading) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" backgroundColor="$gray100">
        <Spinner size="large" color="$purple500" />
      </View>
    );
  }

  if (!challenge) {
    return (
      <View flex={1} justifyContent="center" alignItems="center" backgroundColor="$gray100" padding="$4">
        <Text textAlign="center">Challenge not found</Text>
        <Button variant="primary" marginTop="$4" onPress={handleBackPress}>
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <ScrollView 
      flex={1} 
      backgroundColor="$gray100"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <YStack>
        <View position="relative">
          <Image
            source={{ uri: challenge.image_url }}
            style={{ width: '100%', height: 250 }}
            contentFit="cover"
          />
          
          <View
            position="absolute"
            top={40}
            left={20}
            backgroundColor="rgba(0,0,0,0.5)"
            borderRadius={20}
            padding="$2"
          >
            <ArrowLeft size={24} color="white" onPress={handleBackPress} />
          </View>
          
          <View
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            backgroundColor="rgba(0,0,0,0.6)"
            padding="$4"
          >
            <H2 color="white">{challenge.title}</H2>
          </View>
        </View>
        
        <YStack padding="$4" space="$4">
          <Text fontSize="$3" color="$gray700">
            {challenge.description}
          </Text>
          
          <ChallengeTimer startDate={challenge.start_date} endDate={challenge.end_date} />
          
          <Button 
            variant="primary" 
            size="large" 
            onPress={handleCameraPress}
          >
            <XStack space="$2" alignItems="center">
              <Camera size={20} color="white" />
              <Text color="white" fontSize="$4" fontWeight="600">
                Submit Your Photo
              </Text>
            </XStack>
          </Button>
          
          <YStack space="$2" marginTop="$2">
            <H2 color="$gray800">Submissions</H2>
            
            {loadingSubmissions ? (
              <View height={200} justifyContent="center" alignItems="center">
                <Spinner size="large" color="$purple500" />
              </View>
            ) : submissions.length > 0 ? (
              submissions.map(submission => (
                <SubmissionCard key={submission.id} submission={submission} />
              ))
            ) : (
              <View 
                backgroundColor="white" 
                padding="$4" 
                borderRadius="$4" 
                alignItems="center"
              >
                <Text color="$gray600" textAlign="center">
                  No submissions yet. Be the first to submit!
                </Text>
              </View>
            )}
          </YStack>
        </YStack>
      </YStack>
    </ScrollView>
  );
}