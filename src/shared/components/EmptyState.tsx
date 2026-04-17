import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from './AppCard';
import { theme } from '../theme';

type EmptyStateProps = {
  title: string;
  message: string;
};

export function EmptyState({ title, message }: EmptyStateProps) {
  return (
    <AppCard>
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
  },
  title: {
    fontSize: theme.typography.sizes.lg,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  message: {
    textAlign: 'center',
    color: theme.colors.mutedText,
    fontSize: theme.typography.sizes.md,
    lineHeight: 22,
  },
});
