import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';
import { Screen } from '../../../shared/components/Screen';
import { theme } from '../../../shared/theme';

import { Ionicons } from '@expo/vector-icons';

type OnboardingScreenProps = {
  onContinue: () => void;
};

const highlights = [
  {
    title: 'Convert fast',
    message: 'Length, temperature, and weight conversions update instantly as you type.',
    icon: 'swap-horizontal',
  },
  {
    title: 'Keep quick notes',
    message: 'Save important utility values and reminders even when you are offline.',
    icon: 'document-text-outline',
  },
  {
    title: 'Track BMI',
    message: 'Use a simple calculator with clear health-range guidance and readable results.',
    icon: 'barbell-outline',
  },
  {
    title: 'Manage Tasks',
    message: 'Stay productive with a clean checklist synced straight to your device.',
    icon: 'checkbox-outline',
  },
];

export function OnboardingScreen({ onContinue }: OnboardingScreenProps) {
  return (
    <Screen contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Welcome</Text>
        <Text style={styles.title}>Your smart tools, one tap away</Text>
        <Text style={styles.subtitle}>
          A bright, focused utility app for quick calculations, note-taking, and daily check-ins.
        </Text>
      </View>

      <View style={styles.previewCard}>
        <View style={styles.previewTop}>
          <View style={styles.dot} />
          <View style={styles.dotMuted} />
        </View>
        <View style={styles.previewMain}>
          <View style={styles.previewMetricCard}>
            <Text style={styles.previewMetricValue}>4</Text>
            <Text style={styles.previewMetricLabel}>Core tools</Text>
          </View>
          <View style={styles.previewBars}>
            <View style={[styles.previewBar, styles.previewBarPrimary]} />
            <View style={[styles.previewBar, styles.previewBarSoft]} />
            <View style={[styles.previewBar, styles.previewBarMuted]} />
          </View>
        </View>
      </View>

      <View style={styles.highlights}>
        {highlights.map((item) => (
          <View key={item.title} style={styles.highlightCard}>
            <View style={styles.highlightIcon}>
              <Ionicons name={item.icon as any} size={24} color={theme.colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.highlightTitle}>{item.title}</Text>
              <Text style={styles.highlightMessage}>{item.message}</Text>
            </View>
          </View>
        ))}
      </View>

      <AppButton title="Get started" onPress={onContinue} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
  },
  hero: {
    gap: theme.spacing.sm,
  },
  eyebrow: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 40,
    fontWeight: theme.typography.weights.bold,
  },
  subtitle: {
    color: theme.colors.mutedText,
    fontSize: theme.typography.sizes.md,
    lineHeight: 23,
  },
  previewCard: {
    borderRadius: 28,
    backgroundColor: '#0F172A',
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  previewTop: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#60A5FA',
  },
  dotMuted: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#334155',
  },
  previewMain: {
    flexDirection: 'row',
    gap: theme.spacing.lg,
    alignItems: 'center',
  },
  previewMetricCard: {
    width: 110,
    height: 110,
    borderRadius: 28,
    backgroundColor: '#1D4ED8',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  previewMetricValue: {
    color: theme.colors.surface,
    fontSize: 34,
    fontWeight: theme.typography.weights.bold,
  },
  previewMetricLabel: {
    color: '#DBEAFE',
    fontSize: theme.typography.sizes.xs,
  },
  previewBars: {
    flex: 1,
    gap: theme.spacing.md,
  },
  previewBar: {
    height: 16,
    borderRadius: theme.radius.pill,
  },
  previewBarPrimary: {
    width: '85%',
    backgroundColor: '#60A5FA',
  },
  previewBarSoft: {
    width: '65%',
    backgroundColor: '#1E293B',
  },
  previewBarMuted: {
    width: '48%',
    backgroundColor: '#334155',
  },
  highlights: {
    gap: theme.spacing.md,
  },
  highlightCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    gap: theme.spacing.md,
  },
  highlightIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  highlightTitle: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.md,
  },
  highlightMessage: {
    color: theme.colors.mutedText,
    lineHeight: 21,
  },
  skip: {
    textAlign: 'center',
    color: theme.colors.mutedText,
    fontWeight: theme.typography.weights.medium,
  },
});
