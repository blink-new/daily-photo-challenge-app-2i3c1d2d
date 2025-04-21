
import React, { useState, useRef, useEffect } from 'react';
import { View, YStack, XStack, Text, H2, ScrollView, TextArea } from 'tamagui';
import { Camera as ExpoCamera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { useChallenge } from '../../context/challenge';
import { Button } from '../../components/ui/Button';
import { Camera, Image as ImageIcon, X, RotateCcw } from 'lucide-react-native';
import { router } from 'expo-router';
import { Platform, StyleSheet } from 'react-native';

export default function CameraScreen() {
  const { currentChallenge, submitPhoto } = useChallenge();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [type, setType] = useState(ExpoCamera.Constants.Type.back);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [caption, setCaption] = useState('');
  const [loading, setLoading] = useState(false);
  const cameraRef = useRef<ExpoCamera | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await ExpoCamera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({
        quality: 0.8,
        base64: false,
      });
      setCapturedImage(photo.uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!capturedImage || !currentChallenge) return;
    
    setLoading(true);
    try {
      // In a real app, we would upload the image to storage first
      // For this prototype, we'll just use the local URI
      await submitPhoto(currentChallenge.id, capturedImage, caption);
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error submitting photo:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetCamera = () => {
    setCapturedImage(null);
    setCaption('');
  };

  if (hasPermission === null) {
    return <View flex={1} justifyContent="center" alignItems="center">
      <Text>Requesting camera permission...</Text>
    </View>;
  }
  
  if (hasPermission === false) {
    return <View flex={1} justifyContent="center" alignItems="center" padding="$4">
      <Text textAlign="center">No access to camera. Please enable camera permissions to use this feature.</Text>
      <Button variant="primary" marginTop="$4" onPress={() => router.replace('/(tabs)')}>
        Go Back
      </Button>
    </View>;
  }

  return (
    <View flex={1} backgroundColor="black">
      {capturedImage ? (
        <YStack flex={1}>
          <Image
            source={{ uri: capturedImage }}
            style={{ flex: 1 }}
            contentFit="cover"
          />
          
          <View
            position="absolute"
            top={40}
            right={20}
            backgroundColor="rgba(0,0,0,0.5)"
            borderRadius={20}
            padding="$2"
          >
            <X size={24} color="white" onPress={resetCamera} />
          </View>
          
          <YStack
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            backgroundColor="rgba(0,0,0,0.7)"
            padding="$4"
            space="$3"
          >
            <TextArea
              placeholder="Add a caption..."
              value={caption}
              onChangeText={setCaption}
              backgroundColor="rgba(255,255,255,0.1)"
              color="white"
              placeholderTextColor="rgba(255,255,255,0.6)"
              borderRadius="$3"
              height={80}
            />
            
            <Button
              variant="primary"
              size="large"
              loading={loading}
              onPress={handleSubmit}
            >
              Submit to Challenge
            </Button>
          </YStack>
        </YStack>
      ) : (
        <YStack flex={1}>
          <ExpoCamera
            ref={cameraRef}
            type={type}
            style={StyleSheet.absoluteFillObject}
          />
          
          <YStack
            position="absolute"
            bottom={0}
            left={0}
            right={0}
            padding="$4"
            space="$4"
          >
            <XStack justifyContent="space-around" alignItems="center">
              <Button
                variant="ghost"
                backgroundColor="rgba(255,255,255,0.2)"
                onPress={pickImage}
                width={60}
                height={60}
                borderRadius={30}
                alignItems="center"
                justifyContent="center"
              >
                <ImageIcon size={30} color="white" />
              </Button>
              
              <Button
                variant="ghost"
                backgroundColor="white"
                onPress={takePicture}
                width={70}
                height={70}
                borderRadius={35}
                alignItems="center"
                justifyContent="center"
              >
                <View
                  width={60}
                  height={60}
                  borderRadius={30}
                  borderWidth={3}
                  borderColor="black"
                />
              </Button>
              
              <Button
                variant="ghost"
                backgroundColor="rgba(255,255,255,0.2)"
                onPress={() => setType(
                  type === ExpoCamera.Constants.Type.back
                    ? ExpoCamera.Constants.Type.front
                    : ExpoCamera.Constants.Type.back
                )}
                width={60}
                height={60}
                borderRadius={30}
                alignItems="center"
                justifyContent="center"
              >
                <RotateCcw size={30} color="white" />
              </Button>
            </XStack>
            
            {currentChallenge && (
              <View
                backgroundColor="rgba(0,0,0,0.7)"
                padding="$3"
                borderRadius="$3"
              >
                <Text color="white" fontWeight="600" fontSize="$4">
                  Challenge: {currentChallenge.title}
                </Text>
              </View>
            )}
          </YStack>
        </YStack>
      )}
    </View>
  );
}