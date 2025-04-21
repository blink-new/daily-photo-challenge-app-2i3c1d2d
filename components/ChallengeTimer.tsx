
import React, { useState, useEffect } from 'react';
import { Card, Text, YStack, XStack, Progress } from 'tamagui';
import { parseISO, differenceInSeconds, format } from 'date-fns';
import { Clock } from 'lucide-react-native';

interface ChallengeTimerProps {
  startDate: string;
  endDate: string;
}

export const ChallengeTimer: React.FC<ChallengeTimerProps> = ({ startDate, endDate }) => {
  const [timeLeft, setTimeLeft] = useState('');
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      const end = parseISO(endDate);
      const start = parseISO(startDate);
      
      const totalDuration = differenceInSeconds(end, start);
      const elapsed = differenceInSeconds(now, start);
      const remaining = differenceInSeconds(end, now);
      
      // Calculate progress (0 to 1)
      const calculatedProgress = Math.min(Math.max(elapsed / totalDuration, 0), 1);
      setProgress(calculatedProgress);
      
      if (remaining <= 0) {
        setTimeLeft('Challenge ended');
        return;
      }
      
      // Format the remaining time
      const days = Math.floor(remaining / 86400);
      const hours = Math.floor((remaining % 86400) / 3600);
      const minutes = Math.floor((remaining % 3600) / 60);
      const seconds = remaining % 60;
      
      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h ${minutes}m remaining`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m ${seconds}s remaining`);
      } else {
        setTimeLeft(`${minutes}m ${seconds}s remaining`);
      }
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, [startDate, endDate]);
  
  return (
    <Card
      bordered
      borderRadius="$4"
      backgroundColor="$purple50"
      borderColor="$purple200"
      padding="$3"
      marginBottom="$4"
    >
      <YStack space="$2">
        <XStack alignItems="center" space="$2">
          <Clock size={20} color="#7c3aed" />
          <Text fontSize="$4" fontWeight="600" color="$purple800">
            {timeLeft}
          </Text>
        </XStack>
        
        <YStack space="$1">
          <Progress value={progress * 100} backgroundColor="$purple200">
            <Progress.Indicator animation="bouncy" backgroundColor="$purple500" />
          </Progress>
          
          <XStack justifyContent="space-between">
            <Text fontSize="$2" color="$gray600">
              Started: {format(parseISO(startDate), 'MMM d, h:mm a')}
            </Text>
            <Text fontSize="$2" color="$gray600">
              Ends: {format(parseISO(endDate), 'MMM d, h:mm a')}
            </Text>
          </XStack>
        </YStack>
      </YStack>
    </Card>
  );
};