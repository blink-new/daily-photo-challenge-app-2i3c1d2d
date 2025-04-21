
import { useLocalSearchParams, router } from 'expo-router';
import { useState } from 'react';
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
  Separator,
  Input
} from 'tamagui';
import { LinearGradient } from 'expo-linear-gradient';
import { ArrowLeft, Camera, Heart, MessageCircle, Award, Clock, Users, Send } from 'lucide-react-native';

// Mock data for challenge details
const CHALLENGE_DETAILS = {
  '1': {
    id: '1',
    title: 'Morning Coffee',
    description: 'Share your morning coffee setup! Show us how you start your day with your favorite brew. Capture the ambiance, the cup, and anything that makes your coffee time special.',
    timeRemaining: '5h 23m',
    participants: 128,
    coverImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop',
    submissions: [
      {
        id: '101',
        user: {
          name: 'Emma Wilson',
          avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1976&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1974&auto=format&fit=crop',
        likes: 87,
        comments: 12,
        timeAgo: '45m'
      },
      {
        id: '102',
        user: {
          name: 'Daniel Lee',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1511537190424-bbbab87ac5eb?q=80&w=1970&auto=format&fit=crop',
        likes: 64,
        comments: 8,
        timeAgo: '1h'
      },
      {
        id: '103',
        user: {
          name: 'Olivia Martinez',
          avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1964&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1497935586047-9397d4dc1cbd?q=80&w=1971&auto=format&fit=crop',
        likes: 112,
        comments: 15,
        timeAgo: '2h'
      }
    ]
  },
  '2': {
    id: '2',
    title: 'Urban Architecture',
    description: 'Capture interesting buildings around you. Look for unique angles, patterns, and perspectives that showcase the beauty of urban design.',
    timeRemaining: '8h 45m',
    participants: 87,
    coverImage: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?q=80&w=2070&auto=format&fit=crop',
    submissions: [
      {
        id: '201',
        user: {
          name: 'Noah Thompson',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1971&auto=format&fit=crop',
        likes: 93,
        comments: 11,
        timeAgo: '30m'
      },
      {
        id: '202',
        user: {
          name: 'Sophia Garcia',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1964&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=1972&auto=format&fit=crop',
        likes: 78,
        comments: 9,
        timeAgo: '1h'
      }
    ]
  },
  '3': {
    id: '3',
    title: 'Pet Portraits',
    description: 'Show off your furry friends! Capture their personality, expressions, and the special bond you share with your pets.',
    timeRemaining: '11h 10m',
    participants: 215,
    coverImage: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=2069&auto=format&fit=crop',
    submissions: [
      {
        id: '301',
        user: {
          name: 'Liam Johnson',
          avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=2048&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=2043&auto=format&fit=crop',
        likes: 145,
        comments: 22,
        timeAgo: '15m'
      },
      {
        id: '302',
        user: {
          name: 'Ava Williams',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?q=80&w=1974&auto=format&fit=crop',
        likes: 118,
        comments: 14,
        timeAgo: '45m'
      },
      {
        id: '303',
        user: {
          name: 'Ethan Brown',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
        },
        image: 'https://images.unsplash.com/photo-1548247416-ec66f4900b2e?q=80&w=1920&auto=format&fit=crop',
        likes: 132,
        comments: 18,
        timeAgo: '1h'
      }
    ]
  }
};

export default function ChallengeDetail() {
  const { id } = useLocalSearchParams();
  const [comment, setComment] = useState('');
  
  // Get challenge data based on ID
  const challenge = CHALLENGE_DETAILS[id as string];
  
  if (!challenge) {
    return (
      <View flex={1} justifyContent="center" alignItems="center">
        <Text>Challenge not found</Text>
        <Button onPress={() => router.back()}>Go Back</Button>
      </View>
    );
  }

  return (
    <View flex={1} backgroundColor="#f8f9fa">
      {/* Header with Cover Image */}
      <View height={250}>
        <Image
          source={{ uri: challenge.coverImage }}
          alt={challenge.title}
          style={{ width: '100%', height: '100%' }}
          resizeMode="cover"
        />
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent', 'rgba(0,0,0,0.6)']}
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
        />
        <View 
          position="absolute" 
          top={50} 
          left={20} 
          right={20}
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            size="$3"
            circular
            backgroundColor="rgba(255,255,255,0.2)"
            pressStyle={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="white" />
          </Button>
          <Button
            size="$3"
            circular
            backgroundColor="rgba(255,255,255,0.2)"
            pressStyle={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            onPress={() => router.push('/camera')}
          >
            <Camera size={20} color="white" />
          </Button>
        </View>
        <View position="absolute" bottom={20} left={20} right={20}>
          <Text 
            fontSize="$8" 
            fontFamily="Poppins-Bold" 
            color="white"
            shadowColor="rgba(0,0,0,0.5)"
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={2}
          >
            {challenge.title}
          </Text>
        </View>
      </View>

      <ScrollView flex={1} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Challenge Info */}
        <YStack padding="$4" space="$4">
          <YStack space="$2">
            <Text fontSize="$4" fontFamily="Poppins-Medium" color="#333">
              Challenge Details
            </Text>
            <Text fontSize="$3" fontFamily="Poppins-Regular" color="#666" lineHeight={22}>
              {challenge.description}
            </Text>
          </YStack>

          <XStack space="$4">
            <Card elevate bordered flex={1} padding="$3">
              <XStack space="$2" alignItems="center" justifyContent="center">
                <Clock size={18} color="#6c5ce7" />
                <YStack>
                  <Text fontSize="$2" fontFamily="Poppins-Regular" color="#666">Time Left</Text>
                  <Text fontSize="$3" fontFamily="Poppins-SemiBold" color="#333">{challenge.timeRemaining}</Text>
                </YStack>
              </XStack>
            </Card>
            <Card elevate bordered flex={1} padding="$3">
              <XStack space="$2" alignItems="center" justifyContent="center">
                <Users size={18} color="#6c5ce7" />
                <YStack>
                  <Text fontSize="$2" fontFamily="Poppins-Regular" color="#666">Participants</Text>
                  <Text fontSize="$3" fontFamily="Poppins-SemiBold" color="#333">{challenge.participants}</Text>
                </YStack>
              </XStack>
            </Card>
          </XStack>

          <Button
            backgroundColor="#6c5ce7"
            color="white"
            fontFamily="Poppins-SemiBold"
            size="$4"
            pressStyle={{ backgroundColor: '#5a4ad1' }}
            onPress={() => router.push('/camera')}
          >
            <Camera size={18} color="white" />
            <Text color="white" fontFamily="Poppins-SemiBold">Submit Your Photo</Text>
          </Button>
        </YStack>

        <Separator />

        {/* Submissions */}
        <YStack padding="$4" space="$4">
          <Text fontSize="$4" fontFamily="Poppins-SemiBold" color="#333">
            Recent Submissions
          </Text>

          <YStack space="$4">
            {challenge.submissions.map(submission => (
              <Card
                key={submission.id}
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
                      <Avatar.Image src={submission.user.avatar} />
                      <Avatar.Fallback backgroundColor="#6c5ce7" />
                    </Avatar>
                    <YStack>
                      <Text fontFamily="Poppins-SemiBold" fontSize="$4" color="#333">
                        {submission.user.name}
                      </Text>
                      <Text fontFamily="Poppins-Regular" fontSize="$2" color="#666">
                        {submission.timeAgo} ago
                      </Text>
                    </YStack>
                  </XStack>
                </Card.Header>

                <Image
                  source={{ uri: submission.image }}
                  alt={`Photo by ${submission.user.name}`}
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
                        <Text fontFamily="Poppins-Medium" color="#333">{submission.likes}</Text>
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
                        <Text fontFamily="Poppins-Medium" color="#333">{submission.comments}</Text>
                      </XStack>
                    </XStack>
                  </XStack>
                </Card.Footer>

                {/* Comment input */}
                <XStack 
                  paddingHorizontal="$4" 
                  paddingVertical="$3" 
                  space="$2" 
                  alignItems="center"
                  backgroundColor="#f5f5f5"
                >
                  <Input 
                    flex={1}
                    placeholder="Add a comment..."
                    value={comment}
                    onChangeText={setComment}
                    backgroundColor="white"
                    borderColor="#ddd"
                  />
                  <Button
                    size="$3"
                    circular
                    backgroundColor="#6c5ce7"
                    pressStyle={{ backgroundColor: '#5a4ad1' }}
                    disabled={!comment.trim()}
                    opacity={!comment.trim() ? 0.5 : 1}
                  >
                    <Send size={18} color="white" />
                  </Button>
                </XStack>
              </Card>
            ))}
          </YStack>
        </YStack>
      </ScrollView>
    </View>
  );
}