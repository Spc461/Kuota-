import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';
import { FIREBASE_CONFIG, getConfigStatus } from '../config/firebase.config';

export interface NotificationServiceResult {
  firebaseAvailable: boolean;
  notificationsEnabled: boolean;
  error?: string;
  details?: any;
}

class FirebaseService {
  private isInitialized = false;
  private messagingInstance: FirebaseMessagingTypes.Module | null = null;
  private lastError: Error | null = null;

  constructor() {
    this.initializeWithFallback();
  }

  private initializeWithFallback() {
    const configStatus = getConfigStatus();

    try {
      this.messagingInstance = messaging();
      this.isInitialized = true;

      console.warn('[FirebaseService] Firebase messaging initialized', {
        projectId: FIREBASE_CONFIG.projectId,
        configAvailable: configStatus.configAvailable,
      });
    } catch (error) {
      this.handleInitializationError(error);

      console.warn('[FirebaseService] Falling back to Expo notifications', {
        configAvailable: configStatus.configAvailable,
      });
    }
  }

  private handleInitializationError(error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown Firebase init error');

    this.lastError = err;
    this.isInitialized = false;
    this.messagingInstance = null;

    console.error('[FirebaseService] Initialization failed', {
      message: err.message,
    });
  }

  async initializeNotifications(): Promise<NotificationServiceResult> {
    const result: NotificationServiceResult = {
      firebaseAvailable: this.isInitialized,
      notificationsEnabled: false,
    };

    try {
      if (!this.isInitialized || !this.messagingInstance) {
        const expoResult = await this.initializeExpoNotifications();
        result.firebaseAvailable = false;
        result.notificationsEnabled = expoResult.granted;
        result.details = expoResult;
        return result;
      }

      const nativeResult = await this.initializeNativeNotifications();
      result.firebaseAvailable = true;
      result.notificationsEnabled = nativeResult.enabled;
      result.details = nativeResult;
      return result;
    } catch (error) {
      console.error('[FirebaseService] Notification initialization error', error);
      result.notificationsEnabled = false;
      result.error = error instanceof Error ? error.message : 'Unknown error';
      return result;
    }
  }

  private async initializeExpoNotifications(): Promise<{ granted: boolean; token?: string }> {
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
        (process.env as Record<string, string | undefined>).EXPO_PUBLIC_EAS_PROJECT_ID;

      const token = (await Notifications.getExpoPushTokenAsync(projectId ? { projectId } : undefined)).data;

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

  private async initializeNativeNotifications(): Promise<{ enabled: boolean; token?: string; error?: string }> {
    try {
      if (!this.messagingInstance) {
        return { enabled: false, error: 'Firebase messaging not initialized' };
      }

      if (Platform.OS === 'ios') {
        const authStatus = await this.messagingInstance.requestPermission();
        const enabled = authStatus === 1 || authStatus === 2;

        if (!enabled) {
          return { enabled: false, error: 'Permission denied' };
        }
      }

      const token = await this.messagingInstance.getToken();
      this.setupMessageHandlers();

      return { enabled: true, token };
    } catch (error) {
      console.error('[FirebaseService] Native notifications error', error);
      return { enabled: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private setupMessageHandlers() {
    if (!this.messagingInstance) {
      return;
    }

    try {
      this.messagingInstance.onMessage(async (remoteMessage) => {
        console.warn('[FirebaseService] Foreground message received', remoteMessage);
      });

      this.messagingInstance.onNotificationOpenedApp((remoteMessage) => {
        console.warn('[FirebaseService] Notification opened app', remoteMessage);
      });

      this.messagingInstance
        .getInitialNotification()
        .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
          if (remoteMessage) {
            console.warn('[FirebaseService] Initial notification', remoteMessage);
          }
        })
        .catch((error) => {
          console.error('[FirebaseService] getInitialNotification error', error);
        });
    } catch (error) {
      console.error('[FirebaseService] Error setting up message handlers', error);
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      if (!this.isInitialized || !this.messagingInstance) {
        const { status } = await Notifications.requestPermissionsAsync();
        return status === 'granted';
      }

      const authStatus = await this.messagingInstance.requestPermission();
      return authStatus === 1 || authStatus === 2;
    } catch (error) {
      console.error('[FirebaseService] Error requesting permission', error);
      return false;
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasError: !!this.lastError,
      lastError: this.lastError?.message,
      firebaseAvailable: this.isInitialized,
    };
  }
}

const firebaseService = new FirebaseService();

export async function initializeNotifications(): Promise<NotificationServiceResult> {
  try {
    return await firebaseService.initializeNotifications();
  } catch (error) {
    console.error('[firebase.ts] Critical error in initializeNotifications', error);

    return {
      firebaseAvailable: false,
      notificationsEnabled: false,
      error: error instanceof Error ? error.message : 'Unknown critical error',
    };
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    return await firebaseService.requestPermission();
  } catch (error) {
    console.error('[firebase.ts] Error in requestNotificationPermission', error);
    return false;
  }
}

export function onNotificationReceived(callback: (notification: any) => void) {
  try {
    if (firebaseService.getStatus().isInitialized) {
      return messaging().onMessage(callback);
    }

    return Notifications.addNotificationReceivedListener(callback);
  } catch (error) {
    console.error('[firebase.ts] Error setting up notification listener', error);
    return null;
  }
}

export function getFirebaseStatus() {
  return firebaseService.getStatus();
}
