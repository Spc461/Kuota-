// Main entry point for src modules
export * from './services/firebase';
export * from './config/firebase.config';

// Version info
export const APP_VERSION = '1.0.0';
export const BUILD_TYPE = __DEV__ ? 'development' : 'production';

// App initialization status
export interface AppInitializationStatus {
  firebaseInitialized: boolean;
  notificationsAvailable: boolean;
  ready: boolean;
  error?: string;
}

// Global error handler for uncaught errors
export const setupGlobalErrorHandler = () => {
  if (ErrorUtils) {
    const originalHandler = ErrorUtils.getGlobalHandler();
    
    ErrorUtils.setGlobalHandler((error: Error, isFatal: boolean) => {
      console.error('[GlobalErrorHandler] Uncaught error:', {
        message: error.message,
        stack: error.stack,
        isFatal,
      });
      
      // Call original handler
      if (originalHandler) {
        originalHandler(error, isFatal);
      }
    });
  }
};

// Utility to check if the app is ready
export const isAppReady = async (): Promise<boolean> => {
  try {
    // Add any additional readiness checks here
    return true;
  } catch (error) {
    console.error('[AppReady] Error checking app readiness:', error);
    return false;
  }
};