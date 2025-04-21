
import React from 'react';
import { Button as TamaguiButton, ButtonProps, Spinner, Text } from 'tamagui';

interface CustomButtonProps extends ButtonProps {
  loading?: boolean;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}

export const Button: React.FC<CustomButtonProps> = ({
  children,
  loading = false,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled,
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: '$purple500',
          color: 'white',
          borderColor: '$purple500',
          hoverStyle: { backgroundColor: '$purple600' },
          pressStyle: { backgroundColor: '$purple700' },
        };
      case 'secondary':
        return {
          backgroundColor: '$purple100',
          color: '$purple800',
          borderColor: '$purple100',
          hoverStyle: { backgroundColor: '$purple200' },
          pressStyle: { backgroundColor: '$purple300' },
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          color: '$purple500',
          borderColor: '$purple500',
          borderWidth: 1,
          hoverStyle: { backgroundColor: '$purple50' },
          pressStyle: { backgroundColor: '$purple100' },
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          color: '$purple500',
          borderColor: 'transparent',
          hoverStyle: { backgroundColor: '$purple50' },
          pressStyle: { backgroundColor: '$purple100' },
        };
      default:
        return {};
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'small':
        return {
          height: 36,
          paddingHorizontal: 12,
          borderRadius: 8,
          fontSize: 14,
        };
      case 'medium':
        return {
          height: 44,
          paddingHorizontal: 16,
          borderRadius: 10,
          fontSize: 16,
        };
      case 'large':
        return {
          height: 52,
          paddingHorizontal: 20,
          borderRadius: 12,
          fontSize: 18,
        };
      default:
        return {};
    }
  };

  const variantStyles = getVariantStyles();
  const sizeStyles = getSizeStyles();

  return (
    <TamaguiButton
      {...variantStyles}
      {...sizeStyles}
      width={fullWidth ? '100%' : undefined}
      disabled={disabled || loading}
      opacity={disabled || loading ? 0.6 : 1}
      {...props}
    >
      {loading ? (
        <Spinner color={variantStyles.color} size="small" />
      ) : (
        <Text color={variantStyles.color} fontSize={sizeStyles.fontSize} fontWeight="600">
          {children}
        </Text>
      )}
    </TamaguiButton>
  );
};