// Firebase Configuration Template
// Copy this file and fill in your actual Firebase config values

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

// Mock configuration for development
export const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: 'YOUR_API_KEY',
  authDomain: 'your-project.firebaseapp.com',
  projectId: 'your-project-id',
  storageBucket: 'your-project.appspot.com',
  messagingSenderId: 'YOUR_SENDER_ID',
  appId: 'YOUR_APP_ID',
};

// Development mode check
export const isDevelopment = __DEV__;

// Check if Firebase config files exist
export const hasFirebaseConfigFiles = (): boolean => {
  try {
    // These would normally check for actual config files
    // For now, we'll return false in development to test fallback
    return !isDevelopment;
  } catch (error) {
    console.log('[FirebaseConfig] Error checking config files:', error);
    return false;
  }
};

// Get configuration status
export const getConfigStatus = () => ({
  isDevelopment,
  hasConfigFiles: hasFirebaseConfigFiles(),
  configAvailable: hasFirebaseConfigFiles() && !isDevelopment,
});