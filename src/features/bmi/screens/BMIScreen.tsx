import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '../../../shared/components/AppButton';
import { AppCard } from '../../../shared/components/AppCard';
import { AppHeader } from '../../../shared/components/AppHeader';
import { Screen } from '../../../shared/components/Screen';
import { theme } from '../../../shared/theme';
import { BMICategoryCard } from '../components/BMICategoryCard';
import { BMIForm } from '../components/BMIForm';
import { BMIResultCard } from '../components/BMIResultCard';
import { useBMI } from '../hooks/useBMI';

export function BMIScreen() {
  const { height, weight, result, setHeight, setWeight } = useBMI();

  return (
    <Screen>
      <AppHeader
        title="BMI Calculator"
        subtitle="Estimate your body mass index instantly and understand which range your current metrics fall into."
      />

      <AppCard style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroEyebrow}>Health snapshot</Text>
            <Text style={styles.heroTitle}>A clearer body check</Text>
            <Text style={styles.heroText}>
              Use a lightweight metric input flow with direct feedback and readable BMI guidance.
            </Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeNumber}>BMI</Text>
            <Text style={styles.heroBadgeLabel}>Instant read</Text>
          </View>
        </View>
      </AppCard>

      <BMIResultCard result={result} />
      <BMIForm height={height} weight={weight} onChangeHeight={setHeight} onChangeWeight={setWeight} />
      <BMICategoryCard />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#FFF4E6',
    borderColor: '#F2D7B6',
  },
  heroRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  heroTextWrap: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  heroEyebrow: {
    color: theme.colors.warning,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  heroTitle: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.xl,
  },
  heroText: {
    color: theme.colors.mutedText,
    lineHeight: 21,
  },
  heroBadge: {
    width: 92,
    height: 92,
    borderRadius: 28,
    backgroundColor: theme.colors.warning,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  heroBadgeNumber: {
    color: theme.colors.surface,
    fontSize: 20,
    fontWeight: theme.typography.weights.bold,
  },
  heroBadgeLabel: {
    color: '#FEF3C7',
    fontSize: theme.typography.sizes.xs,
    textAlign: 'center',
  },
});
