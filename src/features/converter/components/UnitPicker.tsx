import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { UnitDefinition } from '../types';
import { theme } from '../../../shared/theme';

type UnitPickerProps = {
  label: string;
  units: UnitDefinition[];
  selectedValue: string;
  onChange: (value: string) => void;
};

export function UnitPicker({ label, units, selectedValue, onChange }: UnitPickerProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.wrap}>
        {units.map((unit) => {
          const isActive = unit.value === selectedValue;
          return (
            <Pressable
              key={unit.value}
              onPress={() => onChange(unit.value)}
              style={[styles.pill, isActive && styles.activePill]}
            >
              <Text style={[styles.pillText, isActive && styles.activePillText]}>{unit.shortLabel}</Text>
              <Text style={[styles.pillSubtext, isActive && styles.activePillSubtext]}>{unit.label}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.sm,
  },
  label: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  wrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  pill: {
    minWidth: 70,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    backgroundColor: theme.colors.surfaceMuted,
    borderWidth: 1,
    borderColor: '#DCE6F4',
    alignItems: 'center',
    gap: 2,
  },
  activePill: {
    backgroundColor: theme.colors.primarySoft,
    borderColor: '#A7C5FF',
  },
  pillText: {
    color: theme.colors.text,
    fontWeight: theme.typography.weights.medium,
  },
  activePillText: {
    color: theme.colors.primary,
    fontWeight: theme.typography.weights.semibold,
  },
  pillSubtext: {
    color: theme.colors.mutedText,
    fontSize: theme.typography.sizes.xs,
  },
  activePillSubtext: {
    color: theme.colors.primary,
  },
});
