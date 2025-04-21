
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, YStack, XStack, Card, Image, Button } from 'tamagui';
import { useLocalSearchParams, Link, router } from 'expo-router';
import { ArrowLeft, Heart, MessageCircle, Clock, Camera } from 'lucide-react-native';

// Mock data for challenges
const CHALLENGES = {
  '1': {
    id: '1',
    title: 'Morning Routine',
    description: 'Share your morning routine with the community. Show us how you start your day, whether it\'s with meditation, exercise, breakfast, or something unique to you!',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070',
    timeRemaining: '8 hours',
    participants: 128,
    submissions: [
      {
        id: 's1',
        user: {
          name: 'Jessica Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974',
        },
        image: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?q=80&w=2070',
        caption: 'Starting my day with meditation and a good book',
        likes: 42,
        comments: 7,
        timeAgo: '2h',
      },
      {
        id: 's2',
        user: {
          name: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1974',
        },
        image: 'https://images.unsplash.com/photo-1515603403036-5249196d5b91?q=80&w=2070',
        caption: 'Morning run by the lake - best way to start the day!',
        likes: 35,
        comments: 5,
        timeAgo: '3h',
      },
    ],
  },
  '2': {
    id: '2',
    title: 'Urban Nature',
    description: 'Find nature in unexpected urban places. Look for plants growing through cracks in the sidewalk, birds nesting on buildings, or hidden gardens in the city.',
    image: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=2071',
    timeRemaining: '12 hours',
    participants: 87,
    submissions: [
      {
        id: 's1',
        user: {
          name: 'Marcus Johnson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974',
        },
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983',
        caption: 'Found this little garden between skyscrapers',
        likes: 78,
        comments: 12,
        timeAgo: '4h',
      },
    ],
  },
  '3': {
    id: '3',
    title: 'Colorful Food',
    description: 'Show us your most colorful meal of the day. The more vibrant and diverse the colors, the better! Share your rainbow plates and colorful creations.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
    timeRemaining: '5 hours',
    participants: 156,
    submissions: [
      {
        id: 's1',
        user: {
          name: 'Sophia Williams',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070',
        },
        image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080',
        caption: 'Rainbow salad for lunch today! #healthyeating',
        likes: 103,
        comments: 15,
        timeAgo: '6h',
      },
    ],
  },
};

export default function ChallengeDetail() {
  const { id } = useLocalSearchParams();
  const challenge = CHALLENGES[id as string];

  if (!challenge) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Challenge not found</Text>
      </View>
    );
  }

  return (
    <View flex={1} backgroundColor="#f8f9fa">
      {/* Header */}
      <View
        backgroundColor="#6c5ce7"
        paddingTop="$8"
        paddingBottom="$4"
        paddingHorizontal="$4"
      >
        <XStack alignItems="center">
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft size={24} color="white" />
          </TouchableOpacity>
          <Text
            fontFamily="Poppins-Bold"
            fontSize={20}
            color="white"
            textAlign="center"
            flex={1}
          >
            Challenge Details
          </Text>
          <View width={24} /> {/* For balance */}
        </XStack>
      </View>

      <ScrollView>
        {/* Challenge Info */}
        <Card
          backgroundColor="white"
          margin="$4"
          borderRadius="$4"
          overflow="hidden"
          elevate
        >
          <Image
            source={{ uri: challenge.image }}
            width="100%"
            height={200}
            resizeMode="cover"
          />
          <YStack padding="$4" space="$2">
            <Text fontFamily="Poppins-Bold" fontSize={22} color="#333">
              {challenge.title}
            </Text>
            <Text fontFamily="Poppins-Regular" fontSize={14} color="#666" lineHeight={20}>
              {challenge.description}
            </Text>
            
            <XStack marginTop="$3" space="$4" alignItems="center">
              <XStack alignItems="center" space="$1">
                <Clock size={18} color="#6c5ce7" />
                <Text fontFamily="Poppins-Medium" fontSize={14} color="#6c5ce7">
                  {challenge.timeRemaining} left
                </Text>
              </XStack>
              <Text fontFamily="Poppins-Medium" fontSize={14} color="#666">
                {challenge.participants} participants
              </Text>
            </XStack>
          </YStack>
        </Card>

        {/* Submit Button */}
        <Link href={`/camera?challengeId=${challenge.id}`} asChild>
          <TouchableOpacity>
            <Button
              backgroundColor="#6c5ce7"
              color="white"
              fontFamily="Poppins-SemiBold"
              fontSize={16}
              height={50}
              marginHorizontal="$4"
              marginBottom="$4"
              icon={<Camera size={18} color="white" />}
            >
              Submit Your Photo
            </Button>
          </TouchableOpacity>
        </Link>

        {/* Recent Submissions */}
        <YStack padding="$4" paddingTop={0} space="$3">
          <Text fontFamily="Poppins-SemiBold" fontSize={18} color="#333">
            Recent Submissions
          </Text>
          
          {challenge.submissions.map((submission) => (
            <Card
              key={submission.id}
              backgroundColor="white"
              borderRadius="$4"
              overflow="hidden"
              marginBottom="$3"
              elevate
            >
              {/* User info */}
              <XStack padding="$3" alignItems="center" space="$2">
                <Image
                  source={{ uri: submission.user.avatar }}
                  width={40}
                  height={40}
                  borderRadius={20}
                />
                <Text fontFamily="Poppins-SemiBold" fontSize={14} color="#333">
                  {submission.user.name}
                </Text>
                <Text fontFamily="Poppins-Regular" fontSize={12} color="#999" marginLeft="auto">
                  {submission.timeAgo}
                </Text>
              </XStack>
              
              {/* Image */}
              <Image
                source={{ uri: submission.image }}
                width="100%"
                height={300}
                resizeMode="cover"
              />
              
              {/* Caption */}
              <YStack padding="$3" space="$2">
                <Text fontFamily="Poppins-Regular" fontSize={14} color="#333">
                  {submission.caption}
                </Text>
                
                {/* Actions */}
                <XStack marginTop="$1" space="$4">
                  <XStack alignItems="center" space="$1">
                    <TouchableOpacity>
                      <Heart size={20} color="#666" />
                    </TouchableOpacity>
                    <Text fontFamily="Poppins-Medium" fontSize={14} color="#666">
                      {submission.likes}
                    </Text>
                  </XStack>
                  <XStack alignItems="center" space="$1">
                    <TouchableOpacity>
                      <MessageCircle size={20} color="#666" />
                    </TouchableOpacity>
                    <Text fontFamily="Poppins-Medium" fontSize={14} color="#666">
                      {submission.comments}
                    </Text>
                  </XStack>
                </XStack>
              </YStack>
            </Card>
          ))}

          {challenge.submissions.length === 0 && (
            <View
              backgroundColor="white"
              padding="$4"
              borderRadius="$4"
              alignItems="center"
              justifyContent="center"
              height={150}
            >
              <Text fontFamily="Poppins-Medium" fontSize={16} color="#666" textAlign="center">
                No submissions yet.
                Be the first to share your photo!
              </Text>
            </View>
          )}
        </YStack>
      </ScrollView>
    </View>
  );
}