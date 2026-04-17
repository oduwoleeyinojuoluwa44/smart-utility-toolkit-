import React, { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type CircularProgressProps = {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
};

export function CircularProgress({ 
  percentage, 
  size = 70, 
  strokeWidth = 6, 
  color = '#0F172A', 
  backgroundColor = '#E2E8F0' 
}: CircularProgressProps) {
  const safePercentage = Number.isFinite(percentage) ? Math.max(0, Math.min(100, percentage)) : 0;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  const animatedPercentage = useSharedValue(0);

  useEffect(() => {
    animatedPercentage.value = withSpring(safePercentage, {
      damping: 15,
      stiffness: 100,
      overshootClamping: true,
    });
  }, [animatedPercentage, safePercentage]);

  const animatedProps = useAnimatedProps(() => {
    const normalizedPercentage = Math.max(0, Math.min(100, animatedPercentage.value));
    const strokeDashoffset = circumference - (normalizedPercentage / 100) * circumference;
    return {
      strokeDashoffset,
    };
  });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={`${size / 2}, ${size / 2}`}>
          {/* Background circle */}
          <Circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={backgroundColor}
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <AnimatedCircle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </G>
      </Svg>
      <View style={styles.labelContainer}>
        <Text style={styles.percentageText}>{Math.round(safePercentage)}%</Text>
      </View>
    </View>
  );
}
// Existing styles remain...

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0F172A',
  },
});
