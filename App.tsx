import React from 'react';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AppNavigator } from './src/app/navigation/AppNavigator';
import { OnboardingScreen } from './src/features/onboarding/screens/OnboardingScreen';
import { storageKeys } from './src/shared/constants/storage';
import { theme } from './src/shared/theme';

export default function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [showOnboarding, setShowOnboarding] = React.useState(false);

  React.useEffect(() => {
    async function loadOnboardingState() {
      const seenOnboarding = await AsyncStorage.getItem(storageKeys.onboardingSeen);
      setShowOnboarding(!seenOnboarding);
      setIsLoading(false);
    }

    void loadOnboardingState();
  }, []);

  const handleContinue = React.useCallback(async () => {
    await AsyncStorage.setItem(storageKeys.onboardingSeen, 'true');
    setShowOnboarding(false);
  }, []);

  const handleResetOnboarding = React.useCallback(async () => {
    await AsyncStorage.removeItem(storageKeys.onboardingSeen);
    setShowOnboarding(true);
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        {isLoading ? (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: theme.colors.background,
            }}
          >
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        ) : showOnboarding ? (
          <OnboardingScreen onContinue={handleContinue} />
        ) : (
          <AppNavigator onResetOnboarding={handleResetOnboarding} />
        )}
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
