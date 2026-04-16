import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { ConverterScreen } from '../../features/converter/screens/ConverterScreen';
import { NotesScreen } from '../../features/notes/screens/NotesScreen';
import { BMIScreen } from '../../features/bmi/screens/BMIScreen';
import { TasksScreen } from '../../features/tasks/screens/TasksScreen';
import { theme } from '../../shared/theme';

type RootTabParamList = {
  Converter: undefined;
  Tasks: undefined;
  Notes: undefined;
  BMI: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    card: theme.colors.surface,
    primary: theme.colors.primary,
    text: theme.colors.text,
    border: theme.colors.border,
  },
};

const iconMap: Record<keyof RootTabParamList, keyof typeof Ionicons.glyphMap> = {
  Converter: 'swap-horizontal',
  Tasks: 'checkbox-outline',
  Notes: 'document-text-outline',
  BMI: 'barbell-outline',
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.mutedText,
          tabBarStyle: {
            height: 68,
            paddingTop: 8,
            paddingBottom: 8,
            borderTopColor: theme.colors.border,
            backgroundColor: theme.colors.surface,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={iconMap[route.name as keyof RootTabParamList]} color={color} size={size} />
          ),
        })}
      >
        <Tab.Screen name="Converter" component={ConverterScreen} />
        <Tab.Screen name="Tasks" component={TasksScreen} />
        <Tab.Screen name="Notes" component={NotesScreen} />
        <Tab.Screen name="BMI" component={BMIScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
