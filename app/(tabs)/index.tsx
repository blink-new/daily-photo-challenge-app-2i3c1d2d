
import React, { useEffect } from 'react';
import { View, YStack, XStack, Text, H2, ScrollView, Spinner } from 'tamagui';
import { useChallenge } from '../../context/challenge';
import { ChallengeCard } from '../../components/ChallengeCard';
import { SubmissionCard } from '../../components/SubmissionCard';
import { Camera } from 'lucide-react-native';
import { Button } from '../../components/ui/Button';
import { router } from 'expo-router';
import { RefreshControl } from 'react-native';

export default function Home() {
  const { 
    currentChallenge, 
    challenges, 
    submissions,
    loadingChallenges, 
    loadingSubmissions,
    fetchCurrentChallenge,
    fetchChallenges,
    fetchSubmissions
  } = useChallenge();
  
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await fetchCurrentChallenge();
    await fetchChallenges();
    if (currentChallenge) {
      await fetchSubmissions(currentChallenge.id);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  useEffect(() => {
    if (currentChallenge) {
      fetchSubmissions(currentChallenge.id);
    }
  }, [currentChallenge]);

  const handleCameraPress = () => {
    router.push('/camera');
  };

  return (
    <ScrollView 
      flex={1} 
      backgroundColor="$gray100"
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <YStack padding="$4" space="$6">
        <YStack space="$2">
          <H2 color="$gray800">Today's Challenge</H2>
          
          {loadingChallenges ? (
            <View height={200} justifyContent="center" alignItems="center">
              <Spinner size="large" color="$purple500" />
            </View>
          ) : currentChallenge ? (
            <YStack>
              <ChallengeCard challenge={currentChallenge} />
              <Button 
                variant="primary" 
                size="large" 
                onPress={handleCameraPress}
                marginHorizontal="$2"
                marginTop="$2"
              >
                <XStack space="$2" alignItems="center">
                  <Camera size={20} color="white" />
                  <Text color="white" fontSize="$4" fontWeight="600">
                    Submit Your Photo
                  </Text>
                </XStack>
              </Button>
            </YStack>
          ) : (
            <View 
              backgroundColor="white" 
              padding="$4" 
              borderRadius="$4" 
              alignItems="center"
              marginHorizontal="$2"
            >
              <Text color="$gray600" textAlign="center">
                No active challenge right now. Check back soon!
              </Text>
            </View>
          )}
        </YStack>

        <YStack space="$2">
          <H2 color="$gray800">Recent Submissions</H2>
          
          {loadingSubmissions ? (
            <View height={200} justifyContent="center" alignItems="center">
              <Spinner size="large" color="$purple500" />
            </View>
          ) : submissions.length > 0 ? (
            submissions.slice(0, 5).map(submission => (
              <SubmissionCard key={submission.id} submission={submission} />
            ))
          ) : (
            <View 
              backgroundColor="white" 
              padding="$4" 
              borderRadius="$4" 
              alignItems="center"
              marginHorizontal="$2"
            >
              <Text color="$gray600" textAlign="center">
                No submissions yet. Be the first to submit!
              </Text>
            </View>
          )}
        </YStack>

        <YStack space="$2">
          <H2 color="$gray800">Past Challenges</H2>
          
          {loadingChallenges ? (
            <View height={100} justifyContent="center" alignItems="center">
              <Spinner size="large" color="$purple500" />
            </View>
          ) : challenges.length > 0 ? (
            <YStack space="$2" marginHorizontal="$2">
              {challenges.slice(0, 3).map(challenge => (
                <ChallengeCard key={challenge.id} challenge={challenge} compact />
              ))}
            </YStack>
          ) : (
            <View 
              backgroundColor="white" 
              padding="$4" 
              borderRadius="$4" 
              alignItems="center"
              marginHorizontal="$2"
            >
              <Text color="$gray600" textAlign="center">
                No past challenges yet.
              </Text>
            </View>
          )}
        </YStack>
      </YStack>
    </ScrollView>
  );
}