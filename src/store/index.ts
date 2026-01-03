import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userProfileReducer from './slices/userProfileSlice';
import sessionsReducer from './slices/sessionsSlice';
import subscriptionsReducer from './slices/subscriptionsSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    userProfile: userProfileReducer,
    sessions: sessionsReducer,
    subscriptions: subscriptionsReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
