// Firebase Configuration for Kuota app
// This file contains the actual Firebase configuration values

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Actual Firebase configuration for Kuota app
export const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: 'AIzaSyDI8w5sv5NUEVry2Zn7kOAM7eNDC4SMemo',
  authDomain: 'kuota-f0e3d.firebaseapp.com',
  projectId: 'kuota-f0e3d',
  storageBucket: 'kuota-f0e3d.firebasestorage.app',
  messagingSenderId: '99983666038',
  appId: '1:99983666038:android:30e24dc78f26e39c266857',
};

// Development mode check
export const isDevelopment = __DEV__;

// Check if Firebase configuration is properly set
export const hasFirebaseConfigFiles = (): boolean => {
  try {
    // Check if the configuration has actual values (not placeholders)
    const config = FIREBASE_CONFIG;
    return config.apiKey !== 'YOUR_API_KEY' && 
           config.projectId !== 'your-project-id' &&
           config.messagingSenderId !== 'YOUR_SENDER_ID' &&
           config.appId !== 'YOUR_APP_ID' &&
           config.apiKey.length > 0 &&
           config.projectId.length > 0;
  } catch (error) {
    console.log('[FirebaseConfig] Error checking config:', error);
    return false;
  }
};

// Get configuration status
export const getConfigStatus = () => ({
  isDevelopment,
  hasConfigFiles: hasFirebaseConfigFiles(),
  configAvailable: hasFirebaseConfigFiles(),
  config: hasFirebaseConfigFiles() ? {
    projectId: FIREBASE_CONFIG.projectId,
    authDomain: FIREBASE_CONFIG.authDomain,
    hasApiKey: !!FIREBASE_CONFIG.apiKey && !FIREBASE_CONFIG.apiKey.includes('YOUR_'),
    hasAppId: !!FIREBASE_CONFIG.appId && !FIREBASE_CONFIG.appId.includes('YOUR_'),
    hasSenderId: !!FIREBASE_CONFIG.messagingSenderId && !FIREBASE_CONFIG.messagingSenderId.includes('YOUR_'),
  } : null,
});