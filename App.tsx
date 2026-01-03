import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/store';
import RootNavigator from './src/navigation/RootNavigator';
import { initializeNotifications } from './src/services/firebase';

export default function App() {
  useEffect(() => {
    const setupNotifications = async () => {
      const result = await initializeNotifications();

      if (result.error) {
        console.warn('[App] Notifications initialized with errors:', result.error);
      }

      const token = result.details?.token as string | undefined;
      if (token) {
        // TODO: Send token to backend
      }
    };

    setupNotifications();
  }, []);

  return (
    <GestureHandlerRootView style={styles.container}>
      <Provider store={store}>
        <SafeAreaProvider>
          <RootNavigator />
          <StatusBar style="light" />
        </SafeAreaProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
