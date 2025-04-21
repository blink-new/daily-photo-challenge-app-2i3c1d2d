
import React, { useState } from 'react';
import { Input as TamaguiInput, InputProps, XStack, YStack, Text, View } from 'tamagui';
import { Eye, EyeOff } from 'lucide-react-native';

interface CustomInputProps extends InputProps {
  label?: string;
  error?: string;
  isPassword?: boolean;
}

export const Input: React.FC<CustomInputProps> = ({
  label,
  error,
  isPassword = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <YStack space="$1.5" width="100%">
      {label && (
        <Text fontSize="$3" fontWeight="500" color="$gray800">
          {label}
        </Text>
      )}
      <XStack width="100%" position="relative">
        <TamaguiInput
          flex={1}
          borderColor={error ? '$red500' : '$gray300'}
          borderWidth={1}
          borderRadius="$3"
          padding="$3"
          fontSize="$3"
          backgroundColor="white"
          focusStyle={{ borderColor: error ? '$red500' : '$purple500' }}
          secureTextEntry={isPassword && !showPassword}
          {...props}
        />
        {isPassword && (
          <View
            position="absolute"
            right="$3"
            top="50%"
            transform={[{ translateY: -10 }]}
            zIndex={1}
          >
            {showPassword ? (
              <EyeOff
                size={20}
                color="#6b7280"
                onPress={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                size={20}
                color="#6b7280"
                onPress={() => setShowPassword(true)}
              />
            )}
          </View>
        )}
      </XStack>
      {error && (
        <Text fontSize="$2" color="$red500">
          {error}
        </Text>
      )}
    </YStack>
  );
};