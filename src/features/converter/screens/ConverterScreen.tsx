import React from 'react';
import { StyleSheet, Text } from 'react-native';

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
        subtitle="Convert essential units quickly with a clean, distraction-free workflow."
      />

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
