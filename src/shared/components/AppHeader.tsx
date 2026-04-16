import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { theme } from '../theme';

type AppHeaderProps = {
  title: string;
  subtitle: string;
};

export function AppHeader({ title, subtitle }: AppHeaderProps) {
  const navigation = useNavigation<any>();
  const route = useRoute();

  // The 'Converter' tab is the first defined tab in AppNavigator, making it effectively the Home screen.
  const isHome = route.name === 'Converter';

  const handleBack = () => {
    if (navigation.canGoBack()) {
        navigation.goBack();
    } else {
        navigation.navigate('Converter');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        {!isHome && (
          <Pressable onPress={handleBack} style={styles.backBtn} hitSlop={12}>
            <Ionicons name="arrow-back" size={26} color={theme.colors.text} />
          </Pressable>
        )}
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  backBtn: {
    backgroundColor: theme.colors.surface,
    padding: 6,
    borderRadius: theme.radius.pill,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginRight: 4,
  },
  title: {
    fontSize: theme.typography.sizes.xxl,
    fontWeight: theme.typography.weights.bold,
    color: theme.colors.text,
  },
  subtitle: {
    fontSize: theme.typography.sizes.md,
    color: theme.colors.mutedText,
    lineHeight: 22,
  },
});
