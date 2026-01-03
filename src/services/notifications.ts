/**
 * Notifications Service
 * 
 * This service provides notification functionality without Firebase dependencies.
 * It uses a mock implementation during development and can be replaced with
 * Firebase Cloud Messaging when proper native build is configured.
 * 
 * Features:
 * - Non-blocking initialization
 * - Fallback to mock notifications if Firebase is unavailable
 * - Push notification token management
 * - Notification event handling
 */

export interface Notification {
  notificationId: string;
  title?: string;
  body?: string;
  data?: Record<string, string>;
  timestamp: number;
}

export interface NotificationToken {
  token: string;
  provider: 'mock' | 'fcm' | 'apns';
}

// Callback type for notification events
export type NotificationCallback = (notification: Notification) => void;

class NotificationService {
  private isInitialized: boolean = false;
  private token: string | null = null;
  private notificationCallback: NotificationCallback | null = null;

  /**
   * Initialize the notification service
   * This is non-blocking and uses mock implementation if Firebase is unavailable
   */
  async initialize(): Promise<void> {
    if (this.isInitialized) {
      console.log('[Notifications] Already initialized');
      return;
    }

    console.log('[Notifications] Initializing (Firebase-disabled mode)...');
    
    // Initialize with mock token for development
    this.token = await this.getMockToken();
    this.isInitialized = true;
    
    console.log('[Notifications] Initialized successfully with mock provider');
  }

  /**
   * Get mock notification token for development
   */
  private async getMockToken(): Promise<string> {
    // Generate a consistent mock token for development
    return 'mock_notifications_token_dev_' + Date.now();
  }

  /**
   * Get the current notification token
   */
  async getToken(): Promise<string | null> {
    if (!this.isInitialized) {
      await this.initialize();
    }
    return this.token;
  }

  /**
   * Subscribe to notification events
   * Returns an unsubscribe function
   */
  onNotification(callback: NotificationCallback): () => void {
    this.notificationCallback = callback;
    
    // Return unsubscribe function
    return () => {
      this.notificationCallback = null;
    };
  }

  /**
   * Simulate receiving a notification (for testing)
   */
  simulateNotification(notification: Omit<Notification, 'notificationId' | 'timestamp'>): void {
    if (this.notificationCallback) {
      const fullNotification: Notification = {
        ...notification,
        notificationId: 'mock_' + Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
      };
      this.notificationCallback(fullNotification);
    }
  }

  /**
   * Check if notifications are available
   */
  isAvailable(): boolean {
    return true; // Always available in mock mode
  }

  /**
   * Check if notifications are initialized
   */
  isReady(): boolean {
    return this.isInitialized;
  }
}

// Export singleton instance
export const notificationService = new NotificationService();

/**
 * Setup notifications for the app
 * Call this in your app's useEffect or initialization code
 */
export async function setupNotifications(): Promise<void> {
  try {
    await notificationService.initialize();
  } catch (error) {
    console.error('[Notifications] Setup failed:', error);
    throw error;
  }
}

/**
 * Get notification service instance
 */
export function getNotificationService(): NotificationService {
  return notificationService;
}

export default notificationService;
