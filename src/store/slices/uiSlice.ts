import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UIState } from '../types';
import { Notification } from '../../types/models';

const initialState: UIState = {
  theme: 'light',
  language: 'fr',
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  globalError: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<'ar' | 'fr'>) => {
      state.language = action.payload;
    },
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.read) {
        state.unreadCount += 1;
      }
    },
    markNotificationAsRead: (state, action: PayloadAction<string>) => {
      const notification = state.notifications.find(
        n => n.id === action.payload
      );
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount = Math.max(0, state.unreadCount - 1);
      }
    },
    markAllNotificationsAsRead: state => {
      state.notifications.forEach(n => {
        n.read = true;
      });
      state.unreadCount = 0;
    },
    clearNotifications: state => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setGlobalError: (state, action: PayloadAction<string | null>) => {
      state.globalError = action.payload;
    },
  },
});

export const {
  setTheme,
  setLanguage,
  addNotification,
  markNotificationAsRead,
  markAllNotificationsAsRead,
  clearNotifications,
  setGlobalLoading,
  setGlobalError,
} = uiSlice.actions;

export default uiSlice.reducer;
