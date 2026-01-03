import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const notificationService = {
  registerForPushNotifications: async (): Promise<string | null> => {
    try {
      let token: string | null = null;

      if (Device.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }

        if (finalStatus !== 'granted') {
          return null;
        }

        const projectId =
          Constants.expoConfig?.extra?.eas?.projectId ??
          (process.env as Record<string, string | undefined>)
            .EXPO_PUBLIC_EAS_PROJECT_ID;

        token = (
          await Notifications.getExpoPushTokenAsync(
            projectId ? { projectId } : undefined
          )
        ).data;
      }

      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#1e3a8a',
        });
      }

      return token;
    } catch (error) {
      console.error(
        '[notificationService] registerForPushNotifications error',
        error
      );
      return null;
    }
  },

  scheduleLocalNotification: async (
    title: string,
    body: string,
    data?: Record<string, unknown>,
    trigger?: Notifications.NotificationTriggerInput
  ): Promise<string> => {
    return await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data,
      },
      trigger: trigger || null,
    });
  },

  cancelNotification: async (notificationId: string): Promise<void> => {
    await Notifications.cancelScheduledNotificationAsync(notificationId);
  },

  cancelAllNotifications: async (): Promise<void> => {
    await Notifications.cancelAllScheduledNotificationsAsync();
  },

  addNotificationReceivedListener: (
    callback: (notification: Notifications.Notification) => void
  ) => {
    return Notifications.addNotificationReceivedListener(callback);
  },

  addNotificationResponseReceivedListener: (
    callback: (response: Notifications.NotificationResponse) => void
  ) => {
    return Notifications.addNotificationResponseReceivedListener(callback);
  },

  getBadgeCount: async (): Promise<number> => {
    return await Notifications.getBadgeCountAsync();
  },

  setBadgeCount: async (count: number): Promise<void> => {
    await Notifications.setBadgeCountAsync(count);
  },
};
