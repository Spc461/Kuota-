import Constants from 'expo-constants';

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

type FirebaseExtra = Partial<FirebaseConfig> | undefined;

const defaultFirebaseConfig: FirebaseConfig = {
  apiKey: 'AIzaSyDI8w5sv5NUEVry2Zn7kOAM7eNDC4SMemo',
  authDomain: 'kuota-f0e3d.firebaseapp.com',
  projectId: 'kuota-f0e3d',
  storageBucket: 'kuota-f0e3d.firebasestorage.app',
  messagingSenderId: '99983666038',
  appId: '1:99983666038:android:30e24dc78f26e39c266857',
};

function getExtraFirebaseConfig(): FirebaseExtra {
  const extra = (Constants.expoConfig?.extra ?? {}) as any;
  return extra.firebase as FirebaseExtra;
}

function readEnv(key: string): string | undefined {
  return (process.env as Record<string, string | undefined>)[key];
}

export const FIREBASE_CONFIG: FirebaseConfig = {
  apiKey: readEnv('EXPO_PUBLIC_FIREBASE_API_KEY') ?? getExtraFirebaseConfig()?.apiKey ?? defaultFirebaseConfig.apiKey,
  authDomain:
    readEnv('EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN') ?? getExtraFirebaseConfig()?.authDomain ?? defaultFirebaseConfig.authDomain,
  projectId: readEnv('EXPO_PUBLIC_FIREBASE_PROJECT_ID') ?? getExtraFirebaseConfig()?.projectId ?? defaultFirebaseConfig.projectId,
  storageBucket:
    readEnv('EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET') ??
    getExtraFirebaseConfig()?.storageBucket ??
    defaultFirebaseConfig.storageBucket,
  messagingSenderId:
    readEnv('EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID') ??
    getExtraFirebaseConfig()?.messagingSenderId ??
    defaultFirebaseConfig.messagingSenderId,
  appId: readEnv('EXPO_PUBLIC_FIREBASE_APP_ID') ?? getExtraFirebaseConfig()?.appId ?? defaultFirebaseConfig.appId,
};

export const isDevelopment = __DEV__;

export function hasFirebaseConfig(): boolean {
  const config = FIREBASE_CONFIG;

  return (
    !!config.apiKey &&
    !!config.projectId &&
    !!config.messagingSenderId &&
    !!config.appId &&
    !config.apiKey.includes('YOUR_') &&
    !config.projectId.includes('your-project') &&
    !config.messagingSenderId.includes('YOUR_') &&
    !config.appId.includes('YOUR_')
  );
}

export function getConfigStatus() {
  const configAvailable = hasFirebaseConfig();

  return {
    isDevelopment,
    configAvailable,
    config: configAvailable
      ? {
          projectId: FIREBASE_CONFIG.projectId,
          authDomain: FIREBASE_CONFIG.authDomain,
          hasApiKey: !!FIREBASE_CONFIG.apiKey,
          hasAppId: !!FIREBASE_CONFIG.appId,
          hasSenderId: !!FIREBASE_CONFIG.messagingSenderId,
        }
      : null,
  };
}
