import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { AppInput } from '../../../shared/components/AppInput';
import { SectionTitle } from '../../../shared/components/SectionTitle';
import { theme } from '../../../shared/theme';

type BMIFormProps = {
  height: string;
  weight: string;
  onChangeHeight: (value: string) => void;
  onChangeWeight: (value: string) => void;
};

export function BMIForm({ height, weight, onChangeHeight, onChangeWeight }: BMIFormProps) {
  return (
    <AppCard style={styles.card}>
      <SectionTitle title="Metric input" />
      <AppInput
        label="Height (cm)"
        value={height}
        onChangeText={onChangeHeight}
        keyboardType="decimal-pad"
        placeholder="e.g. 175"
      />
      <AppInput
        label="Weight (kg)"
        value={weight}
        onChangeText={onChangeWeight}
        keyboardType="decimal-pad"
        placeholder="e.g. 72"
      />
      <View style={styles.tipBox}>
        <Text style={styles.tipText}>Use your current measurements in centimeters and kilograms for the most direct result.</Text>
      </View>
    </AppCard>
  );
}

const styles = StyleSheet.create({
  card: {
    gap: theme.spacing.lg,
  },
  tipBox: {
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
  },
  tipText: {
    color: theme.colors.mutedText,
    lineHeight: 21,
  },
});
