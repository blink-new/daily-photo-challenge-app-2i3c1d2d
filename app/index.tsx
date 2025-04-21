
import { useState, useRef, useEffect } from 'react';
import { FlatList, Dimensions, Animated, RefreshControl } from 'react-native';
import { router } from 'expo-router';
import { 
  YStack, 
  XStack, 
  Text, 
  View, 
  Button, 
  Card, 
  Avatar, 
  Image,
  ScrollView,
  H1,
  H2,
  Separator
} from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { Camera, Heart, MessageCircle, Plus, Award, Clock, Users } from 'lucide-react-native';

// Mock data
const CHALLENGES = [
  {
    id: '1',
    title: 'Morning Coffee',
    description: 'Share your morning coffee setup!',
    timeRemaining: '5h 23m',
    participants: 128,
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '2',
    title: 'Urban Architecture',
    description: 'Capture interesting buildings around you',
    timeRemaining: '8h 45m',
    participants: 87,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '3',
    title: 'Pet Portraits',
    description: 'Show off your furry friends!',
    timeRemaining: '11h 10m',
    participants: 215,
    coverImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop'
  },
];

const FEED_ITEMS = [
  {
    id: '1',
    user: {
      name: 'Jessica Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
    },
    challenge: 'Sunset Vibes',
    image: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?q=80&w=2070&auto=format&fit=crop',
    likes: 124,
    comments: 18,
    timeAgo: '32m'
  },
  {
    id: '2',
    user: {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
    },
    challenge: 'Urban Jungle',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2144&auto=format&fit=crop',
    likes: 89,
    comments: 7,
    timeAgo: '1h'
  },
  {
    id: '3',
    user: {
      name: 'Sophia Williams',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
    },
    challenge: 'Morning Coffee',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1974&auto=format&fit=crop',
    likes: 215,
    comments: 24,
    timeAgo: '2h'
  },
];

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.8;
const SPACING = width * 0.05;

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate a refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <View flex={1} backgroundColor="#f8f9fa">
      {/* Header */}
      <View 
        paddingTop="$10" 
        paddingHorizontal="$4" 
        backgroundColor="#6c5ce7"
        borderBottomLeftRadius="$6"
        borderBottomRightRadius="$6"
      >
        <XStack justifyContent="space-between" alignItems="center" paddingBottom="$4">
          <H1 color="white" fontFamily="Poppins-Bold">
            Daily Lens
          </H1>
          <Button
            size="$3"
            circular
            backgroundColor="rgba(255,255,255,0.2)"
            pressStyle={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            onPress={() => router.push('/camera')}
          >
            <Camera size={20} color="white" />
          </Button>
        </XStack>
      </View>

      <ScrollView
        flex={1}
        contentContainerStyle={{ paddingBottom: 100 }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Active Challenges */}
        <YStack space="$2" padding="$4">
          <XStack justifyContent="space-between" alignItems="center">
            <H2 fontFamily="Poppins-SemiBold" color="#333">Today's Challenges</H2>
            <Text color="#6c5ce7" fontFamily="Poppins-Medium">View All</Text>
          </XStack>
          
          <View height={220}>
            <Animated.FlatList
              data={CHALLENGES}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingLeft: SPACING, paddingRight: SPACING * 2 }}
              snapToInterval={CARD_WIDTH + SPACING}
              decelerationRate="fast"
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * (CARD_WIDTH + SPACING),
                  index * (CARD_WIDTH + SPACING),
                  (index + 1) * (CARD_WIDTH + SPACING),
                ];
                
                const scale = scrollX.interpolate({
                  inputRange,
                  outputRange: [0.9, 1, 0.9],
                  extrapolate: 'clamp',
                });
                
                return (
                  <Animated.View
                    style={{
                      width: CARD_WIDTH,
                      marginRight: SPACING,
                      transform: [{ scale }],
                    }}
                  >
                    <Card
                      elevate
                      bordered
                      borderWidth={0}
                      height={200}
                      scale={1}
                      animation="bouncy"
                      pressStyle={{ scale: 0.98 }}
                      onPress={() => router.push(`/challenge/${item.id}`)}
                      overflow="hidden"
                    >
                      <Image
                        source={{ uri: item.coverImage }}
                        alt={item.title}
                        style={{ 
                          position: 'absolute', 
                          width: '100%', 
                          height: '100%' 
                        }}
                        resizeMode="cover"
                      />
                      <LinearGradient
                        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.7)']}
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                        }}
                      />
                      <YStack flex={1} justifyContent="space-between" padding="$4">
                        <XStack space="$2" alignItems="center">
                          <View 
                            backgroundColor="rgba(255,255,255,0.9)" 
                            paddingHorizontal="$2" 
                            paddingVertical="$1"
                            borderRadius="$4"
                          >
                            <XStack space="$1" alignItems="center">
                              <Clock size={14} color="#6c5ce7" />
                              <Text fontSize="$2" fontFamily="Poppins-Medium" color="#333">
                                {item.timeRemaining}
                              </Text>
                            </XStack>
                          </View>
                          <View 
                            backgroundColor="rgba(255,255,255,0.9)" 
                            paddingHorizontal="$2" 
                            paddingVertical="$1"
                            borderRadius="$4"
                          >
                            <XStack space="$1" alignItems="center">
                              <Users size={14} color="#6c5ce7" />
                              <Text fontSize="$2" fontFamily="Poppins-Medium" color="#333">
                                {item.participants}
                              </Text>
                            </XStack>
                          </View>
                        </XStack>
                        <YStack>
                          <Text 
                            fontSize="$6" 
                            fontFamily="Poppins-Bold" 
                            color="white"
                            shadowColor="rgba(0,0,0,0.5)"
                            shadowOffset={{ width: 0, height: 1 }}
                            shadowRadius={2}
                          >
                            {item.title}
                          </Text>
                          <Text 
                            fontSize="$3" 
                            fontFamily="Poppins-Regular" 
                            color="rgba(255,255,255,0.9)"
                            shadowColor="rgba(0,0,0,0.5)"
                            shadowOffset={{ width: 0, height: 1 }}
                            shadowRadius={2}
                          >
                            {item.description}
                          </Text>
                        </YStack>
                      </YStack>
                    </Card>
                  </Animated.View>
                );
              }}
              keyExtractor={item => item.id}
            />
          </View>
        </YStack>

        {/* Trending Photos */}
        <YStack space="$4" paddingHorizontal="$4" marginTop="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <H2 fontFamily="Poppins-SemiBold" color="#333">Trending Photos</H2>
            <Text color="#6c5ce7" fontFamily="Poppins-Medium">View All</Text>
          </XStack>

          <YStack space="$4">
            {FEED_ITEMS.map(item => (
              <Card
                key={item.id}
                elevate
                bordered
                borderWidth={0}
                overflow="hidden"
                scale={1}
                animation="bouncy"
                pressStyle={{ scale: 0.98 }}
              >
                <Card.Header paddingHorizontal="$4" paddingVertical="$3">
                  <XStack space="$3" alignItems="center">
                    <Avatar circular size="$4">
                      <Avatar.Image src={item.user.avatar} />
                      <Avatar.Fallback backgroundColor="#6c5ce7" />
                    </Avatar>
                    <YStack>
                      <Text fontFamily="Poppins-SemiBold" fontSize="$4" color="#333">
                        {item.user.name}
                      </Text>
                      <XStack space="$1" alignItems="center">
                        <Award size={14} color="#6c5ce7" />
                        <Text fontFamily="Poppins-Medium" fontSize="$2" color="#666">
                          {item.challenge} • {item.timeAgo}
                        </Text>
                      </XStack>
                    </YStack>
                  </XStack>
                </Card.Header>

                <Image
                  source={{ uri: item.image }}
                  alt={`Photo by ${item.user.name}`}
                  style={{ width: '100%', height: 300 }}
                  resizeMode="cover"
                />

                <Card.Footer paddingHorizontal="$4" paddingVertical="$3">
                  <XStack justifyContent="space-between">
                    <XStack space="$4">
                      <XStack space="$1" alignItems="center">
                        <Button
                          size="$3"
                          circular
                          backgroundColor="transparent"
                          pressStyle={{ backgroundColor: 'rgba(108, 92, 231, 0.1)' }}
                        >
                          <Heart size={22} color="#6c5ce7" />
                        </Button>
                        <Text fontFamily="Poppins-Medium" color="#333">{item.likes}</Text>
                      </XStack>
                      <XStack space="$1" alignItems="center">
                        <Button
                          size="$3"
                          circular
                          backgroundColor="transparent"
                          pressStyle={{ backgroundColor: 'rgba(108, 92, 231, 0.1)' }}
                        >
                          <MessageCircle size={22} color="#6c5ce7" />
                        </Button>
                        <Text fontFamily="Poppins-Medium" color="#333">{item.comments}</Text>
                      </XStack>
                    </XStack>
                  </XStack>
                </Card.Footer>
              </Card>
            ))}
          </YStack>
        </YStack>
      </ScrollView>

      {/* Floating Action Button */}
      <View
        position="absolute"
        bottom={30}
        alignSelf="center"
      >
        <Button
          size="$5"
          circular
          backgroundColor="#6c5ce7"
          pressStyle={{ backgroundColor: '#5a4ad1' }}
          shadowColor="rgba(108, 92, 231, 0.4)"
          shadowOffset={{ width: 0, height: 4 }}
          shadowOpacity={0.3}
          shadowRadius={8}
          onPress={() => router.push('/camera')}
        >
          <Plus size={24} color="white" />
        </Button>
      </View>
    </View>
  );
}