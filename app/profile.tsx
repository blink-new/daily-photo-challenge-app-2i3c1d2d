
import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { View, Text, YStack, XStack, Card, Image, Button, Avatar } from 'tamagui';
import { Link, router } from 'expo-router';
import { Settings, Grid3X3, Heart, MessageCircle, LogOut } from 'lucide-react-native';

// Mock user data
const USER = {
  name: 'Alex Johnson',
  username: '@alexj',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2070',
  bio: 'Photography enthusiast | Nature lover | Always looking for the perfect shot',
  stats: {
    posts: 24,
    followers: 843,
    following: 162,
  },
  posts: [
    {
      id: 'p1',
      image: 'https://images.unsplash.com/photo-1484627147104-f5197bcd6651?q=80&w=2070',
      likes: 42,
      comments: 7,
    },
    {
      id: 'p2',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1983',
      likes: 78,
      comments: 12,
    },
    {
      id: 'p3',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2080',
      likes: 103,
      comments: 15,
    },
    {
      id: 'p4',
      image: 'https://images.unsplash.com/photo-1515603403036-5249196d5b91?q=80&w=2070',
      likes: 35,
      comments: 5,
    },
    {
      id: 'p5',
      image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070',
      likes: 67,
      comments: 9,
    },
    {
      id: 'p6',
      image: 'https://images.unsplash.com/photo-1600618528240-fb9fc964b853?q=80&w=2070',
      likes: 54,
      comments: 8,
    },
  ],
  achievements: [
    'Challenge Winner - Urban Nature',
    'Most Liked Photo - April',
    'Consistent Contributor - 30 days streak',
  ],
};

export default function ProfileScreen() {
  return (
    <View flex={1} backgroundColor="#f8f9fa">
      {/* Header */}
      <View
        backgroundColor="#6c5ce7"
        paddingTop="$8"
        paddingBottom="$4"
        paddingHorizontal="$4"
      >
        <XStack alignItems="center" justifyContent="space-between">
          <Link href="/" asChild>
            <TouchableOpacity>
              <Text fontFamily="Poppins-Bold" fontSize={20} color="white">
                SnapChallenge
              </Text>
            </TouchableOpacity>
          </Link>
          <TouchableOpacity>
            <Settings size={24} color="white" />
          </TouchableOpacity>
        </XStack>
      </View>

      <ScrollView>
        {/* Profile Info */}
        <Card
          backgroundColor="white"
          margin="$4"
          borderRadius="$4"
          padding="$4"
          elevate
        >
          <XStack space="$4" alignItems="center">
            <Avatar circular size="$8">
              <Avatar.Image src={USER.avatar} />
              <Avatar.Fallback backgroundColor="#6c5ce7" />
            </Avatar>
            
            <YStack flex={1}>
              <Text fontFamily="Poppins-Bold" fontSize={20} color="#333">
                {USER.name}
              </Text>
              <Text fontFamily="Poppins-Regular" fontSize={14} color="#666">
                {USER.username}
              </Text>
            </YStack>
          </XStack>
          
          <Text fontFamily="Poppins-Regular" fontSize={14} color="#666" marginTop="$3">
            {USER.bio}
          </Text>
          
          {/* Stats */}
          <XStack marginTop="$4" justifyContent="space-around">
            <YStack alignItems="center">
              <Text fontFamily="Poppins-Bold" fontSize={18} color="#333">
                {USER.stats.posts}
              </Text>
              <Text fontFamily="Poppins-Regular" fontSize={14} color="#666">
                Posts
              </Text>
            </YStack>
            <YStack alignItems="center">
              <Text fontFamily="Poppins-Bold" fontSize={18} color="#333">
                {USER.stats.followers}
              </Text>
              <Text fontFamily="Poppins-Regular" fontSize={14} color="#666">
                Followers
              </Text>
            </YStack>
            <YStack alignItems="center">
              <Text fontFamily="Poppins-Bold" fontSize={18} color="#333">
                {USER.stats.following}
              </Text>
              <Text fontFamily="Poppins-Regular" fontSize={14} color="#666">
                Following
              </Text>
            </YStack>
          </XStack>
          
          <Button
            backgroundColor="#6c5ce7"
            color="white"
            fontFamily="Poppins-SemiBold"
            fontSize={16}
            height={45}
            marginTop="$4"
            icon={<LogOut size={18} color="white" />}
          >
            Sign Out
          </Button>
        </Card>
        
        {/* Achievements */}
        <YStack padding="$4" paddingTop={0} space="$3">
          <Text fontFamily="Poppins-SemiBold" fontSize={18} color="#333">
            Achievements
          </Text>
          
          <Card backgroundColor="white" borderRadius="$4" padding="$4" elevate>
            {USER.achievements.map((achievement, index) => (
              <XStack 
                key={index} 
                paddingVertical="$2"
                borderBottomWidth={index < USER.achievements.length - 1 ? 1 : 0}
                borderBottomColor="#eee"
                alignItems="center"
                space="$2"
              >
                <View width={8} height={8} borderRadius={4} backgroundColor="#6c5ce7" />
                <Text fontFamily="Poppins-Medium" fontSize={14} color="#333">
                  {achievement}
                </Text>
              </XStack>
            ))}
          </Card>
        </YStack>
        
        {/* Photos Grid */}
        <YStack padding="$4" paddingTop={0} space="$3">
          <XStack alignItems="center" space="$2">
            <Grid3X3 size={18} color="#333" />
            <Text fontFamily="Poppins-SemiBold" fontSize={18} color="#333">
              My Photos
            </Text>
          </XStack>
          
          <XStack flexWrap="wrap" justifyContent="space-between">
            {USER.posts.map((post) => (
              <TouchableOpacity key={post.id} style={{ width: '32%', marginBottom: 10 }}>
                <Card
                  width="100%"
                  aspectRatio={1}
                  overflow="hidden"
                  borderRadius="$2"
                >
                  <Image
                    source={{ uri: post.image }}
                    width="100%"
                    height="100%"
                    resizeMode="cover"
                  />
                  <View
                    position="absolute"
                    bottom={0}
                    left={0}
                    right={0}
                    padding="$1"
                    backgroundColor="rgba(0,0,0,0.3)"
                  >
                    <XStack justifyContent="space-between">
                      <XStack alignItems="center" space="$1">
                        <Heart size={12} color="white" />
                        <Text fontFamily="Poppins-Medium" fontSize={10} color="white">
                          {post.likes}
                        </Text>
                      </XStack>
                      <XStack alignItems="center" space="$1">
                        <MessageCircle size={12} color="white" />
                        <Text fontFamily="Poppins-Medium" fontSize={10} color="white">
                          {post.comments}
                        </Text>
                      </XStack>
                    </XStack>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </XStack>
        </YStack>
      </ScrollView>
    </View>
  );
}