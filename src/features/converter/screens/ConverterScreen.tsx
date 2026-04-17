import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AppCard } from '../../../shared/components/AppCard';
import { AppHeader } from '../../../shared/components/AppHeader';
import { AppInput } from '../../../shared/components/AppInput';
import { Screen } from '../../../shared/components/Screen';
import { SectionTitle } from '../../../shared/components/SectionTitle';
import { theme } from '../../../shared/theme';
import { CategoryTabs } from '../components/CategoryTabs';
import { ConversionResultCard } from '../components/ConversionResultCard';
import { UnitPicker } from '../components/UnitPicker';
import { useConversionForm } from '../hooks/useConversionForm';

export function ConverterScreen() {
  const {
    category,
    categoryLabels,
    units,
    inputValue,
    fromUnit,
    toUnit,
    result,
    hasValidValue,
    setInputValue,
    setFromUnit,
    setToUnit,
    changeCategory,
  } = useConversionForm();

  const fromUnitData = units.find((item) => item.value === fromUnit);
  const toUnitData = units.find((item) => item.value === toUnit);

  return (
    <Screen>
      <AppHeader
        title="Smart Utility Toolkit"
        subtitle="Fast everyday conversions with a fresher, touch-friendly workflow."
      />

      <AppCard style={styles.heroCard}>
        <View style={styles.heroRow}>
          <View style={styles.heroTextWrap}>
            <Text style={styles.heroEyebrow}>Converter spotlight</Text>
            <Text style={styles.heroTitle}>Switch units in seconds</Text>
            <Text style={styles.heroText}>
              Move between length, temperature, and weight with instant feedback built for one-hand use.
            </Text>
          </View>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeNumber}>3</Text>
            <Text style={styles.heroBadgeLabel}>Categories</Text>
          </View>
        </View>
      </AppCard>

      <CategoryTabs activeCategory={category} labels={categoryLabels} onChange={changeCategory} />

      <ConversionResultCard result={result} fromUnit={fromUnitData} toUnit={toUnitData} />

      <AppCard style={styles.formCard}>
        <SectionTitle title="Conversion setup" />
        <AppInput
          label="Value to convert"
          value={inputValue}
          onChangeText={setInputValue}
          keyboardType="decimal-pad"
          placeholder="Enter a number"
        />
        <UnitPicker label="From unit" units={units} selectedValue={fromUnit} onChange={setFromUnit} />
        <UnitPicker label="To unit" units={units} selectedValue={toUnit} onChange={setToUnit} />
      </AppCard>

      <AppCard>
        <Text style={styles.tipTitle}>Quick tip</Text>
        <Text style={styles.tipText}>
          {hasValidValue
            ? `You are converting ${inputValue} ${fromUnitData?.shortLabel} into ${toUnitData?.shortLabel}.`
            : `Select a category and enter a value to start converting ${categoryLabels[category].toLowerCase()} units.`}
        </Text>
      </AppCard>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: '#E8F0FF',
    borderColor: '#C9DBFF',
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
    color: theme.colors.primary,
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
    width: 78,
    height: 78,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.sm,
  },
  heroBadgeNumber: {
    color: theme.colors.surface,
    fontSize: 24,
    fontWeight: theme.typography.weights.bold,
  },
  heroBadgeLabel: {
    color: '#DBEAFE',
    fontSize: theme.typography.sizes.xs,
    textAlign: 'center',
  },
  formCard: {
    gap: theme.spacing.lg,
  },
  tipTitle: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.bold,
    fontSize: theme.typography.sizes.md,
    marginBottom: theme.spacing.sm,
  },
  tipText: {
    color: theme.colors.mutedText,
    lineHeight: 22,
  },
});
