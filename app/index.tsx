
import React, { useState } from 'react';
import { ScrollView, RefreshControl, TouchableOpacity } from 'react-native';
import { View, Text, YStack, XStack, Card, Image, Button } from 'tamagui';
import { Link } from 'expo-router';
import { Camera, Heart, MessageCircle, Plus } from 'lucide-react-native';

// Mock data for challenges
const CHALLENGES = [
  {
    id: '1',
    title: 'Morning Routine',
    description: 'Share your morning routine with the community',
    image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070',
    timeRemaining: '8 hours',
    participants: 128,
  },
  {
    id: '2',
    title: 'Urban Nature',
    description: 'Find nature in unexpected urban places',
    image: 'https://images.unsplash.com/photo-1518005068251-37900150dfca?q=80&w=2071',
    timeRemaining: '12 hours',
    participants: 87,
  },
  {
    id: '3',
    title: 'Colorful Food',
    description: 'Show us your most colorful meal of the day',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
    timeRemaining: '5 hours',
    participants: 156,
  },
];

// Mock data for feed
const FEED_ITEMS = [
  {
    id: '1',
    user: {
      name: 'Jessica Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974',
    },
    challenge: 'Morning Routine',
    image: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?q=80&w=2070',
    caption: 'Starting my day with meditation and a good book',
    likes: 42,
    comments: 7,
    timeAgo: '2h',
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974',
    },
    challenge: 'Urban Nature',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983',
    caption: 'Found this little garden between skyscrapers',
    likes: 78,
    comments: 12,
    timeAgo: '4h',
  },
  {
    id: '3',
    user: {
      name: 'Sophia Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070',
    },
    challenge: 'Colorful Food',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080',
    caption: 'Rainbow salad for lunch today! #healthyeating',
    likes: 103,
    comments: 15,
    timeAgo: '6h',
  },
];

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View flex={1} backgroundColor="#f8f9fa">
      {/* Header */}
      <View
        backgroundColor="#6c5ce7"
        paddingTop="$8"
        paddingBottom="$4"
        paddingHorizontal="$4"
      >
        <Text
          fontFamily="Poppins-Bold"
          fontSize={24}
          color="white"
          textAlign="center"
        >
          SnapChallenge
        </Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Today's Challenges */}
        <YStack padding="$4" space="$3">
          <Text fontFamily="Poppins-SemiBold" fontSize={18} color="#333">
            Today's Challenges
          </Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <XStack space="$3" paddingVertical="$2">
              {CHALLENGES.map((challenge) => (
                <Link
                  key={challenge.id}
                  href={`/challenge/${challenge.id}`}
                  asChild
                >
                  <TouchableOpacity>
                    <Card
                      width={250}
                      height={180}
                      overflow="hidden"
                      borderRadius="$4"
                      backgroundColor="white"
                      elevate
                    >
                      <Image
                        source={{ uri: challenge.image }}
                        width="100%"
                        height={100}
                        resizeMode="cover"
                      />
                      <YStack padding="$3" space="$1">
                        <Text fontFamily="Poppins-SemiBold" fontSize={16} color="#333">
                          {challenge.title}
                        </Text>
                        <Text fontFamily="Poppins-Regular" fontSize={12} color="#666" numberOfLines={1}>
                          {challenge.description}
                        </Text>
                        <XStack justifyContent="space-between" marginTop="$1">
                          <Text fontFamily="Poppins-Medium" fontSize={12} color="#6c5ce7">
                            {challenge.timeRemaining} left
                          </Text>
                          <Text fontFamily="Poppins-Medium" fontSize={12} color="#666">
                            {challenge.participants} participants
                          </Text>
                        </XStack>
                      </YStack>
                    </Card>
                  </TouchableOpacity>
                </Link>
              ))}
            </XStack>
          </ScrollView>
        </YStack>

        {/* Feed */}
        <YStack padding="$4" space="$4">
          <Text fontFamily="Poppins-SemiBold" fontSize={18} color="#333">
            Trending Photos
          </Text>
          
          {FEED_ITEMS.map((item) => (
            <Card
              key={item.id}
              backgroundColor="white"
              borderRadius="$4"
              overflow="hidden"
              marginBottom="$3"
              elevate
            >
              {/* User info */}
              <XStack padding="$3" alignItems="center" space="$2">
                <Image
                  source={{ uri: item.user.avatar }}
                  width={40}
                  height={40}
                  borderRadius={20}
                />
                <YStack>
                  <Text fontFamily="Poppins-SemiBold" fontSize={14} color="#333">
                    {item.user.name}
                  </Text>
                  <Text fontFamily="Poppins-Regular" fontSize={12} color="#6c5ce7">
                    #{item.challenge}
                  </Text>
                </YStack>
                <Text fontFamily="Poppins-Regular" fontSize={12} color="#999" marginLeft="auto">
                  {item.timeAgo}
                </Text>
              </XStack>
              
              {/* Image */}
              <Image
                source={{ uri: item.image }}
                width="100%"
                height={300}
                resizeMode="cover"
              />
              
              {/* Caption */}
              <YStack padding="$3" space="$2">
                <Text fontFamily="Poppins-Regular" fontSize={14} color="#333">
                  {item.caption}
                </Text>
                
                {/* Actions */}
                <XStack marginTop="$1" space="$4">
                  <XStack alignItems="center" space="$1">
                    <TouchableOpacity>
                      <Heart size={20} color="#666" />
                    </TouchableOpacity>
                    <Text fontFamily="Poppins-Medium" fontSize={14} color="#666">
                      {item.likes}
                    </Text>
                  </XStack>
                  <XStack alignItems="center" space="$1">
                    <TouchableOpacity>
                      <MessageCircle size={20} color="#666" />
                    </TouchableOpacity>
                    <Text fontFamily="Poppins-Medium" fontSize={14} color="#666">
                      {item.comments}
                    </Text>
                  </XStack>
                </XStack>
              </YStack>
            </Card>
          ))}
        </YStack>
      </ScrollView>

      {/* Floating Action Button */}
      <Link href="/camera" asChild>
        <TouchableOpacity>
          <View
            position="absolute"
            bottom={30}
            right={30}
            width={60}
            height={60}
            borderRadius={30}
            backgroundColor="#6c5ce7"
            justifyContent="center"
            alignItems="center"
            shadowColor="#000"
            shadowOffset={{ width: 0, height: 2 }}
            shadowOpacity={0.25}
            shadowRadius={3.84}
            elevation={5}
          >
            <Camera size={24} color="white" />
          </View>
        </TouchableOpacity>
      </Link>
    </View>
  );
}