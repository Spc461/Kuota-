import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { FIREBASE_CONFIG, getConfigStatus } from '../config/firebase.config';

interface NotificationServiceResult {
  firebaseAvailable: boolean;
  notificationsEnabled: boolean;
  error?: string;
  details?: any;
}

class FirebaseService {
  private isInitialized = false;
  private firebaseApp: any = null;
  private messagingInstance: any = null;
  private lastError: Error | null = null;

  constructor() {
    this.initializeWithFallback();
  }

  private initializeWithFallback() {
    try {
      console.log('[FirebaseService] Attempting to initialize Firebase...');
      
      // Log configuration status for debugging
      const configStatus = getConfigStatus();
      console.log('[FirebaseService] Configuration status:', {
        hasConfigFiles: configStatus.hasConfigFiles,
        configAvailable: configStatus.configAvailable,
        projectId: configStatus.config?.projectId,
        hasApiKey: configStatus.config?.hasApiKey,
      });
      
      if (this.isFirebaseAvailable()) {
        this.firebaseApp = require('@react-native-firebase/app').default;
        this.messagingInstance = messaging();
        this.isInitialized = true;
        console.log('[FirebaseService] Firebase initialized successfully with config:', {
          projectId: FIREBASE_CONFIG.projectId,
          authDomain: FIREBASE_CONFIG.authDomain,
          hasValidConfig: configStatus.configAvailable
        });
      } else {
        console.log('[FirebaseService] Firebase not available, using fallback mode');
        this.isInitialized = false;
      }
    } catch (error) {
      this.handleInitializationError(error);
    }
  }

  private isFirebaseAvailable(): boolean {
    try {
      if (__DEV__) {
        console.log('[FirebaseService] Development mode detected');
      }
      
      require('@react-native-firebase/app');
      require('@react-native-firebase/messaging');
      
      return true;
    } catch (error) {
      console.log('[FirebaseService] Firebase modules not available:', error.message);
      return false;
    }
  }

  private handleInitializationError(error: any) {
    this.lastError = error;
    this.isInitialized = false;
    console.error('[FirebaseService] Initialization failed:', {
      message: error.message,
      code: error.code,
      stack: error.stack?.substring(0, 200) + '...'
    });
  }

  async initializeNotifications(): Promise<NotificationServiceResult> {
    const result: NotificationServiceResult = {
      firebaseAvailable: this.isInitialized,
      notificationsEnabled: false,
    };

    try {
      console.log('[FirebaseService] Starting notification initialization...');

      if (!this.isInitialized) {
        console.log('[FirebaseService] Using Expo notifications fallback');
        const expoResult = await this.initializeExpoNotifications();
        result.firebaseAvailable = false;
        result.notificationsEnabled = expoResult.granted;
        result.details = expoResult;
        return result;
      }

      const nativeResult = await this.initializeNativeNotifications();
      result.notificationsEnabled = nativeResult.enabled;
      result.details = nativeResult;

      console.log('[FirebaseService] Notification initialization complete:', result);
      return result;

    } catch (error) {
      console.error('[FirebaseService] Notification initialization error:', error);
      result.error = error instanceof Error ? error.message : 'Unknown error';
      result.notificationsEnabled = false;
      return result;
    }
  }

  private async initializeExpoNotifications(): Promise<{ granted: boolean; token?: string }> {
    try {
      console.log('[FirebaseService] Initializing Expo notifications...');

      if (!Device.isDevice) {
        console.log('[FirebaseService] Running on simulator, Expo notifications limited');
        return { granted: false };
      }

      Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: false,
        }),
      });

      const { status } = await Notifications.requestPermissionsAsync();
      const granted = status === 'granted';

      let token: string | undefined;
      if (granted) {
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log('[FirebaseService] Expo push token obtained:', token?.substring(0, 20) + '...');
      }

      return { granted, token };
    } catch (error) {
      console.error('[FirebaseService] Expo notifications error:', error);
      return { granted: false };
    }
  }

  private async initializeNativeNotifications(): Promise<{ enabled: boolean; token?: string; error?: string }> {
    try {
      console.log('[FirebaseService] Initializing native Firebase notifications...');

      if (Platform.OS === 'ios') {
        const authStatus = await this.messagingInstance.requestPermission();
        const enabled = authStatus === 1 || authStatus === 2;

        if (!enabled) {
          console.log('[FirebaseService] iOS notification permission denied');
          return { enabled: false, error: 'Permission denied' };
        }
      }

      const token = await this.messagingInstance.getToken();
      console.log('[FirebaseService] FCM token obtained:', token?.substring(0, 20) + '...');

      this.setupMessageHandlers();

      return { enabled: true, token };
    } catch (error) {
      console.error('[FirebaseService] Native notifications error:', error);
      return { enabled: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  private setupMessageHandlers() {
    try {
      this.messagingInstance.onMessage(async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('[FirebaseService] Foreground message received:', remoteMessage);
      });

      this.messagingInstance.onNotificationOpenedApp((remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
        console.log('[FirebaseService] Notification opened app:', remoteMessage);
      });

      this.messagingInstance
        .getInitialNotification()
        .then((remoteMessage: FirebaseMessagingTypes.RemoteMessage | null) => {
          if (remoteMessage) {
            console.log('[FirebaseService] Initial notification:', remoteMessage);
          }
        });

      console.log('[FirebaseService] Message handlers configured');
    } catch (error) {
      console.error('[FirebaseService] Error setting up message handlers:', error);
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      console.log('[FirebaseService] Requesting notification permission...');

      if (!this.isInitialized) {
        console.log('[FirebaseService] Using Expo permission request fallback');
        const { status } = await Notifications.requestPermissionsAsync();
        return status === 'granted';
      }

      const authStatus = await this.messagingInstance.requestPermission();
      const enabled = authStatus === 1 || authStatus === 2;
      
      console.log('[FirebaseService] Permission result:', enabled);
      return enabled;
    } catch (error) {
      console.error('[FirebaseService] Error requesting permission:', error);
      return false;
    }
  }

  getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasError: !!this.lastError,
      lastError: this.lastError?.message,
      firebaseAvailable: this.isFirebaseAvailable(),
    };
  }
}

const firebaseService = new FirebaseService();

export async function initializeNotifications(): Promise<NotificationServiceResult> {
  try {
    console.log('[firebase.ts] initializeNotifications() called');
    return await firebaseService.initializeNotifications();
  } catch (error) {
    console.error('[firebase.ts] Critical error in initializeNotifications:', error);
    return {
      firebaseAvailable: false,
      notificationsEnabled: false,
      error: error instanceof Error ? error.message : 'Unknown critical error',
    };
  }
}

export async function requestNotificationPermission(): Promise<boolean> {
  try {
    console.log('[firebase.ts] requestNotificationPermission() called');
    return await firebaseService.requestPermission();
  } catch (error) {
    console.error('[firebase.ts] Error in requestNotificationPermission:', error);
    return false;
  }
}

export function onNotificationReceived(callback: (notification: any) => void) {
  try {
    console.log('[firebase.ts] Setting up notification listener');
    
    if (firebaseService.getStatus().isInitialized) {
      return messaging().onMessage(callback);
    } else {
      return Notifications.addNotificationReceivedListener(callback);
    }
  } catch (error) {
    console.error('[firebase.ts] Error setting up notification listener:', error);
    return null;
  }
}

export function getFirebaseStatus() {
  return firebaseService.getStatus();
}