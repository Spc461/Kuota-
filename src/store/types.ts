import {
  User,
  Student,
  Teacher,
  Session,
  Subscription,
  Notification,
} from '../types/models';

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface UserProfileState {
  profile: Student | Teacher | null;
  isLoading: boolean;
  error: string | null;
}

export interface SessionsState {
  currentSession: Session | null;
  upcomingSessions: Session[];
  pastSessions: Session[];
  isLoading: boolean;
  error: string | null;
}

export interface SubscriptionsState {
  subscriptions: Subscription[];
  isLoading: boolean;
  error: string | null;
}

export interface UIState {
  theme: 'light' | 'dark';
  language: 'ar' | 'fr';
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  globalError: string | null;
}
