import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { theme } from '../../../shared/theme';
import { formatNumber } from '../../../shared/utils/formatNumber';
import { UnitDefinition } from '../types';

type ConversionResultCardProps = {
  result: number | null;
  fromUnit?: UnitDefinition;
  toUnit?: UnitDefinition;
};

export function ConversionResultCard({ result, fromUnit, toUnit }: ConversionResultCardProps) {
  return (
    <AppCard style={styles.card}>
      <Text style={styles.label}>Converted result</Text>
      <Text style={styles.result}>{result === null ? '--' : formatNumber(result, 4)}</Text>
      <View style={styles.metaRow}>
        <Text style={styles.meta}>{fromUnit?.label ?? 'Choose source unit'}</Text>
        <Text style={styles.arrow}>→</Text>
        <Text style={styles.meta}>{toUnit?.label ?? 'Choose target unit'}</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
  },
  label: {
    color: '#BFDBFE',
    fontSize: theme.typography.sizes.sm,
    fontWeight: theme.typography.weights.semibold,
  },
  result: {
    color: theme.colors.surface,
    fontSize: 34,
    fontWeight: theme.typography.weights.bold,
  },
  metaRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
    alignItems: 'center',
  },
  meta: {
    color: '#DBEAFE',
    fontSize: theme.typography.sizes.sm,
  },
  arrow: {
    color: theme.colors.surface,
    fontWeight: theme.typography.weights.bold,
  },
});
