import { Card, YStack, Text, XStack, View } from 'tamagui';

export default function Home() {
  return (
    <View
      flex={1}
      alignItems="center"
      justifyContent="center"
      backgroundColor="$gray100"
      padding="$4"
    >
      <Card
        elevate
        size="$4"
        bordered
        width="100%"
        maxWidth={400}
        backgroundColor="white"
        borderRadius="$6"
      >
        <Card.Header padded>
          <YStack space="$2">
            <Text fontSize="$6" fontWeight="bold" color="$gray800">
              Welcome to Blink
            </Text>
            <Text color="$gray600">
              A beautiful starter template
            </Text>
          </YStack>
        </Card.Header>
        
        <Card.Footer padded>
          <XStack space="$2" alignItems="center" flexWrap="wrap">
            <Text fontSize="$3" color="$gray500">Built with:</Text>
            <Text fontSize="$3" fontWeight="600" color="$blue500">Expo</Text>
            <Text fontSize="$3" color="$gray500">•</Text>
            <Text fontSize="$3" fontWeight="600" color="$blue500">Tamagui</Text>
          </XStack>
        </Card.Footer>
      </Card>
    </View>
  );
} 