import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { theme } from '../../../shared/theme';
import { BMIResult } from '../types';

type BMIResultCardProps = {
  result: BMIResult | null;
};

function getPalette(category?: BMIResult['category']) {
  switch (category) {
    case 'Normal':
      return { bg: theme.colors.successSoft, text: theme.colors.success };
    case 'Underweight':
      return { bg: theme.colors.warningSoft, text: theme.colors.warning };
    case 'Overweight':
    case 'Obese':
      return { bg: theme.colors.dangerSoft, text: theme.colors.danger };
    default:
      return { bg: theme.colors.surfaceMuted, text: theme.colors.mutedText };
  }
}

export function BMIResultCard({ result }: BMIResultCardProps) {
  const palette = getPalette(result?.category);

  return (
    <AppCard style={styles.card}>
      <Text style={styles.label}>BMI result</Text>
      <Text style={styles.score}>{result ? result.score.toFixed(1) : '--'}</Text>
      <View style={[styles.badge, { backgroundColor: palette.bg }]}>
        <Text style={[styles.badgeText, { color: palette.text }]}>{result?.category ?? 'Awaiting input'}</Text>
      </View>
      <Text style={styles.message}>
        {result?.message ?? 'Enter your height and weight to see your category and interpretation.'}
      </Text>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
  },
  label: {
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
    color: theme.colors.mutedText,
  },
  score: {
    color: theme.colors.text,
    fontSize: 34,
    fontWeight: theme.typography.weights.bold,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.pill,
  },
  badgeText: {
    fontWeight: theme.typography.weights.semibold,
  },
  message: {
    color: theme.colors.mutedText,
    lineHeight: 22,
  },
});
