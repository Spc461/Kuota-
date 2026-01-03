import app from '../config/firebase';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

export interface NotificationServiceResult {
  firebaseAvailable: boolean;
  notificationsEnabled: boolean;
  error?: string;
  details?: any;
}

class FirebaseService {
  private isInitialized = true;

  constructor() {
    console.warn('[FirebaseService] Firebase Web SDK initialized');
  }

  async initializeNotifications(): Promise<NotificationServiceResult> {
    const result: NotificationServiceResult = {
      firebaseAvailable: true,
      notificationsEnabled: false,
    };

    try {
      const expoResult = await this.initializeExpoNotifications();
      result.notificationsEnabled = expoResult.granted;
      result.details = expoResult;
      return result;
    } catch (error) {
      console.error(
        '[FirebaseService] Notification initialization error',
        error
      );
      result.notificationsEnabled = false;
      result.error = error instanceof Error ? error.message : 'Unknown error';
      return result;
    }
  }

  private async initializeExpoNotifications(): Promise<{
    granted: boolean;
    token?: string;
  }> {
    try {
      if (!Device.isDevice) {
        return { granted: false };
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: true,
          shouldSetBadge: true,
        }),
      });

      const { status } = await Notifications.requestPermissionsAsync();
      const granted = status === 'granted';

      if (!granted) {
        return { granted };
      }

      const projectId =
        Constants.expoConfig?.extra?.eas?.projectId ??
        (process.env as Record<string, string | undefined>)
          .EXPO_PUBLIC_EAS_PROJECT_ID;

      const token = (
        await Notifications.getExpoPushTokenAsync(
          projectId ? { projectId } : undefined
        )
      ).data;

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#1e3a8a',
        });
      }

      return { granted, token };
    } catch (error) {
      console.error('[FirebaseService] Expo notifications error', error);
      return { granted: false };
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Notifications.requestPermissionsAsync();
      return status === 'granted';
    } catch (error) {
      console.error('[FirebaseService] Error requesting permission', error);
      return false;
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasError: false,
      firebaseAvailable: true,
    };
  }
}

const firebaseService = new FirebaseService();

export async function initializeNotifications(): Promise<NotificationServiceResult> {
  try {
    return await firebaseService.initializeNotifications();
  } catch (error) {
    console.error(
      '[firebase.ts] Critical error in initializeNotifications',
      error
    );

    return {
      firebaseAvailable: true,
      notificationsEnabled: false,
      error: error instanceof Error ? error.message : 'Unknown critical error',
    };
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    return await firebaseService.requestPermission();
  } catch (error) {
    console.error(
      '[firebase.ts] Error in requestNotificationPermission',
      error
    );
    return false;
  }
}

export function onNotificationReceived(callback: (notification: any) => void) {
  try {
    return Notifications.addNotificationReceivedListener(callback);
  } catch (error) {
    console.error(
      '[firebase.ts] Error setting up notification listener',
      error
    );
    return null;
  }
}

export function getFirebaseStatus() {
  return firebaseService.getStatus();
}
