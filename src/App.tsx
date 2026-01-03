import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { setupNotifications } from './services/notifications';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  // Initialize notifications (non-blocking, with Firebase disabled for development)
  React.useEffect(() => {
    setupNotifications().catch((err) => {
      console.log('Notifications setup skipped:', err.message);
    });
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
