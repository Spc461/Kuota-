import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { initializeNotifications, requestNotificationPermission, onNotificationReceived, getFirebaseStatus, isFirebaseDisabledInDevMode } from './src/services/firebase';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [firebaseAvailable, setFirebaseAvailable] = useState(false);
  const [authStatus, setAuthStatus] = useState('checking');
  const [firebaseStatus, setFirebaseStatus] = useState<any>(null);

  useEffect(() => {
    initializeApp();
  }, []);

  const initializeApp = async () => {
    try {
      console.log('[App] Starting app initialization...');
      
      // Check Firebase status first
      const status = getFirebaseStatus();
      setFirebaseStatus(status);
      
      // Initialize notifications with graceful fallback
      const result = await initializeNotifications();
      setFirebaseAvailable(result.firebaseAvailable);
      setNotificationsEnabled(result.notificationsEnabled);
      
      console.log('[App] Initialization complete:', result);
      
      // Check auth status (simulated)
      setTimeout(() => {
        setAuthStatus('needs-login');
        setLoading(false);
      }, 1000);

    } catch (error) {
      console.error('[App] Critical initialization error:', error);
      Alert.alert(
        'App Initialization',
        'App started but some features may be unavailable due to initialization errors.',
        [{ text: 'OK', onPress: () => setLoading(false) }]
      );
    }
  };

  const handleEnableNotifications = async () => {
    try {
      console.log('[App] Requesting notification permission...');
      const granted = await requestNotificationPermission();
      setNotificationsEnabled(granted);
      
      if (granted) {
        Alert.alert('Success', 'Notifications enabled successfully!');
      } else {
        Alert.alert('Notifications', 'Notifications permission denied or unavailable.');
      }
    } catch (error) {
      console.error('[App] Error enabling notifications:', error);
      Alert.alert('Error', 'Failed to enable notifications');
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Initializing app...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notification App</Text>
        <Text style={styles.subtitle}>Development Build Test</Text>
        
        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Firebase Status:</Text>
          <Text style={[styles.statusValue, firebaseAvailable ? styles.success : styles.error]}>
            {firebaseAvailable ? 'Available ✓' : 'Unavailable ✗'}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Dev Mode Disabled:</Text>
          <Text style={[styles.statusValue, isFirebaseDisabledInDevMode() ? styles.warning : styles.success]}>
            {isFirebaseDisabledInDevMode() ? 'Yes - Fallback Mode' : 'No - Firebase Available'}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Notifications:</Text>
          <Text style={[styles.statusValue, notificationsEnabled ? styles.success : styles.warning]}>
            {notificationsEnabled ? 'Enabled ✓' : firebaseAvailable ? 'Available but Disabled' : 'Not Available'}
          </Text>
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusLabel}>Auth Status:</Text>
          <Text style={styles.statusValue}>
            {authStatus === 'checking' ? 'Checking...' : 'Ready for Login'}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.button, !firebaseAvailable && styles.buttonDisabled]}
          onPress={handleEnableNotifications}
          disabled={!firebaseAvailable}
        >
          <Text style={styles.buttonText}>
            {notificationsEnabled ? 'Notifications Enabled' : 'Enable Notifications'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>Login/Logout</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonSecondary} onPress={() => {}}>
          <Text style={styles.buttonTextSecondary}>View Home Screen</Text>
        </TouchableOpacity>

        <View style={styles.logContainer}>
          <Text style={styles.logTitle}>Debug Log:</Text>
          <Text style={styles.logText}>App initialized successfully</Text>
          <Text style={styles.logText}>Firebase status: {firebaseStatus?.isInitialized ? 'Initialized' : 'Fallback Mode'}</Text>
          <Text style={styles.logText}>Check console for detailed logs</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  success: {
    color: '#34C759',
  },
  error: {
    color: '#FF3B30',
  },
  warning: {
    color: '#FF9500',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonSecondary: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  buttonTextSecondary: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  logContainer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#e8e8e8',
    borderRadius: 8,
    width: '90%',
  },
  logTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  logText: {
    fontSize: 12,
    color: '#888',
    marginVertical: 2,
  },
});