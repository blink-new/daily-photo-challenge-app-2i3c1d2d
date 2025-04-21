
import React from 'react';
import { Card, Text, YStack, XStack, View, Avatar } from 'tamagui';
import { Image } from 'expo-image';
import { Submission } from '../context/challenge';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { useChallenge } from '../context/challenge';
import { Heart } from 'lucide-react-native';
import { Pressable } from 'react-native';

interface SubmissionCardProps {
  submission: Submission;
}

export const SubmissionCard: React.FC<SubmissionCardProps> = ({ submission }) => {
  const { likeSubmission } = useChallenge();
  const timeAgo = formatDistanceToNow(parseISO(submission.created_at), { addSuffix: true });
  
  const handleLike = () => {
    likeSubmission(submission.id);
  };
  
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
      <Card.Header padded>
        <XStack space="$2" alignItems="center">
          <Avatar circular size="$4">
            <Avatar.Image src={submission.avatar_url || undefined} />
            <Avatar.Fallback backgroundColor="$purple200">
              <Text color="$purple800" fontSize="$3">
                {submission.username?.charAt(0).toUpperCase() || 'U'}
              </Text>
            </Avatar.Fallback>
          </Avatar>
          <YStack>
            <Text fontSize="$3" fontWeight="600" color="$gray800">
              {submission.username || 'Anonymous'}
            </Text>
            <Text fontSize="$2" color="$gray600">
              {timeAgo}
            </Text>
          </YStack>
        </XStack>
      </Card.Header>
      
      <Image
        source={{ uri: submission.image_url }}
        style={{ width: '100%', height: 300 }}
        contentFit="cover"
      />
      
      <Card.Footer padded>
        <YStack space="$2" width="100%">
          {submission.caption && (
            <Text fontSize="$3" color="$gray800">
              {submission.caption}
            </Text>
          )}
          
          <XStack justifyContent="space-between" alignItems="center">
            <Pressable onPress={handleLike}>
              <XStack space="$1" alignItems="center">
                <Heart 
                  size={20} 
                  color="#7c3aed"
                  fill={submission.likes_count > 0 ? "#7c3aed" : "transparent"}
                />
                <Text color="$gray700" fontSize="$3">
                  {submission.likes_count || 0}
                </Text>
              </XStack>
            </Pressable>
          </XStack>
        </YStack>
      </Card.Footer>
    </Card>
  );
};