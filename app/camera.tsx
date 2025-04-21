
import React, { useState } from 'react';
import { TouchableOpacity, Platform } from 'react-native';
import { View, Text, YStack, XStack, Card, Image, Button, Input, TextArea } from 'tamagui';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Camera, Image as ImageIcon, Upload } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function CameraScreen() {
  const { challengeId } = useLocalSearchParams();
  const [image, setImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');

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
    // In a real app, we would upload the image and caption to a server
    // For now, we'll just navigate back to the challenge screen
    alert('Photo submitted successfully!');
    router.back();
  };

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
            Submit Photo
          </Text>
          <View width={24} /> {/* For balance */}
        </XStack>
      </View>

      <YStack flex={1} padding="$4" space="$4">
        {/* Image Preview */}
        {image ? (
          <Card
            backgroundColor="white"
            borderRadius="$4"
            overflow="hidden"
            height={300}
            elevate
          >
            <Image
              source={{ uri: image }}
              width="100%"
              height="100%"
              resizeMode="cover"
            />
          </Card>
        ) : (
          <Card
            backgroundColor="white"
            borderRadius="$4"
            height={300}
            alignItems="center"
            justifyContent="center"
            elevate
          >
            <YStack alignItems="center" space="$2">
              <ImageIcon size={48} color="#ccc" />
              <Text fontFamily="Poppins-Medium" fontSize={16} color="#666">
                No image selected
              </Text>
            </YStack>
          </Card>
        )}

        {/* Caption Input */}
        <Card backgroundColor="white" borderRadius="$4" padding="$4" elevate>
          <TextArea
            placeholder="Write a caption for your photo..."
            value={caption}
            onChangeText={setCaption}
            fontFamily="Poppins-Regular"
            fontSize={16}
            minHeight={100}
            autoCapitalize="none"
          />
        </Card>

        {/* Camera/Gallery Buttons */}
        <XStack space="$4">
          <Button
            flex={1}
            backgroundColor="#6c5ce7"
            color="white"
            fontFamily="Poppins-SemiBold"
            fontSize={16}
            height={50}
            onPress={takePhoto}
            icon={<Camera size={18} color="white" />}
          >
            Take Photo
          </Button>
          <Button
            flex={1}
            backgroundColor="#6c5ce7"
            color="white"
            fontFamily="Poppins-SemiBold"
            fontSize={16}
            height={50}
            onPress={pickImage}
            icon={<ImageIcon size={18} color="white" />}
          >
            Gallery
          </Button>
        </XStack>

        {/* Submit Button */}
        <Button
          backgroundColor={image ? "#6c5ce7" : "#ccc"}
          color="white"
          fontFamily="Poppins-SemiBold"
          fontSize={16}
          height={50}
          marginTop="auto"
          disabled={!image}
          onPress={handleSubmit}
          icon={<Upload size={18} color="white" />}
        >
          Submit Photo
        </Button>
      </YStack>
    </View>
  );
}