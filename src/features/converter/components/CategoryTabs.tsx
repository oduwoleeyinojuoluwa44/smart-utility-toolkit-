import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ConversionCategory } from '../types';
import { theme } from '../../../shared/theme';

type CategoryTabsProps = {
  activeCategory: ConversionCategory;
  labels: Record<ConversionCategory, string>;
  onChange: (category: ConversionCategory) => void;
};

const categories: ConversionCategory[] = ['length', 'temperature', 'weight'];

export function CategoryTabs({ activeCategory, labels, onChange }: CategoryTabsProps) {
  return (
    <View style={styles.container}>
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <Pressable
            key={category}
            onPress={() => onChange(category)}
            style={[styles.tab, isActive && styles.activeTab]}
          >
            <Text style={[styles.text, isActive && styles.activeText]}>{labels[category]}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: theme.colors.surfaceMuted,
    borderRadius: theme.radius.pill,
    padding: theme.spacing.xs,
    gap: theme.spacing.xs,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.pill,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
  },
  text: {
    color: theme.colors.mutedText,
    fontWeight: theme.typography.weights.semibold,
    fontSize: theme.typography.sizes.sm,
  },
  activeText: {
    color: theme.colors.primary,
  },
});
