
import React, { useState } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, RefreshControl, StyleSheet, Dimensions } from 'react-native';

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

const { width } = Dimensions.get('window');

export default function Home() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>SnapChallenge</Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Today's Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Today's Challenges</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {CHALLENGES.map((challenge) => (
              <View key={challenge.id} style={styles.challengeCard}>
                <Image source={{ uri: challenge.image }} style={styles.challengeImage} />
                <View style={{ padding: 12 }}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeDesc}>{challenge.description}</Text>
                  <View style={styles.challengeMeta}>
                    <Text style={styles.challengeTime}>{challenge.timeRemaining} left</Text>
                    <Text style={styles.challengeParticipants}>{challenge.participants} joined</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Feed */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending Photos</Text>
          {FEED_ITEMS.map((item) => (
            <View key={item.id} style={styles.feedCard}>
              <View style={styles.feedUserRow}>
                <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
                <View>
                  <Text style={styles.feedUserName}>{item.user.name}</Text>
                  <Text style={styles.feedChallenge}>#{item.challenge}</Text>
                </View>
                <Text style={styles.feedTime}>{item.timeAgo}</Text>
              </View>
              <Image source={{ uri: item.image }} style={styles.feedImage} />
              <Text style={styles.feedCaption}>{item.caption}</Text>
              <View style={styles.feedActions}>
                <Text style={styles.feedAction}>❤️ {item.likes}</Text>
                <Text style={styles.feedAction}>💬 {item.comments}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity style={styles.fab}>
        <Text style={styles.fabIcon}>📷</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#6c5ce7',
    paddingTop: 48,
    paddingBottom: 24,
    alignItems: 'center',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 8,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  headerText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  section: {
    marginTop: 8,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  challengeCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginRight: 16,
    width: width * 0.7,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  challengeImage: {
    width: '100%',
    height: 110,
    resizeMode: 'cover',
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#6c5ce7',
    marginBottom: 2,
  },
  challengeDesc: {
    fontSize: 13,
    color: '#555',
    marginBottom: 6,
  },
  challengeMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  challengeTime: {
    fontSize: 12,
    color: '#6c5ce7',
    fontWeight: '600',
  },
  challengeParticipants: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
  feedCard: {
    backgroundColor: 'white',
    borderRadius: 18,
    marginBottom: 18,
    padding: 14,
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 2,
  },
  feedUserRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    marginRight: 10,
  },
  feedUserName: {
    fontWeight: '700',
    fontSize: 14,
    color: '#333',
  },
  feedChallenge: {
    fontSize: 12,
    color: '#6c5ce7',
    fontWeight: '500',
  },
  feedTime: {
    marginLeft: 'auto',
    fontSize: 12,
    color: '#aaa',
  },
  feedImage: {
    width: '100%',
    height: 210,
    borderRadius: 12,
    marginBottom: 8,
    marginTop: 2,
    resizeMode: 'cover',
  },
  feedCaption: {
    fontSize: 14,
    color: '#444',
    marginBottom: 6,
    marginTop: 2,
  },
  feedActions: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 18,
  },
  feedAction: {
    fontSize: 15,
    color: '#6c5ce7',
    fontWeight: '600',
    marginRight: 18,
  },
  fab: {
    position: 'absolute',
    bottom: 32,
    right: 28,
    backgroundColor: '#6c5ce7',
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 6,
  },
  fabIcon: {
    fontSize: 28,
    color: 'white',
  },
});