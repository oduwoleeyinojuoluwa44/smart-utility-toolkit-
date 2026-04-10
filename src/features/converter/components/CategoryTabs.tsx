import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { ConversionCategory } from '../types';
import { theme } from '../../../shared/theme';

type CategoryTabsProps = {
  activeCategory: ConversionCategory;
  labels: Record<ConversionCategory, string>;
  onChange: (category: ConversionCategory) => void;
};

const categories: ConversionCategory[] = ['length', 'temperature', 'weight'];
const categoryIcons: Record<ConversionCategory, keyof typeof Ionicons.glyphMap> = {
  length: 'resize-outline',
  temperature: 'thermometer-outline',
  weight: 'barbell-outline',
};

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
            <Ionicons
              name={categoryIcons[category]}
              size={16}
              color={isActive ? theme.colors.primary : theme.colors.mutedText}
            />
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
    backgroundColor: '#E8EEF9',
    borderRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  tab: {
    flex: 1,
    minHeight: 52,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
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
