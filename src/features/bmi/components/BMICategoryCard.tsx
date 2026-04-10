import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { theme } from '../../../shared/theme';

const categories = [
  { label: 'Underweight', range: 'Below 18.5' },
  { label: 'Normal', range: '18.5 - 24.9' },
  { label: 'Overweight', range: '25.0 - 29.9' },
  { label: 'Obese', range: '30.0 and above' },
];

export function BMICategoryCard() {
  return (
    <AppCard style={styles.card}>
      <Text style={styles.title}>BMI ranges</Text>
      {categories.map((item) => (
        <View key={item.label} style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.range}>{item.range}</Text>
        </View>
      ))}
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.md,
  },
  title: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.md,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: theme.spacing.md,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.medium,
  },
  range: {
    color: theme.colors.mutedText,
  },
});
