import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { theme } from '../theme';

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
};

export function AppButton({ title, onPress, variant = 'primary' }: AppButtonProps) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed]}>
      <Text style={[styles.text, variant !== 'secondary' && styles.inverseText]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: theme.radius.pill,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: theme.colors.primary,
  },
  secondary: {
    backgroundColor: theme.colors.surfaceMuted,
  },
  danger: {
    backgroundColor: theme.colors.danger,
  },
  pressed: {
    opacity: 0.88,
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.sizes.md,
    fontWeight: theme.typography.weights.semibold,
  },
  inverseText: {
    color: theme.colors.surface,
  },
});
