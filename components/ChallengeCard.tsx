
import React from 'react';
import { Card, Text, YStack, XStack, View } from 'tamagui';
import { Image } from 'expo-image';
import { Challenge } from '../context/challenge';
import { formatDistanceToNow, parseISO, isAfter } from 'date-fns';
import { router } from 'expo-router';
import { Button } from './ui/Button';
import { Clock } from 'lucide-react-native';

interface ChallengeCardProps {
  challenge: Challenge;
  compact?: boolean;
}

export const ChallengeCard: React.FC<ChallengeCardProps> = ({ 
  challenge,
  compact = false
}) => {
  const endDate = parseISO(challenge.end_date);
  const isActive = isAfter(endDate, new Date());
  
  const timeRemaining = isActive 
    ? formatDistanceToNow(endDate, { addSuffix: true })
    : 'Challenge ended';

  const handlePress = () => {
    router.push(`/challenge/${challenge.id}`);
  };

  if (compact) {
    return (
      <Card
        elevate
        bordered
        borderRadius="$4"
        overflow="hidden"
        backgroundColor="white"
        onPress={handlePress}
      >
        <XStack>
          <Image
            source={{ uri: challenge.image_url }}
            style={{ width: 80, height: 80 }}
            contentFit="cover"
          />
          <YStack flex={1} padding="$3" space="$1">
            <Text fontSize="$4" fontWeight="bold" color="$gray800" numberOfLines={1}>
              {challenge.title}
            </Text>
            <XStack alignItems="center" space="$1">
              <Clock size={14} color="#6b7280" />
              <Text fontSize="$2" color="$gray600">
                {timeRemaining}
              </Text>
            </XStack>
          </YStack>
        </XStack>
      </Card>
    );
  }

  return (
    <Card
      elevate
      bordered
      borderRadius="$4"
      overflow="hidden"
      backgroundColor="white"
      marginHorizontal="$2"
      marginBottom="$4"
    >
      <Image
        source={{ uri: challenge.image_url }}
        style={{ width: '100%', height: 180 }}
        contentFit="cover"
      />
      <Card.Header padded>
        <YStack space="$2">
          <Text fontSize="$5" fontWeight="bold" color="$gray800">
            {challenge.title}
          </Text>
          <Text fontSize="$3" color="$gray600" numberOfLines={2}>
            {challenge.description}
          </Text>
        </YStack>
      </Card.Header>
      
      <Card.Footer padded>
        <XStack justifyContent="space-between" alignItems="center" width="100%">
          <XStack alignItems="center" space="$1">
            <Clock size={16} color="#6b7280" />
            <Text fontSize="$3" color={isActive ? '$purple600' : '$gray600'} fontWeight={isActive ? '600' : '400'}>
              {timeRemaining}
            </Text>
          </XStack>
          <Button variant="primary" size="small" onPress={handlePress}>
            View Challenge
          </Button>
        </XStack>
      </Card.Footer>
    </Card>
  );
};