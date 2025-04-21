
import { useState } from 'react';
import { router } from 'expo-router';
import { 
  YStack, 
  XStack, 
  Text, 
  View, 
  Button, 
  Card, 
  TextArea,
  H2
} from 'tamagui';
import { Image } from 'expo-image';
import { ArrowLeft, Camera, Upload, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';

export default function CameraScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [uploading, setUploading] = useState(false);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera permissions to make this work!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = () => {
    if (!image) return;
    
    setUploading(true);
    
    // Simulate upload
    setTimeout(() => {
      setUploading(false);
      router.back();
    }, 2000);
  };

  return (
    <View flex={1} backgroundColor="#f8f9fa">
      {/* Header */}
      <View 
        paddingTop="$10" 
        paddingHorizontal="$4" 
        paddingBottom="$4"
        backgroundColor="#6c5ce7"
      >
        <XStack justifyContent="space-between" alignItems="center">
          <Button
            size="$3"
            circular
            backgroundColor="rgba(255,255,255,0.2)"
            pressStyle={{ backgroundColor: 'rgba(255,255,255,0.3)' }}
            onPress={() => router.back()}
          >
            <ArrowLeft size={20} color="white" />
          </Button>
          <H2 color="white" fontFamily="Poppins-SemiBold">
            Submit Photo
          </H2>
          <View width={40} />
        </XStack>
      </View>

      <YStack flex={1} padding="$4" space="$4">
        {image ? (
          <Card
            elevate
            bordered
            borderWidth={0}
            overflow="hidden"
            height={400}
            position="relative"
          >
            <Image
              source={{ uri: image }}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
            <Button
              size="$3"
              circular
              position="absolute"
              top={10}
              right={10}
              backgroundColor="rgba(0,0,0,0.5)"
              pressStyle={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
              onPress={() => setImage(null)}
            >
              <X size={20} color="white" />
            </Button>
          </Card>
        ) : (
          <Card
            elevate
            bordered
            height={400}
            alignItems="center"
            justifyContent="center"
            backgroundColor="#f0f0f0"
          >
            <YStack space="$6" alignItems="center" padding="$4">
              <Camera size={60} color="#6c5ce7" opacity={0.7} />
              <Text fontFamily="Poppins-Medium" fontSize="$5" textAlign="center" color="#666">
                Take a photo or upload from your gallery
              </Text>
              <XStack space="$4">
                <Button
                  size="$4"
                  backgroundColor="#6c5ce7"
                  color="white"
                  fontFamily="Poppins-SemiBold"
                  pressStyle={{ backgroundColor: '#5a4ad1' }}
                  onPress={takePhoto}
                >
                  <Camera size={18} color="white" />
                  <Text color="white" fontFamily="Poppins-SemiBold">Camera</Text>
                </Button>
                <Button
                  size="$4"
                  backgroundColor="#6c5ce7"
                  color="white"
                  fontFamily="Poppins-SemiBold"
                  pressStyle={{ backgroundColor: '#5a4ad1' }}
                  onPress={pickImage}
                >
                  <Upload size={18} color="white" />
                  <Text color="white" fontFamily="Poppins-SemiBold">Gallery</Text>
                </Button>
              </XStack>
            </YStack>
          </Card>
        )}

        {image && (
          <YStack space="$4">
            <TextArea
              placeholder="Write a caption for your photo..."
              value={caption}
              onChangeText={setCaption}
              minHeight={100}
              autoCapitalize="none"
              fontFamily="Poppins-Regular"
            />
            <Button
              size="$4"
              backgroundColor="#6c5ce7"
              color="white"
              fontFamily="Poppins-SemiBold"
              pressStyle={{ backgroundColor: '#5a4ad1' }}
              onPress={handleSubmit}
              disabled={uploading}
              opacity={uploading ? 0.7 : 1}
            >
              {uploading ? 'Uploading...' : 'Submit Photo'}
            </Button>
          </YStack>
        )}
      </YStack>
    </View>
  );
}