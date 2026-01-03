/**
 * Firebase Service - Mock Implementation
 * 
 * This file is heavily mocked to avoid Firebase native module errors
 * during development builds without proper Firebase native compilation.
 * 
 * TODO: Replace with real Firebase implementation when proper native build is configured.
 */

// Firebase App type for compatibility
export interface FirebaseApp {
  name: string;
  options: Record<string, unknown>;
}

// Mock Firebase App
let mockFirebaseApp: FirebaseApp | null = null;

/**
 * Initialize Firebase (mocked - no actual Firebase code)
 * This function exists for code compatibility but does nothing
 */
export const initializeFirebase = async (): Promise<FirebaseApp | null> => {
  console.log('[Firebase Mock] initializeFirebase called - Firebase is disabled for development');
  
  mockFirebaseApp = {
    name: '[DEFAULT]',
    options: {
      apiKey: 'mock-api-key',
      appId: 'mock-app-id',
      messagingSenderId: 'mock-sender-id',
      projectId: 'mock-project-id',
    },
  };
  
  return mockFirebaseApp;
};

/**
 * Get Firebase App instance (mocked)
 */
export const getFirebaseApp = (): FirebaseApp | null => {
  return mockFirebaseApp;
};

/**
 * Mock auth reference - returns null to indicate Firebase Auth is not available
 */
export const getAuth = () => {
  console.log('[Firebase Mock] getAuth called - Firebase Auth is disabled');
  return null;
};

/**
 * Mock firestore reference - returns null to indicate Firebase Firestore is not available
 */
export const getFirestore = () => {
  console.log('[Firebase Mock] getFirestore called - Firebase Firestore is disabled');
  return null;
};

/**
 * Mock messaging reference - returns null to indicate Firebase Messaging is not available
 */
export const getMessaging = () => {
  console.log('[Firebase Mock] getMessaging called - Firebase Messaging is disabled');
  return null;
};

/**
 * Mock analytics reference - returns null to indicate Firebase Analytics is not available
 */
export const getAnalytics = () => {
  console.log('[Firebase Mock] getAnalytics called - Firebase Analytics is disabled');
  return null;
};

/**
 * Check if Firebase is initialized and available
 */
export const isFirebaseAvailable = (): boolean => {
  return false; // Always returns false to prevent Firebase usage
};

/**
 * Mock notification token retrieval
 * Returns a mock token string to prevent errors
 */
export const getNotificationToken = async (): Promise<string | null> => {
  console.log('[Firebase Mock] getNotificationToken - returning mock token');
  return 'mock_notification_token_dev';
};

/**
 * Mock unsubscribe from notifications
 */
export const onNotification = (callback: (notification: unknown) => void): (() => void) => {
  console.log('[Firebase Mock] onNotification - notifications are disabled');
  return () => {};
};

export default {
  initializeFirebase,
  getAuth,
  getFirestore,
  getMessaging,
  getAnalytics,
  isFirebaseAvailable,
  getNotificationToken,
  onNotification,
};
